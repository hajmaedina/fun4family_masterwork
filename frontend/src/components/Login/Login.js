import React, { useRef, useState } from "react";
import { Cancel, Room } from "@material-ui/icons";
import InputField from "../InputField/InputField";
import axios from "axios";

import "./login.scss";

export default function Login(props) {
  const {
    setShowLogin,
    setCurrentUsername,
    setCurrentToken,
    setUserId,
    myStorage,
    currentUsername,
  } = props;
  const { REACT_APP_SERVER_URL } = process.env;
  const [error, setError] = useState(false);
  setCurrentUsername(myStorage.getItem("user"));

  const [formData, setFormData] = useState({
    username: currentUsername || "",
    password: "",
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    username: useRef(),
    password: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    lessThan6: `A jelszó legalább 6 karakter kell, hogy legyen`,
    moreThan100: `Nem lehet hosszabb 100 karakternél`,
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });

  const isFieldEmpty = (value) => {
    return value !== "";
  };

  const lessThan6 = (value) => {
    return value.length >= 6;
  };

  const moreThan100 = (value) => {
    return value.length <= 100;
  };

  const validators = {
    username: {
      required: isFieldEmpty,
      moreThan100: moreThan100,
    },
    password: {
      required: isFieldEmpty,
      lessThan6: lessThan6,
      moreThan100: moreThan100,
    },
  };

  const validateField = (fieldName) => {
    const value = formData[fieldName];
    let isValid = true;
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
    references[fieldName].current.setCustomValidity("");

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid !== false) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = formErrorTypes[validationType];
            setFormErrors((prev) => ({
              ...prev,
              [fieldName]: errorText,
            }));
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  };

  const isFormValid = () => {
    let isValid = true;
    Object.keys(formData).forEach((fieldName) => {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    validateField(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({
      username: "",
      password: "",
    });
    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      try {
        const res = await axios.post(`${REACT_APP_SERVER_URL}/login`, formData);
        setCurrentUsername(res.data.username);
        myStorage.setItem("user", res.data.username);
        setUserId(res.data.id);
        myStorage.setItem("userId", res.data.id);
        setCurrentToken(res.data.token);
        myStorage.setItem("token", res.data.token);
        setFormData({
          username: "",
          password: "",
        });
        setShowLogin(false);
      } catch (err) {
        setError(true);
      }
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span className="fun">fun</span>
        <span className="four">4</span>
        <span className="family">family</span>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
        className={`needs-validation ${formWasValidated && "was-validated"}`}
      >
        <InputField
          name="username"
          id="username"
          type="text"
          value={formData.username}
          placeholder="felhasználónév"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          reference={references.username}
          error={formErrors.username}
        />
        <InputField
          name="password"
          id="password"
          type="password"
          value={formData.password}
          placeholder="jelszó"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          reference={references.password}
          error={formErrors.password}
        />
        <button className="loginBtn" type="submit">
          Bejelentkezés
        </button>
        {error && <span className="failure">All fields are required.</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}

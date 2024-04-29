import React, { useRef, useState } from "react";
import { Cancel, Room } from "@material-ui/icons";
import InputField from "../InputField/InputField";
import axios from "axios";

import "./register.scss";

export default function Register(props) {
  const {
    setShowRegister,
    setShowLogin,
    myStorage,
    setCurrentUsername,
  } = props;
  const { REACT_APP_SERVER_URL } = process.env;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    username: useRef(),
    email: useRef(),
    password: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    validEmail: `Az email nem megfelelő formátumban van`,
    lessThan6: `A jelszó legalább 6 karakter kell, hogy legyen`,
    moreThan100: `Nem lehet hosszabb 100 karakternél`,
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const isFieldEmpty = (value) => {
    return value !== "";
  };

  const isEmailInvalid = (value) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return value.match(validRegex);
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
    email: {
      required: isFieldEmpty,
      validEmail: isEmailInvalid,
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
      email: "",
      password: "",
    });
    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      try {
        const res = await axios.post(
          `${REACT_APP_SERVER_URL}/register`,
          formData
        );
        setSuccess(true);
        setCurrentUsername(res.data.username);
        myStorage.setItem("user", res.data.username);
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      } catch (err) {
        setError(true);
      }
    } else {
      setFormWasValidated(true);
    }
  };

  const handleLogInBtn = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span className="fun">fun</span>
        <span className="four">4</span>
        <span className="family">family</span>
      </div>
      {success ? (
        <>
          <span className="success success-message">
            Gratulálunk! Sikeresen regisztráltál, most már bejelentkezhetsz!
          </span>
          <button
            type="button"
            className="registerBtn"
            onClick={handleLogInBtn}
          >
            Bejelentkezek!
          </button>
        </>
      ) : (
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
            name="email"
            id="email"
            type="email"
            value={formData.email}
            placeholder="email cím"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            reference={references.email}
            error={formErrors.email}
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
          <button className="registerBtn" type="submit">
            Regisztráció
          </button>
          {error && <span className="failure">Sajnálom, hiba történt!</span>}
        </form>
      )}
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}

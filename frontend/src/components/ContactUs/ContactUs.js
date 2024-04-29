import React, { useRef, useState } from "react";
import { Cancel, Room } from "@material-ui/icons";
import InputField from "../InputField/InputField";
import axios from "axios";
import emailjs from "emailjs-com";

import "./contactus.scss";

export default function ContactUs(props) {
  const { setShowContact } = props;
  const {
    REACT_APP_SERVER_URL,
    REACT_APP_MAILJS_SERVICE_ID,
    REACT_APP_MAILJS_TEMPLATE_ID,
    REACT_APP_MAILJS_USER_ID,
  } = process.env;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    name: useRef(),
    email: useRef(),
    message: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    validEmail: `Az email nem megfelelő formátumban van`,
    moreThan100: `Nem lehet hosszabb 100 karakternél`,
    moreThan1000: `Nem lehet hosszabb 1000 karakternél`,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const isFieldEmpty = (value) => {
    return value !== "";
  };

  const moreThan100 = (value) => {
    return value.length <= 100;
  };

  const moreThan1000 = (value) => {
    return value.length <= 1000;
  };

  const isEmailInvalid = (value) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return value.match(validRegex);
  };

  const validators = {
    name: {
      required: isFieldEmpty,
      moreThan100: moreThan100,
    },
    email: {
      required: isFieldEmpty,
      validEmail: isEmailInvalid,
      moreThan100: moreThan100,
    },
    message: {
      required: isFieldEmpty,
      moreThan1000: moreThan1000,
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

  const sendEmail = async (e) => {
    e.preventDefault();
    setFormErrors({
      name: "",
      email: "",
      message: "",
    });
    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      try {
        await axios.post(`${REACT_APP_SERVER_URL}/messages`, formData);
        setError(false);
        sendingMail(e);
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } catch (err) {
        setSuccess(false);
        setError(true);
      }
    } else {
      setFormWasValidated(true);
    }
  };

  const sendingMail = (e) => {
    emailjs
      .sendForm(
        REACT_APP_MAILJS_SERVICE_ID,
        REACT_APP_MAILJS_TEMPLATE_ID,
        e.target,
        REACT_APP_MAILJS_USER_ID
      )
      .then(
        (result) => {
          setError(false);
        },
        (error) => {
          setError(true);
        }
      );
  };

  return (
    <div className="contactContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span className="fun">fun</span>
        <span className="four">4</span>
        <span className="family">family</span>
      </div>
      <form
        noValidate
        id="contact-form"
        onSubmit={sendEmail}
        className={`needs-validation ${formWasValidated && "was-validated"}`}
      >
        <InputField
          name="name"
          id="name"
          type="text"
          value={formData.name}
          placeholder="név"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          reference={references.name}
          error={formErrors.name}
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
          name="message"
          id="message"
          type="text"
          value={formData.message}
          placeholder="üzenet"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          reference={references.message}
          error={formErrors.message}
        />
        <button className="contactBtn" type="submit">
          Elküldés
        </button>
        {error && (
          <span className="failure">
            Sajnálom, hiba történt az üzenet küldésekor!
          </span>
        )}
        {success && (
          <span className="success">Üzenetedet sikeresen elküldted!</span>
        )}
      </form>
      <Cancel className="contactCancel" onClick={() => setShowContact(false)} />
    </div>
  );
}

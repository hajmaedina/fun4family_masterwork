import React, { useRef, useState } from "react";
import { Marker, Popup } from "react-map-gl";
import { Room } from "@material-ui/icons";
import InputField from "../InputField/InputField";
import axios from "axios";

export default function NewPin(props) {
  const {
    currentUsername,
    newPlace,
    setNewPlace,
    pins,
    setPins,
    viewport,
  } = props;
  const { REACT_APP_SERVER_URL } = process.env;
  const myStorage = window.localStorage;
  const userToken = myStorage.getItem("token");

  const [formData, setFormData] = useState({
    place: "",
    desc: "",
    rating: 1,
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    place: useRef(),
    desc: useRef(),
    rating: useRef(),
  };

  const formErrorTypes = Object.freeze({
    required: `A mező kitöltése kötelező`,
    moreThan50: `Nem lehet hosszabb 50 karakternél`,
    moreThan200: `Nem lehet hosszabb 200 karakternél`,
  });

  const [formErrors, setFormErrors] = useState({
    place: "",
    desc: "",
    rating: "",
  });

  const isFieldEmpty = (value) => {
    return value !== "";
  };

  const moreThan50 = (value) => {
    return value.length <= 50;
  };

  const moreThan200 = (value) => {
    return value.length <= 200;
  };

  const validators = {
    place: {
      required: isFieldEmpty,
      moreThan50: moreThan50,
    },
    desc: {
      required: isFieldEmpty,
      moreThan200: moreThan200,
    },
    rating: {
      required: isFieldEmpty,
    },
  };

  const validateField = (fieldName) => {
    const value = formData[fieldName];
    let isValid = true;
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
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
    const newPin = {
      username: currentUsername,
      place: formData.place,
      desc: formData.desc,
      rating: formData.rating,
      lat: newPlace.lat,
      long: newPlace.long,
      createDate: new Date().toString(),
    };
    setFormErrors({
      place: "",
      desc: "",
      rating: "",
    });
    setFormWasValidated(false);
    const isValid = isFormValid();
    if (isValid) {
      try {
        const res = await axios.post(
          `${REACT_APP_SERVER_URL}/pins/new`,
          newPin,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setPins([...pins, res.data.newPin]);
        setFormData({
          place: "",
          desc: "",
          rating: 1,
        });
        setNewPlace(null);
      } catch (err) {
        console.log(err);
      }
    } else {
      setFormWasValidated(true);
    }
  };

  return (
    <div>
      <Marker
        latitude={newPlace.lat}
        longitude={newPlace.long}
        offsetLeft={-3.5 * viewport.zoom}
        offsetTop={-7 * viewport.zoom}
      >
        <Room
          style={{
            fontSize: 7 * viewport.zoom,
            color: "tomato",
            cursor: "pointer",
          }}
        />
      </Marker>
      <Popup
        latitude={newPlace.lat}
        longitude={newPlace.long}
        closeButton={true}
        closeOnClick={false}
        onClose={() => setNewPlace(null)}
        anchor="left"
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>Hely</label>
            <InputField
              name="place"
              id="place"
              type="text"
              value={formData.place}
              placeholder="Írj be egy helyet"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.place}
              error={formErrors.place}
            />
            <label>Leírás</label>
            <InputField
              name="desc"
              id="desc"
              type="text"
              value={formData.desc}
              placeholder="Mondj valamit erről a helyről"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.desc}
              error={formErrors.desc}
            />
            <label>Értékelés</label>
            <select
              name="rating"
              id="rating"
              value={formData.rating}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              reference={references.rating}
              error={formErrors.rating}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button type="submit" className="submitButton">
              Hely megjelölése
            </button>
          </form>
        </div>
      </Popup>
    </div>
  );
}

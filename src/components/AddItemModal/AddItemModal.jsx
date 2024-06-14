import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import UseEscape from "../UseEscape/UseEscape";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  UseEscape(closeActiveModal);
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
      setIsFormValid(false);
    }
  }, [isOpen]);
  const handleNameChange = (e) => {
    setName(e.target.value);
    checkFormValidity(e.target.value, imageUrl, weather);
  };
  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    checkFormValidity(name, e.target.value, weather);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    checkFormValidity(name, imageUrl, e.target.value);
  };
  const checkFormValidity = (name, imageUrl, weather) => {
    if (name && imageUrl && weather) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onAddItem({ name, imageUrl, weather });
    }
  };
  return (
    <ModalWithForm
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
      isSubmitDisabled={!isFormValid}
    >
      <label htmlFor="Name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="Name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="ImageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="ImageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            name="temperature"
            id="hot"
            type="radio"
            value="hot"
            onChange={handleWeatherChange}
            className="modal__radio-input"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            name="temperature"
            id="warm"
            type="radio"
            value="warm"
            onChange={handleWeatherChange}
            className="modal__radio-input"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            name="temperature"
            id="cold"
            type="radio"
            value="cold"
            onChange={handleWeatherChange}
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

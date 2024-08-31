import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  useFormAndValidation,
  validateImageUrl,
  validateUrl,
} from "../../hooks/useFormAndValidation";
const AddItemModal = ({ closeActiveModal, onAddItem, isOpen, isLoading }) => {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();

  const [isImageValid, setIsImageValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [imageUrlError, setImageUrlError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setIsImageValid(false);
      setNameError("");
      setImageUrlError("");
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    const name = values.name || "";
    if (name === "") {
      setIsNameValid(true);
      setNameError("");
    } else if (values.name.length < 2 || values.name.length > 30) {
      setIsNameValid(false);
      setNameError("Name must be between 2 and 30 characters.");
    } else {
      setIsNameValid(true);
      setNameError("");
    }
  }, [values.name]);

  useEffect(() => {
    if (values.imageUrl) {
      if (validateUrl(values.imageUrl)) {
        validateImageUrl(values.imageUrl).then((isValid) => {
          setIsImageValid(isValid);
          setImageUrlError(isValid ? "" : "Please enter a valid image URL.");
        });
      } else {
        setIsImageValid(false);
        setImageUrlError("Please enter a valid image URL.");
      }
    } else {
      setIsImageValid(false);
      setImageUrlError("");
    }
  }, [values.imageUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid && isImageValid && values.weather) {
      onAddItem({
        name: values.name,
        imageUrl: values.imageUrl,
        weather: values.weather,
      });
      closeActiveModal();
    }
  };
  const isSubmitDisabled =
    !isValid || !isImageValid || !isNameValid || !values.weather;

  return (
    <ModalWithForm
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="Name" className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="Name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        {nameError && <span className="modal__error">{nameError}</span>}
      </label>
      <label htmlFor="ImageUrl" className="modal__label">
        Image{" "}
        <input
          name="imageUrl"
          type="url"
          className="modal__input"
          id="ImageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
          required
        />
        {imageUrlError && <span className="modal__error">{imageUrlError}</span>}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            className="modal__radio-input"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
            className="modal__radio-input"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

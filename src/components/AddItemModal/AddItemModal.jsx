import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  useFormAndValidation,
  validateImageUrl,
  validateUrl,
} from "../../hooks/useFormAndValidation";
const AddItemModal = ({ closeActiveModal, onAddItem, isOpen, isLoading }) => {
  const { values, handleChange, resetForm } = useFormAndValidation();

  const [isImageValid, setIsImageValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [imageUrlError, setImageUrlError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setIsImageValid(false);
      setIsNameValid(true);
      setNameError("");
      setImageUrlError("");
      setIsSubmitted(false);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const name = values.name || "";

    if (name.length < 2 || name.length > 30) {
      setIsNameValid(false);
      setNameError("Name must be between 2 and 30 characters.");
      return;
    } else {
      setIsNameValid(true);
      setNameError("");
    }

    if (values.imageUrl) {
      if (validateUrl(values.imageUrl)) {
        validateImageUrl(values.imageUrl).then((isValid) => {
          if (isValid) {
            setIsImageValid(true);
            setImageUrlError("");

            if (values.weather) {
              onAddItem({
                name: values.name,
                imageUrl: values.imageUrl,
                weather: values.weather,
              });
              closeActiveModal();
            }
          } else {
            setImageUrlError("Please enter a valid image URL.");
            setIsImageValid(false);
          }
        });
      } else {
        setImageUrlError("Please enter a valid image URL.");
        setIsImageValid(false);
      }
    } else {
      setImageUrlError("");
    }
  };
  const isSubmitDisabled = !values.name || !values.imageUrl || !values.weather;

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
        {isSubmitted && nameError ? (
          <span className="modal__error">{nameError}</span>
        ) : (
          "Name"
        )}
        <input
          name="name"
          type="text"
          className={`modal__input ${nameError ? "modal__input_error" : ""}`}
          id="name-addItem"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="ImageUrl" className="modal__label">
        {isSubmitted && imageUrlError ? (
          <span className="modal__error">{imageUrlError}</span>
        ) : (
          "Image"
        )}

        <input
          name="imageUrl"
          type="url"
          className={`modal__input ${
            imageUrlError ? "modal__input_error" : ""
          }`}
          id="ImageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
          required
        />
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

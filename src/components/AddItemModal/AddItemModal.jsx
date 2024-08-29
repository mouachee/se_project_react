import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItem({
        name: values.name,
        imageUrl: values.imageUrl,
        weather: values.weather,
      });
      closeActiveModal();
    }
  };
  return (
    <ModalWithForm
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="Name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="Name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
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

import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
const AddItemModal = ({ closeActiveModal, onAddItem, isOpen, isLoading }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItem(values);
    }
  };

  return (
    <ModalWithForm
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="name-addItem" className="modal__label">
        Name {""}
        <span className="modal__error">{errors.name}</span>
        <input
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="ImageUrl" className="modal__label">
        ImageURL {""}
        <span className="modal__error">{errors.imageUrl}</span>
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

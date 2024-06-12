import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setImageUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl });
  };
  return (
    <ModalWithForm
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="New garment"
      buttonText="Add garment"
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
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            name="temperature"
            id="hot"
            type="radio"
            className="modal__radio-input"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            name="temperature"
            id="warm"
            type="radio"
            className="modal__radio-input"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            name="temperature"
            id="cold"
            type="radio"
            className="modal__radio-input"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
const EditProfile = ({
  isOpen,
  closeActiveModal,
  handleEditProfile,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { setValues, isValid, errors, values, handleChange } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      setValues({ name: currentUser.name, avatar: currentUser.avatar });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleEditProfile(values);
    }
  };
  return (
    <ModalWithForm
      handleCloseClick={closeActiveModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
    >
      <label htmlFor="name-edit" className="modal__label">
        Name {""}
        <span className="modal__error">{errors.email}</span>
        <input
          className="modal__input"
          id="name-edit"
          required
          name="name"
          type="text"
          value={values.name || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar-edit" className="modal__label">
        Avatar{""} <span className="modal__error">{errors.email}</span>
        <input
          className="modal__input"
          id="avatar-edit"
          required
          name="avatar"
          type="url"
          value={values.avatar || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfile;

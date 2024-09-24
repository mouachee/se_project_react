import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Register = ({
  handleRegistration,
  isOpen,
  closeActiveModal,
  handleLoginClick,
}) => {
  const { values, handleChange, isValid, resetForm, errors } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);
  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleRegistration(values);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseClick={closeActiveModal}
      onSubmit={onRegisterSubmit}
      title="Sign Up"
      buttonText="Sign Up"
      showLink={true}
      linkText="or Log In"
      onLinkClick={handleLoginClick}
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="email-register" className="modal__label">
        Email{""}
        <span className="modal__error">{errors.email}</span>
        <input
          className="modal__input"
          id="email-register"
          required
          name="email"
          type="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password-register" className="modal__label">
        Password{""}
        <span className="modal__error">{errors.password}</span>
        <input
          className="modal__input"
          id="password-register"
          required
          name="password"
          type="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{""}
        <span className="modal__error">{errors.name}</span>
        <input
          className="modal__input"
          id="name-register"
          required
          name="name"
          type="text"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{""}
        <span className="modal__error">{errors.avatar}</span>
        <input
          className="modal__input"
          id="avatar-register"
          required
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default Register;

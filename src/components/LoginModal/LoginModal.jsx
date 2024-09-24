import { useEffect, useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Login = ({
  isOpen,
  closeActiveModal,
  handleRegisterClick,
  handleLogin,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);
  const onLoginSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleLogin(values);
    }
  };
  return (
    <ModalWithForm
      isOpen={isOpen}
      handleCloseClick={closeActiveModal}
      onSubmit={onLoginSubmit}
      title="Log In"
      buttonText="Log In"
      showLink={true}
      linkText="or Sign Up"
      onLinkClick={handleRegisterClick}
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="email-login" className="modal__label">
        Email{""}
        <span className="modal__error">{errors.email}</span>
        <input
          className="modal__input"
          id="email-login"
          required
          name="email"
          type="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password-login" className="modal__label">
        Password{""}
        <span className="modal__error">{errors.password}</span>
        <input
          className="modal__input"
          id="password-login"
          required
          name="password"
          type="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};
export default Login;

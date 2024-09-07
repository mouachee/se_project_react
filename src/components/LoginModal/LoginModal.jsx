import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const Login = ({
  isOpen,
  closeActiveModal,
  handleRegisterClick,
  handleLogin,
}) => {
  const { values, handleChange, isValid, resetForm } = useFormAndValidation();
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setError("");
    }
  }, [isOpen, resetForm]);

  const onLoginSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleLogin(values)
        .then(() => {
          setError("");
        })
        .catch((error) => {
          if (error.message === "Incorrect email or password") {
            setError("Incorrect password or email");
          } else {
            setError("Incorrect password or email");
          }
        });
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
      <label htmlFor="email" className="modal__label">
        Email{""}
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
      <label htmlFor="password" className="modal__label">
        {error ? <span className="modal__error">{error}</span> : "Password"}

        <input
          className={`modal__input ${error ? "modal__input_error" : ""}`}
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

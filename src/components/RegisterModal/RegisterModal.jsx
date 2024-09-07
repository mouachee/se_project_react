import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  validateImageUrl,
  validateUrl,
  useFormAndValidation,
} from "../../hooks/useFormAndValidation";

const Register = ({
  handleRegistration,
  isOpen,
  closeActiveModal,
  handleLoginClick,
}) => {
  const { values, handleChange, resetForm } = useFormAndValidation();

  const [isAvatarValid, setAvatarValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [avatarError, setAvatarError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm({ email: "", password: "", name: "", avatar: "" });
      setAvatarValid(false);
      setIsNameValid(true);
      setNameError("");
      setAvatarError("");
    }
  }, [isOpen, resetForm]);

  const onRegisterSubmit = (e) => {
    e.preventDefault();

    const name = values.name || "";

    if (name.length < 2 || name.length > 30) {
      setIsNameValid(false);
      setNameError("Name must be between 2 and 30 characters.");
    } else {
      setIsNameValid(true);
      setNameError("");
    }

    if (values.avatar) {
      if (validateUrl(values.avatar)) {
        validateImageUrl(values.avatar)
          .then((isValid) => {
            if (isValid) {
              setAvatarValid(true);
              setAvatarError("");
            } else {
              setAvatarError("Please enter a valid image URL.");
              setAvatarValid(false);
            }
          })
          .catch(() => {
            setAvatarError("The URL is invalid.");
            setAvatarValid(false);
          })
          .finally(() => {
            if (isNameValid && isAvatarValid) {
              handleRegistration(values);
            }
          });
      } else {
        setAvatarError("Please enter a valid image URL.");
        setAvatarValid(false);
      }
    } else {
      if (isNameValid) {
        handleRegistration(values);
      }
    }
  };
  const isSubmitDisabled =
    !values.email || !values.password || !values.name || !values.avatar;
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
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
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
      <label htmlFor="password" className="modal__label">
        Password{""}
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
        {nameError ? <span className="modal__error">{nameError}</span> : "Name"}
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
        {avatarError ? (
          <span className="modal__error">{avatarError}</span>
        ) : (
          "Avatar URL"
        )}
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

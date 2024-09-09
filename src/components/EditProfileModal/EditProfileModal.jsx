import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  validateImageUrl,
  validateUrl,
  useFormAndValidation,
} from "../../hooks/useFormAndValidation";
const EditProfile = ({
  isOpen,
  closeActiveModal,
  handleEditProfile,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { setValues, values, handleChange } = useFormAndValidation();

  const [isAvatarValid, setAvatarValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [avatarError, setAvatarError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({ name: currentUser.name, avatar: currentUser.avatar });
      setAvatarValid(false);
      setIsNameValid(true);
      setNameError("");
      setAvatarError("");
    }
  }, [isOpen, currentUser, setValues]);
  const handleSubmit = (e) => {
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
              handleEditProfile(values);
            }
          });
      } else {
        setAvatarError("Please enter a valid image URL.");
        setAvatarValid(false);
      }
    } else {
      if (isNameValid) {
        handleEditProfile(values);
      }
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
        {nameError ? <span className="modal__error">{nameError}</span> : "Name"}
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
        {avatarError ? (
          <span className="modal__error">{avatarError}</span>
        ) : (
          "Avatar"
        )}
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

import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfile = ({ activeModal, closeActiveModal, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile({ name, avatar });
  };
  return (
    <div
      className={`modal ${activeModal === "edit-profile" && "modal_opened"}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">Change profile data</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="modal__label">
            Name{""}
            <input
              className="modal__input"
              id="name"
              required
              name="name"
              type="name"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label htmlFor="avatar" className="modal__label">
            Avatar{""}
            <input
              className="modal__input"
              id="avatar"
              required
              name="avatar"
              type="avatar"
              value={avatar}
              onChange={handleAvatarChange}
            />
          </label>
          <button type="submit" className="modal__submit modal__submit--edit">
            <span>Save changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const Register = ({
  handleRegistration,
  isOpen,
  closeActiveModal,
  handleLoginClick,
}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onRegisterSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
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
    >
      <label htmlFor="email" className="modal__label">
        Email{""}
        <input
          className="modal__input"
          id="email"
          required
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{""}
        <input
          className="modal__input"
          id="password"
          required
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          className="modal__input"
          id="name"
          required
          name="name"
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL{""}
        <input
          className="modal__input"
          id="avatar"
          required
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default Register;

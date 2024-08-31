import { useState } from "react";
import { Link } from "react-router-dom";
import "../ModalWithForm/ModalWithForm.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Login = ({
  isOpen,
  closeActiveModal,
  handleRegisterClick,
  handleLogin,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
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
    </ModalWithForm>
  );
};
export default Login;

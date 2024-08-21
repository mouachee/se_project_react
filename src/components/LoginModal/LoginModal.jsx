import { useState } from "react";
import { Link } from "react-router-dom";
import "../ModalWithForm/ModalWithForm.css";

const Login = ({
  activeModal,
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
    <div className={`modal ${activeModal === "login" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">Log In</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <form className="modal__form" onSubmit={onLoginSubmit}>
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
          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit modal__submit--login"
            >
              <span>Login</span>
            </button>
            <span onClick={handleRegisterClick} className="modal__link">
              or Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

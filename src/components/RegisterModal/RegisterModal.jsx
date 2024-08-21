import { useState } from "react";
const Register = ({
  handleRegistration,
  activeModal,
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
    <div className={`modal ${activeModal === "register" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">Sign Up</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <form className="modal__form" onSubmit={onRegisterSubmit}>
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
          <label htmlFor="password" className="modal__label">
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
          <label htmlFor="password" className="modal__label">
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
          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit modal__submit--register"
            >
              <span>Sign Up</span>
            </button>
            <span onClick={handleLoginClick} className="modal__link">
              or Log In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

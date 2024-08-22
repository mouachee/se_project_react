import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function Header({
  handleRegisterClick,
  isLoggedIn,
  handleAddClick,
  weatherData,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img alt="header logo" src={logo} />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__avatar-container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth">
            <button className="header__register" onClick={handleRegisterClick}>
              Sign Up
            </button>
            <button className="header__login" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;

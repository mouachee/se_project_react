import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useEscape from "../../hooks/useEscape";
import Profile from "../Profile/Profile";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterweatherData } from "../../utils/weatherApi";
import CurrentTempChangeUnitContext from "../../contexts/CurrentTempChangeUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import * as api from "../../utils/api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import Login from "../LoginModal/LoginModal";
import Register from "../RegisterModal/RegisterModal";
import EditProfile from "../EditProfileModal/EditProfileModal";
import * as auth from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import ProtectecRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempChangeUnit, setCurrentTempChangeUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleDeleteClick = () => {
    setActiveModal("delete-garment");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, email, password)
      .then(() => auth.signin(email, password))
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Registration failed", err));
  };
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .signin(email, password)
      .then((data) => {
        setToken(data.token);
        setIsLoggedIn(true);
        return auth.checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };
  const handleEditProfile = ({ name, avatar }) => {
    auth
      .editUserInfo(name, avatar)
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };
  const handleDeleteItem = () => {
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItem) =>
          prevItem.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };
  const handleAddItemSubmit = (item) => {
    api
      .addItem(item)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("failed uploading card", error);
      });
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const id = _id;
    const token = getToken();
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };
  useEscape(closeActiveModal);

  const handleToggleSwitchChange = () => {
    setCurrentTempChangeUnit(currentTempChangeUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((error) => {
          console.error("Token validation failed", error);
          removeToken();
          setIsLoggedIn(false);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterweatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTempChangeUnitContext.Provider
          value={{ currentTempChangeUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              handleRegisterClick={handleRegisterClick}
              isLoggedIn={isLoggedIn}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  // pass clothing Items as a prop
                  <Main
                    handleCardClick={handleCardClick}
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectecRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      handleLogOut={handleLogOut}
                    />
                  </ProtectecRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
          />
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              handleCloseClick={closeActiveModal}
              handleDeleteClick={handleDeleteClick}
            />
          )}
          {activeModal === "delete-garment" && (
            <DeleteConfirmModal
              activeModal={activeModal}
              handleCloseClick={closeActiveModal}
              onDelete={handleDeleteItem}
            />
          )}
          {activeModal === "login" && (
            <Login
              closeActiveModal={closeActiveModal}
              activeModal={activeModal}
              handleRegisterClick={handleRegisterClick}
              handleLogin={handleLogin}
            />
          )}
          {activeModal === "register" && (
            <Register
              handleRegistration={handleRegistration}
              closeActiveModal={closeActiveModal}
              activeModal={activeModal}
              handleLoginClick={handleLoginClick}
            />
          )}
          {activeModal === "edit-profile" && (
            <EditProfile
              closeActiveModal={closeActiveModal}
              activeModal={activeModal}
              handleEditProfile={handleEditProfile}
            />
          )}
        </CurrentTempChangeUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

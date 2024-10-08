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
import { Modal } from "../Modal/Modal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTempChangeUnit, setCurrentTempChangeUnit] = useState("F");
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
      .then(() => {
        return auth.signin(email, password);
      })
      .then((data) => {
        setToken(data.token);
        setIsLoggedIn(true);
        return auth.checkToken(data.token);
      })
      .then((userData) => {
        console.log("user data", userData);
        setCurrentUser(userData);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Registration failed", err));
  };
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return Promise.reject(new Error("Email and password are required"));
    }
    return auth
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
        throw error;
      });
  };
  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleEditProfile = ({ name, avatar }) => {
    const makeRequest = () => {
      return auth.editUserInfo(name, avatar).then((user) => {
        setCurrentUser(user);
      });
    };
    handleSubmit(makeRequest);
  };
  const handleAddItemSubmit = (item) => {
    const makeRequest = () => {
      return api.addItem(item).then((newItem) => {
        setClothingItems((prevItem) => [newItem.data, ...prevItem]);
      });
    };
    handleSubmit(makeRequest);
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
          .catch(console.error)
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
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
            isLoading={isLoading}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
          />

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            handleDeleteClick={handleDeleteClick}
          />

          <DeleteConfirmModal
            isOpen={activeModal === "delete-garment"}
            handleCloseClick={closeActiveModal}
            onDelete={handleDeleteItem}
          />

          <Login
            isOpen={activeModal === "login"}
            closeActiveModal={closeActiveModal}
            handleRegisterClick={handleRegisterClick}
            handleLogin={handleLogin}
          />
          <Register
            handleRegistration={handleRegistration}
            isOpen={activeModal === "register"}
            closeActiveModal={closeActiveModal}
            handleLoginClick={handleLoginClick}
          />
          <EditProfile
            isLoading={isLoading}
            isOpen={activeModal === "edit-profile"}
            closeActiveModal={closeActiveModal}
            handleEditProfile={handleEditProfile}
          />
        </CurrentTempChangeUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

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
import { getItems, addItem, deleteItem } from "../../utils/api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import Login from "../LoginModal/LoginModal";
import Register from "../RegisterModal/RegisterModal";
import * as auth from "../../utils/auth";
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

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handleRegistration = ({ name, avatar, email, password }) => {
    console.log(" in registration");
    auth
      .register(name, avatar, email, password)
      .then(() => auth.signin(email, password))
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        closeActiveModal();
        navigate("/");
      })
      .catch((err) => console.error("Registration failed", err));
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .signin(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        closeActiveModal();
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
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
  const handleDeleteItem = () => {
    deleteItem(selectedCard._id)
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
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("failed uploading card", error);
      });
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  useEscape(closeActiveModal);

  const handleToggleSwitchChange = () => {
    setCurrentTempChangeUnit(currentTempChangeUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res.valid) {
            setIsLoggedIn(true);
            setCurrentUser(res.user);
          } else {
            localStorage.removeItem("jwt");
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Token validation failed", error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterweatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
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
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectecRoute>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
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
        </CurrentTempChangeUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

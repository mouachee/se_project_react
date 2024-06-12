import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "../Profile/Profile";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterweatherData } from "../../utils/weatherApi";
import CurrentTempChangeUnitContext from "../../CurrentTempChangeUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem } from "../../utils/api";
import { error } from "jquery";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempChangeUnit, setCurrentTempChangeUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleToggleSwitchChange = () => {
    if (currentTempChangeUnit === "C") setCurrentTempChangeUnit("F");
    if (currentTempChangeUnit === "F") setCurrentTempChangeUnit("C");
  };

  // const onAddItem = (values) => {
  //   console.log(values);
  // };
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
  //console.log(currentTempChangeUnit);
  return (
    <div className="app">
      <CurrentTempChangeUnitContext.Provider
        value={{ currentTempChangeUnit, handleToggleSwitchChange }}
      >
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                // pass clothing Items as a prop
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
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
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
        />
      </CurrentTempChangeUnitContext.Provider>
    </div>
  );
}

export default App;

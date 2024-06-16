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
import { getItems, addItem, deleteItem } from "../../utils/api";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
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
  const handleToggleSwitchChange = () => {
    setCurrentTempChangeUnit(currentTempChangeUnit === "F" ? "C" : "F");
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
  use;
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
                  handleAddClick={handleAddClick}
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
      </CurrentTempChangeUnitContext.Provider>
    </div>
  );
}

export default App;

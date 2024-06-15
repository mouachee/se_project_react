import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

//import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ handleCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothesSection">
      <div className="clothesSection__options">
        <p className="clothesSection__yourItems">Your items</p>
        <button className="clothesSection__addNew" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothesSection__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;

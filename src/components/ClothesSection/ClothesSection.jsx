import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothesSection">
      <div className="clothesSection__options">
        <p className="clothesSection__yourItems">Your items</p>
        <button className="clothesSection__addNew">+ Add New</button>
      </div>
      <ul className="clothesSection__items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              // TODO - pass as prop
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;

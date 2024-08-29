import "./ItemCard.css";
import likeActive from "../../assets/LikeActive.svg";
import likeInactive from "../../assets/LikeInactive.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (event) => {
    event.preventDefault();
    onCardLike({ _id: item._id, isLiked });
  };
  return (
    <li className="card">
      <div className="card__name-like">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <img
            src={isLiked ? likeActive : likeInactive}
            alt={isLiked ? "Unlike" : "Like"}
            className="card__like-button"
            onClick={handleLike}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

import "./ItemCard.css";
import likeActive from "../../assets/LikeActive.svg";
import likeInactive from "../../assets/LikeInactive.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };
  return (
    <li className="card">
      <div className="card__name-like">
        <h2 className="card__name">{item.name}</h2>
        <img
          src={item.isLiked ? likeActive : likeInactive}
          alt={item.isLiked ? "Like" : "Unlike"}
          className="card__like-button"
          onClick={handleLike}
        />
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

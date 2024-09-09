import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Modal } from "../Modal/Modal";
function ItemModal({ isOpen, handleCloseClick, card, handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = currentUser && card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__delete ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  return (
    <Modal
      name="delete"
      isOpen={isOpen}
      onClose={handleCloseClick}
      contentClass="modal__content_type_image"
    >
      <img src={card.imageUrl} alt="card image" className="modal__image" />
      <div className="modal__footer">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
        <button
          type="button"
          className={itemDeleteButtonClassName}
          onClick={handleDeleteClick}
        >
          Delete item
        </button>
      </div>
    </Modal>
  );
}
export default ItemModal;

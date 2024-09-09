import "./DeleteConfirmModal.css";
import { Modal } from "../Modal/Modal";
function DeleteConfirmModal({ isOpen, handleCloseClick, onDelete }) {
  return (
    <Modal
      name="delete"
      isOpen={isOpen}
      onClose={handleCloseClick}
      contentClass="modal__content_type_delete"
    >
      <p className="modal__heading-delete">
        Are you sure you want to delete this item? This action is irreversible.
      </p>
      <button
        onClick={onDelete}
        className="modal__delete-confirm"
        type="submit"
      >
        Yes, delete item
      </button>
      <button
        onClick={handleCloseClick}
        type="submit"
        className="modal__delete-cancel"
      >
        Cancel
      </button>
    </Modal>
  );
}
export default DeleteConfirmModal;

import "./DeleteConfirmModal.css";
function DeleteConfirmModal({ activeModal, handleCloseClick, onDelete }) {
  return (
    <div
      className={`modal ${activeModal === "delete-garment" && "modal_opened"}`}
    >
      <div className="modal__content modal_content_type_delete">
        <button
          onClick={handleCloseClick}
          className="modal__close"
          type="button"
        ></button>
        <p className="modal__heading-delete">
          Are you sure you want to delete this item? This action is
          irreversible.
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
      </div>
    </div>
  );
}
export default DeleteConfirmModal;

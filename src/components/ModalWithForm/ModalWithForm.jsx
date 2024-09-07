import "./ModalWithForm.css";
import { Modal } from "../Modal/Modal";
function ModalWithForm({
  buttonText,
  title,
  handleCloseClick,
  isOpen,
  onSubmit,
  isSubmitDisabled,
  showLink,
  linkText,
  onLinkClick,
  children,
}) {
  return (
    <Modal name="with-form" isOpen={isOpen} onClose={handleCloseClick}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" onSubmit={onSubmit}>
        {children}
        <div className="modal__actions">
          <button
            type="submit"
            className={`modal__submit ${
              isSubmitDisabled ? "modal__submit_disabled" : ""
            }`}
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
          {showLink && (
            <span onClick={onLinkClick} className="modal__link">
              {linkText}
            </span>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;

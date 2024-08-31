import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  handleCloseClick,
  isOpen,
  onSubmit,
  isSubmitDisabled,
  showLink,
  linkText,
  onLinkClick,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        />
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__actions">
            <button
              type="submit"
              className={`modal__submit ${
                isSubmitDisabled && "modal__submit_disabled"
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
      </div>
    </div>
  );
}
export default ModalWithForm;

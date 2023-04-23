import React from 'react';
function PopupWithForm({ name, isOpen, onClose, id, title, children, submitButtonText }) {

  const stopPropagation = (event) => event.stopPropagation();

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
      <div 
        className='popup__container' 
        onClick={stopPropagation}
      >
        <button
          className='popup__button-close popup__close'
          type='button'
          aria-label='Закрыть pop-up'
          onClick={onClose}
        >
        </button>
        <form
          className={`popup__form popup__form_${name}`}
          name={name}
          id={id}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className='popup__button-save popup__button-submit'
            type='submit'
          >
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

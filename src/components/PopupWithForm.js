import React from 'react';
function PopupWithForm(props) {

  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}
    >
      <div 
        className='popup__container' 
      >
        <button
          className='popup__button-close popup__close'
          type='button'
          aria-label='Закрыть pop-up'
          onClick={props.onClose}
        >
        </button>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          id={props.id}
          onSubmit={props.onSubmit}
          noValidate
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button
            className='popup__button-save popup__button-submit'
            type='submit'
          >
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

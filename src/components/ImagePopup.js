import React from 'react';

function ImagePopup({ name, isOpen, onClose, card }) {

  const stopPropagation = (event) => event.stopPropagation();
  
  return (
    <div 
      className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
      onClick={onClose}
    >
      <div className="popup__container-view" 
      onClick={stopPropagation}
      >
        <button 
          className="popup__button-close popup__close" 
          type="button" 
          aria-label="Закрыть pop-up"
          onClick={onClose}
        >
        </button>
        <figure className="popup__figure">
          <img 
            className="popup__photo" 
            src={card ? card.link : ''} 
            alt={card ? card.name : ''}
          />
          <figcaption 
            className="popup__photo-caption"
          >
            {card ? card.name : ''}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
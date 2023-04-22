import React from 'react';

function ImagePopup(props) {
  
  return (
    <div className="popup popup_item_photo-view popup_opened">
      <div className="popup__container-view">
        <button 
          className="popup__button-close popup__close" 
          type="button" 
          aria-label="Закрыть pop-up"
          onClick={props.onClose}
        >
        </button>
        <figure className="popup__figure">
          <img 
            className="popup__photo" 
            src={props.card.link} 
            alt={props.card.name}
          />
          <figcaption 
            className="popup__photo-caption">{props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [popups, setPopups] = useState({
    isEditAvatarPopupOpen: false,
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    selectedCard: null,
  });

  const handleCardClick = (props) => {
    setPopups({ ...popups, selectedCard: props });
  };

  const handlePopupStateChange = (popup, state) => {
    setPopups({ ...popups, [popup]: state });
  };

  const closeAllPopups = () => {
    setPopups({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: null,
    });
  };

  return (
    <div className="page">
      <Header />

      <Main
        onEditProfile={() => handlePopupStateChange("isEditProfilePopupOpen", true)}
        onAddPlace={() => handlePopupStateChange("isAddPlacePopupOpen", true)}
        onEditAvatar={() => handlePopupStateChange("isEditAvatarPopupOpen", true)}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
      />

      <Footer />

      <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        isOpen={popups.isEditAvatarPopupOpen && 'popup_opened'}
        onClose={closeAllPopups}
           
      >
        <input
          className='popup__input popup__input_avatar_url'
          id='avatar-url'
          name='data'
          placeholder='Ссылка на картинку'
          type='url'
          required
        />
        <span className='avatar-url-error popup__input-error popup__error'></span>
      </PopupWithForm>

      <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        isOpen={popups.isEditProfilePopupOpen && 'popup_opened'}
        onClose={closeAllPopups}
        
      >
        <input
          className='popup__input popup__input_profile_name'
          id='name-input'
          name='name'
          placeholder='Имя'
          type='text'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='name-input-error popup__input-error popup__error'>
        </span>

        <input
          className='popup__input popup__input_profile_about'
          id='about-input'
          name='about'
          placeholder='О себе'
          type='text'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='about-input-error popup__input-error popup__error'>
        </span>
      </PopupWithForm>

      <PopupWithForm
        title='Новое место'
        name='item'
        isOpen={popups.isAddPlacePopupOpen && 'popup_opened'}
        onClose={closeAllPopups}
        
      >
        <input
          className='popup__input popup__input_item_title'
          id='item-title'
          name='title'
          placeholder='Название'
          type='text'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='item-title-error popup__input-error popup__error'>
        </span>

        <input
          className='popup__input popup__input_item_url'
          id='item-url'
          name='url'
          placeholder='Ссылка на картинку'
          type='url'
          required
        />
        <span className='item-url-error popup__input-error popup__error'>
        </span>
      </PopupWithForm>

      <PopupWithForm
        name='delete-card'
        title='Вы уверены?'
      />
      
      {popups.selectedCard && (
        <ImagePopup
          name='photo-view'
          card={popups.selectedCard}
          onClose={closeAllPopups}
        />
      )};

    </div>
  );
}

export default App;


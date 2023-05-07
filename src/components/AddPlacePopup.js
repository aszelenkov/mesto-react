import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }

  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
        title='Новое место'
        name='item'
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText='Создать'
        onSubmit={handleSubmit}
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
          value={name || ''}
          onChange={handleChangeName}
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
          value={link || ''}
          onChange={handleChangeLink}
        />
        <span className='item-url-error popup__input-error popup__error'>
        </span>
      </PopupWithForm>
  )
}

export default AddPlacePopup
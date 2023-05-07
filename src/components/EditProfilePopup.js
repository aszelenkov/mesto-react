import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        isOpen={props.isOpen}
        onClose={props.onClose}
        submitButtonText='Сохранить'
        onSubmit={handleSubmit}
        
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
          value={name || ''}
          onChange={handleChangeName}
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
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className='about-input-error popup__input-error popup__error'>
        </span>
      </PopupWithForm>
  )  
}

export default EditProfilePopup
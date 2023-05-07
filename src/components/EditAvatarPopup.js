import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
  
  return (
    <PopupWithForm
        name='edit-avatar'
        title='Обновить аватар'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        submitButtonText='Сохранить'
           
      >
        <input
          className='popup__input popup__input_avatar_url'
          id='avatar-url'
          name='avatar'
          placeholder='Ссылка на картинку'
          type='url'
          ref={avatarRef}
          required
        />
        <span className='avatar-url-error popup__input-error popup__error'></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup
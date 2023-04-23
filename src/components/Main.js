import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  const handleError = (err) => console.log(`Ошибка: ${err}`);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getItems()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch(handleError);
  }, []);

  return (
    <main className='content'>

      <section className='profile'>
        <div 
          className='profile__avatar-block' 
          onClick={props.onEditAvatar}
        >
          <img 
            className='profile__avatar' 
            src={userAvatar} 
            alt='Аватар профиля'
          />
        </div>

        <div className='profile__info'>
          <h1 className='profile__name'>{userName}</h1>
          <p className='profile__about'>{userDescription}</p>
          <button 
            className='profile__button-edit' 
            type='button' 
            aria-label='Редактировать профиль'
            onClick={props.onEditProfile}
          >
          </button>
        </div>

        <button 
          className='profile__button-add-item' 
          type='button' 
          aria-label='Добавить новое место'
          onClick={props.onAddPlace}
          >
          </button>
      </section>

      <section 
        className='elements' 
        aria-label='Секция с карточками'
      >
        <ul className='elements__cards'
        >
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
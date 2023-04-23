function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <li className="elements__item">
      <img
        className="elements__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <h2 className="elements__title">{card.name}</h2>
      <div className="elements__like-block">
        <button className="elements__like" type="button"></button>
        <p className="elements__like-counter">{card.likes.length}</p>
      </div>
      <button className="elements__trash" type="button"></button>
    </li>
  );
}

export default Card;

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {

  const [popups, setPopups] = useState({
    isEditAvatarPopupOpen: false,
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isPhotoViewPopupOpen: false,
    isDeleteCardPopupOpen: false,
    selectedCard: null,
    deletedCard: null
  });

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handlePopupStateChange = (popup, state) => {
    setPopups({ ...popups, [popup]: state });
  };

  const closeAllPopups = () => {
    setPopups({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isPhotoViewPopupOpen: false,
      isDeleteCardPopupOpen: false,
      selectedCard: null,
      deletedCard: null
    });
  };

  const handleError = (err) => console.log(`Ошибка: ${err}`);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getItems()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(handleError);
  }, []);

  const handleCardClick = (card) => {
    setPopups({ ...popups, isPhotoViewPopupOpen: true, selectedCard: card });
  };

  const handleDeleteCardClick = (card) => {
    setPopups({ ...popups, isDeleteCardPopupOpen: true, deletedCard: card });
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(handleError);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(handleError) 
  };

  const handleUpdateAvatar = ({avatar}) => {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleError)
  };

  const handleUpdateUser = ({ name, about }) => {
    api
    .setUserInfo({ name: name, about: about })
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(handleError)
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .setItem({ name: name, link: link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleError)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      
      <Header />

      <Main
        onEditAvatar={() => handlePopupStateChange("isEditAvatarPopupOpen", true)}
        onEditProfile={() => handlePopupStateChange("isEditProfilePopupOpen", true)}
        onAddPlace={() => handlePopupStateChange("isAddPlacePopupOpen", true)}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteCardClick}
        cards={cards}
        onClose={closeAllPopups}
      />

      <Footer />

      <EditAvatarPopup 
        onUpdateAvatar={handleUpdateAvatar} 
        isOpen={popups.isEditAvatarPopupOpen} 
        onClose={closeAllPopups} 
      />

      <EditProfilePopup 
        onUpdateUser={handleUpdateUser} 
        isOpen={popups.isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
      /> 

      <AddPlacePopup 
        onAddPlace={handleAddPlaceSubmit} 
        isOpen={popups.isAddPlacePopupOpen} 
        onClose={closeAllPopups} 
      />

      <DeleteCardPopup 
        onDeleteCard={handleCardDelete} 
        isOpen={popups.isDeleteCardPopupOpen} 
        deletedCard={popups.deletedCard}
        onClose={closeAllPopups} 
      />

      <ImagePopup
        isOpen={popups.isPhotoViewPopupOpen}
        card={popups.selectedCard}
        onClose={closeAllPopups}
      />
      
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;


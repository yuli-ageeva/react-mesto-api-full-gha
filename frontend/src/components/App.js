import React from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import api from "../utils/Api";
import CurrentUserContext from "../context/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
import * as auth from "../utils/auth";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUserInfo, dataCards]) => {
        setCurrentUser(dataUserInfo);
        setCards(dataCards);
      })
      .catch((error) => {
        console.log(error);
      });

    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem('token');
        });
    }
  }, [navigate, token]);


  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(userInfo) {
    api.setNewInfo(userInfo)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    api
      .setNewAvatar(avatarInfo)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((addedCard) => {
        setCards([addedCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleInfoToolTipPopupOpen = () => {
    setInfoToolTipPopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  }

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem('email', email);
        localStorage.setItem('token', data.token);
        setCurrentUser(data);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const userEmail = localStorage.getItem('email');

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        handleInfoToolTipPopupOpen();
        navigate('/sign-in');
      })
      .catch((error) => {
        console.log(error);
        handleInfoToolTipPopupOpen();
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    setCurrentUser({});
    setLoggedIn(false);
    navigate('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="root">
        <div className="root__content">
          <Header loggedIn={loggedIn} userEmail={userEmail} onSignOut={handleSignOut}/>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />}
            />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}/>
            <Route path="/sign-up" element={<Register handleRegister={handleRegister}/>}/>
            <Route path="*" element={loggedIn ? <Navigate to="/" replace/> : <Navigate to="/sign-in" replace/>}/>
          </Routes>
          <Footer/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                            onUpdateUser={handleUpdateUser}>
          </EditProfilePopup>
          <AddPlacePopup isOpen={isAddPlacePopupOpen}
                         onClose={closeAllPopups}
                         onAddPlace={handleAddPlaceSubmit}>
          </AddPlacePopup>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <div className="popup popup_confirm">
            <div className="popup__container popup__container-confirm">
              <button className="popup__close-button" type="button" aria-label="закрыть"></button>
              <h2 className="popup__heading-confirm">Вы уверены?</h2>
              <button className="popup__confirm-button" type="submit">Да</button>
            </div>
          </div>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                           onClose={closeAllPopups}
                           onUpdateAvatar={handleUpdateAvatar}/>
        </div>
        <InfoToolTip isOpen={isInfoToolTipPopupOpen}
                     isSuccess={isSuccess}
                     onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

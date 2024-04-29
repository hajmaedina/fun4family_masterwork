import React, { useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ContactUs from "../ContactUs/ContactUs";

export default function Navbar(props) {
  const {
    userId,
    setUserId,
    currentUsername,
    setCurrentUsername,
    currentToken,
    setCurrentToken,
    myStorage,
  } = props;
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
    setCurrentToken(null);
    myStorage.removeItem("token");
    setUserId(null);
    myStorage.removeItem("userId");
  };

  const handleRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowContact(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowContact(false);
  };

  const handleContact = () => {
    setShowContact(true);
    setShowRegister(false);
    setShowLogin(false);
  };

  return (
    <div>
      {currentUsername && currentToken ? (
        <div className="logged-in-navbar">
          <div className="profile">
            <Link id="button-profile" to={`/users/${userId}`}>
              <button className="button profile">
                <PersonIcon id="personIcon" />
                Adataim
              </button>
            </Link>
          </div>
          <button className="button logout" onClick={handleLogout}>
            Kijelentkezés
          </button>
          <button className="button contact" onClick={handleContact}>
            Kapcsolat
          </button>
        </div>
      ) : (
        <div className="visitor-navbar">
          <button className="button login" onClick={handleLogin}>
            Bejelentkezés
          </button>
          <button className="button register" onClick={handleRegister}>
            Regisztráció
          </button>
          <button className="button contact" onClick={handleContact}>
            Kapcsolat
          </button>
        </div>
      )}
      {showRegister && (
        <Register
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
          myStorage={myStorage}
          setCurrentUsername={setCurrentUsername}
        />
      )}
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setUserId={setUserId}
          setCurrentUsername={setCurrentUsername}
          setCurrentToken={setCurrentToken}
          myStorage={myStorage}
          currentUsername={currentUsername}
        />
      )}
      {showContact && <ContactUs setShowContact={setShowContact} />}
    </div>
  );
}

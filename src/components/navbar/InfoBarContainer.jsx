import showJumpscare from '../util/navbar/Jumpscare.jsx';
import './InfoBarContainer.css';
import ChromecastConnection from '../util/navbar/Chromecast.jsx';
import { MusicUI } from '../util/navbar/Music.jsx';
import { useState } from 'react';

const InfoBar_PopUp = ({ className = "", setCharacterSkin = "" }) => {

  // feedback
  const copy = (e) => {
    try {
      navigator.clipboard.writeText(e.target.name);
      document.getElementById("popup_info").textContent = `${e.target.textContent} has been copied!`;
    } catch (ex) {
      console.error(ex);
      document.getElementById("popup_info").textContent = 'An error has occurred, please try again later...';
    }
  };

  // customize
  const changeSkin = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      setCharacterSkin(`/${file.name}`);
    } else {
      setCharacterSkin('/characterWB.png');
    }
  };

  // customize
  const resetSkin = () => {
    setCharacterSkin('/characterWB.png');
  };

  // profil
  const usrenameHandler = (e) => {
    const username = document.getElementById('username-input').value;
    localStorage.setItem("bestScoreUsername", username);
    window.location = window.location.href;
  }



  /* ############ AFFICHAGE ############ */

  switch (className) {
    case "home":
      return showJumpscare(false);

    case "help":
      return (
        <div className="flex-column-center-gap">
          <h1 className="text-black h1-large">
            The objective of this game is to <b className="underline">kill</b> the enemies <b className="text-red">(red squares)</b> before they <b className="text-white">touch the white line.</b>
          </h1>
          <h1 className="text-black h1-large">
            You can change your avatar by clicking on the '<b className="underline">customize tab</b>' on the left!
          </h1>
          <h1 className="text-black h1-large">
            If you click on <b className="text-blue">'MUSIC'</b>, you can <b className="underline">add</b> and <b className="underline">remove</b> songs!
          </h1>
        </div>
      );

    case "music":
      return MusicUI();

    case "feedback":
      return (
        <div className="grid-center-rows">
          <h1 id="popup_info" className="popup-info">FEEDBACK BY ...</h1>
          <button name="kevin.jean26@gmail.com" onClick={copy} className="feedback-button">GMAIL</button>
          <button name="https://github.com/420-411-MV/cls411-jeu23" onClick={copy} className="feedback-button">GITHUB</button>
        </div>
      );

    case "customize":
      return (
        <div className="customize-container">
          <label htmlFor="skinURL" className="customize-label">Click To Change Character Skin</label>
          <input id="skinURL" onChange={changeSkin} type="file" />
          <button id="skinCancel" onClick={resetSkin}>Reset Character Skin</button>
        </div>
      );

    case "chromeCast":
      return <ChromecastConnection />

    case "profil":
      if (localStorage.getItem("bestScoreUsername") == null) {
        return (
          <div className="profil-container">
            <h1 className="profil-label" style={{ color: "black" }}>who are you?</h1>
            <input id='username-input' className="profil-input" type="text" placeholder='Username displayed with your score...' />
            <button className="profil-btn" onClick={usrenameHandler}>confirm</button>
          </div>
        );
      } else {
        return (
          <div className="profil-container">
            <h1 className="profil-label" style={{ color: "black" }}>Welcome <a>{localStorage.getItem("bestScoreUsername")}</a> !</h1>
            <input id='username-input' className="profil-input" type="text" placeholder='Change your name here' />
            <button className="profil-btn" onClick={usrenameHandler}>confirm</button>
          </div>
        );
      }

    default:
      return <h1 className="default-message"><a>--- WELCOME ---</a>Click on any tab (left side) to discover its secrets.</h1>;
  }
};

export default InfoBar_PopUp;

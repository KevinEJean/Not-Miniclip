import './Navbar.css';
import InfoBar_PopUp from './InfoBarContainer.jsx';
import { useState } from 'react';

function Navbar({ setCharacterSkin }) {

  const [className, setClassName] = useState("");
  let pathName = window.location.pathname;

  const homeHandler = () => {
    setClassName("home");
  }

  const helpHandler = () => {
    setClassName("help");
  }

  const helpHandlerChess = () => {
    setClassName("helpChess");
  }

  const musicHandler = () => {
    setClassName("music");
  }

  const feedbackHandler = () => {
    setClassName("feedback");
  }

  const customizekHandler = () => {
    setClassName("customize");
  }

  const profilHandler = () => {
    setClassName("profil");
  }

  const chromeCastHandler = () => {
    setClassName("chromeCast");
  }

  if (pathName === '/chess') {
    return (
      <div className='navbar-root-chess'>
        <button onClick={homeHandler}>Home</button>
        <button onClick={helpHandlerChess}>Help</button>
        <button onClick={musicHandler}>Music</button>
        <button onClick={feedbackHandler}>Feedback</button>
        <button onClick={customizekHandler}>Customize</button>
        <button onClick={profilHandler}>Who are you?</button>
        <div className='info-bar-chess'>
          <InfoBar_PopUp className={className} />
        </div>
      </div>
    );
  } else {

    return (
      <>
        <div className='navbar-root'>
          <button onClick={homeHandler}>Home</button>
          <button onClick={helpHandler}>Help</button>
          <button onClick={musicHandler}>Music</button>
          <button onClick={feedbackHandler}>Feedback</button>
          <button onClick={customizekHandler}>Customize</button>
          <button onClick={profilHandler}>Who are you?</button>
          <button onClick={chromeCastHandler}>Chromecast</button>
        </div>
        <div className='info-bar'>
          <InfoBar_PopUp className={className} setCharacterSkin={setCharacterSkin} />
        </div>
      </>
    )
  }
}

export default Navbar;
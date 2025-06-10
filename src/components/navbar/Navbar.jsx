import './Navbar.css';
import InfoBar_PopUp from './InfoBarContainer.jsx';
import { useState } from 'react';

function Navbar({ setCharacterSkin }) {

  const [className, setClassName] = useState("");

  const homeHandler = () => {
    setClassName("home");
  }

  const helpHandler = () => {
    setClassName("help");
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

  const chromeCastHandler = () => {
    setClassName("chromeCast");
  }

  const profilHandler = () => {
    setClassName("profil");
  }

  return (
    <>
      <div className='navbar-root'>
        <button onClick={homeHandler}>Home</button>
        <button onClick={helpHandler}>Help</button>
        <button onClick={musicHandler}>Music</button>
        <button onClick={feedbackHandler}>Feedback</button>
        <button onClick={customizekHandler}>Customize</button>
        <button onClick={profilHandler}>Who am I?</button>
        {/* <button onClick={chromeCastHandler}>Chromecast</button>  */}
      </div>
      <div className='info-bar'>
        <InfoBar_PopUp className={className} setCharacterSkin={setCharacterSkin} />
      </div>
    </>
  )
}

export default Navbar;
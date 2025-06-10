// src/main.jsx
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import PixiCanvas from './components/PixiCanvas.jsx';
import NavBar from './components/navbar/Navbar.jsx';
import MusicPlayer, { MusicPlayerProvider } from './components/util/navbar/Music.jsx';
import './index.css';

function App({ castContext }) {

  const [characterSkin, setCharacterSkin] = useState('/characterWB.png');

  return (
    <>
      <MusicPlayer bypass={false} />
      <NavBar setCharacterSkin={setCharacterSkin} />
      <h1
        className='bestScore'>
        Current record held by <a>{localStorage.getItem("bestScoreUsername")}</a> : <u>{localStorage.getItem("bestScore")}</u>
      </h1>
      <div className='game-canvas'>
        <PixiCanvas castContext={castContext} characterSkin={characterSkin} />
      </div>
      <div className='navbar-footer'>
        <p>
          <strong>
            Copyright 1999-{new Date().getFullYear()} by <a href="https://github.com/KevinEJean" target="_blank">THE ONE AND ONLY</a>. All Rights Reserved.
            {` ${document.title}`} is powered by my massive intelectual prowess.
          </strong>
        </p>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MusicPlayerProvider>
    <App />
  </MusicPlayerProvider>
);

// window.onload = () => {
//   const context = cast.framework.CastReceiverContext.getInstance();
//   const options = new cast.framework.CastReceiverOptions();
//   const CHANNEL = 'urn:x-cast:testChannel';
//   options.customNamespaces = Object.assign({});
//   options.customNamespaces[CHANNEL] = cast.framework.system.MessageType.JSON;
//   options.disableIdleTimeout = true;

//   context.addEventListener(
//     cast.framework.system.EventType.READY,
//     () => {
//       console.log('[RECEIVER] Receiver prêt !');
//       root.render(<App castContext={context} />);
//     }
//   );

//   context.start(options);
// };

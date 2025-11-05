// src/main.jsx
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import PixiCanvas from './components/PixiCanvas.jsx';
import NavBar from './components/navbar/Navbar.jsx';
import MusicPlayer, { MusicPlayerProvider } from './components/util/navbar/Music.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChessGame from './components/ChessCanvas.jsx';

function App({ castContext }) {

  const [characterSkin, setCharacterSkin] = useState('/characterWB.png');

  return (
    <>
      <BrowserRouter>
        <div className='main-layout-grid3x2'>
          <MusicPlayer bypass={false} />
          <NavBar setCharacterSkin={setCharacterSkin} />
        </div>

        <div className='navbar-footer'>
          <p>
            <strong>
              Copyright 1999-{new Date().getFullYear()} by <a href="https://github.com/KevinEJean" target="_blank">THE ONE AND ONLY</a>. All Rights Reserved.
              {` ${document.title}`} is powered by my intelectual prowess.
            </strong>
          </p>
        </div>

        <Routes>
          <Route path='/' element={<PixiCanvas />} />
          <Route path='/chess' element={<ChessGame />} />
        </Routes>
      </BrowserRouter>
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

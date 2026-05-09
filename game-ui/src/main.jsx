import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { GameProvider } from './context/GameContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <GameProvider><App /></GameProvider>
  </HashRouter>
);

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

//IMPORT SCREENS
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/game' element={<Game />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

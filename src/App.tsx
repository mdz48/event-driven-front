import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './presentation/pages/Home';
import Kitchen from './presentation/pages/Kitchen';
import Navbar from './presentation/components/Navbar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cocina" element={<Kitchen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
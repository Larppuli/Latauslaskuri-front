import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Kotivalikko from './Components/Kotivalikko';
import Latauslaskuri from './Components/Latauslaskuri';
import Navbar from './Components/Navbar';
import Paivakirja from './Components/Paivakirja';
import Asetukset from './Components/Asetukset';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Kotivalikko />} />
        <Route path="/latauslaskuri" element={<Latauslaskuri />} />
        <Route path="/ajopaivakirja" element={<Paivakirja />} />
        <Route path="/asetukset" element={<Asetukset />} />
      </Routes>
    </Router>
  );
}

export default App;
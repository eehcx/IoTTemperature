import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import About from './pages/About';
import Temp from './pages/Main';
import Use from './pages/Use';
import Colaborators from './pages/Colaborators';
import School from './pages/School';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/temperature" element={<Temp />} />
        <Route path="/documentation" element={<Use />} />
        <Route path="/colaborators" element={<Colaborators />} />
        <Route path="/school" element={<School />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
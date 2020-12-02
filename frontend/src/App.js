import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Examples from './pages/Examples';
import Home from './pages/Home';
import QueryPages from './pages/QueryPages';
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/query/*" element={<QueryPages />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

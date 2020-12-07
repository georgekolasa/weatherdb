import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QueryPages from './pages/QueryPages';
import About from './pages/About';
import Lost from './pages/Lost';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/query/*" element={<QueryPages />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Lost />} />
      </Routes>
    </BrowserRouter>
  );
}

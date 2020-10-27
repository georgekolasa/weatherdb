import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Examples from './pages/Examples';
import Home from './pages/Home';
import QueryPages from './pages/QueryPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/query/*" element={<QueryPages />} />
      </Routes>
    </BrowserRouter>
  );
}

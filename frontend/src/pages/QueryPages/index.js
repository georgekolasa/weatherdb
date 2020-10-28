import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../components/Header/Header';
import QueryBuilder from './QueryBuilder';
import QueryResults from './QueryResults';

export default function () {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<QueryBuilder />} />
        <Route path="results" element={<QueryResults />} />
      </Routes>
    </React.Fragment>
  );
}

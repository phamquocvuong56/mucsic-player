import './App.scss';
import React from 'react';
import {
  NotFound,
  MusicPlayer,
} from './components/index';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MusicPlayer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

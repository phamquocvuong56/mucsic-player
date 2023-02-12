import './App.scss';
import React from 'react';
import {
  NotFound,
  MusicPlayer,
  // Home
} from './components/index';
import { Route, RouterProvider, createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import {MusicLoader} from '../src/components/MusicPlayer'

const router= createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<Home />} >
    <Route >
      <Route path="/" loader={MusicLoader} element={<MusicPlayer />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

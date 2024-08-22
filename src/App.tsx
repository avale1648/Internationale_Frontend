import React from 'react';
import './App.css';
import { PostsPage } from './pages/PostsPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UsersPage } from './pages/UsersPage';

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Navigate to='/posts/date'/>}>
      </Route>
      <Route path='/posts/new' element={<PostsPage sorting='new'/>}/>
      <Route path='/posts/popular' element={<PostsPage sorting='popular'/>}></Route>
      <Route path='/users' element={<UsersPage/>}></Route>
     </Routes>
    </BrowserRouter>
  );
}

//const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
//root.render(<App/>);
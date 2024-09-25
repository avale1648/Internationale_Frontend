import React from 'react';
import './App.css';
import { PostsPage } from './pages/PostsPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UsersPage } from './pages/UsersPage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { PostPage } from './pages/PostPage';
import { UserPage } from './pages/UserPage';
import { CommunityPage } from './pages/CommunityPage';
import { SignupPage } from './pages/auth/SignupPage';
import { SigninPage } from './pages/auth/SigninPage';
import { PostFormPageEdit, PostFormPageUser } from './pages/PostFormPage';
import { SubmitCommunityPage } from './pages/SubmitCommunityPage';
import { PostFormPageCommunity } from './pages/PostFormPage';
import { EditUserPage } from './pages/UserPages';

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Navigate to='/posts/new'/>}/>
      <Route path='/posts/new' element={<PostsPage sorting='new'/>}/>
      <Route path='/posts/popular' element={<PostsPage sorting='popular'/>}/>
      <Route path='/posts/subscribed' element={<h1>Unimplemented page</h1>}/>
      <Route path='/posts/:id' element={<PostPage/>}/>
      <Route path='/posts/submit' element={<PostFormPageUser/>}/>
      <Route path='/posts/submit/communities/:id' element={<PostFormPageCommunity/>}/>
      <Route path='/posts/edit/:id' element={<PostFormPageEdit/>}/>
      <Route path='/users' element={<UsersPage/>}/>
      <Route path='/users/:name' element={<UserPage/>}/>
      <Route path='/users/:name/edit' element={<EditUserPage/>}/>
      <Route path='/communities' element={<CommunitiesPage/>}/>
      <Route path='/communities/:name' element={<CommunityPage/>}/>
      <Route path='/communities/submit' element={<SubmitCommunityPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/signin' element={<SigninPage/>}/>
      <Route path='/messages' element={<h1>Unimplemented page</h1>}/>
      <Route path='/about' element={<h1>Unimplemented page</h1>}/>
      <Route path='*' element={<Navigate to='/posts/new'/>}/>
     </Routes>
    </BrowserRouter>
  );
}
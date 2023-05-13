

import './App.css';
import React, {  useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route,Navigate, } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetails from './components/userdetail';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [token,setToken]=useState("")
  useMemo(()=>{
setToken(localStorage.getItem("token"))
  },[token])

  return (

    <div>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={
      token ? <Navigate to="/upload-img"/>:<Login setToken={setToken} />
     } />
     <Route path="/sign-up" element={
     token ? <Navigate to="/upload-img"/>:<Signup setToken={setToken}/> 
     } />
     <Route path="/upload-img" element={  token?<UserDetails setToken={setToken} />:<Navigate to="/"/>}/>
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
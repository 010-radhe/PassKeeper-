import React, { useEffect } from "react";
import './App.css';
import {Outlet } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setName, setEmail, setPasswords } from "./redux/actions";
import { checkAuthenticated } from "./axios/instance";
 

function App()
{

  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch(); 
  useEffect(() =>
  {
    const verifyUser = async () =>
    {
      try
      {
        const res = await checkAuthenticated();
        
        if (res.status !== 200)
        {
          dispatch(setAuth(false));
        }
        else
        {
          const { name, email, passwords } = res.data;

          dispatch(setAuth(true));
          dispatch(setName(name));
          dispatch(setEmail(email));
          dispatch(setPasswords(passwords));
        }
      }
      catch (error)
      {
        dispatch(setAuth(false));
        // console.log("error is ",error)
      }
    }
    verifyUser();
  }, [isAuthenticated, dispatch]);

  return (
    <div className="App">
         <Navbar />
         <Outlet/>
   </div>
  );
}

export default App;

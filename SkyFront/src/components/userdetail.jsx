import React, { useEffect, useMemo, useState } from 'react'
import "./userdetails.css";
import asyncPostCall from "../service.js";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function UserDetails({ setToken }) {
    const navigate = useNavigate();
  let token = "Bearer " + localStorage.getItem("token");
  const [userData, setUserData] = useState({});
  const [toggleB, setToggleB] = useState(false);
  const [toggleH, setToggleH] = useState(true);
  console.log(userData, "hg")
  const getUserRes = async () => {
    const data = await asyncPostCall("/users/profile", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },

    });

    if (JSON.stringify(data) != {}) {
      setUserData(data);
    } else {
      return;
    }
  }
  useEffect(() => {
    getUserRes();
  }, [])

  const CancelHandle = () => {
    setToggleH(true);
    setToggleB(false);
    getUserRes();
  }
  const ClickHnadelEdit = () => {
    setToggleB(true);
    setToggleH(false);
  }
  const Logouthandle=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  const handleuserDataOnchange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

  }
  const SaveHandle = async () => {
    let req = {
      fullName: userData?.fullName,
      location: userData?.location,
      About: userData?.About
    }
    const data = await asyncPostCall("/users/update", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify(req)
    });
    if (JSON.stringify(data) != {}) {

      toast.success("Updated Successfully");
      setUserData(data)
      setToggleB(false);
      setToggleH(true);
      return;
    } else {
      return;
    }

  }

  return (
    <div className='ImageContainer'>
      <div className='top-container'>
        {toggleH && <button onClick={ClickHnadelEdit} className='edit-btn'>Click Edit user Details</button>}
        {toggleH && <button onClick={Logouthandle} className='cancel-btn'>Logout</button>
        }
      </div>
      <div className='bottom-container'>
        <div className='text-about'><h4>fullName:</h4><input type='text' name='fullName' value={userData?.fullName} disabled={toggleH} onChange={(e) => handleuserDataOnchange(e)} /></div>
        <div className='text-about'><h4>location:</h4>&nbsp;&nbsp;<input type='text' name="location" value={userData?.location} disabled={toggleH} onChange={(e) => handleuserDataOnchange(e)} /></div>
        <div className='text-about'><h4>About:</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea rows="4" cols="21" name="About" value={userData?.About} disabled={toggleH} onChange={(e) => handleuserDataOnchange(e)}   >
        </textarea></div>

        {toggleB && <div className='btn'>
          <button onClick={CancelHandle} className='cancel-btn'>Cancel</button><button className='edit-btn' onClick={SaveHandle}>Save</button>
        </div>}
      </div>
    </div>
  )
}

export default UserDetails;
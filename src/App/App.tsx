import React, {useEffect} from 'react';
import logo from '../logo.svg';
import './App.css';
import Login from "../features/auth/login/Login";
import {Route, Routes} from "react-router-dom";
import Registration from "../features/auth/registration/Registration";
import Forgot from "../features/auth/Forgot/Forgot";
import Profile from "../features/Profile/Profile";
import {useAppDispatch} from "./store";
import {getAuthUserDataTC} from "../features/auth/authSlice";
import SetNewPassword from "../features/auth/Forgot/SetNewPassword";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAuthUserDataTC())

    }, [])
    return (
        <div className="App">
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/registration"} element={<Registration/>}/>
                <Route path={"/forgot"} element={<Forgot/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/set-newpassword/:token"} element={<SetNewPassword/>}/>
            </Routes>
        </div>
    );
}

export default App;

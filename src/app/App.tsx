import './App.css';
import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./store";
import {getAuthUserDataTC} from "features/auth/authSlice";
import {Preloader} from "common/components/preloader/Preloader";
import {ErrorSnackbar} from "common/error-snackbar/ErrorSnackbar";
import {Container} from "@mui/material";
import Header from "common/components/header/Header";
import Profile from "features/profile/Profile";
import Packs from "features/packs/Packs";
import Cards from "features/cards/Cards";
import Login from "features/auth/login/Login";
import Registration from "features/auth/registration/Registration";
import Forgot from "features/auth/forgot/Forgot";
import SetNewPassword from "features/auth/forgot/SetNewPassword";
import PrivateRoutes from "routes/PrivateRoutes";

function App() {
    const isInit = useAppSelector(state => state.app.isInit)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAuthUserDataTC())
    }, [])
    if (!isInit) {
        return <Preloader/>
    }
    return (
        <div className="App">
            <Header/>
            <Container style={{maxWidth: 1100}}>
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path={"/profile"} element={<Profile/>}/>
                        <Route path={"/cards/packs"} element={<Packs/>}/>
                        <Route path={"/cards/packs/:params"} element={<Packs/>}/>
                        <Route path={"/cards/pack/:packId"} element={<Cards/>}/>
                    </Route>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/registration"} element={<Registration/>}/>
                    <Route path={"/forgot"} element={<Forgot/>}/>
                    <Route path={"/set-newpassword/:token"} element={<SetNewPassword/>}/>
                    <Route path={"/"} element={<Login/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
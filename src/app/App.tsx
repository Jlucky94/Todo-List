import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Registration from "../features/auth/registration/Registration";
import Forgot from "../features/auth/Forgot/Forgot";
import Profile from "../features/profile/Profile";
import {useAppDispatch, useAppSelector} from "./store";
import {getAuthUserDataTC} from "../features/auth/authSlice";
import SetNewPassword from "../features/auth/Forgot/SetNewPassword";
import {Preloader} from "../common/components/preloader/Preloader";
import {ErrorSnackbar} from "../common/error-snackbar/ErrorSnackbar";
import Login from "../features/auth/login/Login";
import PrivateRoutes from "../routes/PrivateRoutes";
import {Container} from "@mui/material";

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
            <Container  fixed style={{maxWidth: 1100}}>
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path={"/profile"} element={<Profile/>}/>
                    </Route>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/registration"} element={<Registration/>}/>
                    <Route path={"/forgot"} element={<Forgot/>}/>
                    <Route path={"/set-newpassword/:token"} element={<SetNewPassword/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;

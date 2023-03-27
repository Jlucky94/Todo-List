import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {logoutTC} from "../../../features/auth/authSlice";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onLogout = () => dispatch(logoutTC())
    const onRegistration = () => navigate('/registration')

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Learning with Cards
                    </Typography>
                    {isAuth ? <Button onClick={onLogout} color="inherit" variant={"outlined"}>Log Out</Button> :
                        <Button onClick={onRegistration} color="inherit" variant={"outlined"}>Registration</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../app/store";

const PrivateRoutes = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)


    return (
        isAuth ? <Outlet/> : <Navigate to={'/login'}/>
    );
};
export default PrivateRoutes;
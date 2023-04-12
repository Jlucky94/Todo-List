import React from 'react';
import {Typography} from "@mui/material";
import {useParams} from "react-router-dom";

const Page404 = () => {
    const params = useParams()
    const error404 = params.error404
    return (
        <Typography>
            <Typography fontSize={200} component={"span"} style={{fontWeight: "bold"}}>404.</Typography> That’s an error.
            <Typography>The requested URL /{error404} was not found on this server. That’s all we know.</Typography>
        </Typography>
    );
};

export default Page404;
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// @mui/material
import { Grid } from "@mui/material";
//components

import Friends from "../components/Friends";
import MsgGroup from "../components/MsgGroup";
import ChattBox from "../components/ChattBox";

const Chat = () => {
    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="baseline"
                spacing={2}
            >
                <Grid item xs={4}>
                    <div className="homeitem mt">
                        <MsgGroup />
                    </div>
                    <div className="homeitem mt">
                        <Friends button="msg" />
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <ChattBox />
                </Grid>
            </Grid>
        </>
    );
};

export default Chat;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// @mui/material
import { Grid } from "@mui/material";
//components
import BlockList from "../components/BlockList";
import Friends from "../components/Friends";
import FriendRequests from "../components/FriendRequests";
import Group from "../components/Group";
import MyGroup from "../components/MyGroup";
import People from "../components/People";

const Home = () => {
    let navigation = useNavigate();
    let userData = useSelector((state) => state.loggeduser.loginUser);
    console.log(userData);
    useEffect(() => {
        if (userData == null) {
            navigation("/login");
        }
    }, []);
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
                        <MyGroup />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="homeitem mt">
                        <Group />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="homeitem mt">
                        <Friends />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="homeitem">
                        <People />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="homeitem">
                        <FriendRequests />
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className="homeitem">
                        <BlockList />
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;

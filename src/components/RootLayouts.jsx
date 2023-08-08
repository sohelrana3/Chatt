import React from "react";
import images from "../assets/chatt..png";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
useNavigate;
// material css
import { Grid, TextField, Button, Alert, Stack } from "@mui/material";
// react icon
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { BiGroup, BiBarcode } from "react-icons/bi";
import { CiChat1 } from "react-icons/ci";

const RootLayouts = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem("user");
            navigate("/login");
        });
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    item
                    xs={2}
                >
                    <div className="rootnav">
                        <div className="navbar">
                            <img src={images} alt="logo" />
                            <div className="nav">
                                <div className="navitem">
                                    <Link
                                        to="/chatt/home"
                                        className={
                                            location.pathname == "/chatt/home"
                                                ? "active"
                                                : "navlink"
                                        }
                                    >
                                        <AiFillHome />
                                        <span>Home</span>
                                    </Link>
                                </div>
                                <div className="navitem">
                                    <Link
                                        to="/chatt/message"
                                        className={
                                            location.pathname ==
                                            "/chatt/message"
                                                ? "active"
                                                : "navlink"
                                        }
                                    >
                                        <CiChat1 />
                                        <span>Chat</span>
                                    </Link>
                                </div>
                                <div className="navitem">
                                    <Link
                                        to="/chatt/group"
                                        className={
                                            location.pathname == "/chatt/group"
                                                ? "active"
                                                : "navlink"
                                        }
                                    >
                                        <BiGroup />
                                        <span>Group</span>
                                    </Link>
                                </div>
                                <div className="navitem">
                                    <Link
                                        to="/chatt/friend"
                                        className={
                                            location.pathname == "/chatt/friend"
                                                ? "active"
                                                : "navlink"
                                        }
                                    >
                                        <AiOutlineUser />
                                        <span>Friends</span>
                                    </Link>
                                </div>
                                <div className="navitem">
                                    <Link
                                        to="/chatt/people"
                                        className={
                                            location.pathname == "/chatt/people"
                                                ? "active"
                                                : "navlink"
                                        }
                                    >
                                        <BiBarcode />
                                        <span>People</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleLogout}>Logout</button>
                            <h2>hell</h2>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
};

export default RootLayouts;

import { useState } from "react";
import images from "../assets/chatt..png";
import user from "../assets/user.png";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
// material css
import { Grid, Modal, Box, Typography, Button } from "@mui/material";
// react icon
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { BiGroup, BiBarcode } from "react-icons/bi";
import { CiChat1 } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";

//modal stayle
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const RootLayouts = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let userData = useSelector((state) => state.loggeduser.loginUser);
    //modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    console.log(userData);
    // handleLogout
    let handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem("user");
            navigate("/");
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

                        <div className="profile">
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs={3}>
                                    <img src={user} alt="user" />
                                </Grid>
                                <Grid item xs={7}>
                                    {userData !== null && (
                                        <h4>{userData.displayName}</h4>
                                    )}
                                    <p>Edit profile</p>
                                </Grid>
                                <Grid item xs={2}>
                                    <div onClick={handleOpen}>
                                        <FiSettings />
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography
                                                    id="modal-modal-title"
                                                    variant="h6"
                                                    component="h2"
                                                >
                                                    Are you Sure Logout?
                                                </Typography>
                                                <Typography
                                                    id="modal-modal-description"
                                                    sx={{ mt: 2 }}
                                                >
                                                    <div className="log">
                                                        <button
                                                            onClick={
                                                                handleLogout
                                                            }
                                                            className="logbutton"
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            onClick={
                                                                handleClose
                                                            }
                                                            className="logbutton"
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </div>
                                </Grid>
                            </Grid>
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

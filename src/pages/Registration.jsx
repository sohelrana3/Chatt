import React, { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
} from "firebase/auth";

import { getDatabase, ref, set } from "firebase/database";
// material css
import { Grid, TextField, Button, Alert, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// images
import images from "../assets/chatt..png";
// react icon
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// inishalvalue
let inishalvalue = {
    email: "",
    fullname: "",
    password: "",
    eye: false,
    error: "",
    loadding: false,
};

const Registration = () => {
    const auth = getAuth();
    const db = getDatabase();
    let navigate = useNavigate();
    const notify = (massges) => toast(massges);
    let [value, settvalue] = useState(inishalvalue);

    let handleChange = (e) => {
        settvalue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };
    //handleSingup button
    let handleSingup = () => {
        let { email, fullname, password } = value;

        if (!email) {
            settvalue({
                ...value,
                error: "please your email address ",
            });
            return;
        }
        if (!fullname) {
            settvalue({
                ...value,
                error: "please your full name  ",
            });
            return;
        }
        if (!password) {
            settvalue({
                ...value,
                error: "please your password  ",
            });
            return;
        }
        settvalue({
            ...value,
            loadding: true,
        });
        // createUserWithEmailAndPassword chatt app
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            console.log(user);

            updateProfile(auth.currentUser, {
                displayName: fullname,
            }).then(() => {
                sendEmailVerification(auth.currentUser).then(() => {
                    set(ref(db, "users/" + user.user.uid), {
                        username: fullname,
                        email: email,
                    });
                });
            });
            notify("Hi" + " " + fullname + " " + "Registration success");
            settvalue({
                email: "",
                fullname: "",
                password: "",
                loadding: false,
            });

            navigate("/login");
        });
        //
    };
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
        >
            <div className="Registration">
                <div className="regHadding">
                    <img src={images} alt="logo" />
                    <h2>Get started with easily register</h2>
                    <h4>Free register and you can enjoy it</h4>
                </div>
                <div className="RegInput">
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={value.email}
                        onChange={handleChange}
                    />
                    {value.error.includes("email") && (
                        <Stack
                            sx={{ width: "100%", margin: "10px 0" }}
                            spacing={2}
                        >
                            <Alert severity="error">{value.error}</Alert>
                        </Stack>
                    )}
                </div>
                <div className="RegInput">
                    <TextField
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"
                        name="fullname"
                        onChange={handleChange}
                    />
                    {value.error.includes("full") && (
                        <Stack
                            sx={{ width: "100%", margin: "10px 0" }}
                            spacing={2}
                        >
                            <Alert severity="error">{value.error}</Alert>
                        </Stack>
                    )}
                </div>
                <div className="RegInput">
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        onChange={handleChange}
                        type={value.eye ? "text" : "password"}
                    />
                    <div
                        onClick={() => settvalue({ ...value, eye: !value.eye })}
                        className="eye-reg"
                    >
                        {value.eye ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                    {value.error.includes("password") && (
                        <Stack
                            sx={{ width: "100%", margin: "10px 0" }}
                            spacing={2}
                        >
                            <Alert severity="error">{value.error}</Alert>
                        </Stack>
                    )}
                </div>
                {value.loadding ? (
                    <LoadingButton loading variant="outlined">
                        Submit
                    </LoadingButton>
                ) : (
                    <Button
                        onClick={handleSingup}
                        className="button"
                        variant="contained"
                    >
                        Sign up
                    </Button>
                )}
                <div>
                    <p className="regPra">
                        Already have an account ?{" "}
                        <Link to="/login" className="reglink">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </Grid>
    );
};

export default Registration;

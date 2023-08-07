import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";

// material css
import { Grid, TextField, Button, Alert, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
// images
import images from "../assets/chatt..png";
// react icon
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    const notify = (massges) => toast(massges);
    let [value, settvalue] = useState("");
    let handleChange = (e) => {
        settvalue(e.target.value);
    };
    let handleforgot = ()=>{
      console.log(value);
      sendPasswordResetEmail(auth, value).then(()=>{
        notify("Password reset email sent!")
        navigate("/login")
      })
      
    }
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
                    <h2>Login</h2>
                    <h4>Free register and you can enjoy it</h4>
                </div>
                <div className="RegInput">
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={value.email}
                        onChange={handleChange}
                    />
                </div>
                <Button
                    onClick={handleforgot}
                    className="button"
                    variant="contained"
                >
                    Reset Password
                </Button>
            </div>
        </Grid>
    );
};

export default ForgotPassword;

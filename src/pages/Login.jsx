import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
import {useDispatch } from "react-redux"
import {loginData} from "../slice/user/userSlice"

// inishalvalue
let inishalvalue = {
    email: "",
    password: "",
    eye: false,
    error: "",
    loadding: false,
};



const Login = () => {
    const auth = getAuth();
    const db = getDatabase();
    let navigate = useNavigate();
    let dispatch = useDispatch()
    const notify = (massges) => toast(massges);
    let [value, settvalue] = useState(inishalvalue);
    let handleChange = (e) => {
      settvalue({
          ...value,
          [e.target.name]: e.target.value,
      });
  };
  
  let handleSingIn = () => {
    console.log(value);
      let { email, password } = value;
      // email validation
      if (!email) {
          settvalue({
              ...value,
              error: "please your email address ",
          });
          return;
      }
      //password validation
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
      //signInWithEmailAndPassword(auth, email, password)
      signInWithEmailAndPassword(auth, email, password).then((user)=>{
        // localStorage.setItem("user", JSON.stringify(user.user));
        dispatch(loginData(user.user));
        navigate("/Root")
      }).catch((error)=>{
        settvalue({
          ...value,
          error: "email or password not march"
        })

      })
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
                        onClick={handleSingIn}
                        className="button"
                        variant="contained"
                    >
                        Sign In
                    </Button>
                )}
                <div>
                    <p className="regPra">
                    <span><Link to="/ForgotPassword">ForgotPasword</Link></span> / Don’t have an account ?{" "}
                        <Link to="/" className="reglink">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </Grid>
    );
};

export default Login;

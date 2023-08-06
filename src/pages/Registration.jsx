import React from "react";
// material css
import { Grid, TextField, Button } from "@mui/material";
// images
import images from "../assets/chatt..png";
// react icon
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"

const Registration = () => {
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
                <img src={images} alt="logo" />
                <h2 className="">Get started with easily register</h2>
                <h4>Free register and you can enjoy it</h4>
                <div className="RegInput">
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                    />
                </div>
                <div className="RegInput">
                    <TextField
                        id="outlined-basic"
                        label="Full Name"
                        variant="outlined"
                    />
                </div>
                <div className="RegInput">
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                    />
                    <AiFillEyeInvisible />
                    <AiFillEye />
                </div>
                <Button className="button" variant="contained">Sign up</Button>
            </div>
        </Grid>
    );
};

export default Registration;

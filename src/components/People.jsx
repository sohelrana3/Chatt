import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import images from "../assets/user.png";

// react icon
import { BsSearch } from "react-icons/bs";
//material
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const People = () => {
    const db = getDatabase();
    let [user, setuser] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);

    useEffect(() => {
        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid !== item.key) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setuser(arr);
        });
    }, []);
    return (
        <div className="container">
            <h2>People</h2>
            <div className="inputbox">
                <input type="text" placeholder="Search" />
                <BsSearch className="inputicon" />
            </div>
            {/* user map */}
            {user.map((item) => (
                <div className="user">
                    <img src={images} alt="user" />
                    <h2>{item.username}</h2>
                    <Button variant="text">add</Button>
                </div>
            ))}
        </div>
    );
};

export default People;

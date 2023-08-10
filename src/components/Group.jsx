import { useEffect, useState } from "react";
import {
    getDatabase,
    ref,
    onValue,
    remove,
    push,
    set,
} from "firebase/database";
import images from "../assets/user.png";

// react icon
import { BsSearch } from "react-icons/bs";
//material
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const Group = () => {
    const db = getDatabase();
    let [group, setgroup] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);

    // group data
    useEffect(() => {
        const groupRef = ref(db, "group/");
        onValue(groupRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid !== item.val().adminid) {
                    arr.push({ ...item.val(), id: item.key });
                }
                console.log(arr);
            });
            setgroup(arr);
        });
    }, []);
    return (
        <div className="container">
            <div className="creategroup">
                <h2>MyGroup</h2>
            </div>
            <div className="inputbox">
                <input type="text" placeholder="Search" />
                <BsSearch className="inputicon" />
            </div>
            {/* user map */}
            {group.map((item) => (
                <div className="friendreq">
                    <div className="info">
                        <img src={images} alt="friendreq" />
                        <div>
                            <h2>{item.groupname}</h2>
                            <p
                                style={{
                                    marginLeft: "16px",
                                    fontSize: "14px",
                                    color: "#616161",
                                }}
                            >
                                {/* {item.grouptag} */}
                                hi bangladesh
                            </p>
                        </div>
                    </div>
                    <div className="button">
                        <button className="btn">Join</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Group;

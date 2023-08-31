import { useEffect, useState } from "react";
import * as React from "react";
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
import {
    Box,
    Button,
    Typography,
    Modal,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { activechat } from "../slice/activeChat/activechat";

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
// inishallvalue
let inishallvalue = {
    tagname: "",
    tagline: "",
};

const MsgGroup = () => {
    const db = getDatabase();
    let dispatch = useDispatch();
    let [group, setgroup] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);
    //handleMembers Button
    let handleGroupMsg = (item) => {
        dispatch(
            activechat({
                name: item.groupname,
                id: item.id,
                type: "groupMsg",
            })
        );
        localStorage.setItem(
            "activeChat",
            JSON.stringify({
                name: item.groupname,
                id: item.id,
                type: "groupMsg",
            })
        );
    };
    // group data
    useEffect(() => {
        const groupRef = ref(db, "group/");
        onValue(groupRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().adminid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setgroup(arr);
        });
    }, []);
    return (
        <div className="container">
            <div className="creategroup"></div>
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
                                {item.grouptag}
                            </p>
                        </div>
                    </div>
                    <div className="button">
                        <Button
                            onClick={() => handleGroupMsg(item)}
                            className="myBtn"
                            variant="contained"
                        >
                            Msg
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MsgGroup;

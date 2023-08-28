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
    let [groupReq, setgroupReq] = useState([]);
    let [memberList, setmemberList] = useState([]);
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
            });
            setgroup(arr);
        });
    }, []);
    // memberList
    useEffect(() => {
        const memberListRef = ref(db, "groupMember/");
        onValue(memberListRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().groupid + item.val().userid);
            });
            setmemberList(arr);
        });
    }, []);
    // memberList
    useEffect(() => {
        const groupReqRef = ref(db, "grouprequest/");
        onValue(groupReqRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().groupid + item.val().userid);
            });
            setgroupReq(arr);
        });
    }, []);
    //handleJoin
    let handleJoins = (item) => {
        set(push(ref(db, "grouprequest/")), {
            adminid: item.adminid,
            adminname: item.admin,
            groupid: item.id,
            groupname: item.groupname,
            userid: userData.uid,
            username: userData.displayName,
            time: Date.now().toString(),
        }).then(() => {});
    };
    // handleCancel button
    let handleCancel = (item) =>{
        console.log(item);
    }
    return (
        <div className="container">
            <div className="creategroup">
                <h2>Group</h2>
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
                                {item.grouptag}
                            </p>
                        </div>
                    </div>
                    <div className="button">
                        {memberList.includes(item.id + userData.uid) ? (
                            <button
                                // onClick={() => handleJoins(item)}
                                className="btn"
                            >
                                Joined
                            </button>
                        ) : groupReq.includes(item.id + userData.uid) ? (
                            <button
                                onClick={() => handleCancel(item)}
                                className="btn"
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                onClick={() => handleJoins(item)}
                                className="btn"
                            >
                                Join
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Group;

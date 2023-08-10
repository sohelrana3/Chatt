import React, { useEffect, useState } from "react";
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
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

const People = () => {
    const db = getDatabase();
    const auth = getAuth();
    let [user, setuser] = useState([]);
    let [FriendRequests, setFriendRequests] = useState([]);
    let [Friend, setFriend] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);
    // user data
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
    //FriendRequests data
    useEffect(() => {
        const FriendRequestsRef = ref(db, "FriendRequests/");
        onValue(FriendRequestsRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().whoreceiveid + item.val().whosendid);
            });
            setFriendRequests(arr);
        });
    }, []);
    //Friend data
    useEffect(() => {
        const FriendRef = ref(db, "Friend/");
        onValue(FriendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().whoreceiveid + item.val().whosendid);
            });
            setFriend(arr);
        });
    }, []);

    let handleAdd = (item) => {
        // console.log(item);
        // console.log(userData)
        set(ref(db, "FriendRequests/" + item.id), {
            whosendid: userData.uid,
            whoname: userData.displayName,
            whoreceiveid: item.id,
            whoreceivename: item.username,
        });
    };
    //handleCancel
    let handleCancel = (item) => {
        remove(ref(db, "FriendRequests/" + item.id));
    };
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
                    {FriendRequests.includes(item.id + auth.currentUser.uid) ? (
                        <Button
                            onClick={() => handleCancel(item)}
                            variant="text"
                        >
                            Cancel
                        </Button>
                    ) : FriendRequests.includes(userData.uid + item.id) ? (
                        <Button variant="text">pending</Button>
                    ) : Friend.includes(userData.uid + item.id)||
                       Friend.includes(item.id + userData.uid) ? (
                        <Button variant="text">Friend</Button>
                    ) : (
                        <Button onClick={() => handleAdd(item)} variant="text">
                            add
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default People;

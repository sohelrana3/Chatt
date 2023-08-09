import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
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
                arr.push(item.val().whoreceiveid + item.val().whosendid,);
            });
            setFriendRequests(arr);
        });
    }, []);
 
    let handleAdd = (item) => {
        // console.log(item);
        // console.log(userData);
        // set(push(ref(db, "FriendRequests/")), {
        //     whosendid: userData.uid,
        //     whoname: userData.displayName,
        //     whoreceiveid: item.id,
        //     whoreceivename: item.username,
        // });
        set(ref(db, "FriendRequests/" + item.id), {
            whosendid: userData.uid,
            whoname: userData.displayName,
            whoreceiveid: item.id,
            whoreceivename: item.username,
        });
        console.log(FriendRequests);
        console.log(FriendRequests.includes(userData.uid));
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
                        <Button variant="text">Cancel</Button>
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

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
import { useSelector } from "react-redux";

const FriendRequests = () => {
    const db = getDatabase();
    let [FriendRequests, setFriendRequests] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);
    useEffect(() => {
        const FriendRequestsRef = ref(db, "FriendRequests/");
        onValue(FriendRequestsRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().whoreceiveid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriendRequests(arr);
        });
    }, []);
    //handleCancel
    let handleCancel = (item) => {
        remove(ref(db, "FriendRequests/" + item.id));
    };
    //handleAccept
    let handleAccept = (item) => {
        set(push(ref(db, "Friend/")), {
            ...item,
        }).then(() => {
            remove(ref(db, "FriendRequests/" + item.id));
        });
    };
    return (
        <div className="container">
            <h2>FriendRequests</h2>
            <div className="inputbox">
                <input type="text" placeholder="Search" />
                <BsSearch className="inputicon" />
            </div>
            {/* user map */}
            {FriendRequests.map((item) => (
                <div className="friendreq">
                    <div className="info">
                        <img src={images} alt="friendreq" />
                        <h2>{item.whoname}</h2>
                    </div>
                    <div className="button">
                        <button
                            onClick={() => handleAccept(item)}
                            className="btn"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => handleCancel(item)}
                            className="btn1"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FriendRequests;

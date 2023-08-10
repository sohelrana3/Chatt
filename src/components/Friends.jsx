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

const Friends = () => {
    const db = getDatabase();
    let [Friend, setFriend] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);

    //useEffect
    useEffect(() => {
        const FriendRef = ref(db, "Friend/");
        onValue(FriendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                console.log(item.val().whoreceiveid);
                console.log(item.val().whosendid);
                console.log("amtt");
                console.log(userData);
                if (
                    userData.uid == item.val().whoreceiveid ||
                    userData.uid == item.val().whosendid
                ) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriend(arr);
        });
    }, []);

    return (
        <div className="container">
            <h2>Friend</h2>
            <div className="inputbox">
                <input type="text" placeholder="Search" />
                <BsSearch className="inputicon" />
            </div>
            {/* user map */}
            {Friend.map((item) => (
                <div className="friendreq">
                    <div className="info">
                        <img src={images} alt="friendreq" />
                        {userData.uid == item.whoreceiveid ? (
                            <h2>{item.whoname}</h2>
                        ) : (
                            <h2>{item.whoreceivename}</h2>
                        )}
                    </div>
                    <div className="button">
                        <button
                            // onClick={() => handleAccept(item)}
                            className="btn"
                        >
                            Unfriend
                        </button>
                        <button
                            // onClick={() => handleCancel(item)}
                            className="btn1"
                        >
                            Block
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friends;

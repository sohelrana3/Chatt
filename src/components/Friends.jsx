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
import { useDispatch, useSelector } from "react-redux";
import { activechat } from "../slice/activeChat/activechat";

const Friends = ({ button }) => {
    const db = getDatabase();
    let dispatch = useDispatch();
    let [Friend, setFriend] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);

    //useEffect
    useEffect(() => {
        const FriendRef = ref(db, "Friend/");
        onValue(FriendRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
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
    //handleUnfriend button
    let handleUnfriend = (item) => {
        console.log(item);
        remove(ref(db, "Friend/" + item.id));
    };
    //handleBlock button
    let handleBlock = (item) => {
        console.log(item);
        console.log(userData);
        if (userData.uid == item.whoreceiveid) {
            console.log("sent");
            set(push(ref(db, "block/")), {
                blockedname: item.whoname,
                blockedid: item.whosendid,
                blockbyname: userData.displayName,
                blockbyid: userData.uid,
            }).then(() => {
                remove(ref(db, "Friend/" + item.id));
            });
        } else {
            set(push(ref(db, "Block/")), {
                blockedname: userData.displayName,
                blockedid: userData.uid,
                blockbyname: item.whoname,
                blockbyid: item.whosendid,
            }).then(() => {
                remove(ref(db, "Friend/" + item.id));
            });
        }
    };
    // handleMsg button
    let handleMsg = (item) => {
        console.log(item);
        if (item.whosendid == userData.uid) {
            dispatch(
                activechat({
                    name: item.whoreceivename,
                    id: item.whoreceiveid,
                    type: "singlemsg",
                })
            );
            localStorage.setItem(
                "activeChat",
                JSON.stringify({
                    name: item.whoreceivename,
                    id: item.whoreceiveid,
                    type: "singlemsg",
                })
            );
        } else {
            dispatch(
                activechat({
                    name: item.whoname,
                    id: item.whosendid,
                    type: "singlemsg",
                })
            );
            localStorage.setItem(
                "activeChat",
                JSON.stringify({
                    name: item.whoreceivename,
                    id: item.whoreceiveid,
                    type: "singlemsg",
                })
            );
        }
    };
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
                        {button == "msg" ? (
                            <button
                                onClick={() => handleMsg(item)}
                                className="btn"
                            >
                                Msg
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleUnfriend(item)}
                                    className="btn"
                                >
                                    Unfriend
                                </button>
                                <button
                                    onClick={() => handleBlock(item)}
                                    className="btn1"
                                >
                                    Block
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Friends;

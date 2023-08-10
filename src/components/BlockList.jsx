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
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const BlockList = () => {
    const db = getDatabase();
    let [Block, setBlock] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);
    //Block data
    useEffect(() => {
        const BlockRef = ref(db, "block/");
        onValue(BlockRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().blockbyid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setBlock(arr);
        });
    }, []);
    //handleUnblock button
    let handleUnblock = (item) => {
      console.log(item);
      remove(ref(db, "block/" + item.id));
    }
    return (
        <div className="container">
            <h2>BlockList</h2>
            <div className="inputbox">
                <input type="text" placeholder="Search" />
                <BsSearch className="inputicon" />
            </div>
            {/* user map */}
            {Block.map((item) => (
                <div className="user">
                    <img src={images} alt="user" />
                    {userData.uid == item.blockbyid && (
                        <h2>{item.blockedname}</h2>
                    )}
                    <Button onClick={()=> handleUnblock(item)} variant="text">Unblock</Button>
                </div>
            ))}
        </div>
    );
};

export default BlockList;

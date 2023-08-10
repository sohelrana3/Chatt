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
import { ImCross } from "react-icons/im";

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

const MyGroup = () => {
    const db = getDatabase();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [value, setvalue] = useState(inishallvalue);
    let [group, setgroup] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);

    // handleChange value
    let handleChange = (e) => {
        setvalue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };
    //handleGroup button
    let handleGroup = () => {
        set(push(ref(db, "group/")), {
            admin: userData.displayName,
            adminid: userData.uid,
            groupname: value.tagname,
            grouptag: value.tagline,
        }).then(() => {
            setOpen(false);
        });
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
                console.log(arr);
            });
            setgroup(arr);
        });
    }, []);
    return (
        <div className="container">
            <div className="creategroup">
                <h2>MyGroup</h2>
                <Button className="button" onClick={handleOpen}>
                    Create Group
                </Button>
                {/* ------------------Modal------------------ */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            <h4>Create New Group</h4>
                            <ImCross
                                onClick={handleClose}
                                className="groupicon"
                            />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div>
                                <TextField
                                    id="outlined-basic"
                                    label="Group name"
                                    variant="outlined"
                                    margin="dense"
                                    name="tagname"
                                    onChange={handleChange}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Group Tag"
                                    variant="outlined"
                                    margin="dense"
                                    name="tagline"
                                    onChange={handleChange}
                                />
                                <Button
                                    className="groupBtn"
                                    onClick={handleGroup}
                                >
                                    Create Group
                                </Button>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
                {/* ------------------Modal------------------ */}
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
                        {/* <button className="btn">Member</button>
                        <button className="btn1">Request</button> */}
                        <Button className="myBtn" variant="contained">
                            Member
                        </Button>
                        <Button className="myBtn mybtn1">Request</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyGroup;

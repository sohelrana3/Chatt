import React, { useState } from "react";
import userImg from "../assets/user.png";
import msgImg from "../assets/Register.png";
import ModalImage from "react-modal-image";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
const ChattBox = () => {
    let [value, setvalue] = useState("");
    let activeChat = useSelector((state) => state.activechat.activechat);

    //handleKeyPress
    let handleKeyPress = (e) => {
        if(e.key == "Enter"){
            handleSent()
        }
    };
    // handleSent button
    let handleSent = () => {
        console.log(value);
            setvalue("")
    };
    return (
        <div className="chatt-box">
            <div className="profile">
                <div className="signal">
                    <img src={userImg} alt="" />
                    <div className="round"></div>
                </div>
                <div>
                    <h3>{activeChat.name}</h3>
                    <p>Online</p>
                </div>
            </div>
            <div className="msgbox">
                {/* ------------img msg start------------ */}

                <div className="msg">
                    <p className="getimg">
                        <ModalImage small={msgImg} large={msgImg} />
                    </p>
                    <p className="time">Today, 2:01pm</p>
                </div>
                <div className="msg">
                    <p className="sendimg">
                        <ModalImage small={msgImg} large={msgImg} />
                    </p>
                    <p className="time">Today, 2:01pm</p>
                </div>
                {/* ------------img msg end------------ */}
                {/* ------------audio msg start------------ */}
                <div className="msg">
                    <p className="getaudio">
                        <audio controls></audio>
                    </p>
                    <p className="time">Today, 2:01pm</p>
                </div>
                <div className="msg">
                    <p className="sendaudio">
                        <audio controls></audio>
                    </p>
                    <p className="time">Today, 2:01pm</p>
                </div>
                {/* ------------audio msg end------------ */}
                {/* ------------video msg start------------ */}
                <div className="msg">
                    <p className="getaudio">
                        <audio controls></audio>
                    </p>
                    <p className="time">Today, 2:01pm</p>
                </div>
                <div className="msg">
                    <p className="sendaudio">
                        <audio controls></audio>
                    </p>
                    <p className="time">Today, 2:01pm</p>
                </div>
                {/* ------------video msg end------------ */}

                {/* ------------text msg start------------ */}
                <div className="msg">
                    <p className="sendmsg">hello sm</p>
                    <p className="time">10 minits ago</p>
                </div>
                <div className="msg">
                    <p className="getmsg">hello sm</p>
                    <p className="time">10 minits ago</p>
                </div>
                {/* ------------text msg end------------ */}
            </div>

            {/*------------------- msgbtn start------------------- */}
            <div className="msgcontainer">
                <div className="msgwritecon">
                    <input
                        onChange={(e) => setvalue(e.target.value)}
                        className="msgwrite"
                        onKeyUp={handleKeyPress}
                        value={value}
                    />
                </div>
                <Button onClick={handleSent} variant="contained">
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChattBox;

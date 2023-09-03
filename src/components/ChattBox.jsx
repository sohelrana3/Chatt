import React, { useState, useEffect } from "react";
import userImg from "../assets/user.png";
import msgImg from "../assets/Register.png";
import ModalImage from "react-modal-image";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import moment from "moment/moment";
const ChattBox = () => {
    const db = getDatabase();
    let [value, setvalue] = useState("");
    let activeChat = useSelector((state) => state.activechat.activechat);
    let [msg, setmsg] = useState([]);
    let [groupMsg, setgroupMsg] = useState([]);
    let userData = useSelector((state) => state.loggeduser.loginUser);

    //handleKeyPress
    let handleKeyPress = (e) => {
        if (e.key == "Enter") {
            handleSent();
        }
    };
    // handleSent button

    let handleSent = () => {
        if (activeChat.type == "groupMsg") {
            set(push(ref(db, "groupmsg/")), {
                whosendname: userData.displayName,
                whosendid: userData.uid,
                whorecivename: activeChat.name,
                whoreciveid: activeChat.id,
                msg: value,
                // date: `${new Date().getFullYear()}-${new Date().getMonth()+ 1}-${new Date().getDate()}-${new Date().getHours()}:${new Date().getMinutes}`,
                date: `${new Date().getFullYear()}-${
                    new Date().getMonth() + 1
                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            }).then(() => {
                setvalue("");
                console.log(
                    `${new Date().getFullYear()}-${
                        new Date().getMonth() + 1
                    }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
                );
            });
        } else {
            set(push(ref(db, "singlemsg/")), {
                whosendname: userData.displayName,
                whosendid: userData.uid,
                whorecivename: activeChat.name,
                whoreciveid: activeChat.id,
                msg: value,
                date: `${new Date().getFullYear()}-${
                    new Date().getMonth() + 1
                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            }).then(() => {
                setvalue("");
            });
        }
    };
    // single msg
    useEffect(() => {
        const msgRef = ref(db, "singlemsg/");
        onValue(msgRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val());
            });
            setmsg(arr);
        });
    }, []);
    // groupMsg
    useEffect(() => {
        const groupMsgRef = ref(db, "groupmsg/");
        onValue(groupMsgRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                console.log(item.val());
                arr.push(item.val());
            });
            setgroupMsg(arr);
        });
    }, []);
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

                {/* <div className="msg">
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
                </div> */}
                {/* ------------img msg end------------ */}
                {/* ------------audio msg start------------ */}
                {/* <div className="msg">
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
                </div> */}
                {/* ------------audio msg end------------ */}
                {/* ------------video msg start------------ */}
                {/* <div className="msg">
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
                </div> */}
                {/* ------------video msg end------------ */}

                {/* ------------text msg start------------ */}
                {activeChat.type == "singlemsg"
                    ? msg.map((item) =>
                          item.whosendid == userData.uid &&
                          item.whoreciveid == activeChat.id ? (
                              <div className="msg">
                                  <p className="sendmsg">{item.msg}</p>
                                  <p className="time">
                                      {moment(
                                          item.date,
                                          "YYYYMMDD hh:mm"
                                      ).fromNow()}
                                  </p>
                              </div>
                          ) : (
                              item.whosendid == activeChat.id &&
                              item.whoreciveid == userData.uid && (
                                  <div className="msg">
                                      <p className="getmsg">{item.msg}</p>
                                      <p className="time">
                                          {moment(
                                              item.date,
                                              "YYYYMMDD hh:mm"
                                          ).fromNow()}
                                      </p>
                                  </div>
                              )
                          )
                      )
                    : groupMsg.map((item) =>
                          item.whosendid == userData.uid &&
                          item.whoreciveid == activeChat.id ? (
                              <div className="msg">
                                  <p className="sendmsg">{item.msg}</p>
                                  <p className="time">
                                      {moment(
                                          item.date,
                                          "YYYYMMDD hh:mm"
                                      ).fromNow()}
                                  </p>
                              </div>
                          ) : (
                            item.whoreciveid == activeChat.id &&
                              <div className="msg">
                                  <p className="getmsg">{item.msg}</p>
                                  <p className="time">
                                      {moment(
                                          item.date,
                                          "YYYYMMDD hh:mm"
                                      ).fromNow()}
                                  </p>
                              </div>
                          )
                      )}

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

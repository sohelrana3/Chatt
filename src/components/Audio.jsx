import { Button } from "@mui/material";
import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

const Audio = ({}) => {
    let [audiourl, setaudiourl] = useState();
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        setaudiourl(url);
        console.log(blob);
        console.log(audiourl);
    };

    // handleCancel
    let handleCancel = () =>{
        setaudiourl()
    }
    return (
        <>
            {audiourl ? (
                <div style={{display: "flex"}}>
                    <audio src={audiourl} controls></audio>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            ) : (
                <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }}
                    downloadOnSavePress={false}
                    downloadFileExtension="webm"
                />
            )}
        </>
    );
};

export default Audio;

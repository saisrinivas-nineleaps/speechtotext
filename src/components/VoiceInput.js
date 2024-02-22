import React, { useState } from "react";
import useSpeechToText from "../hooks/useSpeechToText";

const VoiceInput = () => {
  const [displayText, setDisplayText] = useState("");
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText({ continuous: true });
  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  };
  const stopVoiceInput = () => {
    setDisplayText(prevVal => prevVal + (transcript.length ? (prevVal.length ? " ":'')+ transcript:''))
    stopListening()
  };
  return (
    <div>
      <textarea
        value={
          isListening
            ? displayText +
              (transcript.length
                ? (displayText.length ? " " : "") + transcript
                : "")
            : displayText
        }
        onChange={(e) => {
          setDisplayText(e.target.value);
        }}
        disabled={isListening}
      ></textarea>
      <button onClick={()=>{startStopListening()}}>
        {isListening ? "stop listening" : "speak"}
      </button>
      <div>
        is this vis
      </div>
    </div>
  );
};

export default VoiceInput;

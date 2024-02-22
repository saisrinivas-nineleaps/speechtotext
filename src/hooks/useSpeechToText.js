import React, { useEffect, useRef, useState } from "react";

const useSpeechToText = (options) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("this browser does not support web speech api");
      return;
    }
    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.interimResults = options.interimResults || true;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous || false;
    if ("webkitSpeechGrammar List" in window) {
      const grammar =
        // "#JSGF V1.0; grammar punctuation; public <punc> = . |,|?|!|;|:;";
        "#JSGF V1.0";

      const speechRecognitionList = new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);

      recognition.grammars = speechRecognitionList;
    }

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.error("speech recognition error", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript("");
    };
    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } 
    // let synth=  window.speechSynthesis
    // let utterance1=new SpeechSynthesisUtterance('I have transcribed what you have said');
    // synth.speak(utterance1)
  };

  return { isListening, startListening, transcript, stopListening };
};

export default useSpeechToText;

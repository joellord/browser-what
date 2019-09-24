import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 

const name = "Speech API";
const demoName = "speechsynthesis";
const details = [
  "In browser Text-to-speech",
  "Multiple voices and languages",
  "Experimental in Firefox"
];
const codeSamples = [
  {
    title: "Create an utterance", 
    code: `
let utt = new SpeechSynthesisUtterance("Hello");
utt.rate = 1.2;
utt.pitch = 1.4;
  `},  
  {
    title: "Speak now!", 
    code: `
let synth = window.speechSynthesis;
synth.speak(utt);
  `},  
  {
    title: "Change Voice", 
    code: `
let voice = synth.getVoices()[1];
utt.voice = voice;
synth.speak(utt);
  `}
];

const demo = {
  init: (ctx) => {

  },
  render: (ctx) => {
    const talk = () => {
      let synth = speechSynthesis;
      let utterance = new SpeechSynthesisUtterance("I love this part of the talk.");
      synth.speak(utterance);
      utterance = new SpeechSynthesisUtterance("I can actually take a break here.");
      synth.speak(utterance);
      utterance = new SpeechSynthesisUtterance("Note how the pitch and rate are different now.");
      utterance.rate = 0.6;
      utterance.pitch = 1.8;
      synth.speak(utterance);
      utterance = new SpeechSynthesisUtterance("Even better, it can change voice");
      synth.speak(utterance);
      synth.pause();
      utterance = new SpeechSynthesisUtterance("It can speak French. Although it does not support French Canadian yet.");
      utterance.voice = synth.getVoices().find(v => v.lang.indexOf("fr") > -1);
      synth.speak(utterance);
      synth.resume();
      utterance = new SpeechSynthesisUtterance("And a variety of different languages like German. Danke schön!");
      utterance.voice = synth.getVoices().find(v => v.lang.indexOf("de") > -1);
      synth.speak(utterance);
      utterance = new SpeechSynthesisUtterance("But enough of this nonsense, back to you, Joel");
      synth.speak(utterance);
    };

    return (
      <div>
        <div>I love this part of the talk.</div>
        <div>I can actually take a break here.</div>
        <div>Note how the pitch and rate are different now.</div>
        <div>Even better, it can use different voices.</div>
        <button onClick={talk}>Talk</button>
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo);
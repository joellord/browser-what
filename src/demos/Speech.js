import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import ImgSpeech from "../assets/speech.jpg";

const name = "Speech API";
const demoName = "speechsynthesis";
const image = ImgSpeech;
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

speechSynthesis.onvoicechange = populateVoices();
  `}
];

const speechLines = [
  {text: "I love this part of the talk."},
  {text: "I can actually take a break here."},
  {text: "Note how the pitch and rate are different now.", rate: 0.6, pitch: 1.8},
  {text: "Even better, it can change voice"},
  {text: "It can speak French. Although it does not support French Canadian yet.", lang: "fr"},
  {text: "And a variety of different languages like German. Danke schön!", lang: "de"},
  {text: "But enough of this nonsense, back to you, Joel"}
];

const demo = {
  init: (ctx) => {

  },
  render: (ctx) => {
    const talk = () => {
      let speech = speechLines.length ? speechLines.shift() : {text: "I have nothing else to say"};
      let synth = speechSynthesis;
      let utterance = new SpeechSynthesisUtterance(speech.text);
      if (speech.rate) utterance.rate = speech.rate;
      if (speech.pitch) utterance.pitch = speech.pitch;
      if (speech.lang) utterance.voice = synth.getVoices().find(v => v.lang.indexOf(speech.lang) > -1);
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

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
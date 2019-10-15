import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import ImgVibrate from "../assets/vibrate.jpg";

const name = "Vibrate API";
const demoName = "vibrate";
const image = ImgVibrate;
const details = [
  "Very annoying",
  "Don't abuse it",
  "Actually, you should probably never use it"
];
const codeSamples = [
  {
    title: "Vibrate API", 
    code: `
if ("vibrate" in navigator) {
  vibrate(1000); // 1000 ms
}
  `},  
  {
    title: "Vibrate API", 
    code: `
if ("vibrate" in navigator) {
  vibrate(0); // Stop vibration
}
  `},  
  {
    title: "Vibrate API", 
    code: `
if ("vibrate" in navigator) {
  vibrate([<vibrate>, <pause>, <vibrate>, <pause>, ...]); 
}
  `}
];

const demo = {
  init: (ctx) => {
    
  },
  render: (ctx) => {
    return (
      <div>
        Not available on desktop
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
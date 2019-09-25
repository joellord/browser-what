import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 

const name = "Online/Offline Status";
const demoName = "online";
const details = [
  "Tells you if a user is online",
  "Useful when build PWAs",
  "Includes events on `window`"
];
const codeSamples = [
  {
    title: "Online State", 
    code: `
console.log(navigator.onLine ? "Online" : "Offline");
  `},  
  {
    title: "Events", 
    code: `
window.ononline = () => {
  console.log("User is now online");
}
window.onoffline = () => {
  console.log("User is now offline");
}
  `}
];

const demo = {
  init: (ctx) => {
    ctx.setState({
      onLine: navigator.onLine
    });
  },
  render: (ctx) => {
    return (
      <div>
        <div>Internet Connection Status: {ctx.state.onLine ? "Online" : "Offline"}</div>
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo);
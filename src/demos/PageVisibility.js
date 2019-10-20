import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import ImgPageVisibility from "../assets/pagevisibility.jpg";

const name = "Page Visibility";
const demoName = "pagevisibility";
const image = ImgPageVisibility;
const details = [
  "Tells you if a document is in the display",
  "Useful to pause interactions",
  ""
];
const codeSamples = [
  {
    title: "Read the state", 
    code: `
console.log(document.visibilityState);
// visible, hidden, prerender, unloaded
  `},  
  {
    title: "Event Handler", 
    code: `
document.addEventListener("visibilitychange", <cb>);
  `}
];

const demo = {
  support: {
    ios: true,
    android: true,
    desktop: true
  },
  init: (ctx) => {
    ctx.setState({seconds: 0});
    const increaseTimer = () => {
      ctx.setState({seconds: ctx.state.seconds + 1});
      if (!document.hidden) setTimeout(increaseTimer, 100);
    }
    setTimeout(increaseTimer, 100);
    document.addEventListener("visibilitychange", () => {
      switch(document.visibilityState) {
        case "hidden":
          document.title = "(paused) -- " + document.title;
          break;
        case "visible":
          document.title = document.title.replace(/\([a-z]+\) -- /i, "");
          increaseTimer();
          break;
        case "prerender":
          document.title = "(prerender) -- " + document.title;
          break;
        default:
          console.log("Error");
      }
    });
  },
  render: (ctx) => {
    let seconds = Math.floor(ctx.state.seconds/10);
    let tenth = ctx.state.seconds%10;
    let timer = `${seconds},${tenth}`;
    return (
      <div>
        Timer is rolling!<br/>
        <h2>{timer}</h2>
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
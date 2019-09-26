import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import { isAbsolute } from "path";

const name = "getUserMedia API";
const demoName = "getusermedia";
const details = [
  "Gives you access to a user microphone or camera",
  "Provides you with a stream",
  "You need a <canvas> to manipulate the video"
];
const codeSamples = [
  {
    title: "Get Video", 
    code: `
navigator.mediaDevices.getUserMedia({video: true})
  .then(mediaStream => {
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => video.play();
  });
  `},  
  {
    title: "Get Audio", 
    code: `
navigator.mediaDevices.getUserMedia({audio: true})
  `},
  {
    title: "Copy to canvas",
    code: `
navigator.mediaDevices.getUserMedia({video: true})
  .then(mediaStream => {
    video.srcObject = mediaStream;
    video.onloadedmetadata = () => {
      video.play();  
      let loop = () => {
        if (!video.paused && !video.ended) {
          canvasContext.drawImage(video, 0, 0); 
        }
        setTimeout(loop, 33);
      }
    };
  `}
];

const demo = {
  init: (ctx) => {
  },
  render: (ctx) => {
    setTimeout(() => {
      let video = document.querySelector("#userMediaVideo");
      let canvas = document.querySelector("#userMediaCanvas");
      let context = canvas.getContext("2d");
      
      navigator.mediaDevices.getUserMedia({video: true})
        .then(mediaStream => {
          video.srcObject = mediaStream;
          video.onloadedmetadata = () => {
            video.play();  
            canvas.width = canvas.clientWidth/10;
            canvas.height = canvas.clientHeight/10;
            let loop = () => {
              if (!video.paused && !video.ended) {
                context.drawImage(video, -canvas.width*3, -canvas.height*3); 
              }
            }
            ctx.interval = setInterval(loop, 50);
          };
        });
    }, 0);
    let canvasStyle = {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "100%",
      zIndex: -10
    };
    let videoStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: -1
    };
    return (
      <div>
        <video id="userMediaVideo" style={videoStyle}></video>
        <canvas id="userMediaCanvas" style={canvasStyle}></canvas>
      </div>
    )
  },
  destroy: (ctx) => {
    clearInterval(ctx.interval);
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo);
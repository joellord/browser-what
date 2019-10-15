import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import ImageBanana from "../assets/banana.jpg"
import ImgGyroscope from "../assets/gyroscope.jpg";

const name = "Device Orientation";
const demoName = "deviceorientationevent";
const image = ImgGyroscope;
const details = [
  "Provides the device orientation",
  "Coordinates of the three axis (α, β, γ)",
  "With a bit of math, you can figure out landscape/portrait"
];
const codeSamples = [
  {
    title: "Device Orientation", 
    code: `
window.ondeviceorientation = (event) => {
  console.log(event.alpha, event.beta, event.gamma);
}
  `},  
  {
    title: "Device Motion", 
    code: `
window.ondevicemotion = (event) => {
  console.log(event.acceleration); // x, y, z
}
  `}
];

const demo = {
  init: (ctx) => {
    ctx.setState({
      alpha: 0,
      beta: 0,
      gamma: 0
    });
    window.ondeviceorientation = (e) => {
      ctx.setState({
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma
      });
    }
  },
  render: (ctx) => {
    let {alpha, beta, gamma} = ctx.state;
    let imgTransform = {
      transform: `rotateX(${alpha}deg) rotateY(${beta}deg) rotateZ(${gamma}deg)`
    };
    return (
      <div>
        <img src={ImageBanana} alt="A Banana that rotates" style={imgTransform} />
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
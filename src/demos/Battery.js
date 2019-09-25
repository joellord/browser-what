import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 

const name = "Battery API";
const demoName = "battery";
const details = [
  "Gives you the status of a battery",
  "Might be deprecated due to privacy issues",
  "Uses a promise based API"
];
const codeSamples = [
  {
    title: "Battery Level", 
    code: `
navigator.getBattery().then(battery => {
  console.log(battery.level);
});
  `},  
  {
    title: "Events", 
    code: `
navigator.getBattery().then(battery => {
  battery.onchargingchange = () => {
    console.log(battery.charging);
  }

  battery.onlevelchange = () => {
    console.log(battery.level)
  }
});
  `},
  {
    title: "Charging/Discharging Times", 
    code: `
navigator.getBattery().then(battery => {
  console.log(battery.chargingTime);
  console.log(battery.dischargingTime);
});
  `}
];

const demo = {
  init: (ctx) => {
    ctx.setState({
      battery: {
        level: 0,
        charging: false,
        chargingTime: 0,
        dischargingTime: 0
      }
    });
  },
  render: (ctx) => {
    navigator.getBattery().then(battery => {
      ctx.setState({battery});
    });

    return (
      <div>
        <div>Battery Level: {ctx.state.level}</div>
        <div>Battery Charging: {ctx.state.charging}</div>
        <div>Battery Charging Time: {ctx.state.chargingTime}</div>
        <div>Battery Discharging Time: {ctx.state.dischargingTime}</div>
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo);
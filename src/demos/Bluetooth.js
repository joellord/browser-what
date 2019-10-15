import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator";
import ImgBluetooth from "../assets/bluetooth.jpg";

const name = "Bluetooth API";
const demoName = "bluetooth";
const image = ImgBluetooth;
const details = [
  "Connects to Bluetooth devices",
  "Promise based API",
  "Every device is highly different"
];
const codeSamples = [
  {
    title: "Connect to a device", 
    code: `
return navigator.bluetooth.requestDevice({acceptAllDevices: true})
  .then(device => {
      return device.gatt.connect();
  })
  .then(server => {
      return server.getPrimaryService()
  })
  .then(service => {
      return service.getCharacteristic()
  })
  .then(character => {
      this.characteristic = character;
      //Do something
  });
  `},  
  {
    title: "Connect to a HR monitor", 
    code: `
return navigator.bluetooth.requestDevice({filters: [{services: ['heart_rate']}]})
  .then(device => {
      return device.gatt.connect();
  })
  .then(server => {
      return server.getPrimaryService('heart_rate')
  })
  .then(service => {
      return service.getCharacteristic('heart_rate_measurement')
  })
  .then(character => {
      this.characteristic = character;
      return this.characteristic.startNotifications().then(_ => {
          this.characteristic.addEventListener('characteristicvaluechanged',
              this.heartRateChange.bind(this));
      });
  });
  `}
];

const demo = {
  init: (ctx) => {

  },
  render: (ctx) => {
    const startBt = () => {
      ctx.characteristic = null;
      ctx.setState({chartData: []});
      return navigator.bluetooth.requestDevice({filters: [{services: ['heart_rate']}]})
        .then(device => {
          return device.gatt.connect();
        })
        .then(server => {
          return server.getPrimaryService('heart_rate')
        })
        .then(service => {
          return service.getCharacteristic('heart_rate_measurement')
        })
        .then(character => {
          ctx.characteristic = character;
          return ctx.characteristic.startNotifications().then(_ => {
            ctx.characteristic.addEventListener('characteristicvaluechanged', (e) => {
              const value = e.target.value;
              const currentHeartRate = value.getUint8(1);
              const chartData = [...ctx.state.chartData, {time: +Date.now(),heartRate:currentHeartRate}];
              ctx.setState({chartData});
              ctx.sendMessage("demo", {name: "bluetooth", heartRate: currentHeartRate});
            });
          });
        }).catch(e => console.log(e.message));
    };
    return (
      <div>
        <button onClick={startBt} id="btEnable"><span role="img" aria-label="beating heart">💓</span></button>
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
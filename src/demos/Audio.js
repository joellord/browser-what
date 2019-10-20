import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import ImgAudio from "../assets/audio.jpg";

const name = "Web Audio API";
const demoName = "audio";
const image = ImgAudio;
const details = [
  "Takes and audio stream and manipulates it",
  "You can modulate the sound with oscillators"
];
const codeSamples = [
  {
    title: "Web Audio API", 
    code: `
let audioCtx = new AudioContext();
let oscillator = audioCtx.createOscillator();
let gainNode = audioCtx.createGain();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
  `},  
  {
    title: "Change the frequency", 
    code: `
oscillator.frequency.value = 2000;
  `},
  {
    title: "Change the volume (gain)",
    code: `
gainNode.gain.value = 0.1;
  `}
];

const demo = {
  support: {
    ios: false,
    android: true,
    desktop: true
  },
  init: (ctx) => {
    ctx.setState({
      freq: 2000,
      gain: 1
    });
  },
  render: (ctx) => {
    const WIDTH = 300;
    const HEIGHT = 300;
    let audioCtx = new AudioContext();
    let oscillator = audioCtx.createOscillator();
    let analyzer = audioCtx.createAnalyser();
    oscillator.connect(analyzer);
    analyzer.connect(audioCtx.destination);
    oscillator.frequency.value = 440;
    let isPlaying = false;
    analyzer.fftSize = 2048;
    let bufferLength = analyzer.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    let canvas, canvasCtx;
    ctx.oscillator = oscillator;
    setTimeout(() => {
      canvas = document.querySelector("#audioCanvas");
      canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      drawWave();
    }, 0);
    const handleOscillatorType = (e) => {
      oscillator.type = e.target.value;
    }
    const handleFreqChange = (e) => {
      if (!isPlaying) {
        oscillator.start();
        isPlaying = true;
      }
      oscillator.frequency.value = e.target.getAttribute("data-freq");
    }
    const handleStop = () => {
      oscillator.stop();
    };
    const drawWave = () => {
      setTimeout(drawWave, 100);
      analyzer.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = "rgb(200, 200, 200)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 0, 0)";
      canvasCtx.beginPath();
      let sliceWidth = WIDTH * 2.5 / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        let y = v * HEIGHT/2;
        if (i===0) {
          canvasCtx.moveTo(x, y);
        } else { 
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };
    return (
      <div>
        <canvas id="audioCanvas" width={WIDTH} height={HEIGHT}></canvas>
        <hr/>
        <button onClick={handleStop}>Stop Sound</button><br/>
        <button data-freq="261" onClick={handleFreqChange}>Do</button>
        <button data-freq="293" onClick={handleFreqChange}>Re</button>
        <button data-freq="329" onClick={handleFreqChange}>Mi</button>
        <button data-freq="349" onClick={handleFreqChange}>Fa</button>
        <button data-freq="392" onClick={handleFreqChange}>So</button>
        <button data-freq="440" onClick={handleFreqChange}>La</button>
        <button data-freq="466" onClick={handleFreqChange}>Si</button>
        <button data-freq="523" onClick={handleFreqChange}>Do</button><br/>
        Wave: <select onChange={handleOscillatorType}>
          <option>sine</option>
          <option>square</option>
          <option>sawtooth</option>
          <option>triangle</option>
        </select>
      </div>
    )
  },
  destroy: (ctx) => {
    ctx.oscillator.stop();
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
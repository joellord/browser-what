import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 

const name = "Notifications API";
const demoName = "notifications";
const details = [
  "Alerts users outside of a page",
  "Not to be confused with Push notifications",
  "Requires the user permission first"
];
const codeSamples = [
  {
    title: "Notifications", 
    code: `
//Express Server
const http = require('http').createServer(app);
const io = require('socket.io')(http);

http.listen(PORT, () => console.log("Server running"));    
  `},  
  {
    title: "Client", 
    code: `
<script src="/socket.io/socket.io.js"></script>
<script>
let socket = io();
</script>
  `},
  {
    title: "Client", 
    code: `
socket.on("connect", () => {
  console.log("Connected");
});
  `},
  {
    title: "Client", 
    code: `
socket.emit("message", "Hello World!");
    `},
  {
    title: "Client", 
    code: `
socket.on("message", msg => {
  alert(msg);
});
    `},
];

const demo = {
  demoSocketCb: (msg, ctx) => {
    console.log("cb", ctx);
    let lastMessages = ctx.state.lastMessages
    lastMessages.push(msg);
    if (lastMessages.length > 5) lastMessages.shift();
    ctx.setState({
      lastMessages
    });
  },
  render: (ctx) => {
    return (
      ctx.state.lastMessages.map(m => <p>{m.msg}</p>)
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo);
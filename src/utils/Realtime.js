import Emitter from "es6-event-emitter";
import openSocket from "socket.io-client";

class Realtime extends Emitter {

  constructor() {
    super();

    const server = process.env.PROD ? window.location.origin : "http://localhost:8888";
    this.socket = openSocket(server);

    this.socket.on("connect", () => {
      console.log("Connected to Socket");
    });
  }

  showDemo(name) {
    this.socket.emit("demoChange", {demo: name});
  }

  finishDemo() {
    this.socket.emit("demoChange", {demo: false});
  }

  subscribeDemo(cb) {
    this.socket.on("demo", cb);
  }

  unsubscribeDemo(cb) {
    this.socket.off("demo", cb);
  }

  sendMessage(channel, message) {
    this.socket.emit(channel, message);
  }
}

let instance = new Realtime();
export default instance;
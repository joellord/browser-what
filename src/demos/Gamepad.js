import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import ImgGamepad from "../assets/gamepad.jpg";

const name = "Gamepad API";
const demoName = "gamepad";
const image = ImgGamepad;
const details = [
  "Processes input from a USB connected gamepad",
  "Great for games or funky navigation in your app",
  "Buttons and axes are different per browser"
];
const codeSamples = [
  {
    title: "Gamepad API", 
    code: `
window.addEventListener("gamepadconnected", (e) => {
  console.log("Gamepad connected", e.gamepad);
});
  `},  
  {
    title: "Check button state", 
    code: `
const gameLoop = () => {
  let gamepad = gamepads[0];
  console.log(gamepad.buttons[0].pressed);
};
setInterval(gameLoop, 50);
  `}
];


let missiles = [];
const createMissile = (colNum) => {
  let missile = document.createElement("span");
  missile.classList.add("missile");
  missiles.push(missile);
  let row = document.querySelector("#missiles");
  row.childNodes[colNum].appendChild(missile);
}
const destroyMissile = (missileIndex) => {
  missiles[missileIndex].remove();
  delete missiles[missileIndex];
}
let torpedos = [];
let canCreateTorpedo = true;
const fireTorpedo = (colNum) => {
  if (canCreateTorpedo) {
    let row = document.querySelector("#missiles");
    let height = row.getAttribute("height");
    let torpedo = document.createElement("span");
    torpedo.classList.add("torpedo");
    torpedo.style.top = -1 * height + "px";
    torpedo.style.left = "0px";
    torpedos.push(torpedo);
    row.childNodes[colNum].appendChild(torpedo);
    canCreateTorpedo = false;
    setTimeout(() => canCreateTorpedo = true, 300);
  }
}
const destroyTorpedo = (torpedoIndex) => {
  torpedos[torpedoIndex].remove();
  delete torpedos[torpedoIndex];
}
let gameStarted = false;

const demo = {
  support: {
    ios: true,
    android: true,
    desktop: true
  },
  init: (ctx) => {
    ctx.setState({
      score: 0,
      gamepadBtnA: false,
      gamepadBtnB: false,
      gamepadBtnRight: false,
      gamepadBtnLeft: false,
      gamepadBtnUp: false,
      gamepadBtnDown: false,
      gamepadConnected: false
    });
  },
  demoSocketCb: (msg, ctx) => {
    if (!msg.name === "gamepad") return;
    if (!gameStarted) return;
    let col = 0;
    switch(msg.button) {
      case "up": col = 0; break;
      case "down": col = 1; break;
      case "left": col = 2; break;
      case "right": col = 3; break;
      case "a": col = 4; break;
      case "b": col = 5; break;
      default: break;
    }
    createMissile(col);
  },
  render: (ctx) => {
    let gamepad;
    window.addEventListener("gamepadconnected", (e) => {
      gamepad = e.gamepad;
      ctx.setState({gamepadConnected: true});
      gameLoop();
      setTimeout(() => gameStarted = true, 5000);
    });
    window.ongamepaddisconnected = (e) => {
      gamepad = null;
      ctx.setState({gamepadConnected: false});
    }
    const flashScreen = (colour) => {
      let body = document.querySelector("body");
      setTimeout(() => body.style.background = colour, 100);
      setTimeout(() => body.style.background = "none", 200);
      setTimeout(() => body.style.background = colour, 300);
      setTimeout(() => body.style.background = "none", 400);
      setTimeout(() => body.style.background = colour, 500);
      setTimeout(() => body.style.background = "none", 600);
    }
    const boom = (missileIndex) => {
      flashScreen("red");
      destroyMissile(missileIndex);
      ctx.setState({score: ctx.state.score - 1});
    }
    const lostTorpedo = (torpedoIndex) => {
      destroyTorpedo(torpedoIndex);
      ctx.setState({score: ctx.state.score -1});
    }
    const torpedoDestroysMissile = (tIndex, mIndex) => {
      flashScreen("blue");
      destroyMissile(mIndex);
      destroyTorpedo(tIndex);
      ctx.setState({score: ctx.state.score + 1});
    }
    const gameLoop = () => {
      if (navigator.userAgent.indexOf("Chrome") > -1) {
        // Chrome
        gamepad = navigator.getGamepads()[0];
        ctx.setState({
          gamepadBtnA: gamepad.buttons[0].pressed,
          gamepadBtnB: gamepad.buttons[1].pressed,
          gamepadBtnRight: gamepad.buttons[14].pressed,
          gamepadBtnLeft: gamepad.buttons[13].pressed,
          gamepadBtnUp: gamepad.buttons[11].pressed,
          gamepadBtnDown: gamepad.buttons[12].pressed
        });
      } else {
        // Mozilla
        ctx.setState({
          gamepadBtnA: gamepad.buttons[0].pressed,
          gamepadBtnB: gamepad.buttons[1].pressed,
          gamepadBtnRight: gamepad.axes[6] === 1,
          gamepadBtnLeft: gamepad.axes[6] === -1,
          gamepadBtnUp: gamepad.axes[7] === -1,
          gamepadBtnDown: gamepad.axes[7] === 1
        });
      }
      if (canCreateTorpedo) {
        if (ctx.state.gamepadBtnUp) fireTorpedo(0);
        if (ctx.state.gamepadBtnDown) fireTorpedo(1);
        if (ctx.state.gamepadBtnLeft) fireTorpedo(2);
        if (ctx.state.gamepadBtnRight) fireTorpedo(3);
        if (ctx.state.gamepadBtnA) fireTorpedo(4);
        if (ctx.state.gamepadBtnB) fireTorpedo(5);
      }
      let row = document.querySelector("#missiles");
      if (!row) return;
      let height = row.getAttribute("height");
      missiles.map((m, index) => {
        if (!m.style.top) m.style.top = "0px";
        let missileTop = parseInt(m.style.top);
        m.style.top = missileTop - 1 + "px";
        if (missileTop < (-1 * height + 25)) {
          boom(index);
        }
        return m;
      });
      torpedos.map((t, index) => {
        let torpedoTop = parseInt(t.style.top);
        t.style.top = torpedoTop + 1 + "px";
        if(torpedoTop > 0) {
          lostTorpedo(index);
        }
        missiles.map((m, mIndex) => {
          if (t.parentNode === m.parentNode) {
            let mTop = parseInt(m.style.top);
            if (Math.abs(torpedoTop) - Math.abs(mTop) < 15) {
              torpedoDestroysMissile(index, mIndex);
            }
          }
          return m;
        });
        return t;
      });
      setTimeout(gameLoop, 50);
    };
    let gamepadBtnStyle = {
      display: "inline-block",
      border: "solid 2px black",
      borderRadius: "100%",
      width: "4em",
      height: "4em",
      fontSize: "2em",
      paddingTop: "1.25em",
      marginRight: "1em"
    };
    return (
      <div className="gamepadGame">
        <h3>Score: {ctx.state.score}</h3>
        <table><tbody>
        {ctx.state.gamepadConnected && 
        <tr>
          <td><div style={{...gamepadBtnStyle, background: ctx.state.gamepadBtnUp ? "#ff0000" : "#ffeeee"}}>^</div></td>
          <td><div style={{...gamepadBtnStyle, background: ctx.state.gamepadBtnDown ? "#00ff00" : "#eeffee"}}>v</div></td>
          <td><div style={{...gamepadBtnStyle, background: ctx.state.gamepadBtnLeft ? "#ffff00" : "#ffffee"}}>&lt;</div></td>
          <td><div style={{...gamepadBtnStyle, background: ctx.state.gamepadBtnRight ? "#0000ff" : "#eeeeff"}}>&gt;</div></td>
          <td><div style={{...gamepadBtnStyle, background: ctx.state.gamepadBtnA ? "#ff00ff" : "#ffeeff"}}>A</div></td>
          <td><div style={{...gamepadBtnStyle, background: ctx.state.gamepadBtnB ? "#00ffff" : "#eeffff"}}>B</div></td>
        </tr>
        }
        {!ctx.state.gamepadConnected && 
        <tr><td colSpan="6">Please connect gamepad</td></tr>
        }
        <tr height="300" id="missiles">
          <td valign="bottom"></td>
          <td valign="bottom"></td>
          <td valign="bottom"></td>
          <td valign="bottom"></td>
          <td valign="bottom"></td>
          <td valign="bottom"></td>
        </tr>
        </tbody>
        </table>
      </div>
    )
  },
  destroy: (ctx) => {
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
import React from 'react';

import DeckOnSteroids from "./components/DeckOnSteroids";
import { Slide, Title, Subtitle, List, Text, Image, Footer } from "@sambego/diorama";
import GetReady from "./slides/GetReady";
import ThankYou from "./slides/ThankYou";
import TalkTitle from "./slides/TalkTitle";
import About from "./slides/About";

import WS from "./demos/Websockets";
import Notif from "./demos/Notifications";
import Loc from "./demos/Location";
import PV from "./demos/PageVisibility";
import Spk from "./demos/Speech";
import OnlineOffline from "./demos/Online";
import DeviceOrientation from "./demos/DeviceOrientation";
import Vibrate from "./demos/Vibrate";
import Clipboard from "./demos/Clipboard";
import UM from "./demos/UserMedia";
import Audio from "./demos/Audio";
import Gamepad from "./demos/Gamepad";
import Bluetooth from "./demos/Bluetooth";

import './App.css';
import ImgBye from "./assets/bye.gif";
import ImgWoohoo from "./assets/woohoo.gif";

const titleStyleForImageSlide = {
  position: "absolute",
  left: "50%",
  top: "35%",
  transform: "translate3d(-50%, -50%, 0)",
  color: "#fff",
  margin: 0,
  fontSize: "6rem",
  background: "#000000cc"
};

const titleStyleForWoohoo = Object.assign({}, titleStyleForImageSlide, {top: "50%"});

function App() {
  const footer = <Footer left="@joel__lord&nbsp;&nbsp;#sflcc" right="&nbsp;" />

  return (
    <div className="App">
      <DeckOnSteroids swipeToChange={false} footer={footer}>
        <Slide>
          <Title>
            Joel TODO
          </Title>
          <List>
            <li>Change the Google API key</li>
            <li>Set Env variables?</li>
            <li>Change the socket server in Realtime.js</li>
          </List>
        </Slide>

        <TalkTitle />

        <About />

        <Slide>
          <Image src={ImgWoohoo} full />
          <Title style={titleStyleForWoohoo}>Twitter Notifications</Title>
        </Slide>

        <Slide>
          <Title>Live Demos!</Title>
          <Subtitle><a href="#" style={{fontSize: "3.5vw"}}>http://ezurl.to/browser-what</a></Subtitle>
        </Slide>

        {/* WebSockets */}
        <WS.Title />
        <WS.Details />
        <WS.Code1 />
        <WS.Code2 />
        <WS.Code3 />
        <WS.Code4 />
        <WS.Code5 />
        <GetReady />
        <WS.Demo />
        <WS.Support />

        <Slide>
          <Title>What about those Web APIs You Promised?</Title>
        </Slide>

        {/* Notifications */}
        <Notif.Title />
        <Notif.Details />
        <Notif.Code1 />
        <Notif.Code2 />
        <Notif.Code3 />
        <Notif.Code4 />
        <GetReady />
        <Notif.Demo />
        <Notif.Support />

        <Slide>
          <Title>Not impressive, they're used all over and are annoying.</Title>
        </Slide>

        {/* Location */}
        <Loc.Title />
        <Loc.Details />
        <Loc.Code1 />
        <Loc.Code2 />
        <Loc.Code3 />
        <GetReady />
        <Loc.Demo />
        <Loc.Support />

        <Slide>
          <Title>Been there, done that. Show me something new!</Title>
        </Slide>

        {/* Page Visibility */}
        <PV.Title />
        <PV.Details />
        <PV.Code1 />
        <PV.Code2 />
        <GetReady />
        <PV.Demo />
        <PV.Support />

        <Slide>
          <Title>Ok, but show me some cool stuff!</Title>
        </Slide>

        {/* Speech */}
        <Spk.Title />
        <Spk.Details />
        <Spk.Code1 />
        <Spk.Code2 />
        <Spk.Code3 />
        <GetReady />
        <Spk.Demo />
        <Spk.Support />
        
        <Slide>
          <Title>That's fun... will you show anything practical in this talk?</Title>
        </Slide>

        {/* Online/Offline */}
        <OnlineOffline.Title />
        <OnlineOffline.Details />
        <OnlineOffline.Code1 />
        <OnlineOffline.Code2 />
        <GetReady />
        <OnlineOffline.Demo />
        <OnlineOffline.Support />

        <Slide>
          <Title>Good! Got anything else useful?</Title>
        </Slide>

        {/* Device Orientation */}
        <DeviceOrientation.Title />
        <DeviceOrientation.Details />
        <DeviceOrientation.Code1 />
        <DeviceOrientation.Code2 />
        <GetReady />
        <DeviceOrientation.Demo />
        <DeviceOrientation.Support />

        <Slide>
          <Title>Interesting, any other mobile sensors we can use?</Title>
        </Slide>

        {/* Vibrate */}
        <Vibrate.Title />
        <Vibrate.Details />
        <Vibrate.Code1 />
        <Vibrate.Code2 />
        <Vibrate.Code3 />
        <GetReady />
        <Vibrate.Demo />
        <Vibrate.Support />

        <Slide>
          <Title>Meh...</Title>
        </Slide>

        {/* Clipboard */}
        <Clipboard.Title />
        <Clipboard.Details />
        <Clipboard.Code1 />
        <Clipboard.Code2 />
        <GetReady />
        <Clipboard.Demo />
        <Clipboard.Support />

        <Slide>
          <Title>Now that was useful!</Title>
        </Slide>

        {/* getUserMedia */}
        <UM.Title />
        <UM.Details />
        <UM.Code1 />
        <UM.Code2 />
        <UM.Code3 />
        <GetReady />
        <UM.Demo />
        <UM.Support />

        <Slide>
          <Title>Wah!</Title>
        </Slide>

        {/* Audio */}
        <Audio.Title />
        <Audio.Details />
        <Audio.Code1 />
        <Audio.Code2 />
        <Audio.Code3 />
        <GetReady />
        <Audio.Demo />
        <Audio.Support />

        <Slide>
          <Title>Make the sounds stop!</Title>
        </Slide>

        {/* Gamepad */}
        <Gamepad.Title />
        <Gamepad.Details />
        <Gamepad.Code1 />
        <Gamepad.Code2 />
        <GetReady />
        <Gamepad.Demo />
        <Gamepad.Support />

        <Slide>
          <Title>That was fun!</Title>
        </Slide>

        {/* Bluetooth API */}
        <Bluetooth.Title />
        <Bluetooth.Details />
        <Bluetooth.Code1 />
        <Bluetooth.Code2 />
        <GetReady />
        <Bluetooth.Demo />
        <Bluetooth.Support />

        <Slide>
          <Title>So cool!</Title>
        </Slide>

        <Slide>
          <Title>Deprecated APIs</Title>
          <List>
            <li>Battery API</li>
            <li>Context Menu</li>
          </List>
        </Slide>

        <Slide>
          <Title>Experimental APIs</Title>
          <List>
            <li>Ambient Light</li>
          </List>
        </Slide>


        <Slide>
          <Title>In Summary</Title>
          <List>
            <li>A lot of APIs are available</li>
            <li>Ultimately, we might build fully native apps in the browser</li>
            <li>Explore and have fun</li>
          </List>
        </Slide>

        <Slide>
          <Title>Resources</Title>
          <Text>Here are some resources</Text>
          <List>
            <li><a href="https://developer.mozilla.org/">MDN</a></li>
            <li><a href="https://caniuse.com/">Can I Use</a></li>
          </List>
        </Slide>

        <Slide>
          <Image src={ImgBye} full />
        </Slide>

        <ThankYou />

      </DeckOnSteroids>
    </div>
  );
}

export default App;

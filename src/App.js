import React from 'react';

import DeckOnSteroids from "./components/DeckOnSteroids";
import { Slide, Title, List } from "@sambego/diorama";
import GetReady from "./slides/GetReady";

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

import './App.css';

function App() {
  return (
    <div className="App">
      <DeckOnSteroids swipeToChange={false}>
        <Slide>
          <Title>
            Joel TODO
          </Title>
          <List>
            <li>Change the Google API key</li>
            <li>Set Env variables?</li>
          </List>
        </Slide>

        <Slide>
          <Title>Title</Title>
        </Slide>

        <Slide>
          <Title>About Me</Title>
        </Slide>

        <Slide>
          <Title>Connect to the App</Title>
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

        <Slide>
          <Title>APIs To Add</Title>
          <List>
            <li>Audio processing (on getUserMedia audio)</li>
            <li>Gamepad API</li>
            <li>Bluetooth API</li>
          </List>
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

      </DeckOnSteroids>
    </div>
  );
}

export default App;

import React from 'react';

import DeckOnSteroids from "./components/DeckOnSteroids";
import { Slide, Title } from "@sambego/diorama";
import GetReady from "./slides/GetReady";

import WS from "./demos/Websockets";
import Notif from "./demos/Notifications";
import Loc from "./demos/Location";
import PV from "./demos/PageVisibility";
import Spk from "./demos/Speech";

import './App.css';

function App() {
  return (
    <div className="App">
      <DeckOnSteroids swipeToChange={false}>
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
          <Title>Ok, but show me some cool stuff!</Title>
        </Slide>

      </DeckOnSteroids>
    </div>
  );
}

export default App;

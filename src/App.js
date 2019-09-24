import React from 'react';

import DeckOnSteroids from "./components/DeckOnSteroids";
import DemoSlide from "./components/DemoSlide";
import { Slide, Title, Subtitle, List, Code, Text } from "@sambego/diorama";
import GetReady from "./slides/GetReady";

import WS from "./slides/Websockets";
import Notif from "./demos/Notifications";

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
        

        <Slide>
          <Subtitle>Notifications</Subtitle>
        </Slide>

      </DeckOnSteroids>
    </div>
  );
}

export default App;

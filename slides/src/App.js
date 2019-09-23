import React from 'react';

import { Deck, Slide, Title } from "@sambego/diorama";

import './App.css';

function App() {
  return (
    <div className="App">
      <Deck>
        <Slide>
          <Title>Hello</Title>
        </Slide>
        
        <Slide>
          <Title>Hello</Title>
        </Slide>
      </Deck>
    </div>
  );
}

export default App;

import React, { Component } from "react";

import {Slide, Title, Subtitle, Text, List, Browser, Code } from "@sambego/diorama";
import DemoSlide from "../components/DemoSlide";
import realtime from "../utils/Realtime";

const slidesGeneration = (name, demoName, details, codeSamples, demo) => {
  let components = {};

  class Demo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        lastMessages: []
      }

      this.handleMessage = this.handleMessage.bind(this);
    }

    handleMessage(msg) {
      if (demo.demoSocketCb) {
        demo.demoSocketCb(msg, this);
      }
    }

    componentDidMount() {
      realtime.subscribeDemo(this.handleMessage);
    }

    componentWillUnmount() {
      realtime.unsubscribeDemo(this.handleMessage);
    }

    render() {
      let demoRender = demo.render(this);
      return (
        <DemoSlide name={demoName}>
          <Subtitle>{name} Demo</Subtitle>
          <Text>
            {demoRender}
          </Text>
        </DemoSlide>
      )
    }
  }
  components["Demo"] = Demo;

  components["Title"] = () => (
    <Slide>
      <Title>{name}</Title>
    </Slide>
  );

  components["Details"] = () => (
    <Slide>
      <Subtitle>{name}</Subtitle>
      <List>
        {details.map(i => (<li>{i}</li>))}
      </List>
    </Slide>
  );

  components["Support"] = () => (
    <Slide>
      <Browser url={`https://caniuse.com/#search=${demoName}`} />
    </Slide>
  );

  for (let i = 0; i < codeSamples.length; i++) {
    components[`Code${i+1}`] = () => (
      <Slide>
        <Subtitle>{codeSamples[i].title}</Subtitle>
        <Code code={codeSamples[i].code} />
      </Slide>
    );
  }

  return components;
}

export {
  slidesGeneration
}
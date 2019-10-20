import React, { Component } from "react";

import {Slide, Title, Subtitle, List, Browser, Code, Image } from "@sambego/diorama";
import DemoSlide from "../components/DemoSlide";
import realtime from "../utils/Realtime";

const slidesGeneration = (name, demoName, details, codeSamples, demo, image) => {
  let components = {};

  class Demo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        lastMessages: []
      }

      this.handleMessage = this.handleMessage.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
    }

    handleMessage(msg) {
      if (demo.demoSocketCb) {
        demo.demoSocketCb(msg, this);
      }
    }

    sendMessage(channel, msg) {
      realtime.sendMessage(channel, msg);
    }

    componentDidMount() {
      if (demo.init) demo.init(this);
      realtime.subscribeDemo(this.handleMessage);
    }

    componentWillUnmount() {
      if (demo.destroy) demo.destroy(this);
      realtime.unsubscribeDemo(this.handleMessage);
    }

    render() {
      let demoRender = demo.render(this);
      return (
        <DemoSlide name={demoName}>
          <Subtitle>{name} Demo</Subtitle>
          <div>
            <div>
              {demoRender}
            </div>
            {demo.support && 
            <div>
              {demo.support.ios ? "👍" : "👎" } iOS / 
              {demo.support.android ? "👍" : "👎" }Android / 
              {demo.support.desktop ? "👍" : "👎" }Desktop
            </div>
            }
          </div>
        </DemoSlide>
      )
    }
  }
  components["Demo"] = Demo;

  const titleStyleForImageSlide = {
    position: "absolute",
    left: "50%",
    top: "35%",
    transform: "translate3d(-50%, -50%, 0)",
    color: "#fff",
    margin: 0,
    background: "#000000cc"
  };
  
  components["Title"] = () => (
    <Slide>
      {image &&
      <Image src={image} full />
      }
      <Title style={titleStyleForImageSlide}>{name}</Title>
    </Slide>
  );

  components["Details"] = () => (
    <Slide>
      <Subtitle>{name}</Subtitle>
      <List>
        {details.map((i, index) => (<li key={index}>{i}</li>))}
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
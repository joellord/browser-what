import React, { Component } from "react";
import { Slide } from "@sambego/diorama";
import realtime from "../utils/Realtime";

export default class DemoSlide extends Component {
  constructor(props) {
    super(props);

    realtime.showDemo(props.name);
  }

  componentWillUnmount() {
    realtime.finishDemo();
  }

  render() {
    return (
      <Slide>
        { this.props.children }
      </Slide>
    )
  }
}

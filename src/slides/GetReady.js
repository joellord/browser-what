import React, { Component } from "react";
import { Slide, Title, Subtitle } from "@sambego/diorama";
import slide from "../utils/SlideState";
import realtime from "../utils/Realtime";
import { NOTIF_ICON } from "../utils/constants";

export default class GetReady extends Component {
  timer;

  constructor(props) {
    super(props);

    this.state = {countdown: 5};
    this.decreaseTimer = this.decreaseTimer.bind(this);
  }

  componentWillMount() {
    this.decreaseTimer();
    realtime.sendMessage("notification", {
      text: "Get Ready for a Demo!",
      options: {
        body: "New demo starting in 5 seconds, open the app",
        icon: NOTIF_ICON
      }
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  decreaseTimer() {
    this.timer = setTimeout(() => {
      this.setState({countdown: this.state.countdown - 1});
      if (this.state.countdown >= 0) {
        this.decreaseTimer();
      } else {
        slide.nextSlide();
      }
    }, 1000)
  }

  render() {
    return (
      <Slide>
        <Title>Time for a new Demo!</Title>
        <Subtitle>Get Ready!</Subtitle>
        <Title>{this.state.countdown}</Title>
        <Subtitle><a href="https://ezurl.to/browser-what">https://ezurl.to/browser-what</a></Subtitle>
      </Slide>
    )
  }
}
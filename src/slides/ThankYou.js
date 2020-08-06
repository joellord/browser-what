import React, { Component } from "react";
import { Slide, Title, Text, Subtitle } from "@sambego/diorama";

export default class ThankYou extends Component {
  render() {
    return (
      <Slide>
        <Title>Thank You!</Title>
        <Text>My Browser Does What?</Text>
        <Text>JS & Friends - Online - August 2020</Text>
        <br/>
        <Subtitle><a href="https://ezurl.to/browser-api" style={{"textTransform": "none"}}>ezurl.to/browser-api</a></Subtitle>
      </Slide>
    )
  }
}

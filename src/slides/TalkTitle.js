import React, { Component } from "react";
import { Slide, Image, Title } from '@sambego/diorama';
import ImgBrowser from "../assets/browser.jpg";


export default class TalkTitle extends Component {
  render() {
    return (
      <Slide>
        <Image src={ImgBrowser} full color="#6666ff" />
        <Title style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate3d(-50%, -50%, 0)', color: '#fff', margin: 0}}>
          My Browser Does What?<br/>
        </Title>
      </Slide>
    )
  }
}
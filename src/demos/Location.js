import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import ImgGeolocation from "../assets/geolocation.jpg"

const name = "Geolocation API";
const demoName = "location";
const image = ImgGeolocation;
const details = [
  "Returns the position of the user in lat/long",
  "You can also track movement",
  "Requires an https connection on mobile devices"
];
const codeSamples = [
  {
    title: "Check for support", 
    code: `
if ("geolocation" in navigator) {
  /* It's present */
} else {
  alert("Your browser does not support geolocation");
}
  `},  
  {
    title: "Get the position", 
    code: `
navigator.geolocation.getCurrentPosition(pos => {
  alert(\`Latitude: \${pos.coords.latitude}, Longitude: \${pos.coords.longitude}\`);
});
  `},
  {
    title: "Track movements", 
    code: `
let watchID = navigator.geolocation.watchPosition(pos => {
  do_something(pos);
});
// Stop tracking
navigator.geolocation.clearWatch(watchID);
  `}
];

const demo = {
  support: {
    ios: true,
    android: true,
    desktop: true
  },
  init: (ctx) => {
    navigator.geolocation.getCurrentPosition(pos => {
      ctx.setState({pos, soWhat: true});
      const url = `/findCity?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`;
      fetch(url).then(resp => resp.json()).then(data => {
        ctx.setState({city: data.long_name})
      });
    });
  },
  render: (ctx) => {
    let position = ctx.state.pos ? ctx.state.pos.coords : {latitude: 0, longitude: 0};
    
    const showCity = () => {
      ctx.setState({showCity: true});
    }
    const showImage = () => {
      ctx.setState({image: `/googleImage/?lat=${position.latitude}&lng=${position.longitude}`});
    }

    return (
      <div>
        This presentation is given at {position.latitude}, {position.longitude}<br/>
        {ctx.state.soWhat && 
        <div><button onClick={showCity}>So what?</button></div>
        }
        {ctx.state.showCity && 
        <div>
          Looks like you are in {ctx.state.city}<br/>
          <button onClick={showImage}>Meh...</button>
        </div>
        }
        {ctx.state.image && 
        <div>
          <img alt="Satellite view of your current position" src={ctx.state.image} />
        </div>
        }
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
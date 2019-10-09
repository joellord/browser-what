import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import { GOOGLE_MAPS_API_KEY } from "../utils/constants";

const name = "Geolocation API";
const demoName = "location";
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
  init: (ctx) => {
    navigator.geolocation.getCurrentPosition(pos => {
      ctx.setState({pos, soWhat: true});
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&sensor=true&key=${GOOGLE_MAPS_API_KEY}`;
      fetch(url).then(resp => resp.json()).then(data => {
        console.log(data);
        ctx.setState({city: "Munich"})
      });
    });
  },
  render: (ctx) => {
    let position = ctx.state.pos ? ctx.state.pos.coords : {latitude: 0, longitude: 0};
    
    const showCity = () => {
      ctx.setState({showCity: true});
    }
    const showImage = () => {
      ctx.setState({image: `https://maps.googleapis.com/maps/api/staticmap?center=${position.latitude},${position.longitude}&zoom=19&maptype=satellite&size=400x400&key=${GOOGLE_MAPS_API_KEY}`});
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

export default slidesGeneration(name, demoName, details, codeSamples, demo);
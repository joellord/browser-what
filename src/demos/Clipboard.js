import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 

const name = "Clipboard API";
const demoName = "clipboard";
const details = [
  "Useful if you share snippets of code",
  "Paste does not work will all browsers",
  "Can do text or binary objects",
  "User triggered events only"
];
const codeSamples = [
  {
    title: "Copy Text", 
    code: `
navigator.clipboard.writeText("Some Text").then(
  _ => {
    console.log("Success");
  }, e => {
    console.log("Error", e);
  }
)
  `},  
  {
    title: "Paste Text", 
    code: `
navigator.clipboard.readText().then(
  data => {
    console.log(data);
  }, e => {
    console.log("Error", e);
  }
)
  `}
];

const demo = {
  init: (ctx) => {
    ctx.setState({
      clipboardText: "Some Lorem Ipsum stuff"
    });
  },
  render: (ctx) => {
    const handleCopy = () => {
      navigator.clipboard.writeText(ctx.state.clipboardText).then(_ => {

      }).catch(e => console.log(e));
    };
    const handleFlush = () => {
      ctx.setState({
        clipboardText: ""
      });
    };
    const handlePaste = () => {
      navigator.clipboard.readText().then(data => {
        ctx.setState({clipboardText: data});
      }).catch(e => {
        console.log(e);
      });
    };
    const handleChange = (e) => {
      ctx.setState({clipboardText: e.target.value});
    };
    return (
      <div>
        <div>
          <button onClick={handleCopy}>Copy</button>
          <button onClick={handleFlush}>Flush</button>
          <button onClick={handlePaste}>Paste</button>
        </div>
        <div>
          <input type="text" value={ctx.state.clipboardText} onChange={handleChange} />
        </div>
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo);
import React from "react";
import { slidesGeneration } from "../utils/SlidesGenerator"; 
import { NOTIF_ICON } from "../utils/constants";
import ImgNotification from "../assets/notification.jpg"

const name = "Notifications API";
const demoName = "notifications";
const image = ImgNotification;
const details = [
  "Alerts users outside of a page",
  "Not to be confused with Push notifications",
  "Requires the user permission first"
];
const codeSamples = [
  {
    title: "Notifications", 
    code: `
// Request Permissions
Notification.requestPermission(<cb>);
  `},  
  {
    title: "Notifications", 
    code: `
// Display Notification
if (Notification.permission === "granted") {
  let notification = new Notification("Hello");
}
  `},
  {
    title: "Notifications", 
    code: `
// With more details
let notification = new Notification("Hello", {
  body: "More details on this notification",
  icon: "http://link.to/image"
});
  `}
];

const demo = {
  render: (ctx) => {
    let smallNotification = {
      text: "This is a notification"
    };
    let bigNotification = {
      text: "This is a more complex notification",
      options: {
        body: "The body of the message can contain much more information than the title. Browsers will handle this differently but they should at the very leat give you a small sample of this text. If this text is too long, it will be truncated with ellipsis or some browsers will give you the option to expand the full notification so you can see what is hidden in here.",
        icon: NOTIF_ICON
      }
    }
    const sendSmall = () => {
      ctx.sendMessage("notification", smallNotification);
    }
    const sendLarge = () => {
      ctx.sendMessage("notification", bigNotification);
    }
    return (
      <div>
        <button onClick={sendSmall}>Small Notification</button><br/>
        <button onClick={sendLarge}>Large Notification</button>
      </div>
    )
  }
};

export default slidesGeneration(name, demoName, details, codeSamples, demo, image);
<html>
<head>
  <title>My Browser Does What?</title>
</head>

<body>
  <h1>My Browser Does What?</title>
  <h3>iJS - Munich - Oct 2019</h3>

  <div id="app">

  </div>
</body>

<template id="websockets">
This is the Websockets demo
</template>

<template id="notifications">
This is the notifications demo
</template>

<script type="text/javascript">
const showTemplate = (name) => {
  let container = document.querySelector("#app");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  let template = document.querySelector(`#${name}`);
  var clone = document.importNode(template.content, true);

  container.appendChild(clone);
}

setTimeout(() => showTemplate("websockets"), 1000);
setTimeout(() => showTemplate("notifications"), 2000);
</script>

<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>

</html>
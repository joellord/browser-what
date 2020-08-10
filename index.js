const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8888;

const app = express();
const http = require("http").createServer(app);
const https = require("https");
const io = require('socket.io')(http);

const GOOGLE_APIKEY = process.env.GOOGLE_APIKEY || undefined;
if (!GOOGLE_APIKEY) console.error("ERROR: Google API key is not defined in the env");

app.use(express.static(path.join(__dirname, "./build")));
app.use(express.static(path.join(__dirname, "./slave/img")));

app.get("/slave", (req, res) => {
  console.info("Someone requested the slave");
  res.sendFile(path.join(__dirname+'/slave/index.html'));
});

app.get("/slave/sw", (req, res) => {
  console.info("Service worker requested");
  res.sendFile(path.join(__dirname + "/slave/sw.js"));
});

app.get("/googleImage", (req, res) => {
  console.info("Requested the static map image");
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${req.query.lat},${req.query.lng}&zoom=19&maptype=satellite&size=400x400&key=${GOOGLE_APIKEY}`;
  console.log("Requesting", url);
  https.get(url, (resp) => {
    console.log("Received", resp);
    const stream = require("stream");
    const ps = new stream.PassThrough();
    stream.pipeline(resp, ps, err => console.log(err));
    ps.pipe(res);
  }).on("error", (err) => {
    console.error("Error fetching map: " + err.message);
  });
});

app.get("/findCity", (req, res) => {
  console.info("Requested a reverse geocoding");
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.lat},${req.query.lng}&key=${GOOGLE_APIKEY}`
  console.log("Requesting ", url);
  https.get(url, resp => {
    let data = "";
    resp.on("data", chunk => {
      data += chunk;
    });
    resp.on("end", _ => {
      data = JSON.parse(data);
      console.log("Got response", data);
      let city = {};
      if (data && data.results && data.results.length >= 1 && data.results[0].address_components) {
        city = data.results[0].address_components.find(a => a.types[0] === "locality");
      } else {
        console.log("City not found");
        console.log("Data: ", data);
        console.log("Using process.env.CITY || Munich");
        city = {long_name: process.env.CITY || "Munich"};
      }
      console.log("Sending city", city);
      res.send(city).status(200);
    });
  });
});

app.use('/.well-known/acme-challenge/', express.static(__dirname + '/challenges'));
app.use('/.well-known/pki-validation/', express.static(__dirname + '/challenges'));

io.on("connection", (socket) => {
  socket.on("demoChange", msg => {
    // Echo message to connected clients
    io.emit("demoChange", msg);
  });

  socket.on("demo", msg => {
    io.emit("demo", msg);
  });

  socket.on("notification", msg => {
    io.emit("notification", msg);
  });
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

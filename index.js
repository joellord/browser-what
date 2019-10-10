const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8888;

const app = express();
const http = require("http").createServer(app);
const https = require("https");
const io = require('socket.io')(http);

const GOOGLE_APIKEY = process.env.GOOGLE_APIKEY || "NO KEY FOUND IN ENV";

app.use(express.static(path.join(__dirname, "./build")));
app.use(express.static(path.join(__dirname, "./slave/img")));

app.get("/slave", (req, res) => {
  res.sendFile(path.join(__dirname+'/slave/index.html'));
});

app.get("/slave/sw", (req, res) => {
  res.sendFile(path.join(__dirname + "/slave/sw.js"));
});

app.get("/googleImage", (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${req.query.lat},${req.query.lng}&zoom=19&maptype=satellite&size=400x400&key=${GOOGLE_APIKEY}`;
  https.get(url, (resp) => {
    const stream = require("stream");
    const ps = new stream.PassThrough();
    stream.pipeline(resp, ps, err => console.log(err));
    ps.pipe(res);
  }).on("error", (err) => {
    console.log("Error fetching map: " + err.message);
  });
});

app.get("/findCity", (req, res) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.lat},${req.query.lng}&key=${GOOGLE_APIKEY}`
  https.get(url, resp => {
    let data = "";
    resp.on("data", chunk => {
      data += chunk;
    });
    resp.on("end", _ => {
      data = JSON.parse(data);
      if (data && data.results && data.results.length >= 1 && data.results[0].address_components) {
        const city = data.results[0].address_components.find(a => a.types[0] === "locality");
      } else {
        console.log("City not found");
        console.log("Data: ", data);
        console.log("Using process.env.CITY || Munich");
        const city = {long_name: process.env.CITY || "Munich"};
      }
      res.send(city).status(200);
    });
  });
});

app.use('/.well-known/acme-challenge/', express.static(__dirname + '/challenges'));

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
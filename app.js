const express = require("express");

const webpush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors");
var error = {};
var subValue = {};
const app = express();

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOpts));

const publicKey =
  "BMm30CHLv6QuTWn-JIUtSUzl_FtUjGaWDFC_tQDAYcfiFyaL8OJ6Z_JHRrS3gBnJ1jlGbmlEAg6YkDVWukTFl_M";
const privateKey = "TUBVedLao6KSoA2EOnSh7pE-blR68Nnh6QmIxkQo4G4";
const payLoad = {
  notification: {
    title: "Anbu Trade",
    body: "New Order Received",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Go to the site",
      },
    ],
  },
};
app.post("/", (req, res) => {
  let sub;
  if (req.body) {
    allSubscriptions = req.body;
  } else if (req) {
    allSubscriptions = req;
  } else {
    allSubscriptions = ["no sub is received"];
  }

  webpush.setVapidDetails(
    "mailto:admin@ponnmaravathy.in",
    publicKey,
    privateKey
  );
  Promise.all(
    allSubscriptions.map((sub) =>
      webpush.sendNotification(sub, JSON.stringify(payLoad))
    )
  ).catch((err) => (error = err));
  res.status(201).json({ error: error, sub: sub });

  res.send(req);
});
app.get("/", (req, res) => {
  var sub = req;
  res.send("welcome");
});
app.listen(process.env.PORT || 28571);

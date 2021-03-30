const express = require("express");
const app = express();
const webpush = require("web-push");
var mysql = require("mysql");
var error;
var subValue;
const cors = require("cors");
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

// var con = mysql.createConnection({
//   host: "https://intellizetech.in",
//   user: "anbu",
//   password: "Nappalan@7",
//   database: 'anbtrade-313135c394'
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });
const publicKey =
  "BMm30CHLv6QuTWn-JIUtSUzl_FtUjGaWDFC_tQDAYcfiFyaL8OJ6Z_JHRrS3gBnJ1jlGbmlEAg6YkDVWukTFl_M";
const privateKey = "TUBVedLao6KSoA2EOnSh7pE-blR68Nnh6QmIxkQo4G4";
const payLoad = {
  notification: {
    data: { url: "https://ponnamaravathy.in/" },
    title: "Porkuran",
    vibrate: [100, 50, 100]
  }
};
app.post("/", (req, res) => {
  var sub = req;

  webpush.setVapidDetails(
    "mailto:admin@ponnmaravathy.in",
    publicKey,
    privateKey
  );
  webpush
    .sendNotification(sub, JSON.stringify(payLoad))
    .catch((err) => error = err);
  res.status(201).json({error:error,
    sub:sub,
    subStringify:JSON.stringify(sub),
    payload:payload,
    payloadStringify:JSON.stringify(payLoad)
  });

  // res.send(req);
});

app.get("/test", (req, res) => {
  var sub = {
    endpoint:
      "https://fcm.googleapis.com/fcm/send/f5NNOo09jjs:APA91bHs4GUw-5gjkWb4ZNRh3-w9rwm3P4-V2wDQ6fFSMCNtC6uK4ct8ayoQEeEzbY-ZaR8CziLobC3nVEARkKHOnTEWRJW5KaXjv-G521drC2CaWRE4Iul9-iwEI2-H4TWjJ7Ypvomh",
    expirationTime: null,
    keys: {
      auth: "ysrTI3awRrc_z0qT89aJaw",
      p256dh:
        "BBfqH-jmeJXu2poSIg8h-2M1GaxndBAGMSlnRH-MvXHx35MWCXWMi1u3IemGYjE9HXkpr67sVC9kcjtoT_KfBP4",
    },
  };

  webpush.setVapidDetails(
    "mailto:admin@ponnmaravathy.in",
    publicKey,
    privateKey
  );
  webpush
    .sendNotification(sub, JSON.stringify(payLoad))
    .catch((err) => console.log(err));
  res.send("test");

  // res.send(req);
});
// app.get("/", (req, res) => {
//   var sub = req;
//   res.send('welcome');

// res.send(sub);
// });
app.listen(8080);

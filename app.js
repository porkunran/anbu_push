const express = require("express");

const webpush = require("web-push");
const bodyParser = require('body-parser');
const cors = require("cors");
var error = {};
var subValue= {};
const app = express();

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
    "title": "Angular News",
    "body": "Newsletter Available!",
    "vibrate": [100, 50, 100],
    "data": {
        "dateOfArrival": Date.now(),
        "primaryKey": 1
    },
    "actions": [{
        "action": "explore",
        "title": "Go to the site"
    }]
  }
};
app.post("/", (req, res) => {
 
console.log(req);
  // res.status(201);

  let sub;
  if(req.body){
    sub = req.body;
  } else if(req){
    sub = req;
  } else {
    sub ="no sub is received";
  }

  webpush.setVapidDetails(
    "mailto:admin@ponnmaravathy.in",
    publicKey,
    privateKey
  );
  Promise.all(webpush
    .sendNotification(sub, JSON.stringify(payLoad)))
    .catch((err) => (error = err))
  res.status(201).json({ error: error, sub: sub });

  res.send(req);
});

// app.get("/test", (req, res) => {
//   var sub = {
//     endpoint:
//       "https://fcm.googleapis.com/fcm/send/f5NNOo09jjs:APA91bHs4GUw-5gjkWb4ZNRh3-w9rwm3P4-V2wDQ6fFSMCNtC6uK4ct8ayoQEeEzbY-ZaR8CziLobC3nVEARkKHOnTEWRJW5KaXjv-G521drC2CaWRE4Iul9-iwEI2-H4TWjJ7Ypvomh",
//     expirationTime: null,
//     keys: {
//       auth: "ysrTI3awRrc_z0qT89aJaw",
//       p256dh:
//         "BBfqH-jmeJXu2poSIg8h-2M1GaxndBAGMSlnRH-MvXHx35MWCXWMi1u3IemGYjE9HXkpr67sVC9kcjtoT_KfBP4",
//     },
//   };

//   webpush.setVapidDetails(
//     "mailto:admin@ponnmaravathy.in",
//     publicKey,
//     privateKey
//   );
//   webpush
//     .sendNotification(sub, JSON.stringify(payLoad))
//     .catch((err) => console.log(err));
//   res.send("test");

//   // res.send(req);
// });
// app.get("/", (req, res) => {
//   var sub = req;
//   res.send('welcome');

// res.send(sub);
// });
app.listen(80);

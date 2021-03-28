const express = require("express");
const app = express();
const webpush = require("web-push");
var mysql = require("mysql");
const cors = require('cors');
app.use(cors());

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
const publicKey = 'BMm30CHLv6QuTWn-JIUtSUzl_FtUjGaWDFC_tQDAYcfiFyaL8OJ6Z_JHRrS3gBnJ1jlGbmlEAg6YkDVWukTFl_M';
const privateKey = 'TUBVedLao6KSoA2EOnSh7pE-blR68Nnh6QmIxkQo4G4';
const payLoad ={
notification:{
data: {url: 'https://ponnamaravathy.in/'},
title: 'Porkuran',
vibrate: [100,50,100]
}
};
app.post("/", (req, res) => {
    var sub = req;
    webpush.sendNotification(sub, JSON.stringify(payLoad));

  res.send(sub);
});
app.listen(3000);

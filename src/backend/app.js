const express = require("express");
const dotenv = require("dotenv");

const app = express();
const IP = process.env.IPADDRESS || "192.168.3.2";
const PORT = process.env.BACKEND_PORT || 3000;

app.get("/", () => {
  res.send("This is the backend api");
});

app.listen(IP, PORT, () => {
  console.log(`server started on ${IP}:${PORT}`);
});

require("dotenv").config();
const express = require("express");
const sendMail = require("./email");
const port = process.env.PORT;
const app = express();
console.log(sendMail());
app.listen(port, () => {
  console.log("server is listening to port ", port);
});

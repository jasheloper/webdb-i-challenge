const express = require("express");

const acctRouter = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", acctRouter);

server.get("/", (req, res) => {
  res.send("<h3>Accounts API - Jashele T. </h3>");
});



module.exports = server;

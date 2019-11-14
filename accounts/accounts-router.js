const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .select("*")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({
        Message: "Problem with the database. "
      });
    });
});

module.exports = router;

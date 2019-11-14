const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

// GET /api/accounts
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

// GET /api/accounts/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .select("*")
    .where({ id })
    .then(account => {
      if (account[0]) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch(err => {
      res.status(500).json({
        Message: "Database Problem",
        err
      });
    });
});

router.post("/", (req, res) => {
   const accountData = req.body; 

   db("accounts")
   .insert(accountData)
   .then(account => {
      res.status(201).json(account)
   })
   .catch(err => {
      res.status(500).json({
         Message: "Database Problem"
      })
   })
})

module.exports = router;

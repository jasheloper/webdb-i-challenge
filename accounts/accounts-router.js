const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

// READ /api/accounts
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

// READ /api/accounts/:id
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

// CREATE /api/accounts/
router.post("/", (req, res) => {
  const accountData = req.body;

  db("accounts")
    .insert(accountData)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(500).json({
        Message: "Database Problem"
      });
    });
});

// UPDATE /api/accounts
router.put("/:id", (req, res) => {
   const { id } = req.params;
   const changes = req.body;
 
   db("accounts")
     .where({ id })
     .update(changes)
     .then(count => {
       if (count) {
         res.status(200).json({ updated: count });
       } else {
         res.status(404).json({ message: "invalid id" });
       }
     })
     .catch(err => {
       res.status(500).json({ message: "db problem" });
     });
 });


 router.delete("/:id", (req, res) => {
   const {id} = req.params;
   db('accounts')
   .where({id})
   .del()
      .then(count => {
         count 
         ? res.status(200).json({ deleted: count})
         : res.status(404).json({message: 'invalid id'})
      }) 
      .catch(err => {
         res.status(500).json({message: 'Problem with the database'})
      }) 
   });


module.exports = router;

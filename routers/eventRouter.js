const express = require("express");
const router = express.Router();
const multer = require("multer");
const eventController = require("../controllers/eventsController");

//rotta get index
router.get('/', eventController.index);
//rotta post store
router.post('/', multer().none(), eventController.store);
//rotta put update
router.put('/put', (req, res) => {
    res.send("metodo put")
})


module.exports = router;
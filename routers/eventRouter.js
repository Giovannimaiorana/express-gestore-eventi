const express = require("express");
const router = express.Router();
const multer = require("multer");
const eventController = require("../controllers/eventsController");

//rotta get index
router.get('/', eventController.index);
//rotta post store
router.post('/', multer().none(), eventController.store);
//rotta per show
router.get("/:id", eventController.show);
//rotta put update
router.put("/:slug", eventController.put);


module.exports = router;
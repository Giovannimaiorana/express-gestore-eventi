const express = require("express");
const router = express.Router();
const multer = require("multer");
const reservationController = require("../controllers/reservationController");



//rotta get index
router.get('/:slug/:reservations', reservationController.index);

// Crea una nuova prenotazione per un evento specifico
router.post("/:slug/reservations", reservationController.store);

// Elimina una prenotazione specifica per un evento
router.delete("/:slug/reservations/:reservation", reservationController.destroy);

module.exports = router;
const fs = require('fs');
const path = require('path');
const reservationModel = require("../models/reservation");
const eventModel = require("../models/eventModel");

function index(req, res) {
    const eventSlug = req.params.slug;
    const eventId = req.params.reservation;
    console.log(eventId);
    console.log(eventSlug);
    res.send("sei nella rotta index")

}

function store(req, res) {
    // Implementa la creazione di una nuova prenotazione per l'evento specificato (req.params.event)
    res.send("Crea una nuova prenotazione per l'evento");
}

function destroy(req, res) {
    // Implementa l'eliminazione di una prenotazione specifica per l'evento (req.params.reservation)
    res.send("Elimina una prenotazione specifica per l'evento");
}

module.exports = {
    index,
    store,
    destroy
}
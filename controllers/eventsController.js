const fs = require('fs');
const path = require('path');
const eventModel = require("../models/eventModel");

function index(req, res) {
    res.format({
        html: () => {
            res.send("index");
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }
    });
}

function store(req, res) {
    res.format({
        html: () => {
            res.send("sei finito qua");
        },
        default: () => {
            console.log(req.body);
            const newEvent = new eventModel(
                req.body.id,
                req.body.title,
                req.body.description,
                req.body.date,
                req.body.maxSeats
            );
            eventModel.saveEvent(newEvent, (err, eventoSalvato) => {
                if (err) {
                    return res.status(500).json({ error: 'Errore nel salvataggio' });
                }
                res.json(eventoSalvato);

            });
        }
    });
}

module.exports = {
    index,
    store,
};

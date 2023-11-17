const fs = require('fs');
const path = require('path');
const eventModel = require("../models/eventModel");

function index(req, res) {
    const { title, description } = req.query;

    eventModel.getAllEvents((err, events) => {
        if (err) {
            console.error('Errore nella lettura degli eventi:', err);
            return res.status(500).json({ error: 'Errore nella lettura degli eventi' });
        }

        if (title) {
            events = events.filter((event) => event.title.toLowerCase().includes(title.toLowerCase()));
        }

        if (description) {
            events = events.filter((event) => event.description.toLowerCase().includes(description.toLowerCase()));
        }

        res.json(events);
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
function show(req, res) {
    const eventId = parseInt(req.params.id);
    //console.log(eventId);

    eventModel.getAllEvents((err, allEvents) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella lettura degli eventi' });
        }

        const event = allEvents.find((e) => e.id === eventId);
        if (!event) {
            return res.status(404).json({ error: 'Evento non trovato' });
        }

        res.json(event);
    });
}


module.exports = {
    index,
    store,
    show,
};

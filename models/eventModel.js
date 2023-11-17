const fs = require('fs');
const path = require('path');
const { kebabCase } = require("lodash");

class Event {
    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date || new Date().toISOString();
        this.maxSeats = maxSeats;
        this.slug = kebabCase(title);
    }

    static readEvent(callback) {
        const filePath = path.join('db', 'events.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return callback(err, null);
            }

            try {

                const parsedData = data.trim() ? JSON.parse(data) : [];
                callback(null, parsedData);
            } catch (parseError) {
                callback(parseError, null);
            }
        });
    }

    static saveEvent(evento, callback) {
        Event.readEvent((err, eventi) => {
            if (err) {
                console.error('Errore nella lettura degli eventi:', err);
                return callback(err);
            }

            evento.id = eventi.length + 1;
            eventi.push(evento);

            fs.writeFile(path.join('db', 'events.json'), JSON.stringify(eventi, null, 2), (err) => {
                if (err) {
                    console.error('Errore durante il salvataggio dell\'evento:', err);
                    return callback(err);
                }
                console.log('Evento salvato con successo!');
                callback(null, evento);
            });
        });
    }
    static getAllEvents(callback) {
        Event.readEvent((err, eventi) => {
            if (err) {
                console.error('Errore nella lettura degli eventi:', err);
                return callback(err, null);
            }

            callback(null, eventi);
        });
    }
    static updateEvent(slug, updatedEvent, callback) {
        Event.readEvent((err, events) => {
            if (err) {
                console.error('Errore nella lettura degli eventi:', err);
                return callback(err, null);
            }

            const eventIndex = events.findIndex((event) => event.slug === slug);

            if (eventIndex === -1) {
                const error = new Error('Evento non trovato');
                return callback(error, null);
            }

            events[eventIndex] = {
                ...events[eventIndex],
                ...updatedEvent,
                slug: kebabCase(updatedEvent.title),
            };

            fs.writeFile(path.join('db', 'events.json'), JSON.stringify(events, null, 2), (err) => {
                if (err) {
                    console.error('Errore durante l\'aggiornamento dell\'evento:', err);
                    return callback(err, null);
                }
                console.log('Evento aggiornato con successo!');
                callback(null, events[eventIndex]);
            });
        });
    }


}

module.exports = Event;

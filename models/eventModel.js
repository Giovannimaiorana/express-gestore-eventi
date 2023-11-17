const fs = require('fs');
const path = require('path');

class Event {
    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    static readEvent(callback) {
        const filePath = path.join('db', 'events.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return callback(err, null);
            }

            try {
                // Aggiungi una verifica per assicurarti che la stringa non sia vuota
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
}

module.exports = Event;

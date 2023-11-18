const fs = require('fs');
const path = require('path');
class Reservation {
    //costruttore per prenotazioni
    constructor(id, firstName, lastName, email, eventId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = eventId;
    }
    //prevediamo una funzione per recuperare tutte le prenotazioni 
    static readEvent(callback) {
        const filePath = path.join('db', 'reservationDb.json');

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


}
module.exports = Reservation;
const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        const data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reinicarConteo();
        }

    }

    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0)
            return 'No hay tickets nuevos'

        const numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        const ticketAtendiendo = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(ticketAtendiendo);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        this.grabarArchivo();
        return ticketAtendiendo;
    }

    getUltimo() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimosCuatro() {
        return this.ultimos4;

    }

    reinicarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = []
        this.grabarArchivo();
    }

    grabarArchivo() {
        const jsonData = {
            "ultimo": this.ultimo,
            "hoy": this.hoy,
            "tickets": this.tickets,
            "ultimos4": this.ultimos4
        }

        const jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString)

    }

}

module.exports = {
    TicketControl
}
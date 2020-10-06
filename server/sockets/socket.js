const {
    io
} = require('../server');
const {
    TicketControl
} = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        callback(siguiente);

    });

    client.on('connect', function () {

    })

    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimosCuatro()
    })

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            })
        }

        const atenderTicket = ticketControl.atenderTicket(data.escritorio);


        client.broadcast.emit('estadoActual', {
            actual: ticketControl.getUltimo(),
            ultimos4: ticketControl.getUltimosCuatro()
        })

        callback(atenderTicket);

        // actualizar o notificar cambios en los últimos 4

    })

});
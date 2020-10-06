// comando para estrablecer la conexión 
var socket = io();

var label = $('#lblNuevoTicket');
socket.on('connect', function () {
    console.log('conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('desconectado del servidor');
});

socket.on('estadoActual', function (estado) {
    label.text(estado.actual)
})

$('button').on('click', function () {
    label.text('cargando...')
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket);
    });
})
// comando para estrablecer la conexión 
var socket = io();

var label = $('small');

var searchParams = new URLSearchParams(window.location.search);



if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');


$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function () {

    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function (resp) {

        if (resp === 'No hay tickets nuevos') {
            alert(resp);
            label.text('Ya no hay tickets');
            return
        }

        label.text('Ticket ' + resp.numero);
    });
})
// var label = $('#lblNuevoTicket');


// socket.on('estadoActual', function (estado) {
//     label.text(estado.actual)
// })
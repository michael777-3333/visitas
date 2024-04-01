
let usuario_conectado = 0;
let visitas = 0;

export function initSocket(io, app){
    io.on('connection', (sockect) => {
        console.log("Nuevo Usuario conectado " + sockect.id);
        usuario_conectado++;
        visitas++;
     
        io.emit('actualizar', usuario_conectado, visitas);

        sockect.on('disconnect', function() {
            console.log("Usuario Desconectado " + sockect.id);
            usuario_conectado--;
            io.emit('actualizar', usuario_conectado, visitas);
        });
    });
}

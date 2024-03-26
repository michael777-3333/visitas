const fs = require('node:fs');
let usuario_conectado =0;
let visitas=0
try {
    visitas = 1| Number(fs.readFileSync('visitas.txt', 'utf8')) 
    console.log(visitas);
  } catch (err) {
    visitas=1
    console.error(err);
  }

module.exports = function (io,app) {
    io.on('connection',(sockect)=>{
        console.log("Nuevo Usuario conectado " +sockect.id);
        usuario_conectado++
        visitas++
        escribirVisitas()
        io.emit('actualizar',usuario_conectado, visitas)
        

        sockect.on('disconnect', function () {
            console.log("Usuario Desconectado " + sockect.id);
            usuario_conectado--
            io.emit('actualizar',usuario_conectado, visitas)
        })
    })
}

 function  escribirVisitas(){
    try {
        fs.writeFileSync('visitas.txt', visitas+'');
        // file written successfully
      } catch (err) {
        console.error(err);
      }
}
const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require('../mensajePersonalizado');

module.exports = {verCanciones};

function verCanciones(mensaje, canciones, conexion) {
    try {
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para ver las canciones", "error")
            return;
        }
        if (canciones.length == 0) {
            enviarMensaje(mensaje, "No hay canciones en la lista", "error")
            return;
        }
            
        let respuesta = "Canciones en la lista:";
        let index = 0
        canciones.forEach(cancion => {
            respuesta += '\n' + index + " - " + cancion.metadata.title;
            index ++;
        });
        enviarMensaje(mensaje, respuesta, "bien")
    

    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
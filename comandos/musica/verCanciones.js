const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require('../mensajeNormal');

module.exports = {verCanciones};

function verCanciones(mensaje, canciones, conexion) {
    try {
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para ver las canciones")
            return;
        }
        if (canciones.length >= 1) {
            let respuesta = "Canciones en la lista:";
            let index = 0
            canciones.forEach(cancion => {
                respuesta += '\n' + index + " - " + cancion.metadata.title;
                index ++;
            });
            enviarMensaje(mensaje, respuesta)
        }

    }catch (error) {
        escribirMensajeError(mensaje);
        console.log(error);
    }
}
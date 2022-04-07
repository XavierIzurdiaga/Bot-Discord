const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require('../mensajeNormal');

module.exports = {verCanciones};

function verCanciones(mensaje, canciones) {
    try {
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
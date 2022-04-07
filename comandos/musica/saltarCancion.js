const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {saltarCancion};

function saltarCancion(mensaje, canciones, player) {
    try{
        canciones.shift();
        if (canciones.length == 0) {
            enviarMensaje(mensaje, "No quedan mas canciones")
            player.stop();
            return;
        }
        player.play(canciones[0]);
        let descripcion = "Saltar cancion, Reproduciendo: " +  canciones[0].metadata.title;
        enviarMensaje(mensaje, descripcion)
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
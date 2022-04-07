const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {pararMusica};

function pararMusica(mensaje, player) {
    try{
        player.pause();
        enviarMensaje(mensaje, "Reproducción de música pausada")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
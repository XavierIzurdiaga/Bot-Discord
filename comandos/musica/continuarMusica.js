const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {continuarMusica};

function continuarMusica(mensaje, player) {
    try{
        player.unpause();
        enviarMensaje(mensaje, "Reproducción de música reanudada")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
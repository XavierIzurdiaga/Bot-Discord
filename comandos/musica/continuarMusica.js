const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {continuarMusica};

function continuarMusica(mensaje, player, conexion) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para desconectarme")
            return;
        }
        player.unpause();
        enviarMensaje(mensaje, "Reproducción de música reanudada")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
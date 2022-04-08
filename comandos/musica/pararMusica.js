const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {pararMusica};

function pararMusica(mensaje, player, conexion) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para parar la reproduccion de música")
            return;
        }
        player.pause();
        enviarMensaje(mensaje, "Reproducción de música pausada")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
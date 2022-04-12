const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {pararMusica};

function pararMusica(mensaje, player, conexion, canciones) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para parar la reproduccion de música")
            return;
        }
        if(canciones.length == 0){
            enviarMensaje(mensaje, "No se esta reproduciendo ninguna cancion")
            return;
        }
        if(player.state.status == "paused"){
            enviarMensaje(mensaje, "La reproduccion de música ya esta pausada")
            return;
        }
        player.pause();
        enviarMensaje(mensaje, "Reproducción de música pausada")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
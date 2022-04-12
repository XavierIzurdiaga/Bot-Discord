const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {continuarMusica};

function continuarMusica(mensaje, player, conexion, canciones) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para desconectarme")
            return;
        }
        if(player.state.status == "playing"){
            enviarMensaje(mensaje, "La reproduccion de música ya esta reanudada")
            return;
        }
        if(canciones.length == 0){
            enviarMensaje(mensaje, "No hay canciones para reanudar la reproduccion de musica")
            return;
        }
        player.unpause();
        enviarMensaje(mensaje, "Reproducción de música reanudada")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
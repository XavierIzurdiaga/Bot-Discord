const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajePersonalizado");

module.exports = {continuarMusica};

// FUNCION QUE REAUNDA LA REPRODUCCION DEL MÚSICA DEL BOT
function continuarMusica(mensaje, player, conexion, canciones) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para desconectarme", "error")
            return;
        }
        if(player.state.status == "playing"){
            enviarMensaje(mensaje, "La reproduccion de música ya esta reanudada", "error")
            return;
        }
        if(canciones.length == 0){
            enviarMensaje(mensaje, "No hay canciones para reanudar la reproduccion de musica", "error")
            return;
        }
        player.unpause();
        enviarMensaje(mensaje, "Reproducción de música reanudada", "bien")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {limpiarLista};

function limpiarLista(mensaje, canciones, conexion, player) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para limpiar la lista")
            return;
        }
        if(canciones.length == 0){
            enviarMensaje(mensaje, "La lista ya esta vacía")
            return;
        }

        canciones.splice(0);
        player.stop()
        
        enviarMensaje(mensaje, "Lista de canciones limpia")
    }catch (error) {
        console.log(error);
        escribirMensajeError(mensaje);
    }
}
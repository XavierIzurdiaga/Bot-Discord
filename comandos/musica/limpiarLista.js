const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajePersonalizado");

module.exports = {limpiarLista};

// FUNCION PARA LIMPIAR LA LISTA DE CANCIONES
function limpiarLista(mensaje, canciones, conexion, player) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para limpiar la lista", "error")
            return;
        }
        if(canciones.length == 0){
            enviarMensaje(mensaje, "La lista ya esta vacía", "error")
            return;
        }

        canciones.splice(0);
        player.stop()
        
        enviarMensaje(mensaje, "Lista de canciones limpia", "bien")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
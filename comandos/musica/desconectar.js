const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {desconectar};

function desconectar(mensaje, conexion) {
    try{
        if(conexion[0]){
            conexion[0].destroy();
            enviarMensaje(mensaje, "Desconectar")
        }else{
            enviarMensaje(mensaje, "No estoy en ningun canal de voz")
        }
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
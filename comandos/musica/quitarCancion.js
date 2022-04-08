const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {quitarCancion};

function quitarCancion(mensaje, canciones, conexion) {
    try {
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz quitar la cancion")
            return;
        }
        let comando = String(mensaje.content);
        let nCancion = comando.split(" ")[1];
        if (nCancion >= 1 && nCancion <= canciones.length) {
            let cancion = canciones[nCancion]
            canciones.splice(nCancion, 1);
            let descripcion = `${cancion.metadata.title} Ha sido eliminada a la lista`
            enviarMensaje(mensaje, descripcion)
            return;
        }
        throw "Error";
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
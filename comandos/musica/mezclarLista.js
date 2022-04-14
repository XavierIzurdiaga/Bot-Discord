module.exports = {mezclarLista};
const { escribirMensajeError } = require('../mensajeError');
const { enviarMensaje } = require('../mensajePersonalizado');

function mezclarLista(mensaje, canciones, conexion) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para mezclar la lista", "error")
            return;
        }
        if(canciones.length <= 2){
            enviarMensaje(mensaje, "Debo de haber mas de 2 canciones para mezclar la lista", "error")
            return;
        }

        let copiaCanciones = canciones.slice(1);
        canciones.splice(1);

        let nCanciones = copiaCanciones.length;
        for (let i = 0; i < nCanciones; i++) {
            let random = Math.floor(Math.random() * copiaCanciones.length);
            canciones.push(copiaCanciones[random]);
            copiaCanciones.splice(random, 1);
        }       

        enviarMensaje(mensaje, "Lista de canciones mezclada", "bien");
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
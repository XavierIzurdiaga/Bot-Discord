module.exports = {mezclarLista};
const { escribirMensajeError } = require('../mensajeError');
const { enviarMensaje } = require('../mensajeNormal');

function mezclarLista(mensaje, canciones, conexion) {
    try{
        if(!conexion[0]){
            enviarMensaje(mensaje, "Debo estar en un canal de voz para mezclar la lista")
            return;
        }
        if(canciones.length <= 2){
            enviarMensaje(mensaje, "Debo de haber mas de canciones para mezclar la lista")
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

        enviarMensaje(mensaje, "Lista de canciones mezclada");
    }catch (error) {
        console.log(error);
        escribirMensajeError(mensaje);
    }
}
const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {quitarCanales};

function quitarCanales(mensaje){
    try {
        let mod = mensaje.guild.roles.cache.find(role => role.name === "MOD");
        if (!mensaje.member.roles.cache.has(mod.id)) {
            enviarMensaje(mensaje, "No tienes los roles necesarios para ejectuar este comando")
            
            return
        }
        let canal = mensaje.mentions.channels.first();
        canal.delete();
        enviarMensaje(mensaje, "Canal de texto eliminado correctamente")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
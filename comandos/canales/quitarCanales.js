const { Permissions } = require("discord.js");
const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajePersonalizado");

module.exports = {quitarCanales};

// FUNCION QUE ELIMINA UN CANA LDE TEXTO (YA QUE DE MOMENTO 
// NO SE PUEDE HACER MENCION A UN CANAL DE VOZ EN UN MENSAJE)
// EN CASO DE QUE EL USUARIO QUE HA EJECUTADO 
// EL COMANDO SEA ADMINSITRADOR O POSEA EL ROL DE "MOD"
function quitarCanales(mensaje){
    try {
        let mod = mensaje.guild.roles.cache.find(role => role.name === "MOD");
        if (!mensaje.member.roles.cache.has(mod.id) && !mensaje.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            enviarMensaje(mensaje, "No tienes los roles necesarios para ejectuar este comando", "error")
            
            return
        }
        let canal = mensaje.mentions.channels.first();
        canal.delete();
        enviarMensaje(mensaje, "Canal de texto eliminado correctamente", "bien")
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
const { Permissions } = require("discord.js");
const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {quitarRoles};

function quitarRoles(mensaje) {
    try {
        let mod = mensaje.guild.roles.cache.find(role => role.name === "MOD");
        if (!mensaje.member.roles.cache.has(mod.id) && !mensaje.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            enviarMensaje(mensaje, "No tienes los roles necesarios para ejectuar este comando")
            return
        }
        let comando = String(mensaje.content);
        let parametros = comando.split(" ");
        let rol = mensaje.guild.roles.cache.find(role => role.name === parametros[2]);
        if (rol) {
            let miembro = mensaje.mentions.members.first();
            if (miembro.roles.cache.has(rol.id)) {
                miembro.roles.remove(rol).catch(console.error);
                enviarMensaje(mensaje, "Rol eliminado correctamente")
            }else{
                enviarMensaje(mensaje, "Este usuario no tiene este rol")
            }
        }else{
            throw ("Error");
        }
    } catch (error) {
        escribirMensajeError(mensaje);
    }
}
const { Permissions } = require("discord.js");
const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajePersonalizado");

module.exports = {añadirCanales};

// FUNCION QUE AÑADE UN CANAL DE TEXTO O VOZ EN CASO DE QUE EL USUARIO 
// QUE HA EJECUTADO EL COMANDO SEA ADMINSITRADOR O POSEA EL ROL DE "MOD"
function añadirCanales(mensaje){
    try {
        let mod = mensaje.guild.roles.cache.find(role => role.name === "MOD");
        if (!mensaje.member.roles.cache.has(mod.id) && !mensaje.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            enviarMensaje(mensaje, "No tienes los roles necesarios para ejectuar este comando", "error")
            return
        }
    
        let comando = String(mensaje.content);
        let parametros = comando.split(" ");
        let tipoCanal = parametros[2]
        let nombreCanal = parametros[3]
        let server = mensaje.guild;
        if (tipoCanal == "txt") {
            server.channels.create(nombreCanal);
            enviarMensaje(mensaje, "Canal de texto creado correctamente", "bien")
        }else if (tipoCanal == "voz") {
            server.channels.create(nombreCanal,{
                type: 'GUILD_VOICE',
            })
            enviarMensaje(mensaje, "Canal de voz creado correctamente", "bien")
        }else{
            throw ("Error");
        }
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
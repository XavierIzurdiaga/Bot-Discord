const { escribirMensajeError } = require("../mensajeError");
const { enviarMensaje } = require("../mensajeNormal");

module.exports = {añadirCanales};

function añadirCanales(mensaje){
    try {
        let mod = mensaje.guild.roles.cache.find(role => role.name === "MOD");
        if (!mensaje.member.roles.cache.has(mod.id)) {
            enviarMensaje(mensaje, "No tienes los roles necesarios para ejectuar este comando")
            return
        }
    
        let comando = String(mensaje.content);
        let parametros = comando.split(" ");
        let tipoCanal = parametros[2]
        let nombreCanal = parametros[3]
        let server = mensaje.guild;
        if (tipoCanal == "txt") {
            server.channels.create(nombreCanal);
            enviarMensaje(mensaje, "Canal de texto creado correctamente")
        }else if (tipoCanal == "voz") {
            server.channels.create(nombreCanal,{
                type: 'GUILD_VOICE',
            })
            enviarMensaje(mensaje, "Canal de voz creado correctamente")
        }else{
            throw ("Error");
        }
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
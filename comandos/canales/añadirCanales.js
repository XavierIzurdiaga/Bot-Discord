module.exports = {añadirCanales};

function añadirCanales(mensaje){
    let mod = mensaje.guild.roles.cache.find(role => role.name === "MOD");
    if (!mensaje.member.roles.cache.has(mod.id)) {
        mensaje.reply({
            content: "No tienes los roles necesarios para ejectuar este comando"
        })
        return
    }
    try {
        let comando = String(mensaje.content);
        let parametros = comando.split(" ");
        let tipoCanal = parametros[2]
        let nombreCanal = parametros[3]
        let server = mensaje.guild;
        if (tipoCanal == "txt") {
            server.channels.create(nombreCanal);
            mensaje.reply({
                content: "Canal de texto creado correctamente"
            })
        }else if (tipoCanal == "voz") {
            server.channels.create(nombreCanal,{
                type: 'GUILD_VOICE',
            })
            mensaje.reply({
                content: "Canal de voz creado correctamente"
            })
        }else{
            throw ("Error");
        }
    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help"
        })
    }
}
module.exports = {quitarCanales};

function quitarCanales(mensaje){
    try {
        let mod = mensaje.guild.roles.cache.find(role => role.name === "MOD");
        if (!mensaje.member.roles.cache.has(mod.id)) {
            mensaje.reply({
                content: "No tienes los roles necesarios para ejectuar este comando"
            })
            return
        }
        let canal = mensaje.mentions.channels.first();
        canal.delete();
        mensaje.reply({
            content: "Canal de texto eliminado correctamente"
        })
    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help"
        })
    }
}
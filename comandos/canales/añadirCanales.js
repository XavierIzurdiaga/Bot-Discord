module.exports = {añadirCanales};

function añadirCanales(mensaje){
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
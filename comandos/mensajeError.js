const { MessageEmbed } = require("discord.js");

module.exports={escribirMensajeError};

function escribirMensajeError(mensaje){
    try{
        let error = new MessageEmbed()
        .setColor("#FF6464")
        .setDescription("Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help")
        mensaje.channel.send({embeds: [error]})
    }catch (error) {
        console.log(error);
    }
}
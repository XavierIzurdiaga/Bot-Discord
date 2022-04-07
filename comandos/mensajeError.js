const { MessageEmbed } = require("discord.js");

module.exports={escribirMensajeError};

function escribirMensajeError(mensaje){
    try{
        let error = new MessageEmbed()
        .setDescription("Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help")
        mensaje.reply({embeds: [error]})
    }catch (error) {
        console.log(error);
    }
}
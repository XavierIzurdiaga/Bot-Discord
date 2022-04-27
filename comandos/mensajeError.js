const { MessageEmbed } = require("discord.js");

module.exports={escribirMensajeError};

// FUNCION PARA MANDAR UN MENSAJE DE ERROR
function escribirMensajeError(mensaje){
    try{
        let error = new MessageEmbed()
        .setColor("#FF3232")
        .setDescription("Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help")
        mensaje.channel.send({embeds: [error]})
    }catch (error) {
        console.log(error);
    }
}
const { MessageEmbed } = require("discord.js");

module.exports = {enviarMensaje};

function enviarMensaje(mensaje, descripcion) {
    let error = new MessageEmbed()
        .setColor("#00ffc8")
        .setDescription(descripcion)
        mensaje.channel.send({embeds: [error]})
}
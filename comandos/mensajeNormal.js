const { MessageEmbed } = require("discord.js");

module.exports = {enviarMensaje};

function enviarMensaje(mensaje, descripcion) {
    let error = new MessageEmbed()
        .setDescription(descripcion)
        mensaje.reply({embeds: [error]})
}
const { MessageEmbed } = require("discord.js");

module.exports = {enviarMensaje};

function enviarMensaje(mensaje, descripcion, tipo) {
    let mensajePersonalizado = new MessageEmbed()
    if (tipo == "error") {
        mensajePersonalizado.setColor("#3232FF")
    }
    if (tipo == "bien") {
        mensajePersonalizado.setColor("#00FFC8")
    }

    mensajePersonalizado.setDescription(descripcion)
    mensaje.channel.send({embeds: [mensajePersonalizado]})
}
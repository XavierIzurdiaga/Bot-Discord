module.exports = {quitarCanales};

function quitarCanales(mensaje){
    try {
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
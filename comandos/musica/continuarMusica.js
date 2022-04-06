module.exports = {continuarMusica};

function continuarMusica(mensaje, player) {
    try{
        player.unpause();
    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help" 
        })
    }
}
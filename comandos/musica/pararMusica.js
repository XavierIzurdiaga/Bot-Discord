module.exports = {pararMusica};

function pararMusica(mensaje, player) {
    try{
        player.pause();
    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help" 
        })
    }
}
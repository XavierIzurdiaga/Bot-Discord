module.exports = {saltarCancion};

function saltarCancion(mensaje, canciones, player) {
    canciones.shift();
    if (canciones.length == 0) {
        mensaje.reply({
            content: "No quedan mas canciones" 
        })
        player.stop();
        return;
    }
    player.play(canciones[0]);
    mensaje.reply({
        content: "Reproduciendo : " +  canciones[0].metadata.title
    })
}
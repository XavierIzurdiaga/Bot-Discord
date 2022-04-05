module.exports = {verCanciones};

function verCanciones(mensaje, canciones) {
    try {
        if (canciones.length >= 1) {
            let respuesta = "Canciones en la lista:";
            let index = 0
            canciones.forEach(cancion => {
                respuesta += '\n' + index + " - " + cancion.metadata.title;
                index ++;
            });
            mensaje.reply({
                content: respuesta
            })
        }

    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help" 
        })
        console.log(error);
    }
}
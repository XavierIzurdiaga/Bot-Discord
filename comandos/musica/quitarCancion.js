module.exports = {quitarCancion};

function quitarCancion(mensaje, canciones) {
    try {
        let comando = String(mensaje.content);
        let nCancion = comando.split(" ")[1];
        console.log(nCancion);
        if (nCancion >= 1 && nCancion <= canciones.length) {
            let cancion = canciones[nCancion]
            canciones.splice(nCancion, 1);

            mensaje.reply({
                content:`${cancion.metadata.title} Ha sido eliminada a la lista`
            })
        }

    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help" 
        })
        console.log(error);
    }
}
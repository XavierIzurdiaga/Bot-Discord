module.exports = {desconectar};

function desconectar(mensaje, conexion) {
    try{
        if(conexion[0]){
            conexion[0].destroy();
        }else{
            mensaje.reply({
                content: "No esta en ningun canal de voz" 
            })
        }
    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help" 
        })
    }
}
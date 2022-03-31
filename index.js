const { Client, Intents } = require('discord.js');
const prefix = process.env.prefix;

//COMANDOS
// ROLES
const { añadirRoles } = require('./comandos/roles/añadirRoles');
const { quitarRoles } = require('./comandos/roles/quitarRoles');
// CANALES
const { añadirCanales } = require('./comandos/canales/añadirCanales');
const { quitarCanales } = require('./comandos/canales/quitarCanales');
//MUSICA
const { AñadirCancion } = require('./comandos/musica/añadirCanciones');


const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

client.on('ready', () => {
    console.log('El bot esta listo');
})

client.on('messageCreate', (mensaje) =>{
    try {
        if (!mensaje.author.bot && mensaje.content.startsWith(prefix)) {
            leerMensaje(mensaje);
        }
        
    } catch (error) {
        console.log("Algo ha salido mal");
    }
})

function leerMensaje(mensaje) {
    let comando = String(mensaje.content);

    // COMANDO PARA MOSTRAR LA AYUDA

    if (comando == `${prefix}help`) {
        //ACTUALIZAR
        let ayuda = "-----MÚSICA-----";
        ayuda += "\n\n!mp 'LINK'";
        ayuda += "\n!mr 1";
        ayuda += "\n!mq";
        ayuda += "\n\n-----ADMINISTRACIÓN-----";
        ayuda += "\n\n!ar add MOD @Xavierizur";
        ayuda += "\n!ar rem MOD @Xavierizur";
        ayuda += "\n!ac add txt general";
        ayuda += "\n!ac add voz general";
        ayuda += "\n!ac rem #general";
        mensaje.reply({
            content: ayuda

        })
        return;
    }

    // COMANDOS PARA CANCIONES

    if (comando.substring(0,3) == `${prefix}mp`) {
        mensaje.reply({
            content: "Añadir cancion"
        })
        AñadirCancion(mensaje);
        return;
    }

    if (comando.substring(0,3) == `${prefix}mr`) {
        mensaje.reply({
            content: "Quitar cancion"
        })
        return;
    }
    
    if (comando.substring(0,3) == `${prefix}mq`) {
        mensaje.reply({
            content: "Ver canciones"
        })
        return;
    }

    // COMANDOS PARA ADMINISTRACIÓN
    if (comando.substring(0,7) == `${prefix}ar add`) {
        mensaje.reply({
            content: "Añadir roles"
        })
        añadirRoles(mensaje);
        return;
    }
    if (comando.substring(0,7) == `${prefix}ar rem`) {
        mensaje.reply({
            content: "Quitar roles"
        })
        quitarRoles(mensaje);
        return;
    }

    if (comando.substring(0,7) == `${prefix}ac add`) {
        mensaje.reply({
            content: "Añadir canales"
        })
        añadirCanales(mensaje);
        return;
    }

    if (comando.substring(0,7) == `${prefix}ac rem`) {
        mensaje.reply({
            content: "Eliminar canales"
        })
        quitarCanales(mensaje);
        return;
    }
}

client.login(process.env.token);
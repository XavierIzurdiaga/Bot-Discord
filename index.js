const { Client, Intents } = require('discord.js');
const prefix = process.env.prefix;
const {createAudioPlayer} = require('@discordjs/voice');

//COMANDOS
// ROLES
const { añadirRoles } = require('./comandos/roles/añadirRoles');
const { quitarRoles } = require('./comandos/roles/quitarRoles');
// CANALES
const { añadirCanales } = require('./comandos/canales/añadirCanales');
const { quitarCanales } = require('./comandos/canales/quitarCanales');
//MUSICA
const { añadirCancion } = require('./comandos/musica/añadirCanciones');
const { saltarCancion } = require('./comandos/musica/saltarCancion');
const { quitarCancion } = require('./comandos/musica/quitarCancion');
const { verCanciones } = require('./comandos/musica/verCanciones');
const { desconectar } = require('./comandos/musica/desconectar');
const { pararMusica } = require('./comandos/musica/pararMusica');
const { continuarMusica } = require('./comandos/musica/continuarMusica');

const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

// VARIABLES PARA MUSICA
var canciones = [];
var conexion = [];
const player = createAudioPlayer();

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
        ayuda += "\n!ms";
        ayuda += "\n!mr 1";
        ayuda += "\n!mq";
        ayuda += "\n!md";
        ayuda += "\n!mf";
        ayuda += "\n!mc";
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
        añadirCancion(mensaje, canciones, player, conexion);
        return;
    }

    if (comando == `${prefix}ms`) {
        mensaje.reply({
            content: "Saltar cancion"
        })
        saltarCancion(mensaje, canciones, player);
        return;
    }

    if (comando.substring(0,3) == `${prefix}mr`) {
        mensaje.reply({
            content: "Quitar cancion"
        })
        quitarCancion(mensaje, canciones)
        return;
    }
    
    if (comando == `${prefix}mq`) {
        mensaje.reply({
            content: "Ver canciones"
        })
        verCanciones(mensaje, canciones)
        return;
    }
    
    if (comando == `${prefix}md`) {
        mensaje.reply({
            content: "Desconectar"
        })
        desconectar(mensaje, conexion)
        return;
    }

    if (comando == `${prefix}mf`) {
        mensaje.reply({
            content: "Parar"
        })
        pararMusica(mensaje, player)
        return;
    }

    if (comando == `${prefix}mc`) {
        mensaje.reply({
            content: "Continuar"
        })
        continuarMusica(mensaje, player)
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
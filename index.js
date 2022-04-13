const { Client, Intents } = require('discord.js');
const prefix = process.env.prefix;
const {createAudioPlayer} = require('@discordjs/voice');

//COMANDOS
const { escribirAyuda } = require('./comandos/help');
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
const { mezclarLista } = require('./comandos/musica/mezclarLista');
const { limpiarLista } = require('./comandos/musica/limpiarLista');

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
        escribirAyuda(mensaje);
        return;
    }

    // COMANDOS PARA CANCIONES
    if (comando.startsWith("!m")) {
        if (comando.startsWith(`${prefix}mp`)) {
            añadirCancion(mensaje, canciones, player, conexion);
            return;
        }

        if (comando.startsWith(`${prefix}ms`)) {
            saltarCancion(mensaje, canciones, player, conexion);
            return;
        }

        if (comando.startsWith(`${prefix}mr`)) {
            quitarCancion(mensaje, canciones, conexion)
            return;
        }
        
        if (comando == `${prefix}mq`) {
            verCanciones(mensaje, canciones, conexion)
            return;
        }

        if (comando == `${prefix}mm`) {
            mezclarLista(mensaje, canciones, conexion)
            return;
        }

        if (comando == `${prefix}ml`) {
            limpiarLista(mensaje, canciones, conexion, player)
            return;
        }
        
        if (comando == `${prefix}md`) {
            desconectar(mensaje, conexion, canciones)
            return;
        }

        if (comando == `${prefix}mf`) {
            pararMusica(mensaje, player, conexion, canciones)
            return;
        }

        if (comando == `${prefix}mc`) {
            continuarMusica(mensaje, player, conexion, canciones)
            return;
        }
    }

    // COMANDOS PARA ADMINISTRACIÓN
    if (comando.startsWith("!a")) {
        if (comando.startsWith(`${prefix}ar add`)) {
            añadirRoles(mensaje);
            return;
        }
        if (comando.startsWith(`${prefix}ar rem`)) {
            quitarRoles(mensaje);
            return;
        }

        if (comando.startsWith(`${prefix}ac add`)) {
            añadirCanales(mensaje);
            return;
        }

        if (comando.startsWith(`${prefix}ac rem`)) {
            quitarCanales(mensaje);
            return;
        }
    }
}

client.login(process.env.token);
const { Client, Intents } = require('discord.js');
const { token, slash } = require('./config.json');

const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.on('ready', () => {
    console.log('El bot esta listo');
})

client.on('messageCreate', (mensaje) =>{
    if (!mensaje.author.bot && mensaje.content.startsWith(process.env.slash)) {
        leerMensaje(mensaje);
    }
})

function leerMensaje(mensaje) {
    let comando = String(mensaje.content);

    // COMANDO PARA MOSTRAR LA AYUDA

    if (comando == `${process.env.slash}help`) {
        mensaje.reply({
            content: "-----MÚSICA-----\n\n!mp dakiti \n!mp (URL) \n!mr 1 \n!mq\n\n-----ADMINISTRACIÓN-----\n\n!ar add MOD @Xavierizur\n!ac add text #general"
        })
        return;
    }

    // COMANDOS PARA CANCIONES

    if (comando.substring(0,3) == `${slprocess.env.slashash}mp`) {
        mensaje.reply({
            content: "Añadir cancion"
        })
        return;
    }

    if (comando.substring(0,3) == `${process.env.slash}mr`) {
        mensaje.reply({
            content: "Quitar cancion"
        })
        return;
    }
    
    if (comando.substring(0,3) == `${process.env.slash}mq`) {
        mensaje.reply({
            content: "Ver canciones"
        })
        return;
    }

    // COMANDOS PARA ADMINISTRACIÓN

    if (comando.substring(0,3) == `${process.env.slash}ar`) {
        mensaje.reply({
            content: "Administrar roles"
        })
        return;
    }

    if (comando.substring(0,3) == `${process.env.slash}ac`) {
        mensaje.reply({
            content: "Administrar canales"
        })
        return;
    }
}

client.login(process.env.token);
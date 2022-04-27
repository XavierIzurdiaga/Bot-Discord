module.exports = {añadirCancion};
const { saltarCancion } = require('./saltarCancion');
const youS = require('play-dl'); // Everything
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
const { escribirMensajeError } = require('../mensajeError');
const { enviarMensaje } = require('../mensajePersonalizado');

// FUNCION QUE ANALIZA UN MENSAJE EN BUSCA DE 
// UNA URL DE YOUTUBE O UNA BUSQUEDA EN YOUTUBE
async function añadirCancion(mensaje, canciones, player, conexion) {
    try {
        let canal = mensaje.member.voice.channel;
        if (!canal) {
            enviarMensaje(mensaje, "Debe de estar en un canal de voz para usar este comando", "error")
            return;
        }

        let comando = String(mensaje.content);
        let info = comando.split("!mp")[1];
        if (info.indexOf("youtub") >= 0) {
            añadirCancionURL(mensaje, canciones, player, conexion);
        }else{
            añadirCancionTitulo(mensaje, canciones, player, conexion);
        }
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}

async function añadirCancionURL(mensaje, canciones, player, conexion) {
    try {
        let comando = String(mensaje.content);
        let UrlCancion = comando.split(" ")[1];

        let canal = mensaje.member.voice.channel;
        if (!canal) {
            enviarMensaje(mensaje, "Debe de estar en un canal de voz para usar este comando", "error")
            return;
        }

        let InfoCancion;

        try {
            InfoCancion = await ytdl.getInfo(UrlCancion);
        } catch (error) {
            enviarMensaje(mensaje, "No se ha encontrado ninguna cancion con esa URL", "error");
            return;
        }

        conexion[0] = joinVoiceChannel({
            channelId: canal.id,
            guildId: mensaje.guild.id,
            adapterCreator: mensaje.guild.voiceAdapterCreator,
        });

        let cancion = {
                title: InfoCancion.videoDetails.title,
                url: InfoCancion.videoDetails.video_url,
            };

        let descripcion = `${cancion.title} Ha sido añadida a la lista`;
        enviarMensaje(mensaje, descripcion, "bien")


        let stream = await youS.stream(UrlCancion)
        
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type,
            metadata: {
                title : cancion.title
            }
        })
        
        canciones.push(resource);

        player.play(canciones[0]);
        conexion[0].subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            if(canciones.length > 0){
                if(canciones[0].ended){
                    saltarCancion(mensaje, canciones, player, conexion);
                }
            }
        });

        player.on('error', error => {
            console.log(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
            saltarCancion(mensaje, canciones, player, conexion);
        });
            
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}

async function añadirCancionTitulo(mensaje, canciones, player, conexion) {
    try {
        let comando = String(mensaje.content);
        let tituloCancion = comando.split("!mp ")[1];

        let canal = mensaje.member.voice.channel;
        if (!canal) {
            enviarMensaje(mensaje, "Debe de estar en un canal de voz para usar este comando", "error")
            return;
        }

        let yt_info = await youS.search(tituloCancion, {
            limit: 1
        })

        if (!yt_info[0]) {
            enviarMensaje(mensaje, "No se ha encontrado ninguna cancion con ese titulo", "error");
            return;
        }
        
        conexion[0] = joinVoiceChannel({
            channelId: canal.id,
            guildId: mensaje.guild.id,
            adapterCreator: mensaje.guild.voiceAdapterCreator,
        });

        let cancion = {
                title: yt_info[0].title,
                url: yt_info[0].url,
            };

        let descripcion = `${cancion.title} Ha sido añadida a la lista`;
        enviarMensaje(mensaje, descripcion, "bien")

        let stream = await youS.stream(yt_info[0].url)

        let resource = createAudioResource(stream.stream, {
            inputType: stream.type,
            metadata: {
                title : cancion.title
            }
        })

        canciones.push(resource);

        player.play(canciones[0]);
        conexion[0].subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            if(canciones.length > 0){
                if(canciones[0].ended){
                    saltarCancion(mensaje, canciones, player, conexion);
                }
            }
        });

        player.on('error', error => {
            console.log(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
            saltarCancion(mensaje, canciones, player, conexion);
        });
            
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
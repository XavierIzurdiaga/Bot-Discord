// module.exports = {añadirCancion};

// const { saltarCancion } = require('./saltarCancion');
// const ytdl = require('ytdl-core');
// const {
// 	AudioPlayerStatus,
// 	StreamType,
// 	createAudioResource,
// 	joinVoiceChannel,
// } = require('@discordjs/voice');
// const { escribirMensajeError } = require('../mensajeError');
// const { enviarMensaje } = require('../mensajeNormal');

// async function añadirCancion(mensaje, canciones, player, conexion) {
//     try {
//         let comando = String(mensaje.content);
//         let UrlCancion = comando.split(" ")[1];

//         let canal = mensaje.member.voice.channel;
//         if (!canal) {
//             enviarMensaje(mensaje, "Debe de estar en un canal de voz para usar este comando")
//             return;
//         }

//         conexion[0] = joinVoiceChannel({
//             channelId: canal.id,
//             guildId: mensaje.guild.id,
//             adapterCreator: mensaje.guild.voiceAdapterCreator,
//         });

//         let InfoCancion = await ytdl.getInfo(UrlCancion);
//         let cancion = {
//                 title: InfoCancion.videoDetails.title,
//                 url: InfoCancion.videoDetails.video_url,
//             };

//         let descripcion = `${cancion.title} Ha sido añadida a la lista`;
//         enviarMensaje(mensaje, descripcion)

//         let stream = ytdl(cancion.url, { filter: 'audioonly' });
//         let resource = createAudioResource(stream, { inputType: stream.type,
//             metadata: {
//                 title : cancion.title
//             }});
        
//         canciones.push(resource);

//         player.play(canciones[0]);
//         conexion[0].subscribe(player);

//         player.on(AudioPlayerStatus.Idle, () => {
//             if(canciones.length > 0){
//                 if(canciones[0].ended){
//                     saltarCancion(mensaje, canciones, player, conexion);
//                 }
//             }
//         });

//         player.on('error', error => {
//             console.log(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
//             saltarCancion(mensaje, canciones, player, conexion);
//         });
            
//     }catch (error) {
//         escribirMensajeError(mensaje);
//     }
// }

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
const { enviarMensaje } = require('../mensajeNormal');

async function añadirCancion(mensaje, canciones, player, conexion) {
    try {
        let comando = String(mensaje.content);
        let UrlCancion = comando.split(" ")[1];

        let canal = mensaje.member.voice.channel;
        if (!canal) {
            enviarMensaje(mensaje, "Debe de estar en un canal de voz para usar este comando")
            return;
        }

        conexion[0] = joinVoiceChannel({
            channelId: canal.id,
            guildId: mensaje.guild.id,
            adapterCreator: mensaje.guild.voiceAdapterCreator,
        });

        let InfoCancion = await ytdl.getInfo(UrlCancion);
        let cancion = {
                title: InfoCancion.videoDetails.title,
                url: InfoCancion.videoDetails.video_url,
            };

        let descripcion = `${cancion.title} Ha sido añadida a la lista`;
        enviarMensaje(mensaje, descripcion)


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
        console.log(error);
    }
}
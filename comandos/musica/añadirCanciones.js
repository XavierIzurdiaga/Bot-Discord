module.exports = {añadirCancion};

const { saltarCancion } = require('./saltarCancion');
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

        let stream = ytdl(cancion.url, { filter: 'audioonly' });
        let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary,
            metadata: {
                title : cancion.title
            }});
        
        canciones.push(resource);

        player.play(canciones[0]);
        conexion[0].subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            if(canciones.length > 0){
                if(canciones[0].ended){
                    saltarCancion(mensaje, canciones, player);
                }
            }
        });
            
    }catch (error) {
        escribirMensajeError(mensaje);
    }
}
module.exports = {añadirCancion};

const { saltarCancion } = require('./saltarCancion');
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

async function añadirCancion(mensaje, canciones, player) {
    try {
        let comando = String(mensaje.content);
        let UrlCancion = comando.split(" ")[1];

        let canal = mensaje.member.voice.channel;

        let conexion = joinVoiceChannel({
            channelId: canal.id,
            guildId: mensaje.guild.id,
            adapterCreator: mensaje.guild.voiceAdapterCreator,
        });

        let InfoCancion = await ytdl.getInfo(UrlCancion);
        let cancion = {
                title: InfoCancion.videoDetails.title,
                url: InfoCancion.videoDetails.video_url,
            };

        mensaje.reply({
            content:`${cancion.title} Ha sido añadida a la lista`
        })

        let stream = ytdl(cancion.url, { filter: 'audioonly' });
        let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary,
            metadata: {
                title : cancion.title
            }});
        
        canciones.push(resource);

        player.play(canciones[0]);
        conexion.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            if(canciones.length > 0){
                if(canciones[0].ended){
                    saltarCancion(mensaje, canciones, player);
                }
            }
        });
            
    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help    " 
        })
        console.log(error);
    }
}
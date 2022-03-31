module.exports = {AñadirCancion};

const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');

async function AñadirCancion(mensaje) {
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
        let resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        let player = createAudioPlayer();

        player.play(resource);
        conexion.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => conexion.destroy());
    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help    " 
        })
        console.log(error);
    }
}
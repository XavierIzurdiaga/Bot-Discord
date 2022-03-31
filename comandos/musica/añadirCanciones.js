module.exports = {AñadirCancion};

const ytdl = require('ytdl-core');

// TODO : Acabar parte audio
// const { createAudioResource,createAudioPlayer, NoSubscriberBehavior  } = require('@discordjs/voice');

// const player = createAudioPlayer({
// 	behaviors: {
// 		noSubscriber: NoSubscriberBehavior.Pause,
// 	},
// });

// const resource = createAudioResource('EVERYBODY PUT YOUR HANDS IN THE AIR.mp3', {
// 	metadata: {
// 		title: 'A good audio',
// 	},
// });

// const { joinVoiceChannel } = require('@discordjs/voice');

async function AñadirCancion(mensaje) {
    try {
        let channel = mensaje.member.voice.channel;

        let comando = String(mensaje.content);
        if (comando.indexOf(" ") >= 0) {
            let UrlCancion = comando.split(" ")[1];
            let InfoCancion = await ytdl.getInfo(UrlCancion);
            let cancion = {
                title: InfoCancion.videoDetails.title,
                url: InfoCancion.videoDetails.video_url,
            };

            mensaje.reply({
                content:`${cancion.title} Ha sido añadida a la lista`
            })
        }
        

        let connection = await joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        
        
        setTimeout(() => {
            // player.play(resource);
            connection.destroy();
        }, 1500);
    }catch (error) {
        mensaje.reply({
            content: "Comando introducido incorrectamente, para saber como usarlo correctamente escriba !help    " 
        })
        console.log(error);
    }
}
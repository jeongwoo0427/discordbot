const { joinVoiceChannel } = require('@discordjs/voice');
const dataController = require('../controllers/data_controller');
 
const musicController = async(message) =>{
    try {
        console.log(message.member.voice.channel);
        if (!message.member.voice.channel) {
            return message.reply('TTS를 사용하기 위해 먼저 음성채널에 있어야 합니다.');
        }
     
        //return message.channel.send('현재 TTS 기능 중비중입니다~~ ^^');
        
        const connection = joinVoiceChannel({  
            channelId: message.member.voice.channel.id,
            guildId: message.guildId,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        //setInterval(()=>{connection.disconnect();},5000); //초 뒤에 퇴장
    }catch(err){
        await dataController.insertErrorLog(err);
        message.channel.send('음성 모듈 관련 오류가 발생했습니다 ㅜㅜ');
    }
}

module.exports = musicController;
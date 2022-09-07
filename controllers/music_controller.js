const { joinVoiceChannel } = require('@discordjs/voice');
 
const musicController = async(message) =>{
    try{
        console.log(message.member.voice.channelId); //채널 아이디 확인용
 
        //if(message.member.voice == null) 
        return message.channel.send('현재 TTS 기능 중비중입니다~~ ^^');
        
        const connection = joinVoiceChannel({  
            channelId: message.member.voice.channelId,
            guildId: message.guildId,
            adapterCreator: message.guild.voiceAdapterCreator
        }) 
    }catch(err){
        console.error(err);
        message.channel.send('음성 모듈 관련 오류가 발생했습니다 ㅜㅜ');
    }
}

module.exports = musicController;
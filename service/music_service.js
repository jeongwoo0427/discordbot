const { joinVoiceChannel } = require('@discordjs/voice');
 
const musicService = async(message) =>{
    try{
        console.log(message.member.voice.channelId); 
 
        //if(message.member.voice == null) 
        //return message.channel.send('TTS 사용을 위해 음성채널에 있어야 합니다.');
        
        const connection = joinVoiceChannel({  
            channelId: message.member.voice.channelId,
            guildId: message.guildId,
            adapterCreator: message.guild.voiceAdapterCreator
        }) 
    }catch(err){
        message.channel.send('음성 모듈 관련 오류가 발생했습니다 ㅜㅜ');
    }
}

module.exports = musicService;
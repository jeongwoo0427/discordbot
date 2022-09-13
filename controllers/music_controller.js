const dataController = require('../controllers/data_controller');
//const discordTTS = require('discord-tts');
const config = require('../config.json');
const request = require('request');
const {AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionState, joinVoiceChannel} = require('@discordjs/voice');

 

let voiceConnection;
let audioPlayer = new AudioPlayer();

const musicController = async(message) =>{
    try {
        console.log(message.member.voice.channel);
        if (!message.member.voice.channel) {
            return message.reply('TTS를 사용하기 위해 먼저 음성채널에 있어야 합니다.');
        }
     
        //return message.channel.send('현재 TTS 기능 중비중입니다~~ ^^');

        // const stream = discordTTS.getVoiceStream('hello text to speech world');
        // const audioResource = createAudioResource(stream, {inputType:StreamType.Arbitrary,inlineVolume:true});
        // if(!VoiceConnectionState || VoiceConnection){
            
        // }
        const xmlData = '<speak>테스트해보기.</speak>';
        const options = {
            uri : 'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize',
            method : 'POST',
            headers: {
                'Content-Type': 'application/xml',
                Authorization: `KakaoAK ${config.kakao_token}`,
            },
            body: xmlData
        }
        request(options, (err,response,body)=>{
            console.log(body);
        });

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
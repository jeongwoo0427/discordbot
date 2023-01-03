const dataController = require('../controllers/data_controller');
const fs = require('fs');
//const discordTTS = require('discord-tts');
const config = require('../config.json');
const request = require('request');
const {  createAudioPlayer, AudioPlayerStatus, createAudioResource,  entersState, VoiceConnectionState, joinVoiceChannel } = require('@discordjs/voice');
const { resolve } = require('path');
const { timeout } = require('nodemon/lib/config');


let connection;


const musicController = async (message) => {
    try {
        //console.log(message.member.voice.channel);

        if (!message.member.voice.channel) {
            return message.reply('TTS를 사용하기 위해 먼저 음성채널에 있어야 합니다.');
        }

        if(message.content.length <= 1){
            return message.reply('최소 1개 이상의 글자를 입력해주세요.');
        }


        const clearMessage = message.content.substr(1, message.content.length - 1);

        if (clearMessage.includes('exit') && connection != null) {
            console.log('exit');
            await connection.disconnect();
            connection = null;
            return
        }

        if(connection == null || connection.channel==null){
            connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
                timeout:5
            });
        }
      




        const xmlData = '<speak><voice name="Nick">'+clearMessage+'</voice></speak>';
 
        const post = request.post('https://kakaoi-newtone-openapi.kakao.com/v1/synthesize', {
            headers: {
                'Content-Type': 'application/xml',
                Authorization: `KakaoAK ${config.kakao_token}`,
            },
            body: xmlData,
        },()=>{
            let audioPlayer = createAudioPlayer();
            const audioResource = createAudioResource('/home/veiz/node/discordbot/assets/audio/voice.mp3');
            audioPlayer.play(audioResource);
            connection.subscribe(audioPlayer);
        });
        post.pipe(fs.createWriteStream('/home/veiz/node/discordbot/assets/audio/voice.mp3'),)

        //setInterval(()=>{connection.disconnect();},50*1000); //초 뒤에 퇴장
    } catch (err) {
        await dataController.insertErrorLog(err);
        message.channel.send('음성 모듈 관련 오류가 발생했습니다 ㅜㅜ');
    }
}

module.exports = musicController;
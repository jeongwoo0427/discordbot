const dataController = require('./data_controller');
const fs = require('fs');
//const discordTTS = require('discord-tts');
const config = require('../config.json');
const request = require('request');
const { createAudioPlayer, AudioPlayerStatus, createAudioResource, entersState, VoiceConnectionState, joinVoiceChannel } = require('@discordjs/voice');


let connection;


const voiceController = {
    useUserTTS : async(message)=>{
        try {
            //console.log(message.member.voice.channel);
    
            if (!message.member.voice.channel) {
                message.reply('TTS를 사용하기 위해 먼저 음성채널에 있어야 합니다.')
                return false;
            }
        
            if (message.content.length <= 1) {
                message.reply('최소 1개 이상의 글자를 입력해주세요.');
                return false
            }
    
            const author = message.author.id;
            const rawMessage = message.content;
            let clearMessage = message.content.replace('*','').replace('!','');
    
            if (clearMessage.includes('exit') && connection != null) {
                console.log('exit');
                await connection.disconnect();
                connection = null;
                return
            }
    
            if (connection == null || connection.channel == null) {
                connection = joinVoiceChannel({
                    guildId: message.guildId,
                    channelId: message.member.voice.channel.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                });
            }
    
        //    if(author == '384293586390351876'){
        //        clearMessage=`띠옹`;
        //    }
    
            const xmlData =
            `
            <speak>
            <voice name="`+getVoice(rawMessage)+`">
            <prosody rate="`+ getSpeed(rawMessage) + `" volume="loud">
            `
                //+author+'님의 말  <break time="300ms"/>' 
                +clearMessage
                +
            `
            </prosody>
            </voice>
            </speak>
            `;
    
    
            const post = request.post('https://kakaoi-newtone-openapi.kakao.com/v1/synthesize', {
                headers: {
                    'Content-Type': 'application/xml',
                    Authorization: `KakaoAK ${config.kakao_token}`,
                },
                body: xmlData,
            }, () => {
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
    },
    useBotTTS : async(message)=>{
        try {
            //console.log(message.member.voice.channel);


            const clearMessage = message.content.replace('*','').replace('!','');

    
            if (connection == null || connection.channel == null) {
                connection = joinVoiceChannel({
                    guildId: message.guildId,
                    channelId: '943687663154769961', //자유수다방 ID
                    adapterCreator: message.guild.voiceAdapterCreator
                });
            }
    
    
            const xmlData =
            `
            <speak>
            <voice name="MAN_READ_CALM">
            <prosody rate="0.8" volume="loud">
            `
                //+author+'님의 말  <break time="300ms"/>' 
                +clearMessage 
                +
            `
            </prosody>
            </voice>
            </speak>
            `;
    
    
            const post = request.post('https://kakaoi-newtone-openapi.kakao.com/v1/synthesize', {
                headers: {
                    'Content-Type': 'application/xml',
                    Authorization: `KakaoAK ${config.kakao_token}`,
                },
                body: xmlData,
            }, () => {
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
}


function getVoice(message) {

    const cmd1 = message.substr(0, 1);
    const cmd2 = message.substr(1, 1);

    console.log(cmd1+cmd2);

    if(cmd1 == '!' && cmd2 != '!')return 'MAN_DIALOG_BRIGHT';
    if(cmd1 == '*' && cmd2 != '*')return 'WOMAN_DIALOG_BRIGHT';
    if(cmd1 == '!' && cmd2 == '!')return 'MAN_READ_CALM';
    if(cmd1 == '*' && cmd2 == '*')return 'WOMAN_READ_CALM';

    

    return 'MAN_DIALOG_BRIGHT';
}

function getSpeed(message) {
    if (!message.includes('(') || !message.includes(')')) return '0.85';

    let startIndex = message.indexOf("(") + 1;
    let endIndex = message.indexOf(")");
    let speed = message.substring(startIndex, endIndex);
    return speed;
}

module.exports = voiceController;
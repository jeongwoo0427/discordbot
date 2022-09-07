const commandService = require('../services/command_service');
const musicService = require('../services/music_service');

const messageRoute = async (message) =>{
    //console.log(message.content); 
    if(message.author.bot || !message.guild) return; 

    if(message.content == '겸사로봇') message.reply('~ 는 커맨드 관련 기능, * 은 TTS관련 기능을 사용합니다.');;

    if(message.content.substring(0,1) == '~') commandService(message);

    if(message.content.substring(0,1) == `*`) musicService(message);

    //일반 명령어
    //message.channel.send('message'); //메시지 전송
};

module.exports = messageRoute;
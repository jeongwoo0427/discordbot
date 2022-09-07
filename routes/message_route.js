const commandService = require('../services/command_service');
const musicService = require('../services/music_service');

const messageRoute = async (message) =>{
    console.log(message.content);
    if(message.author.bot || !message.guild) return; 

    if(message.content.substring(0,1) == '~') commandService(message);

    if(message.content.substring(0,1) == `*`) musicService(message);

    //일반 명령어
    //message.channel.send('message'); //메시지 전송
};

module.exports = messageRoute;
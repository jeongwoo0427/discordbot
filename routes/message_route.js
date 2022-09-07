const commandController = require('../controllers/command_controller');
const musicController = require('../controllers/music_controller');
const dataController = require('../controllers/data_controller');

const messageRoute = async (message) =>{
    //console.log(message); 
    await dataController.insertMessage(message);

    if(message.author.bot || !message.guild) return; 

    if(message.content == '겸사로봇') message.reply('~ 는 커맨드 관련 기능, * 은 TTS관련 기능을 사용합니다.');;

    if(message.content.substring(0,1) == '~') commandController(message);

    if(message.content.substring(0,1) == `*`) musicController(message);

    //일반 명령어
    //message.channel.send('message'); //메시지 전송
};

module.exports = messageRoute;
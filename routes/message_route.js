const commandController = require('../controllers/command_controller');
const musicController = require('../controllers/music_controller');

const messageRoute = async (message) =>{
    //console.log(message); 
    
   // console.log(message.channel);


    // console.log(message.guild.id)//서버아이디
    // console.log(message.guild.name)//서버아이디
    // console.log(message.content); //메시지 내용
    // console.log(message.channel.id)//채널아이디
    // console.log(message.channel.name) //채널이름
    // console.log(message.author.id); //사용자id
    // console.log(message.author.username); //사용자이름
    // console.log(message.createdTimestamp) //생성일


    if(message.author.bot || !message.guild) return; 

    if(message.content == '겸사로봇') message.reply('~ 는 커맨드 관련 기능, * 은 TTS관련 기능을 사용합니다.');;

    if(message.content.substring(0,1) == '~') commandController(message);

    if(message.content.substring(0,1) == `*`) musicController(message);

    //일반 명령어
    //message.channel.send('message'); //메시지 전송
};

module.exports = messageRoute;
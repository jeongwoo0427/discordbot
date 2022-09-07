
const commandService = async(message)=>{
    try{
        const command = message.content;

        if(command == '`'){
            message.reply('부르셨어요?')
        }else if(command == '`노래'){
            message.reply('난나난나나난난 나나나난나~');
        }else{ 
            message.reply(command);
        }
    }catch(err){
        message.channel.send('커맨드 모듈 관련 오류가 발생했습니다 ㅜㅜ');
    }
};

module.exports = commandService
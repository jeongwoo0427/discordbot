
const commandService = async(message)=>{
    try{
        const command = message.content.substr(1, message.content.length-1);
        console.log(command);
        if(command.trim() == ''){
            await message.reply('부르셨어요?')
        }else if(command == '노래'){
            await message.reply('난나난나나난난 나나나난나~');
        }else if(command == '오류'){
            message.reply('');
        }else{ 
            await message.reply(command);
        } 
    }catch(err){
        message.channel.send('커맨드 모듈 관련 오류가 발생했습니다 ㅜㅜ');
    }
};

module.exports = commandService
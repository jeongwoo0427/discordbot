const {EmbedBuilder} = require('discord.js');
const musicTexts = require('../assets/json/music_sources.json');

const commandService = async(message)=>{
    try{
        const command = message.content.substr(1, message.content.length-1);
        console.log(command);
        if(command.trim() == ''){
            //await message.reply('부르셨어요?');
            await message.channel.send({
                    embeds:[
                    new EmbedBuilder()
                    .setTitle('커맨드 명령 v1.0.3')
                    .setDescription('( ~ 다음에 아래 명령어 중 선택해주세요.)')
                    .addFields([
                        {name:"노래",value:"저의 예술적인 음악선율을 '감상'해 볼실게요. ^^"},
                        {name:"스플스케줄 또는 스플",value:"스플 스케쥴을 보여준답니다."}
                    ])
                ]});

        }else if(command == '노래'){
            const rnd = Math.floor(Math.random() * (musicTexts.blabla.length));
            console.log('random number = '+rnd);
            await message.channel.send(musicTexts.blabla[rnd]);
        }else if(command == '스플스케줄'||command == '스플스케쥴'||command.includes('스플')){
            await message.channel.send('https://splatoon2.ink/');
        }else{ 
            await message.reply(command + ' <= 이건 잘못된 커맨드에용');
        } 
    }catch(err){
        console.error(err);
        message.channel.send('커맨드 모듈 관련 오류가 발생했습니다 ㅜㅜ');
    }
};

module.exports = commandService
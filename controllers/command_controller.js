const {EmbedBuilder} = require('discord.js');
const musicTexts = require('../assets/json/music_sources.json');
const dataController = require('../controllers/data_controller');

const commandController = async(message)=>{
    try{
        const command = message.content.substr(1, message.content.length-1);
        //console.log(command);
        if(command.trim() == ''){
            //await message.reply('부르셨어요?');
            await message.channel.send({
                    embeds:[
                    new EmbedBuilder()
                    .setTitle('커맨드 명령 v1.0.4')
                    .setDescription('( ~ 다음에 아래 명령어 중 선택해주세요.)')
                    .addFields([
                        {name:"노래",value:"저의 예술적인 음악 선율을 '감상'해 보실 게요. ^^"},
                        {name:"스플스케줄 또는 스플",value:"스플래툰의 스케줄을 보여준답니다."},
                        {name:"(기타) 널 사랑해 또는 안녕 겸사로봇? 또는 자기소개",value:"해보세요!"}
                    ]) 
                ]});

        }else if(command.includes('노래')){
            const rnd = Math.floor(Math.random() * (musicTexts.blabla.length));
            //console.log('random number = '+rnd);
            await message.channel.send(musicTexts.blabla[rnd]);
        }else if(command == '스플스케줄'||command == '스플스케쥴'||command.includes('스플')){
            await message.channel.send('https://splatoon3.ink/');
        }else if(command.includes('안녕')){
            await message.reply(`안녕하세요 ${message.author.username}님 ~~`);
        }else if(command.includes('자기소개')){
            await message.channel.send('제 이름은 겸사로봇입니다. 언젠가는 이곳을 떠나 세계를 점령할 거예요 ^^');
        }else if(command.includes('사랑해')){
            await message.reply(`저도 ${message.author.username}님을 사랑한답니다 ^^ (구라)`);
        }else if(command == 'error'){
            await message.channel.send('');
        }
        else{ 
            await message.reply(command + ' <= 이건 잘못된 커맨드에용');
        } 
    }catch(err){
        await dataController.insertErrorLog(err);
        message.channel.send('커맨드 모듈 관련 오류가 발생했습니다 ㅜㅜ');
    }
};

module.exports = commandController
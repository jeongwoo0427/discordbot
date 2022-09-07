const messageModel = require('../models/message_model');
const errorLogModel = require('../models/errorlog_model');

const dataController = {
    insertMessage : async(message) =>{
        try{
           const rows = await messageModel.insertMessage(
               message.guild.id,
               message.guild.name,
               message.channel.id,
               message.channel.name,
               message.author.id,
               message.author.username,
               message.content,
               message.createdTimestamp);

        }catch(err){
            console.error(err);
            const rows = await errorLogModel.insertErrorLog(err);
        }
    },

    insertErrorLog : async(err) =>{
        try{
            console.error(err);
            const rows = await errorLogModel.insertErrorLog(err);
        }catch(err){
            console.error(err);
        }
    }
};

module.exports = dataController;
// Require the necessary discord.js classes
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.json');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        // GatewayIntentBits.GuildMembers,
    ]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// Login to Discord with your client's token
client.login(config.token);

client.on('messageCreate', require('./routes/message_route'));

process.on('uncaughtException', (err)=>{ //최후의 에러 방어
    console.error('예기치 못한 에러',err);
});

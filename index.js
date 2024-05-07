const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    console.log(qr);
});


// Listening to all incoming messages
client.on('message_create', message => {
    m = message.body.toLowerCase();

    console.log(typeof m);
    console.log(m);

    if (m === 'ping') {
        message.reply('pong');
    }

    if (m === 'hi') {
        message.reply(`Hello I am Animesh's bot`);
        message.reply(`How can I help you?`);
    }

    if (m === 'kirtan') {
        message.reply('Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Ram Hare Ram Ram Ram Hare Hare \n https://www.youtube.com/watch?v=r6WBtDnLxwM')
    }
});


client.initialize();

console.log('Please wait initializing...');

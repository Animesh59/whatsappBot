const { Client } = require('whatsapp-web.js');

const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});

client.on('ready', () => {
    console.log('Client is ready!');

    // Number where you want to send the message.
    const number = "+919732531193";

    // Your message.
    const text = "Testing my whatsapp bot\n type---> \n hi  or  ping  or kirtan";

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";

    // Sending message.
    client.sendMessage(chatId, text)
        .then(() => console.log(`Successfully message sent to ${number}`))
        .catch((err) => console.log(`Failed to send message\n${err}`));
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


// await client.sendMessage('8436627009@c.us', 'Hi from bot')

client.initialize();

console.log('Please wait initializing...');

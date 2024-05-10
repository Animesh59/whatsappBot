const { Client, LocalAuth } = require('whatsapp-web.js');


const client = new Client({
    authStrategy: new LocalAuth(),
    webVersion: '2.2409.2',
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html'
    }
});

// console.log(client);

client.on('ready', () => {
    console.log('Client is ready!');

    // ------------------------ sendMessage ------------------------
    // const number = "+919732531193";
    // const text = "Testing my whatsapp bot\n type---> \n hi  or  ping  or kirtan";
    // const chatId = number.substring(1) + "@c.us";
    // client.sendMessage(chatId, text)
    //     .then(() => console.log(`Successfully message sent to ${number}`))
    //     .catch((err) => console.log(`Failed to send message\n${err}`));

    //Sending 
    // client.sendMessage("918436627009@c.us", 'Guitar message instantly when the client is ready')
    //     .then(() => console.log(`Successfully message sent message`))
    //     .catch((err) => console.log(`Failed to send message\n${err}`));

    //Checking wheather the whatspp user exitst
    // client.isRegisteredUser("919732531193@c.us")
    //     .then((res) => console.log(`------------------------------------------Here goes Baba's the result----------------------------------\n${res}`))
    //     .catch((rej) => console.log(`------------------------------------------Here goes Baba's the rejection----------------------------------\n${rej}`));

    // client.isRegisteredUser("919474318868@c.us")
    //     .then((res) => console.log(`------------------------------------------Here goes Provu's the result----------------------------------\n${res}`))
    //     .catch((rej) => console.log(`------------------------------------------Here goes Provu's the rejection----------------------------------\n${rej}`));

    // client.getContacts()
    //     .then((data) => console.log(data))
    //     .catch((err) => console.log(err));
});

client.on("authenticated", () => {
    console.log('Successfully Authenticated!');
})

client.on("disconnected", () => {
    console.log('client is disconnected');
})

client.on('qr', qr => {
    console.log(qr);
});


// Listening to all incoming messages
client.on('message_create', async (message) => {
    // console.log(message);
    console.log(`${message.from}-${message._data.notifyName}: ${message.body}`);

    m = message.body.toLowerCase();

    if (m === 'ping') {
        // message.reply('pong');
        client.sendMessage(message.from, 'pong');
        return 0;
    }

    if (m === 'hi') {
        // message.reply(`Hello I am Animesh's bot`);
        // message.reply(`How can I help you?`);
        client.sendMessage(message.from, `Hello I am Animesh's bot`);
        client.sendMessage(message.from, `How can I help you?`);
        return 0;
    }

    if (m === 'kirtan') {
        // message.reply('Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Ram Hare Ram Ram Ram Hare Hare \n https://www.youtube.com/watch?v=r6WBtDnLxwM')
        client.sendMessage(message.from, 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Ram Hare Ram Ram Ram Hare Hare \n https://www.youtube.com/watch?v=r6WBtDnLxwM');
        return 0;
    }

    if (m === '🚗') {
        client.sendMessage(message.from, `Lets ride on this red car & go to Mayapur dham`);
        return 0;
    }

});


client.initialize();

console.log('Please wait initializing...');

//Closing correcily using CTRL+C 
process.on('SIGINT', async () => {
    console.log('(SIGINT) Shutting down...');
    await client.destroy();
    console.log('client destroyed');
    process.exit(0);
});

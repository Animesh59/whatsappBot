//--------------------- whatsapp-web.js packages ---------------------
const { Client, LocalAuth } = require("whatsapp-web.js");
const whatsapp = new Client({
    authStrategy: new LocalAuth(),
    webVersion: '2.2409.2',
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html'
    }
})

whatsapp.on("authenticated", () => {
    console.log('Your whatsapp account is authenticated');
})

whatsapp.on("ready", () => {
    console.log(`whatsapp is ready`);
})

whatsapp.on("message_create", async (message) => {
    console.log(`${message.from}-${message._data.notifyName}: ${message.body}`);

    m = message.body.toLowerCase();

    if (m === 'ping') {
        whatsapp.sendMessage(message.from, 'pong');
        return 0;
    }

    if (m === 'hi') {
        whatsapp.sendMessage(message.from, `Hello I am Animesh's bot`);
        whatsapp.sendMessage(message.from, `How can I help you?`);
        return 0;
    }

    if (m === 'kirtan') {
        whatsapp.sendMessage(message.from, 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Ram Hare Ram Ram Ram Hare Hare \n https://www.youtube.com/watch?v=r6WBtDnLxwM');
        return 0;
    }

    if (m === 'about') {
        whatsapp.sendMessage(message.from, `We believe in code`);
        return 0;
    }

});

whatsapp.initialize();

process.on('SIGINT', async () => {
    console.log('(SIGINT) Shutting down...');
    await whatsapp.destroy();
    console.log('whatsapp destroyed');
    process.exit(0);
});

//--------------------- Express routes for REST-APIs ---------------------
const express = require("express");
const app = express();
const PORT = 8080;

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
})

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to root page</h1>`);
});

app.post("/send-whatsapp-message", express.json(), async (req, res) => {
    // var contact = '918436627009@c.us';
    // var message = 'Hello I am Animesh Believe';
    // console.log(req.body);
    await whatsapp.sendMessage(req.body.contact, req.body.message);
    res.send('successfully sent messages');
})

app.listen(PORT, () => console.log(`server is running on: http://localhost:${PORT}`));

console.log('Please wait initializing...');

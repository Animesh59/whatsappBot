//--------------------- Express routes for REST-APIs ---------------------
const whatsapp = require("./whatsappLogic/logic")
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
})

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to root page</h1>`);
});

app.post("/send-whatsapp-message", express.json(), async (req, res) => {
    await whatsapp.sendMessage(req.body.contact, req.body.message);
    res.send(`successfully sent message to ${req.body.contact}`);
})

app.listen(PORT, () => console.log(`server is running on: http://localhost:${PORT}`));

const express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    PORT =  process.env.PORT || 4000,
    app = express(),
    routes = require('./routes/index'),
    MessagingResponse = require('twilio').twiml.MessagingResponse,
    accountSid = 'AC776fc58ef5aa6e5c227c92ef2b1a77d4',
    authToken = '8cc2bf9b3a399e5ee51c5e1c657fe20a',
    client = require('twilio')(accountSid, authToken);

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use('/', routes);

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
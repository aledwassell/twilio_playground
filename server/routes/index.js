let express = require('express'),
    cors = require('cors'),
    conf = require('../config'),
    router = express.Router(),
    accountSid = conf.accountSid,
    authToken = conf.authToken,
    VoiceResponse = require('twilio').twiml.VoiceResponse,
    client = require('twilio')(accountSid, authToken),
    app = express();

router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express app'});
});

router.route('/sendmsg')
    .get((req, res, next) => {
        res.send('Hello');
    })
    .post((req, res, next) => {
        console.log(req.body);
        client.messages.create({
            from: conf.fromNumber,
            to: req.body.to,
            body: req.body.msg
        }).then(m => {
            res.send(m.sid);
        }).done();
    });
router.route('/makecall')
    .get((req, res, next) => {
        res.send('Hello');
    })
    .post((req, res, next) => {
        console.log(req.body);
        client.studio.flows(conf.flow).executions.create({
            to: req.body.to,
            from: conf.fromNumber,
            parameters: JSON.stringify({
                sentence: req.body.sentence,
                item_1: req.body.item_1,
                item_2: req.body.item_2,
                item_3: req.body.item_3,
                color1: req.body.color1,
                color2: req.body.color2,
                color3: req.body.color3,
                color4: req.body.color4,
                color5: req.body.color5
            })
        }).then((c) => {
            res.send(c.sid);
            res.end();
            console.log(c.sid);
        }).done();
    });
router.route('/changecolor')
    .post((req, res, next) => {
        console.log(req.body);
    });
module.exports = router;
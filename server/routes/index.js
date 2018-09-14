let express = require('express'),
    cors = require('cors'),
    router = express.Router(),
    accountSid = 'AC776fc58ef5aa6e5c227c92ef2b1a77d4',
    authToken = '8cc2bf9b3a399e5ee51c5e1c657fe20a',
    VoiceResponse = require('twilio').twiml.VoiceResponse,
    client = require('twilio')(accountSid, authToken);
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
            from: '+447403934067',
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
        client.studio.flows('FW8bdebf2408ca0da29f198e93362065d9').executions.create({
            to: '+447587188943',
            from: '+447403934067',
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
module.exports = router;
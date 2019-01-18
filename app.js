const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')),
    Message = require('./models/messages.js');
app.use(express.urlencoded({
    extended: true
}));
//rendering all pages
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/messageform', (req, res) => {
    res.render('messageform');
});
//trying to make post request
app.post('/messageform', (req, res) => {
    Message.create({
            title: req.body.title,
            body: req.body.body,
        })
        .catch((error) => {
            console.log(`Something went wrong: ${error.stack}`);
        });
        res.redirect('/allmessages');
        
});

//posting all the messages: 
app.get('/allmessages', (req, res) => {
    Message.findAll().then((retrievedMessagesArray) => {
        let dataValuesFromRetrievedMessageArray = retrievedMessagesArray.map((retrievedMessage) => {
            return {
                title: retrievedMessage.dataValues.title,
                body: retrievedMessage.dataValues.body
            };
        })
        res.render('allmessages', {
            allmessages: dataValuesFromRetrievedMessageArray
        })


    }, (error) => {
        console.log(`Something went wrong when reading with findAll(): ${error.stack}`)
    });

});





app.listen(port, (req, res) => console.log(`Up on: ${port}`));
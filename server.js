var express = require("express")
var bodyParser = require('body-parser')
const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'server.log'
        })
    ]
};

const logger = winston.createLogger(logConfiguration);
app = express();

var port = 3000;

var root = '/public'

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get("/test", function (request, response) {
    var param = request.query.username
    logger.info('Get requested by ' + param);
    response.send('Thank you for requesting our Get Service')
})

app.post('/test', function (request, response) {
    logger.info(request.body)
    var data = request.body;
    logger.info('Post requested, here is the data :' + data)
    response.send('Thank you for requesting our Post Service')
})

app.get("/calculator", function (request, response) {
    var number1 = request.query.number1;
    var number2 = request.query.number2;
    var operator = request.query.operator;
    var result = 0;

    switch (operator) {
        case 'plus':
            logger.info(`Requested: ${number1} + ${number2}`);
            result = number1 + number2;
        case 'minus':
            logger.info(`Requested: ${number1} - ${number2}`);
            result = number1 - number2;
        case 'divide':
            logger.info(`Requested: ${number1} / ${number2}`);
            result = number1 / number2;
        case 'multiply':
            logger.info(`Requested: ${number1} * ${number2}`);
            result = number1 * number2;
    }
    
    logger.info('Result: ' + result);
    response.send('Result: ' + result);
})

app.listen(port);
logger.info("Listening on port ", port);
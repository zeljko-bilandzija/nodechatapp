const moment = require('moment');

const generateMessage = (from, text) => {
    return { from, text, createdAt: moment().valueOf() }
};

const generateLocationMessage = (from, position) => {
    return { 
        from, 
        url: `http://www.google.com/maps?q=${position.latitude},${position.longitude}`, 
        createdAt: moment().valueOf() 
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
}
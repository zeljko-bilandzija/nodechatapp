const generateMessage = (from, text) => {
    return { from, text, createdAt: new Date().getTime() }
};

const generateLocationMessage = (from, position) => {
    return { 
        from, 
        url: `http://www.google.com/maps?q=${position.latitude},${position.longitude}`, 
        createdAt: new Date().getTime() 
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
}
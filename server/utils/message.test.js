const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'zac';
        const text = 'This is some text';
        const message = generateMessage(from, text);
        expect(message).toMatchObject({from, text});
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.createdAt).toBe('number');
    })
});

describe('generaleLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Admin';
        const position = {
            latitude: 35,
            longitude: 45
        };
        const url = 'http://www.google.com/maps?q=35,45';
        const message = generateLocationMessage(from, position);
        expect(message).toMatchObject({from, url});
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);
        expect(typeof message.createdAt).toBe('number');
    });
});
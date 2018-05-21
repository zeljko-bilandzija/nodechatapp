const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Zeljko',
                room: 'Office'
            }, 
            {
                id: '2',
                name: 'Dani',
                room: 'Home'
            },
            {
                id: '3',
                name: 'Nina',
                room: 'Office'
            }
        ];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123456',
            name: 'Zac',
            room: 'Office'
        }
        const resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should get users from room Office', () => {
        const result = users.getUserList('Office');
        expect(result.length).toBe(2);
        expect(result).toEqual(['Zeljko', 'Nina']);
    });

    it('should get users from room Home', () => {
        const result = users.getUserList('Home');
        expect(result.length).toBe(1);
        expect(result).toEqual(['Dani']);
    });

    it('should remove user', () => {
        const result = users.removeUser('1');
        expect(result.name).toBe('Zeljko');
        expect(result.id).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        const result = users.removeUser('5');
        expect(typeof result).toBe('undefined');
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        const user = users.getUser('1');
        expect(user.name).toBe('Zeljko');
        expect(user.id).toBe('1');
    });

    it('should not find user', () => {
        const user = users.removeUser('5');
        expect(typeof user).toBe('undefined');
    });
});
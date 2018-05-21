[{
    id: '',
    name: 'Zac',
    room: 'Office'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// Approach one
/* const users = [];
const addUser = (id, name, room) => {
    users.push({});
};
module.exports = { addUser } */

class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const user = this.users.find(user => user.id === id);
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getUserList(room) {
        return this.users.filter(user => user.room === room).map(user => user.name);
    }
}

module.exports = { Users };
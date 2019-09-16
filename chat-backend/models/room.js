class Room {

    constructor(roomId, users=[]) {
        this.roomId = roomId;
        this.users = users;
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(username) {
        this.users = this.users.filter(user => user.username !== username)
    }

    numUsersOnline() {
        return this.users.length;
    }

}

module.exports = Room;

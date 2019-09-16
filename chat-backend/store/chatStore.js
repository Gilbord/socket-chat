const Room = require('../models/room');
const User = require('../models/user');

class ChatStore {

    constructor() {
        this.rooms = [];
    }

    createRoom(roomId, creatorUsername) {
        const room = new Room(roomId, [new User(creatorUsername)]);
        this.rooms.push(room);
    }

    removeRoom(roomId) {
        this.rooms = [...this.rooms.filter(room => room.roomId !== roomId)]
    }

    addUser(roomId, username) {
        const room = this.getRoom(roomId);
        if(room) {
            room.addUser(new User(username));
        } else {
            throw new Error(`Room ${roomId} not found`);
        }
    }

    removeUserFromRoom(roomId, username) {
        const room = this.getRoom(roomId);
        if(room) {
            room.removeUser(username);
        } else {
            throw `Room ${roomId} not found`;
        }
    }

    getRoom(roomId) {
        return this.rooms.find(room => room.roomId === roomId);
    }

}

module.exports = ChatStore;

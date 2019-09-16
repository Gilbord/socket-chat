const ChatStore = require ("../store/chatStore.js");
const assert = require('assert');

describe('Chat Store', function() {
    let chatStore = null;

    beforeEach((done) => {
        chatStore = new ChatStore();
        done();
    })

    it('Test create room', function() {
        const roomId = '1';
        chatStore.createRoom(roomId, 'username');
        const room = chatStore.getRoom(roomId);
        assert.ok(room);
        assert.equal(room.users[0].username, 'username')
        assert.equal(room.roomId, roomId);
    })

    it('Test delete room', function() {
        const roomId = '1';
        chatStore.createRoom(roomId, 'username');
        const room = chatStore.getRoom(roomId);
        assert.ok(room);
        chatStore.removeRoom(roomId);
        assert.ifError(chatStore.getRoom(roomId));
    })

    it('Test add user', function() {
        const roomId = '1';
        chatStore.createRoom(roomId, 'username');
        const room = chatStore.getRoom(roomId);
        assert.equal(room.users.length, 1);
        chatStore.addUser(roomId, 'username 2');
        assert.equal(room.users.length, 2);
        assert.equal(room.users[1].username, 'username 2');
    })

    it('Test add user with wrong room id', function() { 
        assert.throws(() => chatStore.addUser('roomId', 'username'), Error)
    })

    it('Test remove user from room', function() {
        const roomId = '1';
        chatStore.createRoom(roomId, 'username');
        const room = chatStore.getRoom(roomId);
        assert.equal(room.users.length, 1);
        chatStore.addUser(roomId, 'username 2');
        assert.equal(room.users.length, 2);
        chatStore.removeUserFromRoom(roomId, 'username 2');
        assert.equal(room.users.length, 1);
        assert.equal(room.users[0].username, 'username');
    })

})
const express = require('express');
const socketio = require('socket.io');
const ChatStore = require("./store/chatStore");
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const chatStore = new ChatStore();

const socket = socketio(app.listen(port, () => console.log(`Example app listening on port ${port}!`)));

const getTime = () => new Date().toLocaleString();

const getMessage = (username, text) => {
    return {
        from: username,
        text: text,
        time: getTime(),
    }
}

socket.on('connection', (sock) => {
    const username = sock.handshake.query.username;
    const roomId = sock.handshake.query.roomId;
    const room = chatStore.getRoom(roomId)

    if(!room) {
        chatStore.createRoom(roomId, username);
    } else {
        chatStore.addUser(roomId, username);
    }

    sock.emit('online', room ? room.users.map(user => user.username) : [username]);

    sock.join(roomId, (err) => {
        if (err) {
            console.log(err);
        }
        sock.to(roomId).emit('system message', {type: 'user online', time: getTime(), username: username})
    })

    console.log(`${username} connected to ${roomId}`);

    sock.on('message', (data, fn) => {
        console.log(`${username} says ${data}`);
        sock.to(roomId).emit('message', getMessage(username, data))
        fn(getMessage(username, data));
    })

    sock.on('disconnect', (reason) => {
        console.log(reason);
        chatStore.removeUserFromRoom(roomId, username)
        sock.to(roomId).emit('system message', {type: 'user offline', time: getTime(), username: username})
        console.log(`${username} : ${roomId} is offline`)
    })

});

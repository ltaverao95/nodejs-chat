const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function(){
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', (data) => {
    actions.innerHTML = '';
    output.innerHTML += `
    <p>
    <strong>${data.username}</strong>: ${data.message}
    </p>
    `;
});

socket.on('chat:typing', (username) => {
    actions.innerHTML = `<p>
        <em>${username} is typing a message...</em>
    </p>`;
});
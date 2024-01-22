const message = document.getElementById('message');
const send = document.getElementById('send');
const sendMessageContainer = document.getElementById('send-message-container');
const chatContainer = document.getElementById('chat-container');

send.onclick = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'send-message.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            message.value = '';
        }
    };
    xhr.send('message=' + message.value);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

setInterval(() => {
    //  Update chat view
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get-messages.php', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            chatContainer.innerHTML = xhr.responseText;
        }
    };
    xhr.send();

    //  Enable/Disable send button
    if (message.value.trim() === '') {
        send.setAttribute('disabled', '');
    } else {
        send.removeAttribute('disabled');
    }
}, CHAT_UPDATE_INTERVAL);

sendMessageContainer.onsubmit = (event) => {
    send.click();
    event.preventDefault();
};
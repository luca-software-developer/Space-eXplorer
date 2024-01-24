
/**
 * Community
 * 
 * @version 1.0.0.0
 * @author Gruppo 32
 */

const message = document.getElementById('message');
const send = document.getElementById('send');
const sendMessageContainer = document.getElementById('send-message-container');
const chatContainer = document.getElementById('chat-container');

//  Invia il messaggio utilizzando AJAX.
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

//  Ad intervalli regolari (la durata dell'intervallo è configurabile)
//  la vista dei messaggi viene aggiornata (con il fetch dei messaggi).
setInterval(() => {
    //  Aggiorna la vista.
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'get-messages.php', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            chatContainer.innerHTML = xhr.responseText;
        }
    };
    xhr.send();

    //  Abilita/disabilita il pulsante di invio.
    if (message.value.trim() === '') {
        send.setAttribute('disabled', '');
    } else {
        send.removeAttribute('disabled');
    }
}, CHAT_UPDATE_INTERVAL);

//  L'evento di submit deve causare l'invio del messaggio tramite AJAX
//  e non il reload della pagina.
sendMessageContainer.onsubmit = (event) => {
    send.click();
    event.preventDefault();
};
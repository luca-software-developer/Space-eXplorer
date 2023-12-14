if (location.href.includes('error=inexistent-user')) {
    alert('L\'indirizzo e-mail inserito non appartiene ad un utente registrato.');
    location.replace(location.href.replace('&error=inexistent-user', ''));
}

if (location.href.includes('error=incorrect-password')) {
    alert('La password inserita non è corretta.');
    location.replace(location.href.replace('&error=incorrect-password', ''));
}
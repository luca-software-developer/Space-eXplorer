
/**
 * Gestione dei messaggi di errore in fase di Log-In
 * 
 * @version 1.0.0.0
 * @author Gruppo 32
 */

//  Per ciascun messaggio di errore viene visualizzata una finestra di alert
//  specifica. Infine il parametro GET relativo all'errore viene rimosso
//  dalla URL.
if (location.href.includes('error=inexistent-user')) {
    alert('L\'indirizzo e-mail inserito non appartiene ad un utente registrato.');
    location.replace(location.href.replace('&error=inexistent-user', ''));
}

if (location.href.includes('error=incorrect-password')) {
    alert('La password inserita non è corretta.');
    location.replace(location.href.replace('&error=incorrect-password', ''));
}

if (location.href.includes('error=email-exists')) {
    alert('L\'indirizzo e-mail specificato esiste già.');
    location.replace(location.href.replace('&error=email-exists', ''));
}

if (location.href.includes('error=nickname-exists')) {
    alert('Il nickname specificato esiste già.');
    location.replace(location.href.replace('&error=nickname-exists', ''));
}
`use strict`;

/**
 * Log-In Error
 * 
 * @version 1.0.0.0
 * @author Software Dev Team
 */

/**
 * Visualizza un messaggio di errore in base al contenuto del parametro GET
 * 'error' nella URL. Una volta 'consumato' il messaggio di errore, il parametro
 * viene rimosso per evitare ulteriori visualizzazioni dello stesso messaggio
 * se la pagina viene ricaricata dall'utente.
 */
if (location.href.includes('error=inexistent-user')) {
    alert('L\'indirizzo e-mail inserito non appartiene ad un utente registrato.');
    location.replace(location.href.replace('&error=inexistent-user', ''));
}

if (location.href.includes('error=incorrect-password')) {
    alert('La password inserita non è corretta.');
    location.replace(location.href.replace('&error=incorrect-password', ''));
}
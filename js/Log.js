
/**
 * Visualizza un messaggio opportunamente formattato nella console del browser.
 * @param {string} subject Oggetto del messaggio.
 * @param {string} message Corpo del messaggio.
 */
let log = (subject, message) => {
    console.log(`%c[${subject}] ${message}`, `font-style: italic; `);
};

"use strict";

class Logger {

    /**
     * Visualizza un messaggio di log opportunamente formattato nella console del browser.
     * 
     * @param {string} subject Oggetto del messaggio.
     * @param {string} message Corpo del messaggio.
     */
    static log(subject, message) {
        console.log(`%c[${subject}] ${message}`, `font-style: italic; `);
    };

    /**
     * Visualizza un messaggio di warning opportunamente formattato nella console del browser.
     * 
     * @param {string} subject Oggetto del messaggio.
     * @param {string} message Corpo del messaggio.
     */
    static warn(subject, message) {
        console.warn(`%c[${subject}] ${message}`, `font-style: italic; `);
    };

    /**
     * Visualizza un messaggio di errore opportunamente formattato nella console del browser.
     * 
     * @param {string} subject Oggetto del messaggio.
     * @param {string} message Corpo del messaggio.
     */
    static error(subject, message) {
        console.error(`%c[${subject}] ${message}`, `font-style: italic; `);
    };

}

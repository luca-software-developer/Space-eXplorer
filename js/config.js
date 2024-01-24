
/**
 * Configurazione del progetto
 * 
 * @version 1.0.0.0
 * @author Gruppo 32
 */

/* Community */
const CHAT_UPDATE_INTERVAL = 100; /* ms */

/* Log-In / Dashboard */
const STRONG_PASSWORD_REGEXP = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
const MEDIUM_PASSWORD_REGEXP = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');

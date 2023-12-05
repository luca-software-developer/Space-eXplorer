`use strict`;

/**
 * Password Checker
 * 
 * @version 1.0.0.0
 * @author Software Dev Team
 */

/**
 * Campo e-mail del form Sign-Up.
 */
const signUpEmail = document.getElementById('signup-email');

/**
 * Campo password del form Sign-Up.
 */
const signUpPassword = document.getElementById('signup-password');

/**
 * Testo badge dell'e-mail della password nel form Sign-Up.
 */
const emailBadge = document.getElementById('email-badge');
emailBadge.innerText = 'Non inserita';
emailBadge.style.backgroundColor = 'grey';

/**
 * Testo badge di sicurezza della password nel form Sign-Up.
 */
const securityBadge = document.getElementById('security-badge');
securityBadge.innerText = 'Non inserita';
securityBadge.style.backgroundColor = 'grey';

/**
 * Pulsante 'submit' del form Sign-Up.
 */
const signUpSubmit = document.getElementById('signup-submit');

/**
 * Flags di correttezza dei dati inseriti.
 */
let validEmail = false;
let validPassword = false;

/**
 * Esegue la validazione dell'e-mail.
 */
const emailCheck = () => {
    const email = signUpEmail.value.trim();
    if (email.length == 0) {
        emailBadge.innerText = 'Non inserita';
        emailBadge.style.backgroundColor = 'grey';
        validEmail = false;
        if (validEmail && validPassword) {
            signUpSubmit.removeAttribute('disabled');
        } else {
            signUpSubmit.setAttribute('disabled', '');
        }
        return;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'check-user-exists.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.responseText == 'Disponibile') {
                emailBadge.innerText = 'Disponibile';
                emailBadge.style.backgroundColor = 'green';
                validEmail = true;
            } else {
                emailBadge.innerText = 'Non disponibile';
                emailBadge.style.backgroundColor = 'red';
                validEmail = false;
            }
            if (validEmail && validPassword) {
                signUpSubmit.removeAttribute('disabled');
            } else {
                signUpSubmit.setAttribute('disabled', '');
            }
        }
    };
    xhr.send('signup-email=' + email);
}

/**
 * Esegue la validazione dell'input 'onkeyup'.
 */
signUpEmail.onkeyup = emailCheck;

/**
 * Esegue la validazione dell'input 'onkeydown'.
 */
signUpEmail.onkeydown = emailCheck;

/**
 * Esegue la validazione della password.
 */
const passwordCheck = () => {
    const password = signUpPassword.value.trim();
    if (password.length == 0) {
        securityBadge.innerText = 'Non inserita';
        securityBadge.style.backgroundColor = 'grey';
        validPassword = false;
        if (validEmail && validPassword) {
            signUpSubmit.removeAttribute('disabled');
        } else {
            signUpSubmit.setAttribute('disabled', '');
        }
        return;
    }
    if (password.length < 8) {
        securityBadge.innerText = 'Debole';
        securityBadge.style.backgroundColor = 'red';
        validPassword = false;
        if (validEmail && validPassword) {
            signUpSubmit.removeAttribute('disabled');
        } else {
            signUpSubmit.setAttribute('disabled', '');
        }
        return;
    }
    if (/\d/.test(password) && /[a-zA-Z]/.test(password)) {
        if (/^[0-9a-zA-Z]+$/.test(password)) {
            securityBadge.innerText = 'Normale';
            securityBadge.style.backgroundColor = 'orange';
        } else {
            securityBadge.innerText = 'Forte';
            securityBadge.style.backgroundColor = 'green';
        }
        validPassword = true;
        if (validEmail && validPassword) {
            signUpSubmit.removeAttribute('disabled');
        } else {
            signUpSubmit.setAttribute('disabled', '');
        }
    }
}

/**
 * Esegue la validazione dell'input 'onkeyup'.
 */
signUpPassword.onkeyup = passwordCheck;

/**
 * Esegue la validazione dell'input 'onkeydown'.
 */
signUpPassword.onkeydown = passwordCheck;

emailCheck();
passwordCheck();
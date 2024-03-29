
/**
 * Log-In Validation
 * 
 * @version 1.0.0.0
 * @author Gruppo 32
 */

const signUpEmail = document.getElementById('signup-email');
const signUpPassword = document.getElementById('signup-password');
const emailBadge = document.getElementById('email-badge');
emailBadge.innerText = 'Non inserita';
emailBadge.style.backgroundColor = 'grey';

const securityBadge = document.getElementById('security-badge');
securityBadge.innerText = 'Non inserita';
securityBadge.style.backgroundColor = 'grey';

const signUpSubmit = document.getElementById('signup-submit');

let validEmail = false;
let validPassword = false;

//  Effettua la validazione dell'e-mail tramite AJAX.
const emailCheck = () => {
    const email = signUpEmail.value.trim();
    if (email.length === 0) {
        emailBadge.innerText = 'Non inserita';
        emailBadge.style.backgroundColor = 'grey';
        validEmail = false;
        if (validEmail && validPassword) {
            signUpSubmit.removeAttribute('disabled');
        } else {
            signUpSubmit.setAttribute('disabled', '');
        }
    } else {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'check-user-exists.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText === 'Disponibile') {
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
        xhr.send('signup-email=' + encodeURIComponent(email));
    }
};

//  Effettua la validazione della password (sicurezza).
const passwordCheck = () => {
    const password = signUpPassword.value.trim();
    if (password.length === 0) {
        securityBadge.innerText = 'Non inserita';
        securityBadge.style.backgroundColor = 'grey';
        validPassword = false;
    } else if (STRONG_PASSWORD_REGEXP.test(password)) {
        securityBadge.innerText = 'Forte';
        securityBadge.style.backgroundColor = 'green';
        validPassword = true;
    } else if (MEDIUM_PASSWORD_REGEXP.test(password)) {
        securityBadge.innerText = 'Normale';
        securityBadge.style.backgroundColor = 'orange';
        validPassword = true;
    } else {
        securityBadge.innerText = 'Debole';
        securityBadge.style.backgroundColor = 'red';
        validPassword = false;
    }
    if (validEmail && validPassword) {
        signUpSubmit.removeAttribute('disabled');
    } else {
        signUpSubmit.setAttribute('disabled', '');
    }
};

const validateSignUp = () => { emailCheck(); passwordCheck(); };

validateSignUp();
signUpEmail.addEventListener('input', validateSignUp);
signUpPassword.addEventListener('input', validateSignUp);
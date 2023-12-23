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
};

signUpEmail.onkeyup = emailCheck;
signUpEmail.onkeydown = emailCheck;

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
};

signUpPassword.onkeyup = passwordCheck;
signUpPassword.onkeydown = passwordCheck;

emailCheck();
passwordCheck();
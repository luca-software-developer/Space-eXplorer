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
        xhr.send('signup-email=' + email);
    }
};

const passwordCheck = () => {
    const password = signUpPassword.value.trim();
    const strongPasswordRegExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const mediumPasswordRegExp = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    if (password.length === 0) {
        securityBadge.innerText = 'Non inserita';
        securityBadge.style.backgroundColor = 'grey';
        validPassword = false;
    } else if (strongPasswordRegExp.test(password)) {
        securityBadge.innerText = 'Forte';
        securityBadge.style.backgroundColor = 'green';
        validPassword = true;
    } else if (mediumPasswordRegExp.test(password)) {
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
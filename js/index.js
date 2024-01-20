const email = document.getElementById('email');
const submit = document.getElementById('submit');

const validateEmail = () => {
    const value = email.value.trim();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'check-user-exists.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.responseText == 'Disponibile') {
                submit.removeAttribute('disabled');
            } else {
                submit.setAttribute('disabled', '');
            }
        }
    };
    xhr.send('signup-email=' + value);
};

validateEmail();
email.addEventListener('input', validateEmail);
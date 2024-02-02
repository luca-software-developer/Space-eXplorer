
/**
 * Validazione dell'e-mail inserita nella home page.
 * 
 * @version 1.0.0.0
 * @author Gruppo 32
 */

const email = document.getElementById('email');
const submit = document.getElementById('submit');

//  Effettua la validazione dell'email inserita nella home-page con AJAX.
const validateEmail = () => {
    const value = email.value.trim();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'check-user-exists.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === 'Disponibile') {
                submit.removeAttribute('disabled');
            } else {
                submit.setAttribute('disabled', '');
            }
        }
    };
    xhr.send('signup-email=' + encodeURIComponent(value));
};

validateEmail();
email.addEventListener('input', validateEmail);
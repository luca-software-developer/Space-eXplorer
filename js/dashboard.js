const changePassword = document.getElementById('change-password');
const deleteAccount = document.getElementById('delete-account');
const changePasswordRow = document.getElementById('change-password-row');
const deleteAccountRow = document.getElementById('delete-account-row');
const changePasswordBack = document.getElementById('change-password-back');
const deleteAccountBack = document.getElementById('delete-account-back');
const oldPassword = document.getElementById('old-password');
const newPassword = document.getElementById('new-password');
const rePassword = document.getElementById('re-password');
const submitChangePassword = document.getElementById('submit-change-password');
const formCheckStatus = document.getElementById('form-check-status');
const submitDeleteAccount = document.getElementById('submit-delete-account');

changePassword.onclick = () => {
    deleteAccountBack.click();
    if (changePasswordRow.classList.contains('hidden')) {
        changePasswordRow.classList.remove('hidden');
        changePasswordRow.scrollIntoView();
        changePassword.blur();
    } else {
        changePasswordBack.click();
    }
};

deleteAccount.onclick = () => {
    changePasswordBack.click();
    if (deleteAccountRow.classList.contains('hidden')) {
        deleteAccountRow.classList.remove('hidden');
        deleteAccountRow.scrollIntoView();
        submitDeleteAccount.focus();
    } else {
        deleteAccountBack.click();
    }
};

changePasswordBack.onclick = () => {
    oldPassword.value = '';
    newPassword.value = '';
    rePassword.value = '';
    validateChangePassword();
    changePasswordRow.classList.add('hidden');
    window.scrollTo(0, 0);
};

deleteAccountBack.onclick = () => {
    deleteAccountRow.classList.add('hidden');
    window.scrollTo(0, 0);
};

const validateChangePassword = () => {
    const oldPasswordText = oldPassword.value.trim();
    const newPasswordText = newPassword.value.trim();
    const rePasswordText = rePassword.value.trim();

    //  Form check
    if (oldPasswordText !== '' && newPasswordText !== '' && rePasswordText !== '') {
        if (newPasswordText === rePasswordText) {
            formCheckStatus.innerHTML = '';
            submitChangePassword.removeAttribute('disabled');
        } else {
            formCheckStatus.innerHTML = 'Le password non coincidono!';
            submitChangePassword.setAttribute('disabled', '');
        }
    } else {
        formCheckStatus.innerHTML = 'Compila tutti i campi!';
        submitChangePassword.setAttribute('disabled', '');
    }

    //  Password strength check
    if (newPasswordText !== '') {
        if (MEDIUM_PASSWORD_REGEXP.test(newPasswordText)) {
            newPassword.style.boxShadow = '0 0 20px 0 green';
            if (newPasswordText === rePasswordText) {
                formCheckStatus.innerHTML = '';
                submitChangePassword.removeAttribute('disabled');
                rePassword.style.boxShadow = newPassword.style.boxShadow;
                if (oldPasswordText === '') {
                    formCheckStatus.innerHTML = 'Compila tutti i campi!';
                    submitChangePassword.setAttribute('disabled', '');
                }
            } else {
                formCheckStatus.innerHTML = 'Le password non coincidono!';
                rePassword.style.boxShadow = '0 0 20px 0 red';
                submitChangePassword.setAttribute('disabled', '');
            }
        } else {
            formCheckStatus.innerHTML = 'La nuova password è poco sicura!';
            newPassword.style.boxShadow = '0 0 20px 0 red';
            submitChangePassword.setAttribute('disabled', '');
            rePassword.style.boxShadow = newPassword.style.boxShadow;
        }
    } else {
        formCheckStatus.innerHTML = 'Compila tutti i campi!';
        newPassword.style.boxShadow = 'none';
        submitChangePassword.setAttribute('disabled', '');
        rePassword.style.boxShadow = newPassword.style.boxShadow;
    }
};

const handleChangePasswordEnter = (event) => {
    if (event.key === 'Enter') {
        submitChangePassword.click();
    }
};

validateChangePassword();
oldPassword.addEventListener('input', validateChangePassword);
newPassword.addEventListener('input', validateChangePassword);
rePassword.addEventListener('input', validateChangePassword);
oldPassword.addEventListener('keyup', handleChangePasswordEnter);
newPassword.addEventListener('keyup', handleChangePasswordEnter);
rePassword.addEventListener('keyup', handleChangePasswordEnter);

submitChangePassword.onclick = () => {
    const oldPasswordText = oldPassword.value.trim();
    const newPasswordText = newPassword.value.trim();
    const rePasswordText = rePassword.value.trim();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'change-password.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            if (xhr.responseText === 'Operazione completata!') {
                changePasswordBack.click();
            }
        }
    };
    xhr.send('old-password=' + oldPasswordText + '&new-password=' + newPasswordText + '&re-password=' + rePasswordText);
};

submitDeleteAccount.onclick = () => {
    if (confirm('Sei sicuro di voler eliminare il tuo account?')) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'delete-account.php', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert(xhr.responseText);
                if (xhr.responseText === 'Operazione completata!') {
                    changePasswordBack.click();
                    location.replace('logout.php');
                }
            }
        };
        xhr.send();
    } else {
        alert('Operazione annullata!');
    }
};

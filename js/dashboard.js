const changePassword = document.getElementById('change-password');
const deleteAccount = document.getElementById('delete-account');
const changePasswordRow = document.getElementById('change-password-row');
const deleteAccountRow = document.getElementById('delete-account-row');
const changePasswordBack = document.getElementById('change-password-back');
const deleteAccountBack = document.getElementById('delete-account-back');

changePassword.onclick = () => {
    if (changePasswordRow.classList.contains('hidden')) {
        changePasswordRow.classList.remove('hidden');
        changePasswordRow.scrollIntoView();
    } else {
        changePasswordRow.classList.add('hidden');
        window.scrollTo(0, 0);
    }
}

deleteAccount.onclick = () => {
    if (deleteAccountRow.classList.contains('hidden')) {
        deleteAccountRow.classList.remove('hidden');
        deleteAccountRow.scrollIntoView();
    } else {
        deleteAccountRow.classList.add('hidden');
        window.scrollTo(0, 0);
    }
}

changePasswordBack.onclick = () => {
    changePasswordRow.classList.add('hidden');
    window.scrollTo(0, 0);
}

deleteAccountBack.onclick = () => {
    deleteAccountRow.classList.add('hidden');
    window.scrollTo(0, 0);
}

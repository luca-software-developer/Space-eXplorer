const navbar = document.querySelector('#navbar > ul');
const topLink = document.getElementById('top-link');
topLink.style.display = 'none';

document.onscroll = () => {
    if (window.scrollY < navbar.getBoundingClientRect().height) {
        topLink.style.display = 'none';
    } else {
        topLink.style.display = 'table';
    }
}

let navbar = document.getElementById('navbar');
let topLink = document.getElementById('top-link');
topLink.style.display = 'none';

document.onscroll = () => {
    if (window.scrollY < navbar.getBoundingClientRect().height) {
        topLink.style.display = 'none';
    } else {
        topLink.style.display = 'table';
    }
}
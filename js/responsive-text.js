
const adjustElementWidth = (element, relativeWidth = 1, maximumWidth = null) => {
    element.style.fontSize = '1rem';
    const width = element.getBoundingClientRect().width;
    element.style.fontSize = (relativeWidth * innerWidth / width) + 'rem';
    if (maximumWidth != null && element.getBoundingClientRect().width > maximumWidth) {
        element.style.fontSize = '1rem';
        const width = element.getBoundingClientRect().width;
        element.style.fontSize = maximumWidth / width + 'rem';
    }
}

const adjustHeadingsFontSize = () => {
    const h1 = document.getElementsByTagName('h1')[0];
    const h2 = document.getElementsByTagName('h2')[0];
    adjustElementWidth(h1, .8, 600);
    adjustElementWidth(h2, .7, 500);
}

const main = () => {
    adjustHeadingsFontSize();
    onresize = adjustHeadingsFontSize;
}

main();

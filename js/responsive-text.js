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
    const elements = document.querySelectorAll('[data-rt-relative]');
    for (let element of elements) {
        const relativeWidth = parseFloat(element.getAttribute('data-rt-relative'));
        if (element.hasAttribute('data-rt-maximum')) {
            const maximumWidth = parseFloat(element.getAttribute('data-rt-maximum'));
            adjustElementWidth(element, relativeWidth, maximumWidth);
        } else {
            adjustElementWidth(element, relativeWidth);
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    adjustHeadingsFontSize();
    onresize = adjustHeadingsFontSize;
});

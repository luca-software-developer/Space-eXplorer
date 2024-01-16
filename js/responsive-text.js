//  Regola la width dell'elemento.
const adjustElementWidth = (element, relativeWidth = 1, maximumWidth = null) => {
    //  Inizialmente impostiamo un valore noto per la font-size.
    element.style.fontSize = '1rem';
    //  Otteniamo la width attuale dell'elemento.
    const width = element.getBoundingClientRect().width;
    //  Calcoliamo e impostiamo la font-size desiderata.
    element.style.fontSize = (relativeWidth * innerWidth / width) + 'rem';
    //  Gestiamo anche un'eventuale maximumWidth.
    if (maximumWidth != null && element.getBoundingClientRect().width > maximumWidth) {
        //  Inizialmente impostiamo un valore noto per la font-size.
        element.style.fontSize = '1rem';
        //  Otteniamo la width attuale dell'elemento.
        const width = element.getBoundingClientRect().width;
        //  Calcoliamo e impostiamo la font-size desiderata.
        element.style.fontSize = maximumWidth / width + 'rem';
    }
}

//  Regola la font-size per tutti gli elementi che specificano un valore
//  per l'attributo data-rt-relative.
const adjustFontSize = () => {
    //  Cerchiamo nel DOM tutti gli elementi che specificano un valore
    //  per l'attributo data-rt-relative.
    const elements = document.querySelectorAll('[data-rt-relative]');
    //  Per ciascun elemento...
    for (let element of elements) {
        //  Otteniamo il valore dell'attributo data-rt-relative come float.
        const relativeWidth = parseFloat(element.getAttribute('data-rt-relative'));
        //  Se l'elemento possiede anche l'attributo data-rt-maximum...
        if (element.hasAttribute('data-rt-maximum')) {
            //  Ne otteniamo il valore come float.
            const maximumWidth = parseFloat(element.getAttribute('data-rt-maximum'));
            //  Chiamiamo la adjustElementWidth specificando anche la maximumWidth.
            adjustElementWidth(element, relativeWidth, maximumWidth);
        } else {
            //  Chiamiamo la adjustElementWidth specificando solo la relativeWidth.
            adjustElementWidth(element, relativeWidth);
        }
    }
};

//  Eseguiamo la adjustFontSize con un intervallo di 100ms per essere sicuri
//  che il titolo sia sempre visualizzato correttamente.
setInterval(adjustFontSize, 100);

//  Ogni volta che si verifica un evento di resize della window,
//  deve essere eseguita la adjustFontSize.
onresize = adjustFontSize;
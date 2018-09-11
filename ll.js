function $(selectors, parent = document) {
    return parent.querySelector(selectors);
}

function $$(selectors, parent = document) {
    return Array
        .from(parent.querySelectorAll(selectors))
        .filter(element => element != null);
}

function on(elements, events, targetFilter) {
    let elementsArray;
    let eventsArray;
    // Convert params to arrays
    if (elements === null)
        elementsArray = [];
    else if (elements instanceof NodeList)
        elementsArray = Array.from(elements);
    else if (!Array.isArray(elements))
        elementsArray = [elements];
    else
        elementsArray = elements.filter((e) => e !== null);
    if (!Array.isArray(events))
        events = [events];
    // Ensure events can be attached to the elements
    elementsArray = elementsArray.filter(element => 'addEventListener' in element);
    return (listeners, options) => {
        let listenersArray;
        if (!Array.isArray(listeners))
            listenersArray = [listeners];
        else
            listenersArray = listeners;
        if (typeof targetFilter !== 'undefined') {
            listenersArray = listenersArray.map(listener => ((f) => function (event) {
                const target = event.target.closest(targetFilter);
                if (target)
                    f.call(target, event);
            })(listener));
        }
        for (let element of elementsArray) {
            for (let event of eventsArray) {
                for (let listener of listenersArray) {
                    element.addEventListener.call(element, event, listener, options);
                }
            }
        }
    };
}

function htmlEncode(value) {
    const div = document.createElement('div');
    const text = document.createTextNode(value);
    div.appendChild(text);
    return div.innerHTML;
}

/**
 * Simple string injection using tagged template literals.
 *
 * Indices can be in any order, repeated, or omitted.
 *
 * Undefined indices output a blank string.
 *
 * @param strings Array of template strings
 * @param indices The indices used in the template
 *
 * @example let template = sprintf`How many ${1} do I have? I have ${0}.`;
 * template( '10', 'dinosaurs' ); // How many dinosaurs do I have? I have 10.
 * template( 'zero', 'cars' ); // How many cars do I have? I have zero.
 */
function sprintf(strings, ...indices) {
    return (...values) => strings.reduce((total, part, index) => total + part + (values[indices[index]] || ''), '');
}

export { $, $$, on, htmlEncode, sprintf };

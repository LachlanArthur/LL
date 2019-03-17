function ensureArray(maybe) {
    return Array.isArray(maybe) ? maybe : [maybe];
}
export function on(elements, events, targetFilter) {
    const elementsArray = ensureArray(elements)
        .filter((element) => element !== null && typeof element !== 'undefined')
        // Ensure events can be attached to the elements
        .filter(element => 'addEventListener' in element);
    const eventsArray = ensureArray(events);
    return (listeners, options) => {
        let listenersArray = ensureArray(listeners);
        if (typeof targetFilter !== 'undefined') {
            listenersArray = listenersArray.map((f) => function (event) {
                if (event.target instanceof Element) {
                    const target = event.target.closest(targetFilter);
                    if (target)
                        f.call(target, event);
                }
            });
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
//# sourceMappingURL=on.js.map
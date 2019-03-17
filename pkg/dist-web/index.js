function $(selectors) {
  let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return parent.querySelector(selectors);
}

function $$(selectors) {
  let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.from(parent.querySelectorAll(selectors)).filter(element => element !== null);
}

function ensureArray(maybe) {
  return Array.isArray(maybe) ? maybe : [maybe];
}

function on(elements, events, targetFilter) {
  const elementsArray = ensureArray(elements).filter(element => element !== null && typeof element !== 'undefined') // Ensure events can be attached to the elements
  .filter(element => 'addEventListener' in element);
  const eventsArray = ensureArray(events);
  return (listeners, options) => {
    let listenersArray = ensureArray(listeners);

    if (typeof targetFilter !== 'undefined') {
      listenersArray = listenersArray.map(f => function (event) {
        if (event.target instanceof Element) {
          const target = event.target.closest(targetFilter);
          if (target) f.call(target, event);
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
function sprintf(strings) {
  for (var _len = arguments.length, indices = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    indices[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    return strings.reduce((total, part, index) => total + part + (values[indices[index]] || ''), '');
  };
}

export { $, $$, on, htmlEncode, sprintf };

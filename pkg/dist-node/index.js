'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function $(selectors, parent = document) {
  return parent.querySelector(selectors);
}

function $$(selectors, parent = document) {
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

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = elementsArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        let element = _step.value;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = eventsArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            let event = _step2.value;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = listenersArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                let listener = _step3.value;
                element.addEventListener.call(element, event, listener, options);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
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

exports.$ = $;
exports.$$ = $$;
exports.on = on;
exports.htmlEncode = htmlEncode;
exports.sprintf = sprintf;

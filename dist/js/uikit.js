/* ! UIkit 3.6.19 | https://www.getuikit.com | (c) 2014 - 2021 YOOtheme | MIT License */

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define("uikit", factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      (global.UIkit = factory()));
})(this, function () {
  "use strict";

  const objPrototype = Object.prototype;
  const { hasOwnProperty } = objPrototype;

  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }

  const hyphenateRe = /\B([A-Z])/g;

  const hyphenate = memoize(function (str) {
    return str.replace(hyphenateRe, "-$1").toLowerCase();
  });

  const camelizeRe = /-(\w)/g;

  const camelize = memoize(function (str) {
    return str.replace(camelizeRe, toUpper);
  });

  const ucfirst = memoize(function (str) {
    return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : "";
  });

  function toUpper(_, c) {
    return c ? c.toUpperCase() : "";
  }

  const strPrototype = String.prototype;
  const startsWithFn =
    strPrototype.startsWith ||
    function (search) {
      return this.lastIndexOf(search, 0) === 0;
    };

  function startsWith(str, search) {
    return startsWithFn.call(str, search);
  }

  const endsWithFn =
    strPrototype.endsWith ||
    function (search) {
      return this.substr(-search.length) === search;
    };

  function endsWith(str, search) {
    return endsWithFn.call(str, search);
  }

  const arrPrototype = Array.prototype;

  const includesFn = function (search, i) {
    return !!~this.indexOf(search, i);
  };
  const includesStr = strPrototype.includes || includesFn;
  const includesArray = arrPrototype.includes || includesFn;

  function includes(obj, search) {
    return (
      obj && (isString(obj) ? includesStr : includesArray).call(obj, search)
    );
  }

  const findIndexFn =
    arrPrototype.findIndex ||
    function (predicate) {
      const arguments$1 = arguments;

      for (let i = 0; i < this.length; i++) {
        if (predicate.call(arguments$1[1], this[i], i, this)) {
          return i;
        }
      }
      return -1;
    };

  function findIndex(array, predicate) {
    return findIndexFn.call(array, predicate);
  }

  const { isArray } = Array;

  function isFunction(obj) {
    return typeof obj === "function";
  }

  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }

  const { toString } = objPrototype;
  function isPlainObject(obj) {
    return toString.call(obj) === "[object Object]";
  }

  function isWindow(obj) {
    return isObject(obj) && obj === obj.window;
  }

  function isDocument(obj) {
    return nodeType(obj) === 9;
  }

  function isNode(obj) {
    return nodeType(obj) >= 1;
  }

  function isElement(obj) {
    return nodeType(obj) === 1;
  }

  function nodeType(obj) {
    return !isWindow(obj) && isObject(obj) && obj.nodeType;
  }

  function isBoolean(value) {
    return typeof value === "boolean";
  }

  function isString(value) {
    return typeof value === "string";
  }

  function isNumber(value) {
    return typeof value === "number";
  }

  function isNumeric(value) {
    return (
      isNumber(value) || (isString(value) && !isNaN(value - parseFloat(value)))
    );
  }

  function isEmpty(obj) {
    return !(isArray(obj)
      ? obj.length
      : isObject(obj)
      ? Object.keys(obj).length
      : false);
  }

  function isUndefined(value) {
    return value === void 0;
  }

  function toBoolean(value) {
    return isBoolean(value)
      ? value
      : value === "true" || value === "1" || value === ""
      ? true
      : value === "false" || value === "0"
      ? false
      : value;
  }

  function toNumber(value) {
    const number = Number(value);
    return !isNaN(number) ? number : false;
  }

  function toFloat(value) {
    return parseFloat(value) || 0;
  }

  const toArray =
    Array.from ||
    function (value) {
      return arrPrototype.slice.call(value);
    };

  function toNode(element) {
    return toNodes(element)[0];
  }

  function toNodes(element) {
    return (
      (element &&
        (isNode(element) ? [element] : toArray(element).filter(isNode))) ||
      []
    );
  }

  function toWindow(element) {
    if (isWindow(element)) {
      return element;
    }

    element = toNode(element);

    return element
      ? (isDocument(element) ? element : element.ownerDocument).defaultView
      : window;
  }

  function toMs(time) {
    return !time
      ? 0
      : endsWith(time, "ms")
      ? toFloat(time)
      : toFloat(time) * 1000;
  }

  function isEqual(value, other) {
    return (
      value === other ||
      (isObject(value) &&
        isObject(other) &&
        Object.keys(value).length === Object.keys(other).length &&
        each(value, function (val, key) {
          return val === other[key];
        }))
    );
  }

  function swap(value, a, b) {
    return value.replace(new RegExp(a + "|" + b, "g"), function (match) {
      return match === a ? b : a;
    });
  }

  const assign =
    Object.assign ||
    function (target) {
      let args = [],
        len = arguments.length - 1;
      while (len-- > 0) args[len] = arguments[len + 1];

      target = Object(target);
      for (let i = 0; i < args.length; i++) {
        const source = args[i];
        if (source !== null) {
          for (const key in source) {
            if (hasOwn(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };

  function last(array) {
    return array[array.length - 1];
  }

  function each(obj, cb) {
    for (const key in obj) {
      if (false === cb(obj[key], key)) {
        return false;
      }
    }
    return true;
  }

  function sortBy(array, prop) {
    return array.slice().sort(function (ref, ref$1) {
      let propA = ref[prop];
      if (propA === void 0) propA = 0;
      let propB = ref$1[prop];
      if (propB === void 0) propB = 0;

      return propA > propB ? 1 : propB > propA ? -1 : 0;
    });
  }

  function uniqueBy(array, prop) {
    const seen = new Set();
    return array.filter(
      function (ref) {
        const check = ref[prop];

        return seen.has(check) ? false : seen.add(check) || true;
      } // IE 11 does not return the Set object
    );
  }

  function clamp(number, min, max) {
    if (min === void 0) min = 0;
    if (max === void 0) max = 1;

    return Math.min(Math.max(toNumber(number) || 0, min), max);
  }

  function noop() {}

  function intersectRect() {
    let rects = [],
      len = arguments.length;
    while (len--) rects[len] = arguments[len];

    return [
      ["bottom", "top"],
      ["right", "left"],
    ].every(function (ref) {
      const minProp = ref[0];
      const maxProp = ref[1];

      return (
        Math.min.apply(
          Math,
          rects.map(function (ref) {
            const min = ref[minProp];

            return min;
          })
        ) -
          Math.max.apply(
            Math,
            rects.map(function (ref) {
              const max = ref[maxProp];

              return max;
            })
          ) >
        0
      );
    });
  }

  function pointInRect(point, rect) {
    return (
      point.x <= rect.right &&
      point.x >= rect.left &&
      point.y <= rect.bottom &&
      point.y >= rect.top
    );
  }

  const Dimensions = {
    ratio(dimensions, prop, value) {
      let obj;

      const aProp = prop === "width" ? "height" : "width";

      return (
        (obj = {}),
        (obj[aProp] = dimensions[prop]
          ? Math.round((value * dimensions[aProp]) / dimensions[prop])
          : dimensions[aProp]),
        (obj[prop] = value),
        obj
      );
    },

    contain(dimensions, maxDimensions) {
      const this$1 = this;

      dimensions = assign({}, dimensions);

      each(dimensions, function (_, prop) {
        return (dimensions =
          dimensions[prop] > maxDimensions[prop]
            ? this$1.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions);
      });

      return dimensions;
    },

    cover(dimensions, maxDimensions) {
      const this$1 = this;

      dimensions = this.contain(dimensions, maxDimensions);

      each(dimensions, function (_, prop) {
        return (dimensions =
          dimensions[prop] < maxDimensions[prop]
            ? this$1.ratio(dimensions, prop, maxDimensions[prop])
            : dimensions);
      });

      return dimensions;
    },
  };

  function getIndex(i, elements, current, finite) {
    if (current === void 0) current = 0;
    if (finite === void 0) finite = false;

    elements = toNodes(elements);

    const { length } = elements;

    i = isNumeric(i)
      ? toNumber(i)
      : i === "next"
      ? current + 1
      : i === "previous"
      ? current - 1
      : elements.indexOf(toNode(i));

    if (finite) {
      return clamp(i, 0, length - 1);
    }

    i %= length;

    return i < 0 ? i + length : i;
  }

  function memoize(fn) {
    const cache = Object.create(null);
    return function (key) {
      return cache[key] || (cache[key] = fn(key));
    };
  }

  function attr(element, name, value) {
    if (isObject(name)) {
      for (const key in name) {
        attr(element, key, name[key]);
      }
      return;
    }

    if (isUndefined(value)) {
      element = toNode(element);
      return element && element.getAttribute(name);
    } else {
      toNodes(element).forEach(function (element) {
        if (isFunction(value)) {
          value = value.call(element, attr(element, name));
        }

        if (value === null) {
          removeAttr(element, name);
        } else {
          element.setAttribute(name, value);
        }
      });
    }
  }

  function hasAttr(element, name) {
    return toNodes(element).some(function (element) {
      return element.hasAttribute(name);
    });
  }

  function removeAttr(element, name) {
    element = toNodes(element);
    name.split(" ").forEach(function (name) {
      return element.forEach(function (element) {
        return element.hasAttribute(name) && element.removeAttribute(name);
      });
    });
  }

  function data(element, attribute) {
    for (
      let i = 0, attrs = [attribute, "data-" + attribute];
      i < attrs.length;
      i++
    ) {
      if (hasAttr(element, attrs[i])) {
        return attr(element, attrs[i]);
      }
    }
  }

  /* global DocumentTouch */

  const inBrowser = typeof window !== "undefined";
  const isIE = inBrowser && /msie|trident/i.test(window.navigator.userAgent);
  const isRtl = inBrowser && attr(document.documentElement, "dir") === "rtl";

  const hasTouchEvents = inBrowser && "ontouchstart" in window;
  const hasPointerEvents = inBrowser && window.PointerEvent;
  const hasTouch =
    inBrowser &&
    (hasTouchEvents ||
      (window.DocumentTouch && document instanceof DocumentTouch) ||
      navigator.maxTouchPoints); // IE >=11

  const pointerDown = hasPointerEvents
    ? "pointerdown"
    : hasTouchEvents
    ? "touchstart"
    : "mousedown";
  const pointerMove = hasPointerEvents
    ? "pointermove"
    : hasTouchEvents
    ? "touchmove"
    : "mousemove";
  const pointerUp = hasPointerEvents
    ? "pointerup"
    : hasTouchEvents
    ? "touchend"
    : "mouseup";
  const pointerEnter = hasPointerEvents
    ? "pointerenter"
    : hasTouchEvents
    ? ""
    : "mouseenter";
  const pointerLeave = hasPointerEvents
    ? "pointerleave"
    : hasTouchEvents
    ? ""
    : "mouseleave";
  const pointerCancel = hasPointerEvents ? "pointercancel" : "touchcancel";

  const voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true,
  };
  function isVoidElement(element) {
    return toNodes(element).some(function (element) {
      return voidElements[element.tagName.toLowerCase()];
    });
  }

  function isVisible(element) {
    return toNodes(element).some(function (element) {
      return (
        element.offsetWidth ||
        element.offsetHeight ||
        element.getClientRects().length
      );
    });
  }

  const selInput = "input,select,textarea,button";
  function isInput(element) {
    return toNodes(element).some(function (element) {
      return matches(element, selInput);
    });
  }

  function parent(element) {
    element = toNode(element);
    return element && isElement(element.parentNode) && element.parentNode;
  }

  function filter(element, selector) {
    return toNodes(element).filter(function (element) {
      return matches(element, selector);
    });
  }

  const elProto = inBrowser ? Element.prototype : {};
  const matchesFn =
    elProto.matches ||
    elProto.webkitMatchesSelector ||
    elProto.msMatchesSelector ||
    noop;

  function matches(element, selector) {
    return toNodes(element).some(function (element) {
      return matchesFn.call(element, selector);
    });
  }

  const closestFn =
    elProto.closest ||
    function (selector) {
      let ancestor = this;

      do {
        if (matches(ancestor, selector)) {
          return ancestor;
        }
      } while ((ancestor = parent(ancestor)));
    };

  function closest(element, selector) {
    if (startsWith(selector, ">")) {
      selector = selector.slice(1);
    }

    return isElement(element)
      ? closestFn.call(element, selector)
      : toNodes(element)
          .map(function (element) {
            return closest(element, selector);
          })
          .filter(Boolean);
  }

  function within(element, selector) {
    return !isString(selector)
      ? element === selector ||
          (isDocument(selector)
            ? selector.documentElement
            : toNode(selector)
          ).contains(toNode(element)) // IE 11 document does not implement contains
      : matches(element, selector) || !!closest(element, selector);
  }

  function parents(element, selector) {
    const elements = [];

    while ((element = parent(element))) {
      if (!selector || matches(element, selector)) {
        elements.push(element);
      }
    }

    return elements;
  }

  function children(element, selector) {
    element = toNode(element);
    const children = element ? toNodes(element.children) : [];
    return selector ? filter(children, selector) : children;
  }

  function index(element, ref) {
    return ref
      ? toNodes(element).indexOf(toNode(ref))
      : children(parent(element)).indexOf(element);
  }

  function query(selector, context) {
    return toNode(selector) || find(selector, getContext(selector, context));
  }

  function queryAll(selector, context) {
    const nodes = toNodes(selector);
    return (
      (nodes.length && nodes) ||
      findAll(selector, getContext(selector, context))
    );
  }

  function getContext(selector, context) {
    if (context === void 0) context = document;

    return (isString(selector) && isContextSelector(selector)) ||
      isDocument(context)
      ? context
      : context.ownerDocument;
  }

  function find(selector, context) {
    return toNode(_query(selector, context, "querySelector"));
  }

  function findAll(selector, context) {
    return toNodes(_query(selector, context, "querySelectorAll"));
  }

  function _query(selector, context, queryFn) {
    if (context === void 0) context = document;

    if (!selector || !isString(selector)) {
      return null;
    }

    selector = selector.replace(contextSanitizeRe, "$1 *");

    if (isContextSelector(selector)) {
      selector = splitSelector(selector)
        .map(function (selector, i) {
          let ctx = context;

          if (selector[0] === "!") {
            const selectors = selector.substr(1).trim().split(" ");
            ctx = closest(parent(context), selectors[0]);
            selector = selectors.slice(1).join(" ").trim();
          }

          if (selector[0] === "-") {
            const selectors$1 = selector.substr(1).trim().split(" ");
            const prev = (ctx || context).previousElementSibling;
            ctx = matches(prev, selector.substr(1)) ? prev : null;
            selector = selectors$1.slice(1).join(" ");
          }

          if (!ctx) {
            return null;
          }

          return domPath(ctx) + " " + selector;
        })
        .filter(Boolean)
        .join(",");

      context = document;
    }

    try {
      return context[queryFn](selector);
    } catch (e) {
      return null;
    }
  }

  const contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
  var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;

  var isContextSelector = memoize(function (selector) {
    return selector.match(contextSelectorRe);
  });

  const selectorRe = /.*?[^\\](?:,|$)/g;

  var splitSelector = memoize(function (selector) {
    return selector.match(selectorRe).map(function (selector) {
      return selector.replace(/,$/, "").trim();
    });
  });

  function domPath(element) {
    const names = [];
    while (element.parentNode) {
      if (element.id) {
        names.unshift("#" + escape(element.id));
        break;
      } else {
        let { tagName } = element;
        if (tagName !== "HTML") {
          tagName += ":nth-child(" + (index(element) + 1) + ")";
        }
        names.unshift(tagName);
        element = element.parentNode;
      }
    }
    return names.join(" > ");
  }

  const escapeFn =
    (inBrowser && window.CSS && CSS.escape) ||
    function (css) {
      return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) {
        return "\\" + match;
      });
    };
  function escape(css) {
    return isString(css) ? escapeFn.call(null, css) : "";
  }

  function on() {
    let args = [],
      len = arguments.length;
    while (len--) args[len] = arguments[len];

    const ref = getArgs(args);
    let targets = ref[0];
    const type = ref[1];
    const selector = ref[2];
    let listener = ref[3];
    let useCapture = ref[4];

    targets = toEventTargets(targets);

    if (listener.length > 1) {
      listener = detail(listener);
    }

    if (useCapture && useCapture.self) {
      listener = selfFilter(listener);
    }

    if (selector) {
      listener = delegate(selector, listener);
    }

    useCapture = useCaptureFilter(useCapture);

    type.split(" ").forEach(function (type) {
      return targets.forEach(function (target) {
        return target.addEventListener(type, listener, useCapture);
      });
    });
    return function () {
      return off(targets, type, listener, useCapture);
    };
  }

  function off(targets, type, listener, useCapture) {
    if (useCapture === void 0) useCapture = false;

    useCapture = useCaptureFilter(useCapture);
    targets = toEventTargets(targets);
    type.split(" ").forEach(function (type) {
      return targets.forEach(function (target) {
        return target.removeEventListener(type, listener, useCapture);
      });
    });
  }

  function once() {
    let args = [],
      len = arguments.length;
    while (len--) args[len] = arguments[len];

    const ref = getArgs(args);
    const element = ref[0];
    const type = ref[1];
    const selector = ref[2];
    const listener = ref[3];
    const useCapture = ref[4];
    const condition = ref[5];
    var off = on(
      element,
      type,
      selector,
      function (e) {
        const result = !condition || condition(e);
        if (result) {
          off();
          listener(e, result);
        }
      },
      useCapture
    );

    return off;
  }

  function trigger(targets, event, detail) {
    return toEventTargets(targets).reduce(function (notCanceled, target) {
      return (
        notCanceled &&
        target.dispatchEvent(createEvent(event, true, true, detail))
      );
    }, true);
  }

  function createEvent(e, bubbles, cancelable, detail) {
    if (bubbles === void 0) bubbles = true;
    if (cancelable === void 0) cancelable = false;

    if (isString(e)) {
      const event = document.createEvent("CustomEvent"); // IE 11
      event.initCustomEvent(e, bubbles, cancelable, detail);
      e = event;
    }

    return e;
  }

  function getArgs(args) {
    if (isFunction(args[2])) {
      args.splice(2, 0, false);
    }
    return args;
  }

  function delegate(selector, listener) {
    const this$1 = this;

    return function (e) {
      const current =
        selector[0] === ">"
          ? findAll(selector, e.currentTarget)
              .reverse()
              .filter(function (element) {
                return within(e.target, element);
              })[0]
          : closest(e.target, selector);

      if (current) {
        e.current = current;
        listener.call(this$1, e);
      }
    };
  }

  function detail(listener) {
    return function (e) {
      return isArray(e.detail)
        ? listener.apply(void 0, [e].concat(e.detail))
        : listener(e);
    };
  }

  function selfFilter(listener) {
    return function (e) {
      if (e.target === e.currentTarget || e.target === e.current) {
        return listener.call(null, e);
      }
    };
  }

  function useCaptureFilter(options) {
    return options && isIE && !isBoolean(options) ? !!options.capture : options;
  }

  function isEventTarget(target) {
    return target && "addEventListener" in target;
  }

  function toEventTarget(target) {
    return isEventTarget(target) ? target : toNode(target);
  }

  function toEventTargets(target) {
    return isArray(target)
      ? target.map(toEventTarget).filter(Boolean)
      : isString(target)
      ? findAll(target)
      : isEventTarget(target)
      ? [target]
      : toNodes(target);
  }

  function isTouch(e) {
    return e.pointerType === "touch" || !!e.touches;
  }

  function getEventPos(e) {
    const { touches } = e;
    const { changedTouches } = e;
    const ref =
      (touches && touches[0]) || (changedTouches && changedTouches[0]) || e;
    const x = ref.clientX;
    const y = ref.clientY;

    return { x, y };
  }

  /* global setImmediate */

  const Promise = (inBrowser && window.Promise) || PromiseFn;

  const Deferred = function () {
    const this$1 = this;

    this.promise = new Promise(function (resolve, reject) {
      this$1.reject = reject;
      this$1.resolve = resolve;
    });
  };

  /**
   * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
   */

  const RESOLVED = 0;
  const REJECTED = 1;
  const PENDING = 2;

  const async = (inBrowser && window.setImmediate) || setTimeout;

  function PromiseFn(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    const promise = this;

    try {
      executor(
        function (x) {
          promise.resolve(x);
        },
        function (r) {
          promise.reject(r);
        }
      );
    } catch (e) {
      promise.reject(e);
    }
  }

  PromiseFn.reject = function (r) {
    return new PromiseFn(function (resolve, reject) {
      reject(r);
    });
  };

  PromiseFn.resolve = function (x) {
    return new PromiseFn(function (resolve, reject) {
      resolve(x);
    });
  };

  PromiseFn.all = function all(iterable) {
    return new PromiseFn(function (resolve, reject) {
      const result = [];
      let count = 0;

      if (iterable.length === 0) {
        resolve(result);
      }

      function resolver(i) {
        return function (x) {
          result[i] = x;
          count += 1;

          if (count === iterable.length) {
            resolve(result);
          }
        };
      }

      for (let i = 0; i < iterable.length; i += 1) {
        PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
      }
    });
  };

  PromiseFn.race = function race(iterable) {
    return new PromiseFn(function (resolve, reject) {
      for (let i = 0; i < iterable.length; i += 1) {
        PromiseFn.resolve(iterable[i]).then(resolve, reject);
      }
    });
  };

  const p = PromiseFn.prototype;

  p.resolve = function resolve(x) {
    const promise = this;

    if (promise.state === PENDING) {
      if (x === promise) {
        throw new TypeError("Promise settled with itself.");
      }

      let called = false;

      try {
        const then = x && x.then;

        if (x !== null && isObject(x) && isFunction(then)) {
          then.call(
            x,
            function (x) {
              if (!called) {
                promise.resolve(x);
              }
              called = true;
            },
            function (r) {
              if (!called) {
                promise.reject(r);
              }
              called = true;
            }
          );
          return;
        }
      } catch (e) {
        if (!called) {
          promise.reject(e);
        }
        return;
      }

      promise.state = RESOLVED;
      promise.value = x;
      promise.notify();
    }
  };

  p.reject = function reject(reason) {
    const promise = this;

    if (promise.state === PENDING) {
      if (reason === promise) {
        throw new TypeError("Promise settled with itself.");
      }

      promise.state = REJECTED;
      promise.value = reason;
      promise.notify();
    }
  };

  p.notify = function notify() {
    const this$1 = this;

    async(function () {
      if (this$1.state !== PENDING) {
        while (this$1.deferred.length) {
          const ref = this$1.deferred.shift();
          const onResolved = ref[0];
          const onRejected = ref[1];
          const resolve = ref[2];
          const reject = ref[3];

          try {
            if (this$1.state === RESOLVED) {
              if (isFunction(onResolved)) {
                resolve(onResolved.call(undefined, this$1.value));
              } else {
                resolve(this$1.value);
              }
            } else if (this$1.state === REJECTED) {
              if (isFunction(onRejected)) {
                resolve(onRejected.call(undefined, this$1.value));
              } else {
                reject(this$1.value);
              }
            }
          } catch (e) {
            reject(e);
          }
        }
      }
    });
  };

  p.then = function then(onResolved, onRejected) {
    const this$1 = this;

    return new PromiseFn(function (resolve, reject) {
      this$1.deferred.push([onResolved, onRejected, resolve, reject]);
      this$1.notify();
    });
  };

  p.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  function ajax(url, options) {
    const env = assign(
      {
        data: null,
        method: "GET",
        headers: {},
        xhr: new XMLHttpRequest(),
        beforeSend: noop,
        responseType: "",
      },
      options
    );

    return Promise.resolve()
      .then(function () {
        return env.beforeSend(env);
      })
      .then(function () {
        return send(url, env);
      });
  }

  function send(url, env) {
    return new Promise(function (resolve, reject) {
      let { xhr } = env;

      for (const prop in env) {
        if (prop in xhr) {
          try {
            xhr[prop] = env[prop];
          } catch (e) {}
        }
      }

      xhr.open(env.method.toUpperCase(), url);

      for (const header in env.headers) {
        xhr.setRequestHeader(header, env.headers[header]);
      }

      on(xhr, "load", function () {
        if (
          xhr.status === 0 ||
          (xhr.status >= 200 && xhr.status < 300) ||
          xhr.status === 304
        ) {
          // IE 11 does not support responseType 'json'
          if (env.responseType === "json" && isString(xhr.response)) {
            xhr = assign(copyXhr(xhr), { response: JSON.parse(xhr.response) });
          }

          resolve(xhr);
        } else {
          reject(
            assign(Error(xhr.statusText), {
              xhr,
              status: xhr.status,
            })
          );
        }
      });

      on(xhr, "error", function () {
        return reject(assign(Error("Network Error"), { xhr }));
      });
      on(xhr, "timeout", function () {
        return reject(assign(Error("Network Timeout"), { xhr }));
      });

      xhr.send(env.data);
    });
  }

  function getImage(src, srcset, sizes) {
    return new Promise(function (resolve, reject) {
      const img = new Image();

      img.onerror = function (e) {
        return reject(e);
      };
      img.onload = function () {
        return resolve(img);
      };

      sizes && (img.sizes = sizes);
      srcset && (img.srcset = srcset);
      img.src = src;
    });
  }

  function copyXhr(source) {
    const target = {};
    for (const key in source) {
      target[key] = source[key];
    }
    return target;
  }

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
      return;
    }

    var unbind = on(document, "DOMContentLoaded", function () {
      unbind();
      fn();
    });
  }

  function empty(element) {
    element = $(element);
    element.innerHTML = "";
    return element;
  }

  function html(parent, html) {
    parent = $(parent);
    return isUndefined(html)
      ? parent.innerHTML
      : append(parent.hasChildNodes() ? empty(parent) : parent, html);
  }

  function prepend(parent, element) {
    parent = $(parent);

    if (!parent.hasChildNodes()) {
      return append(parent, element);
    } else {
      return insertNodes(element, function (element) {
        return parent.insertBefore(element, parent.firstChild);
      });
    }
  }

  function append(parent, element) {
    parent = $(parent);
    return insertNodes(element, function (element) {
      return parent.appendChild(element);
    });
  }

  function before(ref, element) {
    ref = $(ref);
    return insertNodes(element, function (element) {
      return ref.parentNode.insertBefore(element, ref);
    });
  }

  function after(ref, element) {
    ref = $(ref);
    return insertNodes(element, function (element) {
      return ref.nextSibling
        ? before(ref.nextSibling, element)
        : append(ref.parentNode, element);
    });
  }

  function insertNodes(element, fn) {
    element = isString(element) ? fragment(element) : element;
    return element
      ? "length" in element
        ? toNodes(element).map(fn)
        : fn(element)
      : null;
  }

  function remove(element) {
    toNodes(element).forEach(function (element) {
      return element.parentNode && element.parentNode.removeChild(element);
    });
  }

  function wrapAll(element, structure) {
    structure = toNode(before(element, structure));

    while (structure.firstChild) {
      structure = structure.firstChild;
    }

    append(structure, element);

    return structure;
  }

  function wrapInner(element, structure) {
    return toNodes(
      toNodes(element).map(function (element) {
        return element.hasChildNodes
          ? wrapAll(toNodes(element.childNodes), structure)
          : append(element, structure);
      })
    );
  }

  function unwrap(element) {
    toNodes(element)
      .map(parent)
      .filter(function (value, index, self) {
        return self.indexOf(value) === index;
      })
      .forEach(function (parent) {
        before(parent, parent.childNodes);
        remove(parent);
      });
  }

  const fragmentRe = /^\s*<(\w+|!)[^>]*>/;
  const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

  function fragment(html) {
    const matches = singleTagRe.exec(html);
    if (matches) {
      return document.createElement(matches[1]);
    }

    const container = document.createElement("div");
    if (fragmentRe.test(html)) {
      container.insertAdjacentHTML("beforeend", html.trim());
    } else {
      container.textContent = html;
    }

    return container.childNodes.length > 1
      ? toNodes(container.childNodes)
      : container.firstChild;
  }

  function apply(node, fn) {
    if (!isElement(node)) {
      return;
    }

    fn(node);
    node = node.firstElementChild;
    while (node) {
      const next = node.nextElementSibling;
      apply(node, fn);
      node = next;
    }
  }

  function $(selector, context) {
    return !isString(selector)
      ? toNode(selector)
      : isHtml(selector)
      ? toNode(fragment(selector))
      : find(selector, context);
  }

  function $$(selector, context) {
    return !isString(selector)
      ? toNodes(selector)
      : isHtml(selector)
      ? toNodes(fragment(selector))
      : findAll(selector, context);
  }

  function isHtml(str) {
    return str[0] === "<" || str.match(/^\s*</);
  }

  function addClass(element) {
    let args = [],
      len = arguments.length - 1;
    while (len-- > 0) args[len] = arguments[len + 1];

    apply$1(element, args, "add");
  }

  function removeClass(element) {
    let args = [],
      len = arguments.length - 1;
    while (len-- > 0) args[len] = arguments[len + 1];

    apply$1(element, args, "remove");
  }

  function removeClasses(element, cls) {
    attr(element, "class", function (value) {
      return (value || "").replace(new RegExp("\\b" + cls + "\\b", "g"), "");
    });
  }

  function replaceClass(element) {
    let args = [],
      len = arguments.length - 1;
    while (len-- > 0) args[len] = arguments[len + 1];

    args[0] && removeClass(element, args[0]);
    args[1] && addClass(element, args[1]);
  }

  function hasClass(element, cls) {
    let assign;

    (assign = getClasses(cls)), (cls = assign[0]);
    const nodes = toNodes(element);
    for (let n = 0; n < nodes.length; n++) {
      if (cls && nodes[n].classList.contains(cls)) {
        return true;
      }
    }
    return false;
  }

  function toggleClass(element, cls, force) {
    cls = getClasses(cls);

    const nodes = toNodes(element);
    for (let n = 0; n < nodes.length; n++) {
      const list = nodes[n].classList;
      for (let i = 0; i < cls.length; i++) {
        if (isUndefined(force)) {
          list.toggle(cls[i]);
        } else if (supports.Force) {
          list.toggle(cls[i], !!force);
        } else {
          list[force ? "add" : "remove"](cls[i]);
        }
      }
    }
  }

  function apply$1(element, args, fn) {
    let ref;

    args = args.reduce(function (args, arg) {
      return args.concat(getClasses(arg));
    }, []);

    const nodes = toNodes(element);
    const loop = function (n) {
      if (supports.Multiple) {
        (ref = nodes[n].classList)[fn].apply(ref, args);
      } else {
        args.forEach(function (cls) {
          return nodes[n].classList[fn](cls);
        });
      }
    };

    for (let n = 0; n < nodes.length; n++) loop(n);
  }

  function getClasses(str) {
    str = String(str);
    return (~str.indexOf(" ") ? str.split(" ") : [str]).filter(Boolean);
  }

  // IE 11
  var supports = {
    get Multiple() {
      return this.get("Multiple");
    },

    get Force() {
      return this.get("Force");
    },

    get(key) {
      const ref = document.createElement("_");
      const { classList } = ref;
      classList.add("a", "b");
      classList.toggle("c", false);
      supports = {
        Multiple: classList.contains("b"),
        Force: !classList.contains("c"),
      };

      return supports[key];
    },
  };

  const cssNumber = {
    "animation-iteration-count": true,
    "column-count": true,
    "fill-opacity": true,
    "flex-grow": true,
    "flex-shrink": true,
    "font-weight": true,
    "line-height": true,
    opacity: true,
    order: true,
    orphans: true,
    "stroke-dasharray": true,
    "stroke-dashoffset": true,
    widows: true,
    "z-index": true,
    zoom: true,
  };

  function css(element, property, value, priority) {
    if (priority === void 0) priority = "";

    return toNodes(element).map(function (element) {
      if (isString(property)) {
        property = propName(property);

        if (isUndefined(value)) {
          return getStyle(element, property);
        } else if (!value && !isNumber(value)) {
          element.style.removeProperty(property);
        } else {
          element.style.setProperty(
            property,
            isNumeric(value) && !cssNumber[property] ? value + "px" : value,
            priority
          );
        }
      } else if (isArray(property)) {
        const styles = getStyles(element);

        return property.reduce(function (props, property) {
          props[property] = styles[propName(property)];
          return props;
        }, {});
      } else if (isObject(property)) {
        priority = value;
        each(property, function (value, property) {
          return css(element, property, value, priority);
        });
      }

      return element;
    })[0];
  }

  function getStyles(element, pseudoElt) {
    return toWindow(element).getComputedStyle(element, pseudoElt);
  }

  function getStyle(element, property, pseudoElt) {
    return getStyles(element, pseudoElt)[property];
  }

  const parseCssVar = memoize(function (name) {
    /* usage in css: .mod-name:before { content:"xyz" } */

    const element = append(
      document.documentElement,
      document.createElement("div")
    );

    addClass(element, "mod-" + name);

    name = getStyle(element, "content", ":before").replace(
      /^["'](.*)["']$/,
      "$1"
    );

    remove(element);

    return name;
  });

  function getCssVar(name) {
    return !isIE
      ? getStyles(document.documentElement).getPropertyValue("--mod-" + name)
      : parseCssVar(name);
  }

  // https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty
  var propName = memoize(function (name) {
    return vendorPropName(name);
  });

  const cssPrefixes = ["webkit", "moz", "ms"];

  function vendorPropName(name) {
    name = hyphenate(name);

    const ref = document.documentElement;
    const { style } = ref;

    if (name in style) {
      return name;
    }

    let i = cssPrefixes.length,
      prefixedName;

    while (i--) {
      prefixedName = "-" + cssPrefixes[i] + "-" + name;
      if (prefixedName in style) {
        return prefixedName;
      }
    }
  }

  function transition(element, props, duration, timing) {
    if (duration === void 0) duration = 400;
    if (timing === void 0) timing = "linear";

    return Promise.all(
      toNodes(element).map(function (element) {
        return new Promise(function (resolve, reject) {
          for (const name in props) {
            const value = css(element, name);
            if (value === "") {
              css(element, name, value);
            }
          }

          const timer = setTimeout(function () {
            return trigger(element, "transitionend");
          }, duration);

          once(
            element,
            "transitionend transitioncanceled",
            function (ref) {
              const { type } = ref;

              clearTimeout(timer);
              removeClass(element, "mod-transition");
              css(element, {
                transitionProperty: "",
                transitionDuration: "",
                transitionTimingFunction: "",
              });
              type === "transitioncanceled" ? reject() : resolve(element);
            },
            { self: true }
          );

          addClass(element, "mod-transition");
          css(
            element,
            assign(
              {
                transitionProperty: Object.keys(props).map(propName).join(","),
                transitionDuration: duration + "ms",
                transitionTimingFunction: timing,
              },
              props
            )
          );
        });
      })
    );
  }

  const Transition = {
    start: transition,

    stop(element) {
      trigger(element, "transitionend");
      return Promise.resolve();
    },

    cancel(element) {
      trigger(element, "transitioncanceled");
    },

    inProgress(element) {
      return hasClass(element, "mod-transition");
    },
  };

  const animationPrefix = "mod-animation-";

  function animate(element, animation, duration, origin, out) {
    if (duration === void 0) duration = 200;

    return Promise.all(
      toNodes(element).map(function (element) {
        return new Promise(function (resolve, reject) {
          trigger(element, "animationcanceled");
          const timer = setTimeout(function () {
            return trigger(element, "animationend");
          }, duration);

          once(
            element,
            "animationend animationcanceled",
            function (ref) {
              const { type } = ref;

              clearTimeout(timer);

              type === "animationcanceled" ? reject() : resolve(element);

              css(element, "animationDuration", "");
              removeClasses(element, animationPrefix + "\\S*");
            },
            { self: true }
          );

          css(element, "animationDuration", duration + "ms");
          addClass(
            element,
            animation,
            animationPrefix + (out ? "leave" : "enter")
          );

          if (startsWith(animation, animationPrefix)) {
            origin && addClass(element, "mod-transform-origin-" + origin);
            out && addClass(element, animationPrefix + "reverse");
          }
        });
      })
    );
  }

  const inProgress = new RegExp(animationPrefix + "(enter|leave)");
  const Animation = {
    in: animate,

    out(element, animation, duration, origin) {
      return animate(element, animation, duration, origin, true);
    },

    inProgress(element) {
      return inProgress.test(attr(element, "class"));
    },

    cancel(element) {
      trigger(element, "animationcanceled");
    },
  };

  const dirs = {
    width: ["left", "right"],
    height: ["top", "bottom"],
  };

  function dimensions(element) {
    const rect = isElement(element)
      ? toNode(element).getBoundingClientRect()
      : { height: height(element), width: width(element), top: 0, left: 0 };

    return {
      height: rect.height,
      width: rect.width,
      top: rect.top,
      left: rect.left,
      bottom: rect.top + rect.height,
      right: rect.left + rect.width,
    };
  }

  function offset(element, coordinates) {
    const currentOffset = dimensions(element);
    const ref = toWindow(element);
    const { pageYOffset } = ref;
    const { pageXOffset } = ref;
    const offsetBy = { height: pageYOffset, width: pageXOffset };

    for (const dir in dirs) {
      for (const i in dirs[dir]) {
        currentOffset[dirs[dir][i]] += offsetBy[dir];
      }
    }

    if (!coordinates) {
      return currentOffset;
    }

    const pos = css(element, "position");

    each(css(element, ["left", "top"]), function (value, prop) {
      return css(
        element,
        prop,
        coordinates[prop] -
          currentOffset[prop] +
          toFloat(
            pos === "absolute" && value === "auto"
              ? position(element)[prop]
              : value
          )
      );
    });
  }

  function position(element) {
    const ref = offset(element);
    let { top } = ref;
    let { left } = ref;

    const ref$1 = toNode(element);
    const ref$1_ownerDocument = ref$1.ownerDocument;
    const { body } = ref$1_ownerDocument;
    const { documentElement } = ref$1_ownerDocument;
    const { offsetParent } = ref$1;
    let parent = offsetParent || documentElement;

    while (
      parent &&
      (parent === body || parent === documentElement) &&
      css(parent, "position") === "static"
    ) {
      parent = parent.parentNode;
    }

    if (isElement(parent)) {
      const parentOffset = offset(parent);
      top -= parentOffset.top + toFloat(css(parent, "borderTopWidth"));
      left -= parentOffset.left + toFloat(css(parent, "borderLeftWidth"));
    }

    return {
      top: top - toFloat(css(element, "marginTop")),
      left: left - toFloat(css(element, "marginLeft")),
    };
  }

  function offsetPosition(element) {
    const offset = [0, 0];

    element = toNode(element);

    do {
      offset[0] += element.offsetTop;
      offset[1] += element.offsetLeft;

      if (css(element, "position") === "fixed") {
        const win = toWindow(element);
        offset[0] += win.pageYOffset;
        offset[1] += win.pageXOffset;
        return offset;
      }
    } while ((element = element.offsetParent));

    return offset;
  }

  var height = dimension("height");
  var width = dimension("width");

  function dimension(prop) {
    const propName = ucfirst(prop);
    return function (element, value) {
      if (isUndefined(value)) {
        if (isWindow(element)) {
          return element["inner" + propName];
        }

        if (isDocument(element)) {
          const doc = element.documentElement;
          return Math.max(doc["offset" + propName], doc["scroll" + propName]);
        }

        element = toNode(element);

        value = css(element, prop);
        value =
          value === "auto" ? element["offset" + propName] : toFloat(value) || 0;

        return value - boxModelAdjust(element, prop);
      } else {
        return css(
          element,
          prop,
          !value && value !== 0
            ? ""
            : +value + boxModelAdjust(element, prop) + "px"
        );
      }
    };
  }

  function boxModelAdjust(element, prop, sizing) {
    if (sizing === void 0) sizing = "border-box";

    return css(element, "boxSizing") === sizing
      ? dirs[prop].map(ucfirst).reduce(function (value, prop) {
          return (
            value +
            toFloat(css(element, "padding" + prop)) +
            toFloat(css(element, "border" + prop + "Width"))
          );
        }, 0)
      : 0;
  }

  function flipPosition(pos) {
    for (const dir in dirs) {
      for (const i in dirs[dir]) {
        if (dirs[dir][i] === pos) {
          return dirs[dir][1 - i];
        }
      }
    }
    return pos;
  }

  function toPx(value, property, element) {
    if (property === void 0) property = "width";
    if (element === void 0) element = window;

    return isNumeric(value)
      ? +value
      : endsWith(value, "vh")
      ? percent(height(toWindow(element)), value)
      : endsWith(value, "vw")
      ? percent(width(toWindow(element)), value)
      : endsWith(value, "%")
      ? percent(dimensions(element)[property], value)
      : toFloat(value);
  }

  function percent(base, value) {
    return (base * toFloat(value)) / 100;
  }

  /*
        Based on:
        Copyright (c) 2016 Wilson Page wilsonpage@me.com
        https://github.com/wilsonpage/fastdom
    */

  const fastdom = {
    reads: [],
    writes: [],

    read(task) {
      this.reads.push(task);
      scheduleFlush();
      return task;
    },

    write(task) {
      this.writes.push(task);
      scheduleFlush();
      return task;
    },

    clear(task) {
      remove$1(this.reads, task);
      remove$1(this.writes, task);
    },

    flush,
  };

  function flush(recursion) {
    if (recursion === void 0) recursion = 1;

    runTasks(fastdom.reads);
    runTasks(fastdom.writes.splice(0));

    fastdom.scheduled = false;

    if (fastdom.reads.length || fastdom.writes.length) {
      scheduleFlush(recursion + 1);
    }
  }

  const RECURSION_LIMIT = 4;
  function scheduleFlush(recursion) {
    if (fastdom.scheduled) {
      return;
    }

    fastdom.scheduled = true;
    if (recursion && recursion < RECURSION_LIMIT) {
      Promise.resolve().then(function () {
        return flush(recursion);
      });
    } else {
      requestAnimationFrame(function () {
        return flush();
      });
    }
  }

  function runTasks(tasks) {
    let task;
    while ((task = tasks.shift())) {
      try {
        task();
      } catch (e) {
        console.error(e);
      }
    }
  }

  function remove$1(array, item) {
    const index = array.indexOf(item);
    return ~index && array.splice(index, 1);
  }

  function MouseTracker() {}

  MouseTracker.prototype = {
    positions: [],

    init() {
      const this$1 = this;

      this.positions = [];

      let position;
      this.unbind = on(document, "mousemove", function (e) {
        return (position = getEventPos(e));
      });
      this.interval = setInterval(function () {
        if (!position) {
          return;
        }

        this$1.positions.push(position);

        if (this$1.positions.length > 5) {
          this$1.positions.shift();
        }
      }, 50);
    },

    cancel() {
      this.unbind && this.unbind();
      this.interval && clearInterval(this.interval);
    },

    movesTo(target) {
      if (this.positions.length < 2) {
        return false;
      }

      const p = target.getBoundingClientRect();
      const { left } = p;
      const { right } = p;
      const { top } = p;
      const { bottom } = p;

      const ref = this.positions;
      const prevPosition = ref[0];
      const position = last(this.positions);
      const path = [prevPosition, position];

      if (pointInRect(position, p)) {
        return false;
      }

      const diagonals = [
        [
          { x: left, y: top },
          { x: right, y: bottom },
        ],
        [
          { x: left, y: bottom },
          { x: right, y: top },
        ],
      ];

      return diagonals.some(function (diagonal) {
        const intersection = intersect(path, diagonal);
        return intersection && pointInRect(intersection, p);
      });
    },
  };

  // Inspired by http://paulbourke.net/geometry/pointlineplane/
  function intersect(ref, ref$1) {
    const ref_0 = ref[0];
    const x1 = ref_0.x;
    const y1 = ref_0.y;
    const ref_1 = ref[1];
    const x2 = ref_1.x;
    const y2 = ref_1.y;
    const ref$1_0 = ref$1[0];
    const x3 = ref$1_0.x;
    const y3 = ref$1_0.y;
    const ref$1_1 = ref$1[1];
    const x4 = ref$1_1.x;
    const y4 = ref$1_1.y;

    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Lines are parallel
    if (denominator === 0) {
      return false;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;

    if (ua < 0) {
      return false;
    }

    // Return an object with the x and y coordinates of the intersection
    return { x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) };
  }

  const strats = {};

  strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;

  // args strategy
  strats.args = function (parentVal, childVal) {
    return childVal !== false && concatStrat(childVal || parentVal);
  };

  // update strategy
  strats.update = function (parentVal, childVal) {
    return sortBy(
      concatStrat(
        parentVal,
        isFunction(childVal) ? { read: childVal } : childVal
      ),
      "order"
    );
  };

  // property strategy
  strats.props = function (parentVal, childVal) {
    if (isArray(childVal)) {
      childVal = childVal.reduce(function (value, key) {
        value[key] = String;
        return value;
      }, {});
    }

    return strats.methods(parentVal, childVal);
  };

  // extend strategy
  strats.computed = strats.methods = function (parentVal, childVal) {
    return childVal
      ? parentVal
        ? assign({}, parentVal, childVal)
        : childVal
      : parentVal;
  };

  // data strategy
  strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
      if (!childVal) {
        return parentVal;
      }

      if (!parentVal) {
        return childVal;
      }

      return function (vm) {
        return mergeFnData(parentVal, childVal, vm);
      };
    }

    return mergeFnData(parentVal, childVal, vm);
  };

  function mergeFnData(parentVal, childVal, vm) {
    return strats.computed(
      isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal,
      isFunction(childVal) ? childVal.call(vm, vm) : childVal
    );
  }

  // concat strategy
  function concatStrat(parentVal, childVal) {
    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;

    return childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : isArray(childVal)
        ? childVal
        : [childVal]
      : parentVal;
  }

  // default strategy
  function defaultStrat(parentVal, childVal) {
    return isUndefined(childVal) ? parentVal : childVal;
  }

  function mergeOptions(parent, child, vm) {
    const options = {};

    if (isFunction(child)) {
      child = child.options;
    }

    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }

    for (const key in parent) {
      mergeKey(key);
    }

    for (const key$1 in child) {
      if (!hasOwn(parent, key$1)) {
        mergeKey(key$1);
      }
    }

    function mergeKey(key) {
      options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
    }

    return options;
  }

  function parseOptions(options, args) {
    let obj;

    if (args === void 0) args = [];

    try {
      return !options
        ? {}
        : startsWith(options, "{")
        ? JSON.parse(options)
        : args.length && !includes(options, ":")
        ? ((obj = {}), (obj[args[0]] = options), obj)
        : options.split(";").reduce(function (options, option) {
            const ref = option.split(/:(.*)/);
            const key = ref[0];
            const value = ref[1];
            if (key && !isUndefined(value)) {
              options[key.trim()] = value.trim();
            }
            return options;
          }, {});
    } catch (e) {
      return {};
    }
  }

  function play(el) {
    if (isIFrame(el)) {
      call(el, { func: "playVideo", method: "play" });
    }

    if (isHTML5(el)) {
      try {
        el.play().catch(noop);
      } catch (e) {}
    }
  }

  function pause(el) {
    if (isIFrame(el)) {
      call(el, { func: "pauseVideo", method: "pause" });
    }

    if (isHTML5(el)) {
      el.pause();
    }
  }

  function mute(el) {
    if (isIFrame(el)) {
      call(el, { func: "mute", method: "setVolume", value: 0 });
    }

    if (isHTML5(el)) {
      el.muted = true;
    }
  }

  function isHTML5(el) {
    return el && el.tagName === "VIDEO";
  }

  function isIFrame(el) {
    return el && el.tagName === "IFRAME" && (isYoutube(el) || isVimeo(el));
  }

  function isYoutube(el) {
    return !!el.src.match(
      /\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/
    );
  }

  function isVimeo(el) {
    return !!el.src.match(/vimeo\.com\/video\/.*/);
  }

  function call(el, cmd) {
    enableApi(el).then(function () {
      return post(el, cmd);
    });
  }

  function post(el, cmd) {
    try {
      el.contentWindow.postMessage(
        JSON.stringify(assign({ event: "command" }, cmd)),
        "*"
      );
    } catch (e) {}
  }

  const stateKey = "_ukPlayer";
  let counter = 0;
  function enableApi(el) {
    if (el[stateKey]) {
      return el[stateKey];
    }

    const youtube = isYoutube(el);
    const vimeo = isVimeo(el);

    const id = ++counter;
    let poller;

    return (el[stateKey] = new Promise(function (resolve) {
      youtube &&
        once(el, "load", function () {
          const listener = function () {
            return post(el, { event: "listening", id });
          };
          poller = setInterval(listener, 100);
          listener();
        });

      once(window, "message", resolve, false, function (ref) {
        let { data } = ref;

        try {
          data = JSON.parse(data);
          return (
            data &&
            ((youtube && data.id === id && data.event === "onReady") ||
              (vimeo && Number(data.player_id) === id))
          );
        } catch (e) {}
      });

      el.src =
        "" +
        el.src +
        (includes(el.src, "?") ? "&" : "?") +
        (youtube ? "enablejsapi=1" : "api=1&player_id=" + id);
    }).then(function () {
      return clearInterval(poller);
    }));
  }

  function isInView(element, offsetTop, offsetLeft) {
    if (offsetTop === void 0) offsetTop = 0;
    if (offsetLeft === void 0) offsetLeft = 0;

    if (!isVisible(element)) {
      return false;
    }

    return intersectRect.apply(
      void 0,
      scrollParents(element)
        .map(function (parent) {
          const ref = offset(getViewport(parent));
          const { top } = ref;
          const { left } = ref;
          const { bottom } = ref;
          const { right } = ref;

          return {
            top: top - offsetTop,
            left: left - offsetLeft,
            bottom: bottom + offsetTop,
            right: right + offsetLeft,
          };
        })
        .concat(offset(element))
    );
  }

  function scrollTop(element, top) {
    if (isWindow(element) || isDocument(element)) {
      element = getScrollingElement(element);
    } else {
      element = toNode(element);
    }

    element.scrollTop = top;
  }

  function scrollIntoView(element, ref) {
    if (ref === void 0) ref = {};
    let offsetBy = ref.offset;
    if (offsetBy === void 0) offsetBy = 0;

    if (!isVisible(element)) {
      return;
    }

    const parents = scrollParents(element);
    let diff = 0;
    return parents.reduce(
      function (fn, scrollElement, i) {
        const { scrollTop } = scrollElement;
        const { scrollHeight } = scrollElement;
        const maxScroll = scrollHeight - getViewportClientHeight(scrollElement);

        let top = Math.ceil(
          offset(parents[i - 1] || element).top -
            offset(getViewport(scrollElement)).top -
            offsetBy +
            diff +
            scrollTop
        );

        if (top > maxScroll) {
          diff = top - maxScroll;
          top = maxScroll;
        } else {
          diff = 0;
        }

        return function () {
          return scrollTo(scrollElement, top - scrollTop).then(fn);
        };
      },
      function () {
        return Promise.resolve();
      }
    )();

    function scrollTo(element, top) {
      return new Promise(function (resolve) {
        const scroll = element.scrollTop;
        const duration = getDuration(Math.abs(top));
        const start = Date.now();

        (function step() {
          const percent = ease(clamp((Date.now() - start) / duration));

          scrollTop(element, scroll + top * percent);

          // scroll more if we have not reached our destination
          if (percent !== 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        })();
      });
    }

    function getDuration(dist) {
      return 40 * Math.pow(dist, 0.375);
    }

    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  }

  function scrolledOver(element, heightOffset) {
    if (heightOffset === void 0) heightOffset = 0;

    if (!isVisible(element)) {
      return 0;
    }

    const ref = scrollParents(element, /auto|scroll/, true);
    const scrollElement = ref[0];
    const { scrollHeight } = scrollElement;
    const { scrollTop } = scrollElement;
    const clientHeight = getViewportClientHeight(scrollElement);
    const viewportTop =
      offsetPosition(element)[0] - scrollTop - offsetPosition(scrollElement)[0];
    const viewportDist = Math.min(clientHeight, viewportTop + scrollTop);

    const top = viewportTop - viewportDist;
    const dist = Math.min(
      element.offsetHeight + heightOffset + viewportDist,
      scrollHeight - (viewportTop + scrollTop),
      scrollHeight - clientHeight
    );

    return clamp((-1 * top) / dist);
  }

  function scrollParents(element, overflowRe, scrollable) {
    if (overflowRe === void 0) overflowRe = /auto|scroll|hidden/;
    if (scrollable === void 0) scrollable = false;

    const scrollEl = getScrollingElement(element);

    let ancestors = parents(element).reverse();
    ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);

    const fixedIndex = findIndex(ancestors, function (el) {
      return css(el, "position") === "fixed";
    });
    if (~fixedIndex) {
      ancestors = ancestors.slice(fixedIndex);
    }

    return [scrollEl]
      .concat(
        ancestors.filter(function (parent) {
          return (
            overflowRe.test(css(parent, "overflow")) &&
            (!scrollable ||
              parent.scrollHeight > getViewportClientHeight(parent))
          );
        })
      )
      .reverse();
  }

  function getViewport(scrollElement) {
    return scrollElement === getScrollingElement(scrollElement)
      ? window
      : scrollElement;
  }

  // iOS 12 returns <body> as scrollingElement
  function getViewportClientHeight(scrollElement) {
    return (scrollElement === getScrollingElement(scrollElement)
      ? document.documentElement
      : scrollElement
    ).clientHeight;
  }

  function getScrollingElement(element) {
    const ref = toWindow(element);
    const { document } = ref;
    return document.scrollingElement || document.documentElement;
  }

  const dirs$1 = {
    width: ["x", "left", "right"],
    height: ["y", "top", "bottom"],
  };

  function positionAt(
    element,
    target,
    elAttach,
    targetAttach,
    elOffset,
    targetOffset,
    flip,
    boundary
  ) {
    elAttach = getPos(elAttach);
    targetAttach = getPos(targetAttach);

    const flipped = { element: elAttach, target: targetAttach };

    if (!element || !target) {
      return flipped;
    }

    const dim = offset(element);
    const targetDim = offset(target);
    const position = targetDim;

    moveTo(position, elAttach, dim, -1);
    moveTo(position, targetAttach, targetDim, 1);

    elOffset = getOffsets(elOffset, dim.width, dim.height);
    targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

    elOffset["x"] += targetOffset["x"];
    elOffset["y"] += targetOffset["y"];

    position.left += elOffset["x"];
    position.top += elOffset["y"];

    if (flip) {
      let boundaries = scrollParents(element).map(getViewport);

      if (boundary && includes(boundaries, boundary)) {
        boundaries.unshift(boundary);
      }

      boundaries = boundaries.map(function (el) {
        return offset(el);
      });

      each(dirs$1, function (ref, prop) {
        const dir = ref[0];
        const align = ref[1];
        const alignFlip = ref[2];

        if (!(flip === true || includes(flip, dir))) {
          return;
        }

        boundaries.some(function (boundary) {
          const elemOffset =
            elAttach[dir] === align
              ? -dim[prop]
              : elAttach[dir] === alignFlip
              ? dim[prop]
              : 0;

          const targetOffset =
            targetAttach[dir] === align
              ? targetDim[prop]
              : targetAttach[dir] === alignFlip
              ? -targetDim[prop]
              : 0;

          if (
            position[align] < boundary[align] ||
            position[align] + dim[prop] > boundary[alignFlip]
          ) {
            const centerOffset = dim[prop] / 2;
            const centerTargetOffset =
              targetAttach[dir] === "center" ? -targetDim[prop] / 2 : 0;

            return (
              (elAttach[dir] === "center" &&
                (apply(centerOffset, centerTargetOffset) ||
                  apply(-centerOffset, -centerTargetOffset))) ||
              apply(elemOffset, targetOffset)
            );
          }

          function apply(elemOffset, targetOffset) {
            const newVal = toFloat(
              (
                position[align] +
                elemOffset +
                targetOffset -
                elOffset[dir] * 2
              ).toFixed(4)
            );

            if (
              newVal >= boundary[align] &&
              newVal + dim[prop] <= boundary[alignFlip]
            ) {
              position[align] = newVal;

              ["element", "target"].forEach(function (el) {
                flipped[el][dir] = !elemOffset
                  ? flipped[el][dir]
                  : flipped[el][dir] === dirs$1[prop][1]
                  ? dirs$1[prop][2]
                  : dirs$1[prop][1];
              });

              return true;
            }
          }
        });
      });
    }

    offset(element, position);

    return flipped;
  }

  function moveTo(position, attach, dim, factor) {
    each(dirs$1, function (ref, prop) {
      const dir = ref[0];
      const align = ref[1];
      const alignFlip = ref[2];

      if (attach[dir] === alignFlip) {
        position[align] += dim[prop] * factor;
      } else if (attach[dir] === "center") {
        position[align] += (dim[prop] * factor) / 2;
      }
    });
  }

  function getPos(pos) {
    const x = /left|center|right/;
    const y = /top|center|bottom/;

    pos = (pos || "").split(" ");

    if (pos.length === 1) {
      pos = x.test(pos[0])
        ? pos.concat("center")
        : y.test(pos[0])
        ? ["center"].concat(pos)
        : ["center", "center"];
    }

    return {
      x: x.test(pos[0]) ? pos[0] : "center",
      y: y.test(pos[1]) ? pos[1] : "center",
    };
  }

  function getOffsets(offsets, width, height) {
    const ref = (offsets || "").split(" ");
    const x = ref[0];
    const y = ref[1];

    return {
      x: x ? toFloat(x) * (endsWith(x, "%") ? width / 100 : 1) : 0,
      y: y ? toFloat(y) * (endsWith(y, "%") ? height / 100 : 1) : 0,
    };
  }

  const util = /* #__PURE__*/ Object.freeze({
    __proto__: null,
    ajax,
    getImage,
    transition,
    Transition,
    animate,
    Animation,
    attr,
    hasAttr,
    removeAttr,
    data,
    addClass,
    removeClass,
    removeClasses,
    replaceClass,
    hasClass,
    toggleClass,
    dimensions,
    offset,
    position,
    offsetPosition,
    height,
    width,
    boxModelAdjust,
    flipPosition,
    toPx,
    ready,
    empty,
    html,
    prepend,
    append,
    before,
    after,
    remove,
    wrapAll,
    wrapInner,
    unwrap,
    fragment,
    apply,
    $,
    $$,
    inBrowser,
    isIE,
    isRtl,
    hasTouch,
    pointerDown,
    pointerMove,
    pointerUp,
    pointerEnter,
    pointerLeave,
    pointerCancel,
    on,
    off,
    once,
    trigger,
    createEvent,
    toEventTargets,
    isTouch,
    getEventPos,
    fastdom,
    isVoidElement,
    isVisible,
    selInput,
    isInput,
    parent,
    filter,
    matches,
    closest,
    within,
    parents,
    children,
    index,
    hasOwn,
    hyphenate,
    camelize,
    ucfirst,
    startsWith,
    endsWith,
    includes,
    findIndex,
    isArray,
    isFunction,
    isObject,
    isPlainObject,
    isWindow,
    isDocument,
    isNode,
    isElement,
    isBoolean,
    isString,
    isNumber,
    isNumeric,
    isEmpty,
    isUndefined,
    toBoolean,
    toNumber,
    toFloat,
    toArray,
    toNode,
    toNodes,
    toWindow,
    toMs,
    isEqual,
    swap,
    assign,
    last,
    each,
    sortBy,
    uniqueBy,
    clamp,
    noop,
    intersectRect,
    pointInRect,
    Dimensions,
    getIndex,
    memoize,
    MouseTracker,
    mergeOptions,
    parseOptions,
    play,
    pause,
    mute,
    positionAt,
    Promise,
    Deferred,
    query,
    queryAll,
    find,
    findAll,
    escape,
    css,
    getCssVar,
    propName,
    isInView,
    scrollTop,
    scrollIntoView,
    scrolledOver,
    scrollParents,
    getViewport,
    getViewportClientHeight,
  });

  function globalAPI(UIkit) {
    const DATA = UIkit.data;

    UIkit.use = function (plugin) {
      if (plugin.installed) {
        return;
      }

      plugin.call(null, this);
      plugin.installed = true;

      return this;
    };

    UIkit.mixin = function (mixin, component) {
      component =
        (isString(component) ? UIkit.component(component) : component) || this;
      component.options = mergeOptions(component.options, mixin);
    };

    UIkit.extend = function (options) {
      options = options || {};

      const Super = this;
      const Sub = function UIkitComponent(options) {
        this._init(options);
      };

      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.options = mergeOptions(Super.options, options);

      Sub.super = Super;
      Sub.extend = Super.extend;

      return Sub;
    };

    UIkit.update = function (element, e) {
      element = element ? toNode(element) : document.body;

      parents(element)
        .reverse()
        .forEach(function (element) {
          return update(element[DATA], e);
        });
      apply(element, function (element) {
        return update(element[DATA], e);
      });
    };

    let container;
    Object.defineProperty(UIkit, "container", {
      get() {
        return container || document.body;
      },

      set(element) {
        container = $(element);
      },
    });

    function update(data, e) {
      if (!data) {
        return;
      }

      for (const name in data) {
        if (data[name]._connected) {
          data[name]._callUpdate(e);
        }
      }
    }
  }

  function hooksAPI(UIkit) {
    UIkit.prototype._callHook = function (hook) {
      const this$1 = this;

      const handlers = this.$options[hook];

      if (handlers) {
        handlers.forEach(function (handler) {
          return handler.call(this$1);
        });
      }
    };

    UIkit.prototype._callConnected = function () {
      if (this._connected) {
        return;
      }

      this._data = {};
      this._computeds = {};

      this._initProps();

      this._callHook("beforeConnect");
      this._connected = true;

      this._initEvents();
      this._initObservers();

      this._callHook("connected");
      this._callUpdate();
    };

    UIkit.prototype._callDisconnected = function () {
      if (!this._connected) {
        return;
      }

      this._callHook("beforeDisconnect");
      this._disconnectObservers();
      this._unbindEvents();
      this._callHook("disconnected");

      this._connected = false;
      delete this._watch;
    };

    UIkit.prototype._callUpdate = function (e) {
      const this$1 = this;
      if (e === void 0) e = "update";

      if (!this._connected) {
        return;
      }

      if (e === "update" || e === "resize") {
        this._callWatches();
      }

      if (!this.$options.update) {
        return;
      }

      if (!this._updates) {
        this._updates = new Set();
        fastdom.read(function () {
          runUpdates.call(this$1, this$1._updates);
          delete this$1._updates;
        });
      }

      this._updates.add(e.type || e);
    };

    UIkit.prototype._callWatches = function () {
      const this$1 = this;

      if (this._watch) {
        return;
      }

      const initital = !hasOwn(this, "_watch");

      this._watch = fastdom.read(function () {
        const ref = this$1;
        const { computed } = ref.$options;
        const { _computeds } = ref;

        for (const key in computed) {
          const hasPrev = hasOwn(_computeds, key);
          const prev = _computeds[key];

          delete _computeds[key];

          const ref$1 = computed[key];
          const { watch } = ref$1;
          const { immediate } = ref$1;
          if (
            watch &&
            ((initital && immediate) ||
              (hasPrev && !isEqual(prev, this$1[key])))
          ) {
            watch.call(this$1, this$1[key], prev);
          }
        }

        this$1._watch = null;
      });
    };

    function runUpdates(types) {
      const this$1 = this;

      const updates = this.$options.update;

      const loop = function (i) {
        const ref = updates[i];
        const { read } = ref;
        const { write } = ref;
        const { events } = ref;

        if (
          !types.has("update") &&
          (!events ||
            !events.some(function (type) {
              return types.has(type);
            }))
        ) {
          return;
        }

        let result = void 0;
        if (read) {
          result = read.call(this$1, this$1._data, types);

          if (result && isPlainObject(result)) {
            assign(this$1._data, result);
          }
        }

        if (write && result !== false) {
          fastdom.write(function () {
            return write.call(this$1, this$1._data, types);
          });
        }
      };

      for (let i = 0; i < updates.length; i++) loop(i);
    }
  }

  function stateAPI(UIkit) {
    let uid = 0;

    UIkit.prototype._init = function (options) {
      options = options || {};
      options.data = normalizeData(options, this.constructor.options);

      this.$options = mergeOptions(this.constructor.options, options, this);
      this.$el = null;
      this.$props = {};

      this._uid = uid++;
      this._initData();
      this._initMethods();
      this._initComputeds();
      this._callHook("created");

      if (options.el) {
        this.$mount(options.el);
      }
    };

    UIkit.prototype._initData = function () {
      const ref = this.$options;
      let { data } = ref;
      if (data === void 0) data = {};

      for (const key in data) {
        this.$props[key] = this[key] = data[key];
      }
    };

    UIkit.prototype._initMethods = function () {
      const ref = this.$options;
      const { methods } = ref;

      if (methods) {
        for (const key in methods) {
          this[key] = methods[key].bind(this);
        }
      }
    };

    UIkit.prototype._initComputeds = function () {
      const ref = this.$options;
      const { computed } = ref;

      this._computeds = {};

      if (computed) {
        for (const key in computed) {
          registerComputed(this, key, computed[key]);
        }
      }
    };

    UIkit.prototype._initProps = function (props) {
      let key;

      props = props || getProps(this.$options, this.$name);

      for (key in props) {
        if (!isUndefined(props[key])) {
          this.$props[key] = props[key];
        }
      }

      const exclude = [this.$options.computed, this.$options.methods];
      for (key in this.$props) {
        if (key in props && notIn(exclude, key)) {
          this[key] = this.$props[key];
        }
      }
    };

    UIkit.prototype._initEvents = function () {
      const this$1 = this;

      this._events = [];

      const ref = this.$options;
      const { events } = ref;

      if (events) {
        events.forEach(function (event) {
          if (!hasOwn(event, "handler")) {
            for (const key in event) {
              registerEvent(this$1, event[key], key);
            }
          } else {
            registerEvent(this$1, event);
          }
        });
      }
    };

    UIkit.prototype._unbindEvents = function () {
      this._events.forEach(function (unbind) {
        return unbind();
      });
      delete this._events;
    };

    UIkit.prototype._initObservers = function () {
      this._observers = [initChildListObserver(this), initPropsObserver(this)];
    };

    UIkit.prototype._disconnectObservers = function () {
      this._observers.forEach(function (observer) {
        return observer && observer.disconnect();
      });
    };

    function getProps(opts, name) {
      const data$1 = {};
      let { args } = opts;
      if (args === void 0) args = [];
      let { props } = opts;
      if (props === void 0) props = {};
      const { el } = opts;

      if (!props) {
        return data$1;
      }

      for (const key in props) {
        const prop = hyphenate(key);
        let value = data(el, prop);

        if (isUndefined(value)) {
          continue;
        }

        value =
          props[key] === Boolean && value === ""
            ? true
            : coerce(props[key], value);

        if (prop === "target" && (!value || startsWith(value, "_"))) {
          continue;
        }

        data$1[key] = value;
      }

      const options = parseOptions(data(el, name), args);

      for (const key$1 in options) {
        const prop$1 = camelize(key$1);
        if (props[prop$1] !== undefined) {
          data$1[prop$1] = coerce(props[prop$1], options[key$1]);
        }
      }

      return data$1;
    }

    function registerComputed(component, key, cb) {
      Object.defineProperty(component, key, {
        enumerable: true,

        get() {
          const { _computeds } = component;
          const { $props } = component;
          const { $el } = component;

          if (!hasOwn(_computeds, key)) {
            _computeds[key] = (cb.get || cb).call(component, $props, $el);
          }

          return _computeds[key];
        },

        set(value) {
          const { _computeds } = component;

          _computeds[key] = cb.set ? cb.set.call(component, value) : value;

          if (isUndefined(_computeds[key])) {
            delete _computeds[key];
          }
        },
      });
    }

    function registerEvent(component, event, key) {
      if (!isPlainObject(event)) {
        event = { name: key, handler: event };
      }

      const { name } = event;
      let { el } = event;
      const { handler } = event;
      const { capture } = event;
      const { passive } = event;
      const { delegate } = event;
      const { filter } = event;
      const { self } = event;
      el = isFunction(el) ? el.call(component) : el || component.$el;

      if (isArray(el)) {
        el.forEach(function (el) {
          return registerEvent(component, assign({}, event, { el }), key);
        });
        return;
      }

      if (!el || (filter && !filter.call(component))) {
        return;
      }

      component._events.push(
        on(
          el,
          name,
          !delegate
            ? null
            : isString(delegate)
            ? delegate
            : delegate.call(component),
          isString(handler) ? component[handler] : handler.bind(component),
          { passive, capture, self }
        )
      );
    }

    function notIn(options, key) {
      return options.every(function (arr) {
        return !arr || !hasOwn(arr, key);
      });
    }

    function coerce(type, value) {
      if (type === Boolean) {
        return toBoolean(value);
      } else if (type === Number) {
        return toNumber(value);
      } else if (type === "list") {
        return toList(value);
      }

      return type ? type(value) : value;
    }

    function toList(value) {
      return isArray(value)
        ? value
        : isString(value)
        ? value.split(/,(?![^(]*\))/).map(function (value) {
            return isNumeric(value) ? toNumber(value) : toBoolean(value.trim());
          })
        : [value];
    }

    function normalizeData(ref, ref$1) {
      let { data } = ref;
      const { args } = ref$1;
      let { props } = ref$1;
      if (props === void 0) props = {};

      data = isArray(data)
        ? !isEmpty(args)
          ? data.slice(0, args.length).reduce(function (data, value, index) {
              if (isPlainObject(value)) {
                assign(data, value);
              } else {
                data[args[index]] = value;
              }
              return data;
            }, {})
          : undefined
        : data;

      if (data) {
        for (const key in data) {
          if (isUndefined(data[key])) {
            delete data[key];
          } else {
            data[key] = props[key] ? coerce(props[key], data[key]) : data[key];
          }
        }
      }

      return data;
    }

    function initChildListObserver(component) {
      const ref = component.$options;
      const { el } = ref;

      const observer = new MutationObserver(function () {
        return component.$emit();
      });
      observer.observe(el, {
        childList: true,
        subtree: true,
      });

      return observer;
    }

    function initPropsObserver(component) {
      const { $name } = component;
      const { $options } = component;
      const { $props } = component;
      const { attrs } = $options;
      const { props } = $options;
      const { el } = $options;

      if (!props || attrs === false) {
        return;
      }

      const attributes = isArray(attrs) ? attrs : Object.keys(props);
      const filter = attributes
        .map(function (key) {
          return hyphenate(key);
        })
        .concat($name);

      const observer = new MutationObserver(function (records) {
        const data = getProps($options, $name);
        if (
          records.some(function (ref) {
            const { attributeName } = ref;

            const prop = attributeName.replace("data-", "");
            return (prop === $name
              ? attributes
              : [camelize(prop), camelize(attributeName)]
            ).some(function (prop) {
              return !isUndefined(data[prop]) && data[prop] !== $props[prop];
            });
          })
        ) {
          component.$reset();
        }
      });

      observer.observe(el, {
        attributes: true,
        attributeFilter: filter.concat(
          filter.map(function (key) {
            return "data-" + key;
          })
        ),
      });

      return observer;
    }
  }

  function instanceAPI(UIkit) {
    const DATA = UIkit.data;

    UIkit.prototype.$create = function (component, element, data) {
      return UIkit[component](element, data);
    };

    UIkit.prototype.$mount = function (el) {
      const ref = this.$options;
      const { name } = ref;

      if (!el[DATA]) {
        el[DATA] = {};
      }

      if (el[DATA][name]) {
        return;
      }

      el[DATA][name] = this;

      this.$el = this.$options.el = this.$options.el || el;

      if (within(el, document)) {
        this._callConnected();
      }
    };

    UIkit.prototype.$reset = function () {
      this._callDisconnected();
      this._callConnected();
    };

    UIkit.prototype.$destroy = function (removeEl) {
      if (removeEl === void 0) removeEl = false;

      const ref = this.$options;
      const { el } = ref;
      const { name } = ref;

      if (el) {
        this._callDisconnected();
      }

      this._callHook("destroy");

      if (!el || !el[DATA]) {
        return;
      }

      delete el[DATA][name];

      if (!isEmpty(el[DATA])) {
        delete el[DATA];
      }

      if (removeEl) {
        remove(this.$el);
      }
    };

    UIkit.prototype.$emit = function (e) {
      this._callUpdate(e);
    };

    UIkit.prototype.$update = function (element, e) {
      if (element === void 0) element = this.$el;

      UIkit.update(element, e);
    };

    UIkit.prototype.$getComponent = UIkit.getComponent;

    const componentName = memoize(function (name) {
      return UIkit.prefix + hyphenate(name);
    });
    Object.defineProperties(UIkit.prototype, {
      $container: Object.getOwnPropertyDescriptor(UIkit, "container"),

      $name: {
        get() {
          return componentName(this.$options.name);
        },
      },
    });
  }

  function componentAPI(UIkit) {
    const DATA = UIkit.data;

    const components = {};

    UIkit.component = function (name, options) {
      const id = hyphenate(name);

      name = camelize(id);

      if (!options) {
        if (isPlainObject(components[name])) {
          components[name] = UIkit.extend(components[name]);
        }

        return components[name];
      }

      UIkit[name] = function (element, data) {
        let i = arguments.length,
          argsArray = Array(i);
        while (i--) argsArray[i] = arguments[i];

        const component = UIkit.component(name);

        return component.options.functional
          ? new component({
              data: isPlainObject(element) ? element : [].concat(argsArray),
            })
          : !element
          ? init(element)
          : $$(element).map(init)[0];

        function init(element) {
          const instance = UIkit.getComponent(element, name);

          if (instance) {
            if (!data) {
              return instance;
            } else {
              instance.$destroy();
            }
          }

          return new component({ el: element, data });
        }
      };

      const opt = isPlainObject(options)
        ? assign({}, options)
        : options.options;

      opt.name = name;

      if (opt.install) {
        opt.install(UIkit, opt, name);
      }

      if (UIkit._initialized && !opt.functional) {
        fastdom.read(function () {
          return UIkit[name]("[mod-" + id + "],[data-mod-" + id + "]");
        });
      }

      return (components[name] = isPlainObject(options) ? opt : options);
    };

    UIkit.getComponents = function (element) {
      return (element && element[DATA]) || {};
    };
    UIkit.getComponent = function (element, name) {
      return UIkit.getComponents(element)[name];
    };

    UIkit.connect = function (node) {
      if (node[DATA]) {
        for (const name in node[DATA]) {
          node[DATA][name]._callConnected();
        }
      }

      for (let i = 0; i < node.attributes.length; i++) {
        const name$1 = getComponentName(node.attributes[i].name);

        if (name$1 && name$1 in components) {
          UIkit[name$1](node);
        }
      }
    };

    UIkit.disconnect = function (node) {
      for (const name in node[DATA]) {
        node[DATA][name]._callDisconnected();
      }
    };
  }

  var getComponentName = memoize(function (attribute) {
    return startsWith(attribute, "mod-") || startsWith(attribute, "data-mod-")
      ? camelize(attribute.replace("data-mod-", "").replace("mod-", ""))
      : false;
  });

  const UIkit = function (options) {
    this._init(options);
  };

  UIkit.util = util;
  UIkit.data = "__uikit__";
  UIkit.prefix = "mod-";
  UIkit.options = {};
  UIkit.version = "3.6.19";

  globalAPI(UIkit);
  hooksAPI(UIkit);
  stateAPI(UIkit);
  componentAPI(UIkit);
  instanceAPI(UIkit);

  function boot(UIkit) {
    const { connect } = UIkit;
    const { disconnect } = UIkit;

    if (!inBrowser || !window.MutationObserver) {
      return;
    }

    fastdom.read(function () {
      if (document.body) {
        apply(document.body, connect);
      }

      new MutationObserver(function (records) {
        return records.forEach(applyChildListMutation);
      }).observe(document, {
        childList: true,
        subtree: true,
      });

      new MutationObserver(function (records) {
        return records.forEach(applyAttributeMutation);
      }).observe(document, {
        attributes: true,
        subtree: true,
      });

      UIkit._initialized = true;
    });

    function applyChildListMutation(ref) {
      const { addedNodes } = ref;
      const { removedNodes } = ref;

      for (let i = 0; i < addedNodes.length; i++) {
        apply(addedNodes[i], connect);
      }

      for (let i$1 = 0; i$1 < removedNodes.length; i$1++) {
        apply(removedNodes[i$1], disconnect);
      }
    }

    function applyAttributeMutation(ref) {
      const { target } = ref;
      const { attributeName } = ref;

      const name = getComponentName(attributeName);

      if (!name || !(name in UIkit)) {
        return;
      }

      if (hasAttr(target, attributeName)) {
        UIkit[name](target);
        return;
      }

      const component = UIkit.getComponent(target, name);

      if (component) {
        component.$destroy();
      }
    }
  }

  const Class = {
    connected() {
      !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
    },
  };

  const Togglable = {
    props: {
      cls: Boolean,
      animation: "list",
      duration: Number,
      origin: String,
      transition: String,
    },

    data: {
      cls: false,
      animation: [false],
      duration: 200,
      origin: false,
      transition: "linear",
      clsEnter: "mod-togglabe-enter",
      clsLeave: "mod-togglabe-leave",

      initProps: {
        overflow: "",
        height: "",
        paddingTop: "",
        paddingBottom: "",
        marginTop: "",
        marginBottom: "",
      },

      hideProps: {
        overflow: "hidden",
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
      },
    },

    computed: {
      hasAnimation(ref) {
        const { animation } = ref;

        return !!animation[0];
      },

      hasTransition(ref) {
        const { animation } = ref;

        return this.hasAnimation && animation[0] === true;
      },
    },

    methods: {
      toggleElement(targets, toggle, animate) {
        const this$1 = this;

        return new Promise(function (resolve) {
          return Promise.all(
            toNodes(targets).map(function (el) {
              const show = isBoolean(toggle) ? toggle : !this$1.isToggled(el);

              if (!trigger(el, "before" + (show ? "show" : "hide"), [this$1])) {
                return Promise.reject();
              }

              const promise = (isFunction(animate)
                ? animate
                : animate === false || !this$1.hasAnimation
                ? this$1._toggle
                : this$1.hasTransition
                ? toggleHeight(this$1)
                : toggleAnimation(this$1))(el, show);

              const cls = show ? this$1.clsEnter : this$1.clsLeave;

              addClass(el, cls);

              trigger(el, show ? "show" : "hide", [this$1]);

              const done = function () {
                removeClass(el, cls);
                trigger(el, show ? "shown" : "hidden", [this$1]);
                this$1.$update(el);
              };

              return promise
                ? promise.then(done, function () {
                    removeClass(el, cls);
                    return Promise.reject();
                  })
                : done();
            })
          ).then(resolve, noop);
        });
      },

      isToggled(el) {
        if (el === void 0) el = this.$el;

        return hasClass(el, this.clsEnter)
          ? true
          : hasClass(el, this.clsLeave)
          ? false
          : this.cls
          ? hasClass(el, this.cls.split(" ")[0])
          : !hasAttr(el, "hidden");
      },

      _toggle(el, toggled) {
        if (!el) {
          return;
        }

        toggled = Boolean(toggled);

        let changed;
        if (this.cls) {
          changed =
            includes(this.cls, " ") || toggled !== hasClass(el, this.cls);
          changed &&
            toggleClass(
              el,
              this.cls,
              includes(this.cls, " ") ? undefined : toggled
            );
        } else {
          changed = toggled === el.hidden;
          changed && (el.hidden = !toggled);
        }

        $$("[autofocus]", el).some(function (el) {
          return isVisible(el) ? el.focus() || true : el.blur();
        });

        if (changed) {
          trigger(el, "toggled", [toggled, this]);
          this.$update(el);
        }
      },
    },
  };

  function toggleHeight(ref) {
    const { isToggled } = ref;
    const { duration } = ref;
    const { initProps } = ref;
    const { hideProps } = ref;
    const { transition } = ref;
    const { _toggle } = ref;

    return function (el, show) {
      const inProgress = Transition.inProgress(el);
      const inner = el.hasChildNodes
        ? toFloat(css(el.firstElementChild, "marginTop")) +
          toFloat(css(el.lastElementChild, "marginBottom"))
        : 0;
      const currentHeight = isVisible(el)
        ? height(el) + (inProgress ? 0 : inner)
        : 0;

      Transition.cancel(el);

      if (!isToggled(el)) {
        _toggle(el, true);
      }

      height(el, "");

      // Update child components first
      fastdom.flush();

      const endHeight = height(el) + (inProgress ? 0 : inner);
      height(el, currentHeight);

      return (show
        ? Transition.start(
            el,
            assign({}, initProps, { overflow: "hidden", height: endHeight }),
            Math.round(duration * (1 - currentHeight / endHeight)),
            transition
          )
        : Transition.start(
            el,
            hideProps,
            Math.round(duration * (currentHeight / endHeight)),
            transition
          ).then(function () {
            return _toggle(el, false);
          })
      ).then(function () {
        return css(el, initProps);
      });
    };
  }

  function toggleAnimation(cmp) {
    return function (el, show) {
      Animation.cancel(el);

      const { animation } = cmp;
      const { duration } = cmp;
      const { _toggle } = cmp;

      if (show) {
        _toggle(el, true);
        return Animation.in(el, animation[0], duration, cmp.origin);
      }

      return Animation.out(
        el,
        animation[1] || animation[0],
        duration,
        cmp.origin
      ).then(function () {
        return _toggle(el, false);
      });
    };
  }

  const accordion = {
    mixins: [Class, Togglable],

    props: {
      targets: String,
      active: null,
      collapsible: Boolean,
      multiple: Boolean,
      toggle: String,
      content: String,
      transition: String,
      offset: Number,
    },

    data: {
      targets: "> *",
      active: false,
      animation: [true],
      collapsible: true,
      multiple: false,
      clsOpen: "mod-open",
      toggle: "> .mod-accordion-title",
      content: "> .mod-accordion-content",
      transition: "ease",
      offset: 0,
    },

    computed: {
      items: {
        get(ref, $el) {
          const { targets } = ref;

          return $$(targets, $el);
        },

        watch(items, prev) {
          const this$1 = this;

          items.forEach(function (el) {
            return hide($(this$1.content, el), !hasClass(el, this$1.clsOpen));
          });

          if (prev || hasClass(items, this.clsOpen)) {
            return;
          }

          const active =
            (this.active !== false && items[Number(this.active)]) ||
            (!this.collapsible && items[0]);

          if (active) {
            this.toggle(active, false);
          }
        },

        immediate: true,
      },

      toggles(ref) {
        const { toggle } = ref;

        return this.items.map(function (item) {
          return $(toggle, item);
        });
      },
    },

    events: [
      {
        name: "click",

        delegate() {
          return this.targets + " " + this.$props.toggle;
        },

        handler(e) {
          e.preventDefault();
          this.toggle(index(this.toggles, e.current));
        },
      },
    ],

    methods: {
      toggle(item, animate) {
        const this$1 = this;

        let items = [this.items[getIndex(item, this.items)]];
        const activeItems = filter(this.items, "." + this.clsOpen);

        if (!this.multiple && !includes(activeItems, items[0])) {
          items = items.concat(activeItems);
        }

        if (
          !this.collapsible &&
          activeItems.length < 2 &&
          !filter(items, ":not(." + this.clsOpen + ")").length
        ) {
          return;
        }

        items.forEach(function (el) {
          return this$1.toggleElement(
            el,
            !hasClass(el, this$1.clsOpen),
            function (el, show) {
              toggleClass(el, this$1.clsOpen, show);
              attr($(this$1.$props.toggle, el), "aria-expanded", show);

              const content = $(
                "" + (el._wrapper ? "> * " : "") + this$1.content,
                el
              );

              if (animate === false || !this$1.hasTransition) {
                hide(content, !show);
                return;
              }

              if (!el._wrapper) {
                el._wrapper = wrapAll(
                  content,
                  "<div" + (show ? " hidden" : "") + ">"
                );
              }

              hide(content, false);
              return toggleHeight(this$1)(el._wrapper, show).then(function () {
                hide(content, !show);
                delete el._wrapper;
                unwrap(content);

                if (show) {
                  const toggle = $(this$1.$props.toggle, el);
                  if (!isInView(toggle)) {
                    scrollIntoView(toggle, { offset: this$1.offset });
                  }
                }
              });
            }
          );
        });
      },
    },
  };

  function hide(el, hide) {
    el && (el.hidden = hide);
  }

  const alert = {
    mixins: [Class, Togglable],

    args: "animation",

    props: {
      close: String,
    },

    data: {
      animation: [true],
      selClose: ".mod-alert-close",
      duration: 150,
      hideProps: assign({ opacity: 0 }, Togglable.data.hideProps),
    },

    events: [
      {
        name: "click",

        delegate() {
          return this.selClose;
        },

        handler(e) {
          e.preventDefault();
          this.close();
        },
      },
    ],

    methods: {
      close() {
        const this$1 = this;

        this.toggleElement(this.$el).then(function () {
          return this$1.$destroy(true);
        });
      },
    },
  };

  const Video = {
    args: "autoplay",

    props: {
      automute: Boolean,
      autoplay: Boolean,
    },

    data: {
      automute: false,
      autoplay: true,
    },

    computed: {
      inView(ref) {
        const { autoplay } = ref;

        return autoplay === "inview";
      },
    },

    connected() {
      if (this.inView && !hasAttr(this.$el, "preload")) {
        this.$el.preload = "none";
      }

      if (this.automute) {
        mute(this.$el);
      }
    },

    update: {
      read() {
        return {
          visible:
            isVisible(this.$el) && css(this.$el, "visibility") !== "hidden",
          inView: this.inView && isInView(this.$el),
        };
      },

      write(ref) {
        const { visible } = ref;
        const { inView } = ref;

        if (!visible || (this.inView && !inView)) {
          pause(this.$el);
        } else if (this.autoplay === true || (this.inView && inView)) {
          play(this.$el);
        }
      },

      events: ["resize", "scroll"],
    },
  };

  const cover = {
    mixins: [Class, Video],

    props: {
      width: Number,
      height: Number,
    },

    data: {
      automute: true,
    },

    update: {
      read() {
        const el = this.$el;
        const ref = getPositionedParent(el) || parent(el);
        const height = ref.offsetHeight;
        const width = ref.offsetWidth;
        const dim = Dimensions.cover(
          {
            width:
              this.width || el.naturalWidth || el.videoWidth || el.clientWidth,
            height:
              this.height ||
              el.naturalHeight ||
              el.videoHeight ||
              el.clientHeight,
          },
          {
            width: width + (width % 2 ? 1 : 0),
            height: height + (height % 2 ? 1 : 0),
          }
        );

        if (!dim.width || !dim.height) {
          return false;
        }

        return dim;
      },

      write(ref) {
        const { height } = ref;
        const { width } = ref;

        css(this.$el, { height, width });
      },

      events: ["resize"],
    },
  };

  function getPositionedParent(el) {
    while ((el = parent(el))) {
      if (css(el, "position") !== "static") {
        return el;
      }
    }
  }

  const Position = {
    props: {
      pos: String,
      offset: null,
      flip: Boolean,
      clsPos: String,
    },

    data: {
      pos: "bottom-" + (!isRtl ? "left" : "right"),
      flip: true,
      offset: false,
      clsPos: "",
    },

    computed: {
      pos(ref) {
        const { pos } = ref;

        return (pos + (!includes(pos, "-") ? "-center" : "")).split("-");
      },

      dir() {
        return this.pos[0];
      },

      align() {
        return this.pos[1];
      },
    },

    methods: {
      positionAt(element, target, boundary) {
        removeClasses(
          element,
          this.clsPos + "-(top|bottom|left|right)(-[a-z]+)?"
        );

        const ref = this;
        let offset$1 = ref.offset;
        const axis = this.getAxis();

        if (!isNumeric(offset$1)) {
          const node = $(offset$1);
          offset$1 = node
            ? offset(node)[axis === "x" ? "left" : "top"] -
              offset(target)[axis === "x" ? "right" : "bottom"]
            : 0;
        }

        const ref$1 = positionAt(
          element,
          target,
          axis === "x"
            ? flipPosition(this.dir) + " " + this.align
            : this.align + " " + flipPosition(this.dir),
          axis === "x"
            ? this.dir + " " + this.align
            : this.align + " " + this.dir,
          axis === "x"
            ? "" + (this.dir === "left" ? -offset$1 : offset$1)
            : " " + (this.dir === "top" ? -offset$1 : offset$1),
          null,
          this.flip,
          boundary
        ).target;
        const { x } = ref$1;
        const { y } = ref$1;

        this.dir = axis === "x" ? x : y;
        this.align = axis === "x" ? y : x;

        toggleClass(
          element,
          this.clsPos + "-" + this.dir + "-" + this.align,
          this.offset === false
        );
      },

      getAxis() {
        return this.dir === "top" || this.dir === "bottom" ? "y" : "x";
      },
    },
  };

  let active;

  const drop = {
    mixins: [Position, Togglable],

    args: "pos",

    props: {
      mode: "list",
      toggle: Boolean,
      boundary: Boolean,
      boundaryAlign: Boolean,
      delayShow: Number,
      delayHide: Number,
      clsDrop: String,
    },

    data: {
      mode: ["click", "hover"],
      toggle: "- *",
      boundary: true,
      boundaryAlign: false,
      delayShow: 0,
      delayHide: 800,
      clsDrop: false,
      animation: ["mod-animation-fade"],
      cls: "mod-open",
    },

    computed: {
      boundary(ref, $el) {
        const { boundary } = ref;

        return boundary === true ? window : query(boundary, $el);
      },

      clsDrop(ref) {
        const { clsDrop } = ref;

        return clsDrop || "mod-" + this.$options.name;
      },

      clsPos() {
        return this.clsDrop;
      },
    },

    created() {
      this.tracker = new MouseTracker();
    },

    connected() {
      addClass(this.$el, this.clsDrop);

      const ref = this.$props;
      const { toggle } = ref;
      this.toggle =
        toggle &&
        this.$create("toggle", query(toggle, this.$el), {
          target: this.$el,
          mode: this.mode,
        });
    },

    disconnected() {
      if (this.isActive()) {
        active = null;
      }
    },

    events: [
      {
        name: "click",

        delegate() {
          return "." + this.clsDrop + "-close";
        },

        handler(e) {
          e.preventDefault();
          this.hide(false);
        },
      },

      {
        name: "click",

        delegate() {
          return 'a[href^="#"]';
        },

        handler(ref) {
          const { defaultPrevented } = ref;
          const { hash } = ref.current;

          if (!defaultPrevented && hash && !within(hash, this.$el)) {
            this.hide(false);
          }
        },
      },

      {
        name: "beforescroll",

        handler() {
          this.hide(false);
        },
      },

      {
        name: "toggle",

        self: true,

        handler(e, toggle) {
          e.preventDefault();

          if (this.isToggled()) {
            this.hide(false);
          } else {
            this.show(toggle, false);
          }
        },
      },

      {
        name: "toggleshow",

        self: true,

        handler(e, toggle) {
          e.preventDefault();
          this.show(toggle);
        },
      },

      {
        name: "togglehide",

        self: true,

        handler(e) {
          e.preventDefault();
          this.hide();
        },
      },

      {
        name: pointerEnter,

        filter() {
          return includes(this.mode, "hover");
        },

        handler(e) {
          if (!isTouch(e)) {
            this.clearTimers();
          }
        },
      },

      {
        name: pointerLeave,

        filter() {
          return includes(this.mode, "hover");
        },

        handler(e) {
          if (!isTouch(e) && e.relatedTarget) {
            this.hide();
          }
        },
      },

      {
        name: "toggled",

        self: true,

        handler(e, toggled) {
          if (!toggled) {
            return;
          }

          this.clearTimers();
          this.position();
        },
      },

      {
        name: "show",

        self: true,

        handler() {
          const this$1 = this;

          active = this;

          this.tracker.init();

          once(
            this.$el,
            "hide",
            on(document, pointerDown, function (ref) {
              const { target } = ref;

              return (
                !within(target, this$1.$el) &&
                once(
                  document,
                  pointerUp + " " + pointerCancel + " scroll",
                  function (ref) {
                    const { defaultPrevented } = ref;
                    const { type } = ref;
                    const newTarget = ref.target;

                    if (
                      !defaultPrevented &&
                      type === pointerUp &&
                      target === newTarget &&
                      !(this$1.toggle && within(target, this$1.toggle.$el))
                    ) {
                      this$1.hide(false);
                    }
                  },
                  true
                )
              );
            }),
            { self: true }
          );

          once(
            this.$el,
            "hide",
            on(document, "keydown", function (e) {
              if (e.keyCode === 27) {
                this$1.hide(false);
              }
            }),
            { self: true }
          );
        },
      },

      {
        name: "beforehide",

        self: true,

        handler() {
          this.clearTimers();
        },
      },

      {
        name: "hide",

        handler(ref) {
          const { target } = ref;

          if (this.$el !== target) {
            active =
              active === null && within(target, this.$el) && this.isToggled()
                ? this
                : active;
            return;
          }

          active = this.isActive() ? null : active;
          this.tracker.cancel();
        },
      },
    ],

    update: {
      write() {
        if (this.isToggled() && !hasClass(this.$el, this.clsEnter)) {
          this.position();
        }
      },

      events: ["resize"],
    },

    methods: {
      show(toggle, delay) {
        const this$1 = this;
        if (toggle === void 0) toggle = this.toggle;
        if (delay === void 0) delay = true;

        if (
          this.isToggled() &&
          toggle &&
          this.toggle &&
          toggle.$el !== this.toggle.$el
        ) {
          this.hide(false);
        }

        this.toggle = toggle;

        this.clearTimers();

        if (this.isActive()) {
          return;
        }

        if (active) {
          if (delay && active.isDelaying) {
            this.showTimer = setTimeout(this.show, 10);
            return;
          }

          let prev;
          while (active && prev !== active && !within(this.$el, active.$el)) {
            prev = active;
            active.hide(false);
          }
        }

        this.showTimer = setTimeout(function () {
          return !this$1.isToggled() && this$1.toggleElement(this$1.$el, true);
        }, (delay && this.delayShow) || 0);
      },

      hide(delay) {
        const this$1 = this;
        if (delay === void 0) delay = true;

        const hide = function () {
          return this$1.toggleElement(this$1.$el, false, false);
        };

        this.clearTimers();

        this.isDelaying = getPositionedElements(this.$el).some(function (el) {
          return this$1.tracker.movesTo(el);
        });

        if (delay && this.isDelaying) {
          this.hideTimer = setTimeout(this.hide, 50);
        } else if (delay && this.delayHide) {
          this.hideTimer = setTimeout(hide, this.delayHide);
        } else {
          hide();
        }
      },

      clearTimers() {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        this.showTimer = null;
        this.hideTimer = null;
        this.isDelaying = false;
      },

      isActive() {
        return active === this;
      },

      position() {
        removeClass(this.$el, this.clsDrop + "-stack");
        toggleClass(this.$el, this.clsDrop + "-boundary", this.boundaryAlign);

        const boundary = offset(this.boundary);
        const alignTo = this.boundaryAlign ? boundary : offset(this.toggle.$el);

        if (this.align === "justify") {
          const prop = this.getAxis() === "y" ? "width" : "height";
          css(this.$el, prop, alignTo[prop]);
        } else if (
          this.boundary &&
          this.$el.offsetWidth >
            Math.max(
              boundary.right - alignTo.left,
              alignTo.right - boundary.left
            )
        ) {
          addClass(this.$el, this.clsDrop + "-stack");
        }

        this.positionAt(
          this.$el,
          this.boundaryAlign ? this.boundary : this.toggle.$el,
          this.boundary
        );
      },
    },
  };

  function getPositionedElements(el) {
    const result = [];
    apply(el, function (el) {
      return css(el, "position") !== "static" && result.push(el);
    });
    return result;
  }

  const formCustom = {
    mixins: [Class],

    args: "target",

    props: {
      target: Boolean,
    },

    data: {
      target: false,
    },

    computed: {
      input(_, $el) {
        return $(selInput, $el);
      },

      state() {
        return this.input.nextElementSibling;
      },

      target(ref, $el) {
        const { target } = ref;

        return (
          target &&
          ((target === true &&
            parent(this.input) === $el &&
            this.input.nextElementSibling) ||
            query(target, $el))
        );
      },
    },

    update() {
      const ref = this;
      const { target } = ref;
      const { input } = ref;

      if (!target) {
        return;
      }

      let option;
      const prop = isInput(target) ? "value" : "textContent";
      const prev = target[prop];
      const value =
        input.files && input.files[0]
          ? input.files[0].name
          : matches(input, "select") &&
            (option = $$("option", input).filter(function (el) {
              return el.selected;
            })[0]) // eslint-disable-line prefer-destructuring
          ? option.textContent
          : input.value;

      if (prev !== value) {
        target[prop] = value;
      }
    },

    events: [
      {
        name: "change",

        handler() {
          this.$update();
        },
      },

      {
        name: "reset",

        el() {
          return closest(this.$el, "form");
        },

        handler() {
          this.$update();
        },
      },
    ],
  };

  // Deprecated
  const gif = {
    update: {
      read(data) {
        const inview = isInView(this.$el);

        if (!inview || data.isInView === inview) {
          return false;
        }

        data.isInView = inview;
      },

      write() {
        this.$el.src = "" + this.$el.src; // force self-assign
      },

      events: ["scroll", "resize"],
    },
  };

  const Margin = {
    props: {
      margin: String,
      firstColumn: Boolean,
    },

    data: {
      margin: "mod-margin-small-top",
      firstColumn: "mod-first-column",
    },

    update: {
      read() {
        const rows = getRows(this.$el.children);

        return {
          rows,
          columns: getColumns(rows),
        };
      },

      write(ref) {
        const { columns } = ref;
        const { rows } = ref;

        for (let i = 0; i < rows.length; i++) {
          for (let j = 0; j < rows[i].length; j++) {
            toggleClass(rows[i][j], this.margin, i !== 0);
            toggleClass(
              rows[i][j],
              this.firstColumn,
              !!~columns[0].indexOf(rows[i][j])
            );
          }
        }
      },

      events: ["resize"],
    },
  };

  function getRows(items) {
    return sortBy$1(items, "top", "bottom");
  }

  function getColumns(rows) {
    const columns = [];

    for (let i = 0; i < rows.length; i++) {
      const sorted = sortBy$1(rows[i], "left", "right");
      for (let j = 0; j < sorted.length; j++) {
        columns[j] = !columns[j] ? sorted[j] : columns[j].concat(sorted[j]);
      }
    }

    return isRtl ? columns.reverse() : columns;
  }

  function sortBy$1(items, startProp, endProp) {
    const sorted = [[]];

    for (let i = 0; i < items.length; i++) {
      const el = items[i];

      if (!isVisible(el)) {
        continue;
      }

      let dim = getOffset(el);

      for (let j = sorted.length - 1; j >= 0; j--) {
        const current = sorted[j];

        if (!current[0]) {
          current.push(el);
          break;
        }

        let startDim = void 0;
        if (current[0].offsetParent === el.offsetParent) {
          startDim = getOffset(current[0]);
        } else {
          dim = getOffset(el, true);
          startDim = getOffset(current[0], true);
        }

        if (
          dim[startProp] >= startDim[endProp] - 1 &&
          dim[startProp] !== startDim[startProp]
        ) {
          sorted.push([el]);
          break;
        }

        if (
          dim[endProp] - 1 > startDim[startProp] ||
          dim[startProp] === startDim[startProp]
        ) {
          current.push(el);
          break;
        }

        if (j === 0) {
          sorted.unshift([el]);
          break;
        }
      }
    }

    return sorted;
  }

  function getOffset(element, offset) {
    let assign;

    if (offset === void 0) offset = false;

    let { offsetTop } = element;
    let { offsetLeft } = element;
    const { offsetHeight } = element;
    const { offsetWidth } = element;

    if (offset) {
      (assign = offsetPosition(element)),
        (offsetTop = assign[0]),
        (offsetLeft = assign[1]);
    }

    return {
      top: offsetTop,
      left: offsetLeft,
      bottom: offsetTop + offsetHeight,
      right: offsetLeft + offsetWidth,
    };
  }

  const grid = {
    extends: Margin,

    mixins: [Class],

    name: "grid",

    props: {
      masonry: Boolean,
      parallax: Number,
    },

    data: {
      margin: "mod-grid-margin",
      clsStack: "mod-grid-stack",
      masonry: false,
      parallax: 0,
    },

    connected() {
      this.masonry && addClass(this.$el, "mod-flex-top mod-flex-wrap-top");
    },

    update: [
      {
        write(ref) {
          const { columns } = ref;

          toggleClass(this.$el, this.clsStack, columns.length < 2);
        },

        events: ["resize"],
      },

      {
        read(data) {
          let { columns } = data;
          const { rows } = data;

          // Filter component makes elements positioned absolute
          if (
            !columns.length ||
            (!this.masonry && !this.parallax) ||
            positionedAbsolute(this.$el)
          ) {
            data.translates = false;
            return false;
          }

          let translates = false;

          const nodes = children(this.$el);
          const columnHeights = getColumnHeights(columns);
          const margin = getMarginTop(nodes, this.margin) * (rows.length - 1);
          const elHeight = Math.max.apply(Math, columnHeights) + margin;

          if (this.masonry) {
            columns = columns.map(function (column) {
              return sortBy(column, "offsetTop");
            });
            translates = getTranslates(rows, columns);
          }

          let padding = Math.abs(this.parallax);
          if (padding) {
            padding = columnHeights.reduce(function (newPadding, hgt, i) {
              return Math.max(
                newPadding,
                hgt + margin + (i % 2 ? padding : padding / 8) - elHeight
              );
            }, 0);
          }

          return {
            padding,
            columns,
            translates,
            height: translates ? elHeight : "",
          };
        },

        write(ref) {
          const { height } = ref;
          const { padding } = ref;

          css(this.$el, "paddingBottom", padding || "");
          height !== false && css(this.$el, "height", height);
        },

        events: ["resize"],
      },

      {
        read(ref) {
          const height$1 = ref.height;

          if (positionedAbsolute(this.$el)) {
            return false;
          }

          return {
            scrolled: this.parallax
              ? scrolledOver(
                  this.$el,
                  height$1 ? height$1 - height(this.$el) : 0
                ) * Math.abs(this.parallax)
              : false,
          };
        },

        write(ref) {
          const { columns } = ref;
          const { scrolled } = ref;
          const { translates } = ref;

          if (scrolled === false && !translates) {
            return;
          }

          columns.forEach(function (column, i) {
            return column.forEach(function (el, j) {
              return css(
                el,
                "transform",
                !scrolled && !translates
                  ? ""
                  : "translateY(" +
                      ((translates && -translates[i][j]) +
                        (scrolled ? (i % 2 ? scrolled : scrolled / 8) : 0)) +
                      "px)"
              );
            });
          });
        },

        events: ["scroll", "resize"],
      },
    ],
  };

  function positionedAbsolute(el) {
    return children(el).some(function (el) {
      return css(el, "position") === "absolute";
    });
  }

  function getTranslates(rows, columns) {
    const rowHeights = rows.map(function (row) {
      return Math.max.apply(
        Math,
        row.map(function (el) {
          return el.offsetHeight;
        })
      );
    });

    return columns.map(function (elements) {
      let prev = 0;
      return elements.map(function (element, row) {
        return (prev += row
          ? rowHeights[row - 1] - elements[row - 1].offsetHeight
          : 0);
      });
    });
  }

  function getMarginTop(nodes, cls) {
    const ref = nodes.filter(function (el) {
      return hasClass(el, cls);
    });
    const node = ref[0];

    return toFloat(
      node ? css(node, "marginTop") : css(nodes[0], "paddingLeft")
    );
  }

  function getColumnHeights(columns) {
    return columns.map(function (column) {
      return column.reduce(function (sum, el) {
        return sum + el.offsetHeight;
      }, 0);
    });
  }

  // IE 11 fix (min-height on a flex container won't apply to its flex items)
  const FlexBug = isIE
    ? {
        props: {
          selMinHeight: String,
        },

        data: {
          selMinHeight: false,
          forceHeight: false,
        },

        computed: {
          elements(ref, $el) {
            const { selMinHeight } = ref;

            return selMinHeight ? $$(selMinHeight, $el) : [$el];
          },
        },

        update: [
          {
            read() {
              css(this.elements, "height", "");
            },

            order: -5,

            events: ["resize"],
          },

          {
            write() {
              const this$1 = this;

              this.elements.forEach(function (el) {
                const height = toFloat(css(el, "minHeight"));
                if (
                  height &&
                  (this$1.forceHeight ||
                    Math.round(
                      height + boxModelAdjust(el, "height", "content-box")
                    ) >= el.offsetHeight)
                ) {
                  css(el, "height", height);
                }
              });
            },

            order: 5,

            events: ["resize"],
          },
        ],
      }
    : {};

  const heightMatch = {
    mixins: [FlexBug],

    args: "target",

    props: {
      target: String,
      row: Boolean,
    },

    data: {
      target: "> *",
      row: true,
      forceHeight: true,
    },

    computed: {
      elements(ref, $el) {
        const { target } = ref;

        return $$(target, $el);
      },
    },

    update: {
      read() {
        return {
          rows: (this.row ? getRows(this.elements) : [this.elements]).map(
            match
          ),
        };
      },

      write(ref) {
        const { rows } = ref;

        rows.forEach(function (ref) {
          const { heights } = ref;
          const { elements } = ref;

          return elements.forEach(function (el, i) {
            return css(el, "minHeight", heights[i]);
          });
        });
      },

      events: ["resize"],
    },
  };

  function match(elements) {
    if (elements.length < 2) {
      return { heights: [""], elements };
    }

    let heights = elements.map(getHeight);
    let max = Math.max.apply(Math, heights);
    const hasMinHeight = elements.some(function (el) {
      return el.style.minHeight;
    });
    const hasShrunk = elements.some(function (el, i) {
      return !el.style.minHeight && heights[i] < max;
    });

    if (hasMinHeight && hasShrunk) {
      css(elements, "minHeight", "");
      heights = elements.map(getHeight);
      max = Math.max.apply(Math, heights);
    }

    heights = elements.map(function (el, i) {
      return heights[i] === max &&
        toFloat(el.style.minHeight).toFixed(2) !== max.toFixed(2)
        ? ""
        : max;
    });

    return { heights, elements };
  }

  function getHeight(element) {
    let style = false;
    if (!isVisible(element)) {
      style = element.style.display;
      css(element, "display", "block", "important");
    }

    const height =
      dimensions(element).height -
      boxModelAdjust(element, "height", "content-box");

    if (style !== false) {
      css(element, "display", style);
    }

    return height;
  }

  const heightViewport = {
    mixins: [FlexBug],

    props: {
      expand: Boolean,
      offsetTop: Boolean,
      offsetBottom: Boolean,
      minHeight: Number,
    },

    data: {
      expand: false,
      offsetTop: false,
      offsetBottom: false,
      minHeight: 0,
    },

    update: {
      read(ref) {
        const prev = ref.minHeight;

        if (!isVisible(this.$el)) {
          return false;
        }

        let minHeight = "";
        const box = boxModelAdjust(this.$el, "height", "content-box");

        if (this.expand) {
          minHeight =
            height(window) -
              (dimensions(document.documentElement).height -
                dimensions(this.$el).height) -
              box || "";
        } else {
          // on mobile devices (iOS and Android) window.innerHeight !== 100vh
          minHeight = "calc(100vh";

          if (this.offsetTop) {
            const ref$1 = offset(this.$el);
            const { top } = ref$1;
            minHeight +=
              top > 0 && top < height(window) / 2 ? " - " + top + "px" : "";
          }

          if (this.offsetBottom === true) {
            minHeight +=
              " - " + dimensions(this.$el.nextElementSibling).height + "px";
          } else if (isNumeric(this.offsetBottom)) {
            minHeight += " - " + this.offsetBottom + "vh";
          } else if (this.offsetBottom && endsWith(this.offsetBottom, "px")) {
            minHeight += " - " + toFloat(this.offsetBottom) + "px";
          } else if (isString(this.offsetBottom)) {
            minHeight +=
              " - " +
              dimensions(query(this.offsetBottom, this.$el)).height +
              "px";
          }

          minHeight += (box ? " - " + box + "px" : "") + ")";
        }

        return { minHeight, prev };
      },

      write(ref) {
        const { minHeight } = ref;
        const { prev } = ref;

        css(this.$el, { minHeight });

        if (minHeight !== prev) {
          this.$update(this.$el, "resize");
        }

        if (
          this.minHeight &&
          toFloat(css(this.$el, "minHeight")) < this.minHeight
        ) {
          css(this.$el, "minHeight", this.minHeight);
        }
      },

      events: ["resize"],
    },
  };

  const img = {
    args: "dataSrc",

    props: {
      dataSrc: String,
      dataSrcset: Boolean,
      sizes: String,
      width: Number,
      height: Number,
      offsetTop: String,
      offsetLeft: String,
      target: String,
    },

    data: {
      dataSrc: "",
      dataSrcset: false,
      sizes: false,
      width: false,
      height: false,
      offsetTop: "50vh",
      offsetLeft: "50vw",
      target: false,
    },

    computed: {
      cacheKey(ref) {
        const { dataSrc } = ref;

        return this.$name + "." + dataSrc;
      },

      width(ref) {
        const { width } = ref;
        const { dataWidth } = ref;

        return width || dataWidth;
      },

      height(ref) {
        const { height } = ref;
        const { dataHeight } = ref;

        return height || dataHeight;
      },

      sizes(ref) {
        const { sizes } = ref;
        const { dataSizes } = ref;

        return sizes || dataSizes;
      },

      isImg(_, $el) {
        return isImg($el);
      },

      target: {
        get(ref) {
          const { target } = ref;

          return [this.$el].concat(queryAll(target, this.$el));
        },

        watch() {
          this.observe();
        },
      },

      offsetTop(ref) {
        const { offsetTop } = ref;

        return toPx(offsetTop, "height");
      },

      offsetLeft(ref) {
        const { offsetLeft } = ref;

        return toPx(offsetLeft, "width");
      },
    },

    connected() {
      if (!window.IntersectionObserver) {
        setSrcAttrs(this.$el, this.dataSrc, this.dataSrcset, this.sizes);
        return;
      }

      if (storage[this.cacheKey]) {
        setSrcAttrs(
          this.$el,
          storage[this.cacheKey],
          this.dataSrcset,
          this.sizes
        );
      } else if (this.isImg && this.width && this.height) {
        setSrcAttrs(
          this.$el,
          getPlaceholderImage(this.width, this.height, this.sizes)
        );
      }

      this.observer = new IntersectionObserver(this.load, {
        rootMargin: this.offsetTop + "px " + this.offsetLeft + "px",
      });

      requestAnimationFrame(this.observe);
    },

    disconnected() {
      this.observer && this.observer.disconnect();
    },

    update: {
      read(ref) {
        const this$1 = this;
        const { image } = ref;

        if (!this.observer) {
          return false;
        }

        if (!image && document.readyState === "complete") {
          this.load(this.observer.takeRecords());
        }

        if (this.isImg) {
          return false;
        }

        image &&
          image.then(function (img) {
            return (
              img &&
              img.currentSrc !== "" &&
              setSrcAttrs(this$1.$el, currentSrc(img))
            );
          });
      },

      write(data) {
        if (this.dataSrcset && window.devicePixelRatio !== 1) {
          const bgSize = css(this.$el, "backgroundSize");
          if (bgSize.match(/^(auto\s?)+$/) || toFloat(bgSize) === data.bgSize) {
            data.bgSize = getSourceSize(this.dataSrcset, this.sizes);
            css(this.$el, "backgroundSize", data.bgSize + "px");
          }
        }
      },

      events: ["resize"],
    },

    methods: {
      load(entries) {
        const this$1 = this;

        // Old chromium based browsers (UC Browser) did not implement `isIntersecting`
        if (
          !entries.some(function (entry) {
            return isUndefined(entry.isIntersecting) || entry.isIntersecting;
          })
        ) {
          return;
        }

        this._data.image = getImage(
          this.dataSrc,
          this.dataSrcset,
          this.sizes
        ).then(
          function (img) {
            setSrcAttrs(this$1.$el, currentSrc(img), img.srcset, img.sizes);
            storage[this$1.cacheKey] = currentSrc(img);
            return img;
          },
          function (e) {
            return trigger(this$1.$el, new e.constructor(e.type, e));
          }
        );

        this.observer.disconnect();
      },

      observe() {
        const this$1 = this;

        if (this._connected && !this._data.image) {
          this.target.forEach(function (el) {
            return this$1.observer.observe(el);
          });
        }
      },
    },
  };

  function setSrcAttrs(el, src, srcset, sizes) {
    if (isImg(el)) {
      sizes && (el.sizes = sizes);
      srcset && (el.srcset = srcset);
      src && (el.src = src);
    } else if (src) {
      const change = !includes(el.style.backgroundImage, src);
      if (change) {
        css(el, "backgroundImage", "url(" + escape(src) + ")");
        trigger(el, createEvent("load", false));
      }
    }
  }

  function getPlaceholderImage(width, height, sizes) {
    let assign;

    if (sizes) {
      (assign = Dimensions.ratio(
        { width, height },
        "width",
        toPx(sizesToPixel(sizes))
      )),
        (width = assign.width),
        (height = assign.height);
    }

    return (
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="' +
      width +
      '" height="' +
      height +
      '"></svg>'
    );
  }

  const sizesRe = /\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;
  function sizesToPixel(sizes) {
    let matches;

    sizesRe.lastIndex = 0;

    while ((matches = sizesRe.exec(sizes))) {
      if (!matches[1] || window.matchMedia(matches[1]).matches) {
        matches = evaluateSize(matches[2]);
        break;
      }
    }

    return matches || "100vw";
  }

  const sizeRe = /\d+(?:\w+|%)/g;
  const additionRe = /[+-]?(\d+)/g;
  function evaluateSize(size) {
    return startsWith(size, "calc")
      ? size
          .slice(5, -1)
          .replace(sizeRe, function (size) {
            return toPx(size);
          })
          .replace(/ /g, "")
          .match(additionRe)
          .reduce(function (a, b) {
            return a + +b;
          }, 0)
      : size;
  }

  const srcSetRe = /\s+\d+w\s*(?:,|$)/g;
  function getSourceSize(srcset, sizes) {
    const srcSize = toPx(sizesToPixel(sizes));
    const descriptors = (srcset.match(srcSetRe) || [])
      .map(toFloat)
      .sort(function (a, b) {
        return a - b;
      });

    return (
      descriptors.filter(function (size) {
        return size >= srcSize;
      })[0] ||
      descriptors.pop() ||
      ""
    );
  }

  function isImg(el) {
    return el.tagName === "IMG";
  }

  function currentSrc(el) {
    return el.currentSrc || el.src;
  }

  const key = "__test__";
  let storage;

  // workaround for Safari's private browsing mode and accessing sessionStorage in Blink
  try {
    storage = window.sessionStorage || {};
    storage[key] = 1;
    delete storage[key];
  } catch (e) {
    storage = {};
  }

  const Container = {
    props: {
      container: Boolean,
    },

    data: {
      container: true,
    },

    computed: {
      container(ref) {
        const { container } = ref;

        return (
          (container === true && this.$container) || (container && $(container))
        );
      },
    },
  };

  const active$1 = [];

  const Modal = {
    mixins: [Class, Container, Togglable],

    props: {
      selPanel: String,
      selClose: String,
      escClose: Boolean,
      bgClose: Boolean,
      stack: Boolean,
    },

    data: {
      cls: "mod-open",
      escClose: true,
      bgClose: true,
      overlay: true,
      stack: false,
    },

    computed: {
      panel(ref, $el) {
        const { selPanel } = ref;

        return $(selPanel, $el);
      },

      transitionElement() {
        return this.panel;
      },

      bgClose(ref) {
        const { bgClose } = ref;

        return bgClose && this.panel;
      },
    },

    beforeDisconnect() {
      if (this.isToggled()) {
        this.toggleElement(this.$el, false, false);
      }
    },

    events: [
      {
        name: "click",

        delegate() {
          return this.selClose;
        },

        handler(e) {
          e.preventDefault();
          this.hide();
        },
      },

      {
        name: "toggle",

        self: true,

        handler(e) {
          if (e.defaultPrevented) {
            return;
          }

          e.preventDefault();

          if (this.isToggled() === includes(active$1, this)) {
            this.toggle();
          }
        },
      },

      {
        name: "beforeshow",

        self: true,

        handler(e) {
          if (includes(active$1, this)) {
            return false;
          }

          if (!this.stack && active$1.length) {
            Promise.all(
              active$1.map(function (modal) {
                return modal.hide();
              })
            ).then(this.show);
            e.preventDefault();
          } else {
            active$1.push(this);
          }
        },
      },

      {
        name: "show",

        self: true,

        handler() {
          const this$1 = this;

          const docEl = document.documentElement;

          if (width(window) > docEl.clientWidth && this.overlay) {
            css(document.body, "overflowY", "scroll");
          }

          if (this.stack) {
            css(
              this.$el,
              "zIndex",
              toFloat(css(this.$el, "zIndex")) + active$1.length
            );
          }

          addClass(docEl, this.clsPage);

          if (this.bgClose) {
            once(
              this.$el,
              "hide",
              on(document, pointerDown, function (ref) {
                const { target } = ref;

                if (
                  last(active$1) !== this$1 ||
                  (this$1.overlay && !within(target, this$1.$el)) ||
                  within(target, this$1.panel)
                ) {
                  return;
                }

                once(
                  document,
                  pointerUp + " " + pointerCancel + " scroll",
                  function (ref) {
                    const { defaultPrevented } = ref;
                    const { type } = ref;
                    const newTarget = ref.target;

                    if (
                      !defaultPrevented &&
                      type === pointerUp &&
                      target === newTarget
                    ) {
                      this$1.hide();
                    }
                  },
                  true
                );
              }),
              { self: true }
            );
          }

          if (this.escClose) {
            once(
              this.$el,
              "hide",
              on(document, "keydown", function (e) {
                if (e.keyCode === 27 && last(active$1) === this$1) {
                  this$1.hide();
                }
              }),
              { self: true }
            );
          }
        },
      },

      {
        name: "hidden",

        self: true,

        handler() {
          const this$1 = this;

          if (includes(active$1, this)) {
            active$1.splice(active$1.indexOf(this), 1);
          }

          if (!active$1.length) {
            css(document.body, "overflowY", "");
          }

          css(this.$el, "zIndex", "");

          if (
            !active$1.some(function (modal) {
              return modal.clsPage === this$1.clsPage;
            })
          ) {
            removeClass(document.documentElement, this.clsPage);
          }
        },
      },
    ],

    methods: {
      toggle() {
        return this.isToggled() ? this.hide() : this.show();
      },

      show() {
        const this$1 = this;

        if (this.container && parent(this.$el) !== this.container) {
          append(this.container, this.$el);
          return new Promise(function (resolve) {
            return requestAnimationFrame(function () {
              return this$1.show().then(resolve);
            });
          });
        }

        return this.toggleElement(this.$el, true, animate$1(this));
      },

      hide() {
        return this.toggleElement(this.$el, false, animate$1(this));
      },
    },
  };

  function animate$1(ref) {
    const { transitionElement } = ref;
    const { _toggle } = ref;

    return function (el, show) {
      return new Promise(function (resolve, reject) {
        return once(el, "show hide", function () {
          el._reject && el._reject();
          el._reject = reject;

          _toggle(el, show);

          const off = once(
            transitionElement,
            "transitionstart",
            function () {
              once(
                transitionElement,
                "transitionend transitioncancel",
                resolve,
                { self: true }
              );
              clearTimeout(timer);
            },
            { self: true }
          );

          var timer = setTimeout(function () {
            off();
            resolve();
          }, toMs(css(transitionElement, "transitionDuration")));
        });
      }).then(function () {
        return delete el._reject;
      });
    };
  }

  const modal = {
    install,

    mixins: [Modal],

    data: {
      clsPage: "mod-modal-page",
      selPanel: ".mod-modal-dialog",
      selClose:
        ".mod-modal-close, .mod-modal-close-default, .mod-modal-close-outside, .mod-modal-close-full",
    },

    events: [
      {
        name: "show",

        self: true,

        handler() {
          if (hasClass(this.panel, "mod-margin-auto-vertical")) {
            addClass(this.$el, "mod-flex");
          } else {
            css(this.$el, "display", "block");
          }

          height(this.$el); // force reflow
        },
      },

      {
        name: "hidden",

        self: true,

        handler() {
          css(this.$el, "display", "");
          removeClass(this.$el, "mod-flex");
        },
      },
    ],
  };

  function install(ref) {
    const { modal } = ref;

    modal.dialog = function (content, options) {
      const dialog = modal(
        '<div class="mod-modal"> <div class="mod-modal-dialog">' +
          content +
          "</div> </div>",
        options
      );

      dialog.show();

      on(
        dialog.$el,
        "hidden",
        function () {
          return Promise.resolve().then(function () {
            return dialog.$destroy(true);
          });
        },
        { self: true }
      );

      return dialog;
    };

    modal.alert = function (message, options) {
      return openDialog(
        function (ref) {
          const { labels } = ref;

          return (
            '<div class="mod-modal-body">' +
            (isString(message) ? message : html(message)) +
            '</div> <div class="mod-modal-footer mod-text-right"> <button class="mod-button mod-button-primary mod-modal-close" autofocus>' +
            labels.ok +
            "</button> </div>"
          );
        },
        options,
        function (deferred) {
          return deferred.resolve();
        }
      );
    };

    modal.confirm = function (message, options) {
      return openDialog(
        function (ref) {
          const { labels } = ref;

          return (
            '<form> <div class="mod-modal-body">' +
            (isString(message) ? message : html(message)) +
            '</div> <div class="mod-modal-footer mod-text-right"> <button class="mod-button mod-button-default mod-modal-close" type="button">' +
            labels.cancel +
            '</button> <button class="mod-button mod-button-primary" autofocus>' +
            labels.ok +
            "</button> </div> </form>"
          );
        },
        options,
        function (deferred) {
          return deferred.reject();
        }
      );
    };

    modal.prompt = function (message, value, options) {
      return openDialog(
        function (ref) {
          const { labels } = ref;

          return (
            '<form class="mod-form-stacked"> <div class="mod-modal-body"> <label>' +
            (isString(message) ? message : html(message)) +
            '</label> <input class="mod-input" value="' +
            (value || "") +
            '" autofocus> </div> <div class="mod-modal-footer mod-text-right"> <button class="mod-button mod-button-default mod-modal-close" type="button">' +
            labels.cancel +
            '</button> <button class="mod-button mod-button-primary">' +
            labels.ok +
            "</button> </div> </form>"
          );
        },
        options,
        function (deferred) {
          return deferred.resolve(null);
        },
        function (dialog) {
          return $("input", dialog.$el).value;
        }
      );
    };

    modal.labels = {
      ok: "Ok",
      cancel: "Cancel",
    };

    function openDialog(tmpl, options, hideFn, submitFn) {
      options = assign(
        { bgClose: false, escClose: true, labels: modal.labels },
        options
      );

      const dialog = modal.dialog(tmpl(options), options);
      const deferred = new Deferred();

      let resolved = false;

      on(dialog.$el, "submit", "form", function (e) {
        e.preventDefault();
        deferred.resolve(submitFn && submitFn(dialog));
        resolved = true;
        dialog.hide();
      });

      on(dialog.$el, "hide", function () {
        return !resolved && hideFn(deferred);
      });

      deferred.promise.dialog = dialog;

      return deferred.promise;
    }
  }

  const offcanvas = {
    mixins: [Modal],

    args: "mode",

    props: {
      mode: String,
      flip: Boolean,
      overlay: Boolean,
    },

    data: {
      mode: "slide",
      flip: false,
      overlay: false,
      clsPage: "mod-offcanvas-page",
      clsContainer: "mod-offcanvas-container",
      selPanel: ".mod-offcanvas-bar",
      clsFlip: "mod-offcanvas-flip",
      clsContainerAnimation: "mod-offcanvas-container-animation",
      clsSidebarAnimation: "mod-offcanvas-bar-animation",
      clsMode: "mod-offcanvas",
      clsOverlay: "mod-offcanvas-overlay",
      selClose: ".mod-offcanvas-close",
      container: false,
    },

    computed: {
      clsFlip(ref) {
        const { flip } = ref;
        const { clsFlip } = ref;

        return flip ? clsFlip : "";
      },

      clsOverlay(ref) {
        const { overlay } = ref;
        const { clsOverlay } = ref;

        return overlay ? clsOverlay : "";
      },

      clsMode(ref) {
        const { mode } = ref;
        const { clsMode } = ref;

        return clsMode + "-" + mode;
      },

      clsSidebarAnimation(ref) {
        const { mode } = ref;
        const { clsSidebarAnimation } = ref;

        return mode === "none" || mode === "reveal" ? "" : clsSidebarAnimation;
      },

      clsContainerAnimation(ref) {
        const { mode } = ref;
        const { clsContainerAnimation } = ref;

        return mode !== "push" && mode !== "reveal"
          ? ""
          : clsContainerAnimation;
      },

      transitionElement(ref) {
        const { mode } = ref;

        return mode === "reveal" ? parent(this.panel) : this.panel;
      },
    },

    update: {
      read() {
        if (this.isToggled() && !isVisible(this.$el)) {
          this.hide();
        }
      },

      events: ["resize"],
    },

    events: [
      {
        name: "click",

        delegate() {
          return 'a[href^="#"]';
        },

        handler(ref) {
          const { hash } = ref.current;
          const { defaultPrevented } = ref;

          if (!defaultPrevented && hash && $(hash, document.body)) {
            this.hide();
          }
        },
      },

      {
        name: "touchstart",

        passive: true,

        el() {
          return this.panel;
        },

        handler(ref) {
          const { targetTouches } = ref;

          if (targetTouches.length === 1) {
            this.clientY = targetTouches[0].clientY;
          }
        },
      },

      {
        name: "touchmove",

        self: true,
        passive: false,

        filter() {
          return this.overlay;
        },

        handler(e) {
          e.cancelable && e.preventDefault();
        },
      },

      {
        name: "touchmove",

        passive: false,

        el() {
          return this.panel;
        },

        handler(e) {
          if (e.targetTouches.length !== 1) {
            return;
          }

          const clientY = event.targetTouches[0].clientY - this.clientY;
          const ref = this.panel;
          const { scrollTop } = ref;
          const { scrollHeight } = ref;
          const { clientHeight } = ref;

          if (
            clientHeight >= scrollHeight ||
            (scrollTop === 0 && clientY > 0) ||
            (scrollHeight - scrollTop <= clientHeight && clientY < 0)
          ) {
            e.cancelable && e.preventDefault();
          }
        },
      },

      {
        name: "show",

        self: true,

        handler() {
          if (
            this.mode === "reveal" &&
            !hasClass(parent(this.panel), this.clsMode)
          ) {
            wrapAll(this.panel, "<div>");
            addClass(parent(this.panel), this.clsMode);
          }

          css(
            document.documentElement,
            "overflowY",
            this.overlay ? "hidden" : ""
          );
          addClass(document.body, this.clsContainer, this.clsFlip);
          css(document.body, "touch-action", "pan-y pinch-zoom");
          css(this.$el, "display", "block");
          addClass(this.$el, this.clsOverlay);
          addClass(
            this.panel,
            this.clsSidebarAnimation,
            this.mode !== "reveal" ? this.clsMode : ""
          );

          height(document.body); // force reflow
          addClass(document.body, this.clsContainerAnimation);

          this.clsContainerAnimation && suppressUserScale();
        },
      },

      {
        name: "hide",

        self: true,

        handler() {
          removeClass(document.body, this.clsContainerAnimation);
          css(document.body, "touch-action", "");
        },
      },

      {
        name: "hidden",

        self: true,

        handler() {
          this.clsContainerAnimation && resumeUserScale();

          if (this.mode === "reveal") {
            unwrap(this.panel);
          }

          removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
          removeClass(this.$el, this.clsOverlay);
          css(this.$el, "display", "");
          removeClass(document.body, this.clsContainer, this.clsFlip);

          css(document.documentElement, "overflowY", "");
        },
      },

      {
        name: "swipeLeft swipeRight",

        handler(e) {
          if (this.isToggled() && endsWith(e.type, "Left") ^ this.flip) {
            this.hide();
          }
        },
      },
    ],
  };

  // Chrome in responsive mode zooms page upon opening offcanvas
  function suppressUserScale() {
    getViewport$1().content += ",user-scalable=0";
  }

  function resumeUserScale() {
    const viewport = getViewport$1();
    viewport.content = viewport.content.replace(/,user-scalable=0$/, "");
  }

  function getViewport$1() {
    return (
      $('meta[name="viewport"]', document.head) ||
      append(document.head, '<meta name="viewport">')
    );
  }

  const overflowAuto = {
    mixins: [Class],

    props: {
      selContainer: String,
      selContent: String,
    },

    data: {
      selContainer: ".mod-modal",
      selContent: ".mod-modal-dialog",
    },

    computed: {
      container(ref, $el) {
        const { selContainer } = ref;

        return closest($el, selContainer);
      },

      content(ref, $el) {
        const { selContent } = ref;

        return closest($el, selContent);
      },
    },

    connected() {
      css(this.$el, "minHeight", 150);
    },

    update: {
      read() {
        if (!this.content || !this.container || !isVisible(this.$el)) {
          return false;
        }

        return {
          current: toFloat(css(this.$el, "maxHeight")),
          max: Math.max(
            150,
            height(this.container) -
              (dimensions(this.content).height - height(this.$el))
          ),
        };
      },

      write(ref) {
        const { current } = ref;
        const { max } = ref;

        css(this.$el, "maxHeight", max);
        if (Math.round(current) !== Math.round(max)) {
          trigger(this.$el, "resize");
        }
      },

      events: ["resize"],
    },
  };

  const responsive = {
    props: ["width", "height"],

    connected() {
      addClass(this.$el, "mod-responsive-width");
    },

    update: {
      read() {
        return isVisible(this.$el) && this.width && this.height
          ? { width: width(parent(this.$el)), height: this.height }
          : false;
      },

      write(dim) {
        height(
          this.$el,
          Dimensions.contain(
            {
              height: this.height,
              width: this.width,
            },
            dim
          ).height
        );
      },

      events: ["resize"],
    },
  };

  const scroll = {
    props: {
      offset: Number,
    },

    data: {
      offset: 0,
    },

    methods: {
      scrollTo(el) {
        const this$1 = this;

        el = (el && $(el)) || document.body;

        if (trigger(this.$el, "beforescroll", [this, el])) {
          scrollIntoView(el, { offset: this.offset }).then(function () {
            return trigger(this$1.$el, "scrolled", [this$1, el]);
          });
        }
      },
    },

    events: {
      click(e) {
        if (e.defaultPrevented) {
          return;
        }

        e.preventDefault();
        this.scrollTo(
          "#" + escape(decodeURIComponent((this.$el.hash || "").substr(1)))
        );
      },
    },
  };

  const stateKey$1 = "_ukScrollspy";
  const scrollspy = {
    args: "cls",

    props: {
      cls: String,
      target: String,
      hidden: Boolean,
      offsetTop: Number,
      offsetLeft: Number,
      repeat: Boolean,
      delay: Number,
    },

    data() {
      return {
        cls: false,
        target: false,
        hidden: true,
        offsetTop: 0,
        offsetLeft: 0,
        repeat: false,
        delay: 0,
        inViewClass: "mod-scrollspy-inview",
      };
    },

    computed: {
      elements: {
        get(ref, $el) {
          const { target } = ref;

          return target ? $$(target, $el) : [$el];
        },

        watch(elements) {
          if (this.hidden) {
            css(
              filter(elements, ":not(." + this.inViewClass + ")"),
              "visibility",
              "hidden"
            );
          }
        },

        immediate: true,
      },
    },

    disconnected() {
      const this$1 = this;

      this.elements.forEach(function (el) {
        removeClass(
          el,
          this$1.inViewClass,
          el[stateKey$1] ? el[stateKey$1].cls : ""
        );
        delete el[stateKey$1];
      });
    },

    update: [
      {
        read(ref) {
          const this$1 = this;
          const { update } = ref;

          if (!update) {
            return;
          }

          this.elements.forEach(function (el) {
            if (!el[stateKey$1]) {
              el[stateKey$1] = {
                cls: data(el, "mod-scrollspy-class") || this$1.cls,
              };
            }

            el[stateKey$1].show = isInView(
              el,
              this$1.offsetTop,
              this$1.offsetLeft
            );
          });
        },

        write(data) {
          const this$1 = this;

          // Let child components be applied at least once first
          if (!data.update) {
            this.$emit();
            return (data.update = true);
          }

          this.elements.forEach(function (el) {
            const state = el[stateKey$1];
            const toggle = function (inview) {
              css(el, "visibility", !inview && this$1.hidden ? "hidden" : "");

              toggleClass(el, this$1.inViewClass, inview);
              toggleClass(el, state.cls);

              trigger(el, inview ? "inview" : "outview");

              state.inview = inview;

              this$1.$update(el);
            };

            if (state.show && !state.inview && !state.queued) {
              state.queued = true;

              data.promise = (data.promise || Promise.resolve())
                .then(function () {
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, this$1.delay);
                  });
                })
                .then(function () {
                  toggle(true);
                  setTimeout(function () {
                    state.queued = false;
                    this$1.$emit();
                  }, 300);
                });
            } else if (
              !state.show &&
              state.inview &&
              !state.queued &&
              this$1.repeat
            ) {
              toggle(false);
            }
          });
        },

        events: ["scroll", "resize"],
      },
    ],
  };

  const scrollspyNav = {
    props: {
      cls: String,
      closest: String,
      scroll: Boolean,
      overflow: Boolean,
      offset: Number,
    },

    data: {
      cls: "mod-active",
      closest: false,
      scroll: false,
      overflow: true,
      offset: 0,
    },

    computed: {
      links: {
        get(_, $el) {
          return $$('a[href^="#"]', $el).filter(function (el) {
            return el.hash;
          });
        },

        watch(links) {
          if (this.scroll) {
            this.$create("scroll", links, { offset: this.offset || 0 });
          }
        },

        immediate: true,
      },

      targets() {
        return $$(
          this.links
            .map(function (el) {
              return escape(el.hash).substr(1);
            })
            .join(",")
        );
      },

      elements(ref) {
        const selector = ref.closest;

        return closest(this.links, selector || "*");
      },
    },

    update: [
      {
        read() {
          const this$1 = this;

          const ref = this.targets;
          const { length } = ref;

          if (!length || !isVisible(this.$el)) {
            return false;
          }

          const ref$1 = scrollParents(this.targets, /auto|scroll/, true);
          const scrollElement = ref$1[0];
          const { scrollTop } = scrollElement;
          const { scrollHeight } = scrollElement;
          const max = scrollHeight - getViewportClientHeight(scrollElement);
          let active = false;

          if (scrollTop === max) {
            active = length - 1;
          } else {
            this.targets.every(function (el, i) {
              if (
                offset(el).top -
                  offset(getViewport(scrollElement)).top -
                  this$1.offset <=
                0
              ) {
                active = i;
                return true;
              }
            });

            if (active === false && this.overflow) {
              active = 0;
            }
          }

          return { active };
        },

        write(ref) {
          const { active } = ref;

          this.links.forEach(function (el) {
            return el.blur();
          });
          removeClass(this.elements, this.cls);

          if (active !== false) {
            trigger(this.$el, "active", [
              active,
              addClass(this.elements[active], this.cls),
            ]);
          }
        },

        events: ["scroll", "resize"],
      },
    ],
  };

  const Media = {
    props: {
      media: Boolean,
    },

    data: {
      media: false,
    },

    computed: {
      matchMedia() {
        const media = toMedia(this.media);
        return !media || window.matchMedia(media).matches;
      },
    },
  };

  function toMedia(value) {
    if (isString(value)) {
      if (value[0] === "@") {
        const name = "breakpoint-" + value.substr(1);
        value = toFloat(getCssVar(name));
      } else if (isNaN(value)) {
        return value;
      }
    }

    return value && !isNaN(value) ? "(min-width: " + value + "px)" : false;
  }

  const sticky = {
    mixins: [Class, Media],

    props: {
      top: null,
      bottom: Boolean,
      offset: String,
      animation: String,
      clsActive: String,
      clsInactive: String,
      clsFixed: String,
      clsBelow: String,
      selTarget: String,
      widthElement: Boolean,
      showOnUp: Boolean,
      targetOffset: Number,
    },

    data: {
      top: 0,
      bottom: false,
      offset: 0,
      animation: "",
      clsActive: "mod-active",
      clsInactive: "",
      clsFixed: "mod-sticky-fixed",
      clsBelow: "mod-sticky-below",
      selTarget: "",
      widthElement: false,
      showOnUp: false,
      targetOffset: false,
    },

    computed: {
      offset(ref) {
        const { offset } = ref;

        return toPx(offset);
      },

      selTarget(ref, $el) {
        const { selTarget } = ref;

        return (selTarget && $(selTarget, $el)) || $el;
      },

      widthElement(ref, $el) {
        const { widthElement } = ref;

        return query(widthElement, $el) || this.placeholder;
      },

      isActive: {
        get() {
          return hasClass(this.selTarget, this.clsActive);
        },

        set(value) {
          if (value && !this.isActive) {
            replaceClass(this.selTarget, this.clsInactive, this.clsActive);
            trigger(this.$el, "active");
          } else if (!value && !hasClass(this.selTarget, this.clsInactive)) {
            replaceClass(this.selTarget, this.clsActive, this.clsInactive);
            trigger(this.$el, "inactive");
          }
        },
      },
    },

    connected() {
      this.placeholder =
        $("+ .mod-sticky-placeholder", this.$el) ||
        $('<div class="mod-sticky-placeholder"></div>');
      this.isFixed = false;
      this.isActive = false;
    },

    disconnected() {
      if (this.isFixed) {
        this.hide();
        removeClass(this.selTarget, this.clsInactive);
      }

      remove(this.placeholder);
      this.placeholder = null;
      this.widthElement = null;
    },

    events: [
      {
        name: "load hashchange popstate",

        el() {
          return window;
        },

        handler() {
          const this$1 = this;

          if (
            !(
              this.targetOffset !== false &&
              location.hash &&
              window.pageYOffset > 0
            )
          ) {
            return;
          }

          const target = $(location.hash);

          if (target) {
            fastdom.read(function () {
              const ref = offset(target);
              const { top } = ref;
              const elTop = offset(this$1.$el).top;
              const elHeight = this$1.$el.offsetHeight;

              if (
                this$1.isFixed &&
                elTop + elHeight >= top &&
                elTop <= top + target.offsetHeight
              ) {
                scrollTop(
                  window,
                  top -
                    elHeight -
                    (isNumeric(this$1.targetOffset) ? this$1.targetOffset : 0) -
                    this$1.offset
                );
              }
            });
          }
        },
      },
    ],

    update: [
      {
        read(ref, types) {
          let { height } = ref;

          this.inactive = !this.matchMedia || !isVisible(this.$el);

          if (this.inactive) {
            return false;
          }

          if (this.isActive && types.has("resize")) {
            this.hide();
            height = this.$el.offsetHeight;
            this.show();
          }

          height = !this.isActive ? this.$el.offsetHeight : height;

          this.topOffset = offset(
            this.isFixed ? this.placeholder : this.$el
          ).top;
          this.bottomOffset = this.topOffset + height;

          const bottom = parseProp("bottom", this);

          this.top =
            Math.max(toFloat(parseProp("top", this)), this.topOffset) -
            this.offset;
          this.bottom = bottom && bottom - this.$el.offsetHeight;
          this.width = dimensions(
            isVisible(this.widthElement) ? this.widthElement : this.$el
          ).width;

          return {
            height,
            top: offsetPosition(this.placeholder)[0],
            margins: css(this.$el, [
              "marginTop",
              "marginBottom",
              "marginLeft",
              "marginRight",
            ]),
          };
        },

        write(ref) {
          const { height } = ref;
          const { margins } = ref;

          const ref$1 = this;
          const { placeholder } = ref$1;

          css(placeholder, assign({ height }, margins));

          if (!within(placeholder, document)) {
            after(this.$el, placeholder);
            placeholder.hidden = true;
          }

          this.isActive = !!this.isActive; // force self-assign
        },

        events: ["resize"],
      },

      {
        read(ref) {
          let { scroll } = ref;
          if (scroll === void 0) scroll = 0;

          this.scroll = window.pageYOffset;

          return {
            dir: scroll <= this.scroll ? "down" : "up",
            scroll: this.scroll,
          };
        },

        write(data, types) {
          const this$1 = this;

          const now = Date.now();
          const isScrollUpdate = types.has("scroll");
          let { initTimestamp } = data;
          if (initTimestamp === void 0) initTimestamp = 0;
          const { dir } = data;
          const { lastDir } = data;
          const { lastScroll } = data;
          const { scroll } = data;
          const { top } = data;

          data.lastScroll = scroll;

          if (
            scroll < 0 ||
            (scroll === lastScroll && isScrollUpdate) ||
            (this.showOnUp && !isScrollUpdate && !this.isFixed)
          ) {
            return;
          }

          if (now - initTimestamp > 300 || dir !== lastDir) {
            data.initScroll = scroll;
            data.initTimestamp = now;
          }

          data.lastDir = dir;

          if (
            this.showOnUp &&
            !this.isFixed &&
            Math.abs(data.initScroll - scroll) <= 30 &&
            Math.abs(lastScroll - scroll) <= 10
          ) {
            return;
          }

          if (
            this.inactive ||
            scroll < this.top ||
            (this.showOnUp &&
              (scroll <= this.top ||
                (dir === "down" && isScrollUpdate) ||
                (dir === "up" && !this.isFixed && scroll <= this.bottomOffset)))
          ) {
            if (!this.isFixed) {
              if (Animation.inProgress(this.$el) && top > scroll) {
                Animation.cancel(this.$el);
                this.hide();
              }

              return;
            }

            this.isFixed = false;

            if (this.animation && scroll > this.topOffset) {
              Animation.cancel(this.$el);
              Animation.out(this.$el, this.animation).then(function () {
                return this$1.hide();
              }, noop);
            } else {
              this.hide();
            }
          } else if (this.isFixed) {
            this.update();
          } else if (this.animation) {
            Animation.cancel(this.$el);
            this.show();
            Animation.in(this.$el, this.animation).catch(noop);
          } else {
            this.show();
          }
        },

        events: ["resize", "scroll"],
      },
    ],

    methods: {
      show() {
        this.isFixed = true;
        this.update();
        this.placeholder.hidden = false;
      },

      hide() {
        this.isActive = false;
        removeClass(this.$el, this.clsFixed, this.clsBelow);
        css(this.$el, { position: "", top: "", width: "" });
        this.placeholder.hidden = true;
      },

      update() {
        const active = this.top !== 0 || this.scroll > this.top;
        let top = Math.max(0, this.offset);

        if (isNumeric(this.bottom) && this.scroll > this.bottom - this.offset) {
          top = this.bottom - this.scroll;
        }

        css(this.$el, {
          position: "fixed",
          top: top + "px",
          width: this.width,
        });

        this.isActive = active;
        toggleClass(this.$el, this.clsBelow, this.scroll > this.bottomOffset);
        addClass(this.$el, this.clsFixed);
      },
    },
  };

  function parseProp(prop, ref) {
    const { $props } = ref;
    const { $el } = ref;
    const propOffset = ref[prop + "Offset"];

    const value = $props[prop];

    if (!value) {
      return;
    }

    if (isString(value) && value.match(/^-?\d/)) {
      return propOffset + toPx(value);
    } else {
      return offset(value === true ? parent($el) : query(value, $el)).bottom;
    }
  }

  const SVG = {
    args: "src",

    props: {
      id: Boolean,
      icon: String,
      src: String,
      style: String,
      width: Number,
      height: Number,
      ratio: Number,
      class: String,
      strokeAnimation: Boolean,
      focusable: Boolean, // IE 11
      attributes: "list",
    },

    data: {
      ratio: 1,
      include: ["style", "class", "focusable"],
      class: "",
      strokeAnimation: false,
    },

    beforeConnect() {
      this.class += " mod-svg";
    },

    connected() {
      const this$1 = this;
      let assign;

      if (!this.icon && includes(this.src, "#")) {
        (assign = this.src.split("#")),
          (this.src = assign[0]),
          (this.icon = assign[1]);
      }

      this.svg = this.getSvg().then(function (el) {
        if (this$1._connected) {
          const svg = insertSVG(el, this$1.$el);

          if (this$1.svgEl && svg !== this$1.svgEl) {
            remove(this$1.svgEl);
          }

          this$1.applyAttributes(svg, el);
          this$1.$emit();
          return (this$1.svgEl = svg);
        }
      }, noop);
    },

    disconnected() {
      const this$1 = this;

      this.svg.then(function (svg) {
        if (!this$1._connected) {
          if (isVoidElement(this$1.$el)) {
            this$1.$el.hidden = false;
          }

          remove(svg);
          this$1.svgEl = null;
        }
      });

      this.svg = null;
    },

    update: {
      read() {
        return !!(this.strokeAnimation && this.svgEl && isVisible(this.svgEl));
      },

      write() {
        applyAnimation(this.svgEl);
      },

      type: ["resize"],
    },

    methods: {
      getSvg() {
        const this$1 = this;

        return loadSVG(this.src).then(function (svg) {
          return parseSVG(svg, this$1.icon) || Promise.reject("SVG not found.");
        });
      },

      applyAttributes(el, ref) {
        const this$1 = this;

        for (const prop in this.$options.props) {
          if (includes(this.include, prop) && prop in this) {
            attr(el, prop, this[prop]);
          }
        }

        for (const attribute in this.attributes) {
          const ref$1 = this.attributes[attribute].split(":", 2);
          const prop$1 = ref$1[0];
          const value = ref$1[1];
          attr(el, prop$1, value);
        }

        if (!this.id) {
          removeAttr(el, "id");
        }

        const props = ["width", "height"];
        let dimensions = props.map(function (prop) {
          return this$1[prop];
        });

        if (
          !dimensions.some(function (val) {
            return val;
          })
        ) {
          dimensions = props.map(function (prop) {
            return attr(ref, prop);
          });
        }

        const viewBox = attr(ref, "viewBox");
        if (
          viewBox &&
          !dimensions.some(function (val) {
            return val;
          })
        ) {
          dimensions = viewBox.split(" ").slice(2);
        }

        dimensions.forEach(function (val, i) {
          return attr(el, props[i], toFloat(val) * this$1.ratio || null);
        });
      },
    },
  };

  var loadSVG = memoize(function (src) {
    return new Promise(function (resolve, reject) {
      if (!src) {
        reject();
        return;
      }

      if (startsWith(src, "data:")) {
        resolve(decodeURIComponent(src.split(",")[1]));
      } else {
        ajax(src).then(
          function (xhr) {
            return resolve(xhr.response);
          },
          function () {
            return reject("SVG not found.");
          }
        );
      }
    });
  });

  function parseSVG(svg, icon) {
    if (icon && includes(svg, "<symbol")) {
      svg = parseSymbols(svg, icon) || svg;
    }

    svg = $(svg.substr(svg.indexOf("<svg")));
    return svg && svg.hasChildNodes() && svg;
  }

  const symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
  const symbols = {};

  function parseSymbols(svg, icon) {
    if (!symbols[svg]) {
      symbols[svg] = {};

      symbolRe.lastIndex = 0;

      let match;
      while ((match = symbolRe.exec(svg))) {
        symbols[svg][match[3]] =
          '<svg xmlns="http://www.w3.org/2000/svg"' + match[1] + "svg>";
      }
    }

    return symbols[svg][icon];
  }

  function applyAnimation(el) {
    const length = getMaxPathLength(el);

    if (length) {
      el.style.setProperty("--mod-animation-stroke", length);
    }
  }

  function getMaxPathLength(el) {
    return Math.ceil(
      Math.max.apply(
        Math,
        [0].concat(
          $$("[stroke]", el).map(function (stroke) {
            try {
              return stroke.getTotalLength();
            } catch (e) {
              return 0;
            }
          })
        )
      )
    );
  }

  function insertSVG(el, root) {
    if (isVoidElement(root) || root.tagName === "CANVAS") {
      root.hidden = true;

      const next = root.nextElementSibling;
      return equals(el, next) ? next : after(root, el);
    }

    const last = root.lastElementChild;
    return equals(el, last) ? last : append(root, el);
  }

  function equals(el, other) {
    return isSVG(el) && isSVG(other) && innerHTML(el) === innerHTML(other);
  }

  function isSVG(el) {
    return el && el.tagName === "svg";
  }

  function innerHTML(el) {
    return (
      el.innerHTML ||
      new XMLSerializer()
        .serializeToString(el)
        .replace(/<svg.*?>(.*?)<\/svg>/g, "$1")
    ).replace(/\s/g, "");
  }

  const Switcher = {
    mixins: [Togglable],

    args: "connect",

    props: {
      connect: String,
      toggle: String,
      active: Number,
      swiping: Boolean,
    },

    data: {
      connect: "~.mod-switcher",
      toggle: "> * > :first-child",
      active: 0,
      swiping: true,
      cls: "mod-active",
      attrItem: "mod-switcher-item",
    },

    computed: {
      connects: {
        get(ref, $el) {
          const { connect } = ref;

          return queryAll(connect, $el);
        },

        watch(connects) {
          const this$1 = this;

          if (this.swiping) {
            css(connects, "touch-action", "pan-y pinch-zoom");
          }

          const index = this.index();
          this.connects.forEach(function (el) {
            return children(el).forEach(function (child, i) {
              return toggleClass(child, this$1.cls, i === index);
            });
          });
        },

        immediate: true,
      },

      toggles: {
        get(ref, $el) {
          const { toggle } = ref;

          return $$(toggle, $el).filter(function (el) {
            return !matches(el, ".mod-disabled *, .mod-disabled, [disabled]");
          });
        },

        watch(toggles) {
          const active = this.index();
          this.show(~active ? active : toggles[this.active] || toggles[0]);
        },

        immediate: true,
      },

      children() {
        const this$1 = this;

        return children(this.$el).filter(function (child) {
          return this$1.toggles.some(function (toggle) {
            return within(toggle, child);
          });
        });
      },
    },

    events: [
      {
        name: "click",

        delegate() {
          return this.toggle;
        },

        handler(e) {
          e.preventDefault();
          this.show(e.current);
        },
      },

      {
        name: "click",

        el() {
          return this.connects;
        },

        delegate() {
          return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
        },

        handler(e) {
          e.preventDefault();
          this.show(data(e.current, this.attrItem));
        },
      },

      {
        name: "swipeRight swipeLeft",

        filter() {
          return this.swiping;
        },

        el() {
          return this.connects;
        },

        handler(ref) {
          const { type } = ref;

          this.show(endsWith(type, "Left") ? "next" : "previous");
        },
      },
    ],

    methods: {
      index() {
        const this$1 = this;

        return findIndex(this.children, function (el) {
          return hasClass(el, this$1.cls);
        });
      },

      show(item) {
        const this$1 = this;

        const prev = this.index();
        const next = getIndex(
          this.children[getIndex(item, this.toggles, prev)],
          children(this.$el)
        );

        if (prev === next) {
          return;
        }

        this.children.forEach(function (child, i) {
          toggleClass(child, this$1.cls, next === i);
          attr(this$1.toggles[i], "aria-expanded", next === i);
        });

        this.connects.forEach(function (ref) {
          const { children } = ref;

          return this$1
            .toggleElement(
              toNodes(children).filter(function (child) {
                return hasClass(child, this$1.cls);
              }),
              false,
              prev >= 0
            )
            .then(function () {
              return this$1.toggleElement(children[next], true, prev >= 0);
            });
        });
      },
    },
  };

  const tab = {
    mixins: [Class],

    extends: Switcher,

    props: {
      media: Boolean,
    },

    data: {
      media: 960,
      attrItem: "mod-tab-item",
    },

    connected() {
      const cls = hasClass(this.$el, "mod-tab-left")
        ? "mod-tab-left"
        : hasClass(this.$el, "mod-tab-right")
        ? "mod-tab-right"
        : false;

      if (cls) {
        this.$create("toggle", this.$el, {
          cls,
          mode: "media",
          media: this.media,
        });
      }
    },
  };

  const toggle = {
    mixins: [Media, Togglable],

    args: "target",

    props: {
      href: String,
      target: null,
      mode: "list",
      queued: Boolean,
    },

    data: {
      href: false,
      target: false,
      mode: "click",
      queued: true,
    },

    computed: {
      target: {
        get(ref, $el) {
          const { href } = ref;
          let { target } = ref;

          target = queryAll(target || href, $el);
          return (target.length && target) || [$el];
        },

        watch() {
          this.updateAria();
        },

        immediate: true,
      },
    },

    events: [
      {
        name: pointerEnter + " " + pointerLeave,

        filter() {
          return includes(this.mode, "hover");
        },

        handler(e) {
          if (!isTouch(e)) {
            this.toggle("toggle" + (e.type === pointerEnter ? "show" : "hide"));
          }
        },
      },

      {
        name: "click",

        filter() {
          return (
            includes(this.mode, "click") ||
            (hasTouch && includes(this.mode, "hover"))
          );
        },

        handler(e) {
          let link;
          if (
            closest(e.target, 'a[href="#"], a[href=""]') ||
            ((link = closest(e.target, "a[href]")) &&
              (!isToggled(this.target, this.cls) ||
                (link.hash && matches(this.target, link.hash))))
          ) {
            e.preventDefault();
          }

          this.toggle();
        },
      },

      {
        name: "toggled",

        self: true,

        el() {
          return this.target;
        },

        handler(e, toggled) {
          this.updateAria(toggled);
        },
      },
    ],

    update: {
      read() {
        return includes(this.mode, "media") && this.media
          ? { match: this.matchMedia }
          : false;
      },

      write(ref) {
        const { match } = ref;

        const toggled = this.isToggled(this.target);
        if (match ? !toggled : toggled) {
          this.toggle();
        }
      },

      events: ["resize"],
    },

    methods: {
      toggle(type) {
        const this$1 = this;

        if (!trigger(this.target, type || "toggle", [this])) {
          return;
        }

        if (!this.queued) {
          return this.toggleElement(this.target);
        }

        const leaving = this.target.filter(function (el) {
          return hasClass(el, this$1.clsLeave);
        });

        if (leaving.length) {
          this.target.forEach(function (el) {
            const isLeaving = includes(leaving, el);
            this$1.toggleElement(el, isLeaving, isLeaving);
          });
          return;
        }

        const toggled = this.target.filter(this.isToggled);
        this.toggleElement(toggled, false).then(function () {
          return this$1.toggleElement(
            this$1.target.filter(function (el) {
              return !includes(toggled, el);
            }),
            true
          );
        });
      },

      updateAria(toggled) {
        attr(
          this.$el,
          "aria-expanded",
          isBoolean(toggled) ? toggled : isToggled(this.target, this.cls)
        );
      },
    },
  };

  // TODO improve isToggled handling
  function isToggled(target, cls) {
    return cls ? hasClass(target, cls.split(" ")[0]) : isVisible(target);
  }

  const closeIcon =
    '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"/><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"/></svg>';

  const closeLarge =
    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.4" x1="1" y1="1" x2="19" y2="19"/><line fill="none" stroke="#000" stroke-width="1.4" x1="19" y1="1" x2="1" y2="19"/></svg>';

  const marker =
    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="4" width="1" height="11"/><rect x="4" y="9" width="11" height="1"/></svg>';

  const navbarToggleIcon =
    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect y="9" width="20" height="2"/><rect y="3" width="20" height="2"/><rect y="15" width="20" height="2"/></svg>';

  const overlayIcon =
    '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="0" width="1" height="40"/><rect x="0" y="19" width="40" height="1"/></svg>';

  const paginationNext =
    '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 1 6 6 1 11"/></svg>';

  const paginationPrevious =
    '<svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="6 1 1 6 6 11"/></svg>';

  const searchIcon =
    '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="9" cy="9" r="7"/><path fill="none" stroke="#000" stroke-width="1.1" d="M14,14 L18,18 L14,14 Z"/></svg>';

  const searchLarge =
    '<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.8" cx="17.5" cy="17.5" r="16.5"/><line fill="none" stroke="#000" stroke-width="1.8" x1="38" y1="39" x2="29" y2="30"/></svg>';

  const searchNavbar =
    '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" stroke-width="1.1" cx="10.5" cy="10.5" r="9.5"/><line fill="none" stroke="#000" stroke-width="1.1" x1="23" y1="23" x2="17" y2="17"/></svg>';

  const slidenavNext =
    '<svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "/></svg>';

  const slidenavNextLarge =
    '<svg width="25" height="40" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="4.002,38.547 22.527,20.024 4,1.5 "/></svg>';

  const slidenavPrevious =
    '<svg width="14" height="24" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "/></svg>';

  const slidenavPreviousLarge =
    '<svg width="25" height="40" viewBox="0 0 25 40" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="2" points="20.527,1.5 2,20.024 20.525,38.547 "/></svg>';

  const spinner =
    '<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><circle fill="none" stroke="#000" cx="15" cy="15" r="14"/></svg>';

  const totop =
    '<svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#000" stroke-width="1.2" points="1 9 9 1 17 9 "/></svg>';

  const icons = {
    spinner,
    totop,
    marker,
    "close-icon": closeIcon,
    "close-large": closeLarge,
    "navbar-toggle-icon": navbarToggleIcon,
    "overlay-icon": overlayIcon,
    "pagination-next": paginationNext,
    "pagination-previous": paginationPrevious,
    "search-icon": searchIcon,
    "search-large": searchLarge,
    "search-navbar": searchNavbar,
    "slidenav-next": slidenavNext,
    "slidenav-next-large": slidenavNextLarge,
    "slidenav-previous": slidenavPrevious,
    "slidenav-previous-large": slidenavPreviousLarge,
  };

  const Icon = {
    install: install$1,

    extends: SVG,

    args: "icon",

    props: ["icon"],

    data: {
      include: ["focusable"],
    },

    isIcon: true,

    beforeConnect() {
      addClass(this.$el, "mod-icon");
    },

    methods: {
      getSvg() {
        const icon = getIcon(this.icon);

        if (!icon) {
          return Promise.reject("Icon not found.");
        }

        return Promise.resolve(icon);
      },
    },
  };

  const IconComponent = {
    args: false,

    extends: Icon,

    data(vm) {
      return {
        icon: hyphenate(vm.constructor.options.name),
      };
    },

    beforeConnect() {
      addClass(this.$el, this.$name);
    },
  };

  const Slidenav = {
    extends: IconComponent,

    beforeConnect() {
      addClass(this.$el, "mod-slidenav");
    },

    computed: {
      icon(ref, $el) {
        const { icon } = ref;

        return hasClass($el, "mod-slidenav-large") ? icon + "-large" : icon;
      },
    },
  };

  const Search = {
    extends: IconComponent,

    computed: {
      icon(ref, $el) {
        const { icon } = ref;

        return hasClass($el, "mod-search-icon") &&
          parents($el, ".mod-search-large").length
          ? "search-large"
          : parents($el, ".mod-search-navbar").length
          ? "search-navbar"
          : icon;
      },
    },
  };

  const Close = {
    extends: IconComponent,

    computed: {
      icon() {
        return (
          "close-" + (hasClass(this.$el, "mod-close-large") ? "large" : "icon")
        );
      },
    },
  };

  const Spinner = {
    extends: IconComponent,

    connected() {
      const this$1 = this;

      this.svg.then(function (svg) {
        return (
          svg &&
          this$1.ratio !== 1 &&
          css($("circle", svg), "strokeWidth", 1 / this$1.ratio)
        );
      });
    },
  };

  const parsed = {};
  function install$1(UIkit) {
    UIkit.icon.add = function (name, svg) {
      let obj;

      const added = isString(name)
        ? ((obj = {}), (obj[name] = svg), obj)
        : name;
      each(added, function (svg, name) {
        icons[name] = svg;
        delete parsed[name];
      });

      if (UIkit._initialized) {
        apply(document.body, function (el) {
          return each(UIkit.getComponents(el), function (cmp) {
            cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
          });
        });
      }
    };
  }

  function getIcon(icon) {
    if (!icons[icon]) {
      return null;
    }

    if (!parsed[icon]) {
      parsed[icon] = $((icons[applyRtl(icon)] || icons[icon]).trim());
    }

    return parsed[icon].cloneNode(true);
  }

  function applyRtl(icon) {
    return isRtl ? swap(swap(icon, "left", "right"), "previous", "next") : icon;
  }

  const components = /* #__PURE__*/ Object.freeze({
    __proto__: null,
    Accordion: accordion,
    Alert: alert,
    Cover: cover,
    Drop: drop,
    Dropdown: drop,
    FormCustom: formCustom,
    Gif: gif,
    Grid: grid,
    HeightMatch: heightMatch,
    HeightViewport: heightViewport,
    Img: img,
    Margin,
    Modal: modal,
    Offcanvas: offcanvas,
    OverflowAuto: overflowAuto,
    Responsive: responsive,
    Scroll: scroll,
    Scrollspy: scrollspy,
    ScrollspyNav: scrollspyNav,
    Sticky: sticky,
    Svg: SVG,
    Switcher,
    Tab: tab,
    Toggle: toggle,
    Video,
    Close,
    Spinner,
    SlidenavNext: Slidenav,
    SlidenavPrevious: Slidenav,
    SearchIcon: Search,
    Marker: IconComponent,
    NavbarToggleIcon: IconComponent,
    OverlayIcon: IconComponent,
    PaginationNext: IconComponent,
    PaginationPrevious: IconComponent,
    Totop: IconComponent,
  });

  // register components
  each(components, function (component, name) {
    return UIkit.component(name, component);
  });

  // core functionality
  // UIkit.use(Core);

  boot(UIkit);

  const countdown = {
    mixins: [Class],

    props: {
      date: String,
      clsWrapper: String,
    },

    data: {
      date: "",
      clsWrapper: ".mod-countdown-%unit%",
    },

    computed: {
      date(ref) {
        const { date } = ref;

        return Date.parse(date);
      },

      days(ref, $el) {
        const { clsWrapper } = ref;

        return $(clsWrapper.replace("%unit%", "days"), $el);
      },

      hours(ref, $el) {
        const { clsWrapper } = ref;

        return $(clsWrapper.replace("%unit%", "hours"), $el);
      },

      minutes(ref, $el) {
        const { clsWrapper } = ref;

        return $(clsWrapper.replace("%unit%", "minutes"), $el);
      },

      seconds(ref, $el) {
        const { clsWrapper } = ref;

        return $(clsWrapper.replace("%unit%", "seconds"), $el);
      },

      units() {
        const this$1 = this;

        return ["days", "hours", "minutes", "seconds"].filter(function (unit) {
          return this$1[unit];
        });
      },
    },

    connected() {
      this.start();
    },

    disconnected() {
      const this$1 = this;

      this.stop();
      this.units.forEach(function (unit) {
        return empty(this$1[unit]);
      });
    },

    events: [
      {
        name: "visibilitychange",

        el() {
          return document;
        },

        handler() {
          if (document.hidden) {
            this.stop();
          } else {
            this.start();
          }
        },
      },
    ],

    update: {
      write() {
        const this$1 = this;

        const timespan = getTimeSpan(this.date);

        if (timespan.total <= 0) {
          this.stop();

          timespan.days = timespan.hours = timespan.minutes = timespan.seconds = 0;
        }

        this.units.forEach(function (unit) {
          let digits = String(Math.floor(timespan[unit]));

          digits = digits.length < 2 ? "0" + digits : digits;

          const el = this$1[unit];
          if (el.textContent !== digits) {
            digits = digits.split("");

            if (digits.length !== el.children.length) {
              html(
                el,
                digits
                  .map(function () {
                    return "<span></span>";
                  })
                  .join("")
              );
            }

            digits.forEach(function (digit, i) {
              return (el.children[i].textContent = digit);
            });
          }
        });
      },
    },

    methods: {
      start() {
        this.stop();

        if (this.date && this.units.length) {
          this.$update();
          this.timer = setInterval(this.$update, 1000);
        }
      },

      stop() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
    },
  };

  function getTimeSpan(date) {
    const total = date - Date.now();

    return {
      total,
      seconds: (total / 1000) % 60,
      minutes: (total / 1000 / 60) % 60,
      hours: (total / 1000 / 60 / 60) % 24,
      days: total / 1000 / 60 / 60 / 24,
    };
  }

  const clsLeave = "mod-transition-leave";
  const clsEnter = "mod-transition-enter";

  function fade(action, target, duration, stagger) {
    if (stagger === void 0) stagger = 0;

    const index = transitionIndex(target, true);
    const propsIn = { opacity: 1 };
    const propsOut = { opacity: 0 };

    const wrapIndexFn = function (fn) {
      return function () {
        return index === transitionIndex(target) ? fn() : Promise.reject();
      };
    };

    const leaveFn = wrapIndexFn(function () {
      addClass(target, clsLeave);

      return Promise.all(
        getTransitionNodes(target).map(function (child, i) {
          return new Promise(function (resolve) {
            return setTimeout(function () {
              return Transition.start(
                child,
                propsOut,
                duration / 2,
                "ease"
              ).then(resolve);
            }, i * stagger);
          });
        })
      ).then(function () {
        return removeClass(target, clsLeave);
      });
    });

    const enterFn = wrapIndexFn(function () {
      const oldHeight = height(target);

      addClass(target, clsEnter);
      action();

      css(children(target), { opacity: 0 });

      // Ensure UIkit updates have propagated
      return new Promise(function (resolve) {
        return requestAnimationFrame(function () {
          const nodes = children(target);
          const newHeight = height(target);

          // Ensure Grid cells do not stretch when height is applied
          css(target, "alignContent", "flex-start");
          height(target, oldHeight);

          const transitionNodes = getTransitionNodes(target);
          css(nodes, propsOut);

          const transitions = transitionNodes.map(function (child, i) {
            return new Promise(function (resolve) {
              return setTimeout(function () {
                return Transition.start(
                  child,
                  propsIn,
                  duration / 2,
                  "ease"
                ).then(resolve);
              }, i * stagger);
            });
          });

          if (oldHeight !== newHeight) {
            transitions.push(
              Transition.start(
                target,
                { height: newHeight },
                duration / 2 + transitionNodes.length * stagger,
                "ease"
              )
            );
          }

          Promise.all(transitions).then(function () {
            removeClass(target, clsEnter);
            if (index === transitionIndex(target)) {
              css(target, { height: "", alignContent: "" });
              css(nodes, { opacity: "" });
              delete target.dataset.transition;
            }
            resolve();
          });
        });
      });
    });

    return hasClass(target, clsLeave)
      ? waitTransitionend(target).then(enterFn)
      : hasClass(target, clsEnter)
      ? waitTransitionend(target).then(leaveFn).then(enterFn)
      : leaveFn().then(enterFn);
  }

  function transitionIndex(target, next) {
    if (next) {
      target.dataset.transition = 1 + transitionIndex(target);
    }

    return toNumber(target.dataset.transition) || 0;
  }

  function waitTransitionend(target) {
    return Promise.all(
      children(target)
        .filter(Transition.inProgress)
        .map(function (el) {
          return new Promise(function (resolve) {
            return once(el, "transitionend transitioncanceled", resolve);
          });
        })
    );
  }

  function getTransitionNodes(target) {
    return getRows(children(target)).reduce(function (nodes, row) {
      return nodes.concat(
        sortBy(
          row.filter(function (el) {
            return isInView(el);
          }),
          "offsetLeft"
        )
      );
    }, []);
  }

  function slide(action, target, duration) {
    return new Promise(function (resolve) {
      return requestAnimationFrame(function () {
        let nodes = children(target);

        // Get current state
        const currentProps = nodes.map(function (el) {
          return getProps(el, true);
        });
        const targetProps = css(target, ["height", "padding"]);

        // Cancel previous animations
        Transition.cancel(target);
        nodes.forEach(Transition.cancel);
        reset(target);

        // Adding, sorting, removing nodes
        action();

        // Find new nodes
        nodes = nodes.concat(
          children(target).filter(function (el) {
            return !includes(nodes, el);
          })
        );

        // Wait for update to propagate
        Promise.resolve().then(function () {
          // Force update
          fastdom.flush();

          // Get new state
          const targetPropsTo = css(target, ["height", "padding"]);
          const ref = getTransitionProps(target, nodes, currentProps);
          const propsTo = ref[0];
          const propsFrom = ref[1];

          // Reset to previous state
          nodes.forEach(function (el, i) {
            return propsFrom[i] && css(el, propsFrom[i]);
          });
          css(target, assign({ display: "block" }, targetProps));

          // Start transitions on next frame
          requestAnimationFrame(function () {
            const transitions = nodes
              .map(function (el, i) {
                return (
                  parent(el) === target &&
                  Transition.start(el, propsTo[i], duration, "ease")
                );
              })
              .concat(
                Transition.start(target, targetPropsTo, duration, "ease")
              );

            Promise.all(transitions)
              .then(function () {
                nodes.forEach(function (el, i) {
                  return (
                    parent(el) === target &&
                    css(el, "display", propsTo[i].opacity === 0 ? "none" : "")
                  );
                });
                reset(target);
              }, noop)
              .then(resolve);
          });
        });
      });
    });
  }

  function getProps(el, opacity) {
    const zIndex = css(el, "zIndex");

    return isVisible(el)
      ? assign(
          {
            display: "",
            opacity: opacity ? css(el, "opacity") : "0",
            pointerEvents: "none",
            position: "absolute",
            zIndex: zIndex === "auto" ? index(el) : zIndex,
          },
          getPositionWithMargin(el)
        )
      : false;
  }

  function getTransitionProps(target, nodes, currentProps) {
    const propsTo = nodes.map(function (el, i) {
      return parent(el) && i in currentProps
        ? currentProps[i]
          ? isVisible(el)
            ? getPositionWithMargin(el)
            : { opacity: 0 }
          : { opacity: isVisible(el) ? 1 : 0 }
        : false;
    });

    const propsFrom = propsTo.map(function (props, i) {
      const from =
        parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));

      if (!from) {
        return false;
      }

      if (!props) {
        delete from.opacity;
      } else if (!("opacity" in props)) {
        const { opacity } = from;

        if (opacity % 1) {
          props.opacity = 1;
        } else {
          delete from.opacity;
        }
      }

      return from;
    });

    return [propsTo, propsFrom];
  }

  function reset(el) {
    css(el.children, {
      height: "",
      left: "",
      opacity: "",
      pointerEvents: "",
      position: "",
      top: "",
      marginTop: "",
      marginLeft: "",
      transform: "",
      width: "",
      zIndex: "",
    });
    css(el, { height: "", display: "", padding: "" });
  }

  function getPositionWithMargin(el) {
    const ref = offset(el);
    const { height } = ref;
    const { width } = ref;
    const ref$1 = position(el);
    const { top } = ref$1;
    const { left } = ref$1;
    const ref$2 = css(el, ["marginTop", "marginLeft"]);
    const { marginLeft } = ref$2;
    const { marginTop } = ref$2;

    return { top, left, height, width, marginLeft, marginTop, transform: "" };
  }

  const Animate = {
    props: {
      duration: Number,
      animation: Boolean,
    },

    data: {
      duration: 150,
      animation: "slide",
    },

    methods: {
      animate(action, target) {
        const this$1 = this;
        if (target === void 0) target = this.$el;

        const name = this.animation;
        const animationFn =
          name === "fade"
            ? fade
            : name === "delayed-fade"
            ? function () {
                let args = [],
                  len = arguments.length;
                while (len--) args[len] = arguments[len];

                return fade.apply(void 0, args.concat([40]));
              }
            : slide;

        return animationFn(action, target, this.duration).then(function () {
          return this$1.$update(target, "resize");
        }, noop);
      },
    },
  };

  const filter$1 = {
    mixins: [Animate],

    args: "target",

    props: {
      target: Boolean,
      selActive: Boolean,
    },

    data: {
      target: null,
      selActive: false,
      attrItem: "mod-filter-control",
      cls: "mod-active",
      duration: 250,
    },

    computed: {
      toggles: {
        get(ref, $el) {
          const { attrItem } = ref;

          return $$("[" + attrItem + "],[data-" + attrItem + "]", $el);
        },

        watch() {
          const this$1 = this;

          this.updateState();

          if (this.selActive !== false) {
            const actives = $$(this.selActive, this.$el);
            this.toggles.forEach(function (el) {
              return toggleClass(el, this$1.cls, includes(actives, el));
            });
          }
        },

        immediate: true,
      },

      children: {
        get(ref, $el) {
          const { target } = ref;

          return $$(target + " > *", $el);
        },

        watch(list, old) {
          if (old && !isEqualList(list, old)) {
            this.updateState();
          }
        },

        immediate: true,
      },
    },

    events: [
      {
        name: "click",

        delegate() {
          return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
        },

        handler(e) {
          e.preventDefault();
          this.apply(e.current);
        },
      },
    ],

    methods: {
      apply(el) {
        const prevState = this.getState();
        const newState = mergeState(el, this.attrItem, this.getState());

        if (!isEqualState(prevState, newState)) {
          this.setState(newState);
        }
      },

      getState() {
        const this$1 = this;

        return this.toggles
          .filter(function (item) {
            return hasClass(item, this$1.cls);
          })
          .reduce(
            function (state, el) {
              return mergeState(el, this$1.attrItem, state);
            },
            { filter: { "": "" }, sort: [] }
          );
      },

      setState(state, animate) {
        const this$1 = this;
        if (animate === void 0) animate = true;

        state = assign({ filter: { "": "" }, sort: [] }, state);

        trigger(this.$el, "beforeFilter", [this, state]);

        this.toggles.forEach(function (el) {
          return toggleClass(
            el,
            this$1.cls,
            !!matchFilter(el, this$1.attrItem, state)
          );
        });

        Promise.all(
          $$(this.target, this.$el).map(function (target) {
            const filterFn = function () {
              applyState(state, target, children(target));
              this$1.$update(this$1.$el);
            };
            return animate ? this$1.animate(filterFn, target) : filterFn();
          })
        ).then(function () {
          return trigger(this$1.$el, "afterFilter", [this$1]);
        });
      },

      updateState() {
        const this$1 = this;

        fastdom.write(function () {
          return this$1.setState(this$1.getState(), false);
        });
      },
    },
  };

  function getFilter(el, attr) {
    return parseOptions(data(el, attr), ["filter"]);
  }

  function isEqualState(stateA, stateB) {
    return ["filter", "sort"].every(function (prop) {
      return isEqual(stateA[prop], stateB[prop]);
    });
  }

  function applyState(state, target, children) {
    const selector = getSelector(state);

    children.forEach(function (el) {
      return css(
        el,
        "display",
        selector && !matches(el, selector) ? "none" : ""
      );
    });

    const ref = state.sort;
    const sort = ref[0];
    const order = ref[1];

    if (sort) {
      const sorted = sortItems(children, sort, order);
      if (!isEqual(sorted, children)) {
        append(target, sorted);
      }
    }
  }

  function mergeState(el, attr, state) {
    const filterBy = getFilter(el, attr);
    const { filter } = filterBy;
    const { group } = filterBy;
    const { sort } = filterBy;
    let { order } = filterBy;
    if (order === void 0) order = "asc";

    if (filter || isUndefined(sort)) {
      if (group) {
        if (filter) {
          delete state.filter[""];
          state.filter[group] = filter;
        } else {
          delete state.filter[group];

          if (isEmpty(state.filter) || "" in state.filter) {
            state.filter = { "": filter || "" };
          }
        }
      } else {
        state.filter = { "": filter || "" };
      }
    }

    if (!isUndefined(sort)) {
      state.sort = [sort, order];
    }

    return state;
  }

  function matchFilter(el, attr, ref) {
    let stateFilter = ref.filter;
    if (stateFilter === void 0) stateFilter = { "": "" };
    const ref_sort = ref.sort;
    const stateSort = ref_sort[0];
    const stateOrder = ref_sort[1];

    const ref$1 = getFilter(el, attr);
    let { filter } = ref$1;
    if (filter === void 0) filter = "";
    let { group } = ref$1;
    if (group === void 0) group = "";
    const { sort } = ref$1;
    let { order } = ref$1;
    if (order === void 0) order = "asc";

    return isUndefined(sort)
      ? (group in stateFilter && filter === stateFilter[group]) ||
          (!filter && group && !(group in stateFilter) && !stateFilter[""])
      : stateSort === sort && stateOrder === order;
  }

  function isEqualList(listA, listB) {
    return (
      listA.length === listB.length &&
      listA.every(function (el) {
        return ~listB.indexOf(el);
      })
    );
  }

  function getSelector(ref) {
    const { filter } = ref;

    let selector = "";
    each(filter, function (value) {
      return (selector += value || "");
    });
    return selector;
  }

  function sortItems(nodes, sort, order) {
    return assign([], nodes).sort(function (a, b) {
      return (
        data(a, sort).localeCompare(data(b, sort), undefined, {
          numeric: true,
        }) * (order === "asc" || -1)
      );
    });
  }

  const Animations = {
    slide: {
      show(dir) {
        return [
          { transform: translate(dir * -100) },
          { transform: translate() },
        ];
      },

      percent(current) {
        return translated(current);
      },

      translate(percent, dir) {
        return [
          { transform: translate(dir * -100 * percent) },
          { transform: translate(dir * 100 * (1 - percent)) },
        ];
      },
    },
  };

  function translated(el) {
    return Math.abs(css(el, "transform").split(",")[4] / el.offsetWidth) || 0;
  }

  function translate(value, unit) {
    if (value === void 0) value = 0;
    if (unit === void 0) unit = "%";

    value += value ? unit : "";
    return isIE
      ? "translateX(" + value + ")"
      : "translate3d(" + value + ", 0, 0)"; // currently not translate3d in IE, translate3d within translate3d does not work while transitioning
  }

  function scale3d(value) {
    return "scale3d(" + value + ", " + value + ", 1)";
  }

  const Animations$1 = assign({}, Animations, {
    fade: {
      show() {
        return [{ opacity: 0 }, { opacity: 1 }];
      },

      percent(current) {
        return 1 - css(current, "opacity");
      },

      translate(percent) {
        return [{ opacity: 1 - percent }, { opacity: percent }];
      },
    },

    scale: {
      show() {
        return [
          { opacity: 0, transform: scale3d(1 - 0.2) },
          { opacity: 1, transform: scale3d(1) },
        ];
      },

      percent(current) {
        return 1 - css(current, "opacity");
      },

      translate(percent) {
        return [
          { opacity: 1 - percent, transform: scale3d(1 - 0.2 * percent) },
          { opacity: percent, transform: scale3d(1 - 0.2 + 0.2 * percent) },
        ];
      },
    },
  });

  function Transitioner(prev, next, dir, ref) {
    const { animation } = ref;
    const { easing } = ref;

    const { percent } = animation;
    const { translate } = animation;
    let { show } = animation;
    if (show === void 0) show = noop;
    const props = show(dir);
    const deferred = new Deferred();

    return {
      dir,

      show(duration, percent, linear) {
        const this$1 = this;
        if (percent === void 0) percent = 0;

        const timing = linear ? "linear" : easing;
        duration -= Math.round(duration * clamp(percent, -1, 1));

        this.translate(percent);

        triggerUpdate(next, "itemin", { percent, duration, timing, dir });
        triggerUpdate(prev, "itemout", {
          percent: 1 - percent,
          duration,
          timing,
          dir,
        });

        Promise.all([
          Transition.start(next, props[1], duration, timing),
          Transition.start(prev, props[0], duration, timing),
        ]).then(function () {
          this$1.reset();
          deferred.resolve();
        }, noop);

        return deferred.promise;
      },

      cancel() {
        Transition.cancel([next, prev]);
      },

      reset() {
        for (const prop in props[0]) {
          css([next, prev], prop, "");
        }
      },

      forward(duration, percent) {
        if (percent === void 0) percent = this.percent();

        Transition.cancel([next, prev]);
        return this.show(duration, percent, true);
      },

      translate(percent) {
        this.reset();

        const props = translate(percent, dir);
        css(next, props[1]);
        css(prev, props[0]);
        triggerUpdate(next, "itemtranslatein", { percent, dir });
        triggerUpdate(prev, "itemtranslateout", { percent: 1 - percent, dir });
      },

      percent() {
        return percent(prev || next, next, dir);
      },

      getDistance() {
        return prev && prev.offsetWidth;
      },
    };
  }

  function triggerUpdate(el, type, data) {
    trigger(el, createEvent(type, false, false, data));
  }

  const SliderAutoplay = {
    props: {
      autoplay: Boolean,
      autoplayInterval: Number,
      pauseOnHover: Boolean,
    },

    data: {
      autoplay: false,
      autoplayInterval: 7000,
      pauseOnHover: true,
    },

    connected() {
      this.autoplay && this.startAutoplay();
    },

    disconnected() {
      this.stopAutoplay();
    },

    update() {
      attr(this.slides, "tabindex", "-1");
    },

    events: [
      {
        name: "visibilitychange",

        el() {
          return document;
        },

        filter() {
          return this.autoplay;
        },

        handler() {
          if (document.hidden) {
            this.stopAutoplay();
          } else {
            this.startAutoplay();
          }
        },
      },
    ],

    methods: {
      startAutoplay() {
        const this$1 = this;

        this.stopAutoplay();

        this.interval = setInterval(function () {
          return (
            (!this$1.draggable || !$(":focus", this$1.$el)) &&
            (!this$1.pauseOnHover || !matches(this$1.$el, ":hover")) &&
            !this$1.stack.length &&
            this$1.show("next")
          );
        }, this.autoplayInterval);
      },

      stopAutoplay() {
        this.interval && clearInterval(this.interval);
      },
    },
  };

  const SliderDrag = {
    props: {
      draggable: Boolean,
    },

    data: {
      draggable: true,
      threshold: 10,
    },

    created() {
      const this$1 = this;

      ["start", "move", "end"].forEach(function (key) {
        const fn = this$1[key];
        this$1[key] = function (e) {
          const pos = getEventPos(e).x * (isRtl ? -1 : 1);

          this$1.prevPos = pos !== this$1.pos ? this$1.pos : this$1.prevPos;
          this$1.pos = pos;

          fn(e);
        };
      });
    },

    events: [
      {
        name: pointerDown,

        delegate() {
          return this.selSlides;
        },

        handler(e) {
          if (
            !this.draggable ||
            (!isTouch(e) && hasTextNodesOnly(e.target)) ||
            closest(e.target, selInput) ||
            e.button > 0 ||
            this.length < 2
          ) {
            return;
          }

          this.start(e);
        },
      },

      {
        name: "dragstart",

        handler(e) {
          e.preventDefault();
        },
      },
    ],

    methods: {
      start() {
        this.drag = this.pos;

        if (this._transitioner) {
          this.percent = this._transitioner.percent();
          this.drag +=
            this._transitioner.getDistance() * this.percent * this.dir;

          this._transitioner.cancel();
          this._transitioner.translate(this.percent);

          this.dragging = true;

          this.stack = [];
        } else {
          this.prevIndex = this.index;
        }

        on(document, pointerMove, this.move, { passive: false });

        // 'input' event is triggered by video controls
        on(
          document,
          pointerUp + " " + pointerCancel + " input",
          this.end,
          true
        );

        css(this.list, "userSelect", "none");
      },

      move(e) {
        const this$1 = this;

        const distance = this.pos - this.drag;

        if (
          distance === 0 ||
          this.prevPos === this.pos ||
          (!this.dragging && Math.abs(distance) < this.threshold)
        ) {
          return;
        }

        // prevent click event
        css(this.list, "pointerEvents", "none");

        e.cancelable && e.preventDefault();

        this.dragging = true;
        this.dir = distance < 0 ? 1 : -1;

        const ref = this;
        const { slides } = ref;
        const ref$1 = this;
        let { prevIndex } = ref$1;
        let dis = Math.abs(distance);
        let nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
        let width =
          this._getDistance(prevIndex, nextIndex) ||
          slides[prevIndex].offsetWidth;

        while (nextIndex !== prevIndex && dis > width) {
          this.drag -= width * this.dir;

          prevIndex = nextIndex;
          dis -= width;
          nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
          width =
            this._getDistance(prevIndex, nextIndex) ||
            slides[prevIndex].offsetWidth;
        }

        this.percent = dis / width;

        const prev = slides[prevIndex];
        const next = slides[nextIndex];
        const changed = this.index !== nextIndex;
        const edge = prevIndex === nextIndex;

        let itemShown;

        [this.index, this.prevIndex]
          .filter(function (i) {
            return !includes([nextIndex, prevIndex], i);
          })
          .forEach(function (i) {
            trigger(slides[i], "itemhidden", [this$1]);

            if (edge) {
              itemShown = true;
              this$1.prevIndex = prevIndex;
            }
          });

        if (
          (this.index === prevIndex && this.prevIndex !== prevIndex) ||
          itemShown
        ) {
          trigger(slides[this.index], "itemshown", [this]);
        }

        if (changed) {
          this.prevIndex = prevIndex;
          this.index = nextIndex;

          !edge && trigger(prev, "beforeitemhide", [this]);
          trigger(next, "beforeitemshow", [this]);
        }

        this._transitioner = this._translate(
          Math.abs(this.percent),
          prev,
          !edge && next
        );

        if (changed) {
          !edge && trigger(prev, "itemhide", [this]);
          trigger(next, "itemshow", [this]);
        }
      },

      end() {
        off(document, pointerMove, this.move, { passive: false });
        off(
          document,
          pointerUp + " " + pointerCancel + " input",
          this.end,
          true
        );

        if (this.dragging) {
          this.dragging = null;

          if (this.index === this.prevIndex) {
            this.percent = 1 - this.percent;
            this.dir *= -1;
            this._show(false, this.index, true);
            this._transitioner = null;
          } else {
            const dirChange =
              (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 ===
              this.prevPos > this.pos;
            this.index = dirChange ? this.index : this.prevIndex;

            if (dirChange) {
              this.percent = 1 - this.percent;
            }

            this.show(
              (this.dir > 0 && !dirChange) || (this.dir < 0 && dirChange)
                ? "next"
                : "previous",
              true
            );
          }
        }

        css(this.list, { userSelect: "", pointerEvents: "" });

        this.drag = this.percent = null;
      },
    },
  };

  function hasTextNodesOnly(el) {
    return !el.children.length && el.childNodes.length;
  }

  const SliderNav = {
    data: {
      selNav: false,
    },

    computed: {
      nav(ref, $el) {
        const { selNav } = ref;

        return $(selNav, $el);
      },

      selNavItem(ref) {
        const { attrItem } = ref;

        return "[" + attrItem + "],[data-" + attrItem + "]";
      },

      navItems(_, $el) {
        return $$(this.selNavItem, $el);
      },
    },

    update: {
      write() {
        const this$1 = this;

        if (this.nav && this.length !== this.nav.children.length) {
          html(
            this.nav,
            this.slides
              .map(function (_, i) {
                return (
                  "<li " + this$1.attrItem + '="' + i + '"><a href></a></li>'
                );
              })
              .join("")
          );
        }

        this.navItems.concat(this.nav).forEach(function (el) {
          return el && (el.hidden = !this$1.maxIndex);
        });

        this.updateNav();
      },

      events: ["resize"],
    },

    events: [
      {
        name: "click",

        delegate() {
          return this.selNavItem;
        },

        handler(e) {
          e.preventDefault();
          this.show(data(e.current, this.attrItem));
        },
      },

      {
        name: "itemshow",
        handler: "updateNav",
      },
    ],

    methods: {
      updateNav() {
        const this$1 = this;

        const i = this.getValidIndex();
        this.navItems.forEach(function (el) {
          const cmd = data(el, this$1.attrItem);

          toggleClass(el, this$1.clsActive, toNumber(cmd) === i);
          toggleClass(
            el,
            "mod-invisible",
            this$1.finite &&
              ((cmd === "previous" && i === 0) ||
                (cmd === "next" && i >= this$1.maxIndex))
          );
        });
      },
    },
  };

  const Slider = {
    mixins: [SliderAutoplay, SliderDrag, SliderNav],

    props: {
      clsActivated: Boolean,
      easing: String,
      index: Number,
      finite: Boolean,
      velocity: Number,
      selSlides: String,
    },

    data() {
      return {
        easing: "ease",
        finite: false,
        velocity: 1,
        index: 0,
        prevIndex: -1,
        stack: [],
        percent: 0,
        clsActive: "mod-active",
        clsActivated: false,
        Transitioner: false,
        transitionOptions: {},
      };
    },

    connected() {
      this.prevIndex = -1;
      this.index = this.getValidIndex(this.$props.index);
      this.stack = [];
    },

    disconnected() {
      removeClass(this.slides, this.clsActive);
    },

    computed: {
      duration(ref, $el) {
        const { velocity } = ref;

        return speedUp($el.offsetWidth / velocity);
      },

      list(ref, $el) {
        const { selList } = ref;

        return $(selList, $el);
      },

      maxIndex() {
        return this.length - 1;
      },

      selSlides(ref) {
        const { selList } = ref;
        const { selSlides } = ref;

        return selList + " " + (selSlides || "> *");
      },

      slides: {
        get() {
          return $$(this.selSlides, this.$el);
        },

        watch() {
          this.$reset();
        },
      },

      length() {
        return this.slides.length;
      },
    },

    events: {
      itemshown() {
        this.$update(this.list);
      },
    },

    methods: {
      show(index, force) {
        const this$1 = this;
        if (force === void 0) force = false;

        if (this.dragging || !this.length) {
          return;
        }

        const ref = this;
        const { stack } = ref;
        const queueIndex = force ? 0 : stack.length;
        const reset = function () {
          stack.splice(queueIndex, 1);

          if (stack.length) {
            this$1.show(stack.shift(), true);
          }
        };

        stack[force ? "unshift" : "push"](index);

        if (!force && stack.length > 1) {
          if (stack.length === 2) {
            this._transitioner.forward(Math.min(this.duration, 200));
          }

          return;
        }

        const prevIndex = this.getIndex(this.index);
        const prev =
          hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
        const nextIndex = this.getIndex(index, this.index);
        const next = this.slides[nextIndex];

        if (prev === next) {
          reset();
          return;
        }

        this.dir = getDirection(index, prevIndex);
        this.prevIndex = prevIndex;
        this.index = nextIndex;

        if (
          (prev && !trigger(prev, "beforeitemhide", [this])) ||
          !trigger(next, "beforeitemshow", [this, prev])
        ) {
          this.index = this.prevIndex;
          reset();
          return;
        }

        const promise = this._show(prev, next, force).then(function () {
          prev && trigger(prev, "itemhidden", [this$1]);
          trigger(next, "itemshown", [this$1]);

          return new Promise(function (resolve) {
            fastdom.write(function () {
              stack.shift();
              if (stack.length) {
                this$1.show(stack.shift(), true);
              } else {
                this$1._transitioner = null;
              }
              resolve();
            });
          });
        });

        prev && trigger(prev, "itemhide", [this]);
        trigger(next, "itemshow", [this]);

        return promise;
      },

      getIndex(index, prev) {
        if (index === void 0) index = this.index;
        if (prev === void 0) prev = this.index;

        return clamp(
          getIndex(index, this.slides, prev, this.finite),
          0,
          this.maxIndex
        );
      },

      getValidIndex(index, prevIndex) {
        if (index === void 0) index = this.index;
        if (prevIndex === void 0) prevIndex = this.prevIndex;

        return this.getIndex(index, prevIndex);
      },

      _show(prev, next, force) {
        this._transitioner = this._getTransitioner(
          prev,
          next,
          this.dir,
          assign(
            {
              easing: force
                ? next.offsetWidth < 600
                  ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" /* easeOutQuad */
                  : "cubic-bezier(0.165, 0.84, 0.44, 1)" /* easeOutQuart */
                : this.easing,
            },
            this.transitionOptions
          )
        );

        if (!force && !prev) {
          this._translate(1);
          return Promise.resolve();
        }

        const ref = this.stack;
        const { length } = ref;
        return this._transitioner[length > 1 ? "forward" : "show"](
          length > 1
            ? Math.min(this.duration, 75 + 75 / (length - 1))
            : this.duration,
          this.percent
        );
      },

      _getDistance(prev, next) {
        return this._getTransitioner(prev, prev !== next && next).getDistance();
      },

      _translate(percent, prev, next) {
        if (prev === void 0) prev = this.prevIndex;
        if (next === void 0) next = this.index;

        const transitioner = this._getTransitioner(
          prev !== next ? prev : false,
          next
        );
        transitioner.translate(percent);
        return transitioner;
      },

      _getTransitioner(prev, next, dir, options) {
        if (prev === void 0) prev = this.prevIndex;
        if (next === void 0) next = this.index;
        if (dir === void 0) dir = this.dir || 1;
        if (options === void 0) options = this.transitionOptions;

        return new this.Transitioner(
          isNumber(prev) ? this.slides[prev] : prev,
          isNumber(next) ? this.slides[next] : next,
          dir * (isRtl ? -1 : 1),
          options
        );
      },
    },
  };

  function getDirection(index, prevIndex) {
    return index === "next"
      ? 1
      : index === "previous"
      ? -1
      : index < prevIndex
      ? -1
      : 1;
  }

  function speedUp(x) {
    return 0.5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
  }

  const Slideshow = {
    mixins: [Slider],

    props: {
      animation: String,
    },

    data: {
      animation: "slide",
      clsActivated: "mod-transition-active",
      Animations,
      Transitioner,
    },

    computed: {
      animation(ref) {
        const { animation } = ref;
        const { Animations } = ref;

        return assign(Animations[animation] || Animations.slide, {
          name: animation,
        });
      },

      transitionOptions() {
        return { animation: this.animation };
      },
    },

    events: {
      "itemshow itemhide itemshown itemhidden"(ref) {
        const { target } = ref;

        this.$update(target);
      },

      beforeitemshow(ref) {
        const { target } = ref;

        addClass(target, this.clsActive);
      },

      itemshown(ref) {
        const { target } = ref;

        addClass(target, this.clsActivated);
      },

      itemhidden(ref) {
        const { target } = ref;

        removeClass(target, this.clsActive, this.clsActivated);
      },
    },
  };

  const LightboxPanel = {
    mixins: [Container, Modal, Togglable, Slideshow],

    functional: true,

    props: {
      delayControls: Number,
      preload: Number,
      videoAutoplay: Boolean,
      template: String,
    },

    data() {
      return {
        preload: 1,
        videoAutoplay: false,
        delayControls: 3000,
        items: [],
        cls: "mod-open",
        clsPage: "mod-lightbox-page",
        selList: ".mod-lightbox-items",
        attrItem: "mod-lightbox-item",
        selClose: ".mod-close-large",
        selCaption: ".mod-lightbox-caption",
        pauseOnHover: false,
        velocity: 2,
        Animations: Animations$1,
        template:
          '<div class="mod-lightbox mod-overflow-hidden"> <ul class="mod-lightbox-items"></ul> <div class="mod-lightbox-toolbar mod-position-top mod-text-right mod-transition-slide-top mod-transition-opaque"> <button class="mod-lightbox-toolbar-icon mod-close-large" type="button" mod-close></button> </div> <a class="mod-lightbox-button mod-position-center-left mod-position-medium mod-transition-fade" href mod-slidenav-previous mod-lightbox-item="previous"></a> <a class="mod-lightbox-button mod-position-center-right mod-position-medium mod-transition-fade" href mod-slidenav-next mod-lightbox-item="next"></a> <div class="mod-lightbox-toolbar mod-lightbox-caption mod-position-bottom mod-text-center mod-transition-slide-bottom mod-transition-opaque"></div> </div>',
      };
    },

    created() {
      const $el = $(this.template);
      const list = $(this.selList, $el);
      this.items.forEach(function () {
        return append(list, "<li>");
      });

      this.$mount(append(this.container, $el));
    },

    computed: {
      caption(ref, $el) {
        const { selCaption } = ref;

        return $(selCaption, $el);
      },
    },

    events: [
      {
        name: pointerMove + " " + pointerDown + " keydown",

        handler: "showControls",
      },

      {
        name: "click",

        self: true,

        delegate() {
          return this.selSlides;
        },

        handler(e) {
          if (e.defaultPrevented) {
            return;
          }

          this.hide();
        },
      },

      {
        name: "shown",

        self: true,

        handler() {
          this.showControls();
        },
      },

      {
        name: "hide",

        self: true,

        handler() {
          this.hideControls();

          removeClass(this.slides, this.clsActive);
          Transition.stop(this.slides);
        },
      },

      {
        name: "hidden",

        self: true,

        handler() {
          this.$destroy(true);
        },
      },

      {
        name: "keyup",

        el() {
          return document;
        },

        handler(e) {
          if (!this.isToggled(this.$el) || !this.draggable) {
            return;
          }

          switch (e.keyCode) {
            case 37:
              this.show("previous");
              break;
            case 39:
              this.show("next");
              break;
          }
        },
      },

      {
        name: "beforeitemshow",

        handler(e) {
          if (this.isToggled()) {
            return;
          }

          this.draggable = false;

          e.preventDefault();

          this.toggleElement(this.$el, true, false);

          this.animation = Animations$1["scale"];
          removeClass(e.target, this.clsActive);
          this.stack.splice(1, 0, this.index);
        },
      },

      {
        name: "itemshow",

        handler() {
          html(this.caption, this.getItem().caption || "");

          for (let j = -this.preload; j <= this.preload; j++) {
            this.loadItem(this.index + j);
          }
        },
      },

      {
        name: "itemshown",

        handler() {
          this.draggable = this.$props.draggable;
        },
      },

      {
        name: "itemload",

        handler(_, item) {
          const this$1 = this;

          const src = item.source;
          const { type } = item;
          let { alt } = item;
          if (alt === void 0) alt = "";
          const { poster } = item;
          let { attrs } = item;
          if (attrs === void 0) attrs = {};

          this.setItem(item, "<span mod-spinner></span>");

          if (!src) {
            return;
          }

          let matches;
          const iframeAttrs = {
            frameborder: "0",
            allow: "autoplay",
            allowfullscreen: "",
            style: "max-width: 100%; box-sizing: border-box;",
            "mod-responsive": "",
            "mod-video": "" + this.videoAutoplay,
          };

          // Image
          if (
            type === "image" ||
            src.match(/\.(avif|jpe?g|a?png|gif|svg|webp)($|\?)/i)
          ) {
            getImage(src, attrs.srcset, attrs.size).then(
              function (ref) {
                const { width } = ref;
                const { height } = ref;

                return this$1.setItem(
                  item,
                  createEl("img", assign({ src, width, height, alt }, attrs))
                );
              },
              function () {
                return this$1.setError(item);
              }
            );

            // Video
          } else if (type === "video" || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
            const video = createEl(
              "video",
              assign(
                {
                  src,
                  poster,
                  controls: "",
                  playsinline: "",
                  "mod-video": "" + this.videoAutoplay,
                },
                attrs
              )
            );

            on(video, "loadedmetadata", function () {
              attr(video, {
                width: video.videoWidth,
                height: video.videoHeight,
              });
              this$1.setItem(item, video);
            });
            on(video, "error", function () {
              return this$1.setError(item);
            });

            // Iframe
          } else if (type === "iframe" || src.match(/\.(html|php)($|\?)/i)) {
            this.setItem(
              item,
              createEl(
                "iframe",
                assign(
                  {
                    src,
                    frameborder: "0",
                    allowfullscreen: "",
                    class: "mod-lightbox-iframe",
                  },
                  attrs
                )
              )
            );

            // YouTube
          } else if (
            (matches = src.match(
              /\/\/(?:.*?youtube(-nocookie)?\..*?[?&]v=|youtu\.be\/)([\w-]{11})[&?]?(.*)?/
            ))
          ) {
            this.setItem(
              item,
              createEl(
                "iframe",
                assign(
                  {
                    src:
                      "https://www.youtube" +
                      (matches[1] || "") +
                      ".com/embed/" +
                      matches[2] +
                      (matches[3] ? "?" + matches[3] : ""),
                    width: 1920,
                    height: 1080,
                  },
                  iframeAttrs,
                  attrs
                )
              )
            );

            // Vimeo
          } else if (
            (matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/))
          ) {
            ajax(
              "https://vimeo.com/api/oembed.json?maxwidth=1920&url=" +
                encodeURI(src),
              {
                responseType: "json",
                withCredentials: false,
              }
            ).then(
              function (ref) {
                const ref_response = ref.response;
                const { height } = ref_response;
                const { width } = ref_response;

                return this$1.setItem(
                  item,
                  createEl(
                    "iframe",
                    assign(
                      {
                        src:
                          "https://player.vimeo.com/video/" +
                          matches[1] +
                          (matches[2] ? "?" + matches[2] : ""),
                        width,
                        height,
                      },
                      iframeAttrs,
                      attrs
                    )
                  )
                );
              },
              function () {
                return this$1.setError(item);
              }
            );
          }
        },
      },
    ],

    methods: {
      loadItem(index) {
        if (index === void 0) index = this.index;

        const item = this.getItem(index);

        if (!this.getSlide(item).childElementCount) {
          trigger(this.$el, "itemload", [item]);
        }
      },

      getItem(index) {
        if (index === void 0) index = this.index;

        return this.items[getIndex(index, this.slides)];
      },

      setItem(item, content) {
        trigger(this.$el, "itemloaded", [
          this,
          html(this.getSlide(item), content),
        ]);
      },

      getSlide(item) {
        return this.slides[this.items.indexOf(item)];
      },

      setError(item) {
        this.setItem(item, '<span mod-icon="icon: bolt; ratio: 2"></span>');
      },

      showControls() {
        clearTimeout(this.controlsTimer);
        this.controlsTimer = setTimeout(this.hideControls, this.delayControls);

        addClass(this.$el, "mod-active", "mod-transition-active");
      },

      hideControls() {
        removeClass(this.$el, "mod-active", "mod-transition-active");
      },
    },
  };

  function createEl(tag, attrs) {
    const el = fragment("<" + tag + ">");
    attr(el, attrs);
    return el;
  }

  const lightbox = {
    install: install$2,

    props: { toggle: String },

    data: { toggle: "a" },

    computed: {
      toggles: {
        get(ref, $el) {
          const { toggle } = ref;

          return $$(toggle, $el);
        },

        watch() {
          this.hide();
        },
      },
    },

    disconnected() {
      this.hide();
    },

    events: [
      {
        name: "click",

        delegate() {
          return this.toggle + ":not(.mod-disabled)";
        },

        handler(e) {
          e.preventDefault();
          this.show(e.current);
        },
      },
    ],

    methods: {
      show(index) {
        const this$1 = this;

        const items = uniqueBy(this.toggles.map(toItem), "source");

        if (isElement(index)) {
          const ref = toItem(index);
          const { source } = ref;
          index = findIndex(items, function (ref) {
            const src = ref.source;

            return source === src;
          });
        }

        this.panel =
          this.panel ||
          this.$create("lightboxPanel", assign({}, this.$props, { items }));

        on(this.panel.$el, "hidden", function () {
          return (this$1.panel = false);
        });

        return this.panel.show(index);
      },

      hide() {
        return this.panel && this.panel.hide();
      },
    },
  };

  function install$2(UIkit, Lightbox) {
    if (!UIkit.lightboxPanel) {
      UIkit.component("lightboxPanel", LightboxPanel);
    }

    assign(Lightbox.props, UIkit.component("lightboxPanel").options.props);
  }

  function toItem(el) {
    const item = {};

    ["href", "caption", "type", "poster", "alt", "attrs"].forEach(function (
      attr
    ) {
      item[attr === "href" ? "source" : attr] = data(el, attr);
    });

    item.attrs = parseOptions(item.attrs);

    return item;
  }

  const props = [
    "x",
    "y",
    "bgx",
    "bgy",
    "rotate",
    "scale",
    "color",
    "backgroundColor",
    "borderColor",
    "opacity",
    "blur",
    "hue",
    "grayscale",
    "invert",
    "saturate",
    "sepia",
    "fopacity",
    "stroke",
  ];

  const Parallax = {
    mixins: [Media],

    props: props.reduce(function (props, prop) {
      props[prop] = "list";
      return props;
    }, {}),

    data: props.reduce(function (data, prop) {
      data[prop] = undefined;
      return data;
    }, {}),

    computed: {
      props(properties, $el) {
        const this$1 = this;

        return props.reduce(function (props, prop) {
          if (isUndefined(properties[prop])) {
            return props;
          }

          const isColor = prop.match(/color/i);
          const isCssProp = isColor || prop === "opacity";

          let pos, bgPos, diff;
          let steps = properties[prop].slice();

          if (isCssProp) {
            css($el, prop, "");
          }

          if (steps.length < 2) {
            steps.unshift(
              (prop === "scale" ? 1 : isCssProp ? css($el, prop) : 0) || 0
            );
          }

          const unit = getUnit(steps);

          if (isColor) {
            const ref = $el.style;
            const { color } = ref;
            steps = steps.map(function (step) {
              return parseColor($el, step);
            });
            $el.style.color = color;
          } else if (startsWith(prop, "bg")) {
            const attr = prop === "bgy" ? "height" : "width";
            steps = steps.map(function (step) {
              return toPx(step, attr, this$1.$el);
            });

            css($el, "background-position-" + prop[2], "");
            bgPos = css($el, "backgroundPosition").split(" ")[
              prop[2] === "x" ? 0 : 1
            ]; // IE 11 can't read background-position-[x|y]

            if (this$1.covers) {
              const min = Math.min.apply(Math, steps);
              const max = Math.max.apply(Math, steps);
              const down = steps.indexOf(min) < steps.indexOf(max);

              diff = max - min;

              steps = steps.map(function (step) {
                return step - (down ? min : max);
              });
              pos = (down ? -diff : 0) + "px";
            } else {
              pos = bgPos;
            }
          } else {
            steps = steps.map(toFloat);
          }

          if (prop === "stroke") {
            if (
              !steps.some(function (step) {
                return step;
              })
            ) {
              return props;
            }

            const length = getMaxPathLength(this$1.$el);
            css($el, "strokeDasharray", length);

            if (unit === "%") {
              steps = steps.map(function (step) {
                return (step * length) / 100;
              });
            }

            steps = steps.reverse();

            prop = "strokeDashoffset";
          }

          props[prop] = { steps, unit, pos, bgPos, diff };

          return props;
        }, {});
      },

      bgProps() {
        const this$1 = this;

        return ["bgx", "bgy"].filter(function (bg) {
          return bg in this$1.props;
        });
      },

      covers(_, $el) {
        return covers($el);
      },
    },

    disconnected() {
      delete this._image;
    },

    update: {
      read(data) {
        const this$1 = this;

        if (!this.matchMedia) {
          return;
        }

        if (!data.image && this.covers && this.bgProps.length) {
          const src = css(this.$el, "backgroundImage").replace(
            /^none|url\(["']?(.+?)["']?\)$/,
            "$1"
          );

          if (src) {
            const img = new Image();
            img.src = src;
            data.image = img;

            if (!img.naturalWidth) {
              img.onload = function () {
                return this$1.$update();
              };
            }
          }
        }

        const { image } = data;

        if (!image || !image.naturalWidth) {
          return;
        }

        const dimEl = {
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight,
        };
        const dimImage = {
          width: image.naturalWidth,
          height: image.naturalHeight,
        };

        let dim = Dimensions.cover(dimImage, dimEl);

        this.bgProps.forEach(function (prop) {
          const ref = this$1.props[prop];
          const { diff } = ref;
          const { bgPos } = ref;
          const { steps } = ref;
          const attr = prop === "bgy" ? "height" : "width";
          const span = dim[attr] - dimEl[attr];

          if (span < diff) {
            dimEl[attr] = dim[attr] + diff - span;
          } else if (span > diff) {
            const posPercentage = dimEl[attr] / toPx(bgPos, attr, this$1.$el);

            if (posPercentage) {
              this$1.props[prop].steps = steps.map(function (step) {
                return step - (span - diff) / posPercentage;
              });
            }
          }

          dim = Dimensions.cover(dimImage, dimEl);
        });

        data.dim = dim;
      },

      write(ref) {
        const { dim } = ref;

        if (!this.matchMedia) {
          css(this.$el, { backgroundSize: "", backgroundRepeat: "" });
          return;
        }

        dim &&
          css(this.$el, {
            backgroundSize: dim.width + "px " + dim.height + "px",
            backgroundRepeat: "no-repeat",
          });
      },

      events: ["resize"],
    },

    methods: {
      reset() {
        const this$1 = this;

        each(this.getCss(0), function (_, prop) {
          return css(this$1.$el, prop, "");
        });
      },

      getCss(percent) {
        const ref = this;
        const { props } = ref;
        return Object.keys(props).reduce(
          function (css, prop) {
            const ref = props[prop];
            const { steps } = ref;
            let { unit } = ref;
            const { pos } = ref;
            const value = getValue(steps, percent);

            switch (prop) {
              // transforms
              case "x":
              case "y": {
                unit = unit || "px";
                css.transform +=
                  " translate" +
                  ucfirst(prop) +
                  "(" +
                  toFloat(value).toFixed(unit === "px" ? 0 : 2) +
                  unit +
                  ")";
                break;
              }
              case "rotate":
                unit = unit || "deg";
                css.transform += " rotate(" + (value + unit) + ")";
                break;
              case "scale":
                css.transform += " scale(" + value + ")";
                break;

              // bg image
              case "bgy":
              case "bgx":
                css["background-position-" + prop[2]] =
                  "calc(" + pos + " + " + value + "px)";
                break;

              // color
              case "color":
              case "backgroundColor":
              case "borderColor": {
                const ref$1 = getStep(steps, percent);
                const start = ref$1[0];
                const end = ref$1[1];
                const p = ref$1[2];

                css[prop] =
                  "rgba(" +
                  start
                    .map(function (value, i) {
                      value = value + p * (end[i] - value);
                      return i === 3 ? toFloat(value) : parseInt(value, 10);
                    })
                    .join(",") +
                  ")";
                break;
              }
              // CSS Filter
              case "blur":
                unit = unit || "px";
                css.filter += " blur(" + (value + unit) + ")";
                break;
              case "hue":
                unit = unit || "deg";
                css.filter += " hue-rotate(" + (value + unit) + ")";
                break;
              case "fopacity":
                unit = unit || "%";
                css.filter += " opacity(" + (value + unit) + ")";
                break;
              case "grayscale":
              case "invert":
              case "saturate":
              case "sepia":
                unit = unit || "%";
                css.filter += " " + prop + "(" + (value + unit) + ")";
                break;
              default:
                css[prop] = value;
            }

            return css;
          },
          { transform: "", filter: "" }
        );
      },
    },
  };

  function parseColor(el, color) {
    return css(css(el, "color", color), "color")
      .split(/[(),]/g)
      .slice(1, -1)
      .concat(1)
      .slice(0, 4)
      .map(toFloat);
  }

  function getStep(steps, percent) {
    const count = steps.length - 1;
    const index = Math.min(Math.floor(count * percent), count - 1);
    const step = steps.slice(index, index + 2);

    step.push(percent === 1 ? 1 : (percent % (1 / count)) * count);

    return step;
  }

  function getValue(steps, percent, digits) {
    if (digits === void 0) digits = 2;

    const ref = getStep(steps, percent);
    const start = ref[0];
    const end = ref[1];
    const p = ref[2];
    return (isNumber(start)
      ? start + Math.abs(start - end) * p * (start < end ? 1 : -1)
      : +end
    ).toFixed(digits);
  }

  function getUnit(steps) {
    return steps.reduce(function (unit, step) {
      return (isString(step) && step.replace(/-|\d/g, "").trim()) || unit;
    }, "");
  }

  function covers(el) {
    const ref = el.style;
    const { backgroundSize } = ref;
    const covers =
      css(css(el, "backgroundSize", ""), "backgroundSize") === "cover";
    el.style.backgroundSize = backgroundSize;
    return covers;
  }

  const parallax = {
    mixins: [Parallax],

    props: {
      target: String,
      viewport: Number,
      easing: Number,
    },

    data: {
      target: false,
      viewport: 1,
      easing: 1,
    },

    computed: {
      target(ref, $el) {
        const { target } = ref;

        return getOffsetElement((target && query(target, $el)) || $el);
      },
    },

    update: {
      read(ref, types) {
        let { percent } = ref;

        if (!types.has("scroll")) {
          percent = false;
        }

        if (!this.matchMedia) {
          return;
        }

        const prev = percent;
        percent = ease(
          scrolledOver(this.target) / (this.viewport || 1),
          this.easing
        );

        return {
          percent,
          style: prev !== percent ? this.getCss(percent) : false,
        };
      },

      write(ref) {
        const { style } = ref;

        if (!this.matchMedia) {
          this.reset();
          return;
        }

        style && css(this.$el, style);
      },

      events: ["scroll", "resize"],
    },
  };

  function ease(percent, easing) {
    return clamp(percent * (1 - (easing - easing * percent)));
  }

  // SVG elements do not inherit from HTMLElement
  function getOffsetElement(el) {
    return el
      ? "offsetTop" in el
        ? el
        : getOffsetElement(parent(el))
      : document.body;
  }

  const SliderReactive = {
    update: {
      write() {
        if (this.stack.length || this.dragging) {
          return;
        }

        const index = this.getValidIndex(this.index);

        if (!~this.prevIndex || this.index !== index) {
          this.show(index);
        }
      },

      events: ["resize"],
    },
  };

  function Transitioner$1(prev, next, dir, ref) {
    const { center } = ref;
    const { easing } = ref;
    const { list } = ref;

    const deferred = new Deferred();

    const from = prev
      ? getLeft(prev, list, center)
      : getLeft(next, list, center) + dimensions(next).width * dir;
    const to = next
      ? getLeft(next, list, center)
      : from + dimensions(prev).width * dir * (isRtl ? -1 : 1);

    return {
      dir,

      show(duration, percent, linear) {
        if (percent === void 0) percent = 0;

        const timing = linear ? "linear" : easing;
        duration -= Math.round(duration * clamp(percent, -1, 1));

        this.translate(percent);

        prev && this.updateTranslates();
        percent = prev ? percent : clamp(percent, 0, 1);
        triggerUpdate$1(this.getItemIn(), "itemin", {
          percent,
          duration,
          timing,
          dir,
        });
        prev &&
          triggerUpdate$1(this.getItemIn(true), "itemout", {
            percent: 1 - percent,
            duration,
            timing,
            dir,
          });

        Transition.start(
          list,
          { transform: translate(-to * (isRtl ? -1 : 1), "px") },
          duration,
          timing
        ).then(deferred.resolve, noop);

        return deferred.promise;
      },

      cancel() {
        Transition.cancel(list);
      },

      reset() {
        css(list, "transform", "");
      },

      forward(duration, percent) {
        if (percent === void 0) percent = this.percent();

        Transition.cancel(list);
        return this.show(duration, percent, true);
      },

      translate(percent) {
        const distance = this.getDistance() * dir * (isRtl ? -1 : 1);

        css(
          list,
          "transform",
          translate(
            clamp(
              -to + (distance - distance * percent),
              -getWidth(list),
              dimensions(list).width
            ) * (isRtl ? -1 : 1),
            "px"
          )
        );

        this.updateTranslates();

        if (prev) {
          percent = clamp(percent, -1, 1);
          triggerUpdate$1(this.getItemIn(), "itemtranslatein", {
            percent,
            dir,
          });
          triggerUpdate$1(this.getItemIn(true), "itemtranslateout", {
            percent: 1 - percent,
            dir,
          });
        }
      },

      percent() {
        return Math.abs(
          (css(list, "transform").split(",")[4] * (isRtl ? -1 : 1) + from) /
            (to - from)
        );
      },

      getDistance() {
        return Math.abs(to - from);
      },

      getItemIn(out) {
        if (out === void 0) out = false;

        const actives = sortBy(this.getActives(), "offsetLeft");
        const all = sortBy(children(list), "offsetLeft");
        const i = index(
          all,
          actives[dir * (out ? -1 : 1) > 0 ? actives.length - 1 : 0]
        );

        return ~i && all[i + (prev && !out ? dir : 0)];
      },

      getActives() {
        return [prev || next].concat(
          children(list).filter(function (slide) {
            const slideLeft = getElLeft(slide, list);
            return (
              slideLeft > from &&
              slideLeft + dimensions(slide).width <=
                dimensions(list).width + from
            );
          })
        );
      },

      updateTranslates() {
        const actives = this.getActives();

        children(list).forEach(function (slide) {
          const isActive = includes(actives, slide);

          triggerUpdate$1(slide, "itemtranslate" + (isActive ? "in" : "out"), {
            percent: isActive ? 1 : 0,
            dir: slide.offsetLeft <= next.offsetLeft ? 1 : -1,
          });
        });
      },
    };
  }

  function getLeft(el, list, center) {
    const left = getElLeft(el, list);

    return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
  }

  function getMax(list) {
    return Math.max(0, getWidth(list) - dimensions(list).width);
  }

  function getWidth(list) {
    return children(list).reduce(function (right, el) {
      return dimensions(el).width + right;
    }, 0);
  }

  function centerEl(el, list) {
    return dimensions(list).width / 2 - dimensions(el).width / 2;
  }

  function getElLeft(el, list) {
    return (
      (el &&
        (position(el).left +
          (isRtl ? dimensions(el).width - dimensions(list).width : 0)) *
          (isRtl ? -1 : 1)) ||
      0
    );
  }

  function triggerUpdate$1(el, type, data) {
    trigger(el, createEvent(type, false, false, data));
  }

  const slider = {
    mixins: [Class, Slider, SliderReactive],

    props: {
      center: Boolean,
      sets: Boolean,
    },

    data: {
      center: false,
      sets: false,
      attrItem: "mod-slider-item",
      selList: ".mod-slider-items",
      selNav: ".mod-slider-nav",
      clsContainer: "mod-slider-container",
      Transitioner: Transitioner$1,
    },

    computed: {
      avgWidth() {
        return getWidth(this.list) / this.length;
      },

      finite(ref) {
        const { finite } = ref;

        return (
          finite ||
          Math.ceil(getWidth(this.list)) <
            dimensions(this.list).width + getMaxElWidth(this.list) + this.center
        );
      },

      maxIndex() {
        if (!this.finite || (this.center && !this.sets)) {
          return this.length - 1;
        }

        if (this.center) {
          return last(this.sets);
        }

        let lft = 0;
        const max = getMax(this.list);
        const index = findIndex(this.slides, function (el) {
          if (lft >= max) {
            return true;
          }

          lft += dimensions(el).width;
        });

        return ~index ? index : this.length - 1;
      },

      sets(ref) {
        const this$1 = this;
        let { sets } = ref;

        if (!sets) {
          return;
        }

        const width = dimensions(this.list).width / (this.center ? 2 : 1);

        let left = 0;
        let leftCenter = width;
        let slideLeft = 0;

        sets = sortBy(this.slides, "offsetLeft").reduce(function (
          sets,
          slide,
          i
        ) {
          const slideWidth = dimensions(slide).width;
          const slideRight = slideLeft + slideWidth;

          if (slideRight > left) {
            if (!this$1.center && i > this$1.maxIndex) {
              i = this$1.maxIndex;
            }

            if (!includes(sets, i)) {
              const cmp = this$1.slides[i + 1];
              if (
                this$1.center &&
                cmp &&
                slideWidth < leftCenter - dimensions(cmp).width / 2
              ) {
                leftCenter -= slideWidth;
              } else {
                leftCenter = width;
                sets.push(i);
                left = slideLeft + width + (this$1.center ? slideWidth / 2 : 0);
              }
            }
          }

          slideLeft += slideWidth;

          return sets;
        },
        []);

        return !isEmpty(sets) && sets;
      },

      transitionOptions() {
        return {
          center: this.center,
          list: this.list,
        };
      },
    },

    connected() {
      toggleClass(
        this.$el,
        this.clsContainer,
        !$("." + this.clsContainer, this.$el)
      );
    },

    update: {
      write() {
        const this$1 = this;

        this.navItems.forEach(function (el) {
          const index = toNumber(data(el, this$1.attrItem));
          if (index !== false) {
            el.hidden =
              !this$1.maxIndex ||
              index > this$1.maxIndex ||
              (this$1.sets && !includes(this$1.sets, index));
          }
        });

        if (this.length && !this.dragging && !this.stack.length) {
          this.reorder();
          this._translate(1);
        }

        const actives = this._getTransitioner(this.index).getActives();
        this.slides.forEach(function (slide) {
          return toggleClass(slide, this$1.clsActive, includes(actives, slide));
        });

        if (
          this.clsActivated &&
          (!this.sets || includes(this.sets, toFloat(this.index)))
        ) {
          this.slides.forEach(function (slide) {
            return toggleClass(
              slide,
              this$1.clsActivated || "",
              includes(actives, slide)
            );
          });
        }
      },

      events: ["resize"],
    },

    events: {
      beforeitemshow(e) {
        if (
          !this.dragging &&
          this.sets &&
          this.stack.length < 2 &&
          !includes(this.sets, this.index)
        ) {
          this.index = this.getValidIndex();
        }

        const diff = Math.abs(
          this.index -
            this.prevIndex +
            ((this.dir > 0 && this.index < this.prevIndex) ||
            (this.dir < 0 && this.index > this.prevIndex)
              ? (this.maxIndex + 1) * this.dir
              : 0)
        );

        if (!this.dragging && diff > 1) {
          for (let i = 0; i < diff; i++) {
            this.stack.splice(1, 0, this.dir > 0 ? "next" : "previous");
          }

          e.preventDefault();
          return;
        }

        const index =
          this.dir < 0 || !this.slides[this.prevIndex]
            ? this.index
            : this.prevIndex;
        this.duration =
          speedUp(this.avgWidth / this.velocity) *
          (dimensions(this.slides[index]).width / this.avgWidth);

        this.reorder();
      },

      itemshow() {
        ~this.prevIndex &&
          addClass(this._getTransitioner().getItemIn(), this.clsActive);
      },
    },

    methods: {
      reorder() {
        const this$1 = this;

        if (this.finite) {
          css(this.slides, "order", "");
          return;
        }

        const index =
          this.dir > 0 && this.slides[this.prevIndex]
            ? this.prevIndex
            : this.index;

        this.slides.forEach(function (slide, i) {
          return css(
            slide,
            "order",
            this$1.dir > 0 && i < index
              ? 1
              : this$1.dir < 0 && i >= this$1.index
              ? -1
              : ""
          );
        });

        if (!this.center) {
          return;
        }

        const next = this.slides[index];
        let width =
          dimensions(this.list).width / 2 - dimensions(next).width / 2;
        let j = 0;

        while (width > 0) {
          const slideIndex = this.getIndex(--j + index, index);
          const slide = this.slides[slideIndex];

          css(slide, "order", slideIndex > index ? -2 : -1);
          width -= dimensions(slide).width;
        }
      },

      getValidIndex(index, prevIndex) {
        if (index === void 0) index = this.index;
        if (prevIndex === void 0) prevIndex = this.prevIndex;

        index = this.getIndex(index, prevIndex);

        if (!this.sets) {
          return index;
        }

        let prev;

        do {
          if (includes(this.sets, index)) {
            return index;
          }

          prev = index;
          index = this.getIndex(index + this.dir, prevIndex);
        } while (index !== prev);

        return index;
      },
    },
  };

  function getMaxElWidth(list) {
    return Math.max.apply(
      Math,
      [0].concat(
        children(list).map(function (el) {
          return dimensions(el).width;
        })
      )
    );
  }

  const sliderParallax = {
    mixins: [Parallax],

    data: {
      selItem: "!li",
    },

    computed: {
      item(ref, $el) {
        const { selItem } = ref;

        return query(selItem, $el);
      },
    },

    events: [
      {
        name: "itemin itemout",

        self: true,

        el() {
          return this.item;
        },

        handler(ref) {
          const this$1 = this;
          const { type } = ref;
          const ref_detail = ref.detail;
          const { percent } = ref_detail;
          const { duration } = ref_detail;
          const { timing } = ref_detail;
          const { dir } = ref_detail;

          fastdom.read(function () {
            const propsFrom = this$1.getCss(
              getCurrentPercent(type, dir, percent)
            );
            const propsTo = this$1.getCss(isIn(type) ? 0.5 : dir > 0 ? 1 : 0);
            fastdom.write(function () {
              css(this$1.$el, propsFrom);
              Transition.start(this$1.$el, propsTo, duration, timing).catch(
                noop
              );
            });
          });
        },
      },

      {
        name: "transitioncanceled transitionend",

        self: true,

        el() {
          return this.item;
        },

        handler() {
          Transition.cancel(this.$el);
        },
      },

      {
        name: "itemtranslatein itemtranslateout",

        self: true,

        el() {
          return this.item;
        },

        handler(ref) {
          const this$1 = this;
          const { type } = ref;
          const ref_detail = ref.detail;
          const { percent } = ref_detail;
          const { dir } = ref_detail;

          fastdom.read(function () {
            const props = this$1.getCss(getCurrentPercent(type, dir, percent));
            fastdom.write(function () {
              return css(this$1.$el, props);
            });
          });
        },
      },
    ],
  };

  function isIn(type) {
    return endsWith(type, "in");
  }

  function getCurrentPercent(type, dir, percent) {
    percent /= 2;

    return !isIn(type)
      ? dir < 0
        ? percent
        : 1 - percent
      : dir < 0
      ? 1 - percent
      : percent;
  }

  const Animations$2 = assign({}, Animations, {
    fade: {
      show() {
        return [{ opacity: 0, zIndex: 0 }, { zIndex: -1 }];
      },

      percent(current) {
        return 1 - css(current, "opacity");
      },

      translate(percent) {
        return [{ opacity: 1 - percent, zIndex: 0 }, { zIndex: -1 }];
      },
    },

    scale: {
      show() {
        return [
          { opacity: 0, transform: scale3d(1 + 0.5), zIndex: 0 },
          { zIndex: -1 },
        ];
      },

      percent(current) {
        return 1 - css(current, "opacity");
      },

      translate(percent) {
        return [
          {
            opacity: 1 - percent,
            transform: scale3d(1 + 0.5 * percent),
            zIndex: 0,
          },
          { zIndex: -1 },
        ];
      },
    },

    pull: {
      show(dir) {
        return dir < 0
          ? [
              { transform: translate(30), zIndex: -1 },
              { transform: translate(), zIndex: 0 },
            ]
          : [
              { transform: translate(-100), zIndex: 0 },
              { transform: translate(), zIndex: -1 },
            ];
      },

      percent(current, next, dir) {
        return dir < 0 ? 1 - translated(next) : translated(current);
      },

      translate(percent, dir) {
        return dir < 0
          ? [
              { transform: translate(30 * percent), zIndex: -1 },
              { transform: translate(-100 * (1 - percent)), zIndex: 0 },
            ]
          : [
              { transform: translate(-percent * 100), zIndex: 0 },
              { transform: translate(30 * (1 - percent)), zIndex: -1 },
            ];
      },
    },

    push: {
      show(dir) {
        return dir < 0
          ? [
              { transform: translate(100), zIndex: 0 },
              { transform: translate(), zIndex: -1 },
            ]
          : [
              { transform: translate(-30), zIndex: -1 },
              { transform: translate(), zIndex: 0 },
            ];
      },

      percent(current, next, dir) {
        return dir > 0 ? 1 - translated(next) : translated(current);
      },

      translate(percent, dir) {
        return dir < 0
          ? [
              { transform: translate(percent * 100), zIndex: 0 },
              { transform: translate(-30 * (1 - percent)), zIndex: -1 },
            ]
          : [
              { transform: translate(-30 * percent), zIndex: -1 },
              { transform: translate(100 * (1 - percent)), zIndex: 0 },
            ];
      },
    },
  });

  const slideshow = {
    mixins: [Class, Slideshow, SliderReactive],

    props: {
      ratio: String,
      minHeight: Number,
      maxHeight: Number,
    },

    data: {
      ratio: "16:9",
      minHeight: false,
      maxHeight: false,
      selList: ".mod-slideshow-items",
      attrItem: "mod-slideshow-item",
      selNav: ".mod-slideshow-nav",
      Animations: Animations$2,
    },

    update: {
      read() {
        const ref = this.ratio.split(":").map(Number);
        const width = ref[0];
        let height = ref[1];

        height = (height * this.list.offsetWidth) / width || 0;

        if (this.minHeight) {
          height = Math.max(this.minHeight, height);
        }

        if (this.maxHeight) {
          height = Math.min(this.maxHeight, height);
        }

        return {
          height: height - boxModelAdjust(this.list, "height", "content-box"),
        };
      },

      write(ref) {
        const { height } = ref;

        height > 0 && css(this.list, "minHeight", height);
      },

      events: ["resize"],
    },
  };

  const sortable = {
    mixins: [Class, Animate],

    props: {
      group: String,
      threshold: Number,
      clsItem: String,
      clsPlaceholder: String,
      clsDrag: String,
      clsDragState: String,
      clsBase: String,
      clsNoDrag: String,
      clsEmpty: String,
      clsCustom: String,
      handle: String,
    },

    data: {
      group: false,
      threshold: 5,
      clsItem: "mod-sortable-item",
      clsPlaceholder: "mod-sortable-placeholder",
      clsDrag: "mod-sortable-drag",
      clsDragState: "mod-drag",
      clsBase: "mod-sortable",
      clsNoDrag: "mod-sortable-nodrag",
      clsEmpty: "mod-sortable-empty",
      clsCustom: "",
      handle: false,
      pos: {},
    },

    created() {
      const this$1 = this;

      ["init", "start", "move", "end"].forEach(function (key) {
        const fn = this$1[key];
        this$1[key] = function (e) {
          assign(this$1.pos, getEventPos(e));
          fn(e);
        };
      });
    },

    events: {
      name: pointerDown,
      passive: false,
      handler: "init",
    },

    computed: {
      target() {
        return (this.$el.tBodies || [this.$el])[0];
      },

      items() {
        return children(this.target);
      },

      isEmpty: {
        get() {
          return isEmpty(this.items);
        },

        watch(empty) {
          toggleClass(this.target, this.clsEmpty, empty);
        },

        immediate: true,
      },

      handles: {
        get(ref, el) {
          const { handle } = ref;

          return handle ? $$(handle, el) : this.items;
        },

        watch(handles, prev) {
          css(prev, { touchAction: "", userSelect: "" });
          css(handles, {
            touchAction: hasTouch ? "none" : "",
            userSelect: "none",
          }); // touchAction set to 'none' causes a performance drop in Chrome 80
        },

        immediate: true,
      },
    },

    update: {
      write(data) {
        if (!this.drag || !parent(this.placeholder)) {
          return;
        }

        const ref = this;
        const ref_pos = ref.pos;
        const { x } = ref_pos;
        const { y } = ref_pos;
        const ref_origin = ref.origin;
        const { offsetTop } = ref_origin;
        const { offsetLeft } = ref_origin;
        const { placeholder } = ref;

        css(this.drag, {
          top: y - offsetTop,
          left: x - offsetLeft,
        });

        const sortable = this.getSortable(document.elementFromPoint(x, y));

        if (!sortable) {
          return;
        }

        const { items } = sortable;

        if (items.some(Transition.inProgress)) {
          return;
        }

        const target = findTarget(items, { x, y });

        if (items.length && (!target || target === placeholder)) {
          return;
        }

        const previous = this.getSortable(placeholder);
        const insertTarget = findInsertTarget(
          sortable.target,
          target,
          placeholder,
          x,
          y,
          sortable === previous && data.moved !== target
        );

        if (insertTarget === false) {
          return;
        }

        if (insertTarget && placeholder === insertTarget) {
          return;
        }

        if (sortable !== previous) {
          previous.remove(placeholder);
          data.moved = target;
        } else {
          delete data.moved;
        }

        sortable.insert(placeholder, insertTarget);

        this.touched.add(sortable);
      },

      events: ["move"],
    },

    methods: {
      init(e) {
        const { target } = e;
        const { button } = e;
        const { defaultPrevented } = e;
        const ref = this.items.filter(function (el) {
          return within(target, el);
        });
        const placeholder = ref[0];

        if (
          !placeholder ||
          defaultPrevented ||
          button > 0 ||
          isInput(target) ||
          within(target, "." + this.clsNoDrag) ||
          (this.handle && !within(target, this.handle))
        ) {
          return;
        }

        e.preventDefault();

        this.touched = new Set([this]);
        this.placeholder = placeholder;
        this.origin = assign({ target, index: index(placeholder) }, this.pos);

        on(document, pointerMove, this.move);
        on(document, pointerUp, this.end);

        if (!this.threshold) {
          this.start(e);
        }
      },

      start(e) {
        this.drag = appendDrag(this.$container, this.placeholder);
        const ref = this.placeholder.getBoundingClientRect();
        const { left } = ref;
        const { top } = ref;
        assign(this.origin, {
          offsetLeft: this.pos.x - left,
          offsetTop: this.pos.y - top,
        });

        addClass(this.drag, this.clsDrag, this.clsCustom);
        addClass(this.placeholder, this.clsPlaceholder);
        addClass(this.items, this.clsItem);
        addClass(document.documentElement, this.clsDragState);

        trigger(this.$el, "start", [this, this.placeholder]);

        trackScroll(this.pos);

        this.move(e);
      },

      move(e) {
        if (this.drag) {
          this.$emit("move");
        } else if (
          Math.abs(this.pos.x - this.origin.x) > this.threshold ||
          Math.abs(this.pos.y - this.origin.y) > this.threshold
        ) {
          this.start(e);
        }
      },

      end() {
        const this$1 = this;

        off(document, pointerMove, this.move);
        off(document, pointerUp, this.end);
        off(window, "scroll", this.scroll);

        if (!this.drag) {
          return;
        }

        untrackScroll();

        const sortable = this.getSortable(this.placeholder);

        if (this === sortable) {
          if (this.origin.index !== index(this.placeholder)) {
            trigger(this.$el, "moved", [this, this.placeholder]);
          }
        } else {
          trigger(sortable.$el, "added", [sortable, this.placeholder]);
          trigger(this.$el, "removed", [this, this.placeholder]);
        }

        trigger(this.$el, "stop", [this, this.placeholder]);

        remove(this.drag);
        this.drag = null;

        this.touched.forEach(function (ref) {
          const { clsPlaceholder } = ref;
          const { clsItem } = ref;

          return this$1.touched.forEach(function (sortable) {
            return removeClass(sortable.items, clsPlaceholder, clsItem);
          });
        });
        this.touched = null;
        removeClass(document.documentElement, this.clsDragState);
      },

      insert(element, target) {
        const this$1 = this;

        addClass(this.items, this.clsItem);

        const insert = function () {
          return target
            ? before(target, element)
            : append(this$1.target, element);
        };

        if (this.animation) {
          this.animate(insert);
        } else {
          insert();
        }
      },

      remove(element) {
        if (!within(element, this.target)) {
          return;
        }

        if (this.animation) {
          this.animate(function () {
            return remove(element);
          });
        } else {
          remove(element);
        }
      },

      getSortable(element) {
        do {
          const sortable = this.$getComponent(element, "sortable");

          if (
            sortable &&
            (sortable === this ||
              (this.group !== false && sortable.group === this.group))
          ) {
            return sortable;
          }
        } while ((element = parent(element)));
      },
    },
  };

  let trackTimer;
  function trackScroll(pos) {
    let last = Date.now();
    trackTimer = setInterval(function () {
      const { x } = pos;
      let { y } = pos;
      y += window.pageYOffset;

      const dist = (Date.now() - last) * 0.3;
      last = Date.now();

      scrollParents(document.elementFromPoint(x, pos.y))
        .reverse()
        .some(function (scrollEl) {
          let scroll = scrollEl.scrollTop;
          const { scrollHeight } = scrollEl;

          const ref = offset(getViewport(scrollEl));
          const { top } = ref;
          const { bottom } = ref;
          const { height } = ref;

          if (top < y && top + 35 > y) {
            scroll -= dist;
          } else if (bottom > y && bottom - 35 < y) {
            scroll += dist;
          } else {
            return;
          }

          if (scroll > 0 && scroll < scrollHeight - height) {
            scrollTop(scrollEl, scroll);
            return true;
          }
        });
    }, 15);
  }

  function untrackScroll() {
    clearInterval(trackTimer);
  }

  function appendDrag(container, element) {
    const clone = append(
      container,
      element.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g, "$1div$2")
    );

    css(clone, "margin", "0", "important");
    css(
      clone,
      assign(
        {
          boxSizing: "border-box",
          width: element.offsetWidth,
          height: element.offsetHeight,
        },
        css(element, [
          "paddingLeft",
          "paddingRight",
          "paddingTop",
          "paddingBottom",
        ])
      )
    );

    height(clone.firstElementChild, height(element.firstElementChild));

    return clone;
  }

  function findTarget(items, point) {
    return items[
      findIndex(items, function (item) {
        return pointInRect(point, item.getBoundingClientRect());
      })
    ];
  }

  function findInsertTarget(list, target, placeholder, x, y, sameList) {
    if (!children(list).length) {
      return;
    }

    const rect = target.getBoundingClientRect();
    if (!sameList) {
      if (!isHorizontal(list, placeholder)) {
        return y < rect.top + rect.height / 2
          ? target
          : target.nextElementSibling;
      }

      return target;
    }

    const placeholderRect = placeholder.getBoundingClientRect();
    const sameRow = linesIntersect(
      [rect.top, rect.bottom],
      [placeholderRect.top, placeholderRect.bottom]
    );

    const pointerPos = sameRow ? x : y;
    const lengthProp = sameRow ? "width" : "height";
    const startProp = sameRow ? "left" : "top";
    const endProp = sameRow ? "right" : "bottom";

    const diff =
      placeholderRect[lengthProp] < rect[lengthProp]
        ? rect[lengthProp] - placeholderRect[lengthProp]
        : 0;

    if (placeholderRect[startProp] < rect[startProp]) {
      if (diff && pointerPos < rect[startProp] + diff) {
        return false;
      }

      return target.nextElementSibling;
    }

    if (diff && pointerPos > rect[endProp] - diff) {
      return false;
    }

    return target;
  }

  function isHorizontal(list, placeholder) {
    const single = children(list).length === 1;

    if (single) {
      append(list, placeholder);
    }

    const items = children(list);
    const isHorizontal = items.some(function (el, i) {
      const rectA = el.getBoundingClientRect();
      return items.slice(i + 1).some(function (el) {
        const rectB = el.getBoundingClientRect();
        return !linesIntersect(
          [rectA.left, rectA.right],
          [rectB.left, rectB.right]
        );
      });
    });

    if (single) {
      remove(placeholder);
    }

    return isHorizontal;
  }

  function linesIntersect(lineA, lineB) {
    return lineA[1] > lineB[0] && lineB[1] > lineA[0];
  }

  let obj;

  const tooltip = {
    mixins: [Container, Togglable, Position],

    args: "title",

    props: {
      delay: Number,
      title: String,
    },

    data: {
      pos: "top",
      title: "",
      delay: 0,
      animation: ["mod-animation-scale-up"],
      duration: 100,
      cls: "mod-active",
      clsPos: "mod-tooltip",
    },

    beforeConnect() {
      this._hasTitle = hasAttr(this.$el, "title");
      attr(this.$el, "title", "");
      this.updateAria(false);
      makeFocusable(this.$el);
    },

    disconnected() {
      this.hide();
      attr(this.$el, "title", this._hasTitle ? this.title : null);
    },

    methods: {
      show() {
        const this$1 = this;

        if (this.isToggled(this.tooltip) || !this.title) {
          return;
        }

        this._unbind = once(
          document,
          "show keydown " + pointerDown,
          this.hide,
          false,
          function (e) {
            return (
              (e.type === pointerDown && !within(e.target, this$1.$el)) ||
              (e.type === "keydown" && e.keyCode === 27) ||
              (e.type === "show" &&
                e.detail[0] !== this$1 &&
                e.detail[0].$name === this$1.$name)
            );
          }
        );

        clearTimeout(this.showTimer);
        this.showTimer = setTimeout(this._show, this.delay);
      },

      hide() {
        const this$1 = this;

        if (matches(this.$el, "input:focus")) {
          return;
        }

        clearTimeout(this.showTimer);

        if (!this.isToggled(this.tooltip)) {
          return;
        }

        this.toggleElement(this.tooltip, false, false).then(function () {
          this$1.tooltip = remove(this$1.tooltip);
          this$1._unbind();
        });
      },

      _show() {
        const this$1 = this;

        this.tooltip = append(
          this.container,
          '<div class="' +
            this.clsPos +
            '"> <div class="' +
            this.clsPos +
            '-inner">' +
            this.title +
            "</div> </div>"
        );

        on(this.tooltip, "toggled", function (e, toggled) {
          this$1.updateAria(toggled);

          if (!toggled) {
            return;
          }

          this$1.positionAt(this$1.tooltip, this$1.$el);

          this$1.origin =
            this$1.getAxis() === "y"
              ? flipPosition(this$1.dir) + "-" + this$1.align
              : this$1.align + "-" + flipPosition(this$1.dir);
        });

        this.toggleElement(this.tooltip, true);
      },

      updateAria(toggled) {
        attr(this.$el, "aria-expanded", toggled);
      },
    },

    events:
      ((obj = {
        focus: "show",
        blur: "hide",
      }),
      (obj[pointerEnter + " " + pointerLeave] = function (e) {
        if (!isTouch(e)) {
          this[e.type === pointerEnter ? "show" : "hide"]();
        }
      }),
      (obj[pointerDown] = function (e) {
        if (isTouch(e)) {
          this.show();
        }
      }),
      obj),
  };

  function makeFocusable(el) {
    if (!isFocusable(el)) {
      attr(el, "tabindex", "0");
    }
  }

  function isFocusable(el) {
    return isInput(el) || matches(el, "a,button") || hasAttr(el, "tabindex");
  }

  const upload = {
    props: {
      allow: String,
      clsDragover: String,
      concurrent: Number,
      maxSize: Number,
      method: String,
      mime: String,
      msgInvalidMime: String,
      msgInvalidName: String,
      msgInvalidSize: String,
      multiple: Boolean,
      name: String,
      params: Object,
      type: String,
      url: String,
    },

    data: {
      allow: false,
      clsDragover: "mod-dragover",
      concurrent: 1,
      maxSize: 0,
      method: "POST",
      mime: false,
      msgInvalidMime: "Invalid File Type: %s",
      msgInvalidName: "Invalid File Name: %s",
      msgInvalidSize: "Invalid File Size: %s Kilobytes Max",
      multiple: false,
      name: "files[]",
      params: {},
      type: "",
      url: "",
      abort: noop,
      beforeAll: noop,
      beforeSend: noop,
      complete: noop,
      completeAll: noop,
      error: noop,
      fail: noop,
      load: noop,
      loadEnd: noop,
      loadStart: noop,
      progress: noop,
    },

    events: {
      change(e) {
        if (!matches(e.target, 'input[type="file"]')) {
          return;
        }

        e.preventDefault();

        if (e.target.files) {
          this.upload(e.target.files);
        }

        e.target.value = "";
      },

      drop(e) {
        stop(e);

        const transfer = e.dataTransfer;

        if (!transfer || !transfer.files) {
          return;
        }

        removeClass(this.$el, this.clsDragover);

        this.upload(transfer.files);
      },

      dragenter(e) {
        stop(e);
      },

      dragover(e) {
        stop(e);
        addClass(this.$el, this.clsDragover);
      },

      dragleave(e) {
        stop(e);
        removeClass(this.$el, this.clsDragover);
      },
    },

    methods: {
      upload(files) {
        const this$1 = this;

        if (!files.length) {
          return;
        }

        trigger(this.$el, "upload", [files]);

        for (let i = 0; i < files.length; i++) {
          if (this.maxSize && this.maxSize * 1000 < files[i].size) {
            this.fail(this.msgInvalidSize.replace("%s", this.maxSize));
            return;
          }

          if (this.allow && !match$1(this.allow, files[i].name)) {
            this.fail(this.msgInvalidName.replace("%s", this.allow));
            return;
          }

          if (this.mime && !match$1(this.mime, files[i].type)) {
            this.fail(this.msgInvalidMime.replace("%s", this.mime));
            return;
          }
        }

        if (!this.multiple) {
          files = [files[0]];
        }

        this.beforeAll(this, files);

        const chunks = chunk(files, this.concurrent);
        var upload = function (files) {
          const data = new FormData();

          files.forEach(function (file) {
            return data.append(this$1.name, file);
          });

          for (const key in this$1.params) {
            data.append(key, this$1.params[key]);
          }

          ajax(this$1.url, {
            data,
            method: this$1.method,
            responseType: this$1.type,
            beforeSend(env) {
              const { xhr } = env;
              xhr.upload && on(xhr.upload, "progress", this$1.progress);
              ["loadStart", "load", "loadEnd", "abort"].forEach(function (
                type
              ) {
                return on(xhr, type.toLowerCase(), this$1[type]);
              });

              return this$1.beforeSend(env);
            },
          }).then(
            function (xhr) {
              this$1.complete(xhr);

              if (chunks.length) {
                upload(chunks.shift());
              } else {
                this$1.completeAll(xhr);
              }
            },
            function (e) {
              return this$1.error(e);
            }
          );
        };

        upload(chunks.shift());
      },
    },
  };

  function match$1(pattern, path) {
    return path.match(
      new RegExp(
        "^" +
          pattern
            .replace(/\//g, "\\/")
            .replace(/\*\*/g, "(\\/[^\\/]+)*")
            .replace(/\*/g, "[^\\/]+")
            .replace(/((?!\\))\?/g, "$1.") +
          "$",
        "i"
      )
    );
  }

  function chunk(files, size) {
    const chunks = [];
    for (let i = 0; i < files.length; i += size) {
      const chunk = [];
      for (let j = 0; j < size; j++) {
        chunk.push(files[i + j]);
      }
      chunks.push(chunk);
    }
    return chunks;
  }

  function stop(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const components$1 = /* #__PURE__*/ Object.freeze({
    __proto__: null,
    Countdown: countdown,
    Filter: filter$1,
    Lightbox: lightbox,
    LightboxPanel,
    Parallax: parallax,
    Slider: slider,
    SliderParallax: sliderParallax,
    Slideshow: slideshow,
    SlideshowParallax: sliderParallax,
    Sortable: sortable,
    Tooltip: tooltip,
    Upload: upload,
  });

  each(components$1, function (component, name) {
    return UIkit.component(name, component);
  });

  return UIkit;
});

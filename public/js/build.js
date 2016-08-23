(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":4}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":5}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":2}],4:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":8,"../../modules/es6.object.assign":18}],5:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":15}],6:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],7:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],8:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],9:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":6}],10:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],11:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":8,"./$.ctx":9,"./$.global":13}],12:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],13:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],14:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":7}],15:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],16:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":15,"./$.fails":12,"./$.iobject":14,"./$.to-object":17}],17:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":10}],18:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":11,"./$.object-assign":16}],19:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
  try {
    cachedSetTimeout = setTimeout;
  } catch (e) {
    cachedSetTimeout = function () {
      throw new Error('setTimeout is not defined');
    }
  }
  try {
    cachedClearTimeout = clearTimeout;
  } catch (e) {
    cachedClearTimeout = function () {
      throw new Error('clearTimeout is not defined');
    }
  }
} ())
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],20:[function(require,module,exports){
var Vue // late bind
var map = Object.create(null)
var shimmed = false
var isBrowserify = false

/**
 * Determine compatibility and apply patch.
 *
 * @param {Function} vue
 * @param {Boolean} browserify
 */

exports.install = function (vue, browserify) {
  if (shimmed) return
  shimmed = true

  Vue = vue
  isBrowserify = browserify

  exports.compatible = !!Vue.internalDirectives
  if (!exports.compatible) {
    console.warn(
      '[HMR] vue-loader hot reload is only compatible with ' +
      'Vue.js 1.0.0+.'
    )
    return
  }

  // patch view directive
  patchView(Vue.internalDirectives.component)
  console.log('[HMR] Vue component hot reload shim applied.')
  // shim router-view if present
  var routerView = Vue.elementDirective('router-view')
  if (routerView) {
    patchView(routerView)
    console.log('[HMR] vue-router <router-view> hot reload shim applied.')
  }
}

/**
 * Shim the view directive (component or router-view).
 *
 * @param {Object} View
 */

function patchView (View) {
  var unbuild = View.unbuild
  View.unbuild = function (defer) {
    if (!this.hotUpdating) {
      var prevComponent = this.childVM && this.childVM.constructor
      removeView(prevComponent, this)
      // defer = true means we are transitioning to a new
      // Component. Register this new component to the list.
      if (defer) {
        addView(this.Component, this)
      }
    }
    // call original
    return unbuild.call(this, defer)
  }
}

/**
 * Add a component view to a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function addView (Component, view) {
  var id = Component && Component.options.hotID
  if (id) {
    if (!map[id]) {
      map[id] = {
        Component: Component,
        views: [],
        instances: []
      }
    }
    map[id].views.push(view)
  }
}

/**
 * Remove a component view from a Component's hot list
 *
 * @param {Function} Component
 * @param {Directive} view - view directive instance
 */

function removeView (Component, view) {
  var id = Component && Component.options.hotID
  if (id) {
    map[id].views.$remove(view)
  }
}

/**
 * Create a record for a hot module, which keeps track of its construcotr,
 * instnaces and views (component directives or router-views).
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if (typeof options === 'function') {
    options = options.options
  }
  if (typeof options.el !== 'string' && typeof options.data !== 'object') {
    makeOptionsHot(id, options)
    map[id] = {
      Component: null,
      views: [],
      instances: []
    }
  }
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot (id, options) {
  options.hotID = id
  injectHook(options, 'created', function () {
    var record = map[id]
    if (!record.Component) {
      record.Component = this.constructor
    }
    record.instances.push(this)
  })
  injectHook(options, 'beforeDestroy', function () {
    map[id].instances.$remove(this)
  })
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook (options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing)
      ? existing.concat(hook)
      : [existing, hook]
    : [hook]
}

/**
 * Update a hot component.
 *
 * @param {String} id
 * @param {Object|null} newOptions
 * @param {String|null} newTemplate
 */

exports.update = function (id, newOptions, newTemplate) {
  var record = map[id]
  // force full-reload if an instance of the component is active but is not
  // managed by a view
  if (!record || (record.instances.length && !record.views.length)) {
    console.log('[HMR] Root or manually-mounted instance modified. Full reload may be required.')
    if (!isBrowserify) {
      window.location.reload()
    } else {
      // browserify-hmr somehow sends incomplete bundle if we reload here
      return
    }
  }
  if (!isBrowserify) {
    // browserify-hmr already logs this
    console.log('[HMR] Updating component: ' + format(id))
  }
  var Component = record.Component
  // update constructor
  if (newOptions) {
    // in case the user exports a constructor
    Component = record.Component = typeof newOptions === 'function'
      ? newOptions
      : Vue.extend(newOptions)
    makeOptionsHot(id, Component.options)
  }
  if (newTemplate) {
    Component.options.template = newTemplate
  }
  // handle recursive lookup
  if (Component.options.name) {
    Component.options.components[Component.options.name] = Component
  }
  // reset constructor cached linker
  Component.linker = null
  // reload all views
  record.views.forEach(function (view) {
    updateView(view, Component)
  })
  // flush devtools
  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush')
  }
}

/**
 * Update a component view instance
 *
 * @param {Directive} view
 * @param {Function} Component
 */

function updateView (view, Component) {
  if (!view._bound) {
    return
  }
  view.Component = Component
  view.hotUpdating = true
  // disable transitions
  view.vm._isCompiled = false
  // save state
  var state = extractState(view.childVM)
  // remount, make sure to disable keep-alive
  var keepAlive = view.keepAlive
  view.keepAlive = false
  view.mountComponent()
  view.keepAlive = keepAlive
  // restore state
  restoreState(view.childVM, state, true)
  // re-eanble transitions
  view.vm._isCompiled = true
  view.hotUpdating = false
}

/**
 * Extract state from a Vue instance.
 *
 * @param {Vue} vm
 * @return {Object}
 */

function extractState (vm) {
  return {
    cid: vm.constructor.cid,
    data: vm.$data,
    children: vm.$children.map(extractState)
  }
}

/**
 * Restore state to a reloaded Vue instance.
 *
 * @param {Vue} vm
 * @param {Object} state
 */

function restoreState (vm, state, isRoot) {
  var oldAsyncConfig
  if (isRoot) {
    // set Vue into sync mode during state rehydration
    oldAsyncConfig = Vue.config.async
    Vue.config.async = false
  }
  // actual restore
  if (isRoot || !vm._props) {
    vm.$data = state.data
  } else {
    Object.keys(state.data).forEach(function (key) {
      if (!vm._props[key]) {
        // for non-root, only restore non-props fields
        vm.$data[key] = state.data[key]
      }
    })
  }
  // verify child consistency
  var hasSameChildren = vm.$children.every(function (c, i) {
    return state.children[i] && state.children[i].cid === c.constructor.cid
  })
  if (hasSameChildren) {
    // rehydrate children
    vm.$children.forEach(function (c, i) {
      restoreState(c, state.children[i])
    })
  }
  if (isRoot) {
    Vue.config.async = oldAsyncConfig
  }
}

function format (id) {
  return id.match(/[^\/]+\.vue$/)[0]
}

},{}],21:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.VueMultiselect = e() : t.VueMultiselect = e();
}(undefined, function () {
  return function (t) {
    function e(i) {
      if (n[i]) return n[i].exports;var o = n[i] = { exports: {}, id: i, loaded: !1 };return t[i].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports;
    }var n = {};return e.m = t, e.c = n, e.p = "/", e(0);
  }([function (t, e, n) {
    "use strict";
    function i(t) {
      return t && t.__esModule ? t : { "default": t };
    }Object.defineProperty(e, "__esModule", { value: !0 }), e.pointerMixin = e.multiselectMixin = e.Multiselect = void 0;var o = n(81),
        r = i(o),
        s = n(28),
        l = i(s),
        a = n(29),
        u = i(a);e["default"] = r["default"], e.Multiselect = r["default"], e.multiselectMixin = l["default"], e.pointerMixin = u["default"];
  }, function (t, e) {
    var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = n);
  }, function (t, e) {
    var n = {}.hasOwnProperty;t.exports = function (t, e) {
      return n.call(t, e);
    };
  }, function (t, e, n) {
    var i = n(56),
        o = n(15);t.exports = function (t) {
      return i(o(t));
    };
  }, function (t, e) {
    var n = t.exports = { version: "2.4.0" };"number" == typeof __e && (__e = n);
  }, function (t, e, n) {
    t.exports = !n(9)(function () {
      return 7 != Object.defineProperty({}, "a", { get: function get() {
          return 7;
        } }).a;
    });
  }, function (t, e, n) {
    var i = n(7),
        o = n(13);t.exports = n(5) ? function (t, e, n) {
      return i.f(t, e, o(1, n));
    } : function (t, e, n) {
      return t[e] = n, t;
    };
  }, function (t, e, n) {
    var i = n(11),
        o = n(32),
        r = n(25),
        s = Object.defineProperty;e.f = n(5) ? Object.defineProperty : function (t, e, n) {
      if (i(t), e = r(e, !0), i(n), o) try {
        return s(t, e, n);
      } catch (l) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
    };
  }, function (t, e, n) {
    var i = n(23)("wks"),
        o = n(14),
        r = n(1).Symbol,
        s = "function" == typeof r,
        l = t.exports = function (t) {
      return i[t] || (i[t] = s && r[t] || (s ? r : o)("Symbol." + t));
    };l.store = i;
  }, function (t, e) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (e) {
        return !0;
      }
    };
  }, function (t, e, n) {
    var i = n(37),
        o = n(16);t.exports = Object.keys || function (t) {
      return i(t, o);
    };
  }, function (t, e, n) {
    var i = n(12);t.exports = function (t) {
      if (!i(t)) throw TypeError(t + " is not an object!");return t;
    };
  }, function (t, e) {
    t.exports = function (t) {
      return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? null !== t : "function" == typeof t;
    };
  }, function (t, e) {
    t.exports = function (t, e) {
      return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };
    };
  }, function (t, e) {
    var n = 0,
        i = Math.random();t.exports = function (t) {
      return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + i).toString(36));
    };
  }, function (t, e) {
    t.exports = function (t) {
      if (void 0 == t) throw TypeError("Can't call method on  " + t);return t;
    };
  }, function (t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function (t, e, n) {
    var i = n(1),
        o = n(4),
        r = n(53),
        s = n(6),
        l = "prototype",
        a = function a(t, e, n) {
      var u,
          c,
          f,
          p = t & a.F,
          d = t & a.G,
          h = t & a.S,
          m = t & a.P,
          v = t & a.B,
          b = t & a.W,
          g = d ? o : o[e] || (o[e] = {}),
          y = g[l],
          x = d ? i : h ? i[e] : (i[e] || {})[l];d && (n = e);for (u in n) {
        c = !p && x && void 0 !== x[u], c && u in g || (f = c ? x[u] : n[u], g[u] = d && "function" != typeof x[u] ? n[u] : v && c ? r(f, i) : b && x[u] == f ? function (t) {
          var e = function e(_e, n, i) {
            if (this instanceof t) {
              switch (arguments.length) {case 0:
                  return new t();case 1:
                  return new t(_e);case 2:
                  return new t(_e, n);}return new t(_e, n, i);
            }return t.apply(this, arguments);
          };return e[l] = t[l], e;
        }(f) : m && "function" == typeof f ? r(Function.call, f) : f, m && ((g.virtual || (g.virtual = {}))[u] = f, t & a.R && y && !y[u] && s(y, u, f)));
      }
    };a.F = 1, a.G = 2, a.S = 4, a.P = 8, a.B = 16, a.W = 32, a.U = 64, a.R = 128, t.exports = a;
  }, function (t, e) {
    t.exports = {};
  }, function (t, e) {
    t.exports = !0;
  }, function (t, e) {
    e.f = {}.propertyIsEnumerable;
  }, function (t, e, n) {
    var i = n(7).f,
        o = n(2),
        r = n(8)("toStringTag");t.exports = function (t, e, n) {
      t && !o(t = n ? t : t.prototype, r) && i(t, r, { configurable: !0, value: e });
    };
  }, function (t, e, n) {
    var i = n(23)("keys"),
        o = n(14);t.exports = function (t) {
      return i[t] || (i[t] = o(t));
    };
  }, function (t, e, n) {
    var i = n(1),
        o = "__core-js_shared__",
        r = i[o] || (i[o] = {});t.exports = function (t) {
      return r[t] || (r[t] = {});
    };
  }, function (t, e) {
    var n = Math.ceil,
        i = Math.floor;t.exports = function (t) {
      return isNaN(t = +t) ? 0 : (t > 0 ? i : n)(t);
    };
  }, function (t, e, n) {
    var i = n(12);t.exports = function (t, e) {
      if (!i(t)) return t;var n, o;if (e && "function" == typeof (n = t.toString) && !i(o = n.call(t))) return o;if ("function" == typeof (n = t.valueOf) && !i(o = n.call(t))) return o;if (!e && "function" == typeof (n = t.toString) && !i(o = n.call(t))) return o;throw TypeError("Can't convert object to primitive value");
    };
  }, function (t, e, n) {
    var i = n(1),
        o = n(4),
        r = n(19),
        s = n(27),
        l = n(7).f;t.exports = function (t) {
      var e = o.Symbol || (o.Symbol = r ? {} : i.Symbol || {});"_" == t.charAt(0) || t in e || l(e, t, { value: s.f(t) });
    };
  }, function (t, e, n) {
    e.f = n(8);
  }, function (t, e, n) {
    "use strict";
    function i(t) {
      return t && t.__esModule ? t : { "default": t };
    }function o(t) {
      if (Array.isArray(t)) return t.map(o);if (t && "object" === ("undefined" == typeof t ? "undefined" : (0, c["default"])(t))) {
        for (var e = {}, n = (0, a["default"])(t), i = 0, r = n.length; r > i; i++) {
          var s = n[i];e[s] = o(t[s]);
        }return e;
      }return t;
    }var r = n(41),
        s = i(r),
        l = n(42),
        a = i(l),
        u = n(45),
        c = i(u);t.exports = { data: function data() {
        return { search: "", isOpen: !1, value: [], loading: !1 };
      }, props: { options: { type: Array, required: !0 }, multiple: { type: Boolean, "default": !1 }, selected: { required: !0 }, key: { type: String, "default": !1 }, label: { type: String, "default": !1 }, searchable: { type: Boolean, "default": !0 }, clearOnSelect: { type: Boolean, "default": !0 }, hideSelected: { type: Boolean, "default": !1 }, placeholder: { type: String, "default": "Select option" }, maxHeight: { type: Number, "default": 300 }, allowEmpty: { type: Boolean, "default": !0 }, onChange: { type: Function, "default": !1 }, onSearchChange: { type: Function, "default": !1 }, touched: { type: Boolean, "default": !1 }, resetAfter: { type: Boolean, "default": !1 }, closeOnSelect: { type: Boolean, "default": !0 }, customLabel: { type: Function, "default": !1 }, taggable: { type: Boolean, "default": !1 }, onTag: { type: Function, "default": function _default(t) {
            this.options.push(t), this.value.push(t);
          } }, tagPlaceholder: { type: String, "default": "Press enter to create a tag" }, max: { type: Number, "default": !1 } }, created: function created() {
        this.selected ? this.value = o(this.selected) : this.$set("value", this.multiple ? [] : null), this.searchable && !this.multiple && (this.search = this.getOptionLabel(this.value));
      }, computed: { filteredOptions: function filteredOptions() {
          var t = this.search || "",
              e = this.hideSelected ? this.options.filter(this.isNotSelected) : this.options;return e = this.$options.filters.filterBy(e, this.search), this.taggable && t.length && !this.isExistingOption(t) && e.unshift({ isTag: !0, label: t }), e;
        }, valueKeys: function valueKeys() {
          var t = this;return this.key ? this.multiple ? this.value.map(function (e) {
            return e[t.key];
          }) : this.value[this.key] : this.value;
        }, optionKeys: function optionKeys() {
          var t = this;return this.label ? this.options.map(function (e) {
            return e[t.label];
          }) : this.options;
        } }, watch: { value: function value() {
          this.onChange && (0, s["default"])(this.value) !== (0, s["default"])(this.selected) ? this.onChange(o(this.value)) : this.$set("selected", o(this.value)), this.resetAfter && (this.$set("value", null), this.$set("search", null), this.$set("selected", null)), !this.multiple && this.searchable && this.clearOnSelect && (this.search = this.getOptionLabel(this.value));
        }, search: function search() {
          this.onSearchChange && (this.onSearchChange(this.search), this.loading = !0);
        }, options: function options() {
          this.onSearchChange && (this.loading = !1);
        }, selected: function selected(t, e) {
          (0, s["default"])(t) !== (0, s["default"])(e) && (this.value = o(this.selected));
        } }, methods: { isExistingOption: function isExistingOption(t) {
          return this.options ? this.optionKeys.indexOf(t) > -1 : !1;
        }, isSelected: function isSelected(t) {
          if (!this.value) return !1;var e = this.key ? t[this.key] : t;return this.multiple ? this.valueKeys.indexOf(e) > -1 : this.valueKeys === e;
        }, isNotSelected: function isNotSelected(t) {
          return !this.isSelected(t);
        }, getOptionLabel: function getOptionLabel(t) {
          return "object" !== ("undefined" == typeof t ? "undefined" : (0, c["default"])(t)) || null === t ? t : this.customLabel ? this.customLabel(t) : this.label && t[this.label] ? t[this.label] : t.label ? t.label : void 0;
        }, select: function select(t) {
          this.max && this.multiple && this.value.length === this.max || (t.isTag ? (this.onTag(t.label), this.search = "") : this.multiple ? this.isNotSelected(t) ? (this.value.push(t), this.clearOnSelect && (this.search = "")) : this.removeElement(t) : (this.$set("value", !this.isNotSelected(t) && this.allowEmpty ? null : t), this.closeOnSelect && (this.searchable ? this.$els.search.blur() : this.$el.blur())));
        }, removeElement: function removeElement(t) {
          if (this.allowEmpty || this.value.length > 1) if (this.multiple && "object" === ("undefined" == typeof t ? "undefined" : (0, c["default"])(t))) {
            var e = this.valueKeys.indexOf(t[this.key]);this.value.splice(e, 1);
          } else this.value.$remove(t);
        }, removeLastElement: function removeLastElement() {
          0 === this.search.length && Array.isArray(this.value) && this.removeElement(this.value[this.value.length - 1]);
        }, activate: function activate() {
          this.isOpen || (this.isOpen = !0, this.searchable ? (this.search = "", this.$els.search.focus()) : this.$el.focus());
        }, deactivate: function deactivate() {
          this.isOpen && (this.isOpen = !1, this.touched = !0, this.searchable ? (this.$els.search.blur(), this.search = this.multiple ? "" : this.getOptionLabel(this.value)) : this.$el.blur());
        }, toggle: function toggle() {
          this.isOpen ? this.deactivate() : this.activate();
        } } };
  }, function (t, e) {
    "use strict";
    t.exports = { data: function data() {
        return { pointer: 0 };
      }, props: { showPointer: { type: Boolean, "default": !0 } }, methods: { addPointerElement: function addPointerElement() {
          this.filteredOptions.length > 0 && this.select(this.filteredOptions[this.pointer]), this.pointerReset();
        }, pointerForward: function pointerForward() {
          if (this.pointer < this.filteredOptions.length - 1) {
            this.pointer++;var t = 40 * this.pointer,
                e = this.maxHeight / 40;this.$els.list.scrollTop <= t - 40 * e && (this.$els.list.scrollTop = t - 40 * (e - 1));
          }
        }, pointerBackward: function pointerBackward() {
          if (this.pointer > 0) {
            this.pointer--;var t = 40 * this.pointer;this.$els.list.scrollTop >= t && (this.$els.list.scrollTop = t);
          }
        }, pointerReset: function pointerReset() {
          this.pointer = 0, this.$els.list && (this.$els.list.scrollTop = 0);
        }, pointerSet: function pointerSet(t) {
          this.pointer = t;
        } } };
  }, function (t, e) {
    var n = {}.toString;t.exports = function (t) {
      return n.call(t).slice(8, -1);
    };
  }, function (t, e, n) {
    var i = n(12),
        o = n(1).document,
        r = i(o) && i(o.createElement);t.exports = function (t) {
      return r ? o.createElement(t) : {};
    };
  }, function (t, e, n) {
    t.exports = !n(5) && !n(9)(function () {
      return 7 != Object.defineProperty(n(31)("div"), "a", { get: function get() {
          return 7;
        } }).a;
    });
  }, function (t, e, n) {
    "use strict";
    var i = n(19),
        o = n(17),
        r = n(38),
        s = n(6),
        l = n(2),
        a = n(18),
        u = n(58),
        c = n(21),
        f = n(65),
        p = n(8)("iterator"),
        d = !([].keys && "next" in [].keys()),
        h = "@@iterator",
        m = "keys",
        v = "values",
        b = function b() {
      return this;
    };t.exports = function (t, e, n, g, y, x, _) {
      u(n, e, g);var w,
          O,
          S,
          k = function k(t) {
        if (!d && t in P) return P[t];switch (t) {case m:
            return function () {
              return new n(this, t);
            };case v:
            return function () {
              return new n(this, t);
            };}return function () {
          return new n(this, t);
        };
      },
          j = e + " Iterator",
          E = y == v,
          M = !1,
          P = t.prototype,
          L = P[p] || P[h] || y && P[y],
          N = L || k(y),
          T = y ? E ? k("entries") : N : void 0,
          A = "Array" == e ? P.entries || L : L;if (A && (S = f(A.call(new t())), S !== Object.prototype && (c(S, j, !0), i || l(S, p) || s(S, p, b))), E && L && L.name !== v && (M = !0, N = function N() {
        return L.call(this);
      }), i && !_ || !d && !M && P[p] || s(P, p, N), a[e] = N, a[j] = b, y) if (w = { values: E ? N : k(v), keys: x ? N : k(m), entries: T }, _) for (O in w) {
        O in P || r(P, O, w[O]);
      } else o(o.P + o.F * (d || M), e, w);return w;
    };
  }, function (t, e, n) {
    var i = n(11),
        o = n(62),
        r = n(16),
        s = n(22)("IE_PROTO"),
        l = function l() {},
        a = "prototype",
        _u = function u() {
      var t,
          e = n(31)("iframe"),
          i = r.length,
          o = ">";for (e.style.display = "none", n(55).appendChild(e), e.src = "javascript:", t = e.contentWindow.document, t.open(), t.write("<script>document.F=Object</script" + o), t.close(), _u = t.F; i--;) {
        delete _u[a][r[i]];
      }return _u();
    };t.exports = Object.create || function (t, e) {
      var n;return null !== t ? (l[a] = i(t), n = new l(), l[a] = null, n[s] = t) : n = _u(), void 0 === e ? n : o(n, e);
    };
  }, function (t, e, n) {
    var i = n(37),
        o = n(16).concat("length", "prototype");e.f = Object.getOwnPropertyNames || function (t) {
      return i(t, o);
    };
  }, function (t, e) {
    e.f = Object.getOwnPropertySymbols;
  }, function (t, e, n) {
    var i = n(2),
        o = n(3),
        r = n(52)(!1),
        s = n(22)("IE_PROTO");t.exports = function (t, e) {
      var n,
          l = o(t),
          a = 0,
          u = [];for (n in l) {
        n != s && i(l, n) && u.push(n);
      }for (; e.length > a;) {
        i(l, n = e[a++]) && (~r(u, n) || u.push(n));
      }return u;
    };
  }, function (t, e, n) {
    t.exports = n(6);
  }, function (t, e, n) {
    var i = n(15);t.exports = function (t) {
      return Object(i(t));
    };
  }, function (t, e, n) {
    "use strict";
    function i(t) {
      return t && t.__esModule ? t : { "default": t };
    }Object.defineProperty(e, "__esModule", { value: !0 });var o = n(28),
        r = i(o),
        s = n(29),
        l = i(s);e["default"] = { mixins: [r["default"], l["default"]], props: { selectLabel: { type: String, "default": "Press enter to select" }, selectedLabel: { type: String, "default": "Selected" }, deselectLabel: { type: String, "default": "Press enter to remove" }, showLabels: { type: Boolean, "default": !0 }, limit: { type: Number, "default": 99999 }, limitText: { type: Function, "default": function _default(t) {
            return "and " + t + " more";
          } } }, computed: { visibleValue: function visibleValue() {
          return this.multiple ? this.value.slice(0, this.limit) : this.value;
        } }, ready: function ready() {
        this.showLabels || (this.deselectLabel = this.selectedLabel = this.selectLabel = "");
      } };
  }, function (t, e, n) {
    t.exports = { "default": n(46), __esModule: !0 };
  }, function (t, e, n) {
    t.exports = { "default": n(47), __esModule: !0 };
  }, function (t, e, n) {
    t.exports = { "default": n(48), __esModule: !0 };
  }, function (t, e, n) {
    t.exports = { "default": n(49), __esModule: !0 };
  }, function (t, e, n) {
    "use strict";
    function i(t) {
      return t && t.__esModule ? t : { "default": t };
    }e.__esModule = !0;var o = n(44),
        r = i(o),
        s = n(43),
        l = i(s),
        a = "function" == typeof l["default"] && "symbol" == _typeof(r["default"]) ? function (t) {
      return typeof t === "undefined" ? "undefined" : _typeof(t);
    } : function (t) {
      return t && "function" == typeof l["default"] && t.constructor === l["default"] ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
    };e["default"] = "function" == typeof l["default"] && "symbol" === a(r["default"]) ? function (t) {
      return "undefined" == typeof t ? "undefined" : a(t);
    } : function (t) {
      return t && "function" == typeof l["default"] && t.constructor === l["default"] ? "symbol" : "undefined" == typeof t ? "undefined" : a(t);
    };
  }, function (t, e, n) {
    var i = n(4),
        o = i.JSON || (i.JSON = { stringify: JSON.stringify });t.exports = function (t) {
      return o.stringify.apply(o, arguments);
    };
  }, function (t, e, n) {
    n(71), t.exports = n(4).Object.keys;
  }, function (t, e, n) {
    n(74), n(72), n(75), n(76), t.exports = n(4).Symbol;
  }, function (t, e, n) {
    n(73), n(77), t.exports = n(27).f("iterator");
  }, function (t, e) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
    };
  }, function (t, e) {
    t.exports = function () {};
  }, function (t, e, n) {
    var i = n(3),
        o = n(69),
        r = n(68);t.exports = function (t) {
      return function (e, n, s) {
        var l,
            a = i(e),
            u = o(a.length),
            c = r(s, u);if (t && n != n) {
          for (; u > c;) {
            if (l = a[c++], l != l) return !0;
          }
        } else for (; u > c; c++) {
          if ((t || c in a) && a[c] === n) return t || c || 0;
        }return !t && -1;
      };
    };
  }, function (t, e, n) {
    var i = n(50);t.exports = function (t, e, n) {
      if (i(t), void 0 === e) return t;switch (n) {case 1:
          return function (n) {
            return t.call(e, n);
          };case 2:
          return function (n, i) {
            return t.call(e, n, i);
          };case 3:
          return function (n, i, o) {
            return t.call(e, n, i, o);
          };}return function () {
        return t.apply(e, arguments);
      };
    };
  }, function (t, e, n) {
    var i = n(10),
        o = n(36),
        r = n(20);t.exports = function (t) {
      var e = i(t),
          n = o.f;if (n) for (var s, l = n(t), a = r.f, u = 0; l.length > u;) {
        a.call(t, s = l[u++]) && e.push(s);
      }return e;
    };
  }, function (t, e, n) {
    t.exports = n(1).document && document.documentElement;
  }, function (t, e, n) {
    var i = n(30);t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
      return "String" == i(t) ? t.split("") : Object(t);
    };
  }, function (t, e, n) {
    var i = n(30);t.exports = Array.isArray || function (t) {
      return "Array" == i(t);
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(34),
        o = n(13),
        r = n(21),
        s = {};n(6)(s, n(8)("iterator"), function () {
      return this;
    }), t.exports = function (t, e, n) {
      t.prototype = i(s, { next: o(1, n) }), r(t, e + " Iterator");
    };
  }, function (t, e) {
    t.exports = function (t, e) {
      return { value: e, done: !!t };
    };
  }, function (t, e, n) {
    var i = n(10),
        o = n(3);t.exports = function (t, e) {
      for (var n, r = o(t), s = i(r), l = s.length, a = 0; l > a;) {
        if (r[n = s[a++]] === e) return n;
      }
    };
  }, function (t, e, n) {
    var i = n(14)("meta"),
        o = n(12),
        r = n(2),
        s = n(7).f,
        l = 0,
        a = Object.isExtensible || function () {
      return !0;
    },
        u = !n(9)(function () {
      return a(Object.preventExtensions({}));
    }),
        c = function c(t) {
      s(t, i, { value: { i: "O" + ++l, w: {} } });
    },
        f = function f(t, e) {
      if (!o(t)) return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : ("string" == typeof t ? "S" : "P") + t;if (!r(t, i)) {
        if (!a(t)) return "F";if (!e) return "E";c(t);
      }return t[i].i;
    },
        p = function p(t, e) {
      if (!r(t, i)) {
        if (!a(t)) return !0;if (!e) return !1;c(t);
      }return t[i].w;
    },
        d = function d(t) {
      return u && h.NEED && a(t) && !r(t, i) && c(t), t;
    },
        h = t.exports = { KEY: i, NEED: !1, fastKey: f, getWeak: p, onFreeze: d };
  }, function (t, e, n) {
    var i = n(7),
        o = n(11),
        r = n(10);t.exports = n(5) ? Object.defineProperties : function (t, e) {
      o(t);for (var n, s = r(e), l = s.length, a = 0; l > a;) {
        i.f(t, n = s[a++], e[n]);
      }return t;
    };
  }, function (t, e, n) {
    var i = n(20),
        o = n(13),
        r = n(3),
        s = n(25),
        l = n(2),
        a = n(32),
        u = Object.getOwnPropertyDescriptor;e.f = n(5) ? u : function (t, e) {
      if (t = r(t), e = s(e, !0), a) try {
        return u(t, e);
      } catch (n) {}return l(t, e) ? o(!i.f.call(t, e), t[e]) : void 0;
    };
  }, function (t, e, n) {
    var i = n(3),
        o = n(35).f,
        r = {}.toString,
        s = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        l = function l(t) {
      try {
        return o(t);
      } catch (e) {
        return s.slice();
      }
    };t.exports.f = function (t) {
      return s && "[object Window]" == r.call(t) ? l(t) : o(i(t));
    };
  }, function (t, e, n) {
    var i = n(2),
        o = n(39),
        r = n(22)("IE_PROTO"),
        s = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {
      return t = o(t), i(t, r) ? t[r] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? s : null;
    };
  }, function (t, e, n) {
    var i = n(17),
        o = n(4),
        r = n(9);t.exports = function (t, e) {
      var n = (o.Object || {})[t] || Object[t],
          s = {};s[t] = e(n), i(i.S + i.F * r(function () {
        n(1);
      }), "Object", s);
    };
  }, function (t, e, n) {
    var i = n(24),
        o = n(15);t.exports = function (t) {
      return function (e, n) {
        var r,
            s,
            l = String(o(e)),
            a = i(n),
            u = l.length;return 0 > a || a >= u ? t ? "" : void 0 : (r = l.charCodeAt(a), 55296 > r || r > 56319 || a + 1 === u || (s = l.charCodeAt(a + 1)) < 56320 || s > 57343 ? t ? l.charAt(a) : r : t ? l.slice(a, a + 2) : (r - 55296 << 10) + (s - 56320) + 65536);
      };
    };
  }, function (t, e, n) {
    var i = n(24),
        o = Math.max,
        r = Math.min;t.exports = function (t, e) {
      return t = i(t), 0 > t ? o(t + e, 0) : r(t, e);
    };
  }, function (t, e, n) {
    var i = n(24),
        o = Math.min;t.exports = function (t) {
      return t > 0 ? o(i(t), 9007199254740991) : 0;
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(51),
        o = n(59),
        r = n(18),
        s = n(3);t.exports = n(33)(Array, "Array", function (t, e) {
      this._t = s(t), this._i = 0, this._k = e;
    }, function () {
      var t = this._t,
          e = this._k,
          n = this._i++;return !t || n >= t.length ? (this._t = void 0, o(1)) : "keys" == e ? o(0, n) : "values" == e ? o(0, t[n]) : o(0, [n, t[n]]);
    }, "values"), r.Arguments = r.Array, i("keys"), i("values"), i("entries");
  }, function (t, e, n) {
    var i = n(39),
        o = n(10);n(66)("keys", function () {
      return function (t) {
        return o(i(t));
      };
    });
  }, function (t, e) {}, function (t, e, n) {
    "use strict";
    var i = n(67)(!0);n(33)(String, "String", function (t) {
      this._t = String(t), this._i = 0;
    }, function () {
      var t,
          e = this._t,
          n = this._i;return n >= e.length ? { value: void 0, done: !0 } : (t = i(e, n), this._i += t.length, { value: t, done: !1 });
    });
  }, function (t, e, n) {
    "use strict";
    var i = n(1),
        o = n(2),
        r = n(5),
        s = n(17),
        l = n(38),
        a = n(61).KEY,
        u = n(9),
        c = n(23),
        f = n(21),
        p = n(14),
        d = n(8),
        h = n(27),
        m = n(26),
        v = n(60),
        b = n(54),
        g = n(57),
        y = n(11),
        x = n(3),
        _ = n(25),
        w = n(13),
        O = n(34),
        S = n(64),
        k = n(63),
        j = n(7),
        E = n(10),
        M = k.f,
        P = j.f,
        L = S.f,
        _N = i.Symbol,
        T = i.JSON,
        A = T && T.stringify,
        C = "prototype",
        F = d("_hidden"),
        $ = d("toPrimitive"),
        B = {}.propertyIsEnumerable,
        z = c("symbol-registry"),
        I = c("symbols"),
        R = c("op-symbols"),
        K = Object[C],
        J = "function" == typeof _N,
        D = i.QObject,
        W = !D || !D[C] || !D[C].findChild,
        H = r && u(function () {
      return 7 != O(P({}, "a", { get: function get() {
          return P(this, "a", { value: 7 }).a;
        } })).a;
    }) ? function (t, e, n) {
      var i = M(K, e);i && delete K[e], P(t, e, n), i && t !== K && P(K, e, i);
    } : P,
        U = function U(t) {
      var e = I[t] = O(_N[C]);return e._k = t, e;
    },
        V = J && "symbol" == _typeof(_N.iterator) ? function (t) {
      return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t));
    } : function (t) {
      return t instanceof _N;
    },
        q = function q(t, e, n) {
      return t === K && q(R, e, n), y(t), e = _(e, !0), y(n), o(I, e) ? (n.enumerable ? (o(t, F) && t[F][e] && (t[F][e] = !1), n = O(n, { enumerable: w(0, !1) })) : (o(t, F) || P(t, F, w(1, {})), t[F][e] = !0), H(t, e, n)) : P(t, e, n);
    },
        G = function G(t, e) {
      y(t);for (var n, i = b(e = x(e)), o = 0, r = i.length; r > o;) {
        q(t, n = i[o++], e[n]);
      }return t;
    },
        Y = function Y(t, e) {
      return void 0 === e ? O(t) : G(O(t), e);
    },
        Q = function Q(t) {
      var e = B.call(this, t = _(t, !0));return this === K && o(I, t) && !o(R, t) ? !1 : e || !o(this, t) || !o(I, t) || o(this, F) && this[F][t] ? e : !0;
    },
        X = function X(t, e) {
      if (t = x(t), e = _(e, !0), t !== K || !o(I, e) || o(R, e)) {
        var n = M(t, e);return !n || !o(I, e) || o(t, F) && t[F][e] || (n.enumerable = !0), n;
      }
    },
        Z = function Z(t) {
      for (var e, n = L(x(t)), i = [], r = 0; n.length > r;) {
        o(I, e = n[r++]) || e == F || e == a || i.push(e);
      }return i;
    },
        tt = function tt(t) {
      for (var e, n = t === K, i = L(n ? R : x(t)), r = [], s = 0; i.length > s;) {
        o(I, e = i[s++]) && (n ? o(K, e) : !0) && r.push(I[e]);
      }return r;
    };J || (_N = function N() {
      if (this instanceof _N) throw TypeError("Symbol is not a constructor!");var t = p(arguments.length > 0 ? arguments[0] : void 0),
          e = function e(n) {
        this === K && e.call(R, n), o(this, F) && o(this[F], t) && (this[F][t] = !1), H(this, t, w(1, n));
      };return r && W && H(K, t, { configurable: !0, set: e }), U(t);
    }, l(_N[C], "toString", function () {
      return this._k;
    }), k.f = X, j.f = q, n(35).f = S.f = Z, n(20).f = Q, n(36).f = tt, r && !n(19) && l(K, "propertyIsEnumerable", Q, !0), h.f = function (t) {
      return U(d(t));
    }), s(s.G + s.W + s.F * !J, { Symbol: _N });for (var et = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), nt = 0; et.length > nt;) {
      d(et[nt++]);
    }for (var et = E(d.store), nt = 0; et.length > nt;) {
      m(et[nt++]);
    }s(s.S + s.F * !J, "Symbol", { "for": function _for(t) {
        return o(z, t += "") ? z[t] : z[t] = _N(t);
      }, keyFor: function keyFor(t) {
        if (V(t)) return v(z, t);throw TypeError(t + " is not a symbol!");
      }, useSetter: function useSetter() {
        W = !0;
      }, useSimple: function useSimple() {
        W = !1;
      } }), s(s.S + s.F * !J, "Object", { create: Y, defineProperty: q, defineProperties: G, getOwnPropertyDescriptor: X, getOwnPropertyNames: Z, getOwnPropertySymbols: tt }), T && s(s.S + s.F * (!J || u(function () {
      var t = _N();return "[null]" != A([t]) || "{}" != A({ a: t }) || "{}" != A(Object(t));
    })), "JSON", { stringify: function stringify(t) {
        if (void 0 !== t && !V(t)) {
          for (var e, n, i = [t], o = 1; arguments.length > o;) {
            i.push(arguments[o++]);
          }return e = i[1], "function" == typeof e && (n = e), !n && g(e) || (e = function e(t, _e2) {
            return n && (_e2 = n.call(this, t, _e2)), V(_e2) ? void 0 : _e2;
          }), i[1] = e, A.apply(T, i);
        }
      } }), _N[C][$] || n(6)(_N[C], $, _N[C].valueOf), f(_N, "Symbol"), f(Math, "Math", !0), f(i.JSON, "JSON", !0);
  }, function (t, e, n) {
    n(26)("asyncIterator");
  }, function (t, e, n) {
    n(26)("observable");
  }, function (t, e, n) {
    n(70);for (var i = n(1), o = n(6), r = n(18), s = n(8)("toStringTag"), l = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], a = 0; 5 > a; a++) {
      var u = l[a],
          c = i[u],
          f = c && c.prototype;f && !f[s] && o(f, s, u), r[u] = r.Array;
    }
  }, function (t, e, n) {
    e = t.exports = n(79)(), e.push([t.id, '.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:"";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border-color:#41b883 transparent transparent;border-style:solid;border-width:2px;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{-webkit-animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.multiselect__spinner:after{-webkit-animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.multiselect__loading-transition{-webkit-transition:opacity .4s ease-in-out;transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:14px}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:none}.multiselect--active{z-index:50}.multiselect--active .multiselect__current,.multiselect--active .multiselect__input,.multiselect--active .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:1px 0 0 5px;width:100%;-webkit-transition:border .1s ease;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px}.multiselect__tag~.multiselect__input{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:none}.multiselect__single{padding-left:6px;margin-bottom:8px}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:8px}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:initial;width:22px;text-align:center;line-height:22px;-webkit-transition:all .2s ease;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:"\\D7";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 12px 0;padding-right:30px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;-webkit-transition:-webkit-transform .2s ease;transition:-webkit-transform .2s ease;transition:transform .2s ease;transition:transform .2s ease,-webkit-transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-style:solid;border-width:5px 5px 0;border-color:#999 transparent transparent;content:""}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content{position:absolute;list-style:none;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;padding:0;margin:0;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50}.multiselect__content::webkit-scrollbar{display:none}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px}.multiselect__option--highlight{background:#41b883;outline:none;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{content:attr(data-deselect);color:#fff}.multiselect--disabled{background:#ededed;pointer-events:none}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select,.multiselect__option--disabled{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{cursor:text;pointer-events:none}.multiselect__option--disabled:visited{color:#a6a6a6}.multiselect__option--disabled:focus,.multiselect__option--disabled:hover{background:#3dad7b}.multiselect-transition{-webkit-transition:all .3s ease;transition:all .3s ease}.multiselect-enter,.multiselect-leave{opacity:0;max-height:0!important}@-webkit-keyframes spinning{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(2turn);transform:rotate(2turn)}}@keyframes spinning{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(2turn);transform:rotate(2turn)}}', ""]);
  }, function (t, e) {
    t.exports = function () {
      var t = [];return t.toString = function () {
        for (var t = [], e = 0; e < this.length; e++) {
          var n = this[e];n[2] ? t.push("@media " + n[2] + "{" + n[1] + "}") : t.push(n[1]);
        }return t.join("");
      }, t.i = function (e, n) {
        "string" == typeof e && (e = [[null, e, ""]]);for (var i = {}, o = 0; o < this.length; o++) {
          var r = this[o][0];"number" == typeof r && (i[r] = !0);
        }for (o = 0; o < e.length; o++) {
          var s = e[o];"number" == typeof s[0] && i[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), t.push(s));
        }
      }, t;
    };
  }, function (t, e) {
    t.exports = '<div tabindex=0 :class="{ \'multiselect--active\': isOpen }" @focus=activate() @blur="searchable ? false : deactivate()" @keydown.self.down.prevent=pointerForward() @keydown.self.up.prevent=pointerBackward() @keydown.enter.stop.prevent.self=addPointerElement() @keyup.esc=deactivate() class=multiselect> <div @mousedown.prevent=toggle() class=multiselect__select></div> <div v-el:tags=v-el:tags class=multiselect__tags> <span v-if=multiple v-for="option in visibleValue" track-by=$index onmousedown=event.preventDefault() class=multiselect__tag> {{ getOptionLabel(option) }} <i aria-hidden=true tabindex=1 @keydown.enter.prevent=removeElement(option) @mousedown.prevent=removeElement(option) class=multiselect__tag-icon></i> </span> <template v-if="value && value.length > limit"> <strong>{{ limitText(value.length - limit) }}</strong> </template> <div v-show=loading transition=multiselect__loading class=multiselect__spinner></div> <input name=search type=text autocomplete=off :placeholder=placeholder v-el:search v-if=searchable v-model=search @focus.prevent=activate() @blur.prevent=deactivate() @input=pointerReset() @keyup.esc=deactivate() @keyup.down=pointerForward() @keyup.up=pointerBackward() @keydown.enter.stop.prevent.self=addPointerElement() @keydown.delete=removeLastElement() class=multiselect__input /> <span v-if="!searchable && !multiple" class=multiselect__single>{{ getOptionLabel(value) ? getOptionLabel(value) : placeholder }}</span> </div> <ul transition=multiselect :style="{ maxHeight: maxHeight + \'px\' }" v-el:list=v-el:list v-show=isOpen class=multiselect__content> <slot name=beforeList></slot> <li v-if="multiple && max === value.length"> <span class=multiselect__option> <slot name=maxElements>Maximum of {{ max }} options selected. First remove a selected option to select another.</slot> </span> </li> <template v-if="!max || value.length < max"> <li v-for="option in filteredOptions" track-by=$index> <span tabindex=0 :class="{ \'multiselect__option--highlight\': $index === pointer && this.showPointer, \'multiselect__option--selected\': !isNotSelected(option) }" @mousedown.prevent=select(option) @mouseover=pointerSet($index) :data-select="option.isTag ? tagPlaceholder : selectLabel" :data-selected=selectedLabel :data-deselect=deselectLabel class=multiselect__option> {{ getOptionLabel(option) }} </span> </li> </template> <li v-show="filteredOptions.length === 0 && search"> <span class=multiselect__option> <slot name=noResult>No elements found. Consider changing the search query.</slot> </span> </li> <slot name=afterList></slot> </ul> </div>';
  }, function (t, e, n) {
    var i, o;n(83), i = n(40), o = n(80), t.exports = i || {}, t.exports.__esModule && (t.exports = t.exports["default"]), o && (("function" == typeof t.exports ? t.exports.options || (t.exports.options = {}) : t.exports).template = o);
  }, function (t, e, n) {
    function i(t, e) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n],
            o = f[i.id];if (o) {
          o.refs++;for (var r = 0; r < o.parts.length; r++) {
            o.parts[r](i.parts[r]);
          }for (; r < i.parts.length; r++) {
            o.parts.push(a(i.parts[r], e));
          }
        } else {
          for (var s = [], r = 0; r < i.parts.length; r++) {
            s.push(a(i.parts[r], e));
          }f[i.id] = { id: i.id, refs: 1, parts: s };
        }
      }
    }function o(t) {
      for (var e = [], n = {}, i = 0; i < t.length; i++) {
        var o = t[i],
            r = o[0],
            s = o[1],
            l = o[2],
            a = o[3],
            u = { css: s, media: l, sourceMap: a };n[r] ? n[r].parts.push(u) : e.push(n[r] = { id: r, parts: [u] });
      }return e;
    }function r(t, e) {
      var n = h(),
          i = b[b.length - 1];if ("top" === t.insertAt) i ? i.nextSibling ? n.insertBefore(e, i.nextSibling) : n.appendChild(e) : n.insertBefore(e, n.firstChild), b.push(e);else {
        if ("bottom" !== t.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e);
      }
    }function s(t) {
      t.parentNode.removeChild(t);var e = b.indexOf(t);e >= 0 && b.splice(e, 1);
    }function l(t) {
      var e = document.createElement("style");return e.type = "text/css", r(t, e), e;
    }function a(t, e) {
      var n, i, o;if (e.singleton) {
        var r = v++;n = m || (m = l(e)), i = u.bind(null, n, r, !1), o = u.bind(null, n, r, !0);
      } else n = l(e), i = c.bind(null, n), o = function o() {
        s(n);
      };return i(t), function (e) {
        if (e) {
          if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;i(t = e);
        } else o();
      };
    }function u(t, e, n, i) {
      var o = n ? "" : i.css;if (t.styleSheet) t.styleSheet.cssText = g(e, o);else {
        var r = document.createTextNode(o),
            s = t.childNodes;
        s[e] && t.removeChild(s[e]), s.length ? t.insertBefore(r, s[e]) : t.appendChild(r);
      }
    }function c(t, e) {
      var n = e.css,
          i = e.media,
          o = e.sourceMap;if (i && t.setAttribute("media", i), o && (n += "\n/*# sourceURL=" + o.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"), t.styleSheet) t.styleSheet.cssText = n;else {
        for (; t.firstChild;) {
          t.removeChild(t.firstChild);
        }t.appendChild(document.createTextNode(n));
      }
    }var f = {},
        p = function p(t) {
      var e;return function () {
        return "undefined" == typeof e && (e = t.apply(this, arguments)), e;
      };
    },
        d = p(function () {
      return (/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
      );
    }),
        h = p(function () {
      return document.head || document.getElementsByTagName("head")[0];
    }),
        m = null,
        v = 0,
        b = [];t.exports = function (t, e) {
      e = e || {}, "undefined" == typeof e.singleton && (e.singleton = d()), "undefined" == typeof e.insertAt && (e.insertAt = "bottom");var n = o(t);return i(n, e), function (t) {
        for (var r = [], s = 0; s < n.length; s++) {
          var l = n[s],
              a = f[l.id];a.refs--, r.push(a);
        }if (t) {
          var u = o(t);i(u, e);
        }for (var s = 0; s < r.length; s++) {
          var a = r[s];if (0 === a.refs) {
            for (var c = 0; c < a.parts.length; c++) {
              a.parts[c]();
            }delete f[a.id];
          }
        }
      };
    };var g = function () {
      var t = [];return function (e, n) {
        return t[e] = n, t.filter(Boolean).join("\n");
      };
    }();
  }, function (t, e, n) {
    var i = n(78);"string" == typeof i && (i = [[t.id, i, ""]]);n(82)(i, {});i.locals && (t.exports = i.locals);
  }]);
});


},{}],22:[function(require,module,exports){
/*!
 * vue-resource v0.7.4
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

/**
 * Utility functions.
 */

var util = {};
var config = {};
var array = [];
var console = window.console;
function Util (Vue) {
    util = Vue.util;
    config = Vue.config;
}

var isArray = Array.isArray;

function warn(msg) {
    if (console && util.warn && (!config.silent || config.debug)) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (console) {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

function trim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function isString(val) {
    return typeof val === 'string';
}

function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

function each(obj, iterator) {

    var i, key;

    if (typeof obj.length == 'number') {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

function extend(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach(function (arg) {
        _merge(target, arg);
    });

    return target;
}

function merge(target) {

    var args = array.slice.call(arguments, 1);

    args.forEach(function (arg) {
        _merge(target, arg, true);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

function root (options, next) {

    var url = next(options);

    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
        url = options.root + '/' + url;
    }

    return url;
}

function query (options, next) {

    var urlParams = Object.keys(Url.options.params),
        query = {},
        url = next(options);

    each(options.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
}

function legacy (options, next) {

    var variables = [],
        url = next(options);

    url = url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {

        warn('The `:' + name + '` parameter syntax has been deprecated. Use the `{' + name + '}` syntax instead.');

        if (options.params[name]) {
            variables.push(name);
            return slash + encodeUriSegment(options.params[name]);
        }

        return '';
    });

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

function encodeUriSegment(value) {

    return encodeUriQuery(value, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
}

function encodeUriQuery(value, spaces) {

    return encodeURIComponent(value).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, spaces ? '%20' : '+');
}

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url),
        expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'],
        variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null,
                        values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }
                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key],
        result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

function template (options) {

    var variables = [],
        url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
}

/**
 * Service for URL templating.
 */

var ie = document.documentMode;
var el = document.createElement('a');

function Url(url, params) {

    var self = this || {},
        options = url,
        transform;

    if (isString(url)) {
        options = { url: url, params: params };
    }

    options = merge({}, Url.options, self.$options, options);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, legacy, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [],
        escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    if (ie) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options) {
        return handler.call(vm, options, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj),
        plain = isPlainObject(obj),
        hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING = 2;

function Promise$2(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$2.reject = function (r) {
    return new Promise$2(function (resolve, reject) {
        reject(r);
    });
};

Promise$2.resolve = function (x) {
    return new Promise$2(function (resolve, reject) {
        resolve(x);
    });
};

Promise$2.all = function all(iterable) {
    return new Promise$2(function (resolve, reject) {
        var count = 0,
            result = [];

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

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$2.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$2.race = function race(iterable) {
    return new Promise$2(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$2.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$2.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;
                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
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

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$2(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

var PromiseObj = window.Promise || Promise$2;

function Promise$1(executor, context) {

    if (executor instanceof PromiseObj) {
        this.promise = executor;
    } else {
        this.promise = new PromiseObj(executor.bind(context));
    }

    this.context = context;
}

Promise$1.all = function (iterable, context) {
    return new Promise$1(PromiseObj.all(iterable), context);
};

Promise$1.resolve = function (value, context) {
    return new Promise$1(PromiseObj.resolve(value), context);
};

Promise$1.reject = function (reason, context) {
    return new Promise$1(PromiseObj.reject(reason), context);
};

Promise$1.race = function (iterable, context) {
    return new Promise$1(PromiseObj.race(iterable), context);
};

var p = Promise$1.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    this.promise = this.promise.then(fulfilled, rejected);

    return this;
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    this.promise = this.promise.catch(rejected);

    return this;
};

p.finally = function (callback) {

    return this.then(function (value) {
        callback.call(this);
        return value;
    }, function (reason) {
        callback.call(this);
        return PromiseObj.reject(reason);
    });
};

p.success = function (callback) {

    warn('The `success` method has been deprecated. Use the `then` method instead.');

    return this.then(function (response) {
        return callback.call(this, response.data, response.status, response) || response;
    });
};

p.error = function (callback) {

    warn('The `error` method has been deprecated. Use the `catch` method instead.');

    return this.catch(function (response) {
        return callback.call(this, response.data, response.status, response) || response;
    });
};

p.always = function (callback) {

    warn('The `always` method has been deprecated. Use the `finally` method instead.');

    var cb = function cb(response) {
        return callback.call(this, response.data, response.status, response) || response;
    };

    return this.then(cb, cb);
};

function xdrClient (request) {
    return new Promise$1(function (resolve) {

        var xdr = new XDomainRequest(),
            response = { request: request },
            handler;

        request.cancel = function () {
            xdr.abort();
        };

        xdr.open(request.method, Url(request), true);

        handler = function handler(event) {

            response.data = xdr.responseText;
            response.status = xdr.status;
            response.statusText = xdr.statusText || '';

            resolve(response);
        };

        xdr.timeout = 0;
        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = function () {};
        xdr.onprogress = function () {};

        xdr.send(request.data);
    });
}

var originUrl = Url.parse(location.href);
var supportCors = 'withCredentials' in new XMLHttpRequest();

var exports$1 = {
    request: function request(_request) {

        if (_request.crossOrigin === null) {
            _request.crossOrigin = crossOrigin(_request);
        }

        if (_request.crossOrigin) {

            if (!supportCors) {
                _request.client = xdrClient;
            }

            _request.emulateHTTP = false;
        }

        return _request;
    }
};

function crossOrigin(request) {

    var requestUrl = Url.parse(Url(request));

    return requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host;
}

var exports$2 = {
    request: function request(_request) {

        if (_request.emulateJSON && isPlainObject(_request.data)) {
            _request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            _request.data = Url.params(_request.data);
        }

        if (isObject(_request.data) && /FormData/i.test(_request.data.toString())) {
            delete _request.headers['Content-Type'];
        }

        if (isPlainObject(_request.data)) {
            _request.data = JSON.stringify(_request.data);
        }

        return _request;
    },
    response: function response(_response) {

        try {
            _response.data = JSON.parse(_response.data);
        } catch (e) {}

        return _response;
    }
};

function jsonpClient (request) {
    return new Promise$1(function (resolve) {

        var callback = '_jsonp' + Math.random().toString(36).substr(2),
            response = { request: request, data: null },
            handler,
            script;

        request.params[request.jsonp] = callback;
        request.cancel = function () {
            handler({ type: 'cancel' });
        };

        script = document.createElement('script');
        script.src = Url(request);
        script.type = 'text/javascript';
        script.async = true;

        window[callback] = function (data) {
            response.data = data;
        };

        handler = function handler(event) {

            if (event.type === 'load' && response.data !== null) {
                response.status = 200;
            } else if (event.type === 'error') {
                response.status = 404;
            } else {
                response.status = 0;
            }

            resolve(response);

            delete window[callback];
            document.body.removeChild(script);
        };

        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
}

var exports$3 = {
    request: function request(_request) {

        if (_request.method == 'JSONP') {
            _request.client = jsonpClient;
        }

        return _request;
    }
};

var exports$4 = {
    request: function request(_request) {

        if (isFunction(_request.beforeSend)) {
            _request.beforeSend.call(this, _request);
        }

        return _request;
    }
};

/**
 * HTTP method override Interceptor.
 */

var exports$5 = {
    request: function request(_request) {

        if (_request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(_request.method)) {
            _request.headers['X-HTTP-Method-Override'] = _request.method;
            _request.method = 'POST';
        }

        return _request;
    }
};

var exports$6 = {
    request: function request(_request) {

        _request.method = _request.method.toUpperCase();
        _request.headers = extend({}, Http.headers.common, !_request.crossOrigin ? Http.headers.custom : {}, Http.headers[_request.method.toLowerCase()], _request.headers);

        if (isPlainObject(_request.data) && /^(GET|JSONP)$/i.test(_request.method)) {
            extend(_request.params, _request.data);
            delete _request.data;
        }

        return _request;
    }
};

/**
 * Timeout Interceptor.
 */

var exports$7 = function exports() {

    var timeout;

    return {
        request: function request(_request) {

            if (_request.timeout) {
                timeout = setTimeout(function () {
                    _request.cancel();
                }, _request.timeout);
            }

            return _request;
        },
        response: function response(_response) {

            clearTimeout(timeout);

            return _response;
        }
    };
};

function interceptor (handler, vm) {

    return function (client) {

        if (isFunction(handler)) {
            handler = handler.call(vm, Promise$1);
        }

        return function (request) {

            if (isFunction(handler.request)) {
                request = handler.request.call(vm, request);
            }

            return when(request, function (request) {
                return when(client(request), function (response) {

                    if (isFunction(handler.response)) {
                        response = handler.response.call(vm, response);
                    }

                    return response;
                });
            });
        };
    };
}

function when(value, fulfilled, rejected) {

    var promise = Promise$1.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function xhrClient (request) {
    return new Promise$1(function (resolve) {

        var xhr = new XMLHttpRequest(),
            response = { request: request },
            handler;

        request.cancel = function () {
            xhr.abort();
        };

        xhr.open(request.method, Url(request), true);

        handler = function handler(event) {

            response.data = 'response' in xhr ? xhr.response : xhr.responseText;
            response.status = xhr.status === 1223 ? 204 : xhr.status; // IE9 status bug
            response.statusText = trim(xhr.statusText || '');
            response.headers = xhr.getAllResponseHeaders();

            resolve(response);
        };

        xhr.timeout = 0;
        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = function () {};
        xhr.onprogress = function () {};

        if (isPlainObject(request.xhr)) {
            extend(xhr, request.xhr);
        }

        if (isPlainObject(request.upload)) {
            extend(xhr.upload, request.upload);
        }

        each(request.headers || {}, function (value, header) {
            xhr.setRequestHeader(header, value);
        });

        xhr.send(request.data);
    });
}

function Client (request) {

    var response = (request.client || xhrClient)(request);

    return Promise$1.resolve(response).then(function (response) {

        if (response.headers) {

            var headers = parseHeaders(response.headers);

            response.headers = function (name) {

                if (name) {
                    return headers[toLower(name)];
                }

                return headers;
            };
        }

        response.ok = response.status >= 200 && response.status < 300;

        return response;
    });
}

function parseHeaders(str) {

    var headers = {},
        value,
        name,
        i;

    if (isString(str)) {
        each(str.split('\n'), function (row) {

            i = row.indexOf(':');
            name = trim(toLower(row.slice(0, i)));
            value = trim(row.slice(i + 1));

            if (headers[name]) {

                if (isArray(headers[name])) {
                    headers[name].push(value);
                } else {
                    headers[name] = [headers[name], value];
                }
            } else {

                headers[name] = value;
            }
        });
    }

    return headers;
}

/**
 * Service for sending network requests.
 */

var jsonType = { 'Content-Type': 'application/json' };

function Http(url, options) {

    var self = this || {},
        client = Client,
        request,
        promise;

    Http.interceptors.forEach(function (handler) {
        client = interceptor(handler, self.$vm)(client);
    });

    options = isObject(url) ? url : extend({ url: url }, options);
    request = merge({}, Http.options, self.$options, options);
    promise = client(request).bind(self.$vm).then(function (response) {

        return response.ok ? response : Promise$1.reject(response);
    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return Promise$1.reject(response);
    });

    if (request.success) {
        promise.success(request.success);
    }

    if (request.error) {
        promise.error(request.error);
    }

    return promise;
}

Http.options = {
    method: 'get',
    data: '',
    params: {},
    headers: {},
    xhr: null,
    upload: null,
    jsonp: 'callback',
    beforeSend: null,
    crossOrigin: null,
    emulateHTTP: false,
    emulateJSON: false,
    timeout: 0
};

Http.headers = {
    put: jsonType,
    post: jsonType,
    patch: jsonType,
    delete: jsonType,
    common: { 'Accept': 'application/json, text/plain, */*' },
    custom: { 'X-Requested-With': 'XMLHttpRequest' }
};

Http.interceptors = [exports$4, exports$7, exports$3, exports$5, exports$2, exports$6, exports$1];

['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

    Http[method] = function (url, data, success, options) {

        if (isFunction(data)) {
            options = success;
            success = data;
            data = undefined;
        }

        if (isObject(success)) {
            options = success;
            success = undefined;
        }

        return this(url, extend({ method: method, data: data, success: success }, options));
    };
});

function Resource(url, params, actions, options) {

    var self = this || {},
        resource = {};

    actions = extend({}, Resource.actions, actions);

    each(actions, function (action, name) {

        action = merge({ url: url, params: params || {} }, options, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options = extend({}, action),
        params = {},
        data,
        success,
        error;

    switch (args.length) {

        case 4:

            error = args[3];
            success = args[2];

        case 3:
        case 2:

            if (isFunction(args[1])) {

                if (isFunction(args[0])) {

                    success = args[0];
                    error = args[1];

                    break;
                }

                success = args[1];
                error = args[2];
            } else {

                params = args[0];
                data = args[1];
                success = args[2];

                break;
            }

        case 1:

            if (isFunction(args[0])) {
                success = args[0];
            } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
                data = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
    }

    options.data = data;
    options.params = extend({}, options.params, params);

    if (success) {
        options.success = success;
    }

    if (error) {
        options.error = error;
    }

    return options;
}

Resource.actions = {

    get: { method: 'GET' },
    save: { method: 'POST' },
    query: { method: 'GET' },
    update: { method: 'PUT' },
    remove: { method: 'DELETE' },
    delete: { method: 'DELETE' }

};

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = Promise$1;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var _this = this;

                return function (executor) {
                    return new Vue.Promise(executor, _this);
                };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;
},{}],23:[function(require,module,exports){
/*!
 * vue-router v0.7.13
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.VueRouter = factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  function Target(path, matcher, delegate) {
    this.path = path;
    this.matcher = matcher;
    this.delegate = delegate;
  }

  Target.prototype = {
    to: function to(target, callback) {
      var delegate = this.delegate;

      if (delegate && delegate.willAddRoute) {
        target = delegate.willAddRoute(this.matcher.target, target);
      }

      this.matcher.add(this.path, target);

      if (callback) {
        if (callback.length === 0) {
          throw new Error("You must have an argument in the function passed to `to`");
        }
        this.matcher.addChild(this.path, target, callback, this.delegate);
      }
      return this;
    }
  };

  function Matcher(target) {
    this.routes = {};
    this.children = {};
    this.target = target;
  }

  Matcher.prototype = {
    add: function add(path, handler) {
      this.routes[path] = handler;
    },

    addChild: function addChild(path, target, callback, delegate) {
      var matcher = new Matcher(target);
      this.children[path] = matcher;

      var match = generateMatch(path, matcher, delegate);

      if (delegate && delegate.contextEntered) {
        delegate.contextEntered(target, match);
      }

      callback(match);
    }
  };

  function generateMatch(startingPath, matcher, delegate) {
    return function (path, nestedCallback) {
      var fullPath = startingPath + path;

      if (nestedCallback) {
        nestedCallback(generateMatch(fullPath, matcher, delegate));
      } else {
        return new Target(startingPath + path, matcher, delegate);
      }
    };
  }

  function addRoute(routeArray, path, handler) {
    var len = 0;
    for (var i = 0, l = routeArray.length; i < l; i++) {
      len += routeArray[i].path.length;
    }

    path = path.substr(len);
    var route = { path: path, handler: handler };
    routeArray.push(route);
  }

  function eachRoute(baseRoute, matcher, callback, binding) {
    var routes = matcher.routes;

    for (var path in routes) {
      if (routes.hasOwnProperty(path)) {
        var routeArray = baseRoute.slice();
        addRoute(routeArray, path, routes[path]);

        if (matcher.children[path]) {
          eachRoute(routeArray, matcher.children[path], callback, binding);
        } else {
          callback.call(binding, routeArray);
        }
      }
    }
  }

  function map (callback, addRouteCallback) {
    var matcher = new Matcher();

    callback(generateMatch("", matcher, this.delegate));

    eachRoute([], matcher, function (route) {
      if (addRouteCallback) {
        addRouteCallback(this, route);
      } else {
        this.add(route);
      }
    }, this);
  }

  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

  var noWarning = false;
  function warn(msg) {
    if (!noWarning && typeof console !== 'undefined') {
      console.error('[vue-router] ' + msg);
    }
  }

  function tryDecode(uri, asComponent) {
    try {
      return asComponent ? decodeURIComponent(uri) : decodeURI(uri);
    } catch (e) {
      warn('malformed URI' + (asComponent ? ' component: ' : ': ') + uri);
    }
  }

  function isArray(test) {
    return Object.prototype.toString.call(test) === "[object Array]";
  }

  // A Segment represents a segment in the original route description.
  // Each Segment type provides an `eachChar` and `regex` method.
  //
  // The `eachChar` method invokes the callback with one or more character
  // specifications. A character specification consumes one or more input
  // characters.
  //
  // The `regex` method returns a regex fragment for the segment. If the
  // segment is a dynamic of star segment, the regex fragment also includes
  // a capture.
  //
  // A character specification contains:
  //
  // * `validChars`: a String with a list of all valid characters, or
  // * `invalidChars`: a String with a list of all invalid characters
  // * `repeat`: true if the character specification can repeat

  function StaticSegment(string) {
    this.string = string;
  }
  StaticSegment.prototype = {
    eachChar: function eachChar(callback) {
      var string = this.string,
          ch;

      for (var i = 0, l = string.length; i < l; i++) {
        ch = string.charAt(i);
        callback({ validChars: ch });
      }
    },

    regex: function regex() {
      return this.string.replace(escapeRegex, '\\$1');
    },

    generate: function generate() {
      return this.string;
    }
  };

  function DynamicSegment(name) {
    this.name = name;
  }
  DynamicSegment.prototype = {
    eachChar: function eachChar(callback) {
      callback({ invalidChars: "/", repeat: true });
    },

    regex: function regex() {
      return "([^/]+)";
    },

    generate: function generate(params) {
      var val = params[this.name];
      return val == null ? ":" + this.name : val;
    }
  };

  function StarSegment(name) {
    this.name = name;
  }
  StarSegment.prototype = {
    eachChar: function eachChar(callback) {
      callback({ invalidChars: "", repeat: true });
    },

    regex: function regex() {
      return "(.+)";
    },

    generate: function generate(params) {
      var val = params[this.name];
      return val == null ? ":" + this.name : val;
    }
  };

  function EpsilonSegment() {}
  EpsilonSegment.prototype = {
    eachChar: function eachChar() {},
    regex: function regex() {
      return "";
    },
    generate: function generate() {
      return "";
    }
  };

  function parse(route, names, specificity) {
    // normalize route as not starting with a "/". Recognition will
    // also normalize.
    if (route.charAt(0) === "/") {
      route = route.substr(1);
    }

    var segments = route.split("/"),
        results = [];

    // A routes has specificity determined by the order that its different segments
    // appear in. This system mirrors how the magnitude of numbers written as strings
    // works.
    // Consider a number written as: "abc". An example would be "200". Any other number written
    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
    // leading symbol, "1".
    // The rule is that symbols to the left carry more weight than symbols to the right
    // when a number is written out as a string. In the above strings, the leading digit
    // represents how many 100's are in the number, and it carries more weight than the middle
    // number which represents how many 10's are in the number.
    // This system of number magnitude works well for route specificity, too. A route written as
    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
    // `x`, irrespective of the other parts.
    // Because of this similarity, we assign each type of segment a number value written as a
    // string. We can find the specificity of compound routes by concatenating these strings
    // together, from left to right. After we have looped through all of the segments,
    // we convert the string to a number.
    specificity.val = '';

    for (var i = 0, l = segments.length; i < l; i++) {
      var segment = segments[i],
          match;

      if (match = segment.match(/^:([^\/]+)$/)) {
        results.push(new DynamicSegment(match[1]));
        names.push(match[1]);
        specificity.val += '3';
      } else if (match = segment.match(/^\*([^\/]+)$/)) {
        results.push(new StarSegment(match[1]));
        specificity.val += '2';
        names.push(match[1]);
      } else if (segment === "") {
        results.push(new EpsilonSegment());
        specificity.val += '1';
      } else {
        results.push(new StaticSegment(segment));
        specificity.val += '4';
      }
    }

    specificity.val = +specificity.val;

    return results;
  }

  // A State has a character specification and (`charSpec`) and a list of possible
  // subsequent states (`nextStates`).
  //
  // If a State is an accepting state, it will also have several additional
  // properties:
  //
  // * `regex`: A regular expression that is used to extract parameters from paths
  //   that reached this accepting state.
  // * `handlers`: Information on how to convert the list of captures into calls
  //   to registered handlers with the specified parameters
  // * `types`: How many static, dynamic or star segments in this route. Used to
  //   decide which route to use if multiple registered routes match a path.
  //
  // Currently, State is implemented naively by looping over `nextStates` and
  // comparing a character specification against a character. A more efficient
  // implementation would use a hash of keys pointing at one or more next states.

  function State(charSpec) {
    this.charSpec = charSpec;
    this.nextStates = [];
  }

  State.prototype = {
    get: function get(charSpec) {
      var nextStates = this.nextStates;

      for (var i = 0, l = nextStates.length; i < l; i++) {
        var child = nextStates[i];

        var isEqual = child.charSpec.validChars === charSpec.validChars;
        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

        if (isEqual) {
          return child;
        }
      }
    },

    put: function put(charSpec) {
      var state;

      // If the character specification already exists in a child of the current
      // state, just return that state.
      if (state = this.get(charSpec)) {
        return state;
      }

      // Make a new state for the character spec
      state = new State(charSpec);

      // Insert the new state as a child of the current state
      this.nextStates.push(state);

      // If this character specification repeats, insert the new state as a child
      // of itself. Note that this will not trigger an infinite loop because each
      // transition during recognition consumes a character.
      if (charSpec.repeat) {
        state.nextStates.push(state);
      }

      // Return the new state
      return state;
    },

    // Find a list of child states matching the next character
    match: function match(ch) {
      // DEBUG "Processing `" + ch + "`:"
      var nextStates = this.nextStates,
          child,
          charSpec,
          chars;

      // DEBUG "  " + debugState(this)
      var returned = [];

      for (var i = 0, l = nextStates.length; i < l; i++) {
        child = nextStates[i];

        charSpec = child.charSpec;

        if (typeof (chars = charSpec.validChars) !== 'undefined') {
          if (chars.indexOf(ch) !== -1) {
            returned.push(child);
          }
        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
          if (chars.indexOf(ch) === -1) {
            returned.push(child);
          }
        }
      }

      return returned;
    }

    /** IF DEBUG
    , debug: function() {
      var charSpec = this.charSpec,
          debug = "[",
          chars = charSpec.validChars || charSpec.invalidChars;
       if (charSpec.invalidChars) { debug += "^"; }
      debug += chars;
      debug += "]";
       if (charSpec.repeat) { debug += "+"; }
       return debug;
    }
    END IF **/
  };

  /** IF DEBUG
  function debug(log) {
    console.log(log);
  }

  function debugState(state) {
    return state.nextStates.map(function(n) {
      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
    }).join(", ")
  }
  END IF **/

  // Sort the routes by specificity
  function sortSolutions(states) {
    return states.sort(function (a, b) {
      return b.specificity.val - a.specificity.val;
    });
  }

  function recognizeChar(states, ch) {
    var nextStates = [];

    for (var i = 0, l = states.length; i < l; i++) {
      var state = states[i];

      nextStates = nextStates.concat(state.match(ch));
    }

    return nextStates;
  }

  var oCreate = Object.create || function (proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };

  function RecognizeResults(queryParams) {
    this.queryParams = queryParams || {};
  }
  RecognizeResults.prototype = oCreate({
    splice: Array.prototype.splice,
    slice: Array.prototype.slice,
    push: Array.prototype.push,
    length: 0,
    queryParams: null
  });

  function findHandler(state, path, queryParams) {
    var handlers = state.handlers,
        regex = state.regex;
    var captures = path.match(regex),
        currentCapture = 1;
    var result = new RecognizeResults(queryParams);

    for (var i = 0, l = handlers.length; i < l; i++) {
      var handler = handlers[i],
          names = handler.names,
          params = {};

      for (var j = 0, m = names.length; j < m; j++) {
        params[names[j]] = captures[currentCapture++];
      }

      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
    }

    return result;
  }

  function addSegment(currentState, segment) {
    segment.eachChar(function (ch) {
      var state;

      currentState = currentState.put(ch);
    });

    return currentState;
  }

  function decodeQueryParamPart(part) {
    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
    part = part.replace(/\+/gm, '%20');
    return tryDecode(part, true);
  }

  // The main interface

  var RouteRecognizer = function RouteRecognizer() {
    this.rootState = new State();
    this.names = {};
  };

  RouteRecognizer.prototype = {
    add: function add(routes, options) {
      var currentState = this.rootState,
          regex = "^",
          specificity = {},
          handlers = [],
          allSegments = [],
          name;

      var isEmpty = true;

      for (var i = 0, l = routes.length; i < l; i++) {
        var route = routes[i],
            names = [];

        var segments = parse(route.path, names, specificity);

        allSegments = allSegments.concat(segments);

        for (var j = 0, m = segments.length; j < m; j++) {
          var segment = segments[j];

          if (segment instanceof EpsilonSegment) {
            continue;
          }

          isEmpty = false;

          // Add a "/" for the new segment
          currentState = currentState.put({ validChars: "/" });
          regex += "/";

          // Add a representation of the segment to the NFA and regex
          currentState = addSegment(currentState, segment);
          regex += segment.regex();
        }

        var handler = { handler: route.handler, names: names };
        handlers.push(handler);
      }

      if (isEmpty) {
        currentState = currentState.put({ validChars: "/" });
        regex += "/";
      }

      currentState.handlers = handlers;
      currentState.regex = new RegExp(regex + "$");
      currentState.specificity = specificity;

      if (name = options && options.as) {
        this.names[name] = {
          segments: allSegments,
          handlers: handlers
        };
      }
    },

    handlersFor: function handlersFor(name) {
      var route = this.names[name],
          result = [];
      if (!route) {
        throw new Error("There is no route named " + name);
      }

      for (var i = 0, l = route.handlers.length; i < l; i++) {
        result.push(route.handlers[i]);
      }

      return result;
    },

    hasRoute: function hasRoute(name) {
      return !!this.names[name];
    },

    generate: function generate(name, params) {
      var route = this.names[name],
          output = "";
      if (!route) {
        throw new Error("There is no route named " + name);
      }

      var segments = route.segments;

      for (var i = 0, l = segments.length; i < l; i++) {
        var segment = segments[i];

        if (segment instanceof EpsilonSegment) {
          continue;
        }

        output += "/";
        output += segment.generate(params);
      }

      if (output.charAt(0) !== '/') {
        output = '/' + output;
      }

      if (params && params.queryParams) {
        output += this.generateQueryString(params.queryParams);
      }

      return output;
    },

    generateQueryString: function generateQueryString(params) {
      var pairs = [];
      var keys = [];
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      keys.sort();
      for (var i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        var value = params[key];
        if (value == null) {
          continue;
        }
        var pair = encodeURIComponent(key);
        if (isArray(value)) {
          for (var j = 0, l = value.length; j < l; j++) {
            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
            pairs.push(arrayPair);
          }
        } else {
          pair += "=" + encodeURIComponent(value);
          pairs.push(pair);
        }
      }

      if (pairs.length === 0) {
        return '';
      }

      return "?" + pairs.join("&");
    },

    parseQueryString: function parseQueryString(queryString) {
      var pairs = queryString.split("&"),
          queryParams = {};
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('='),
            key = decodeQueryParamPart(pair[0]),
            keyLength = key.length,
            isArray = false,
            value;
        if (pair.length === 1) {
          value = 'true';
        } else {
          //Handle arrays
          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
            isArray = true;
            key = key.slice(0, keyLength - 2);
            if (!queryParams[key]) {
              queryParams[key] = [];
            }
          }
          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
        }
        if (isArray) {
          queryParams[key].push(value);
        } else {
          queryParams[key] = value;
        }
      }
      return queryParams;
    },

    recognize: function recognize(path, silent) {
      noWarning = silent;
      var states = [this.rootState],
          pathLen,
          i,
          l,
          queryStart,
          queryParams = {},
          isSlashDropped = false;

      queryStart = path.indexOf('?');
      if (queryStart !== -1) {
        var queryString = path.substr(queryStart + 1, path.length);
        path = path.substr(0, queryStart);
        if (queryString) {
          queryParams = this.parseQueryString(queryString);
        }
      }

      path = tryDecode(path);
      if (!path) return;

      // DEBUG GROUP path

      if (path.charAt(0) !== "/") {
        path = "/" + path;
      }

      pathLen = path.length;
      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
        path = path.substr(0, pathLen - 1);
        isSlashDropped = true;
      }

      for (i = 0, l = path.length; i < l; i++) {
        states = recognizeChar(states, path.charAt(i));
        if (!states.length) {
          break;
        }
      }

      // END DEBUG GROUP

      var solutions = [];
      for (i = 0, l = states.length; i < l; i++) {
        if (states[i].handlers) {
          solutions.push(states[i]);
        }
      }

      states = sortSolutions(solutions);

      var state = solutions[0];

      if (state && state.handlers) {
        // if a trailing slash was dropped and a star segment is the last segment
        // specified, put the trailing slash back
        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
          path = path + "/";
        }
        return findHandler(state, path, queryParams);
      }
    }
  };

  RouteRecognizer.prototype.map = map;

  var genQuery = RouteRecognizer.prototype.generateQueryString;

  // export default for holding the Vue reference
  var exports$1 = {};
  /**
   * Warn stuff.
   *
   * @param {String} msg
   */

  function warn$1(msg) {
    /* istanbul ignore next */
    if (typeof console !== 'undefined') {
      console.error('[vue-router] ' + msg);
    }
  }

  /**
   * Resolve a relative path.
   *
   * @param {String} base
   * @param {String} relative
   * @param {Boolean} append
   * @return {String}
   */

  function resolvePath(base, relative, append) {
    var query = base.match(/(\?.*)$/);
    if (query) {
      query = query[1];
      base = base.slice(0, -query.length);
    }
    // a query!
    if (relative.charAt(0) === '?') {
      return base + relative;
    }
    var stack = base.split('/');
    // remove trailing segment if:
    // - not appending
    // - appending to trailing slash (last segment is empty)
    if (!append || !stack[stack.length - 1]) {
      stack.pop();
    }
    // resolve relative path
    var segments = relative.replace(/^\//, '').split('/');
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      if (segment === '.') {
        continue;
      } else if (segment === '..') {
        stack.pop();
      } else {
        stack.push(segment);
      }
    }
    // ensure leading slash
    if (stack[0] !== '') {
      stack.unshift('');
    }
    return stack.join('/');
  }

  /**
   * Forgiving check for a promise
   *
   * @param {Object} p
   * @return {Boolean}
   */

  function isPromise(p) {
    return p && typeof p.then === 'function';
  }

  /**
   * Retrive a route config field from a component instance
   * OR a component contructor.
   *
   * @param {Function|Vue} component
   * @param {String} name
   * @return {*}
   */

  function getRouteConfig(component, name) {
    var options = component && (component.$options || component.options);
    return options && options.route && options.route[name];
  }

  /**
   * Resolve an async component factory. Have to do a dirty
   * mock here because of Vue core's internal API depends on
   * an ID check.
   *
   * @param {Object} handler
   * @param {Function} cb
   */

  var resolver = undefined;

  function resolveAsyncComponent(handler, cb) {
    if (!resolver) {
      resolver = {
        resolve: exports$1.Vue.prototype._resolveComponent,
        $options: {
          components: {
            _: handler.component
          }
        }
      };
    } else {
      resolver.$options.components._ = handler.component;
    }
    resolver.resolve('_', function (Component) {
      handler.component = Component;
      cb(Component);
    });
  }

  /**
   * Map the dynamic segments in a path to params.
   *
   * @param {String} path
   * @param {Object} params
   * @param {Object} query
   */

  function mapParams(path, params, query) {
    if (params === undefined) params = {};

    path = path.replace(/:([^\/]+)/g, function (_, key) {
      var val = params[key];
      /* istanbul ignore if */
      if (!val) {
        warn$1('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
      }
      return val || '';
    });
    if (query) {
      path += genQuery(query);
    }
    return path;
  }

  var hashRE = /#.*$/;

  var HTML5History = (function () {
    function HTML5History(_ref) {
      var root = _ref.root;
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, HTML5History);

      if (root && root !== '/') {
        // make sure there's the starting slash
        if (root.charAt(0) !== '/') {
          root = '/' + root;
        }
        // remove trailing slash
        this.root = root.replace(/\/$/, '');
        this.rootRE = new RegExp('^\\' + this.root);
      } else {
        this.root = null;
      }
      this.onChange = onChange;
      // check base tag
      var baseEl = document.querySelector('base');
      this.base = baseEl && baseEl.getAttribute('href');
    }

    HTML5History.prototype.start = function start() {
      var _this = this;

      this.listener = function (e) {
        var url = location.pathname + location.search;
        if (_this.root) {
          url = url.replace(_this.rootRE, '');
        }
        _this.onChange(url, e && e.state, location.hash);
      };
      window.addEventListener('popstate', this.listener);
      this.listener();
    };

    HTML5History.prototype.stop = function stop() {
      window.removeEventListener('popstate', this.listener);
    };

    HTML5History.prototype.go = function go(path, replace, append) {
      var url = this.formatPath(path, append);
      if (replace) {
        history.replaceState({}, '', url);
      } else {
        // record scroll position by replacing current state
        history.replaceState({
          pos: {
            x: window.pageXOffset,
            y: window.pageYOffset
          }
        }, '', location.href);
        // then push new state
        history.pushState({}, '', url);
      }
      var hashMatch = path.match(hashRE);
      var hash = hashMatch && hashMatch[0];
      path = url
      // strip hash so it doesn't mess up params
      .replace(hashRE, '')
      // remove root before matching
      .replace(this.rootRE, '');
      this.onChange(path, null, hash);
    };

    HTML5History.prototype.formatPath = function formatPath(path, append) {
      return path.charAt(0) === '/'
      // absolute path
      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
    };

    return HTML5History;
  })();

  var HashHistory = (function () {
    function HashHistory(_ref) {
      var hashbang = _ref.hashbang;
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, HashHistory);

      this.hashbang = hashbang;
      this.onChange = onChange;
    }

    HashHistory.prototype.start = function start() {
      var self = this;
      this.listener = function () {
        var path = location.hash;
        var raw = path.replace(/^#!?/, '');
        // always
        if (raw.charAt(0) !== '/') {
          raw = '/' + raw;
        }
        var formattedPath = self.formatPath(raw);
        if (formattedPath !== path) {
          location.replace(formattedPath);
          return;
        }
        // determine query
        // note it's possible to have queries in both the actual URL
        // and the hash fragment itself.
        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
        self.onChange(path.replace(/^#!?/, '') + query);
      };
      window.addEventListener('hashchange', this.listener);
      this.listener();
    };

    HashHistory.prototype.stop = function stop() {
      window.removeEventListener('hashchange', this.listener);
    };

    HashHistory.prototype.go = function go(path, replace, append) {
      path = this.formatPath(path, append);
      if (replace) {
        location.replace(path);
      } else {
        location.hash = path;
      }
    };

    HashHistory.prototype.formatPath = function formatPath(path, append) {
      var isAbsoloute = path.charAt(0) === '/';
      var prefix = '#' + (this.hashbang ? '!' : '');
      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
    };

    return HashHistory;
  })();

  var AbstractHistory = (function () {
    function AbstractHistory(_ref) {
      var onChange = _ref.onChange;
      babelHelpers.classCallCheck(this, AbstractHistory);

      this.onChange = onChange;
      this.currentPath = '/';
    }

    AbstractHistory.prototype.start = function start() {
      this.onChange('/');
    };

    AbstractHistory.prototype.stop = function stop() {
      // noop
    };

    AbstractHistory.prototype.go = function go(path, replace, append) {
      path = this.currentPath = this.formatPath(path, append);
      this.onChange(path);
    };

    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
    };

    return AbstractHistory;
  })();

  /**
   * Determine the reusability of an existing router view.
   *
   * @param {Directive} view
   * @param {Object} handler
   * @param {Transition} transition
   */

  function canReuse(view, handler, transition) {
    var component = view.childVM;
    if (!component || !handler) {
      return false;
    }
    // important: check view.Component here because it may
    // have been changed in activate hook
    if (view.Component !== handler.component) {
      return false;
    }
    var canReuseFn = getRouteConfig(component, 'canReuse');
    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
      to: transition.to,
      from: transition.from
    }) : true; // defaults to true
  }

  /**
   * Check if a component can deactivate.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Function} next
   */

  function canDeactivate(view, transition, next) {
    var fromComponent = view.childVM;
    var hook = getRouteConfig(fromComponent, 'canDeactivate');
    if (!hook) {
      next();
    } else {
      transition.callHook(hook, fromComponent, next, {
        expectBoolean: true
      });
    }
  }

  /**
   * Check if a component can activate.
   *
   * @param {Object} handler
   * @param {Transition} transition
   * @param {Function} next
   */

  function canActivate(handler, transition, next) {
    resolveAsyncComponent(handler, function (Component) {
      // have to check due to async-ness
      if (transition.aborted) {
        return;
      }
      // determine if this component can be activated
      var hook = getRouteConfig(Component, 'canActivate');
      if (!hook) {
        next();
      } else {
        transition.callHook(hook, null, next, {
          expectBoolean: true
        });
      }
    });
  }

  /**
   * Call deactivate hooks for existing router-views.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Function} next
   */

  function deactivate(view, transition, next) {
    var component = view.childVM;
    var hook = getRouteConfig(component, 'deactivate');
    if (!hook) {
      next();
    } else {
      transition.callHooks(hook, component, next);
    }
  }

  /**
   * Activate / switch component for a router-view.
   *
   * @param {Directive} view
   * @param {Transition} transition
   * @param {Number} depth
   * @param {Function} [cb]
   */

  function activate(view, transition, depth, cb, reuse) {
    var handler = transition.activateQueue[depth];
    if (!handler) {
      saveChildView(view);
      if (view._bound) {
        view.setComponent(null);
      }
      cb && cb();
      return;
    }

    var Component = view.Component = handler.component;
    var activateHook = getRouteConfig(Component, 'activate');
    var dataHook = getRouteConfig(Component, 'data');
    var waitForData = getRouteConfig(Component, 'waitForData');

    view.depth = depth;
    view.activated = false;

    var component = undefined;
    var loading = !!(dataHook && !waitForData);

    // "reuse" is a flag passed down when the parent view is
    // either reused via keep-alive or as a child of a kept-alive view.
    // of course we can only reuse if the current kept-alive instance
    // is of the correct type.
    reuse = reuse && view.childVM && view.childVM.constructor === Component;

    if (reuse) {
      // just reuse
      component = view.childVM;
      component.$loadingRouteData = loading;
    } else {
      saveChildView(view);

      // unbuild current component. this step also destroys
      // and removes all nested child views.
      view.unbuild(true);

      // build the new component. this will also create the
      // direct child view of the current one. it will register
      // itself as view.childView.
      component = view.build({
        _meta: {
          $loadingRouteData: loading
        },
        created: function created() {
          this._routerView = view;
        }
      });

      // handle keep-alive.
      // when a kept-alive child vm is restored, we need to
      // add its cached child views into the router's view list,
      // and also properly update current view's child view.
      if (view.keepAlive) {
        component.$loadingRouteData = loading;
        var cachedChildView = component._keepAliveRouterView;
        if (cachedChildView) {
          view.childView = cachedChildView;
          component._keepAliveRouterView = null;
        }
      }
    }

    // cleanup the component in case the transition is aborted
    // before the component is ever inserted.
    var cleanup = function cleanup() {
      component.$destroy();
    };

    // actually insert the component and trigger transition
    var insert = function insert() {
      if (reuse) {
        cb && cb();
        return;
      }
      var router = transition.router;
      if (router._rendered || router._transitionOnLoad) {
        view.transition(component);
      } else {
        // no transition on first render, manual transition
        /* istanbul ignore if */
        if (view.setCurrent) {
          // 0.12 compat
          view.setCurrent(component);
        } else {
          // 1.0
          view.childVM = component;
        }
        component.$before(view.anchor, null, false);
      }
      cb && cb();
    };

    var afterData = function afterData() {
      // activate the child view
      if (view.childView) {
        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
      }
      insert();
    };

    // called after activation hook is resolved
    var afterActivate = function afterActivate() {
      view.activated = true;
      if (dataHook && waitForData) {
        // wait until data loaded to insert
        loadData(component, transition, dataHook, afterData, cleanup);
      } else {
        // load data and insert at the same time
        if (dataHook) {
          loadData(component, transition, dataHook);
        }
        afterData();
      }
    };

    if (activateHook) {
      transition.callHooks(activateHook, component, afterActivate, {
        cleanup: cleanup,
        postActivate: true
      });
    } else {
      afterActivate();
    }
  }

  /**
   * Reuse a view, just reload data if necessary.
   *
   * @param {Directive} view
   * @param {Transition} transition
   */

  function reuse(view, transition) {
    var component = view.childVM;
    var dataHook = getRouteConfig(component, 'data');
    if (dataHook) {
      loadData(component, transition, dataHook);
    }
  }

  /**
   * Asynchronously load and apply data to component.
   *
   * @param {Vue} component
   * @param {Transition} transition
   * @param {Function} hook
   * @param {Function} cb
   * @param {Function} cleanup
   */

  function loadData(component, transition, hook, cb, cleanup) {
    component.$loadingRouteData = true;
    transition.callHooks(hook, component, function () {
      component.$loadingRouteData = false;
      component.$emit('route-data-loaded', component);
      cb && cb();
    }, {
      cleanup: cleanup,
      postActivate: true,
      processData: function processData(data) {
        // handle promise sugar syntax
        var promises = [];
        if (isPlainObject(data)) {
          Object.keys(data).forEach(function (key) {
            var val = data[key];
            if (isPromise(val)) {
              promises.push(val.then(function (resolvedVal) {
                component.$set(key, resolvedVal);
              }));
            } else {
              component.$set(key, val);
            }
          });
        }
        if (promises.length) {
          return promises[0].constructor.all(promises);
        }
      }
    });
  }

  /**
   * Save the child view for a kept-alive view so that
   * we can restore it when it is switched back to.
   *
   * @param {Directive} view
   */

  function saveChildView(view) {
    if (view.keepAlive && view.childVM && view.childView) {
      view.childVM._keepAliveRouterView = view.childView;
    }
    view.childView = null;
  }

  /**
   * Check plain object.
   *
   * @param {*} val
   */

  function isPlainObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  /**
   * A RouteTransition object manages the pipeline of a
   * router-view switching process. This is also the object
   * passed into user route hooks.
   *
   * @param {Router} router
   * @param {Route} to
   * @param {Route} from
   */

  var RouteTransition = (function () {
    function RouteTransition(router, to, from) {
      babelHelpers.classCallCheck(this, RouteTransition);

      this.router = router;
      this.to = to;
      this.from = from;
      this.next = null;
      this.aborted = false;
      this.done = false;
    }

    /**
     * Abort current transition and return to previous location.
     */

    RouteTransition.prototype.abort = function abort() {
      if (!this.aborted) {
        this.aborted = true;
        // if the root path throws an error during validation
        // on initial load, it gets caught in an infinite loop.
        var abortingOnLoad = !this.from.path && this.to.path === '/';
        if (!abortingOnLoad) {
          this.router.replace(this.from.path || '/');
        }
      }
    };

    /**
     * Abort current transition and redirect to a new location.
     *
     * @param {String} path
     */

    RouteTransition.prototype.redirect = function redirect(path) {
      if (!this.aborted) {
        this.aborted = true;
        if (typeof path === 'string') {
          path = mapParams(path, this.to.params, this.to.query);
        } else {
          path.params = path.params || this.to.params;
          path.query = path.query || this.to.query;
        }
        this.router.replace(path);
      }
    };

    /**
     * A router view transition's pipeline can be described as
     * follows, assuming we are transitioning from an existing
     * <router-view> chain [Component A, Component B] to a new
     * chain [Component A, Component C]:
     *
     *  A    A
     *  | => |
     *  B    C
     *
     * 1. Reusablity phase:
     *   -> canReuse(A, A)
     *   -> canReuse(B, C)
     *   -> determine new queues:
     *      - deactivation: [B]
     *      - activation: [C]
     *
     * 2. Validation phase:
     *   -> canDeactivate(B)
     *   -> canActivate(C)
     *
     * 3. Activation phase:
     *   -> deactivate(B)
     *   -> activate(C)
     *
     * Each of these steps can be asynchronous, and any
     * step can potentially abort the transition.
     *
     * @param {Function} cb
     */

    RouteTransition.prototype.start = function start(cb) {
      var transition = this;

      // determine the queue of views to deactivate
      var deactivateQueue = [];
      var view = this.router._rootView;
      while (view) {
        deactivateQueue.unshift(view);
        view = view.childView;
      }
      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

      // determine the queue of route handlers to activate
      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
        return match.handler;
      });

      // 1. Reusability phase
      var i = undefined,
          reuseQueue = undefined;
      for (i = 0; i < reverseDeactivateQueue.length; i++) {
        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
          break;
        }
      }
      if (i > 0) {
        reuseQueue = reverseDeactivateQueue.slice(0, i);
        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
        activateQueue = activateQueue.slice(i);
      }

      // 2. Validation phase
      transition.runQueue(deactivateQueue, canDeactivate, function () {
        transition.runQueue(activateQueue, canActivate, function () {
          transition.runQueue(deactivateQueue, deactivate, function () {
            // 3. Activation phase

            // Update router current route
            transition.router._onTransitionValidated(transition);

            // trigger reuse for all reused views
            reuseQueue && reuseQueue.forEach(function (view) {
              return reuse(view, transition);
            });

            // the root of the chain that needs to be replaced
            // is the top-most non-reusable view.
            if (deactivateQueue.length) {
              var _view = deactivateQueue[deactivateQueue.length - 1];
              var depth = reuseQueue ? reuseQueue.length : 0;
              activate(_view, transition, depth, cb);
            } else {
              cb();
            }
          });
        });
      });
    };

    /**
     * Asynchronously and sequentially apply a function to a
     * queue.
     *
     * @param {Array} queue
     * @param {Function} fn
     * @param {Function} cb
     */

    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
      var transition = this;
      step(0);
      function step(index) {
        if (index >= queue.length) {
          cb();
        } else {
          fn(queue[index], transition, function () {
            step(index + 1);
          });
        }
      }
    };

    /**
     * Call a user provided route transition hook and handle
     * the response (e.g. if the user returns a promise).
     *
     * If the user neither expects an argument nor returns a
     * promise, the hook is assumed to be synchronous.
     *
     * @param {Function} hook
     * @param {*} [context]
     * @param {Function} [cb]
     * @param {Object} [options]
     *                 - {Boolean} expectBoolean
     *                 - {Boolean} postActive
     *                 - {Function} processData
     *                 - {Function} cleanup
     */

    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      var _ref$expectBoolean = _ref.expectBoolean;
      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
      var _ref$postActivate = _ref.postActivate;
      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
      var processData = _ref.processData;
      var cleanup = _ref.cleanup;

      var transition = this;
      var nextCalled = false;

      // abort the transition
      var abort = function abort() {
        cleanup && cleanup();
        transition.abort();
      };

      // handle errors
      var onError = function onError(err) {
        postActivate ? next() : abort();
        if (err && !transition.router._suppress) {
          warn$1('Uncaught error during transition: ');
          throw err instanceof Error ? err : new Error(err);
        }
      };

      // since promise swallows errors, we have to
      // throw it in the next tick...
      var onPromiseError = function onPromiseError(err) {
        try {
          onError(err);
        } catch (e) {
          setTimeout(function () {
            throw e;
          }, 0);
        }
      };

      // advance the transition to the next step
      var next = function next() {
        if (nextCalled) {
          warn$1('transition.next() should be called only once.');
          return;
        }
        nextCalled = true;
        if (transition.aborted) {
          cleanup && cleanup();
          return;
        }
        cb && cb();
      };

      var nextWithBoolean = function nextWithBoolean(res) {
        if (typeof res === 'boolean') {
          res ? next() : abort();
        } else if (isPromise(res)) {
          res.then(function (ok) {
            ok ? next() : abort();
          }, onPromiseError);
        } else if (!hook.length) {
          next();
        }
      };

      var nextWithData = function nextWithData(data) {
        var res = undefined;
        try {
          res = processData(data);
        } catch (err) {
          return onError(err);
        }
        if (isPromise(res)) {
          res.then(next, onPromiseError);
        } else {
          next();
        }
      };

      // expose a clone of the transition object, so that each
      // hook gets a clean copy and prevent the user from
      // messing with the internals.
      var exposed = {
        to: transition.to,
        from: transition.from,
        abort: abort,
        next: processData ? nextWithData : next,
        redirect: function redirect() {
          transition.redirect.apply(transition, arguments);
        }
      };

      // actually call the hook
      var res = undefined;
      try {
        res = hook.call(context, exposed);
      } catch (err) {
        return onError(err);
      }

      if (expectBoolean) {
        // boolean hooks
        nextWithBoolean(res);
      } else if (isPromise(res)) {
        // promise
        if (processData) {
          res.then(nextWithData, onPromiseError);
        } else {
          res.then(next, onPromiseError);
        }
      } else if (processData && isPlainOjbect(res)) {
        // data promise sugar
        nextWithData(res);
      } else if (!hook.length) {
        next();
      }
    };

    /**
     * Call a single hook or an array of async hooks in series.
     *
     * @param {Array} hooks
     * @param {*} context
     * @param {Function} cb
     * @param {Object} [options]
     */

    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
      var _this = this;

      if (Array.isArray(hooks)) {
        this.runQueue(hooks, function (hook, _, next) {
          if (!_this.aborted) {
            _this.callHook(hook, context, next, options);
          }
        }, cb);
      } else {
        this.callHook(hooks, context, cb, options);
      }
    };

    return RouteTransition;
  })();

  function isPlainOjbect(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }

  function toArray(val) {
    return val ? Array.prototype.slice.call(val) : [];
  }

  var internalKeysRE = /^(component|subRoutes|fullPath)$/;

  /**
   * Route Context Object
   *
   * @param {String} path
   * @param {Router} router
   */

  var Route = function Route(path, router) {
    var _this = this;

    babelHelpers.classCallCheck(this, Route);

    var matched = router._recognizer.recognize(path);
    if (matched) {
      // copy all custom fields from route configs
      [].forEach.call(matched, function (match) {
        for (var key in match.handler) {
          if (!internalKeysRE.test(key)) {
            _this[key] = match.handler[key];
          }
        }
      });
      // set query and params
      this.query = matched.queryParams;
      this.params = [].reduce.call(matched, function (prev, cur) {
        if (cur.params) {
          for (var key in cur.params) {
            prev[key] = cur.params[key];
          }
        }
        return prev;
      }, {});
    }
    // expose path and router
    this.path = path;
    // for internal use
    this.matched = matched || router._notFoundHandler;
    // internal reference to router
    Object.defineProperty(this, 'router', {
      enumerable: false,
      value: router
    });
    // Important: freeze self to prevent observation
    Object.freeze(this);
  };

  function applyOverride (Vue) {
    var _Vue$util = Vue.util;
    var extend = _Vue$util.extend;
    var isArray = _Vue$util.isArray;
    var defineReactive = _Vue$util.defineReactive;

    // override Vue's init and destroy process to keep track of router instances
    var init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      options = options || {};
      var root = options._parent || options.parent || this;
      var router = root.$router;
      var route = root.$route;
      if (router) {
        // expose router
        this.$router = router;
        router._children.push(this);
        /* istanbul ignore if */
        if (this._defineMeta) {
          // 0.12
          this._defineMeta('$route', route);
        } else {
          // 1.0
          defineReactive(this, '$route', route);
        }
      }
      init.call(this, options);
    };

    var destroy = Vue.prototype._destroy;
    Vue.prototype._destroy = function () {
      if (!this._isBeingDestroyed && this.$router) {
        this.$router._children.$remove(this);
      }
      destroy.apply(this, arguments);
    };

    // 1.0 only: enable route mixins
    var strats = Vue.config.optionMergeStrategies;
    var hooksToMergeRE = /^(data|activate|deactivate)$/;

    if (strats) {
      strats.route = function (parentVal, childVal) {
        if (!childVal) return parentVal;
        if (!parentVal) return childVal;
        var ret = {};
        extend(ret, parentVal);
        for (var key in childVal) {
          var a = ret[key];
          var b = childVal[key];
          // for data, activate and deactivate, we need to merge them into
          // arrays similar to lifecycle hooks.
          if (a && hooksToMergeRE.test(key)) {
            ret[key] = (isArray(a) ? a : [a]).concat(b);
          } else {
            ret[key] = b;
          }
        }
        return ret;
      };
    }
  }

  function View (Vue) {

    var _ = Vue.util;
    var componentDef =
    // 0.12
    Vue.directive('_component') ||
    // 1.0
    Vue.internalDirectives.component;
    // <router-view> extends the internal component directive
    var viewDef = _.extend({}, componentDef);

    // with some overrides
    _.extend(viewDef, {

      _isRouterView: true,

      bind: function bind() {
        var route = this.vm.$route;
        /* istanbul ignore if */
        if (!route) {
          warn$1('<router-view> can only be used inside a ' + 'router-enabled app.');
          return;
        }
        // force dynamic directive so v-component doesn't
        // attempt to build right now
        this._isDynamicLiteral = true;
        // finally, init by delegating to v-component
        componentDef.bind.call(this);

        // locate the parent view
        var parentView = undefined;
        var parent = this.vm;
        while (parent) {
          if (parent._routerView) {
            parentView = parent._routerView;
            break;
          }
          parent = parent.$parent;
        }
        if (parentView) {
          // register self as a child of the parent view,
          // instead of activating now. This is so that the
          // child's activate hook is called after the
          // parent's has resolved.
          this.parentView = parentView;
          parentView.childView = this;
        } else {
          // this is the root view!
          var router = route.router;
          router._rootView = this;
        }

        // handle late-rendered view
        // two possibilities:
        // 1. root view rendered after transition has been
        //    validated;
        // 2. child view rendered after parent view has been
        //    activated.
        var transition = route.router._currentTransition;
        if (!parentView && transition.done || parentView && parentView.activated) {
          var depth = parentView ? parentView.depth + 1 : 0;
          activate(this, transition, depth);
        }
      },

      unbind: function unbind() {
        if (this.parentView) {
          this.parentView.childView = null;
        }
        componentDef.unbind.call(this);
      }
    });

    Vue.elementDirective('router-view', viewDef);
  }

  var trailingSlashRE = /\/$/;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
  var queryStringRE = /\?.*$/;

  // install v-link, which provides navigation support for
  // HTML5 history mode
  function Link (Vue) {
    var _Vue$util = Vue.util;
    var _bind = _Vue$util.bind;
    var isObject = _Vue$util.isObject;
    var addClass = _Vue$util.addClass;
    var removeClass = _Vue$util.removeClass;

    var onPriority = Vue.directive('on').priority;
    var LINK_UPDATE = '__vue-router-link-update__';

    var activeId = 0;

    Vue.directive('link-active', {
      priority: 9999,
      bind: function bind() {
        var _this = this;

        var id = String(activeId++);
        // collect v-links contained within this element.
        // we need do this here before the parent-child relationship
        // gets messed up by terminal directives (if, for, components)
        var childLinks = this.el.querySelectorAll('[v-link]');
        for (var i = 0, l = childLinks.length; i < l; i++) {
          var link = childLinks[i];
          var existingId = link.getAttribute(LINK_UPDATE);
          var value = existingId ? existingId + ',' + id : id;
          // leave a mark on the link element which can be persisted
          // through fragment clones.
          link.setAttribute(LINK_UPDATE, value);
        }
        this.vm.$on(LINK_UPDATE, this.cb = function (link, path) {
          if (link.activeIds.indexOf(id) > -1) {
            link.updateClasses(path, _this.el);
          }
        });
      },
      unbind: function unbind() {
        this.vm.$off(LINK_UPDATE, this.cb);
      }
    });

    Vue.directive('link', {
      priority: onPriority - 2,

      bind: function bind() {
        var vm = this.vm;
        /* istanbul ignore if */
        if (!vm.$route) {
          warn$1('v-link can only be used inside a router-enabled app.');
          return;
        }
        this.router = vm.$route.router;
        // update things when the route changes
        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
        // check v-link-active ids
        var activeIds = this.el.getAttribute(LINK_UPDATE);
        if (activeIds) {
          this.el.removeAttribute(LINK_UPDATE);
          this.activeIds = activeIds.split(',');
        }
        // no need to handle click if link expects to be opened
        // in a new window/tab.
        /* istanbul ignore if */
        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
          return;
        }
        // handle click
        this.handler = _bind(this.onClick, this);
        this.el.addEventListener('click', this.handler);
      },

      update: function update(target) {
        this.target = target;
        if (isObject(target)) {
          this.append = target.append;
          this.exact = target.exact;
          this.prevActiveClass = this.activeClass;
          this.activeClass = target.activeClass;
        }
        this.onRouteUpdate(this.vm.$route);
      },

      onClick: function onClick(e) {
        // don't redirect with control keys
        /* istanbul ignore if */
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        // don't redirect when preventDefault called
        /* istanbul ignore if */
        if (e.defaultPrevented) return;
        // don't redirect on right click
        /* istanbul ignore if */
        if (e.button !== 0) return;

        var target = this.target;
        if (target) {
          // v-link with expression, just go
          e.preventDefault();
          this.router.go(target);
        } else {
          // no expression, delegate for an <a> inside
          var el = e.target;
          while (el.tagName !== 'A' && el !== this.el) {
            el = el.parentNode;
          }
          if (el.tagName === 'A' && sameOrigin(el)) {
            e.preventDefault();
            var path = el.pathname;
            if (this.router.history.root) {
              path = path.replace(this.router.history.rootRE, '');
            }
            this.router.go({
              path: path,
              replace: target && target.replace,
              append: target && target.append
            });
          }
        }
      },

      onRouteUpdate: function onRouteUpdate(route) {
        // router.stringifyPath is dependent on current route
        // and needs to be called again whenver route changes.
        var newPath = this.router.stringifyPath(this.target);
        if (this.path !== newPath) {
          this.path = newPath;
          this.updateActiveMatch();
          this.updateHref();
        }
        if (this.activeIds) {
          this.vm.$emit(LINK_UPDATE, this, route.path);
        } else {
          this.updateClasses(route.path, this.el);
        }
      },

      updateActiveMatch: function updateActiveMatch() {
        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
      },

      updateHref: function updateHref() {
        if (this.el.tagName !== 'A') {
          return;
        }
        var path = this.path;
        var router = this.router;
        var isAbsolute = path.charAt(0) === '/';
        // do not format non-hash relative paths
        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
        if (href) {
          this.el.href = href;
        } else {
          this.el.removeAttribute('href');
        }
      },

      updateClasses: function updateClasses(path, el) {
        var activeClass = this.activeClass || this.router._linkActiveClass;
        // clear old class
        if (this.prevActiveClass && this.prevActiveClass !== activeClass) {
          toggleClasses(el, this.prevActiveClass, removeClass);
        }
        // remove query string before matching
        var dest = this.path.replace(queryStringRE, '');
        path = path.replace(queryStringRE, '');
        // add new class
        if (this.exact) {
          if (dest === path ||
          // also allow additional trailing slash
          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
            toggleClasses(el, activeClass, addClass);
          } else {
            toggleClasses(el, activeClass, removeClass);
          }
        } else {
          if (this.activeRE && this.activeRE.test(path)) {
            toggleClasses(el, activeClass, addClass);
          } else {
            toggleClasses(el, activeClass, removeClass);
          }
        }
      },

      unbind: function unbind() {
        this.el.removeEventListener('click', this.handler);
        this.unwatch && this.unwatch();
      }
    });

    function sameOrigin(link) {
      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
    }

    // this function is copied from v-bind:class implementation until
    // we properly expose it...
    function toggleClasses(el, key, fn) {
      key = key.trim();
      if (key.indexOf(' ') === -1) {
        fn(el, key);
        return;
      }
      var keys = key.split(/\s+/);
      for (var i = 0, l = keys.length; i < l; i++) {
        fn(el, keys[i]);
      }
    }
  }

  var historyBackends = {
    abstract: AbstractHistory,
    hash: HashHistory,
    html5: HTML5History
  };

  // late bind during install
  var Vue = undefined;

  /**
   * Router constructor
   *
   * @param {Object} [options]
   */

  var Router = (function () {
    function Router() {
      var _this = this;

      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$hashbang = _ref.hashbang;
      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
      var _ref$abstract = _ref.abstract;
      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
      var _ref$history = _ref.history;
      var history = _ref$history === undefined ? false : _ref$history;
      var _ref$saveScrollPosition = _ref.saveScrollPosition;
      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
      var _ref$transitionOnLoad = _ref.transitionOnLoad;
      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
      var _ref$suppressTransitionError = _ref.suppressTransitionError;
      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
      var _ref$root = _ref.root;
      var root = _ref$root === undefined ? null : _ref$root;
      var _ref$linkActiveClass = _ref.linkActiveClass;
      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
      babelHelpers.classCallCheck(this, Router);

      /* istanbul ignore if */
      if (!Router.installed) {
        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
      }

      // Vue instances
      this.app = null;
      this._children = [];

      // route recognizer
      this._recognizer = new RouteRecognizer();
      this._guardRecognizer = new RouteRecognizer();

      // state
      this._started = false;
      this._startCb = null;
      this._currentRoute = {};
      this._currentTransition = null;
      this._previousTransition = null;
      this._notFoundHandler = null;
      this._notFoundRedirect = null;
      this._beforeEachHooks = [];
      this._afterEachHooks = [];

      // trigger transition on initial render?
      this._rendered = false;
      this._transitionOnLoad = transitionOnLoad;

      // history mode
      this._root = root;
      this._abstract = abstract;
      this._hashbang = hashbang;

      // check if HTML5 history is available
      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
      this._history = history && hasPushState;
      this._historyFallback = history && !hasPushState;

      // create history object
      var inBrowser = Vue.util.inBrowser;
      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

      var History = historyBackends[this.mode];
      this.history = new History({
        root: root,
        hashbang: this._hashbang,
        onChange: function onChange(path, state, anchor) {
          _this._match(path, state, anchor);
        }
      });

      // other options
      this._saveScrollPosition = saveScrollPosition;
      this._linkActiveClass = linkActiveClass;
      this._suppress = suppressTransitionError;
    }

    /**
     * Allow directly passing components to a route
     * definition.
     *
     * @param {String} path
     * @param {Object} handler
     */

    // API ===================================================

    /**
    * Register a map of top-level paths.
    *
    * @param {Object} map
    */

    Router.prototype.map = function map(_map) {
      for (var route in _map) {
        this.on(route, _map[route]);
      }
      return this;
    };

    /**
     * Register a single root-level path
     *
     * @param {String} rootPath
     * @param {Object} handler
     *                 - {String} component
     *                 - {Object} [subRoutes]
     *                 - {Boolean} [forceRefresh]
     *                 - {Function} [before]
     *                 - {Function} [after]
     */

    Router.prototype.on = function on(rootPath, handler) {
      if (rootPath === '*') {
        this._notFound(handler);
      } else {
        this._addRoute(rootPath, handler, []);
      }
      return this;
    };

    /**
     * Set redirects.
     *
     * @param {Object} map
     */

    Router.prototype.redirect = function redirect(map) {
      for (var path in map) {
        this._addRedirect(path, map[path]);
      }
      return this;
    };

    /**
     * Set aliases.
     *
     * @param {Object} map
     */

    Router.prototype.alias = function alias(map) {
      for (var path in map) {
        this._addAlias(path, map[path]);
      }
      return this;
    };

    /**
     * Set global before hook.
     *
     * @param {Function} fn
     */

    Router.prototype.beforeEach = function beforeEach(fn) {
      this._beforeEachHooks.push(fn);
      return this;
    };

    /**
     * Set global after hook.
     *
     * @param {Function} fn
     */

    Router.prototype.afterEach = function afterEach(fn) {
      this._afterEachHooks.push(fn);
      return this;
    };

    /**
     * Navigate to a given path.
     * The path can be an object describing a named path in
     * the format of { name: '...', params: {}, query: {}}
     * The path is assumed to be already decoded, and will
     * be resolved against root (if provided)
     *
     * @param {String|Object} path
     * @param {Boolean} [replace]
     */

    Router.prototype.go = function go(path) {
      var replace = false;
      var append = false;
      if (Vue.util.isObject(path)) {
        replace = path.replace;
        append = path.append;
      }
      path = this.stringifyPath(path);
      if (path) {
        this.history.go(path, replace, append);
      }
    };

    /**
     * Short hand for replacing current path
     *
     * @param {String} path
     */

    Router.prototype.replace = function replace(path) {
      if (typeof path === 'string') {
        path = { path: path };
      }
      path.replace = true;
      this.go(path);
    };

    /**
     * Start the router.
     *
     * @param {VueConstructor} App
     * @param {String|Element} container
     * @param {Function} [cb]
     */

    Router.prototype.start = function start(App, container, cb) {
      /* istanbul ignore if */
      if (this._started) {
        warn$1('already started.');
        return;
      }
      this._started = true;
      this._startCb = cb;
      if (!this.app) {
        /* istanbul ignore if */
        if (!App || !container) {
          throw new Error('Must start vue-router with a component and a ' + 'root container.');
        }
        /* istanbul ignore if */
        if (App instanceof Vue) {
          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
        }
        this._appContainer = container;
        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
        // give it a name for better debugging
        Ctor.options.name = Ctor.options.name || 'RouterApp';
      }

      // handle history fallback in browsers that do not
      // support HTML5 history API
      if (this._historyFallback) {
        var _location = window.location;
        var _history = new HTML5History({ root: this._root });
        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
        if (path && path !== '/') {
          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
          return;
        }
      }

      this.history.start();
    };

    /**
     * Stop listening to route changes.
     */

    Router.prototype.stop = function stop() {
      this.history.stop();
      this._started = false;
    };

    /**
     * Normalize named route object / string paths into
     * a string.
     *
     * @param {Object|String|Number} path
     * @return {String}
     */

    Router.prototype.stringifyPath = function stringifyPath(path) {
      var generatedPath = '';
      if (path && typeof path === 'object') {
        if (path.name) {
          var extend = Vue.util.extend;
          var currentParams = this._currentTransition && this._currentTransition.to.params;
          var targetParams = path.params || {};
          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
          generatedPath = encodeURI(this._recognizer.generate(path.name, params));
        } else if (path.path) {
          generatedPath = encodeURI(path.path);
        }
        if (path.query) {
          // note: the generated query string is pre-URL-encoded by the recognizer
          var query = this._recognizer.generateQueryString(path.query);
          if (generatedPath.indexOf('?') > -1) {
            generatedPath += '&' + query.slice(1);
          } else {
            generatedPath += query;
          }
        }
      } else {
        generatedPath = encodeURI(path ? path + '' : '');
      }
      return generatedPath;
    };

    // Internal methods ======================================

    /**
    * Add a route containing a list of segments to the internal
    * route recognizer. Will be called recursively to add all
    * possible sub-routes.
    *
    * @param {String} path
    * @param {Object} handler
    * @param {Array} segments
    */

    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
      guardComponent(path, handler);
      handler.path = path;
      handler.fullPath = (segments.reduce(function (path, segment) {
        return path + segment.path;
      }, '') + path).replace('//', '/');
      segments.push({
        path: path,
        handler: handler
      });
      this._recognizer.add(segments, {
        as: handler.name
      });
      // add sub routes
      if (handler.subRoutes) {
        for (var subPath in handler.subRoutes) {
          // recursively walk all sub routes
          this._addRoute(subPath, handler.subRoutes[subPath],
          // pass a copy in recursion to avoid mutating
          // across branches
          segments.slice());
        }
      }
    };

    /**
     * Set the notFound route handler.
     *
     * @param {Object} handler
     */

    Router.prototype._notFound = function _notFound(handler) {
      guardComponent('*', handler);
      this._notFoundHandler = [{ handler: handler }];
    };

    /**
     * Add a redirect record.
     *
     * @param {String} path
     * @param {String} redirectPath
     */

    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
      if (path === '*') {
        this._notFoundRedirect = redirectPath;
      } else {
        this._addGuard(path, redirectPath, this.replace);
      }
    };

    /**
     * Add an alias record.
     *
     * @param {String} path
     * @param {String} aliasPath
     */

    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
      this._addGuard(path, aliasPath, this._match);
    };

    /**
     * Add a path guard.
     *
     * @param {String} path
     * @param {String} mappedPath
     * @param {Function} handler
     */

    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
      var _this2 = this;

      this._guardRecognizer.add([{
        path: path,
        handler: function handler(match, query) {
          var realPath = mapParams(mappedPath, match.params, query);
          _handler.call(_this2, realPath);
        }
      }]);
    };

    /**
     * Check if a path matches any redirect records.
     *
     * @param {String} path
     * @return {Boolean} - if true, will skip normal match.
     */

    Router.prototype._checkGuard = function _checkGuard(path) {
      var matched = this._guardRecognizer.recognize(path, true);
      if (matched) {
        matched[0].handler(matched[0], matched.queryParams);
        return true;
      } else if (this._notFoundRedirect) {
        matched = this._recognizer.recognize(path);
        if (!matched) {
          this.replace(this._notFoundRedirect);
          return true;
        }
      }
    };

    /**
     * Match a URL path and set the route context on vm,
     * triggering view updates.
     *
     * @param {String} path
     * @param {Object} [state]
     * @param {String} [anchor]
     */

    Router.prototype._match = function _match(path, state, anchor) {
      var _this3 = this;

      if (this._checkGuard(path)) {
        return;
      }

      var currentRoute = this._currentRoute;
      var currentTransition = this._currentTransition;

      if (currentTransition) {
        if (currentTransition.to.path === path) {
          // do nothing if we have an active transition going to the same path
          return;
        } else if (currentRoute.path === path) {
          // We are going to the same path, but we also have an ongoing but
          // not-yet-validated transition. Abort that transition and reset to
          // prev transition.
          currentTransition.aborted = true;
          this._currentTransition = this._prevTransition;
          return;
        } else {
          // going to a totally different path. abort ongoing transition.
          currentTransition.aborted = true;
        }
      }

      // construct new route and transition context
      var route = new Route(path, this);
      var transition = new RouteTransition(this, route, currentRoute);

      // current transition is updated right now.
      // however, current route will only be updated after the transition has
      // been validated.
      this._prevTransition = currentTransition;
      this._currentTransition = transition;

      if (!this.app) {
        (function () {
          // initial render
          var router = _this3;
          _this3.app = new _this3._appConstructor({
            el: _this3._appContainer,
            created: function created() {
              this.$router = router;
            },
            _meta: {
              $route: route
            }
          });
        })();
      }

      // check global before hook
      var beforeHooks = this._beforeEachHooks;
      var startTransition = function startTransition() {
        transition.start(function () {
          _this3._postTransition(route, state, anchor);
        });
      };

      if (beforeHooks.length) {
        transition.runQueue(beforeHooks, function (hook, _, next) {
          if (transition === _this3._currentTransition) {
            transition.callHook(hook, null, next, {
              expectBoolean: true
            });
          }
        }, startTransition);
      } else {
        startTransition();
      }

      if (!this._rendered && this._startCb) {
        this._startCb.call(null);
      }

      // HACK:
      // set rendered to true after the transition start, so
      // that components that are acitvated synchronously know
      // whether it is the initial render.
      this._rendered = true;
    };

    /**
     * Set current to the new transition.
     * This is called by the transition object when the
     * validation of a route has succeeded.
     *
     * @param {Transition} transition
     */

    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
      // set current route
      var route = this._currentRoute = transition.to;
      // update route context for all children
      if (this.app.$route !== route) {
        this.app.$route = route;
        this._children.forEach(function (child) {
          child.$route = route;
        });
      }
      // call global after hook
      if (this._afterEachHooks.length) {
        this._afterEachHooks.forEach(function (hook) {
          return hook.call(null, {
            to: transition.to,
            from: transition.from
          });
        });
      }
      this._currentTransition.done = true;
    };

    /**
     * Handle stuff after the transition.
     *
     * @param {Route} route
     * @param {Object} [state]
     * @param {String} [anchor]
     */

    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
      // handle scroll positions
      // saved scroll positions take priority
      // then we check if the path has an anchor
      var pos = state && state.pos;
      if (pos && this._saveScrollPosition) {
        Vue.nextTick(function () {
          window.scrollTo(pos.x, pos.y);
        });
      } else if (anchor) {
        Vue.nextTick(function () {
          var el = document.getElementById(anchor.slice(1));
          if (el) {
            window.scrollTo(window.scrollX, el.offsetTop);
          }
        });
      }
    };

    return Router;
  })();

  function guardComponent(path, handler) {
    var comp = handler.component;
    if (Vue.util.isPlainObject(comp)) {
      comp = handler.component = Vue.extend(comp);
    }
    /* istanbul ignore if */
    if (typeof comp !== 'function') {
      handler.component = null;
      warn$1('invalid component for route "' + path + '".');
    }
  }

  /* Installation */

  Router.installed = false;

  /**
   * Installation interface.
   * Install the necessary directives.
   */

  Router.install = function (externalVue) {
    /* istanbul ignore if */
    if (Router.installed) {
      warn$1('already installed.');
      return;
    }
    Vue = externalVue;
    applyOverride(Vue);
    View(Vue);
    Link(Vue);
    exports$1.Vue = Vue;
    Router.installed = true;
  };

  // auto install
  /* istanbul ignore if */
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Router);
  }

  return Router;

}));
},{}],24:[function(require,module,exports){
(function (process,global){
/*!
 * Vue.js v1.0.25
 * (c) 2016 Evan You
 * Released under the MIT License.
 */
'use strict';

function set(obj, key, val) {
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return;
  }
  if (obj._isVue) {
    set(obj._data, key, val);
    return;
  }
  var ob = obj.__ob__;
  if (!ob) {
    obj[key] = val;
    return;
  }
  ob.convert(key, val);
  ob.dep.notify();
  if (ob.vms) {
    var i = ob.vms.length;
    while (i--) {
      var vm = ob.vms[i];
      vm._proxy(key);
      vm._digest();
    }
  }
  return val;
}

/**
 * Delete a property and trigger change if necessary.
 *
 * @param {Object} obj
 * @param {String} key
 */

function del(obj, key) {
  if (!hasOwn(obj, key)) {
    return;
  }
  delete obj[key];
  var ob = obj.__ob__;
  if (!ob) {
    if (obj._isVue) {
      delete obj._data[key];
      obj._digest();
    }
    return;
  }
  ob.dep.notify();
  if (ob.vms) {
    var i = ob.vms.length;
    while (i--) {
      var vm = ob.vms[i];
      vm._unproxy(key);
      vm._digest();
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Check if an expression is a literal value.
 *
 * @param {String} exp
 * @return {Boolean}
 */

var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

function isLiteral(exp) {
  return literalValueRE.test(exp);
}

/**
 * Check if a string starts with $ or _
 *
 * @param {String} str
 * @return {Boolean}
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}

/**
 * Guard text output, make sure undefined outputs
 * empty string
 *
 * @param {*} value
 * @return {String}
 */

function _toString(value) {
  return value == null ? '' : value.toString();
}

/**
 * Check and convert possible numeric strings to numbers
 * before setting back to data
 *
 * @param {*} value
 * @return {*|Number}
 */

function toNumber(value) {
  if (typeof value !== 'string') {
    return value;
  } else {
    var parsed = Number(value);
    return isNaN(parsed) ? value : parsed;
  }
}

/**
 * Convert string boolean literals into real booleans.
 *
 * @param {*} value
 * @return {*|Boolean}
 */

function toBoolean(value) {
  return value === 'true' ? true : value === 'false' ? false : value;
}

/**
 * Strip quotes from a string
 *
 * @param {String} str
 * @return {String | false}
 */

function stripQuotes(str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}

/**
 * Camelize a hyphen-delmited string.
 *
 * @param {String} str
 * @return {String}
 */

var camelizeRE = /-(\w)/g;

function camelize(str) {
  return str.replace(camelizeRE, toUpper);
}

function toUpper(_, c) {
  return c ? c.toUpperCase() : '';
}

/**
 * Hyphenate a camelCase string.
 *
 * @param {String} str
 * @return {String}
 */

var hyphenateRE = /([a-z\d])([A-Z])/g;

function hyphenate(str) {
  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
}

/**
 * Converts hyphen/underscore/slash delimitered names into
 * camelized classNames.
 *
 * e.g. my-component => MyComponent
 *      some_else    => SomeElse
 *      some/comp    => SomeComp
 *
 * @param {String} str
 * @return {String}
 */

var classifyRE = /(?:^|[-_\/])(\w)/g;

function classify(str) {
  return str.replace(classifyRE, toUpper);
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */

function bind(fn, ctx) {
  return function (a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  };
}

/**
 * Convert an Array-like object to a real Array.
 *
 * @param {Array-like} list
 * @param {Number} [start] - start index
 * @return {Array}
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 *
 * @param {Object} to
 * @param {Object} from
 */

function extend(to, from) {
  var keys = Object.keys(from);
  var i = keys.length;
  while (i--) {
    to[keys[i]] = from[keys[i]];
  }
  return to;
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * @param {*} obj
 * @return {Boolean}
 */

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';

function isPlainObject(obj) {
  return toString.call(obj) === OBJECT_STRING;
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var isArray = Array.isArray;

/**
 * Define a property.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} [enumerable]
 */

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Debounce a function so it only gets called after the
 * input stops arriving after the given wait period.
 *
 * @param {Function} func
 * @param {Number} wait
 * @return {Function} - the debounced function
 */

function _debounce(func, wait) {
  var timeout, args, context, timestamp, result;
  var later = function later() {
    var last = Date.now() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
  };
  return function () {
    context = this;
    args = arguments;
    timestamp = Date.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    return result;
  };
}

/**
 * Manual indexOf because it's slightly faster than
 * native.
 *
 * @param {Array} arr
 * @param {*} obj
 */

function indexOf(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) return i;
  }
  return -1;
}

/**
 * Make a cancellable version of an async callback.
 *
 * @param {Function} fn
 * @return {Function}
 */

function cancellable(fn) {
  var cb = function cb() {
    if (!cb.cancelled) {
      return fn.apply(this, arguments);
    }
  };
  cb.cancel = function () {
    cb.cancelled = true;
  };
  return cb;
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 */

function looseEqual(a, b) {
  /* eslint-disable eqeqeq */
  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
  /* eslint-enable eqeqeq */
}

var hasProto = ('__proto__' in {});

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

// UA sniffing for working around browser-specific quirks
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && UA.indexOf('trident') > 0;
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
var iosVersionMatch = isIos && UA.match(/os ([\d_]+)/);
var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

// detecting iOS UIWebView by indexedDB
var hasMutationObserverBug = iosVersion && Number(iosVersion[0]) >= 9 && Number(iosVersion[1]) >= 3 && !window.indexedDB;

var transitionProp = undefined;
var transitionEndEvent = undefined;
var animationProp = undefined;
var animationEndEvent = undefined;

// Transition property/event sniffing
if (inBrowser && !isIE9) {
  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
}

/**
 * Defer a task to execute it asynchronously. Ideally this
 * should be executed as a microtask, so we leverage
 * MutationObserver if it's available, and fallback to
 * setTimeout(0).
 *
 * @param {Function} cb
 * @param {Object} ctx
 */

var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;
  function nextTickHandler() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks = [];
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  /* istanbul ignore if */
  if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(counter);
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = counter;
    };
  } else {
    // webpack attempts to inject a shim for setImmediate
    // if it is used as a global, so we have to work around that to
    // avoid bundling unnecessary code.
    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
    timerFunc = context.setImmediate || setTimeout;
  }
  return function (cb, ctx) {
    var func = ctx ? function () {
      cb.call(ctx);
    } : cb;
    callbacks.push(func);
    if (pending) return;
    pending = true;
    timerFunc(nextTickHandler, 0);
  };
})();

var _Set = undefined;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    this.set = Object.create(null);
  };
  _Set.prototype.has = function (key) {
    return this.set[key] !== undefined;
  };
  _Set.prototype.add = function (key) {
    this.set[key] = 1;
  };
  _Set.prototype.clear = function () {
    this.set = Object.create(null);
  };
}

function Cache(limit) {
  this.size = 0;
  this.limit = limit;
  this.head = this.tail = undefined;
  this._keymap = Object.create(null);
}

var p = Cache.prototype;

/**
 * Put <value> into the cache associated with <key>.
 * Returns the entry which was removed to make room for
 * the new entry. Otherwise undefined is returned.
 * (i.e. if there was enough room already).
 *
 * @param {String} key
 * @param {*} value
 * @return {Entry|undefined}
 */

p.put = function (key, value) {
  var removed;

  var entry = this.get(key, true);
  if (!entry) {
    if (this.size === this.limit) {
      removed = this.shift();
    }
    entry = {
      key: key
    };
    this._keymap[key] = entry;
    if (this.tail) {
      this.tail.newer = entry;
      entry.older = this.tail;
    } else {
      this.head = entry;
    }
    this.tail = entry;
    this.size++;
  }
  entry.value = value;

  return removed;
};

/**
 * Purge the least recently used (oldest) entry from the
 * cache. Returns the removed entry or undefined if the
 * cache was empty.
 */

p.shift = function () {
  var entry = this.head;
  if (entry) {
    this.head = this.head.newer;
    this.head.older = undefined;
    entry.newer = entry.older = undefined;
    this._keymap[entry.key] = undefined;
    this.size--;
  }
  return entry;
};

/**
 * Get and register recent use of <key>. Returns the value
 * associated with <key> or undefined if not in cache.
 *
 * @param {String} key
 * @param {Boolean} returnEntry
 * @return {Entry|*}
 */

p.get = function (key, returnEntry) {
  var entry = this._keymap[key];
  if (entry === undefined) return;
  if (entry === this.tail) {
    return returnEntry ? entry : entry.value;
  }
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  if (entry.newer) {
    if (entry === this.head) {
      this.head = entry.newer;
    }
    entry.newer.older = entry.older; // C <-- E.
  }
  if (entry.older) {
    entry.older.newer = entry.newer; // C. --> E
  }
  entry.newer = undefined; // D --x
  entry.older = this.tail; // D. --> E
  if (this.tail) {
    this.tail.newer = entry; // E. <-- D
  }
  this.tail = entry;
  return returnEntry ? entry : entry.value;
};

var cache$1 = new Cache(1000);
var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
var reservedArgRE = /^in$|^-?\d+/;

/**
 * Parser state
 */

var str;
var dir;
var c;
var prev;
var i;
var l;
var lastFilterIndex;
var inSingle;
var inDouble;
var curly;
var square;
var paren;
/**
 * Push a filter to the current directive object
 */

function pushFilter() {
  var exp = str.slice(lastFilterIndex, i).trim();
  var filter;
  if (exp) {
    filter = {};
    var tokens = exp.match(filterTokenRE);
    filter.name = tokens[0];
    if (tokens.length > 1) {
      filter.args = tokens.slice(1).map(processFilterArg);
    }
  }
  if (filter) {
    (dir.filters = dir.filters || []).push(filter);
  }
  lastFilterIndex = i + 1;
}

/**
 * Check if an argument is dynamic and strip quotes.
 *
 * @param {String} arg
 * @return {Object}
 */

function processFilterArg(arg) {
  if (reservedArgRE.test(arg)) {
    return {
      value: toNumber(arg),
      dynamic: false
    };
  } else {
    var stripped = stripQuotes(arg);
    var dynamic = stripped === arg;
    return {
      value: dynamic ? arg : stripped,
      dynamic: dynamic
    };
  }
}

/**
 * Parse a directive value and extract the expression
 * and its filters into a descriptor.
 *
 * Example:
 *
 * "a + 1 | uppercase" will yield:
 * {
 *   expression: 'a + 1',
 *   filters: [
 *     { name: 'uppercase', args: null }
 *   ]
 * }
 *
 * @param {String} s
 * @return {Object}
 */

function parseDirective(s) {
  var hit = cache$1.get(s);
  if (hit) {
    return hit;
  }

  // reset parser state
  str = s;
  inSingle = inDouble = false;
  curly = square = paren = 0;
  lastFilterIndex = 0;
  dir = {};

  for (i = 0, l = str.length; i < l; i++) {
    prev = c;
    c = str.charCodeAt(i);
    if (inSingle) {
      // check single quote
      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
    } else if (inDouble) {
      // check double quote
      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
    } else if (c === 0x7C && // pipe
    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
      if (dir.expression == null) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        dir.expression = str.slice(0, i).trim();
      } else {
        // already has filter
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true;break; // "
        case 0x27:
          inSingle = true;break; // '
        case 0x28:
          paren++;break; // (
        case 0x29:
          paren--;break; // )
        case 0x5B:
          square++;break; // [
        case 0x5D:
          square--;break; // ]
        case 0x7B:
          curly++;break; // {
        case 0x7D:
          curly--;break; // }
      }
    }
  }

  if (dir.expression == null) {
    dir.expression = str.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  cache$1.put(s, dir);
  return dir;
}

var directive = Object.freeze({
  parseDirective: parseDirective
});

var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
var cache = undefined;
var tagRE = undefined;
var htmlRE = undefined;
/**
 * Escape a string so it can be used in a RegExp
 * constructor.
 *
 * @param {String} str
 */

function escapeRegex(str) {
  return str.replace(regexEscapeRE, '\\$&');
}

function compileRegex() {
  var open = escapeRegex(config.delimiters[0]);
  var close = escapeRegex(config.delimiters[1]);
  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
  // reset cache
  cache = new Cache(1000);
}

/**
 * Parse a template text string into an array of tokens.
 *
 * @param {String} text
 * @return {Array<Object> | null}
 *               - {String} type
 *               - {String} value
 *               - {Boolean} [html]
 *               - {Boolean} [oneTime]
 */

function parseText(text) {
  if (!cache) {
    compileRegex();
  }
  var hit = cache.get(text);
  if (hit) {
    return hit;
  }
  if (!tagRE.test(text)) {
    return null;
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, html, value, first, oneTime;
  /* eslint-disable no-cond-assign */
  while (match = tagRE.exec(text)) {
    /* eslint-enable no-cond-assign */
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push({
        value: text.slice(lastIndex, index)
      });
    }
    // tag token
    html = htmlRE.test(match[0]);
    value = html ? match[1] : match[2];
    first = value.charCodeAt(0);
    oneTime = first === 42; // *
    value = oneTime ? value.slice(1) : value;
    tokens.push({
      tag: true,
      value: value.trim(),
      html: html,
      oneTime: oneTime
    });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({
      value: text.slice(lastIndex)
    });
  }
  cache.put(text, tokens);
  return tokens;
}

/**
 * Format a list of tokens into an expression.
 * e.g. tokens parsed from 'a {{b}} c' can be serialized
 * into one single expression as '"a " + b + " c"'.
 *
 * @param {Array} tokens
 * @param {Vue} [vm]
 * @return {String}
 */

function tokensToExp(tokens, vm) {
  if (tokens.length > 1) {
    return tokens.map(function (token) {
      return formatToken(token, vm);
    }).join('+');
  } else {
    return formatToken(tokens[0], vm, true);
  }
}

/**
 * Format a single token.
 *
 * @param {Object} token
 * @param {Vue} [vm]
 * @param {Boolean} [single]
 * @return {String}
 */

function formatToken(token, vm, single) {
  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
}

/**
 * For an attribute with multiple interpolation tags,
 * e.g. attr="some-{{thing | filter}}", in order to combine
 * the whole thing into a single watchable expression, we
 * have to inline those filters. This function does exactly
 * that. This is a bit hacky but it avoids heavy changes
 * to directive parser and watcher mechanism.
 *
 * @param {String} exp
 * @param {Boolean} single
 * @return {String}
 */

var filterRE = /[^|]\|[^|]/;
function inlineFilters(exp, single) {
  if (!filterRE.test(exp)) {
    return single ? exp : '(' + exp + ')';
  } else {
    var dir = parseDirective(exp);
    if (!dir.filters) {
      return '(' + exp + ')';
    } else {
      return 'this._applyFilters(' + dir.expression + // value
      ',null,' + // oldValue (null for read)
      JSON.stringify(dir.filters) + // filter descriptors
      ',false)'; // write?
    }
  }
}

var text = Object.freeze({
  compileRegex: compileRegex,
  parseText: parseText,
  tokensToExp: tokensToExp
});

var delimiters = ['{{', '}}'];
var unsafeDelimiters = ['{{{', '}}}'];

var config = Object.defineProperties({

  /**
   * Whether to print debug messages.
   * Also enables stack trace for warnings.
   *
   * @type {Boolean}
   */

  debug: false,

  /**
   * Whether to suppress warnings.
   *
   * @type {Boolean}
   */

  silent: false,

  /**
   * Whether to use async rendering.
   */

  async: true,

  /**
   * Whether to warn against errors caught when evaluating
   * expressions.
   */

  warnExpressionErrors: true,

  /**
   * Whether to allow devtools inspection.
   * Disabled by default in production builds.
   */

  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Internal flag to indicate the delimiters have been
   * changed.
   *
   * @type {Boolean}
   */

  _delimitersChanged: true,

  /**
   * List of asset types that a component can own.
   *
   * @type {Array}
   */

  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

  /**
   * prop binding modes
   */

  _propBindingModes: {
    ONE_WAY: 0,
    TWO_WAY: 1,
    ONE_TIME: 2
  },

  /**
   * Max circular updates allowed in a batcher flush cycle.
   */

  _maxUpdateCount: 100

}, {
  delimiters: { /**
                 * Interpolation delimiters. Changing these would trigger
                 * the text parser to re-compile the regular expressions.
                 *
                 * @type {Array<String>}
                 */

    get: function get() {
      return delimiters;
    },
    set: function set(val) {
      delimiters = val;
      compileRegex();
    },
    configurable: true,
    enumerable: true
  },
  unsafeDelimiters: {
    get: function get() {
      return unsafeDelimiters;
    },
    set: function set(val) {
      unsafeDelimiters = val;
      compileRegex();
    },
    configurable: true,
    enumerable: true
  }
});

var warn = undefined;
var formatComponentName = undefined;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var hasConsole = typeof console !== 'undefined';

    warn = function (msg, vm) {
      if (hasConsole && !config.silent) {
        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
      }
    };

    formatComponentName = function (vm) {
      var name = vm._isVue ? vm.$options.name : vm.name;
      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
    };
  })();
}

/**
 * Append with transition.
 *
 * @param {Element} el
 * @param {Element} target
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function appendWithTransition(el, target, vm, cb) {
  applyTransition(el, 1, function () {
    target.appendChild(el);
  }, vm, cb);
}

/**
 * InsertBefore with transition.
 *
 * @param {Element} el
 * @param {Element} target
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function beforeWithTransition(el, target, vm, cb) {
  applyTransition(el, 1, function () {
    before(el, target);
  }, vm, cb);
}

/**
 * Remove with transition.
 *
 * @param {Element} el
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function removeWithTransition(el, vm, cb) {
  applyTransition(el, -1, function () {
    remove(el);
  }, vm, cb);
}

/**
 * Apply transitions with an operation callback.
 *
 * @param {Element} el
 * @param {Number} direction
 *                  1: enter
 *                 -1: leave
 * @param {Function} op - the actual DOM operation
 * @param {Vue} vm
 * @param {Function} [cb]
 */

function applyTransition(el, direction, op, vm, cb) {
  var transition = el.__v_trans;
  if (!transition ||
  // skip if there are no js hooks and CSS transition is
  // not supported
  !transition.hooks && !transitionEndEvent ||
  // skip transitions for initial compile
  !vm._isCompiled ||
  // if the vm is being manipulated by a parent directive
  // during the parent's compilation phase, skip the
  // animation.
  vm.$parent && !vm.$parent._isCompiled) {
    op();
    if (cb) cb();
    return;
  }
  var action = direction > 0 ? 'enter' : 'leave';
  transition[action](op, cb);
}

var transition = Object.freeze({
  appendWithTransition: appendWithTransition,
  beforeWithTransition: beforeWithTransition,
  removeWithTransition: removeWithTransition,
  applyTransition: applyTransition
});

/**
 * Query an element selector if it's not an element already.
 *
 * @param {String|Element} el
 * @return {Element}
 */

function query(el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
    }
  }
  return el;
}

/**
 * Check if a node is in the document.
 * Note: document.documentElement.contains should work here
 * but always returns false for comment nodes in phantomjs,
 * making unit tests difficult. This is fixed by doing the
 * contains() check on the node's parentNode instead of
 * the node itself.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function inDoc(node) {
  if (!node) return false;
  var doc = node.ownerDocument.documentElement;
  var parent = node.parentNode;
  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
}

/**
 * Get and remove an attribute from a node.
 *
 * @param {Node} node
 * @param {String} _attr
 */

function getAttr(node, _attr) {
  var val = node.getAttribute(_attr);
  if (val !== null) {
    node.removeAttribute(_attr);
  }
  return val;
}

/**
 * Get an attribute with colon or v-bind: prefix.
 *
 * @param {Node} node
 * @param {String} name
 * @return {String|null}
 */

function getBindAttr(node, name) {
  var val = getAttr(node, ':' + name);
  if (val === null) {
    val = getAttr(node, 'v-bind:' + name);
  }
  return val;
}

/**
 * Check the presence of a bind attribute.
 *
 * @param {Node} node
 * @param {String} name
 * @return {Boolean}
 */

function hasBindAttr(node, name) {
  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

function before(el, target) {
  target.parentNode.insertBefore(el, target);
}

/**
 * Insert el after target
 *
 * @param {Element} el
 * @param {Element} target
 */

function after(el, target) {
  if (target.nextSibling) {
    before(el, target.nextSibling);
  } else {
    target.parentNode.appendChild(el);
  }
}

/**
 * Remove el from DOM
 *
 * @param {Element} el
 */

function remove(el) {
  el.parentNode.removeChild(el);
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

function prepend(el, target) {
  if (target.firstChild) {
    before(el, target.firstChild);
  } else {
    target.appendChild(el);
  }
}

/**
 * Replace target with el
 *
 * @param {Element} target
 * @param {Element} el
 */

function replace(target, el) {
  var parent = target.parentNode;
  if (parent) {
    parent.replaceChild(el, target);
  }
}

/**
 * Add event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 * @param {Boolean} [useCapture]
 */

function on(el, event, cb, useCapture) {
  el.addEventListener(event, cb, useCapture);
}

/**
 * Remove event listener shorthand.
 *
 * @param {Element} el
 * @param {String} event
 * @param {Function} cb
 */

function off(el, event, cb) {
  el.removeEventListener(event, cb);
}

/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */

function getClass(el) {
  var classname = el.className;
  if (typeof classname === 'object') {
    classname = classname.baseVal || '';
  }
  return classname;
}

/**
 * In IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; However in
 * PhantomJS, setting `className` does not work on SVG elements...
 * So we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */

function setClass(el, cls) {
  /* istanbul ignore if */
  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
    el.className = cls;
  } else {
    el.setAttribute('class', cls);
  }
}

/**
 * Add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

function addClass(el, cls) {
  if (el.classList) {
    el.classList.add(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      setClass(el, (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

function removeClass(el, cls) {
  if (el.classList) {
    el.classList.remove(cls);
  } else {
    var cur = ' ' + getClass(el) + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    setClass(el, cur.trim());
  }
  if (!el.className) {
    el.removeAttribute('class');
  }
}

/**
 * Extract raw content inside an element into a temporary
 * container div
 *
 * @param {Element} el
 * @param {Boolean} asFragment
 * @return {Element|DocumentFragment}
 */

function extractContent(el, asFragment) {
  var child;
  var rawContent;
  /* istanbul ignore if */
  if (isTemplate(el) && isFragment(el.content)) {
    el = el.content;
  }
  if (el.hasChildNodes()) {
    trimNode(el);
    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
    /* eslint-disable no-cond-assign */
    while (child = el.firstChild) {
      /* eslint-enable no-cond-assign */
      rawContent.appendChild(child);
    }
  }
  return rawContent;
}

/**
 * Trim possible empty head/tail text and comment
 * nodes inside a parent.
 *
 * @param {Node} node
 */

function trimNode(node) {
  var child;
  /* eslint-disable no-sequences */
  while ((child = node.firstChild, isTrimmable(child))) {
    node.removeChild(child);
  }
  while ((child = node.lastChild, isTrimmable(child))) {
    node.removeChild(child);
  }
  /* eslint-enable no-sequences */
}

function isTrimmable(node) {
  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
}

/**
 * Check if an element is a template tag.
 * Note if the template appears inside an SVG its tagName
 * will be in lowercase.
 *
 * @param {Element} el
 */

function isTemplate(el) {
  return el.tagName && el.tagName.toLowerCase() === 'template';
}

/**
 * Create an "anchor" for performing dom insertion/removals.
 * This is used in a number of scenarios:
 * - fragment instance
 * - v-html
 * - v-if
 * - v-for
 * - component
 *
 * @param {String} content
 * @param {Boolean} persist - IE trashes empty textNodes on
 *                            cloneNode(true), so in certain
 *                            cases the anchor needs to be
 *                            non-empty to be persisted in
 *                            templates.
 * @return {Comment|Text}
 */

function createAnchor(content, persist) {
  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
  anchor.__v_anchor = true;
  return anchor;
}

/**
 * Find a component ref attribute that starts with $.
 *
 * @param {Element} node
 * @return {String|undefined}
 */

var refRE = /^v-ref:/;

function findRef(node) {
  if (node.hasAttributes()) {
    var attrs = node.attributes;
    for (var i = 0, l = attrs.length; i < l; i++) {
      var name = attrs[i].name;
      if (refRE.test(name)) {
        return camelize(name.replace(refRE, ''));
      }
    }
  }
}

/**
 * Map a function to a range of nodes .
 *
 * @param {Node} node
 * @param {Node} end
 * @param {Function} op
 */

function mapNodeRange(node, end, op) {
  var next;
  while (node !== end) {
    next = node.nextSibling;
    op(node);
    node = next;
  }
  op(end);
}

/**
 * Remove a range of nodes with transition, store
 * the nodes in a fragment with correct ordering,
 * and call callback when done.
 *
 * @param {Node} start
 * @param {Node} end
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Function} cb
 */

function removeNodeRange(start, end, vm, frag, cb) {
  var done = false;
  var removed = 0;
  var nodes = [];
  mapNodeRange(start, end, function (node) {
    if (node === end) done = true;
    nodes.push(node);
    removeWithTransition(node, vm, onRemoved);
  });
  function onRemoved() {
    removed++;
    if (done && removed >= nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        frag.appendChild(nodes[i]);
      }
      cb && cb();
    }
  }
}

/**
 * Check if a node is a DocumentFragment.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function isFragment(node) {
  return node && node.nodeType === 11;
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 *
 * @param {Element} el
 * @return {String}
 */

function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
var reservedTagRE = /^(slot|partial|component)$/i;

var isUnknownElement = undefined;
if (process.env.NODE_ENV !== 'production') {
  isUnknownElement = function (el, tag) {
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
    } else {
      return (/HTMLUnknownElement/.test(el.toString()) &&
        // Chrome returns unknown for several HTML5 elements.
        // https://code.google.com/p/chromium/issues/detail?id=540526
        // Firefox returns unknown for some "Interactive elements."
        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
      );
    }
  };
}

/**
 * Check if an element is a component, if yes return its
 * component id.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

function checkComponentAttr(el, options) {
  var tag = el.tagName.toLowerCase();
  var hasAttrs = el.hasAttributes();
  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
    if (resolveAsset(options, 'components', tag)) {
      return { id: tag };
    } else {
      var is = hasAttrs && getIsBinding(el, options);
      if (is) {
        return is;
      } else if (process.env.NODE_ENV !== 'production') {
        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
        if (expectedTag) {
          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
        } else if (isUnknownElement(el, tag)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
        }
      }
    }
  } else if (hasAttrs) {
    return getIsBinding(el, options);
  }
}

/**
 * Get "is" binding from an element.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Object|undefined}
 */

function getIsBinding(el, options) {
  // dynamic syntax
  var exp = el.getAttribute('is');
  if (exp != null) {
    if (resolveAsset(options, 'components', exp)) {
      el.removeAttribute('is');
      return { id: exp };
    }
  } else {
    exp = getBindAttr(el, 'is');
    if (exp != null) {
      return { id: exp, dynamic: true };
    }
  }
}

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 *
 * All strategy functions follow the same signature:
 *
 * @param {*} parentVal
 * @param {*} childVal
 * @param {Vue} [vm]
 */

var strats = config.optionMergeStrategies = Object.create(null);

/**
 * Helper that recursively merges two data objects together.
 */

function mergeData(to, from) {
  var key, toVal, fromVal;
  for (key in from) {
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isObject(toVal) && isObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(childVal.call(this), parentVal.call(this));
    };
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
};

/**
 * El
 */

strats.el = function (parentVal, childVal, vm) {
  if (!vm && childVal && typeof childVal !== 'function') {
    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
    return;
  }
  var ret = childVal || parentVal;
  // invoke the element factory if this is instance merge
  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
};

/**
 * Hooks and param attributes are merged as arrays.
 */

strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
};

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Events & Watchers.
 *
 * Events & watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = strats.events = function (parentVal, childVal) {
  if (!childVal) return parentVal;
  if (!parentVal) return childVal;
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent ? parent.concat(child) : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */

strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
  if (!childVal) return parentVal;
  if (!parentVal) return childVal;
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret;
};

/**
 * Default strategy.
 */

var defaultStrat = function defaultStrat(parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Make sure component options get converted to actual
 * constructors.
 *
 * @param {Object} options
 */

function guardComponents(options) {
  if (options.components) {
    var components = options.components = guardArrayAssets(options.components);
    var ids = Object.keys(components);
    var def;
    if (process.env.NODE_ENV !== 'production') {
      var map = options._componentNameMap = {};
    }
    for (var i = 0, l = ids.length; i < l; i++) {
      var key = ids[i];
      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
        continue;
      }
      // record a all lowercase <-> kebab-case mapping for
      // possible custom element case error warning
      if (process.env.NODE_ENV !== 'production') {
        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
      }
      def = components[key];
      if (isPlainObject(def)) {
        components[key] = Vue.extend(def);
      }
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 *
 * @param {Object} options
 */

function guardProps(options) {
  var props = options.props;
  var i, val;
  if (isArray(props)) {
    options.props = {};
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        options.props[val] = null;
      } else if (val.name) {
        options.props[val.name] = val;
      }
    }
  } else if (isPlainObject(props)) {
    var keys = Object.keys(props);
    i = keys.length;
    while (i--) {
      val = props[keys[i]];
      if (typeof val === 'function') {
        props[keys[i]] = { type: val };
      }
    }
  }
}

/**
 * Guard an Array-format assets option and converted it
 * into the key-value Object format.
 *
 * @param {Object|Array} assets
 * @return {Object}
 */

function guardArrayAssets(assets) {
  if (isArray(assets)) {
    var res = {};
    var i = assets.length;
    var asset;
    while (i--) {
      asset = assets[i];
      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
      if (!id) {
        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
      } else {
        res[id] = asset;
      }
    }
    return res;
  }
  return assets;
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 *
 * @param {Object} parent
 * @param {Object} child
 * @param {Vue} [vm] - if vm is present, indicates this is
 *                     an instantiation merge.
 */

function mergeOptions(parent, child, vm) {
  guardComponents(child);
  guardProps(child);
  if (process.env.NODE_ENV !== 'production') {
    if (child.propsData && !vm) {
      warn('propsData can only be used as an instantiation option.');
    }
  }
  var options = {};
  var key;
  if (child['extends']) {
    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
      parent = mergeOptions(parent, mixinOptions, vm);
    }
  }
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 *
 * @param {Object} options
 * @param {String} type
 * @param {String} id
 * @param {Boolean} warnMissing
 * @return {Object|Function}
 */

function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }
  var assets = options[type];
  var camelizedId;
  var res = assets[id] ||
  // camelCase ID
  assets[camelizedId = camelize(id)] ||
  // Pascal Case ID
  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }
  return res;
}

var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 *
 * @constructor
 */
function Dep() {
  this.id = uid$1++;
  this.subs = [];
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;

/**
 * Add a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};

/**
 * Remove a directive subscriber.
 *
 * @param {Directive} sub
 */

Dep.prototype.removeSub = function (sub) {
  this.subs.$remove(sub);
};

/**
 * Add self as a dependency to the target watcher.
 */

Dep.prototype.depend = function () {
  Dep.target.addDep(this);
};

/**
 * Notify all subscribers of a new value.
 */

Dep.prototype.notify = function () {
  // stablize the subscriber list first
  var subs = toArray(this.subs);
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto)

/**
 * Intercept mutating methods and emit events
 */

;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result;
  });
});

/**
 * Swap the element at the given index with a new value
 * and emits corresponding event.
 *
 * @param {Number} index
 * @param {*} val
 * @return {*} - replaced element
 */

def(arrayProto, '$set', function $set(index, val) {
  if (index >= this.length) {
    this.length = Number(index) + 1;
  }
  return this.splice(index, 1, val)[0];
});

/**
 * Convenience method to remove the element at given index or target element reference.
 *
 * @param {*} item
 */

def(arrayProto, '$remove', function $remove(item) {
  /* istanbul ignore if */
  if (!this.length) return;
  var index = indexOf(this, item);
  if (index > -1) {
    return this.splice(index, 1);
  }
});

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However in certain cases, e.g.
 * v-for scope alias and props, we don't want to force conversion
 * because the value may be a nested value under a frozen data structure.
 *
 * So whenever we want to set a reactive property without forcing
 * conversion on the new value, we wrap that call inside this function.
 */

var shouldConvert = true;

function withoutConversion(fn) {
  shouldConvert = false;
  fn();
  shouldConvert = true;
}

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 *
 * @param {Array|Object} value
 * @constructor
 */

function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  def(value, '__ob__', this);
  if (isArray(value)) {
    var augment = hasProto ? protoAugment : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
}

// Instance methods

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 *
 * @param {Object} obj
 */

Observer.prototype.walk = function (obj) {
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    this.convert(keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 *
 * @param {Array} items
 */

Observer.prototype.observeArray = function (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

/**
 * Convert a property into getter/setter so we can emit
 * the events when the property is accessed/changed.
 *
 * @param {String} key
 * @param {*} val
 */

Observer.prototype.convert = function (key, val) {
  defineReactive(this.value, key, val);
};

/**
 * Add an owner vm, so that when $set/$delete mutations
 * happen we can notify owner vms to proxy the keys and
 * digest the watchers. This is only called when the object
 * is observed as an instance's root $data.
 *
 * @param {Vue} vm
 */

Observer.prototype.addVm = function (vm) {
  (this.vms || (this.vms = [])).push(vm);
};

/**
 * Remove an owner vm. This is called when the object is
 * swapped out as an instance's $data object.
 *
 * @param {Vue} vm
 */

Observer.prototype.removeVm = function (vm) {
  this.vms.$remove(vm);
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 *
 * @param {Object|Array} target
 * @param {Object} src
 */

function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 *
 * @param {Object|Array} target
 * @param {Object} proto
 */

function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 *
 * @param {*} value
 * @param {Vue} [vm]
 * @return {Observer|undefined}
 * @static
 */

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }
  if (ob && vm) {
    ob.addVm(vm);
  }
  return ob;
}

/**
 * Define a reactive property on an Object.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 */

function defineReactive(obj, key, val) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (isArray(value)) {
          for (var e, i = 0, l = value.length; i < l; i++) {
            e = value[i];
            e && e.__ob__ && e.__ob__.dep.depend();
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (newVal === value) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}



var util = Object.freeze({
	defineReactive: defineReactive,
	set: set,
	del: del,
	hasOwn: hasOwn,
	isLiteral: isLiteral,
	isReserved: isReserved,
	_toString: _toString,
	toNumber: toNumber,
	toBoolean: toBoolean,
	stripQuotes: stripQuotes,
	camelize: camelize,
	hyphenate: hyphenate,
	classify: classify,
	bind: bind,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	def: def,
	debounce: _debounce,
	indexOf: indexOf,
	cancellable: cancellable,
	looseEqual: looseEqual,
	isArray: isArray,
	hasProto: hasProto,
	inBrowser: inBrowser,
	devtools: devtools,
	isIE: isIE,
	isIE9: isIE9,
	isAndroid: isAndroid,
	isIos: isIos,
	iosVersionMatch: iosVersionMatch,
	iosVersion: iosVersion,
	hasMutationObserverBug: hasMutationObserverBug,
	get transitionProp () { return transitionProp; },
	get transitionEndEvent () { return transitionEndEvent; },
	get animationProp () { return animationProp; },
	get animationEndEvent () { return animationEndEvent; },
	nextTick: nextTick,
	get _Set () { return _Set; },
	query: query,
	inDoc: inDoc,
	getAttr: getAttr,
	getBindAttr: getBindAttr,
	hasBindAttr: hasBindAttr,
	before: before,
	after: after,
	remove: remove,
	prepend: prepend,
	replace: replace,
	on: on,
	off: off,
	setClass: setClass,
	addClass: addClass,
	removeClass: removeClass,
	extractContent: extractContent,
	trimNode: trimNode,
	isTemplate: isTemplate,
	createAnchor: createAnchor,
	findRef: findRef,
	mapNodeRange: mapNodeRange,
	removeNodeRange: removeNodeRange,
	isFragment: isFragment,
	getOuterHTML: getOuterHTML,
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	checkComponentAttr: checkComponentAttr,
	commonTagRE: commonTagRE,
	reservedTagRE: reservedTagRE,
	get warn () { return warn; }
});

var uid = 0;

function initMixin (Vue) {
  /**
   * The main init sequence. This is called for every
   * instance, including ones that are created from extended
   * constructors.
   *
   * @param {Object} options - this options object should be
   *                           the result of merging class
   *                           options and the options passed
   *                           in to the constructor.
   */

  Vue.prototype._init = function (options) {
    options = options || {};

    this.$el = null;
    this.$parent = options.parent;
    this.$root = this.$parent ? this.$parent.$root : this;
    this.$children = [];
    this.$refs = {}; // child vm references
    this.$els = {}; // element references
    this._watchers = []; // all watchers as an array
    this._directives = []; // all directives

    // a uid
    this._uid = uid++;

    // a flag to avoid this being observed
    this._isVue = true;

    // events bookkeeping
    this._events = {}; // registered callbacks
    this._eventsCount = {}; // for $broadcast optimization

    // fragment instance properties
    this._isFragment = false;
    this._fragment = // @type {DocumentFragment}
    this._fragmentStart = // @type {Text|Comment}
    this._fragmentEnd = null; // @type {Text|Comment}

    // lifecycle state
    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
    this._unlinkFn = null;

    // context:
    // if this is a transcluded component, context
    // will be the common parent vm of this instance
    // and its host.
    this._context = options._context || this.$parent;

    // scope:
    // if this is inside an inline v-for, the scope
    // will be the intermediate scope created for this
    // repeat fragment. this is used for linking props
    // and container directives.
    this._scope = options._scope;

    // fragment:
    // if this instance is compiled inside a Fragment, it
    // needs to reigster itself as a child of that fragment
    // for attach/detach to work properly.
    this._frag = options._frag;
    if (this._frag) {
      this._frag.children.push(this);
    }

    // push self into parent / transclusion host
    if (this.$parent) {
      this.$parent.$children.push(this);
    }

    // merge options.
    options = this.$options = mergeOptions(this.constructor.options, options, this);

    // set ref
    this._updateRef();

    // initialize data as empty object.
    // it will be filled up in _initData().
    this._data = {};

    // call init hook
    this._callHook('init');

    // initialize data observation and scope inheritance.
    this._initState();

    // setup event system and option events.
    this._initEvents();

    // call created hook
    this._callHook('created');

    // if `el` option is passed, start compilation.
    if (options.el) {
      this.$mount(options.el);
    }
  };
}

var pathCache = new Cache(1000);

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Determine the type of a character in a keypath.
 *
 * @param {Char} ch
 * @return {String} type
 */

function getPathCharType(ch) {
  if (ch === undefined) {
    return 'eof';
  }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
    case 0x30:
      // 0
      return ch;

    case 0x5F: // _
    case 0x24:
      // $
      return 'ident';

    case 0x20: // Space
    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0: // No-break space
    case 0xFEFF: // Byte Order Mark
    case 0x2028: // Line Separator
    case 0x2029:
      // Paragraph Separator
      return 'ws';
  }

  // a-z, A-Z
  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
    return 'ident';
  }

  // 1-9
  if (code >= 0x31 && code <= 0x39) {
    return 'number';
  }

  return 'else';
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 *
 * @param {String} path
 * @return {String}
 */

function formatSubPath(path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
}

/**
 * Parse a string path into an array of segments
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parse(path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c, newChar, key, type, transition, action, typeMap;

  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote() {
    var nextChar = path[index + 1];
    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true;
    }
  }

  while (mode != null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue;
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return; // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined ? c : newChar;
      if (action() === false) {
        return;
      }
    }

    if (mode === AFTER_PATH) {
      keys.raw = path;
      return keys;
    }
  }
}

/**
 * External parse that check for a cache hit first
 *
 * @param {String} path
 * @return {Array|undefined}
 */

function parsePath(path) {
  var hit = pathCache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      pathCache.put(path, hit);
    }
  }
  return hit;
}

/**
 * Get from an object from a path string
 *
 * @param {Object} obj
 * @param {String} path
 */

function getPath(obj, path) {
  return parseExpression(path).get(obj);
}

/**
 * Warn against setting non-existent root path on a vm.
 */

var warnNonExistent;
if (process.env.NODE_ENV !== 'production') {
  warnNonExistent = function (path, vm) {
    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
  };
}

/**
 * Set on an object from a path
 *
 * @param {Object} obj
 * @param {String | Array} path
 * @param {*} val
 */

function setPath(obj, path, val) {
  var original = obj;
  if (typeof path === 'string') {
    path = parse(path);
  }
  if (!path || !isObject(obj)) {
    return false;
  }
  var last, key;
  for (var i = 0, l = path.length; i < l; i++) {
    last = obj;
    key = path[i];
    if (key.charAt(0) === '*') {
      key = parseExpression(key.slice(1)).get.call(original, original);
    }
    if (i < l - 1) {
      obj = obj[key];
      if (!isObject(obj)) {
        obj = {};
        if (process.env.NODE_ENV !== 'production' && last._isVue) {
          warnNonExistent(path, last);
        }
        set(last, key, obj);
      }
    } else {
      if (isArray(obj)) {
        obj.$set(key, val);
      } else if (key in obj) {
        obj[key] = val;
      } else {
        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
          warnNonExistent(path, obj);
        }
        set(obj, key, val);
      }
    }
  }
  return true;
}

var path = Object.freeze({
  parsePath: parsePath,
  getPath: getPath,
  setPath: setPath
});

var expressionCache = new Cache(1000);

var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

// keywords that don't make sense inside expressions
var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

var wsRE = /\s/g;
var newlineRE = /\n/g;
var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
var restoreRE = /"(\d+)"/g;
var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

function noop() {}

/**
 * Save / Rewrite / Restore
 *
 * When rewriting paths found in an expression, it is
 * possible for the same letter sequences to be found in
 * strings and Object literal property keys. Therefore we
 * remove and store these parts in a temporary array, and
 * restore them after the path rewrite.
 */

var saved = [];

/**
 * Save replacer
 *
 * The save regex can match two possible cases:
 * 1. An opening object literal
 * 2. A string
 * If matched as a plain string, we need to escape its
 * newlines, since the string needs to be preserved when
 * generating the function body.
 *
 * @param {String} str
 * @param {String} isString - str if matched as a string
 * @return {String} - placeholder with index
 */

function save(str, isString) {
  var i = saved.length;
  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
  return '"' + i + '"';
}

/**
 * Path rewrite replacer
 *
 * @param {String} raw
 * @return {String}
 */

function rewrite(raw) {
  var c = raw.charAt(0);
  var path = raw.slice(1);
  if (allowedKeywordsRE.test(path)) {
    return raw;
  } else {
    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
    return c + 'scope.' + path;
  }
}

/**
 * Restore replacer
 *
 * @param {String} str
 * @param {String} i - matched save index
 * @return {String}
 */

function restore(str, i) {
  return saved[i];
}

/**
 * Rewrite an expression, prefixing all path accessors with
 * `scope.` and generate getter/setter functions.
 *
 * @param {String} exp
 * @return {Function}
 */

function compileGetter(exp) {
  if (improperKeywordsRE.test(exp)) {
    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
  }
  // reset state
  saved.length = 0;
  // save strings and object literal keys
  var body = exp.replace(saveRE, save).replace(wsRE, '');
  // rewrite all paths
  // pad 1 space here because the regex matches 1 extra char
  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
  return makeGetterFn(body);
}

/**
 * Build a getter function. Requires eval.
 *
 * We isolate the try/catch so it doesn't affect the
 * optimization of the parse function when it is not called.
 *
 * @param {String} body
 * @return {Function|undefined}
 */

function makeGetterFn(body) {
  try {
    /* eslint-disable no-new-func */
    return new Function('scope', 'return ' + body + ';');
    /* eslint-enable no-new-func */
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if (e.toString().match(/unsafe-eval|CSP/)) {
        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
      } else {
        warn('Invalid expression. ' + 'Generated function body: ' + body);
      }
    }
    return noop;
  }
}

/**
 * Compile a setter function for the expression.
 *
 * @param {String} exp
 * @return {Function|undefined}
 */

function compileSetter(exp) {
  var path = parsePath(exp);
  if (path) {
    return function (scope, val) {
      setPath(scope, path, val);
    };
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
  }
}

/**
 * Parse an expression into re-written getter/setters.
 *
 * @param {String} exp
 * @param {Boolean} needSet
 * @return {Function}
 */

function parseExpression(exp, needSet) {
  exp = exp.trim();
  // try cache
  var hit = expressionCache.get(exp);
  if (hit) {
    if (needSet && !hit.set) {
      hit.set = compileSetter(hit.exp);
    }
    return hit;
  }
  var res = { exp: exp };
  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
  // optimized super simple getter
  ? makeGetterFn('scope.' + exp)
  // dynamic getter
  : compileGetter(exp);
  if (needSet) {
    res.set = compileSetter(exp);
  }
  expressionCache.put(exp, res);
  return res;
}

/**
 * Check if an expression is a simple path.
 *
 * @param {String} exp
 * @return {Boolean}
 */

function isSimplePath(exp) {
  return pathTestRE.test(exp) &&
  // don't treat literal values as paths
  !literalValueRE$1.test(exp) &&
  // Math constants e.g. Math.PI, Math.E etc.
  exp.slice(0, 5) !== 'Math.';
}

var expression = Object.freeze({
  parseExpression: parseExpression,
  isSimplePath: isSimplePath
});

// we have two separate queues: one for directive updates
// and one for user watcher registered via $watch().
// we want to guarantee directive updates to be called
// before user watchers so that when user watchers are
// triggered, the DOM would have already been in updated
// state.

var queue = [];
var userQueue = [];
var has = {};
var circular = {};
var waiting = false;

/**
 * Reset the batcher's state.
 */

function resetBatcherState() {
  queue.length = 0;
  userQueue.length = 0;
  has = {};
  circular = {};
  waiting = false;
}

/**
 * Flush both queues and run the watchers.
 */

function flushBatcherQueue() {
  var _again = true;

  _function: while (_again) {
    _again = false;

    runBatcherQueue(queue);
    runBatcherQueue(userQueue);
    // user watchers triggered more watchers,
    // keep flushing until it depletes
    if (queue.length) {
      _again = true;
      continue _function;
    }
    // dev tool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
    resetBatcherState();
  }
}

/**
 * Run the watchers in a single queue.
 *
 * @param {Array} queue
 */

function runBatcherQueue(queue) {
  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (var i = 0; i < queue.length; i++) {
    var watcher = queue[i];
    var id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
        break;
      }
    }
  }
  queue.length = 0;
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 *
 * @param {Watcher} watcher
 *   properties:
 *   - {Number} id
 *   - {Function} run
 */

function pushWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    // push watcher into appropriate queue
    var q = watcher.user ? userQueue : queue;
    has[id] = q.length;
    q.push(watcher);
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushBatcherQueue);
    }
  }
}

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 *
 * @param {Vue} vm
 * @param {String|Function} expOrFn
 * @param {Function} cb
 * @param {Object} options
 *                 - {Array} filters
 *                 - {Boolean} twoWay
 *                 - {Boolean} deep
 *                 - {Boolean} user
 *                 - {Boolean} sync
 *                 - {Boolean} lazy
 *                 - {Function} [preProcess]
 *                 - {Function} [postProcess]
 * @constructor
 */
function Watcher(vm, expOrFn, cb, options) {
  // mix in options
  if (options) {
    extend(this, options);
  }
  var isFn = typeof expOrFn === 'function';
  this.vm = vm;
  vm._watchers.push(this);
  this.expression = expOrFn;
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.prevError = null; // for async error stacks
  // parse expression for getter/setter
  if (isFn) {
    this.getter = expOrFn;
    this.setter = undefined;
  } else {
    var res = parseExpression(expOrFn, this.twoWay);
    this.getter = res.get;
    this.setter = res.set;
  }
  this.value = this.lazy ? undefined : this.get();
  // state for avoiding false triggers for deep and Array
  // watchers during vm._digest()
  this.queued = this.shallow = false;
}

/**
 * Evaluate the getter, and re-collect dependencies.
 */

Watcher.prototype.get = function () {
  this.beforeGet();
  var scope = this.scope || this.vm;
  var value;
  try {
    value = this.getter.call(scope, scope);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
    }
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  if (this.preProcess) {
    value = this.preProcess(value);
  }
  if (this.filters) {
    value = scope._applyFilters(value, null, this.filters, false);
  }
  if (this.postProcess) {
    value = this.postProcess(value);
  }
  this.afterGet();
  return value;
};

/**
 * Set the corresponding value with the setter.
 *
 * @param {*} value
 */

Watcher.prototype.set = function (value) {
  var scope = this.scope || this.vm;
  if (this.filters) {
    value = scope._applyFilters(value, this.value, this.filters, true);
  }
  try {
    this.setter.call(scope, scope, value);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
    }
  }
  // two-way sync for v-for alias
  var forContext = scope.$forContext;
  if (forContext && forContext.alias === this.expression) {
    if (forContext.filters) {
      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
      return;
    }
    forContext._withLock(function () {
      if (scope.$key) {
        // original is an object
        forContext.rawValue[scope.$key] = value;
      } else {
        forContext.rawValue.$set(scope.$index, value);
      }
    });
  }
};

/**
 * Prepare for dependency collection.
 */

Watcher.prototype.beforeGet = function () {
  Dep.target = this;
};

/**
 * Add a dependency to this directive.
 *
 * @param {Dep} dep
 */

Watcher.prototype.addDep = function (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */

Watcher.prototype.afterGet = function () {
  Dep.target = null;
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 *
 * @param {Boolean} shallow
 */

Watcher.prototype.update = function (shallow) {
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync || !config.async) {
    this.run();
  } else {
    // if queued, only overwrite shallow with non-shallow,
    // but not the other way around.
    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
    this.queued = true;
    // record before-push error stack in debug mode
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.debug) {
      this.prevError = new Error('[vue] async stack trace');
    }
    pushWatcher(this);
  }
};

/**
 * Batcher job interface.
 * Will be called by the batcher.
 */

Watcher.prototype.run = function () {
  if (this.active) {
    var value = this.get();
    if (value !== this.value ||
    // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated; but only do so if this is a
    // non-shallow update (caused by a vm digest).
    (isObject(value) || this.deep) && !this.shallow) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      // in debug + async mode, when a watcher callbacks
      // throws, we also throw the saved before-push error
      // so the full cross-tick stack trace is available.
      var prevError = this.prevError;
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
        this.prevError = null;
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          nextTick(function () {
            throw prevError;
          }, 0);
          throw e;
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
    this.queued = this.shallow = false;
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */

Watcher.prototype.evaluate = function () {
  // avoid overwriting another watcher that is being
  // collected.
  var current = Dep.target;
  this.value = this.get();
  this.dirty = false;
  Dep.target = current;
};

/**
 * Depend on all deps collected by this watcher.
 */

Watcher.prototype.depend = function () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subcriber list.
 */

Watcher.prototype.teardown = function () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed or is performing a v-for
    // re-render (the watcher list is then filtered by v-for).
    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
      this.vm._watchers.$remove(this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
    this.vm = this.cb = this.value = null;
  }
};

/**
 * Recrusively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 *
 * @param {*} val
 */

var seenObjects = new _Set();
function traverse(val, seen) {
  var i = undefined,
      keys = undefined;
  if (!seen) {
    seen = seenObjects;
    seen.clear();
  }
  var isA = isArray(val);
  var isO = isObject(val);
  if (isA || isO) {
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return;
      } else {
        seen.add(depId);
      }
    }
    if (isA) {
      i = val.length;
      while (i--) traverse(val[i], seen);
    } else if (isO) {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) traverse(val[keys[i]], seen);
    }
  }
}

var text$1 = {

  bind: function bind() {
    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
  },

  update: function update(value) {
    this.el[this.attr] = _toString(value);
  }
};

var templateCache = new Cache(1000);
var idSelectorCache = new Cache(1000);

var map = {
  efault: [0, '', ''],
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
};

map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

/**
 * Check if a node is a supported template node with a
 * DocumentFragment content.
 *
 * @param {Node} node
 * @return {Boolean}
 */

function isRealTemplate(node) {
  return isTemplate(node) && isFragment(node.content);
}

var tagRE$1 = /<([\w:-]+)/;
var entityRE = /&#?\w+?;/;
var commentRE = /<!--/;

/**
 * Convert a string template to a DocumentFragment.
 * Determines correct wrapping by tag types. Wrapping
 * strategy found in jQuery & component/domify.
 *
 * @param {String} templateString
 * @param {Boolean} raw
 * @return {DocumentFragment}
 */

function stringToFragment(templateString, raw) {
  // try a cache hit first
  var cacheKey = raw ? templateString : templateString.trim();
  var hit = templateCache.get(cacheKey);
  if (hit) {
    return hit;
  }

  var frag = document.createDocumentFragment();
  var tagMatch = templateString.match(tagRE$1);
  var entityMatch = entityRE.test(templateString);
  var commentMatch = commentRE.test(templateString);

  if (!tagMatch && !entityMatch && !commentMatch) {
    // text only, return a single text node.
    frag.appendChild(document.createTextNode(templateString));
  } else {
    var tag = tagMatch && tagMatch[1];
    var wrap = map[tag] || map.efault;
    var depth = wrap[0];
    var prefix = wrap[1];
    var suffix = wrap[2];
    var node = document.createElement('div');

    node.innerHTML = prefix + templateString + suffix;
    while (depth--) {
      node = node.lastChild;
    }

    var child;
    /* eslint-disable no-cond-assign */
    while (child = node.firstChild) {
      /* eslint-enable no-cond-assign */
      frag.appendChild(child);
    }
  }
  if (!raw) {
    trimNode(frag);
  }
  templateCache.put(cacheKey, frag);
  return frag;
}

/**
 * Convert a template node to a DocumentFragment.
 *
 * @param {Node} node
 * @return {DocumentFragment}
 */

function nodeToFragment(node) {
  // if its a template tag and the browser supports it,
  // its content is already a document fragment. However, iOS Safari has
  // bug when using directly cloned template content with touch
  // events and can cause crashes when the nodes are removed from DOM, so we
  // have to treat template elements as string templates. (#2805)
  /* istanbul ignore if */
  if (isRealTemplate(node)) {
    return stringToFragment(node.innerHTML);
  }
  // script template
  if (node.tagName === 'SCRIPT') {
    return stringToFragment(node.textContent);
  }
  // normal node, clone it to avoid mutating the original
  var clonedNode = cloneNode(node);
  var frag = document.createDocumentFragment();
  var child;
  /* eslint-disable no-cond-assign */
  while (child = clonedNode.firstChild) {
    /* eslint-enable no-cond-assign */
    frag.appendChild(child);
  }
  trimNode(frag);
  return frag;
}

// Test for the presence of the Safari template cloning bug
// https://bugs.webkit.org/showug.cgi?id=137755
var hasBrokenTemplate = (function () {
  /* istanbul ignore else */
  if (inBrowser) {
    var a = document.createElement('div');
    a.innerHTML = '<template>1</template>';
    return !a.cloneNode(true).firstChild.innerHTML;
  } else {
    return false;
  }
})();

// Test for IE10/11 textarea placeholder clone bug
var hasTextareaCloneBug = (function () {
  /* istanbul ignore else */
  if (inBrowser) {
    var t = document.createElement('textarea');
    t.placeholder = 't';
    return t.cloneNode(true).value === 't';
  } else {
    return false;
  }
})();

/**
 * 1. Deal with Safari cloning nested <template> bug by
 *    manually cloning all template instances.
 * 2. Deal with IE10/11 textarea placeholder bug by setting
 *    the correct value after cloning.
 *
 * @param {Element|DocumentFragment} node
 * @return {Element|DocumentFragment}
 */

function cloneNode(node) {
  /* istanbul ignore if */
  if (!node.querySelectorAll) {
    return node.cloneNode();
  }
  var res = node.cloneNode(true);
  var i, original, cloned;
  /* istanbul ignore if */
  if (hasBrokenTemplate) {
    var tempClone = res;
    if (isRealTemplate(node)) {
      node = node.content;
      tempClone = res.content;
    }
    original = node.querySelectorAll('template');
    if (original.length) {
      cloned = tempClone.querySelectorAll('template');
      i = cloned.length;
      while (i--) {
        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
      }
    }
  }
  /* istanbul ignore if */
  if (hasTextareaCloneBug) {
    if (node.tagName === 'TEXTAREA') {
      res.value = node.value;
    } else {
      original = node.querySelectorAll('textarea');
      if (original.length) {
        cloned = res.querySelectorAll('textarea');
        i = cloned.length;
        while (i--) {
          cloned[i].value = original[i].value;
        }
      }
    }
  }
  return res;
}

/**
 * Process the template option and normalizes it into a
 * a DocumentFragment that can be used as a partial or a
 * instance template.
 *
 * @param {*} template
 *        Possible values include:
 *        - DocumentFragment object
 *        - Node object of type Template
 *        - id selector: '#some-template-id'
 *        - template string: '<div><span>{{msg}}</span></div>'
 * @param {Boolean} shouldClone
 * @param {Boolean} raw
 *        inline HTML interpolation. Do not check for id
 *        selector and keep whitespace in the string.
 * @return {DocumentFragment|undefined}
 */

function parseTemplate(template, shouldClone, raw) {
  var node, frag;

  // if the template is already a document fragment,
  // do nothing
  if (isFragment(template)) {
    trimNode(template);
    return shouldClone ? cloneNode(template) : template;
  }

  if (typeof template === 'string') {
    // id selector
    if (!raw && template.charAt(0) === '#') {
      // id selector can be cached too
      frag = idSelectorCache.get(template);
      if (!frag) {
        node = document.getElementById(template.slice(1));
        if (node) {
          frag = nodeToFragment(node);
          // save selector to cache
          idSelectorCache.put(template, frag);
        }
      }
    } else {
      // normal string template
      frag = stringToFragment(template, raw);
    }
  } else if (template.nodeType) {
    // a direct node
    frag = nodeToFragment(template);
  }

  return frag && shouldClone ? cloneNode(frag) : frag;
}

var template = Object.freeze({
  cloneNode: cloneNode,
  parseTemplate: parseTemplate
});

var html = {

  bind: function bind() {
    // a comment node means this is a binding for
    // {{{ inline unescaped html }}}
    if (this.el.nodeType === 8) {
      // hold nodes
      this.nodes = [];
      // replace the placeholder with proper anchor
      this.anchor = createAnchor('v-html');
      replace(this.el, this.anchor);
    }
  },

  update: function update(value) {
    value = _toString(value);
    if (this.nodes) {
      this.swap(value);
    } else {
      this.el.innerHTML = value;
    }
  },

  swap: function swap(value) {
    // remove old nodes
    var i = this.nodes.length;
    while (i--) {
      remove(this.nodes[i]);
    }
    // convert new value to a fragment
    // do not attempt to retrieve from id selector
    var frag = parseTemplate(value, true, true);
    // save a reference to these nodes so we can remove later
    this.nodes = toArray(frag.childNodes);
    before(frag, this.anchor);
  }
};

/**
 * Abstraction for a partially-compiled fragment.
 * Can optionally compile content with a child scope.
 *
 * @param {Function} linker
 * @param {Vue} vm
 * @param {DocumentFragment} frag
 * @param {Vue} [host]
 * @param {Object} [scope]
 * @param {Fragment} [parentFrag]
 */
function Fragment(linker, vm, frag, host, scope, parentFrag) {
  this.children = [];
  this.childFrags = [];
  this.vm = vm;
  this.scope = scope;
  this.inserted = false;
  this.parentFrag = parentFrag;
  if (parentFrag) {
    parentFrag.childFrags.push(this);
  }
  this.unlink = linker(vm, frag, host, scope, this);
  var single = this.single = frag.childNodes.length === 1 &&
  // do not go single mode if the only node is an anchor
  !frag.childNodes[0].__v_anchor;
  if (single) {
    this.node = frag.childNodes[0];
    this.before = singleBefore;
    this.remove = singleRemove;
  } else {
    this.node = createAnchor('fragment-start');
    this.end = createAnchor('fragment-end');
    this.frag = frag;
    prepend(this.node, frag);
    frag.appendChild(this.end);
    this.before = multiBefore;
    this.remove = multiRemove;
  }
  this.node.__v_frag = this;
}

/**
 * Call attach/detach for all components contained within
 * this fragment. Also do so recursively for all child
 * fragments.
 *
 * @param {Function} hook
 */

Fragment.prototype.callHook = function (hook) {
  var i, l;
  for (i = 0, l = this.childFrags.length; i < l; i++) {
    this.childFrags[i].callHook(hook);
  }
  for (i = 0, l = this.children.length; i < l; i++) {
    hook(this.children[i]);
  }
};

/**
 * Insert fragment before target, single node version
 *
 * @param {Node} target
 * @param {Boolean} withTransition
 */

function singleBefore(target, withTransition) {
  this.inserted = true;
  var method = withTransition !== false ? beforeWithTransition : before;
  method(this.node, target, this.vm);
  if (inDoc(this.node)) {
    this.callHook(attach);
  }
}

/**
 * Remove fragment, single node version
 */

function singleRemove() {
  this.inserted = false;
  var shouldCallRemove = inDoc(this.node);
  var self = this;
  this.beforeRemove();
  removeWithTransition(this.node, this.vm, function () {
    if (shouldCallRemove) {
      self.callHook(detach);
    }
    self.destroy();
  });
}

/**
 * Insert fragment before target, multi-nodes version
 *
 * @param {Node} target
 * @param {Boolean} withTransition
 */

function multiBefore(target, withTransition) {
  this.inserted = true;
  var vm = this.vm;
  var method = withTransition !== false ? beforeWithTransition : before;
  mapNodeRange(this.node, this.end, function (node) {
    method(node, target, vm);
  });
  if (inDoc(this.node)) {
    this.callHook(attach);
  }
}

/**
 * Remove fragment, multi-nodes version
 */

function multiRemove() {
  this.inserted = false;
  var self = this;
  var shouldCallRemove = inDoc(this.node);
  this.beforeRemove();
  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
    if (shouldCallRemove) {
      self.callHook(detach);
    }
    self.destroy();
  });
}

/**
 * Prepare the fragment for removal.
 */

Fragment.prototype.beforeRemove = function () {
  var i, l;
  for (i = 0, l = this.childFrags.length; i < l; i++) {
    // call the same method recursively on child
    // fragments, depth-first
    this.childFrags[i].beforeRemove(false);
  }
  for (i = 0, l = this.children.length; i < l; i++) {
    // Call destroy for all contained instances,
    // with remove:false and defer:true.
    // Defer is necessary because we need to
    // keep the children to call detach hooks
    // on them.
    this.children[i].$destroy(false, true);
  }
  var dirs = this.unlink.dirs;
  for (i = 0, l = dirs.length; i < l; i++) {
    // disable the watchers on all the directives
    // so that the rendered content stays the same
    // during removal.
    dirs[i]._watcher && dirs[i]._watcher.teardown();
  }
};

/**
 * Destroy the fragment.
 */

Fragment.prototype.destroy = function () {
  if (this.parentFrag) {
    this.parentFrag.childFrags.$remove(this);
  }
  this.node.__v_frag = null;
  this.unlink();
};

/**
 * Call attach hook for a Vue instance.
 *
 * @param {Vue} child
 */

function attach(child) {
  if (!child._isAttached && inDoc(child.$el)) {
    child._callHook('attached');
  }
}

/**
 * Call detach hook for a Vue instance.
 *
 * @param {Vue} child
 */

function detach(child) {
  if (child._isAttached && !inDoc(child.$el)) {
    child._callHook('detached');
  }
}

var linkerCache = new Cache(5000);

/**
 * A factory that can be used to create instances of a
 * fragment. Caches the compiled linker if possible.
 *
 * @param {Vue} vm
 * @param {Element|String} el
 */
function FragmentFactory(vm, el) {
  this.vm = vm;
  var template;
  var isString = typeof el === 'string';
  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
    template = parseTemplate(el, true);
  } else {
    template = document.createDocumentFragment();
    template.appendChild(el);
  }
  this.template = template;
  // linker can be cached, but only for components
  var linker;
  var cid = vm.constructor.cid;
  if (cid > 0) {
    var cacheId = cid + (isString ? el : getOuterHTML(el));
    linker = linkerCache.get(cacheId);
    if (!linker) {
      linker = compile(template, vm.$options, true);
      linkerCache.put(cacheId, linker);
    }
  } else {
    linker = compile(template, vm.$options, true);
  }
  this.linker = linker;
}

/**
 * Create a fragment instance with given host and scope.
 *
 * @param {Vue} host
 * @param {Object} scope
 * @param {Fragment} parentFrag
 */

FragmentFactory.prototype.create = function (host, scope, parentFrag) {
  var frag = cloneNode(this.template);
  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
};

var ON = 700;
var MODEL = 800;
var BIND = 850;
var TRANSITION = 1100;
var EL = 1500;
var COMPONENT = 1500;
var PARTIAL = 1750;
var IF = 2100;
var FOR = 2200;
var SLOT = 2300;

var uid$3 = 0;

var vFor = {

  priority: FOR,
  terminal: true,

  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

  bind: function bind() {
    // support "item in/of items" syntax
    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
    if (inMatch) {
      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
      if (itMatch) {
        this.iterator = itMatch[1].trim();
        this.alias = itMatch[2].trim();
      } else {
        this.alias = inMatch[1].trim();
      }
      this.expression = inMatch[2];
    }

    if (!this.alias) {
      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
      return;
    }

    // uid as a cache identifier
    this.id = '__v-for__' + ++uid$3;

    // check if this is an option list,
    // so that we know if we need to update the <select>'s
    // v-model when the option list has changed.
    // because v-model has a lower priority than v-for,
    // the v-model is not bound here yet, so we have to
    // retrive it in the actual updateModel() function.
    var tag = this.el.tagName;
    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

    // setup anchor nodes
    this.start = createAnchor('v-for-start');
    this.end = createAnchor('v-for-end');
    replace(this.el, this.end);
    before(this.start, this.end);

    // cache
    this.cache = Object.create(null);

    // fragment factory
    this.factory = new FragmentFactory(this.vm, this.el);
  },

  update: function update(data) {
    this.diff(data);
    this.updateRef();
    this.updateModel();
  },

  /**
   * Diff, based on new data and old data, determine the
   * minimum amount of DOM manipulations needed to make the
   * DOM reflect the new data Array.
   *
   * The algorithm diffs the new data Array by storing a
   * hidden reference to an owner vm instance on previously
   * seen data. This allows us to achieve O(n) which is
   * better than a levenshtein distance based algorithm,
   * which is O(m * n).
   *
   * @param {Array} data
   */

  diff: function diff(data) {
    // check if the Array was converted from an Object
    var item = data[0];
    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

    var trackByKey = this.params.trackBy;
    var oldFrags = this.frags;
    var frags = this.frags = new Array(data.length);
    var alias = this.alias;
    var iterator = this.iterator;
    var start = this.start;
    var end = this.end;
    var inDocument = inDoc(start);
    var init = !oldFrags;
    var i, l, frag, key, value, primitive;

    // First pass, go through the new Array and fill up
    // the new frags array. If a piece of data has a cached
    // instance for it, we reuse it. Otherwise build a new
    // instance.
    for (i = 0, l = data.length; i < l; i++) {
      item = data[i];
      key = convertedFromObject ? item.$key : null;
      value = convertedFromObject ? item.$value : item;
      primitive = !isObject(value);
      frag = !init && this.getCachedFrag(value, i, key);
      if (frag) {
        // reusable fragment
        frag.reused = true;
        // update $index
        frag.scope.$index = i;
        // update $key
        if (key) {
          frag.scope.$key = key;
        }
        // update iterator
        if (iterator) {
          frag.scope[iterator] = key !== null ? key : i;
        }
        // update data for track-by, object repeat &
        // primitive values.
        if (trackByKey || convertedFromObject || primitive) {
          withoutConversion(function () {
            frag.scope[alias] = value;
          });
        }
      } else {
        // new isntance
        frag = this.create(value, alias, i, key);
        frag.fresh = !init;
      }
      frags[i] = frag;
      if (init) {
        frag.before(end);
      }
    }

    // we're done for the initial render.
    if (init) {
      return;
    }

    // Second pass, go through the old fragments and
    // destroy those who are not reused (and remove them
    // from cache)
    var removalIndex = 0;
    var totalRemoved = oldFrags.length - frags.length;
    // when removing a large number of fragments, watcher removal
    // turns out to be a perf bottleneck, so we batch the watcher
    // removals into a single filter call!
    this.vm._vForRemoving = true;
    for (i = 0, l = oldFrags.length; i < l; i++) {
      frag = oldFrags[i];
      if (!frag.reused) {
        this.deleteCachedFrag(frag);
        this.remove(frag, removalIndex++, totalRemoved, inDocument);
      }
    }
    this.vm._vForRemoving = false;
    if (removalIndex) {
      this.vm._watchers = this.vm._watchers.filter(function (w) {
        return w.active;
      });
    }

    // Final pass, move/insert new fragments into the
    // right place.
    var targetPrev, prevEl, currentPrev;
    var insertionIndex = 0;
    for (i = 0, l = frags.length; i < l; i++) {
      frag = frags[i];
      // this is the frag that we should be after
      targetPrev = frags[i - 1];
      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
      if (frag.reused && !frag.staggerCb) {
        currentPrev = findPrevFrag(frag, start, this.id);
        if (currentPrev !== targetPrev && (!currentPrev ||
        // optimization for moving a single item.
        // thanks to suggestions by @livoras in #1807
        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
          this.move(frag, prevEl);
        }
      } else {
        // new instance, or still in stagger.
        // insert with updated stagger index.
        this.insert(frag, insertionIndex++, prevEl, inDocument);
      }
      frag.reused = frag.fresh = false;
    }
  },

  /**
   * Create a new fragment instance.
   *
   * @param {*} value
   * @param {String} alias
   * @param {Number} index
   * @param {String} [key]
   * @return {Fragment}
   */

  create: function create(value, alias, index, key) {
    var host = this._host;
    // create iteration scope
    var parentScope = this._scope || this.vm;
    var scope = Object.create(parentScope);
    // ref holder for the scope
    scope.$refs = Object.create(parentScope.$refs);
    scope.$els = Object.create(parentScope.$els);
    // make sure point $parent to parent scope
    scope.$parent = parentScope;
    // for two-way binding on alias
    scope.$forContext = this;
    // define scope properties
    // important: define the scope alias without forced conversion
    // so that frozen data structures remain non-reactive.
    withoutConversion(function () {
      defineReactive(scope, alias, value);
    });
    defineReactive(scope, '$index', index);
    if (key) {
      defineReactive(scope, '$key', key);
    } else if (scope.$key) {
      // avoid accidental fallback
      def(scope, '$key', null);
    }
    if (this.iterator) {
      defineReactive(scope, this.iterator, key !== null ? key : index);
    }
    var frag = this.factory.create(host, scope, this._frag);
    frag.forId = this.id;
    this.cacheFrag(value, frag, index, key);
    return frag;
  },

  /**
   * Update the v-ref on owner vm.
   */

  updateRef: function updateRef() {
    var ref = this.descriptor.ref;
    if (!ref) return;
    var hash = (this._scope || this.vm).$refs;
    var refs;
    if (!this.fromObject) {
      refs = this.frags.map(findVmFromFrag);
    } else {
      refs = {};
      this.frags.forEach(function (frag) {
        refs[frag.scope.$key] = findVmFromFrag(frag);
      });
    }
    hash[ref] = refs;
  },

  /**
   * For option lists, update the containing v-model on
   * parent <select>.
   */

  updateModel: function updateModel() {
    if (this.isOption) {
      var parent = this.start.parentNode;
      var model = parent && parent.__v_model;
      if (model) {
        model.forceUpdate();
      }
    }
  },

  /**
   * Insert a fragment. Handles staggering.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Node} prevEl
   * @param {Boolean} inDocument
   */

  insert: function insert(frag, index, prevEl, inDocument) {
    if (frag.staggerCb) {
      frag.staggerCb.cancel();
      frag.staggerCb = null;
    }
    var staggerAmount = this.getStagger(frag, index, null, 'enter');
    if (inDocument && staggerAmount) {
      // create an anchor and insert it synchronously,
      // so that we can resolve the correct order without
      // worrying about some elements not inserted yet
      var anchor = frag.staggerAnchor;
      if (!anchor) {
        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
        anchor.__v_frag = frag;
      }
      after(anchor, prevEl);
      var op = frag.staggerCb = cancellable(function () {
        frag.staggerCb = null;
        frag.before(anchor);
        remove(anchor);
      });
      setTimeout(op, staggerAmount);
    } else {
      var target = prevEl.nextSibling;
      /* istanbul ignore if */
      if (!target) {
        // reset end anchor position in case the position was messed up
        // by an external drag-n-drop library.
        after(this.end, prevEl);
        target = this.end;
      }
      frag.before(target);
    }
  },

  /**
   * Remove a fragment. Handles staggering.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Number} total
   * @param {Boolean} inDocument
   */

  remove: function remove(frag, index, total, inDocument) {
    if (frag.staggerCb) {
      frag.staggerCb.cancel();
      frag.staggerCb = null;
      // it's not possible for the same frag to be removed
      // twice, so if we have a pending stagger callback,
      // it means this frag is queued for enter but removed
      // before its transition started. Since it is already
      // destroyed, we can just leave it in detached state.
      return;
    }
    var staggerAmount = this.getStagger(frag, index, total, 'leave');
    if (inDocument && staggerAmount) {
      var op = frag.staggerCb = cancellable(function () {
        frag.staggerCb = null;
        frag.remove();
      });
      setTimeout(op, staggerAmount);
    } else {
      frag.remove();
    }
  },

  /**
   * Move a fragment to a new position.
   * Force no transition.
   *
   * @param {Fragment} frag
   * @param {Node} prevEl
   */

  move: function move(frag, prevEl) {
    // fix a common issue with Sortable:
    // if prevEl doesn't have nextSibling, this means it's
    // been dragged after the end anchor. Just re-position
    // the end anchor to the end of the container.
    /* istanbul ignore if */
    if (!prevEl.nextSibling) {
      this.end.parentNode.appendChild(this.end);
    }
    frag.before(prevEl.nextSibling, false);
  },

  /**
   * Cache a fragment using track-by or the object key.
   *
   * @param {*} value
   * @param {Fragment} frag
   * @param {Number} index
   * @param {String} [key]
   */

  cacheFrag: function cacheFrag(value, frag, index, key) {
    var trackByKey = this.params.trackBy;
    var cache = this.cache;
    var primitive = !isObject(value);
    var id;
    if (key || trackByKey || primitive) {
      id = getTrackByKey(index, key, value, trackByKey);
      if (!cache[id]) {
        cache[id] = frag;
      } else if (trackByKey !== '$index') {
        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
      }
    } else {
      id = this.id;
      if (hasOwn(value, id)) {
        if (value[id] === null) {
          value[id] = frag;
        } else {
          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
        }
      } else if (Object.isExtensible(value)) {
        def(value, id, frag);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
      }
    }
    frag.raw = value;
  },

  /**
   * Get a cached fragment from the value/index/key
   *
   * @param {*} value
   * @param {Number} index
   * @param {String} key
   * @return {Fragment}
   */

  getCachedFrag: function getCachedFrag(value, index, key) {
    var trackByKey = this.params.trackBy;
    var primitive = !isObject(value);
    var frag;
    if (key || trackByKey || primitive) {
      var id = getTrackByKey(index, key, value, trackByKey);
      frag = this.cache[id];
    } else {
      frag = value[this.id];
    }
    if (frag && (frag.reused || frag.fresh)) {
      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
    }
    return frag;
  },

  /**
   * Delete a fragment from cache.
   *
   * @param {Fragment} frag
   */

  deleteCachedFrag: function deleteCachedFrag(frag) {
    var value = frag.raw;
    var trackByKey = this.params.trackBy;
    var scope = frag.scope;
    var index = scope.$index;
    // fix #948: avoid accidentally fall through to
    // a parent repeater which happens to have $key.
    var key = hasOwn(scope, '$key') && scope.$key;
    var primitive = !isObject(value);
    if (trackByKey || key || primitive) {
      var id = getTrackByKey(index, key, value, trackByKey);
      this.cache[id] = null;
    } else {
      value[this.id] = null;
      frag.raw = null;
    }
  },

  /**
   * Get the stagger amount for an insertion/removal.
   *
   * @param {Fragment} frag
   * @param {Number} index
   * @param {Number} total
   * @param {String} type
   */

  getStagger: function getStagger(frag, index, total, type) {
    type = type + 'Stagger';
    var trans = frag.node.__v_trans;
    var hooks = trans && trans.hooks;
    var hook = hooks && (hooks[type] || hooks.stagger);
    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
  },

  /**
   * Pre-process the value before piping it through the
   * filters. This is passed to and called by the watcher.
   */

  _preProcess: function _preProcess(value) {
    // regardless of type, store the un-filtered raw value.
    this.rawValue = value;
    return value;
  },

  /**
   * Post-process the value after it has been piped through
   * the filters. This is passed to and called by the watcher.
   *
   * It is necessary for this to be called during the
   * watcher's dependency collection phase because we want
   * the v-for to update when the source Object is mutated.
   */

  _postProcess: function _postProcess(value) {
    if (isArray(value)) {
      return value;
    } else if (isPlainObject(value)) {
      // convert plain object to array.
      var keys = Object.keys(value);
      var i = keys.length;
      var res = new Array(i);
      var key;
      while (i--) {
        key = keys[i];
        res[i] = {
          $key: key,
          $value: value[key]
        };
      }
      return res;
    } else {
      if (typeof value === 'number' && !isNaN(value)) {
        value = range(value);
      }
      return value || [];
    }
  },

  unbind: function unbind() {
    if (this.descriptor.ref) {
      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
    }
    if (this.frags) {
      var i = this.frags.length;
      var frag;
      while (i--) {
        frag = this.frags[i];
        this.deleteCachedFrag(frag);
        frag.destroy();
      }
    }
  }
};

/**
 * Helper to find the previous element that is a fragment
 * anchor. This is necessary because a destroyed frag's
 * element could still be lingering in the DOM before its
 * leaving transition finishes, but its inserted flag
 * should have been set to false so we can skip them.
 *
 * If this is a block repeat, we want to make sure we only
 * return frag that is bound to this v-for. (see #929)
 *
 * @param {Fragment} frag
 * @param {Comment|Text} anchor
 * @param {String} id
 * @return {Fragment}
 */

function findPrevFrag(frag, anchor, id) {
  var el = frag.node.previousSibling;
  /* istanbul ignore if */
  if (!el) return;
  frag = el.__v_frag;
  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
    el = el.previousSibling;
    /* istanbul ignore if */
    if (!el) return;
    frag = el.__v_frag;
  }
  return frag;
}

/**
 * Find a vm from a fragment.
 *
 * @param {Fragment} frag
 * @return {Vue|undefined}
 */

function findVmFromFrag(frag) {
  var node = frag.node;
  // handle multi-node frag
  if (frag.end) {
    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
      node = node.nextSibling;
    }
  }
  return node.__vue__;
}

/**
 * Create a range array from given number.
 *
 * @param {Number} n
 * @return {Array}
 */

function range(n) {
  var i = -1;
  var ret = new Array(Math.floor(n));
  while (++i < n) {
    ret[i] = i;
  }
  return ret;
}

/**
 * Get the track by key for an item.
 *
 * @param {Number} index
 * @param {String} key
 * @param {*} value
 * @param {String} [trackByKey]
 */

function getTrackByKey(index, key, value, trackByKey) {
  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
}

if (process.env.NODE_ENV !== 'production') {
  vFor.warnDuplicate = function (value) {
    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
  };
}

var vIf = {

  priority: IF,
  terminal: true,

  bind: function bind() {
    var el = this.el;
    if (!el.__vue__) {
      // check else block
      var next = el.nextElementSibling;
      if (next && getAttr(next, 'v-else') !== null) {
        remove(next);
        this.elseEl = next;
      }
      // check main block
      this.anchor = createAnchor('v-if');
      replace(el, this.anchor);
    } else {
      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
      this.invalid = true;
    }
  },

  update: function update(value) {
    if (this.invalid) return;
    if (value) {
      if (!this.frag) {
        this.insert();
      }
    } else {
      this.remove();
    }
  },

  insert: function insert() {
    if (this.elseFrag) {
      this.elseFrag.remove();
      this.elseFrag = null;
    }
    // lazy init factory
    if (!this.factory) {
      this.factory = new FragmentFactory(this.vm, this.el);
    }
    this.frag = this.factory.create(this._host, this._scope, this._frag);
    this.frag.before(this.anchor);
  },

  remove: function remove() {
    if (this.frag) {
      this.frag.remove();
      this.frag = null;
    }
    if (this.elseEl && !this.elseFrag) {
      if (!this.elseFactory) {
        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
      }
      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
      this.elseFrag.before(this.anchor);
    }
  },

  unbind: function unbind() {
    if (this.frag) {
      this.frag.destroy();
    }
    if (this.elseFrag) {
      this.elseFrag.destroy();
    }
  }
};

var show = {

  bind: function bind() {
    // check else block
    var next = this.el.nextElementSibling;
    if (next && getAttr(next, 'v-else') !== null) {
      this.elseEl = next;
    }
  },

  update: function update(value) {
    this.apply(this.el, value);
    if (this.elseEl) {
      this.apply(this.elseEl, !value);
    }
  },

  apply: function apply(el, value) {
    if (inDoc(el)) {
      applyTransition(el, value ? 1 : -1, toggle, this.vm);
    } else {
      toggle();
    }
    function toggle() {
      el.style.display = value ? '' : 'none';
    }
  }
};

var text$2 = {

  bind: function bind() {
    var self = this;
    var el = this.el;
    var isRange = el.type === 'range';
    var lazy = this.params.lazy;
    var number = this.params.number;
    var debounce = this.params.debounce;

    // handle composition events.
    //   http://blog.evanyou.me/2014/01/03/composition-event/
    // skip this for Android because it handles composition
    // events quite differently. Android doesn't trigger
    // composition events for language input methods e.g.
    // Chinese, but instead triggers them for spelling
    // suggestions... (see Discussion/#162)
    var composing = false;
    if (!isAndroid && !isRange) {
      this.on('compositionstart', function () {
        composing = true;
      });
      this.on('compositionend', function () {
        composing = false;
        // in IE11 the "compositionend" event fires AFTER
        // the "input" event, so the input handler is blocked
        // at the end... have to call it here.
        //
        // #1327: in lazy mode this is unecessary.
        if (!lazy) {
          self.listener();
        }
      });
    }

    // prevent messing with the input when user is typing,
    // and force update on blur.
    this.focused = false;
    if (!isRange && !lazy) {
      this.on('focus', function () {
        self.focused = true;
      });
      this.on('blur', function () {
        self.focused = false;
        // do not sync value after fragment removal (#2017)
        if (!self._frag || self._frag.inserted) {
          self.rawListener();
        }
      });
    }

    // Now attach the main listener
    this.listener = this.rawListener = function () {
      if (composing || !self._bound) {
        return;
      }
      var val = number || isRange ? toNumber(el.value) : el.value;
      self.set(val);
      // force update on next tick to avoid lock & same value
      // also only update when user is not typing
      nextTick(function () {
        if (self._bound && !self.focused) {
          self.update(self._watcher.value);
        }
      });
    };

    // apply debounce
    if (debounce) {
      this.listener = _debounce(this.listener, debounce);
    }

    // Support jQuery events, since jQuery.trigger() doesn't
    // trigger native events in some cases and some plugins
    // rely on $.trigger()
    //
    // We want to make sure if a listener is attached using
    // jQuery, it is also removed with jQuery, that's why
    // we do the check for each directive instance and
    // store that check result on itself. This also allows
    // easier test coverage control by unsetting the global
    // jQuery variable in tests.
    this.hasjQuery = typeof jQuery === 'function';
    if (this.hasjQuery) {
      var method = jQuery.fn.on ? 'on' : 'bind';
      jQuery(el)[method]('change', this.rawListener);
      if (!lazy) {
        jQuery(el)[method]('input', this.listener);
      }
    } else {
      this.on('change', this.rawListener);
      if (!lazy) {
        this.on('input', this.listener);
      }
    }

    // IE9 doesn't fire input event on backspace/del/cut
    if (!lazy && isIE9) {
      this.on('cut', function () {
        nextTick(self.listener);
      });
      this.on('keyup', function (e) {
        if (e.keyCode === 46 || e.keyCode === 8) {
          self.listener();
        }
      });
    }

    // set initial value if present
    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    // #3029 only update when the value changes. This prevent
    // browsers from overwriting values like selectionStart
    value = _toString(value);
    if (value !== this.el.value) this.el.value = value;
  },

  unbind: function unbind() {
    var el = this.el;
    if (this.hasjQuery) {
      var method = jQuery.fn.off ? 'off' : 'unbind';
      jQuery(el)[method]('change', this.listener);
      jQuery(el)[method]('input', this.listener);
    }
  }
};

var radio = {

  bind: function bind() {
    var self = this;
    var el = this.el;

    this.getValue = function () {
      // value overwrite via v-bind:value
      if (el.hasOwnProperty('_value')) {
        return el._value;
      }
      var val = el.value;
      if (self.params.number) {
        val = toNumber(val);
      }
      return val;
    };

    this.listener = function () {
      self.set(self.getValue());
    };
    this.on('change', this.listener);

    if (el.hasAttribute('checked')) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    this.el.checked = looseEqual(value, this.getValue());
  }
};

var select = {

  bind: function bind() {
    var _this = this;

    var self = this;
    var el = this.el;

    // method to force update DOM using latest value.
    this.forceUpdate = function () {
      if (self._watcher) {
        self.update(self._watcher.get());
      }
    };

    // check if this is a multiple select
    var multiple = this.multiple = el.hasAttribute('multiple');

    // attach listener
    this.listener = function () {
      var value = getValue(el, multiple);
      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
      self.set(value);
    };
    this.on('change', this.listener);

    // if has initial value, set afterBind
    var initValue = getValue(el, multiple, true);
    if (multiple && initValue.length || !multiple && initValue !== null) {
      this.afterBind = this.listener;
    }

    // All major browsers except Firefox resets
    // selectedIndex with value -1 to 0 when the element
    // is appended to a new parent, therefore we have to
    // force a DOM update whenever that happens...
    this.vm.$on('hook:attached', function () {
      nextTick(_this.forceUpdate);
    });
  },

  update: function update(value) {
    var el = this.el;
    if (!inDoc(el)) {
      return nextTick(this.forceUpdate);
    }
    el.selectedIndex = -1;
    var multi = this.multiple && isArray(value);
    var options = el.options;
    var i = options.length;
    var op, val;
    while (i--) {
      op = options[i];
      val = op.hasOwnProperty('_value') ? op._value : op.value;
      /* eslint-disable eqeqeq */
      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
      /* eslint-enable eqeqeq */
    }
  },

  unbind: function unbind() {
    /* istanbul ignore next */
    this.vm.$off('hook:attached', this.forceUpdate);
  }
};

/**
 * Get select value
 *
 * @param {SelectElement} el
 * @param {Boolean} multi
 * @param {Boolean} init
 * @return {Array|*}
 */

function getValue(el, multi, init) {
  var res = multi ? [] : null;
  var op, val, selected;
  for (var i = 0, l = el.options.length; i < l; i++) {
    op = el.options[i];
    selected = init ? op.hasAttribute('selected') : op.selected;
    if (selected) {
      val = op.hasOwnProperty('_value') ? op._value : op.value;
      if (multi) {
        res.push(val);
      } else {
        return val;
      }
    }
  }
  return res;
}

/**
 * Native Array.indexOf uses strict equal, but in this
 * case we need to match string/numbers with custom equal.
 *
 * @param {Array} arr
 * @param {*} val
 */

function indexOf$1(arr, val) {
  var i = arr.length;
  while (i--) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

var checkbox = {

  bind: function bind() {
    var self = this;
    var el = this.el;

    this.getValue = function () {
      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
    };

    function getBooleanValue() {
      var val = el.checked;
      if (val && el.hasOwnProperty('_trueValue')) {
        return el._trueValue;
      }
      if (!val && el.hasOwnProperty('_falseValue')) {
        return el._falseValue;
      }
      return val;
    }

    this.listener = function () {
      var model = self._watcher.value;
      if (isArray(model)) {
        var val = self.getValue();
        if (el.checked) {
          if (indexOf(model, val) < 0) {
            model.push(val);
          }
        } else {
          model.$remove(val);
        }
      } else {
        self.set(getBooleanValue());
      }
    };

    this.on('change', this.listener);
    if (el.hasAttribute('checked')) {
      this.afterBind = this.listener;
    }
  },

  update: function update(value) {
    var el = this.el;
    if (isArray(value)) {
      el.checked = indexOf(value, this.getValue()) > -1;
    } else {
      if (el.hasOwnProperty('_trueValue')) {
        el.checked = looseEqual(value, el._trueValue);
      } else {
        el.checked = !!value;
      }
    }
  }
};

var handlers = {
  text: text$2,
  radio: radio,
  select: select,
  checkbox: checkbox
};

var model = {

  priority: MODEL,
  twoWay: true,
  handlers: handlers,
  params: ['lazy', 'number', 'debounce'],

  /**
   * Possible elements:
   *   <select>
   *   <textarea>
   *   <input type="*">
   *     - text
   *     - checkbox
   *     - radio
   *     - number
   */

  bind: function bind() {
    // friendly warning...
    this.checkFilters();
    if (this.hasRead && !this.hasWrite) {
      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
    }
    var el = this.el;
    var tag = el.tagName;
    var handler;
    if (tag === 'INPUT') {
      handler = handlers[el.type] || handlers.text;
    } else if (tag === 'SELECT') {
      handler = handlers.select;
    } else if (tag === 'TEXTAREA') {
      handler = handlers.text;
    } else {
      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
      return;
    }
    el.__v_model = this;
    handler.bind.call(this);
    this.update = handler.update;
    this._unbind = handler.unbind;
  },

  /**
   * Check read/write filter stats.
   */

  checkFilters: function checkFilters() {
    var filters = this.filters;
    if (!filters) return;
    var i = filters.length;
    while (i--) {
      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
      if (typeof filter === 'function' || filter.read) {
        this.hasRead = true;
      }
      if (filter.write) {
        this.hasWrite = true;
      }
    }
  },

  unbind: function unbind() {
    this.el.__v_model = null;
    this._unbind && this._unbind();
  }
};

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  'delete': [8, 46],
  up: 38,
  left: 37,
  right: 39,
  down: 40
};

function keyFilter(handler, keys) {
  var codes = keys.map(function (key) {
    var charCode = key.charCodeAt(0);
    if (charCode > 47 && charCode < 58) {
      return parseInt(key, 10);
    }
    if (key.length === 1) {
      charCode = key.toUpperCase().charCodeAt(0);
      if (charCode > 64 && charCode < 91) {
        return charCode;
      }
    }
    return keyCodes[key];
  });
  codes = [].concat.apply([], codes);
  return function keyHandler(e) {
    if (codes.indexOf(e.keyCode) > -1) {
      return handler.call(this, e);
    }
  };
}

function stopFilter(handler) {
  return function stopHandler(e) {
    e.stopPropagation();
    return handler.call(this, e);
  };
}

function preventFilter(handler) {
  return function preventHandler(e) {
    e.preventDefault();
    return handler.call(this, e);
  };
}

function selfFilter(handler) {
  return function selfHandler(e) {
    if (e.target === e.currentTarget) {
      return handler.call(this, e);
    }
  };
}

var on$1 = {

  priority: ON,
  acceptStatement: true,
  keyCodes: keyCodes,

  bind: function bind() {
    // deal with iframes
    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
      var self = this;
      this.iframeBind = function () {
        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
      };
      this.on('load', this.iframeBind);
    }
  },

  update: function update(handler) {
    // stub a noop for v-on with no value,
    // e.g. @mousedown.prevent
    if (!this.descriptor.raw) {
      handler = function () {};
    }

    if (typeof handler !== 'function') {
      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
      return;
    }

    // apply modifiers
    if (this.modifiers.stop) {
      handler = stopFilter(handler);
    }
    if (this.modifiers.prevent) {
      handler = preventFilter(handler);
    }
    if (this.modifiers.self) {
      handler = selfFilter(handler);
    }
    // key filter
    var keys = Object.keys(this.modifiers).filter(function (key) {
      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
    });
    if (keys.length) {
      handler = keyFilter(handler, keys);
    }

    this.reset();
    this.handler = handler;

    if (this.iframeBind) {
      this.iframeBind();
    } else {
      on(this.el, this.arg, this.handler, this.modifiers.capture);
    }
  },

  reset: function reset() {
    var el = this.iframeBind ? this.el.contentWindow : this.el;
    if (this.handler) {
      off(el, this.arg, this.handler);
    }
  },

  unbind: function unbind() {
    this.reset();
  }
};

var prefixes = ['-webkit-', '-moz-', '-ms-'];
var camelPrefixes = ['Webkit', 'Moz', 'ms'];
var importantRE = /!important;?$/;
var propCache = Object.create(null);

var testEl = null;

var style = {

  deep: true,

  update: function update(value) {
    if (typeof value === 'string') {
      this.el.style.cssText = value;
    } else if (isArray(value)) {
      this.handleObject(value.reduce(extend, {}));
    } else {
      this.handleObject(value || {});
    }
  },

  handleObject: function handleObject(value) {
    // cache object styles so that only changed props
    // are actually updated.
    var cache = this.cache || (this.cache = {});
    var name, val;
    for (name in cache) {
      if (!(name in value)) {
        this.handleSingle(name, null);
        delete cache[name];
      }
    }
    for (name in value) {
      val = value[name];
      if (val !== cache[name]) {
        cache[name] = val;
        this.handleSingle(name, val);
      }
    }
  },

  handleSingle: function handleSingle(prop, value) {
    prop = normalize(prop);
    if (!prop) return; // unsupported prop
    // cast possible numbers/booleans into strings
    if (value != null) value += '';
    if (value) {
      var isImportant = importantRE.test(value) ? 'important' : '';
      if (isImportant) {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
        }
        value = value.replace(importantRE, '').trim();
        this.el.style.setProperty(prop.kebab, value, isImportant);
      } else {
        this.el.style[prop.camel] = value;
      }
    } else {
      this.el.style[prop.camel] = '';
    }
  }

};

/**
 * Normalize a CSS property name.
 * - cache result
 * - auto prefix
 * - camelCase -> dash-case
 *
 * @param {String} prop
 * @return {String}
 */

function normalize(prop) {
  if (propCache[prop]) {
    return propCache[prop];
  }
  var res = prefix(prop);
  propCache[prop] = propCache[res] = res;
  return res;
}

/**
 * Auto detect the appropriate prefix for a CSS property.
 * https://gist.github.com/paulirish/523692
 *
 * @param {String} prop
 * @return {String}
 */

function prefix(prop) {
  prop = hyphenate(prop);
  var camel = camelize(prop);
  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
  if (!testEl) {
    testEl = document.createElement('div');
  }
  var i = prefixes.length;
  var prefixed;
  if (camel !== 'filter' && camel in testEl.style) {
    return {
      kebab: prop,
      camel: camel
    };
  }
  while (i--) {
    prefixed = camelPrefixes[i] + upper;
    if (prefixed in testEl.style) {
      return {
        kebab: prefixes[i] + prop,
        camel: prefixed
      };
    }
  }
}

// xlink
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xlinkRE = /^xlink:/;

// check for attributes that prohibit interpolations
var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
// these attributes should also set their corresponding properties
// because they only affect the initial state of the element
var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
// these attributes expect enumrated values of "true" or "false"
// but are not boolean attributes
var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

// these attributes should set a hidden property for
// binding v-model to object values
var modelProps = {
  value: '_value',
  'true-value': '_trueValue',
  'false-value': '_falseValue'
};

var bind$1 = {

  priority: BIND,

  bind: function bind() {
    var attr = this.arg;
    var tag = this.el.tagName;
    // should be deep watch on object mode
    if (!attr) {
      this.deep = true;
    }
    // handle interpolation bindings
    var descriptor = this.descriptor;
    var tokens = descriptor.interp;
    if (tokens) {
      // handle interpolations with one-time tokens
      if (descriptor.hasOneTime) {
        this.expression = tokensToExp(tokens, this._scope || this.vm);
      }

      // only allow binding on native attributes
      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
        this.el.removeAttribute(attr);
        this.invalid = true;
      }

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production') {
        var raw = attr + '="' + descriptor.raw + '": ';
        // warn src
        if (attr === 'src') {
          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
        }

        // warn style
        if (attr === 'style') {
          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
        }
      }
    }
  },

  update: function update(value) {
    if (this.invalid) {
      return;
    }
    var attr = this.arg;
    if (this.arg) {
      this.handleSingle(attr, value);
    } else {
      this.handleObject(value || {});
    }
  },

  // share object handler with v-bind:class
  handleObject: style.handleObject,

  handleSingle: function handleSingle(attr, value) {
    var el = this.el;
    var interp = this.descriptor.interp;
    if (this.modifiers.camel) {
      attr = camelize(attr);
    }
    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
      ? '' : value : value;

      if (el[attr] !== attrValue) {
        el[attr] = attrValue;
      }
    }
    // set model props
    var modelProp = modelProps[attr];
    if (!interp && modelProp) {
      el[modelProp] = value;
      // update v-model if present
      var model = el.__v_model;
      if (model) {
        model.listener();
      }
    }
    // do not set value attribute for textarea
    if (attr === 'value' && el.tagName === 'TEXTAREA') {
      el.removeAttribute(attr);
      return;
    }
    // update attribute
    if (enumeratedAttrRE.test(attr)) {
      el.setAttribute(attr, value ? 'true' : 'false');
    } else if (value != null && value !== false) {
      if (attr === 'class') {
        // handle edge case #1960:
        // class interpolation should not overwrite Vue transition class
        if (el.__v_trans) {
          value += ' ' + el.__v_trans.id + '-transition';
        }
        setClass(el, value);
      } else if (xlinkRE.test(attr)) {
        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
      } else {
        el.setAttribute(attr, value === true ? '' : value);
      }
    } else {
      el.removeAttribute(attr);
    }
  }
};

var el = {

  priority: EL,

  bind: function bind() {
    /* istanbul ignore if */
    if (!this.arg) {
      return;
    }
    var id = this.id = camelize(this.arg);
    var refs = (this._scope || this.vm).$els;
    if (hasOwn(refs, id)) {
      refs[id] = this.el;
    } else {
      defineReactive(refs, id, this.el);
    }
  },

  unbind: function unbind() {
    var refs = (this._scope || this.vm).$els;
    if (refs[this.id] === this.el) {
      refs[this.id] = null;
    }
  }
};

var ref = {
  bind: function bind() {
    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
  }
};

var cloak = {
  bind: function bind() {
    var el = this.el;
    this.vm.$once('pre-hook:compiled', function () {
      el.removeAttribute('v-cloak');
    });
  }
};

// must export plain object
var directives = {
  text: text$1,
  html: html,
  'for': vFor,
  'if': vIf,
  show: show,
  model: model,
  on: on$1,
  bind: bind$1,
  el: el,
  ref: ref,
  cloak: cloak
};

var vClass = {

  deep: true,

  update: function update(value) {
    if (!value) {
      this.cleanup();
    } else if (typeof value === 'string') {
      this.setClass(value.trim().split(/\s+/));
    } else {
      this.setClass(normalize$1(value));
    }
  },

  setClass: function setClass(value) {
    this.cleanup(value);
    for (var i = 0, l = value.length; i < l; i++) {
      var val = value[i];
      if (val) {
        apply(this.el, val, addClass);
      }
    }
    this.prevKeys = value;
  },

  cleanup: function cleanup(value) {
    var prevKeys = this.prevKeys;
    if (!prevKeys) return;
    var i = prevKeys.length;
    while (i--) {
      var key = prevKeys[i];
      if (!value || value.indexOf(key) < 0) {
        apply(this.el, key, removeClass);
      }
    }
  }
};

/**
 * Normalize objects and arrays (potentially containing objects)
 * into array of strings.
 *
 * @param {Object|Array<String|Object>} value
 * @return {Array<String>}
 */

function normalize$1(value) {
  var res = [];
  if (isArray(value)) {
    for (var i = 0, l = value.length; i < l; i++) {
      var _key = value[i];
      if (_key) {
        if (typeof _key === 'string') {
          res.push(_key);
        } else {
          for (var k in _key) {
            if (_key[k]) res.push(k);
          }
        }
      }
    }
  } else if (isObject(value)) {
    for (var key in value) {
      if (value[key]) res.push(key);
    }
  }
  return res;
}

/**
 * Add or remove a class/classes on an element
 *
 * @param {Element} el
 * @param {String} key The class name. This may or may not
 *                     contain a space character, in such a
 *                     case we'll deal with multiple class
 *                     names at once.
 * @param {Function} fn
 */

function apply(el, key, fn) {
  key = key.trim();
  if (key.indexOf(' ') === -1) {
    fn(el, key);
    return;
  }
  // The key contains one or more space characters.
  // Since a class name doesn't accept such characters, we
  // treat it as multiple classes.
  var keys = key.split(/\s+/);
  for (var i = 0, l = keys.length; i < l; i++) {
    fn(el, keys[i]);
  }
}

var component = {

  priority: COMPONENT,

  params: ['keep-alive', 'transition-mode', 'inline-template'],

  /**
   * Setup. Two possible usages:
   *
   * - static:
   *   <comp> or <div v-component="comp">
   *
   * - dynamic:
   *   <component :is="view">
   */

  bind: function bind() {
    if (!this.el.__vue__) {
      // keep-alive cache
      this.keepAlive = this.params.keepAlive;
      if (this.keepAlive) {
        this.cache = {};
      }
      // check inline-template
      if (this.params.inlineTemplate) {
        // extract inline template as a DocumentFragment
        this.inlineTemplate = extractContent(this.el, true);
      }
      // component resolution related state
      this.pendingComponentCb = this.Component = null;
      // transition related state
      this.pendingRemovals = 0;
      this.pendingRemovalCb = null;
      // create a ref anchor
      this.anchor = createAnchor('v-component');
      replace(this.el, this.anchor);
      // remove is attribute.
      // this is removed during compilation, but because compilation is
      // cached, when the component is used elsewhere this attribute
      // will remain at link time.
      this.el.removeAttribute('is');
      this.el.removeAttribute(':is');
      // remove ref, same as above
      if (this.descriptor.ref) {
        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
      }
      // if static, build right now.
      if (this.literal) {
        this.setComponent(this.expression);
      }
    } else {
      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
    }
  },

  /**
   * Public update, called by the watcher in the dynamic
   * literal scenario, e.g. <component :is="view">
   */

  update: function update(value) {
    if (!this.literal) {
      this.setComponent(value);
    }
  },

  /**
   * Switch dynamic components. May resolve the component
   * asynchronously, and perform transition based on
   * specified transition mode. Accepts a few additional
   * arguments specifically for vue-router.
   *
   * The callback is called when the full transition is
   * finished.
   *
   * @param {String} value
   * @param {Function} [cb]
   */

  setComponent: function setComponent(value, cb) {
    this.invalidatePending();
    if (!value) {
      // just remove current
      this.unbuild(true);
      this.remove(this.childVM, cb);
      this.childVM = null;
    } else {
      var self = this;
      this.resolveComponent(value, function () {
        self.mountComponent(cb);
      });
    }
  },

  /**
   * Resolve the component constructor to use when creating
   * the child vm.
   *
   * @param {String|Function} value
   * @param {Function} cb
   */

  resolveComponent: function resolveComponent(value, cb) {
    var self = this;
    this.pendingComponentCb = cancellable(function (Component) {
      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
      self.Component = Component;
      cb();
    });
    this.vm._resolveComponent(value, this.pendingComponentCb);
  },

  /**
   * Create a new instance using the current constructor and
   * replace the existing instance. This method doesn't care
   * whether the new component and the old one are actually
   * the same.
   *
   * @param {Function} [cb]
   */

  mountComponent: function mountComponent(cb) {
    // actual mount
    this.unbuild(true);
    var self = this;
    var activateHooks = this.Component.options.activate;
    var cached = this.getCached();
    var newComponent = this.build();
    if (activateHooks && !cached) {
      this.waitingFor = newComponent;
      callActivateHooks(activateHooks, newComponent, function () {
        if (self.waitingFor !== newComponent) {
          return;
        }
        self.waitingFor = null;
        self.transition(newComponent, cb);
      });
    } else {
      // update ref for kept-alive component
      if (cached) {
        newComponent._updateRef();
      }
      this.transition(newComponent, cb);
    }
  },

  /**
   * When the component changes or unbinds before an async
   * constructor is resolved, we need to invalidate its
   * pending callback.
   */

  invalidatePending: function invalidatePending() {
    if (this.pendingComponentCb) {
      this.pendingComponentCb.cancel();
      this.pendingComponentCb = null;
    }
  },

  /**
   * Instantiate/insert a new child vm.
   * If keep alive and has cached instance, insert that
   * instance; otherwise build a new one and cache it.
   *
   * @param {Object} [extraOptions]
   * @return {Vue} - the created instance
   */

  build: function build(extraOptions) {
    var cached = this.getCached();
    if (cached) {
      return cached;
    }
    if (this.Component) {
      // default options
      var options = {
        name: this.ComponentName,
        el: cloneNode(this.el),
        template: this.inlineTemplate,
        // make sure to add the child with correct parent
        // if this is a transcluded component, its parent
        // should be the transclusion host.
        parent: this._host || this.vm,
        // if no inline-template, then the compiled
        // linker can be cached for better performance.
        _linkerCachable: !this.inlineTemplate,
        _ref: this.descriptor.ref,
        _asComponent: true,
        _isRouterView: this._isRouterView,
        // if this is a transcluded component, context
        // will be the common parent vm of this instance
        // and its host.
        _context: this.vm,
        // if this is inside an inline v-for, the scope
        // will be the intermediate scope created for this
        // repeat fragment. this is used for linking props
        // and container directives.
        _scope: this._scope,
        // pass in the owner fragment of this component.
        // this is necessary so that the fragment can keep
        // track of its contained components in order to
        // call attach/detach hooks for them.
        _frag: this._frag
      };
      // extra options
      // in 1.0.0 this is used by vue-router only
      /* istanbul ignore if */
      if (extraOptions) {
        extend(options, extraOptions);
      }
      var child = new this.Component(options);
      if (this.keepAlive) {
        this.cache[this.Component.cid] = child;
      }
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
      }
      return child;
    }
  },

  /**
   * Try to get a cached instance of the current component.
   *
   * @return {Vue|undefined}
   */

  getCached: function getCached() {
    return this.keepAlive && this.cache[this.Component.cid];
  },

  /**
   * Teardown the current child, but defers cleanup so
   * that we can separate the destroy and removal steps.
   *
   * @param {Boolean} defer
   */

  unbuild: function unbuild(defer) {
    if (this.waitingFor) {
      if (!this.keepAlive) {
        this.waitingFor.$destroy();
      }
      this.waitingFor = null;
    }
    var child = this.childVM;
    if (!child || this.keepAlive) {
      if (child) {
        // remove ref
        child._inactive = true;
        child._updateRef(true);
      }
      return;
    }
    // the sole purpose of `deferCleanup` is so that we can
    // "deactivate" the vm right now and perform DOM removal
    // later.
    child.$destroy(false, defer);
  },

  /**
   * Remove current destroyed child and manually do
   * the cleanup after removal.
   *
   * @param {Function} cb
   */

  remove: function remove(child, cb) {
    var keepAlive = this.keepAlive;
    if (child) {
      // we may have a component switch when a previous
      // component is still being transitioned out.
      // we want to trigger only one lastest insertion cb
      // when the existing transition finishes. (#1119)
      this.pendingRemovals++;
      this.pendingRemovalCb = cb;
      var self = this;
      child.$remove(function () {
        self.pendingRemovals--;
        if (!keepAlive) child._cleanup();
        if (!self.pendingRemovals && self.pendingRemovalCb) {
          self.pendingRemovalCb();
          self.pendingRemovalCb = null;
        }
      });
    } else if (cb) {
      cb();
    }
  },

  /**
   * Actually swap the components, depending on the
   * transition mode. Defaults to simultaneous.
   *
   * @param {Vue} target
   * @param {Function} [cb]
   */

  transition: function transition(target, cb) {
    var self = this;
    var current = this.childVM;
    // for devtool inspection
    if (current) current._inactive = true;
    target._inactive = false;
    this.childVM = target;
    switch (self.params.transitionMode) {
      case 'in-out':
        target.$before(self.anchor, function () {
          self.remove(current, cb);
        });
        break;
      case 'out-in':
        self.remove(current, function () {
          target.$before(self.anchor, cb);
        });
        break;
      default:
        self.remove(current);
        target.$before(self.anchor, cb);
    }
  },

  /**
   * Unbind.
   */

  unbind: function unbind() {
    this.invalidatePending();
    // Do not defer cleanup when unbinding
    this.unbuild();
    // destroy all keep-alive cached instances
    if (this.cache) {
      for (var key in this.cache) {
        this.cache[key].$destroy();
      }
      this.cache = null;
    }
  }
};

/**
 * Call activate hooks in order (asynchronous)
 *
 * @param {Array} hooks
 * @param {Vue} vm
 * @param {Function} cb
 */

function callActivateHooks(hooks, vm, cb) {
  var total = hooks.length;
  var called = 0;
  hooks[0].call(vm, next);
  function next() {
    if (++called >= total) {
      cb();
    } else {
      hooks[called].call(vm, next);
    }
  }
}

var propBindingModes = config._propBindingModes;
var empty = {};

// regexes
var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

/**
 * Compile props on a root element and return
 * a props link function.
 *
 * @param {Element|DocumentFragment} el
 * @param {Array} propOptions
 * @param {Vue} vm
 * @return {Function} propsLinkFn
 */

function compileProps(el, propOptions, vm) {
  var props = [];
  var names = Object.keys(propOptions);
  var i = names.length;
  var options, name, attr, value, path, parsed, prop;
  while (i--) {
    name = names[i];
    options = propOptions[name] || empty;

    if (process.env.NODE_ENV !== 'production' && name === '$data') {
      warn('Do not use $data as prop.', vm);
      continue;
    }

    // props could contain dashes, which will be
    // interpreted as minus calculations by the parser
    // so we need to camelize the path here
    path = camelize(name);
    if (!identRE$1.test(path)) {
      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
      continue;
    }

    prop = {
      name: name,
      path: path,
      options: options,
      mode: propBindingModes.ONE_WAY,
      raw: null
    };

    attr = hyphenate(name);
    // first check dynamic version
    if ((value = getBindAttr(el, attr)) === null) {
      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
        prop.mode = propBindingModes.TWO_WAY;
      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
        prop.mode = propBindingModes.ONE_TIME;
      }
    }
    if (value !== null) {
      // has dynamic binding!
      prop.raw = value;
      parsed = parseDirective(value);
      value = parsed.expression;
      prop.filters = parsed.filters;
      // check binding type
      if (isLiteral(value) && !parsed.filters) {
        // for expressions containing literal numbers and
        // booleans, there's no need to setup a prop binding,
        // so we can optimize them as a one-time set.
        prop.optimizedLiteral = true;
      } else {
        prop.dynamic = true;
        // check non-settable path for two-way bindings
        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
          prop.mode = propBindingModes.ONE_WAY;
          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
        }
      }
      prop.parentPath = value;

      // warn required two-way
      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
        warn('Prop "' + name + '" expects a two-way binding type.', vm);
      }
    } else if ((value = getAttr(el, attr)) !== null) {
      // has literal binding!
      prop.raw = value;
    } else if (process.env.NODE_ENV !== 'production') {
      // check possible camelCase prop usage
      var lowerCaseName = path.toLowerCase();
      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
      if (value) {
        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
      } else if (options.required) {
        // warn missing required
        warn('Missing required prop: ' + name, vm);
      }
    }
    // push prop
    props.push(prop);
  }
  return makePropsLinkFn(props);
}

/**
 * Build a function that applies props to a vm.
 *
 * @param {Array} props
 * @return {Function} propsLinkFn
 */

function makePropsLinkFn(props) {
  return function propsLinkFn(vm, scope) {
    // store resolved props info
    vm._props = {};
    var inlineProps = vm.$options.propsData;
    var i = props.length;
    var prop, path, options, value, raw;
    while (i--) {
      prop = props[i];
      raw = prop.raw;
      path = prop.path;
      options = prop.options;
      vm._props[path] = prop;
      if (inlineProps && hasOwn(inlineProps, path)) {
        initProp(vm, prop, inlineProps[path]);
      }if (raw === null) {
        // initialize absent prop
        initProp(vm, prop, undefined);
      } else if (prop.dynamic) {
        // dynamic prop
        if (prop.mode === propBindingModes.ONE_TIME) {
          // one time binding
          value = (scope || vm._context || vm).$get(prop.parentPath);
          initProp(vm, prop, value);
        } else {
          if (vm._context) {
            // dynamic binding
            vm._bindDir({
              name: 'prop',
              def: propDef,
              prop: prop
            }, null, null, scope); // el, host, scope
          } else {
              // root instance
              initProp(vm, prop, vm.$get(prop.parentPath));
            }
        }
      } else if (prop.optimizedLiteral) {
        // optimized literal, cast it and just set once
        var stripped = stripQuotes(raw);
        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
        initProp(vm, prop, value);
      } else {
        // string literal, but we need to cater for
        // Boolean props with no value, or with same
        // literal value (e.g. disabled="disabled")
        // see https://github.com/vuejs/vue-loader/issues/182
        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
        initProp(vm, prop, value);
      }
    }
  };
}

/**
 * Process a prop with a rawValue, applying necessary coersions,
 * default values & assertions and call the given callback with
 * processed value.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} rawValue
 * @param {Function} fn
 */

function processPropValue(vm, prop, rawValue, fn) {
  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
  var value = rawValue;
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop);
  }
  value = coerceProp(prop, value, vm);
  var coerced = value !== rawValue;
  if (!assertProp(prop, value, vm)) {
    value = undefined;
  }
  if (isSimple && !coerced) {
    withoutConversion(function () {
      fn(value);
    });
  } else {
    fn(value);
  }
}

/**
 * Set a prop's initial value on a vm and its data object.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */

function initProp(vm, prop, value) {
  processPropValue(vm, prop, value, function (value) {
    defineReactive(vm, prop.path, value);
  });
}

/**
 * Update a prop's value on a vm.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @param {*} value
 */

function updateProp(vm, prop, value) {
  processPropValue(vm, prop, value, function (value) {
    vm[prop.path] = value;
  });
}

/**
 * Get the default value of a prop.
 *
 * @param {Vue} vm
 * @param {Object} prop
 * @return {*}
 */

function getPropDefaultValue(vm, prop) {
  // no default, return undefined
  var options = prop.options;
  if (!hasOwn(options, 'default')) {
    // absent boolean value defaults to false
    return options.type === Boolean ? false : undefined;
  }
  var def = options['default'];
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  }
  // call factory function for non-Function types
  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
}

/**
 * Assert whether a prop is valid.
 *
 * @param {Object} prop
 * @param {*} value
 * @param {Vue} vm
 */

function assertProp(prop, value, vm) {
  if (!prop.options.required && ( // non-required
  prop.raw === null || // abscent
  value == null) // null or undefined
  ) {
      return true;
    }
  var options = prop.options;
  var type = options.type;
  var valid = !type;
  var expectedTypes = [];
  if (type) {
    if (!isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType);
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    if (process.env.NODE_ENV !== 'production') {
      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
    }
    return false;
  }
  var validator = options.validator;
  if (validator) {
    if (!validator(value)) {
      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
      return false;
    }
  }
  return true;
}

/**
 * Force parsing value with coerce option.
 *
 * @param {*} value
 * @param {Object} options
 * @return {*}
 */

function coerceProp(prop, value, vm) {
  var coerce = prop.options.coerce;
  if (!coerce) {
    return value;
  }
  if (typeof coerce === 'function') {
    return coerce(value);
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
    return value;
  }
}

/**
 * Assert the type of a value
 *
 * @param {*} value
 * @param {Function} type
 * @return {Object}
 */

function assertType(value, type) {
  var valid;
  var expectedType;
  if (type === String) {
    expectedType = 'string';
    valid = typeof value === expectedType;
  } else if (type === Number) {
    expectedType = 'number';
    valid = typeof value === expectedType;
  } else if (type === Boolean) {
    expectedType = 'boolean';
    valid = typeof value === expectedType;
  } else if (type === Function) {
    expectedType = 'function';
    valid = typeof value === expectedType;
  } else if (type === Object) {
    expectedType = 'object';
    valid = isPlainObject(value);
  } else if (type === Array) {
    expectedType = 'array';
    valid = isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  };
}

/**
 * Format type for output
 *
 * @param {String} type
 * @return {String}
 */

function formatType(type) {
  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
}

/**
 * Format value
 *
 * @param {*} value
 * @return {String}
 */

function formatValue(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

var bindingModes = config._propBindingModes;

var propDef = {

  bind: function bind() {
    var child = this.vm;
    var parent = child._context;
    // passed in from compiler directly
    var prop = this.descriptor.prop;
    var childKey = prop.path;
    var parentKey = prop.parentPath;
    var twoWay = prop.mode === bindingModes.TWO_WAY;

    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
      updateProp(child, prop, val);
    }, {
      twoWay: twoWay,
      filters: prop.filters,
      // important: props need to be observed on the
      // v-for scope if present
      scope: this._scope
    });

    // set the child initial value.
    initProp(child, prop, parentWatcher.value);

    // setup two-way binding
    if (twoWay) {
      // important: defer the child watcher creation until
      // the created hook (after data observation)
      var self = this;
      child.$once('pre-hook:created', function () {
        self.childWatcher = new Watcher(child, childKey, function (val) {
          parentWatcher.set(val);
        }, {
          // ensure sync upward before parent sync down.
          // this is necessary in cases e.g. the child
          // mutates a prop array, then replaces it. (#1683)
          sync: true
        });
      });
    }
  },

  unbind: function unbind() {
    this.parentWatcher.teardown();
    if (this.childWatcher) {
      this.childWatcher.teardown();
    }
  }
};

var queue$1 = [];
var queued = false;

/**
 * Push a job into the queue.
 *
 * @param {Function} job
 */

function pushJob(job) {
  queue$1.push(job);
  if (!queued) {
    queued = true;
    nextTick(flush);
  }
}

/**
 * Flush the queue, and do one forced reflow before
 * triggering transitions.
 */

function flush() {
  // Force layout
  var f = document.documentElement.offsetHeight;
  for (var i = 0; i < queue$1.length; i++) {
    queue$1[i]();
  }
  queue$1 = [];
  queued = false;
  // dummy return, so js linters don't complain about
  // unused variable f
  return f;
}

var TYPE_TRANSITION = 'transition';
var TYPE_ANIMATION = 'animation';
var transDurationProp = transitionProp + 'Duration';
var animDurationProp = animationProp + 'Duration';

/**
 * If a just-entered element is applied the
 * leave class while its enter transition hasn't started yet,
 * and the transitioned property has the same value for both
 * enter/leave, then the leave transition will be skipped and
 * the transitionend event never fires. This function ensures
 * its callback to be called after a transition has started
 * by waiting for double raf.
 *
 * It falls back to setTimeout on devices that support CSS
 * transitions but not raf (e.g. Android 4.2 browser) - since
 * these environments are usually slow, we are giving it a
 * relatively large timeout.
 */

var raf = inBrowser && window.requestAnimationFrame;
var waitForTransitionStart = raf
/* istanbul ignore next */
? function (fn) {
  raf(function () {
    raf(fn);
  });
} : function (fn) {
  setTimeout(fn, 50);
};

/**
 * A Transition object that encapsulates the state and logic
 * of the transition.
 *
 * @param {Element} el
 * @param {String} id
 * @param {Object} hooks
 * @param {Vue} vm
 */
function Transition(el, id, hooks, vm) {
  this.id = id;
  this.el = el;
  this.enterClass = hooks && hooks.enterClass || id + '-enter';
  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
  this.hooks = hooks;
  this.vm = vm;
  // async state
  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
  this.justEntered = false;
  this.entered = this.left = false;
  this.typeCache = {};
  // check css transition type
  this.type = hooks && hooks.type;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production') {
    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
    }
  }
  // bind
  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
    self[m] = bind(self[m], self);
  });
}

var p$1 = Transition.prototype;

/**
 * Start an entering transition.
 *
 * 1. enter transition triggered
 * 2. call beforeEnter hook
 * 3. add enter class
 * 4. insert/show element
 * 5. call enter hook (with possible explicit js callback)
 * 6. reflow
 * 7. based on transition type:
 *    - transition:
 *        remove class now, wait for transitionend,
 *        then done if there's no explicit js callback.
 *    - animation:
 *        wait for animationend, remove class,
 *        then done if there's no explicit js callback.
 *    - no css transition:
 *        done now if there's no explicit js callback.
 * 8. wait for either done or js callback, then call
 *    afterEnter hook.
 *
 * @param {Function} op - insert/show the element
 * @param {Function} [cb]
 */

p$1.enter = function (op, cb) {
  this.cancelPending();
  this.callHook('beforeEnter');
  this.cb = cb;
  addClass(this.el, this.enterClass);
  op();
  this.entered = false;
  this.callHookWithCb('enter');
  if (this.entered) {
    return; // user called done synchronously.
  }
  this.cancel = this.hooks && this.hooks.enterCancelled;
  pushJob(this.enterNextTick);
};

/**
 * The "nextTick" phase of an entering transition, which is
 * to be pushed into a queue and executed after a reflow so
 * that removing the class can trigger a CSS transition.
 */

p$1.enterNextTick = function () {
  var _this = this;

  // prevent transition skipping
  this.justEntered = true;
  waitForTransitionStart(function () {
    _this.justEntered = false;
  });
  var enterDone = this.enterDone;
  var type = this.getCssTransitionType(this.enterClass);
  if (!this.pendingJsCb) {
    if (type === TYPE_TRANSITION) {
      // trigger transition by removing enter class now
      removeClass(this.el, this.enterClass);
      this.setupCssCb(transitionEndEvent, enterDone);
    } else if (type === TYPE_ANIMATION) {
      this.setupCssCb(animationEndEvent, enterDone);
    } else {
      enterDone();
    }
  } else if (type === TYPE_TRANSITION) {
    removeClass(this.el, this.enterClass);
  }
};

/**
 * The "cleanup" phase of an entering transition.
 */

p$1.enterDone = function () {
  this.entered = true;
  this.cancel = this.pendingJsCb = null;
  removeClass(this.el, this.enterClass);
  this.callHook('afterEnter');
  if (this.cb) this.cb();
};

/**
 * Start a leaving transition.
 *
 * 1. leave transition triggered.
 * 2. call beforeLeave hook
 * 3. add leave class (trigger css transition)
 * 4. call leave hook (with possible explicit js callback)
 * 5. reflow if no explicit js callback is provided
 * 6. based on transition type:
 *    - transition or animation:
 *        wait for end event, remove class, then done if
 *        there's no explicit js callback.
 *    - no css transition:
 *        done if there's no explicit js callback.
 * 7. wait for either done or js callback, then call
 *    afterLeave hook.
 *
 * @param {Function} op - remove/hide the element
 * @param {Function} [cb]
 */

p$1.leave = function (op, cb) {
  this.cancelPending();
  this.callHook('beforeLeave');
  this.op = op;
  this.cb = cb;
  addClass(this.el, this.leaveClass);
  this.left = false;
  this.callHookWithCb('leave');
  if (this.left) {
    return; // user called done synchronously.
  }
  this.cancel = this.hooks && this.hooks.leaveCancelled;
  // only need to handle leaveDone if
  // 1. the transition is already done (synchronously called
  //    by the user, which causes this.op set to null)
  // 2. there's no explicit js callback
  if (this.op && !this.pendingJsCb) {
    // if a CSS transition leaves immediately after enter,
    // the transitionend event never fires. therefore we
    // detect such cases and end the leave immediately.
    if (this.justEntered) {
      this.leaveDone();
    } else {
      pushJob(this.leaveNextTick);
    }
  }
};

/**
 * The "nextTick" phase of a leaving transition.
 */

p$1.leaveNextTick = function () {
  var type = this.getCssTransitionType(this.leaveClass);
  if (type) {
    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
    this.setupCssCb(event, this.leaveDone);
  } else {
    this.leaveDone();
  }
};

/**
 * The "cleanup" phase of a leaving transition.
 */

p$1.leaveDone = function () {
  this.left = true;
  this.cancel = this.pendingJsCb = null;
  this.op();
  removeClass(this.el, this.leaveClass);
  this.callHook('afterLeave');
  if (this.cb) this.cb();
  this.op = null;
};

/**
 * Cancel any pending callbacks from a previously running
 * but not finished transition.
 */

p$1.cancelPending = function () {
  this.op = this.cb = null;
  var hasPending = false;
  if (this.pendingCssCb) {
    hasPending = true;
    off(this.el, this.pendingCssEvent, this.pendingCssCb);
    this.pendingCssEvent = this.pendingCssCb = null;
  }
  if (this.pendingJsCb) {
    hasPending = true;
    this.pendingJsCb.cancel();
    this.pendingJsCb = null;
  }
  if (hasPending) {
    removeClass(this.el, this.enterClass);
    removeClass(this.el, this.leaveClass);
  }
  if (this.cancel) {
    this.cancel.call(this.vm, this.el);
    this.cancel = null;
  }
};

/**
 * Call a user-provided synchronous hook function.
 *
 * @param {String} type
 */

p$1.callHook = function (type) {
  if (this.hooks && this.hooks[type]) {
    this.hooks[type].call(this.vm, this.el);
  }
};

/**
 * Call a user-provided, potentially-async hook function.
 * We check for the length of arguments to see if the hook
 * expects a `done` callback. If true, the transition's end
 * will be determined by when the user calls that callback;
 * otherwise, the end is determined by the CSS transition or
 * animation.
 *
 * @param {String} type
 */

p$1.callHookWithCb = function (type) {
  var hook = this.hooks && this.hooks[type];
  if (hook) {
    if (hook.length > 1) {
      this.pendingJsCb = cancellable(this[type + 'Done']);
    }
    hook.call(this.vm, this.el, this.pendingJsCb);
  }
};

/**
 * Get an element's transition type based on the
 * calculated styles.
 *
 * @param {String} className
 * @return {Number}
 */

p$1.getCssTransitionType = function (className) {
  /* istanbul ignore if */
  if (!transitionEndEvent ||
  // skip CSS transitions if page is not visible -
  // this solves the issue of transitionend events not
  // firing until the page is visible again.
  // pageVisibility API is supported in IE10+, same as
  // CSS transitions.
  document.hidden ||
  // explicit js-only transition
  this.hooks && this.hooks.css === false ||
  // element is hidden
  isHidden(this.el)) {
    return;
  }
  var type = this.type || this.typeCache[className];
  if (type) return type;
  var inlineStyles = this.el.style;
  var computedStyles = window.getComputedStyle(this.el);
  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
  if (transDuration && transDuration !== '0s') {
    type = TYPE_TRANSITION;
  } else {
    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
    if (animDuration && animDuration !== '0s') {
      type = TYPE_ANIMATION;
    }
  }
  if (type) {
    this.typeCache[className] = type;
  }
  return type;
};

/**
 * Setup a CSS transitionend/animationend callback.
 *
 * @param {String} event
 * @param {Function} cb
 */

p$1.setupCssCb = function (event, cb) {
  this.pendingCssEvent = event;
  var self = this;
  var el = this.el;
  var onEnd = this.pendingCssCb = function (e) {
    if (e.target === el) {
      off(el, event, onEnd);
      self.pendingCssEvent = self.pendingCssCb = null;
      if (!self.pendingJsCb && cb) {
        cb();
      }
    }
  };
  on(el, event, onEnd);
};

/**
 * Check if an element is hidden - in that case we can just
 * skip the transition alltogether.
 *
 * @param {Element} el
 * @return {Boolean}
 */

function isHidden(el) {
  if (/svg$/.test(el.namespaceURI)) {
    // SVG elements do not have offset(Width|Height)
    // so we need to check the client rect
    var rect = el.getBoundingClientRect();
    return !(rect.width || rect.height);
  } else {
    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }
}

var transition$1 = {

  priority: TRANSITION,

  update: function update(id, oldId) {
    var el = this.el;
    // resolve on owner vm
    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
    id = id || 'v';
    oldId = oldId || 'v';
    el.__v_trans = new Transition(el, id, hooks, this.vm);
    removeClass(el, oldId + '-transition');
    addClass(el, id + '-transition');
  }
};

var internalDirectives = {
  style: style,
  'class': vClass,
  component: component,
  prop: propDef,
  transition: transition$1
};

// special binding prefixes
var bindRE = /^v-bind:|^:/;
var onRE = /^v-on:|^@/;
var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
var modifierRE = /\.[^\.]+/g;
var transitionRE = /^(v-bind:|:)?transition$/;

// default directive priority
var DEFAULT_PRIORITY = 1000;
var DEFAULT_TERMINAL_PRIORITY = 2000;

/**
 * Compile a template and return a reusable composite link
 * function, which recursively contains more link functions
 * inside. This top level compile function would normally
 * be called on instance root nodes, but can also be used
 * for partial compilation if the partial argument is true.
 *
 * The returned composite link function, when called, will
 * return an unlink function that tearsdown all directives
 * created during the linking phase.
 *
 * @param {Element|DocumentFragment} el
 * @param {Object} options
 * @param {Boolean} partial
 * @return {Function}
 */

function compile(el, options, partial) {
  // link function for the node itself.
  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
  // link function for the childNodes
  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

  /**
   * A composite linker function to be called on a already
   * compiled piece of DOM, which instantiates all directive
   * instances.
   *
   * @param {Vue} vm
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host] - host vm of transcluded content
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - link context fragment
   * @return {Function|undefined}
   */

  return function compositeLinkFn(vm, el, host, scope, frag) {
    // cache childNodes before linking parent, fix #657
    var childNodes = toArray(el.childNodes);
    // link
    var dirs = linkAndCapture(function compositeLinkCapturer() {
      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
    }, vm);
    return makeUnlinkFn(vm, dirs);
  };
}

/**
 * Apply a linker to a vm/element pair and capture the
 * directives created during the process.
 *
 * @param {Function} linker
 * @param {Vue} vm
 */

function linkAndCapture(linker, vm) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'production') {
    // reset directives before every capture in production
    // mode, so that when unlinking we don't need to splice
    // them out (which turns out to be a perf hit).
    // they are kept in development mode because they are
    // useful for Vue's own tests.
    vm._directives = [];
  }
  var originalDirCount = vm._directives.length;
  linker();
  var dirs = vm._directives.slice(originalDirCount);
  dirs.sort(directiveComparator);
  for (var i = 0, l = dirs.length; i < l; i++) {
    dirs[i]._bind();
  }
  return dirs;
}

/**
 * Directive priority sort comparator
 *
 * @param {Object} a
 * @param {Object} b
 */

function directiveComparator(a, b) {
  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
  return a > b ? -1 : a === b ? 0 : 1;
}

/**
 * Linker functions return an unlink function that
 * tearsdown all directives instances generated during
 * the process.
 *
 * We create unlink functions with only the necessary
 * information to avoid retaining additional closures.
 *
 * @param {Vue} vm
 * @param {Array} dirs
 * @param {Vue} [context]
 * @param {Array} [contextDirs]
 * @return {Function}
 */

function makeUnlinkFn(vm, dirs, context, contextDirs) {
  function unlink(destroying) {
    teardownDirs(vm, dirs, destroying);
    if (context && contextDirs) {
      teardownDirs(context, contextDirs);
    }
  }
  // expose linked directives
  unlink.dirs = dirs;
  return unlink;
}

/**
 * Teardown partial linked directives.
 *
 * @param {Vue} vm
 * @param {Array} dirs
 * @param {Boolean} destroying
 */

function teardownDirs(vm, dirs, destroying) {
  var i = dirs.length;
  while (i--) {
    dirs[i]._teardown();
    if (process.env.NODE_ENV !== 'production' && !destroying) {
      vm._directives.$remove(dirs[i]);
    }
  }
}

/**
 * Compile link props on an instance.
 *
 * @param {Vue} vm
 * @param {Element} el
 * @param {Object} props
 * @param {Object} [scope]
 * @return {Function}
 */

function compileAndLinkProps(vm, el, props, scope) {
  var propsLinkFn = compileProps(el, props, vm);
  var propDirs = linkAndCapture(function () {
    propsLinkFn(vm, scope);
  }, vm);
  return makeUnlinkFn(vm, propDirs);
}

/**
 * Compile the root element of an instance.
 *
 * 1. attrs on context container (context scope)
 * 2. attrs on the component template root node, if
 *    replace:true (child scope)
 *
 * If this is a fragment instance, we only need to compile 1.
 *
 * @param {Element} el
 * @param {Object} options
 * @param {Object} contextOptions
 * @return {Function}
 */

function compileRoot(el, options, contextOptions) {
  var containerAttrs = options._containerAttrs;
  var replacerAttrs = options._replacerAttrs;
  var contextLinkFn, replacerLinkFn;

  // only need to compile other attributes for
  // non-fragment instances
  if (el.nodeType !== 11) {
    // for components, container and replacer need to be
    // compiled separately and linked in different scopes.
    if (options._asComponent) {
      // 2. container attributes
      if (containerAttrs && contextOptions) {
        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
      }
      if (replacerAttrs) {
        // 3. replacer attributes
        replacerLinkFn = compileDirectives(replacerAttrs, options);
      }
    } else {
      // non-component, just compile as a normal element.
      replacerLinkFn = compileDirectives(el.attributes, options);
    }
  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
    // warn container directives for fragment instances
    var names = containerAttrs.filter(function (attr) {
      // allow vue-loader/vueify scoped css attributes
      return attr.name.indexOf('_v-') < 0 &&
      // allow event listeners
      !onRE.test(attr.name) &&
      // allow slots
      attr.name !== 'slot';
    }).map(function (attr) {
      return '"' + attr.name + '"';
    });
    if (names.length) {
      var plural = names.length > 1;
      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
    }
  }

  options._containerAttrs = options._replacerAttrs = null;
  return function rootLinkFn(vm, el, scope) {
    // link context scope dirs
    var context = vm._context;
    var contextDirs;
    if (context && contextLinkFn) {
      contextDirs = linkAndCapture(function () {
        contextLinkFn(context, el, null, scope);
      }, context);
    }

    // link self
    var selfDirs = linkAndCapture(function () {
      if (replacerLinkFn) replacerLinkFn(vm, el);
    }, vm);

    // return the unlink function that tearsdown context
    // container directives.
    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
  };
}

/**
 * Compile a node and return a nodeLinkFn based on the
 * node type.
 *
 * @param {Node} node
 * @param {Object} options
 * @return {Function|null}
 */

function compileNode(node, options) {
  var type = node.nodeType;
  if (type === 1 && !isScript(node)) {
    return compileElement(node, options);
  } else if (type === 3 && node.data.trim()) {
    return compileTextNode(node, options);
  } else {
    return null;
  }
}

/**
 * Compile an element and return a nodeLinkFn.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Function|null}
 */

function compileElement(el, options) {
  // preprocess textareas.
  // textarea treats its text content as the initial value.
  // just bind it as an attr directive for value.
  if (el.tagName === 'TEXTAREA') {
    var tokens = parseText(el.value);
    if (tokens) {
      el.setAttribute(':value', tokensToExp(tokens));
      el.value = '';
    }
  }
  var linkFn;
  var hasAttrs = el.hasAttributes();
  var attrs = hasAttrs && toArray(el.attributes);
  // check terminal directives (for & if)
  if (hasAttrs) {
    linkFn = checkTerminalDirectives(el, attrs, options);
  }
  // check element directives
  if (!linkFn) {
    linkFn = checkElementDirectives(el, options);
  }
  // check component
  if (!linkFn) {
    linkFn = checkComponent(el, options);
  }
  // normal directives
  if (!linkFn && hasAttrs) {
    linkFn = compileDirectives(attrs, options);
  }
  return linkFn;
}

/**
 * Compile a textNode and return a nodeLinkFn.
 *
 * @param {TextNode} node
 * @param {Object} options
 * @return {Function|null} textNodeLinkFn
 */

function compileTextNode(node, options) {
  // skip marked text nodes
  if (node._skip) {
    return removeText;
  }

  var tokens = parseText(node.wholeText);
  if (!tokens) {
    return null;
  }

  // mark adjacent text nodes as skipped,
  // because we are using node.wholeText to compile
  // all adjacent text nodes together. This fixes
  // issues in IE where sometimes it splits up a single
  // text node into multiple ones.
  var next = node.nextSibling;
  while (next && next.nodeType === 3) {
    next._skip = true;
    next = next.nextSibling;
  }

  var frag = document.createDocumentFragment();
  var el, token;
  for (var i = 0, l = tokens.length; i < l; i++) {
    token = tokens[i];
    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
    frag.appendChild(el);
  }
  return makeTextNodeLinkFn(tokens, frag, options);
}

/**
 * Linker for an skipped text node.
 *
 * @param {Vue} vm
 * @param {Text} node
 */

function removeText(vm, node) {
  remove(node);
}

/**
 * Process a single text token.
 *
 * @param {Object} token
 * @param {Object} options
 * @return {Node}
 */

function processTextToken(token, options) {
  var el;
  if (token.oneTime) {
    el = document.createTextNode(token.value);
  } else {
    if (token.html) {
      el = document.createComment('v-html');
      setTokenType('html');
    } else {
      // IE will clean up empty textNodes during
      // frag.cloneNode(true), so we have to give it
      // something here...
      el = document.createTextNode(' ');
      setTokenType('text');
    }
  }
  function setTokenType(type) {
    if (token.descriptor) return;
    var parsed = parseDirective(token.value);
    token.descriptor = {
      name: type,
      def: directives[type],
      expression: parsed.expression,
      filters: parsed.filters
    };
  }
  return el;
}

/**
 * Build a function that processes a textNode.
 *
 * @param {Array<Object>} tokens
 * @param {DocumentFragment} frag
 */

function makeTextNodeLinkFn(tokens, frag) {
  return function textNodeLinkFn(vm, el, host, scope) {
    var fragClone = frag.cloneNode(true);
    var childNodes = toArray(fragClone.childNodes);
    var token, value, node;
    for (var i = 0, l = tokens.length; i < l; i++) {
      token = tokens[i];
      value = token.value;
      if (token.tag) {
        node = childNodes[i];
        if (token.oneTime) {
          value = (scope || vm).$eval(value);
          if (token.html) {
            replace(node, parseTemplate(value, true));
          } else {
            node.data = _toString(value);
          }
        } else {
          vm._bindDir(token.descriptor, node, host, scope);
        }
      }
    }
    replace(el, fragClone);
  };
}

/**
 * Compile a node list and return a childLinkFn.
 *
 * @param {NodeList} nodeList
 * @param {Object} options
 * @return {Function|undefined}
 */

function compileNodeList(nodeList, options) {
  var linkFns = [];
  var nodeLinkFn, childLinkFn, node;
  for (var i = 0, l = nodeList.length; i < l; i++) {
    node = nodeList[i];
    nodeLinkFn = compileNode(node, options);
    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
    linkFns.push(nodeLinkFn, childLinkFn);
  }
  return linkFns.length ? makeChildLinkFn(linkFns) : null;
}

/**
 * Make a child link function for a node's childNodes.
 *
 * @param {Array<Function>} linkFns
 * @return {Function} childLinkFn
 */

function makeChildLinkFn(linkFns) {
  return function childLinkFn(vm, nodes, host, scope, frag) {
    var node, nodeLinkFn, childrenLinkFn;
    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
      node = nodes[n];
      nodeLinkFn = linkFns[i++];
      childrenLinkFn = linkFns[i++];
      // cache childNodes before linking parent, fix #657
      var childNodes = toArray(node.childNodes);
      if (nodeLinkFn) {
        nodeLinkFn(vm, node, host, scope, frag);
      }
      if (childrenLinkFn) {
        childrenLinkFn(vm, childNodes, host, scope, frag);
      }
    }
  };
}

/**
 * Check for element directives (custom elements that should
 * be resovled as terminal directives).
 *
 * @param {Element} el
 * @param {Object} options
 */

function checkElementDirectives(el, options) {
  var tag = el.tagName.toLowerCase();
  if (commonTagRE.test(tag)) {
    return;
  }
  var def = resolveAsset(options, 'elementDirectives', tag);
  if (def) {
    return makeTerminalNodeLinkFn(el, tag, '', options, def);
  }
}

/**
 * Check if an element is a component. If yes, return
 * a component link function.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Function|undefined}
 */

function checkComponent(el, options) {
  var component = checkComponentAttr(el, options);
  if (component) {
    var ref = findRef(el);
    var descriptor = {
      name: 'component',
      ref: ref,
      expression: component.id,
      def: internalDirectives.component,
      modifiers: {
        literal: !component.dynamic
      }
    };
    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
      if (ref) {
        defineReactive((scope || vm).$refs, ref, null);
      }
      vm._bindDir(descriptor, el, host, scope, frag);
    };
    componentLinkFn.terminal = true;
    return componentLinkFn;
  }
}

/**
 * Check an element for terminal directives in fixed order.
 * If it finds one, return a terminal link function.
 *
 * @param {Element} el
 * @param {Array} attrs
 * @param {Object} options
 * @return {Function} terminalLinkFn
 */

function checkTerminalDirectives(el, attrs, options) {
  // skip v-pre
  if (getAttr(el, 'v-pre') !== null) {
    return skip;
  }
  // skip v-else block, but only if following v-if
  if (el.hasAttribute('v-else')) {
    var prev = el.previousElementSibling;
    if (prev && prev.hasAttribute('v-if')) {
      return skip;
    }
  }

  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
  for (var i = 0, j = attrs.length; i < j; i++) {
    attr = attrs[i];
    name = attr.name.replace(modifierRE, '');
    if (matched = name.match(dirAttrRE)) {
      def = resolveAsset(options, 'directives', matched[1]);
      if (def && def.terminal) {
        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
          termDef = def;
          rawName = attr.name;
          modifiers = parseModifiers(attr.name);
          value = attr.value;
          dirName = matched[1];
          arg = matched[2];
        }
      }
    }
  }

  if (termDef) {
    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
  }
}

function skip() {}
skip.terminal = true;

/**
 * Build a node link function for a terminal directive.
 * A terminal link function terminates the current
 * compilation recursion and handles compilation of the
 * subtree in the directive.
 *
 * @param {Element} el
 * @param {String} dirName
 * @param {String} value
 * @param {Object} options
 * @param {Object} def
 * @param {String} [rawName]
 * @param {String} [arg]
 * @param {Object} [modifiers]
 * @return {Function} terminalLinkFn
 */

function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
  var parsed = parseDirective(value);
  var descriptor = {
    name: dirName,
    arg: arg,
    expression: parsed.expression,
    filters: parsed.filters,
    raw: value,
    attr: rawName,
    modifiers: modifiers,
    def: def
  };
  // check ref for v-for and router-view
  if (dirName === 'for' || dirName === 'router-view') {
    descriptor.ref = findRef(el);
  }
  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
    if (descriptor.ref) {
      defineReactive((scope || vm).$refs, descriptor.ref, null);
    }
    vm._bindDir(descriptor, el, host, scope, frag);
  };
  fn.terminal = true;
  return fn;
}

/**
 * Compile the directives on an element and return a linker.
 *
 * @param {Array|NamedNodeMap} attrs
 * @param {Object} options
 * @return {Function}
 */

function compileDirectives(attrs, options) {
  var i = attrs.length;
  var dirs = [];
  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
  while (i--) {
    attr = attrs[i];
    name = rawName = attr.name;
    value = rawValue = attr.value;
    tokens = parseText(value);
    // reset arg
    arg = null;
    // check modifiers
    modifiers = parseModifiers(name);
    name = name.replace(modifierRE, '');

    // attribute interpolations
    if (tokens) {
      value = tokensToExp(tokens);
      arg = name;
      pushDir('bind', directives.bind, tokens);
      // warn against mixing mustaches with v-bind
      if (process.env.NODE_ENV !== 'production') {
        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
          return attr.name === ':class' || attr.name === 'v-bind:class';
        })) {
          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
        }
      }
    } else

      // special attribute: transition
      if (transitionRE.test(name)) {
        modifiers.literal = !bindRE.test(name);
        pushDir('transition', internalDirectives.transition);
      } else

        // event handlers
        if (onRE.test(name)) {
          arg = name.replace(onRE, '');
          pushDir('on', directives.on);
        } else

          // attribute bindings
          if (bindRE.test(name)) {
            dirName = name.replace(bindRE, '');
            if (dirName === 'style' || dirName === 'class') {
              pushDir(dirName, internalDirectives[dirName]);
            } else {
              arg = dirName;
              pushDir('bind', directives.bind);
            }
          } else

            // normal directives
            if (matched = name.match(dirAttrRE)) {
              dirName = matched[1];
              arg = matched[2];

              // skip v-else (when used with v-show)
              if (dirName === 'else') {
                continue;
              }

              dirDef = resolveAsset(options, 'directives', dirName, true);
              if (dirDef) {
                pushDir(dirName, dirDef);
              }
            }
  }

  /**
   * Push a directive.
   *
   * @param {String} dirName
   * @param {Object|Function} def
   * @param {Array} [interpTokens]
   */

  function pushDir(dirName, def, interpTokens) {
    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
    var parsed = !hasOneTimeToken && parseDirective(value);
    dirs.push({
      name: dirName,
      attr: rawName,
      raw: rawValue,
      def: def,
      arg: arg,
      modifiers: modifiers,
      // conversion from interpolation strings with one-time token
      // to expression is differed until directive bind time so that we
      // have access to the actual vm context for one-time bindings.
      expression: parsed && parsed.expression,
      filters: parsed && parsed.filters,
      interp: interpTokens,
      hasOneTime: hasOneTimeToken
    });
  }

  if (dirs.length) {
    return makeNodeLinkFn(dirs);
  }
}

/**
 * Parse modifiers from directive attribute name.
 *
 * @param {String} name
 * @return {Object}
 */

function parseModifiers(name) {
  var res = Object.create(null);
  var match = name.match(modifierRE);
  if (match) {
    var i = match.length;
    while (i--) {
      res[match[i].slice(1)] = true;
    }
  }
  return res;
}

/**
 * Build a link function for all directives on a single node.
 *
 * @param {Array} directives
 * @return {Function} directivesLinkFn
 */

function makeNodeLinkFn(directives) {
  return function nodeLinkFn(vm, el, host, scope, frag) {
    // reverse apply because it's sorted low to high
    var i = directives.length;
    while (i--) {
      vm._bindDir(directives[i], el, host, scope, frag);
    }
  };
}

/**
 * Check if an interpolation string contains one-time tokens.
 *
 * @param {Array} tokens
 * @return {Boolean}
 */

function hasOneTime(tokens) {
  var i = tokens.length;
  while (i--) {
    if (tokens[i].oneTime) return true;
  }
}

function isScript(el) {
  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
}

var specialCharRE = /[^\w\-:\.]/;

/**
 * Process an element or a DocumentFragment based on a
 * instance option object. This allows us to transclude
 * a template node/fragment before the instance is created,
 * so the processed fragment can then be cloned and reused
 * in v-for.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Element|DocumentFragment}
 */

function transclude(el, options) {
  // extract container attributes to pass them down
  // to compiler, because they need to be compiled in
  // parent scope. we are mutating the options object here
  // assuming the same object will be used for compile
  // right after this.
  if (options) {
    options._containerAttrs = extractAttrs(el);
  }
  // for template tags, what we want is its content as
  // a documentFragment (for fragment instances)
  if (isTemplate(el)) {
    el = parseTemplate(el);
  }
  if (options) {
    if (options._asComponent && !options.template) {
      options.template = '<slot></slot>';
    }
    if (options.template) {
      options._content = extractContent(el);
      el = transcludeTemplate(el, options);
    }
  }
  if (isFragment(el)) {
    // anchors for fragment instance
    // passing in `persist: true` to avoid them being
    // discarded by IE during template cloning
    prepend(createAnchor('v-start', true), el);
    el.appendChild(createAnchor('v-end', true));
  }
  return el;
}

/**
 * Process the template option.
 * If the replace option is true this will swap the $el.
 *
 * @param {Element} el
 * @param {Object} options
 * @return {Element|DocumentFragment}
 */

function transcludeTemplate(el, options) {
  var template = options.template;
  var frag = parseTemplate(template, true);
  if (frag) {
    var replacer = frag.firstChild;
    var tag = replacer.tagName && replacer.tagName.toLowerCase();
    if (options.replace) {
      /* istanbul ignore if */
      if (el === document.body) {
        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
      }
      // there are many cases where the instance must
      // become a fragment instance: basically anything that
      // can create more than 1 root nodes.
      if (
      // multi-children template
      frag.childNodes.length > 1 ||
      // non-element template
      replacer.nodeType !== 1 ||
      // single nested component
      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
      // element directive
      resolveAsset(options, 'elementDirectives', tag) ||
      // for block
      replacer.hasAttribute('v-for') ||
      // if block
      replacer.hasAttribute('v-if')) {
        return frag;
      } else {
        options._replacerAttrs = extractAttrs(replacer);
        mergeAttrs(el, replacer);
        return replacer;
      }
    } else {
      el.appendChild(frag);
      return el;
    }
  } else {
    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
  }
}

/**
 * Helper to extract a component container's attributes
 * into a plain object array.
 *
 * @param {Element} el
 * @return {Array}
 */

function extractAttrs(el) {
  if (el.nodeType === 1 && el.hasAttributes()) {
    return toArray(el.attributes);
  }
}

/**
 * Merge the attributes of two elements, and make sure
 * the class names are merged properly.
 *
 * @param {Element} from
 * @param {Element} to
 */

function mergeAttrs(from, to) {
  var attrs = from.attributes;
  var i = attrs.length;
  var name, value;
  while (i--) {
    name = attrs[i].name;
    value = attrs[i].value;
    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
      to.setAttribute(name, value);
    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
      value.split(/\s+/).forEach(function (cls) {
        addClass(to, cls);
      });
    }
  }
}

/**
 * Scan and determine slot content distribution.
 * We do this during transclusion instead at compile time so that
 * the distribution is decoupled from the compilation order of
 * the slots.
 *
 * @param {Element|DocumentFragment} template
 * @param {Element} content
 * @param {Vue} vm
 */

function resolveSlots(vm, content) {
  if (!content) {
    return;
  }
  var contents = vm._slotContents = Object.create(null);
  var el, name;
  for (var i = 0, l = content.children.length; i < l; i++) {
    el = content.children[i];
    /* eslint-disable no-cond-assign */
    if (name = el.getAttribute('slot')) {
      (contents[name] || (contents[name] = [])).push(el);
    }
    /* eslint-enable no-cond-assign */
    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
      warn('The "slot" attribute must be static.', vm.$parent);
    }
  }
  for (name in contents) {
    contents[name] = extractFragment(contents[name], content);
  }
  if (content.hasChildNodes()) {
    var nodes = content.childNodes;
    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
      return;
    }
    contents['default'] = extractFragment(content.childNodes, content);
  }
}

/**
 * Extract qualified content nodes from a node list.
 *
 * @param {NodeList} nodes
 * @return {DocumentFragment}
 */

function extractFragment(nodes, parent) {
  var frag = document.createDocumentFragment();
  nodes = toArray(nodes);
  for (var i = 0, l = nodes.length; i < l; i++) {
    var node = nodes[i];
    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
      parent.removeChild(node);
      node = parseTemplate(node, true);
    }
    frag.appendChild(node);
  }
  return frag;
}



var compiler = Object.freeze({
	compile: compile,
	compileAndLinkProps: compileAndLinkProps,
	compileRoot: compileRoot,
	transclude: transclude,
	resolveSlots: resolveSlots
});

function stateMixin (Vue) {
  /**
   * Accessor for `$data` property, since setting $data
   * requires observing the new object and updating
   * proxied properties.
   */

  Object.defineProperty(Vue.prototype, '$data', {
    get: function get() {
      return this._data;
    },
    set: function set(newData) {
      if (newData !== this._data) {
        this._setData(newData);
      }
    }
  });

  /**
   * Setup the scope of an instance, which contains:
   * - observed data
   * - computed properties
   * - user methods
   * - meta properties
   */

  Vue.prototype._initState = function () {
    this._initProps();
    this._initMeta();
    this._initMethods();
    this._initData();
    this._initComputed();
  };

  /**
   * Initialize props.
   */

  Vue.prototype._initProps = function () {
    var options = this.$options;
    var el = options.el;
    var props = options.props;
    if (props && !el) {
      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
    }
    // make sure to convert string selectors into element now
    el = options.el = query(el);
    this._propsUnlinkFn = el && el.nodeType === 1 && props
    // props must be linked in proper scope if inside v-for
    ? compileAndLinkProps(this, el, props, this._scope) : null;
  };

  /**
   * Initialize the data.
   */

  Vue.prototype._initData = function () {
    var dataFn = this.$options.data;
    var data = this._data = dataFn ? dataFn() : {};
    if (!isPlainObject(data)) {
      data = {};
      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
    }
    var props = this._props;
    // proxy data on instance
    var keys = Object.keys(data);
    var i, key;
    i = keys.length;
    while (i--) {
      key = keys[i];
      // there are two scenarios where we can proxy a data key:
      // 1. it's not already defined as a prop
      // 2. it's provided via a instantiation option AND there are no
      //    template prop present
      if (!props || !hasOwn(props, key)) {
        this._proxy(key);
      } else if (process.env.NODE_ENV !== 'production') {
        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
      }
    }
    // observe data
    observe(data, this);
  };

  /**
   * Swap the instance's $data. Called in $data's setter.
   *
   * @param {Object} newData
   */

  Vue.prototype._setData = function (newData) {
    newData = newData || {};
    var oldData = this._data;
    this._data = newData;
    var keys, key, i;
    // unproxy keys not present in new data
    keys = Object.keys(oldData);
    i = keys.length;
    while (i--) {
      key = keys[i];
      if (!(key in newData)) {
        this._unproxy(key);
      }
    }
    // proxy keys not already proxied,
    // and trigger change for changed values
    keys = Object.keys(newData);
    i = keys.length;
    while (i--) {
      key = keys[i];
      if (!hasOwn(this, key)) {
        // new property
        this._proxy(key);
      }
    }
    oldData.__ob__.removeVm(this);
    observe(newData, this);
    this._digest();
  };

  /**
   * Proxy a property, so that
   * vm.prop === vm._data.prop
   *
   * @param {String} key
   */

  Vue.prototype._proxy = function (key) {
    if (!isReserved(key)) {
      // need to store ref to self here
      // because these getter/setters might
      // be called by child scopes via
      // prototype inheritance.
      var self = this;
      Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter() {
          return self._data[key];
        },
        set: function proxySetter(val) {
          self._data[key] = val;
        }
      });
    }
  };

  /**
   * Unproxy a property.
   *
   * @param {String} key
   */

  Vue.prototype._unproxy = function (key) {
    if (!isReserved(key)) {
      delete this[key];
    }
  };

  /**
   * Force update on every watcher in scope.
   */

  Vue.prototype._digest = function () {
    for (var i = 0, l = this._watchers.length; i < l; i++) {
      this._watchers[i].update(true); // shallow updates
    }
  };

  /**
   * Setup computed properties. They are essentially
   * special getter/setters
   */

  function noop() {}
  Vue.prototype._initComputed = function () {
    var computed = this.$options.computed;
    if (computed) {
      for (var key in computed) {
        var userDef = computed[key];
        var def = {
          enumerable: true,
          configurable: true
        };
        if (typeof userDef === 'function') {
          def.get = makeComputedGetter(userDef, this);
          def.set = noop;
        } else {
          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
          def.set = userDef.set ? bind(userDef.set, this) : noop;
        }
        Object.defineProperty(this, key, def);
      }
    }
  };

  function makeComputedGetter(getter, owner) {
    var watcher = new Watcher(owner, getter, null, {
      lazy: true
    });
    return function computedGetter() {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    };
  }

  /**
   * Setup instance methods. Methods must be bound to the
   * instance since they might be passed down as a prop to
   * child components.
   */

  Vue.prototype._initMethods = function () {
    var methods = this.$options.methods;
    if (methods) {
      for (var key in methods) {
        this[key] = bind(methods[key], this);
      }
    }
  };

  /**
   * Initialize meta information like $index, $key & $value.
   */

  Vue.prototype._initMeta = function () {
    var metas = this.$options._meta;
    if (metas) {
      for (var key in metas) {
        defineReactive(this, key, metas[key]);
      }
    }
  };
}

var eventRE = /^v-on:|^@/;

function eventsMixin (Vue) {
  /**
   * Setup the instance's option events & watchers.
   * If the value is a string, we pull it from the
   * instance's methods by name.
   */

  Vue.prototype._initEvents = function () {
    var options = this.$options;
    if (options._asComponent) {
      registerComponentEvents(this, options.el);
    }
    registerCallbacks(this, '$on', options.events);
    registerCallbacks(this, '$watch', options.watch);
  };

  /**
   * Register v-on events on a child component
   *
   * @param {Vue} vm
   * @param {Element} el
   */

  function registerComponentEvents(vm, el) {
    var attrs = el.attributes;
    var name, value, handler;
    for (var i = 0, l = attrs.length; i < l; i++) {
      name = attrs[i].name;
      if (eventRE.test(name)) {
        name = name.replace(eventRE, '');
        // force the expression into a statement so that
        // it always dynamically resolves the method to call (#2670)
        // kinda ugly hack, but does the job.
        value = attrs[i].value;
        if (isSimplePath(value)) {
          value += '.apply(this, $arguments)';
        }
        handler = (vm._scope || vm._context).$eval(value, true);
        handler._fromParent = true;
        vm.$on(name.replace(eventRE), handler);
      }
    }
  }

  /**
   * Register callbacks for option events and watchers.
   *
   * @param {Vue} vm
   * @param {String} action
   * @param {Object} hash
   */

  function registerCallbacks(vm, action, hash) {
    if (!hash) return;
    var handlers, key, i, j;
    for (key in hash) {
      handlers = hash[key];
      if (isArray(handlers)) {
        for (i = 0, j = handlers.length; i < j; i++) {
          register(vm, action, key, handlers[i]);
        }
      } else {
        register(vm, action, key, handlers);
      }
    }
  }

  /**
   * Helper to register an event/watch callback.
   *
   * @param {Vue} vm
   * @param {String} action
   * @param {String} key
   * @param {Function|String|Object} handler
   * @param {Object} [options]
   */

  function register(vm, action, key, handler, options) {
    var type = typeof handler;
    if (type === 'function') {
      vm[action](key, handler, options);
    } else if (type === 'string') {
      var methods = vm.$options.methods;
      var method = methods && methods[handler];
      if (method) {
        vm[action](key, method, options);
      } else {
        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
      }
    } else if (handler && type === 'object') {
      register(vm, action, key, handler.handler, handler);
    }
  }

  /**
   * Setup recursive attached/detached calls
   */

  Vue.prototype._initDOMHooks = function () {
    this.$on('hook:attached', onAttached);
    this.$on('hook:detached', onDetached);
  };

  /**
   * Callback to recursively call attached hook on children
   */

  function onAttached() {
    if (!this._isAttached) {
      this._isAttached = true;
      this.$children.forEach(callAttach);
    }
  }

  /**
   * Iterator to call attached hook
   *
   * @param {Vue} child
   */

  function callAttach(child) {
    if (!child._isAttached && inDoc(child.$el)) {
      child._callHook('attached');
    }
  }

  /**
   * Callback to recursively call detached hook on children
   */

  function onDetached() {
    if (this._isAttached) {
      this._isAttached = false;
      this.$children.forEach(callDetach);
    }
  }

  /**
   * Iterator to call detached hook
   *
   * @param {Vue} child
   */

  function callDetach(child) {
    if (child._isAttached && !inDoc(child.$el)) {
      child._callHook('detached');
    }
  }

  /**
   * Trigger all handlers for a hook
   *
   * @param {String} hook
   */

  Vue.prototype._callHook = function (hook) {
    this.$emit('pre-hook:' + hook);
    var handlers = this.$options[hook];
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        handlers[i].call(this);
      }
    }
    this.$emit('hook:' + hook);
  };
}

function noop$1() {}

/**
 * A directive links a DOM element with a piece of data,
 * which is the result of evaluating an expression.
 * It registers a watcher with the expression and calls
 * the DOM update function when a change is triggered.
 *
 * @param {Object} descriptor
 *                 - {String} name
 *                 - {Object} def
 *                 - {String} expression
 *                 - {Array<Object>} [filters]
 *                 - {Object} [modifiers]
 *                 - {Boolean} literal
 *                 - {String} attr
 *                 - {String} arg
 *                 - {String} raw
 *                 - {String} [ref]
 *                 - {Array<Object>} [interp]
 *                 - {Boolean} [hasOneTime]
 * @param {Vue} vm
 * @param {Node} el
 * @param {Vue} [host] - transclusion host component
 * @param {Object} [scope] - v-for scope
 * @param {Fragment} [frag] - owner fragment
 * @constructor
 */
function Directive(descriptor, vm, el, host, scope, frag) {
  this.vm = vm;
  this.el = el;
  // copy descriptor properties
  this.descriptor = descriptor;
  this.name = descriptor.name;
  this.expression = descriptor.expression;
  this.arg = descriptor.arg;
  this.modifiers = descriptor.modifiers;
  this.filters = descriptor.filters;
  this.literal = this.modifiers && this.modifiers.literal;
  // private
  this._locked = false;
  this._bound = false;
  this._listeners = null;
  // link context
  this._host = host;
  this._scope = scope;
  this._frag = frag;
  // store directives on node in dev mode
  if (process.env.NODE_ENV !== 'production' && this.el) {
    this.el._vue_directives = this.el._vue_directives || [];
    this.el._vue_directives.push(this);
  }
}

/**
 * Initialize the directive, mixin definition properties,
 * setup the watcher, call definition bind() and update()
 * if present.
 */

Directive.prototype._bind = function () {
  var name = this.name;
  var descriptor = this.descriptor;

  // remove attribute
  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
    var attr = descriptor.attr || 'v-' + name;
    this.el.removeAttribute(attr);
  }

  // copy def properties
  var def = descriptor.def;
  if (typeof def === 'function') {
    this.update = def;
  } else {
    extend(this, def);
  }

  // setup directive params
  this._setupParams();

  // initial bind
  if (this.bind) {
    this.bind();
  }
  this._bound = true;

  if (this.literal) {
    this.update && this.update(descriptor.raw);
  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
    // wrapped updater for context
    var dir = this;
    if (this.update) {
      this._update = function (val, oldVal) {
        if (!dir._locked) {
          dir.update(val, oldVal);
        }
      };
    } else {
      this._update = noop$1;
    }
    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
    {
      filters: this.filters,
      twoWay: this.twoWay,
      deep: this.deep,
      preProcess: preProcess,
      postProcess: postProcess,
      scope: this._scope
    });
    // v-model with inital inline value need to sync back to
    // model instead of update to DOM on init. They would
    // set the afterBind hook to indicate that.
    if (this.afterBind) {
      this.afterBind();
    } else if (this.update) {
      this.update(watcher.value);
    }
  }
};

/**
 * Setup all param attributes, e.g. track-by,
 * transition-mode, etc...
 */

Directive.prototype._setupParams = function () {
  if (!this.params) {
    return;
  }
  var params = this.params;
  // swap the params array with a fresh object.
  this.params = Object.create(null);
  var i = params.length;
  var key, val, mappedKey;
  while (i--) {
    key = hyphenate(params[i]);
    mappedKey = camelize(key);
    val = getBindAttr(this.el, key);
    if (val != null) {
      // dynamic
      this._setupParamWatcher(mappedKey, val);
    } else {
      // static
      val = getAttr(this.el, key);
      if (val != null) {
        this.params[mappedKey] = val === '' ? true : val;
      }
    }
  }
};

/**
 * Setup a watcher for a dynamic param.
 *
 * @param {String} key
 * @param {String} expression
 */

Directive.prototype._setupParamWatcher = function (key, expression) {
  var self = this;
  var called = false;
  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
    self.params[key] = val;
    // since we are in immediate mode,
    // only call the param change callbacks if this is not the first update.
    if (called) {
      var cb = self.paramWatchers && self.paramWatchers[key];
      if (cb) {
        cb.call(self, val, oldVal);
      }
    } else {
      called = true;
    }
  }, {
    immediate: true,
    user: false
  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
};

/**
 * Check if the directive is a function caller
 * and if the expression is a callable one. If both true,
 * we wrap up the expression and use it as the event
 * handler.
 *
 * e.g. on-click="a++"
 *
 * @return {Boolean}
 */

Directive.prototype._checkStatement = function () {
  var expression = this.expression;
  if (expression && this.acceptStatement && !isSimplePath(expression)) {
    var fn = parseExpression(expression).get;
    var scope = this._scope || this.vm;
    var handler = function handler(e) {
      scope.$event = e;
      fn.call(scope, scope);
      scope.$event = null;
    };
    if (this.filters) {
      handler = scope._applyFilters(handler, null, this.filters);
    }
    this.update(handler);
    return true;
  }
};

/**
 * Set the corresponding value with the setter.
 * This should only be used in two-way directives
 * e.g. v-model.
 *
 * @param {*} value
 * @public
 */

Directive.prototype.set = function (value) {
  /* istanbul ignore else */
  if (this.twoWay) {
    this._withLock(function () {
      this._watcher.set(value);
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn('Directive.set() can only be used inside twoWay' + 'directives.');
  }
};

/**
 * Execute a function while preventing that function from
 * triggering updates on this directive instance.
 *
 * @param {Function} fn
 */

Directive.prototype._withLock = function (fn) {
  var self = this;
  self._locked = true;
  fn.call(self);
  nextTick(function () {
    self._locked = false;
  });
};

/**
 * Convenience method that attaches a DOM event listener
 * to the directive element and autometically tears it down
 * during unbind.
 *
 * @param {String} event
 * @param {Function} handler
 * @param {Boolean} [useCapture]
 */

Directive.prototype.on = function (event, handler, useCapture) {
  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
};

/**
 * Teardown the watcher and call unbind.
 */

Directive.prototype._teardown = function () {
  if (this._bound) {
    this._bound = false;
    if (this.unbind) {
      this.unbind();
    }
    if (this._watcher) {
      this._watcher.teardown();
    }
    var listeners = this._listeners;
    var i;
    if (listeners) {
      i = listeners.length;
      while (i--) {
        off(this.el, listeners[i][0], listeners[i][1]);
      }
    }
    var unwatchFns = this._paramUnwatchFns;
    if (unwatchFns) {
      i = unwatchFns.length;
      while (i--) {
        unwatchFns[i]();
      }
    }
    if (process.env.NODE_ENV !== 'production' && this.el) {
      this.el._vue_directives.$remove(this);
    }
    this.vm = this.el = this._watcher = this._listeners = null;
  }
};

function lifecycleMixin (Vue) {
  /**
   * Update v-ref for component.
   *
   * @param {Boolean} remove
   */

  Vue.prototype._updateRef = function (remove) {
    var ref = this.$options._ref;
    if (ref) {
      var refs = (this._scope || this._context).$refs;
      if (remove) {
        if (refs[ref] === this) {
          refs[ref] = null;
        }
      } else {
        refs[ref] = this;
      }
    }
  };

  /**
   * Transclude, compile and link element.
   *
   * If a pre-compiled linker is available, that means the
   * passed in element will be pre-transcluded and compiled
   * as well - all we need to do is to call the linker.
   *
   * Otherwise we need to call transclude/compile/link here.
   *
   * @param {Element} el
   */

  Vue.prototype._compile = function (el) {
    var options = this.$options;

    // transclude and init element
    // transclude can potentially replace original
    // so we need to keep reference; this step also injects
    // the template and caches the original attributes
    // on the container node and replacer node.
    var original = el;
    el = transclude(el, options);
    this._initElement(el);

    // handle v-pre on root node (#2026)
    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
      return;
    }

    // root is always compiled per-instance, because
    // container attrs and props can be different every time.
    var contextOptions = this._context && this._context.$options;
    var rootLinker = compileRoot(el, options, contextOptions);

    // resolve slot distribution
    resolveSlots(this, options._content);

    // compile and link the rest
    var contentLinkFn;
    var ctor = this.constructor;
    // component compilation can be cached
    // as long as it's not using inline-template
    if (options._linkerCachable) {
      contentLinkFn = ctor.linker;
      if (!contentLinkFn) {
        contentLinkFn = ctor.linker = compile(el, options);
      }
    }

    // link phase
    // make sure to link root with prop scope!
    var rootUnlinkFn = rootLinker(this, el, this._scope);
    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

    // register composite unlink function
    // to be called during instance destruction
    this._unlinkFn = function () {
      rootUnlinkFn();
      // passing destroying: true to avoid searching and
      // splicing the directives
      contentUnlinkFn(true);
    };

    // finally replace original
    if (options.replace) {
      replace(original, el);
    }

    this._isCompiled = true;
    this._callHook('compiled');
  };

  /**
   * Initialize instance element. Called in the public
   * $mount() method.
   *
   * @param {Element} el
   */

  Vue.prototype._initElement = function (el) {
    if (isFragment(el)) {
      this._isFragment = true;
      this.$el = this._fragmentStart = el.firstChild;
      this._fragmentEnd = el.lastChild;
      // set persisted text anchors to empty
      if (this._fragmentStart.nodeType === 3) {
        this._fragmentStart.data = this._fragmentEnd.data = '';
      }
      this._fragment = el;
    } else {
      this.$el = el;
    }
    this.$el.__vue__ = this;
    this._callHook('beforeCompile');
  };

  /**
   * Create and bind a directive to an element.
   *
   * @param {Object} descriptor - parsed directive descriptor
   * @param {Node} node   - target node
   * @param {Vue} [host] - transclusion host component
   * @param {Object} [scope] - v-for scope
   * @param {Fragment} [frag] - owner fragment
   */

  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
  };

  /**
   * Teardown an instance, unobserves the data, unbind all the
   * directives, turn off all the event listeners, etc.
   *
   * @param {Boolean} remove - whether to remove the DOM node.
   * @param {Boolean} deferCleanup - if true, defer cleanup to
   *                                 be called later
   */

  Vue.prototype._destroy = function (remove, deferCleanup) {
    if (this._isBeingDestroyed) {
      if (!deferCleanup) {
        this._cleanup();
      }
      return;
    }

    var destroyReady;
    var pendingRemoval;

    var self = this;
    // Cleanup should be called either synchronously or asynchronoysly as
    // callback of this.$remove(), or if remove and deferCleanup are false.
    // In any case it should be called after all other removing, unbinding and
    // turning of is done
    var cleanupIfPossible = function cleanupIfPossible() {
      if (destroyReady && !pendingRemoval && !deferCleanup) {
        self._cleanup();
      }
    };

    // remove DOM element
    if (remove && this.$el) {
      pendingRemoval = true;
      this.$remove(function () {
        pendingRemoval = false;
        cleanupIfPossible();
      });
    }

    this._callHook('beforeDestroy');
    this._isBeingDestroyed = true;
    var i;
    // remove self from parent. only necessary
    // if parent is not being destroyed as well.
    var parent = this.$parent;
    if (parent && !parent._isBeingDestroyed) {
      parent.$children.$remove(this);
      // unregister ref (remove: true)
      this._updateRef(true);
    }
    // destroy all children.
    i = this.$children.length;
    while (i--) {
      this.$children[i].$destroy();
    }
    // teardown props
    if (this._propsUnlinkFn) {
      this._propsUnlinkFn();
    }
    // teardown all directives. this also tearsdown all
    // directive-owned watchers.
    if (this._unlinkFn) {
      this._unlinkFn();
    }
    i = this._watchers.length;
    while (i--) {
      this._watchers[i].teardown();
    }
    // remove reference to self on $el
    if (this.$el) {
      this.$el.__vue__ = null;
    }

    destroyReady = true;
    cleanupIfPossible();
  };

  /**
   * Clean up to ensure garbage collection.
   * This is called after the leave transition if there
   * is any.
   */

  Vue.prototype._cleanup = function () {
    if (this._isDestroyed) {
      return;
    }
    // remove self from owner fragment
    // do it in cleanup so that we can call $destroy with
    // defer right when a fragment is about to be removed.
    if (this._frag) {
      this._frag.children.$remove(this);
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (this._data && this._data.__ob__) {
      this._data.__ob__.removeVm(this);
    }
    // Clean up references to private properties and other
    // instances. preserve reference to _data so that proxy
    // accessors still work. The only potential side effect
    // here is that mutating the instance after it's destroyed
    // may affect the state of other components that are still
    // observing the same object, but that seems to be a
    // reasonable responsibility for the user rather than
    // always throwing an error on them.
    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
    // call the last hook...
    this._isDestroyed = true;
    this._callHook('destroyed');
    // turn off all instance listeners.
    this.$off();
  };
}

function miscMixin (Vue) {
  /**
   * Apply a list of filter (descriptors) to a value.
   * Using plain for loops here because this will be called in
   * the getter of any watcher with filters so it is very
   * performance sensitive.
   *
   * @param {*} value
   * @param {*} [oldValue]
   * @param {Array} filters
   * @param {Boolean} write
   * @return {*}
   */

  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
    var filter, fn, args, arg, offset, i, l, j, k;
    for (i = 0, l = filters.length; i < l; i++) {
      filter = filters[write ? l - i - 1 : i];
      fn = resolveAsset(this.$options, 'filters', filter.name, true);
      if (!fn) continue;
      fn = write ? fn.write : fn.read || fn;
      if (typeof fn !== 'function') continue;
      args = write ? [value, oldValue] : [value];
      offset = write ? 2 : 1;
      if (filter.args) {
        for (j = 0, k = filter.args.length; j < k; j++) {
          arg = filter.args[j];
          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
        }
      }
      value = fn.apply(this, args);
    }
    return value;
  };

  /**
   * Resolve a component, depending on whether the component
   * is defined normally or using an async factory function.
   * Resolves synchronously if already resolved, otherwise
   * resolves asynchronously and caches the resolved
   * constructor on the factory.
   *
   * @param {String|Function} value
   * @param {Function} cb
   */

  Vue.prototype._resolveComponent = function (value, cb) {
    var factory;
    if (typeof value === 'function') {
      factory = value;
    } else {
      factory = resolveAsset(this.$options, 'components', value, true);
    }
    /* istanbul ignore if */
    if (!factory) {
      return;
    }
    // async component factory
    if (!factory.options) {
      if (factory.resolved) {
        // cached
        cb(factory.resolved);
      } else if (factory.requested) {
        // pool callbacks
        factory.pendingCallbacks.push(cb);
      } else {
        factory.requested = true;
        var cbs = factory.pendingCallbacks = [cb];
        factory.call(this, function resolve(res) {
          if (isPlainObject(res)) {
            res = Vue.extend(res);
          }
          // cache resolved
          factory.resolved = res;
          // invoke callbacks
          for (var i = 0, l = cbs.length; i < l; i++) {
            cbs[i](res);
          }
        }, function reject(reason) {
          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
        });
      }
    } else {
      // normal component
      cb(factory);
    }
  };
}

var filterRE$1 = /[^|]\|[^|]/;

function dataAPI (Vue) {
  /**
   * Get the value from an expression on this vm.
   *
   * @param {String} exp
   * @param {Boolean} [asStatement]
   * @return {*}
   */

  Vue.prototype.$get = function (exp, asStatement) {
    var res = parseExpression(exp);
    if (res) {
      if (asStatement) {
        var self = this;
        return function statementHandler() {
          self.$arguments = toArray(arguments);
          var result = res.get.call(self, self);
          self.$arguments = null;
          return result;
        };
      } else {
        try {
          return res.get.call(this, this);
        } catch (e) {}
      }
    }
  };

  /**
   * Set the value from an expression on this vm.
   * The expression must be a valid left-hand
   * expression in an assignment.
   *
   * @param {String} exp
   * @param {*} val
   */

  Vue.prototype.$set = function (exp, val) {
    var res = parseExpression(exp, true);
    if (res && res.set) {
      res.set.call(this, this, val);
    }
  };

  /**
   * Delete a property on the VM
   *
   * @param {String} key
   */

  Vue.prototype.$delete = function (key) {
    del(this._data, key);
  };

  /**
   * Watch an expression, trigger callback when its
   * value changes.
   *
   * @param {String|Function} expOrFn
   * @param {Function} cb
   * @param {Object} [options]
   *                 - {Boolean} deep
   *                 - {Boolean} immediate
   * @return {Function} - unwatchFn
   */

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    var parsed;
    if (typeof expOrFn === 'string') {
      parsed = parseDirective(expOrFn);
      expOrFn = parsed.expression;
    }
    var watcher = new Watcher(vm, expOrFn, cb, {
      deep: options && options.deep,
      sync: options && options.sync,
      filters: parsed && parsed.filters,
      user: !options || options.user !== false
    });
    if (options && options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };

  /**
   * Evaluate a text directive, including filters.
   *
   * @param {String} text
   * @param {Boolean} [asStatement]
   * @return {String}
   */

  Vue.prototype.$eval = function (text, asStatement) {
    // check for filters.
    if (filterRE$1.test(text)) {
      var dir = parseDirective(text);
      // the filter regex check might give false positive
      // for pipes inside strings, so it's possible that
      // we don't get any filters here
      var val = this.$get(dir.expression, asStatement);
      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
    } else {
      // no filter
      return this.$get(text, asStatement);
    }
  };

  /**
   * Interpolate a piece of template text.
   *
   * @param {String} text
   * @return {String}
   */

  Vue.prototype.$interpolate = function (text) {
    var tokens = parseText(text);
    var vm = this;
    if (tokens) {
      if (tokens.length === 1) {
        return vm.$eval(tokens[0].value) + '';
      } else {
        return tokens.map(function (token) {
          return token.tag ? vm.$eval(token.value) : token.value;
        }).join('');
      }
    } else {
      return text;
    }
  };

  /**
   * Log instance data as a plain JS object
   * so that it is easier to inspect in console.
   * This method assumes console is available.
   *
   * @param {String} [path]
   */

  Vue.prototype.$log = function (path) {
    var data = path ? getPath(this._data, path) : this._data;
    if (data) {
      data = clean(data);
    }
    // include computed fields
    if (!path) {
      var key;
      for (key in this.$options.computed) {
        data[key] = clean(this[key]);
      }
      if (this._props) {
        for (key in this._props) {
          data[key] = clean(this[key]);
        }
      }
    }
    console.log(data);
  };

  /**
   * "clean" a getter/setter converted object into a plain
   * object copy.
   *
   * @param {Object} - obj
   * @return {Object}
   */

  function clean(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

function domAPI (Vue) {
  /**
   * Convenience on-instance nextTick. The callback is
   * auto-bound to the instance, and this avoids component
   * modules having to rely on the global Vue.
   *
   * @param {Function} fn
   */

  Vue.prototype.$nextTick = function (fn) {
    nextTick(fn, this);
  };

  /**
   * Append instance to target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$appendTo = function (target, cb, withTransition) {
    return insert(this, target, cb, withTransition, append, appendWithTransition);
  };

  /**
   * Prepend instance to target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$prependTo = function (target, cb, withTransition) {
    target = query(target);
    if (target.hasChildNodes()) {
      this.$before(target.firstChild, cb, withTransition);
    } else {
      this.$appendTo(target, cb, withTransition);
    }
    return this;
  };

  /**
   * Insert instance before target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$before = function (target, cb, withTransition) {
    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
  };

  /**
   * Insert instance after target
   *
   * @param {Node} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$after = function (target, cb, withTransition) {
    target = query(target);
    if (target.nextSibling) {
      this.$before(target.nextSibling, cb, withTransition);
    } else {
      this.$appendTo(target.parentNode, cb, withTransition);
    }
    return this;
  };

  /**
   * Remove instance from DOM
   *
   * @param {Function} [cb]
   * @param {Boolean} [withTransition] - defaults to true
   */

  Vue.prototype.$remove = function (cb, withTransition) {
    if (!this.$el.parentNode) {
      return cb && cb();
    }
    var inDocument = this._isAttached && inDoc(this.$el);
    // if we are not in document, no need to check
    // for transitions
    if (!inDocument) withTransition = false;
    var self = this;
    var realCb = function realCb() {
      if (inDocument) self._callHook('detached');
      if (cb) cb();
    };
    if (this._isFragment) {
      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
    } else {
      var op = withTransition === false ? removeWithCb : removeWithTransition;
      op(this.$el, this, realCb);
    }
    return this;
  };

  /**
   * Shared DOM insertion function.
   *
   * @param {Vue} vm
   * @param {Element} target
   * @param {Function} [cb]
   * @param {Boolean} [withTransition]
   * @param {Function} op1 - op for non-transition insert
   * @param {Function} op2 - op for transition insert
   * @return vm
   */

  function insert(vm, target, cb, withTransition, op1, op2) {
    target = query(target);
    var targetIsDetached = !inDoc(target);
    var op = withTransition === false || targetIsDetached ? op1 : op2;
    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
    if (vm._isFragment) {
      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
        op(node, target, vm);
      });
      cb && cb();
    } else {
      op(vm.$el, target, vm, cb);
    }
    if (shouldCallHook) {
      vm._callHook('attached');
    }
    return vm;
  }

  /**
   * Check for selectors
   *
   * @param {String|Element} el
   */

  function query(el) {
    return typeof el === 'string' ? document.querySelector(el) : el;
  }

  /**
   * Append operation that takes a callback.
   *
   * @param {Node} el
   * @param {Node} target
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function append(el, target, vm, cb) {
    target.appendChild(el);
    if (cb) cb();
  }

  /**
   * InsertBefore operation that takes a callback.
   *
   * @param {Node} el
   * @param {Node} target
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function beforeWithCb(el, target, vm, cb) {
    before(el, target);
    if (cb) cb();
  }

  /**
   * Remove operation that takes a callback.
   *
   * @param {Node} el
   * @param {Vue} vm - unused
   * @param {Function} [cb]
   */

  function removeWithCb(el, vm, cb) {
    remove(el);
    if (cb) cb();
  }
}

function eventsAPI (Vue) {
  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$on = function (event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
    modifyListenerCount(this, event, 1);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$once = function (event, fn) {
    var self = this;
    function on() {
      self.$off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.$on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   */

  Vue.prototype.$off = function (event, fn) {
    var cbs;
    // all
    if (!arguments.length) {
      if (this.$parent) {
        for (event in this._events) {
          cbs = this._events[event];
          if (cbs) {
            modifyListenerCount(this, event, -cbs.length);
          }
        }
      }
      this._events = {};
      return this;
    }
    // specific event
    cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (arguments.length === 1) {
      modifyListenerCount(this, event, -cbs.length);
      this._events[event] = null;
      return this;
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        modifyListenerCount(this, event, -1);
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Trigger an event on self.
   *
   * @param {String|Object} event
   * @return {Boolean} shouldPropagate
   */

  Vue.prototype.$emit = function (event) {
    var isSource = typeof event === 'string';
    event = isSource ? event : event.name;
    var cbs = this._events[event];
    var shouldPropagate = isSource || !cbs;
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      // this is a somewhat hacky solution to the question raised
      // in #2102: for an inline component listener like <comp @test="doThis">,
      // the propagation handling is somewhat broken. Therefore we
      // need to treat these inline callbacks differently.
      var hasParentCbs = isSource && cbs.some(function (cb) {
        return cb._fromParent;
      });
      if (hasParentCbs) {
        shouldPropagate = false;
      }
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        var cb = cbs[i];
        var res = cb.apply(this, args);
        if (res === true && (!hasParentCbs || cb._fromParent)) {
          shouldPropagate = true;
        }
      }
    }
    return shouldPropagate;
  };

  /**
   * Recursively broadcast an event to all children instances.
   *
   * @param {String|Object} event
   * @param {...*} additional arguments
   */

  Vue.prototype.$broadcast = function (event) {
    var isSource = typeof event === 'string';
    event = isSource ? event : event.name;
    // if no child has registered for this event,
    // then there's no need to broadcast.
    if (!this._eventsCount[event]) return;
    var children = this.$children;
    var args = toArray(arguments);
    if (isSource) {
      // use object event to indicate non-source emit
      // on children
      args[0] = { name: event, source: this };
    }
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var shouldPropagate = child.$emit.apply(child, args);
      if (shouldPropagate) {
        child.$broadcast.apply(child, args);
      }
    }
    return this;
  };

  /**
   * Recursively propagate an event up the parent chain.
   *
   * @param {String} event
   * @param {...*} additional arguments
   */

  Vue.prototype.$dispatch = function (event) {
    var shouldPropagate = this.$emit.apply(this, arguments);
    if (!shouldPropagate) return;
    var parent = this.$parent;
    var args = toArray(arguments);
    // use object event to indicate non-source emit
    // on parents
    args[0] = { name: event, source: this };
    while (parent) {
      shouldPropagate = parent.$emit.apply(parent, args);
      parent = shouldPropagate ? parent.$parent : null;
    }
    return this;
  };

  /**
   * Modify the listener counts on all parents.
   * This bookkeeping allows $broadcast to return early when
   * no child has listened to a certain event.
   *
   * @param {Vue} vm
   * @param {String} event
   * @param {Number} count
   */

  var hookRE = /^hook:/;
  function modifyListenerCount(vm, event, count) {
    var parent = vm.$parent;
    // hooks do not get broadcasted so no need
    // to do bookkeeping for them
    if (!parent || !count || hookRE.test(event)) return;
    while (parent) {
      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
      parent = parent.$parent;
    }
  }
}

function lifecycleAPI (Vue) {
  /**
   * Set instance target element and kick off the compilation
   * process. The passed in `el` can be a selector string, an
   * existing Element, or a DocumentFragment (for block
   * instances).
   *
   * @param {Element|DocumentFragment|string} el
   * @public
   */

  Vue.prototype.$mount = function (el) {
    if (this._isCompiled) {
      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
      return;
    }
    el = query(el);
    if (!el) {
      el = document.createElement('div');
    }
    this._compile(el);
    this._initDOMHooks();
    if (inDoc(this.$el)) {
      this._callHook('attached');
      ready.call(this);
    } else {
      this.$once('hook:attached', ready);
    }
    return this;
  };

  /**
   * Mark an instance as ready.
   */

  function ready() {
    this._isAttached = true;
    this._isReady = true;
    this._callHook('ready');
  }

  /**
   * Teardown the instance, simply delegate to the internal
   * _destroy.
   *
   * @param {Boolean} remove
   * @param {Boolean} deferCleanup
   */

  Vue.prototype.$destroy = function (remove, deferCleanup) {
    this._destroy(remove, deferCleanup);
  };

  /**
   * Partially compile a piece of DOM and return a
   * decompile function.
   *
   * @param {Element|DocumentFragment} el
   * @param {Vue} [host]
   * @param {Object} [scope]
   * @param {Fragment} [frag]
   * @return {Function}
   */

  Vue.prototype.$compile = function (el, host, scope, frag) {
    return compile(el, this.$options, true)(this, el, host, scope, frag);
  };
}

/**
 * The exposed Vue constructor.
 *
 * API conventions:
 * - public API methods/properties are prefixed with `$`
 * - internal methods/properties are prefixed with `_`
 * - non-prefixed properties are assumed to be proxied user
 *   data.
 *
 * @constructor
 * @param {Object} [options]
 * @public
 */

function Vue(options) {
  this._init(options);
}

// install internals
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
miscMixin(Vue);

// install instance APIs
dataAPI(Vue);
domAPI(Vue);
eventsAPI(Vue);
lifecycleAPI(Vue);

var slot = {

  priority: SLOT,
  params: ['name'],

  bind: function bind() {
    // this was resolved during component transclusion
    var name = this.params.name || 'default';
    var content = this.vm._slotContents && this.vm._slotContents[name];
    if (!content || !content.hasChildNodes()) {
      this.fallback();
    } else {
      this.compile(content.cloneNode(true), this.vm._context, this.vm);
    }
  },

  compile: function compile(content, context, host) {
    if (content && context) {
      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
        // if the inserted slot has v-if
        // inject fallback content as the v-else
        var elseBlock = document.createElement('template');
        elseBlock.setAttribute('v-else', '');
        elseBlock.innerHTML = this.el.innerHTML;
        // the else block should be compiled in child scope
        elseBlock._context = this.vm;
        content.appendChild(elseBlock);
      }
      var scope = host ? host._scope : this._scope;
      this.unlink = context.$compile(content, host, scope, this._frag);
    }
    if (content) {
      replace(this.el, content);
    } else {
      remove(this.el);
    }
  },

  fallback: function fallback() {
    this.compile(extractContent(this.el, true), this.vm);
  },

  unbind: function unbind() {
    if (this.unlink) {
      this.unlink();
    }
  }
};

var partial = {

  priority: PARTIAL,

  params: ['name'],

  // watch changes to name for dynamic partials
  paramWatchers: {
    name: function name(value) {
      vIf.remove.call(this);
      if (value) {
        this.insert(value);
      }
    }
  },

  bind: function bind() {
    this.anchor = createAnchor('v-partial');
    replace(this.el, this.anchor);
    this.insert(this.params.name);
  },

  insert: function insert(id) {
    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
    if (partial) {
      this.factory = new FragmentFactory(this.vm, partial);
      vIf.insert.call(this);
    }
  },

  unbind: function unbind() {
    if (this.frag) {
      this.frag.destroy();
    }
  }
};

var elementDirectives = {
  slot: slot,
  partial: partial
};

var convertArray = vFor._postProcess;

/**
 * Limit filter for arrays
 *
 * @param {Number} n
 * @param {Number} offset (Decimal expected)
 */

function limitBy(arr, n, offset) {
  offset = offset ? parseInt(offset, 10) : 0;
  n = toNumber(n);
  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
}

/**
 * Filter filter for arrays
 *
 * @param {String} search
 * @param {String} [delimiter]
 * @param {String} ...dataKeys
 */

function filterBy(arr, search, delimiter) {
  arr = convertArray(arr);
  if (search == null) {
    return arr;
  }
  if (typeof search === 'function') {
    return arr.filter(search);
  }
  // cast to lowercase string
  search = ('' + search).toLowerCase();
  // allow optional `in` delimiter
  // because why not
  var n = delimiter === 'in' ? 3 : 2;
  // extract and flatten keys
  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
  var res = [];
  var item, key, val, j;
  for (var i = 0, l = arr.length; i < l; i++) {
    item = arr[i];
    val = item && item.$value || item;
    j = keys.length;
    if (j) {
      while (j--) {
        key = keys[j];
        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
          res.push(item);
          break;
        }
      }
    } else if (contains(item, search)) {
      res.push(item);
    }
  }
  return res;
}

/**
 * Filter filter for arrays
 *
 * @param {String|Array<String>|Function} ...sortKeys
 * @param {Number} [order]
 */

function orderBy(arr) {
  var comparator = null;
  var sortKeys = undefined;
  arr = convertArray(arr);

  // determine order (last argument)
  var args = toArray(arguments, 1);
  var order = args[args.length - 1];
  if (typeof order === 'number') {
    order = order < 0 ? -1 : 1;
    args = args.length > 1 ? args.slice(0, -1) : args;
  } else {
    order = 1;
  }

  // determine sortKeys & comparator
  var firstArg = args[0];
  if (!firstArg) {
    return arr;
  } else if (typeof firstArg === 'function') {
    // custom comparator
    comparator = function (a, b) {
      return firstArg(a, b) * order;
    };
  } else {
    // string keys. flatten first
    sortKeys = Array.prototype.concat.apply([], args);
    comparator = function (a, b, i) {
      i = i || 0;
      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
    };
  }

  function baseCompare(a, b, sortKeyIndex) {
    var sortKey = sortKeys[sortKeyIndex];
    if (sortKey) {
      if (sortKey !== '$key') {
        if (isObject(a) && '$value' in a) a = a.$value;
        if (isObject(b) && '$value' in b) b = b.$value;
      }
      a = isObject(a) ? getPath(a, sortKey) : a;
      b = isObject(b) ? getPath(b, sortKey) : b;
    }
    return a === b ? 0 : a > b ? order : -order;
  }

  // sort on a copy to avoid mutating original array
  return arr.slice().sort(comparator);
}

/**
 * String contain helper
 *
 * @param {*} val
 * @param {String} search
 */

function contains(val, search) {
  var i;
  if (isPlainObject(val)) {
    var keys = Object.keys(val);
    i = keys.length;
    while (i--) {
      if (contains(val[keys[i]], search)) {
        return true;
      }
    }
  } else if (isArray(val)) {
    i = val.length;
    while (i--) {
      if (contains(val[i], search)) {
        return true;
      }
    }
  } else if (val != null) {
    return val.toString().toLowerCase().indexOf(search) > -1;
  }
}

var digitsRE = /(\d{3})(?=\d)/g;

// asset collections must be a plain object.
var filters = {

  orderBy: orderBy,
  filterBy: filterBy,
  limitBy: limitBy,

  /**
   * Stringify value.
   *
   * @param {Number} indent
   */

  json: {
    read: function read(value, indent) {
      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
    },
    write: function write(value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  },

  /**
   * 'abc' => 'Abc'
   */

  capitalize: function capitalize(value) {
    if (!value && value !== 0) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  /**
   * 'abc' => 'ABC'
   */

  uppercase: function uppercase(value) {
    return value || value === 0 ? value.toString().toUpperCase() : '';
  },

  /**
   * 'AbC' => 'abc'
   */

  lowercase: function lowercase(value) {
    return value || value === 0 ? value.toString().toLowerCase() : '';
  },

  /**
   * 12345 => $12,345.00
   *
   * @param {String} sign
   * @param {Number} decimals Decimal places
   */

  currency: function currency(value, _currency, decimals) {
    value = parseFloat(value);
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '$';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
  },

  /**
   * 'item' => 'items'
   *
   * @params
   *  an array of strings corresponding to
   *  the single, double, triple ... forms of the word to
   *  be pluralized. When the number to be pluralized
   *  exceeds the length of the args, it will use the last
   *  entry in the array.
   *
   *  e.g. ['single', 'double', 'triple', 'multiple']
   */

  pluralize: function pluralize(value) {
    var args = toArray(arguments, 1);
    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
  },

  /**
   * Debounce a handler function.
   *
   * @param {Function} handler
   * @param {Number} delay = 300
   * @return {Function}
   */

  debounce: function debounce(handler, delay) {
    if (!handler) return;
    if (!delay) {
      delay = 300;
    }
    return _debounce(handler, delay);
  }
};

function installGlobalAPI (Vue) {
  /**
   * Vue and every constructor that extends Vue has an
   * associated options object, which can be accessed during
   * compilation steps as `this.constructor.options`.
   *
   * These can be seen as the default options of every
   * Vue instance.
   */

  Vue.options = {
    directives: directives,
    elementDirectives: elementDirectives,
    filters: filters,
    transitions: {},
    components: {},
    partials: {},
    replace: true
  };

  /**
   * Expose useful internals
   */

  Vue.util = util;
  Vue.config = config;
  Vue.set = set;
  Vue['delete'] = del;
  Vue.nextTick = nextTick;

  /**
   * The following are exposed for advanced usage / plugins
   */

  Vue.compiler = compiler;
  Vue.FragmentFactory = FragmentFactory;
  Vue.internalDirectives = internalDirectives;
  Vue.parsers = {
    path: path,
    text: text,
    template: template,
    directive: directive,
    expression: expression
  };

  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */

  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   *
   * @param {Object} extendOptions
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var isFirstExtend = Super.cid === 0;
    if (isFirstExtend && extendOptions._Ctor) {
      return extendOptions._Ctor;
    }
    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
        name = null;
      }
    }
    var Sub = createClass(name || 'VueComponent');
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super;
    // allow further extension
    Sub.extend = Super.extend;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // cache constructor
    if (isFirstExtend) {
      extendOptions._Ctor = Sub;
    }
    return Sub;
  };

  /**
   * A function that returns a sub-class constructor with the
   * given name. This gives us much nicer output when
   * logging instances in the console.
   *
   * @param {String} name
   * @return {Function}
   */

  function createClass(name) {
    /* eslint-disable no-new-func */
    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
    /* eslint-enable no-new-func */
  }

  /**
   * Plugin system
   *
   * @param {Object} plugin
   */

  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return;
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this;
  };

  /**
   * Apply a global mixin by merging it into the default
   * options.
   */

  Vue.mixin = function (mixin) {
    Vue.options = mergeOptions(Vue.options, mixin);
  };

  /**
   * Create asset registration methods with the following
   * signature:
   *
   * @param {String} id
   * @param {*} definition
   */

  config._assetTypes.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          if (!definition.name) {
            definition.name = id;
          }
          definition = Vue.extend(definition);
        }
        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });

  // expose internal transition API
  extend(Vue.transition, transition);
}

installGlobalAPI(Vue);

Vue.version = '1.0.25';

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue);
    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
    }
  }
}, 0);

module.exports = Vue;
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":19}],25:[function(require,module,exports){
var inserted = exports.cache = {}

exports.insert = function (css) {
  if (inserted[css]) return
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return elem
}

},{}],26:[function(require,module,exports){
'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _externalComponents = require('./config/externalComponents');

var _externalComponents2 = _interopRequireDefault(_externalComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.debug = true;

//global filters
//Vue.use(VueFilter);

// install router

//import VueFilter from 'vue-filter';
_vue2.default.use(_vueResource2.default);
_vue2.default.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#csrf_token').getAttribute('value');

(0, _externalComponents2.default)(_vue2.default);

// install router
_vue2.default.use(_vueRouter2.default);

//external components
//const progress = require('vue-progressbar');
//Vue.use(progress);

// routing
/*
const router = new VueRouter({
  history: true, 
  saveScrollPosition: true
})
*/

var router = new _vueRouter2.default();

router.map({
  '*': {
    component: require('./finalComponents/reusable/notFound.vue')
  },
  '/': {
    component: require('./finalComponents/app/dashboard/index.vue')
  },
  /*
  '/usuarios': {
    component: require('./finalComponents/app/usuariosView.vue')
  },
  '/menu': {
    component: require('./finalComponents/app/testMantenedorMenu.vue')
  },
  '/sdk': {
    component: require('./finalComponents/app/testVueTable.vue')
  },
  '/paginate': {
    component: require('./finalComponents/app/testPagination.vue')
  },*/

  '/usuarios': require('./finalComponents/app/usuarios/index.js'),

  '/materias': require('./finalComponents/app/materias/index.js'),

  '/malla_academica': require('./finalComponents/app/malla_academica/index.js'),

  '/docentes': require('./finalComponents/app/docentes/index.js'),

  '/materias_docentes': require('./finalComponents/app/materias_docentes/index.js'),

  '/menu': require('./finalComponents/app/mantenedor-menu/index.js'),

  '/catalogos': require('./finalComponents/app/catalogos/index.js'),

  '/catalogos/:catalogo_id': require('./finalComponents/app/catalogoItems/index.js'),

  '/jornadasemestres': require('./finalComponents/app/jornadas_semestres/index.js'),

  '/lockscreen': {
    component: require('./finalComponents/new-layout/lockscreen.vue')
  }
});

//bootstrap
var App = _vue2.default.extend(require('./finalComponents/layoutView.vue'));

router.start(App, '#app');

//solo para hacer debug
window.router = router;

},{"./config/externalComponents":27,"./finalComponents/app/catalogoItems/index.js":32,"./finalComponents/app/catalogos/index.js":40,"./finalComponents/app/dashboard/index.vue":45,"./finalComponents/app/docentes/index.js":49,"./finalComponents/app/jornadas_semestres/index.js":57,"./finalComponents/app/malla_academica/index.js":64,"./finalComponents/app/mantenedor-menu/index.js":72,"./finalComponents/app/materias/index.js":78,"./finalComponents/app/materias_docentes/index.js":83,"./finalComponents/app/usuarios/index.js":90,"./finalComponents/layoutView.vue":95,"./finalComponents/new-layout/lockscreen.vue":101,"./finalComponents/reusable/notFound.vue":110,"vue":24,"vue-resource":22,"vue-router":23}],27:[function(require,module,exports){
'use strict';

var _loading = require('../finalComponents/reusable/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (Vue) {
  Vue.component('loading-app', _loading2.default);
}; /**
    * Esto se lo debe hacer luego de tener cargada la instancia de vue-resource
    */

/*
 import Vuetable from 'vuetable/src/components/Vuetable.vue';
 import VuetablePagination from 'vuetable/src/components/VuetablePagination.vue';
 import VuetablePaginationDropdown  from 'vuetable/src/components/VuetablePaginationDropdown.vue';
 import VuetablePaginationBootstrap from 'vuetable/src/components/VuetablePaginationBootstrap.vue';

 module.exports = function(Vue){
 	Vue.component('vuetable', Vuetable);
 	Vue.component('vuetable-pagination', VuetablePagination);
 	Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown);
 	Vue.component('vuetable-pagination-bootstrap', VuetablePaginationBootstrap);
 }

*/

},{"../finalComponents/reusable/loading.vue":104}],28:[function(require,module,exports){
'use strict';

module.exports = [{
  iconClass: 'fa fa-dashboard',
  name: 'Dashboard',
  link: '/',
  children: []
}, {
  iconClass: 'fa fa-calendar',
  name: 'Usuarios',
  link: '#',
  children: [{
    iconClass: 'fa fa-link',
    name: 'Listado CRUD',
    link: '/usuarios',
    children: []
  }, {
    iconClass: 'fa fa-link',
    name: 'Reportes',
    link: '/sdk',
    children: []
  }]
}];

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			this.generateUrl();
			transition.next();
		}
	},
	data: function data() {
		return {
			createMode: true,
			newModel: {},
			url: 'api/catalogos' //no hace nada por que se autogenera para este caso
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"row\">\n\t<form action=\"\" @submit.prevent=\"create\">\n\t\t\n\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t</form>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-4bcf8405", module.exports)
  } else {
    hotAPI.update("_v-4bcf8405", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":31,"./mixins":35,"vue":24,"vue-hot-reload-api":20}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			this.generateUrl();
			transition.next();
		}
	},
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			createMode: false,
			newModel: {},
			loading: true,
			url: 'api/catalogos'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<form action=\"\" @submit.prevent=\"update\">\n\t\t\t\n\t\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t\t</form>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-68d2ff12", module.exports)
  } else {
    hotAPI.update("_v-68d2ff12", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":31,"./mixins":35,"vue":24,"vue-hot-reload-api":20}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selectList = require('../../reusable/select-list.vue');

var _selectList2 = _interopRequireDefault(_selectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	beforeCompile: function beforeCompile() {
		if (this.createMode) {
			this.dataModel = this.initModel();
		}
	},

	components: {
		'select-list': _selectList2.default
	},
	methods: {
		initModel: function initModel() {
			return {
				catalogo: this.$route.params.catalogo_id,
				codigo: null,
				id: null,
				descripcion: null,
				orden: null,
				activo: true
			};
		}
	},
	props: {
		createMode: {
			type: Boolean,
			required: false,
			default: true
		},
		dataModel: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					catalogo: null,
					codigo: null,
					id: null,
					descripcion: null,
					orden: null,
					activo: true
				};
			}
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<!--\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Catálogo</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.catalogo\" value-key=\"id\" label-key=\"descripcion\" url=\"api/catalogos-list\"></select-list>\n</div>\n-->\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Código Item</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.codigo\" minlength=\"3\" required=\"\">\n\t<input type=\"hidden\" class=\"form-control\" :value=\"dataModel.id\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Descripción Item</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.descripcion\" minlength=\"6\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Orden Item</label>\n\t<input type=\"number\" class=\"form-control\" v-model=\"dataModel.orden\" required=\"\">\n</div>\n\n<div class=\"col-xs-12\">\n\t<div class=\"content\">\n\t\t<button v-if=\"createMode\" class=\"btn btn-success btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR</button>\n\t\t<button v-else=\"\" class=\"btn btn-warning btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR CAMBIOS</button>\n\t\t<a v-link=\"{path: '/catalogos/'+$route.params.catalogo_id}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-4c7add11", module.exports)
  } else {
    hotAPI.update("_v-4c7add11", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/select-list.vue":111,"vue":24,"vue-hot-reload-api":20}],32:[function(require,module,exports){
'use strict';

var _index = require('./index.vue');

var _index2 = _interopRequireDefault(_index);

var _listView = require('./list-view.vue');

var _listView2 = _interopRequireDefault(_listView);

var _createView = require('./create-view.vue');

var _createView2 = _interopRequireDefault(_createView);

var _editView = require('./edit-view.vue');

var _editView2 = _interopRequireDefault(_editView);

var _readView = require('./read-view.vue');

var _readView2 = _interopRequireDefault(_readView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
   component: _index2.default,
   subRoutes: {
      '/': {
         component: _listView2.default,
         name: 'Listar'
      },
      '/create': {
         name: 'Crear',
         component: _createView2.default
      },
      '/edit/:model_id': {
         name: 'Edición',
         component: _editView2.default
      },
      '/view/:model_id': {
         name: 'Ver',
         component: _readView2.default
      }
   }
};

},{"./create-view.vue":29,"./edit-view.vue":30,"./index.vue":33,"./list-view.vue":34,"./read-view.vue":36}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-catalogo-item',
	components: {
		'content-header': _contentHeader2.default
	},
	route: {
		data: function data(transition) {
			this.url = 'api/catalogos/' + this.$route.params.catalogo_id;
			this.loadCatalogo();
			transition.next();
		}
	},
	data: function data() {
		return {
			path: ['Sistema', 'Catálogo', 'Items'],
			loading: true,
			titulo: 'Catálogo Items',
			url: ''
		};
	},
	methods: {
		loadCatalogo: function loadCatalogo() {
			this.$http.get(this.url).then(function (resp) {
				this.titulo = 'Catálogo - ' + resp.data.data.nombre;
				this.path = ['Sistema', 'Catálogos', resp.data.data.nombre];
			}, _reusable_functions2.default.tryError);
		}
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header :title.sync=\"titulo\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-9044d97e", module.exports)
  } else {
    hotAPI.update("_v-9044d97e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loading = require('../../reusable/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _coolTable = require('../../reusable/cool-table.vue');

var _coolTable2 = _interopRequireDefault(_coolTable);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			this.generateUrl();
			this.load();
			transition.next();
		}
	},
	data: function data() {
		return {
			url: 'api/catalogos/REPLACEME/items',
			toolbar: {
				iconClass: 'fa fa-plus',
				iconClassOptions: 'fa fa-cogs',
				label: 'Agregar',
				labelOptions: 'Campos visibles',
				nameEmit: 'catalogo-item-create-event',
				btnClass: 'btn btn-primary btn-flat'
			},
			datos: [],
			columnas: [{
				title: 'Código',
				field: 'codigo',
				hidden: false
			}, {
				title: 'Descripción',
				field: 'descripcion',
				hidden: false
			}, {
				title: 'Orden',
				field: 'orden',
				hidden: false
			}, {
				title: 'Acciones',
				titleClass: 'text-center',
				hidden: false,
				fieldClass: 'text-center',
				itemActions: [{
					nameEmit: 'catalogo-item-update-event',
					btnClass: 'btn btn-default btn-xs',
					iconClass: 'fa fa-edit',
					label: 'Editar'
				}, {
					nameEmit: 'catalogo-item-delete-event',
					btnClass: 'btn btn-danger btn-xs',
					iconClass: 'fa fa-trash',
					label: 'Eliminar'
				}]
			}],
			loading: false
		};
	},

	components: {
		'cool-table': _coolTable2.default,
		'app-loading': _loading2.default
	},
	events: {
		'catalogo-item-create-event': function catalogoItemCreateEvent(model) {
			this.$router.go('/catalogos/' + this.$route.params.catalogo_id + '/create');
		},
		'catalogo-item-update-event': function catalogoItemUpdateEvent(model) {
			this.$router.go('/catalogos/' + model.catalogo + '/edit/' + model.id);
		},
		'catalogo-item-delete-event': function catalogoItemDeleteEvent(model) {
			this.destroy(model);
		}
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t\n\t<div v-if=\"loading\">\n\t\t<app-loading></app-loading>\n\t</div>\n\n\t<div v-else=\"\">\n\t\t<cool-table :option-toolbar=\"toolbar\" :url=\"url\" :data.sync=\"datos\" :columns=\"columnas\" filter-key-word=\"search\">\n\t</cool-table>\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-4892e463", module.exports)
  } else {
    hotAPI.update("_v-4892e463", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/cool-table.vue":103,"../../reusable/loading.vue":104,"./mixins":35,"vue":24,"vue-hot-reload-api":20}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    create: function create() {
      this.$http.post(this.url, this.newModel).then(function (resp) {
        _reusable_functions2.default.niceAlert('success', 'Se creó el menú correctamente!');
        this.$router.go('/catalogos/' + this.$route.params.catalogo_id);
      }, _reusable_functions2.default.tryError);
    },
    update: function update() {
      this.$http.put(this.url + '/' + this.newModel.id, this.newModel).then(function (resp) {
        _reusable_functions2.default.niceAlert('success', 'Se modificó correctamente el menú!');
        this.$router.go('/catalogos/' + this.$route.params.catalogo_id);
      }, _reusable_functions2.default.tryError);
    },
    read: function read() {
      this.loading = true;
      this.$http.get(this.url + '/' + this.$route.params.model_id).then(function (resp) {
        this.newModel = resp.data.data;
        this.loading = false;
      }, _reusable_functions2.default.tryError);
    },
    destroy: function destroy(model) {
      if (confirm('¿Estás seguro?')) {
        this.$http.delete(this.url + '/' + model.id).then(function (resp) {
          _reusable_functions2.default.niceAlert('success', 'Se eliminó correctamente');
          this.load();
        }, _reusable_functions2.default.tryError);
      }
    },
    load: function load() {
      this.loading = true;
      this.$http.get(this.url).then(function (resp) {
        this.loading = false;
      }, _reusable_functions2.default.tryError);
    },
    generateUrl: function generateUrl() {
      this.url = 'api/catalogos/' + this.$route.params.catalogo_id + '/items';
    }
  }
}; /**
    * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
    * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
    */

},{"../../../util/reusable_functions":112}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			newModel: {},
			loading: true,
			url: 'api/catalogos'
		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<div class=\"col-xs-12\">\n\t\t\t<strong>Nombre:</strong>\n\t\t\t<p>{{newModel.nombre}}</p>\n\t\t</div>\n\t\t<div class=\"col-xs-12\">\n\t\t\t<strong>Descripción:</strong>\n\t\t\t<p>{{newModel.descripcion}}</p>\n\t\t</div>\n\t\t<div class=\"col-xs-12\">\n\t\t\t<a v-link=\"{path: '/catalogos'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t\t</div>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0432d26b", module.exports)
  } else {
    hotAPI.update("_v-0432d26b", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./mixins":35,"vue":24,"vue-hot-reload-api":20}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	data: function data() {
		return {
			createMode: true,
			newModel: {},
			url: 'api/catalogos'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"row\">\n\t<form action=\"\" @submit.prevent=\"create\">\n\t\t\n\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t</form>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-3cad6858", module.exports)
  } else {
    hotAPI.update("_v-3cad6858", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":39,"./mixins":43,"vue":24,"vue-hot-reload-api":20}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			createMode: false,
			newModel: {},
			loading: true,
			url: 'api/catalogos'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<form action=\"\" @submit.prevent=\"update\">\n\t\t\t\n\t\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t\t</form>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-bd9144ec", module.exports)
  } else {
    hotAPI.update("_v-bd9144ec", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":39,"./mixins":43,"vue":24,"vue-hot-reload-api":20}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selectList = require('../../reusable/select-list.vue');

var _selectList2 = _interopRequireDefault(_selectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	beforeCompile: function beforeCompile() {
		if (this.createMode) {
			this.dataModel = this.initModel();
		}
	},

	components: {
		'select-list': _selectList2.default
	},
	methods: {
		initModel: function initModel() {
			return {
				nombre: null,
				descripcion: null,
				activo: null,
				id: null
			};
		}
	},
	props: {
		createMode: {
			type: Boolean,
			required: false,
			default: true
		},
		dataModel: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					nombre: null,
					descripcion: null,
					activo: null,
					id: null
				};
			}
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Nombre Catálogo</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.nombre\" minlength=\"3\" required=\"\">\n\t<input type=\"hidden\" class=\"form-control\" :value=\"dataModel.id\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Descripción</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.descripcion\" minlength=\"6\" required=\"\">\n</div>\n\n<div class=\"col-xs-12\">\n\t<div class=\"content\">\n\t\t<button v-if=\"createMode\" class=\"btn btn-success btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR</button>\n\t\t<button v-else=\"\" class=\"btn btn-warning btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR CAMBIOS</button>\n\t\t<a v-link=\"{path: '/catalogos'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-3d58c164", module.exports)
  } else {
    hotAPI.update("_v-3d58c164", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/select-list.vue":111,"vue":24,"vue-hot-reload-api":20}],40:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./create-view.vue":37,"./edit-view.vue":38,"./index.vue":41,"./list-view.vue":42,"./read-view.vue":44,"dup":32}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-catalogo',
	components: {
		'content-header': _contentHeader2.default
	},
	data: function data() {
		return {
			path: ['Sistema', 'Catálogos'],
			loading: true
		};
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header title=\"Catálogo\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0cc5f1d4", module.exports)
  } else {
    hotAPI.update("_v-0cc5f1d4", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loading = require('../../reusable/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _coolTable = require('../../reusable/cool-table.vue');

var _coolTable2 = _interopRequireDefault(_coolTable);

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	route: {
		data: function data(transition) {
			this.load();
			transition.next();
		}
	},
	mixins: [_mixins2.default],
	data: function data() {
		return {
			url: 'api/catalogos',
			toolbar: {
				iconClass: 'fa fa-plus',
				iconClassOptions: 'fa fa-cogs',
				label: 'Agregar',
				labelOptions: 'Campos visibles',
				nameEmit: 'catalogo-create-event',
				btnClass: 'btn btn-primary btn-flat'
			},
			datos: [],
			columnas: [{
				title: 'Cod.',
				field: 'id',
				hidden: false
			}, {
				title: 'Nombre',
				field: 'nombre',
				hidden: false
			}, {
				title: 'Descripción',
				field: 'descripcion',
				hidden: false
			}, {
				title: 'Acciones',
				titleClass: 'text-center',
				hidden: false,
				fieldClass: 'text-center',
				itemActions: [{
					nameEmit: 'catalogo-read-event',
					btnClass: 'btn btn-default btn-xs',
					iconClass: 'fa fa-eye',
					label: 'Visualizar'
				}, {
					nameEmit: 'catalogo-update-event',
					btnClass: 'btn btn-default btn-xs',
					iconClass: 'fa fa-edit',
					label: 'Editar'
				}, {
					nameEmit: 'catalogo-delete-event',
					btnClass: 'btn btn-danger btn-xs',
					iconClass: 'fa fa-trash',
					label: 'Eliminar'
				}]
			}],
			loading: false
		};
	},

	components: {
		'cool-table': _coolTable2.default,
		'app-loading': _loading2.default
	},
	events: {
		'catalogo-create-event': function catalogoCreateEvent(model) {
			this.$router.go('/catalogos/create');
		},
		'catalogo-read-event': function catalogoReadEvent(model) {
			this.$router.go('/catalogos/view/' + model.id);
		},
		'catalogo-update-event': function catalogoUpdateEvent(model) {
			this.$router.go('/catalogos/edit/' + model.id);
		},
		'catalogo-delete-event': function catalogoDeleteEvent(model) {
			this.destroy(model);
		}
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t\n\t<div v-if=\"loading\">\n\t\t<app-loading></app-loading>\n\t</div>\n\n\t<div v-else=\"\">\n\t\t<cool-table :option-toolbar=\"toolbar\" :url=\"url\" :data.sync=\"datos\" :columns=\"columnas\" filter-key-word=\"search\">\n\t</cool-table>\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-1e33c176", module.exports)
  } else {
    hotAPI.update("_v-1e33c176", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"../../reusable/cool-table.vue":103,"../../reusable/loading.vue":104,"./mixins":43,"vue":24,"vue-hot-reload-api":20}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	methods: {
		create: function create() {
			this.$http.post(this.url, this.newModel).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se creó el catálogo correctamente!');
				this.$router.go('/catalogos');
			}, _reusable_functions2.default.tryError);
		},
		update: function update() {
			this.$http.put(this.url + '/' + this.newModel.id, this.newModel).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se modificó correctamente el catálogo !');
				this.$router.go('/catalogos');
			}, _reusable_functions2.default.tryError);
		},
		read: function read() {
			this.loading = true;
			this.$http.get(this.url + '/' + this.$route.params.model_id).then(function (resp) {
				this.newModel = resp.data.data;
				this.loading = false;
			}, _reusable_functions2.default.tryError);
		},
		destroy: function destroy(model) {
			if (confirm('¿Estás seguro?')) {
				this.$http.delete(this.url + '/' + model.id).then(function (resp) {
					_reusable_functions2.default.niceAlert('success', 'Se eliminó correctamente');
					this.load();
				}, _reusable_functions2.default.tryError);
			}
		},
		load: function load() {
			this.loading = true;
			this.$http.get(this.url).then(function (resp) {
				this.loading = false;
			}, _reusable_functions2.default.tryError);
		}
	}
}; /**
    * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
    * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
    */

},{"../../../util/reusable_functions":112}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			newModel: {},
			loading: true,
			url: 'api/catalogos'
		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<div class=\"col-xs-12\">\n\t\t\t<strong>Nombre:</strong>\n\t\t\t<p>{{newModel.nombre}}</p>\n\t\t</div>\n\t\t<div class=\"col-xs-12\">\n\t\t\t<strong>Descripción:</strong>\n\t\t\t<p>{{newModel.descripcion}}</p>\n\t\t</div>\n\t\t<div class=\"col-xs-12\">\n\t\t\t<a v-link=\"{path: '/catalogos'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t\t</div>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-4c58a104", module.exports)
  } else {
    hotAPI.update("_v-4c58a104", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./mixins":43,"vue":24,"vue-hot-reload-api":20}],45:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.bg-green{\n\tbackground: #4e9b78 !important;\n}\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-dashboard',
	components: {
		'content-header': _contentHeader2.default
	},
	data: function data() {
		return {
			path: []
		};
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header title=\"Dahsboard\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\n\n\t\t<div class=\"col-xs-12 col-sm-6 col-md-4\">\n\t\t\t<!-- Apply any bg-* class to to the info-box to color it -->\n\t\t\t<div class=\"info-box bg-green\">\n\t\t\t  <!-- Apply any bg-* class to to the icon to color it -->\n\t\t\t  <span class=\"info-box-icon\"><i class=\"fa fa-bell-o\"></i></span>\n\t\t\t  <div class=\"info-box-content\">\n\t\t\t    <span class=\"info-box-text\">Ciclo 2016-2017(I)</span>\n\t\t\t    <div style=\"margin-top:10px;\">\n\t\t\t    \t<button class=\"btn bg-red-active\"><i class=\"fa fa-bell-slash\"></i> CERRAR CICLO</button>\n\t\t\t    </div>\n\t\t\t  </div><!-- /.info-box-content -->\n\t\t\t</div><!-- /.info-box -->\n\t\t</div>\n\n\t\t<div class=\"col-xs-12 col-sm-6 col-md-4\">\n\t\t\t\t<!-- Apply any bg-* class to to the info-box to color it -->\n\t\t\t\t<div class=\"info-box bg-teal\">\n\t\t\t\t  <span class=\"info-box-icon\"><i class=\"fa fa-users\"></i></span>\n\t\t\t\t  <div class=\"info-box-content\">\n\t\t\t\t    <span class=\"info-box-text\">Docentes Activos</span>\n\t\t\t\t    <span class=\"info-box-number\">21</span>\n\t\t\t\t    <!-- The progress section is optional -->\n\t\t\t\t    <div class=\"progress\">\n\t\t\t\t      <div class=\"progress-bar\" style=\"width: 80%\"></div>\n\t\t\t\t    </div>\n\t\t\t\t    <span class=\"progress-description\">\n\t\t\t\t      Se recomienda tener el 100%\n\t\t\t\t    </span>\n\t\t\t\t  </div><!-- /.info-box-content -->\n\t\t\t\t</div><!-- /.info-box -->\n\t\t\t</div>\n\n\t\t\t<div class=\"col-xs-12 col-sm-6 col-md-4\">\n\t\t\t\t<!-- Apply any bg-* class to to the info-box to color it -->\n\t\t\t\t<div class=\"info-box bg-aqua\">\n\t\t\t\t  <span class=\"info-box-icon\"><i class=\"fa fa-calendar-o\"></i></span>\n\t\t\t\t  <div class=\"info-box-content\">\n\t\t\t\t    <span class=\"info-box-text\">Horarios Asignados</span>\n\t\t\t\t    <span class=\"info-box-number\">16</span>\n\t\t\t\t    <!-- The progress section is optional -->\n\t\t\t\t    <div class=\"progress\">\n\t\t\t\t      <div class=\"progress-bar\" style=\"width: 75%\"></div>\n\t\t\t\t    </div>\n\t\t\t\t    <span class=\"progress-description\">\n\t\t\t\t      5 Asignaciones pendientes\n\t\t\t\t    </span>\n\t\t\t\t  </div><!-- /.info-box-content -->\n\t\t\t\t</div><!-- /.info-box -->\n\t\t\t</div>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.bg-green{\n\tbackground: #4e9b78 !important;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-0e64a02a", module.exports)
  } else {
    hotAPI.update("_v-0e64a02a", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			transition.next();
		}
	},
	data: function data() {
		return {
			createMode: true,
			newModel: {},
			url: 'api/docentes'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"row\">\n\t<form action=\"\" @submit.prevent=\"create\">\n\t\t\n\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t</form>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-3a2bbfec", module.exports)
  } else {
    hotAPI.update("_v-3a2bbfec", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":48,"./mixins":52,"vue":24,"vue-hot-reload-api":20}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			transition.next();
		}
	},
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			createMode: false,
			newModel: {},
			loading: true,
			url: 'api/docentes'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<form action=\"\" @submit.prevent=\"update\">\n\t\t\t\n\t\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t\t</form>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-5e4259bc", module.exports)
  } else {
    hotAPI.update("_v-5e4259bc", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":48,"./mixins":52,"vue":24,"vue-hot-reload-api":20}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selectList = require('../../reusable/select-list.vue');

var _selectList2 = _interopRequireDefault(_selectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	beforeCompile: function beforeCompile() {
		if (this.createMode) {
			this.dataModel = this.initModel();
		}
	},

	components: {
		'select-list': _selectList2.default
	},
	methods: {
		initModel: function initModel() {
			return {
				id: null,
				abreviatura: null,
				nombres: null,
				apellidos: null,
				identificacion: null,
				tipo_identificacion: null,
				email: null,
				email_corporativo: null,
				celular: null,
				telefono: null,
				estado_civil: null,
				genero: null,
				titulo_pregrado: null,
				titulo_postgrado: null,
				titulo_mba: null,
				registro_senescyt: null,
				fecha_nacimiento: null,
				nacionalidad: null,
				residencia: null,
				direccion: null,
				tipo_contrato: null,
				estado: 'CONTRATADO'
			};
		}
	},
	props: {
		createMode: {
			type: Boolean,
			required: false,
			default: true
		},
		dataModel: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					id: null,
					abreviatura: null,
					nombres: null,
					apellidos: null,
					identificacion: null,
					tipo_identificacion: null,
					email: null,
					email_corporativo: null,
					celular: null,
					telefono: null,
					estado_civil: null,
					genero: null,
					titulo_pregrado: null,
					titulo_postgrado: null,
					titulo_mba: null,
					registro_senescyt: null,
					fecha_nacimiento: null,
					nacionalidad: null,
					residencia: null,
					direccion: null,
					tipo_contrato: null,
					estado: null
				};
			}
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<!--\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Catálogo</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.catalogo\" value-key=\"id\" label-key=\"descripcion\" url=\"api/catalogos-list\"></select-list>\n</div>\n-->\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Abreviatura Título</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.abreviatura\" placeholder=\"Ing\" minlength=\"3\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Nombres</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.nombres\" placeholder=\"Giancarlos Steven\" minlength=\"2\" required=\"\">\n\t<input type=\"hidden\" class=\"form-control\" :value=\"dataModel.id\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Apellidos</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.apellidos\" placeholder=\"Cercado Cedeño\" minlength=\"3\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Identificación</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.identificacion\" minlength=\"9\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Tipo de Identificación</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.tipo_identificacion\" :data=\"['CEDULA', 'RUC', 'PASAPORTE']\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Email Personal</label>\n\t<input type=\"email\" class=\"form-control\" v-model=\"dataModel.email\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Email Corporativo</label>\n\t<input type=\"email\" class=\"form-control\" v-model=\"dataModel.email_corporativo\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Celular</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.celular\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Teléfono</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.telefono\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Género</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.genero\" :data=\"['MASCULINO', 'FEMENINO']\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Estado Civil</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.estado_civil\" :data=\"['SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO']\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Fecha Nacimiento</label>\n\t<input type=\"date\" class=\"form-control\" v-model=\"dataModel.fecha_nacimiento\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Nacionalidad</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.nacionalidad\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Residencia</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.residencia\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Dirección</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.direccion\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Título Pregrado</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.titulo_pregrado\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Título Postgrado</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.titulo_postgrado\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Título MBA</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.titulo_mba\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Código de Registro Senescyt</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.registro_senescyt\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Tipo Contrato</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.tipo_contrato\" :data=\"['MEDIO_TIEMPO', 'TIEMPO_COMPLETO']\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\" v-if=\"!createMode\">\n\t<label>Tipo Contrato</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.estado\" :data=\"['CONTRATADO', 'CULMINADO', 'RENOVADO']\" :is-required=\"true\"></select-list>\n</div>\n\n\n<div class=\"col-xs-12\">\n\t<div class=\"content\">\n\t\t<button v-if=\"createMode\" class=\"btn btn-success btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR</button>\n\t\t<button v-else=\"\" class=\"btn btn-warning btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR CAMBIOS</button>\n\t\t<a v-link=\"{path: '/docentes'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-38d50dd4", module.exports)
  } else {
    hotAPI.update("_v-38d50dd4", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/select-list.vue":111,"vue":24,"vue-hot-reload-api":20}],49:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./create-view.vue":46,"./edit-view.vue":47,"./index.vue":50,"./list-view.vue":51,"./read-view.vue":53,"dup":32}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-docentes',
	components: {
		'content-header': _contentHeader2.default
	},
	route: {
		data: function data(transition) {
			transition.next();
		}
	},
	data: function data() {
		return {
			path: ['Administración', 'Docentes'],
			loading: true,
			titulo: 'Administración de Docentes',
			url: ''
		};
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header :title.sync=\"titulo\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-6e0ad706", module.exports)
  } else {
    hotAPI.update("_v-6e0ad706", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loading = require('../../reusable/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _coolTable = require('../../reusable/cool-table.vue');

var _coolTable2 = _interopRequireDefault(_coolTable);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			this.load();
			transition.next();
		}
	},
	data: function data() {
		return {
			url: 'api/docentes',
			toolbar: {
				iconClass: 'fa fa-plus',
				iconClassOptions: 'fa fa-cogs',
				label: 'Agregar',
				labelOptions: 'Campos visibles',
				nameEmit: 'docente-create-event',
				btnClass: 'btn btn-primary btn-flat'
			},
			datos: [],
			columnas: [{
				title: 'Nombres',
				field: 'nombres',
				hidden: false,
				sortable: true
			}, {
				title: 'Apellidos',
				field: 'apellidos',
				hidden: false,
				sortable: true
			}, {
				title: 'Identificación',
				field: 'identificacion',
				hidden: false,
				sortable: true
			}, {
				title: 'Correo',
				field: 'email',
				hidden: false,
				sortable: true
			}, {
				title: 'Tipo Contrato',
				field: 'tipo_contrato',
				hidden: false,
				sortable: true
			}, {
				title: 'Celular',
				field: 'celular',
				hidden: false,
				sortable: true
			}, {
				title: 'Acciones',
				titleClass: 'text-center',
				hidden: false,
				fieldClass: 'text-center',
				itemActions: [{
					nameEmit: 'docente-update-event',
					btnClass: 'btn btn-default btn-xs',
					iconClass: 'fa fa-edit',
					label: 'Editar'
				}, {
					nameEmit: 'docente-view-event',
					btnClass: 'btn btn-default btn-xs',
					iconClass: 'fa fa-eye',
					label: 'Visualizar'
				}, {
					nameEmit: 'docente-delete-event',
					btnClass: 'btn btn-danger btn-xs',
					iconClass: 'fa fa-trash',
					label: 'Eliminar'
				}]
			}],
			loading: false
		};
	},

	components: {
		'cool-table': _coolTable2.default,
		'app-loading': _loading2.default
	},
	events: {
		'docente-create-event': function docenteCreateEvent(model) {
			this.$router.go('/docentes/create');
		},
		'docente-update-event': function docenteUpdateEvent(model) {
			this.$router.go('/docentes/edit/' + model.id);
		},
		'docente-view-event': function docenteViewEvent(model) {
			this.$router.go('/docentes/view/' + model.id);
		},
		'docente-delete-event': function docenteDeleteEvent(model) {
			this.destroy(model);
		}
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t\n\t<div v-if=\"loading\">\n\t\t<app-loading></app-loading>\n\t</div>\n\n\t<div v-else=\"\">\n\t\t<cool-table :option-toolbar=\"toolbar\" :url=\"url\" :data.sync=\"datos\" :columns=\"columnas\" filter-key-word=\"search\">\n\t</cool-table>\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-498284b0", module.exports)
  } else {
    hotAPI.update("_v-498284b0", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/cool-table.vue":103,"../../reusable/loading.vue":104,"./mixins":52,"vue":24,"vue-hot-reload-api":20}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    create: function create() {
      this.$http.post(this.url, this.newModel).then(function (resp) {
        _reusable_functions2.default.niceAlert('success', 'Se creó el registro correctamente!');
        this.$router.go('/docentes');
      }, _reusable_functions2.default.tryError);
    },
    update: function update() {
      this.$http.put(this.url + '/' + this.newModel.id, this.newModel).then(function (resp) {
        _reusable_functions2.default.niceAlert('success', 'Se modificó el registro correctamente!');
        this.$router.go('/docentes');
      }, _reusable_functions2.default.tryError);
    },
    read: function read() {
      this.loading = true;
      this.$http.get(this.url + '/' + this.$route.params.model_id).then(function (resp) {
        this.newModel = resp.data.data;
        this.loading = false;
      }, _reusable_functions2.default.tryError);
    },
    destroy: function destroy(model) {
      if (confirm('¿Estás seguro?')) {
        this.$http.delete(this.url + '/' + model.id).then(function (resp) {
          _reusable_functions2.default.niceAlert('success', 'Se eliminó correctamente');
          this.load();
        }, _reusable_functions2.default.tryError);
      }
    },
    load: function load() {
      this.loading = true;
      this.$http.get(this.url).then(function (resp) {
        this.loading = false;
      }, _reusable_functions2.default.tryError);
    }

  }
}; /**
    * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
    * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
    */

},{"../../../util/reusable_functions":112}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			newModel: {},
			loading: true,
			url: 'api/docentes'
		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n<div class=\"row\" v-else=\"\">\n\n\t<div class=\"col-xs-12 col-sm-6\">\n\n\t\t<div class=\"box box-primary\">\n\t\t\t<div class=\"box-header with-border\">\n\t\t\t\t<h3 class=\"box-title\">Infomación Personal <i class=\"fa fa-user\" style=\"color:#3c8dbc;\"></i></h3>\n\t\t\t</div>\n\t\t\t<!-- /.box-header -->\n\t\t\t<div class=\"box-body\">\n\t\t\t\t<strong>Nombres</strong>\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\t{{newModel.nombres}}\n\t\t\t\t</p>\n\n\t\t\t\t<strong>Apellidos</strong>\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\t{{newModel.apellidos}}\n\t\t\t\t</p>\n\n\t\t\t\t<strong>Identificación</strong>\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\t{{newModel.identificacion}} <sub>{{newModel.tipo_identificacion}}</sub>\n\t\t\t\t</p>\n\n\t\t\t\t<strong>Género</strong>\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\t{{newModel.genero}}\n\t\t\t\t</p>\n\n\t\t\t\t<strong>Estado Civil</strong>\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\t{{newModel.estado_civil}}\n\t\t\t\t</p>\n\n\t\t\t\t<hr>\n\n\t\t\t\t<strong>Fecha Nacimiento <i class=\"fa fa-calendar-o\"></i></strong>\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\t<span class=\"label label-primary\">{{newModel.fecha_nacimiento}} </span>\n\t\t\t\t</p>\n\n\t\t\t\t<hr>\n\n\t\t\t\t\n\t\t\t\t<strong>Contacto <i class=\"fa fa-search-minus\"></i></strong>\n\n\t\t\t\t<p class=\"text-muted\"><a href=\"tel:+{{newModel.celular}}\">{{newModel.celular}} <i class=\"fa fa-mobile-phone\"></i> </a></p>\n\n\t\t\t\t<p class=\"text-muted\"><a href=\"tel:+{{newModel.telefono}}\">{{newModel.telefono}} <i class=\"fa fa-phone\"></i></a></p>\n\n\t\t\t\t<p class=\"text-muted\"><a href=\"mailto:{{newModel.email}}\">{{newModel.email}} <i class=\"fa fa-envelope-o\"></i></a></p>\n\n\t\t\t</div>\n\t\t\t<!-- /.box-body -->\n\t\t</div>\n\t</div>\n\t\n\t<div class=\"col-xs-12 col-sm-6\">\n\t\t<div class=\"box box-primary\">\n\t\t\t<div class=\"box-header with-border\">\n\t\t\t\t<h3 class=\"box-title\">Más Detalles <i class=\"fa fa-graduation-cap\" style=\"color:#3c8dbc;\"></i></h3>\n\t\t\t</div>\n\t\t\t<!-- /.box-header -->\n\t\t\t<div class=\"box-body\">\n\n\n\t\t\t\t<strong><i class=\"fa fa-briefcase margin-r-5\"></i> Tipo de Contrato</strong>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\t<span class=\"label label-success\" v-if=\"newModel.tipo_contrato=='TIEMPO_COMPLETO'\">\n\t\t\t\t\t\tTiempo Completo <i class=\"fa fa-clock-o\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"label label-warning\" v-else=\"\">\n\t\t\t\t\t\tMedio Tiempo <i class=\"fa fa-clock-o\"></i>\n\t\t\t\t\t</span>\n\t\t\t\t</p>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\t<span class=\"label label-success\" v-if=\"newModel.estado=='CONTRATADO' || newModel.estado=='RENOVADO'\">\n\t\t\t\t\t\t{{newModel.estado}} <sub>(Activo)</sub>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class=\"label label-warning\" v-else=\"\">\n\t\t\t\t\t\t{{newModel.estado}} <sub>(Inactivo)</sub>\n\t\t\t\t\t</span>\n\t\t\t\t</p>\n\n\t\t\t\t<hr>\n\t\t\t\t\n\n\t\t\t\t<strong><i class=\"fa fa-book margin-r-5\"></i> Educación</strong>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tTítulo PostGrado: {{newModel.titulo_postgrado ? newModel.titulo_postgrado : 'N/A'}}\n\t\t\t\t</p>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tTítulo Pregredo: {{newModel.titulo_pregrado ? newModel.titulo_pregrado : 'N/A'}}\n\t\t\t\t</p>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tTítulo MBA: {{newModel.titulo_mba ? newModel.titulo_mba : 'N/A'}}\n\t\t\t\t</p>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tTítulo Pregredo: {{newModel.titulo_pregrado ? newModel.titulo_pregrado : 'N/A'}}\n\t\t\t\t</p>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tRegistro Senescyt: {{newModel.registro_senescyt ? newModel.registro_senescyt : 'N/A'}}\n\t\t\t\t</p>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tEmail Corporativo: <a href=\"mailto:{{newModel.email_corporativo}}\">{{newModel.email_corporativo ? newModel.email_corporativo : 'N/A'}}</a>\n\t\t\t\t</p>\n\n\t\t\t\t<hr>\n\n\t\t\t\t<strong><i class=\"fa fa-map-marker margin-r-5\"></i> Localización</strong>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tNacionalidad: {{newModel.nacionalidad}}\n\t\t\t\t</p>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tResidencia: {{newModel.residencia}}\n\t\t\t\t</p>\n\n\t\t\t\t<p class=\"text-muted\">\n\t\t\t\t\tDirección: {{newModel.direccion}}\n\t\t\t\t</p>\n\n\t\t\t</div>\n\t\t\t<!-- /.box-body -->\n\t\t</div>\n\t</div>\n\n\t<div class=\"col-xs-12\">\n\t\t<a v-link=\"{path: '/docentes'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-d242a8a0", module.exports)
  } else {
    hotAPI.update("_v-d242a8a0", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./mixins":52,"vue":24,"vue-hot-reload-api":20}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	data: function data() {
		return {
			createMode: true,
			newModel: {},
			url: 'api/jornadasemestre'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"row\">\n\t<form action=\"\" @submit.prevent=\"create\">\n\t\t\n\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t</form>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-1609fb16", module.exports)
  } else {
    hotAPI.update("_v-1609fb16", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":56,"./mixins":60,"vue":24,"vue-hot-reload-api":20}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			createMode: false,
			newModel: {},
			loading: true,
			url: 'api/jornadasemestre'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<form action=\"\" @submit.prevent=\"update\">\n\t\t\t\n\t\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t\t</form>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-ed224a32", module.exports)
  } else {
    hotAPI.update("_v-ed224a32", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":56,"./mixins":60,"vue":24,"vue-hot-reload-api":20}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selectList = require('../../reusable/select-list.vue');

var _selectList2 = _interopRequireDefault(_selectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	beforeCompile: function beforeCompile() {
		if (this.createMode) {
			this.dataModel = this.initModel();
		}
	},

	components: {
		'select-list': _selectList2.default
	},
	methods: {
		initModel: function initModel() {
			return {
				catalogo_semestre: null,
				catalogo_aula: null,
				catalogo_jornada: null,
				id: null
			};
		}
	},
	props: {
		createMode: {
			type: Boolean,
			required: false,
			default: true
		},
		dataModel: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					catalogo_semestre: null,
					catalogo_aula: null,
					catalogo_jornada: null,
					id: null
				};
			}
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Jornada</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.catalogo_jornada\" value-key=\"codigo\" label-key=\"descripcion\" url=\"api/catalogos-list/5\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Semestre</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.catalogo_semestre\" value-key=\"codigo\" label-key=\"descripcion\" url=\"api/catalogos-list/2\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Aula</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.catalogo_aula\" value-key=\"codigo\" label-key=\"descripcion\" url=\"api/catalogos-list/4\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-xs-12\">\n\t<div class=\"content\">\n\t\t<button v-if=\"createMode\" class=\"btn btn-success btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR</button>\n\t\t<button v-else=\"\" class=\"btn btn-warning btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR CAMBIOS</button>\n\t\t<a v-link=\"{path: '/jornadasemestres'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-14b348fe", module.exports)
  } else {
    hotAPI.update("_v-14b348fe", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/select-list.vue":111,"vue":24,"vue-hot-reload-api":20}],57:[function(require,module,exports){
'use strict';

var _index = require('./index.vue');

var _index2 = _interopRequireDefault(_index);

var _listView = require('./list-view.vue');

var _listView2 = _interopRequireDefault(_listView);

var _createView = require('./create-view.vue');

var _createView2 = _interopRequireDefault(_createView);

var _editView = require('./edit-view.vue');

var _editView2 = _interopRequireDefault(_editView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	component: _index2.default,
	subRoutes: {
		'/': {
			component: _listView2.default,
			name: 'Listar'
		},
		'/create': {
			name: 'Crear',
			component: _createView2.default
		},
		'/edit/:model_id': {
			name: 'Edición',
			component: _editView2.default
		}
	}
};

},{"./create-view.vue":54,"./edit-view.vue":55,"./index.vue":58,"./list-view.vue":59}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-materias-docentes',
	components: {
		'content-header': _contentHeader2.default
	},
	route: {
		data: function data(transition) {
			transition.next();
		}
	},
	data: function data() {
		return {
			path: ['Cargas Horarias', 'Jornadas Semestres'],
			loading: true,
			titulo: 'Jornadas por semestres',
			url: ''
		};
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header :title.sync=\"titulo\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-e536b49e", module.exports)
  } else {
    hotAPI.update("_v-e536b49e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],59:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.show-div{\n\tz-index: 999;\n}\n.btn-spacing{\n\tmargin: .5em;\n}\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loading = require('../../reusable/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _coolTable = require('../../reusable/cool-table.vue');

var _coolTable2 = _interopRequireDefault(_coolTable);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			this.load();
			transition.next();
		}
	},
	data: function data() {
		return {
			showModal: false,
			url: 'api/jornadasemestre',
			toolbar: null,
			currentModel: {},
			materiasSeleccionadas: [],
			datos: [],
			columnas: [{
				title: 'Ciclo',
				field: 'ciclo',
				hidden: false,
				sortable: true,
				template: '${col.descripcion_ciclo.anio} - ${col.descripcion_ciclo.anio+1} (${col.descripcion_ciclo.ciclo})'
			}, {
				title: 'Jornada',
				field: 'jornada',
				hidden: false,
				sortable: false,
				template: '<span class="text-${col.catalogo_jornada=="MAT"?"aqua":col.catalogo_jornada=="VES"?"yellow":"light-blue"}">${col.jornada.descripcion} </span>'

			}, {
				title: 'Semestre',
				field: 'semestre',
				hidden: false,
				sortable: false,
				template: '${col.semestre.descripcion}'
			}, {
				title: 'Curso / Aula / Paralelo',
				field: 'aula',
				hidden: false,
				sortable: false,
				template: '${col.aula.codigo} - ${col.aula.descripcion}'
			}, {
				title: 'Opciones',
				titleClass: 'text-center',
				hidden: false,
				fieldClass: 'text-center',
				itemActions: [
				/*
    {
    nameEmit: 'jornadasemestre-update-event',
    btnClass: 'btn btn-primary btn-xs',
    iconClass: 'fa fa-pencil',
    label: 'Modificar'
    },
    */
				{
					nameEmit: 'jornadasemestre-delete-event',
					btnClass: 'btn btn-danger btn-xs',
					iconClass: 'fa fa-close',
					label: 'Eliminar'
				}]
			}],
			loading: false
		};
	},

	components: {
		'cool-table': _coolTable2.default,
		'app-loading': _loading2.default
	},
	events: {
		'jornadasemestre-update-event': function jornadasemestreUpdateEvent(model) {
			this.$router.go('/jornadasemestres/edit/' + model.id);
		},
		'jornadasemestre-delete-event': function jornadasemestreDeleteEvent(model) {
			this.destroy(model);
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t\n\t<div v-if=\"loading\">\n\t\t<app-loading></app-loading>\n\t</div>\n\n\t<div v-else=\"\">\n\t\t<div class=\"col-xs-12 show-div\">\n\t\t\t<a v-link=\"{path: '/jornadasemestres/create'}\" class=\"btn btn-primary btn-flat btn-spacing\"> <i class=\"fa fa-plus-o\"></i> AGREGAR JORNADA</a>\n\t\t</div>\n\t\t<cool-table :option-toolbar=\"toolbar\" :url=\"url\" :data.sync=\"datos\" :columns=\"columnas\" filter-key-word=\"search\">\n\t</cool-table>\n\n\t<!-- Modal logic -->\n\n\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.show-div{\n\tz-index: 999;\n}\n.btn-spacing{\n\tmargin: .5em;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-066b3ed3", module.exports)
  } else {
    hotAPI.update("_v-066b3ed3", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/cool-table.vue":103,"../../reusable/loading.vue":104,"./mixins":60,"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	methods: {
		create: function create() {
			this.$http.post(this.url, this.newModel).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se agregó la jornada correctamente!');
				this.$router.go('/jornadasemestres');
			}, _reusable_functions2.default.tryError);
		},
		update: function update() {
			this.$http.put(this.url + '/' + this.newModel.id, this.newModel).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se realizó la modificación correcatamente!');
				this.$router.go('/jornadasemestres');
			}, _reusable_functions2.default.tryError);
		},
		read: function read() {
			this.loading = true;
			this.$http.get(this.url + '/' + this.$route.params.model_id).then(function (resp) {
				this.newModel = resp.data.data;
				this.loading = false;
			}, _reusable_functions2.default.tryError);
		},
		destroy: function destroy(model) {
			if (confirm('¿Estás seguro?')) {
				this.$http.delete(this.url + '/' + model.id).then(function (resp) {
					_reusable_functions2.default.niceAlert('success', 'Se eliminó correctamente');
					this.load();
				}, _reusable_functions2.default.tryError);
			}
		},
		load: function load() {
			this.loading = true;
			this.$http.get(this.url).then(function (resp) {
				this.loading = false;
			}, _reusable_functions2.default.tryError);
		}
	}
}; /**
    * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
    * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
    */

},{"../../../util/reusable_functions":112}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			transition.next();
		}
	},
	data: function data() {
		return {
			createMode: true,
			newModel: {},
			url: 'api/malla_academica'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"row\">\n\t<form action=\"\" @submit.prevent=\"create\">\n\t\t\n\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t</form>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-856f09ba", module.exports)
  } else {
    hotAPI.update("_v-856f09ba", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":63,"./mixins":67,"vue":24,"vue-hot-reload-api":20}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			transition.next();
		}
	},
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			createMode: false,
			newModel: {},
			loading: true,
			url: 'api/malla_academica'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<form action=\"\" @submit.prevent=\"update\">\n\t\t\t\n\t\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t\t</form>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-567ea715", module.exports)
  } else {
    hotAPI.update("_v-567ea715", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":63,"./mixins":67,"vue":24,"vue-hot-reload-api":20}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selectList = require('../../reusable/select-list.vue');

var _selectList2 = _interopRequireDefault(_selectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	beforeCompile: function beforeCompile() {
		if (this.createMode) {
			this.dataModel = this.initModel();
		}
	},

	components: {
		'select-list': _selectList2.default
	},
	methods: {
		initModel: function initModel() {
			return {
				id: null,
				codigo_materia: null,
				nombre_materia: null,
				semestre: null,
				horas: null,
				estado: null
			};
		}
	},
	props: {
		createMode: {
			type: Boolean,
			required: false,
			default: true
		},
		dataModel: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					id: null,
					codigo_materia: null,
					nombre_materia: null,
					semestre: null,
					horas: null,
					estado: null
				};
			}
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<!--\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Catálogo</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.catalogo\" value-key=\"id\" label-key=\"descripcion\" url=\"api/catalogos-list\"></select-list>\n</div>\n-->\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Código Materia</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.codigo_materia\" minlength=\"2\" required=\"\">\n\t<input type=\"hidden\" class=\"form-control\" :value=\"dataModel.id\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Nombre Materia</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.nombre_materia\" minlength=\"6\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Semestre</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.semestre\" value-key=\"codigo\" label-key=\"descripcion\" url=\"api/catalogos-list/2\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Horas</label>\n\t<input type=\"number\" class=\"form-control\" v-model=\"dataModel.horas\" min=\"0\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Estado</label>\n\t<select name=\"estado\" id=\"estado\" class=\"form-control\" v-model=\"dataModel.estado\" required=\"\">\n\t\t<option value=\"VIGENTE\">VIGENTE</option>\n\t\t<option value=\"INACTIVO\">INACTIVO</option>\n\t\t<option value=\"NO_CALCULABLE\">NO_CALCULABLE</option>\n\t</select>\n</div>\n\n<div class=\"col-xs-12\">\n\t<div class=\"content\">\n\t\t<button v-if=\"createMode\" class=\"btn btn-success btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR</button>\n\t\t<button v-else=\"\" class=\"btn btn-warning btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR CAMBIOS</button>\n\t\t<a v-link=\"{path: '/malla_academica'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-841857a2", module.exports)
  } else {
    hotAPI.update("_v-841857a2", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/select-list.vue":111,"vue":24,"vue-hot-reload-api":20}],64:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./create-view.vue":61,"./edit-view.vue":62,"./index.vue":65,"./list-view.vue":66,"./read-view.vue":68,"dup":32}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-malla-academica',
	components: {
		'content-header': _contentHeader2.default
	},
	route: {
		data: function data(transition) {
			transition.next();
		}
	},
	data: function data() {
		return {
			path: ['Administración', 'Malla Académica'],
			loading: true,
			titulo: 'Malla Académica',
			url: ''
		};
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header :title.sync=\"titulo\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-18adb8df", module.exports)
  } else {
    hotAPI.update("_v-18adb8df", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],66:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\n.__materia{\n\tcolor: #656464;\n}\n\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loading = require('../../reusable/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _modal = require('../../reusable/modal.vue');

var _modal2 = _interopRequireDefault(_modal);

var _coolTable = require('../../reusable/cool-table.vue');

var _coolTable2 = _interopRequireDefault(_coolTable);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			this.load();
			transition.next();
		}
	},
	data: function data() {
		return {
			url: 'api/malla_academica',
			toolbar: {
				iconClass: 'fa fa-plus',
				iconClassOptions: 'fa fa-cogs',
				label: 'Agregar',
				labelOptions: 'Campos visibles',
				nameEmit: 'malla-create-event',
				btnClass: 'btn btn-primary btn-flat'
			},
			datos: [],
			columnas: [{
				title: 'Código',
				field: 'codigo_materia',
				hidden: false,
				sortable: true
			}, {
				title: 'Nombre Materia',
				field: 'nombre_materia',
				hidden: false,
				sortable: true
			}, {
				title: 'Semestre',
				field: 'semestre',
				hidden: false,
				sortable: true,
				template: '<span>${col.descripcion_semestre.descripcion}</span>'
			}, {
				title: 'Horas',
				field: 'horas',
				hidden: false,
				sortable: true
			}, {
				title: 'Estado',
				field: 'estado',
				hidden: false,
				sortable: true
			}, {
				titleClass: 'text-center',
				fieldClass: 'text-center',
				title: 'Sílabos',
				field: "silabos",
				hidden: false,
				sortable: false,
				template: '<i class="${col.silabos.length > 0 ? "fa fa-check text-green" : "fa fa-close text-red"}" ><i>'
			}, {
				title: 'Acciones',
				titleClass: 'text-center',
				hidden: false,
				fieldClass: 'text-center',
				itemActions: [{
					nameEmit: 'malla-silabos-event',
					btnClass: 'btn bg-gray btn-xs',
					iconClass: 'fa fa-file-pdf-o',
					label: 'Sílabos'
				}, {
					nameEmit: 'malla-update-event',
					btnClass: 'btn btn-default btn-xs',
					iconClass: 'fa fa-edit',
					label: 'Editar'
				}, {
					nameEmit: 'malla-delete-event',
					btnClass: 'btn btn-danger btn-xs',
					iconClass: 'fa fa-trash',
					label: 'Eliminar'
				}]
			}],
			loading: false,
			loading_button: false,
			currentModel: { silabos: [] },
			showModal: false
		};
	},

	components: {
		'cool-table': _coolTable2.default,
		'app-loading': _loading2.default,
		'app-modal': _modal2.default
	},
	events: {
		'malla-create-event': function mallaCreateEvent(model) {
			this.$router.go('/malla_academica/create');
		},
		'malla-update-event': function mallaUpdateEvent(model) {
			this.$router.go('/malla_academica/edit/' + model.id);
		},
		'malla-delete-event': function mallaDeleteEvent(model) {
			this.destroy(model);
		},
		'malla-silabos-event': function mallaSilabosEvent(model) {
			this.toggleDataModel(model);
			this.toggleModal();
		}
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t\n\t<div v-if=\"loading\">\n\t\t<app-loading></app-loading>\n\t</div>\n\n\t<div v-else=\"\">\n\t\t<cool-table :option-toolbar=\"toolbar\" :url=\"url\" :data.sync=\"datos\" :columns=\"columnas\" filter-key-word=\"search\">\n\t\t</cool-table>\n\n\t\t<app-modal title=\"Actualización de Sílabos\" :show.sync=\"showModal\" @ok=\"toggleModal\" @cancel=\"toggleModal\" emit-when-ok=\"event-end-edit-silabos\" :large=\"true\">\n\t\t\t\n\t\t<div class=\"row\">\n\t\t\t<form id=\"frm-silabos\" @submit.prevent=\"uploadFiles\">\n\t\t\t\t<div class=\"col-xs-12 col-sm-7\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"documentos\">Seleccione los Sílabos para: <span class=\"__materia\">{{currentModel.nombre_materia}} - {{currentModel.semestre}}</span> </label>\n\t\t\t\t\t\t<input type=\"file\" id=\"documentos\" name=\"documentos[]\" accept=\"application/pdf\" class=\"form-control\" multiple=\"\" required=\"\">\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-xs-12 col-sm-5 text-center\">\n\t\t\t\t\t<p class=\"text-light-blue\"><i class=\"fa fa-info-circle\"></i> Solo se admiten archivos PDF</p>\n\t\t\t\t\t<p class=\"text-red\"><i class=\"fa fa-warning\"></i> <strong>Nota:</strong> Sí ya existe algún archivo subido, éste o estos serán elmininados para subir los nuevos!</p>\n\t\t\t\t\t<template v-if=\"load_button\">\n\t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-flat\" disabled=\"\"><i class=\"fa fa-refresh fa-spin\"></i> SUBIENDO ARCHIVOS</button>\t\t\t\t\t\t\n\t\t\t\t\t</template>\n\t\t\t\t\t<template v-else=\"\">\n\t\t\t\t\t\t<button type=\"submit\" class=\"btn btn-primary btn-flat\"><i class=\"fa fa-upload\"></i> SUBIR ARCHIVOS</button>\n\t\t\t\t\t</template>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t\t\t\n\t\t\t<div class=\"col-xs-12\" v-if=\"currentModel.silabos.length<=0\">\n\t\t\t\t<hr>\n\t\t\t\t<div class=\"text-center\">\n\t\t\t\t\t<p>No hay archivos subidos</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"col-xs-12\" v-else=\"\">\n\t\t\t\t<hr>\n\t\t\t\t<div class=\"col-xs-12\" v-for=\"item in currentModel.silabos\">\n\t\t\t\t\t<iframe :src=\"item.ruta\" frameborder=\"0\" height=\"400\" width=\"100%\"></iframe>\n\t\t\t\t\t<hr>\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t</app-modal>\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\n.__materia{\n\tcolor: #656464;\n}\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-5909e9fe", module.exports)
  } else {
    hotAPI.update("_v-5909e9fe", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/cool-table.vue":103,"../../reusable/loading.vue":104,"../../reusable/modal.vue":109,"./mixins":67,"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    //For list-view.vue
    toggleModal: function toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleDataModel: function toggleDataModel(model) {
      this.currentModel = model;
    },
    toggleLoadButton: function toggleLoadButton() {
      this.load_button = !this.load_button;
    },
    //for send files silabos
    uploadFiles: function uploadFiles() {
      this.load_button = true;
      var idMateriaMalla = this.currentModel.id;
      var formData = new FormData(document.querySelector("#frm-silabos"));
      this.$http.post(this.url + '/' + idMateriaMalla + '/silabos', formData).then(function (resp) {
        _reusable_functions2.default.niceAlert('success', 'Se Subieron los archivos correctamente!');
        this.toggleLoadButton();
        this.load(); //load table
        this.toggleModal();
      }, _reusable_functions2.default.tryError);
    },

    //for crud
    create: function create() {
      this.$http.post(this.url, this.newModel).then(function (resp) {
        _reusable_functions2.default.niceAlert('success', 'Se creó la materia correctamente!');
        this.$router.go('/malla_academica');
      }, _reusable_functions2.default.tryError);
    },
    update: function update() {
      this.$http.put(this.url + '/' + this.newModel.id, this.newModel).then(function (resp) {
        _reusable_functions2.default.niceAlert('success', 'Se modificó correctamente la materia!');
        this.$router.go('/malla_academica');
      }, _reusable_functions2.default.tryError);
    },
    read: function read() {
      this.loading = true;
      this.$http.get(this.url + '/' + this.$route.params.model_id).then(function (resp) {
        this.newModel = resp.data.data;
        this.loading = false;
      }, _reusable_functions2.default.tryError);
    },
    destroy: function destroy(model) {
      if (confirm('¿Estás seguro?')) {
        this.$http.delete(this.url + '/' + model.id).then(function (resp) {
          _reusable_functions2.default.niceAlert('success', 'Se eliminó correctamente');
          this.load();
        }, _reusable_functions2.default.tryError);
      }
    },
    load: function load() {
      this.loading = true;
      this.$http.get(this.url).then(function (resp) {
        this.loading = false;
      }, _reusable_functions2.default.tryError);
    }

  }
}; /**
    * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
    * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
    */

},{"../../../util/reusable_functions":112}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			newModel: {},
			loading: true,
			url: 'api/catalogos'
		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<div class=\"col-xs-12\">\n\t\t\t<strong>Nombre:</strong>\n\t\t\t<p>{{newModel.nombre}}</p>\n\t\t</div>\n\t\t<div class=\"col-xs-12\">\n\t\t\t<strong>Descripción:</strong>\n\t\t\t<p>{{newModel.descripcion}}</p>\n\t\t</div>\n\t\t<div class=\"col-xs-12\">\n\t\t\t<a v-link=\"{path: '/catalogos'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t\t</div>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-e1ca0dee", module.exports)
  } else {
    hotAPI.update("_v-e1ca0dee", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./mixins":67,"vue":24,"vue-hot-reload-api":20}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = 'api/menu';

exports.default = {
	data: function data() {
		return {
			createMode: true,
			newModel: {}
		};
	},

	components: {
		'form-inputs': _formFields2.default
	},
	methods: {
		create: function create() {
			this.$http.post(URL, this.newModel).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se creó el menú correctamente!');
				this.$router.go('/menu');
			}, _reusable_functions2.default.tryError);
		}
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"row\">\n\t<form action=\"\" @submit.prevent=\"create\">\n\t\t\n\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t</form>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-54b6637c", module.exports)
  } else {
    hotAPI.update("_v-54b6637c", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"./form-fields.vue":71,"vue":24,"vue-hot-reload-api":20}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL = 'api/menu';

exports.default = {
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			createMode: false,
			newModel: {},
			loading: true
		};
	},

	components: {
		'form-inputs': _formFields2.default
	},
	methods: {
		update: function update() {
			this.$http.put(URL + '/' + this.newModel.id, this.newModel).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se modificó correctamente el menú!');
				this.$router.go('/menu');
			}, function (err) {
				console.warn(err);
				_reusable_functions2.default.niceAlert('error', err.dev_message);
			});
		},
		read: function read() {
			this.loading = true;
			this.$http.get(URL + '/' + this.$route.params.model_id).then(function (resp) {
				this.newModel = resp.data.data;
				this.loading = false;
			}, function (err) {
				console.warn(err);
				_reusable_functions2.default.niceAlert('error', err.message);
				this.loading = false;
			});
		}
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<form action=\"\" @submit.prevent=\"update\">\n\t\t\t\n\t\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t\t</form>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-2dc335f4", module.exports)
  } else {
    hotAPI.update("_v-2dc335f4", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"./form-fields.vue":71,"vue":24,"vue-hot-reload-api":20}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selectList = require('../../reusable/select-list.vue');

var _selectList2 = _interopRequireDefault(_selectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	beforeCompile: function beforeCompile() {
		if (this.createMode) {
			this.dataModel = this.initModel();
		}
	},

	components: {
		'select-list': _selectList2.default
	},
	methods: {
		initModel: function initModel() {
			return {
				cod_padre: null,
				cod_rol: null,
				titulo: null,
				nombre: null,
				iconclass: null,
				url: null,
				orden: null
			};
		}
	},
	props: {
		createMode: {
			type: Boolean,
			required: false,
			default: true
		},
		dataModel: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					cod_padre: null,
					cod_rol: null,
					titulo: null,
					nombre: null,
					iconclass: null,
					url: null,
					orden: null
				};
			}
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Menu padre</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.cod_padre\" value-key=\"id\" label-key=\"name\" url=\"api/menu-list\" nullable-label=\"--Este es padre --\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Título</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.titulo\" minlength=\"3\" required=\"\">\n\t<input type=\"hidden\" class=\"form-control\" :value=\"dataModel.titulo\" v-model=\"dataModel.nombre\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Font-Awesome - Icono: <i :class=\"dataModel.iconclass\"></i> </label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.iconclass\" minlength=\"3\"> \n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Url</label> <small>(Opcional)</small>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.url\" minlength=\"3\"> \n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>orden</label>\n\t<input type=\"number\" class=\"form-control\" v-model=\"dataModel.orden\" min=\"0\"> \n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Rol de acceso</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.cod_rol\" value-key=\"id\" label-key=\"name\" url=\"api/rol\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-xs-12\">\n\t<div class=\"content\">\n\t\t<button v-if=\"createMode\" class=\"btn btn-success btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR</button>\n\t\t<button v-else=\"\" class=\"btn btn-warning btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR CAMBIOS</button>\n\t\t<a v-link=\"{path: '/menu'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-535fb164", module.exports)
  } else {
    hotAPI.update("_v-535fb164", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/select-list.vue":111,"vue":24,"vue-hot-reload-api":20}],72:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./create-view.vue":69,"./edit-view.vue":70,"./index.vue":73,"./list-view.vue":74,"./read-view.vue":75,"dup":32}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Loading from '../../reusable/loading.vue';

exports.default = {
	name: 'content-materias',
	components: {
		'content-header': _contentHeader2.default
	},
	data: function data() {
		return {
			path: ['Sistema', 'Menú'],
			loading: true
		};
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header title=\"Menú\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-15dae184", module.exports)
  } else {
    hotAPI.update("_v-15dae184", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _menuManagement = require('../../reusable/menuManagement.vue');

var _menuManagement2 = _interopRequireDefault(_menuManagement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	components: {
		'app-gestor-menu': _menuManagement2.default
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<app-gestor-menu url=\"api/menu\"></app-gestor-menu>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-aa80cc40", module.exports)
  } else {
    hotAPI.update("_v-aa80cc40", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/menuManagement.vue":108,"vue":24,"vue-hot-reload-api":20}],75:[function(require,module,exports){
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<h3>Visualización</h3>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptate laborum, a accusamus. Cum aperiam dignissimos iste, placeat facere repudiandae vel, doloribus voluptatibus perferendis esse illo, dicta. Inventore, possimus, illum!</p>\n<pre>{{$route.params.model_id|json}}</pre>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-665f87e8", module.exports)
  } else {
    hotAPI.update("_v-665f87e8", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],76:[function(require,module,exports){
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<h3>Crear</h3>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus nulla veniam animi sequi dolorem quae repellat incidunt fuga. Deserunt commodi repellat maiores voluptate, non ullam placeat accusantium quo culpa temporibus.</p>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-5510c697", module.exports)
  } else {
    hotAPI.update("_v-5510c697", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],77:[function(require,module,exports){
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<h3>Modificar</h3>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus nulla veniam animi sequi dolorem quae repellat incidunt fuga. Deserunt commodi repellat maiores voluptate, non ullam placeat accusantium quo culpa temporibus.</p>\n<pre>{{$route.params.model_id|json}}</pre>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-41e980ee", module.exports)
  } else {
    hotAPI.update("_v-41e980ee", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],78:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./create-view.vue":76,"./edit-view.vue":77,"./index.vue":79,"./list-view.vue":80,"./read-view.vue":81,"dup":32}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-materias',
	components: {
		'content-header': _contentHeader2.default
	},
	data: function data() {
		return {
			path: ['Materias']
		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header title=\"Materias\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-11a0ab53", module.exports)
  } else {
    hotAPI.update("_v-11a0ab53", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],80:[function(require,module,exports){
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<h3>Listar</h3>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam est reprehenderit fugiat cumque alias, sed fugit ab natus eum maxime perferendis dolorum facere mollitia in error. Quia minima laboriosam, blanditiis.</p>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-5c07a375", module.exports)
  } else {
    hotAPI.update("_v-5c07a375", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],81:[function(require,module,exports){
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<h3>Visualización</h3>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptate laborum, a accusamus. Cum aperiam dignissimos iste, placeat facere repudiandae vel, doloribus voluptatibus perferendis esse illo, dicta. Inventore, possimus, illum!</p>\n<pre>{{$route.params.model_id|json}}</pre>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-17a7917d", module.exports)
  } else {
    hotAPI.update("_v-17a7917d", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],82:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\n.__user{\n\tcolor: #656464;\n}\n\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _vueMultiselect = require('vue-multiselect');

var _vueMultiselect2 = _interopRequireDefault(_vueMultiselect);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	computed: {
		isInvalid: function isInvalid() {
			return this.isTouched && this.selected.length === 0;
		},
		docente: function docente() {
			var _dataModel = this.dataModel;
			var nombres = _dataModel.nombres;
			var abreviatura = _dataModel.abreviatura;
			var apellidos = _dataModel.apellidos;

			return abreviatura + '. ' + nombres + ' ' + apellidos;
		}
	},

	components: {
		'multiselect': _vueMultiselect2.default
	},

	props: {
		selected: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		dataModel: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					id: null,
					nombres: null,
					apellidos: null,
					abrevatura: null
				};
			}
		}
	},
	ready: function ready() {
		//para la lista de materias en el formulario Modal
		this.loadList();
	},
	data: function data() {
		return {
			options: [{
				materia: 17,
				desc: 'Opcion 1'
			}],
			templateLimit: function templateLimit(count) {
				return 'y ' + count + ' más';
			}

		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<div class=\"col-xs-12\">\n\t<div class=\"{'invalid': isInvalid}\">\n\t\t<label>Docente: <span class=\"__user\">{{docente}}</span></label>\n\t\t<multiselect :options=\"options\" :selected.sync=\"selected\" :multiple=\"true\" :searchable=\"true\" :close-on-select=\"true\" :clear-on-select=\"false\" placeholder=\"Hasta 3 materias\" :hide-selected=\"true\" label=\"desc\" :max=\"4\" :taggable=\"true\" select-label=\"Presione enter para seleccionar\" deselect-label=\"Presione enter para remover\" :limit-text=\"templateLimit\" key=\"materia\"></multiselect>\n\t</div>\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\n.__user{\n\tcolor: #656464;\n}\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-e753518e", module.exports)
  } else {
    hotAPI.update("_v-e753518e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./mixins":86,"vue":24,"vue-hot-reload-api":20,"vue-multiselect":21,"vueify/lib/insert-css":25}],83:[function(require,module,exports){
'use strict';

var _index = require('./index.vue');

var _index2 = _interopRequireDefault(_index);

var _listView = require('./list-view.vue');

var _listView2 = _interopRequireDefault(_listView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
   component: _index2.default,
   subRoutes: {
      '/': {
         component: _listView2.default,
         name: 'Listar'
      }
   }
};

},{"./index.vue":84,"./list-view.vue":85}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-materias-docentes',
	components: {
		'content-header': _contentHeader2.default
	},
	route: {
		data: function data(transition) {
			transition.next();
		}
	},
	data: function data() {
		return {
			path: ['Cargas Horarias', 'Materias Docentes'],
			loading: true,
			titulo: 'Materias Docentes',
			url: ''
		};
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header :title.sync=\"titulo\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-106c692e", module.exports)
  } else {
    hotAPI.update("_v-106c692e", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loading = require('../../reusable/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _modal = require('../../reusable/modal.vue');

var _modal2 = _interopRequireDefault(_modal);

var _coolTable = require('../../reusable/cool-table.vue');

var _coolTable2 = _interopRequireDefault(_coolTable);

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	route: {
		data: function data(transition) {
			this.load();
			transition.next();
		}
	},
	data: function data() {
		return {
			showModal: false,
			url: 'api/docentes',
			toolbar: null,
			currentModel: {},
			materiasSeleccionadas: [],
			datos: [],
			columnas: [{
				title: 'Docente',
				field: 'nombres',
				hidden: false,
				sortable: true,
				template: '${col.abreviatura}. ${col.nombres} ${col.apellidos}'
			}, {
				title: 'Materias',
				field: 'materias',
				hidden: false,
				sortable: false,
				template: '${col.materias.map(function(ele){return ele.materia_detail.nombre_materia;}).join(", ")}'
			}, {
				title: 'Gestionar Materias',
				titleClass: 'text-center',
				hidden: false,
				fieldClass: 'text-center',
				itemActions: [{
					nameEmit: 'materias-docente-update-event',
					btnClass: 'btn btn-primary btn-xs',
					iconClass: 'fa fa-pencil',
					label: 'Modificar'
				}]
			}],
			loading: false
		};
	},

	components: {
		'cool-table': _coolTable2.default,
		'app-loading': _loading2.default,
		'app-modal': _modal2.default,
		'formulario': _formFields2.default
	},
	events: {
		'materias-docente-update-event': function materiasDocenteUpdateEvent(model) {
			this.toggleDataModel(model);
			this.toggleModal();
		},
		//when modal emit ok
		'event-end-edit': function eventEndEdit() {
			this.update();
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t\n\t<div v-if=\"loading\">\n\t\t<app-loading></app-loading>\n\t</div>\n\n\t<div v-else=\"\">\n\t\t<cool-table :option-toolbar=\"toolbar\" :url=\"url\" :data.sync=\"datos\" :columns=\"columnas\" filter-key-word=\"search\">\n\t</cool-table>\n\n\t<!-- Modal logic -->\n\n\t<app-modal title=\"Asignación de Materias\" :show.sync=\"showModal\" @ok=\"toggleModal\" @cancel=\"toggleModal\" emit-when-ok=\"event-end-edit\">\n\t\t<div class=\"row\">\n\t\t\t<form action=\"\" @submit.prevent=\"update\">\n\n\t\t\t\t<formulario :data-model.sync=\"currentModel\" :selected.sync=\"materiasSeleccionadas\"></formulario>\n\n\t\t\t</form>\n\t\t</div>\n\t</app-modal>\n\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-6c526eea", module.exports)
  } else {
    hotAPI.update("_v-6c526eea", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/cool-table.vue":103,"../../reusable/loading.vue":104,"../../reusable/modal.vue":109,"./form-fields.vue":82,"./mixins":86,"vue":24,"vue-hot-reload-api":20}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_URL = 'api/docentes/materias'; /**
                                        * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
                                        * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
                                        */

var API_URL_LIST_MATERIAS = 'api/malla_academica/all';

exports.default = {
  methods: {
    //For list-view.vue
    toggleModal: function toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleDataModel: function toggleDataModel(model) {
      this.currentModel = model;
      this.toggleMaterias();
    },
    toggleMaterias: function toggleMaterias() {
      var data = [],
          materia_id = void 0,
          desc = void 0,
          self = this,
          materias = self.currentModel.materias;

      for (var idx in materias) {
        materia_id = materias[idx].materia;
        desc = materias[idx].materia_detail.nombre_materia + ' | ' + materias[idx].materia_detail.semestre;
        data.push({ materia: materia_id, desc: desc });
      }

      this.materiasSeleccionadas = data;
    },
    load: function load() {
      this.loading = true;
      this.$http.get(this.url).then(function (resp) {
        this.loading = false;
      }, _reusable_functions2.default.tryError);
    },

    //for edit-view.vue
    update: function update() {
      var materias = this.materiasSeleccionadas;
      var self = this;
      self.$http.put(API_URL + '/' + this.currentModel.id, { materias: materias }).then(function (resp) {
        _reusable_functions2.default.niceAlert('success', 'Esta información ha sido modificada correctamente!');
        //setTimeout(function(){self.$router.go('/materias_docentes');}, 10);
        self.$router.go('/materias_docentes?' + +new Date()); //random token
      }, _reusable_functions2.default.tryError);
    },
    loadList: function loadList() {
      var self = this;
      self.$http.get(API_URL_LIST_MATERIAS).then(function (resp) {
        self.formatedList(resp.data.data);
      }, _reusable_functions2.default.tryError);
    },
    formatedList: function formatedList(data) {
      this.options = [];
      for (var i in data) {
        this.options.push({ materia: data[i].id, desc: data[i].nombre_materia + ' | ' + data[i].semestre });
      }
    }

  }
};

},{"../../../util/reusable_functions":112}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	data: function data() {
		return {
			createMode: true,
			newModel: {},
			url: 'api/users'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"row\">\n\t<form action=\"\" @submit.prevent=\"create\">\n\t\t\n\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t</form>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-fe937324", module.exports)
  } else {
    hotAPI.update("_v-fe937324", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":89,"./mixins":93,"vue":24,"vue-hot-reload-api":20}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _formFields = require('./form-fields.vue');

var _formFields2 = _interopRequireDefault(_formFields);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			createMode: false,
			newModel: {},
			loading: true,
			url: 'api/users'
		};
	},

	components: {
		'form-inputs': _formFields2.default
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\t<div class=\"row\" v-else=\"\">\n\t\t<form action=\"\" @submit.prevent=\"update\">\n\t\t\t\n\t\t\t<form-inputs :create-mode=\"createMode\" :data-model.sync=\"newModel\"></form-inputs>\n\n\t\t</form>\n\t</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-06266dc0", module.exports)
  } else {
    hotAPI.update("_v-06266dc0", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./form-fields.vue":89,"./mixins":93,"vue":24,"vue-hot-reload-api":20}],89:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.profile-ima-edit{\n\twidth: 200px;\n\theight: 200px;\n\tborder-radius: 50%;\n\tmargin-right: 10px;\n\tmargin-top: -2px;\n}\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _selectList = require('../../reusable/select-list.vue');

var _selectList2 = _interopRequireDefault(_selectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	beforeCompile: function beforeCompile() {
		if (this.createMode) {
			this.dataModel = this.initModel();
		}
	},

	components: {
		'select-list': _selectList2.default
	},
	data: function data() {
		return {
			byFalse: 'INACTIVO',
			byTrue: 'ACTIVO'
		};
	},

	methods: {
		initModel: function initModel() {
			return {
				name: null,
				email: null,
				id: null,
				state: null,
				rol: null
			};
		}
	},
	props: {
		createMode: {
			type: Boolean,
			required: false,
			default: true
		},
		dataModel: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					name: null,
					email: null,
					id: null,
					state: null,
					rol: null
				};
			}
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<div class=\"col-xs-12 col-sm-4 col-md-3\" v-if=\"!createMode\">\n\t<img :src=\"dataModel.avatar\" class=\"profile-ima-edit\" alt=\"Responsive image\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Nombre Completo</label>\n\t<input type=\"text\" class=\"form-control\" v-model=\"dataModel.name\" minlength=\"3\" required=\"\">\n\t<input type=\"hidden\" class=\"form-control\" :value=\"dataModel.id\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Correo Electrónico</label>\n\t<input type=\"email\" class=\"form-control\" v-model=\"dataModel.email\" required=\"\">\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<label>Rol de acceso</label>\n\t<select-list class-name=\"form-control col-xs-6\" :select-value.sync=\"dataModel.rol\" value-key=\"id\" label-key=\"name\" url=\"api/rol\" :is-required=\"true\"></select-list>\n</div>\n\n<div class=\"col-sm-6 col-xs-12\">\n\t<b></b><b></b><b></b>\n\t<strong>Estado Usuario</strong>\n\t<div class=\"checkbox\">\n\t\t<label>\n\t\t\t<input type=\"checkbox\" v-model=\"dataModel.state\" :true-value=\"byTrue\" :false-value=\"byFalse\"> Activo\n\t\t</label>\n\t</div>\n</div>\n\n<div class=\"col-xs-12\">\n\t<div class=\"content\">\n\t\t<button v-if=\"createMode\" class=\"btn btn-success btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR</button>\n\t\t<button v-else=\"\" class=\"btn btn-warning btn-flat\" type=\"submit\"><i class=\"fa fa-save\"></i> GUARDAR CAMBIOS</button>\n\t\t<a v-link=\"{path: '/usuarios'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.profile-ima-edit{\n\twidth: 200px;\n\theight: 200px;\n\tborder-radius: 50%;\n\tmargin-right: 10px;\n\tmargin-top: -2px;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-fd3cc10c", module.exports)
  } else {
    hotAPI.update("_v-fd3cc10c", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../reusable/select-list.vue":111,"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],90:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"./create-view.vue":87,"./edit-view.vue":88,"./index.vue":91,"./list-view.vue":92,"./read-view.vue":94,"dup":32}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _contentHeader = require('../../new-layout/content-header.vue');

var _contentHeader2 = _interopRequireDefault(_contentHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'content-usuarios',
	components: {
		'content-header': _contentHeader2.default
	},
	data: function data() {
		return {
			path: ['Sistema', 'Administración de Usuarios'],
			loading: true
		};
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main content -->\n\t\n\t<content-header title=\"Usuarios\" :list-path=\"path\"></content-header>\n\n\t<section class=\"content\">\n\t\t<!--<router-view class=\"animated\" transition=\"fade\" transition-mode=\"out-in\" keep-alive></router-view>-->\n\t\t<router-view></router-view>\n\n\t</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-7006cf2c", module.exports)
  } else {
    hotAPI.update("_v-7006cf2c", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../new-layout/content-header.vue":96,"vue":24,"vue-hot-reload-api":20}],92:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.profile-ima{\n\tfloat: left;\n\twidth: 25px;\n\theight: 25px;\n\tborder-radius: 50%;\n\tmargin-right: 10px;\n\tmargin-top: -2px;\n\tborder: 1px solid #222d32;\n}\n\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _loading = require('../../reusable/loading.vue');

var _loading2 = _interopRequireDefault(_loading);

var _coolTable = require('../../reusable/cool-table.vue');

var _coolTable2 = _interopRequireDefault(_coolTable);

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	route: {
		data: function data(transition) {
			this.load();
			transition.next();
		}
	},
	mixins: [_mixins2.default],
	data: function data() {
		return {
			url: 'api/users',
			toolbar: {
				iconClass: 'fa fa-plus',
				iconClassOptions: 'fa fa-cogs',
				label: 'Agregar',
				labelOptions: 'Campos visibles',
				nameEmit: 'usuario-create-event',
				btnClass: 'btn btn-primary btn-flat'
			},
			datos: [],
			columnas: [{
				title: 'Avatar',
				field: 'avatar',
				hidden: false,
				template: '<img class="profile-ima" src="${col.avatar}" alt="${col.name}" />'
			}, {
				title: 'Cod.',
				field: 'id',
				hidden: false,
				sortable: true
			}, {
				title: 'Nombre Completo',
				field: 'name',
				hidden: false,
				sortable: true
			}, {
				title: 'Correo electrónico',
				field: 'email',
				hidden: false,
				sortable: true
			}, {
				title: 'Rol',
				field: 'rol',
				hidden: false,
				sortable: true,
				template: '<span>${col.descripcion_rol.nombre}</span>'
			}, {
				title: 'Acciones',
				titleClass: 'text-center',
				hidden: false,
				fieldClass: 'text-center',
				itemActions: [{
					nameEmit: 'usuario-read-event',
					btnClass: 'btn btn-default btn-xs',
					iconClass: 'fa fa-eye',
					label: 'Visualizar'
				}, {
					nameEmit: 'usuario-update-event',
					btnClass: 'btn btn-default btn-xs',
					iconClass: 'fa fa-edit',
					label: 'Editar'
				}, {
					nameEmit: 'usuario-delete-event',
					btnClass: 'btn btn-danger btn-xs',
					iconClass: 'fa fa-trash',
					label: 'Eliminar'
				}]
			}],
			loading: false
		};
	},

	components: {
		'cool-table': _coolTable2.default,
		'app-loading': _loading2.default
	},
	events: {
		'usuario-create-event': function usuarioCreateEvent(model) {
			this.$router.go('/usuarios/create');
		},
		'usuario-read-event': function usuarioReadEvent(model) {
			this.$router.go('/usuarios/view/' + model.id);
		},
		'usuario-update-event': function usuarioUpdateEvent(model) {
			this.$router.go('/usuarios/edit/' + model.id);
		},
		'usuario-delete-event': function usuarioDeleteEvent(model) {
			this.destroy(model);
		}
	}

};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t\n\t<div v-if=\"loading\">\n\t\t<app-loading></app-loading>\n\t</div>\n\n\t<div v-else=\"\">\n\t\t<cool-table :option-toolbar=\"toolbar\" :url=\"url\" :data.sync=\"datos\" :columns=\"columnas\" filter-key-word=\"search\">\n\t</cool-table>\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.profile-ima{\n\tfloat: left;\n\twidth: 25px;\n\theight: 25px;\n\tborder-radius: 50%;\n\tmargin-right: 10px;\n\tmargin-top: -2px;\n\tborder: 1px solid #222d32;\n}\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-79e92d0c", module.exports)
  } else {
    hotAPI.update("_v-79e92d0c", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../../util/reusable_functions":112,"../../reusable/cool-table.vue":103,"../../reusable/loading.vue":104,"./mixins":93,"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reusable_functions = require('../../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	methods: {
		create: function create() {
			this.$http.post(this.url, this.newModel).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se creó el usuario correctamente!');
				this.$router.go('/usuarios');
			}, _reusable_functions2.default.tryError);
		},
		update: function update() {
			this.$http.put(this.url + '/' + this.newModel.id, this.newModel).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se modificó el usuario correctamente!');
				this.$router.go('/usuarios');
			}, _reusable_functions2.default.tryError);
		},
		read: function read() {
			this.loading = true;
			this.$http.get(this.url + '/' + this.$route.params.model_id).then(function (resp) {
				this.newModel = resp.data.data;
				this.loading = false;
			}, _reusable_functions2.default.tryError);
		},
		destroy: function destroy(model) {
			if (confirm('¿Estás seguro?')) {
				this.$http.delete(this.url + '/' + model.id).then(function (resp) {
					_reusable_functions2.default.niceAlert('success', 'Se eliminó correctamente');
					this.load();
				}, _reusable_functions2.default.tryError);
			}
		},
		load: function load() {
			this.loading = true;
			this.$http.get(this.url).then(function (resp) {
				this.loading = false;
			}, _reusable_functions2.default.tryError);
		}
	}
}; /**
    * Aqui se definen los metodos generales que seran usados por los componentes que implementen este mixins,
    * cada metodo declarado aquí hará referencia con "this" a su propio "scope"
    */

},{"../../../util/reusable_functions":112}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mixins = require('./mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	mixins: [_mixins2.default],
	ready: function ready() {
		this.read();
	},
	data: function data() {
		return {
			newModel: {},
			loading: true,
			url: 'api/users'
		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\n<div class=\"row\" v-else=\"\">\n\n\t<div class=\"col-xs-12 col-sm-4 col-md-3\">\n\t\t<img :src=\"newModel.avatar\" class=\"profile-ima-edit\" alt=\"Responsive image\">\n\t</div>\n\n\t<div class=\"col-sm-6 col-xs-12\">\n\t\t<strong>Nombre Completo:</strong>\n\t\t<p>{{newModel.name}}</p>\n\t</div>\n\n\t<div class=\"col-sm-6 col-xs-12\">\n\t\t<strong>Correo Electrónico:</strong>\n\t\t<p>{{newModel.email}}</p>\n\t</div>\n\n\t<div class=\"col-sm-6 col-xs-12\">\n\t\t<strong>Estado:</strong>\n\t\t<p>{{newModel.state}}</p>\n\t</div>\n\n\n\t<div class=\"col-xs-12\" style=\"padding-top: 50px;\">\n\t\t<a v-link=\"{path: '/usuarios'}\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-reply\"></i> VOLVER</a>\n\t</div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-35891b14", module.exports)
  } else {
    hotAPI.update("_v-35891b14", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./mixins":93,"vue":24,"vue-hot-reload-api":20}],95:[function(require,module,exports){
'use strict';

var menu = require('../config/menus.js');

var fnc = require('../util/reusable_functions.js');

module.exports = {
  name: 'Layout',
  ready: function ready() {
    this.loadProfile();
  },

  methods: {
    loadProfile: function loadProfile() {
      this.$http.get('api/me').then(function (resp) {
        this.profile = resp.data;
      }, fnc.tryError);
    }
  },
  computed: {
    fromDate: function fromDate() {
      if (this.profile.created_at) {
        return this.profile.created_at.substr(0, 10);
      }
      return this.profile.created_at;
    }
  },
  data: function data() {
    return {
      title: null,
      profile: {
        name: 'Root',
        avatar: 'img/user2-160x160.jpg',
        rol: 0,
        email: 'root@root.com',
        created_at: 'Ago. 2016'
      },
      login: true,
      body_class: "sidebar-mini skin-blue fixed",
      menus: menu || [] //esto deberia ser cargado una vez logoneado
    };
  },
  replace: false,
  components: {
    'app-header': require('./new-layout/header.vue'),
    'app-menu': require('./new-layout/menu.vue'),
    'app-content': require('./new-layout/content.vue'),
    'app-control': require('./new-layout/control.vue'),
    'app-footer': require('./new-layout/footer.vue')
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div v-if=\"login\">\n  <app-header :username.sync=\"profile.name\" :avatar.sync=\"profile.avatar\" :from-date.sync=\"fromDate\"></app-header>\n  <app-menu :username.sync=\"profile.name\" :avatar.sync=\"profile.avatar\"></app-menu>\n  <app-content :title=\"title\"></app-content>\n  <app-control></app-control>\n  <app-footer></app-footer>\n</div>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-3e7b0efa", module.exports)
  } else {
    hotAPI.update("_v-3e7b0efa", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../config/menus.js":28,"../util/reusable_functions.js":112,"./new-layout/content.vue":97,"./new-layout/control.vue":98,"./new-layout/footer.vue":99,"./new-layout/header.vue":100,"./new-layout/menu.vue":102,"vue":24,"vue-hot-reload-api":20}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	props: {
		title: {
			type: String,
			required: true
		},
		listPath: {
			type: Array,
			required: false,
			default: function _default() {
				return [];
			}
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<section class=\"content-header\">\n\t<h1>\n\t\t{{title}}\n\t\t<small>{{$route.name}}</small>\n\t</h1>\n\t<ol class=\"breadcrumb\">\n\t\t<li><a href=\"#\"><i class=\"fa fa-dashboard\"></i> Dashboard</a></li>\n\t\t<li v-show=\"listPath.length > 0\" v-for=\"item in listPath\" :class=\"{'active': listPath.length-1 == $index}\" track-by=\"$index\">{{item}}</li>\n\t</ol>\n</section>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-154a0082", module.exports)
  } else {
    hotAPI.update("_v-154a0082", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],97:[function(require,module,exports){
'use strict';

module.exports = {
	name: 'Content'
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<!-- Content Wrapper. Contains page content -->\n<div v-else=\"\" class=\"content-wrapper\">\n\t<router-view></router-view>\n\t<!-- /.content -->\n</div>\n<!-- /.content-wrapper -->\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-3f6872a8", module.exports)
  } else {
    hotAPI.update("_v-3f6872a8", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],98:[function(require,module,exports){
"use strict";
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\t<!-- Control Sidebar -->\n\t<aside class=\"control-sidebar control-sidebar-dark\">\n\t\t<!-- Create the tabs -->\n\t\t<ul class=\"nav nav-tabs nav-justified control-sidebar-tabs\">\n\t\t\t<li class=\"active\"><a href=\"#control-sidebar-home-tab\" data-toggle=\"tab\"><i class=\"fa fa-home\"></i></a></li>\n\t\t\t<li><a href=\"#control-sidebar-settings-tab\" data-toggle=\"tab\"><i class=\"fa fa-gears\"></i></a></li>\n\t\t</ul>\n\t\t<!-- Tab panes -->\n\t\t<div class=\"tab-content\">\n\t\t\t<!-- Home tab content -->\n\t\t\t<div class=\"tab-pane active\" id=\"control-sidebar-home-tab\">\n\t\t\t\t<h3 class=\"control-sidebar-heading\">Actividad reciente</h3>\n\t\t\t\t<ul class=\"control-sidebar-menu\">\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"javascript::;\">\n\t\t\t\t\t\t\t<i class=\"menu-icon fa fa-birthday-cake bg-red\"></i>\n\t\t\t\t\t\t\t<div class=\"menu-info\">\n\t\t\t\t\t\t\t\t<h4 class=\"control-sidebar-subheading\">Cumpleaños</h4>\n\t\t\t\t\t\t\t\t<p>01-07-1990</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul><!-- /.control-sidebar-menu -->\n\n\t\t\t\t<h3 class=\"control-sidebar-heading\">Progreso</h3>\n\t\t\t\t<ul class=\"control-sidebar-menu\">\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"javascript::;\">\n\t\t\t\t\t\t\t<h4 class=\"control-sidebar-subheading\">\n\t\t\t\t\t\t\t\tCustom Template\n\t\t\t\t\t\t\t\t<span class=\"label label-danger pull-right\">70%</span>\n\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t\t<div class=\"progress progress-xxs\">\n\t\t\t\t\t\t\t\t<div class=\"progress-bar progress-bar-danger\" style=\"width: 70%\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul><!-- /.control-sidebar-menu -->\n\n\t\t\t</div><!-- /.tab-pane -->\n\t\t\t<!-- Stats tab content -->\n\t\t\t<div class=\"tab-pane\" id=\"control-sidebar-stats-tab\">Status</div><!-- /.tab-pane -->\n\t\t\t<!-- Settings tab content -->\n\t\t\t<div class=\"tab-pane\" id=\"control-sidebar-settings-tab\">\n\t\t\t\t<form method=\"post\">\n\t\t\t\t\t<h3 class=\"control-sidebar-heading\">Ajustes Generales</h3>\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label class=\"control-sidebar-subheading\">\n\t\t\t\t\t\t\tPanel de reporte\n\t\t\t\t\t\t\t<input type=\"checkbox\" class=\"pull-right\">\n\t\t\t\t\t\t</label>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tAjustes de información\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div><!-- /.form-group -->\n\t\t\t\t</form>\n\t\t\t</div><!-- /.tab-pane -->\n\t\t</div>\n</aside><!-- /.control-sidebar\n\n<!-- Add the sidebar's background. This div must be placed\n\timmediately after the control sidebar -->\n\t<div class=\"control-sidebar-bg\"></div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-1f44dce8", module.exports)
  } else {
    hotAPI.update("_v-1f44dce8", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],99:[function(require,module,exports){
'use strict';

module.exports = {
	props: {
		madeDate: {
			type: Number,
			required: false,
			default: new Date().getFullYear()
		},
		author: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					name: 'Giancarlos Cercado Cedeño',
					site: 'http://giancarloscercado.com',
					email: 'giancarloscercado@gmail.com'
				};
			}
		},
		bussinesName: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					name: 'Idewall',
					site: 'http://idewall.com'
				};
			}
		}
	},
	computed: {
		siteYears: function siteYears() {
			var currentYear = new Date().getFullYear();
			return this.madeDate == currentYear ? currentYear : this.madeDate + ' - ' + currentYear;
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Main Footer -->\n<footer class=\"main-footer\">\n\t<!-- To the right -->\n\t<div class=\"pull-right hidden-xs\">\n\t\t<b>{{ bussinesName.name | uppercase }}</b>\n\t</div>\n\t<!-- Default to the left -->\n\t<strong>Copyright © {{siteYears}} <a :href=\"bussinesName.site\">{{ bussinesName.name }}</a>.</strong> Creado por <a :href=\"author.site\">{{ author.name }}</a>.\n</footer>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-59745888", module.exports)
  } else {
    hotAPI.update("_v-59745888", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'app-header',
  props: {
    username: {
      type: String,
      required: false,
      default: "Giancarlos Cercado"
    },
    avatar: {
      type: String,
      required: false,
      default: 'img/user2-160x160.jpg'
    },
    fromDate: {
      type: String,
      required: false,
      default: 'Ago. 2016'
    },
    notifications: {
      required: false,
      type: Object,
      default: function _default() {
        return [];
      }
    },
    messages: {
      required: false,
      type: Object,
      default: function _default() {
        return [];
      }
    },
    tasks: {
      required: false,
      type: Object,
      default: function _default() {
        return [];
      }
    },
    control: {
      required: false,
      type: Boolean,
      default: false
    },
    largeLogo: {
      type: Array,
      required: false,
      default: function _default() {
        return ["SDCH", "UG"];
      }
    },
    shortLogo: {
      type: Array,
      required: false,
      default: function _default() {
        return ["S", "CH"];
      }
    },
    auth: {
      type: Boolean,
      default: true
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n  <!-- Main Header -->\n  <header class=\"main-header\">\n\n    <!-- Logo -->\n    <a href=\"#\" class=\"logo\">\n        <!-- mini logo for sidebar mini 50x50 pixels -->\n        <span class=\"logo-mini\"><b>{{shortLogo[0]}}</b>{{shortLogo[1]}}</span>\n        <!-- logo for regular state and mobile devices -->\n        <span class=\"logo-lg\"><b>{{largeLogo[0]}}</b>{{largeLogo[1]}}</span>\n    </a>\n\n    <!-- Header Navbar -->\n    <nav class=\"navbar navbar-static-top\" role=\"navigation\">\n        <!-- Sidebar toggle button-->\n        <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"offcanvas\" role=\"button\">\n            <span class=\"sr-only\">no aparece, solo lectura</span>\n        </a>\n        <!-- Navbar Right Menu -->\n        <div class=\"navbar-custom-menu\">\n            <ul class=\"nav navbar-nav\">\n                <!-- Messages: style can be found in dropdown.less-->\n                <li class=\"dropdown messages-menu\" v-if=\"messages.length>0\">\n                    <!-- Menu toggle button -->\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"fa fa-envelope-o\"></i>\n                        <span class=\"label label-success\">4</span>\n                    </a>\n                    <ul class=\"dropdown-menu\">\n                        <li class=\"header\">Mensajes</li>\n                        <li>\n                            <!-- inner menu: contains the messages -->\n                            <ul class=\"menu\">\n                                <li><!-- start message -->\n                                    <a href=\"#\">\n                                        <div class=\"pull-left\">\n                                            <!-- User Image -->\n                                            <img src=\"img/user2-160x160.jpg\" class=\"img-circle\" alt=\"User Image\">\n                                        </div>\n                                        <!-- Message title and timestamp -->\n                                        <h4>\n                                            Mensajes\n                                            <small><i class=\"fa fa-clock-o\"></i> 5 mins</small>\n                                        </h4>\n                                        <!-- The message -->\n                                        <p>Estos son los mensajes</p>\n                                    </a>\n                                </li><!-- end message -->\n                            </ul><!-- /.menu -->\n                        </li>\n                        <li class=\"footer\"><a href=\"#\">Ver todos los mensajes</a></li>\n                    </ul>\n                </li><!-- /.messages-menu -->\n\n                <!-- Notifications Menu -->\n                <li class=\"dropdown notifications-menu\" v-if=\"notifications.length>0\">\n                    <!-- Menu toggle button -->\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"fa fa-bell-o\"></i>\n                        <span class=\"label label-warning\">10</span>\n                    </a>\n                    <ul class=\"dropdown-menu\">\n                        <li class=\"header\">Notificaciones</li>\n                        <li>\n                            <!-- Inner Menu: contains the notifications -->\n                            <ul class=\"menu\">\n                                <li><!-- start notification -->\n                                    <a href=\"#\">\n                                        <i class=\"fa fa-users text-aqua\"></i> Esta es una notificacion\n                                    </a>\n                                </li><!-- end notification -->\n                            </ul>\n                        </li>\n                        <li class=\"footer\"><a href=\"#\">Ver todos las notificaciones</a></li>\n                    </ul>\n                </li>\n                <!-- Tasks Menu -->\n                <li class=\"dropdown tasks-menu\" v-if=\"tasks.length>0\">\n                    <!-- Menu Toggle Button -->\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <i class=\"fa fa-flag-o\"></i>\n                        <span class=\"label label-danger\">9</span>\n                    </a>\n                    <ul class=\"dropdown-menu\">\n                        <li class=\"header\">Tareas</li>\n                        <li>\n                            <!-- Inner menu: contains the tasks -->\n                            <ul class=\"menu\">\n                                <li><!-- Task item -->\n                                    <a href=\"#\">\n                                        <!-- Task title and progress text -->\n                                        <h3>\n                                            Esta es una tarea\n                                            <small class=\"pull-right\">20%</small>\n                                        </h3>\n                                        <!-- The progress bar -->\n                                        <div class=\"progress xs\">\n                                            <!-- Change the css width attribute to simulate progress -->\n                                            <div class=\"progress-bar progress-bar-aqua\" style=\"width: 20%\" role=\"progressbar\" aria-valuenow=\"20\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n                                                <span class=\"sr-only\">20% completo</span>\n                                            </div>\n                                        </div>\n                                    </a>\n                                </li><!-- end task item -->\n                            </ul>\n                        </li>\n                        <li class=\"footer\">\n                            <a href=\"#\">Ver todas las tareas</a>\n                        </li>\n                    </ul>\n                </li>\n                \n                <!-- User Account Menu -->\n                <li class=\"dropdown user user-menu\">\n                    <!-- Menu Toggle Button -->\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                        <!-- The user image in the navbar-->\n                        <img :src=\"avatar\" class=\"user-image\" alt=\"User Image\">\n                        <!-- hidden-xs hides the username on small devices so only the image appears. -->\n                        <span class=\"hidden-xs\">{{username}}</span>\n                    </a>\n                    <ul class=\"dropdown-menu\">\n                        <!-- The user image in the menu -->\n                        <li class=\"user-header\">\n                            <img :src=\"avatar\" class=\"img-circle\" alt=\"User Image\">\n                            <p>\n                                {{username}}\n                                <small>Miembro desde {{fromDate}}</small>\n                            </p>\n                        </li>\n                        <!-- Menu Body -->\n\n                        <!-- Menu Footer-->\n                        <li class=\"user-footer\">\n                            <div class=\"pull-left\">\n                                <a href=\"account\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-user\"></i> Perfil</a>\n                            </div>\n                            <div class=\"pull-right\">\n                                <a href=\"logout\" class=\"btn btn-default btn-flat\"><i class=\"fa fa-sign-out\"></i> Salir</a>\n                            </div>\n                        </li>\n                    </ul>\n                </li>\n\n                <!-- Control Sidebar Toggle Button -->\n                <li v-if=\"control\">\n                    <a href=\"#\" data-toggle=\"control-sidebar\"><i class=\"fa fa-gears\"></i></a>\n                </li>\n                \n            </ul>\n        </div>\n    </nav>\n</header>\n\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-170f90a4", module.exports)
  } else {
    hotAPI.update("_v-170f90a4", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],101:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\t.lockscreen-name{\n\t\ttext-align: center;\n    \tfont-weight: 600;\n\t}\n\t.lockscreen-logo{\n\t\tmargin-top: 25px;\n\t}\n\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	name: 'lockscreen',
	methods: {
		retrieveLogin: function retrieveLogin() {
			alert('Recuperando tu sesion');
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"lockscreen-logo\">\n\t<a href=\"#\"><i class=\"fa fa-lock fa-3x\"></i><!--<b>Admin</b>LTE</a>-->\n</a></div><a href=\"#\">\n<!-- User name -->\n<div class=\"lockscreen-name\">Giancarlos Cercado</div>\n\n<!-- START LOCK SCREEN ITEM -->\n<div class=\"lockscreen-item\">\n\t<!-- lockscreen image -->\n\t<div class=\"lockscreen-image\">\n\t\t<img src=\"img/user2-160x160.jpg\" alt=\"User Image\">\n\t</div>\n\t<!-- /.lockscreen-image -->\n\n\t<!-- lockscreen credentials (contains the form) -->\n\t<form class=\"lockscreen-credentials\" @submit.prevent=\"retrieveLogin\">\n\t\t<div class=\"input-group\">\n\t\t\t<input type=\"password\" class=\"form-control\" placeholder=\"password\">\n\n\t\t\t<div class=\"input-group-btn\">\n\t\t\t\t<button type=\"submit\" class=\"btn\"><i class=\"fa fa-arrow-right text-muted\"></i></button>\n\t\t\t</div>\n\t\t</div>\n\t</form>\n\t<!-- /.lockscreen credentials -->\n\n</div>\n<!-- /.lockscreen-item -->\n<div class=\"help-block text-center\">\n\tIngresa tu contraseña para recuperar tu sesión\n</div>\n<div class=\"help-block text-center\">\n\tÓ\n</div>\n</a><div class=\"text-center\"><a href=\"#\">\n\t</a><a href=\"login\">Ingresa con otra cuenta de usuario</a>\n</div>\n<!--\n<div class=\"lockscreen-footer text-center\">\n\tCopyright © 2016 <b><a href=\"http://giancarloscercado.com\" class=\"text-black\">Giancarlos Cercado</a></b><br>\n\tAll rights reserved\n</div>\n-->\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\t.lockscreen-name{\n\t\ttext-align: center;\n    \tfont-weight: 600;\n\t}\n\t.lockscreen-logo{\n\t\tmargin-top: 25px;\n\t}\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-adbc2610", module.exports)
  } else {
    hotAPI.update("_v-adbc2610", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],102:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.logo-panel{\n\tposition: relative;\n}\n.logo-panel img{\n\twidth: 100%;\n}\n.logo-menu-title{\n    background: #222d32;\n    color: #b8c7bf;\n    font-variant: small-caps;\n    font-weight: bold;\n    font-size: 1.2em;\n    border-radius: 0px !important;\n    border: 0px !important;\n    margin: 0px !important;\n}\n\n\n.user-panel > .image > img {\n    max-width: 50px !important;\n}\n.img-circle {\n    border-radius: 15% !important;\n    background: white !important;\n}\n\n")
'use strict';

var _reusable_functions = require('../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

var _menuItemLevel = require('../reusable/menuItemLevel1.vue');

var _menuItemLevel2 = _interopRequireDefault(_menuItemLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//configs


module.exports = {
	components: {
		menuItem: _menuItemLevel2.default
	},
	props: {
		username: {
			type: String,
			required: false,
			default: "Giancarlos Cercado"
		},
		avatar: {
			type: String,
			required: false,
			default: 'img/user2-160x160.jpg'
		}
	},
	methods: {
		hasChildren: function hasChildren(nodo) {
			if (typeof nodo === 'undefined') return false;
			return nodo.length > 0;
		}
	},
	ready: function ready() {
		var self = this;
		self.$http.get(self.urlMenu).then(function (resp) {
			self.menu = resp.data.data;
		}, _reusable_functions2.default.tryError);
	},
	data: function data() {
		return {
			urlMenu: 'api/menu?orderBy=orden&sorterBy=desc',
			menu: [{
				iconClass: 'fa fa-book',
				name: 'Materias',
				link: '/materias',
				children: []
			}]
		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<!-- Left side column. contains the logo and sidebar -->\n<aside class=\"main-sidebar\">\n\n\t<!-- sidebar: style can be found in sidebar.less -->\n\t<section class=\"sidebar\">\n\t\t<!--\n\t\t<div class=\"logo-panel\">\n\t\t\t<img src=\"img/ug/logo.png\" class=\"img-circle\" alt=\"Logo Universidad Image\" />\n\t\t</div>\n\t\t-->\n\t\t<div class=\"user-panel\">\n\t\t\t<div class=\"pull-left image\">\n\t\t\t\t<img src=\"img/ug/icon-logo-without-letters-min.png\" class=\"img-circle\" alt=\"Logo universidad\">\n\t\t\t</div>\n\t\t\t<div class=\"pull-left info\">\n\t\t\t\t<p><small>UNIVERSIDAD DE GUAYAQUIL</small></p>\n\t\t\t\t<p>FCA - ISAC</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"sidebar-form logo-menu-title\">\n\t\t\t<p class=\"text-center\">Sistema de Distribución de Cargas Horarias</p>\n\t\t</div>\n\n\t\t<!-- Sidebar user panel (optional) -->\n\t\t<!--\n\t\t<div class=\"user-panel\">\n\t\t\t<div class=\"pull-left image\">\n\t\t\t\t<img :src=\"avatar\" class=\"img-circle\" alt=\"User Image\" />\n\t\t\t</div>\n\t\t\t<div class=\"pull-left info\">\n\t\t\t\t<p>{{ username }}</p>\n\t\t\t\t<a href=\"#\"><i class=\"fa fa-circle text-success\"></i> Online</a>\n\t\t\t</div>\n\t\t</div>\n\t\t-->\n\n\t\t<!-- search form (Optional) -->\n\t\t<!--\n\t\t<form action=\"#\" method=\"get\" class=\"sidebar-form\">\n\t\t\t<div class=\"input-group\">\n\t\t\t\t<input type=\"text\" name=\"q\" class=\"form-control\" placeholder=\"Search...\"/>\n\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t<button type='submit' name='search' id='search-btn' class=\"btn btn-flat\"><i class=\"fa fa-search\"></i></button>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</form>\n\t\t-->\n\t\t<!-- /.search form -->\n\n\t\t<!-- Sidebar Menu -->\n\t\t<ul class=\"sidebar-menu\">\n\t\t\t<li class=\"header\">Menú Principal</li>\n\t\t\t<menu-item v-for=\"itemenu in menu\" :item=\"itemenu\" :is-parent=\"hasChildren(itemenu.children)\"></menu-item>\n\t\t\t\n\t\t</ul>\n\t\t\n\t\t<!-- /.sidebar-menu -->\n\t</section>\n\t<!-- /.sidebar -->\n</aside>\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.logo-panel{\n\tposition: relative;\n}\n.logo-panel img{\n\twidth: 100%;\n}\n.logo-menu-title{\n    background: #222d32;\n    color: #b8c7bf;\n    font-variant: small-caps;\n    font-weight: bold;\n    font-size: 1.2em;\n    border-radius: 0px !important;\n    border: 0px !important;\n    margin: 0px !important;\n}\n\n\n.user-panel > .image > img {\n    max-width: 50px !important;\n}\n.img-circle {\n    border-radius: 15% !important;\n    background: white !important;\n}\n\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-33114080", module.exports)
  } else {
    hotAPI.update("_v-33114080", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../util/reusable_functions":112,"../reusable/menuItemLevel1.vue":105,"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],103:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.font-success{\n\t color: #00a65a;\n }\n\n.font-error{\n\tcolor: #dd4b39;\n}\n\n.pagination{\n\tmargin: 0 !important;\n}\n\n.cool-table-loading-icon{\n\tposition: absolute;\n\tmargin-left: 45%;\n\tmargin-top: 50%;\n}\n\n.cool-table-sortable{\n\tcursor: pointer;\n}\n.cool-table-sortable:hover{\n\tcolor: #2185d0;\n}\n\n.loading-mask{\t\n\tz-index: 99;\t\n\tposition: absolute;\n\twidth: 100%;\n\tbackground: rgba(236, 240, 245, 0.31);\n}\n.l-open{\n\tdisplay: inherit;\n}\n\n.l-close{\n\tdisplay: none;\t\n}\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function schemaModel(toModel) {
	if (toModel.field) {
		(0, _assign2.default)(toModel, {
			hidden: toModel.hidden ? toModel.hidden : false,
			field: toModel.field ? toModel.field : '',
			fieldClass: toModel.fieldClass ? toModel.fieldClass : '',
			title: toModel.title ? toModel.title : toModel.field.toUpperCase(),
			titleClass: toModel.titleClass ? toModel.titleClass : '',
			filterable: toModel.filterable ? toModel.filterable : false,
			applyFilter: toModel.applyFilter ? toModel.applyFilter : null,
			template: toModel.template ? toModel.template : null,
			itemActions: toModel.itemActions ? toModel.itemActions : null
		});
	} else {
		if (toModel.itemActions) {
			if (toModel.itemActions.length <= 0) {
				throw 'ModelError: itemActions proptype is required in columns object if is not a field';
			} else {
				(0, _assign2.default)(toModel, {
					hidden: toModel.hidden ? toModel.hidden : false,
					field: toModel.field ? toModel.field : '',
					fieldClass: toModel.fieldClass ? toModel.fieldClass : '',
					title: toModel.title ? toModel.title : toModel.field.toUpperCase(),
					titleClass: toModel.titleClass ? toModel.titleClass : '',
					filterable: toModel.filterable ? toModel.filterable : false,
					applyFilter: toModel.applyFilter ? toModel.applyFilter : null,
					template: toModel.template ? toModel.template : null,
					itemActions: toModel.itemActions ? toModel.itemActions : null
				});
			}
		} else throw 'ModelError: field proptype is required in columns object';
	}
}

function arrayToScema(listModels) {
	listModels.forEach(function (element, index) {
		schemaModel(element);
	});
}

exports.default = {
	computed: {
		lastActive: function lastActive() {
			return this.pagination.current_page == this.pagination.last_page ? 'disabled' : '';
		},
		firstActive: function firstActive() {
			return this.pagination.current_page == 1 ? 'disabled' : '';
		}

	},
	props: {
		optionToolbar: {
			type: Object,
			default: function _default() {
				return {
					iconClass: 'fa fa-plus',
					iconClassOptions: 'fa fa-cogs',
					label: 'Nuevo',
					labelOptions: 'Campos visibles',
					nameEmit: 'create-event',
					btnClass: 'btn btn-primary btn-flat'
				};
			}
		},
		tableClass: { type: String, default: 'table table-bordered table-striped table-hover' },
		requireHeader: { type: Boolean, default: true },
		divSeparatorClass: { type: String, default: 'col-xs-12' },
		url: { type: String, default: 'api/users' },
		search_filter: { type: String, default: '' },
		filterKeyWord: { type: String, default: 'filter' },
		endpoint: { type: String, default: '' },
		sortable: {
			type: Object,
			default: function _default() {
				return {
					ascendingIcon: 'glyphicon glyphicon-chevron-up',
					descendingIcon: 'glyphicon glyphicon-chevron-down',
					column: 'id',
					order: 'asc'
				};
			}
		},
		columns: {
			type: Array, default: function _default() {
				return [{
					field: 'name',
					hidden: false
				}, {
					field: 'email',
					hidden: false
				}, {
					field: 'created_at',
					title: 'Fecha Creación',
					hidden: false
				}, {
					title: 'Fecha Modificación',
					field: 'updated_at',
					hidden: false
				}, {
					title: 'Acciones',
					titleClass: 'text-center',
					hidden: false,
					fieldClass: 'text-center',
					itemActions: [{
						nameEmit: 'view-event',
						btnClass: 'btn btn-default btn-xs',
						iconClass: 'fa fa-eye',
						label: 'Visualizar'
					}, {
						nameEmit: 'view-event',
						btnClass: 'btn btn-default btn-xs',
						iconClass: 'fa fa-edit',
						label: 'Editar'
					}, {
						nameEmit: 'view-event',
						btnClass: 'btn btn-danger btn-xs',
						iconClass: 'fa fa-trash',
						label: 'Eliminar'
					}]
				}];
			}
		},
		callbackError: {
			type: String,
			required: false,
			default: 'ev-callblack-error'
		},
		pagination: {
			type: Object,
			default: function _default() {
				return {
					loadingIconClass: 'fa fa-spinner fa-spin fa-3x fa-fw cool-table-loading-icon',
					showText: 'Mostrando',
					of: 'de',
					refresh: 'Actualizar',
					noData: 'No hay registros',
					register: 'Registros',
					next: '>',
					back: '<',
					last: '>>',
					first: '<<',
					searchable: false,
					per_page_list: [5, 10, 15, 20, 30, 50],
					total: 150,
					per_page: 10,
					current_page: 1,
					last_page: 10,
					next_page_url: "http:\/\/vuetable.ratiw.net\/api\/users?page=2",
					prev_page_url: null,
					from: 1,
					to: 15,
					data: [],
					moreTemp: 1,
					limitPaginate: 5
				};
			}
		},
		data: {
			type: Array,
			deafult: function deafult() {
				return [];
			}
		}
	},
	methods: {
		renderTemplate: function renderTemplate(col, template) {
			return eval('`' + template + '`');
		},
		updateEndpoint: function updateEndpoint() {
			var _pagination = this.pagination;
			var per_page = _pagination.per_page;
			var current_page = _pagination.current_page;
			var search_filter = this.search_filter;
			var filterKeyWord = this.filterKeyWord;
			var url = this.url;
			var _sortable = this.sortable;
			var column = _sortable.column;
			var order = _sortable.order;

			this.endpoint = url + '?per_page=' + per_page + '&page=' + current_page + '&sort=' + column + '|' + order + '&' + filterKeyWord + '=' + search_filter;
		},
		orderColumn: function orderColumn(column) {
			if (this.sortable.column == column) {
				this.sortable.order = this.sortable.order == 'asc' ? 'desc' : 'asc';
			} else {
				this.sortable.order = 'asc';
				this.sortable.column = column;
			}
			this.loadData();
		},
		isActive: function isActive(index) {
			return this.pagination.current_page == index ? 'active' : '';
		},
		paginate: function paginate(numPage) {
			if (this.pagination.current_page != numPage) {
				if (numPage == this.pagination.last_page) {
					this.pagination.moreTemp = parseInt(numPage / this.pagination.limitPaginate) + 1;
				}
				if (numPage == 1) {
					this.pagination.moreTemp = 1;
				}
				this.pagination.current_page = numPage;
				this.loadData();
			}
		},
		paginateNext: function paginateNext() {
			if (this.pagination.next_page_url != null) {
				this.pagination.current_page % this.pagination.limitPaginate === 0 ? this.pagination.moreTemp++ : null;
				this.pagination.current_page++;
				this.loadData();
			}
		},
		paginatePrev: function paginatePrev() {
			if (this.pagination.prev_page_url != null) {
				this.pagination.current_page % this.pagination.limitPaginate === 1 ? this.pagination.moreTemp-- : null;
				this.pagination.current_page--;
				this.loadData();
			}
		},
		pagScroll: function pagScroll(type) {
			if (type == 'next') {
				this.pagination.moreTemp++;
				this.pagination.current_page = (this.pagination.moreTemp - 1) * this.pagination.limitPaginate + 1;
			} else {
				this.pagination.moreTemp--;
				this.pagination.current_page = (this.pagination.moreTemp - 1) * this.pagination.limitPaginate + this.pagination.limitPaginate;
			}
			this.loadData();
		},
		changePerPage: function changePerPage() {
			this.pagination.moreTemp = 1;
			this.pagination.current_page = 1;
			this.loadData();
		},
		loadingAnimation: function loadingAnimation(type) {
			var query = '.' + this.tableClass.split(' ').join('.');
			var elem = document.querySelector(query);
			var loadElem = document.querySelector('.loading-mask');
			var loadIcon = document.querySelector('.cool-table-loading-icon');
			if (type == 'open') {
				var axisY = parseInt(elem.scrollHeight / 2);
				loadElem.style.height = axisY * 2 + 'px';
				loadIcon.style.marginTop = axisY + 'px';
				loadElem.className = 'loading-mask l-open';
			} else {
				loadElem ? loadElem.className = 'loading-mask l-close' : null;
			}
		},
		numToShow: function numToShow(num) {
			return (this.pagination.moreTemp - 1) * this.pagination.limitPaginate < num && num < this.pagination.moreTemp * this.pagination.limitPaginate + 1;
		},
		toggleColumns: function toggleColumns(idx) {
			this.columns[idx].hidden = !this.columns[idx].hidden;
		},
		loadData: function loadData() {
			this.loadingAnimation('open');
			this.updateEndpoint();
			var self = this;
			self.$http.get(this.endpoint).then(function (resp) {
				self.data = resp.data.data;
				(0, _assign2.default)(self.pagination, resp.data);
				self.loadingAnimation('close');
			}, function (err) {
				console.warn(err, 'error while try to load the endpoit <cool-table>', self.endpoint);
				self.loadingAnimation('close');
				this.dispacher(this.callbackError, err);
			});
		},
		search: function search() {
			this.loadData();
		},
		dispacher: function dispacher(event, model) {
			this.$dispatch(event, model);
		}

	},

	ready: function ready() {
		this.loadData(this.endpoint + '?per_page=' + this.pagination.per_page);
	},
	created: function created() {
		arrayToScema(this.columns);
	},
	data: function data() {
		return {
			otro: 'hola'
		};
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n\n<!-- Head Confi toolbar -->\n<div class=\"box box-primary\">\n\t<div class=\"box-header with-border\" v-if=\"optionToolbar\">\n\t\t<div class=\"col-sm-2 col-xs-12\" v-if=\"optionToolbar\">\n\t\t\t<button :class=\"optionToolbar.btnClass\" @click.prevent=\"dispacher(optionToolbar.nameEmit)\"><i :class=\"optionToolbar.iconClass\"></i> {{optionToolbar.label}}</button>\n\t\t</div>\n\t\t<div class=\"col-xs-6 col-sm-6\">\n\t\t\t<form action=\"#\" method=\"get\" @submit.prevent=\"search\">\n\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t<input type=\"text\" name=\"filter\" v-model=\"search_filter\" class=\"form-control\" placeholder=\"Buscar...\">\n\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t<button type=\"submit\" name=\"search_table\" id=\"search-btn\" class=\"btn btn-flat\"><i class=\"fa fa-search\"></i></button>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t\t<div class=\"col-xs-4 col-sm-3\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<select class=\"form-control\" v-model=\"pagination.per_page\" @change=\"changePerPage\">\n\t\t\t\t\t<option value=\"\" disabled=\"\">Rigistros por página</option>\n\t\t\t\t\t<option v-for=\"item in pagination.per_page_list | orderBy item\" track-by=\"$index\" :value=\"item\">{{item}}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-xs-2 col-sm-1\">\n\t\t\t<button class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"true\" :title=\"optionToolbar.labelOptions\">\n\t\t\t\t<i :class=\"optionToolbar.iconClassOptions\"></i>\n\t\t\t</button>\n\t\t\t<ul class=\"dropdown-menu pull-right\">\n\t\t\t\t<li v-for=\"(idx, col) in columns\">\n\t\t\t\t\t<span class=\"checkbox\">\n\t\t\t\t\t\t<label @click=\"toggleColumns(idx)\">\n\t\t\t\t\t\t\t<strong>{{ col.title }} <i class=\"fa fa-check font-success\" v-if=\"!col.hidden\"></i><i class=\"fa fa-close font-error\" v-else=\"\"></i></strong>\n\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</span>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\t<!-- Body table -->\n\t<div class=\"box-body table-responsive\">\n\t\t<div class=\"loading-mask l-close\">\n\t\t\t<i :class=\"pagination.loadingIconClass\"></i>\n\t\t\t<span class=\"sr-only\">Loading...</span>\n\t\t</div>\n\t\t<table :class=\"tableClass\">\n\t\t\t\n\t\t\t<thead v-if=\"requireHeader\">\n\t\t\t\t<tr>\n\t\t\t\t\t<th v-for=\"col in columns | filterBy false in 'hidden'\" :class=\"col.titleClass\">\n\t\t\t\t\t\t<template v-if=\"sortable &amp;&amp; col.sortable &amp;&amp; !col.itemActions\">\n\t\t\t\t\t\t\t<div class=\"cool-table-sortable\" @click.prevent=\"orderColumn(col.field)\">\n\t\t\t\t\t\t\t\t<span>{{col.title}}</span>\n\t\t\t\t\t\t\t\t<template v-if=\"sortable.column == col.field\">\n\t\t\t\t\t\t\t\t\t<template v-if=\"sortable.order == 'desc'\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\"><i :class=\"sortable.descendingIcon\"></i></span>\n\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t<template v-else=\"\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"pull-right\"><i :class=\"sortable.ascendingIcon\"></i></span>\n\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</template>\n\t\t\t\t\t\t<template v-else=\"\">\n\t\t\t\t\t\t\t{{col.title}}\n\t\t\t\t\t\t</template>\n\t\t\t\t\t</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\n\t\t\t<tbody>\n\t\t\t\t<tr v-for=\"item in data\">\n\n\t\t\t\t\t<td v-for=\"col in columns | filterBy false in 'hidden'\" :class=\"col.fieldClass\">\n\n\t\t\t\t\t\t<template v-if=\"col.template\">\n\t\t\t\t\t\t\t{{{renderTemplate(item, col.template)}}}\n\t\t\t\t\t\t</template>\n\n\t\t\t\t\t\t<template v-else=\"\">\n\n\t\t\t\t\t\t\t<div v-if=\"!col.itemActions\">{{ item[col.field] }}</div>\n\n\t\t\t\t\t\t\t<div v-else=\"\" class=\"btn-group\">\n\n\t\t\t\t\t\t\t\t<a v-for=\"act in col.itemActions\" :class=\"act.btnClass\" href=\"\" @click.prevent=\"dispacher(act.nameEmit, item)\">\n\t\t\t\t\t\t\t\t\t<i :class=\"act.iconClass\" data-toggle=\"tooltip\" :title=\"act.label\"></i>\n\t\t\t\t\t\t\t\t</a>\n\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</template>\n\n\t\t\t\t\t\t\n\n\t\t\t\t\t</td>\n\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\n\t\t</table>\n\t</div>\n\n\t<!-- Footer pagination -->\n\t<div class=\"box-footer\" v-if=\"pagination\">\n\t\t<div class=\"row\" v-if=\"pagination.data.length>0\">\n\t\t\t<div class=\"col-xs-12 col-sm-8\">\n\t\t\t\t<nav>\n\t\t\t\t\t<ul class=\"pagination pagination-sm\">\n\t\t\t\t\t\t<li class=\"{{firstActive}}\" @click.prevent=\"paginate(1)\">\n\t\t\t\t\t\t\t<a href=\"#\" aria-label=\"Previous\">\n\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">{{pagination.first}}</span>\n\t\t\t\t\t\t\t</a><!-- begin -->\n\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t<li class=\"{{firstActive}}\" @click.prevent=\"paginatePrev\">\n\t\t\t\t\t\t\t<a href=\"#\" aria-label=\"Previous\">\n\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">{{pagination.back}}</span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t<li v-if=\"pagination.current_page>pagination.limitPaginate\" @click.prevent=\"pagScroll('prev')\">\n\t\t\t\t\t\t\t<a href=\"#\" aria-label=\"Prev\">\n\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">...</span>\n\t\t\t\t\t\t\t</a><!-- more back -->\n\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t<li v-for=\"pag in 5, pagination.last_page\" class=\"{{isActive(pag+1)}}\" @click.prevent=\"paginate(pag+1)\" v-if=\"numToShow(pag+1)\"><a href=\"#\">{{pag + 1}}</a></li>\n\n\t\t\t\t\t\t<li v-if=\"pagination.moreTemp < (pagination.last_page/pagination.limitPaginate)\" @click.prevent=\"pagScroll('next')\">\n\t\t\t\t\t\t\t<a href=\"#\" aria-label=\"Next\">\n\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">...</span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li><!-- more next -->\n\n\t\t\t\t\t\t<li class=\"{{lastActive}}\" @click.prevent=\"paginateNext\">\n\t\t\t\t\t\t\t<a href=\"#\" aria-label=\"Next\">\n\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">{{pagination.next}}</span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t<li class=\"{{lastActive}}\" @click.prevent=\"paginate(pagination.last_page)\">\n\t\t\t\t\t\t\t<a href=\"#\" aria-label=\"Next\">\n\t\t\t\t\t\t\t\t<span aria-hidden=\"true\">{{pagination.last}}</span>\n\t\t\t\t\t\t\t</a><!-- end -->\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</nav>\n\t\t\t</div>\n\n\t\t\t<div class=\"col-xs-12 col-sm-4 text-right\" v-if=\"pagination\">\n\t\t\t\t<span>{{pagination.showText}}: {{pagination.from}} - {{pagination.to}} {{pagination.of}} {{pagination.total}} {{pagination.register}}</span>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\" v-else=\"\">\n\t\t\t<div class=\"col-xs-12 text-center\">\n\t\t\t\t<span>{{pagination.noData}}</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n</div>\n\n\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.font-success{\n\t color: #00a65a;\n }\n\n.font-error{\n\tcolor: #dd4b39;\n}\n\n.pagination{\n\tmargin: 0 !important;\n}\n\n.cool-table-loading-icon{\n\tposition: absolute;\n\tmargin-left: 45%;\n\tmargin-top: 50%;\n}\n\n.cool-table-sortable{\n\tcursor: pointer;\n}\n.cool-table-sortable:hover{\n\tcolor: #2185d0;\n}\n\n.loading-mask{\t\n\tz-index: 99;\t\n\tposition: absolute;\n\twidth: 100%;\n\tbackground: rgba(236, 240, 245, 0.31);\n}\n.l-open{\n\tdisplay: inherit;\n}\n\n.l-close{\n\tdisplay: none;\t\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-78e977f7", module.exports)
  } else {
    hotAPI.update("_v-78e977f7", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"babel-runtime/core-js/object/assign":1,"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],104:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n* {margin: 0;padding:0;}\n.mask-loading {\n\tbackground-color: #ecf0f5;\n\tmargin: 150px 0px;\n}\n.spinner {\n\twidth: 50px;\n\theight: 50px;\n\tposition: relative;\n\tmargin: 0 auto;\n}\n\n.double-bounce1, .double-bounce2 {\n\twidth: 100%;\n\theight: 100%;\n\tborder-radius: 50%;\n\tbackground-color: #3c8dbc;\n\topacity: 0.6;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\n\t-webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n\tanimation: sk-bounce 2.0s infinite ease-in-out;\n}\n\n.double-bounce2 {\n\t-webkit-animation-delay: -1.0s;\n\tanimation-delay: -1.0s;\n}\n\n@-webkit-keyframes sk-bounce {\n\t0%, 100% { -webkit-transform: scale(0.0) }\n\t50% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes sk-bounce {\n\t0%, 100% { \n\t\ttransform: scale(0.0);\n\t\t-webkit-transform: scale(0.0);\n\t} 50% { \n\t\ttransform: scale(1.0);\n\t\t-webkit-transform: scale(1.0);\n\t}\n}\n")
"use strict";

var o = $('.content-wrapper');
$(".mask-loading").css("height", o.height());
$(".spinner").css("top", o.height() / 2 - 25);
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"mask-loading\">\n\t<div class=\"spinner\">\n\t\t<div class=\"double-bounce1\"></div>\n\t\t<div class=\"double-bounce2\"></div>\n\t</div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n* {margin: 0;padding:0;}\n.mask-loading {\n\tbackground-color: #ecf0f5;\n\tmargin: 150px 0px;\n}\n.spinner {\n\twidth: 50px;\n\theight: 50px;\n\tposition: relative;\n\tmargin: 0 auto;\n}\n\n.double-bounce1, .double-bounce2 {\n\twidth: 100%;\n\theight: 100%;\n\tborder-radius: 50%;\n\tbackground-color: #3c8dbc;\n\topacity: 0.6;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\n\t-webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n\tanimation: sk-bounce 2.0s infinite ease-in-out;\n}\n\n.double-bounce2 {\n\t-webkit-animation-delay: -1.0s;\n\tanimation-delay: -1.0s;\n}\n\n@-webkit-keyframes sk-bounce {\n\t0%, 100% { -webkit-transform: scale(0.0) }\n\t50% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes sk-bounce {\n\t0%, 100% { \n\t\ttransform: scale(0.0);\n\t\t-webkit-transform: scale(0.0);\n\t} 50% { \n\t\ttransform: scale(1.0);\n\t\t-webkit-transform: scale(1.0);\n\t}\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-38efffdf", module.exports)
  } else {
    hotAPI.update("_v-38efffdf", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],105:[function(require,module,exports){
'use strict';

var _menuItemLevel = require('./menuItemLevel2.vue');

var _menuItemLevel2 = _interopRequireDefault(_menuItemLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	components: {
		'menu-item-level-1': _menuItemLevel2.default
	},
	props: {
		item: {
			type: Object | Array,
			required: true
		},
		isParent: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		toggleMenu: function toggleMenu(event) {
			$('li.pageLink').removeClass('active');
			var itemElement = event.toElement.parentElement;
			if (itemElement.className.indexOf('pageLink') >= 0) {
				itemElement.className = 'pageLink active';
			} else {
				itemElement.parentElement.className = 'pageLink active';
			}
		},
		hasChildren: function hasChildren(nodo) {
			if (typeof nodo === 'undefined') return false;
			return nodo.length > 0;
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<li @click=\"toggleMenu\" class=\"pageLink\" v-if=\"!isParent\">\n\t<a v-link=\"{path:item.link}\"><i :class=\"item.iconClass\"></i> <span>{{item.name}}</span></a>\n</li>\n<li v-else=\"\" class=\"treeview\">\n\t<a href=\"#\"><i :class=\"item.iconClass\"></i> <span>{{item.name}}</span> <i class=\"fa fa-angle-left pull-right\"></i></a>\n\t<ul class=\"treeview-menu\">\n\t\t<menu-item-level-1 v-for=\"itemenu in item.children\" :item=\"itemenu\" :is-parent=\"hasChildren(itemenu.children)\"></menu-item-level-1>\n\t</ul>\n</li>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-d28a50e8", module.exports)
  } else {
    hotAPI.update("_v-d28a50e8", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./menuItemLevel2.vue":106,"vue":24,"vue-hot-reload-api":20}],106:[function(require,module,exports){
'use strict';

var _menuItemLevel = require('./menuItemLevel3.vue');

var _menuItemLevel2 = _interopRequireDefault(_menuItemLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	components: {
		'menu-item-level-2': _menuItemLevel2.default
	},
	props: {
		item: {
			type: Object | Array,
			required: true
		},
		isParent: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		toggleMenu: function toggleMenu(event) {
			$('li.pageLink').removeClass('active');
			var itemElement = event.toElement.parentElement;
			if (itemElement.className.indexOf('pageLink') >= 0) {
				itemElement.className = 'pageLink active';
			} else {
				itemElement.parentElement.className = 'pageLink active';
			}
		},
		hasChildren: function hasChildren(nodo) {
			if (typeof nodo === 'undefined') return false;
			return nodo.length > 0;
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<li @click=\"toggleMenu\" class=\"pageLink\" v-if=\"!isParent\">\n\t<a v-link=\"{path:item.link}\"><i :class=\"item.iconClass\"></i> <span>{{item.name}}</span></a>\n</li>\n<li v-else=\"\" class=\"treeview\">\n\t<a href=\"#\"><i :class=\"item.iconClass\"></i> <span>{{item.name}}</span> <i class=\"fa fa-angle-left pull-right\"></i></a>\n\t<ul class=\"treeview-menu\">\n\t\t<menu-item-level-2 v-for=\"itemenu in item.children\" :item=\"itemenu\" :is-parent=\"hasChildren(itemenu.children)\"></menu-item-level-2>\n\t</ul>\n</li>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-d26e21e6", module.exports)
  } else {
    hotAPI.update("_v-d26e21e6", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./menuItemLevel3.vue":107,"vue":24,"vue-hot-reload-api":20}],107:[function(require,module,exports){
'use strict';

var _menuItemLevel = require('./menuItemLevel1.vue');

var _menuItemLevel2 = _interopRequireDefault(_menuItemLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	components: {
		'menu-item-level-3': _menuItemLevel2.default
	},
	props: {
		item: {
			type: Object | Array,
			required: true
		},
		isParent: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		toggleMenu: function toggleMenu(event) {
			$('li.pageLink').removeClass('active');
			var itemElement = event.toElement.parentElement;
			if (itemElement.className.indexOf('pageLink') >= 0) {
				itemElement.className = 'pageLink active';
			} else {
				itemElement.parentElement.className = 'pageLink active';
			}
		},
		hasChildren: function hasChildren(nodo) {
			if (typeof nodo === 'undefined') return false;
			return nodo.length > 0;
		}
	}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<li @click=\"toggleMenu\" class=\"pageLink\" v-if=\"!isParent\">\n\t<a v-link=\"{path:item.link}\"><i :class=\"item.iconClass\"></i> <span>{{item.name}}</span></a>\n</li>\n<li v-else=\"\" class=\"treeview\">\n\t<a href=\"#\"><i :class=\"item.iconClass\"></i> <span>{{item.name}}</span> <i class=\"fa fa-angle-left pull-right\"></i></a>\n\t<ul class=\"treeview-menu\">\n\t\t<menu-item-level-3 v-for=\"itemenu in item.children\" :item=\"itemenu\" :is-parent=\"hasChildren(itemenu.children)\"></menu-item-level-3>\n\t</ul>\n</li>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-d251f2e4", module.exports)
  } else {
    hotAPI.update("_v-d251f2e4", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"./menuItemLevel1.vue":105,"vue":24,"vue-hot-reload-api":20}],108:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n\t#menu-content {\n\t\tbackground:white;\n\t\tfont:normal normal 13px/1.4 Segoe,\"Segoe UI\",Calibri,Helmet,FreeSans,Sans-Serif;\n\t\tpadding:10px;\n\t}\n\n\n/**\n * Framework starts from here ...\n * ------------------------------\n */\n\n .tree,\n .tree ul {\n \tmargin:0 0 0 1em; /* indentation */\n \tpadding:0;\n \tlist-style:none;\n \tcolor:#369;\n \tposition:relative;\n }\n\n .tree ul {margin-left:.5em} /* (indentation/2) */\n\n .tree:before,\n .tree ul:before {\n \tcontent:\"\";\n \tdisplay:block;\n \twidth:0;\n \tposition:absolute;\n \ttop:0;\n \tbottom:0;\n \tleft:0;\n \tborder-left:1px solid;\n }\n\n .tree li {\n \tmargin:0;\n \tpadding:0 1.5em; /* indentation + .5em */\n \tline-height:2em; /* default list item's `line-height` */\n \tposition:relative;\n }\n\n .tree li:before {\n \tcontent:\"\";\n \tdisplay:block;\n \twidth:10px; /* same with indentation */\n \theight:0;\n \tborder-top:1px solid;\n \tmargin-top:-1px; /* border top width */\n \tposition:absolute;\n \ttop:1em; /* (line-height/2) */\n \tleft:0;\n }\n\n .tree li:last-child:before {\n \tbackground:white; /* same with body background */\n \theight:auto;\n \ttop:1em; /* (line-height/2) */\n \tbottom:0;\n }\n\n .edit-option, .delete-option{\n \tcolor: #336699;\n }\n .edit-option:hover{\n \tcursor: pointer;\n \tcolor: orange;\n }\n\n .delete-option:hover{\n \tcursor: pointer;\n \tcolor: red;\n }\n\n .add-btn{\n \tpadding: 1px 50px !important;\n }\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _name$data$ready$name;

var _reusable_functions = require('../../util/reusable_functions');

var _reusable_functions2 = _interopRequireDefault(_reusable_functions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_name$data$ready$name = {
	name: 'gesto-de-menu',
	data: function data() {
		return {
			loading: true
		};
	},

	ready: function ready() {
		this.load();
	}
}, (0, _defineProperty3.default)(_name$data$ready$name, 'name', 'management-menu'), (0, _defineProperty3.default)(_name$data$ready$name, 'props', {
	caption: {
		type: String,
		required: false,
		default: ''
	},
	url: {
		type: String,
		required: false,
		default: 'api/menu'
	},
	data: {
		type: Array,
		required: false,
		default: function _default() {
			return [];
		}
	}
}), (0, _defineProperty3.default)(_name$data$ready$name, 'methods', {
	destroy: function destroy(model_id) {
		if (confirm('¿Estás seguro?')) {
			this.$http.delete(this.url + '/' + model_id).then(function (resp) {
				_reusable_functions2.default.niceAlert('success', 'Se eliminó correctamente');
				this.load();
			}, function (err) {
				_reusable_functions2.default.niceAlert('error', err.message);
			});
		}
	},
	load: function load() {
		var self = this;
		self.loading = true;
		self.$http.get(self.url).then(function (resp) {
			self.data = resp.data.data;
			self.loading = false;
		}, _reusable_functions2.default.tryError);
	}
}), _name$data$ready$name);
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<loading-app v-if=\"loading===true\"></loading-app>\n\n<div id=\"menu-content\" v-else=\"\">\n\t<p>{{caption}}</p>\n\t<ul class=\"tree\">\n\t\t<li v-for=\"item in data\"><strong>{{item.name}}</strong> - <a v-link=\"{path: '/menu/edit/'+item.id}\"><i class=\"fa fa-pencil edit-option\" data-toggle=\"tooltip\" title=\"Editar\"></i></a> - <i class=\"fa fa-trash delete-option\" data-toggle=\"tooltip\" title=\"Eliminar\" @click.prevent=\"destroy(item.id)\"></i>\n\t\t\t<ul v-if=\"item.children.length>0\">\n\t\t\t\t<li v-for=\"it in item.children\">{{it.name}} - <a v-link=\"{path: '/menu/edit/'+it.id}\"><i class=\"fa fa-pencil edit-option\" data-toggle=\"tooltip\" title=\"Editar\"></i></a> - <i class=\"fa fa-trash delete-option\" data-toggle=\"tooltip\" title=\"Eliminar\" @click.prevent=\"destroy(it.id)\"></i>\n\n\t\t\t\t\t<ul v-if=\"it.children.length>0\">\n\t\t\t\t\t<li v-for=\"it0 in it.children\">{{it0.name}} - <a v-link=\"{path: '/menu/edit/'+it0.id}\"><i class=\"fa fa-pencil edit-option\" data-toggle=\"tooltip\" title=\"Editar\"></i></a> - <i class=\"fa fa-trash delete-option\" data-toggle=\"tooltip\" title=\"Eliminar\" @click.prevent=\"destroy(it0.id)\"></i></li>\n\t\t\t\t\t</ul>\n\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t</li>\n\t\t\n\t\t<li><a v-link=\"{path: '/menu/create'}\" class=\"btn btn-sm btn-primary add-btn\"><i class=\"fa fa-plus\"> Agregar</i></a></li>\n\t</ul>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n\t#menu-content {\n\t\tbackground:white;\n\t\tfont:normal normal 13px/1.4 Segoe,\"Segoe UI\",Calibri,Helmet,FreeSans,Sans-Serif;\n\t\tpadding:10px;\n\t}\n\n\n/**\n * Framework starts from here ...\n * ------------------------------\n */\n\n .tree,\n .tree ul {\n \tmargin:0 0 0 1em; /* indentation */\n \tpadding:0;\n \tlist-style:none;\n \tcolor:#369;\n \tposition:relative;\n }\n\n .tree ul {margin-left:.5em} /* (indentation/2) */\n\n .tree:before,\n .tree ul:before {\n \tcontent:\"\";\n \tdisplay:block;\n \twidth:0;\n \tposition:absolute;\n \ttop:0;\n \tbottom:0;\n \tleft:0;\n \tborder-left:1px solid;\n }\n\n .tree li {\n \tmargin:0;\n \tpadding:0 1.5em; /* indentation + .5em */\n \tline-height:2em; /* default list item's `line-height` */\n \tposition:relative;\n }\n\n .tree li:before {\n \tcontent:\"\";\n \tdisplay:block;\n \twidth:10px; /* same with indentation */\n \theight:0;\n \tborder-top:1px solid;\n \tmargin-top:-1px; /* border top width */\n \tposition:absolute;\n \ttop:1em; /* (line-height/2) */\n \tleft:0;\n }\n\n .tree li:last-child:before {\n \tbackground:white; /* same with body background */\n \theight:auto;\n \ttop:1em; /* (line-height/2) */\n \tbottom:0;\n }\n\n .edit-option, .delete-option{\n \tcolor: #336699;\n }\n .edit-option:hover{\n \tcursor: pointer;\n \tcolor: orange;\n }\n\n .delete-option:hover{\n \tcursor: pointer;\n \tcolor: red;\n }\n\n .add-btn{\n \tpadding: 1px 50px !important;\n }\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-4e25b7a2", module.exports)
  } else {
    hotAPI.update("_v-4e25b7a2", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"../../util/reusable_functions":112,"babel-runtime/helpers/defineProperty":3,"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],109:[function(require,module,exports){
var __vueify_insert__ = require("vueify/lib/insert-css")
var __vueify_style__ = __vueify_insert__.insert("\n.modal[_v-216fff90] {\n    display: block;\n}\n.modal-transition[_v-216fff90] {\n    -webkit-transition: all .6s ease;\n    transition: all .6s ease;\n}\n.modal-leave[_v-216fff90] {\n    border-radius: 1px !important;\n}\n.modal-transition .modal-dialog[_v-216fff90], .modal-transition .modal-backdrop[_v-216fff90] {\n    -webkit-transition: all .5s ease;\n    transition: all .5s ease;\n}\n.modal-enter .modal-dialog[_v-216fff90], .modal-leave .modal-dialog[_v-216fff90] {\n    opacity: 0;\n    -webkit-transform: translateY(-30%);\n            transform: translateY(-30%);\n}\n.modal-enter .modal-backdrop[_v-216fff90], .modal-leave .modal-backdrop[_v-216fff90] {\n    opacity: 0;\n}\n")
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * Bootstrap Style Modal Component for Vue
 * Depend on Bootstrap.css
 */

exports.default = {
    props: {
        show: {
            type: Boolean,
            twoWay: true,
            default: false
        },
        title: {
            type: String,
            default: 'Modal'
        },
        small: {
            type: Boolean,
            default: false
        },
        large: {
            type: Boolean,
            default: false
        },
        full: {
            type: Boolean,
            default: false
        },
        force: {
            type: Boolean,
            default: false
        },
        transition: {
            type: String,
            default: 'modal'
        },
        okText: {
            type: String,
            default: 'OK'
        },
        cancelText: {
            type: String,
            default: 'Cancel'
        },
        okClass: {
            type: String,
            default: 'btn blue'
        },
        cancelClass: {
            type: String,
            default: 'btn red btn-outline'
        },
        closeWhenOK: {
            type: Boolean,
            default: false
        },
        emitWhenClose: {
            type: String,
            default: 'ev-close'
        },
        emitWhenOk: {
            type: String,
            default: 'ev-ok'
        }
    },
    data: function data() {
        return {
            duration: null
        };
    },

    computed: {
        modalClass: function modalClass() {
            return {
                'modal-lg': this.large,
                'modal-sm': this.small,
                'modal-full': this.full
            };
        }
    },
    created: function created() {
        if (this.show) {
            document.body.className += ' modal-open';
        }
    },
    beforeDestroy: function beforeDestroy() {
        document.body.className = document.body.className.replace(/\s?modal-open/, '');
    },

    watch: {
        show: function show(value) {
            if (value) {
                document.body.className += ' modal-open';
            } else {
                if (!this.duration) {
                    this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
                }

                window.setTimeout(function () {
                    document.body.className = document.body.className.replace(/\s?modal-open/, '');
                }, this.duration || 0);
            }
        }
    },
    methods: {
        ok: function ok() {
            this.$dispatch(this.emitWhenOk);
            this.$emit('ok');
            if (this.closeWhenOK) {
                this.show = false;
            }
        },
        cancel: function cancel() {
            this.$dispatch(this.emitWhenClose);
            this.$emit('cancel');
            this.show = false;
        },
        clickMask: function clickMask() {
            if (!this.force) {
                this.cancel();
            }
        }
    }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div v-show=\"show\" :transition=\"transition\" _v-216fff90=\"\">\n    <div class=\"modal\" @click.self=\"clickMask\" _v-216fff90=\"\">\n        <div class=\"modal-dialog\" :class=\"modalClass\" v-el:dialog=\"\" _v-216fff90=\"\">\n            <div class=\"modal-content\" _v-216fff90=\"\">\n                <!--Header-->\n                <div class=\"modal-header\" _v-216fff90=\"\">\n                    <slot name=\"header\" _v-216fff90=\"\">\n                        <a type=\"button\" class=\"close\" @click=\"cancel\" _v-216fff90=\"\">x</a>\n                        <h4 class=\"modal-title\" _v-216fff90=\"\">\n                            <slot name=\"title\" _v-216fff90=\"\">\n                                {{title}}\n                            </slot>\n                        </h4>\n                    </slot>\n                </div>\n                <!--Container-->\n                <div class=\"modal-body\" _v-216fff90=\"\">\n                    <slot _v-216fff90=\"\"></slot>\n                </div>\n                <!--Footer-->\n                <div class=\"modal-footer\" _v-216fff90=\"\">\n                    <slot name=\"footer\" _v-216fff90=\"\">\n                        <button type=\"button\" :class=\"cancelClass\" @click=\"cancel\" _v-216fff90=\"\">{{cancelText}}</button>\n                        <button type=\"button\" :class=\"okClass\" @click=\"ok\" _v-216fff90=\"\">{{okText}}</button>\n                    </slot>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-backdrop in\" _v-216fff90=\"\"></div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.dispose(function () {
    __vueify_insert__.cache["\n.modal[_v-216fff90] {\n    display: block;\n}\n.modal-transition[_v-216fff90] {\n    -webkit-transition: all .6s ease;\n    transition: all .6s ease;\n}\n.modal-leave[_v-216fff90] {\n    border-radius: 1px !important;\n}\n.modal-transition .modal-dialog[_v-216fff90], .modal-transition .modal-backdrop[_v-216fff90] {\n    -webkit-transition: all .5s ease;\n    transition: all .5s ease;\n}\n.modal-enter .modal-dialog[_v-216fff90], .modal-leave .modal-dialog[_v-216fff90] {\n    opacity: 0;\n    -webkit-transform: translateY(-30%);\n            transform: translateY(-30%);\n}\n.modal-enter .modal-backdrop[_v-216fff90], .modal-leave .modal-backdrop[_v-216fff90] {\n    opacity: 0;\n}\n"] = false
    document.head.removeChild(__vueify_style__)
  })
  if (!module.hot.data) {
    hotAPI.createRecord("_v-216fff90", module.exports)
  } else {
    hotAPI.update("_v-216fff90", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20,"vueify/lib/insert-css":25}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'lockscreen'
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <h3 class=\"text-center\">Recurso no encontrado</h3>\n    <p class=\"text-center\">\n      <i class=\"fa fa-3x fa-frown-o\"></i> \n    </p>\n    <h2 class=\"text-center\">404 Page Not Found</h2>\n    <p class=\"text-center\">\n      <a v-link=\"{path: '/'}\" class=\"\"><i class=\"fa fa-home\"></i> Home</a>\n    </p>\n  </div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-b382fa48", module.exports)
  } else {
    hotAPI.update("_v-b382fa48", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	name: 'select-list',
	ready: function ready() {
		var self = this;
		if (this.url) {
			this.$http.get(this.url).then(function (resp) {
				self.data = resp.data.data;
			}, function (err) {
				console.warn(err);
			});
		}
	},
	props: {
		className: {
			type: String,
			required: false,
			default: null
		},
		labelKey: {
			type: String,
			required: false,
			default: null
		},
		valueKey: {
			type: String,
			required: false,
			default: null
		},
		data: {
			type: Array,
			required: false,
			default: function _default() {
				return [];
			}
		},
		url: {
			type: String,
			reqruired: false,
			default: null
		},
		selectLabel: {
			type: String,
			required: false,
			default: null
		},
		noDataLabel: {
			type: String,
			required: false,
			default: 'No hay datos'
		},
		selectValue: {
			type: Number | String,
			required: true
		},
		nullableLabel: {
			type: String,
			required: false,
			default: null
		},
		nullValue: {
			deafult: null
		},
		isRequired: {
			type: Boolean,
			required: false,
			default: false
		}

	},
	methods: {}
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<select v-if=\"data.length<=0\" :class=\"className\" disabled=\"\">\n\t<option>Cargando.....</option>\n</select>\n<select v-else=\"\" v-model=\"selectValue\" :class=\"className\" :required=\"isRequired\">\n\n\t<option v-if=\"selectLabel\" disabled=\"\" selected=\"\" :value=\"nullValue\">{{selectLabel}}</option>\n\n\t<template v-if=\"labelKey &amp;&amp; valueKey\">\n\t\t<option v-for=\"item in data\" value=\"{{item[valueKey]}}\">{{item[labelKey]}}</option>\n\t</template>\n\t<template v-else=\"\">\n\t\t<option v-for=\"item in data\" :value=\"item\">{{item}}</option>\n\t</template>\n\t<option v-if=\"nullableLabel\" :value=\"nullValue\">{{nullableLabel}}</option>\n\n</select>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  if (!module.hot.data) {
    hotAPI.createRecord("_v-43fb7a72", module.exports)
  } else {
    hotAPI.update("_v-43fb7a72", module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":24,"vue-hot-reload-api":20}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function myAlert(type, message) {
	if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
		for (var elem in message) {
			message[elem].forEach(function (item) {
				Lobibox.notify(type, {
					msg: item,
					sound: false
				});
			});
		}
	} else {
		Lobibox.notify(type, {
			msg: message,
			sound: false
		});
	}
}

exports.default = {
	niceAlert: myAlert,
	tryError: function tryError(err) {
		if (err.status == 401) {
			myAlert('error', 'Su sesión ha expirado, por favor vuelva a ingresar sus credenciales');
			this.$router.go('/lockscreen');
		} else if (err.status == 403) {
			console.log(err.data.message);
			myAlert('warning', err.data.message);
		} else {
			console.log(err);
			myAlert('error', 'Se ha presentado un error al tratar de traer los datos del sistema');
		}
	}
};

},{}]},{},[26]);

//# sourceMappingURL=build.js.map

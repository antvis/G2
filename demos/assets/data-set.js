(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.DataSet = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$3.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$3.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$4.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

var defineProperty = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$1.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
  return _defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800;
var HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

var _setToString = setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike_1(object) && _isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq_1(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return _baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$7.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var funcTag$1 = '[object Function]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = _createAssigner(function(object, source) {
  if (_isPrototype(source) || isArrayLike_1(source)) {
    _copyObject(source, keys_1(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      _assignValue(object, key, source[key]);
    }
  }
});

var assign_1 = assign;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

/* Built-in method references that are verified to be native. */
var Map$1 = _getNative(_root, 'Map');

var _Map = Map$1;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$10 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$10.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$8.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$1) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;
var COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]';
var dateTag$1 = '[object Date]';
var errorTag$1 = '[object Error]';
var mapTag$1 = '[object Map]';
var numberTag$1 = '[object Number]';
var regexpTag$1 = '[object RegExp]';
var setTag$1 = '[object Set]';
var stringTag$1 = '[object String]';
var symbolTag = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]';
var dataViewTag$1 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$1:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$1:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag$1:
    case dateTag$1:
    case numberTag$1:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag$1:
      return object.name == other.name && object.message == other.message;

    case regexpTag$1:
    case stringTag$1:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$1:
      var convert = _mapToArray;

    case setTag$1:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$13 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$13.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1;

/** Used for built-in method references. */
var objectProto$12 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$10 = objectProto$12.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$10.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]';
var objectTag$2 = '[object Object]';
var promiseTag = '[object Promise]';
var setTag$2 = '[object Set]';
var weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView);
var mapCtorString = _toSource(_Map);
var promiseCtorString = _toSource(_Promise);
var setCtorString = _toSource(_Set);
var weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';
var arrayTag$1 = '[object Array]';
var objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var objectProto$11 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$11.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);

  objTag = objTag == argsTag$2 ? objectTag$1 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$1 : othTag;

  var objIsObj = objTag == objectTag$1,
      othIsObj = othTag == objectTag$1,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$1)) {
    var objIsWrapped = objIsObj && hasOwnProperty$9.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$9.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var reLeadingDot = /^\./;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined;
var symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) &&
    (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1;
var COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn_1(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == 'object') {
    return isArray_1(value)
      ? _baseMatchesProperty(value[0], value[1])
      : _baseMatches(value);
  }
  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = _createBaseFor();

var _baseFor = baseFor;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = _createBaseEach(_baseForOwn);

var _baseEach = baseEach;

/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function baseSome(collection, predicate) {
  var result;

  _baseEach(collection, function(value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

var _baseSome = baseSome;

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */
function some(collection, predicate, guard) {
  var func = isArray_1(collection) ? _arraySome : _baseSome;
  if (guard && _isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, _baseIteratee(predicate, 3));
}

var some_1 = some;

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

var adder = function() {
  return new Adder;
};

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add(temp, y, this.t);
    add(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}

var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;

var degrees = 180 / pi;
var radians = pi / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;

var log = Math.log;
var pow = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function haversin(x) {
  return (x = sin(x / 2)) * x;
}

function noop() {}

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

var geoStream = function(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
};

var areaRingSum = adder();

var areaSum = adder();
var lambda00;
var phi00;
var lambda0;
var cosPhi0;
var sinPhi0;

var areaStream = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function() {
    areaRingSum.reset();
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? tau + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = noop;
  },
  sphere: function() {
    areaSum.add(tau);
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaRingEnd() {
  areaPoint(lambda00, phi00);
}

function areaPointFirst(lambda, phi) {
  areaStream.point = areaPoint;
  lambda00 = lambda, phi00 = phi;
  lambda *= radians, phi *= radians;
  lambda0 = lambda, cosPhi0 = cos(phi = phi / 2 + quarterPi), sinPhi0 = sin(phi);
}

function areaPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  phi = phi / 2 + quarterPi; // half the angular distance from south pole

  // Spherical excess E for a spherical triangle with vertices: south pole,
  // previous point, current point.  Uses a formula derived from Cagnoli’s
  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
  var dLambda = lambda - lambda0,
      sdLambda = dLambda >= 0 ? 1 : -1,
      adLambda = sdLambda * dLambda,
      cosPhi = cos(phi),
      sinPhi = sin(phi),
      k = sinPhi0 * sinPhi,
      u = cosPhi0 * cosPhi + k * cos(adLambda),
      v = k * sdLambda * sin(adLambda);
  areaRingSum.add(atan2(v, u));

  // Advance the previous points.
  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}

var area = function(object) {
  areaSum.reset();
  geoStream(object, areaStream);
  return areaSum * 2;
};

function spherical(cartesian) {
  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

var lambda0$1;
var phi0;
var lambda1;
var phi1;
var lambda2;
var lambda00$1;
var phi00$1;
var p0;
var deltaSum = adder();
var ranges;
var range;

var boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream.point = boundsRingPoint;
    boundsStream.lineStart = boundsRingStart;
    boundsStream.lineEnd = boundsRingEnd;
    deltaSum.reset();
    areaStream.polygonStart();
  },
  polygonEnd: function() {
    areaStream.polygonEnd();
    boundsStream.point = boundsPoint;
    boundsStream.lineStart = boundsLineStart;
    boundsStream.lineEnd = boundsLineEnd;
    if (areaRingSum < 0) lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
    else if (deltaSum > epsilon) phi1 = 90;
    else if (deltaSum < -epsilon) phi0 = -90;
    range[0] = lambda0$1, range[1] = lambda1;
  }
};

function boundsPoint(lambda, phi) {
  ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
}

function linePoint(lambda, phi) {
  var p = cartesian([lambda * radians, phi * radians]);
  if (p0) {
    var normal = cartesianCross(p0, p),
        equatorial = [normal[1], -normal[0], 0],
        inflection = cartesianCross(equatorial, normal);
    cartesianNormalizeInPlace(inflection);
    inflection = spherical(inflection);
    var delta = lambda - lambda2,
        sign$$1 = delta > 0 ? 1 : -1,
        lambdai = inflection[0] * degrees * sign$$1,
        phii,
        antimeridian = abs(delta) > 180;
    if (antimeridian ^ (sign$$1 * lambda2 < lambdai && lambdai < sign$$1 * lambda)) {
      phii = inflection[1] * degrees;
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign$$1 * lambda2 < lambdai && lambdai < sign$$1 * lambda)) {
      phii = -inflection[1] * degrees;
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi < phi0) phi0 = phi;
      if (phi > phi1) phi1 = phi;
    }
    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
      }
    } else {
      if (lambda1 >= lambda0$1) {
        if (lambda < lambda0$1) lambda0$1 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
  }
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
  p0 = p, lambda2 = lambda;
}

function boundsLineStart() {
  boundsStream.point = linePoint;
}

function boundsLineEnd() {
  range[0] = lambda0$1, range[1] = lambda1;
  boundsStream.point = boundsPoint;
  p0 = null;
}

function boundsRingPoint(lambda, phi) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00$1 = lambda, phi00$1 = phi;
  }
  areaStream.point(lambda, phi);
  linePoint(lambda, phi);
}

function boundsRingStart() {
  areaStream.lineStart();
}

function boundsRingEnd() {
  boundsRingPoint(lambda00$1, phi00$1);
  areaStream.lineEnd();
  if (abs(deltaSum) > epsilon) lambda0$1 = -(lambda1 = 180);
  range[0] = lambda0$1, range[1] = lambda1;
  p0 = null;
}

// Finds the left-right distance between two longitudes.
// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
// the distance between ±180° to be 360°.
function angle(lambda0, lambda1) {
  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}

function rangeCompare(a, b) {
  return a[0] - b[0];
}

function rangeContains(range, x) {
  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}

var bounds = function(feature) {
  var i, n, a, b, merged, deltaMax, delta;

  phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
  ranges = [];
  geoStream(feature, boundsStream);

  // First, sort ranges by their minimum longitudes.
  if (n = ranges.length) {
    ranges.sort(rangeCompare);

    // Then, merge any ranges that overlap.
    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b = ranges[i];
      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    }

    // Finally, find the largest gap between the merged ranges.
    // The final bounding box will be the inverse of this gap.
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0$1 = b[0], lambda1 = a[1];
    }
  }

  ranges = range = null;

  return lambda0$1 === Infinity || phi0 === Infinity
      ? [[NaN, NaN], [NaN, NaN]]
      : [[lambda0$1, phi0], [lambda1, phi1]];
};

var W0;
var W1;
var X0;
var Y0;
var Z0;
var X1;
var Y1;
var Z1;
var X2;
var Y2;
var Z2;
var lambda00$2;
var phi00$2;
var x0;
var y0;
var z0; // previous point

var centroidStream = {
  sphere: noop,
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  }
};

// Arithmetic mean of Cartesian vectors.
function centroidPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos(phi);
  centroidPointCartesian(cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi));
}

function centroidPointCartesian(x, y, z) {
  ++W0;
  X0 += (x - X0) / W0;
  Y0 += (y - Y0) / W0;
  Z0 += (z - Z0) / W0;
}

function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}

function centroidLinePointFirst(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos(phi);
  x0 = cosPhi * cos(lambda);
  y0 = cosPhi * sin(lambda);
  z0 = sin(phi);
  centroidStream.point = centroidLinePoint;
  centroidPointCartesian(x0, y0, z0);
}

function centroidLinePoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos(phi),
      x = cosPhi * cos(lambda),
      y = cosPhi * sin(lambda),
      z = sin(phi),
      w = atan2(sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}

function centroidRingEnd() {
  centroidRingPoint(lambda00$2, phi00$2);
  centroidStream.point = centroidPoint;
}

function centroidRingPointFirst(lambda, phi) {
  lambda00$2 = lambda, phi00$2 = phi;
  lambda *= radians, phi *= radians;
  centroidStream.point = centroidRingPoint;
  var cosPhi = cos(phi);
  x0 = cosPhi * cos(lambda);
  y0 = cosPhi * sin(lambda);
  z0 = sin(phi);
  centroidPointCartesian(x0, y0, z0);
}

function centroidRingPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos(phi),
      x = cosPhi * cos(lambda),
      y = cosPhi * sin(lambda),
      z = sin(phi),
      cx = y0 * z - z0 * y,
      cy = z0 * x - x0 * z,
      cz = x0 * y - y0 * x,
      m = sqrt(cx * cx + cy * cy + cz * cz),
      w = asin(m), // line weight = angle
      v = m && -w / m; // area weight multiplier
  X2 += v * cx;
  Y2 += v * cy;
  Z2 += v * cz;
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

var centroid = function(object) {
  W0 = W1 =
  X0 = Y0 = Z0 =
  X1 = Y1 = Z1 =
  X2 = Y2 = Z2 = 0;
  geoStream(object, centroidStream);

  var x = X2,
      y = Y2,
      z = Z2,
      m = x * x + y * y + z * z;

  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
  if (m < epsilon2) {
    x = X1, y = Y1, z = Z1;
    // If the feature has zero length, fall back to arithmetic mean of point vectors.
    if (W1 < epsilon) x = X0, y = Y0, z = Z0;
    m = x * x + y * y + z * z;
    // If the feature still has an undefined ccentroid, then return.
    if (m < epsilon2) return [NaN, NaN];
  }

  return [atan2(y, x) * degrees, asin(z / sqrt(m)) * degrees];
};

var constant$2 = function(x) {
  return function() {
    return x;
  };
};

var compose = function(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
};

function rotationIdentity(lambda, phi) {
  return [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos(deltaPhi),
      sinDeltaPhi = sin(deltaPhi),
      cosDeltaGamma = cos(deltaGamma),
      sinDeltaGamma = sin(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

var rotation = function(rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians, coordinates[1] * radians);
    return coordinates[0] *= degrees, coordinates[1] *= degrees, coordinates;
  };

  return forward;
};

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos(radius),
      sinRadius = sin(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

var geoCircle = function() {
  var center = constant$2([0, 0]),
      radius = constant$2(90),
      precision = constant$2(6),
      ring,
      rotate,
      stream = {point: point};

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= degrees, x[1] *= degrees;
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * radians,
        p = precision.apply(this, arguments) * radians;
    ring = [];
    rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
    circleStream(stream, r, p, 1);
    c = {type: "Polygon", coordinates: [ring]};
    ring = rotate = null;
    return c;
  }

  circle.center = function(_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : constant$2([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$2(+_), circle) : radius;
  };

  circle.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : constant$2(+_), circle) : precision;
  };

  return circle;
};

var clipBuffer = function() {
  var lines = [],
      line;
  return {
    point: function(x, y) {
      line.push([x, y]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
};

var clipLine = function(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
};

var pointEqual = function(a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
};

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
var clipPolygon = function(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    // If the first and last points of a segment are coincident, then treat as a
    // closed ring. TODO if all rings are closed, then the winding order of the
    // exterior ring should be checked.
    if (pointEqual(p0, p1)) {
      stream.lineStart();
      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
      stream.lineEnd();
      return;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
};

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

var ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};

var bisector = function(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
};

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;

var pairs = function(array, f) {
  if (f == null) f = pair;
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array[++i]);
  return pairs;
};

function pair(a, b) {
  return [a, b];
}

var cross = function(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;

  if (reduce == null) reduce = pair;

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
};

var descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};

var number = function(x) {
  return x === null ? NaN : +x;
};

var variance = function(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
};

var deviation = function(array, f) {
  var v = variance(array, f);
  return v ? Math.sqrt(v) : v;
};

var extent$1 = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
};

var array = Array.prototype;

var slice = array.slice;
var map = array.map;

var constant$3 = function(x) {
  return function() {
    return x;
  };
};

var identity$2 = function(x) {
  return x;
};

var range$1 = function(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
};

var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);

var ticks = function(start, stop, count) {
  var reverse = stop < start,
      i = -1,
      n,
      ticks,
      step;

  if (reverse) n = start, start = stop, stop = n;

  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
};

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

var sturges = function(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
};

var histogram = function() {
  var value = identity$2,
      domain = extent$1,
      threshold = sturges;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = tickStep(x0, x1, tz);
      tz = range$1(Math.ceil(x0 / tz) * tz, Math.floor(x1 / tz) * tz, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[bisectRight(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$3(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant$3([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant$3(slice.call(_)) : constant$3(_), histogram) : threshold;
  };

  return histogram;
};

var quantile = function(values, p, valueof) {
  if (valueof == null) valueof = number;
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
};

var freedmanDiaconis = function(values, min, max) {
  values = map.call(values, number).sort(ascending);
  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
};

var scott = function(values, min, max) {
  return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
};

var max = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  return max;
};

var mean = function(values, valueof) {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) sum += value;
      else --m;
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
};

var median = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      numbers = [];

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = number(values[i]))) {
        numbers.push(value);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = number(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }

  return quantile(numbers.sort(ascending), 0.5);
};

var merge = function(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
};

var min = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  return min;
};

var permute = function(array, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
};

var scan = function(values, compare) {
  if (!(n = values.length)) return;
  var n,
      i = 0,
      j = 0,
      xi,
      xj = values[j];

  if (compare == null) compare = ascending;

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
};

var shuffle = function(array, i0, i1) {
  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
};

var sum = function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
    }
  }

  else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum += value;
    }
  }

  return sum;
};

var transpose = function(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
};

function length(d) {
  return d.length;
}

var zip = function() {
  return transpose(arguments);
};



var index$3 = Object.freeze({
	bisect: bisectRight,
	bisectRight: bisectRight,
	bisectLeft: bisectLeft,
	ascending: ascending,
	bisector: bisector,
	cross: cross,
	descending: descending,
	deviation: deviation,
	extent: extent$1,
	histogram: histogram,
	thresholdFreedmanDiaconis: freedmanDiaconis,
	thresholdScott: scott,
	thresholdSturges: sturges,
	max: max,
	mean: mean,
	median: median,
	merge: merge,
	min: min,
	pairs: pairs,
	permute: permute,
	quantile: quantile,
	range: range$1,
	scan: scan,
	shuffle: shuffle,
	sum: sum,
	ticks: ticks,
	tickIncrement: tickIncrement,
	tickStep: tickStep,
	transpose: transpose,
	variance: variance,
	zip: zip
});

var clipMax = 1e9;
var clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipExtent(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon ? direction > 0 ? 0 : 3
        : abs(p[0] - x1) < epsilon ? direction > 0 ? 2 : 1
        : abs(p[1] - y0) < epsilon ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          clipPolygon(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (clipLine(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

var extent = function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      cache,
      cacheStream,
      clip;

  return clip = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = clipExtent(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function(_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
};

var sum$1 = adder();

var polygonContains = function(polygon, point) {
  var lambda = point[0],
      phi = point[1],
      normal = [sin(lambda), -cos(lambda), 0],
      angle = 0,
      winding = 0;

  sum$1.reset();

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = point0[0],
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin(phi0),
        cosPhi0 = cos(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = point1[0],
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin(phi1),
          cosPhi1 = cos(phi1),
          delta = lambda1 - lambda0,
          sign$$1 = delta >= 0 ? 1 : -1,
          absDelta = sign$$1 * delta,
          antimeridian = absDelta > pi,
          k = sinPhi0 * sinPhi1;

      sum$1.add(atan2(k * sign$$1 * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
      angle += antimeridian ? delta + sign$$1 * tau : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon || angle < epsilon && sum$1 < -epsilon) ^ (winding & 1);
};

var lengthSum = adder();
var lambda0$2;
var sinPhi0$1;
var cosPhi0$1;

var lengthStream = {
  sphere: noop,
  point: noop,
  lineStart: lengthLineStart,
  lineEnd: noop,
  polygonStart: noop,
  polygonEnd: noop
};

function lengthLineStart() {
  lengthStream.point = lengthPointFirst;
  lengthStream.lineEnd = lengthLineEnd;
}

function lengthLineEnd() {
  lengthStream.point = lengthStream.lineEnd = noop;
}

function lengthPointFirst(lambda, phi) {
  lambda *= radians, phi *= radians;
  lambda0$2 = lambda, sinPhi0$1 = sin(phi), cosPhi0$1 = cos(phi);
  lengthStream.point = lengthPoint;
}

function lengthPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var sinPhi = sin(phi),
      cosPhi = cos(phi),
      delta = abs(lambda - lambda0$2),
      cosDelta = cos(delta),
      sinDelta = sin(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0$1 * sinPhi - sinPhi0$1 * cosPhi * cosDelta,
      z = sinPhi0$1 * sinPhi + cosPhi0$1 * cosPhi * cosDelta;
  lengthSum.add(atan2(sqrt(x * x + y * y), z));
  lambda0$2 = lambda, sinPhi0$1 = sinPhi, cosPhi0$1 = cosPhi;
}

var length$1 = function(object) {
  lengthSum.reset();
  geoStream(object, lengthStream);
  return +lengthSum;
};

var coordinates = [null, null];
var object = {type: "LineString", coordinates: coordinates};

var distance = function(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return length$1(object);
};

var containsObjectType = {
  Feature: function(object, point) {
    return containsGeometry(object.geometry, point);
  },
  FeatureCollection: function(object, point) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;
    return false;
  }
};

var containsGeometryType = {
  Sphere: function() {
    return true;
  },
  Point: function(object, point) {
    return containsPoint(object.coordinates, point);
  },
  MultiPoint: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPoint(coordinates[i], point)) return true;
    return false;
  },
  LineString: function(object, point) {
    return containsLine(object.coordinates, point);
  },
  MultiLineString: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsLine(coordinates[i], point)) return true;
    return false;
  },
  Polygon: function(object, point) {
    return containsPolygon(object.coordinates, point);
  },
  MultiPolygon: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPolygon(coordinates[i], point)) return true;
    return false;
  },
  GeometryCollection: function(object, point) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) if (containsGeometry(geometries[i], point)) return true;
    return false;
  }
};

function containsGeometry(geometry, point) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type)
      ? containsGeometryType[geometry.type](geometry, point)
      : false;
}

function containsPoint(coordinates, point) {
  return distance(coordinates, point) === 0;
}

function containsLine(coordinates, point) {
  var ab = distance(coordinates[0], coordinates[1]),
      ao = distance(coordinates[0], point),
      ob = distance(point, coordinates[1]);
  return ao + ob <= ab + epsilon;
}

function containsPolygon(coordinates, point) {
  return !!polygonContains(coordinates.map(ringRadians), pointRadians(point));
}

function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}

function pointRadians(point) {
  return [point[0] * radians, point[1] * radians];
}

var contains = function(object, point) {
  return (object && containsObjectType.hasOwnProperty(object.type)
      ? containsObjectType[object.type]
      : containsGeometry)(object, point);
};

function graticuleX(y0, y1, dy) {
  var y = range$1(y0, y1 - epsilon, dy).concat(y1);
  return function(x) { return y.map(function(y) { return [x, y]; }); };
}

function graticuleY(x0, x1, dx) {
  var x = range$1(x0, x1 - epsilon, dx).concat(x1);
  return function(y) { return x.map(function(x) { return [x, y]; }); };
}

function graticule() {
  var x1, x0, X1, X0,
      y1, y0, Y1, Y0,
      dx = 10, dy = dx, DX = 90, DY = 360,
      x, y, X, Y,
      precision = 2.5;

  function graticule() {
    return {type: "MultiLineString", coordinates: lines()};
  }

  function lines() {
    return range$1(ceil(X0 / DX) * DX, X1, DX).map(X)
        .concat(range$1(ceil(Y0 / DY) * DY, Y1, DY).map(Y))
        .concat(range$1(ceil(x0 / dx) * dx, x1, dx).filter(function(x) { return abs(x % DX) > epsilon; }).map(x))
        .concat(range$1(ceil(y0 / dy) * dy, y1, dy).filter(function(y) { return abs(y % DY) > epsilon; }).map(y));
  }

  graticule.lines = function() {
    return lines().map(function(coordinates) { return {type: "LineString", coordinates: coordinates}; });
  };

  graticule.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X(X0).concat(
        Y(Y1).slice(1),
        X(X1).reverse().slice(1),
        Y(Y0).reverse().slice(1))
      ]
    };
  };

  graticule.extent = function(_) {
    if (!arguments.length) return graticule.extentMinor();
    return graticule.extentMajor(_).extentMinor(_);
  };

  graticule.extentMajor = function(_) {
    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
    X0 = +_[0][0], X1 = +_[1][0];
    Y0 = +_[0][1], Y1 = +_[1][1];
    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
    return graticule.precision(precision);
  };

  graticule.extentMinor = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule.precision(precision);
  };

  graticule.step = function(_) {
    if (!arguments.length) return graticule.stepMinor();
    return graticule.stepMajor(_).stepMinor(_);
  };

  graticule.stepMajor = function(_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule;
  };

  graticule.stepMinor = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  graticule.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    x = graticuleX(y0, y1, 90);
    y = graticuleY(x0, x1, precision);
    X = graticuleX(Y0, Y1, 90);
    Y = graticuleY(X0, X1, precision);
    return graticule;
  };

  return graticule
      .extentMajor([[-180, -90 + epsilon], [180, 90 - epsilon]])
      .extentMinor([[-180, -80 - epsilon], [180, 80 + epsilon]]);
}

function graticule10() {
  return graticule()();
}

var interpolate = function(a, b) {
  var x0 = a[0] * radians,
      y0 = a[1] * radians,
      x1 = b[0] * radians,
      y1 = b[1] * radians,
      cy0 = cos(y0),
      sy0 = sin(y0),
      cy1 = cos(y1),
      sy1 = sin(y1),
      kx0 = cy0 * cos(x0),
      ky0 = cy0 * sin(x0),
      kx1 = cy1 * cos(x1),
      ky1 = cy1 * sin(x1),
      d = 2 * asin(sqrt(haversin(y1 - y0) + cy0 * cy1 * haversin(x1 - x0))),
      k = sin(d);

  var interpolate = d ? function(t) {
    var B = sin(t *= d) / k,
        A = sin(d - t) / k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      atan2(y, x) * degrees,
      atan2(z, sqrt(x * x + y * y)) * degrees
    ];
  } : function() {
    return [x0 * degrees, y0 * degrees];
  };

  interpolate.distance = d;

  return interpolate;
};

var identity$3 = function(x) {
  return x;
};

var areaSum$1 = adder();
var areaRingSum$1 = adder();
var x00;
var y00;
var x0$1;
var y0$1;

var areaStream$1 = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function() {
    areaStream$1.lineStart = areaRingStart$1;
    areaStream$1.lineEnd = areaRingEnd$1;
  },
  polygonEnd: function() {
    areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop;
    areaSum$1.add(abs(areaRingSum$1));
    areaRingSum$1.reset();
  },
  result: function() {
    var area = areaSum$1 / 2;
    areaSum$1.reset();
    return area;
  }
};

function areaRingStart$1() {
  areaStream$1.point = areaPointFirst$1;
}

function areaPointFirst$1(x, y) {
  areaStream$1.point = areaPoint$1;
  x00 = x0$1 = x, y00 = y0$1 = y;
}

function areaPoint$1(x, y) {
  areaRingSum$1.add(y0$1 * x - x0$1 * y);
  x0$1 = x, y0$1 = y;
}

function areaRingEnd$1() {
  areaPoint$1(x00, y00);
}

var x0$2 = Infinity;
var y0$2 = x0$2;
var x1 = -x0$2;
var y1 = x1;

var boundsStream$1 = {
  point: boundsPoint$1,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: noop,
  polygonEnd: noop,
  result: function() {
    var bounds = [[x0$2, y0$2], [x1, y1]];
    x1 = y1 = -(y0$2 = x0$2 = Infinity);
    return bounds;
  }
};

function boundsPoint$1(x, y) {
  if (x < x0$2) x0$2 = x;
  if (x > x1) x1 = x;
  if (y < y0$2) y0$2 = y;
  if (y > y1) y1 = y;
}

// TODO Enforce positive area for exterior, negative area for interior?

var X0$1 = 0;
var Y0$1 = 0;
var Z0$1 = 0;
var X1$1 = 0;
var Y1$1 = 0;
var Z1$1 = 0;
var X2$1 = 0;
var Y2$1 = 0;
var Z2$1 = 0;
var x00$1;
var y00$1;
var x0$3;
var y0$3;

var centroidStream$1 = {
  point: centroidPoint$1,
  lineStart: centroidLineStart$1,
  lineEnd: centroidLineEnd$1,
  polygonStart: function() {
    centroidStream$1.lineStart = centroidRingStart$1;
    centroidStream$1.lineEnd = centroidRingEnd$1;
  },
  polygonEnd: function() {
    centroidStream$1.point = centroidPoint$1;
    centroidStream$1.lineStart = centroidLineStart$1;
    centroidStream$1.lineEnd = centroidLineEnd$1;
  },
  result: function() {
    var centroid = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1]
        : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1]
        : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1]
        : [NaN, NaN];
    X0$1 = Y0$1 = Z0$1 =
    X1$1 = Y1$1 = Z1$1 =
    X2$1 = Y2$1 = Z2$1 = 0;
    return centroid;
  }
};

function centroidPoint$1(x, y) {
  X0$1 += x;
  Y0$1 += y;
  ++Z0$1;
}

function centroidLineStart$1() {
  centroidStream$1.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream$1.point = centroidPointLine;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
  X1$1 += z * (x0$3 + x) / 2;
  Y1$1 += z * (y0$3 + y) / 2;
  Z1$1 += z;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function centroidLineEnd$1() {
  centroidStream$1.point = centroidPoint$1;
}

function centroidRingStart$1() {
  centroidStream$1.point = centroidPointFirstRing;
}

function centroidRingEnd$1() {
  centroidPointRing(x00$1, y00$1);
}

function centroidPointFirstRing(x, y) {
  centroidStream$1.point = centroidPointRing;
  centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0$3,
      dy = y - y0$3,
      z = sqrt(dx * dx + dy * dy);

  X1$1 += z * (x0$3 + x) / 2;
  Y1$1 += z * (y0$3 + y) / 2;
  Z1$1 += z;

  z = y0$3 * x - x0$3 * y;
  X2$1 += z * (x0$3 + x);
  Y2$1 += z * (y0$3 + y);
  Z2$1 += z * 3;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau);
        break;
      }
    }
  },
  result: noop
};

var lengthSum$1 = adder();
var lengthRing;
var x00$2;
var y00$2;
var x0$4;
var y0$4;

var lengthStream$1 = {
  point: noop,
  lineStart: function() {
    lengthStream$1.point = lengthPointFirst$1;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint$1(x00$2, y00$2);
    lengthStream$1.point = noop;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum$1;
    lengthSum$1.reset();
    return length;
  }
};

function lengthPointFirst$1(x, y) {
  lengthStream$1.point = lengthPoint$1;
  x00$2 = x0$4 = x, y00$2 = y0$4 = y;
}

function lengthPoint$1(x, y) {
  x0$4 -= x, y0$4 -= y;
  lengthSum$1.add(sqrt(x0$4 * x0$4 + y0$4 * y0$4));
  x0$4 = x, y0$4 = y;
}

function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}

var index$4 = function(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    geoStream(object, projectionStream(areaStream$1));
    return areaStream$1.result();
  };

  path.measure = function(object) {
    geoStream(object, projectionStream(lengthStream$1));
    return lengthStream$1.result();
  };

  path.bounds = function(object) {
    geoStream(object, projectionStream(boundsStream$1));
    return boundsStream$1.result();
  };

  path.centroid = function(object) {
    geoStream(object, projectionStream(centroidStream$1));
    return centroidStream$1.result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$3) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
};

var clip = function(pointVisible, clipLine, interpolate, start) {
  return function(rotate, sink) {
    var line = clipLine(sink),
        rotatedStart = rotate.invert(start[0], start[1]),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains(polygon, rotatedStart);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipPolygon(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      var point = rotate(lambda, phi);
      if (pointVisible(lambda = point[0], phi = point[1])) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      var point = rotate(lambda, phi);
      line.point(point[0], point[1]);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      var point = rotate(lambda, phi);
      ringSink.point(point[0], point[1]);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
};

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

var clipAntimeridian = clip(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi, -halfPi]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi,
          delta = abs(lambda1 - lambda0);
      if (abs(delta - pi) < epsilon) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) { // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon) lambda0 -= sign0 * epsilon; // handle degeneracies
        if (abs(lambda1 - sign1) < epsilon) lambda1 -= sign1 * epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon
      ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1)
          - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi;
    stream.point(-pi, phi);
    stream.point(0, phi);
    stream.point(pi, phi);
    stream.point(pi, 0);
    stream.point(pi, -phi);
    stream.point(0, -phi);
    stream.point(-pi, -phi);
    stream.point(-pi, 0);
    stream.point(-pi, phi);
  } else if (abs(from[0] - to[0]) > epsilon) {
    var lambda = from[0] < to[0] ? pi : -pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

var clipCircle = function(radius, delta) {
  var cr = cos(radius),
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        // Handle degeneracies.
        // TODO ignore if not clipping polygons.
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2)) {
            point1[0] += epsilon;
            point1[1] += epsilon;
            v = visible(point1[0], point1[1]);
          }
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1]);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
            }
          }
        }
        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);

    if (t2 < 0) return;

    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = abs(delta - pi) < epsilon,
        meridian = polar || delta < epsilon;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
};

var transform = function(methods) {
  return {
    stream: transformer(methods)
  };
};

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};

function fitExtent(projection, extent, object) {
  var w = extent[1][0] - extent[0][0],
      h = extent[1][1] - extent[0][1],
      clip = projection.clipExtent && projection.clipExtent();

  projection
      .scale(150)
      .translate([0, 0]);

  if (clip != null) projection.clipExtent(null);

  geoStream(object, projection.stream(boundsStream$1));

  var b = boundsStream$1.result(),
      k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
      x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
      y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;

  if (clip != null) projection.clipExtent(clip);

  return projection
      .scale(k * 150)
      .translate([x, y]);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

var maxDepth = 16;
var cosMinDistance = cos(30 * radians); // cos(minimum angular distance)

var resample = function(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
};

function resampleNone(project) {
  return transformer({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$1(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt(a * a + b * b + c * c),
          phi2 = asin(c /= m),
          lambda2 = abs(abs(c) - 1) < epsilon || abs(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : atan2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians = transformer({
  point: function(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      dx, dy, lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, projectRotate, // rotate
      theta = null, preclip = clipAntimeridian, // clip angle
      x0 = null, y0, x1, y1, postclip = identity$3, // clip extent
      delta2 = 0.5, projectResample = resample(projectTransform, delta2), // precision
      cache,
      cacheStream;

  function projection(point) {
    point = projectRotate(point[0] * radians, point[1] * radians);
    return [point[0] * k + dx, dy - point[1] * k];
  }

  function invert(point) {
    point = projectRotate.invert((point[0] - dx) / k, (dy - point[1]) / k);
    return point && [point[0] * degrees, point[1] * degrees];
  }

  function projectTransform(x, y) {
    return x = project(x, y), [x[0] * k + dx, dy - x[1] * k];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(preclip(rotate, projectResample(postclip(cacheStream = stream))));
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians, 6 * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$3) : clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function(extent$$1, object) {
    return fitExtent(projection, extent$$1, object);
  };

  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };

  function recenter() {
    projectRotate = compose(rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma), project);
    var center = project(lambda, phi);
    dx = x - center[0] * k;
    dy = y + center[1] * k;
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = pi / 3,
      m = projectionMutator(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * radians, phi1 = _[1] * radians) : [phi0 * degrees, phi1 * degrees];
  };

  return p;
}

function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = cos(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, sin(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, asin(y * cosPhi0)];
  };

  return forward;
}

function conicEqualAreaRaw(y0, y1) {
  var sy0 = sin(y0), n = (sy0 + sin(y1)) / 2;

  // Are the parallels symmetrical around the Equator?
  if (abs(n) < epsilon) return cylindricalEqualAreaRaw(y0);

  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;

  function project(x, y) {
    var r = sqrt(c - 2 * n * sin(y)) / n;
    return [r * sin(x *= n), r0 - r * cos(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y;
    return [atan2(x, abs(r0y)) / n * sign(r0y), asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

var conicEqualArea = function() {
  return conicProjection(conicEqualAreaRaw)
      .scale(155.424)
      .center([0, 33.6442]);
};

var albers = function() {
  return conicEqualArea()
      .parallels([29.5, 45.5])
      .scale(1070)
      .translate([480, 250])
      .rotate([96, 0])
      .center([-0.6, 38.7]);
};

// The projections must have mutually exclusive clip regions on the sphere,
// as this will avoid emitting interleaving lines and polygons.
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
    sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
    lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
    lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
    polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
    polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
  };
}

// A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
var albersUsa = function() {
  var cache,
      cacheStream,
      lower48 = albers(), lower48Point,
      alaska = conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
      hawaii = conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
      point, pointStream = {point: function(x, y) { point = [x, y]; }};

  function albersUsa(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    return point = null,
        (lower48Point.point(x, y), point)
        || (alaskaPoint.point(x, y), point)
        || (hawaiiPoint.point(x, y), point);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
        : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
        : lower48).invert(coordinates);
  };

  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return reset();
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48Point = lower48
        .translate(_)
        .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
        .stream(pointStream);

    alaskaPoint = alaska
        .translate([x - 0.307 * k, y + 0.201 * k])
        .clipExtent([[x - 0.425 * k + epsilon, y + 0.120 * k + epsilon], [x - 0.214 * k - epsilon, y + 0.234 * k - epsilon]])
        .stream(pointStream);

    hawaiiPoint = hawaii
        .translate([x - 0.205 * k, y + 0.212 * k])
        .clipExtent([[x - 0.214 * k + epsilon, y + 0.166 * k + epsilon], [x - 0.115 * k - epsilon, y + 0.234 * k - epsilon]])
        .stream(pointStream);

    return reset();
  };

  albersUsa.fitExtent = function(extent, object) {
    return fitExtent(albersUsa, extent, object);
  };

  albersUsa.fitSize = function(size, object) {
    return fitSize(albersUsa, size, object);
  };

  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }

  return albersUsa.scale(1070);
};

function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
    return [
      k * cy * sin(x),
      k * sin(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin(c),
        cc = cos(c);
    return [
      atan2(x * sc, z * cc),
      asin(z && y * sc / z)
    ];
  }
}

var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});

var azimuthalEqualArea = function() {
  return projection(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
};

var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

var azimuthalEquidistant = function() {
  return projection(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
};

function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * atan(exp(y)) - halfPi];
};

var mercator = function() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / tau);
};

function mercatorProjection(project) {
  var m = projection(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = pi * scale(),
        t = m(rotation(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}

function tany(y) {
  return tan((halfPi + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = cos(y0),
      n = y0 === y1 ? sin(y0) : log(cy0 / cos(y1)) / log(tany(y1) / tany(y0)),
      f = cy0 * pow(tany(y0), n) / n;

  if (!n) return mercatorRaw;

  function project(x, y) {
    if (f > 0) { if (y < -halfPi + epsilon) y = -halfPi + epsilon; }
    else { if (y > halfPi - epsilon) y = halfPi - epsilon; }
    var r = f / pow(tany(y), n);
    return [r * sin(n * x), f - r * cos(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = sign(n) * sqrt(x * x + fy * fy);
    return [atan2(x, abs(fy)) / n * sign(fy), 2 * atan(pow(f / r, 1 / n)) - halfPi];
  };

  return project;
}

var conicConformal = function() {
  return conicProjection(conicConformalRaw)
      .scale(109.5)
      .parallels([30, 30]);
};

function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

var geoEquirectangular = function() {
  return projection(equirectangularRaw)
      .scale(152.63);
};

function conicEquidistantRaw(y0, y1) {
  var cy0 = cos(y0),
      n = y0 === y1 ? sin(y0) : (cy0 - cos(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if (abs(n) < epsilon) return equirectangularRaw;

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * sin(nx), g - gy * cos(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y;
    return [atan2(x, abs(gy)) / n * sign(gy), g - sign(n) * sqrt(x * x + gy * gy)];
  };

  return project;
}

var conicEquidistant = function() {
  return conicProjection(conicEquidistantRaw)
      .scale(131.154)
      .center([0, 13.9389]);
};

function gnomonicRaw(x, y) {
  var cy = cos(y), k = cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}

gnomonicRaw.invert = azimuthalInvert(atan);

var gnomonic = function() {
  return projection(gnomonicRaw)
      .scale(144.049)
      .clipAngle(60);
};

function scaleTranslate(kx, ky, tx, ty) {
  return kx === 1 && ky === 1 && tx === 0 && ty === 0 ? identity$3 : transformer({
    point: function(x, y) {
      this.stream.point(x * kx + tx, y * ky + ty);
    }
  });
}

var identity$4 = function() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, transform$$1 = identity$3, // scale, translate and reflect
      x0 = null, y0, x1, y1, clip = identity$3, // clip extent
      cache,
      cacheStream,
      projection;

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return projection = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = transform$$1(clip(cacheStream = stream));
    },
    clipExtent: function(_) {
      return arguments.length ? (clip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$3) : clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
    },
    scale: function(_) {
      return arguments.length ? (transform$$1 = scaleTranslate((k = +_) * sx, k * sy, tx, ty), reset()) : k;
    },
    translate: function(_) {
      return arguments.length ? (transform$$1 = scaleTranslate(k * sx, k * sy, tx = +_[0], ty = +_[1]), reset()) : [tx, ty];
    },
    reflectX: function(_) {
      return arguments.length ? (transform$$1 = scaleTranslate(k * (sx = _ ? -1 : 1), k * sy, tx, ty), reset()) : sx < 0;
    },
    reflectY: function(_) {
      return arguments.length ? (transform$$1 = scaleTranslate(k * sx, k * (sy = _ ? -1 : 1), tx, ty), reset()) : sy < 0;
    },
    fitExtent: function(extent$$1, object) {
      return fitExtent(projection, extent$$1, object);
    },
    fitSize: function(size, object) {
      return fitSize(projection, size, object);
    }
  };
};

function orthographicRaw(x, y) {
  return [cos(y) * sin(x), sin(y)];
}

orthographicRaw.invert = azimuthalInvert(asin);

var geoOrthographic = function() {
  return projection(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + epsilon);
};

function stereographicRaw(x, y) {
  var cy = cos(y), k = 1 + cos(x) * cy;
  return [cy * sin(x) / k, sin(y) / k];
}

stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});

var stereographic = function() {
  return projection(stereographicRaw)
      .scale(250)
      .clipAngle(142);
};

function transverseMercatorRaw(lambda, phi) {
  return [log(tan((halfPi + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function(x, y) {
  return [-y, 2 * atan(exp(x)) - halfPi];
};

var transverseMercator = function() {
  var m = mercatorProjection(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
};



var index$2 = Object.freeze({
	geoArea: area,
	geoBounds: bounds,
	geoCentroid: centroid,
	geoCircle: geoCircle,
	geoClipExtent: extent,
	geoContains: contains,
	geoDistance: distance,
	geoGraticule: graticule,
	geoGraticule10: graticule10,
	geoInterpolate: interpolate,
	geoLength: length$1,
	geoPath: index$4,
	geoAlbers: albers,
	geoAlbersUsa: albersUsa,
	geoAzimuthalEqualArea: azimuthalEqualArea,
	geoAzimuthalEqualAreaRaw: azimuthalEqualAreaRaw,
	geoAzimuthalEquidistant: azimuthalEquidistant,
	geoAzimuthalEquidistantRaw: azimuthalEquidistantRaw,
	geoConicConformal: conicConformal,
	geoConicConformalRaw: conicConformalRaw,
	geoConicEqualArea: conicEqualArea,
	geoConicEqualAreaRaw: conicEqualAreaRaw,
	geoConicEquidistant: conicEquidistant,
	geoConicEquidistantRaw: conicEquidistantRaw,
	geoEquirectangular: geoEquirectangular,
	geoEquirectangularRaw: equirectangularRaw,
	geoGnomonic: gnomonic,
	geoGnomonicRaw: gnomonicRaw,
	geoIdentity: identity$4,
	geoProjection: projection,
	geoProjectionMutator: projectionMutator,
	geoMercator: mercator,
	geoMercatorRaw: mercatorRaw,
	geoOrthographic: geoOrthographic,
	geoOrthographicRaw: orthographicRaw,
	geoStereographic: stereographic,
	geoStereographicRaw: stereographicRaw,
	geoTransverseMercator: transverseMercator,
	geoTransverseMercatorRaw: transverseMercatorRaw,
	geoRotation: rotation,
	geoStream: geoStream,
	geoTransform: transform
});

var abs$1 = Math.abs;
var atan$1 = Math.atan;
var atan2$1 = Math.atan2;

var cos$1 = Math.cos;
var exp$1 = Math.exp;
var floor$1 = Math.floor;
var log$1 = Math.log;
var max$1 = Math.max;
var min$1 = Math.min;
var pow$1 = Math.pow;
var round = Math.round;
var sign$1 = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sin$1 = Math.sin;
var tan$1 = Math.tan;

var epsilon$1 = 1e-6;
var epsilon2$1 = 1e-12;
var pi$1 = Math.PI;
var halfPi$1 = pi$1 / 2;
var quarterPi$1 = pi$1 / 4;
var sqrt1_2 = Math.SQRT1_2;
var sqrt2 = sqrt$1(2);
var sqrtPi = sqrt$1(pi$1);
var tau$1 = pi$1 * 2;
var degrees$1 = 180 / pi$1;
var radians$1 = pi$1 / 180;

function sinci(x) {
  return x ? x / Math.sin(x) : 1;
}

function asin$1(x) {
  return x > 1 ? halfPi$1 : x < -1 ? -halfPi$1 : Math.asin(x);
}

function acos$1(x) {
  return x > 1 ? 0 : x < -1 ? pi$1 : Math.acos(x);
}

function sqrt$1(x) {
  return x > 0 ? Math.sqrt(x) : 0;
}

function tanh(x) {
  x = exp$1(2 * x);
  return (x - 1) / (x + 1);
}

function sinh(x) {
  return (exp$1(x) - exp$1(-x)) / 2;
}

function cosh(x) {
  return (exp$1(x) + exp$1(-x)) / 2;
}

function arsinh(x) {
  return log$1(x + sqrt$1(x * x + 1));
}

function arcosh(x) {
  return log$1(x + sqrt$1(x * x - 1));
}

function airyRaw(beta) {
  var tanBeta_2 = tan$1(beta / 2),
      b = 2 * log$1(cos$1(beta / 2)) / (tanBeta_2 * tanBeta_2);

  function forward(x, y) {
    var cosx = cos$1(x),
        cosy = cos$1(y),
        siny = sin$1(y),
        cosz = cosy * cosx,
        k = -((1 - cosz ? log$1((1 + cosz) / 2) / (1 - cosz) : -0.5) + b / (1 + cosz));
    return [k * cosy * sin$1(x), k * siny];
  }

  forward.invert = function(x, y) {
    var r = sqrt$1(x * x + y * y),
        z = -beta / 2,
        i = 50, delta;
    if (!r) return [0, 0];
    do {
      var z_2 = z / 2,
          cosz_2 = cos$1(z_2),
          sinz_2 = sin$1(z_2),
          tanz_2 = tan$1(z_2),
          lnsecz_2 = log$1(1 / cosz_2);
      z -= delta = (2 / tanz_2 * lnsecz_2 - b * tanz_2 - r) / (-lnsecz_2 / (sinz_2 * sinz_2) + 1 - b / (2 * cosz_2 * cosz_2));
    } while (abs$1(delta) > epsilon$1 && --i > 0);
    var sinz = sin$1(z);
    return [atan2$1(x * sinz, r * cos$1(z)), asin$1(y * sinz / r)];
  };

  return forward;
}

var airy = function() {
  var beta = halfPi$1,
      m = projectionMutator(airyRaw),
      p = m(beta);

  p.radius = function(_) {
    return arguments.length ? m(beta = _ * radians$1) : beta * degrees$1;
  };

  return p
      .scale(179.976)
      .clipAngle(147);
};

function aitoffRaw(x, y) {
  var cosy = cos$1(y), sincia = sinci(acos$1(cosy * cos$1(x /= 2)));
  return [2 * cosy * sin$1(x) * sincia, sin$1(y) * sincia];
}

// Abort if [x, y] is not within an ellipse centered at [0, 0] with
// semi-major axis pi and semi-minor axis pi/2.
aitoffRaw.invert = function(x, y) {
  if (x * x + 4 * y * y > pi$1 * pi$1 + epsilon$1) return;
  var x1 = x, y1 = y, i = 25;
  do {
    var sinx = sin$1(x1),
        sinx_2 = sin$1(x1 / 2),
        cosx_2 = cos$1(x1 / 2),
        siny = sin$1(y1),
        cosy = cos$1(y1),
        sin_2y = sin$1(2 * y1),
        sin2y = siny * siny,
        cos2y = cosy * cosy,
        sin2x_2 = sinx_2 * sinx_2,
        c = 1 - cos2y * cosx_2 * cosx_2,
        e = c ? acos$1(cosy * cosx_2) * sqrt$1(f = 1 / c) : f = 0,
        f,
        fx = 2 * e * cosy * sinx_2 - x,
        fy = e * siny - y,
        dxdx = f * (cos2y * sin2x_2 + e * cosy * cosx_2 * sin2y),
        dxdy = f * (0.5 * sinx * sin_2y - e * 2 * siny * sinx_2),
        dydx = f * 0.25 * (sin_2y * sinx_2 - e * siny * cos2y * sinx),
        dydy = f * (sin2y * cosx_2 + e * sin2x_2 * cosy),
        z = dxdy * dydx - dydy * dxdx;
    if (!z) break;
    var dx = (fy * dxdy - fx * dydy) / z,
        dy = (fx * dydx - fy * dxdx) / z;
    x1 -= dx, y1 -= dy;
  } while ((abs$1(dx) > epsilon$1 || abs$1(dy) > epsilon$1) && --i > 0);
  return [x1, y1];
};

var aitoff = function() {
  return projection(aitoffRaw)
      .scale(152.63);
};

function armadilloRaw(phi0) {
  var sinPhi0 = sin$1(phi0),
      cosPhi0 = cos$1(phi0),
      sPhi0 = phi0 >= 0 ? 1 : -1,
      tanPhi0 = tan$1(sPhi0 * phi0),
      k = (1 + sinPhi0 - cosPhi0) / 2;

  function forward(lambda, phi) {
    var cosPhi = cos$1(phi),
        cosLambda = cos$1(lambda /= 2);
    return [
      (1 + cosPhi) * sin$1(lambda),
      (sPhi0 * phi > -atan2$1(cosLambda, tanPhi0) - 1e-3 ? 0 : -sPhi0 * 10) + k + sin$1(phi) * cosPhi0 - (1 + cosPhi) * sinPhi0 * cosLambda // TODO D3 core should allow null or [NaN, NaN] to be returned.
    ];
  }

  forward.invert = function(x, y) {
    var lambda = 0,
        phi = 0,
        i = 50;
    do {
      var cosLambda = cos$1(lambda),
          sinLambda = sin$1(lambda),
          cosPhi = cos$1(phi),
          sinPhi = sin$1(phi),
          A = 1 + cosPhi,
          fx = A * sinLambda - x,
          fy = k + sinPhi * cosPhi0 - A * sinPhi0 * cosLambda - y,
          dxdLambda = A * cosLambda / 2,
          dxdPhi = -sinLambda * sinPhi,
          dydLambda = sinPhi0 * A * sinLambda / 2,
          dydPhi = cosPhi0 * cosPhi + sinPhi0 * cosLambda * sinPhi,
          denominator = dxdPhi * dydLambda - dydPhi * dxdLambda,
          dLambda = (fy * dxdPhi - fx * dydPhi) / denominator / 2,
          dPhi = (fx * dydLambda - fy * dxdLambda) / denominator;
      lambda -= dLambda, phi -= dPhi;
    } while ((abs$1(dLambda) > epsilon$1 || abs$1(dPhi) > epsilon$1) && --i > 0);
    return sPhi0 * phi > -atan2$1(cos$1(lambda), tanPhi0) - 1e-3 ? [lambda * 2, phi] : null;
  };

  return forward;
}

var armadillo = function() {
  var phi0 = 20 * radians$1,
      sPhi0 = phi0 >= 0 ? 1 : -1,
      tanPhi0 = tan$1(sPhi0 * phi0),
      m = projectionMutator(armadilloRaw),
      p = m(phi0),
      stream_ = p.stream;

  p.parallel = function(_) {
    if (!arguments.length) return phi0 * degrees$1;
    tanPhi0 = tan$1((sPhi0 = (phi0 = _ * radians$1) >= 0 ? 1 : -1) * phi0);
    return m(phi0);
  };

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (p.rotate([0, 0]), stream_(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart(), sphereStream.lineStart();
      for (var lambda = sPhi0 * -180; sPhi0 * lambda < 180; lambda += sPhi0 * 90) sphereStream.point(lambda, sPhi0 * 90);
      while (sPhi0 * (lambda -= phi0) >= -180) { // TODO precision?
        sphereStream.point(lambda, sPhi0 * -atan2$1(cos$1(lambda * radians$1 / 2), tanPhi0) * degrees$1);
      }
      sphereStream.lineEnd(), sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return p
      .scale(218.695)
      .center([0, 28.0974]);
};

function augustRaw(lambda, phi) {
  var tanPhi = tan$1(phi / 2),
      k = sqrt$1(1 - tanPhi * tanPhi),
      c = 1 + k * cos$1(lambda /= 2),
      x = sin$1(lambda) * k / c,
      y = tanPhi / c,
      x2 = x * x,
      y2 = y * y;
  return [
    4 / 3 * x * (3 + x2 - 3 * y2),
    4 / 3 * y * (3 + 3 * x2 - y2)
  ];
}

augustRaw.invert = function(x, y) {
  x *= 3 / 8, y *= 3 / 8;
  if (!x && abs$1(y) > 1) return null;
  var x2 = x * x,
      y2 = y * y,
      s = 1 + x2 + y2,
      sin3Eta = sqrt$1((s - sqrt$1(s * s - 4 * y * y)) / 2),
      eta = asin$1(sin3Eta) / 3,
      xi = sin3Eta ? arcosh(abs$1(y / sin3Eta)) / 3 : arsinh(abs$1(x)) / 3,
      cosEta = cos$1(eta),
      coshXi = cosh(xi),
      d = coshXi * coshXi - cosEta * cosEta;
  return [
    sign$1(x) * 2 * atan2$1(sinh(xi) * cosEta, 0.25 - d),
    sign$1(y) * 2 * atan2$1(coshXi * sin$1(eta), 0.25 + d)
  ];
};

var august = function() {
  return projection(augustRaw)
      .scale(66.1603);
};

var sqrt8 = sqrt$1(8);
var phi0$1 = log$1(1 + sqrt2);

function bakerRaw(lambda, phi) {
  var phi0 = abs$1(phi);
  return phi0 < quarterPi$1
      ? [lambda, log$1(tan$1(quarterPi$1 + phi / 2))]
      : [lambda * cos$1(phi0) * (2 * sqrt2 - 1 / sin$1(phi0)), sign$1(phi) * (2 * sqrt2 * (phi0 - quarterPi$1) - log$1(tan$1(phi0 / 2)))];
}

bakerRaw.invert = function(x, y) {
  if ((y0 = abs$1(y)) < phi0$1) return [x, 2 * atan$1(exp$1(y)) - halfPi$1];
  var phi = quarterPi$1, i = 25, delta, y0;
  do {
    var cosPhi_2 = cos$1(phi / 2), tanPhi_2 = tan$1(phi / 2);
    phi -= delta = (sqrt8 * (phi - quarterPi$1) - log$1(tanPhi_2) - y0) / (sqrt8 - cosPhi_2 * cosPhi_2 / (2 * tanPhi_2));
  } while (abs$1(delta) > epsilon2$1 && --i > 0);
  return [x / (cos$1(phi) * (sqrt8 - 1 / sin$1(phi))), sign$1(y) * phi];
};

var baker = function() {
  return projection(bakerRaw)
      .scale(112.314);
};

function berghausRaw(lobes) {
  var k = 2 * pi$1 / lobes;

  function forward(lambda, phi) {
    var p = azimuthalEquidistantRaw(lambda, phi);
    if (abs$1(lambda) > halfPi$1) { // back hemisphere
      var theta = atan2$1(p[1], p[0]),
          r = sqrt$1(p[0] * p[0] + p[1] * p[1]),
          theta0 = k * round((theta - halfPi$1) / k) + halfPi$1,
          alpha = atan2$1(sin$1(theta -= theta0), 2 - cos$1(theta)); // angle relative to lobe end
      theta = theta0 + asin$1(pi$1 / r * sin$1(alpha)) - alpha;
      p[0] = r * cos$1(theta);
      p[1] = r * sin$1(theta);
    }
    return p;
  }

  forward.invert = function(x, y) {
    var r = sqrt$1(x * x + y * y);
    if (r > halfPi$1) {
      var theta = atan2$1(y, x),
          theta0 = k * round((theta - halfPi$1) / k) + halfPi$1,
          s = theta > theta0 ? -1 : 1,
          A = r * cos$1(theta0 - theta),
          cotAlpha = 1 / tan$1(s * acos$1((A - pi$1) / sqrt$1(pi$1 * (pi$1 - 2 * A) + r * r)));
      theta = theta0 + 2 * atan$1((cotAlpha + s * sqrt$1(cotAlpha * cotAlpha - 3)) / 3);
      x = r * cos$1(theta), y = r * sin$1(theta);
    }
    return azimuthalEquidistantRaw.invert(x, y);
  };

  return forward;
}

var berghaus = function() {
  var lobes = 5,
      m = projectionMutator(berghausRaw),
      p = m(lobes),
      projectionStream = p.stream,
      epsilon = 1e-2,
      cr = -cos$1(epsilon * radians$1),
      sr = sin$1(epsilon * radians$1);

  p.lobes = function(_) {
    return arguments.length ? m(lobes = +_) : lobes;
  };

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = projectionStream(stream),
        sphereStream = (p.rotate([0, 0]), projectionStream(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart(), sphereStream.lineStart();
      for (var i = 0, delta = 360 / lobes, delta0 = 2 * pi$1 / lobes, phi = 90 - 180 / lobes, phi0 = halfPi$1; i < lobes; ++i, phi -= delta, phi0 -= delta0) {
        sphereStream.point(atan2$1(sr * cos$1(phi0), cr) * degrees$1, asin$1(sr * sin$1(phi0)) * degrees$1);
        if (phi < -90) {
          sphereStream.point(-90, -180 - phi - epsilon);
          sphereStream.point(-90, -180 - phi + epsilon);
        } else {
          sphereStream.point(90, phi + epsilon);
          sphereStream.point(90, phi - epsilon);
        }
      }
      sphereStream.lineEnd(), sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return p
      .scale(87.8076)
      .center([0, 17.1875])
      .clipAngle(180 - 1e-3);
};

function mollweideBromleyTheta(cp, phi) {
  var cpsinPhi = cp * sin$1(phi), i = 30, delta;
  do phi -= delta = (phi + sin$1(phi) - cpsinPhi) / (1 + cos$1(phi));
  while (abs$1(delta) > epsilon$1 && --i > 0);
  return phi / 2;
}

function mollweideBromleyRaw(cx, cy, cp) {

  function forward(lambda, phi) {
    return [cx * lambda * cos$1(phi = mollweideBromleyTheta(cp, phi)), cy * sin$1(phi)];
  }

  forward.invert = function(x, y) {
    return y = asin$1(y / cy), [x / (cx * cos$1(y)), asin$1((2 * y + sin$1(2 * y)) / cp)];
  };

  return forward;
}

var mollweideRaw = mollweideBromleyRaw(sqrt2 / halfPi$1, sqrt2, pi$1);

var mollweide = function() {
  return projection(mollweideRaw)
      .scale(169.529);
};

var k = 2.00276;
var w = 1.11072;

function boggsRaw(lambda, phi) {
  var theta = mollweideBromleyTheta(pi$1, phi);
  return [k * lambda / (1 / cos$1(phi) + w / cos$1(theta)), (phi + sqrt2 * sin$1(theta)) / k];
}

boggsRaw.invert = function(x, y) {
  var ky = k * y, theta = y < 0 ? -quarterPi$1 : quarterPi$1, i = 25, delta, phi;
  do {
    phi = ky - sqrt2 * sin$1(theta);
    theta -= delta = (sin$1(2 * theta) + 2 * theta - pi$1 * sin$1(phi)) / (2 * cos$1(2 * theta) + 2 + pi$1 * cos$1(phi) * sqrt2 * cos$1(theta));
  } while (abs$1(delta) > epsilon$1 && --i > 0);
  phi = ky - sqrt2 * sin$1(theta);
  return [x * (1 / cos$1(phi) + w / cos$1(theta)) / k, phi];
};

var boggs = function() {
  return projection(boggsRaw)
      .scale(160.857);
};

var parallel1 = function(projectAt) {
  var phi0 = 0,
      m = projectionMutator(projectAt),
      p = m(phi0);

  p.parallel = function(_) {
    return arguments.length ? m(phi0 = _ * radians$1) : phi0 * degrees$1;
  };

  return p;
};

function sinusoidalRaw(lambda, phi) {
  return [lambda * cos$1(phi), phi];
}

sinusoidalRaw.invert = function(x, y) {
  return [x / cos$1(y), y];
};

var sinusoidal = function() {
  return projection(sinusoidalRaw)
      .scale(152.63);
};

function bonneRaw(phi0) {
  if (!phi0) return sinusoidalRaw;
  var cotPhi0 = 1 / tan$1(phi0);

  function forward(lambda, phi) {
    var rho = cotPhi0 + phi0 - phi,
        e = rho ? lambda * cos$1(phi) / rho : rho;
    return [rho * sin$1(e), cotPhi0 - rho * cos$1(e)];
  }

  forward.invert = function(x, y) {
    var rho = sqrt$1(x * x + (y = cotPhi0 - y) * y),
        phi = cotPhi0 + phi0 - rho;
    return [rho / cos$1(phi) * atan2$1(x, y), phi];
  };

  return forward;
}

var bonne = function() {
  return parallel1(bonneRaw)
      .scale(123.082)
      .center([0, 26.1441])
      .parallel(45);
};

function bottomleyRaw(sinPsi) {

  function forward(lambda, phi) {
    var rho = halfPi$1 - phi,
        eta = rho ? lambda * sinPsi * sin$1(rho) / rho : rho;
    return [rho * sin$1(eta) / sinPsi, halfPi$1 - rho * cos$1(eta)];
  }

  forward.invert = function(x, y) {
    var x1 = x * sinPsi,
        y1 = halfPi$1 - y,
        rho = sqrt$1(x1 * x1 + y1 * y1),
        eta = atan2$1(x1, y1);
    return [(rho ? rho / sin$1(rho) : 1) * eta / sinPsi, halfPi$1 - rho];
  };

  return forward;
}

var bottomley = function() {
  var sinPsi = 0.5,
      m = projectionMutator(bottomleyRaw),
      p = m(sinPsi);

  p.fraction = function(_) {
    return arguments.length ? m(sinPsi = +_) : sinPsi;
  };

  return p
      .scale(158.837);
};

var bromleyRaw = mollweideBromleyRaw(1, 4 / pi$1, pi$1);

var bromley = function() {
  return projection(bromleyRaw)
      .scale(152.63);
};

// Azimuthal distance.
function distance$1(dPhi, c1, s1, c2, s2, dLambda) {
  var cosdLambda = cos$1(dLambda), r;
  if (abs$1(dPhi) > 1 || abs$1(dLambda) > 1) {
    r = acos$1(s1 * s2 + c1 * c2 * cosdLambda);
  } else {
    var sindPhi = sin$1(dPhi / 2), sindLambda = sin$1(dLambda / 2);
    r = 2 * asin$1(sqrt$1(sindPhi * sindPhi + c1 * c2 * sindLambda * sindLambda));
  }
  return abs$1(r) > epsilon$1 ? [r, atan2$1(c2 * sin$1(dLambda), c1 * s2 - s1 * c2 * cosdLambda)] : [0, 0];
}

// Angle opposite a, and contained between sides of lengths b and c.
function angle$1(b, c, a) {
  return acos$1((b * b + c * c - a * a) / (2 * b * c));
}

// Normalize longitude.
function longitude(lambda) {
  return lambda - 2 * pi$1 * floor$1((lambda + pi$1) / (2 * pi$1));
}

function chamberlinRaw(p0, p1, p2) {
  var points = [
    [p0[0], p0[1], sin$1(p0[1]), cos$1(p0[1])],
    [p1[0], p1[1], sin$1(p1[1]), cos$1(p1[1])],
    [p2[0], p2[1], sin$1(p2[1]), cos$1(p2[1])]
  ];

  for (var a = points[2], b, i = 0; i < 3; ++i, a = b) {
    b = points[i];
    a.v = distance$1(b[1] - a[1], a[3], a[2], b[3], b[2], b[0] - a[0]);
    a.point = [0, 0];
  }

  var beta0 = angle$1(points[0].v[0], points[2].v[0], points[1].v[0]),
      beta1 = angle$1(points[0].v[0], points[1].v[0], points[2].v[0]),
      beta2 = pi$1 - beta0;

  points[2].point[1] = 0;
  points[0].point[0] = -(points[1].point[0] = points[0].v[0] / 2);

  var mean = [
    points[2].point[0] = points[0].point[0] + points[2].v[0] * cos$1(beta0),
    2 * (points[0].point[1] = points[1].point[1] = points[2].v[0] * sin$1(beta0))
  ];

  function forward(lambda, phi) {
    var sinPhi = sin$1(phi),
        cosPhi = cos$1(phi),
        v = new Array(3), i;

    // Compute distance and azimuth from control points.
    for (i = 0; i < 3; ++i) {
      var p = points[i];
      v[i] = distance$1(phi - p[1], p[3], p[2], cosPhi, sinPhi, lambda - p[0]);
      if (!v[i][0]) return p.point;
      v[i][1] = longitude(v[i][1] - p.v[1]);
    }

    // Arithmetic mean of interception points.
    var point = mean.slice();
    for (i = 0; i < 3; ++i) {
      var j = i == 2 ? 0 : i + 1;
      var a = angle$1(points[i].v[0], v[i][0], v[j][0]);
      if (v[i][1] < 0) a = -a;

      if (!i) {
        point[0] += v[i][0] * cos$1(a);
        point[1] -= v[i][0] * sin$1(a);
      } else if (i == 1) {
        a = beta1 - a;
        point[0] -= v[i][0] * cos$1(a);
        point[1] -= v[i][0] * sin$1(a);
      } else {
        a = beta2 - a;
        point[0] += v[i][0] * cos$1(a);
        point[1] += v[i][0] * sin$1(a);
      }
    }

    point[0] /= 3, point[1] /= 3;
    return point;
  }

  return forward;
}

function pointRadians$1(p) {
  return p[0] *= radians$1, p[1] *= radians$1, p;
}

function chamberlinAfrica() {
  return chamberlin([0, 22], [45, 22], [22.5, -22])
      .scale(380)
      .center([22.5, 2]);
}

function chamberlin(p0, p1, p2) { // TODO order matters!
  var c = centroid({type: "MultiPoint", coordinates: [p0, p1, p2]}),
      R = [-c[0], -c[1]],
      r = rotation(R),
      p = projection(chamberlinRaw(pointRadians$1(r(p0)), pointRadians$1(r(p1)), pointRadians$1(r(p2)))).rotate(R),
      center = p.center;

  delete p.rotate;

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p
      .clipAngle(90);
}

function collignonRaw(lambda, phi) {
  var alpha = sqrt$1(1 - sin$1(phi));
  return [(2 / sqrtPi) * lambda * alpha, sqrtPi * (1 - alpha)];
}

collignonRaw.invert = function(x, y) {
  var lambda = (lambda = y / sqrtPi - 1) * lambda;
  return [lambda > 0 ? x * sqrt$1(pi$1 / lambda) / 2 : 0, asin$1(1 - lambda)];
};

var collignon = function() {
  return projection(collignonRaw)
      .scale(95.6464)
      .center([0, 30]);
};

function craigRaw(phi0) {
  var tanPhi0 = tan$1(phi0);

  function forward(lambda, phi) {
    return [lambda, (lambda ? lambda / sin$1(lambda) : 1) * (sin$1(phi) * cos$1(lambda) - tanPhi0 * cos$1(phi))];
  }

  forward.invert = tanPhi0 ? function(x, y) {
    if (x) y *= sin$1(x) / x;
    var cosLambda = cos$1(x);
    return [x, 2 * atan2$1(sqrt$1(cosLambda * cosLambda + tanPhi0 * tanPhi0 - y * y) - cosLambda, tanPhi0 - y)];
  } : function(x, y) {
    return [x, asin$1(x ? y * tan$1(x) / x : y)];
  };

  return forward;
}

var craig = function() {
  return parallel1(craigRaw)
      .scale(249.828)
      .clipAngle(90);
};

var sqrt3 = sqrt$1(3);

function crasterRaw(lambda, phi) {
  return [sqrt3 * lambda * (2 * cos$1(2 * phi / 3) - 1) / sqrtPi, sqrt3 * sqrtPi * sin$1(phi / 3)];
}

crasterRaw.invert = function(x, y) {
  var phi = 3 * asin$1(y / (sqrt3 * sqrtPi));
  return [sqrtPi * x / (sqrt3 * (2 * cos$1(2 * phi / 3) - 1)), phi];
};

var craster = function() {
  return projection(crasterRaw)
      .scale(156.19);
};

function cylindricalEqualAreaRaw$1(phi0) {
  var cosPhi0 = cos$1(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, sin$1(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, asin$1(y * cosPhi0)];
  };

  return forward;
}

var cylindricalEqualArea = function() {
  return parallel1(cylindricalEqualAreaRaw$1)
      .parallel(38.58) // acos(sqrt(width / height / pi)) * radians
      .scale(195.044); // width / (sqrt(width / height / pi) * 2 * pi)
};

function cylindricalStereographicRaw(phi0) {
  var cosPhi0 = cos$1(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, (1 + cosPhi0) * tan$1(phi / 2)];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, atan$1(y / (1 + cosPhi0)) * 2];
  };

  return forward;
}

var cylindricalStereographic = function() {
  return parallel1(cylindricalStereographicRaw)
      .scale(124.75);
};

function eckert1Raw(lambda, phi) {
  var alpha = sqrt$1(8 / (3 * pi$1));
  return [
    alpha * lambda * (1 - abs$1(phi) / pi$1),
    alpha * phi
  ];
}

eckert1Raw.invert = function(x, y) {
  var alpha = sqrt$1(8 / (3 * pi$1)),
      phi = y / alpha;
  return [
    x / (alpha * (1 - abs$1(phi) / pi$1)),
    phi
  ];
};

var eckert1 = function() {
  return projection(eckert1Raw)
      .scale(165.664);
};

function eckert2Raw(lambda, phi) {
  var alpha = sqrt$1(4 - 3 * sin$1(abs$1(phi)));
  return [
    2 / sqrt$1(6 * pi$1) * lambda * alpha,
    sign$1(phi) * sqrt$1(2 * pi$1 / 3) * (2 - alpha)
  ];
}

eckert2Raw.invert = function(x, y) {
  var alpha = 2 - abs$1(y) / sqrt$1(2 * pi$1 / 3);
  return [
    x * sqrt$1(6 * pi$1) / (2 * alpha),
    sign$1(y) * asin$1((4 - alpha * alpha) / 3)
  ];
};

var eckert2 = function() {
  return projection(eckert2Raw)
      .scale(165.664);
};

function eckert3Raw(lambda, phi) {
  var k = sqrt$1(pi$1 * (4 + pi$1));
  return [
    2 / k * lambda * (1 + sqrt$1(1 - 4 * phi * phi / (pi$1 * pi$1))),
    4 / k * phi
  ];
}

eckert3Raw.invert = function(x, y) {
  var k = sqrt$1(pi$1 * (4 + pi$1)) / 2;
  return [
    x * k / (1 + sqrt$1(1 - y * y * (4 + pi$1) / (4 * pi$1))),
    y * k / 2
  ];
};

var eckert3 = function() {
  return projection(eckert3Raw)
      .scale(180.739);
};

function eckert4Raw(lambda, phi) {
  var k = (2 + halfPi$1) * sin$1(phi);
  phi /= 2;
  for (var i = 0, delta = Infinity; i < 10 && abs$1(delta) > epsilon$1; i++) {
    var cosPhi = cos$1(phi);
    phi -= delta = (phi + sin$1(phi) * (cosPhi + 2) - k) / (2 * cosPhi * (1 + cosPhi));
  }
  return [
    2 / sqrt$1(pi$1 * (4 + pi$1)) * lambda * (1 + cos$1(phi)),
    2 * sqrt$1(pi$1 / (4 + pi$1)) * sin$1(phi)
  ];
}

eckert4Raw.invert = function(x, y) {
  var A = y * sqrt$1((4 + pi$1) / pi$1) / 2,
      k = asin$1(A),
      c = cos$1(k);
  return [
    x / (2 / sqrt$1(pi$1 * (4 + pi$1)) * (1 + c)),
    asin$1((k + A * (c + 2)) / (2 + halfPi$1))
  ];
};

var eckert4 = function() {
  return projection(eckert4Raw)
      .scale(180.739);
};

function eckert5Raw(lambda, phi) {
  return [
    lambda * (1 + cos$1(phi)) / sqrt$1(2 + pi$1),
    2 * phi / sqrt$1(2 + pi$1)
  ];
}

eckert5Raw.invert = function(x, y) {
  var k = sqrt$1(2 + pi$1),
      phi = y * k / 2;
  return [
    k * x / (1 + cos$1(phi)),
    phi
  ];
};

var eckert5 = function() {
  return projection(eckert5Raw)
      .scale(173.044);
};

function eckert6Raw(lambda, phi) {
  var k = (1 + halfPi$1) * sin$1(phi);
  for (var i = 0, delta = Infinity; i < 10 && abs$1(delta) > epsilon$1; i++) {
    phi -= delta = (phi + sin$1(phi) - k) / (1 + cos$1(phi));
  }
  k = sqrt$1(2 + pi$1);
  return [
    lambda * (1 + cos$1(phi)) / k,
    2 * phi / k
  ];
}

eckert6Raw.invert = function(x, y) {
  var j = 1 + halfPi$1,
      k = sqrt$1(j / 2);
  return [
    x * 2 * k / (1 + cos$1(y *= k)),
    asin$1((y + sin$1(y)) / j)
  ];
};

var eckert6 = function() {
  return projection(eckert6Raw)
      .scale(173.044);
};

var eisenlohrK = 3 + 2 * sqrt2;

function eisenlohrRaw(lambda, phi) {
  var s0 = sin$1(lambda /= 2),
      c0 = cos$1(lambda),
      k = sqrt$1(cos$1(phi)),
      c1 = cos$1(phi /= 2),
      t = sin$1(phi) / (c1 + sqrt2 * c0 * k),
      c = sqrt$1(2 / (1 + t * t)),
      v = sqrt$1((sqrt2 * c1 + (c0 + s0) * k) / (sqrt2 * c1 + (c0 - s0) * k));
  return [
    eisenlohrK * (c * (v - 1 / v) - 2 * log$1(v)),
    eisenlohrK * (c * t * (v + 1 / v) - 2 * atan$1(t))
  ];
}

eisenlohrRaw.invert = function(x, y) {
  if (!(p = augustRaw.invert(x / 1.2, y * 1.065))) return null;
  var lambda = p[0], phi = p[1], i = 20, p;
  x /= eisenlohrK, y /= eisenlohrK;
  do {
    var _0 = lambda / 2,
        _1 = phi / 2,
        s0 = sin$1(_0),
        c0 = cos$1(_0),
        s1 = sin$1(_1),
        c1 = cos$1(_1),
        cos1 = cos$1(phi),
        k = sqrt$1(cos1),
        t = s1 / (c1 + sqrt2 * c0 * k),
        t2 = t * t,
        c = sqrt$1(2 / (1 + t2)),
        v0 = (sqrt2 * c1 + (c0 + s0) * k),
        v1 = (sqrt2 * c1 + (c0 - s0) * k),
        v2 = v0 / v1,
        v = sqrt$1(v2),
        vm1v = v - 1 / v,
        vp1v = v + 1 / v,
        fx = c * vm1v - 2 * log$1(v) - x,
        fy = c * t * vp1v - 2 * atan$1(t) - y,
        deltatDeltaLambda = s1 && sqrt1_2 * k * s0 * t2 / s1,
        deltatDeltaPhi = (sqrt2 * c0 * c1 + k) / (2 * (c1 + sqrt2 * c0 * k) * (c1 + sqrt2 * c0 * k) * k),
        deltacDeltat = -0.5 * t * c * c * c,
        deltacDeltaLambda = deltacDeltat * deltatDeltaLambda,
        deltacDeltaPhi = deltacDeltat * deltatDeltaPhi,
        A = (A = 2 * c1 + sqrt2 * k * (c0 - s0)) * A * v,
        deltavDeltaLambda = (sqrt2 * c0 * c1 * k + cos1) / A,
        deltavDeltaPhi = -(sqrt2 * s0 * s1) / (k * A),
        deltaxDeltaLambda = vm1v * deltacDeltaLambda - 2 * deltavDeltaLambda / v + c * (deltavDeltaLambda + deltavDeltaLambda / v2),
        deltaxDeltaPhi = vm1v * deltacDeltaPhi - 2 * deltavDeltaPhi / v + c * (deltavDeltaPhi + deltavDeltaPhi / v2),
        deltayDeltaLambda = t * vp1v * deltacDeltaLambda - 2 * deltatDeltaLambda / (1 + t2) + c * vp1v * deltatDeltaLambda + c * t * (deltavDeltaLambda - deltavDeltaLambda / v2),
        deltayDeltaPhi = t * vp1v * deltacDeltaPhi - 2 * deltatDeltaPhi / (1 + t2) + c * vp1v * deltatDeltaPhi + c * t * (deltavDeltaPhi - deltavDeltaPhi / v2),
        denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda;
    if (!denominator) break;
    var deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator,
        deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
    lambda -= deltaLambda;
    phi = max$1(-halfPi$1, min$1(halfPi$1, phi - deltaPhi));
  } while ((abs$1(deltaLambda) > epsilon$1 || abs$1(deltaPhi) > epsilon$1) && --i > 0);
  return abs$1(abs$1(phi) - halfPi$1) < epsilon$1 ? [0, phi] : i && [lambda, phi];
};

var eisenlohr = function() {
  return projection(eisenlohrRaw)
      .scale(62.5271);
};

var faheyK = cos$1(35 * radians$1);

function faheyRaw(lambda, phi) {
  var t = tan$1(phi / 2);
  return [lambda * faheyK * sqrt$1(1 - t * t), (1 + faheyK) * t];
}

faheyRaw.invert = function(x, y) {
  var t = y / (1 + faheyK);
  return [x && x / (faheyK * sqrt$1(1 - t * t)), 2 * atan$1(t)];
};

var fahey = function() {
  return projection(faheyRaw)
      .scale(137.152);
};

function foucautRaw(lambda, phi) {
  var k = phi / 2, cosk = cos$1(k);
  return [ 2 * lambda / sqrtPi * cos$1(phi) * cosk * cosk, sqrtPi * tan$1(k)];
}

foucautRaw.invert = function(x, y) {
  var k = atan$1(y / sqrtPi), cosk = cos$1(k), phi = 2 * k;
  return [x * sqrtPi / 2 / (cos$1(phi) * cosk * cosk), phi];
};

var foucaut = function() {
  return projection(foucautRaw)
      .scale(135.264);
};

function gilbertForward(point) {
  return [point[0] / 2, asin$1(tan$1(point[1] / 2 * radians$1)) * degrees$1];
}

function gilbertInvert(point) {
  return [point[0] * 2, 2 * atan$1(sin$1(point[1] * radians$1)) * degrees$1];
}

var gilbert = function(projectionType) {
  if (projectionType == null) projectionType = geoOrthographic;
  var projection$$1 = projectionType(),
      equirectangular = geoEquirectangular().scale(degrees$1).precision(0).clipAngle(null).translate([0, 0]); // antimeridian cutting

  function gilbert(point) {
    return projection$$1(gilbertForward(point));
  }

  if (projection$$1.invert) gilbert.invert = function(point) {
    return gilbertInvert(projection$$1.invert(point));
  };

  gilbert.stream = function(stream) {
    var s1 = projection$$1.stream(stream), s0 = equirectangular.stream({
      point: function(lambda, phi) { s1.point(lambda / 2, asin$1(tan$1(-phi / 2 * radians$1)) * degrees$1); },
      lineStart: function() { s1.lineStart(); },
      lineEnd: function() { s1.lineEnd(); },
      polygonStart: function() { s1.polygonStart(); },
      polygonEnd: function() { s1.polygonEnd(); }
    });
    s0.sphere = s1.sphere;
    return s0;
  };

  function property(name) {
    gilbert[name] = function(_) {
      return arguments.length ? (projection$$1[name](_), gilbert) : projection$$1[name]();
    };
  }

  gilbert.rotate = function(_) {
    return arguments.length ? (equirectangular.rotate(_), gilbert) : equirectangular.rotate();
  };

  gilbert.center = function(_) {
    return arguments.length ? (projection$$1.center(gilbertForward(_)), gilbert) : gilbertInvert(projection$$1.center());
  };

  property("clipAngle");
  property("clipExtent");
  property("scale");
  property("translate");
  property("precision");

  return gilbert
      .scale(249.5);
};

function gingeryRaw(rho, n) {
  var k = 2 * pi$1 / n,
      rho2 = rho * rho;

  function forward(lambda, phi) {
    var p = azimuthalEquidistantRaw(lambda, phi),
        x = p[0],
        y = p[1],
        r2 = x * x + y * y;

    if (r2 > rho2) {
      var r = sqrt$1(r2),
          theta = atan2$1(y, x),
          theta0 = k * round(theta / k),
          alpha = theta - theta0,
          rhoCosAlpha = rho * cos$1(alpha),
          k_ = (rho * sin$1(alpha) - alpha * sin$1(rhoCosAlpha)) / (halfPi$1 - rhoCosAlpha),
          s_ = gingeryLength(alpha, k_),
          e = (pi$1 - rho) / gingeryIntegrate(s_, rhoCosAlpha, pi$1);

      x = r;
      var i = 50, delta;
      do {
        x -= delta = (rho + gingeryIntegrate(s_, rhoCosAlpha, x) * e - r) / (s_(x) * e);
      } while (abs$1(delta) > epsilon$1 && --i > 0);

      y = alpha * sin$1(x);
      if (x < halfPi$1) y -= k_ * (x - halfPi$1);

      var s = sin$1(theta0),
          c = cos$1(theta0);
      p[0] = x * c - y * s;
      p[1] = x * s + y * c;
    }
    return p;
  }

  forward.invert = function(x, y) {
    var r2 = x * x + y * y;
    if (r2 > rho2) {
      var r = sqrt$1(r2),
          theta = atan2$1(y, x),
          theta0 = k * round(theta / k),
          dTheta = theta - theta0;

      x = r * cos$1(dTheta);
      y = r * sin$1(dTheta);

      var x_halfPi = x - halfPi$1,
          sinx = sin$1(x),
          alpha = y / sinx,
          delta = x < halfPi$1 ? Infinity : 0,
          i = 10;

      while (true) {
        var rhosinAlpha = rho * sin$1(alpha),
            rhoCosAlpha = rho * cos$1(alpha),
            sinRhoCosAlpha = sin$1(rhoCosAlpha),
            halfPi_RhoCosAlpha = halfPi$1 - rhoCosAlpha,
            k_ = (rhosinAlpha - alpha * sinRhoCosAlpha) / halfPi_RhoCosAlpha,
            s_ = gingeryLength(alpha, k_);

        if (abs$1(delta) < epsilon2$1 || !--i) break;

        alpha -= delta = (alpha * sinx - k_ * x_halfPi - y) / (
          sinx - x_halfPi * 2 * (
            halfPi_RhoCosAlpha * (rhoCosAlpha + alpha * rhosinAlpha * cos$1(rhoCosAlpha) - sinRhoCosAlpha) -
            rhosinAlpha * (rhosinAlpha - alpha * sinRhoCosAlpha)
          ) / (halfPi_RhoCosAlpha * halfPi_RhoCosAlpha));
      }
      r = rho + gingeryIntegrate(s_, rhoCosAlpha, x) * (pi$1 - rho) / gingeryIntegrate(s_, rhoCosAlpha, pi$1);
      theta = theta0 + alpha;
      x = r * cos$1(theta);
      y = r * sin$1(theta);
    }
    return azimuthalEquidistantRaw.invert(x, y);
  };

  return forward;
}

function gingeryLength(alpha, k) {
  return function(x) {
    var y_ = alpha * cos$1(x);
    if (x < halfPi$1) y_ -= k;
    return sqrt$1(1 + y_ * y_);
  };
}

// Numerical integration: trapezoidal rule.
function gingeryIntegrate(f, a, b) {
  var n = 50,
      h = (b - a) / n,
      s = f(a) + f(b);
  for (var i = 1, x = a; i < n; ++i) s += 2 * f(x += h);
  return s * 0.5 * h;
}

var gingery = function() {
  var n = 6,
      rho = 30 * radians$1,
      cRho = cos$1(rho),
      sRho = sin$1(rho),
      m = projectionMutator(gingeryRaw),
      p = m(rho, n),
      stream_ = p.stream,
      epsilon = 1e-2,
      cr = -cos$1(epsilon * radians$1),
      sr = sin$1(epsilon * radians$1);

  p.radius = function(_) {
    if (!arguments.length) return rho * degrees$1;
    cRho = cos$1(rho = _ * radians$1);
    sRho = sin$1(rho);
    return m(rho, n);
  };

  p.lobes = function(_) {
    if (!arguments.length) return n;
    return m(rho, n = +_);
  };

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (p.rotate([0, 0]), stream_(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart(), sphereStream.lineStart();
      for (var i = 0, delta = 2 * pi$1 / n, phi = 0; i < n; ++i, phi -= delta) {
        sphereStream.point(atan2$1(sr * cos$1(phi), cr) * degrees$1, asin$1(sr * sin$1(phi)) * degrees$1);
        sphereStream.point(atan2$1(sRho * cos$1(phi - delta / 2), cRho) * degrees$1, asin$1(sRho * sin$1(phi - delta / 2)) * degrees$1);
      }
      sphereStream.lineEnd(), sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return p
      .rotate([90, -40])
      .scale(91.7095)
      .clipAngle(180 - 1e-3);
};

var ginzburgPolyconicRaw = function(a, b, c, d, e, f, g, h) {
  if (arguments.length < 8) h = 0;

  function forward(lambda, phi) {
    if (!phi) return [a * lambda / pi$1, 0];
    var phi2 = phi * phi,
        xB = a + phi2 * (b + phi2 * (c + phi2 * d)),
        yB = phi * (e - 1 + phi2 * (f - h + phi2 * g)),
        m = (xB * xB + yB * yB) / (2 * yB),
        alpha = lambda * asin$1(xB / m) / pi$1;
    return [m * sin$1(alpha), phi * (1 + phi2 * h) + m * (1 - cos$1(alpha))];
  }

  forward.invert = function(x, y) {
    var lambda = pi$1 * x / a,
        phi = y,
        deltaLambda, deltaPhi, i = 50;
    do {
      var phi2 = phi * phi,
          xB = a + phi2 * (b + phi2 * (c + phi2 * d)),
          yB = phi * (e - 1 + phi2 * (f - h + phi2 * g)),
          p = xB * xB + yB * yB,
          q = 2 * yB,
          m = p / q,
          m2 = m * m,
          dAlphadLambda = asin$1(xB / m) / pi$1,
          alpha = lambda * dAlphadLambda,
          xB2 = xB * xB,
          dxBdPhi = (2 * b + phi2 * (4 * c + phi2 * 6 * d)) * phi,
          dyBdPhi = e + phi2 * (3 * f + phi2 * 5 * g),
          dpdPhi = 2 * (xB * dxBdPhi + yB * (dyBdPhi - 1)),
          dqdPhi = 2 * (dyBdPhi - 1),
          dmdPhi = (dpdPhi * q - p * dqdPhi) / (q * q),
          cosAlpha = cos$1(alpha),
          sinAlpha = sin$1(alpha),
          mcosAlpha = m * cosAlpha,
          msinAlpha = m * sinAlpha,
          dAlphadPhi = ((lambda / pi$1) * (1 / sqrt$1(1 - xB2 / m2)) * (dxBdPhi * m - xB * dmdPhi)) / m2,
          fx = msinAlpha - x,
          fy = phi * (1 + phi2 * h) + m - mcosAlpha - y,
          deltaxDeltaPhi = dmdPhi * sinAlpha + mcosAlpha * dAlphadPhi,
          deltaxDeltaLambda = mcosAlpha * dAlphadLambda,
          deltayDeltaPhi = 1 + dmdPhi - (dmdPhi * cosAlpha - msinAlpha * dAlphadPhi),
          deltayDeltaLambda = msinAlpha * dAlphadLambda,
          denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda;
      if (!denominator) break;
      lambda -= deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator;
      phi -= deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
    } while ((abs$1(deltaLambda) > epsilon$1 || abs$1(deltaPhi) > epsilon$1) && --i > 0);
    return [lambda, phi];
  };

  return forward;
};

var ginzburg4Raw = ginzburgPolyconicRaw(2.8284, -1.6988, 0.75432, -0.18071, 1.76003, -0.38914, 0.042555);

var ginzburg4 = function() {
  return projection(ginzburg4Raw)
      .scale(149.995);
};

var ginzburg5Raw = ginzburgPolyconicRaw(2.583819, -0.835827, 0.170354, -0.038094, 1.543313, -0.411435,0.082742);

var ginzburg5 = function() {
  return projection(ginzburg5Raw)
      .scale(153.93);
};

var ginzburg6Raw = ginzburgPolyconicRaw(5 / 6 * pi$1, -0.62636, -0.0344, 0, 1.3493, -0.05524, 0, 0.045);

var ginzburg6 = function() {
  return projection(ginzburg6Raw)
      .scale(130.945);
};

function ginzburg8Raw(lambda, phi) {
  var lambda2 = lambda * lambda,
      phi2 = phi * phi;
  return [
    lambda * (1 - 0.162388 * phi2) * (0.87 - 0.000952426 * lambda2 * lambda2),
    phi * (1 + phi2 / 12)
  ];
}

ginzburg8Raw.invert = function(x, y) {
  var lambda = x,
      phi = y,
      i = 50, delta;
  do {
    var phi2 = phi * phi;
    phi -= delta = (phi * (1 + phi2 / 12) - y) / (1 + phi2 / 4);
  } while (abs$1(delta) > epsilon$1 && --i > 0);
  i = 50;
  x /= 1 -0.162388 * phi2;
  do {
    var lambda4 = (lambda4 = lambda * lambda) * lambda4;
    lambda -= delta = (lambda * (0.87 - 0.000952426 * lambda4) - x) / (0.87 - 0.00476213 * lambda4);
  } while (abs$1(delta) > epsilon$1 && --i > 0);
  return [lambda, phi];
};

var ginzburg8 = function() {
  return projection(ginzburg8Raw)
      .scale(131.747);
};

var ginzburg9Raw = ginzburgPolyconicRaw(2.6516, -0.76534, 0.19123, -0.047094, 1.36289, -0.13965,0.031762);

var ginzburg9 = function() {
  return projection(ginzburg9Raw)
      .scale(131.087);
};

var squareRaw = function(project) {
  var dx = project(halfPi$1, 0)[0] - project(-halfPi$1, 0)[0];

  function projectSquare(lambda, phi) {
    var s = lambda > 0 ? -0.5 : 0.5,
        point = project(lambda + s * pi$1, phi);
    point[0] -= s * dx;
    return point;
  }

  if (project.invert) projectSquare.invert = function(x, y) {
    var s = x > 0 ? -0.5 : 0.5,
        location = project.invert(x + s * dx, y),
        lambda = location[0] - s * pi$1;
    if (lambda < -pi$1) lambda += 2 * pi$1;
    else if (lambda > pi$1) lambda -= 2 * pi$1;
    location[0] = lambda;
    return location;
  };

  return projectSquare;
};

function gringortenRaw(lambda, phi) {
  var sLambda = sign$1(lambda),
      sPhi = sign$1(phi),
      cosPhi = cos$1(phi),
      x = cos$1(lambda) * cosPhi,
      y = sin$1(lambda) * cosPhi,
      z = sin$1(sPhi * phi);
  lambda = abs$1(atan2$1(y, z));
  phi = asin$1(x);
  if (abs$1(lambda - halfPi$1) > epsilon$1) lambda %= halfPi$1;
  var point = gringortenHexadecant(lambda > pi$1 / 4 ? halfPi$1 - lambda : lambda, phi);
  if (lambda > pi$1 / 4) z = point[0], point[0] = -point[1], point[1] = -z;
  return (point[0] *= sLambda, point[1] *= -sPhi, point);
}

gringortenRaw.invert = function(x, y) {
  if (abs$1(x) > 1) x = sign$1(x) * 2 - x;
  if (abs$1(y) > 1) y = sign$1(y) * 2 - y;
  var sx = sign$1(x),
      sy = sign$1(y),
      x0 = -sx * x,
      y0 = -sy * y,
      t = y0 / x0 < 1,
      p = gringortenHexadecantInvert(t ? y0 : x0, t ? x0 : y0),
      lambda = p[0],
      phi = p[1],
      cosPhi = cos$1(phi);
  if (t) lambda = -halfPi$1 - lambda;
  return [sx * (atan2$1(sin$1(lambda) * cosPhi, -sin$1(phi)) + pi$1), sy * asin$1(cos$1(lambda) * cosPhi)];
};

function gringortenHexadecant(lambda, phi) {
  if (phi === halfPi$1) return [0, 0];

  var sinPhi = sin$1(phi),
      r = sinPhi * sinPhi,
      r2 = r * r,
      j = 1 + r2,
      k = 1 + 3 * r2,
      q = 1 - r2,
      z = asin$1(1 / sqrt$1(j)),
      v = q + r * j * z,
      p2 = (1 - sinPhi) / v,
      p = sqrt$1(p2),
      a2 = p2 * j,
      a = sqrt$1(a2),
      h = p * q,
      x,
      i;

  if (lambda === 0) return [0, -(h + r * a)];

  var cosPhi = cos$1(phi),
      secPhi = 1 / cosPhi,
      drdPhi = 2 * sinPhi * cosPhi,
      dvdPhi = (-3 * r + z * k) * drdPhi,
      dp2dPhi = (-v * cosPhi - (1 - sinPhi) * dvdPhi) / (v * v),
      dpdPhi = (0.5 * dp2dPhi) / p,
      dhdPhi = q * dpdPhi - 2 * r * p * drdPhi,
      dra2dPhi = r * j * dp2dPhi + p2 * k * drdPhi,
      mu = -secPhi * drdPhi,
      nu = -secPhi * dra2dPhi,
      zeta = -2 * secPhi * dhdPhi,
      lambda1 = 4 * lambda / pi$1,
      delta;

  // Slower but accurate bisection method.
  if (lambda > 0.222 * pi$1 || phi < pi$1 / 4 && lambda > 0.175 * pi$1) {
    x = (h + r * sqrt$1(a2 * (1 + r2) - h * h)) / (1 + r2);
    if (lambda > pi$1 / 4) return [x, x];
    var x1 = x, x0 = 0.5 * x;
    x = 0.5 * (x0 + x1), i = 50;
    do {
      var g = sqrt$1(a2 - x * x),
          f = (x * (zeta + mu * g) + nu * asin$1(x / a)) - lambda1;
      if (!f) break;
      if (f < 0) x0 = x;
      else x1 = x;
      x = 0.5 * (x0 + x1);
    } while (abs$1(x1 - x0) > epsilon$1 && --i > 0);
  }

  // Newton-Raphson.
  else {
    x = epsilon$1, i = 25;
    do {
      var x2 = x * x,
          g2 = sqrt$1(a2 - x2),
          zetaMug = zeta + mu * g2,
          f2 = x * zetaMug + nu * asin$1(x / a) - lambda1,
          df = zetaMug + (nu - mu * x2) / g2;
      x -= delta = g2 ? f2 / df : 0;
    } while (abs$1(delta) > epsilon$1 && --i > 0);
  }

  return [x, -h - r * sqrt$1(a2 - x * x)];
}

function gringortenHexadecantInvert(x, y) {
  var x0 = 0,
      x1 = 1,
      r = 0.5,
      i = 50;

  while (true) {
    var r2 = r * r,
        sinPhi = sqrt$1(r),
        z = asin$1(1 / sqrt$1(1 + r2)),
        v = (1 - r2) + r * (1 + r2) * z,
        p2 = (1 - sinPhi) / v,
        p = sqrt$1(p2),
        a2 = p2 * (1 + r2),
        h = p * (1 - r2),
        g2 = a2 - x * x,
        g = sqrt$1(g2),
        y0 = y + h + r * g;
    if (abs$1(x1 - x0) < epsilon2$1 || --i === 0 || y0 === 0) break;
    if (y0 > 0) x0 = r;
    else x1 = r;
    r = 0.5 * (x0 + x1);
  }

  if (!i) return null;

  var phi = asin$1(sinPhi),
      cosPhi = cos$1(phi),
      secPhi = 1 / cosPhi,
      drdPhi = 2 * sinPhi * cosPhi,
      dvdPhi = (-3 * r + z * (1 + 3 * r2)) * drdPhi,
      dp2dPhi = (-v * cosPhi - (1 - sinPhi) * dvdPhi) / (v * v),
      dpdPhi = 0.5 * dp2dPhi / p,
      dhdPhi = (1 - r2) * dpdPhi - 2 * r * p * drdPhi,
      zeta = -2 * secPhi * dhdPhi,
      mu = -secPhi * drdPhi,
      nu = -secPhi * (r * (1 + r2) * dp2dPhi + p2 * (1 + 3 * r2) * drdPhi);

  return [pi$1 / 4 * (x * (zeta + mu * g) + nu * asin$1(x / sqrt$1(a2))), phi];
}

var gringorten = function() {
  return projection(squareRaw(gringortenRaw))
      .scale(239.75);
};

// Returns [sn, cn, dn](u + iv|m).
function ellipticJi(u, v, m) {
  var a, b, c;
  if (!u) {
    b = ellipticJ(v, 1 - m);
    return [
      [0, b[0] / b[1]],
      [1 / b[1], 0],
      [b[2] / b[1], 0]
    ];
  }
  a = ellipticJ(u, m);
  if (!v) return [[a[0], 0], [a[1], 0], [a[2], 0]];
  b = ellipticJ(v, 1 - m);
  c = b[1] * b[1] + m * a[0] * a[0] * b[0] * b[0];
  return [
    [a[0] * b[2] / c, a[1] * a[2] * b[0] * b[1] / c],
    [a[1] * b[1] / c, -a[0] * a[2] * b[0] * b[2] / c],
    [a[2] * b[1] * b[2] / c, -m * a[0] * a[1] * b[0] / c]
  ];
}

// Returns [sn, cn, dn, ph](u|m).
function ellipticJ(u, m) {
  var ai, b, phi, t, twon;
  if (m < epsilon$1) {
    t = sin$1(u);
    b = cos$1(u);
    ai = m * (u - t * b) / 4;
    return [
      t - ai * b,
      b + ai * t,
      1 - m * t * t / 2,
      u - ai
    ];
  }
  if (m >= 1 - epsilon$1) {
    ai = (1 - m) / 4;
    b = cosh(u);
    t = tanh(u);
    phi = 1 / b;
    twon = b * sinh(u);
    return [
      t + ai * (twon - u) / (b * b),
      phi - ai * t * phi * (twon - u),
      phi + ai * t * phi * (twon + u),
      2 * atan$1(exp$1(u)) - halfPi$1 + ai * (twon - u) / b
    ];
  }

  var a = [1, 0, 0, 0, 0, 0, 0, 0, 0],
      c = [sqrt$1(m), 0, 0, 0, 0, 0, 0, 0, 0],
      i = 0;
  b = sqrt$1(1 - m);
  twon = 1;

  while (abs$1(c[i] / a[i]) > epsilon$1 && i < 8) {
    ai = a[i++];
    c[i] = (ai - b) / 2;
    a[i] = (ai + b) / 2;
    b = sqrt$1(ai * b);
    twon *= 2;
  }

  phi = twon * a[i] * u;
  do {
    t = c[i] * sin$1(b = phi) / a[i];
    phi = (asin$1(t) + phi) / 2;
  } while (--i);

  return [sin$1(phi), t = cos$1(phi), t / cos$1(phi - b), phi];
}

// Calculate F(phi+iPsi|m).
// See Abramowitz and Stegun, 17.4.11.
function ellipticFi(phi, psi, m) {
  var r = abs$1(phi),
      i = abs$1(psi),
      sinhPsi = sinh(i);
  if (r) {
    var cscPhi = 1 / sin$1(r),
        cotPhi2 = 1 / (tan$1(r) * tan$1(r)),
        b = -(cotPhi2 + m * (sinhPsi * sinhPsi * cscPhi * cscPhi) - 1 + m),
        c = (m - 1) * cotPhi2,
        cotLambda2 = (-b + sqrt$1(b * b - 4 * c)) / 2;
    return [
      ellipticF(atan$1(1 / sqrt$1(cotLambda2)), m) * sign$1(phi),
      ellipticF(atan$1(sqrt$1((cotLambda2 / cotPhi2 - 1) / m)), 1 - m) * sign$1(psi)
    ];
  }
  return [
    0,
    ellipticF(atan$1(sinhPsi), 1 - m) * sign$1(psi)
  ];
}

// Calculate F(phi|m) where m = k² = sin²α.
// See Abramowitz and Stegun, 17.6.7.
function ellipticF(phi, m) {
  if (!m) return phi;
  if (m === 1) return log$1(tan$1(phi / 2 + quarterPi$1));
  var a = 1,
      b = sqrt$1(1 - m),
      c = sqrt$1(m);
  for (var i = 0; abs$1(c) > epsilon$1; i++) {
    if (phi % pi$1) {
      var dPhi = atan$1(b * tan$1(phi) / a);
      if (dPhi < 0) dPhi += pi$1;
      phi += dPhi + ~~(phi / pi$1) * pi$1;
    } else phi += phi;
    c = (a + b) / 2;
    b = sqrt$1(a * b);
    c = ((a = c) - b) / 2;
  }
  return phi / (pow$1(2, i) * a);
}

function guyouRaw(lambda, phi) {
  var k_ = (sqrt2 - 1) / (sqrt2 + 1),
      k = sqrt$1(1 - k_ * k_),
      K = ellipticF(halfPi$1, k * k),
      f = -1,
      psi = log$1(tan$1(pi$1 / 4 + abs$1(phi) / 2)),
      r = exp$1(f * psi) / sqrt$1(k_),
      at = guyouComplexAtan(r * cos$1(f * lambda), r * sin$1(f * lambda)),
      t = ellipticFi(at[0], at[1], k * k);
  return [-t[1], (phi >= 0 ? 1 : -1) * (0.5 * K - t[0])];
}

function guyouComplexAtan(x, y) {
  var x2 = x * x,
      y_1 = y + 1,
      t = 1 - x2 - y * y;
  return [
   0.5 * ((x >= 0 ? halfPi$1 : -halfPi$1) - atan2$1(t, 2 * x)),
    -0.25 * log$1(t * t + 4 * x2) +0.5 * log$1(y_1 * y_1 + x2)
  ];
}

function guyouComplexDivide(a, b) {
  var denominator = b[0] * b[0] + b[1] * b[1];
  return [
    (a[0] * b[0] + a[1] * b[1]) / denominator,
    (a[1] * b[0] - a[0] * b[1]) / denominator
  ];
}

guyouRaw.invert = function(x, y) {
  var k_ = (sqrt2 - 1) / (sqrt2 + 1),
      k = sqrt$1(1 - k_ * k_),
      K = ellipticF(halfPi$1, k * k),
      f = -1,
      j = ellipticJi(0.5 * K - y, -x, k * k),
      tn = guyouComplexDivide(j[0], j[1]),
      lambda = atan2$1(tn[1], tn[0]) / f;
  return [
    lambda,
    2 * atan$1(exp$1(0.5 / f * log$1(k_ * tn[0] * tn[0] + k_ * tn[1] * tn[1]))) - halfPi$1
  ];
};

var guyou = function() {
  return projection(squareRaw(guyouRaw))
      .scale(151.496);
};

function hammerRaw(A, B) {
  if (arguments.length < 2) B = A;
  if (B === 1) return azimuthalEqualAreaRaw;
  if (B === Infinity) return hammerQuarticAuthalicRaw;

  function forward(lambda, phi) {
    var coordinates = azimuthalEqualAreaRaw(lambda / B, phi);
    coordinates[0] *= A;
    return coordinates;
  }

  forward.invert = function(x, y) {
    var coordinates = azimuthalEqualAreaRaw.invert(x / A, y);
    coordinates[0] *= B;
    return coordinates;
  };

  return forward;
}

function hammerQuarticAuthalicRaw(lambda, phi) {
  return [
    lambda * cos$1(phi) / cos$1(phi /= 2),
    2 * sin$1(phi)
  ];
}

hammerQuarticAuthalicRaw.invert = function(x, y) {
  var phi = 2 * asin$1(y / 2);
  return [
    x * cos$1(phi / 2) / cos$1(phi),
    phi
  ];
};

var hammer = function() {
  var B = 2,
      m = projectionMutator(hammerRaw),
      p = m(B);

  p.coefficient = function(_) {
    if (!arguments.length) return B;
    return m(B = +_);
  };

  return p
    .scale(169.529);
};

function hammerRetroazimuthalRaw(phi0) {
  var sinPhi0 = sin$1(phi0),
      cosPhi0 = cos$1(phi0),
      rotate = hammerRetroazimuthalRotation(phi0);

  rotate.invert = hammerRetroazimuthalRotation(-phi0);

  function forward(lambda, phi) {
    var p = rotate(lambda, phi);
    lambda = p[0], phi = p[1];
    var sinPhi = sin$1(phi),
        cosPhi = cos$1(phi),
        cosLambda = cos$1(lambda),
        z = acos$1(sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosLambda),
        sinz = sin$1(z),
        K = abs$1(sinz) > epsilon$1 ? z / sinz : 1;
    return [
      K * cosPhi0 * sin$1(lambda),
      (abs$1(lambda) > halfPi$1 ? K : -K) // rotate for back hemisphere
        * (sinPhi0 * cosPhi - cosPhi0 * sinPhi * cosLambda)
    ];
  }

  forward.invert = function(x, y) {
    var rho = sqrt$1(x * x + y * y),
        sinz = -sin$1(rho),
        cosz = cos$1(rho),
        a = rho * cosz,
        b = -y * sinz,
        c = rho * sinPhi0,
        d = sqrt$1(a * a + b * b - c * c),
        phi = atan2$1(a * c + b * d, b * c - a * d),
        lambda = (rho > halfPi$1 ? -1 : 1) * atan2$1(x * sinz, rho * cos$1(phi) * cosz + y * sin$1(phi) * sinz);
    return rotate.invert(lambda, phi);
  };

  return forward;
}

// Latitudinal rotation by phi0.
// Temporary hack until D3 supports arbitrary small-circle clipping origins.
function hammerRetroazimuthalRotation(phi0) {
  var sinPhi0 = sin$1(phi0),
      cosPhi0 = cos$1(phi0);

  return function(lambda, phi) {
    var cosPhi = cos$1(phi),
        x = cos$1(lambda) * cosPhi,
        y = sin$1(lambda) * cosPhi,
        z = sin$1(phi);
    return [
      atan2$1(y, x * cosPhi0 - z * sinPhi0),
      asin$1(z * cosPhi0 + x * sinPhi0)
    ];
  };
}

var hammerRetroazimuthal = function() {
  var phi0 = 0,
      m = projectionMutator(hammerRetroazimuthalRaw),
      p = m(phi0),
      rotate_ = p.rotate,
      stream_ = p.stream,
      circle = geoCircle();

  p.parallel = function(_) {
    if (!arguments.length) return phi0 * degrees$1;
    var r = p.rotate();
    return m(phi0 = _ * radians$1).rotate(r);
  };

  // Temporary hack; see hammerRetroazimuthalRotation.
  p.rotate = function(_) {
    if (!arguments.length) return (_ = rotate_.call(p), _[1] += phi0 * degrees$1, _);
    rotate_.call(p, [_[0], _[1] - phi0 * degrees$1]);
    circle.center([-_[0], -_[1]]);
    return p;
  };

  p.stream = function(stream) {
    stream = stream_(stream);
    stream.sphere = function() {
      stream.polygonStart();
      var epsilon = 1e-2,
          ring = circle.radius(90 - epsilon)().coordinates[0],
          n = ring.length - 1,
          i = -1,
          p;
      stream.lineStart();
      while (++i < n) stream.point((p = ring[i])[0], p[1]);
      stream.lineEnd();
      ring = circle.radius(90 + epsilon)().coordinates[0];
      n = ring.length - 1;
      stream.lineStart();
      while (--i >= 0) stream.point((p = ring[i])[0], p[1]);
      stream.lineEnd();
      stream.polygonEnd();
    };
    return stream;
  };

  return p
      .scale(79.4187)
      .parallel(45)
      .clipAngle(180 - 1e-3);
};

var healpixParallel = 41 + 48 / 36 + 37 / 3600;
var healpixLambert = cylindricalEqualAreaRaw$1(0);

function healpixRaw(H) {
  var phi0 = healpixParallel * radians$1,
      dx = collignonRaw(pi$1, phi0)[0] - collignonRaw(-pi$1, phi0)[0],
      y0 = healpixLambert(0, phi0)[1],
      y1 = collignonRaw(0, phi0)[1],
      dy1 = sqrtPi - y1,
      k = tau$1 / H,
      w = 4 / tau$1,
      h = y0 + (dy1 * dy1 * 4) / tau$1;

  function forward(lambda, phi) {
    var point,
        phi2 = abs$1(phi);
    if (phi2 > phi0) {
      var i = min$1(H - 1, max$1(0, floor$1((lambda + pi$1) / k)));
      lambda += pi$1 * (H - 1) / H - i * k;
      point = collignonRaw(lambda, phi2);
      point[0] = point[0] * tau$1 / dx - tau$1 * (H - 1) / (2 * H) + i * tau$1 / H;
      point[1] = y0 + (point[1] - y1) * 4 * dy1 / tau$1;
      if (phi < 0) point[1] = -point[1];
    } else {
      point = healpixLambert(lambda, phi);
    }
    point[0] *= w, point[1] /= h;
    return point;
  }

  forward.invert = function(x, y) {
    x /= w, y *= h;
    var y2 = abs$1(y);
    if (y2 > y0) {
      var i = min$1(H - 1, max$1(0, floor$1((x + pi$1) / k)));
      x = (x + pi$1 * (H - 1) / H - i * k) * dx / tau$1;
      var point = collignonRaw.invert(x, 0.25 * (y2 - y0) * tau$1 / dy1 + y1);
      point[0] -= pi$1 * (H - 1) / H - i * k;
      if (y < 0) point[1] = -point[1];
      return point;
    }
    return healpixLambert.invert(x, y);
  };

  return forward;
}

function sphere(step) {
  return {
    type: "Polygon",
    coordinates: [
      range$1(-180, 180 + step / 2, step).map(function(x, i) { return [x, i & 1 ? 90 - 1e-6 : healpixParallel]; })
      .concat(range$1(180, -180 - step / 2, -step).map(function(x, i) { return [x, i & 1 ? -90 + 1e-6 : -healpixParallel]; }))
    ]
  };
}

var healpix = function() {
  var H = 4,
      m = projectionMutator(healpixRaw),
      p = m(H),
      stream_ = p.stream;

  p.lobes = function(_) {
    return arguments.length ? m(H = +_) : H;
  };

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (p.rotate([0, 0]), stream_(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() { geoStream(sphere(180 / H), sphereStream); };
    return rotateStream;
  };

  return p
      .scale(239.75);
};

function hillRaw(K) {
  var L = 1 + K,
      sinBt = sin$1(1 / L),
      Bt = asin$1(sinBt),
      A = 2 * sqrt$1(pi$1 / (B = pi$1 + 4 * Bt * L)),
      B,
      rho0 = 0.5 * A * (L + sqrt$1(K * (2 + K))),
      K2 = K * K,
      L2 = L * L;

  function forward(lambda, phi) {
    var t = 1 - sin$1(phi),
        rho,
        omega;
    if (t && t < 2) {
      var theta = halfPi$1 - phi, i = 25, delta;
      do {
        var sinTheta = sin$1(theta),
            cosTheta = cos$1(theta),
            Bt_Bt1 = Bt + atan2$1(sinTheta, L - cosTheta),
            C = 1 + L2 - 2 * L * cosTheta;
        theta -= delta = (theta - K2 * Bt - L * sinTheta + C * Bt_Bt1 -0.5 * t * B) / (2 * L * sinTheta * Bt_Bt1);
      } while (abs$1(delta) > epsilon2$1 && --i > 0);
      rho = A * sqrt$1(C);
      omega = lambda * Bt_Bt1 / pi$1;
    } else {
      rho = A * (K + t);
      omega = lambda * Bt / pi$1;
    }
    return [
      rho * sin$1(omega),
      rho0 - rho * cos$1(omega)
    ];
  }

  forward.invert = function(x, y) {
    var rho2 = x * x + (y -= rho0) * y,
        cosTheta = (1 + L2 - rho2 / (A * A)) / (2 * L),
        theta = acos$1(cosTheta),
        sinTheta = sin$1(theta),
        Bt_Bt1 = Bt + atan2$1(sinTheta, L - cosTheta);
    return [
      asin$1(x / sqrt$1(rho2)) * pi$1 / Bt_Bt1,
      asin$1(1 - 2 * (theta - K2 * Bt - L * sinTheta + (1 + L2 - 2 * L * cosTheta) * Bt_Bt1) / B)
    ];
  };

  return forward;
}

var hill = function() {
  var K = 1,
      m = projectionMutator(hillRaw),
      p = m(K);

  p.ratio = function(_) {
    return arguments.length ? m(K = +_) : K;
  };

  return p
      .scale(167.774)
      .center([0, 18.67]);
};

var sinuMollweidePhi = 0.7109889596207567;

var sinuMollweideY = 0.0528035274542;

function sinuMollweideRaw(lambda, phi) {
  return phi > -sinuMollweidePhi
      ? (lambda = mollweideRaw(lambda, phi), lambda[1] += sinuMollweideY, lambda)
      : sinusoidalRaw(lambda, phi);
}

sinuMollweideRaw.invert = function(x, y) {
  return y > -sinuMollweidePhi
      ? mollweideRaw.invert(x, y - sinuMollweideY)
      : sinusoidalRaw.invert(x, y);
};

var sinuMollweide = function() {
  return projection(sinuMollweideRaw)
      .rotate([-20, -55])
      .scale(164.263)
      .center([0, -5.4036]);
};

function homolosineRaw(lambda, phi) {
  return abs$1(phi) > sinuMollweidePhi
      ? (lambda = mollweideRaw(lambda, phi), lambda[1] -= phi > 0 ? sinuMollweideY : -sinuMollweideY, lambda)
      : sinusoidalRaw(lambda, phi);
}

homolosineRaw.invert = function(x, y) {
  return abs$1(y) > sinuMollweidePhi
      ? mollweideRaw.invert(x, y + (y > 0 ? sinuMollweideY : -sinuMollweideY))
      : sinusoidalRaw.invert(x, y);
};

var homolosine = function() {
  return projection(homolosineRaw)
      .scale(152.63);
};

function pointEqual$1(a, b) {
  return abs$1(a[0] - b[0]) < epsilon$1 && abs$1(a[1] - b[1]) < epsilon$1;
}

function interpolateLine(coordinates, m) {
  var i = -1,
      n = coordinates.length,
      p0 = coordinates[0],
      p1,
      dx,
      dy,
      resampled = [];
  while (++i < n) {
    p1 = coordinates[i];
    dx = (p1[0] - p0[0]) / m;
    dy = (p1[1] - p0[1]) / m;
    for (var j = 0; j < m; ++j) resampled.push([p0[0] + j * dx, p0[1] + j * dy]);
    p0 = p1;
  }
  resampled.push(p1);
  return resampled;
}

function interpolateSphere(lobes) {
  var coordinates = [],
      lobe,
      lambda0, phi0, phi1,
      lambda2, phi2,
      i, n = lobes[0].length;

  // Northern Hemisphere
  for (i = 0; i < n; ++i) {
    lobe = lobes[0][i];
    lambda0 = lobe[0][0], phi0 = lobe[0][1], phi1 = lobe[1][1];
    lambda2 = lobe[2][0], phi2 = lobe[2][1];
    coordinates.push(interpolateLine([
      [lambda0 + epsilon$1, phi0 + epsilon$1],
      [lambda0 + epsilon$1, phi1 - epsilon$1],
      [lambda2 - epsilon$1, phi1 - epsilon$1],
      [lambda2 - epsilon$1, phi2 + epsilon$1]
    ], 30));
  }

  // Southern Hemisphere
  for (i = lobes[1].length - 1; i >= 0; --i) {
    lobe = lobes[1][i];
    lambda0 = lobe[0][0], phi0 = lobe[0][1], phi1 = lobe[1][1];
    lambda2 = lobe[2][0], phi2 = lobe[2][1];
    coordinates.push(interpolateLine([
      [lambda2 - epsilon$1, phi2 - epsilon$1],
      [lambda2 - epsilon$1, phi1 + epsilon$1],
      [lambda0 + epsilon$1, phi1 + epsilon$1],
      [lambda0 + epsilon$1, phi0 - epsilon$1]
    ], 30));
  }

  return {
    type: "Polygon",
    coordinates: [merge(coordinates)]
  };
}

var interrupt = function(project, lobes) {
  var sphere, bounds$$1;

  function forward(lambda, phi) {
    var sign = phi < 0 ? -1 : +1, lobe = lobes[+(phi < 0)];
    for (var i = 0, n = lobe.length - 1; i < n && lambda > lobe[i][2][0]; ++i);
    var p = project(lambda - lobe[i][1][0], phi);
    p[0] += project(lobe[i][1][0], sign * phi > sign * lobe[i][0][1] ? lobe[i][0][1] : phi)[0];
    return p;
  }

  // Assumes mutually exclusive bounding boxes for lobes.
  if (project.invert) forward.invert = function(x, y) {
    var bound = bounds$$1[+(y < 0)], lobe = lobes[+(y < 0)];
    for (var i = 0, n = bound.length; i < n; ++i) {
      var b = bound[i];
      if (b[0][0] <= x && x < b[1][0] && b[0][1] <= y && y < b[1][1]) {
        var p = project.invert(x - project(lobe[i][1][0], 0)[0], y);
        p[0] += lobe[i][1][0];
        return pointEqual$1(forward(p[0], p[1]), [x, y]) ? p : null;
      }
    }
  };

  var p = projection(forward),
      stream_ = p.stream;

  p.stream = function(stream) {
    var rotate = p.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (p.rotate([0, 0]), stream_(stream));
    p.rotate(rotate);
    rotateStream.sphere = function() { geoStream(sphere, sphereStream); };
    return rotateStream;
  };
  
  p.lobes = function(_) {
    if (!arguments.length) return lobes.map(function(lobe) {
      return lobe.map(function(l) {
        return [
          [l[0][0] * degrees$1, l[0][1] * degrees$1],
          [l[1][0] * degrees$1, l[1][1] * degrees$1],
          [l[2][0] * degrees$1, l[2][1] * degrees$1]
        ];
      });
    });

    sphere = interpolateSphere(_);

    lobes = _.map(function(lobe) {
      return lobe.map(function(l) {
        return [
          [l[0][0] * radians$1, l[0][1] * radians$1],
          [l[1][0] * radians$1, l[1][1] * radians$1],
          [l[2][0] * radians$1, l[2][1] * radians$1]
        ];
      });
    });

    bounds$$1 = lobes.map(function(lobe) {
      return lobe.map(function(l) {
        var x0 = project(l[0][0], l[0][1])[0],
            x1 = project(l[2][0], l[2][1])[0],
            y0 = project(l[1][0], l[0][1])[1],
            y1 = project(l[1][0], l[1][1])[1],
            t;
        if (y0 > y1) t = y0, y0 = y1, y1 = t;
        return [[x0, y0], [x1, y1]];
      });
    });

    return p;
  };

  if (lobes != null) p.lobes(lobes);

  return p;
};

var lobes = [[ // northern hemisphere
  [[-180,   0], [-100,  90], [ -40,   0]],
  [[ -40,   0], [  30,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-160, -90], [-100,   0]],
  [[-100,   0], [ -60, -90], [ -20,   0]],
  [[ -20,   0], [  20, -90], [  80,   0]],
  [[  80,   0], [ 140, -90], [ 180,   0]]
]];

var boggs$1 = function() {
  return interrupt(boggsRaw, lobes)
      .scale(160.857);
};

var lobes$1 = [[ // northern hemisphere
  [[-180,   0], [-100,  90], [ -40,   0]],
  [[ -40,   0], [  30,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-160, -90], [-100,   0]],
  [[-100,   0], [ -60, -90], [ -20,   0]],
  [[ -20,   0], [  20, -90], [  80,   0]],
  [[  80,   0], [ 140, -90], [ 180,   0]]
]];

var homolosine$1 = function() {
  return interrupt(homolosineRaw, lobes$1)
      .scale(152.63);
};

var lobes$2 = [[ // northern hemisphere
  [[-180,   0], [-100,  90], [ -40,   0]],
  [[ -40,   0], [  30,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-160, -90], [-100,   0]],
  [[-100,   0], [ -60, -90], [ -20,   0]],
  [[ -20,   0], [  20, -90], [  80,   0]],
  [[  80,   0], [ 140, -90], [ 180,   0]]
]];

var mollweide$1 = function() {
  return interrupt(mollweideRaw, lobes$2)
      .scale(169.529);
};

var lobes$3 = [[ // northern hemisphere
  [[-180,   0], [ -90,  90], [   0,   0]],
  [[   0,   0], [  90,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [ -90, -90], [   0,   0]],
  [[   0,   0], [  90, -90], [ 180,   0]]
]];

var mollweideHemispheres = function() {
  return interrupt(mollweideRaw, lobes$3)
      .scale(169.529)
      .rotate([20, 0]);
};

var lobes$4 = [[ // northern hemisphere
  [[-180,  35], [ -30,  90], [   0,  35]],
  [[   0,  35], [  30,  90], [ 180,  35]]
], [ // southern hemisphere
  [[-180, -10], [-102, -90], [ -65, -10]],
  [[ -65, -10], [   5, -90], [  77, -10]],
  [[  77, -10], [ 103, -90], [ 180, -10]]
]];

var sinuMollweide$1 = function() {
  return interrupt(sinuMollweideRaw, lobes$4)
      .rotate([-20, -55])
      .scale(164.263)
      .center([0, -5.4036]);
};

var lobes$5 = [[ // northern hemisphere
  [[-180,   0], [-110,  90], [ -40,   0]],
  [[ -40,   0], [   0,  90], [  40,   0]],
  [[  40,   0], [ 110,  90], [ 180,   0]]
], [ // southern hemisphere
  [[-180,   0], [-110, -90], [ -40,   0]],
  [[ -40,   0], [   0, -90], [  40,   0]],
  [[  40,   0], [ 110, -90], [ 180,   0]]
]];

var sinusoidal$1 = function() {
  return interrupt(sinusoidalRaw, lobes$5)
      .scale(152.63)
      .rotate([-20, 0]);
};

function kavrayskiy7Raw(lambda, phi) {
  return [3 / tau$1 * lambda * sqrt$1(pi$1 * pi$1 / 3 - phi * phi), phi];
}

kavrayskiy7Raw.invert = function(x, y) {
  return [tau$1 / 3 * x / sqrt$1(pi$1 * pi$1 / 3 - y * y), y];
};

var kavrayskiy7 = function() {
  return projection(kavrayskiy7Raw)
      .scale(158.837);
};

function lagrangeRaw(n) {

  function forward(lambda, phi) {
    if (abs$1(abs$1(phi) - halfPi$1) < epsilon$1) return [0, phi < 0 ? -2 : 2];
    var sinPhi = sin$1(phi),
        v = pow$1((1 + sinPhi) / (1 - sinPhi), n / 2),
        c = 0.5 * (v + 1 / v) + cos$1(lambda *= n);
    return [
      2 * sin$1(lambda) / c,
      (v - 1 / v) / c
    ];
  }

  forward.invert = function(x, y) {
    var y0 = abs$1(y);
    if (abs$1(y0 - 2) < epsilon$1) return x ? null : [0, sign$1(y) * halfPi$1];
    if (y0 > 2) return null;

    x /= 2, y /= 2;
    var x2 = x * x,
        y2 = y * y,
        t = 2 * y / (1 + x2 + y2); // tanh(nPhi)
    t = pow$1((1 + t) / (1 - t), 1 / n);
    return [
      atan2$1(2 * x, 1 - x2 - y2) / n,
      asin$1((t - 1) / (t + 1))
    ];
  };

  return forward;
}

var lagrange = function() {
  var n = 0.5,
      m = projectionMutator(lagrangeRaw),
      p = m(n);

  p.spacing = function(_) {
    return arguments.length ? m(n = +_) : n;
  };

  return p
      .scale(124.75);
};

var pi_sqrt2 = pi$1 / sqrt2;

function larriveeRaw(lambda, phi) {
  return [
    lambda * (1 + sqrt$1(cos$1(phi))) / 2,
    phi / (cos$1(phi / 2) * cos$1(lambda / 6))
  ];
}

larriveeRaw.invert = function(x, y) {
  var x0 = abs$1(x),
      y0 = abs$1(y),
      lambda = epsilon$1,
      phi = halfPi$1;
  if (y0 < pi_sqrt2) phi *= y0 / pi_sqrt2;
  else lambda += 6 * acos$1(pi_sqrt2 / y0);
  for (var i = 0; i < 25; i++) {
    var sinPhi = sin$1(phi),
        sqrtcosPhi = sqrt$1(cos$1(phi)),
        sinPhi_2 = sin$1(phi / 2),
        cosPhi_2 = cos$1(phi / 2),
        sinLambda_6 = sin$1(lambda / 6),
        cosLambda_6 = cos$1(lambda / 6),
        f0 = 0.5 * lambda * (1 + sqrtcosPhi) - x0,
        f1 = phi / (cosPhi_2 * cosLambda_6) - y0,
        df0dPhi = sqrtcosPhi ? -0.25 * lambda * sinPhi / sqrtcosPhi : 0,
        df0dLambda = 0.5 * (1 + sqrtcosPhi),
        df1dPhi = (1 +0.5 * phi * sinPhi_2 / cosPhi_2) / (cosPhi_2 * cosLambda_6),
        df1dLambda = (phi / cosPhi_2) * (sinLambda_6 / 6) / (cosLambda_6 * cosLambda_6),
        denom = df0dPhi * df1dLambda - df1dPhi * df0dLambda,
        dPhi = (f0 * df1dLambda - f1 * df0dLambda) / denom,
        dLambda = (f1 * df0dPhi - f0 * df1dPhi) / denom;
    phi -= dPhi;
    lambda -= dLambda;
    if (abs$1(dPhi) < epsilon$1 && abs$1(dLambda) < epsilon$1) break;
  }
  return [x < 0 ? -lambda : lambda, y < 0 ? -phi : phi];
};

var larrivee = function() {
  return projection(larriveeRaw)
      .scale(97.2672);
};

function laskowskiRaw(lambda, phi) {
  var lambda2 = lambda * lambda, phi2 = phi * phi;
  return [
    lambda * (0.975534 + phi2 * (-0.119161 + lambda2 * -0.0143059 + phi2 * -0.0547009)),
    phi * (1.00384 + lambda2 * (0.0802894 + phi2 * -0.02855 + lambda2 * 0.000199025) + phi2 * (0.0998909 + phi2 * -0.0491032))
  ];
}

laskowskiRaw.invert = function(x, y) {
  var lambda = sign$1(x) * pi$1,
      phi = y / 2,
      i = 50;
  do {
    var lambda2 = lambda * lambda,
        phi2 = phi * phi,
        lambdaPhi = lambda * phi,
        fx = lambda * (0.975534 + phi2 * (-0.119161 + lambda2 * -0.0143059 + phi2 * -0.0547009)) - x,
        fy = phi * (1.00384 + lambda2 * (0.0802894 + phi2 * -0.02855 + lambda2 * 0.000199025) + phi2 * (0.0998909 + phi2 * -0.0491032)) - y,
        deltaxDeltaLambda = 0.975534 - phi2 * (0.119161 + 3 * lambda2 * 0.0143059 + phi2 * 0.0547009),
        deltaxDeltaPhi = -lambdaPhi * (2 * 0.119161 + 4 * 0.0547009 * phi2 + 2 * 0.0143059 * lambda2),
        deltayDeltaLambda = lambdaPhi * (2 * 0.0802894 + 4 * 0.000199025 * lambda2 + 2 * -0.02855 * phi2),
        deltayDeltaPhi = 1.00384 + lambda2 * (0.0802894 + 0.000199025 * lambda2) + phi2 * (3 * (0.0998909 - 0.02855 * lambda2) - 5 * 0.0491032 * phi2),
        denominator = deltaxDeltaPhi * deltayDeltaLambda - deltayDeltaPhi * deltaxDeltaLambda,
        deltaLambda = (fy * deltaxDeltaPhi - fx * deltayDeltaPhi) / denominator,
        deltaPhi = (fx * deltayDeltaLambda - fy * deltaxDeltaLambda) / denominator;
    lambda -= deltaLambda, phi -= deltaPhi;
  } while ((abs$1(deltaLambda) > epsilon$1 || abs$1(deltaPhi) > epsilon$1) && --i > 0);
  return i && [lambda, phi];
};

var laskowski = function() {
  return projection(laskowskiRaw)
      .scale(139.98);
};

function littrowRaw(lambda, phi) {
  return [
    sin$1(lambda) / cos$1(phi),
    tan$1(phi) * cos$1(lambda)
  ];
}

littrowRaw.invert = function(x, y) {
  var x2 = x * x,
      y2 = y * y,
      y2_1 = y2 + 1,
      cosPhi = x
          ? sqrt1_2 * sqrt$1((y2_1 - sqrt$1(x2 * x2 + 2 * x2 * (y2 - 1) + y2_1 * y2_1)) / x2 + 1)
          : 1 / sqrt$1(y2_1);
  return [
    asin$1(x * cosPhi),
    sign$1(y) * acos$1(cosPhi)
  ];
};

var littrow = function() {
  return projection(littrowRaw)
      .scale(144.049)
      .clipAngle(90 - 1e-3);
};

function loximuthalRaw(phi0) {
  var cosPhi0 = cos$1(phi0),
      tanPhi0 = tan$1(quarterPi$1 + phi0 / 2);

  function forward(lambda, phi) {
    var y = phi - phi0,
        x = abs$1(y) < epsilon$1 ? lambda * cosPhi0
            : abs$1(x = quarterPi$1 + phi / 2) < epsilon$1 || abs$1(abs$1(x) - halfPi$1) < epsilon$1
            ? 0 : lambda * y / log$1(tan$1(x) / tanPhi0);
    return [x, y];
  }

  forward.invert = function(x, y) {
    var lambda,
        phi = y + phi0;
    return [
      abs$1(y) < epsilon$1 ? x / cosPhi0
          : (abs$1(lambda = quarterPi$1 + phi / 2) < epsilon$1 || abs$1(abs$1(lambda) - halfPi$1) < epsilon$1) ? 0
          : x * log$1(tan$1(lambda) / tanPhi0) / y,
      phi
    ];
  };

  return forward;
}

var loximuthal = function() {
  return parallel1(loximuthalRaw)
      .parallel(40)
      .scale(158.837);
};

function millerRaw(lambda, phi) {
  return [lambda, 1.25 * log$1(tan$1(quarterPi$1 + 0.4 * phi))];
}

millerRaw.invert = function(x, y) {
  return [x, 2.5 * atan$1(exp$1(0.8 * y)) - 0.625 * pi$1];
};

var miller = function() {
  return projection(millerRaw)
      .scale(108.318);
};

function modifiedStereographicRaw(C) {
  var m = C.length - 1;

  function forward(lambda, phi) {
    var cosPhi = cos$1(phi),
        k = 2 / (1 + cosPhi * cos$1(lambda)),
        zr = k * cosPhi * sin$1(lambda),
        zi = k * sin$1(phi),
        i = m,
        w = C[i],
        ar = w[0],
        ai = w[1],
        t;
    while (--i >= 0) {
      w = C[i];
      ar = w[0] + zr * (t = ar) - zi * ai;
      ai = w[1] + zr * ai + zi * t;
    }
    ar = zr * (t = ar) - zi * ai;
    ai = zr * ai + zi * t;
    return [ar, ai];
  }

  forward.invert = function(x, y) {
    var i = 20,
        zr = x,
        zi = y;
    do {
      var j = m,
          w = C[j],
          ar = w[0],
          ai = w[1],
          br = 0,
          bi = 0,
          t;

      while (--j >= 0) {
        w = C[j];
        br = ar + zr * (t = br) - zi * bi;
        bi = ai + zr * bi + zi * t;
        ar = w[0] + zr * (t = ar) - zi * ai;
        ai = w[1] + zr * ai + zi * t;
      }
      br = ar + zr * (t = br) - zi * bi;
      bi = ai + zr * bi + zi * t;
      ar = zr * (t = ar) - zi * ai - x;
      ai = zr * ai + zi * t - y;

      var denominator = br * br + bi * bi, deltar, deltai;
      zr -= deltar = (ar * br + ai * bi) / denominator;
      zi -= deltai = (ai * br - ar * bi) / denominator;
    } while (abs$1(deltar) + abs$1(deltai) > epsilon$1 * epsilon$1 && --i > 0);

    if (i) {
      var rho = sqrt$1(zr * zr + zi * zi),
          c = 2 * atan$1(rho * 0.5),
          sinc = sin$1(c);
      return [atan2$1(zr * sinc, rho * cos$1(c)), rho ? asin$1(zi * sinc / rho) : 0];
    }
  };

  return forward;
}

var alaska = [[0.9972523, 0], [0.0052513, -0.0041175], [0.0074606, 0.0048125], [-0.0153783, -0.1968253], [0.0636871, -0.1408027], [0.3660976, -0.2937382]];
var gs48 = [[0.98879, 0], [0, 0], [-0.050909, 0], [0, 0], [0.075528, 0]];
var gs50 = [[0.9842990, 0], [0.0211642, 0.0037608], [-0.1036018, -0.0575102], [-0.0329095, -0.0320119], [0.0499471, 0.1223335], [0.0260460, 0.0899805], [0.0007388, -0.1435792], [0.0075848, -0.1334108], [-0.0216473, 0.0776645], [-0.0225161, 0.0853673]];
var miller$1 = [[0.9245, 0], [0, 0], [0.01943, 0]];
var lee = [[0.721316, 0], [0, 0], [-0.00881625, -0.00617325]];

function modifiedStereographicAlaska() {
  return modifiedStereographic(alaska, [152, -64])
      .scale(1500)
      .center([-160.908, 62.4864])
      .clipAngle(25);
}

function modifiedStereographicGs48() {
  return modifiedStereographic(gs48, [95, -38])
      .scale(1000)
      .clipAngle(55)
      .center([-96.5563, 38.8675]);
}

function modifiedStereographicGs50() {
  return modifiedStereographic(gs50, [120, -45])
      .scale(359.513)
      .clipAngle(55)
      .center([-117.474, 53.0628]);
}

function modifiedStereographicMiller() {
  return modifiedStereographic(miller$1, [-20, -18])
      .scale(209.091)
      .center([20, 16.7214])
      .clipAngle(82);
}

function modifiedStereographicLee() {
  return modifiedStereographic(lee, [165, 10])
      .scale(250)
      .clipAngle(130)
      .center([-165, -10]);
}

function modifiedStereographic(coefficients, rotate) {
  var p = projection(modifiedStereographicRaw(coefficients)).rotate(rotate).clipAngle(90),
      r = rotation(rotate),
      center = p.center;

  delete p.rotate;

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p;
}

var sqrt6 = sqrt$1(6);
var sqrt7 = sqrt$1(7);

function mtFlatPolarParabolicRaw(lambda, phi) {
  var theta = asin$1(7 * sin$1(phi) / (3 * sqrt6));
  return [
    sqrt6 * lambda * (2 * cos$1(2 * theta / 3) - 1) / sqrt7,
    9 * sin$1(theta / 3) / sqrt7
  ];
}

mtFlatPolarParabolicRaw.invert = function(x, y) {
  var theta = 3 * asin$1(y * sqrt7 / 9);
  return [
    x * sqrt7 / (sqrt6 * (2 * cos$1(2 * theta / 3) - 1)),
    asin$1(sin$1(theta) * 3 * sqrt6 / 7)
  ];
};

var mtFlatPolarParabolic = function() {
  return projection(mtFlatPolarParabolicRaw)
      .scale(164.859);
};

function mtFlatPolarQuarticRaw(lambda, phi) {
  var k = (1 + sqrt1_2) * sin$1(phi),
      theta = phi;
  for (var i = 0, delta; i < 25; i++) {
    theta -= delta = (sin$1(theta / 2) + sin$1(theta) - k) / (0.5 * cos$1(theta / 2) + cos$1(theta));
    if (abs$1(delta) < epsilon$1) break;
  }
  return [
    lambda * (1 + 2 * cos$1(theta) / cos$1(theta / 2)) / (3 * sqrt2),
    2 * sqrt$1(3) * sin$1(theta / 2) / sqrt$1(2 + sqrt2)
  ];
}

mtFlatPolarQuarticRaw.invert = function(x, y) {
  var sinTheta_2 = y * sqrt$1(2 + sqrt2) / (2 * sqrt$1(3)),
      theta = 2 * asin$1(sinTheta_2);
  return [
    3 * sqrt2 * x / (1 + 2 * cos$1(theta) / cos$1(theta / 2)),
    asin$1((sinTheta_2 + sin$1(theta)) / (1 + sqrt1_2))
  ];
};

var mtFlatPolarQuartic = function() {
  return projection(mtFlatPolarQuarticRaw)
      .scale(188.209);
};

function mtFlatPolarSinusoidalRaw(lambda, phi) {
  var A = sqrt$1(6 / (4 + pi$1)),
      k = (1 + pi$1 / 4) * sin$1(phi),
      theta = phi / 2;
  for (var i = 0, delta; i < 25; i++) {
    theta -= delta = (theta / 2 + sin$1(theta) - k) / (0.5 + cos$1(theta));
    if (abs$1(delta) < epsilon$1) break;
  }
  return [
    A * (0.5 + cos$1(theta)) * lambda / 1.5,
    A * theta
  ];
}

mtFlatPolarSinusoidalRaw.invert = function(x, y) {
  var A = sqrt$1(6 / (4 + pi$1)),
      theta = y / A;
  if (abs$1(abs$1(theta) - halfPi$1) < epsilon$1) theta = theta < 0 ? -halfPi$1 : halfPi$1;
  return [
    1.5 * x / (A * (0.5 + cos$1(theta))),
    asin$1((theta / 2 + sin$1(theta)) / (1 + pi$1 / 4))
  ];
};

var mtFlatPolarSinusoidal = function() {
  return projection(mtFlatPolarSinusoidalRaw)
      .scale(166.518);
};

function naturalEarthRaw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  ];
}

naturalEarthRaw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (abs$1(delta) > epsilon$1 && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))),
    phi
  ];
};

var naturalEarth = function() {
  return projection(naturalEarthRaw)
      .scale(175.295);
};

function naturalEarth2Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2, phi6 = phi2 * phi4;
  return [
    lambda * (0.84719 - 0.13063 * phi2 + phi6 * phi6 * (-0.04515 + 0.05494 * phi2 - 0.02326 * phi4 + 0.00331 * phi6)),
    phi * (1.01183 + phi4 * phi4 * (-0.02625 + 0.01926 * phi2 - 0.00396 * phi4))
  ];
}

naturalEarth2Raw.invert = function(x, y) {
  var phi = y, i = 25, delta, phi2, phi4, phi6;
  do {
    phi2 = phi * phi; phi4 = phi2 * phi2;
    phi -= delta = ((phi * (1.01183 + phi4 * phi4 * (-0.02625 + 0.01926 * phi2 - 0.00396 * phi4))) - y) /
      (1.01183 + phi4 * phi4 * ((9 * -0.02625) + (11 * 0.01926) * phi2 + (13 * -0.00396) * phi4));
  } while (abs$1(delta) > epsilon2$1 && --i > 0);
  phi2 = phi * phi; phi4 = phi2 * phi2; phi6 = phi2 * phi4;
  return [
    x / (0.84719 - 0.13063 * phi2 + phi6 * phi6 * (-0.04515 + 0.05494 * phi2 - 0.02326 * phi4 + 0.00331 * phi6)),
    phi
  ];
};

var naturalEarth2 = function() {
  return projection(naturalEarth2Raw)
      .scale(175.295);
};

function nellHammerRaw(lambda, phi) {
  return [
    lambda * (1 + cos$1(phi)) / 2,
    2 * (phi - tan$1(phi / 2))
  ];
}

nellHammerRaw.invert = function(x, y) {
  var p = y / 2;
  for (var i = 0, delta = Infinity; i < 10 && abs$1(delta) > epsilon$1; ++i) {
    var c = cos$1(y / 2);
    y -= delta = (y - tan$1(y / 2) - p) / (1 - 0.5 / (c * c));
  }
  return [
    2 * x / (1 + cos$1(y)),
    y
  ];
};

var nellHammer = function() {
  return projection(nellHammerRaw)
      .scale(152.63);
};

// Based on Java implementation by Bojan Savric.
// https://github.com/OSUCartography/JMapProjLib/blob/master/src/com/jhlabs/map/proj/PattersonProjection.java

var pattersonK1 = 1.0148;
var pattersonK2 = 0.23185;
var pattersonK3 = -0.14499;
var pattersonK4 = 0.02406;
var pattersonC1 = pattersonK1;
var pattersonC2 = 5 * pattersonK2;
var pattersonC3 = 7 * pattersonK3;
var pattersonC4 = 9 * pattersonK4;
var pattersonYmax = 1.790857183;

function pattersonRaw(lambda, phi) {
  var phi2 = phi * phi;
  return [
    lambda,
    phi * (pattersonK1 + phi2 * phi2 * (pattersonK2 + phi2 * (pattersonK3 + pattersonK4 * phi2)))
  ];
}

pattersonRaw.invert = function(x, y) {
  if (y > pattersonYmax) y = pattersonYmax;
  else if (y < -pattersonYmax) y = -pattersonYmax;
  var yc = y, delta;

  do { // Newton-Raphson
    var y2 = yc * yc;
    yc -= delta = ((yc * (pattersonK1 + y2 * y2 * (pattersonK2 + y2 * (pattersonK3 + pattersonK4 * y2)))) - y) / (pattersonC1 + y2 * y2 * (pattersonC2 + y2 * (pattersonC3 + pattersonC4 * y2)));
  } while (abs$1(delta) > epsilon$1);

  return [x, yc];
};

var patterson = function() {
  return projection(pattersonRaw)
      .scale(139.319);
};

function polyconicRaw(lambda, phi) {
  if (abs$1(phi) < epsilon$1) return [lambda, 0];
  var tanPhi = tan$1(phi),
      k = lambda * sin$1(phi);
  return [
    sin$1(k) / tanPhi,
    phi + (1 - cos$1(k)) / tanPhi
  ];
}

polyconicRaw.invert = function(x, y) {
  if (abs$1(y) < epsilon$1) return [x, 0];
  var k = x * x + y * y,
      phi = y * 0.5,
      i = 10, delta;
  do {
    var tanPhi = tan$1(phi),
        secPhi = 1 / cos$1(phi),
        j = k - 2 * y * phi + phi * phi;
    phi -= delta = (tanPhi * j + 2 * (phi - y)) / (2 + j * secPhi * secPhi + 2 * (phi - y) * tanPhi);
  } while (abs$1(delta) > epsilon$1 && --i > 0);
  tanPhi = tan$1(phi);
  return [
    (abs$1(y) < abs$1(phi + 1 / tanPhi) ? asin$1(x * tanPhi) : sign$1(x) * (acos$1(abs$1(x * tanPhi)) + halfPi$1)) / sin$1(phi),
    phi
  ];
};

var polyconic = function() {
  return projection(polyconicRaw)
      .scale(103.74);
};

// Note: 6-element arrays are used to denote the 3x3 affine transform matrix:
// [a, b, c,
//  d, e, f,
//  0, 0, 1] - this redundant row is left out.

// Transform matrix for [a0, a1] -> [b0, b1].
var matrix = function(a, b) {
  var u = subtract(a[1], a[0]),
      v = subtract(b[1], b[0]),
      phi = angle$2(u, v),
      s = length$2(u) / length$2(v);

  return multiply([
    1, 0, a[0][0],
    0, 1, a[0][1]
  ], multiply([
    s, 0, 0,
    0, s, 0
  ], multiply([
    cos$1(phi), sin$1(phi), 0,
    -sin$1(phi), cos$1(phi), 0
  ], [
    1, 0, -b[0][0],
    0, 1, -b[0][1]
  ])));
};

// Inverts a transform matrix.
function inverse(m) {
  var k = 1 / (m[0] * m[4] - m[1] * m[3]);
  return [
    k * m[4], -k * m[1], k * (m[1] * m[5] - m[2] * m[4]),
    -k * m[3], k * m[0], k * (m[2] * m[3] - m[0] * m[5])
  ];
}

// Multiplies two 3x2 matrices.
function multiply(a, b) {
  return [
    a[0] * b[0] + a[1] * b[3],
    a[0] * b[1] + a[1] * b[4],
    a[0] * b[2] + a[1] * b[5] + a[2],
    a[3] * b[0] + a[4] * b[3],
    a[3] * b[1] + a[4] * b[4],
    a[3] * b[2] + a[4] * b[5] + a[5]
  ];
}

// Subtracts 2D vectors.
function subtract(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

// Magnitude of a 2D vector.
function length$2(v) {
  return sqrt$1(v[0] * v[0] + v[1] * v[1]);
}

// Angle between two 2D vectors.
function angle$2(a, b) {
  return atan2$1(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]);
}

// Creates a polyhedral projection.
//  * root: a spanning tree of polygon faces.  Nodes are automatically
//    augmented with a transform matrix.
//  * face: a function that returns the appropriate node for a given {lambda, phi}
//    point (radians).
//  * r: rotation angle for final polyhedral net.  Defaults to -pi / 6 (for
//    butterflies).
var polyhedral = function(root, face, r) {

  r = r == null ? -pi$1 / 6 : r; // TODO automate

  recurse(root, {transform: [
    cos$1(r), sin$1(r), 0,
    -sin$1(r), cos$1(r), 0
  ]});

  function recurse(node, parent) {
    node.edges = faceEdges(node.face);
    // Find shared edge.
    if (parent.face) {
      var shared = node.shared = sharedEdge(node.face, parent.face),
          m = matrix(shared.map(parent.project), shared.map(node.project));
      node.transform = parent.transform ? multiply(parent.transform, m) : m;
      // Replace shared edge in parent edges array.
      var edges = parent.edges;
      for (var i = 0, n = edges.length; i < n; ++i) {
        if (pointEqual$2(shared[0], edges[i][1]) && pointEqual$2(shared[1], edges[i][0])) edges[i] = node;
        if (pointEqual$2(shared[0], edges[i][0]) && pointEqual$2(shared[1], edges[i][1])) edges[i] = node;
      }
      edges = node.edges;
      for (i = 0, n = edges.length; i < n; ++i) {
        if (pointEqual$2(shared[0], edges[i][0]) && pointEqual$2(shared[1], edges[i][1])) edges[i] = parent;
        if (pointEqual$2(shared[0], edges[i][1]) && pointEqual$2(shared[1], edges[i][0])) edges[i] = parent;
      }
    } else {
      node.transform = parent.transform;
    }
    if (node.children) {
      node.children.forEach(function(child) {
        recurse(child, node);
      });
    }
    return node;
  }

  function forward(lambda, phi) {
    var node = face(lambda, phi),
        point = node.project([lambda * degrees$1, phi * degrees$1]),
        t;
    if (t = node.transform) {
      return [
        t[0] * point[0] + t[1] * point[1] + t[2],
        -(t[3] * point[0] + t[4] * point[1] + t[5])
      ];
    }
    point[1] = -point[1];
    return point;
  }

  // Naive inverse!  A faster solution would use bounding boxes, or even a
  // polygonal quadtree.
  if (hasInverse(root)) forward.invert = function(x, y) {
    var coordinates = faceInvert(root, [x, -y]);
    return coordinates && (coordinates[0] *= radians$1, coordinates[1] *= radians$1, coordinates);
  };

  function faceInvert(node, coordinates) {
    var invert = node.project.invert,
        t = node.transform,
        point = coordinates;
    if (t) {
      t = inverse(t);
      point = [
        t[0] * point[0] + t[1] * point[1] + t[2],
        (t[3] * point[0] + t[4] * point[1] + t[5])
      ];
    }
    if (invert && node === faceDegrees(p = invert(point))) return p;
    var p,
        children = node.children;
    for (var i = 0, n = children && children.length; i < n; ++i) {
      if (p = faceInvert(children[i], coordinates)) return p;
    }
  }

  function faceDegrees(coordinates) {
    return face(coordinates[0] * radians$1, coordinates[1] * radians$1);
  }

  var proj = projection(forward),
      stream_ = proj.stream;

  proj.stream = function(stream) {
    var rotate = proj.rotate(),
        rotateStream = stream_(stream),
        sphereStream = (proj.rotate([0, 0]), stream_(stream));
    proj.rotate(rotate);
    rotateStream.sphere = function() {
      sphereStream.polygonStart();
      sphereStream.lineStart();
      outline(sphereStream, root);
      sphereStream.lineEnd();
      sphereStream.polygonEnd();
    };
    return rotateStream;
  };

  return proj;
};

function outline(stream, node, parent) {
  var point,
      edges = node.edges,
      n = edges.length,
      edge,
      multiPoint = {type: "MultiPoint", coordinates: node.face},
      notPoles = node.face.filter(function(d) { return abs$1(d[1]) !== 90; }),
      b = bounds({type: "MultiPoint", coordinates: notPoles}),
      inside = false,
      j = -1,
      dx = b[1][0] - b[0][0];
  // TODO
  var c = dx === 180 || dx === 360
      ? [(b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2]
      : centroid(multiPoint);
  // First find the shared edge…
  if (parent) while (++j < n) {
    if (edges[j] === parent) break;
  }
  ++j;
  for (var i = 0; i < n; ++i) {
    edge = edges[(i + j) % n];
    if (Array.isArray(edge)) {
      if (!inside) {
        stream.point((point = interpolate(edge[0], c)(epsilon$1))[0], point[1]);
        inside = true;
      }
      stream.point((point = interpolate(edge[1], c)(epsilon$1))[0], point[1]);
    } else {
      inside = false;
      if (edge !== parent) outline(stream, edge, node);
    }
  }
}

// Tests equality of two spherical points.
function pointEqual$2(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

// Finds a shared edge given two clockwise polygons.
function sharedEdge(a, b) {
  var x, y, n = a.length, found = null;
  for (var i = 0; i < n; ++i) {
    x = a[i];
    for (var j = b.length; --j >= 0;) {
      y = b[j];
      if (x[0] === y[0] && x[1] === y[1]) {
        if (found) return [found, x];
        found = x;
      }
    }
  }
}

// Converts an array of n face vertices to an array of n + 1 edges.
function faceEdges(face) {
  var n = face.length,
      edges = [];
  for (var a = face[n - 1], i = 0; i < n; ++i) edges.push([a, a = face[i]]);
  return edges;
}

function hasInverse(node) {
  return node.project.invert || node.children && node.children.some(hasInverse);
}

// TODO generate on-the-fly to avoid external modification.
var octahedron = [
  [0, 90],
  [-90, 0], [0, 0], [90, 0], [180, 0],
  [0, -90]
];

var octahedron$1 = [
  [0, 2, 1],
  [0, 3, 2],
  [5, 1, 2],
  [5, 2, 3],
  [0, 1, 4],
  [0, 4, 3],
  [5, 4, 1],
  [5, 3, 4]
].map(function(face) {
  return face.map(function(i) {
    return octahedron[i];
  });
});

var butterfly = function(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = centroid({type: "MultiPoint", coordinates: face});
    return gnomonic().scale(1).translate([0, 0]).rotate([-c[0], -c[1]]);
  };

  var faces = octahedron$1.map(function(face) {
    return {face: face, project: faceProjection(face)};
  });

  [-1, 0, 0, 1, 0, 1, 4, 5].forEach(function(d, i) {
    var node = faces[d];
    node && (node.children || (node.children = [])).push(faces[i]);
  });

  return polyhedral(faces[0], function(lambda, phi) {
        return faces[lambda < -pi$1 / 2 ? phi < 0 ? 6 : 4
            : lambda < 0 ? phi < 0 ? 2 : 0
            : lambda < pi$1 / 2 ? phi < 0 ? 3 : 1
            : phi < 0 ? 7 : 5];
      })
      .scale(101.858)
      .center([0, 45]);
};

var kx = 2 / sqrt$1(3);

function collignonK(a, b) {
  var p = collignonRaw(a, b);
  return [p[0] * kx, p[1]];
}

collignonK.invert = function(x,y) {
  return collignonRaw.invert(x / kx, y);
};

var collignon$1 = function(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = centroid({type: "MultiPoint", coordinates: face});
    return projection(collignonK).translate([0, 0]).scale(1).rotate(c[1] > 0 ? [-c[0], 0] : [180 - c[0], 180]);
  };

  var faces = octahedron$1.map(function(face) {
    return {face: face, project: faceProjection(face)};
  });

  [-1, 0, 0, 1, 0, 1, 4, 5].forEach(function(d, i) {
    var node = faces[d];
    node && (node.children || (node.children = [])).push(faces[i]);
  });

  return polyhedral(faces[0], function(lambda, phi) {
        return faces[lambda < -pi$1 / 2 ? phi < 0 ? 6 : 4
            : lambda < 0 ? phi < 0 ? 2 : 0
            : lambda < pi$1 / 2 ? phi < 0 ? 3 : 1
            : phi < 0 ? 7 : 5];
      })
      .scale(121.906)
      .center([0, 48.5904]);
};

var waterman = function(faceProjection) {

  faceProjection = faceProjection || function(face) {
    var c = face.length === 6 ? centroid({type: "MultiPoint", coordinates: face}) : face[0];
    return gnomonic().scale(1).translate([0, 0]).rotate([-c[0], -c[1]]);
  };

  var w5 = octahedron$1.map(function(face) {
    var xyz = face.map(cartesian$1),
        n = xyz.length,
        a = xyz[n - 1],
        b,
        hexagon = [];
    for (var i = 0; i < n; ++i) {
      b = xyz[i];
      hexagon.push(spherical$1([
        a[0] * 0.9486832980505138 + b[0] * 0.31622776601683794,
        a[1] * 0.9486832980505138 + b[1] * 0.31622776601683794,
        a[2] * 0.9486832980505138 + b[2] * 0.31622776601683794
      ]), spherical$1([
        b[0] * 0.9486832980505138 + a[0] * 0.31622776601683794,
        b[1] * 0.9486832980505138 + a[1] * 0.31622776601683794,
        b[2] * 0.9486832980505138 + a[2] * 0.31622776601683794
      ]));
      a = b;
    }
    return hexagon;
  });

  var cornerNormals = [];

  var parents = [-1, 0, 0, 1, 0, 1, 4, 5];

  w5.forEach(function(hexagon, j) {
    var face = octahedron$1[j],
        n = face.length,
        normals = cornerNormals[j] = [];
    for (var i = 0; i < n; ++i) {
      w5.push([
        face[i],
        hexagon[(i * 2 + 2) % (2 * n)],
        hexagon[(i * 2 + 1) % (2 * n)]
      ]);
      parents.push(j);
      normals.push(cross$1(
        cartesian$1(hexagon[(i * 2 + 2) % (2 * n)]),
        cartesian$1(hexagon[(i * 2 + 1) % (2 * n)])
      ));
    }
  });

  var faces = w5.map(function(face) {
    return {
      project: faceProjection(face),
      face: face
    };
  });

  parents.forEach(function(d, i) {
    var parent = faces[d];
    parent && (parent.children || (parent.children = [])).push(faces[i]);
  });

  function face(lambda, phi) {
    var cosphi = cos$1(phi),
        p = [cosphi * cos$1(lambda), cosphi * sin$1(lambda), sin$1(phi)];

    var hexagon = lambda < -pi$1 / 2 ? phi < 0 ? 6 : 4
        : lambda < 0 ? phi < 0 ? 2 : 0
        : lambda < pi$1 / 2 ? phi < 0 ? 3 : 1
        : phi < 0 ? 7 : 5;

    var n = cornerNormals[hexagon];

    return faces[dot(n[0], p) < 0 ? 8 + 3 * hexagon
        : dot(n[1], p) < 0 ? 8 + 3 * hexagon + 1
        : dot(n[2], p) < 0 ? 8 + 3 * hexagon + 2
        : hexagon];
  }

  return polyhedral(faces[0], face)
      .scale(110.625)
      .center([0,45]);
};

function dot(a, b) {
  for (var i = 0, n = a.length, s = 0; i < n; ++i) s += a[i] * b[i];
  return s;
}

function cross$1(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

// Converts 3D Cartesian to spherical coordinates (degrees).
function spherical$1(cartesian) {
  return [
    atan2$1(cartesian[1], cartesian[0]) * degrees$1,
    asin$1(max$1(-1, min$1(1, cartesian[2]))) * degrees$1
  ];
}

// Converts spherical coordinates (degrees) to 3D Cartesian.
function cartesian$1(coordinates) {
  var lambda = coordinates[0] * radians$1,
      phi = coordinates[1] * radians$1,
      cosphi = cos$1(phi);
  return [
    cosphi * cos$1(lambda),
    cosphi * sin$1(lambda),
    sin$1(phi)
  ];
}

var noop$1 = function() {};

var clockwise = function(ring) {
  if ((n = ring.length) < 4) return false;
  var i = 0,
      n,
      area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
  while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
  return area <= 0;
};

var contains$1 = function(ring, point) {
  var x = point[0],
      y = point[1],
      contains = false;
  for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    var pi = ring[i], xi = pi[0], yi = pi[1],
        pj = ring[j], xj = pj[0], yj = pj[1];
    if (((yi > y) ^ (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) contains = !contains;
  }
  return contains;
};

var index$6 = function(object, projection$$1) {
  var stream = projection$$1.stream, project;
  if (!stream) throw new Error("invalid projection");
  switch (object && object.type) {
    case "Feature": project = projectFeature; break;
    case "FeatureCollection": project = projectFeatureCollection; break;
    default: project = projectGeometry; break;
  }
  return project(object, stream);
};

function projectFeatureCollection(o, stream) {
  return {
    type: "FeatureCollection",
    features: o.features.map(function(f) {
      return projectFeature(f, stream);
    })
  };
}

function projectFeature(o, stream) {
  return {
    type: "Feature",
    id: o.id,
    properties: o.properties,
    geometry: projectGeometry(o.geometry, stream)
  };
}

function projectGeometryCollection(o, stream) {
  return {
    type: "GeometryCollection",
    geometries: o.geometries.map(function(o) {
      return projectGeometry(o, stream);
    })
  };
}

function projectGeometry(o, stream) {
  if (!o) return null;
  if (o.type === "GeometryCollection") return projectGeometryCollection(o, stream);
  var sink;
  switch (o.type) {
    case "Point": sink = sinkPoint; break;
    case "MultiPoint": sink = sinkPoint; break;
    case "LineString": sink = sinkLine; break;
    case "MultiLineString": sink = sinkLine; break;
    case "Polygon": sink = sinkPolygon; break;
    case "MultiPolygon": sink = sinkPolygon; break;
    case "Sphere": sink = sinkPolygon; break;
    default: return null;
  }
  geoStream(o, stream(sink));
  return sink.result();
}

var points = [];
var lines = [];

var sinkPoint = {
  point: function(x, y) {
    points.push([x, y]);
  },
  result: function() {
    var result = !points.length ? null
        : points.length < 2 ? {type: "Point", coordinates: points[0]}
        : {type: "MultiPoint", coordinates: points};
    points = [];
    return result;
  }
};

var sinkLine = {
  lineStart: noop$1,
  point: function(x, y) {
    points.push([x, y]);
  },
  lineEnd: function() {
    if (points.length) lines.push(points), points = [];
  },
  result: function() {
    var result = !lines.length ? null
        : lines.length < 2 ? {type: "LineString", coordinates: lines[0]}
        : {type: "MultiLineString", coordinates: lines};
    lines = [];
    return result;
  }
};

var sinkPolygon = {
  polygonStart: noop$1,
  lineStart: noop$1,
  point: function(x, y) {
    points.push([x, y]);
  },
  lineEnd: function() {
    var n = points.length;
    if (n) {
      do points.push(points[0].slice()); while (++n < 4);
      lines.push(points), points = [];
    }
  },
  polygonEnd: noop$1,
  result: function() {
    if (!lines.length) return null;
    var polygons = [],
        holes = [];

    // https://github.com/d3/d3/issues/1558
    lines.forEach(function(ring) {
      if (clockwise(ring)) polygons.push([ring]);
      else holes.push(ring);
    });

    holes.forEach(function(hole) {
      var point = hole[0];
      polygons.some(function(polygon) {
        if (contains$1(polygon[0], point)) {
          polygon.push(hole);
          return true;
        }
      }) || polygons.push([hole]);
    });

    lines = [];

    return !polygons.length ? null
        : polygons.length > 1 ? {type: "MultiPolygon", coordinates: polygons}
        : {type: "Polygon", coordinates: polygons[0]};
  }
};

var quincuncial = function(project) {
  var dx = project(halfPi$1, 0)[0] - project(-halfPi$1, 0)[0];

  function projectQuincuncial(lambda, phi) {
    var t = abs$1(lambda) < halfPi$1,
        p = project(t ? lambda : lambda > 0 ? lambda - pi$1 : lambda + pi$1, phi),
        x = (p[0] - p[1]) * sqrt1_2,
        y = (p[0] + p[1]) * sqrt1_2;
    if (t) return [x, y];
    var d = dx * sqrt1_2,
        s = x > 0 ^ y > 0 ? -1 : 1;
    return [s * x - sign$1(y) * d, s * y - sign$1(x) * d];
  }

  if (project.invert) projectQuincuncial.invert = function(x0, y0) {
    var x = (x0 + y0) * sqrt1_2,
        y = (y0 - x0) * sqrt1_2,
        t = abs$1(x) < 0.5 * dx && abs$1(y) < 0.5 * dx;

    if (!t) {
      var d = dx * sqrt1_2,
          s = x > 0 ^ y > 0 ? -1 : 1,
          x1 = -s * x0 + (y > 0 ? 1 : -1) * d,
          y1 = -s * y0 + (x > 0 ? 1 : -1) * d;
      x = (-x1 - y1) * sqrt1_2;
      y = (x1 - y1) * sqrt1_2;
    }

    var p = project.invert(x, y);
    if (!t) p[0] += x > 0 ? pi$1 : -pi$1;
    return p;
  };

  return projection(projectQuincuncial)
      .rotate([-90, -90, 45])
      .clipAngle(180 - 1e-3);
};

var gringorten$1 = function() {
  return quincuncial(gringortenRaw)
      .scale(176.423);
};

var peirce = function() {
  return quincuncial(guyouRaw)
      .scale(111.48);
};

var quantize = function(input, digits) {
  if (!(0 <= (digits = +digits) && digits <= 20)) throw new Error("invalid digits");

  function quantizePoint(input) {
    var n = input.length, i = 2, output = new Array(n);
    output[0] = +input[0].toFixed(digits);
    output[1] = +input[1].toFixed(digits);
    while (i < n) output[i] = input[i], ++i;
    return output;
  }

  function quantizePoints(input) {
    return input.map(quantizePoint);
  }

  function quantizePolygon(input) {
    return input.map(quantizePoints);
  }

  function quantizeGeometry(input) {
    if (input == null) return input;
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(quantizeGeometry)}; break;
      case "Point": output = {type: "Point", coordinates: quantizePoint(input.coordinates)}; break;
      case "MultiPoint": case "LineString": output = {type: input.type, coordinates: quantizePoints(input.coordinates)}; break;
      case "MultiLineString": case "Polygon": output = {type: input.type, coordinates: quantizePolygon(input.coordinates)}; break;
      case "MultiPolygon": output = {type: "MultiPolygon", coordinates: input.coordinates.map(quantizePolygon)}; break;
      default: return input;
    }
    if (input.bbox != null) output.bbox = input.bbox;
    return output;
  }

  function quantizeFeature(input) {
    var output = {type: "Feature", properties: input.properties, geometry: quantizeGeometry(input.geometry)};
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    return output;
  }

  if (input != null) switch (input.type) {
    case "Feature": return quantizeFeature(input);
    case "FeatureCollection": {
      var output = {type: "FeatureCollection", features: input.features.map(quantizeFeature)};
      if (input.bbox != null) output.bbox = input.bbox;
      return output;
    }
    default: return quantizeGeometry(input);
  }

  return input;
};

function rectangularPolyconicRaw(phi0) {
  var sinPhi0 = sin$1(phi0);

  function forward(lambda, phi) {
    var A = sinPhi0 ? tan$1(lambda * sinPhi0 / 2) / sinPhi0 : lambda / 2;
    if (!phi) return [2 * A, -phi0];
    var E = 2 * atan$1(A * sin$1(phi)),
        cotPhi = 1 / tan$1(phi);
    return [
      sin$1(E) * cotPhi,
      phi + (1 - cos$1(E)) * cotPhi - phi0
    ];
  }

  // TODO return null for points outside outline.
  forward.invert = function(x, y) {
    if (abs$1(y += phi0) < epsilon$1) return [sinPhi0 ? 2 * atan$1(sinPhi0 * x / 2) / sinPhi0 : x, 0];
    var k = x * x + y * y,
        phi = 0,
        i = 10, delta;
    do {
      var tanPhi = tan$1(phi),
          secPhi = 1 / cos$1(phi),
          j = k - 2 * y * phi + phi * phi;
      phi -= delta = (tanPhi * j + 2 * (phi - y)) / (2 + j * secPhi * secPhi + 2 * (phi - y) * tanPhi);
    } while (abs$1(delta) > epsilon$1 && --i > 0);
    var E = x * (tanPhi = tan$1(phi)),
        A = tan$1(abs$1(y) < abs$1(phi + 1 / tanPhi) ? asin$1(E) * 0.5 : acos$1(E) * 0.5 + pi$1 / 4) / sin$1(phi);
    return [
      sinPhi0 ? 2 * atan$1(sinPhi0 * A) / sinPhi0 : 2 * A,
      phi
    ];
  };

  return forward;
}

var rectangularPolyconic = function() {
  return parallel1(rectangularPolyconicRaw)
      .scale(131.215);
};

var K = [
  [0.9986, -0.062],
  [1.0000, 0.0000],
  [0.9986, 0.0620],
  [0.9954, 0.1240],
  [0.9900, 0.1860],
  [0.9822, 0.2480],
  [0.9730, 0.3100],
  [0.9600, 0.3720],
  [0.9427, 0.4340],
  [0.9216, 0.4958],
  [0.8962, 0.5571],
  [0.8679, 0.6176],
  [0.8350, 0.6769],
  [0.7986, 0.7346],
  [0.7597, 0.7903],
  [0.7186, 0.8435],
  [0.6732, 0.8936],
  [0.6213, 0.9394],
  [0.5722, 0.9761],
  [0.5322, 1.0000]
];

K.forEach(function(d) {
  d[1] *= 1.0144;
});

function robinsonRaw(lambda, phi) {
  var i = min$1(18, abs$1(phi) * 36 / pi$1),
      i0 = floor$1(i),
      di = i - i0,
      ax = (k = K[i0])[0],
      ay = k[1],
      bx = (k = K[++i0])[0],
      by = k[1],
      cx = (k = K[min$1(19, ++i0)])[0],
      cy = k[1],
      k;
  return [
    lambda * (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2),
    (phi > 0 ? halfPi$1 : -halfPi$1) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2)
  ];
}

robinsonRaw.invert = function(x, y) {
  var yy = y / halfPi$1,
      phi = yy * 90,
      i = min$1(18, abs$1(phi / 5)),
      i0 = max$1(0, floor$1(i));
  do {
    var ay = K[i0][1],
        by = K[i0 + 1][1],
        cy = K[min$1(19, i0 + 2)][1],
        u = cy - ay,
        v = cy - 2 * by + ay,
        t = 2 * (abs$1(yy) - by) / u,
        c = v / u,
        di = t * (1 - c * t * (1 - 2 * c * t));
    if (di >= 0 || i0 === 1) {
      phi = (y >= 0 ? 5 : -5) * (di + i);
      var j = 50, delta;
      do {
        i = min$1(18, abs$1(phi) / 5);
        i0 = floor$1(i);
        di = i - i0;
        ay = K[i0][1];
        by = K[i0 + 1][1];
        cy = K[min$1(19, i0 + 2)][1];
        phi -= (delta = (y >= 0 ? halfPi$1 : -halfPi$1) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2) - y) * degrees$1;
      } while (abs$1(delta) > epsilon2$1 && --j > 0);
      break;
    }
  } while (--i0 >= 0);
  var ax = K[i0][0],
      bx = K[i0 + 1][0],
      cx = K[min$1(19, i0 + 2)][0];
  return [
    x / (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2),
    phi * radians$1
  ];
};

var robinson = function() {
  return projection(robinsonRaw)
      .scale(152.63);
};

function satelliteVerticalRaw(P) {
  function forward(lambda, phi) {
    var cosPhi = cos$1(phi),
        k = (P - 1) / (P - cosPhi * cos$1(lambda));
    return [
      k * cosPhi * sin$1(lambda),
      k * sin$1(phi)
    ];
  }

  forward.invert = function(x, y) {
    var rho2 = x * x + y * y,
        rho = sqrt$1(rho2),
        sinc = (P - sqrt$1(1 - rho2 * (P + 1) / (P - 1))) / ((P - 1) / rho + rho / (P - 1));
    return [
      atan2$1(x * sinc, rho * sqrt$1(1 - sinc * sinc)),
      rho ? asin$1(y * sinc / rho) : 0
    ];
  };

  return forward;
}

function satelliteRaw(P, omega) {
  var vertical = satelliteVerticalRaw(P);
  if (!omega) return vertical;
  var cosOmega = cos$1(omega),
      sinOmega = sin$1(omega);

  function forward(lambda, phi) {
    var coordinates = vertical(lambda, phi),
        y = coordinates[1],
        A = y * sinOmega / (P - 1) + cosOmega;
    return [
      coordinates[0] * cosOmega / A,
      y / A
    ];
  }

  forward.invert = function(x, y) {
    var k = (P - 1) / (P - 1 - y * sinOmega);
    return vertical.invert(k * x, k * y * cosOmega);
  };

  return forward;
}

var satellite = function() {
  var distance$$1 = 2,
      omega = 0,
      m = projectionMutator(satelliteRaw),
      p = m(distance$$1, omega);

  // As a multiple of radius.
  p.distance = function(_) {
    if (!arguments.length) return distance$$1;
    return m(distance$$1 = +_, omega);
  };

  p.tilt = function(_) {
    if (!arguments.length) return omega * degrees$1;
    return m(distance$$1, omega = _ * radians$1);
  };

  return p
      .scale(432.147)
      .clipAngle(acos$1(1 / distance$$1) * degrees$1 - 1e-6);
};

var epsilon$2 = 1e-4;
var epsilonInverse = 1e4;
var x0$5 = -180;
var x0e = x0$5 + epsilon$2;
var x1$1 = 180;
var x1e = x1$1 - epsilon$2;
var y0$5 = -90;
var y0e = y0$5 + epsilon$2;
var y1$1 = 90;
var y1e = y1$1 - epsilon$2;

function nonempty(coordinates) {
  return coordinates.length > 0;
}

function quantize$1(x) {
  return Math.floor(x * epsilonInverse) / epsilonInverse;
}

function normalizePoint(y) {
  return y === y0$5 || y === y1$1 ? [0, y] : [x0$5, quantize$1(y)]; // pole or antimeridian?
}

function clampPoint(p) {
  var x = p[0], y = p[1], clamped = false;
  if (x <= x0e) x = x0$5, clamped = true;
  else if (x >= x1e) x = x1$1, clamped = true;
  if (y <= y0e) y = y0$5, clamped = true;
  else if (y >= y1e) y = y1$1, clamped = true;
  return clamped ? [x, y] : p;
}

function clampPoints(points) {
  return points.map(clampPoint);
}

// For each ring, detect where it crosses the antimeridian or pole.
function extractFragments(rings, polygon, fragments) {
  for (var j = 0, m = rings.length; j < m; ++j) {
    var ring = rings[j].slice();

    // By default, assume that this ring doesn’t need any stitching.
    fragments.push({index: -1, polygon: polygon, ring: ring});

    for (var i = 0, n = ring.length; i < n; ++i) {
      var point = ring[i],
          x = point[0],
          y = point[1];

      // If this is an antimeridian or polar point…
      if (x <= x0e || x >= x1e || y <= y0e || y >= y1e) {
        ring[i] = clampPoint(point);

        // Advance through any antimeridian or polar points…
        for (var k = i + 1; k < n; ++k) {
          var pointk = ring[k],
              xk = pointk[0],
              yk = pointk[1];
          if (xk > x0e && xk < x1e && yk > y0e && yk < y1e) break;
        }

        // If this was just a single antimeridian or polar point,
        // we don’t need to cut this ring into a fragment;
        // we can just leave it as-is.
        if (k === i + 1) continue;

        // Otherwise, if this is not the first point in the ring,
        // cut the current fragment so that it ends at the current point.
        // The current point is also normalized for later joining.
        if (i) {
          var fragmentBefore = {index: -1, polygon: polygon, ring: ring.slice(0, i + 1)};
          fragmentBefore.ring[fragmentBefore.ring.length - 1] = normalizePoint(y);
          fragments[fragments.length - 1] = fragmentBefore;
        }

        // If the ring started with an antimeridian fragment,
        // we can ignore that fragment entirely.
        else fragments.pop();

        // If the remainder of the ring is an antimeridian fragment,
        // move on to the next ring.
        if (k >= n) break;

        // Otherwise, add the remaining ring fragment and continue.
        fragments.push({index: -1, polygon: polygon, ring: ring = ring.slice(k - 1)});
        ring[0] = normalizePoint(ring[0][1]);
        i = -1;
        n = ring.length;
      }
    }
  }
}

// Now stitch the fragments back together into rings.
function stitchFragments(fragments) {
  var i, n = fragments.length;

  // To connect the fragments start-to-end, create a simple index by end.
  var fragmentByStart = {},
      fragmentByEnd = {},
      fragment,
      start,
      startFragment,
      end,
      endFragment;

  // For each fragment…
  for (i = 0; i < n; ++i) {
    fragment = fragments[i];
    start = fragment.ring[0];
    end = fragment.ring[fragment.ring.length - 1];

    // If this fragment is closed, add it as a standalone ring.
    if (start[0] === end[0] && start[1] === end[1]) {
      fragment.polygon.push(fragment.ring);
      fragments[i] = null;
      continue;
    }

    fragment.index = i;
    fragmentByStart[start] = fragmentByEnd[end] = fragment;
  }

  // For each open fragment…
  for (i = 0; i < n; ++i) {
    fragment = fragments[i];
    if (fragment) {
      start = fragment.ring[0];
      end = fragment.ring[fragment.ring.length - 1];
      startFragment = fragmentByEnd[start];
      endFragment = fragmentByStart[end];

      delete fragmentByStart[start];
      delete fragmentByEnd[end];

      // If this fragment is closed, add it as a standalone ring.
      if (start[0] === end[0] && start[1] === end[1]) {
        fragment.polygon.push(fragment.ring);
        continue;
      }

      if (startFragment) {
        delete fragmentByEnd[start];
        delete fragmentByStart[startFragment.ring[0]];
        startFragment.ring.pop(); // drop the shared coordinate
        fragments[startFragment.index] = null;
        fragment = {index: -1, polygon: startFragment.polygon, ring: startFragment.ring.concat(fragment.ring)};

        if (startFragment === endFragment) {
          // Connect both ends to this single fragment to create a ring.
          fragment.polygon.push(fragment.ring);
        } else {
          fragment.index = n++;
          fragments.push(fragmentByStart[fragment.ring[0]] = fragmentByEnd[fragment.ring[fragment.ring.length - 1]] = fragment);
        }
      } else if (endFragment) {
        delete fragmentByStart[end];
        delete fragmentByEnd[endFragment.ring[endFragment.ring.length - 1]];
        fragment.ring.pop(); // drop the shared coordinate
        fragment = {index: n++, polygon: endFragment.polygon, ring: fragment.ring.concat(endFragment.ring)};
        fragments[endFragment.index] = null;
        fragments.push(fragmentByStart[fragment.ring[0]] = fragmentByEnd[fragment.ring[fragment.ring.length - 1]] = fragment);
      } else {
        fragment.ring.push(fragment.ring[0]); // close ring
        fragment.polygon.push(fragment.ring);
      }
    }
  }
}

function stitchFeature(input) {
  var output = {type: "Feature", geometry: stitchGeometry(input.geometry)};
  if (input.id != null) output.id = input.id;
  if (input.bbox != null) output.bbox = input.bbox;
  if (input.properties != null) output.properties = input.properties;
  return output;
}

function stitchGeometry(input) {
  if (input == null) return input;
  var output, fragments, i, n;
  switch (input.type) {
    case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(stitchGeometry)}; break;
    case "Point": output = {type: "Point", coordinates: clampPoint(input.coordinates)}; break;
    case "MultiPoint": case "LineString": output = {type: input.type, coordinates: clampPoints(input.coordinates)}; break;
    case "MultiLineString": output = {type: "MultiLineString", coordinates: input.coordinates.map(clampPoints)}; break;
    case "Polygon": {
      var polygon = [];
      extractFragments(input.coordinates, polygon, fragments = []);
      stitchFragments(fragments);
      output = {type: "Polygon", coordinates: polygon};
      break;
    }
    case "MultiPolygon": {
      fragments = [], i = -1, n = input.coordinates.length;
      var polygons = new Array(n);
      while (++i < n) extractFragments(input.coordinates[i], polygons[i] = [], fragments);
      stitchFragments(fragments);
      output = {type: "MultiPolygon", coordinates: polygons.filter(nonempty)};
      break;
    }
    default: return input;
  }
  if (input.bbox != null) output.bbox = input.bbox;
  return output;
}

var stitch = function(input) {
  if (input == null) return input;
  switch (input.type) {
    case "Feature": return stitchFeature(input);
    case "FeatureCollection": {
      var output = {type: "FeatureCollection", features: input.features.map(stitchFeature)};
      if (input.bbox != null) output.bbox = input.bbox;
      return output;
    }
    default: return stitchGeometry(input);
  }
};

function timesRaw(lambda, phi) {
  var t = tan$1(phi / 2),
      s = sin$1(quarterPi$1 * t);
  return [
    lambda * (0.74482 - 0.34588 * s * s),
    1.70711 * t
  ];
}

timesRaw.invert = function(x, y) {
  var t = y / 1.70711,
      s = sin$1(quarterPi$1 * t);
  return [
    x / (0.74482 - 0.34588 * s * s),
    2 * atan$1(t)
  ];
};

var times = function() {
  return projection(timesRaw)
      .scale(146.153);
};

// Compute the origin as the midpoint of the two reference points.
// Rotate one of the reference points by the origin.
// Apply the spherical law of sines to compute gamma rotation.
var twoPoint = function(raw, p0, p1) {
  var i = interpolate(p0, p1),
      o = i(0.5),
      a = rotation([-o[0], -o[1]])(p0),
      b = i.distance / 2,
      y = -asin$1(sin$1(a[1] * radians$1) / sin$1(b)),
      R = [-o[0], -o[1], -(a[0] > 0 ? pi$1 - y : y) * degrees$1],
      p = projection(raw(b)).rotate(R),
      r = rotation(R),
      center = p.center;

  delete p.rotate;

  p.center = function(_) {
    return arguments.length ? center(r(_)) : r.invert(center());
  };

  return p
      .clipAngle(90);
};

function twoPointAzimuthalRaw(d) {
  var cosd = cos$1(d);

  function forward(lambda, phi) {
    var coordinates = gnomonicRaw(lambda, phi);
    coordinates[0] *= cosd;
    return coordinates;
  }

  forward.invert = function(x, y) {
    return gnomonicRaw.invert(x / cosd, y);
  };

  return forward;
}

function twoPointAzimuthalUsa() {
  return twoPointAzimuthal([-158, 21.5], [-77, 39])
      .clipAngle(60)
      .scale(400);
}

function twoPointAzimuthal(p0, p1) {
  return twoPoint(twoPointAzimuthalRaw, p0, p1);
}

// TODO clip to ellipse
function twoPointEquidistantRaw(z0) {
  if (!(z0 *= 2)) return azimuthalEquidistantRaw;
  var lambdaa = -z0 / 2,
      lambdab = -lambdaa,
      z02 = z0 * z0,
      tanLambda0 = tan$1(lambdab),
      S = 0.5 / sin$1(lambdab);

  function forward(lambda, phi) {
    var za = acos$1(cos$1(phi) * cos$1(lambda - lambdaa)),
        zb = acos$1(cos$1(phi) * cos$1(lambda - lambdab)),
        ys = phi < 0 ? -1 : 1;
    za *= za, zb *= zb;
    return [
      (za - zb) / (2 * z0),
      ys * sqrt$1(4 * z02 * zb - (z02 - za + zb) * (z02 - za + zb)) / (2 * z0)
    ];
  }

  forward.invert = function(x, y) {
    var y2 = y * y,
        cosza = cos$1(sqrt$1(y2 + (t = x + lambdaa) * t)),
        coszb = cos$1(sqrt$1(y2 + (t = x + lambdab) * t)),
        t,
        d;
    return [
      atan2$1(d = cosza - coszb, t = (cosza + coszb) * tanLambda0),
      (y < 0 ? -1 : 1) * acos$1(sqrt$1(t * t + d * d) * S)
    ];
  };

  return forward;
}

function twoPointEquidistantUsa() {
  return twoPointEquidistant([-158, 21.5], [-77, 39])
      .clipAngle(130)
      .scale(122.571);
}

function twoPointEquidistant(p0, p1) {
  return twoPoint(twoPointEquidistantRaw, p0, p1);
}

function vanDerGrintenRaw(lambda, phi) {
  if (abs$1(phi) < epsilon$1) return [lambda, 0];
  var sinTheta = abs$1(phi / halfPi$1),
      theta = asin$1(sinTheta);
  if (abs$1(lambda) < epsilon$1 || abs$1(abs$1(phi) - halfPi$1) < epsilon$1) return [0, sign$1(phi) * pi$1 * tan$1(theta / 2)];
  var cosTheta = cos$1(theta),
      A = abs$1(pi$1 / lambda - lambda / pi$1) / 2,
      A2 = A * A,
      G = cosTheta / (sinTheta + cosTheta - 1),
      P = G * (2 / sinTheta - 1),
      P2 = P * P,
      P2_A2 = P2 + A2,
      G_P2 = G - P2,
      Q = A2 + G;
  return [
    sign$1(lambda) * pi$1 * (A * G_P2 + sqrt$1(A2 * G_P2 * G_P2 - P2_A2 * (G * G - P2))) / P2_A2,
    sign$1(phi) * pi$1 * (P * Q - A * sqrt$1((A2 + 1) * P2_A2 - Q * Q)) / P2_A2
  ];
}

vanDerGrintenRaw.invert = function(x, y) {
  if (abs$1(y) < epsilon$1) return [x, 0];
  if (abs$1(x) < epsilon$1) return [0, halfPi$1 * sin$1(2 * atan$1(y / pi$1))];
  var x2 = (x /= pi$1) * x,
      y2 = (y /= pi$1) * y,
      x2_y2 = x2 + y2,
      z = x2_y2 * x2_y2,
      c1 = -abs$1(y) * (1 + x2_y2),
      c2 = c1 - 2 * y2 + x2,
      c3 = -2 * c1 + 1 + 2 * y2 + z,
      d = y2 / c3 + (2 * c2 * c2 * c2 / (c3 * c3 * c3) - 9 * c1 * c2 / (c3 * c3)) / 27,
      a1 = (c1 - c2 * c2 / (3 * c3)) / c3,
      m1 = 2 * sqrt$1(-a1 / 3),
      theta1 = acos$1(3 * d / (a1 * m1)) / 3;
  return [
    pi$1 * (x2_y2 - 1 + sqrt$1(1 + 2 * (x2 - y2) + z)) / (2 * x),
    sign$1(y) * pi$1 * (-m1 * cos$1(theta1 + pi$1 / 3) - c2 / (3 * c3))
  ];
};

var vanDerGrinten = function() {
  return projection(vanDerGrintenRaw)
      .scale(79.4183);
};

function vanDerGrinten2Raw(lambda, phi) {
  if (abs$1(phi) < epsilon$1) return [lambda, 0];
  var sinTheta = abs$1(phi / halfPi$1),
      theta = asin$1(sinTheta);
  if (abs$1(lambda) < epsilon$1 || abs$1(abs$1(phi) - halfPi$1) < epsilon$1) return [0, sign$1(phi) * pi$1 * tan$1(theta / 2)];
  var cosTheta = cos$1(theta),
      A = abs$1(pi$1 / lambda - lambda / pi$1) / 2,
      A2 = A * A,
      x1 = cosTheta * (sqrt$1(1 + A2) - A * cosTheta) / (1 + A2 * sinTheta * sinTheta);
  return [
    sign$1(lambda) * pi$1 * x1,
    sign$1(phi) * pi$1 * sqrt$1(1 - x1 * (2 * A + x1))
  ];
}

vanDerGrinten2Raw.invert = function(x, y) {
  if (!x) return [0, halfPi$1 * sin$1(2 * atan$1(y / pi$1))];
  var x1 = abs$1(x / pi$1),
      A = (1 - x1 * x1 - (y /= pi$1) * y) / (2 * x1),
      A2 = A * A,
      B = sqrt$1(A2 + 1);
  return [
    sign$1(x) * pi$1 * (B - A),
    sign$1(y) * halfPi$1 * sin$1(2 * atan2$1(sqrt$1((1 - 2 * A * x1) * (A + B) - x1), sqrt$1(B + A + x1)))
  ];
};

var vanDerGrinten2 = function() {
  return projection(vanDerGrinten2Raw)
      .scale(79.4183);
};

function vanDerGrinten3Raw(lambda, phi) {
  if (abs$1(phi) < epsilon$1) return [lambda, 0];
  var sinTheta = phi / halfPi$1,
      theta = asin$1(sinTheta);
  if (abs$1(lambda) < epsilon$1 || abs$1(abs$1(phi) - halfPi$1) < epsilon$1) return [0, pi$1 * tan$1(theta / 2)];
  var A = (pi$1 / lambda - lambda / pi$1) / 2,
      y1 = sinTheta / (1 + cos$1(theta));
  return [
    pi$1 * (sign$1(lambda) * sqrt$1(A * A + 1 - y1 * y1) - A),
    pi$1 * y1
  ];
}

vanDerGrinten3Raw.invert = function(x, y) {
  if (!y) return [x, 0];
  var y1 = y / pi$1,
      A = (pi$1 * pi$1 * (1 - y1 * y1) - x * x) / (2 * pi$1 * x);
  return [
    x ? pi$1 * (sign$1(x) * sqrt$1(A * A + 1) - A) : 0,
    halfPi$1 * sin$1(2 * atan$1(y1))
  ];
};

var vanDerGrinten3 = function() {
  return projection(vanDerGrinten3Raw)
        .scale(79.4183);
};

function vanDerGrinten4Raw(lambda, phi) {
  if (!phi) return [lambda, 0];
  var phi0 = abs$1(phi);
  if (!lambda || phi0 === halfPi$1) return [0, phi];
  var B = phi0 / halfPi$1,
      B2 = B * B,
      C = (8 * B - B2 * (B2 + 2) - 5) / (2 * B2 * (B - 1)),
      C2 = C * C,
      BC = B * C,
      B_C2 = B2 + C2 + 2 * BC,
      B_3C = B + 3 * C,
      lambda0 = lambda / halfPi$1,
      lambda1 = lambda0 + 1 / lambda0,
      D = sign$1(abs$1(lambda) - halfPi$1) * sqrt$1(lambda1 * lambda1 - 4),
      D2 = D * D,
      F = B_C2 * (B2 + C2 * D2 - 1) + (1 - B2) * (B2 * (B_3C * B_3C + 4 * C2) + 12 * BC * C2 + 4 * C2 * C2),
      x1 = (D * (B_C2 + C2 - 1) + 2 * sqrt$1(F)) / (4 * B_C2 + D2);
  return [
    sign$1(lambda) * halfPi$1 * x1,
    sign$1(phi) * halfPi$1 * sqrt$1(1 + D * abs$1(x1) - x1 * x1)
  ];
}

vanDerGrinten4Raw.invert = function(x, y) {
  var delta;
  if (!x || !y) return [x, y];
  y /= pi$1;
  var x1 = sign$1(x) * x / halfPi$1,
      D = (x1 * x1 - 1 + 4 * y * y) / abs$1(x1),
      D2 = D * D,
      B = 2 * y,
      i = 50;
  do {
    var B2 = B * B,
        C = (8 * B - B2 * (B2 + 2) - 5) / (2 * B2 * (B - 1)),
        C_ = (3 * B - B2 * B - 10) / (2 * B2 * B),
        C2 = C * C,
        BC = B * C,
        B_C = B + C,
        B_C2 = B_C * B_C,
        B_3C = B + 3 * C,
        F = B_C2 * (B2 + C2 * D2 - 1) + (1 - B2) * (B2 * (B_3C * B_3C + 4 * C2) + C2 * (12 * BC + 4 * C2)),
        F_ = -2 * B_C * (4 * BC * C2 + (1 - 4 * B2 + 3 * B2 * B2) * (1 + C_) + C2 * (-6 + 14 * B2 - D2 + (-8 + 8 * B2 - 2 * D2) * C_) + BC * (-8 + 12 * B2 + (-10 + 10 * B2 - D2) * C_)),
        sqrtF = sqrt$1(F),
        f = D * (B_C2 + C2 - 1) + 2 * sqrtF - x1 * (4 * B_C2 + D2),
        f_ = D * (2 * C * C_ + 2 * B_C * (1 + C_)) + F_ / sqrtF - 8 * B_C * (D * (-1 + C2 + B_C2) + 2 * sqrtF) * (1 + C_) / (D2 + 4 * B_C2);
    B -= delta = f / f_;
  } while (delta > epsilon$1 && --i > 0);
  return [
    sign$1(x) * (sqrt$1(D * D + 4) + D) * pi$1 / 4,
    halfPi$1 * B
  ];
};

var vanDerGrinten4 = function() {
  return projection(vanDerGrinten4Raw)
      .scale(127.16);
};

var A = 4 * pi$1 + 3 * sqrt$1(3);
var B = 2 * sqrt$1(2 * pi$1 * sqrt$1(3) / A);

var wagner4Raw = mollweideBromleyRaw(B * sqrt$1(3) / pi$1, B, A / 6);

var wagner4 = function() {
  return projection(wagner4Raw)
      .scale(176.84);
};

function wagner6Raw(lambda, phi) {
  return [lambda * sqrt$1(1 - 3 * phi * phi / (pi$1 * pi$1)), phi];
}

wagner6Raw.invert = function(x, y) {
  return [x / sqrt$1(1 - 3 * y * y / (pi$1 * pi$1)), y];
};

var wagner6 = function() {
  return projection(wagner6Raw)
      .scale(152.63);
};

function wagner7Raw(lambda, phi) {
  var s = 0.90631 * sin$1(phi),
      c0 = sqrt$1(1 - s * s),
      c1 = sqrt$1(2 / (1 + c0 * cos$1(lambda /= 3)));
  return [
    2.66723 * c0 * c1 * sin$1(lambda),
    1.24104 * s * c1
  ];
}

wagner7Raw.invert = function(x, y) {
  var t1 = x / 2.66723,
      t2 = y / 1.24104,
      p = sqrt$1(t1 * t1 + t2 * t2),
      c = 2 * asin$1(p / 2);
  return [
    3 * atan2$1(x * tan$1(c), 2.66723 * p),
    p && asin$1(y * sin$1(c) / (1.24104 * 0.90631 * p))
  ];
};

var wagner7 = function() {
  return projection(wagner7Raw)
      .scale(172.632);
};

function wiechelRaw(lambda, phi) {
  var cosPhi = cos$1(phi),
      sinPhi = cos$1(lambda) * cosPhi,
      sin1_Phi = 1 - sinPhi,
      cosLambda = cos$1(lambda = atan2$1(sin$1(lambda) * cosPhi, -sin$1(phi))),
      sinLambda = sin$1(lambda);
  cosPhi = sqrt$1(1 - sinPhi * sinPhi);
  return [
    sinLambda * cosPhi - cosLambda * sin1_Phi,
    -cosLambda * cosPhi - sinLambda * sin1_Phi
  ];
}

wiechelRaw.invert = function(x, y) {
  var w = (x * x + y * y) / -2,
      k = sqrt$1(-w * (2 + w)),
      b = y * w + x * k,
      a = x * w - y * k,
      D = sqrt$1(a * a + b * b);
  return [
    atan2$1(k * b, D * (1 + w)),
    D ? -asin$1(k * a / D) : 0
  ];
};

var wiechel = function() {
  return projection(wiechelRaw)
      .rotate([0, -90, 45])
      .scale(124.75)
      .clipAngle(180 - 1e-3);
};

function winkel3Raw(lambda, phi) {
  var coordinates = aitoffRaw(lambda, phi);
  return [
    (coordinates[0] + lambda / halfPi$1) / 2,
    (coordinates[1] + phi) / 2
  ];
}

winkel3Raw.invert = function(x, y) {
  var lambda = x, phi = y, i = 25;
  do {
    var cosphi = cos$1(phi),
        sinphi = sin$1(phi),
        sin_2phi = sin$1(2 * phi),
        sin2phi = sinphi * sinphi,
        cos2phi = cosphi * cosphi,
        sinlambda = sin$1(lambda),
        coslambda_2 = cos$1(lambda / 2),
        sinlambda_2 = sin$1(lambda / 2),
        sin2lambda_2 = sinlambda_2 * sinlambda_2,
        C = 1 - cos2phi * coslambda_2 * coslambda_2,
        E = C ? acos$1(cosphi * coslambda_2) * sqrt$1(F = 1 / C) : F = 0,
        F,
        fx = 0.5 * (2 * E * cosphi * sinlambda_2 + lambda / halfPi$1) - x,
        fy = 0.5 * (E * sinphi + phi) - y,
        dxdlambda = 0.5 * F * (cos2phi * sin2lambda_2 + E * cosphi * coslambda_2 * sin2phi) + 0.5 / halfPi$1,
        dxdphi = F * (sinlambda * sin_2phi / 4 - E * sinphi * sinlambda_2),
        dydlambda = 0.125 * F * (sin_2phi * sinlambda_2 - E * sinphi * cos2phi * sinlambda),
        dydphi = 0.5 * F * (sin2phi * coslambda_2 + E * sin2lambda_2 * cosphi) + 0.5,
        denominator = dxdphi * dydlambda - dydphi * dxdlambda,
        dlambda = (fy * dxdphi - fx * dydphi) / denominator,
        dphi = (fx * dydlambda - fy * dxdlambda) / denominator;
    lambda -= dlambda, phi -= dphi;
  } while ((abs$1(dlambda) > epsilon$1 || abs$1(dphi) > epsilon$1) && --i > 0);
  return [lambda, phi];
};

var winkel3 = function() {
  return projection(winkel3Raw)
      .scale(158.837);
};



var index$5 = Object.freeze({
	geoAiry: airy,
	geoAiryRaw: airyRaw,
	geoAitoff: aitoff,
	geoAitoffRaw: aitoffRaw,
	geoArmadillo: armadillo,
	geoArmadilloRaw: armadilloRaw,
	geoAugust: august,
	geoAugustRaw: augustRaw,
	geoBaker: baker,
	geoBakerRaw: bakerRaw,
	geoBerghaus: berghaus,
	geoBerghausRaw: berghausRaw,
	geoBoggs: boggs,
	geoBoggsRaw: boggsRaw,
	geoBonne: bonne,
	geoBonneRaw: bonneRaw,
	geoBottomley: bottomley,
	geoBottomleyRaw: bottomleyRaw,
	geoBromley: bromley,
	geoBromleyRaw: bromleyRaw,
	geoChamberlin: chamberlin,
	geoChamberlinRaw: chamberlinRaw,
	geoChamberlinAfrica: chamberlinAfrica,
	geoCollignon: collignon,
	geoCollignonRaw: collignonRaw,
	geoCraig: craig,
	geoCraigRaw: craigRaw,
	geoCraster: craster,
	geoCrasterRaw: crasterRaw,
	geoCylindricalEqualArea: cylindricalEqualArea,
	geoCylindricalEqualAreaRaw: cylindricalEqualAreaRaw$1,
	geoCylindricalStereographic: cylindricalStereographic,
	geoCylindricalStereographicRaw: cylindricalStereographicRaw,
	geoEckert1: eckert1,
	geoEckert1Raw: eckert1Raw,
	geoEckert2: eckert2,
	geoEckert2Raw: eckert2Raw,
	geoEckert3: eckert3,
	geoEckert3Raw: eckert3Raw,
	geoEckert4: eckert4,
	geoEckert4Raw: eckert4Raw,
	geoEckert5: eckert5,
	geoEckert5Raw: eckert5Raw,
	geoEckert6: eckert6,
	geoEckert6Raw: eckert6Raw,
	geoEisenlohr: eisenlohr,
	geoEisenlohrRaw: eisenlohrRaw,
	geoFahey: fahey,
	geoFaheyRaw: faheyRaw,
	geoFoucaut: foucaut,
	geoFoucautRaw: foucautRaw,
	geoGilbert: gilbert,
	geoGingery: gingery,
	geoGingeryRaw: gingeryRaw,
	geoGinzburg4: ginzburg4,
	geoGinzburg4Raw: ginzburg4Raw,
	geoGinzburg5: ginzburg5,
	geoGinzburg5Raw: ginzburg5Raw,
	geoGinzburg6: ginzburg6,
	geoGinzburg6Raw: ginzburg6Raw,
	geoGinzburg8: ginzburg8,
	geoGinzburg8Raw: ginzburg8Raw,
	geoGinzburg9: ginzburg9,
	geoGinzburg9Raw: ginzburg9Raw,
	geoGringorten: gringorten,
	geoGringortenRaw: gringortenRaw,
	geoGuyou: guyou,
	geoGuyouRaw: guyouRaw,
	geoHammer: hammer,
	geoHammerRaw: hammerRaw,
	geoHammerRetroazimuthal: hammerRetroazimuthal,
	geoHammerRetroazimuthalRaw: hammerRetroazimuthalRaw,
	geoHealpix: healpix,
	geoHealpixRaw: healpixRaw,
	geoHill: hill,
	geoHillRaw: hillRaw,
	geoHomolosine: homolosine,
	geoHomolosineRaw: homolosineRaw,
	geoInterrupt: interrupt,
	geoInterruptedBoggs: boggs$1,
	geoInterruptedHomolosine: homolosine$1,
	geoInterruptedMollweide: mollweide$1,
	geoInterruptedMollweideHemispheres: mollweideHemispheres,
	geoInterruptedSinuMollweide: sinuMollweide$1,
	geoInterruptedSinusoidal: sinusoidal$1,
	geoKavrayskiy7: kavrayskiy7,
	geoKavrayskiy7Raw: kavrayskiy7Raw,
	geoLagrange: lagrange,
	geoLagrangeRaw: lagrangeRaw,
	geoLarrivee: larrivee,
	geoLarriveeRaw: larriveeRaw,
	geoLaskowski: laskowski,
	geoLaskowskiRaw: laskowskiRaw,
	geoLittrow: littrow,
	geoLittrowRaw: littrowRaw,
	geoLoximuthal: loximuthal,
	geoLoximuthalRaw: loximuthalRaw,
	geoMiller: miller,
	geoMillerRaw: millerRaw,
	geoModifiedStereographic: modifiedStereographic,
	geoModifiedStereographicRaw: modifiedStereographicRaw,
	geoModifiedStereographicAlaska: modifiedStereographicAlaska,
	geoModifiedStereographicGs48: modifiedStereographicGs48,
	geoModifiedStereographicGs50: modifiedStereographicGs50,
	geoModifiedStereographicMiller: modifiedStereographicMiller,
	geoModifiedStereographicLee: modifiedStereographicLee,
	geoMollweide: mollweide,
	geoMollweideRaw: mollweideRaw,
	geoMtFlatPolarParabolic: mtFlatPolarParabolic,
	geoMtFlatPolarParabolicRaw: mtFlatPolarParabolicRaw,
	geoMtFlatPolarQuartic: mtFlatPolarQuartic,
	geoMtFlatPolarQuarticRaw: mtFlatPolarQuarticRaw,
	geoMtFlatPolarSinusoidal: mtFlatPolarSinusoidal,
	geoMtFlatPolarSinusoidalRaw: mtFlatPolarSinusoidalRaw,
	geoNaturalEarth: naturalEarth,
	geoNaturalEarthRaw: naturalEarthRaw,
	geoNaturalEarth2: naturalEarth2,
	geoNaturalEarth2Raw: naturalEarth2Raw,
	geoNellHammer: nellHammer,
	geoNellHammerRaw: nellHammerRaw,
	geoPatterson: patterson,
	geoPattersonRaw: pattersonRaw,
	geoPolyconic: polyconic,
	geoPolyconicRaw: polyconicRaw,
	geoPolyhedral: polyhedral,
	geoPolyhedralButterfly: butterfly,
	geoPolyhedralCollignon: collignon$1,
	geoPolyhedralWaterman: waterman,
	geoProject: index$6,
	geoGringortenQuincuncial: gringorten$1,
	geoPeirceQuincuncial: peirce,
	geoPierceQuincuncial: peirce,
	geoQuantize: quantize,
	geoQuincuncial: quincuncial,
	geoRectangularPolyconic: rectangularPolyconic,
	geoRectangularPolyconicRaw: rectangularPolyconicRaw,
	geoRobinson: robinson,
	geoRobinsonRaw: robinsonRaw,
	geoSatellite: satellite,
	geoSatelliteRaw: satelliteRaw,
	geoSinuMollweide: sinuMollweide,
	geoSinuMollweideRaw: sinuMollweideRaw,
	geoSinusoidal: sinusoidal,
	geoSinusoidalRaw: sinusoidalRaw,
	geoStitch: stitch,
	geoTimes: times,
	geoTimesRaw: timesRaw,
	geoTwoPointAzimuthal: twoPointAzimuthal,
	geoTwoPointAzimuthalRaw: twoPointAzimuthalRaw,
	geoTwoPointAzimuthalUsa: twoPointAzimuthalUsa,
	geoTwoPointEquidistant: twoPointEquidistant,
	geoTwoPointEquidistantRaw: twoPointEquidistantRaw,
	geoTwoPointEquidistantUsa: twoPointEquidistantUsa,
	geoVanDerGrinten: vanDerGrinten,
	geoVanDerGrintenRaw: vanDerGrintenRaw,
	geoVanDerGrinten2: vanDerGrinten2,
	geoVanDerGrinten2Raw: vanDerGrinten2Raw,
	geoVanDerGrinten3: vanDerGrinten3,
	geoVanDerGrinten3Raw: vanDerGrinten3Raw,
	geoVanDerGrinten4: vanDerGrinten4,
	geoVanDerGrinten4Raw: vanDerGrinten4Raw,
	geoWagner4: wagner4,
	geoWagner4Raw: wagner4Raw,
	geoWagner6: wagner6,
	geoWagner6Raw: wagner6Raw,
	geoWagner7: wagner7,
	geoWagner7Raw: wagner7Raw,
	geoWiechel: wiechel,
	geoWiechelRaw: wiechelRaw,
	geoWinkel3: winkel3,
	geoWinkel3Raw: winkel3Raw
});

var EventEmitter = createCommonjsModule(function (module) {
/*!
 * EventEmitter v5.2.2 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

(function (exports) {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    function isValidListener (listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
            throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);

                for (i = 0; i < listeners.length; i++) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof undefined === 'function' && undefined.amd) {
        undefined(function () {
            return EventEmitter;
        });
    }
    else if ('object' === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}(commonjsGlobal || {}));
});

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}

var _baseAssign = baseAssign;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn;

/** Used for built-in method references. */
var objectProto$14 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$11 = objectProto$14.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$11.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$1(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn$1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}

var _baseAssignIn = baseAssignIn;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}

var _copySymbols = copySymbols;

/** Built-in value references. */
var getPrototype = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
  var result = [];
  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;

/** Used for built-in method references. */
var objectProto$15 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$12 = objectProto$15.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$12.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

var _addMapEntry = addMapEntry;

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

var _arrayReduce = arrayReduce;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(_mapToArray(map), CLONE_DEEP_FLAG$1) : _mapToArray(map);
  return _arrayReduce(array, _addMapEntry, new map.constructor);
}

var _cloneMap = cloneMap;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp;

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

var _addSetEntry = addSetEntry;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$2 = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(_setToArray(set), CLONE_DEEP_FLAG$2) : _setToArray(set);
  return _arrayReduce(array, _addSetEntry, new set.constructor);
}

var _cloneSet = cloneSet;

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined;
var symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$3 = '[object Boolean]';
var dateTag$3 = '[object Date]';
var mapTag$4 = '[object Map]';
var numberTag$3 = '[object Number]';
var regexpTag$3 = '[object RegExp]';
var setTag$4 = '[object Set]';
var stringTag$3 = '[object String]';
var symbolTag$3 = '[object Symbol]';

var arrayBufferTag$3 = '[object ArrayBuffer]';
var dataViewTag$4 = '[object DataView]';
var float32Tag$2 = '[object Float32Array]';
var float64Tag$2 = '[object Float64Array]';
var int8Tag$2 = '[object Int8Array]';
var int16Tag$2 = '[object Int16Array]';
var int32Tag$2 = '[object Int32Array]';
var uint8Tag$2 = '[object Uint8Array]';
var uint8ClampedTag$2 = '[object Uint8ClampedArray]';
var uint16Tag$2 = '[object Uint16Array]';
var uint32Tag$2 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$3:
      return _cloneArrayBuffer(object);

    case boolTag$3:
    case dateTag$3:
      return new Ctor(+object);

    case dataViewTag$4:
      return _cloneDataView(object, isDeep);

    case float32Tag$2: case float64Tag$2:
    case int8Tag$2: case int16Tag$2: case int32Tag$2:
    case uint8Tag$2: case uint8ClampedTag$2: case uint16Tag$2: case uint32Tag$2:
      return _cloneTypedArray(object, isDeep);

    case mapTag$4:
      return _cloneMap(object, isDeep, cloneFunc);

    case numberTag$3:
    case stringTag$3:
      return new Ctor(object);

    case regexpTag$3:
      return _cloneRegExp(object);

    case setTag$4:
      return _cloneSet(object, isDeep, cloneFunc);

    case symbolTag$3:
      return _cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject_1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]';
var arrayTag$2 = '[object Array]';
var boolTag$2 = '[object Boolean]';
var dateTag$2 = '[object Date]';
var errorTag$2 = '[object Error]';
var funcTag$2 = '[object Function]';
var genTag$1 = '[object GeneratorFunction]';
var mapTag$3 = '[object Map]';
var numberTag$2 = '[object Number]';
var objectTag$3 = '[object Object]';
var regexpTag$2 = '[object RegExp]';
var setTag$3 = '[object Set]';
var stringTag$2 = '[object String]';
var symbolTag$2 = '[object Symbol]';
var weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]';
var dataViewTag$3 = '[object DataView]';
var float32Tag$1 = '[object Float32Array]';
var float64Tag$1 = '[object Float64Array]';
var int8Tag$1 = '[object Int8Array]';
var int16Tag$1 = '[object Int16Array]';
var int32Tag$1 = '[object Int32Array]';
var uint8Tag$1 = '[object Uint8Array]';
var uint8ClampedTag$1 = '[object Uint8ClampedArray]';
var uint16Tag$1 = '[object Uint16Array]';
var uint32Tag$1 = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] =
cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
cloneableTags[float32Tag$1] = cloneableTags[float64Tag$1] =
cloneableTags[int8Tag$1] = cloneableTags[int16Tag$1] =
cloneableTags[int32Tag$1] = cloneableTags[mapTag$3] =
cloneableTags[numberTag$2] = cloneableTags[objectTag$3] =
cloneableTags[regexpTag$2] = cloneableTags[setTag$3] =
cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] =
cloneableTags[uint8Tag$1] = cloneableTags[uint8ClampedTag$1] =
cloneableTags[uint16Tag$1] = cloneableTags[uint32Tag$1] = true;
cloneableTags[errorTag$2] = cloneableTags[funcTag$2] =
cloneableTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject_1(value)) {
    return value;
  }
  var isArr = isArray_1(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$3 || tag == argsTag$3 || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? _copySymbolsIn(value, _baseAssignIn(result, value))
          : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new _Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? _getAllKeysIn : _getAllKeys)
    : (isFlat ? keysIn : keys_1);

  var props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone;

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return _baseClone(value, CLONE_SYMBOLS_FLAG);
}

var clone_1 = clone;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$3 = 1;
var CLONE_SYMBOLS_FLAG$2 = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return _baseClone(value, CLONE_DEEP_FLAG$3 | CLONE_SYMBOLS_FLAG$2);
}

var cloneDeep_1 = cloneDeep;

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction(value) {
  return typeof value == 'function' ? value : identity_1;
}

var _castFunction = castFunction;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayEach : _baseEach;
  return func(collection, _castFunction(iteratee));
}

var forEach_1 = forEach;

var each = forEach_1;

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  _baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

var _baseFilter = baseFilter;

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */
function filter(collection, predicate) {
  var func = isArray_1(collection) ? _arrayFilter : _baseFilter;
  return func(collection, _baseIteratee(predicate, 3));
}

var filter_1 = filter;

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike_1(collection)) {
      var iteratee = _baseIteratee(predicate, 3);
      collection = keys_1(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

var _createFind = createFind;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

var _baseFindIndex = baseFindIndex;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;
var MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber_1(value);
  if (value === INFINITY$2 || value === -INFINITY$2) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

var toFinite_1 = toFinite;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite_1(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

var toInteger_1 = toInteger;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max;

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_1(fromIndex);
  if (index < 0) {
    index = nativeMax$1(length + index, 0);
  }
  return _baseFindIndex(array, _baseIteratee(predicate, 3), index);
}

var findIndex_1 = findIndex;

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = _createFind(findIndex_1);

var find_1 = find;

/**
 * Iterates over own and inherited enumerable string keyed properties of an
 * object and invokes `iteratee` for each property. The iteratee is invoked
 * with three arguments: (value, key, object). Iteratee functions may exit
 * iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forInRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forIn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
 */
function forIn(object, iteratee) {
  return object == null
    ? object
    : _baseFor(object, _castFunction(iteratee), keysIn_1);
}

var forIn_1 = forIn;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

var _strictIndexOf = strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? _strictIndexOf(array, value, fromIndex)
    : _baseFindIndex(array, _baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$2 = Math.max;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.indexOf([1, 2, 1, 2], 2);
 * // => 1
 *
 * // Search from the `fromIndex`.
 * _.indexOf([1, 2, 1, 2], 2, 2);
 * // => 3
 */
function indexOf(array, value, fromIndex) {
  var length = array == null ? 0 : array.length;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger_1(fromIndex);
  if (index < 0) {
    index = nativeMax$2(length + index, 0);
  }
  return _baseIndexOf(array, value, index);
}

var indexOf_1 = indexOf;

/**
 * Performs a partial deep comparison between `object` and `source` to
 * determine if `object` contains equivalent property values.
 *
 * **Note:** This method is equivalent to `_.matches` when `source` is
 * partially applied.
 *
 * Partial comparisons will match empty array and empty object `source`
 * values against any array or object value, respectively. See `_.isEqual`
 * for a list of supported value comparisons.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 *
 * _.isMatch(object, { 'b': 2 });
 * // => true
 *
 * _.isMatch(object, { 'b': 1 });
 * // => false
 */
function isMatch(object, source) {
  return object === source || _baseIsMatch(object, source, _getMatchData(source));
}

var isMatch_1 = isMatch;

/** `Object#toString` result references. */
var stringTag$4 = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag$4);
}

var isString_1 = isString;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike_1(collection) ? Array(collection.length) : [];

  _baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

var _baseMap = baseMap;

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map$1(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayMap : _baseMap;
  return func(collection, _baseIteratee(iteratee, 3));
}

var map_1 = map$1;

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject_1(object)) {
    return object;
  }
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = _toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject_1(objValue)
          ? objValue
          : (_isIndex(path[index + 1]) ? [] : {});
      }
    }
    _assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

var _baseSet = baseSet;

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = _baseGet(object, path);

    if (predicate(value, path)) {
      _baseSet(result, _castPath(path, object), value);
    }
  }
  return result;
}

var _basePickBy = basePickBy;

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return _basePickBy(object, paths, function(value, path) {
    return hasIn_1(object, path);
  });
}

var _basePick = basePick;

/** Built-in value references. */
var spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray_1(value) || isArguments_1(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

var _isFlattenable = isFlattenable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = _isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        _arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

var _baseFlatten = baseFlatten;

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? _baseFlatten(array, 1) : [];
}

var flatten_1 = flatten;

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return _setToString(_overRest(func, undefined, flatten_1), func + '');
}

var _flatRest = flatRest;

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = _flatRest(function(object, paths) {
  return object == null ? {} : _basePick(object, paths);
});

var pick_1 = pick;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var DataView$2 = function (_EventEmitter) {
  inherits(DataView, _EventEmitter);

  // constructor
  function DataView(dataSet) {
    classCallCheck(this, DataView);

    var _this = possibleConstructorReturn(this, _EventEmitter.call(this));

    var me = _this;
    if (!dataSet || !dataSet.isDataSet) {
      throw new TypeError('Not a valid DataSet instance');
    }
    assign_1(me, {
      DataSet: dataSet.DataSet,
      dataSet: dataSet,
      dataType: 'table',
      isDataView: true,
      origin: [],
      rows: [],
      transforms: []
    });
    dataSet.on('statechange', function () {
      me._reExecute();
    });
    return _this;
  }

  DataView.prototype._parseStateExpression = function _parseStateExpression(expr) {
    var dataSet = this.dataSet;
    var matched = /^\$state\.(\w+)/.exec(expr);
    if (matched) {
      return dataSet.state[matched[1]];
    }
    return expr;
  };

  DataView.prototype._preparseOptions = function _preparseOptions(options) {
    var me = this;
    var optionsCloned = clone_1(options);
    forIn_1(optionsCloned, function (value, key) {
      if (isString_1(value) && /^\$state\./.test(value)) {
        optionsCloned[key] = me._parseStateExpression(value);
      }
    });
    return optionsCloned;
  };

  // connectors


  DataView.prototype.source = function source(_source, options) {
    var me = this;
    // warning me.origin is protected
    me._source = {
      source: _source,
      options: options
    };
    if (!options) {
      if (_source instanceof DataView || isString_1(_source)) {
        me.origin = me.DataSet.getConnector('default')(_source, me.dataSet);
      } else if (isArray_1(_source)) {
        // TODO branch: if source is like ['dataview1', 'dataview2']
        me.origin = _source;
      } else {
        throw new TypeError('Invalid source');
      }
    } else {
      options = me._preparseOptions(options);
      me.origin = me.DataSet.getConnector(options.type)(_source, options, me);
    }
    if (!me.rows || me.rows.length !== me.origin.length) {
      // allow connectors to access 'rows'
      me.rows = cloneDeep_1(me.origin);
    }
    return me;
  };

  // transforms


  DataView.prototype.transform = function transform() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var me = this;
    me.transforms.push(options);
    me._executeTransform(options);
    return me;
  };

  DataView.prototype._executeTransform = function _executeTransform(options) {
    var me = this;
    options = me._preparseOptions(options);
    var transform = me.DataSet.getTransform(options.type);
    transform(me, options);
  };

  DataView.prototype._reExecuteTransforms = function _reExecuteTransforms() {
    var me = this;
    each(me.transforms, function (options) {
      me._executeTransform(options);
    });
  };

  // rows


  DataView.prototype.addRow = function addRow(row) {
    this.rows.push(row);
  };

  DataView.prototype.removeRow = function removeRow(index) {
    this.rows.splice(index, 1);
  };

  DataView.prototype.updateRow = function updateRow(index, newRow) {
    assign_1(this.rows[index], newRow);
  };

  DataView.prototype.findRows = function findRows(query) {
    return filter_1(this.rows, function (row) {
      return isMatch_1(row, query);
    });
  };

  DataView.prototype.findRow = function findRow(query) {
    return find_1(this.rows, query);
  };

  // columns


  DataView.prototype.getColumnNames = function getColumnNames() {
    var firstRow = this.rows[0];
    if (firstRow) {
      return keys_1(firstRow);
    }
    return [];
  };

  DataView.prototype.getColumnName = function getColumnName(index) {
    return this.getColumnNames()[index];
  };

  DataView.prototype.getColumnIndex = function getColumnIndex(columnName) {
    var columnNames = this.getColumnNames();
    return indexOf_1(columnNames, columnName);
  };

  DataView.prototype.getColumn = function getColumn(columnName) {
    return map_1(this.rows, function (row) {
      return row[columnName];
    });
  };

  DataView.prototype.getColumnData = function getColumnData(columnName) {
    return this.getColumn(columnName);
  };

  // data process


  DataView.prototype.getSubset = function getSubset(startRowIndex, endRowIndex, columnNames) {
    var subset = [];
    for (var i = startRowIndex; i <= endRowIndex; i++) {
      subset.push(pick_1(this.rows[i], columnNames));
    }
    return subset;
  };

  DataView.prototype.toString = function toString(prettyPrint) {
    var me = this;
    if (prettyPrint) {
      return JSON.stringify(me.rows, null, 2);
    }
    return JSON.stringify(me.rows);
  };

  DataView.prototype._reExecute = function _reExecute() {
    var me = this;
    var _me$_source = me._source,
        source = _me$_source.source,
        options = _me$_source.options;

    me.source(source, options);
    me._reExecuteTransforms();
    me.trigger('change');
  };

  return DataView;
}(EventEmitter);

var dataView = DataView$2;

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

var adder$1 = function() {
  return new Adder$1;
};

function Adder$1() {
  this.reset();
}

Adder$1.prototype = {
  constructor: Adder$1,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add$1(temp$1, y, this.t);
    add$1(this, temp$1.s, this.s);
    if (this.s) this.t += temp$1.t;
    else this.s = temp$1.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp$1 = new Adder$1;

function add$1(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}

var epsilon$3 = 1e-6;
var epsilon2$2 = 1e-12;
var pi$2 = Math.PI;
var halfPi$2 = pi$2 / 2;
var quarterPi$2 = pi$2 / 4;
var tau$2 = pi$2 * 2;

var degrees$2 = 180 / pi$2;
var radians$2 = pi$2 / 180;

var abs$2 = Math.abs;
var atan$2 = Math.atan;
var atan2$2 = Math.atan2;
var cos$2 = Math.cos;
var ceil$2 = Math.ceil;
var exp$2 = Math.exp;

var log$2 = Math.log;
var pow$2 = Math.pow;
var sin$2 = Math.sin;
var sign$2 = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt$2 = Math.sqrt;
var tan$2 = Math.tan;

function acos$2(x) {
  return x > 1 ? 0 : x < -1 ? pi$2 : Math.acos(x);
}

function asin$2(x) {
  return x > 1 ? halfPi$2 : x < -1 ? -halfPi$2 : Math.asin(x);
}

function haversin$1(x) {
  return (x = sin$2(x / 2)) * x;
}

function noop$2() {}

function streamGeometry$1(geometry, stream) {
  if (geometry && streamGeometryType$1.hasOwnProperty(geometry.type)) {
    streamGeometryType$1[geometry.type](geometry, stream);
  }
}

var streamObjectType$1 = {
  Feature: function(feature, stream) {
    streamGeometry$1(feature.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry$1(features[i].geometry, stream);
  }
};

var streamGeometryType$1 = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine$1(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine$1(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon$1(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon$1(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry$1(geometries[i], stream);
  }
};

function streamLine$1(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon$1(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine$1(coordinates[i], stream, 1);
  stream.polygonEnd();
}

var geoStream$1 = function(object, stream) {
  if (object && streamObjectType$1.hasOwnProperty(object.type)) {
    streamObjectType$1[object.type](object, stream);
  } else {
    streamGeometry$1(object, stream);
  }
};

var areaRingSum$2 = adder$1();

var areaSum$2 = adder$1();
var lambda00$3;
var phi00$3;
var lambda0$3;
var cosPhi0$2;
var sinPhi0$2;

var areaStream$2 = {
  point: noop$2,
  lineStart: noop$2,
  lineEnd: noop$2,
  polygonStart: function() {
    areaRingSum$2.reset();
    areaStream$2.lineStart = areaRingStart$2;
    areaStream$2.lineEnd = areaRingEnd$2;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum$2;
    areaSum$2.add(areaRing < 0 ? tau$2 + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = noop$2;
  },
  sphere: function() {
    areaSum$2.add(tau$2);
  }
};

function areaRingStart$2() {
  areaStream$2.point = areaPointFirst$2;
}

function areaRingEnd$2() {
  areaPoint$2(lambda00$3, phi00$3);
}

function areaPointFirst$2(lambda, phi) {
  areaStream$2.point = areaPoint$2;
  lambda00$3 = lambda, phi00$3 = phi;
  lambda *= radians$2, phi *= radians$2;
  lambda0$3 = lambda, cosPhi0$2 = cos$2(phi = phi / 2 + quarterPi$2), sinPhi0$2 = sin$2(phi);
}

function areaPoint$2(lambda, phi) {
  lambda *= radians$2, phi *= radians$2;
  phi = phi / 2 + quarterPi$2; // half the angular distance from south pole

  // Spherical excess E for a spherical triangle with vertices: south pole,
  // previous point, current point.  Uses a formula derived from Cagnoli’s
  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
  var dLambda = lambda - lambda0$3,
      sdLambda = dLambda >= 0 ? 1 : -1,
      adLambda = sdLambda * dLambda,
      cosPhi = cos$2(phi),
      sinPhi = sin$2(phi),
      k = sinPhi0$2 * sinPhi,
      u = cosPhi0$2 * cosPhi + k * cos$2(adLambda),
      v = k * sdLambda * sin$2(adLambda);
  areaRingSum$2.add(atan2$2(v, u));

  // Advance the previous points.
  lambda0$3 = lambda, cosPhi0$2 = cosPhi, sinPhi0$2 = sinPhi;
}

var area$1 = function(object) {
  areaSum$2.reset();
  geoStream$1(object, areaStream$2);
  return areaSum$2 * 2;
};

function spherical$2(cartesian) {
  return [atan2$2(cartesian[1], cartesian[0]), asin$2(cartesian[2])];
}

function cartesian$2(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos$2(phi);
  return [cosPhi * cos$2(lambda), cosPhi * sin$2(lambda), sin$2(phi)];
}

function cartesianDot$1(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross$1(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace$1(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale$1(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace$1(d) {
  var l = sqrt$2(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

var lambda0$4;
var phi0$2;
var lambda1$1;
var phi1$1;
var lambda2$1;
var lambda00$4;
var phi00$4;
var p0$1;
var deltaSum$1 = adder$1();
var ranges$1;
var range$2;

var boundsStream$3 = {
  point: boundsPoint$2,
  lineStart: boundsLineStart$1,
  lineEnd: boundsLineEnd$1,
  polygonStart: function() {
    boundsStream$3.point = boundsRingPoint$1;
    boundsStream$3.lineStart = boundsRingStart$1;
    boundsStream$3.lineEnd = boundsRingEnd$1;
    deltaSum$1.reset();
    areaStream$2.polygonStart();
  },
  polygonEnd: function() {
    areaStream$2.polygonEnd();
    boundsStream$3.point = boundsPoint$2;
    boundsStream$3.lineStart = boundsLineStart$1;
    boundsStream$3.lineEnd = boundsLineEnd$1;
    if (areaRingSum$2 < 0) lambda0$4 = -(lambda1$1 = 180), phi0$2 = -(phi1$1 = 90);
    else if (deltaSum$1 > epsilon$3) phi1$1 = 90;
    else if (deltaSum$1 < -epsilon$3) phi0$2 = -90;
    range$2[0] = lambda0$4, range$2[1] = lambda1$1;
  }
};

function boundsPoint$2(lambda, phi) {
  ranges$1.push(range$2 = [lambda0$4 = lambda, lambda1$1 = lambda]);
  if (phi < phi0$2) phi0$2 = phi;
  if (phi > phi1$1) phi1$1 = phi;
}

function linePoint$1(lambda, phi) {
  var p = cartesian$2([lambda * radians$2, phi * radians$2]);
  if (p0$1) {
    var normal = cartesianCross$1(p0$1, p),
        equatorial = [normal[1], -normal[0], 0],
        inflection = cartesianCross$1(equatorial, normal);
    cartesianNormalizeInPlace$1(inflection);
    inflection = spherical$2(inflection);
    var delta = lambda - lambda2$1,
        sign = delta > 0 ? 1 : -1,
        lambdai = inflection[0] * degrees$2 * sign,
        phii,
        antimeridian = abs$2(delta) > 180;
    if (antimeridian ^ (sign * lambda2$1 < lambdai && lambdai < sign * lambda)) {
      phii = inflection[1] * degrees$2;
      if (phii > phi1$1) phi1$1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign * lambda2$1 < lambdai && lambdai < sign * lambda)) {
      phii = -inflection[1] * degrees$2;
      if (phii < phi0$2) phi0$2 = phii;
    } else {
      if (phi < phi0$2) phi0$2 = phi;
      if (phi > phi1$1) phi1$1 = phi;
    }
    if (antimeridian) {
      if (lambda < lambda2$1) {
        if (angle$3(lambda0$4, lambda) > angle$3(lambda0$4, lambda1$1)) lambda1$1 = lambda;
      } else {
        if (angle$3(lambda, lambda1$1) > angle$3(lambda0$4, lambda1$1)) lambda0$4 = lambda;
      }
    } else {
      if (lambda1$1 >= lambda0$4) {
        if (lambda < lambda0$4) lambda0$4 = lambda;
        if (lambda > lambda1$1) lambda1$1 = lambda;
      } else {
        if (lambda > lambda2$1) {
          if (angle$3(lambda0$4, lambda) > angle$3(lambda0$4, lambda1$1)) lambda1$1 = lambda;
        } else {
          if (angle$3(lambda, lambda1$1) > angle$3(lambda0$4, lambda1$1)) lambda0$4 = lambda;
        }
      }
    }
  } else {
    boundsPoint$2(lambda, phi);
  }
  p0$1 = p, lambda2$1 = lambda;
}

function boundsLineStart$1() {
  boundsStream$3.point = linePoint$1;
}

function boundsLineEnd$1() {
  range$2[0] = lambda0$4, range$2[1] = lambda1$1;
  boundsStream$3.point = boundsPoint$2;
  p0$1 = null;
}

function boundsRingPoint$1(lambda, phi) {
  if (p0$1) {
    var delta = lambda - lambda2$1;
    deltaSum$1.add(abs$2(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00$4 = lambda, phi00$4 = phi;
  }
  areaStream$2.point(lambda, phi);
  linePoint$1(lambda, phi);
}

function boundsRingStart$1() {
  areaStream$2.lineStart();
}

function boundsRingEnd$1() {
  boundsRingPoint$1(lambda00$4, phi00$4);
  areaStream$2.lineEnd();
  if (abs$2(deltaSum$1) > epsilon$3) lambda0$4 = -(lambda1$1 = 180);
  range$2[0] = lambda0$4, range$2[1] = lambda1$1;
  p0$1 = null;
}

// Finds the left-right distance between two longitudes.
// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
// the distance between ±180° to be 360°.
function angle$3(lambda0, lambda1) {
  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}

function rangeCompare$1(a, b) {
  return a[0] - b[0];
}

function rangeContains$1(range, x) {
  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}

var bounds$1 = function(feature) {
  var i, n, a, b, merged, deltaMax, delta;

  phi1$1 = lambda1$1 = -(lambda0$4 = phi0$2 = Infinity);
  ranges$1 = [];
  geoStream$1(feature, boundsStream$3);

  // First, sort ranges by their minimum longitudes.
  if (n = ranges$1.length) {
    ranges$1.sort(rangeCompare$1);

    // Then, merge any ranges that overlap.
    for (i = 1, a = ranges$1[0], merged = [a]; i < n; ++i) {
      b = ranges$1[i];
      if (rangeContains$1(a, b[0]) || rangeContains$1(a, b[1])) {
        if (angle$3(a[0], b[1]) > angle$3(a[0], a[1])) a[1] = b[1];
        if (angle$3(b[0], a[1]) > angle$3(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    }

    // Finally, find the largest gap between the merged ranges.
    // The final bounding box will be the inverse of this gap.
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle$3(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0$4 = b[0], lambda1$1 = a[1];
    }
  }

  ranges$1 = range$2 = null;

  return lambda0$4 === Infinity || phi0$2 === Infinity
      ? [[NaN, NaN], [NaN, NaN]]
      : [[lambda0$4, phi0$2], [lambda1$1, phi1$1]];
};

var W0$1;
var W1$1;
var X0$2;
var Y0$2;
var Z0$2;
var X1$2;
var Y1$2;
var Z1$2;
var X2$2;
var Y2$2;
var Z2$2;
var lambda00$5;
var phi00$5;
var x0$6;
var y0$6;
var z0$1; // previous point

var centroidStream$2 = {
  sphere: noop$2,
  point: centroidPoint$2,
  lineStart: centroidLineStart$2,
  lineEnd: centroidLineEnd$2,
  polygonStart: function() {
    centroidStream$2.lineStart = centroidRingStart$2;
    centroidStream$2.lineEnd = centroidRingEnd$2;
  },
  polygonEnd: function() {
    centroidStream$2.lineStart = centroidLineStart$2;
    centroidStream$2.lineEnd = centroidLineEnd$2;
  }
};

// Arithmetic mean of Cartesian vectors.
function centroidPoint$2(lambda, phi) {
  lambda *= radians$2, phi *= radians$2;
  var cosPhi = cos$2(phi);
  centroidPointCartesian$1(cosPhi * cos$2(lambda), cosPhi * sin$2(lambda), sin$2(phi));
}

function centroidPointCartesian$1(x, y, z) {
  ++W0$1;
  X0$2 += (x - X0$2) / W0$1;
  Y0$2 += (y - Y0$2) / W0$1;
  Z0$2 += (z - Z0$2) / W0$1;
}

function centroidLineStart$2() {
  centroidStream$2.point = centroidLinePointFirst$1;
}

function centroidLinePointFirst$1(lambda, phi) {
  lambda *= radians$2, phi *= radians$2;
  var cosPhi = cos$2(phi);
  x0$6 = cosPhi * cos$2(lambda);
  y0$6 = cosPhi * sin$2(lambda);
  z0$1 = sin$2(phi);
  centroidStream$2.point = centroidLinePoint$1;
  centroidPointCartesian$1(x0$6, y0$6, z0$1);
}

function centroidLinePoint$1(lambda, phi) {
  lambda *= radians$2, phi *= radians$2;
  var cosPhi = cos$2(phi),
      x = cosPhi * cos$2(lambda),
      y = cosPhi * sin$2(lambda),
      z = sin$2(phi),
      w = atan2$2(sqrt$2((w = y0$6 * z - z0$1 * y) * w + (w = z0$1 * x - x0$6 * z) * w + (w = x0$6 * y - y0$6 * x) * w), x0$6 * x + y0$6 * y + z0$1 * z);
  W1$1 += w;
  X1$2 += w * (x0$6 + (x0$6 = x));
  Y1$2 += w * (y0$6 + (y0$6 = y));
  Z1$2 += w * (z0$1 + (z0$1 = z));
  centroidPointCartesian$1(x0$6, y0$6, z0$1);
}

function centroidLineEnd$2() {
  centroidStream$2.point = centroidPoint$2;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function centroidRingStart$2() {
  centroidStream$2.point = centroidRingPointFirst$1;
}

function centroidRingEnd$2() {
  centroidRingPoint$1(lambda00$5, phi00$5);
  centroidStream$2.point = centroidPoint$2;
}

function centroidRingPointFirst$1(lambda, phi) {
  lambda00$5 = lambda, phi00$5 = phi;
  lambda *= radians$2, phi *= radians$2;
  centroidStream$2.point = centroidRingPoint$1;
  var cosPhi = cos$2(phi);
  x0$6 = cosPhi * cos$2(lambda);
  y0$6 = cosPhi * sin$2(lambda);
  z0$1 = sin$2(phi);
  centroidPointCartesian$1(x0$6, y0$6, z0$1);
}

function centroidRingPoint$1(lambda, phi) {
  lambda *= radians$2, phi *= radians$2;
  var cosPhi = cos$2(phi),
      x = cosPhi * cos$2(lambda),
      y = cosPhi * sin$2(lambda),
      z = sin$2(phi),
      cx = y0$6 * z - z0$1 * y,
      cy = z0$1 * x - x0$6 * z,
      cz = x0$6 * y - y0$6 * x,
      m = sqrt$2(cx * cx + cy * cy + cz * cz),
      u = x0$6 * x + y0$6 * y + z0$1 * z,
      v = m && -acos$2(u) / m, // area weight
      w = atan2$2(m, u); // line weight
  X2$2 += v * cx;
  Y2$2 += v * cy;
  Z2$2 += v * cz;
  W1$1 += w;
  X1$2 += w * (x0$6 + (x0$6 = x));
  Y1$2 += w * (y0$6 + (y0$6 = y));
  Z1$2 += w * (z0$1 + (z0$1 = z));
  centroidPointCartesian$1(x0$6, y0$6, z0$1);
}

var centroid$1 = function(object) {
  W0$1 = W1$1 =
  X0$2 = Y0$2 = Z0$2 =
  X1$2 = Y1$2 = Z1$2 =
  X2$2 = Y2$2 = Z2$2 = 0;
  geoStream$1(object, centroidStream$2);

  var x = X2$2,
      y = Y2$2,
      z = Z2$2,
      m = x * x + y * y + z * z;

  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
  if (m < epsilon2$2) {
    x = X1$2, y = Y1$2, z = Z1$2;
    // If the feature has zero length, fall back to arithmetic mean of point vectors.
    if (W1$1 < epsilon$3) x = X0$2, y = Y0$2, z = Z0$2;
    m = x * x + y * y + z * z;
    // If the feature still has an undefined ccentroid, then return.
    if (m < epsilon2$2) return [NaN, NaN];
  }

  return [atan2$2(y, x) * degrees$2, asin$2(z / sqrt$2(m)) * degrees$2];
};

var constant$4 = function(x) {
  return function() {
    return x;
  };
};

var compose$1 = function(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
};

function rotationIdentity$1(lambda, phi) {
  return [lambda > pi$2 ? lambda - tau$2 : lambda < -pi$2 ? lambda + tau$2 : lambda, phi];
}

rotationIdentity$1.invert = rotationIdentity$1;

function rotateRadians$1(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau$2) ? (deltaPhi || deltaGamma ? compose$1(rotationLambda$1(deltaLambda), rotationPhiGamma$1(deltaPhi, deltaGamma))
    : rotationLambda$1(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma$1(deltaPhi, deltaGamma)
    : rotationIdentity$1);
}

function forwardRotationLambda$1(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > pi$2 ? lambda - tau$2 : lambda < -pi$2 ? lambda + tau$2 : lambda, phi];
  };
}

function rotationLambda$1(deltaLambda) {
  var rotation = forwardRotationLambda$1(deltaLambda);
  rotation.invert = forwardRotationLambda$1(-deltaLambda);
  return rotation;
}

function rotationPhiGamma$1(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos$2(deltaPhi),
      sinDeltaPhi = sin$2(deltaPhi),
      cosDeltaGamma = cos$2(deltaGamma),
      sinDeltaGamma = sin$2(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos$2(phi),
        x = cos$2(lambda) * cosPhi,
        y = sin$2(lambda) * cosPhi,
        z = sin$2(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2$2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin$2(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos$2(phi),
        x = cos$2(lambda) * cosPhi,
        y = sin$2(lambda) * cosPhi,
        z = sin$2(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2$2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin$2(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

var rotation$1 = function(rotate) {
  rotate = rotateRadians$1(rotate[0] * radians$2, rotate[1] * radians$2, rotate.length > 2 ? rotate[2] * radians$2 : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians$2, coordinates[1] * radians$2);
    return coordinates[0] *= degrees$2, coordinates[1] *= degrees$2, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians$2, coordinates[1] * radians$2);
    return coordinates[0] *= degrees$2, coordinates[1] *= degrees$2, coordinates;
  };

  return forward;
};

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream$1(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos$2(radius),
      sinRadius = sin$2(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau$2;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius$1(cosRadius, t0);
    t1 = circleRadius$1(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau$2;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical$2([cosRadius, -sinRadius * cos$2(t), -sinRadius * sin$2(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius$1(cosRadius, point) {
  point = cartesian$2(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace$1(point);
  var radius = acos$2(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau$2 - epsilon$3) % tau$2;
}

var circle$1 = function() {
  var center = constant$4([0, 0]),
      radius = constant$4(90),
      precision = constant$4(6),
      ring,
      rotate,
      stream = {point: point};

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= degrees$2, x[1] *= degrees$2;
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * radians$2,
        p = precision.apply(this, arguments) * radians$2;
    ring = [];
    rotate = rotateRadians$1(-c[0] * radians$2, -c[1] * radians$2, 0).invert;
    circleStream$1(stream, r, p, 1);
    c = {type: "Polygon", coordinates: [ring]};
    ring = rotate = null;
    return c;
  }

  circle.center = function(_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : constant$4([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant$4(+_), circle) : radius;
  };

  circle.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : constant$4(+_), circle) : precision;
  };

  return circle;
};

var clipBuffer$1 = function() {
  var lines = [],
      line;
  return {
    point: function(x, y) {
      line.push([x, y]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop$2,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
};

var clipLine$1 = function(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
};

var pointEqual$3 = function(a, b) {
  return abs$2(a[0] - b[0]) < epsilon$3 && abs$2(a[1] - b[1]) < epsilon$3;
};

function Intersection$1(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
var clipPolygon$1 = function(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    // If the first and last points of a segment are coincident, then treat as a
    // closed ring. TODO if all rings are closed, then the winding order of the
    // exterior ring should be checked.
    if (pointEqual$3(p0, p1)) {
      stream.lineStart();
      for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
      stream.lineEnd();
      return;
    }

    subject.push(x = new Intersection$1(p0, segment, null, true));
    clip.push(x.o = new Intersection$1(p0, null, x, false));
    subject.push(x = new Intersection$1(p1, segment, null, false));
    clip.push(x.o = new Intersection$1(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link$1(subject);
  link$1(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
};

function link$1(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

var clipMax$1 = 1e9;
var clipMin$1 = -clipMax$1;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipExtent$1(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs$2(p[0] - x0) < epsilon$3 ? direction > 0 ? 0 : 3
        : abs$2(p[0] - x1) < epsilon$3 ? direction > 0 ? 2 : 1
        : abs$2(p[1] - y0) < epsilon$3 ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer$1(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          clipPolygon$1(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin$1, Math.min(clipMax$1, x_)), y_ = Math.max(clipMin$1, Math.min(clipMax$1, y_))],
              b = [x = Math.max(clipMin$1, Math.min(clipMax$1, x)), y = Math.max(clipMin$1, Math.min(clipMax$1, y))];
          if (clipLine$1(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

var extent$2 = function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      cache,
      cacheStream,
      clip;

  return clip = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = clipExtent$1(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function(_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
};

var lengthSum$2 = adder$1();
var lambda0$5;
var sinPhi0$3;
var cosPhi0$3;

var lengthStream$2 = {
  sphere: noop$2,
  point: noop$2,
  lineStart: lengthLineStart$1,
  lineEnd: noop$2,
  polygonStart: noop$2,
  polygonEnd: noop$2
};

function lengthLineStart$1() {
  lengthStream$2.point = lengthPointFirst$2;
  lengthStream$2.lineEnd = lengthLineEnd$1;
}

function lengthLineEnd$1() {
  lengthStream$2.point = lengthStream$2.lineEnd = noop$2;
}

function lengthPointFirst$2(lambda, phi) {
  lambda *= radians$2, phi *= radians$2;
  lambda0$5 = lambda, sinPhi0$3 = sin$2(phi), cosPhi0$3 = cos$2(phi);
  lengthStream$2.point = lengthPoint$2;
}

function lengthPoint$2(lambda, phi) {
  lambda *= radians$2, phi *= radians$2;
  var sinPhi = sin$2(phi),
      cosPhi = cos$2(phi),
      delta = abs$2(lambda - lambda0$5),
      cosDelta = cos$2(delta),
      sinDelta = sin$2(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0$3 * sinPhi - sinPhi0$3 * cosPhi * cosDelta,
      z = sinPhi0$3 * sinPhi + cosPhi0$3 * cosPhi * cosDelta;
  lengthSum$2.add(atan2$2(sqrt$2(x * x + y * y), z));
  lambda0$5 = lambda, sinPhi0$3 = sinPhi, cosPhi0$3 = cosPhi;
}

var length$3 = function(object) {
  lengthSum$2.reset();
  geoStream$1(object, lengthStream$2);
  return +lengthSum$2;
};

var coordinates$1 = [null, null];
var object$1 = {type: "LineString", coordinates: coordinates$1};

var distance$2 = function(a, b) {
  coordinates$1[0] = a;
  coordinates$1[1] = b;
  return length$3(object$1);
};

function graticuleX$1(y0, y1, dy) {
  var y = range$1(y0, y1 - epsilon$3, dy).concat(y1);
  return function(x) { return y.map(function(y) { return [x, y]; }); };
}

function graticuleY$1(x0, x1, dx) {
  var x = range$1(x0, x1 - epsilon$3, dx).concat(x1);
  return function(y) { return x.map(function(x) { return [x, y]; }); };
}

var graticule$1 = function() {
  var x1, x0, X1, X0,
      y1, y0, Y1, Y0,
      dx = 10, dy = dx, DX = 90, DY = 360,
      x, y, X, Y,
      precision = 2.5;

  function graticule() {
    return {type: "MultiLineString", coordinates: lines()};
  }

  function lines() {
    return range$1(ceil$2(X0 / DX) * DX, X1, DX).map(X)
        .concat(range$1(ceil$2(Y0 / DY) * DY, Y1, DY).map(Y))
        .concat(range$1(ceil$2(x0 / dx) * dx, x1, dx).filter(function(x) { return abs$2(x % DX) > epsilon$3; }).map(x))
        .concat(range$1(ceil$2(y0 / dy) * dy, y1, dy).filter(function(y) { return abs$2(y % DY) > epsilon$3; }).map(y));
  }

  graticule.lines = function() {
    return lines().map(function(coordinates) { return {type: "LineString", coordinates: coordinates}; });
  };

  graticule.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X(X0).concat(
        Y(Y1).slice(1),
        X(X1).reverse().slice(1),
        Y(Y0).reverse().slice(1))
      ]
    };
  };

  graticule.extent = function(_) {
    if (!arguments.length) return graticule.extentMinor();
    return graticule.extentMajor(_).extentMinor(_);
  };

  graticule.extentMajor = function(_) {
    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
    X0 = +_[0][0], X1 = +_[1][0];
    Y0 = +_[0][1], Y1 = +_[1][1];
    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
    return graticule.precision(precision);
  };

  graticule.extentMinor = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule.precision(precision);
  };

  graticule.step = function(_) {
    if (!arguments.length) return graticule.stepMinor();
    return graticule.stepMajor(_).stepMinor(_);
  };

  graticule.stepMajor = function(_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule;
  };

  graticule.stepMinor = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  graticule.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    x = graticuleX$1(y0, y1, 90);
    y = graticuleY$1(x0, x1, precision);
    X = graticuleX$1(Y0, Y1, 90);
    Y = graticuleY$1(X0, X1, precision);
    return graticule;
  };

  return graticule
      .extentMajor([[-180, -90 + epsilon$3], [180, 90 - epsilon$3]])
      .extentMinor([[-180, -80 - epsilon$3], [180, 80 + epsilon$3]]);
};

var interpolate$1 = function(a, b) {
  var x0 = a[0] * radians$2,
      y0 = a[1] * radians$2,
      x1 = b[0] * radians$2,
      y1 = b[1] * radians$2,
      cy0 = cos$2(y0),
      sy0 = sin$2(y0),
      cy1 = cos$2(y1),
      sy1 = sin$2(y1),
      kx0 = cy0 * cos$2(x0),
      ky0 = cy0 * sin$2(x0),
      kx1 = cy1 * cos$2(x1),
      ky1 = cy1 * sin$2(x1),
      d = 2 * asin$2(sqrt$2(haversin$1(y1 - y0) + cy0 * cy1 * haversin$1(x1 - x0))),
      k = sin$2(d);

  var interpolate = d ? function(t) {
    var B = sin$2(t *= d) / k,
        A = sin$2(d - t) / k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      atan2$2(y, x) * degrees$2,
      atan2$2(z, sqrt$2(x * x + y * y)) * degrees$2
    ];
  } : function() {
    return [x0 * degrees$2, y0 * degrees$2];
  };

  interpolate.distance = d;

  return interpolate;
};

var identity$5 = function(x) {
  return x;
};

var areaSum$3 = adder$1();
var areaRingSum$3 = adder$1();
var x00$3;
var y00$3;
var x0$7;
var y0$7;

var areaStream$3 = {
  point: noop$2,
  lineStart: noop$2,
  lineEnd: noop$2,
  polygonStart: function() {
    areaStream$3.lineStart = areaRingStart$3;
    areaStream$3.lineEnd = areaRingEnd$3;
  },
  polygonEnd: function() {
    areaStream$3.lineStart = areaStream$3.lineEnd = areaStream$3.point = noop$2;
    areaSum$3.add(abs$2(areaRingSum$3));
    areaRingSum$3.reset();
  },
  result: function() {
    var area = areaSum$3 / 2;
    areaSum$3.reset();
    return area;
  }
};

function areaRingStart$3() {
  areaStream$3.point = areaPointFirst$3;
}

function areaPointFirst$3(x, y) {
  areaStream$3.point = areaPoint$3;
  x00$3 = x0$7 = x, y00$3 = y0$7 = y;
}

function areaPoint$3(x, y) {
  areaRingSum$3.add(y0$7 * x - x0$7 * y);
  x0$7 = x, y0$7 = y;
}

function areaRingEnd$3() {
  areaPoint$3(x00$3, y00$3);
}

var x0$8 = Infinity;
var y0$8 = x0$8;
var x1$2 = -x0$8;
var y1$2 = x1$2;

var boundsStream$4 = {
  point: boundsPoint$3,
  lineStart: noop$2,
  lineEnd: noop$2,
  polygonStart: noop$2,
  polygonEnd: noop$2,
  result: function() {
    var bounds = [[x0$8, y0$8], [x1$2, y1$2]];
    x1$2 = y1$2 = -(y0$8 = x0$8 = Infinity);
    return bounds;
  }
};

function boundsPoint$3(x, y) {
  if (x < x0$8) x0$8 = x;
  if (x > x1$2) x1$2 = x;
  if (y < y0$8) y0$8 = y;
  if (y > y1$2) y1$2 = y;
}

// TODO Enforce positive area for exterior, negative area for interior?

var X0$3 = 0;
var Y0$3 = 0;
var Z0$3 = 0;
var X1$3 = 0;
var Y1$3 = 0;
var Z1$3 = 0;
var X2$3 = 0;
var Y2$3 = 0;
var Z2$3 = 0;
var x00$4;
var y00$4;
var x0$9;
var y0$9;

var centroidStream$3 = {
  point: centroidPoint$3,
  lineStart: centroidLineStart$3,
  lineEnd: centroidLineEnd$3,
  polygonStart: function() {
    centroidStream$3.lineStart = centroidRingStart$3;
    centroidStream$3.lineEnd = centroidRingEnd$3;
  },
  polygonEnd: function() {
    centroidStream$3.point = centroidPoint$3;
    centroidStream$3.lineStart = centroidLineStart$3;
    centroidStream$3.lineEnd = centroidLineEnd$3;
  },
  result: function() {
    var centroid = Z2$3 ? [X2$3 / Z2$3, Y2$3 / Z2$3]
        : Z1$3 ? [X1$3 / Z1$3, Y1$3 / Z1$3]
        : Z0$3 ? [X0$3 / Z0$3, Y0$3 / Z0$3]
        : [NaN, NaN];
    X0$3 = Y0$3 = Z0$3 =
    X1$3 = Y1$3 = Z1$3 =
    X2$3 = Y2$3 = Z2$3 = 0;
    return centroid;
  }
};

function centroidPoint$3(x, y) {
  X0$3 += x;
  Y0$3 += y;
  ++Z0$3;
}

function centroidLineStart$3() {
  centroidStream$3.point = centroidPointFirstLine$1;
}

function centroidPointFirstLine$1(x, y) {
  centroidStream$3.point = centroidPointLine$1;
  centroidPoint$3(x0$9 = x, y0$9 = y);
}

function centroidPointLine$1(x, y) {
  var dx = x - x0$9, dy = y - y0$9, z = sqrt$2(dx * dx + dy * dy);
  X1$3 += z * (x0$9 + x) / 2;
  Y1$3 += z * (y0$9 + y) / 2;
  Z1$3 += z;
  centroidPoint$3(x0$9 = x, y0$9 = y);
}

function centroidLineEnd$3() {
  centroidStream$3.point = centroidPoint$3;
}

function centroidRingStart$3() {
  centroidStream$3.point = centroidPointFirstRing$1;
}

function centroidRingEnd$3() {
  centroidPointRing$1(x00$4, y00$4);
}

function centroidPointFirstRing$1(x, y) {
  centroidStream$3.point = centroidPointRing$1;
  centroidPoint$3(x00$4 = x0$9 = x, y00$4 = y0$9 = y);
}

function centroidPointRing$1(x, y) {
  var dx = x - x0$9,
      dy = y - y0$9,
      z = sqrt$2(dx * dx + dy * dy);

  X1$3 += z * (x0$9 + x) / 2;
  Y1$3 += z * (y0$9 + y) / 2;
  Z1$3 += z;

  z = y0$9 * x - x0$9 * y;
  X2$3 += z * (x0$9 + x);
  Y2$3 += z * (y0$9 + y);
  Z2$3 += z * 3;
  centroidPoint$3(x0$9 = x, y0$9 = y);
}

function PathContext$1(context) {
  this._context = context;
}

PathContext$1.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau$2);
        break;
      }
    }
  },
  result: noop$2
};

function PathString$1() {
  this._string = [];
}

PathString$1.prototype = {
  _circle: circle$2(4.5),
  pointRadius: function(_) {
    return this._circle = circle$2(_), this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    }
  }
};

function circle$2(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}

var index$8 = function() {
  var pointRadius = 4.5,
      projection,
      projectionStream,
      context,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream$1(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    geoStream$1(object, projectionStream(areaStream$3));
    return areaStream$3.result();
  };

  path.bounds = function(object) {
    geoStream$1(object, projectionStream(boundsStream$4));
    return boundsStream$4.result();
  };

  path.centroid = function(object) {
    geoStream$1(object, projectionStream(centroidStream$3));
    return centroidStream$3.result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = (projection = _) == null ? identity$5 : _.stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = (context = _) == null ? new PathString$1 : new PathContext$1(_);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(null).context(null);
};

var sum$2 = adder$1();

var polygonContains$1 = function(polygon, point) {
  var lambda = point[0],
      phi = point[1],
      normal = [sin$2(lambda), -cos$2(lambda), 0],
      angle = 0,
      winding = 0;

  sum$2.reset();

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = point0[0],
        phi0 = point0[1] / 2 + quarterPi$2,
        sinPhi0 = sin$2(phi0),
        cosPhi0 = cos$2(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = point1[0],
          phi1 = point1[1] / 2 + quarterPi$2,
          sinPhi1 = sin$2(phi1),
          cosPhi1 = cos$2(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > pi$2,
          k = sinPhi0 * sinPhi1;

      sum$2.add(atan2$2(k * sign * sin$2(absDelta), cosPhi0 * cosPhi1 + k * cos$2(absDelta)));
      angle += antimeridian ? delta + sign * tau$2 : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross$1(cartesian$2(point0), cartesian$2(point1));
        cartesianNormalizeInPlace$1(arc);
        var intersection = cartesianCross$1(normal, arc);
        cartesianNormalizeInPlace$1(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin$2(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon$3 || angle < epsilon$3 && sum$2 < -epsilon$3) ^ (winding & 1);
};

var clip$1 = function(pointVisible, clipLine, interpolate, start) {
  return function(rotate, sink) {
    var line = clipLine(sink),
        rotatedStart = rotate.invert(start[0], start[1]),
        ringBuffer = clipBuffer$1(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains$1(polygon, rotatedStart);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipPolygon$1(segments, compareIntersection$1, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      var point = rotate(lambda, phi);
      if (pointVisible(lambda = point[0], phi = point[1])) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      var point = rotate(lambda, phi);
      line.point(point[0], point[1]);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      var point = rotate(lambda, phi);
      ringSink.point(point[0], point[1]);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment$1));
    }

    return clip;
  };
};

function validSegment$1(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection$1(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi$2 - epsilon$3 : halfPi$2 - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi$2 - epsilon$3 : halfPi$2 - b[1]);
}

var clipAntimeridian$1 = clip$1(
  function() { return true; },
  clipAntimeridianLine$1,
  clipAntimeridianInterpolate$1,
  [-pi$2, -halfPi$2]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine$1(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi$2 : -pi$2,
          delta = abs$2(lambda1 - lambda0);
      if (abs$2(delta - pi$2) < epsilon$3) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi$2 : -halfPi$2);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi$2) { // line crosses antimeridian
        if (abs$2(lambda0 - sign0) < epsilon$3) lambda0 -= sign0 * epsilon$3; // handle degeneracies
        if (abs$2(lambda1 - sign1) < epsilon$3) lambda1 -= sign1 * epsilon$3;
        phi0 = clipAntimeridianIntersect$1(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect$1(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin$2(lambda0 - lambda1);
  return abs$2(sinLambda0Lambda1) > epsilon$3
      ? atan$2((sin$2(phi0) * (cosPhi1 = cos$2(phi1)) * sin$2(lambda1)
          - sin$2(phi1) * (cosPhi0 = cos$2(phi0)) * sin$2(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate$1(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi$2;
    stream.point(-pi$2, phi);
    stream.point(0, phi);
    stream.point(pi$2, phi);
    stream.point(pi$2, 0);
    stream.point(pi$2, -phi);
    stream.point(0, -phi);
    stream.point(-pi$2, -phi);
    stream.point(-pi$2, 0);
    stream.point(-pi$2, phi);
  } else if (abs$2(from[0] - to[0]) > epsilon$3) {
    var lambda = from[0] < to[0] ? pi$2 : -pi$2;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

var clipCircle$1 = function(radius, delta) {
  var cr = cos$2(radius),
      smallRadius = cr > 0,
      notHemisphere = abs$2(cr) > epsilon$3; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream$1(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos$2(lambda) * cos$2(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi$2 : -pi$2), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        // Handle degeneracies.
        // TODO ignore if not clipping polygons.
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (pointEqual$3(point0, point2) || pointEqual$3(point1, point2)) {
            point1[0] += epsilon$3;
            point1[1] += epsilon$3;
            v = visible(point1[0], point1[1]);
          }
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1]);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
            }
          }
        }
        if (v && (!point0 || !pointEqual$3(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian$2(a),
        pb = cartesian$2(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross$1(pa, pb),
        n2n2 = cartesianDot$1(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross$1(n1, n2),
        A = cartesianScale$1(n1, c1),
        B = cartesianScale$1(n2, c2);
    cartesianAddInPlace$1(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot$1(A, u),
        uu = cartesianDot$1(u, u),
        t2 = w * w - uu * (cartesianDot$1(A, A) - 1);

    if (t2 < 0) return;

    var t = sqrt$2(t2),
        q = cartesianScale$1(u, (-w - t) / uu);
    cartesianAddInPlace$1(q, A);
    q = spherical$2(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = abs$2(delta - pi$2) < epsilon$3,
        meridian = polar || delta < epsilon$3;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs$2(q[0] - lambda0) < epsilon$3 ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi$2 ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale$1(u, (-w + t) / uu);
      cartesianAddInPlace$1(q1, A);
      return [q, spherical$2(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi$2 - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return clip$1(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi$2, radius - pi$2]);
};

var transform$1 = function(prototype) {
  return {
    stream: transform$2(prototype)
  };
};

function transform$2(prototype) {
  function T() {}
  var p = T.prototype = Object.create(Transform.prototype);
  for (var k in prototype) p[k] = prototype[k];
  return function(stream) {
    var t = new T;
    t.stream = stream;
    return t;
  };
}

function Transform() {}

Transform.prototype = {
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};

function fit(project, extent, object) {
  var w = extent[1][0] - extent[0][0],
      h = extent[1][1] - extent[0][1],
      clip = project.clipExtent && project.clipExtent();

  project
      .scale(150)
      .translate([0, 0]);

  if (clip != null) project.clipExtent(null);

  geoStream$1(object, project.stream(boundsStream$4));

  var b = boundsStream$4.result(),
      k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
      x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
      y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;

  if (clip != null) project.clipExtent(clip);

  return project
      .scale(k * 150)
      .translate([x, y]);
}

function fitSize$1(project) {
  return function(size, object) {
    return fit(project, [[0, 0], size], object);
  };
}

function fitExtent$1(project) {
  return function(extent, object) {
    return fit(project, extent, object);
  };
}

var maxDepth$1 = 16;
var cosMinDistance$1 = cos$2(30 * radians$2); // cos(minimum angular distance)

var resample$2 = function(project, delta2) {
  return +delta2 ? resample$3(project, delta2) : resampleNone$1(project);
};

function resampleNone$1(project) {
  return transform$2({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$3(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt$2(a * a + b * b + c * c),
          phi2 = asin$2(c /= m),
          lambda2 = abs$2(abs$2(c) - 1) < epsilon$3 || abs$2(lambda0 - lambda1) < epsilon$3 ? (lambda0 + lambda1) / 2 : atan2$2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs$2((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance$1) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian$2([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth$1, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth$1, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians$1 = transform$2({
  point: function(x, y) {
    this.stream.point(x * radians$2, y * radians$2);
  }
});

function projection$1(project) {
  return projectionMutator$1(function() { return project; })();
}

function projectionMutator$1(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      dx, dy, lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, projectRotate, // rotate
      theta = null, preclip = clipAntimeridian$1, // clip angle
      x0 = null, y0, x1, y1, postclip = identity$5, // clip extent
      delta2 = 0.5, projectResample = resample$2(projectTransform, delta2), // precision
      cache,
      cacheStream;

  function projection(point) {
    point = projectRotate(point[0] * radians$2, point[1] * radians$2);
    return [point[0] * k + dx, dy - point[1] * k];
  }

  function invert(point) {
    point = projectRotate.invert((point[0] - dx) / k, (dy - point[1]) / k);
    return point && [point[0] * degrees$2, point[1] * degrees$2];
  }

  function projectTransform(x, y) {
    return x = project(x, y), [x[0] * k + dx, dy - x[1] * k];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians$1(preclip(rotate, projectResample(postclip(cacheStream = stream))));
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle$1(theta = _ * radians$2, 6 * radians$2) : (theta = null, clipAntimeridian$1), reset()) : theta * degrees$2;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$5) : clipExtent$1(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians$2, phi = _[1] % 360 * radians$2, recenter()) : [lambda * degrees$2, phi * degrees$2];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians$2, deltaPhi = _[1] % 360 * radians$2, deltaGamma = _.length > 2 ? _[2] % 360 * radians$2 : 0, recenter()) : [deltaLambda * degrees$2, deltaPhi * degrees$2, deltaGamma * degrees$2];
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample$2(projectTransform, delta2 = _ * _), reset()) : sqrt$2(delta2);
  };

  projection.fitExtent = fitExtent$1(projection);

  projection.fitSize = fitSize$1(projection);

  function recenter() {
    projectRotate = compose$1(rotate = rotateRadians$1(deltaLambda, deltaPhi, deltaGamma), project);
    var center = project(lambda, phi);
    dx = x - center[0] * k;
    dy = y + center[1] * k;
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

function conicProjection$1(projectAt) {
  var phi0 = 0,
      phi1 = pi$2 / 3,
      m = projectionMutator$1(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * radians$2, phi1 = _[1] * radians$2) : [phi0 * degrees$2, phi1 * degrees$2];
  };

  return p;
}

function conicEqualAreaRaw$1(y0, y1) {
  var sy0 = sin$2(y0),
      n = (sy0 + sin$2(y1)) / 2,
      c = 1 + sy0 * (2 * n - sy0),
      r0 = sqrt$2(c) / n;

  function project(x, y) {
    var r = sqrt$2(c - 2 * n * sin$2(y)) / n;
    return [r * sin$2(x *= n), r0 - r * cos$2(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y;
    return [atan2$2(x, r0y) / n, asin$2((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

var conicEqualArea$1 = function() {
  return conicProjection$1(conicEqualAreaRaw$1)
      .scale(155.424)
      .center([0, 33.6442]);
};

var albers$1 = function() {
  return conicEqualArea$1()
      .parallels([29.5, 45.5])
      .scale(1070)
      .translate([480, 250])
      .rotate([96, 0])
      .center([-0.6, 38.7]);
};

// The projections must have mutually exclusive clip regions on the sphere,
// as this will avoid emitting interleaving lines and polygons.
function multiplex$1(streams) {
  var n = streams.length;
  return {
    point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
    sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
    lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
    lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
    polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
    polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
  };
}

// A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
var albersUsa$1 = function() {
  var cache,
      cacheStream,
      lower48 = albers$1(), lower48Point,
      alaska = conicEqualArea$1().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
      hawaii = conicEqualArea$1().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
      point, pointStream = {point: function(x, y) { point = [x, y]; }};

  function albersUsa(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    return point = null,
        (lower48Point.point(x, y), point)
        || (alaskaPoint.point(x, y), point)
        || (hawaiiPoint.point(x, y), point);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
        : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
        : lower48).invert(coordinates);
  };

  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex$1([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return albersUsa;
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48Point = lower48
        .translate(_)
        .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
        .stream(pointStream);

    alaskaPoint = alaska
        .translate([x - 0.307 * k, y + 0.201 * k])
        .clipExtent([[x - 0.425 * k + epsilon$3, y + 0.120 * k + epsilon$3], [x - 0.214 * k - epsilon$3, y + 0.234 * k - epsilon$3]])
        .stream(pointStream);

    hawaiiPoint = hawaii
        .translate([x - 0.205 * k, y + 0.212 * k])
        .clipExtent([[x - 0.214 * k + epsilon$3, y + 0.166 * k + epsilon$3], [x - 0.115 * k - epsilon$3, y + 0.234 * k - epsilon$3]])
        .stream(pointStream);

    return albersUsa;
  };

  albersUsa.fitExtent = fitExtent$1(albersUsa);

  albersUsa.fitSize = fitSize$1(albersUsa);

  return albersUsa.scale(1070);
};

function azimuthalRaw$1(scale) {
  return function(x, y) {
    var cx = cos$2(x),
        cy = cos$2(y),
        k = scale(cx * cy);
    return [
      k * cy * sin$2(x),
      k * sin$2(y)
    ];
  }
}

function azimuthalInvert$1(angle) {
  return function(x, y) {
    var z = sqrt$2(x * x + y * y),
        c = angle(z),
        sc = sin$2(c),
        cc = cos$2(c);
    return [
      atan2$2(x * sc, z * cc),
      asin$2(z && y * sc / z)
    ];
  }
}

var azimuthalEqualAreaRaw$1 = azimuthalRaw$1(function(cxcy) {
  return sqrt$2(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw$1.invert = azimuthalInvert$1(function(z) {
  return 2 * asin$2(z / 2);
});

var azimuthalEqualArea$1 = function() {
  return projection$1(azimuthalEqualAreaRaw$1)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
};

var azimuthalEquidistantRaw$1 = azimuthalRaw$1(function(c) {
  return (c = acos$2(c)) && c / sin$2(c);
});

azimuthalEquidistantRaw$1.invert = azimuthalInvert$1(function(z) {
  return z;
});

var azimuthalEquidistant$1 = function() {
  return projection$1(azimuthalEquidistantRaw$1)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
};

function mercatorRaw$1(lambda, phi) {
  return [lambda, log$2(tan$2((halfPi$2 + phi) / 2))];
}

mercatorRaw$1.invert = function(x, y) {
  return [x, 2 * atan$2(exp$2(y)) - halfPi$2];
};

var mercator$1 = function() {
  return mercatorProjection$1(mercatorRaw$1)
      .scale(961 / tau$2);
};

function mercatorProjection$1(project) {
  var m = projection$1(project),
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      clipAuto;

  m.scale = function(_) {
    return arguments.length ? (scale(_), clipAuto && m.clipExtent(null), m) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), clipAuto && m.clipExtent(null), m) : translate();
  };

  m.clipExtent = function(_) {
    if (!arguments.length) return clipAuto ? null : clipExtent();
    if (clipAuto = _ == null) {
      var k = pi$2 * scale(),
          t = translate();
      _ = [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]];
    }
    clipExtent(_);
    return m;
  };

  return m.clipExtent(null);
}

function tany$1(y) {
  return tan$2((halfPi$2 + y) / 2);
}

function conicConformalRaw$1(y0, y1) {
  var cy0 = cos$2(y0),
      n = y0 === y1 ? sin$2(y0) : log$2(cy0 / cos$2(y1)) / log$2(tany$1(y1) / tany$1(y0)),
      f = cy0 * pow$2(tany$1(y0), n) / n;

  if (!n) return mercatorRaw$1;

  function project(x, y) {
    if (f > 0) { if (y < -halfPi$2 + epsilon$3) y = -halfPi$2 + epsilon$3; }
    else { if (y > halfPi$2 - epsilon$3) y = halfPi$2 - epsilon$3; }
    var r = f / pow$2(tany$1(y), n);
    return [r * sin$2(n * x), f - r * cos$2(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = sign$2(n) * sqrt$2(x * x + fy * fy);
    return [atan2$2(x, fy) / n, 2 * atan$2(pow$2(f / r, 1 / n)) - halfPi$2];
  };

  return project;
}

var conicConformal$1 = function() {
  return conicProjection$1(conicConformalRaw$1)
      .scale(109.5)
      .parallels([30, 30]);
};

function equirectangularRaw$1(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw$1.invert = equirectangularRaw$1;

var equirectangular = function() {
  return projection$1(equirectangularRaw$1)
      .scale(152.63);
};

function conicEquidistantRaw$1(y0, y1) {
  var cy0 = cos$2(y0),
      n = y0 === y1 ? sin$2(y0) : (cy0 - cos$2(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if (abs$2(n) < epsilon$3) return equirectangularRaw$1;

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * sin$2(nx), g - gy * cos$2(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y;
    return [atan2$2(x, gy) / n, g - sign$2(n) * sqrt$2(x * x + gy * gy)];
  };

  return project;
}

var conicEquidistant$1 = function() {
  return conicProjection$1(conicEquidistantRaw$1)
      .scale(131.154)
      .center([0, 13.9389]);
};

function gnomonicRaw$1(x, y) {
  var cy = cos$2(y), k = cos$2(x) * cy;
  return [cy * sin$2(x) / k, sin$2(y) / k];
}

gnomonicRaw$1.invert = azimuthalInvert$1(atan$2);

var gnomonic$1 = function() {
  return projection$1(gnomonicRaw$1)
      .scale(144.049)
      .clipAngle(60);
};

function orthographicRaw$1(x, y) {
  return [cos$2(y) * sin$2(x), sin$2(y)];
}

orthographicRaw$1.invert = azimuthalInvert$1(asin$2);

var orthographic = function() {
  return projection$1(orthographicRaw$1)
      .scale(249.5)
      .clipAngle(90 + epsilon$3);
};

function stereographicRaw$1(x, y) {
  var cy = cos$2(y), k = 1 + cos$2(x) * cy;
  return [cy * sin$2(x) / k, sin$2(y) / k];
}

stereographicRaw$1.invert = azimuthalInvert$1(function(z) {
  return 2 * atan$2(z);
});

var stereographic$1 = function() {
  return projection$1(stereographicRaw$1)
      .scale(250)
      .clipAngle(142);
};

function transverseMercatorRaw$1(lambda, phi) {
  return [log$2(tan$2((halfPi$2 + phi) / 2)), -lambda];
}

transverseMercatorRaw$1.invert = function(x, y) {
  return [-y, 2 * atan$2(exp$2(x)) - halfPi$2];
};

var transverseMercator$1 = function() {
  var m = mercatorProjection$1(transverseMercatorRaw$1),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
};



var index$7 = Object.freeze({
	geoArea: area$1,
	geoBounds: bounds$1,
	geoCentroid: centroid$1,
	geoCircle: circle$1,
	geoClipExtent: extent$2,
	geoDistance: distance$2,
	geoGraticule: graticule$1,
	geoInterpolate: interpolate$1,
	geoLength: length$3,
	geoPath: index$8,
	geoAlbers: albers$1,
	geoAlbersUsa: albersUsa$1,
	geoAzimuthalEqualArea: azimuthalEqualArea$1,
	geoAzimuthalEqualAreaRaw: azimuthalEqualAreaRaw$1,
	geoAzimuthalEquidistant: azimuthalEquidistant$1,
	geoAzimuthalEquidistantRaw: azimuthalEquidistantRaw$1,
	geoConicConformal: conicConformal$1,
	geoConicConformalRaw: conicConformalRaw$1,
	geoConicEqualArea: conicEqualArea$1,
	geoConicEqualAreaRaw: conicEqualAreaRaw$1,
	geoConicEquidistant: conicEquidistant$1,
	geoConicEquidistantRaw: conicEquidistantRaw$1,
	geoEquirectangular: equirectangular,
	geoEquirectangularRaw: equirectangularRaw$1,
	geoGnomonic: gnomonic$1,
	geoGnomonicRaw: gnomonicRaw$1,
	geoProjection: projection$1,
	geoProjectionMutator: projectionMutator$1,
	geoMercator: mercator$1,
	geoMercatorRaw: mercatorRaw$1,
	geoOrthographic: orthographic,
	geoOrthographicRaw: orthographicRaw$1,
	geoStereographic: stereographic$1,
	geoStereographicRaw: stereographicRaw$1,
	geoTransverseMercator: transverseMercator$1,
	geoTransverseMercatorRaw: transverseMercatorRaw$1,
	geoRotation: rotation$1,
	geoStream: geoStream$1,
	geoTransform: transform$1
});

var pi$3 = Math.PI;
var tau$3 = 2 * pi$3;
var epsilon$4 = 1e-6;
var tauEpsilon = tau$3 - epsilon$4;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$4)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$4) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi$3 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon$4) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$4 || Math.abs(this._y1 - y0) > epsilon$4) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau$3 + tau$3;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon$4) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi$3)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};



var index$9 = Object.freeze({
	path: path
});

var require$$0$1 = ( index$7 && undefined ) || index$7;

var require$$1 = ( index$9 && undefined ) || index$9;

var d3CompositeProjections = createCommonjsModule(function (module, exports) {
// http://geoexamples.com/d3-composite-projections/ Version 1.2.0. Copyright 2017 Roger Veciana i Rovira.
(function (global, factory) {
  factory(exports, require$$0$1, require$$1);
}(commonjsGlobal, function (exports,d3Geo,d3Path) { 'use strict';

  var epsilon = 1e-6;

  function noop() {}

  var x0 = Infinity;
  var y0 = x0;
  var x1 = -x0;
  var y1 = x1;
  var boundsStream = {
    point: boundsPoint,
    lineStart: noop,
    lineEnd: noop,
    polygonStart: noop,
    polygonEnd: noop,
    result: function() {
      var bounds = [[x0, y0], [x1, y1]];
      x1 = y1 = -(y0 = x0 = Infinity);
      return bounds;
    }
  };

  function boundsPoint(x, y) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  function fitExtent(projection, extent, object) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        clip = projection.clipExtent && projection.clipExtent();

    projection
        .scale(150)
        .translate([0, 0]);

    if (clip != null) projection.clipExtent(null);

    d3Geo.geoStream(object, projection.stream(boundsStream));

    var b = boundsStream.result(),
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;

    if (clip != null) projection.clipExtent(clip);

    return projection
        .scale(k * 150)
        .translate([x, y]);
  }

  function fitSize(projection, size, object) {
    return fitExtent(projection, [[0, 0], size], object);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
      sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
      lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
      lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
      polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
      polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
    };
  }

  // A composite projection for the United States, configured by default for
  // 960×500. The projection also works quite well at 960×600 if you change the
  // scale to 1285 and adjust the translate accordingly. The set of standard
  // parallels for each region comes from USGS, which is published here:
  // http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
  function albersUsa() {
    var cache,
        cacheStream,
        lower48 = d3Geo.geoAlbers(), lower48Point,
        alaska = d3Geo.geoConicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
        hawaii = d3Geo.geoConicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
        point, pointStream = {point: function(x, y) { point = [x, y]; }};

    function albersUsa(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (lower48Point.point(x, y), point)
          || (alaskaPoint.point(x, y), point)
          || (hawaiiPoint.point(x, y), point);
    }

    albersUsa.invert = function(coordinates) {
      var k = lower48.scale(),
          t = lower48.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;
      return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
          : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
          : lower48).invert(coordinates);
    };

    albersUsa.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
    };

    albersUsa.precision = function(_) {
      if (!arguments.length) return lower48.precision();
      lower48.precision(_), alaska.precision(_), hawaii.precision(_);
      return reset();
    };

    albersUsa.scale = function(_) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
      return albersUsa.translate(lower48.translate());
    };

    albersUsa.translate = function(_) {
      if (!arguments.length) return lower48.translate();
      var k = lower48.scale(), x = +_[0], y = +_[1];

      lower48Point = lower48
          .translate(_)
          .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
          .stream(pointStream);

      alaskaPoint = alaska
          .translate([x - 0.307 * k, y + 0.201 * k])
          .clipExtent([[x - 0.425 * k + epsilon, y + 0.120 * k + epsilon], [x - 0.214 * k - epsilon, y + 0.234 * k - epsilon]])
          .stream(pointStream);

      hawaiiPoint = hawaii
          .translate([x - 0.205 * k, y + 0.212 * k])
          .clipExtent([[x - 0.214 * k + epsilon, y + 0.166 * k + epsilon], [x - 0.115 * k - epsilon, y + 0.234 * k - epsilon]])
          .stream(pointStream);

      return reset();
    };

    albersUsa.fitExtent = function(extent, object) {
      return fitExtent(albersUsa, extent, object);
    };

    albersUsa.fitSize = function(size, object) {
      return fitSize(albersUsa, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return albersUsa;
  }

    albersUsa.drawCompositionBorders = function(context) {
      var hawaii1 = lower48([-102.91, 26.3]);
      var hawaii2 = lower48([-104.0, 27.5]);
      var hawaii3 = lower48([-108.0, 29.1]);
      var hawaii4 = lower48([-110.0, 29.1]);

      var alaska1 = lower48([-110.0, 26.7]);
      var alaska2 = lower48([-112.8, 27.6]);
      var alaska3 = lower48([-114.3, 30.6]);
      var alaska4 = lower48([-119.3, 30.1]);

      context.moveTo(hawaii1[0], hawaii1[1]);
      context.lineTo(hawaii2[0], hawaii2[1]);
      context.lineTo(hawaii3[0], hawaii3[1]);
      context.lineTo(hawaii4[0], hawaii4[1]);

      context.moveTo(alaska1[0], alaska1[1]);
      context.lineTo(alaska2[0], alaska2[1]);
      context.lineTo(alaska3[0], alaska3[1]);
      context.lineTo(alaska4[0], alaska4[1]);

    };
    albersUsa.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();

    };


    return albersUsa.scale(1070);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$1(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
      sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
      lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
      lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
      polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
      polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
    };
  }

  // A composite projection for the United States, configured by default for
  // 960×500. Also works quite well at 960×600 with scale 1285. The set of
  // standard parallels for each region comes from USGS, which is published here:
  // http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
  function albersUsaTerritories() {
    var cache,
        cacheStream,
        lower48 = d3Geo.geoAlbers(), lower48Point,
        alaska = d3Geo.geoConicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
        hawaii = d3Geo.geoConicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
        puertoRico = d3Geo.geoConicEqualArea().rotate([66, 0]).center([0, 18]).parallels([8, 18]), puertoRicoPoint, //Taken from https://bl.ocks.org/mbostock/5629120
        samoa = d3Geo.geoEquirectangular().rotate([173, 14]), samoaPoint, // EPSG:4169
        guam = d3Geo.geoEquirectangular().rotate([-145, -16.8]), guamPoint,
        point, pointStream = {point: function(x, y) { point = [x, y]; }};

        /*
        var puertoRicoBbox = [[-68.3, 19], [-63.9, 17]];
        var samoaBbox = [[-171, -14], [-168, -14.8]];
        var guamBbox = [[144, 20.8], [146.5, 12.7]];
        */

    function albersUsa(coordinates) {
      var x = coordinates[0], y = coordinates[1];

      return point = null,
          (lower48Point.point(x, y), point) ||
          (alaskaPoint.point(x, y), point)  ||
          (hawaiiPoint.point(x, y), point)  ||
          (puertoRicoPoint.point(x, y), point) ||
          (samoaPoint.point(x, y), point)   ||
          (guamPoint.point(x, y), point);
    }

    albersUsa.invert = function(coordinates) {

      var k = lower48.scale(),
          t = lower48.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;
          /*
          //How are the return values calculated:
          console.info("******");
          var c0 = puertoRico(puertoRicoBbox[0]);
          var x0 = (c0[0] - t[0]) / k;
          var y0 = (c0[1] - t[1]) / k;

          console.info("p0 puertoRico", x0 + ' - ' + y0);

          var c1 = puertoRico(puertoRicoBbox[1]);
          var x1 = (c1[0] - t[0]) / k;
          var y1 = (c1[1] - t[1]) / k;

          console.info("p1 puertoRico", x1 + ' - ' + y1);

          c0 = samoa(samoaBbox[0]);
          x0 = (c0[0] - t[0]) / k;
          y0 = (c0[1] - t[1]) / k;

          console.info("p0 samoa", x0 + ' - ' + y0);

          c1 = samoa(samoaBbox[1]);
          x1 = (c1[0] - t[0]) / k;
          y1 = (c1[1] - t[1]) / k;

          console.info("p1 samoa", x1 + ' - ' + y1);

          c0 = guam(guamBbox[0]);
          x0 = (c0[0] - t[0]) / k;
          y0 = (c0[1] - t[1]) / k;

          console.info("p0 guam", x0 + ' - ' + y0);

          c1 = guam(guamBbox[1]);
          x1 = (c1[0] - t[0]) / k;
          y1 = (c1[1] - t[1]) / k;

          console.info("p1 guam", x1 + ' - ' + y1);
          */

      return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
          : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
          : y >= 0.2064 && y < 0.2413 && x >= 0.312 && x < 0.385 ? puertoRico
          : y >= 0.09 && y < 0.1197 && x >= -0.4243 && x < -0.3232 ? samoa
          : y >= -0.0518 && y < 0.0895 && x >= -0.4243 && x < -0.3824 ? guam
          : lower48).invert(coordinates);

    };

    albersUsa.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$1([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream), puertoRico.stream(stream), samoa.stream(stream), guam.stream(stream)]);
    };

    albersUsa.precision = function(_) {
      if (!arguments.length) {return lower48.precision();}
      lower48.precision(_);
      alaska.precision(_);
      hawaii.precision(_);
      puertoRico.precision(_);
      samoa.precision(_);
      guam.precision(_);
      return reset();
    };

    albersUsa.scale = function(_) {
      if (!arguments.length) {return lower48.scale();}
      lower48.scale(_);
      alaska.scale(_ * 0.35);
      hawaii.scale(_);
      puertoRico.scale(_);
      samoa.scale(_* 2);
      guam.scale(_);
      return albersUsa.translate(lower48.translate());
    };

    albersUsa.translate = function(_) {
      if (!arguments.length) {return lower48.translate();}
      var k = lower48.scale(), x = +_[0], y = +_[1];

      /*
      var c0 = puertoRico.translate([x + 0.350 * k, y + 0.224 * k])(puertoRicoBbox[0]);
      var x0 = (x - c0[0]) / k;
      var y0 = (y - c0[1]) / k;

      var c1 = puertoRico.translate([x + 0.350 * k, y + 0.224 * k])(puertoRicoBbox[1]);
      var x1 = (x - c1[0]) / k;
      var y1 = (y - c1[1]) / k;

      console.info('puertoRico: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
      console.info('.clipExtent([[x '+
       (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
       ' * k + epsilon, y '+
       (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
       ' * k + epsilon],[x '+
       (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
       ' * k - epsilon, y '+
       (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
       ' * k - epsilon]])');

        c0 = samoa.translate([x - 0.492 * k, y + 0.09 * k])(samoaBbox[0]);
        x0 = (x - c0[0]) / k;
        y0 = (y - c0[1]) / k;

        c1 = samoa.translate([x - 0.492 * k, y + 0.09 * k])(samoaBbox[1]);
        x1 = (x - c1[0]) / k;
        y1 = (y - c1[1]) / k;

       console.info('samoa: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
       console.info('.clipExtent([[x '+
        (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
        ' * k + epsilon, y '+
        (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
        ' * k + epsilon],[x '+
        (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
        ' * k - epsilon, y '+
        (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
        ' * k - epsilon]])');

        c0 = guam.translate([x - 0.408 * k, y + 0.018 * k])(guamBbox[0]);
        x0 = (x - c0[0]) / k;
        y0 = (y - c0[1]) / k;

        c1 = guam.translate([x - 0.408 * k, y + 0.018 * k])(guamBbox[1]);
        x1 = (x - c1[0]) / k;
        y1 = (y - c1[1]) / k;

       console.info('guam: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
       console.info('.clipExtent([[x '+
        (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
        ' * k + epsilon, y '+
        (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
        ' * k + epsilon],[x '+
        (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
        ' * k - epsilon, y '+
        (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
        ' * k - epsilon]])');
        */

      lower48Point = lower48
          .translate(_)
          .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
          .stream(pointStream);

      alaskaPoint = alaska
          .translate([x - 0.307 * k, y + 0.201 * k])
          .clipExtent([[x - 0.425 * k + epsilon, y + 0.120 * k + epsilon], [x - 0.214 * k - epsilon, y + 0.233 * k - epsilon]])
          .stream(pointStream);

      hawaiiPoint = hawaii
          .translate([x - 0.205 * k, y + 0.212 * k])
          .clipExtent([[x - 0.214 * k + epsilon, y + 0.166 * k + epsilon], [x - 0.115 * k - epsilon, y + 0.233 * k - epsilon]])
          .stream(pointStream);

      puertoRicoPoint = puertoRico
          .translate([x + 0.350 * k, y + 0.224 * k])
          .clipExtent([[x + 0.312 * k + epsilon, y + 0.2064 * k + epsilon],[x + 0.385 * k - epsilon, y + 0.233 * k - epsilon]])
          .stream(pointStream);

      samoaPoint = samoa
          .translate([x - 0.492 * k, y + 0.09 * k])
          .clipExtent([[x - 0.4243 * k + epsilon, y + 0.0903 * k + epsilon],[x - 0.3233 * k - epsilon, y + 0.1197 * k - epsilon]])
          .stream(pointStream);

      guamPoint = guam
          .translate([x - 0.408 * k, y + 0.018 * k])
          .clipExtent([[x - 0.4244 * k + epsilon, y - 0.0519 * k + epsilon],[x - 0.3824 * k - epsilon, y + 0.0895 * k - epsilon]])
          .stream(pointStream);


      return reset();
    };

    albersUsa.fitExtent = function(extent, object) {
      return fitExtent(albersUsa, extent, object);
    };

    albersUsa.fitSize = function(size, object) {
      return fitSize(albersUsa, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return albersUsa;
    }

    albersUsa.drawCompositionBorders = function(context) {

      /*
      console.info("CLIP EXTENT hawaii: ", hawaii.clipExtent());
      console.info("UL BBOX:", lower48.invert([hawaii.clipExtent()[0][0], hawaii.clipExtent()[0][1]]));
      console.info("UR BBOX:", lower48.invert([hawaii.clipExtent()[1][0], hawaii.clipExtent()[0][1]]));
      console.info("LD BBOX:", lower48.invert([hawaii.clipExtent()[1][0], hawaii.clipExtent()[1][1]]));
      console.info("LL BBOX:", lower48.invert([hawaii.clipExtent()[0][0], hawaii.clipExtent()[1][1]]));

      console.info("CLIP EXTENT alaska: ", alaska.clipExtent());
      console.info("UL BBOX:", lower48.invert([alaska.clipExtent()[0][0], alaska.clipExtent()[0][1]]));
      console.info("UR BBOX:", lower48.invert([alaska.clipExtent()[1][0], alaska.clipExtent()[0][1]]));
      console.info("LD BBOX:", lower48.invert([alaska.clipExtent()[1][0], alaska.clipExtent()[1][1]]));
      console.info("LL BBOX:", lower48.invert([alaska.clipExtent()[0][0], alaska.clipExtent()[1][1]]));

      console.info("CLIP EXTENT puertoRico: ", puertoRico.clipExtent());
      console.info("UL BBOX:", lower48.invert([puertoRico.clipExtent()[0][0], puertoRico.clipExtent()[0][1]]));
      console.info("UR BBOX:", lower48.invert([puertoRico.clipExtent()[1][0], puertoRico.clipExtent()[0][1]]));
      console.info("LD BBOX:", lower48.invert([puertoRico.clipExtent()[1][0], puertoRico.clipExtent()[1][1]]));
      console.info("LL BBOX:", lower48.invert([puertoRico.clipExtent()[0][0], puertoRico.clipExtent()[1][1]]));

      console.info("CLIP EXTENT samoa: ", samoa.clipExtent());
      console.info("UL BBOX:", lower48.invert([samoa.clipExtent()[0][0], samoa.clipExtent()[0][1]]));
      console.info("UR BBOX:", lower48.invert([samoa.clipExtent()[1][0], samoa.clipExtent()[0][1]]));
      console.info("LD BBOX:", lower48.invert([samoa.clipExtent()[1][0], samoa.clipExtent()[1][1]]));
      console.info("LL BBOX:", lower48.invert([samoa.clipExtent()[0][0], samoa.clipExtent()[1][1]]));


      console.info("CLIP EXTENT guam: ", guam.clipExtent());
      console.info("UL BBOX:", lower48.invert([guam.clipExtent()[0][0], guam.clipExtent()[0][1]]));
      console.info("UR BBOX:", lower48.invert([guam.clipExtent()[1][0], guam.clipExtent()[0][1]]));
      console.info("LD BBOX:", lower48.invert([guam.clipExtent()[1][0], guam.clipExtent()[1][1]]));
      console.info("LL BBOX:", lower48.invert([guam.clipExtent()[0][0], guam.clipExtent()[1][1]]));
      */

      var ulhawaii = lower48([-110.4641, 28.2805]);
      var urhawaii = lower48([-104.0597, 28.9528]);
      var ldhawaii = lower48([-103.7049, 25.1031]);
      var llhawaii = lower48([-109.8337, 24.4531]);

      var ulalaska = lower48([ -124.4745, 28.1407]);
      var uralaska = lower48([ -110.931, 30.8844]);
      var ldalaska = lower48([-109.8337, 24.4531]);
      var llalaska = lower48([-122.4628, 21.8562]);

      var ulpuertoRico = lower48([-76.8579, 25.1544]);
      var urpuertoRico = lower48([-72.429, 24.2097]);
      var ldpuertoRico = lower48([-72.8265, 22.7056]);
      var llpuertoRico = lower48([-77.1852, 23.6392]);


      var ulsamoa = lower48([-125.0093, 29.7791]);
      var ursamoa = lower48([-118.5193, 31.3262]);
      var ldsamoa = lower48([-118.064, 29.6912]);
      var llsamoa = lower48([-124.4369, 28.169]);

      var ulguam = lower48([-128.1314, 37.4582]);
      var urguam = lower48([-125.2132, 38.214]);
      var ldguam = lower48([-122.3616, 30.5115]);
      var llguam = lower48([-125.0315, 29.8211]);

      context.moveTo(ulhawaii[0], ulhawaii[1]);
      context.lineTo(urhawaii[0], urhawaii[1]);
      context.lineTo(ldhawaii[0], ldhawaii[1]);
      context.lineTo(ldhawaii[0], ldhawaii[1]);
      context.lineTo(llhawaii[0], llhawaii[1]);
      context.closePath();

      context.moveTo(ulalaska[0], ulalaska[1]);
      context.lineTo(uralaska[0], uralaska[1]);
      context.lineTo(ldalaska[0], ldalaska[1]);
      context.lineTo(ldalaska[0], ldalaska[1]);
      context.lineTo(llalaska[0], llalaska[1]);
      context.closePath();

      context.moveTo(ulpuertoRico[0], ulpuertoRico[1]);
      context.lineTo(urpuertoRico[0], urpuertoRico[1]);
      context.lineTo(ldpuertoRico[0], ldpuertoRico[1]);
      context.lineTo(ldpuertoRico[0], ldpuertoRico[1]);
      context.lineTo(llpuertoRico[0], llpuertoRico[1]);
      context.closePath();

      context.moveTo(ulsamoa[0], ulsamoa[1]);
      context.lineTo(ursamoa[0], ursamoa[1]);
      context.lineTo(ldsamoa[0], ldsamoa[1]);
      context.lineTo(ldsamoa[0], ldsamoa[1]);
      context.lineTo(llsamoa[0], llsamoa[1]);
      context.closePath();

      context.moveTo(ulguam[0], ulguam[1]);
      context.lineTo(urguam[0], urguam[1]);
      context.lineTo(ldguam[0], ldguam[1]);
      context.lineTo(ldguam[0], ldguam[1]);
      context.lineTo(llguam[0], llguam[1]);
      context.closePath();

    };
    albersUsa.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();

    };


    return albersUsa.scale(1070);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$2(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for Spain, configured by default for 960×500.
  function conicConformalSpain() {
    var cache,
        cacheStream,

        iberianPeninsule = d3Geo.geoConicConformal().rotate([5, -38.6]).parallels([0,60]), iberianPeninsulePoint,
        canaryIslands = d3Geo.geoConicConformal().rotate([5, -38.6]).parallels([0,60]), canaryIslandsPoint,

        point, pointStream = {point: function(x, y) { point = [x, y]; }};

        /*
        var iberianPeninsuleBbox = [[-11, 46], [4, 35]];
        var canaryIslandsBbox = [[-19.0, 28.85], [-12.7, 28.1]];
        */

    function conicConformalSpain(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (iberianPeninsulePoint.point(x, y), point) ||
          (canaryIslandsPoint.point(x, y), point);
    }

    conicConformalSpain.invert = function(coordinates) {
      var k = iberianPeninsule.scale(),
          t = iberianPeninsule.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;

          return (y >= 0.05346 && y< 0.0897 && x >= -0.13388 && x < -0.0322 ? canaryIslands
              : iberianPeninsule).invert(coordinates);
    };

    conicConformalSpain.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$2([iberianPeninsule.stream(cacheStream = stream), canaryIslands.stream(stream)]);
    };

    conicConformalSpain.precision = function(_) {
      if (!arguments.length) {return iberianPeninsule.precision();}
      iberianPeninsule.precision(_);
      canaryIslands.precision(_);
      return reset();
    };

    conicConformalSpain.scale = function(_) {
      if (!arguments.length) {return iberianPeninsule.scale();}
      iberianPeninsule.scale(_);
      canaryIslands.scale(_);
      return conicConformalSpain.translate(iberianPeninsule.translate());
    };

    conicConformalSpain.translate = function(_) {
      if (!arguments.length) {return iberianPeninsule.translate();}
      var k = iberianPeninsule.scale(), x = +_[0], y = +_[1];
      /*
      var c0 = iberianPeninsule(iberianPeninsuleBbox[0]);
     var x0 = (x - c0[0]) / k;
     var y0 = (y - c0[1]) / k;

     var c1 = iberianPeninsule(iberianPeninsuleBbox[1]);
     var x1 = (x - c1[0]) / k;
     var y1 = (y - c1[1]) / k;

     console.info('Iberian Peninsula: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);

     c0 = canaryIslands.translate([x + 0.1 * k, y - 0.094 * k])(canaryIslandsBbox[0]);
     x0 = (x - c0[0]) / k;
     y0 = (y - c0[1]) / k;

     c1 = canaryIslands.translate([x + 0.1 * k, y - 0.094 * k])(canaryIslandsBbox[1]);
     x1 = (x - c1[0]) / k;
     y1 = (y - c1[1]) / k;

     console.info('Canry Islands: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     */
      iberianPeninsulePoint = iberianPeninsule
          .translate(_)
          .clipExtent([[x - 0.06857 * k, y - 0.1288 * k],[x + 0.13249 * k, y + 0.06 * k]])
          .stream(pointStream);

      canaryIslandsPoint = canaryIslands
          .translate([x + 0.1 * k, y - 0.094 * k])
          .clipExtent([[x - 0.1331 * k + epsilon, y + 0.053457 * k + epsilon],[x  - 0.0354 * k - epsilon, y + 0.08969 * k - epsilon]])
          .stream(pointStream);

      return reset();
    };

    conicConformalSpain.fitExtent = function(extent, object) {
      return fitExtent(conicConformalSpain, extent, object);
    };

    conicConformalSpain.fitSize = function(size, object) {
      return fitSize(conicConformalSpain, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return conicConformalSpain;
    }

    conicConformalSpain.drawCompositionBorders = function(context) {
      /*
      console.info("CLIP EXTENT: ", canaryIslands.clipExtent());
      console.info("UL BBOX:", iberianPeninsule.invert([canaryIslands.clipExtent()[0][0], canaryIslands.clipExtent()[0][1]]));
      console.info("UR BBOX:", iberianPeninsule.invert([canaryIslands.clipExtent()[1][0], canaryIslands.clipExtent()[0][1]]));
      console.info("LD BBOX:", iberianPeninsule.invert([canaryIslands.clipExtent()[1][0], canaryIslands.clipExtent()[1][1]]));
      */

      var ulCanaryIslands = iberianPeninsule([-14.0346750, 34.965007]);
      var urCanaryIslands = iberianPeninsule([-7.4208899, 35.536988]);
      var ldCanaryIslands = iberianPeninsule([-7.3148275, 33.54359]);

      context.moveTo(ulCanaryIslands[0], ulCanaryIslands[1]);
      context.lineTo(urCanaryIslands[0], urCanaryIslands[1]);
      context.lineTo(ldCanaryIslands[0], ldCanaryIslands[1]);
    };
    conicConformalSpain.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return conicConformalSpain.scale(2700);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$3(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for Portugal, configured by default for 960×500.
  function conicConformalPortugal() {
    var cache,
        cacheStream,
        iberianPeninsule = d3Geo.geoConicConformal().rotate([10, -39.3]).parallels([0, 60]), iberianPeninsulePoint,
        madeira = d3Geo.geoConicConformal().rotate([17, -32.7]).parallels([0, 60]), madeiraPoint,
        azores = d3Geo.geoConicConformal().rotate([27.8, -38.6]).parallels([0, 60]), azoresPoint,

        point, pointStream = {point: function(x, y) { point = [x, y]; }};

        /*
        var iberianPeninsuleBbox = [[-11, 46], [4, 34]];
        var madeiraBbox = [[-17.85, 33.6], [-16, 32.02]];
        var azoresBbox = [[-32, 40.529], [-23.98, 35.75]];
        */


    function conicConformalPortugal(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (iberianPeninsulePoint.point(x, y), point) ||
          (madeiraPoint.point(x, y), point) ||
          (azoresPoint.point(x, y), point);
    }

    conicConformalPortugal.invert = function(coordinates) {
      var k = iberianPeninsule.scale(),
          t = iberianPeninsule.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;

          /*
          //How are the return values calculated:
          console.info("******");
          var c0 = madeira(madeiraBbox[0]);
          var x0 = (c0[0] - t[0]) / k;
          var y0 = (c0[1] - t[1]) / k;

          console.info("p0 madeira", x0 + ' - ' + y0);

          var c1 = madeira(madeiraBbox[1]);
          var x1 = (c1[0] - t[0]) / k;
          var y1 = (c1[1] - t[1]) / k;

          console.info("p1 madeira", x1 + ' - ' + y1);

          c0 = azores(azoresBbox[0]);
          x0 = (c0[0] - t[0]) / k;
          y0 = (c0[1] - t[1]) / k;

          console.info("p0 azores", x0 + ' - ' + y0);

          c1 = azores(azoresBbox[1]);
          x1 = (c1[0] - t[0]) / k;
          y1 = (c1[1] - t[1]) / k;

          console.info("p1 azores", x1 + ' - ' + y1);
          */

          return (y >= 0.0093 && y< 0.03678 && x >= -0.03875 && x < -0.0116 ? madeira
              : y >= -0.0412 && y< 0.0091 && x >= -0.07782 && x < -0.01166 ? azores
              : iberianPeninsule).invert(coordinates);
    };

    conicConformalPortugal.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$3([iberianPeninsule.stream(cacheStream = stream), madeira.stream(stream), azores.stream(stream)]);
    };

    conicConformalPortugal.precision = function(_) {
      if (!arguments.length) {return iberianPeninsule.precision();}
      iberianPeninsule.precision(_);
      madeira.precision(_);
      azores.precision(_);
      return reset();
    };

    conicConformalPortugal.scale = function(_) {
      if (!arguments.length) {return iberianPeninsule.scale();}
      iberianPeninsule.scale(_);
      madeira.scale(_);
      azores.scale(_ * 0.6);
      return conicConformalPortugal.translate(iberianPeninsule.translate());
    };

    conicConformalPortugal.translate = function(_) {
      if (!arguments.length) {return iberianPeninsule.translate();}
      var k = iberianPeninsule.scale(), x = +_[0], y = +_[1];
      /*
      var c0 = iberianPeninsule(iberianPeninsuleBbox[0]);
     var x0 = (x - c0[0]) / k;
     var y0 = (y - c0[1]) / k;

     var c1 = iberianPeninsule(iberianPeninsuleBbox[1]);
     var x1 = (x - c1[0]) / k;
     var y1 = (y - c1[1]) / k;

     console.info('Iberian Peninsula: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     console.info('.clipExtent([[x '+
      (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
      ' * k, y '+
      (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
      ' * k],[x '+
      (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
      ' * k, y '+
      (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
      ' * k]])');

     c0 = madeira.translate([x - 0.0265 * k, y + 0.025 * k])(madeiraBbox[0]);
     x0 = (x - c0[0]) / k;
     y0 = (y - c0[1]) / k;

     c1 = madeira.translate([x - 0.0265 * k, y + 0.025 * k])(madeiraBbox[1]);
     x1 = (x - c1[0]) / k;
     y1 = (y - c1[1]) / k;

     console.info('Madeira: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     console.info('.clipExtent([[x '+
      (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
      ' * k + epsilon, y '+
      (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
      ' * k + epsilon],[x '+
      (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
      ' * k - epsilon, y '+
      (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
      ' * k - epsilon]])');

      c0 = azores.translate([x - 0.045 * k, y + -0.02 * k])(azoresBbox[0]);
      x0 = (x - c0[0]) / k;
      y0 = (y - c0[1]) / k;

      c1 = azores.translate([x - 0.045 * k, y + -0.02 * k])(azoresBbox[1]);
      x1 = (x - c1[0]) / k;
      y1 = (y - c1[1]) / k;

      console.info('Azores: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
      console.info('.clipExtent([[x '+
       (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
       ' * k + epsilon, y '+
       (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
       ' * k + epsilon],[x '+
       (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
       ' * k - epsilon, y '+
       (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
       ' * k - epsilon]])');
       */
      iberianPeninsulePoint = iberianPeninsule
          .translate(_)
          .clipExtent([[x - 0.0115 * k, y - 0.1138 * k],[x +0.2105 * k, y +0.0673 * k]])
          .stream(pointStream);


      madeiraPoint = madeira
          .translate([x - 0.0265 * k, y + 0.025 * k])
          .clipExtent([[x - 0.0388 * k + epsilon, y + 0.0093 * k + epsilon],[x - 0.0116 * k - epsilon, y + 0.0368 * k - epsilon]])
          .stream(pointStream);

      azoresPoint = azores
          .translate([x - 0.045 * k, y + -0.02 * k])
          .clipExtent([[x - 0.0778 * k + epsilon, y - 0.0413 * k + epsilon],[x - 0.0117 * k - epsilon, y + 0.0091 * k - epsilon]])
          .stream(pointStream);

      return reset();
    };

    conicConformalPortugal.fitExtent = function(extent, object) {
      return fitExtent(conicConformalPortugal, extent, object);
    };

    conicConformalPortugal.fitSize = function(size, object) {
      return fitSize(conicConformalPortugal, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return conicConformalPortugal;
    }

    conicConformalPortugal.drawCompositionBorders = function(context) {
      /*
      console.info("CLIP EXTENT MADEIRA: ", madeira.clipExtent());
      console.info("UL BBOX:", iberianPeninsule.invert([madeira.clipExtent()[0][0], madeira.clipExtent()[0][1]]));
      console.info("UR BBOX:", iberianPeninsule.invert([madeira.clipExtent()[1][0], madeira.clipExtent()[0][1]]));
      console.info("LD BBOX:", iberianPeninsule.invert([madeira.clipExtent()[1][0], madeira.clipExtent()[1][1]]));
      console.info("LL BBOX:", iberianPeninsule.invert([madeira.clipExtent()[0][0], madeira.clipExtent()[1][1]]));

      console.info("CLIP EXTENT AZORES: ", azores.clipExtent());
      console.info("UL BBOX:", iberianPeninsule.invert([azores.clipExtent()[0][0], azores.clipExtent()[0][1]]));
      console.info("UR BBOX:", iberianPeninsule.invert([azores.clipExtent()[1][0], azores.clipExtent()[0][1]]));
      console.info("LD BBOX:", iberianPeninsule.invert([azores.clipExtent()[1][0], azores.clipExtent()[1][1]]));
      console.info("LL BBOX:", iberianPeninsule.invert([azores.clipExtent()[0][0], azores.clipExtent()[1][1]]));
      */

      var ulmadeira = iberianPeninsule([-12.8351, 38.7113]);
      var urmadeira = iberianPeninsule([-10.8482, 38.7633]);
      var ldmadeira = iberianPeninsule([-10.8181, 37.2072]);
      var llmadeira = iberianPeninsule([-12.7345, 37.1573]);

      var ulazores = iberianPeninsule([-16.0753, 41.4436]);
      var urazores = iberianPeninsule([-10.9168, 41.6861]);
      var ldazores = iberianPeninsule([-10.8557, 38.7747]);
      var llazores = iberianPeninsule([-15.6728, 38.5505]);

      context.moveTo(ulmadeira[0], ulmadeira[1]);
      context.lineTo(urmadeira[0], urmadeira[1]);
      context.lineTo(ldmadeira[0], ldmadeira[1]);
      context.lineTo(ldmadeira[0], ldmadeira[1]);
      context.lineTo(llmadeira[0], llmadeira[1]);
      context.closePath();

      context.moveTo(ulazores[0], ulazores[1]);
      context.lineTo(urazores[0], urazores[1]);
      context.lineTo(ldazores[0], ldazores[1]);
      context.lineTo(ldazores[0], ldazores[1]);
      context.lineTo(llazores[0], llazores[1]);
      context.closePath();

    };
    conicConformalPortugal.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return conicConformalPortugal.scale(4200);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$4(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for Ecuador, configured by default for 960×500.
  function mercatorEcuador() {
    var cache,
        cacheStream,

        mainland = d3Geo.geoMercator().rotate([80, 1.5]), mainlandPoint,
        galapagos = d3Geo.geoMercator().rotate([90.73, 1]), galapagosPoint,

        point, pointStream = {point: function(x, y) { point = [x, y]; }};

        /*
        var mainlandBbox = [[-81.5, 2.7], [-70.0, -6.0]];
        var galapagosBbox = [[-92.2, 0.58], [-88.8, -1.8]];
        */

    function mercatorEcuador(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (mainlandPoint.point(x, y), point) ||
          (galapagosPoint.point(x, y), point);
    }

    mercatorEcuador.invert = function(coordinates) {
      var k = mainland.scale(),
          t = mainland.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;
          /*
          //How are the return values calculated:
          var c0 = galapagos(galapagosBbox[0]);
          var x0 = (c0[0] - t[0]) / k;
          var y0 = (c0[1] - t[1]) / k;

          console.info("p0 galapagos", x0 + ' - ' + y0);


          var c1 = galapagos(galapagosBbox[1]);
          var x1 = (c1[0] - t[0]) / k;
          var y1 = (c1[1] - t[1]) / k;

          console.info("p1 galapagos", x1 + ' - ' + y1);
          */
          return (y >= -0.0676 && y< -0.026 && x >= -0.0857 && x < -0.0263 ? galapagos
              : mainland).invert(coordinates);
    };

    mercatorEcuador.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$4([mainland.stream(cacheStream = stream), galapagos.stream(stream)]);
    };

    mercatorEcuador.precision = function(_) {
      if (!arguments.length) {return mainland.precision();}
      mainland.precision(_);
      galapagos.precision(_);
      return reset();
    };

    mercatorEcuador.scale = function(_) {
      if (!arguments.length) {return mainland.scale();}
      mainland.scale(_);
      galapagos.scale(_);
      return mercatorEcuador.translate(mainland.translate());
    };

    mercatorEcuador.translate = function(_) {
      if (!arguments.length) {return mainland.translate();}
      var k = mainland.scale(), x = +_[0], y = +_[1];
      /*
      var c0 = mainland(mainlandBbox[0]);
     var x0 = (x - c0[0]) / k;
     var y0 = (y - c0[1]) / k;

     var c1 = mainland(mainlandBbox[1]);
     var x1 = (x - c1[0]) / k;
     var y1 = (y - c1[1]) / k;

     console.info('mainland: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     console.info('.clipExtent([[x '+
      (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
      ' * k, y '+
      (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
      ' * k],[x '+
      (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
      ' * k, y '+
      (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
      ' * k]])');

     c0 = galapagos.translate([x - 0.06 * k, y - 0.04 * k])(galapagosBbox[0]);
     x0 = (x - c0[0]) / k;
     y0 = (y - c0[1]) / k;

     c1 = galapagos.translate([x - 0.06 * k, y - 0.04 * k])(galapagosBbox[1]);
     x1 = (x - c1[0]) / k;
     y1 = (y - c1[1]) / k;

     console.info('galapagos: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     console.info('.clipExtent([[x '+
      (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
      ' * k + epsilon, y '+
      (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
      ' * k + epsilon],[x '+
      (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
      ' * k - epsilon, y '+
      (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
      ' * k - epsilon]])');*/

      mainlandPoint = mainland
          .translate(_)
          .clipExtent([[x - 0.0262 * k, y - 0.0734 * k],[x + 0.1741 * k, y + 0.079 * k]])
          .stream(pointStream);

      galapagosPoint = galapagos
          .translate([x - 0.06 * k, y - 0.04 * k])
          .clipExtent([[x - 0.0857 * k + epsilon, y - 0.0676 * k + epsilon],[x - 0.0263 * k - epsilon, y - 0.026 * k - epsilon]])
          .stream(pointStream);

      return reset();
    };

    mercatorEcuador.fitExtent = function(extent, object) {
      return fitExtent(mercatorEcuador, extent, object);
    };

    mercatorEcuador.fitSize = function(size, object) {
      return fitSize(mercatorEcuador, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return mercatorEcuador;
    }

    mercatorEcuador.drawCompositionBorders = function(context) {
      /*
      console.info("CLIP EXTENT: ", galapagos.clipExtent());
      console.info("UL BBOX:", mainland.invert([galapagos.clipExtent()[0][0], galapagos.clipExtent()[0][1]]));
      console.info("UR BBOX:", mainland.invert([galapagos.clipExtent()[1][0], galapagos.clipExtent()[0][1]]));
      console.info("LD BBOX:", mainland.invert([galapagos.clipExtent()[1][0], galapagos.clipExtent()[1][1]]));
      console.info("LL BBOX:", mainland.invert([galapagos.clipExtent()[0][0], galapagos.clipExtent()[1][1]]));
      */

      var ulgalapagos = mainland([-84.9032, 2.3757]);
      var urgalapagos = mainland([-81.5047, 2.3708]);
      var ldgalapagos = mainland([-81.5063, -0.01]);
      var llgalapagos = mainland([-84.9086, -0.005]);

      context.moveTo(ulgalapagos[0], ulgalapagos[1]);
      context.lineTo(urgalapagos[0], urgalapagos[1]);
      context.lineTo(ldgalapagos[0], ldgalapagos[1]);
      context.lineTo(llgalapagos[0], llgalapagos[1]);
      context.closePath();

    };
    mercatorEcuador.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return mercatorEcuador.scale(3500);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$5(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for Chile, configured by default for 960×500.
  function transverseMercatorChile() {
    var cache,
        cacheStream,
        mainland = d3Geo.geoTransverseMercator().rotate([72, 37]), mainlandPoint,
        antarctic = d3Geo.geoStereographic().rotate([72, 0]), antarcticPoint,
        juanFernandez = d3Geo.geoMercator().rotate([80, 33.5]), juanFernandezPoint,
        pascua = d3Geo.geoMercator().rotate([110, 25]), pascuaPoint,

        point, pointStream = {point: function(x, y) { point = [x, y]; }};

      /*
      var mainlandBbox = [[-75.5, -15.0], [-32, -49.0]];
      var antarcticBbox = [[-91.0, -60.0], [-43.0, -90.0]];
      var juanFernandezBbox = [[-81.0, -33.0], [-78.5, -34.0]];
      var pascuaBbox = [[-110, -26.6], [-108.7, -27.5]];
      */

    function transverseMercatorChile(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (mainlandPoint.point(x, y), point) ||
          (antarcticPoint.point(x, y), point) ||
          (juanFernandezPoint.point(x, y), point) ||
          (pascuaPoint.point(x, y), point);
    }

    transverseMercatorChile.invert = function(coordinates) {
      var k = mainland.scale(),
          t = mainland.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;

          /*
          //How are the return values calculated:
          console.info("******");
          var c0 = antarctic(antarcticBbox[0]);
          var x0 = (c0[0] - t[0]) / k;
          var y0 = (c0[1] - t[1]) / k;

          console.info("p0 antarctic", x0 + ' - ' + y0);

          var c1 = antarctic(antarcticBbox[1]);
          var x1 = (c1[0] - t[0]) / k;
          var y1 = (c1[1] - t[1]) / k;

          console.info("p1 antarctic", x1 + ' - ' + y1);

          c0 = juanFernandez(juanFernandezBbox[0]);
          x0 = (c0[0] - t[0]) / k;
          y0 = (c0[1] - t[1]) / k;

          console.info("p0 juanFernandez", x0 + ' - ' + y0);

          c1 = juanFernandez(juanFernandezBbox[1]);
          x1 = (c1[0] - t[0]) / k;
          y1 = (c1[1] - t[1]) / k;

          console.info("p1 juanFernandez", x1 + ' - ' + y1);

          c0 = pascua(pascuaBbox[0]);
          x0 = (c0[0] - t[0]) / k;
          y0 = (c0[1] - t[1]) / k;

          console.info("p0 pascua", x0 + ' - ' + y0);

          c1 = pascua(pascuaBbox[1]);
          x1 = (c1[0] - t[0]) / k;
          y1 = (c1[1] - t[1]) / k;

          console.info("p1 pascua", x1 + ' - ' + y1);
          */

          return (y >= 0.2582 && y< 0.32 && x >= -0.1036 && x < -0.087 ? antarctic
              : y >= -0.01298 && y< 0.0133 && x >= -0.11396 && x < -0.05944 ? juanFernandez
              : y >= 0.01539 && y< 0.03911 && x >= -0.089 && x < -0.0588 ? pascua
              : mainland).invert(coordinates);
    };

    transverseMercatorChile.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$5([mainland.stream(cacheStream = stream), antarctic.stream(stream), juanFernandez.stream(stream), pascua.stream(stream)]);
    };

    transverseMercatorChile.precision = function(_) {
      if (!arguments.length) {return mainland.precision();}
      mainland.precision(_);
      antarctic.precision(_);
      juanFernandez.precision(_);
      pascua.precision(_);
      return reset();
    };

    transverseMercatorChile.scale = function(_) {
      if (!arguments.length) {return mainland.scale();}
      mainland.scale(_);
      antarctic.scale(_ * 0.15);
      juanFernandez.scale(_ * 1.5);
      pascua.scale(_ * 1.5);
      return transverseMercatorChile.translate(mainland.translate());
    };

    transverseMercatorChile.translate = function(_) {
      if (!arguments.length) {return mainland.translate();}
      var k = mainland.scale(), x = +_[0], y = +_[1];

      /*
      var c0 = mainland(mainlandBbox[0]);
     var x0 = (x - c0[0]) / k;
     var y0 = (y - c0[1]) / k;

     var c1 = mainland(mainlandBbox[1]);
     var x1 = (x - c1[0]) / k;
     var y1 = (y - c1[1]) / k;

     console.info('Mainland: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     console.info('.clipExtent([[x '+
      (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
      ' * k, y '+
      (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
      ' * k],[x '+
      (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
      ' * k, y '+
      (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
      ' * k]])');

     c0 = antarctic.translate([x - 0.1 * k, y + 0.17 * k])(antarcticBbox[0]);
     x0 = (x - c0[0]) / k;
     y0 = (y - c0[1]) / k;

     c1 = antarctic.translate([x - 0.1 * k, y + 0.17 * k])(antarcticBbox[1]);
     x1 = (x - c1[0]) / k;
     y1 = (y - c1[1]) / k;

     console.info('antarctic: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     console.info('Doesn t work due to -90 latitude!' + '.clipExtent([[x '+
      (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
      ' * k + epsilon, y '+
      (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
      ' * k + epsilon],[x '+
      (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
      ' * k - epsilon, y '+
      (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
      ' * k - epsilon]])');

      c0 = juanFernandez.translate([x - 0.092 * k, y -0 * k])(juanFernandezBbox[0]);
      x0 = (x - c0[0]) / k;
      y0 = (y - c0[1]) / k;

      c1 = juanFernandez.translate([x - 0.092 * k, y -0 * k])(juanFernandezBbox[1]);
      x1 = (x - c1[0]) / k;
      y1 = (y - c1[1]) / k;

      console.info('juanFernandez: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
      console.info('.clipExtent([[x '+
       (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
       ' * k + epsilon, y '+
       (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
       ' * k + epsilon],[x '+
       (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
       ' * k - epsilon, y '+
       (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
       ' * k - epsilon]])');

       c0 = pascua.translate([x - 0.089 * k, y -0.0265 * k])(pascuaBbox[0]);
       x0 = (x - c0[0]) / k;
       y0 = (y - c0[1]) / k;

       c1 = pascua.translate([x - 0.089 * k, y -0.0265 * k])(pascuaBbox[1]);
       x1 = (x - c1[0]) / k;
       y1 = (y - c1[1]) / k;

       console.info('pascua: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
       console.info('.clipExtent([[x '+
        (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
        ' * k + epsilon, y '+
        (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
        ' * k + epsilon],[x '+
        (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
        ' * k - epsilon, y '+
        (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
        ' * k - epsilon]])');
        */
      mainlandPoint = mainland
          .translate(_)
          .clipExtent([[x - 0.059 * k, y - 0.3835 * k],[x + 0.4498 * k, y + 0.3375 * k]])
          .stream(pointStream);

      antarcticPoint = antarctic
          .translate([x - 0.087 * k, y + 0.17 * k])
          .clipExtent([[x - 0.1166 * k + epsilon, y + 0.2582 * k + epsilon],[x - 0.06 * k - epsilon, y + 0.32 * k - epsilon]])
          .stream(pointStream);

      juanFernandezPoint = juanFernandez
          .translate([x - 0.092 * k, y - 0 * k])
          .clipExtent([[x - 0.114 * k + epsilon, y - 0.013 * k + epsilon],[x - 0.0594 * k - epsilon, y + 0.0133 * k - epsilon]])
          .stream(pointStream);

      pascuaPoint = pascua
          .translate([x - 0.089 * k, y - 0.0265 * k])
          .clipExtent([[x - 0.089 * k + epsilon, y + 0.0154 * k + epsilon],[x - 0.0588 * k - epsilon, y + 0.0391 * k - epsilon]])
          .stream(pointStream);

      return reset();
    };

    transverseMercatorChile.fitExtent = function(extent, object) {
      return fitExtent(transverseMercatorChile, extent, object);
    };

    transverseMercatorChile.fitSize = function(size, object) {
      return fitSize(transverseMercatorChile, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return transverseMercatorChile;
    }

    transverseMercatorChile.drawCompositionBorders = function(context) {
      /*
      console.info("CLIP EXTENT antarctic: ", antarctic.clipExtent());
      console.info("UL BBOX:", mainland.invert([antarctic.clipExtent()[0][0], antarctic.clipExtent()[0][1]]));
      console.info("UR BBOX:", mainland.invert([antarctic.clipExtent()[1][0], antarctic.clipExtent()[0][1]]));
      console.info("LD BBOX:", mainland.invert([antarctic.clipExtent()[1][0], antarctic.clipExtent()[1][1]]));
      console.info("LL BBOX:", mainland.invert([antarctic.clipExtent()[0][0], antarctic.clipExtent()[1][1]]));

      console.info("CLIP EXTENT juanFernandez: ", juanFernandez.clipExtent());
      console.info("UL BBOX:", mainland.invert([juanFernandez.clipExtent()[0][0], juanFernandez.clipExtent()[0][1]]));
      console.info("UR BBOX:", mainland.invert([juanFernandez.clipExtent()[1][0], juanFernandez.clipExtent()[0][1]]));
      console.info("LD BBOX:", mainland.invert([juanFernandez.clipExtent()[1][0], juanFernandez.clipExtent()[1][1]]));
      console.info("LL BBOX:", mainland.invert([juanFernandez.clipExtent()[0][0], juanFernandez.clipExtent()[1][1]]));

      console.info("CLIP EXTENT pascua: ", pascua.clipExtent());
      console.info("UL BBOX:", mainland.invert([pascua.clipExtent()[0][0], pascua.clipExtent()[0][1]]));
      console.info("UR BBOX:", mainland.invert([pascua.clipExtent()[1][0], pascua.clipExtent()[0][1]]));
      console.info("LD BBOX:", mainland.invert([pascua.clipExtent()[1][0], pascua.clipExtent()[1][1]]));
      console.info("LL BBOX:", mainland.invert([pascua.clipExtent()[0][0], pascua.clipExtent()[1][1]]));
      */

      var ulantarctic = mainland([-82.6999, -51.3043]);
      var urantarctic = mainland([-77.5442, -51.6631]);
      var ldantarctic = mainland([-78.0254, -55.1860]);
      var llantarctic = mainland([-83.6106, -54.7785]);

      var uljuanFernandez = mainland([-80.0638, -35.9840]);
      var urjuanFernandez = mainland([-76.2153, -36.1811]);
      var ldjuanFernandez = mainland([-76.2994, -37.6839]);
      var lljuanFernandez = mainland([-80.2231, -37.4757]);

      var ulpascua = mainland([-78.442, -37.706]);
      var urpascua = mainland([-76.263, -37.8054]);
      var ldpascua = mainland([-76.344, -39.1595]);
      var llpascua = mainland([-78.5638, -39.0559]);

      context.moveTo(ulantarctic[0], ulantarctic[1]);
      context.lineTo(urantarctic[0], urantarctic[1]);
      context.lineTo(ldantarctic[0], ldantarctic[1]);
      context.lineTo(ldantarctic[0], ldantarctic[1]);
      context.lineTo(llantarctic[0], llantarctic[1]);
      context.closePath();

      context.moveTo(uljuanFernandez[0], uljuanFernandez[1]);
      context.lineTo(urjuanFernandez[0], urjuanFernandez[1]);
      context.lineTo(ldjuanFernandez[0], ldjuanFernandez[1]);
      context.lineTo(ldjuanFernandez[0], ldjuanFernandez[1]);
      context.lineTo(lljuanFernandez[0], lljuanFernandez[1]);
      context.closePath();

      context.moveTo(ulpascua[0], ulpascua[1]);
      context.lineTo(urpascua[0], urpascua[1]);
      context.lineTo(ldpascua[0], ldpascua[1]);
      context.lineTo(ldpascua[0], ldpascua[1]);
      context.lineTo(llpascua[0], llpascua[1]);
      context.closePath();


    };
    transverseMercatorChile.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return transverseMercatorChile.scale(700);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$6(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for Portugal, configured by default for 960×500.
  function conicEquidistantJapan() {
    var cache,
        cacheStream,
        mainland = d3Geo.geoConicEquidistant().rotate([-136, -22]).parallels([40, 34]), mainlandPoint, //gis.stackexchange.com/a/73135
        hokkaido = d3Geo.geoConicEquidistant().rotate([-146, -26]).parallels([40, 34]), hokkaidoPoint,
        okinawa = d3Geo.geoConicEquidistant().rotate([-126, -19]).parallels([40, 34]), okinawaPoint,

        point, pointStream = {point: function(x, y) { point = [x, y]; }};

        /*
        var mainlandBbox = [[126.0, 41.606], [142.97, 29.97]];
        var hokkaidoBbox = [[138.7, 45.61], [146.2, 41.2]];
        var okinawaBbox = [[122.6, 29.0], [130, 23.7]];
        */


    function conicEquidistantJapan(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (mainlandPoint.point(x, y), point) ||
          (hokkaidoPoint.point(x, y), point) ||
          (okinawaPoint.point(x, y), point);
    }

    conicEquidistantJapan.invert = function(coordinates) {
      var k = mainland.scale(),
          t = mainland.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;

          /*
          //How are the return values calculated:
          console.info("******");
          var c0 = hokkaido(hokkaidoBbox[0]);
          var x0 = (c0[0] - t[0]) / k;
          var y0 = (c0[1] - t[1]) / k;

          console.info("p0 hokkaido", x0 + ' - ' + y0);

          var c1 = hokkaido(hokkaidoBbox[1]);
          var x1 = (c1[0] - t[0]) / k;
          var y1 = (c1[1] - t[1]) / k;

          console.info("p1 hokkaido", x1 + ' - ' + y1);

          c0 = okinawa(okinawaBbox[0]);
          x0 = (c0[0] - t[0]) / k;
          y0 = (c0[1] - t[1]) / k;

          console.info("p0 okinawa", x0 + ' - ' + y0);

          c1 = okinawa(okinawaBbox[1]);
          x1 = (c1[0] - t[0]) / k;
          y1 = (c1[1] - t[1]) / k;

          console.info("p1 okinawa", x1 + ' - ' + y1);
          */

          return (y >= -0.10925 && y< -0.02701 && x >= -0.135 && x < -0.0397 ? hokkaido
              : y >= 0.04713 && y< 0.11138 && x >= -0.03986 && x < 0.051 ? okinawa
              : mainland).invert(coordinates);

    };

    conicEquidistantJapan.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$6([mainland.stream(cacheStream = stream), hokkaido.stream(stream), okinawa.stream(stream)]);
    };

    conicEquidistantJapan.precision = function(_) {
      if (!arguments.length) {return mainland.precision();}
      mainland.precision(_);
      hokkaido.precision(_);
      okinawa.precision(_);
      return reset();
    };

    conicEquidistantJapan.scale = function(_) {
      if (!arguments.length) {return mainland.scale();}
      mainland.scale(_);
      hokkaido.scale(_);
      okinawa.scale(_ * 0.7);
      return conicEquidistantJapan.translate(mainland.translate());
    };

    conicEquidistantJapan.translate = function(_) {
      if (!arguments.length) {return mainland.translate();}
      var k = mainland.scale(), x = +_[0], y = +_[1];

      /*
      var c0 = mainland(mainlandBbox[0]);
     var x0 = (x - c0[0]) / k;
     var y0 = (y - c0[1]) / k;

     var c1 = mainland(mainlandBbox[1]);
     var x1 = (x - c1[0]) / k;
     var y1 = (y - c1[1]) / k;

     console.info('Main: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     console.info('.clipExtent([[x '+
      (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
      ' * k, y '+
      (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
      ' * k],[x '+
      (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
      ' * k, y '+
      (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
      ' * k]])');

     c0 = hokkaido.translate([x - 0.0425 * k, y - 0.005 * k])(hokkaidoBbox[0]);
     x0 = (x - c0[0]) / k;
     y0 = (y - c0[1]) / k;

     c1 = hokkaido.translate([x - 0.0425 * k, y - 0.005 * k])(hokkaidoBbox[1]);
     x1 = (x - c1[0]) / k;
     y1 = (y - c1[1]) / k;

     console.info('hokkaido: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
     console.info('.clipExtent([[x '+
      (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
      ' * k + epsilon, y '+
      (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
      ' * k + epsilon],[x '+
      (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
      ' * k - epsilon, y '+
      (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
      ' * k - epsilon]])');

      c0 = okinawa.translate([x - 0 * k, y + 0 * k])(okinawaBbox[0]);
      x0 = (x - c0[0]) / k;
      y0 = (y - c0[1]) / k;

      c1 = okinawa.translate([x - 0 * k, y + 0 * k])(okinawaBbox[1]);
      x1 = (x - c1[0]) / k;
      y1 = (y - c1[1]) / k;

      console.info('okinawa: p0: ' + x0 + ', ' + y0 + ' , p1: ' + x1 + ' - ' + y1);
      console.info('.clipExtent([[x '+
       (x0<0?'+ ':'- ') + Math.abs(x0.toFixed(4))+
       ' * k + epsilon, y '+
       (y0<0?'+ ':'- ') + Math.abs(y0.toFixed(4))+
       ' * k + epsilon],[x '+
       (x1<0?'+ ':'- ') + Math.abs(x1.toFixed(4))+
       ' * k - epsilon, y '+
       (y1<0?'+ ':'- ') + Math.abs(y1.toFixed(4))+
       ' * k - epsilon]])');
       */

      mainlandPoint = mainland
          .translate(_)
          .clipExtent([[x - 0.1352 * k, y - 0.1091 * k],[x + 0.117 * k, y + 0.098 * k]])
          .stream(pointStream);


      hokkaidoPoint = hokkaido
          .translate([x - 0.0425 * k, y - 0.005 * k])
          .clipExtent([[x - 0.135 * k + epsilon, y - 0.1093 * k + epsilon],[x - 0.0397 * k - epsilon, y - 0.027 * k - epsilon]])
          .stream(pointStream);

      okinawaPoint = okinawa
          .translate(_)
          .clipExtent([[x - 0.0399 * k + epsilon, y + 0.0471 * k + epsilon],[x + 0.051 * k - epsilon, y + 0.1114 * k - epsilon]])
          .stream(pointStream);

      return reset();
    };

    conicEquidistantJapan.fitExtent = function(extent, object) {
      return fitExtent(conicEquidistantJapan, extent, object);
    };

    conicEquidistantJapan.fitSize = function(size, object) {
      return fitSize(conicEquidistantJapan, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return conicEquidistantJapan;
    }

    conicEquidistantJapan.drawCompositionBorders = function(context) {
      /*
      console.info("CLIP EXTENT hokkaido: ", hokkaido.clipExtent());
      console.info("UL BBOX:", mainland.invert([hokkaido.clipExtent()[0][0], hokkaido.clipExtent()[0][1]]));
      console.info("UR BBOX:", mainland.invert([hokkaido.clipExtent()[1][0], hokkaido.clipExtent()[0][1]]));
      console.info("LD BBOX:", mainland.invert([hokkaido.clipExtent()[1][0], hokkaido.clipExtent()[1][1]]));
      console.info("LL BBOX:", mainland.invert([hokkaido.clipExtent()[0][0], hokkaido.clipExtent()[1][1]]));
      */

      var ulhokkaido = mainland([ 126.01320483689143, 41.621090310215585 ]);
      var urhokkaido = mainland([ 133.04304387025903, 42.15087523707186 ]);
      var ldhokkaido = mainland([ 133.3021766080688, 37.43975444725098 ]);
      var llhokkaido = mainland([ 126.87889168628224, 36.95488945159779 ]);

      var llokinawa = mainland([132.9, 29.8]);
      var lmokinawa = mainland([134, 33]);
      var lrokinawa = mainland([139.3, 33.2]);
      var llrokinawa = mainland([139.16, 30.5]);


      context.moveTo(ulhokkaido[0], ulhokkaido[1]);
      context.lineTo(urhokkaido[0], urhokkaido[1]);
      context.lineTo(ldhokkaido[0], ldhokkaido[1]);
      context.lineTo(llhokkaido[0], llhokkaido[1]);
      context.closePath();

      context.moveTo(llokinawa[0], llokinawa[1]);
      context.lineTo(lmokinawa[0], lmokinawa[1]);
      context.lineTo(lrokinawa[0], lrokinawa[1]);
      context.lineTo(llrokinawa[0], llrokinawa[1]);

    };
    conicEquidistantJapan.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return conicEquidistantJapan.scale(2200);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$7(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for France, configured by default for 960×500.
  function conicConformalFrance() {
    var cache,
        cacheStream,
        europe = d3Geo.geoConicConformal().rotate([-3, -46.2]).parallels([0, 60]), europePoint,
        guyane = d3Geo.geoMercator().center([-53.2, 3.9]), guyanePoint,
        martinique = d3Geo.geoMercator().center([-61.03, 14.67]), martiniquePoint,
        guadeloupe = d3Geo.geoMercator().center([-61.46, 16.14]), guadeloupePoint,
        saintBarthelemy = d3Geo.geoMercator().center([-62.85, 17.92]), saintBarthelemyPoint,
        stPierreMiquelon = d3Geo.geoMercator().center([-56.23, 46.93]), stPierreMiquelonPoint,
        mayotte = d3Geo.geoMercator().center([45.16, -12.8]), mayottePoint,
        reunion = d3Geo.geoMercator().center([55.52, -21.13]), reunionPoint,
        nouvelleCaledonie = d3Geo.geoMercator().center([165.8, -21.07]), nouvelleCaledoniePoint,
        wallisFutuna = d3Geo.geoMercator().center([-178.1, -14.3]), wallisFutunaPoint,
        polynesie = d3Geo.geoMercator().center([-150.55, -17.11]), polynesiePoint,
        polynesie2 = d3Geo.geoMercator().center([-150.55, -17.11]), polynesie2Point,
        point, pointStream = {point: function(x, y) { point = [x, y]; }};

        /*
        var europeBbox = [[-6.5, 51], [10, 41]];
        var guyaneBbox = [[-54.5, 6.29], [-50.9, 1.48]];
        */


    function conicConformalFrance(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (europePoint.point(x, y), point) ||
          (guyanePoint.point(x, y), point) ||
          (martiniquePoint.point(x, y), point) ||
          (guadeloupePoint.point(x, y), point) ||
          (saintBarthelemyPoint.point(x, y), point) ||
          (stPierreMiquelonPoint.point(x, y), point) ||
          (mayottePoint.point(x, y), point) ||
          (reunionPoint.point(x, y), point) ||
          (nouvelleCaledoniePoint.point(x, y), point) ||
          (wallisFutunaPoint.point(x, y), point) ||
          (polynesiePoint.point(x, y), point) ||
          (polynesie2Point.point(x, y), point);
    }

    conicConformalFrance.invert = function(coordinates) {
      var k = europe.scale(),
          t = europe.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;

          return (y >= 0.029 && y< 0.0864 && x >= -0.14 && x < -0.0996 ? guyane
              : y >= 0 && y< 0.029 && x >= -0.14 && x < -0.0996 ? martinique
              : y >= -0.032 && y< 0 && x >= -0.14 && x < -0.0996 ? guadeloupe
              : y >= -0.052 && y< -0.032 && x >= -0.14 && x < -0.0996 ? saintBarthelemy
              : y >= -0.076 && y< 0.052 && x >= -0.14 && x < -0.0996 ? stPierreMiquelon
              : y >= -0.076 && y< -0.052 && x >= 0.0967 && x < 0.1371 ? mayotte
              : y >= -0.052 && y< -0.02 && x >= 0.0967 && x < 0.1371 ? reunion
              : y >= -0.02 && y< 0.012 && x >= 0.0967 && x < 0.1371 ? nouvelleCaledonie
              : y >= 0.012 && y< 0.033 && x >= 0.0967 && x < 0.1371 ? wallisFutuna
              : y >= 0.033 && y< 0.0864 && x >= 0.0967 && x < 0.1371 ? polynesie
              : europe).invert(coordinates);
    };

    conicConformalFrance.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$7([europe.stream(cacheStream = stream), guyane.stream(stream), martinique.stream(stream), guadeloupe.stream(stream), saintBarthelemy.stream(stream), stPierreMiquelon.stream(stream), mayotte.stream(stream), reunion.stream(stream), nouvelleCaledonie.stream(stream), wallisFutuna.stream(stream), polynesie.stream(stream), polynesie2.stream(stream)]);
    };

    conicConformalFrance.precision = function(_) {
      if (!arguments.length) {return europe.precision();}
      europe.precision(_);
      guyane.precision(_);
      martinique.precision(_);
      guadeloupe.precision(_);
      saintBarthelemy.precision(_);
      stPierreMiquelon.precision(_);
      mayotte.precision(_);
      reunion.precision(_);
      nouvelleCaledonie.precision(_);
      wallisFutuna.precision(_);
      polynesie.precision(_);
      polynesie2.precision(_);

      return reset();
    };

    conicConformalFrance.scale = function(_) {
      if (!arguments.length) {return europe.scale();}
      europe.scale(_);
      guyane.scale(_ * 0.6);
      martinique.scale(_ * 1.6);
      guadeloupe.scale(_ * 1.4);
      saintBarthelemy.scale(_ * 5);
      stPierreMiquelon.scale(_ * 1.3);
      mayotte.scale(_ * 1.6);
      reunion.scale(_ * 1.2);
      nouvelleCaledonie.scale(_ * 0.3);
      wallisFutuna.scale(_ * 2.7);
      polynesie.scale(_ * 0.5);
      polynesie2.scale(_ * 0.06);
      return conicConformalFrance.translate(europe.translate());
    };

    conicConformalFrance.translate = function(_) {
      if (!arguments.length) {return europe.translate();}
      var k = europe.scale(), x = +_[0], y = +_[1];

      europePoint = europe
          .translate(_)
          .clipExtent([[x - 0.0996 * k, y - 0.0908 * k],[x + 0.0967 * k, y + 0.0864 * k]])
          .stream(pointStream);


      guyanePoint = guyane
          .translate([x - 0.12 * k, y + 0.0575 * k])
          .clipExtent([[x - 0.14 * k + epsilon, y + 0.029 * k + epsilon],[x - 0.0996 * k - epsilon, y + 0.0864 * k - epsilon]])
          .stream(pointStream);

      martiniquePoint = martinique
          .translate([x - 0.12 * k, y + 0.013 * k])
          .clipExtent([[x - 0.14 * k + epsilon, y + 0 * k + epsilon],[x - 0.0996 * k - epsilon, y + 0.029 * k - epsilon]])
          .stream(pointStream);

      guadeloupePoint = guadeloupe
          .translate([x - 0.12 * k, y -0.014 * k])
          .clipExtent([[x - 0.14 * k + epsilon, y - 0.032 * k + epsilon],[x - 0.0996 * k - epsilon, y + 0 * k - epsilon]])
          .stream(pointStream);

      saintBarthelemyPoint = saintBarthelemy
          .translate([x - 0.12 * k, y - 0.044 * k])
          .clipExtent([[x - 0.14 * k + epsilon, y - 0.052 * k + epsilon],[x - 0.0996 * k - epsilon, y - 0.032 * k - epsilon]])
          .stream(pointStream);

      stPierreMiquelonPoint = stPierreMiquelon
          .translate([x - 0.12 * k, y - 0.065 * k])
          .clipExtent([[x - 0.14 * k + epsilon, y - 0.076 * k + epsilon],[x - 0.0996 * k - epsilon, y - 0.052 * k - epsilon]])
          .stream(pointStream);

      mayottePoint = mayotte
          .translate([x + 0.117 * k, y - 0.064 * k])
          .clipExtent([[x + 0.0967 * k + epsilon, y - 0.076 * k + epsilon],[x + 0.1371 * k - epsilon, y - 0.052 * k - epsilon]])
          .stream(pointStream);

      reunionPoint = reunion
          .translate([x + 0.116 * k, y - 0.0355 * k])
          .clipExtent([[x + 0.0967 * k + epsilon, y - 0.052 * k + epsilon],[x + 0.1371 * k - epsilon, y - 0.02 * k - epsilon]])
          .stream(pointStream);

      nouvelleCaledoniePoint = nouvelleCaledonie
          .translate([x + 0.116 * k, y - 0.0048 * k])
          .clipExtent([[x + 0.0967 * k + epsilon, y - 0.02 * k + epsilon],[x + 0.1371 * k - epsilon, y + 0.012 * k - epsilon]])
          .stream(pointStream);

      wallisFutunaPoint = wallisFutuna
          .translate([x + 0.116 * k, y + 0.022 * k])
          .clipExtent([[x + 0.0967 * k + epsilon, y + 0.012 * k + epsilon],[x + 0.1371 * k - epsilon, y + 0.033 * k - epsilon]])
          .stream(pointStream);

      polynesie2Point = polynesie2
          .translate([x + 0.11 * k, y + 0.045 * k])
          .clipExtent([[x + 0.0967 * k + epsilon, y + 0.033 * k + epsilon],[x + 0.1371 * k - epsilon, y  + 0.06 * k - epsilon]])
          .stream(pointStream);

      polynesiePoint = polynesie
          .translate([x + 0.115 * k, y + 0.075 * k])
          .clipExtent([[x + 0.0967 * k + epsilon, y + 0.06 * k + epsilon],[x + 0.1371 * k - epsilon, y  + 0.0864 * k - epsilon]])
          .stream(pointStream);


      return reset();
    };

    conicConformalFrance.fitExtent = function(extent, object) {
      return fitExtent(conicConformalFrance, extent, object);
    };

    conicConformalFrance.fitSize = function(size, object) {
      return fitSize(conicConformalFrance, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return conicConformalFrance;
    }

    conicConformalFrance.drawCompositionBorders = function(context) {

      /*
      console.log("var ul, ur, ld, ll;");
      var projs = [guyane, martinique, guadeloupe, saintBarthelemy, stPierreMiquelon, mayotte, reunion, nouvelleCaledonie, wallisFutuna, polynesie, polynesie2];
      for (var i in projs){
        var ul = europe.invert([projs[i].clipExtent()[0][0], projs[i].clipExtent()[0][1]]);
        var ur = europe.invert([projs[i].clipExtent()[1][0], projs[i].clipExtent()[0][1]]);
        var ld = europe.invert([projs[i].clipExtent()[1][0], projs[i].clipExtent()[1][1]]);
        var ll = europe.invert([projs[i].clipExtent()[0][0], projs[i].clipExtent()[1][1]]);

        console.log("ul = europe(["+ul+"]);");
        console.log("ur = europe(["+ur+"]);");
        console.log("ld = europe(["+ld+"]);");
        console.log("ll = europe(["+ll+"]);");

        console.log("context.moveTo(ul[0], ul[1]);");
        console.log("context.lineTo(ur[0], ur[1]);");
        console.log("context.lineTo(ld[0], ld[1]);");
        console.log("context.lineTo(ll[0], ll[1]);");
        console.log("context.closePath();");

      }*/

      var ul, ur, ld, ll;
      ul = europe([-7.938886725111036,43.7219460918835]);
      ur = europe([-4.832080896458295,44.12930268549372]);
      ld = europe([-4.205299743793263,40.98096346967365]);
      ll = europe([-7.071796453126152,40.610037319181444]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([-8.42751373617692,45.32889452553031]);
      ur = europe([-5.18599305777107,45.7566442062976]);
      ld = europe([-4.832080905154431,44.129302726751426]);
      ll = europe([-7.938886737126192,43.72194613263854]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([-9.012656899657046,47.127733821030176]);
      ur = europe([-5.6105244772793155,47.579777861410626]);
      ld = europe([-5.185993067168585,45.756644248170346]);
      ll = europe([-8.427513749141811,45.32889456686326]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([-9.405747558985553,48.26506375557457]);
      ur = europe([-5.896175018439575,48.733352850851624]);
      ld = europe([-5.610524487556043,47.57977790393761]);
      ll = europe([-9.012656913808351,47.127733862971255]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([-9.908436061346974,49.642448789505856]);
      ur = europe([-6.262026716233124,50.131426841787174]);
      ld = europe([-5.896175029331232,48.73335289377258]);
      ll = europe([-9.40574757396393,48.26506379787767]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([11.996907706504462,50.16039028163579]);
      ur = europe([15.649907879773343,49.68279246765253]);
      ld = europe([15.156712840526632,48.30371557625831]);
      ll = europe([11.64122661754411,48.761078240546816]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([11.641226606955788,48.7610781975889]);
      ur = europe([15.156712825832164,48.30371553390465]);
      ld = europe([14.549932166241172,46.4866532486199]);
      ll = europe([11.204443787952183,46.91899233914248]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([11.204443778297161,46.918992296823646]);
      ur = europe([14.549932152815039,46.486653206856396]);
      ld = europe([13.994409796764009,44.695833444323256]);
      ll = europe([10.805306599253848,45.105133870684924]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([10.805306590412085,45.10513382903308]);
      ur = europe([13.99440978444733,44.695833403183606]);
      ld = europe([13.654633799024392,43.53552468558152]);
      ll = europe([10.561516803980956,43.930671459798624]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();

      ul = europe([10.561516795617383,43.93067141859757]);
      ur = europe([13.654633787361952,43.5355246448671]);
      ld = europe([12.867691604239901,40.640701985019405]);
      ll = europe([9.997809515987688,41.00288343254471]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();

      ul = europe([10.8,42.4]);
      ur = europe([12.8,42.13]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);

    };
    conicConformalFrance.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return conicConformalFrance.scale(2700);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$8(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for Portugal, configured by default for 960×500.
  function conicConformalEurope() {
    var cache,
        cacheStream,
        europe = d3Geo.geoConicConformal().rotate([-10, -53]).parallels([0, 60]), europePoint,
        guadeloupe = d3Geo.geoMercator().center([-61.46, 16.14]), guadeloupePoint,
        guyane = d3Geo.geoMercator().center([-53.2, 3.9]), guyanePoint,
        azores = d3Geo.geoConicConformal().rotate([27.8, -38.9]).parallels([0, 60]), azoresPoint,
        azores2 = d3Geo.geoConicConformal().rotate([25.43, -37.398]).parallels([0, 60]), azores2Point,
        azores3 = d3Geo.geoConicConformal().rotate([31.17, -39.539]).parallels([0, 60]), azores3Point,
        madeira = d3Geo.geoConicConformal().rotate([17, -32.7]).parallels([0, 60]), madeiraPoint,
        canaryIslands = d3Geo.geoConicConformal().rotate([16, -28.5]).parallels([0,60]), canaryIslandsPoint,
        martinique = d3Geo.geoMercator().center([-61.03, 14.67]), martiniquePoint,
        mayotte = d3Geo.geoMercator().center([45.16, -12.8]), mayottePoint,
        reunion = d3Geo.geoMercator().center([55.52, -21.13]), reunionPoint,
        malta = d3Geo.geoConicConformal().rotate([-14.4, -35.95]).parallels([0, 60]), maltaPoint,





        point, pointStream = {point: function(x, y) { point = [x, y]; }};

        /*
        var europeBbox = [[-6.5, 51], [10, 41]];
        var guyaneBbox = [[-54.5, 6.29], [-50.9, 1.48]];
        */


    function conicConformalEurope(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (europePoint.point(x, y), point) ||
          (guyanePoint.point(x, y), point) ||
          (martiniquePoint.point(x, y), point) ||
          (guadeloupePoint.point(x, y), point) ||
          (canaryIslandsPoint.point(x, y), point) ||
          (madeiraPoint.point(x, y), point) ||
          (mayottePoint.point(x, y), point) ||
          (reunionPoint.point(x, y), point) ||
          (maltaPoint.point(x, y), point) ||
          (azoresPoint.point(x, y), point) ||
          (azores2Point.point(x, y), point) ||
          (azores3Point.point(x, y), point);
    }

    conicConformalEurope.invert = function(coordinates) {
      var k = europe.scale(),
          t = europe.translate(),
          x = (coordinates[0] - (t[0] + 0.08 * k)) / k,
          y = (coordinates[1] - t[1]) / k;

          return (y >= -0.31 && y< -0.24 && x >= 0.14 && x < 0.24 ? guadeloupe
              : y >= -0.24 && y< -0.17 && x >= 0.14 && x < 0.24 ? guyane
              : y >= -0.17 && y< -0.12 && x >= 0.21 && x < 0.24 ? azores2
              : y >= -0.17 && y< -0.14 && x >= 0.14 && x < 0.165 ? azores3
              : y >= -0.17 && y< -0.1 && x >= 0.14 && x < 0.24 ? azores
              : y >= -0.1 && y< -0.03 && x >= 0.14 && x < 0.24 ? madeira
              : y >= -0.03 && y< 0.04 && x >= 0.14 && x < 0.24 ? canaryIslands
              : y >= -0.31 && y< -0.24 && x >= 0.24 && x < 0.34 ? martinique
              : y >= -0.24 && y< -0.17 && x >= 0.24 && x < 0.34 ? mayotte
              : y >= -0.17 && y< -0.1 && x >= 0.24 && x < 0.34 ? reunion
              : y >= -0.1 && y< -0.03 && x >= 0.24 && x < 0.34 ? malta
              : europe).invert(coordinates);

    };

    conicConformalEurope.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$8([europe.stream(cacheStream = stream), guyane.stream(stream), martinique.stream(stream), guadeloupe.stream(stream), canaryIslands.stream(stream), madeira.stream(stream), mayotte.stream(stream), reunion.stream(stream), malta.stream(stream), azores.stream(stream), azores2.stream(stream), azores3.stream(stream)]);
    };

    conicConformalEurope.precision = function(_) {
      if (!arguments.length) {return europe.precision();}
      europe.precision(_);
      guyane.precision(_);
      martinique.precision(_);
      guadeloupe.precision(_);
      canaryIslands.precision(_);
      madeira.precision(_);
      mayotte.precision(_);
      reunion.precision(_);
      malta.precision(_);

      azores.precision(_);
      azores2.precision(_);
      azores3.precision(_);

      return reset();
    };

    conicConformalEurope.scale = function(_) {
      if (!arguments.length) {return europe.scale();}
      europe.scale(_);
      guadeloupe.scale(_ * 3);
      guyane.scale(_ * 0.8);
      martinique.scale(_ * 3.5);
      reunion.scale(_ * 2.7);
      azores.scale(_ * 2);
      azores2.scale(_ * 2);
      azores3.scale(_ * 2);
      madeira.scale(_ * 3);
      canaryIslands.scale(_);

      mayotte.scale(_ * 5.5);
      malta.scale(_ * 6);



      return conicConformalEurope.translate(europe.translate());
    };

    conicConformalEurope.translate = function(_) {
      if (!arguments.length) {return europe.translate();}
      var k = europe.scale(), x = +_[0], y = +_[1];

      europePoint = europe
          .translate([x - 0.08 * k, y])
          .clipExtent([[x - 0.51 * k, y - 0.33 * k],[x + 0.5 * k, y + 0.33 * k]])
          .stream(pointStream);

      guadeloupePoint = guadeloupe
          .translate([x + 0.19 * k, y - 0.275 * k])
          .clipExtent([[x + 0.14 * k + epsilon, y - 0.31 * k + epsilon],[x + 0.24 * k - epsilon, y - 0.24 * k - epsilon]])
          .stream(pointStream);

      guyanePoint = guyane
          .translate([x + 0.19 * k, y - 0.205 * k])
          .clipExtent([[x + 0.14 * k + epsilon, y - 0.24 * k + epsilon],[x + 0.24 * k - epsilon, y - 0.17 * k - epsilon]])
          .stream(pointStream);

      azoresPoint = azores
          .translate([x + 0.19 * k, y - 0.135 * k])
          .clipExtent([[x + 0.14 * k + epsilon, y - 0.17 * k + epsilon],[x + 0.24 * k - epsilon, y - 0.1 * k - epsilon]])
          .stream(pointStream);

      azores2Point = azores2
          .translate([x + 0.225 * k, y - 0.147 * k])
          .clipExtent([[x + 0.21 * k + epsilon, y - 0.17 * k + epsilon],[x + 0.24 * k - epsilon, y - 0.12 * k - epsilon]])
          .stream(pointStream);

      azores3Point = azores3
          .translate([x + 0.153 * k, y - 0.15 * k])
          .clipExtent([[x + 0.14 * k + epsilon, y - 0.17 * k + epsilon],[x + 0.165 * k - epsilon, y - 0.14 * k - epsilon]])
          .stream(pointStream);

      madeiraPoint = madeira
          .translate([x + 0.19 * k, y - 0.065 * k])
          .clipExtent([[x + 0.14 * k + epsilon, y - 0.1 * k + epsilon],[x + 0.24 * k - epsilon, y - 0.03 * k - epsilon]])
          .stream(pointStream);

      canaryIslandsPoint = canaryIslands
          .translate([x + 0.19 * k, y + 0.005 * k])
          .clipExtent([[x + 0.14 * k + epsilon, y - 0.03 * k + epsilon],[x + 0.24 * k - epsilon, y + 0.04 * k - epsilon]])
          .stream(pointStream);

      martiniquePoint = martinique
          .translate([x + 0.29 * k, y - 0.275 * k])
          .clipExtent([[x + 0.24 * k + epsilon, y - 0.31 * k + epsilon],[x + 0.34 * k - epsilon, y - 0.24 * k - epsilon]])
          .stream(pointStream);

      mayottePoint = mayotte
          .translate([x + 0.29 * k, y - 0.205 * k])
          .clipExtent([[x + 0.24 * k + epsilon, y - 0.24 * k + epsilon],[x + 0.34 * k - epsilon, y - 0.17 * k - epsilon]])
          .stream(pointStream);

      reunionPoint = reunion
          .translate([x + 0.29 * k, y - 0.135 * k])
          .clipExtent([[x + 0.24 * k + epsilon, y - 0.17 * k + epsilon],[x + 0.34 * k - epsilon, y - 0.1 * k - epsilon]])
          .stream(pointStream);

      maltaPoint = malta
          .translate([x + 0.29 * k, y - 0.065 * k])
          .clipExtent([[x + 0.24 * k + epsilon, y - 0.1 * k + epsilon],[x + 0.34 * k - epsilon, y - 0.03 * k - epsilon]])
          .stream(pointStream);



      return reset();
    };

    conicConformalEurope.fitExtent = function(extent, object) {
      return fitExtent(conicConformalEurope, extent, object);
    };

    conicConformalEurope.fitSize = function(size, object) {
      return fitSize(conicConformalEurope, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return conicConformalEurope;
    }

    conicConformalEurope.drawCompositionBorders = function(context) {

      /*
      console.log("var ul, ur, ld, ll;");
      var projs = [guyane, martinique, guadeloupe, canaryIslands, madeira, mayotte, reunion, malta, azores, azores2, azores3];
      for (var i in projs){
        var ul = europe.invert([projs[i].clipExtent()[0][0], projs[i].clipExtent()[0][1]]);
        var ur = europe.invert([projs[i].clipExtent()[1][0], projs[i].clipExtent()[0][1]]);
        var ld = europe.invert([projs[i].clipExtent()[1][0], projs[i].clipExtent()[1][1]]);
        var ll = europe.invert([projs[i].clipExtent()[0][0], projs[i].clipExtent()[1][1]]);

        console.log("ul = europe(["+ul+"]);");
        console.log("ur = europe(["+ur+"]);");
        console.log("ld = europe(["+ld+"]);");
        console.log("ll = europe(["+ll+"]);");

        console.log("context.moveTo(ul[0], ul[1]);");
        console.log("context.lineTo(ur[0], ur[1]);");
        console.log("context.lineTo(ld[0], ld[1]);");
        console.log("context.lineTo(ll[0], ll[1]);");
        console.log("context.closePath();");

      }*/

      var ul, ur, ld, ll;
      ul = europe([42.45755610828648,63.343658547914934]);
      ur = europe([52.65837266667029,59.35045080290929]);
      ld = europe([47.19754502247785,56.12653496548117]);
      ll = europe([37.673034273363044,59.61638268506111]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([59.41110754003403,62.35069727399336]);
      ur = europe([66.75050228640794,57.11797303636038]);
      ld = europe([60.236065725110436,54.63331433818992]);
      ll = europe([52.65837313153311,59.350450804599355]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([48.81091130080243,66.93353402634641]);
      ur = europe([59.41110730654679,62.35069740653086]);
      ld = europe([52.6583728974441,59.3504509222445]);
      ll = europe([42.45755631675751,63.34365868805821]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([31.054198418446475,52.1080673766184]);
      ur = europe([39.09869284884117,49.400700047190554]);
      ld = europe([36.0580811499175,46.02944174908498]);
      ll = europe([28.690508588835726,48.433126979386415]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([33.977877745912025,55.849945501331]);
      ur = europe([42.75328432167726,52.78455122462353]);
      ld = europe([39.09869297540224,49.400700176148625]);
      ll = europe([31.05419851807008,52.10806751810923]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([52.658372900759296,59.35045068526415]);
      ur = europe([60.23606549583304,54.63331423800264]);
      ld = europe([54.6756370953122,51.892298789399455]);
      ll = europe([47.19754524788189,56.126534861222794]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([47.19754506082455,56.126534735591456]);
      ur = europe([54.675636900123514,51.892298681337095]);
      ld = europe([49.94448648951486,48.98775484983285]);
      ll = europe([42.75328468716108,52.78455126060818]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([42.75328453416769,52.78455113209101]);
      ur = europe([49.94448632339758,48.98775473706457]);
      ld = europe([45.912339990394315,45.99361784987003]);
      ll = europe([39.09869317356607,49.40070009378711]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([37.673034114296634,59.61638254183119]);
      ur = europe([47.197544835420544,56.126534839849846]);
      ld = europe([42.75328447467064,52.78455135314068]);
      ll = europe([33.977877870363905,55.849945644671145]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([44.56748486446032,57.26489367845818]);
      ld = europe([43.9335791193588,53.746540942601726]);
      ll = europe([43,56]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = europe([37.673034114296634,59.61638254183119]);
      ur = europe([40.25902691953466,58.83002044222639]);
      ld = europe([38.458270492742024,57.26232178028002]);
      ll = europe([35.97754948030156,58.00266637992386]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();



    };
    conicConformalEurope.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return conicConformalEurope.scale(750);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$9(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for Malaysia, configured by default for 960×500.
  function mercatorMalaysia() {
    var cache,
        cacheStream,

        peninsular = d3Geo.geoMercator().center([105.25, 4.00]), peninsularPoint,
        borneo = d3Geo.geoMercator().center([118.65,2.86]), borneoPoint,

        point, pointStream = {point: function(x, y) { point = [x, y]; }};


    function mercatorMalaysia(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (peninsularPoint.point(x, y), point) ||
          (borneoPoint.point(x, y), point);
    }

    mercatorMalaysia.invert = function(coordinates) {
      var k = peninsular.scale(),
          t = peninsular.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;

          return (y >=  -0.0521 && y < 0.0229 && x >= -0.0111 && x < 0.1000 ? borneo
              : peninsular).invert(coordinates);
    };

    mercatorMalaysia.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$9([peninsular.stream(cacheStream = stream), borneo.stream(stream)]);
    };

    mercatorMalaysia.precision = function(_) {
      if (!arguments.length) {return peninsular.precision();}
      peninsular.precision(_);
      borneo.precision(_);
      return reset();
    };

    mercatorMalaysia.scale = function(_) {
      if (!arguments.length) {return peninsular.scale();}
      peninsular.scale(_);
      borneo.scale(_ * 0.615);
      return mercatorMalaysia.translate(peninsular.translate());
    };

    mercatorMalaysia.translate = function(_) {
      if (!arguments.length) {return peninsular.translate();}
      var k = peninsular.scale(), x = +_[0], y = +_[1];

      peninsularPoint = peninsular
          .translate(_)
          .clipExtent([[x - 0.1100 * k, y - 0.0521 * k],[x - 0.0111 * k, y + 0.0521 * k]])
          .stream(pointStream);

      borneoPoint = borneo
          .translate([x + 0.09000 * k, y - 0.00 * k])
          .clipExtent([[x - 0.0111 * k + epsilon, y -0.0521 * k + epsilon],[x + 0.1000 * k - epsilon, y + 0.024 * k - epsilon]])
          .stream(pointStream);

      return reset();
    };

    mercatorMalaysia.fitExtent = function(extent, object) {
      return fitExtent(mercatorMalaysia, extent, object);
    };

    mercatorMalaysia.fitSize = function(size, object) {
      return fitSize(mercatorMalaysia, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return mercatorMalaysia;
    }

    mercatorMalaysia.drawCompositionBorders = function(context) {
    
      var llbor = peninsular([106.3214, 2.0228]);
  		var lmbor = peninsular([105.1843, 2.3761]);
  		var lrbor = peninsular([104.2151, 3.3618]);
  		var llrbor = peninsular([104.2150, 4.5651]);

      context.moveTo(llbor[0], llbor[1]);
      context.lineTo(lmbor[0], lmbor[1]);
      context.lineTo(lrbor[0], lrbor[1]);
      context.lineTo(llrbor[0], llrbor[1]);

    };
    mercatorMalaysia.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return mercatorMalaysia.scale(4800);
  }

  // The projections must have mutually exclusive clip regions on the sphere,
  // as this will avoid emitting interleaving lines and polygons.
  function multiplex$10(streams) {
    var n = streams.length;
    return {
      point: function(x, y) { var i = -1; while (++i < n) {streams[i].point(x, y); }},
      sphere: function() { var i = -1; while (++i < n) {streams[i].sphere(); }},
      lineStart: function() { var i = -1; while (++i < n) {streams[i].lineStart(); }},
      lineEnd: function() { var i = -1; while (++i < n) {streams[i].lineEnd(); }},
      polygonStart: function() { var i = -1; while (++i < n) {streams[i].polygonStart(); }},
      polygonEnd: function() { var i = -1; while (++i < n) {streams[i].polygonEnd(); }}
    };
  }

  // A composite projection for Equatorial Guinea, configured by default for 960×500.
  function mercatorEquatorialGuinea() {
    var cache,
        cacheStream,
        continent = d3Geo.geoMercator().rotate([-9.5, -1.5]), continentPoint,
        bioko = d3Geo.geoMercator().rotate([-8.6, -3.5]), biokoPoint,
        annobon = d3Geo.geoMercator().rotate([-5.6, 1.45]), annobonPoint,

        point, pointStream = {point: function(x, y) { point = [x, y]; }};

    function mercatorEquatorialGuinea(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      return point = null,
          (continentPoint.point(x, y), point) ||
          (biokoPoint.point(x, y), point) ||
          (annobonPoint.point(x, y), point);
    }

    mercatorEquatorialGuinea.invert = function(coordinates) {
      var k = continent.scale(),
          t = continent.translate(),
          x = (coordinates[0] - t[0]) / k,
          y = (coordinates[1] - t[1]) / k;
          return (y >= -0.02 && y< 0 && x >= -0.038 && x < -0.005 ? bioko
              : y >= 0 && y< 0.02 && x >= -0.038 && x < -0.005 ? annobon
              : continent).invert(coordinates);
    };

    mercatorEquatorialGuinea.stream = function(stream) {
      return cache && cacheStream === stream ? cache : cache = multiplex$10([continent.stream(cacheStream = stream), bioko.stream(stream), annobon.stream(stream)]);
    };

    mercatorEquatorialGuinea.precision = function(_) {
      if (!arguments.length) {return continent.precision();}
      continent.precision(_);
      bioko.precision(_);
      annobon.precision(_);
      return reset();
    };

    mercatorEquatorialGuinea.scale = function(_) {
      if (!arguments.length) {return continent.scale();}
      continent.scale(_);
      bioko.scale(_* 1.5);
      annobon.scale(_* 4);
      return mercatorEquatorialGuinea.translate(continent.translate());
    };

    mercatorEquatorialGuinea.translate = function(_) {
      if (!arguments.length) {return continent.translate();}
      var k = continent.scale(), x = +_[0], y = +_[1];
      continentPoint = continent
          .translate(_)
          .clipExtent([[x - 0.005 * k, y - 0.02 * k],[x + 0.038 * k, y +0.02 * k]])
          .stream(pointStream);

      biokoPoint = bioko
          .translate([x - 0.025 * k, y - 0.01 * k])
          .clipExtent([[x - 0.038 * k + epsilon, y - 0.02 * k + epsilon],[x - 0.005 * k - epsilon, y + 0 * k - epsilon]])
          .stream(pointStream);

      annobonPoint = annobon
          .translate([x - 0.025 * k, y + 0.01 * k])
          .clipExtent([[x - 0.038 * k + epsilon, y - 0 * k + epsilon],[x - 0.005 * k - epsilon, y + 0.02 * k - epsilon]])
          .stream(pointStream);


      return reset();
    };

    mercatorEquatorialGuinea.fitExtent = function(extent, object) {
      return fitExtent(mercatorEquatorialGuinea, extent, object);
    };

    mercatorEquatorialGuinea.fitSize = function(size, object) {
      return fitSize(mercatorEquatorialGuinea, size, object);
    };

    function reset() {
      cache = cacheStream = null;
      return mercatorEquatorialGuinea;
    }

    mercatorEquatorialGuinea.drawCompositionBorders = function(context) {
      /*
      console.log("var ul, ur, ld, ll;");
      var projs = [continent, bioko, annobon];
      for (var i in projs){
        var ul = continent.invert([projs[i].clipExtent()[0][0], projs[i].clipExtent()[0][1]]);
        var ur = continent.invert([projs[i].clipExtent()[1][0], projs[i].clipExtent()[0][1]]);
        var ld = continent.invert([projs[i].clipExtent()[1][0], projs[i].clipExtent()[1][1]]);
        var ll = continent.invert([projs[i].clipExtent()[0][0], projs[i].clipExtent()[1][1]]);

        console.log("ul = continent(["+ul+"]);");
        console.log("ur = continent(["+ur+"]);");
        console.log("ld = continent(["+ld+"]);");
        console.log("ll = continent(["+ll+"]);");

        console.log("context.moveTo(ul[0], ul[1]);");
        console.log("context.lineTo(ur[0], ur[1]);");
        console.log("context.lineTo(ld[0], ld[1]);");
        console.log("context.lineTo(ll[0], ll[1]);");
        console.log("context.closePath();");

      }*/

      var ul, ur, ld, ll;
      ul = continent([9.21327272751682,2.645820439454123]);
      ur = continent([11.679126293239872,2.644755519268689]);
      ld = continent([11.676845389029227,0.35307824637606433]);
      ll = continent([9.213572917774014,0.35414205204417754]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = continent([7.320873711543669,2.64475551449975]);
      ur = continent([9.213272722738658,2.645820434679803]);
      ld = continent([9.213422896480349,1.4999812505283054]);
      ll = continent([7.322014760520787,1.4989168878985566]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();
      ul = continent([7.3220147605302905,1.4989168783492766]);
      ur = continent([9.213422896481598,1.499981240979021]);
      ld = continent([9.213572912999604,0.354142056817247]);
      ll = continent([7.323154615739809,0.353078251154504]);
      context.moveTo(ul[0], ul[1]);
      context.lineTo(ur[0], ur[1]);
      context.lineTo(ld[0], ld[1]);
      context.lineTo(ll[0], ll[1]);
      context.closePath();

    };
    mercatorEquatorialGuinea.getCompositionBorders = function() {
      var context = d3Path.path();
      this.drawCompositionBorders(context);
      return context.toString();
    };

    return mercatorEquatorialGuinea.scale(12000);
  }

  exports.geoAlbersUsa = albersUsa;
  exports.geoAlbersUsaTerritories = albersUsaTerritories;
  exports.geoConicConformalSpain = conicConformalSpain;
  exports.geoConicConformalPortugal = conicConformalPortugal;
  exports.geoMercatorEcuador = mercatorEcuador;
  exports.geoTransverseMercatorChile = transverseMercatorChile;
  exports.geoConicEquidistantJapan = conicEquidistantJapan;
  exports.geoConicConformalFrance = conicConformalFrance;
  exports.geoConicConformalEurope = conicConformalEurope;
  exports.geoMercatorMalaysia = mercatorMalaysia;
  exports.geoMercatorEquatorialGuinea = mercatorEquatorialGuinea;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
});

var d3Geo = ( index$2 && undefined ) || index$2;

var d3GeoProjection = ( index$5 && undefined ) || index$5;

var getGeoProjection = function (projection) {
  if (isFunction_1(projection)) {
    return projection();
  }
  if (isString_1(projection)) {
    if (d3Geo[projection]) {
      return d3Geo[projection]();
    }
    if (d3GeoProjection[projection]) {
      return d3GeoProjection[projection]();
    }
    if (d3CompositeProjections[projection]) {
      return d3CompositeProjections[projection]();
    }
  }
  return null;
};

var geoArea = d3Geo.geoArea;
var geoCentroid = d3Geo.geoCentroid;
var geoContains = d3Geo.geoContains;
var geoDistance = d3Geo.geoDistance;
var geoLength = d3Geo.geoLength;
var geoProject = d3GeoProjection.geoProject;


assign_1(dataView.prototype, {
  // geo maintain
  geoArea: function (feature) {
    return geoArea(feature);
  },
  geoAreaByName: function (name) {
    return geoArea(this.geoFeatureByName(name));
  },
  geoCentroid: function (feature) {
    return geoCentroid(feature);
  },
  geoCentroidByName: function (name) {
    return geoCentroid(this.geoFeatureByName(name));
  },
  geoDistance: function (p1, p2) {
    return geoDistance(p1, p2);
  },
  geoLength: function (feature) {
    return geoLength(feature);
  },
  geoLengthByName: function (name) {
    return geoLength(this.geoFeatureByName(name));
  },
  geoContains: function (feature, position /* [longitude, latitude] */) {
    return geoContains(feature, position);
  },
  geoFeatureByName: function (name) {
    var rows = this.rows;
    var result = void 0;
    some_1(rows, function (feature) {
      if (feature.name === name) {
        result = feature;
        return true;
      }
    });
    return result;
  },
  geoFeatureByPosition: function (position) {
    var rows = this.rows;
    var result = void 0;
    some_1(rows, function (feature) {
      if (geoContains(feature, position)) {
        result = feature;
        return true;
      }
    });
    return result;
  },
  geoNameByPosition: function (position) {
    var feature = this.geoFeatureByPosition(position);
    if (feature) {
      return feature.name;
    }
  },

  // projection
  geoProject: function (feature, projection) {
    projection = getGeoProjection(projection);
    return geoProject(feature, projection);
  },
  geoProjectByName: function (name, projection) {
    projection = getGeoProjection(projection);
    return geoProject(this.geoFeatureByName(name), projection);
  },
  geoProjectPosition: function (position, projection) {
    projection = getGeoProjection(projection);
    return projection(position);
  },
  geoProjectInvert: function (point /* [x, y] */, projection) {
    projection = getGeoProjection(projection);
    return projection.invert(point);
  }
});

/* eslint-disable no-cond-assign, no-loop-func */

assign_1(dataView.prototype, {
  getAllNodes: function () {
    var nodes = [];
    this.root.each(function (node) {
      nodes.push(node);
    });
    return nodes;
  },
  getAllLinks: function () {
    var links = [];
    var nodes = [this.root];
    var node = void 0;
    while (node = nodes.pop()) {
      var children = node.children;
      if (children) {
        each(children, function (child) {
          links.push({
            source: node,
            target: child
          });
          nodes.push(child);
        });
      }
    }
    return links;
  }
});

/* @flow */

/**
 * [Simple linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression)
 * is a simple way to find a fitted line
 * between a set of coordinates. This algorithm finds the slope and y-intercept of a regression line
 * using the least sum of squares.
 *
 * @param {Array<Array<number>>} data an array of two-element of arrays,
 * like `[[0, 1], [2, 3]]`
 * @returns {Object} object containing slope and intersect of regression line
 * @example
 * linearRegression([[0, 0], [1, 1]]); // => { m: 1, b: 0 }
 */
function linearRegression(data/*: Array<Array<number>> */)/*: { m: number, b: number } */ {

    var m, b;

    // Store data length in a local variable to reduce
    // repeated object property lookups
    var dataLength = data.length;

    //if there's only one point, arbitrarily choose a slope of 0
    //and a y-intercept of whatever the y of the initial point is
    if (dataLength === 1) {
        m = 0;
        b = data[0][1];
    } else {
        // Initialize our sums and scope the `m` and `b`
        // variables that define the line.
        var sumX = 0, sumY = 0,
            sumXX = 0, sumXY = 0;

        // Use local variables to grab point values
        // with minimal object property lookups
        var point, x, y;

        // Gather the sum of all x values, the sum of all
        // y values, and the sum of x^2 and (x*y) for each
        // value.
        //
        // In math notation, these would be SS_x, SS_y, SS_xx, and SS_xy
        for (var i = 0; i < dataLength; i++) {
            point = data[i];
            x = point[0];
            y = point[1];

            sumX += x;
            sumY += y;

            sumXX += x * x;
            sumXY += x * y;
        }

        // `m` is the slope of the regression line
        m = ((dataLength * sumXY) - (sumX * sumY)) /
            ((dataLength * sumXX) - (sumX * sumX));

        // `b` is the y-intercept of the line.
        b = (sumY / dataLength) - ((m * sumX) / dataLength);
    }

    // Return both values as an object.
    return {
        m: m,
        b: b
    };
}


var linear_regression = linearRegression;

/* @flow */

/**
 * Given the output of `linearRegression`: an object
 * with `m` and `b` values indicating slope and intercept,
 * respectively, generate a line function that translates
 * x values into y values.
 *
 * @param {Object} mb object with `m` and `b` members, representing
 * slope and intersect of desired line
 * @returns {Function} method that computes y-value at any given
 * x-value on the line.
 * @example
 * var l = linearRegressionLine(linearRegression([[0, 0], [1, 1]]));
 * l(0) // = 0
 * l(2) // = 2
 * linearRegressionLine({ b: 0, m: 1 })(1); // => 1
 * linearRegressionLine({ b: 1, m: 1 })(1); // => 2
 */
function linearRegressionLine(mb/*: { b: number, m: number }*/)/*: Function */ {
    // Return a function that computes a `y` value for each
    // x value it is given, based on the values of `b` and `a`
    // that we just computed.
    return function(x) {
        return mb.b + (mb.m * x);
    };
}

var linear_regression_line = linearRegressionLine;

/* @flow */

/**
 * Our default sum is the [Kahan-Babuska algorithm](https://pdfs.semanticscholar.org/1760/7d467cda1d0277ad272deb2113533131dc09.pdf).
 * This method is an improvement over the classical
 * [Kahan summation algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm).
 * It aims at computing the sum of a list of numbers while correcting for
 * floating-point errors. Traditionally, sums are calculated as many
 * successive additions, each one with its own floating-point roundoff. These
 * losses in precision add up as the number of numbers increases. This alternative
 * algorithm is more accurate than the simple way of calculating sums by simple
 * addition.
 *
 * This runs on `O(n)`, linear time in respect to the array.
 *
 * @param {Array<number>} x input
 * @return {number} sum of all input numbers
 * @example
 * sum([1, 2, 3]); // => 6
 */
function sum$4(x/*: Array<number> */)/*: number */ {

    // If the array is empty, we needn't bother computing its sum
    if (x.length === 0) {
        return 0;
    }

    // Initializing the sum as the first number in the array
    var sum = x[0];

    // Keeping track of the floating-point error correction
    var correction = 0;

    var transition;

    for (var i = 1; i < x.length; i++) {
        transition = sum + x[i];

        // Here we need to update the correction in a different fashion
        // if the new absolute value is greater than the absolute sum
        if (Math.abs(sum) >= Math.abs(x[i])) {
            correction += ((sum - transition) + x[i]);
        }
        else {
            correction += ((x[i] - transition) + sum);
        }

        sum = transition;
    }

    // Returning the corrected sum
    return sum + correction;
}

var sum_1 = sum$4;

/* @flow */



/**
 * The mean, _also known as average_,
 * is the sum of all values over the number of values.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x sample of one or more data points
 * @throws {Error} if the the length of x is less than one
 * @returns {number} mean
 * @example
 * mean([0, 10]); // => 5
 */
function mean$2(x /*: Array<number> */)/*:number*/ {
    // The mean of no numbers is null
    if (x.length === 0) {
        throw new Error('mean requires at least one data point');
    }

    return sum_1(x) / x.length;
}

var mean_1 = mean$2;

/* @flow */



/**
 * The sum of deviations to the Nth power.
 * When n=2 it's the sum of squared deviations.
 * When n=3 it's the sum of cubed deviations.
 *
 * @param {Array<number>} x
 * @param {number} n power
 * @returns {number} sum of nth power deviations
 * @example
 * var input = [1, 2, 3];
 * // since the variance of a set is the mean squared
 * // deviations, we can calculate that with sumNthPowerDeviations:
 * var variance = sumNthPowerDeviations(input) / input.length;
 */
function sumNthPowerDeviations(x/*: Array<number> */, n/*: number */)/*:number*/ {
    var meanValue = mean_1(x),
        sum = 0,
        tempValue,
        i;

    // This is an optimization: when n is 2 (we're computing a number squared),
    // multiplying the number by itself is significantly faster than using
    // the Math.pow method.
    if (n === 2) {
        for (i = 0; i < x.length; i++) {
            tempValue = x[i] - meanValue;
            sum += tempValue * tempValue;
        }
    } else {
        for (i = 0; i < x.length; i++) {
            sum += Math.pow(x[i] - meanValue, n);
        }
    }

    return sum;
}

var sum_nth_power_deviations = sumNthPowerDeviations;

/* @flow */



/**
 * The [variance](http://en.wikipedia.org/wiki/Variance)
 * is the sum of squared deviations from the mean.
 *
 * This is an implementation of variance, not sample variance:
 * see the `sampleVariance` method if you want a sample measure.
 *
 * @param {Array<number>} x a population of one or more data points
 * @returns {number} variance: a value greater than or equal to zero.
 * zero indicates that all values are identical.
 * @throws {Error} if x's length is 0
 * @example
 * variance([1, 2, 3, 4, 5, 6]); // => 2.9166666666666665
 */
function variance$2(x/*: Array<number> */)/*:number*/ {
    // The variance of no numbers is null
    if (x.length === 0) {
        throw new Error('variance requires at least one data point');
    }

    // Find the mean of squared deviations between the
    // mean value and each value.
    return sum_nth_power_deviations(x, 2) / x.length;
}

var variance_1 = variance$2;

/* @flow */



/**
 * The [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
 * is the square root of the variance. This is also known as the population
 * standard deviation. It's useful for measuring the amount
 * of variation or dispersion in a set of values.
 *
 * Standard deviation is only appropriate for full-population knowledge: for
 * samples of a population, {@link sampleStandardDeviation} is
 * more appropriate.
 *
 * @param {Array<number>} x input
 * @returns {number} standard deviation
 * @example
 * variance([2, 4, 4, 4, 5, 5, 7, 9]); // => 4
 * standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]); // => 2
 */
function standardDeviation$1(x /*: Array<number> */)/*:number*/ {
    if (x.length === 1) {
        return 0;
    }
    var v = variance_1(x);
    return Math.sqrt(v);
}

var standard_deviation = standardDeviation$1;

/* @flow */

/**
 * The [R Squared](http://en.wikipedia.org/wiki/Coefficient_of_determination)
 * value of data compared with a function `f`
 * is the sum of the squared differences between the prediction
 * and the actual value.
 *
 * @param {Array<Array<number>>} x input data: this should be doubly-nested
 * @param {Function} func function called on `[i][0]` values within the dataset
 * @returns {number} r-squared value
 * @example
 * var samples = [[0, 0], [1, 1]];
 * var regressionLine = linearRegressionLine(linearRegression(samples));
 * rSquared(samples, regressionLine); // = 1 this line is a perfect fit
 */
function rSquared(x /*: Array<Array<number>> */, func /*: Function */) /*: number */ {
    if (x.length < 2) { return 1; }

    // Compute the average y value for the actual
    // data set in order to compute the
    // _total sum of squares_
    var sum = 0, average;
    for (var i = 0; i < x.length; i++) {
        sum += x[i][1];
    }
    average = sum / x.length;

    // Compute the total sum of squares - the
    // squared difference between each point
    // and the average of all points.
    var sumOfSquares = 0;
    for (var j = 0; j < x.length; j++) {
        sumOfSquares += Math.pow(average - x[j][1], 2);
    }

    // Finally estimate the error: the squared
    // difference between the estimate and the actual data
    // value at each point.
    var err = 0;
    for (var k = 0; k < x.length; k++) {
        err += Math.pow(x[k][1] - func(x[k][0]), 2);
    }

    // As the error grows larger, its ratio to the
    // sum of squares increases and the r squared
    // value grows lower.
    return 1 - err / sumOfSquares;
}

var r_squared = rSquared;

/* @flow */

/**
 * Sort an array of numbers by their numeric value, ensuring that the
 * array is not changed in place.
 *
 * This is necessary because the default behavior of .sort
 * in JavaScript is to sort arrays as string values
 *
 *     [1, 10, 12, 102, 20].sort()
 *     // output
 *     [1, 10, 102, 12, 20]
 *
 * @param {Array<number>} x input array
 * @return {Array<number>} sorted array
 * @private
 * @example
 * numericSort([3, 2, 1]) // => [1, 2, 3]
 */
function numericSort(x /*: Array<number> */) /*: Array<number> */ {
    return x
        // ensure the array is not changed in-place
        .slice()
        // comparator function that treats input as numeric
        .sort(function(a, b) {
            return a - b;
        });
}

var numeric_sort = numericSort;

/* @flow */

/**
 * The [mode](http://bit.ly/W5K4Yt) is the number that appears in a list the highest number of times.
 * There can be multiple modes in a list: in the event of a tie, this
 * algorithm will return the most recently seen mode.
 *
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs in `O(n)` because the input is sorted.
 *
 * @param {Array<number>} sorted a sample of one or more data points
 * @returns {number} mode
 * @throws {Error} if sorted is empty
 * @example
 * modeSorted([0, 0, 1]); // => 0
 */
function modeSorted(sorted /*: Array<number> */)/*:number*/ {

    // Handle edge cases:
    // The mode of an empty list is undefined
    if (sorted.length === 0) {
        throw new Error('mode requires at least one data point');
    } else if (sorted.length === 1) {
        return sorted[0];
    }

    // This assumes it is dealing with an array of size > 1, since size
    // 0 and 1 are handled immediately. Hence it starts at index 1 in the
    // array.
    var last = sorted[0],
        // store the mode as we find new modes
        value = NaN,
        // store how many times we've seen the mode
        maxSeen = 0,
        // how many times the current candidate for the mode
        // has been seen
        seenThis = 1;

    // end at sorted.length + 1 to fix the case in which the mode is
    // the highest number that occurs in the sequence. the last iteration
    // compares sorted[i], which is undefined, to the highest number
    // in the series
    for (var i = 1; i < sorted.length + 1; i++) {
        // we're seeing a new number pass by
        if (sorted[i] !== last) {
            // the last number is the new mode since we saw it more
            // often than the old one
            if (seenThis > maxSeen) {
                maxSeen = seenThis;
                value = last;
            }
            seenThis = 1;
            last = sorted[i];
        // if this isn't a new number, it's one more occurrence of
        // the potential mode
        } else { seenThis++; }
    }
    return value;
}

var mode_sorted = modeSorted;

/* @flow */



/**
 * The [mode](http://bit.ly/W5K4Yt) is the number that appears in a list the highest number of times.
 * There can be multiple modes in a list: in the event of a tie, this
 * algorithm will return the most recently seen mode.
 *
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs on `O(nlog(n))` because it needs to sort the array internally
 * before running an `O(n)` search to find the mode.
 *
 * @param {Array<number>} x input
 * @returns {number} mode
 * @example
 * mode([0, 0, 1]); // => 0
 */
function mode$1(x /*: Array<number> */)/*:number*/ {
    // Sorting the array lets us iterate through it below and be sure
    // that every time we see a new number it's new and we'll never
    // see the same number twice
    return mode_sorted(numeric_sort(x));
}

var mode_1 = mode$1;

/* @flow */
/* globals Map: false */

/**
 * The [mode](http://bit.ly/W5K4Yt) is the number that appears in a list the highest number of times.
 * There can be multiple modes in a list: in the event of a tie, this
 * algorithm will return the most recently seen mode.
 *
 * modeFast uses a Map object to keep track of the mode, instead of the approach
 * used with `mode`, a sorted array. As a result, it is faster
 * than `mode` and supports any data type that can be compared with `==`.
 * It also requires a
 * [JavaScript environment with support for Map](https://kangax.github.io/compat-table/es6/#test-Map),
 * and will throw an error if Map is not available.
 *
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * @param {Array<*>} x a sample of one or more data points
 * @returns {?*} mode
 * @throws {ReferenceError} if the JavaScript environment doesn't support Map
 * @throws {Error} if x is empty
 * @example
 * modeFast(['rabbits', 'rabbits', 'squirrels']); // => 'rabbits'
 */
function modeFast/*::<T>*/(x /*: Array<T> */)/*: ?T */ {

    // This index will reflect the incidence of different values, indexing
    // them like
    // { value: count }
    var index = new Map();

    // A running `mode` and the number of times it has been encountered.
    var mode;
    var modeCount = 0;

    for (var i = 0; i < x.length; i++) {
        var newCount = index.get(x[i]);
        if (newCount === undefined) {
            newCount = 1;
        } else {
            newCount++;
        }
        if (newCount > modeCount) {
            mode = x[i];
            modeCount = newCount;
        }
        index.set(x[i], newCount);
    }

    if (modeCount === 0) {
        throw new Error('mode requires at last one data point');
    }

    return mode;
}

var mode_fast = modeFast;

/* @flow */

/**
 * The min is the lowest number in the array. This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x sample of one or more data points
 * @throws {Error} if the the length of x is less than one
 * @returns {number} minimum value
 * @example
 * min([1, 5, -10, 100, 2]); // => -10
 */
function min$3(x /*: Array<number> */)/*:number*/ {

    if (x.length === 0) {
        throw new Error('min requires at least one data point');
    }

    var value = x[0];
    for (var i = 1; i < x.length; i++) {
        // On the first iteration of this loop, min is
        // undefined and is thus made the minimum element in the array
        if (x[i] < value) {
            value = x[i];
        }
    }
    return value;
}

var min_1 = min$3;

/* @flow */

/**
 * This computes the maximum number in an array.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} maximum value
 * @throws {Error} if the the length of x is less than one
 * @example
 * max([1, 2, 3, 4]);
 * // => 4
 */
function max$3(x /*: Array<number> */) /*:number*/ {

    if (x.length === 0) {
        throw new Error('max requires at least one data point');
    }

    var value = x[0];
    for (var i = 1; i < x.length; i++) {
        // On the first iteration of this loop, max is
        // undefined and is thus made the maximum element in the array
        if (x[i] > value) {
            value = x[i];
        }
    }
    return value;
}

var max_1 = max$3;

/* @flow */

/**
 * The minimum is the lowest number in the array. With a sorted array,
 * the first element in the array is always the smallest, so this calculation
 * can be done in one step, or constant time.
 *
 * @param {Array<number>} x input
 * @returns {number} minimum value
 * @example
 * minSorted([-100, -10, 1, 2, 5]); // => -100
 */
function minSorted(x /*: Array<number> */)/*:number*/ {
    return x[0];
}

var min_sorted = minSorted;

/* @flow */

/**
 * The maximum is the highest number in the array. With a sorted array,
 * the last element in the array is always the largest, so this calculation
 * can be done in one step, or constant time.
 *
 * @param {Array<number>} x input
 * @returns {number} maximum value
 * @example
 * maxSorted([-100, -10, 1, 2, 5]); // => 5
 */
function maxSorted(x /*: Array<number> */)/*:number*/ {
    return x[x.length - 1];
}

var max_sorted = maxSorted;

/* @flow */

/**
 * The simple [sum](https://en.wikipedia.org/wiki/Summation) of an array
 * is the result of adding all numbers together, starting from zero.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x input
 * @return {number} sum of all input numbers
 * @example
 * sumSimple([1, 2, 3]); // => 6
 */
function sumSimple(x/*: Array<number> */)/*: number */ {
    var value = 0;
    for (var i = 0; i < x.length; i++) {
        value += x[i];
    }
    return value;
}

var sum_simple = sumSimple;

/* @flow */

/**
 * The [product](https://en.wikipedia.org/wiki/Product_(mathematics)) of an array
 * is the result of multiplying all numbers together, starting using one as the multiplicative identity.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x input
 * @return {number} product of all input numbers
 * @example
 * product([1, 2, 3, 4]); // => 24
 */
function product(x/*: Array<number> */)/*: number */ {
    var value = 1;
    for (var i = 0; i < x.length; i++) {
        value *= x[i];
    }
    return value;
}

var product_1 = product;

/* @flow */

/**
 * This is the internal implementation of quantiles: when you know
 * that the order is sorted, you don't need to re-sort it, and the computations
 * are faster.
 *
 * @param {Array<number>} x sample of one or more data points
 * @param {number} p desired quantile: a number between 0 to 1, inclusive
 * @returns {number} quantile value
 * @throws {Error} if p ix outside of the range from 0 to 1
 * @throws {Error} if x is empty
 * @example
 * quantileSorted([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
function quantileSorted(x /*: Array<number> */, p /*: number */)/*:number*/ {
    var idx = x.length * p;
    if (x.length === 0) {
        throw new Error('quantile requires at least one data point.');
    } else if (p < 0 || p > 1) {
        throw new Error('quantiles must be between 0 and 1');
    } else if (p === 1) {
        // If p is 1, directly return the last element
        return x[x.length - 1];
    } else if (p === 0) {
        // If p is 0, directly return the first element
        return x[0];
    } else if (idx % 1 !== 0) {
        // If p is not integer, return the next element in array
        return x[Math.ceil(idx) - 1];
    } else if (x.length % 2 === 0) {
        // If the list has even-length, we'll take the average of this number
        // and the next value, if there is one
        return (x[idx - 1] + x[idx]) / 2;
    } else {
        // Finally, in the simple case of an integer value
        // with an odd-length list, return the x value at the index.
        return x[idx];
    }
}

var quantile_sorted = quantileSorted;

/* @flow */

var quickselect_1 = quickselect;

/**
 * Rearrange items in `arr` so that all items in `[left, k]` range are the smallest.
 * The `k`-th element will have the `(k - left + 1)`-th smallest value in `[left, right]`.
 *
 * Implements Floyd-Rivest selection algorithm https://en.wikipedia.org/wiki/Floyd-Rivest_algorithm
 *
 * @private
 * @param {Array<number>} arr input array
 * @param {number} k pivot index
 * @param {number} left left index
 * @param {number} right right index
 * @returns {undefined}
 * @example
 * var arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
 * quickselect(arr, 8);
 * // = [39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]
 */
function quickselect(arr /*: Array<number> */, k /*: number */, left /*: number */, right /*: number */) {
    left = left || 0;
    right = right || (arr.length - 1);

    while (right > left) {
        // 600 and 0.5 are arbitrary constants chosen in the original paper to minimize execution time
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n);
            if (m - n / 2 < 0) sd *= -1;
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            quickselect(arr, k, newLeft, newRight);
        }

        var t = arr[k];
        var i = left;
        var j = right;

        swap(arr, left, k);
        if (arr[right] > t) swap(arr, left, right);

        while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (arr[i] < t) i++;
            while (arr[j] > t) j--;
        }

        if (arr[left] === t) swap(arr, left, j);
        else {
            j++;
            swap(arr, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

/* @flow */




/**
 * The [quantile](https://en.wikipedia.org/wiki/Quantile):
 * this is a population quantile, since we assume to know the entire
 * dataset in this library. This is an implementation of the
 * [Quantiles of a Population](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population)
 * algorithm from wikipedia.
 *
 * Sample is a one-dimensional array of numbers,
 * and p is either a decimal number from 0 to 1 or an array of decimal
 * numbers from 0 to 1.
 * In terms of a k/q quantile, p = k/q - it's just dealing with fractions or dealing
 * with decimal values.
 * When p is an array, the result of the function is also an array containing the appropriate
 * quantiles in input order
 *
 * @param {Array<number>} x sample of one or more numbers
 * @param {number} p the desired quantile, as a number between 0 and 1
 * @returns {number} quantile
 * @example
 * quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5); // => 9
 */
function quantile$2(x /*: Array<number> */, p /*: Array<number> | number */) {
    var copy = x.slice();

    if (Array.isArray(p)) {
        // rearrange elements so that each element corresponding to a requested
        // quantile is on a place it would be if the array was fully sorted
        multiQuantileSelect(copy, p);
        // Initialize the result array
        var results = [];
        // For each requested quantile
        for (var i = 0; i < p.length; i++) {
            results[i] = quantile_sorted(copy, p[i]);
        }
        return results;
    } else {
        var idx = quantileIndex(copy.length, p);
        quantileSelect(copy, idx, 0, copy.length - 1);
        return quantile_sorted(copy, p);
    }
}

function quantileSelect(arr, k, left, right) {
    if (k % 1 === 0) {
        quickselect_1(arr, k, left, right);
    } else {
        k = Math.floor(k);
        quickselect_1(arr, k, left, right);
        quickselect_1(arr, k + 1, k + 1, right);
    }
}

function multiQuantileSelect(arr, p) {
    var indices = [0];
    for (var i = 0; i < p.length; i++) {
        indices.push(quantileIndex(arr.length, p[i]));
    }
    indices.push(arr.length - 1);
    indices.sort(compare);

    var stack = [0, indices.length - 1];

    while (stack.length) {
        var r = Math.ceil(stack.pop());
        var l = Math.floor(stack.pop());
        if (r - l <= 1) continue;

        var m = Math.floor((l + r) / 2);
        quantileSelect(arr, indices[m], indices[l], indices[r]);

        stack.push(l, m, m, r);
    }
}

function compare(a, b) {
    return a - b;
}

function quantileIndex(len /*: number */, p /*: number */)/*:number*/ {
    var idx = len * p;
    if (p === 1) {
        // If p is 1, directly return the last index
        return len - 1;
    } else if (p === 0) {
        // If p is 0, directly return the first index
        return 0;
    } else if (idx % 1 !== 0) {
        // If index is not integer, return the next index in array
        return Math.ceil(idx) - 1;
    } else if (len % 2 === 0) {
        // If the list has even-length, we'll return the middle of two indices
        // around quantile to indicate that we need an average value of the two
        return idx - 0.5;
    } else {
        // Finally, in the simple case of an integer index
        // with an odd-length list, return the index
        return idx;
    }
}

var quantile_1 = quantile$2;

/* @flow */



/**
 * The [Interquartile range](http://en.wikipedia.org/wiki/Interquartile_range) is
 * a measure of statistical dispersion, or how scattered, spread, or
 * concentrated a distribution is. It's computed as the difference between
 * the third quartile and first quartile.
 *
 * @param {Array<number>} x sample of one or more numbers
 * @returns {number} interquartile range: the span between lower and upper quartile,
 * 0.25 and 0.75
 * @example
 * interquartileRange([0, 1, 2, 3]); // => 2
 */
function interquartileRange(x/*: Array<number> */) {
    // Interquartile range is the span between the upper quartile,
    // at `0.75`, and lower quartile, `0.25`
    var q1 = quantile_1(x, 0.75),
        q2 = quantile_1(x, 0.25);

    if (typeof q1 === 'number' && typeof q2 === 'number') {
        return q1 - q2;
    }
}

var interquartile_range = interquartileRange;

/* @flow */



/**
 * The [median](http://en.wikipedia.org/wiki/Median) is
 * the middle number of a list. This is often a good indicator of 'the middle'
 * when there are outliers that skew the `mean()` value.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * The median isn't necessarily one of the elements in the list: the value
 * can be the average of two elements if the list has an even length
 * and the two central values are different.
 *
 * @param {Array<number>} x input
 * @returns {number} median value
 * @example
 * median([10, 2, 5, 100, 2, 1]); // => 3.5
 */
function median$2(x /*: Array<number> */)/*:number*/ {
    return +quantile_1(x, 0.5);
}

var median_1 = median$2;

/* @flow */



/**
 * The [Median Absolute Deviation](http://en.wikipedia.org/wiki/Median_absolute_deviation) is
 * a robust measure of statistical
 * dispersion. It is more resilient to outliers than the standard deviation.
 *
 * @param {Array<number>} x input array
 * @returns {number} median absolute deviation
 * @example
 * medianAbsoluteDeviation([1, 1, 2, 2, 4, 6, 9]); // => 1
 */
function medianAbsoluteDeviation(x /*: Array<number> */) {
    // The mad of nothing is null
    var medianValue = median_1(x),
        medianAbsoluteDeviations = [];

    // Make a list of absolute deviations from the median
    for (var i = 0; i < x.length; i++) {
        medianAbsoluteDeviations.push(Math.abs(x[i] - medianValue));
    }

    // Find the median value of that list
    return median_1(medianAbsoluteDeviations);
}

var median_absolute_deviation = medianAbsoluteDeviation;

/* @flow */

/**
 * Split an array into chunks of a specified size. This function
 * has the same behavior as [PHP's array_chunk](http://php.net/manual/en/function.array-chunk.php)
 * function, and thus will insert smaller-sized chunks at the end if
 * the input size is not divisible by the chunk size.
 *
 * `x` is expected to be an array, and `chunkSize` a number.
 * The `x` array can contain any kind of data.
 *
 * @param {Array} x a sample
 * @param {number} chunkSize size of each output array. must be a positive integer
 * @returns {Array<Array>} a chunked array
 * @throws {Error} if chunk size is less than 1 or not an integer
 * @example
 * chunk([1, 2, 3, 4, 5, 6], 2);
 * // => [[1, 2], [3, 4], [5, 6]]
 */
function chunk(x/*:Array<any>*/, chunkSize/*:number*/)/*:?Array<Array<any>>*/ {

    // a list of result chunks, as arrays in an array
    var output = [];

    // `chunkSize` must be zero or higher - otherwise the loop below,
    // in which we call `start += chunkSize`, will loop infinitely.
    // So, we'll detect and throw in that case to indicate
    // invalid input.
    if (chunkSize < 1) {
        throw new Error('chunk size must be a positive number');
    }

    if (Math.floor(chunkSize) !== chunkSize) {
        throw new Error('chunk size must be an integer');
    }

    // `start` is the index at which `.slice` will start selecting
    // new array elements
    for (var start = 0; start < x.length; start += chunkSize) {

        // for each chunk, slice that part of the array and add it
        // to the output. The `.slice` function does not change
        // the original array.
        output.push(x.slice(start, start + chunkSize));
    }
    return output;
}

var chunk_1 = chunk;

/* @flow */

/**
 * Sampling with replacement is a type of sampling that allows the same
 * item to be picked out of a population more than once.
 *
 * @param {Array<*>} x an array of any kind of value
 * @param {number} n count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} n sampled items from the population
 * @example
 * var sample = sampleWithReplacement([1, 2, 3, 4], 2);
 * sampleWithReplacement; // = [2, 4] or any other random sample of 2 items
 */
function sampleWithReplacement/*::<T>*/(x/*:Array<T>*/,
    n /*: number */,
    randomSource/*:Function*/) {

    if (x.length === 0) {
        return [];
    }

    // a custom random number source can be provided if you want to use
    // a fixed seed or another random number generator, like
    // [random-js](https://www.npmjs.org/package/random-js)
    randomSource = randomSource || Math.random;

    var length = x.length;
    var sample = [];

    for (var i = 0; i < n; i++) {
        var index = Math.floor(randomSource() * length);

        sample.push(x[index]);
    }

    return sample;
}

var sample_with_replacement = sampleWithReplacement;

/* @flow */

/**
 * A [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 * in-place - which means that it **will change the order of the original
 * array by reference**.
 *
 * This is an algorithm that generates a random [permutation](https://en.wikipedia.org/wiki/Permutation)
 * of a set.
 *
 * @param {Array} x sample of one or more numbers
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @returns {Array} x
 * @example
 * var x = [1, 2, 3, 4];
 * shuffleInPlace(x);
 * // x is shuffled to a value like [2, 1, 4, 3]
 */
function shuffleInPlace(x/*:Array<any>*/, randomSource/*:Function*/)/*:Array<any>*/ {

    // a custom random number source can be provided if you want to use
    // a fixed seed or another random number generator, like
    // [random-js](https://www.npmjs.org/package/random-js)
    randomSource = randomSource || Math.random;

    // store the current length of the x to determine
    // when no elements remain to shuffle.
    var length = x.length;

    // temporary is used to hold an item when it is being
    // swapped between indices.
    var temporary;

    // The index to swap at each stage.
    var index;

    // While there are still items to shuffle
    while (length > 0) {
        // chose a random index within the subset of the array
        // that is not yet shuffled
        index = Math.floor(randomSource() * length--);

        // store the value that we'll move temporarily
        temporary = x[length];

        // swap the value at `x[length]` with `x[index]`
        x[length] = x[index];
        x[index] = temporary;
    }

    return x;
}

var shuffle_in_place = shuffleInPlace;

/* @flow */



/**
 * A [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
 * is a fast way to create a random permutation of a finite set. This is
 * a function around `shuffle_in_place` that adds the guarantee that
 * it will not modify its input.
 *
 * @param {Array} x sample of 0 or more numbers
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} shuffled version of input
 * @example
 * var shuffled = shuffle([1, 2, 3, 4]);
 * shuffled; // = [2, 3, 1, 4] or any other random permutation
 */
function shuffle$1/*::<T>*/(x/*:Array<T>*/, randomSource/*:Function*/) {
    // slice the original array so that it is not modified
    var sample = x.slice();

    // and then shuffle that shallow-copied array, in place
    return shuffle_in_place(sample.slice(), randomSource);
}

var shuffle_1 = shuffle$1;

/* @flow */



/**
 * Create a [simple random sample](http://en.wikipedia.org/wiki/Simple_random_sample)
 * from a given array of `n` elements.
 *
 * The sampled values will be in any order, not necessarily the order
 * they appear in the input.
 *
 * @param {Array<any>} x input array. can contain any type
 * @param {number} n count of how many elements to take
 * @param {Function} [randomSource=Math.random] an optional entropy source that
 * returns numbers between 0 inclusive and 1 exclusive: the range [0, 1)
 * @return {Array} subset of n elements in original array
 * @example
 * var values = [1, 2, 4, 5, 6, 7, 8, 9];
 * sample(values, 3); // returns 3 random values, like [2, 5, 8];
 */
function sample/*:: <T> */(
    x /*: Array<T> */,
    n /*: number */,
    randomSource /*: Function */) /*: Array<T> */ {
    // shuffle the original array using a fisher-yates shuffle
    var shuffled = shuffle_1(x, randomSource);

    // and then return a subset of it - the first `n` elements.
    return shuffled.slice(0, n);
}

var sample_1 = sample;

/* @flow */

/**
 * For a sorted input, counting the number of unique values
 * is possible in constant time and constant memory. This is
 * a simple implementation of the algorithm.
 *
 * Values are compared with `===`, so objects and non-primitive objects
 * are not handled in any special way.
 *
 * @param {Array<*>} x an array of any kind of value
 * @returns {number} count of unique values
 * @example
 * uniqueCountSorted([1, 2, 3]); // => 3
 * uniqueCountSorted([1, 1, 1]); // => 1
 */
function uniqueCountSorted(x/*: Array<any>*/)/*: number */ {
    var uniqueValueCount = 0,
        lastSeenValue;
    for (var i = 0; i < x.length; i++) {
        if (i === 0 || x[i] !== lastSeenValue) {
            lastSeenValue = x[i];
            uniqueValueCount++;
        }
    }
    return uniqueValueCount;
}

var unique_count_sorted = uniqueCountSorted;

/* @flow */



/**
 * Create a new column x row matrix.
 *
 * @private
 * @param {number} columns
 * @param {number} rows
 * @return {Array<Array<number>>} matrix
 * @example
 * makeMatrix(10, 10);
 */
function makeMatrix(columns, rows) {
    var matrix = [];
    for (var i = 0; i < columns; i++) {
        var column = [];
        for (var j = 0; j < rows; j++) {
            column.push(0);
        }
        matrix.push(column);
    }
    return matrix;
}

/**
 * Generates incrementally computed values based on the sums and sums of
 * squares for the data array
 *
 * @private
 * @param {number} j
 * @param {number} i
 * @param {Array<number>} sums
 * @param {Array<number>} sumsOfSquares
 * @return {number}
 * @example
 * ssq(0, 1, [-1, 0, 2], [1, 1, 5]);
 */
function ssq(j, i, sums, sumsOfSquares) {
    var sji; // s(j, i)
    if (j > 0) {
        var muji = (sums[i] - sums[j - 1]) / (i - j + 1); // mu(j, i)
        sji = sumsOfSquares[i] - sumsOfSquares[j - 1] - (i - j + 1) * muji * muji;
    } else {
        sji = sumsOfSquares[i] - sums[i] * sums[i] / (i + 1);
    }
    if (sji < 0) {
        return 0;
    }
    return sji;
}

/**
 * Function that recursively divides and conquers computations
 * for cluster j
 *
 * @private
 * @param {number} iMin Minimum index in cluster to be computed
 * @param {number} iMax Maximum index in cluster to be computed
 * @param {number} cluster Index of the cluster currently being computed
 * @param {Array<Array<number>>} matrix
 * @param {Array<Array<number>>} backtrackMatrix
 * @param {Array<number>} sums
 * @param {Array<number>} sumsOfSquares
 */
function fillMatrixColumn(iMin, iMax, cluster, matrix, backtrackMatrix, sums, sumsOfSquares) {
    if (iMin > iMax) {
        return;
    }

    // Start at midpoint between iMin and iMax
    var i = Math.floor((iMin + iMax) / 2);

    matrix[cluster][i] = matrix[cluster - 1][i - 1];
    backtrackMatrix[cluster][i] = i;

    var jlow = cluster; // the lower end for j

    if (iMin > cluster) {
        jlow = Math.max(jlow, backtrackMatrix[cluster][iMin - 1] || 0);
    }
    jlow = Math.max(jlow, backtrackMatrix[cluster - 1][i] || 0);

    var jhigh = i - 1; // the upper end for j
    if (iMax < matrix.length - 1) {
        jhigh = Math.min(jhigh, backtrackMatrix[cluster][iMax + 1] || 0);
    }

    var sji;
    var sjlowi;
    var ssqjlow;
    var ssqj;
    for (var j = jhigh; j >= jlow; --j) {
        sji = ssq(j, i, sums, sumsOfSquares);

        if (sji + matrix[cluster - 1][jlow - 1] >= matrix[cluster][i]) {
            break;
        }

        // Examine the lower bound of the cluster border
        sjlowi = ssq(jlow, i, sums, sumsOfSquares);

        ssqjlow = sjlowi + matrix[cluster - 1][jlow - 1];

        if (ssqjlow < matrix[cluster][i]) {
            // Shrink the lower bound
            matrix[cluster][i] = ssqjlow;
            backtrackMatrix[cluster][i] = jlow;
        }
        jlow++;

        ssqj = sji + matrix[cluster - 1][j - 1];
        if (ssqj < matrix[cluster][i]) {
            matrix[cluster][i] = ssqj;
            backtrackMatrix[cluster][i] = j;
        }
    }

    fillMatrixColumn(iMin, i - 1, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);
    fillMatrixColumn(i + 1, iMax, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);
}

/**
 * Initializes the main matrices used in Ckmeans and kicks
 * off the divide and conquer cluster computation strategy
 *
 * @private
 * @param {Array<number>} data sorted array of values
 * @param {Array<Array<number>>} matrix
 * @param {Array<Array<number>>} backtrackMatrix
 */
function fillMatrices(data, matrix, backtrackMatrix) {
    var nValues = matrix[0].length;

    // Shift values by the median to improve numeric stability
    var shift = data[Math.floor(nValues / 2)];

    // Cumulative sum and cumulative sum of squares for all values in data array
    var sums = [];
    var sumsOfSquares = [];

    // Initialize first column in matrix & backtrackMatrix
    for (var i = 0, shiftedValue; i < nValues; ++i) {
        shiftedValue = data[i] - shift;
        if (i === 0) {
            sums.push(shiftedValue);
            sumsOfSquares.push(shiftedValue * shiftedValue);
        } else {
            sums.push(sums[i - 1] + shiftedValue);
            sumsOfSquares.push(sumsOfSquares[i - 1] + shiftedValue * shiftedValue);
        }

        // Initialize for cluster = 0
        matrix[0][i] = ssq(0, i, sums, sumsOfSquares);
        backtrackMatrix[0][i] = 0;
    }

    // Initialize the rest of the columns
    var iMin;
    for (var cluster = 1; cluster < matrix.length; ++cluster) {
        if (cluster < matrix.length - 1) {
            iMin = cluster;
        } else {
            // No need to compute matrix[K-1][0] ... matrix[K-1][N-2]
            iMin = nValues - 1;
        }

        fillMatrixColumn(iMin, nValues - 1, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);
    }
}

/**
 * Ckmeans clustering is an improvement on heuristic-based clustering
 * approaches like Jenks. The algorithm was developed in
 * [Haizhou Wang and Mingzhou Song](http://journal.r-project.org/archive/2011-2/RJournal_2011-2_Wang+Song.pdf)
 * as a [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) approach
 * to the problem of clustering numeric data into groups with the least
 * within-group sum-of-squared-deviations.
 *
 * Minimizing the difference within groups - what Wang & Song refer to as
 * `withinss`, or within sum-of-squares, means that groups are optimally
 * homogenous within and the data is split into representative groups.
 * This is very useful for visualization, where you may want to represent
 * a continuous variable in discrete color or style groups. This function
 * can provide groups that emphasize differences between data.
 *
 * Being a dynamic approach, this algorithm is based on two matrices that
 * store incrementally-computed values for squared deviations and backtracking
 * indexes.
 *
 * This implementation is based on Ckmeans 3.4.6, which introduced a new divide
 * and conquer approach that improved runtime from O(kn^2) to O(kn log(n)).
 *
 * Unlike the [original implementation](https://cran.r-project.org/web/packages/Ckmeans.1d.dp/index.html),
 * this implementation does not include any code to automatically determine
 * the optimal number of clusters: this information needs to be explicitly
 * provided.
 *
 * ### References
 * _Ckmeans.1d.dp: Optimal k-means Clustering in One Dimension by Dynamic
 * Programming_ Haizhou Wang and Mingzhou Song ISSN 2073-4859
 *
 * from The R Journal Vol. 3/2, December 2011
 * @param {Array<number>} x input data, as an array of number values
 * @param {number} nClusters number of desired classes. This cannot be
 * greater than the number of values in the data array.
 * @returns {Array<Array<number>>} clustered input
 * @throws {Error} if the number of requested clusters is higher than the size of the data
 * @example
 * ckmeans([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1], 3);
 * // The input, clustered into groups of similar numbers.
 * //= [[-1, -1, -1, -1], [2, 2, 2], [4, 5, 6]]);
 */
function ckmeans(x/*: Array<number> */, nClusters/*: number */)/*: Array<Array<number>> */ {

    if (nClusters > x.length) {
        throw new Error('cannot generate more classes than there are data values');
    }

    var sorted = numeric_sort(x),
        // we'll use this as the maximum number of clusters
        uniqueCount = unique_count_sorted(sorted);

    // if all of the input values are identical, there's one cluster
    // with all of the input in it.
    if (uniqueCount === 1) {
        return [sorted];
    }

    // named 'S' originally
    var matrix = makeMatrix(nClusters, sorted.length),
        // named 'J' originally
        backtrackMatrix = makeMatrix(nClusters, sorted.length);

    // This is a dynamic programming way to solve the problem of minimizing
    // within-cluster sum of squares. It's similar to linear regression
    // in this way, and this calculation incrementally computes the
    // sum of squares that are later read.
    fillMatrices(sorted, matrix, backtrackMatrix);

    // The real work of Ckmeans clustering happens in the matrix generation:
    // the generated matrices encode all possible clustering combinations, and
    // once they're generated we can solve for the best clustering groups
    // very quickly.
    var clusters = [],
        clusterRight = backtrackMatrix[0].length - 1;

    // Backtrack the clusters from the dynamic programming matrix. This
    // starts at the bottom-right corner of the matrix (if the top-left is 0, 0),
    // and moves the cluster target with the loop.
    for (var cluster = backtrackMatrix.length - 1; cluster >= 0; cluster--) {

        var clusterLeft = backtrackMatrix[cluster][clusterRight];

        // fill the cluster from the sorted input by taking a slice of the
        // array. the backtrack matrix makes this easy - it stores the
        // indexes where the cluster should start and end.
        clusters[cluster] = sorted.slice(clusterLeft, clusterRight + 1);

        if (cluster > 0) {
            clusterRight = clusterLeft - 1;
        }
    }

    return clusters;
}

var ckmeans_1 = ckmeans;

/* @flow */



/**
 * Given an array of x, this will find the extent of the
 * x and return an array of breaks that can be used
 * to categorize the x into a number of classes. The
 * returned array will always be 1 longer than the number of
 * classes because it includes the minimum value.
 *
 * @param {Array<number>} x an array of number values
 * @param {number} nClasses number of desired classes
 * @returns {Array<number>} array of class break positions
 * @example
 * equalIntervalBreaks([1, 2, 3, 4, 5, 6], 4); //= [1, 2.25, 3.5, 4.75, 6]
 */
function equalIntervalBreaks(x/*: Array<number> */, nClasses/*:number*/)/*: Array<number> */ {

    if (x.length < 2) {
        return x;
    }

    var theMin = min_1(x),
        theMax = max_1(x); 

    // the first break will always be the minimum value
    // in the xset
    var breaks = [theMin];

    // The size of each break is the full range of the x
    // divided by the number of classes requested
    var breakSize = (theMax - theMin) / nClasses;

    // In the case of nClasses = 1, this loop won't run
    // and the returned breaks will be [min, max]
    for (var i = 1; i < nClasses; i++) {
        breaks.push(breaks[0] + breakSize * i);
    }

    // the last break will always be the
    // maximum.
    breaks.push(theMax);

    return breaks;
}

var equal_interval_breaks = equalIntervalBreaks;

/* @flow */



/**
 * [Sample covariance](https://en.wikipedia.org/wiki/Sample_mean_and_sampleCovariance) of two datasets:
 * how much do the two datasets move together?
 * x and y are two datasets, represented as arrays of numbers.
 *
 * @param {Array<number>} x a sample of two or more data points
 * @param {Array<number>} y a sample of two or more data points
 * @throws {Error} if x and y do not have equal lengths
 * @throws {Error} if x or y have length of one or less
 * @returns {number} sample covariance
 * @example
 * sampleCovariance([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]); // => -3.5
 */
function sampleCovariance(x /*:Array<number>*/, y /*:Array<number>*/)/*:number*/ {

    // The two datasets must have the same length which must be more than 1
    if (x.length !== y.length) {
        throw new Error('sampleCovariance requires samples with equal lengths');
    }

    if (x.length < 2) {
        throw new Error('sampleCovariance requires at least two data points in each sample');
    }

    // determine the mean of each dataset so that we can judge each
    // value of the dataset fairly as the difference from the mean. this
    // way, if one dataset is [1, 2, 3] and [2, 3, 4], their covariance
    // does not suffer because of the difference in absolute values
    var xmean = mean_1(x),
        ymean = mean_1(y),
        sum = 0;

    // for each pair of values, the covariance increases when their
    // difference from the mean is associated - if both are well above
    // or if both are well below
    // the mean, the covariance increases significantly.
    for (var i = 0; i < x.length; i++) {
        sum += (x[i] - xmean) * (y[i] - ymean);
    }

    // this is Bessels' Correction: an adjustment made to sample statistics
    // that allows for the reduced degree of freedom entailed in calculating
    // values from samples rather than complete populations.
    var besselsCorrection = x.length - 1;

    // the covariance is weighted by the length of the datasets.
    return sum / besselsCorrection;
}

var sample_covariance = sampleCovariance;

/* @flow */



/**
 * The [sample variance](https://en.wikipedia.org/wiki/Variance#Sample_variance)
 * is the sum of squared deviations from the mean. The sample variance
 * is distinguished from the variance by the usage of [Bessel's Correction](https://en.wikipedia.org/wiki/Bessel's_correction):
 * instead of dividing the sum of squared deviations by the length of the input,
 * it is divided by the length minus one. This corrects the bias in estimating
 * a value from a set that you don't know if full.
 *
 * References:
 * * [Wolfram MathWorld on Sample Variance](http://mathworld.wolfram.com/SampleVariance.html)
 *
 * @param {Array<number>} x a sample of two or more data points
 * @throws {Error} if the length of x is less than 2
 * @return {number} sample variance
 * @example
 * sampleVariance([1, 2, 3, 4, 5]); // => 2.5
 */
function sampleVariance(x /*: Array<number> */)/*:number*/ {
    // The variance of no numbers is null
    if (x.length < 2) {
        throw new Error('sampleVariance requires at least two data points');
    }

    var sumSquaredDeviationsValue = sum_nth_power_deviations(x, 2);

    // this is Bessels' Correction: an adjustment made to sample statistics
    // that allows for the reduced degree of freedom entailed in calculating
    // values from samples rather than complete populations.
    var besselsCorrection = x.length - 1;

    // Find the mean value of that list
    return sumSquaredDeviationsValue / besselsCorrection;
}

var sample_variance = sampleVariance;

/* @flow */



/**
 * The [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
 * is the square root of the variance.
 *
 * @param {Array<number>} x input array
 * @returns {number} sample standard deviation
 * @example
 * sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]).toFixed(2);
 * // => '2.14'
 */
function sampleStandardDeviation(x/*:Array<number>*/)/*:number*/ {
    // The standard deviation of no numbers is null
    var sampleVarianceX = sample_variance(x);
    return Math.sqrt(sampleVarianceX);
}

var sample_standard_deviation = sampleStandardDeviation;

/* @flow */




/**
 * The [correlation](http://en.wikipedia.org/wiki/Correlation_and_dependence) is
 * a measure of how correlated two datasets are, between -1 and 1
 *
 * @param {Array<number>} x first input
 * @param {Array<number>} y second input
 * @returns {number} sample correlation
 * @example
 * sampleCorrelation([1, 2, 3, 4, 5, 6], [2, 2, 3, 4, 5, 60]).toFixed(2);
 * // => '0.69'
 */
function sampleCorrelation(x/*: Array<number> */, y/*: Array<number> */)/*:number*/ {
    var cov = sample_covariance(x, y),
        xstd = sample_standard_deviation(x),
        ystd = sample_standard_deviation(y);

    return cov / xstd / ystd;
}

var sample_correlation = sampleCorrelation;

/* @flow */



/**
 * [Skewness](http://en.wikipedia.org/wiki/Skewness) is
 * a measure of the extent to which a probability distribution of a
 * real-valued random variable "leans" to one side of the mean.
 * The skewness value can be positive or negative, or even undefined.
 *
 * Implementation is based on the adjusted Fisher-Pearson standardized
 * moment coefficient, which is the version found in Excel and several
 * statistical packages including Minitab, SAS and SPSS.
 *
 * @since 4.1.0
 * @param {Array<number>} x a sample of 3 or more data points
 * @returns {number} sample skewness
 * @throws {Error} if x has length less than 3
 * @example
 * sampleSkewness([2, 4, 6, 3, 1]); // => 0.590128656384365
 */
function sampleSkewness(x /*: Array<number> */)/*:number*/ {

    if (x.length < 3) {
        throw new Error('sampleSkewness requires at least three data points');
    }

    var meanValue = mean_1(x);
    var tempValue;
    var sumSquaredDeviations = 0;
    var sumCubedDeviations = 0;

    for (var i = 0; i < x.length; i++) {
        tempValue = x[i] - meanValue;
        sumSquaredDeviations += tempValue * tempValue;
        sumCubedDeviations += tempValue * tempValue * tempValue;
    }

    // this is Bessels' Correction: an adjustment made to sample statistics
    // that allows for the reduced degree of freedom entailed in calculating
    // values from samples rather than complete populations.
    var besselsCorrection = x.length - 1;

    // Find the mean value of that list
    var theSampleStandardDeviation = Math.sqrt(sumSquaredDeviations / besselsCorrection);

    var n = x.length,
        cubedS = Math.pow(theSampleStandardDeviation, 3);

    return n * sumCubedDeviations / ((n - 1) * (n - 2) * cubedS);
}

var sample_skewness = sampleSkewness;

/* @flow */



/**
 * [Kurtosis](http://en.wikipedia.org/wiki/Kurtosis) is
 * a measure of the heaviness of a distribution's tails relative to its
 * variance. The kurtosis value can be positive or negative, or even undefined.
 *
 * Implementation is based on Fisher's excess kurtosis definition and uses 
 * unbiased moment estimators. This is the version found in Excel and available 
 * in several statistical packages, including SAS and SciPy.
 *
 * @param {Array<number>} x a sample of 4 or more data points
 * @returns {number} sample kurtosis
 * @throws {Error} if x has length less than 4
 * @example
 * sampleKurtosis([1, 2, 2, 3, 5]); // => 1.4555765595463122
 */
function sampleKurtosis(x /*: Array<number> */)/*:number*/ {

    var n = x.length;

    if (n < 4) {
        throw new Error('sampleKurtosis requires at least four data points');
    }

    var meanValue = mean_1(x);
    var tempValue;
    var secondCentralMoment = 0;
    var fourthCentralMoment = 0;

    for (var i = 0; i < n; i++) {
        tempValue = x[i] - meanValue;
        secondCentralMoment += tempValue * tempValue;
        fourthCentralMoment += tempValue * tempValue * tempValue * tempValue;
    }

    return (n - 1) / ((n - 2) * (n - 3)) * 
        (n * (n + 1) * fourthCentralMoment / (secondCentralMoment * secondCentralMoment) - 3 * (n - 1));
}

var sample_kurtosis = sampleKurtosis;

/* @flow */

/**
 * Implementation of [Heap's Algorithm](https://en.wikipedia.org/wiki/Heap%27s_algorithm)
 * for generating permutations.
 *
 * @param {Array} elements any type of data
 * @returns {Array<Array>} array of permutations
 */
function permutationsHeap/*:: <T> */(elements /*: Array<T> */)/*: Array<Array<T>> */ {
    var indexes = new Array(elements.length);
    var permutations = [elements.slice()];

    for (var i = 0; i < elements.length; i++) {
        indexes[i] = 0;
    }

    for (i = 0; i < elements.length;) {
        if (indexes[i] < i) {

            // At odd indexes, swap from indexes[i] instead
            // of from the beginning of the array
            var swapFrom = 0;
            if (i % 2 !== 0) {
                swapFrom = indexes[i];
            }

            // swap between swapFrom and i, using
            // a temporary variable as storage.
            var temp = elements[swapFrom];
            elements[swapFrom] = elements[i];
            elements[i] = temp;

            permutations.push(elements.slice());
            indexes[i]++;
            i = 0;

        } else {
            indexes[i] = 0;
            i++;
        }
    }

    return permutations;
}

var permutations_heap = permutationsHeap;

/* @flow */
/**
 * Implementation of Combinations
 * Combinations are unique subsets of a collection - in this case, k x from a collection at a time.
 * https://en.wikipedia.org/wiki/Combination
 * @param {Array} x any type of data
 * @param {int} k the number of objects in each group (without replacement)
 * @returns {Array<Array>} array of permutations
 * @example
 * combinations([1, 2, 3], 2); // => [[1,2], [1,3], [2,3]]
 */

function combinations(x /*: Array<any> */, k/*: number */) {
    var i;
    var subI;
    var combinationList = [];
    var subsetCombinations;
    var next;

    for (i = 0; i < x.length; i++) {
        if (k === 1) {
            combinationList.push([x[i]]);
        } else {
            subsetCombinations = combinations(x.slice( i + 1, x.length ), k - 1);
            for (subI = 0; subI < subsetCombinations.length; subI++) {
                next = subsetCombinations[subI];
                next.unshift(x[i]);
                combinationList.push(next);
            }
        }
    }
    return combinationList;
}

var combinations_1 = combinations;

/* @flow */
/**
 * Implementation of [Combinations](https://en.wikipedia.org/wiki/Combination) with replacement
 * Combinations are unique subsets of a collection - in this case, k x from a collection at a time.
 * 'With replacement' means that a given element can be chosen multiple times.
 * Unlike permutation, order doesn't matter for combinations.
 * 
 * @param {Array} x any type of data
 * @param {int} k the number of objects in each group (without replacement)
 * @returns {Array<Array>} array of permutations
 * @example
 * combinationsReplacement([1, 2], 2); // => [[1, 1], [1, 2], [2, 2]]
 */
function combinationsReplacement(
    x /*: Array<any> */,
    k /*: number */) {

    var combinationList = [];

    for (var i = 0; i < x.length; i++) {
        if (k === 1) {
            // If we're requested to find only one element, we don't need
            // to recurse: just push `x[i]` onto the list of combinations.
            combinationList.push([x[i]]);
        } else {
            // Otherwise, recursively find combinations, given `k - 1`. Note that
            // we request `k - 1`, so if you were looking for k=3 combinations, we're
            // requesting k=2. This -1 gets reversed in the for loop right after this
            // code, since we concatenate `x[i]` onto the selected combinations,
            // bringing `k` back up to your requested level.
            // This recursion may go many levels deep, since it only stops once
            // k=1.
            var subsetCombinations = combinationsReplacement(
                x.slice(i, x.length),
                k - 1);

            for (var j = 0; j < subsetCombinations.length; j++) {
                combinationList.push([x[i]]
                    .concat(subsetCombinations[j]));
            }
        }
    }

    return combinationList;
}

var combinations_replacement = combinationsReplacement;

/* @flow */

/**
 * When adding a new value to a list, one does not have to necessary
 * recompute the mean of the list in linear time. They can instead use
 * this function to compute the new mean by providing the current mean,
 * the number of elements in the list that produced it and the new
 * value to add.
 *
 * @since 2.5.0
 * @param {number} mean current mean
 * @param {number} n number of items in the list
 * @param {number} newValue the added value
 * @returns {number} the new mean
 *
 * @example
 * addToMean(14, 5, 53); // => 20.5
 */
function addToMean(mean /*: number*/, n/*: number */, newValue/*: number */)/*: number */ {
    return mean + ((newValue - mean) / (n + 1));
}

var add_to_mean = addToMean;

/* @flow */

/**
 * When combining two lists of values for which one already knows the means,
 * one does not have to necessary recompute the mean of the combined lists in
 * linear time. They can instead use this function to compute the combined
 * mean by providing the mean & number of values of the first list and the mean
 * & number of values of the second list.
 *
 * @since 3.0.0
 * @param {number} mean1 mean of the first list
 * @param {number} n1 number of items in the first list
 * @param {number} mean2 mean of the second list
 * @param {number} n2 number of items in the second list
 * @returns {number} the combined mean
 *
 * @example
 * combineMeans(5, 3, 4, 3); // => 4.5
 */
function combineMeans(mean1 /*: number*/, n1/*: number */, mean2 /*: number*/, n2/*: number */)/*: number */ {
    return (mean1 * n1 + mean2 * n2) / (n1 + n2);
}

var combine_means = combineMeans;

/* @flow */



/**
 * When combining two lists of values for which one already knows the variances,
 * one does not have to necessary recompute the variance of the combined lists
 * in linear time. They can instead use this function to compute the combined
 * variance by providing the variance, mean & number of values of the first list
 * and the variance, mean & number of values of the second list.
 *
 * @since 3.0.0
 * @param {number} variance1 variance of the first list
 * @param {number} mean1 mean of the first list
 * @param {number} n1 number of items in the first list
 * @param {number} variance2 variance of the second list
 * @param {number} mean2 mean of the second list
 * @param {number} n2 number of items in the second list
 * @returns {number} the combined mean
 *
 * @example
 * combineVariances(14 / 3, 5, 3, 8 / 3, 4, 3); // => 47 / 12
 */
function combineVariances(
    variance1 /*: number*/,
    mean1 /*: number*/,
    n1/*: number */,
    variance2 /*: number*/,
    mean2 /*: number*/,
    n2/*: number */)/*: number */ {

    var newMean = combine_means(mean1, n1, mean2, n2);

    return (
      n1 * (variance1 + Math.pow(mean1 - newMean, 2)) +
      n2 * (variance2 + Math.pow(mean2 - newMean, 2))
    ) / (n1 + n2);
}

var combine_variances = combineVariances;

/* @flow */

/**
 * The [Geometric Mean](https://en.wikipedia.org/wiki/Geometric_mean) is
 * a mean function that is more useful for numbers in different
 * ranges.
 *
 * This is the nth root of the input numbers multiplied by each other.
 *
 * The geometric mean is often useful for
 * **[proportional growth](https://en.wikipedia.org/wiki/Geometric_mean#Proportional_growth)**: given
 * growth rates for multiple years, like _80%, 16.66% and 42.85%_, a simple
 * mean will incorrectly estimate an average growth rate, whereas a geometric
 * mean will correctly estimate a growth rate that, over those years,
 * will yield the same end value.
 *
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} geometric mean
 * @throws {Error} if x is empty
 * @throws {Error} if x contains a negative number
 * @example
 * var growthRates = [1.80, 1.166666, 1.428571];
 * var averageGrowth = geometricMean(growthRates);
 * var averageGrowthRates = [averageGrowth, averageGrowth, averageGrowth];
 * var startingValue = 10;
 * var startingValueMean = 10;
 * growthRates.forEach(function(rate) {
 *   startingValue *= rate;
 * });
 * averageGrowthRates.forEach(function(rate) {
 *   startingValueMean *= rate;
 * });
 * startingValueMean === startingValue;
 */
function geometricMean(x /*: Array<number> */) {
    // The mean of no numbers is null
    if (x.length === 0) {
        throw new Error('geometricMean requires at least one data point');
    }

    // the starting value.
    var value = 1;

    for (var i = 0; i < x.length; i++) {
        // the geometric mean is only valid for positive numbers
        if (x[i] <= 0) {
            throw new Error('geometricMean requires only positive numbers as input');
        }

        // repeatedly multiply the value by each number
        value *= x[i];
    }

    return Math.pow(value, 1 / x.length);
}

var geometric_mean = geometricMean;

/* @flow */

/**
 * The [Harmonic Mean](https://en.wikipedia.org/wiki/Harmonic_mean) is
 * a mean function typically used to find the average of rates.
 * This mean is calculated by taking the reciprocal of the arithmetic mean
 * of the reciprocals of the input numbers.
 *
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * This runs on `O(n)`, linear time in respect to the array.
 *
 * @param {Array<number>} x sample of one or more data points
 * @returns {number} harmonic mean
 * @throws {Error} if x is empty
 * @throws {Error} if x contains a negative number
 * @example
 * harmonicMean([2, 3]).toFixed(2) // => '2.40'
 */
function harmonicMean(x /*: Array<number> */) {
    // The mean of no numbers is null
    if (x.length === 0) {
        throw new Error('harmonicMean requires at least one data point');
    }

    var reciprocalSum = 0;

    for (var i = 0; i < x.length; i++) {
        // the harmonic mean is only valid for positive numbers
        if (x[i] <= 0) {
            throw new Error('harmonicMean requires only positive numbers as input');
        }

        reciprocalSum += 1 / x[i];
    }

    // divide n by the the reciprocal sum
    return x.length / reciprocalSum;
}

var harmonic_mean = harmonicMean;

/* @flow */



/**
 * The [median](http://en.wikipedia.org/wiki/Median) is
 * the middle number of a list. This is often a good indicator of 'the middle'
 * when there are outliers that skew the `mean()` value.
 * This is a [measure of central tendency](https://en.wikipedia.org/wiki/Central_tendency):
 * a method of finding a typical or central value of a set of numbers.
 *
 * The median isn't necessarily one of the elements in the list: the value
 * can be the average of two elements if the list has an even length
 * and the two central values are different.
 *
 * @param {Array<number>} sorted input
 * @returns {number} median value
 * @example
 * medianSorted([10, 2, 5, 100, 2, 1]); // => 52.5
 */
function medianSorted(sorted /*: Array<number> */)/*:number*/ {
    return quantile_sorted(sorted, 0.5);
}

var median_sorted = medianSorted;

/* @flow */

/**
 * When removing a value from a list, one does not have to necessary
 * recompute the mean of the list in linear time. They can instead use
 * this function to compute the new mean by providing the current mean,
 * the number of elements in the list that produced it and the value to remove.
 *
 * @since 3.0.0
 * @param {number} mean current mean
 * @param {number} n number of items in the list
 * @param {number} value the value to remove
 * @returns {number} the new mean
 *
 * @example
 * subtractFromMean(20.5, 6, 53); // => 14
 */
function subtractFromMean(mean /*: number*/, n/*: number */, value/*: number */)/*: number */ {
    return ((mean * n) - value) / (n - 1);
}

var subtract_from_mean = subtractFromMean;

/* @flow */

/**
 * The Root Mean Square (RMS) is
 * a mean function used as a measure of the magnitude of a set
 * of numbers, regardless of their sign.
 * This is the square root of the mean of the squares of the
 * input numbers.
 * This runs on `O(n)`, linear time in respect to the array
 *
 * @param {Array<number>} x a sample of one or more data points
 * @returns {number} root mean square
 * @throws {Error} if x is empty
 * @example
 * rootMeanSquare([-1, 1, -1, 1]); // => 1
 */
function rootMeanSquare(x /*: Array<number> */)/*:number*/ {
    if (x.length === 0) {
        throw new Error('rootMeanSquare requires at least one data point');
    }

    var sumOfSquares = 0;
    for (var i = 0; i < x.length; i++) {
        sumOfSquares += Math.pow(x[i], 2);
    }

    return Math.sqrt(sumOfSquares / x.length);
}

var root_mean_square = rootMeanSquare;

/* @flow */




/**
 * This is to compute [a one-sample t-test](https://en.wikipedia.org/wiki/Student%27s_t-test#One-sample_t-test), comparing the mean
 * of a sample to a known value, x.
 *
 * in this case, we're trying to determine whether the
 * population mean is equal to the value that we know, which is `x`
 * here. usually the results here are used to look up a
 * [p-value](http://en.wikipedia.org/wiki/P-value), which, for
 * a certain level of significance, will let you determine that the
 * null hypothesis can or cannot be rejected.
 *
 * @param {Array<number>} x sample of one or more numbers
 * @param {number} expectedValue expected value of the population mean
 * @returns {number} value
 * @example
 * tTest([1, 2, 3, 4, 5, 6], 3.385).toFixed(2); // => '0.16'
 */
function tTest(x/*: Array<number> */, expectedValue/*: number */)/*:number*/ {
    // The mean of the sample
    var sampleMean = mean_1(x);

    // The standard deviation of the sample
    var sd = standard_deviation(x);

    // Square root the length of the sample
    var rootN = Math.sqrt(x.length);

    // returning the t value
    return (sampleMean - expectedValue) / (sd / rootN);
}

var t_test = tTest;

/* @flow */




/**
 * This is to compute [two sample t-test](http://en.wikipedia.org/wiki/Student's_t-test).
 * Tests whether "mean(X)-mean(Y) = difference", (
 * in the most common case, we often have `difference == 0` to test if two samples
 * are likely to be taken from populations with the same mean value) with
 * no prior knowledge on standard deviations of both samples
 * other than the fact that they have the same standard deviation.
 *
 * Usually the results here are used to look up a
 * [p-value](http://en.wikipedia.org/wiki/P-value), which, for
 * a certain level of significance, will let you determine that the
 * null hypothesis can or cannot be rejected.
 *
 * `diff` can be omitted if it equals 0.
 *
 * [This is used to confirm or deny](http://www.monarchlab.org/Lab/Research/Stats/2SampleT.aspx)
 * a null hypothesis that the two populations that have been sampled into
 * `sampleX` and `sampleY` are equal to each other.
 *
 * @param {Array<number>} sampleX a sample as an array of numbers
 * @param {Array<number>} sampleY a sample as an array of numbers
 * @param {number} [difference=0]
 * @returns {number} test result
 * @example
 * ss.tTestTwoSample([1, 2, 3, 4], [3, 4, 5, 6], 0); //= -2.1908902300206643
 */
function tTestTwoSample(
    sampleX/*: Array<number> */,
    sampleY/*: Array<number> */,
    difference/*: number */) {
    var n = sampleX.length,
        m = sampleY.length;

    // If either sample doesn't actually have any values, we can't
    // compute this at all, so we return `null`.
    if (!n || !m) { return null; }

    // default difference (mu) is zero
    if (!difference) {
        difference = 0;
    }

    var meanX = mean_1(sampleX),
        meanY = mean_1(sampleY),
        sampleVarianceX = sample_variance(sampleX),
        sampleVarianceY = sample_variance(sampleY);

    if (typeof meanX === 'number' &&
        typeof meanY === 'number' &&
        typeof sampleVarianceX === 'number' &&
        typeof sampleVarianceY === 'number') {
        var weightedVariance = ((n - 1) * sampleVarianceX +
            (m - 1) * sampleVarianceY) / (n + m - 2);

        return (meanX - meanY - difference) /
            Math.sqrt(weightedVariance * (1 / n + 1 / m));
    }
}

var t_test_two_sample = tTestTwoSample;

/* @flow */

/**
 * [Bayesian Classifier](http://en.wikipedia.org/wiki/Naive_Bayes_classifier)
 *
 * This is a naïve bayesian classifier that takes
 * singly-nested objects.
 *
 * @class
 * @example
 * var bayes = new BayesianClassifier();
 * bayes.train({
 *   species: 'Cat'
 * }, 'animal');
 * var result = bayes.score({
 *   species: 'Cat'
 * })
 * // result
 * // {
 * //   animal: 1
 * // }
 */
function BayesianClassifier() {
    // The number of items that are currently
    // classified in the model
    this.totalCount = 0;
    // Every item classified in the model
    this.data = {};
}

/**
 * Train the classifier with a new item, which has a single
 * dimension of Javascript literal keys and values.
 *
 * @param {Object} item an object with singly-deep properties
 * @param {string} category the category this item belongs to
 * @return {undefined} adds the item to the classifier
 */
BayesianClassifier.prototype.train = function(item, category) {
    // If the data object doesn't have any values
    // for this category, create a new object for it.
    if (!this.data[category]) {
        this.data[category] = {};
    }

    // Iterate through each key in the item.
    for (var k in item) {
        var v = item[k];
        // Initialize the nested object `data[category][k][item[k]]`
        // with an object of keys that equal 0.
        if (this.data[category][k] === undefined) {
            this.data[category][k] = {};
        }
        if (this.data[category][k][v] === undefined) {
            this.data[category][k][v] = 0;
        }

        // And increment the key for this key/value combination.
        this.data[category][k][v]++;
    }

    // Increment the number of items classified
    this.totalCount++;
};

/**
 * Generate a score of how well this item matches all
 * possible categories based on its attributes
 *
 * @param {Object} item an item in the same format as with train
 * @returns {Object} of probabilities that this item belongs to a
 * given category.
 */
BayesianClassifier.prototype.score = function(item) {
    // Initialize an empty array of odds per category.
    var odds = {}, category;
    // Iterate through each key in the item,
    // then iterate through each category that has been used
    // in previous calls to `.train()`
    for (var k in item) {
        var v = item[k];
        for (category in this.data) {
            // Create an empty object for storing key - value combinations
            // for this category.
            odds[category] = {};

            // If this item doesn't even have a property, it counts for nothing,
            // but if it does have the property that we're looking for from
            // the item to categorize, it counts based on how popular it is
            // versus the whole population.
            if (this.data[category][k]) {
                odds[category][k + '_' + v] = (this.data[category][k][v] || 0) / this.totalCount;
            } else {
                odds[category][k + '_' + v] = 0;
            }
        }
    }

    // Set up a new object that will contain sums of these odds by category
    var oddsSums = {};

    for (category in odds) {
        // Tally all of the odds for each category-combination pair -
        // the non-existence of a category does not add anything to the
        // score.
        oddsSums[category] = 0;
        for (var combination in odds[category]) {
            oddsSums[category] += odds[category][combination];
        }
    }

    return oddsSums;
};

var bayesian_classifier = BayesianClassifier;

/* @flow */

/**
 * This is a single-layer [Perceptron Classifier](http://en.wikipedia.org/wiki/Perceptron) that takes
 * arrays of numbers and predicts whether they should be classified
 * as either 0 or 1 (negative or positive examples).
 * @class
 * @example
 * // Create the model
 * var p = new PerceptronModel();
 * // Train the model with input with a diagonal boundary.
 * for (var i = 0; i < 5; i++) {
 *     p.train([1, 1], 1);
 *     p.train([0, 1], 0);
 *     p.train([1, 0], 0);
 *     p.train([0, 0], 0);
 * }
 * p.predict([0, 0]); // 0
 * p.predict([0, 1]); // 0
 * p.predict([1, 0]); // 0
 * p.predict([1, 1]); // 1
 */
function PerceptronModel() {
    // The weights, or coefficients of the model;
    // weights are only populated when training with data.
    this.weights = [];
    // The bias term, or intercept; it is also a weight but
    // it's stored separately for convenience as it is always
    // multiplied by one.
    this.bias = 0;
}

/**
 * **Predict**: Use an array of features with the weight array and bias
 * to predict whether an example is labeled 0 or 1.
 *
 * @param {Array<number>} features an array of features as numbers
 * @returns {number} 1 if the score is over 0, otherwise 0
 */
PerceptronModel.prototype.predict = function(features) {

    // Only predict if previously trained
    // on the same size feature array(s).
    if (features.length !== this.weights.length) { return null; }

    // Calculate the sum of features times weights,
    // with the bias added (implicitly times one).
    var score = 0;
    for (var i = 0; i < this.weights.length; i++) {
        score += this.weights[i] * features[i];
    }
    score += this.bias;

    // Classify as 1 if the score is over 0, otherwise 0.
    if (score > 0) {
        return 1;
    } else {
        return 0;
    }
};

/**
 * **Train** the classifier with a new example, which is
 * a numeric array of features and a 0 or 1 label.
 *
 * @param {Array<number>} features an array of features as numbers
 * @param {number} label either 0 or 1
 * @returns {PerceptronModel} this
 */
PerceptronModel.prototype.train = function(features, label) {
    // Require that only labels of 0 or 1 are considered.
    if (label !== 0 && label !== 1) { return null; }
    // The length of the feature array determines
    // the length of the weight array.
    // The perceptron will continue learning as long as
    // it keeps seeing feature arrays of the same length.
    // When it sees a new data shape, it initializes.
    if (features.length !== this.weights.length) {
        this.weights = features;
        this.bias = 1;
    }
    // Make a prediction based on current weights.
    var prediction = this.predict(features);
    // Update the weights if the prediction is wrong.
    if (prediction !== label) {
        var gradient = label - prediction;
        for (var i = 0; i < this.weights.length; i++) {
            this.weights[i] += gradient * features[i];
        }
        this.bias += gradient;
    }
    return this;
};

var perceptron = PerceptronModel;

/* @flow */

/**
 * We use `ε`, epsilon, as a stopping criterion when we want to iterate
 * until we're "close enough". Epsilon is a very small number: for
 * simple statistics, that number is **0.0001**
 *
 * This is used in calculations like the binomialDistribution, in which
 * the process of finding a value is [iterative](https://en.wikipedia.org/wiki/Iterative_method):
 * it progresses until it is close enough.
 *
 * Below is an example of using epsilon in [gradient descent](https://en.wikipedia.org/wiki/Gradient_descent),
 * where we're trying to find a local minimum of a function's derivative,
 * given by the `fDerivative` method.
 *
 * @example
 * // From calculation, we expect that the local minimum occurs at x=9/4
 * var x_old = 0;
 * // The algorithm starts at x=6
 * var x_new = 6;
 * var stepSize = 0.01;
 *
 * function fDerivative(x) {
 *   return 4 * Math.pow(x, 3) - 9 * Math.pow(x, 2);
 * }
 *
 * // The loop runs until the difference between the previous
 * // value and the current value is smaller than epsilon - a rough
 * // meaure of 'close enough'
 * while (Math.abs(x_new - x_old) > ss.epsilon) {
 *   x_old = x_new;
 *   x_new = x_old - stepSize * fDerivative(x_old);
 * }
 *
 * console.log('Local minimum occurs at', x_new);
 */
var epsilon$5 = 0.0001;

var epsilon_1 = epsilon$5;

/* @flow */

/**
 * A [Factorial](https://en.wikipedia.org/wiki/Factorial), usually written n!, is the product of all positive
 * integers less than or equal to n. Often factorial is implemented
 * recursively, but this iterative approach is significantly faster
 * and simpler.
 *
 * @param {number} n input, must be an integer number 1 or greater
 * @returns {number} factorial: n!
 * @throws {Error} if n is less than 0 or not an integer
 * @example
 * factorial(5); // => 120
 */
function factorial(n /*: number */)/*: number */ {

    // factorial is mathematically undefined for negative numbers
    if (n < 0) {
        throw new Error('factorial requires a non-negative value');
    }

    if (Math.floor(n) !== n) {
        throw new Error('factorial requires an integer input');
    }

    // typically you'll expand the factorial function going down, like
    // 5! = 5 * 4 * 3 * 2 * 1. This is going in the opposite direction,
    // counting from 2 up to the number in question, and since anything
    // multiplied by 1 is itself, the loop only needs to start at 2.
    var accumulator = 1;
    for (var i = 2; i <= n; i++) {
        // for each number up to and including the number `n`, multiply
        // the accumulator my that number.
        accumulator *= i;
    }
    return accumulator;
}

var factorial_1 = factorial;

/* @flow */

/**
 * The [Bernoulli distribution](http://en.wikipedia.org/wiki/Bernoulli_distribution)
 * is the probability discrete
 * distribution of a random variable which takes value 1 with success
 * probability `p` and value 0 with failure
 * probability `q` = 1 - `p`. It can be used, for example, to represent the
 * toss of a coin, where "1" is defined to mean "heads" and "0" is defined
 * to mean "tails" (or vice versa). It is
 * a special case of a Binomial Distribution
 * where `n` = 1.
 *
 * @param {number} p input value, between 0 and 1 inclusive
 * @returns {number[]} values of bernoulli distribution at this point
 * @throws {Error} if p is outside 0 and 1
 * @example
 * bernoulliDistribution(0.3); // => [0.7, 0.3]
 */
function bernoulliDistribution(p/*: number */) /*: number[] */ {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1)
    if (p < 0 || p > 1 ) {
        throw new Error('bernoulliDistribution requires probability to be between 0 and 1 inclusive');
    }

    return [1 - p, p];
}

var bernoulli_distribution = bernoulliDistribution;

/* @flow */



/**
 * The [Binomial Distribution](http://en.wikipedia.org/wiki/Binomial_distribution) is the discrete probability
 * distribution of the number of successes in a sequence of n independent yes/no experiments, each of which yields
 * success with probability `probability`. Such a success/failure experiment is also called a Bernoulli experiment or
 * Bernoulli trial; when trials = 1, the Binomial Distribution is a Bernoulli Distribution.
 *
 * @param {number} trials number of trials to simulate
 * @param {number} probability
 * @returns {number[]} output
 */
function binomialDistribution(
    trials/*: number */,
    probability/*: number */)/*: ?number[] */ {
    // Check that `p` is a valid probability (0 ≤ p ≤ 1),
    // that `n` is an integer, strictly positive.
    if (probability < 0 || probability > 1 ||
        trials <= 0 || trials % 1 !== 0) {
        return undefined;
    }

    // We initialize `x`, the random variable, and `accumulator`, an accumulator
    // for the cumulative distribution function to 0. `distribution_functions`
    // is the object we'll return with the `probability_of_x` and the
    // `cumulativeProbability_of_x`, as well as the calculated mean &
    // variance. We iterate until the `cumulativeProbability_of_x` is
    // within `epsilon` of 1.0.
    var x = 0,
        cumulativeProbability = 0,
        cells = [],
        binomialCoefficient = 1;

    // This algorithm iterates through each potential outcome,
    // until the `cumulativeProbability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        // a [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function)
        cells[x] = binomialCoefficient *
            Math.pow(probability, x) * Math.pow(1 - probability, trials - x);
        cumulativeProbability += cells[x];
        x++;
        binomialCoefficient = binomialCoefficient * (trials - x + 1) / x;
    // when the cumulativeProbability is nearly 1, we've calculated
    // the useful range of this distribution
    } while (cumulativeProbability < 1 - epsilon_1);

    return cells;
}

var binomial_distribution = binomialDistribution;

/* @flow */



/**
 * The [Poisson Distribution](http://en.wikipedia.org/wiki/Poisson_distribution)
 * is a discrete probability distribution that expresses the probability
 * of a given number of events occurring in a fixed interval of time
 * and/or space if these events occur with a known average rate and
 * independently of the time since the last event.
 *
 * The Poisson Distribution is characterized by the strictly positive
 * mean arrival or occurrence rate, `λ`.
 *
 * @param {number} lambda location poisson distribution
 * @returns {number[]} values of poisson distribution at that point
 */
function poissonDistribution(lambda/*: number */) /*: ?number[] */ {
    // Check that lambda is strictly positive
    if (lambda <= 0) { return undefined; }

    // our current place in the distribution
    var x = 0,
        // and we keep track of the current cumulative probability, in
        // order to know when to stop calculating chances.
        cumulativeProbability = 0,
        // the calculated cells to be returned
        cells = [],
        factorialX = 1;

    // This algorithm iterates through each potential outcome,
    // until the `cumulativeProbability` is very close to 1, at
    // which point we've defined the vast majority of outcomes
    do {
        // a [probability mass function](https://en.wikipedia.org/wiki/Probability_mass_function)
        cells[x] = (Math.exp(-lambda) * Math.pow(lambda, x)) / factorialX;
        cumulativeProbability += cells[x];
        x++;
        factorialX *= x;
    // when the cumulativeProbability is nearly 1, we've calculated
    // the useful range of this distribution
    } while (cumulativeProbability < 1 - epsilon_1);

    return cells;
}

var poisson_distribution = poissonDistribution;

/* @flow */

/**
 * **Percentage Points of the χ2 (Chi-Squared) Distribution**
 *
 * The [χ2 (Chi-Squared) Distribution](http://en.wikipedia.org/wiki/Chi-squared_distribution) is used in the common
 * chi-squared tests for goodness of fit of an observed distribution to a theoretical one, the independence of two
 * criteria of classification of qualitative data, and in confidence interval estimation for a population standard
 * deviation of a normal distribution from a sample standard deviation.
 *
 * Values from Appendix 1, Table III of William W. Hines & Douglas C. Montgomery, "Probability and Statistics in
 * Engineering and Management Science", Wiley (1980).
 */
var chiSquaredDistributionTable = {
    '1': {
        '0.995': 0,
        '0.99': 0,
        '0.975': 0,
        '0.95': 0,
        '0.9': 0.02,
        '0.5': 0.45,
        '0.1': 2.71,
        '0.05': 3.84,
        '0.025': 5.02,
        '0.01': 6.63,
        '0.005': 7.88
    },
    '2': {
        '0.995': 0.01,
        '0.99': 0.02,
        '0.975': 0.05,
        '0.95': 0.1,
        '0.9': 0.21,
        '0.5': 1.39,
        '0.1': 4.61,
        '0.05': 5.99,
        '0.025': 7.38,
        '0.01': 9.21,
        '0.005': 10.6
    },
    '3': {
        '0.995': 0.07,
        '0.99': 0.11,
        '0.975': 0.22,
        '0.95': 0.35,
        '0.9': 0.58,
        '0.5': 2.37,
        '0.1': 6.25,
        '0.05': 7.81,
        '0.025': 9.35,
        '0.01': 11.34,
        '0.005': 12.84
    },
    '4': {
        '0.995': 0.21,
        '0.99': 0.3,
        '0.975': 0.48,
        '0.95': 0.71,
        '0.9': 1.06,
        '0.5': 3.36,
        '0.1': 7.78,
        '0.05': 9.49,
        '0.025': 11.14,
        '0.01': 13.28,
        '0.005': 14.86
    },
    '5': {
        '0.995': 0.41,
        '0.99': 0.55,
        '0.975': 0.83,
        '0.95': 1.15,
        '0.9': 1.61,
        '0.5': 4.35,
        '0.1': 9.24,
        '0.05': 11.07,
        '0.025': 12.83,
        '0.01': 15.09,
        '0.005': 16.75
    },
    '6': {
        '0.995': 0.68,
        '0.99': 0.87,
        '0.975': 1.24,
        '0.95': 1.64,
        '0.9': 2.2,
        '0.5': 5.35,
        '0.1': 10.65,
        '0.05': 12.59,
        '0.025': 14.45,
        '0.01': 16.81,
        '0.005': 18.55
    },
    '7': {
        '0.995': 0.99,
        '0.99': 1.25,
        '0.975': 1.69,
        '0.95': 2.17,
        '0.9': 2.83,
        '0.5': 6.35,
        '0.1': 12.02,
        '0.05': 14.07,
        '0.025': 16.01,
        '0.01': 18.48,
        '0.005': 20.28
    },
    '8': {
        '0.995': 1.34,
        '0.99': 1.65,
        '0.975': 2.18,
        '0.95': 2.73,
        '0.9': 3.49,
        '0.5': 7.34,
        '0.1': 13.36,
        '0.05': 15.51,
        '0.025': 17.53,
        '0.01': 20.09,
        '0.005': 21.96
    },
    '9': {
        '0.995': 1.73,
        '0.99': 2.09,
        '0.975': 2.7,
        '0.95': 3.33,
        '0.9': 4.17,
        '0.5': 8.34,
        '0.1': 14.68,
        '0.05': 16.92,
        '0.025': 19.02,
        '0.01': 21.67,
        '0.005': 23.59
    },
    '10': {
        '0.995': 2.16,
        '0.99': 2.56,
        '0.975': 3.25,
        '0.95': 3.94,
        '0.9': 4.87,
        '0.5': 9.34,
        '0.1': 15.99,
        '0.05': 18.31,
        '0.025': 20.48,
        '0.01': 23.21,
        '0.005': 25.19
    },
    '11': {
        '0.995': 2.6,
        '0.99': 3.05,
        '0.975': 3.82,
        '0.95': 4.57,
        '0.9': 5.58,
        '0.5': 10.34,
        '0.1': 17.28,
        '0.05': 19.68,
        '0.025': 21.92,
        '0.01': 24.72,
        '0.005': 26.76
    },
    '12': {
        '0.995': 3.07,
        '0.99': 3.57,
        '0.975': 4.4,
        '0.95': 5.23,
        '0.9': 6.3,
        '0.5': 11.34,
        '0.1': 18.55,
        '0.05': 21.03,
        '0.025': 23.34,
        '0.01': 26.22,
        '0.005': 28.3
    },
    '13': {
        '0.995': 3.57,
        '0.99': 4.11,
        '0.975': 5.01,
        '0.95': 5.89,
        '0.9': 7.04,
        '0.5': 12.34,
        '0.1': 19.81,
        '0.05': 22.36,
        '0.025': 24.74,
        '0.01': 27.69,
        '0.005': 29.82
    },
    '14': {
        '0.995': 4.07,
        '0.99': 4.66,
        '0.975': 5.63,
        '0.95': 6.57,
        '0.9': 7.79,
        '0.5': 13.34,
        '0.1': 21.06,
        '0.05': 23.68,
        '0.025': 26.12,
        '0.01': 29.14,
        '0.005': 31.32
    },
    '15': {
        '0.995': 4.6,
        '0.99': 5.23,
        '0.975': 6.27,
        '0.95': 7.26,
        '0.9': 8.55,
        '0.5': 14.34,
        '0.1': 22.31,
        '0.05': 25,
        '0.025': 27.49,
        '0.01': 30.58,
        '0.005': 32.8
    },
    '16': {
        '0.995': 5.14,
        '0.99': 5.81,
        '0.975': 6.91,
        '0.95': 7.96,
        '0.9': 9.31,
        '0.5': 15.34,
        '0.1': 23.54,
        '0.05': 26.3,
        '0.025': 28.85,
        '0.01': 32,
        '0.005': 34.27
    },
    '17': {
        '0.995': 5.7,
        '0.99': 6.41,
        '0.975': 7.56,
        '0.95': 8.67,
        '0.9': 10.09,
        '0.5': 16.34,
        '0.1': 24.77,
        '0.05': 27.59,
        '0.025': 30.19,
        '0.01': 33.41,
        '0.005': 35.72
    },
    '18': {
        '0.995': 6.26,
        '0.99': 7.01,
        '0.975': 8.23,
        '0.95': 9.39,
        '0.9': 10.87,
        '0.5': 17.34,
        '0.1': 25.99,
        '0.05': 28.87,
        '0.025': 31.53,
        '0.01': 34.81,
        '0.005': 37.16
    },
    '19': {
        '0.995': 6.84,
        '0.99': 7.63,
        '0.975': 8.91,
        '0.95': 10.12,
        '0.9': 11.65,
        '0.5': 18.34,
        '0.1': 27.2,
        '0.05': 30.14,
        '0.025': 32.85,
        '0.01': 36.19,
        '0.005': 38.58
    },
    '20': {
        '0.995': 7.43,
        '0.99': 8.26,
        '0.975': 9.59,
        '0.95': 10.85,
        '0.9': 12.44,
        '0.5': 19.34,
        '0.1': 28.41,
        '0.05': 31.41,
        '0.025': 34.17,
        '0.01': 37.57,
        '0.005': 40
    },
    '21': {
        '0.995': 8.03,
        '0.99': 8.9,
        '0.975': 10.28,
        '0.95': 11.59,
        '0.9': 13.24,
        '0.5': 20.34,
        '0.1': 29.62,
        '0.05': 32.67,
        '0.025': 35.48,
        '0.01': 38.93,
        '0.005': 41.4
    },
    '22': {
        '0.995': 8.64,
        '0.99': 9.54,
        '0.975': 10.98,
        '0.95': 12.34,
        '0.9': 14.04,
        '0.5': 21.34,
        '0.1': 30.81,
        '0.05': 33.92,
        '0.025': 36.78,
        '0.01': 40.29,
        '0.005': 42.8
    },
    '23': {
        '0.995': 9.26,
        '0.99': 10.2,
        '0.975': 11.69,
        '0.95': 13.09,
        '0.9': 14.85,
        '0.5': 22.34,
        '0.1': 32.01,
        '0.05': 35.17,
        '0.025': 38.08,
        '0.01': 41.64,
        '0.005': 44.18
    },
    '24': {
        '0.995': 9.89,
        '0.99': 10.86,
        '0.975': 12.4,
        '0.95': 13.85,
        '0.9': 15.66,
        '0.5': 23.34,
        '0.1': 33.2,
        '0.05': 36.42,
        '0.025': 39.36,
        '0.01': 42.98,
        '0.005': 45.56
    },
    '25': {
        '0.995': 10.52,
        '0.99': 11.52,
        '0.975': 13.12,
        '0.95': 14.61,
        '0.9': 16.47,
        '0.5': 24.34,
        '0.1': 34.28,
        '0.05': 37.65,
        '0.025': 40.65,
        '0.01': 44.31,
        '0.005': 46.93
    },
    '26': {
        '0.995': 11.16,
        '0.99': 12.2,
        '0.975': 13.84,
        '0.95': 15.38,
        '0.9': 17.29,
        '0.5': 25.34,
        '0.1': 35.56,
        '0.05': 38.89,
        '0.025': 41.92,
        '0.01': 45.64,
        '0.005': 48.29
    },
    '27': {
        '0.995': 11.81,
        '0.99': 12.88,
        '0.975': 14.57,
        '0.95': 16.15,
        '0.9': 18.11,
        '0.5': 26.34,
        '0.1': 36.74,
        '0.05': 40.11,
        '0.025': 43.19,
        '0.01': 46.96,
        '0.005': 49.65
    },
    '28': {
        '0.995': 12.46,
        '0.99': 13.57,
        '0.975': 15.31,
        '0.95': 16.93,
        '0.9': 18.94,
        '0.5': 27.34,
        '0.1': 37.92,
        '0.05': 41.34,
        '0.025': 44.46,
        '0.01': 48.28,
        '0.005': 50.99
    },
    '29': {
        '0.995': 13.12,
        '0.99': 14.26,
        '0.975': 16.05,
        '0.95': 17.71,
        '0.9': 19.77,
        '0.5': 28.34,
        '0.1': 39.09,
        '0.05': 42.56,
        '0.025': 45.72,
        '0.01': 49.59,
        '0.005': 52.34
    },
    '30': {
        '0.995': 13.79,
        '0.99': 14.95,
        '0.975': 16.79,
        '0.95': 18.49,
        '0.9': 20.6,
        '0.5': 29.34,
        '0.1': 40.26,
        '0.05': 43.77,
        '0.025': 46.98,
        '0.01': 50.89,
        '0.005': 53.67
    },
    '40': {
        '0.995': 20.71,
        '0.99': 22.16,
        '0.975': 24.43,
        '0.95': 26.51,
        '0.9': 29.05,
        '0.5': 39.34,
        '0.1': 51.81,
        '0.05': 55.76,
        '0.025': 59.34,
        '0.01': 63.69,
        '0.005': 66.77
    },
    '50': {
        '0.995': 27.99,
        '0.99': 29.71,
        '0.975': 32.36,
        '0.95': 34.76,
        '0.9': 37.69,
        '0.5': 49.33,
        '0.1': 63.17,
        '0.05': 67.5,
        '0.025': 71.42,
        '0.01': 76.15,
        '0.005': 79.49
    },
    '60': {
        '0.995': 35.53,
        '0.99': 37.48,
        '0.975': 40.48,
        '0.95': 43.19,
        '0.9': 46.46,
        '0.5': 59.33,
        '0.1': 74.4,
        '0.05': 79.08,
        '0.025': 83.3,
        '0.01': 88.38,
        '0.005': 91.95
    },
    '70': {
        '0.995': 43.28,
        '0.99': 45.44,
        '0.975': 48.76,
        '0.95': 51.74,
        '0.9': 55.33,
        '0.5': 69.33,
        '0.1': 85.53,
        '0.05': 90.53,
        '0.025': 95.02,
        '0.01': 100.42,
        '0.005': 104.22
    },
    '80': {
        '0.995': 51.17,
        '0.99': 53.54,
        '0.975': 57.15,
        '0.95': 60.39,
        '0.9': 64.28,
        '0.5': 79.33,
        '0.1': 96.58,
        '0.05': 101.88,
        '0.025': 106.63,
        '0.01': 112.33,
        '0.005': 116.32
    },
    '90': {
        '0.995': 59.2,
        '0.99': 61.75,
        '0.975': 65.65,
        '0.95': 69.13,
        '0.9': 73.29,
        '0.5': 89.33,
        '0.1': 107.57,
        '0.05': 113.14,
        '0.025': 118.14,
        '0.01': 124.12,
        '0.005': 128.3
    },
    '100': {
        '0.995': 67.33,
        '0.99': 70.06,
        '0.975': 74.22,
        '0.95': 77.93,
        '0.9': 82.36,
        '0.5': 99.33,
        '0.1': 118.5,
        '0.05': 124.34,
        '0.025': 129.56,
        '0.01': 135.81,
        '0.005': 140.17
    }
};

var chi_squared_distribution_table = chiSquaredDistributionTable;

/* @flow */




/**
 * The [χ2 (Chi-Squared) Goodness-of-Fit Test](http://en.wikipedia.org/wiki/Goodness_of_fit#Pearson.27s_chi-squared_test)
 * uses a measure of goodness of fit which is the sum of differences between observed and expected outcome frequencies
 * (that is, counts of observations), each squared and divided by the number of observations expected given the
 * hypothesized distribution. The resulting χ2 statistic, `chiSquared`, can be compared to the chi-squared distribution
 * to determine the goodness of fit. In order to determine the degrees of freedom of the chi-squared distribution, one
 * takes the total number of observed frequencies and subtracts the number of estimated parameters. The test statistic
 * follows, approximately, a chi-square distribution with (k − c) degrees of freedom where `k` is the number of non-empty
 * cells and `c` is the number of estimated parameters for the distribution.
 *
 * @param {Array<number>} data
 * @param {Function} distributionType a function that returns a point in a distribution:
 * for instance, binomial, bernoulli, or poisson
 * @param {number} significance
 * @returns {number} chi squared goodness of fit
 * @example
 * // Data from Poisson goodness-of-fit example 10-19 in William W. Hines & Douglas C. Montgomery,
 * // "Probability and Statistics in Engineering and Management Science", Wiley (1980).
 * var data1019 = [
 *     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 *     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
 *     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
 *     2, 2, 2, 2, 2, 2, 2, 2, 2,
 *     3, 3, 3, 3
 * ];
 * ss.chiSquaredGoodnessOfFit(data1019, ss.poissonDistribution, 0.05)); //= false
 */
function chiSquaredGoodnessOfFit(
    data/*: Array<number> */,
    distributionType/*: Function */,
    significance/*: number */)/*: boolean */ {
    // Estimate from the sample data, a weighted mean.
    var inputMean = mean_1(data),
        // Calculated value of the χ2 statistic.
        chiSquared = 0,
        // Degrees of freedom, calculated as (number of class intervals -
        // number of hypothesized distribution parameters estimated - 1)
        degreesOfFreedom,
        // Number of hypothesized distribution parameters estimated, expected to be supplied in the distribution test.
        // Lose one degree of freedom for estimating `lambda` from the sample data.
        c = 1,
        // The hypothesized distribution.
        // Generate the hypothesized distribution.
        hypothesizedDistribution = distributionType(inputMean),
        observedFrequencies = [],
        expectedFrequencies = [],
        k;

    // Create an array holding a histogram from the sample data, of
    // the form `{ value: numberOfOcurrences }`
    for (var i = 0; i < data.length; i++) {
        if (observedFrequencies[data[i]] === undefined) {
            observedFrequencies[data[i]] = 0;
        }
        observedFrequencies[data[i]]++;
    }

    // The histogram we created might be sparse - there might be gaps
    // between values. So we iterate through the histogram, making
    // sure that instead of undefined, gaps have 0 values.
    for (i = 0; i < observedFrequencies.length; i++) {
        if (observedFrequencies[i] === undefined) {
            observedFrequencies[i] = 0;
        }
    }

    // Create an array holding a histogram of expected data given the
    // sample size and hypothesized distribution.
    for (k in hypothesizedDistribution) {
        if (k in observedFrequencies) {
            expectedFrequencies[+k] = hypothesizedDistribution[k] * data.length;
        }
    }

    // Working backward through the expected frequencies, collapse classes
    // if less than three observations are expected for a class.
    // This transformation is applied to the observed frequencies as well.
    for (k = expectedFrequencies.length - 1; k >= 0; k--) {
        if (expectedFrequencies[k] < 3) {
            expectedFrequencies[k - 1] += expectedFrequencies[k];
            expectedFrequencies.pop();

            observedFrequencies[k - 1] += observedFrequencies[k];
            observedFrequencies.pop();
        }
    }

    // Iterate through the squared differences between observed & expected
    // frequencies, accumulating the `chiSquared` statistic.
    for (k = 0; k < observedFrequencies.length; k++) {
        chiSquared += Math.pow(
            observedFrequencies[k] - expectedFrequencies[k], 2) /
            expectedFrequencies[k];
    }

    // Calculate degrees of freedom for this test and look it up in the
    // `chiSquaredDistributionTable` in order to
    // accept or reject the goodness-of-fit of the hypothesized distribution.
    degreesOfFreedom = observedFrequencies.length - c - 1;
    return chi_squared_distribution_table[degreesOfFreedom][significance] < chiSquared;
}

var chi_squared_goodness_of_fit = chiSquaredGoodnessOfFit;

/* @flow */

/**
 * The [Z-Score, or Standard Score](http://en.wikipedia.org/wiki/Standard_score).
 *
 * The standard score is the number of standard deviations an observation
 * or datum is above or below the mean. Thus, a positive standard score
 * represents a datum above the mean, while a negative standard score
 * represents a datum below the mean. It is a dimensionless quantity
 * obtained by subtracting the population mean from an individual raw
 * score and then dividing the difference by the population standard
 * deviation.
 *
 * The z-score is only defined if one knows the population parameters;
 * if one only has a sample set, then the analogous computation with
 * sample mean and sample standard deviation yields the
 * Student's t-statistic.
 *
 * @param {number} x
 * @param {number} mean
 * @param {number} standardDeviation
 * @return {number} z score
 * @example
 * zScore(78, 80, 5); // => -0.4
 */
function zScore(x/*:number*/, mean/*:number*/, standardDeviation/*:number*/)/*:number*/ {
    return (x - mean) / standardDeviation;
}

var z_score = zScore;

/* @flow */

var SQRT_2PI = Math.sqrt(2 * Math.PI);

function cumulativeDistribution(z) {
    var sum = z,
        tmp = z;

    // 15 iterations are enough for 4-digit precision
    for (var i = 1; i < 15; i++) {
        tmp *= z * z / (2 * i + 1);
        sum += tmp;
    }
    return Math.round((0.5 + (sum / SQRT_2PI) * Math.exp(-z * z / 2)) * 1e4) / 1e4;
}

/**
 * A standard normal table, also called the unit normal table or Z table,
 * is a mathematical table for the values of Φ (phi), which are the values of
 * the cumulative distribution function of the normal distribution.
 * It is used to find the probability that a statistic is observed below,
 * above, or between values on the standard normal distribution, and by
 * extension, any normal distribution.
 *
 * The probabilities are calculated using the
 * [Cumulative distribution function](https://en.wikipedia.org/wiki/Normal_distribution#Cumulative_distribution_function).
 * The table used is the cumulative, and not cumulative from 0 to mean
 * (even though the latter has 5 digits precision, instead of 4).
 */
var standardNormalTable/*: Array<number> */ = [];

for (var z = 0; z <= 3.09; z += 0.01) {
    standardNormalTable.push(cumulativeDistribution(z));
}

var standard_normal_table = standardNormalTable;

/* @flow */



/**
 * **[Cumulative Standard Normal Probability](http://en.wikipedia.org/wiki/Standard_normal_table)**
 *
 * Since probability tables cannot be
 * printed for every normal distribution, as there are an infinite variety
 * of normal distributions, it is common practice to convert a normal to a
 * standard normal and then use the standard normal table to find probabilities.
 *
 * You can use `.5 + .5 * errorFunction(x / Math.sqrt(2))` to calculate the probability
 * instead of looking it up in a table.
 *
 * @param {number} z
 * @returns {number} cumulative standard normal probability
 */
function cumulativeStdNormalProbability(z /*:number */)/*:number */ {

    // Calculate the position of this value.
    var absZ = Math.abs(z),
        // Each row begins with a different
        // significant digit: 0.5, 0.6, 0.7, and so on. Each value in the table
        // corresponds to a range of 0.01 in the input values, so the value is
        // multiplied by 100.
        index = Math.min(Math.round(absZ * 100), standard_normal_table.length - 1);

    // The index we calculate must be in the table as a positive value,
    // but we still pay attention to whether the input is positive
    // or negative, and flip the output value as a last step.
    if (z >= 0) {
        return standard_normal_table[index];
    } else {
        // due to floating-point arithmetic, values in the table with
        // 4 significant figures can nevertheless end up as repeating
        // fractions when they're computed here.
        return +(1 - standard_normal_table[index]).toFixed(4);
    }
}

var cumulative_std_normal_probability = cumulativeStdNormalProbability;

/* @flow */

/**
 * **[Gaussian error function](http://en.wikipedia.org/wiki/Error_function)**
 *
 * The `errorFunction(x/(sd * Math.sqrt(2)))` is the probability that a value in a
 * normal distribution with standard deviation sd is within x of the mean.
 *
 * This function returns a numerical approximation to the exact value.
 *
 * @param {number} x input
 * @return {number} error estimation
 * @example
 * errorFunction(1).toFixed(2); // => '0.84'
 */
function errorFunction(x/*: number */)/*: number */ {
    var t = 1 / (1 + 0.5 * Math.abs(x));
    var tau = t * Math.exp(-Math.pow(x, 2) -
        1.26551223 +
        1.00002368 * t +
        0.37409196 * Math.pow(t, 2) +
        0.09678418 * Math.pow(t, 3) -
        0.18628806 * Math.pow(t, 4) +
        0.27886807 * Math.pow(t, 5) -
        1.13520398 * Math.pow(t, 6) +
        1.48851587 * Math.pow(t, 7) -
        0.82215223 * Math.pow(t, 8) +
        0.17087277 * Math.pow(t, 9));
    if (x >= 0) {
        return 1 - tau;
    } else {
        return tau - 1;
    }
}

var error_function = errorFunction;

/* @flow */

/**
 * The Inverse [Gaussian error function](http://en.wikipedia.org/wiki/Error_function)
 * returns a numerical approximation to the value that would have caused
 * `errorFunction()` to return x.
 *
 * @param {number} x value of error function
 * @returns {number} estimated inverted value
 */
function inverseErrorFunction(x/*: number */)/*: number */ {
    var a = (8 * (Math.PI - 3)) / (3 * Math.PI * (4 - Math.PI));

    var inv = Math.sqrt(Math.sqrt(
        Math.pow(2 / (Math.PI * a) + Math.log(1 - x * x) / 2, 2) -
        Math.log(1 - x * x) / a) -
        (2 / (Math.PI * a) + Math.log(1 - x * x) / 2));

    if (x >= 0) {
        return inv;
    } else {
        return -inv;
    }
}

var inverse_error_function = inverseErrorFunction;

/* @flow */




/**
 * The [Probit](http://en.wikipedia.org/wiki/Probit)
 * is the inverse of cumulativeStdNormalProbability(),
 * and is also known as the normal quantile function.
 *
 * It returns the number of standard deviations from the mean
 * where the p'th quantile of values can be found in a normal distribution.
 * So, for example, probit(0.5 + 0.6827/2) ≈ 1 because 68.27% of values are
 * normally found within 1 standard deviation above or below the mean.
 *
 * @param {number} p
 * @returns {number} probit
 */
function probit(p /*: number */)/*: number */ {
    if (p === 0) {
        p = epsilon_1;
    } else if (p >= 1) {
        p = 1 - epsilon_1;
    }
    return Math.sqrt(2) * inverse_error_function(2 * p - 1);
}

var probit_1 = probit;

/* @flow */

/**
 * [Sign](https://en.wikipedia.org/wiki/Sign_function) is a function 
 * that extracts the sign of a real number
 * 
 * @param {Number} x input value
 * @returns {Number} sign value either 1, 0 or -1
 * @throws {TypeError} if the input argument x is not a number
 * @private
 * 
 * @example
 * sign(2); // => 1
 */
function sign$3(x/*: number */)/*: number */ {
    if (typeof x === 'number') {
        if (x < 0) {
            return -1;
        } else if (x === 0) {
            return 0
        } else {
            return 1;
        }
    } else {
        throw new TypeError('not a number');
    }
}

var sign_1 = sign$3;

/* @flow */


/**
 * [Bisection method](https://en.wikipedia.org/wiki/Bisection_method) is a root-finding 
 * method that repeatedly bisects an interval to find the root.
 * 
 * This function returns a numerical approximation to the exact value.
 * 
 * @param {Function} func input function
 * @param {Number} start - start of interval
 * @param {Number} end - end of interval
 * @param {Number} maxIterations - the maximum number of iterations
 * @param {Number} errorTolerance - the error tolerance
 * @returns {Number} estimated root value
 * @throws {TypeError} Argument func must be a function
 * 
 * @example
 * bisect(Math.cos,0,4,100,0.003); // => 1.572265625
 */
function bisect$1(
    func/*: (x: any) => number */,
    start/*: number */,
    end/*: number */,
    maxIterations/*: number */,
    errorTolerance/*: number */)/*:number*/ {

    if (typeof func !== 'function') throw new TypeError('func must be a function');
    
    for (var i = 0; i < maxIterations; i++) {
        var output = (start + end) / 2;

        if (func(output) === 0 || Math.abs((end - start) / 2) < errorTolerance) {
            return output;
        }

        if (sign_1(func(output)) === sign_1(func(start))) {
            start = output;
        } else {
            end = output;
        }
    }
    
    throw new Error('maximum number of iterations exceeded');
}

var bisect_1 = bisect$1;

var index$10 = createCommonjsModule(function (module) {
/* @flow */
'use strict';

// # simple-statistics
//
// A simple, literate statistics system.

var ss = module.exports = {};

// Linear Regression
ss.linearRegression = linear_regression;
ss.linearRegressionLine = linear_regression_line;
ss.standardDeviation = standard_deviation;
ss.rSquared = r_squared;
ss.mode = mode_1;
ss.modeFast = mode_fast;
ss.modeSorted = mode_sorted;
ss.min = min_1;
ss.max = max_1;
ss.minSorted = min_sorted;
ss.maxSorted = max_sorted;
ss.sum = sum_1;
ss.sumSimple = sum_simple;
ss.product = product_1;
ss.quantile = quantile_1;
ss.quantileSorted = quantile_sorted;
ss.iqr = ss.interquartileRange = interquartile_range;
ss.medianAbsoluteDeviation = ss.mad = median_absolute_deviation;
ss.chunk = chunk_1;
ss.sampleWithReplacement = sample_with_replacement;
ss.shuffle = shuffle_1;
ss.shuffleInPlace = shuffle_in_place;
ss.sample = sample_1;
ss.ckmeans = ckmeans_1;
ss.uniqueCountSorted = unique_count_sorted;
ss.sumNthPowerDeviations = sum_nth_power_deviations;
ss.equalIntervalBreaks = equal_interval_breaks;

// sample statistics
ss.sampleCovariance = sample_covariance;
ss.sampleCorrelation = sample_correlation;
ss.sampleVariance = sample_variance;
ss.sampleStandardDeviation = sample_standard_deviation;
ss.sampleSkewness = sample_skewness;
ss.sampleKurtosis = sample_kurtosis;

// combinatorics
ss.permutationsHeap = permutations_heap;
ss.combinations = combinations_1;
ss.combinationsReplacement = combinations_replacement;

// measures of centrality
ss.addToMean = add_to_mean;
ss.combineMeans = combine_means;
ss.combineVariances = combine_variances;
ss.geometricMean = geometric_mean;
ss.harmonicMean = harmonic_mean;
ss.mean = ss.average = mean_1;
ss.median = median_1;
ss.medianSorted = median_sorted;
ss.subtractFromMean = subtract_from_mean;

ss.rootMeanSquare = ss.rms = root_mean_square;
ss.variance = variance_1;
ss.tTest = t_test;
ss.tTestTwoSample = t_test_two_sample;
// ss.jenks = require('./src/jenks');

// Classifiers
ss.bayesian = bayesian_classifier;
ss.perceptron = perceptron;

// Distribution-related methods
ss.epsilon = epsilon_1; // We make ε available to the test suite.
ss.factorial = factorial_1;
ss.bernoulliDistribution = bernoulli_distribution;
ss.binomialDistribution = binomial_distribution;
ss.poissonDistribution = poisson_distribution;
ss.chiSquaredGoodnessOfFit = chi_squared_goodness_of_fit;

// Normal distribution
ss.zScore = z_score;
ss.cumulativeStdNormalProbability = cumulative_std_normal_probability;
ss.standardNormalTable = standard_normal_table;
ss.errorFunction = ss.erf = error_function;
ss.inverseErrorFunction = inverse_error_function;
ss.probit = probit_1;

// Root-finding methods
ss.bisect = bisect_1;
});

var pByFraction = function (fraction) {
  var step = 1 / fraction;
  var pArr = [];
  for (var i = 0; i <= 1; i = i + step) {
    pArr.push(i);
  }
  return pArr;
};

var max$2 = index$10.max;
var mean$1 = index$10.mean;
var median$1 = index$10.median;
var min$2 = index$10.min;
var mode = index$10.mode;
var quantile$1 = index$10.quantile;
var standardDeviation = index$10.standardDeviation;
var sum$3 = index$10.sum;
var variance$1 = index$10.variance;


assign_1(dataView.prototype, {
  // statistics
  max: function (column) {
    return max$2(this.getColumn(column));
  },
  mean: function (column) {
    return mean$1(this.getColumn(column));
  },
  average: function (column) {
    // alias
    return this.mean(column);
  },
  median: function (column) {
    return median$1(this.getColumn(column));
  },
  min: function (column) {
    return min$2(this.getColumn(column));
  },
  mode: function (column) {
    return mode(this.getColumn(column));
  },
  quantile: function (column, p) {
    return quantile$1(this.getColumn(column), p);
  },
  quantiles: function (column, pArr) {
    var columnArr = this.getColumn(column);
    return map_1(pArr, function (p) {
      return quantile$1(columnArr, p);
    });
  },
  quantilesByFraction: function (column, fraction) {
    return this.quantiles(column, pByFraction(fraction));
  },
  standardDeviation: function (column) {
    return standardDeviation(this.getColumn(column));
  },
  sum: function (column) {
    return sum$3(this.getColumn(column));
  },
  variance: function (column) {
    return variance$1(this.getColumn(column));
  },
  range: function (column) {
    var me = this;
    return [me.min(column), me.max(column)];
  },
  extent: function (column) {
    // alias
    return this.range(column);
  }
});

var DataSet = function (_EventEmitter) {
  inherits(DataSet, _EventEmitter);

  function DataSet() {
    classCallCheck(this, DataSet);

    var _this = possibleConstructorReturn(this, _EventEmitter.call(this));

    var me = _this;
    assign_1(me, {
      _onChangeTimer: null,
      DataSet: DataSet,
      isDataSet: true,
      state: {},
      views: {}
    });
    return _this;
  }

  DataSet.prototype.createView = function createView(name) {
    var me = this;
    var view = new dataView(me);
    me.views[name] = view;
    return view;
  };

  DataSet.prototype.getView = function getView(name) {
    return this.views[name];
  };

  DataSet.prototype.setView = function setView(name, view) {
    this.views[name] = view;
  };

  DataSet.prototype.setState = function setState(name, value) {
    var me = this;
    me.state[name] = value;
    if (me._onChangeTimer) {
      clearTimeout(me._onChangeTimer);
      me._onChangeTimer = null;
    }
    me._onChangeTimer = setTimeout(function () {
      me.trigger('statechange');
    }, 16); // execute after one frame
  };

  return DataSet;
}(EventEmitter);

assign_1(DataSet, {
  DataSet: DataSet,
  DataView: dataView,
  connectors: {},
  transforms: {},

  registerConnector: function (name, connector) {
    DataSet.connectors[name] = connector;
  },
  getConnector: function (name) {
    return DataSet.connectors[name] || DataSet.connectors.default;
  },
  registerTransform: function (name, transform) {
    DataSet.transforms[name] = transform;
  },
  getTransform: function (name) {
    return DataSet.transforms[name] || DataSet.transforms.default;
  }
});

var dataSet = DataSet;

var registerConnector = dataSet.registerConnector;


registerConnector('default', function (dataView, dataSet$$1) {
  if (isString_1(dataView)) {
    dataView = dataSet$$1.getView(dataView);
  }
  if (!dataView) {
    throw new TypeError('Invalid dataView');
  }
  return cloneDeep_1(dataView.rows);
});

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "]";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

var dsv$2 = function(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      delimiterCode = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns;
    return rows;
  }

  function parseRows(text, f) {
    var EOL = {}, // sentinel value for end-of-line
        EOF = {}, // sentinel value for end-of-file
        rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // the current line number
        t, // the current token
        eol; // is the current token followed by EOL?

    function token() {
      if (I >= N) return EOF; // special case: end of file
      if (eol) return eol = false, EOL; // special case: end of line

      // special case: quotes
      var j = I, c;
      if (text.charCodeAt(j) === 34) {
        var i = j;
        while (i++ < N) {
          if (text.charCodeAt(i) === 34) {
            if (text.charCodeAt(i + 1) !== 34) break;
            ++i;
          }
        }
        I = i + 2;
        c = text.charCodeAt(i + 1);
        if (c === 13) {
          eol = true;
          if (text.charCodeAt(i + 2) === 10) ++I;
        } else if (c === 10) {
          eol = true;
        }
        return text.slice(j + 1, i).replace(/""/g, "\"");
      }

      // common case: find next delimiter or newline
      while (I < N) {
        var k = 1;
        c = text.charCodeAt(I++);
        if (c === 10) eol = true; // \n
        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \r|\r\n
        else if (c !== delimiterCode) continue;
        return text.slice(j, I - k);
      }

      // special case: last token before EOF
      return text.slice(j);
    }

    while ((t = token()) !== EOF) {
      var a = [];
      while (t !== EOL && t !== EOF) {
        a.push(t);
        t = token();
      }
      if (f && (a = f(a, n++)) == null) continue;
      rows.push(a);
    }

    return rows;
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    })).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(text) {
    return text == null ? ""
        : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\""
        : text;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatRows: formatRows
  };
};

var csv = dsv$2(",");

var csvParse$1 = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatRows = csv.formatRows;

var tsv = dsv$2("\t");

var tsvParse$1 = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatRows = tsv.formatRows;



var index$12 = Object.freeze({
	dsvFormat: dsv$2,
	csvParse: csvParse$1,
	csvParseRows: csvParseRows,
	csvFormat: csvFormat,
	csvFormatRows: csvFormatRows,
	tsvParse: tsvParse$1,
	tsvParseRows: tsvParseRows,
	tsvFormat: tsvFormat,
	tsvFormatRows: tsvFormatRows
});

var require$$0$5 = ( index$12 && undefined ) || index$12;

var dsvFormat = require$$0$5.dsvFormat;
var csvParse = require$$0$5.csvParse;
var tsvParse = require$$0$5.tsvParse;
var registerConnector$1 = dataSet.registerConnector;


registerConnector$1('dsv', function (str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var delimiter = options.delimiter || ',';
  return dsvFormat(delimiter).parse(str);
});

registerConnector$1('csv', function (str) {
  return csvParse(str);
});

registerConnector$1('tsv', function (str) {
  return tsvParse(str);
});

var index$15 = parse;

/**
 * expected argument lengths
 * @type {Object}
 */

var length$4 = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0};

/**
 * segment pattern
 * @type {RegExp}
 */

var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;

/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */

function parse(path) {
	var data = [];
	path.replace(segment, function(_, command, args){
		var type = command.toLowerCase();
		args = parseValues(args);

		// overloaded moveTo
		if (type == 'm' && args.length > 2) {
			data.push([command].concat(args.splice(0, 2)));
			type = 'l';
			command = command == 'm' ? 'l' : 'L';
		}

		while (true) {
			if (args.length == length$4[type]) {
				args.unshift(command);
				return data.push(args)
			}
			if (args.length < length$4[type]) throw new Error('malformed path data')
			data.push([command].concat(args.splice(0, length$4[type])));
		}
	});
	return data
}

var number$1 = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

function parseValues(args) {
	var numbers = args.match(number$1);
	return numbers ? numbers.map(Number) : []
}

var index$17 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var index$19 = absolutize;

/**
 * redefine `path` with absolute coordinates
 *
 * @param {Array} path
 * @return {Array}
 */

function absolutize(path){
	var startX = 0;
	var startY = 0;
	var x = 0;
	var y = 0;

	return path.map(function(seg){
		seg = seg.slice();
		var type = seg[0];
		var command = type.toUpperCase();

		// is relative
		if (type != command) {
			seg[0] = command;
			switch (type) {
				case 'a':
					seg[6] += x;
					seg[7] += y;
					break
				case 'v':
					seg[1] += y;
					break
				case 'h':
					seg[1] += x;
					break
				default:
					for (var i = 1; i < seg.length;) {
						seg[i++] += x;
						seg[i++] += y;
					}
			}
		}

		// update cursor state
		switch (command) {
			case 'Z':
				x = startX;
				y = startY;
				break
			case 'H':
				x = seg[1];
				break
			case 'V':
				y = seg[1];
				break
			case 'M':
				x = startX = seg[1];
				y = startY = seg[2];
				break
			default:
				x = seg[seg.length - 2];
				y = seg[seg.length - 1];
		}

		return seg
	})
}

var index$13 = Points;

function Points (path) {
    if (!(this instanceof Points)) return new Points(path);
    this._path = index$17(path) ? path : index$15(path);
    this._path = index$19(this._path);
    this._path = zToL(this._path);
}

Points.prototype.at = function (pos, opts) {
    return this._walk(pos, opts).pos;
};

Points.prototype.length = function () {
    return this._walk(null).length;
};

Points.prototype._walk = function (pos, opts) {
    var cur = [ 0, 0 ];
    var prev = [ 0, 0, 0 ];
    var len = 0;
    var fudge = 1.045;
    if (typeof pos === 'number') pos *= fudge;
    
    for (var i = 0; i < this._path.length; i++) {
        var p = this._path[i];
        if (p[0] === 'M') {
            cur[0] = p[1];
            cur[1] = p[2];
            if (pos === 0) {
                return { length: len, pos: cur };
            }
        }
        else if (p[0] === 'C') {
            prev[0] = cur[0];
            prev[1] = cur[1];
            prev[2] = len;
            
            var n = 100;
            for (var j = 0; j <= n; j++) {
                var t = j / n;
                var x = xof_C(p, t);
                var y = yof_C(p, t);
                len += dist(cur[0], cur[1], x, y);
                
                cur[0] = x;
                cur[1] = y;
                
                if (typeof pos === 'number' && len >= pos) {
                    var dv = (len - pos) / (len - prev[2]);
                    
                    var npos = [
                        cur[0] * (1 - dv) + prev[0] * dv,
                        cur[1] * (1 - dv) + prev[1] * dv
                    ];
                    return { length: len, pos: npos };
                }
                prev[0] = cur[0];
                prev[1] = cur[1];
                prev[2] = len;
            }
        }
        else if (p[0] === 'Q') {
            prev[0] = cur[0];
            prev[1] = cur[1];
            prev[2] = len;
            
            var n = 100;
            for (var j = 0; j <= n; j++) {
                var t = j / n;
                var x = xof_Q(p, t);
                var y = yof_Q(p, t);
                len += dist(cur[0], cur[1], x, y);
                
                cur[0] = x;
                cur[1] = y;
                
                if (typeof pos === 'number' && len >= pos) {
                    var dv = (len - pos) / (len - prev[2]);
                    
                    var npos = [
                        cur[0] * (1 - dv) + prev[0] * dv,
                        cur[1] * (1 - dv) + prev[1] * dv
                    ];
                    return { length: len, pos: npos };
                }
                prev[0] = cur[0];
                prev[1] = cur[1];
                prev[2] = len;
            }
        }
        else if (p[0] === 'L') {
            prev[0] = cur[0];
            prev[1] = cur[1];
            prev[2] = len;

            len   += dist(cur[0], cur[1], p[1], p[2]);
            cur[0] = p[1];
            cur[1] = p[2];

            if (typeof pos === 'number' && len >= pos) {
                var dv = (len - pos) / (len - prev[2]);
                var npos = [
                    cur[0] * (1 - dv) + prev[0] * dv,
                    cur[1] * (1 - dv) + prev[1] * dv
                ];
                return { length: len, pos: npos };
            }
            prev[0] = cur[0];
            prev[1] = cur[1];
            prev[2] = len;
        }
    }
    return { length: len / fudge, pos: cur };
    
    function xof_C (p, t) {
        return Math.pow((1-t), 3) * cur[0]
            + 3 * Math.pow((1-t), 2) * t * p[1]
            + 3 * (1-t) * Math.pow(t, 2) * p[3]
            + Math.pow(t, 3) * p[5]
        ;
    }
    function yof_C (p, t) {
        return Math.pow((1-t), 3) * cur[1]
            + 3 * Math.pow((1-t), 2) * t * p[2]
            + 3 * (1-t) * Math.pow(t, 2) * p[4]
            + Math.pow(t, 3) * p[6]
        ;
    }

    function xof_Q (p, t) {
        return Math.pow((1-t), 2) * cur[0]
            + 2 * (1-t) * t * p[1]
            + Math.pow(t, 2) * p[3]
        ;
    }
    function yof_Q (p, t) {
        return Math.pow((1-t), 2) * cur[1]
            + 2 * (1-t) * t * p[2]
            + Math.pow(t, 2) * p[4]
        ;
    }
};

function dist (ax, ay, bx, by) {
    var x = ax - bx;
    var y = ay - by;
    return Math.sqrt(x*x + y*y);
}

// Convert 'Z' segments to 'L' segments
function zToL(path){
    var ret = [];
    var startPoint = ['L',0,0];

    for(var i=0, len=path.length; i<len; i++){
        var pt = path[i];
        switch(pt[0]){
            case 'M':
                startPoint = ['L', pt[1], pt[2]];
                ret.push(pt);
                break;
            case 'Z':
                ret.push(startPoint);
                break;
            default: 
                ret.push(pt);
        }
    }
    return ret;
}

var geoPath = d3Geo.geoPath;
var registerConnector$2 = dataSet.registerConnector;


var geoPathGenerator = geoPath();

function GeoJSONConnector(data, options, dataView) {
  dataView.dataType = 'geo';
  var features = cloneDeep_1(data.features);

  // pre-process
  each(features, function (feature) {
    feature.name = feature.properties.name;
    feature.longitude = [];
    feature.latitude = [];
    var pathData = feature.pathData = geoPathGenerator(feature);
    var points = index$13(pathData);
    each(points._path, function (point) {
      feature.longitude.push(point[1]);
      feature.latitude.push(point[2]);
    });
    feature.centroid = geoPathGenerator.centroid(feature);
  });

  dataView.rows = features;
  // console.log(features)
  return data.features;
}

registerConnector$2('geo', GeoJSONConnector);
registerConnector$2('geojson', GeoJSONConnector);
registerConnector$2('GeoJSON', GeoJSONConnector);

var geojson = GeoJSONConnector;

function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

function meanX(children) {
  return children.reduce(meanXReduce, 0) / children.length;
}

function meanXReduce(x, c) {
  return x + c.x;
}

function maxY(children) {
  return 1 + children.reduce(maxYReduce, 0);
}

function maxYReduce(y, c) {
  return Math.max(y, c.y);
}

function leafLeft(node) {
  var children;
  while (children = node.children) node = children[0];
  return node;
}

function leafRight(node) {
  var children;
  while (children = node.children) node = children[children.length - 1];
  return node;
}

var cluster = function() {
  var separation = defaultSeparation,
      dx = 1,
      dy = 1,
      nodeSize = false;

  function cluster(root) {
    var previousNode,
        x = 0;

    // First walk, computing the initial x & y values.
    root.eachAfter(function(node) {
      var children = node.children;
      if (children) {
        node.x = meanX(children);
        node.y = maxY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    var left = leafLeft(root),
        right = leafRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    return root.eachAfter(nodeSize ? function(node) {
      node.x = (node.x - root.x) * dx;
      node.y = (root.y - node.y) * dy;
    } : function(node) {
      node.x = (node.x - x0) / (x1 - x0) * dx;
      node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
    });
  }

  cluster.separation = function(x) {
    return arguments.length ? (separation = x, cluster) : separation;
  };

  cluster.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? null : [dx, dy]);
  };

  cluster.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? [dx, dy] : null);
  };

  return cluster;
};

function count(node) {
  var sum = 0,
      children = node.children,
      i = children && children.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children[i].value;
  node.value = sum;
}

var node_count = function() {
  return this.eachAfter(count);
};

var node_each = function(callback) {
  var node = this, current, next = [node], children, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      callback(node), children = node.children;
      if (children) for (i = 0, n = children.length; i < n; ++i) {
        next.push(children[i]);
      }
    }
  } while (next.length);
  return this;
};

var node_eachBefore = function(callback) {
  var node = this, nodes = [node], children, i;
  while (node = nodes.pop()) {
    callback(node), children = node.children;
    if (children) for (i = children.length - 1; i >= 0; --i) {
      nodes.push(children[i]);
    }
  }
  return this;
};

var node_eachAfter = function(callback) {
  var node = this, nodes = [node], next = [], children, i, n;
  while (node = nodes.pop()) {
    next.push(node), children = node.children;
    if (children) for (i = 0, n = children.length; i < n; ++i) {
      nodes.push(children[i]);
    }
  }
  while (node = next.pop()) {
    callback(node);
  }
  return this;
};

var node_sum = function(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0,
        children = node.children,
        i = children && children.length;
    while (--i >= 0) sum += children[i].value;
    node.value = sum;
  });
};

var node_sort = function(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
};

var node_path = function(end) {
  var start = this,
      ancestor = leastCommonAncestor(start, end),
      nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
};

function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(),
      bNodes = b.ancestors(),
      c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}

var node_ancestors = function() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
};

var node_descendants = function() {
  var nodes = [];
  this.each(function(node) {
    nodes.push(node);
  });
  return nodes;
};

var node_leaves = function() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
};

var node_links = function() {
  var root = this, links = [];
  root.each(function(node) {
    if (node !== root) { // Don’t include the root’s parent, if any.
      links.push({source: node.parent, target: node});
    }
  });
  return links;
};

function hierarchy$3(data, children) {
  var root = new Node(data),
      valued = +data.value && (root.value = data.value),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;

  if (children == null) children = defaultChildren;

  while (node = nodes.pop()) {
    if (valued) node.value = +node.data.value;
    if ((childs = children(node.data)) && (n = childs.length)) {
      node.children = new Array(n);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}

function node_copy() {
  return hierarchy$3(this).eachBefore(copyData);
}

function defaultChildren(d) {
  return d.children;
}

function copyData(node) {
  node.data = node.data.data;
}

function computeHeight(node) {
  var height = 0;
  do node.height = height;
  while ((node = node.parent) && (node.height < ++height));
}

function Node(data) {
  this.data = data;
  this.depth =
  this.height = 0;
  this.parent = null;
}

Node.prototype = hierarchy$3.prototype = {
  constructor: Node,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy
};

var slice$1 = Array.prototype.slice;

function shuffle$3(array) {
  var m = array.length,
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

var enclose = function(circles) {
  var i = 0, n = (circles = shuffle$3(slice$1.call(circles))).length, B = [], p, e;

  while (i < n) {
    p = circles[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
};

function extendBasis(B, p) {
  var i, j;

  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (i = 0; i < B.length; ++i) {
    if (enclosesNot(p, B[i])
        && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (i = 0; i < B.length - 1; ++i) {
    for (j = i + 1; j < B.length; ++j) {
      if (enclosesNot(encloseBasis2(B[i], B[j]), p)
          && enclosesNot(encloseBasis2(B[i], p), B[j])
          && enclosesNot(encloseBasis2(B[j], p), B[i])
          && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error;
}

function enclosesNot(a, b) {
  var dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}

function enclosesWeak(a, b) {
  var dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function enclosesWeakAll(a, B) {
  for (var i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}

function encloseBasis(B) {
  switch (B.length) {
    case 1: return encloseBasis1(B[0]);
    case 2: return encloseBasis2(B[0], B[1]);
    case 3: return encloseBasis3(B[0], B[1], B[2]);
  }
}

function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}

function encloseBasis2(a, b) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
      l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + x21 / l * r21) / 2,
    y: (y1 + y2 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}

function encloseBasis3(a, b, c) {
  var x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x3 = c.x, y3 = c.y, r3 = c.r,
      a2 = x1 - x2,
      a3 = x1 - x3,
      b2 = y1 - y2,
      b3 = y1 - y3,
      c2 = r2 - r1,
      c3 = r3 - r1,
      d1 = x1 * x1 + y1 * y1 - r1 * r1,
      d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
      d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
      ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
      xb = (b3 * c2 - b2 * c3) / ab,
      ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
      yb = (a2 * c3 - a3 * c2) / ab,
      A = xb * xb + yb * yb - 1,
      B = 2 * (r1 + xa * xb + ya * yb),
      C = xa * xa + ya * ya - r1 * r1,
      r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r,
    y: y1 + ya + yb * r,
    r: r
  };
}

function place(a, b, c) {
  var ax = a.x,
      ay = a.y,
      da = b.r + c.r,
      db = a.r + c.r,
      dx = b.x - ax,
      dy = b.y - ay,
      dc = dx * dx + dy * dy;
  if (dc) {
    var x = 0.5 + ((db *= db) - (da *= da)) / (2 * dc),
        y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
    c.x = ax + x * dx + y * dy;
    c.y = ay + x * dy - y * dx;
  } else {
    c.x = ax + db;
    c.y = ay;
  }
}

function intersects(a, b) {
  var dx = b.x - a.x,
      dy = b.y - a.y,
      dr = a.r + b.r;
  return dr * dr - 1e-6 > dx * dx + dy * dy;
}

function score(node) {
  var a = node._,
      b = node.next._,
      ab = a.r + b.r,
      dx = (a.x * b.r + b.x * a.r) / ab,
      dy = (a.y * b.r + b.y * a.r) / ab;
  return dx * dx + dy * dy;
}

function Node$1(circle) {
  this._ = circle;
  this.next = null;
  this.previous = null;
}

function packEnclose(circles) {
  if (!(n = circles.length)) return 0;

  var a, b, c, n, aa, ca, i, j, k, sj, sk;

  // Place the first circle.
  a = circles[0], a.x = 0, a.y = 0;
  if (!(n > 1)) return a.r;

  // Place the second circle.
  b = circles[1], a.x = -b.r, b.x = a.r, b.y = 0;
  if (!(n > 2)) return a.r + b.r;

  // Place the third circle.
  place(b, a, c = circles[2]);

  // Initialize the front-chain using the first three circles a, b and c.
  a = new Node$1(a), b = new Node$1(b), c = new Node$1(c);
  a.next = c.previous = b;
  b.next = a.previous = c;
  c.next = b.previous = a;

  // Attempt to place each remaining circle…
  pack: for (i = 3; i < n; ++i) {
    place(a._, b._, c = circles[i]), c = new Node$1(c);

    // Find the closest intersecting circle on the front-chain, if any.
    // “Closeness” is determined by linear distance along the front-chain.
    // “Ahead” or “behind” is likewise determined by linear distance.
    j = b.next, k = a.previous, sj = b._.r, sk = a._.r;
    do {
      if (sj <= sk) {
        if (intersects(j._, c._)) {
          b = j, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sj += j._.r, j = j.next;
      } else {
        if (intersects(k._, c._)) {
          a = k, a.next = b, b.previous = a, --i;
          continue pack;
        }
        sk += k._.r, k = k.previous;
      }
    } while (j !== k.next);

    // Success! Insert the new circle c between a and b.
    c.previous = a, c.next = b, a.next = b.previous = b = c;

    // Compute the new closest circle pair to the centroid.
    aa = score(a);
    while ((c = c.next) !== b) {
      if ((ca = score(c)) < aa) {
        a = c, aa = ca;
      }
    }
    b = a.next;
  }

  // Compute the enclosing circle of the front chain.
  a = [b._], c = b; while ((c = c.next) !== b) a.push(c._); c = enclose(a);

  // Translate the circles to put the enclosing circle around the origin.
  for (i = 0; i < n; ++i) a = circles[i], a.x -= c.x, a.y -= c.y;

  return c.r;
}

var siblings = function(circles) {
  packEnclose(circles);
  return circles;
};

function optional(f) {
  return f == null ? null : required(f);
}

function required(f) {
  if (typeof f !== "function") throw new Error;
  return f;
}

function constantZero() {
  return 0;
}

var constant$5 = function(x) {
  return function() {
    return x;
  };
};

function defaultRadius(d) {
  return Math.sqrt(d.value);
}

var index$22 = function() {
  var radius = null,
      dx = 1,
      dy = 1,
      padding = constantZero;

  function pack(root) {
    root.x = dx / 2, root.y = dy / 2;
    if (radius) {
      root.eachBefore(radiusLeaf(radius))
          .eachAfter(packChildren(padding, 0.5))
          .eachBefore(translateChild(1));
    } else {
      root.eachBefore(radiusLeaf(defaultRadius))
          .eachAfter(packChildren(constantZero, 1))
          .eachAfter(packChildren(padding, root.r / Math.min(dx, dy)))
          .eachBefore(translateChild(Math.min(dx, dy) / (2 * root.r)));
    }
    return root;
  }

  pack.radius = function(x) {
    return arguments.length ? (radius = optional(x), pack) : radius;
  };

  pack.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], pack) : [dx, dy];
  };

  pack.padding = function(x) {
    return arguments.length ? (padding = typeof x === "function" ? x : constant$5(+x), pack) : padding;
  };

  return pack;
};

function radiusLeaf(radius) {
  return function(node) {
    if (!node.children) {
      node.r = Math.max(0, +radius(node) || 0);
    }
  };
}

function packChildren(padding, k) {
  return function(node) {
    if (children = node.children) {
      var children,
          i,
          n = children.length,
          r = padding(node) * k || 0,
          e;

      if (r) for (i = 0; i < n; ++i) children[i].r += r;
      e = packEnclose(children);
      if (r) for (i = 0; i < n; ++i) children[i].r -= r;
      node.r = e + r;
    }
  };
}

function translateChild(k) {
  return function(node) {
    var parent = node.parent;
    node.r *= k;
    if (parent) {
      node.x = parent.x + k * node.x;
      node.y = parent.y + k * node.y;
    }
  };
}

var roundNode = function(node) {
  node.x0 = Math.round(node.x0);
  node.y0 = Math.round(node.y0);
  node.x1 = Math.round(node.x1);
  node.y1 = Math.round(node.y1);
};

var treemapDice = function(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (x1 - x0) / parent.value;

  while (++i < n) {
    node = nodes[i], node.y0 = y0, node.y1 = y1;
    node.x0 = x0, node.x1 = x0 += node.value * k;
  }
};

var partition = function() {
  var dx = 1,
      dy = 1,
      padding = 0,
      round = false;

  function partition(root) {
    var n = root.height + 1;
    root.x0 =
    root.y0 = padding;
    root.x1 = dx;
    root.y1 = dy / n;
    root.eachBefore(positionNode(dy, n));
    if (round) root.eachBefore(roundNode);
    return root;
  }

  function positionNode(dy, n) {
    return function(node) {
      if (node.children) {
        treemapDice(node, node.x0, dy * (node.depth + 1) / n, node.x1, dy * (node.depth + 2) / n);
      }
      var x0 = node.x0,
          y0 = node.y0,
          x1 = node.x1 - padding,
          y1 = node.y1 - padding;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      node.x0 = x0;
      node.y0 = y0;
      node.x1 = x1;
      node.y1 = y1;
    };
  }

  partition.round = function(x) {
    return arguments.length ? (round = !!x, partition) : round;
  };

  partition.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], partition) : [dx, dy];
  };

  partition.padding = function(x) {
    return arguments.length ? (padding = +x, partition) : padding;
  };

  return partition;
};

var keyPrefix = "$";
var preroot = {depth: -1};
var ambiguous = {};

function defaultId(d) {
  return d.id;
}

function defaultParentId(d) {
  return d.parentId;
}

var stratify = function() {
  var id = defaultId,
      parentId = defaultParentId;

  function stratify(data) {
    var d,
        i,
        n = data.length,
        root,
        parent,
        node,
        nodes = new Array(n),
        nodeId,
        nodeKey,
        nodeByKey = {};

    for (i = 0; i < n; ++i) {
      d = data[i], node = nodes[i] = new Node(d);
      if ((nodeId = id(d, i, data)) != null && (nodeId += "")) {
        nodeKey = keyPrefix + (node.id = nodeId);
        nodeByKey[nodeKey] = nodeKey in nodeByKey ? ambiguous : node;
      }
    }

    for (i = 0; i < n; ++i) {
      node = nodes[i], nodeId = parentId(data[i], i, data);
      if (nodeId == null || !(nodeId += "")) {
        if (root) throw new Error("multiple roots");
        root = node;
      } else {
        parent = nodeByKey[keyPrefix + nodeId];
        if (!parent) throw new Error("missing: " + nodeId);
        if (parent === ambiguous) throw new Error("ambiguous: " + nodeId);
        if (parent.children) parent.children.push(node);
        else parent.children = [node];
        node.parent = parent;
      }
    }

    if (!root) throw new Error("no root");
    root.parent = preroot;
    root.eachBefore(function(node) { node.depth = node.parent.depth + 1; --n; }).eachBefore(computeHeight);
    root.parent = null;
    if (n > 0) throw new Error("cycle");

    return root;
  }

  stratify.id = function(x) {
    return arguments.length ? (id = required(x), stratify) : id;
  };

  stratify.parentId = function(x) {
    return arguments.length ? (parentId = required(x), stratify) : parentId;
  };

  return stratify;
};

function defaultSeparation$1(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

// function radialSeparation(a, b) {
//   return (a.parent === b.parent ? 1 : 2) / a.depth;
// }

// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function nextLeft(v) {
  var children = v.children;
  return children ? children[0] : v.t;
}

// This function works analogously to nextLeft.
function nextRight(v) {
  var children = v.children;
  return children ? children[children.length - 1] : v.t;
}

// Shifts the current subtree rooted at w+. This is done by increasing
// prelim(w+) and mod(w+) by shift.
function moveSubtree(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}

// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function executeShifts(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}

// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
// returns the specified (default) ancestor.
function nextAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}

function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null; // default ancestor
  this.a = this; // ancestor
  this.z = 0; // prelim
  this.m = 0; // mod
  this.c = 0; // change
  this.s = 0; // shift
  this.t = null; // thread
  this.i = i; // number
}

TreeNode.prototype = Object.create(Node.prototype);

function treeRoot(root) {
  var tree = new TreeNode(root, 0),
      node,
      nodes = [tree],
      child,
      children,
      i,
      n;

  while (node = nodes.pop()) {
    if (children = node._.children) {
      node.children = new Array(n = children.length);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new TreeNode(children[i], i));
        child.parent = node;
      }
    }
  }

  (tree.parent = new TreeNode(null, 0)).children = [tree];
  return tree;
}

// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
var tree = function() {
  var separation = defaultSeparation$1,
      dx = 1,
      dy = 1,
      nodeSize = null;

  function tree(root) {
    var t = treeRoot(root);

    // Compute the layout using Buchheim et al.’s algorithm.
    t.eachAfter(firstWalk), t.parent.m = -t.z;
    t.eachBefore(secondWalk);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) root.eachBefore(sizeNode);

    // If a fixed tree size is specified, scale x and y based on the extent.
    // Compute the left-most, right-most, and depth-most nodes for extents.
    else {
      var left = root,
          right = root,
          bottom = root;
      root.eachBefore(function(node) {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        if (node.depth > bottom.depth) bottom = node;
      });
      var s = left === right ? 1 : separation(left, right) / 2,
          tx = s - left.x,
          kx = dx / (right.x + s + tx),
          ky = dy / (bottom.depth || 1);
      root.eachBefore(function(node) {
        node.x = (node.x + tx) * kx;
        node.y = node.depth * ky;
      });
    }

    return root;
  }

  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
  // applied recursively to the children of v, as well as the function
  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
  // node v is placed to the midpoint of its outermost children.
  function firstWalk(v) {
    var children = v.children,
        siblings = v.parent.children,
        w = v.i ? siblings[v.i - 1] : null;
    if (children) {
      executeShifts(v);
      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v._, w._);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }

  // Computes all real x-coordinates by summing up the modifiers recursively.
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }

  // The core of the algorithm. Here, a new subtree is combined with the
  // previous subtrees. Threads are used to traverse the inside and outside
  // contours of the left and right subtree up to the highest common level. The
  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
  // superscript o means outside and i means inside, the subscript - means left
  // subtree and + means right subtree. For summing up the modifiers along the
  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
  // nodes of the inside contours conflict, we compute the left one of the
  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
  // Finally, we add a new thread (if necessary).
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = vip.parent.children[0],
          sip = vip.m,
          sop = vop.m,
          sim = vim.m,
          som = vom.m,
          shift;
      while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !nextRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !nextLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }

  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }

  tree.separation = function(x) {
    return arguments.length ? (separation = x, tree) : separation;
  };

  tree.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : (nodeSize ? null : [dx, dy]);
  };

  tree.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : (nodeSize ? [dx, dy] : null);
  };

  return tree;
};

var treemapSlice = function(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      node,
      i = -1,
      n = nodes.length,
      k = parent.value && (y1 - y0) / parent.value;

  while (++i < n) {
    node = nodes[i], node.x0 = x0, node.x1 = x1;
    node.y0 = y0, node.y1 = y0 += node.value * k;
  }
};

var phi = (1 + Math.sqrt(5)) / 2;

function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
  var rows = [],
      nodes = parent.children,
      row,
      nodeValue,
      i0 = 0,
      i1 = 0,
      n = nodes.length,
      dx, dy,
      value = parent.value,
      sumValue,
      minValue,
      maxValue,
      newRatio,
      minRatio,
      alpha,
      beta;

  while (i0 < n) {
    dx = x1 - x0, dy = y1 - y0;

    // Find the next non-empty node.
    do sumValue = nodes[i1++].value; while (!sumValue && i1 < n);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);

    // Keep adding nodes while the aspect ratio maintains or improves.
    for (; i1 < n; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) { sumValue -= nodeValue; break; }
      minRatio = newRatio;
    }

    // Position and record the row orientation.
    rows.push(row = {value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1)});
    if (row.dice) treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
    else treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
    value -= sumValue, i0 = i1;
  }

  return rows;
}

var squarify = ((function custom(ratio) {

  function squarify(parent, x0, y0, x1, y1) {
    squarifyRatio(ratio, parent, x0, y0, x1, y1);
  }

  squarify.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return squarify;
}))(phi);

var index$23 = function() {
  var tile = squarify,
      round = false,
      dx = 1,
      dy = 1,
      paddingStack = [0],
      paddingInner = constantZero,
      paddingTop = constantZero,
      paddingRight = constantZero,
      paddingBottom = constantZero,
      paddingLeft = constantZero;

  function treemap(root) {
    root.x0 =
    root.y0 = 0;
    root.x1 = dx;
    root.y1 = dy;
    root.eachBefore(positionNode);
    paddingStack = [0];
    if (round) root.eachBefore(roundNode);
    return root;
  }

  function positionNode(node) {
    var p = paddingStack[node.depth],
        x0 = node.x0 + p,
        y0 = node.y0 + p,
        x1 = node.x1 - p,
        y1 = node.y1 - p;
    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
    node.x0 = x0;
    node.y0 = y0;
    node.x1 = x1;
    node.y1 = y1;
    if (node.children) {
      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x0 += paddingLeft(node) - p;
      y0 += paddingTop(node) - p;
      x1 -= paddingRight(node) - p;
      y1 -= paddingBottom(node) - p;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      tile(node, x0, y0, x1, y1);
    }
  }

  treemap.round = function(x) {
    return arguments.length ? (round = !!x, treemap) : round;
  };

  treemap.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
  };

  treemap.tile = function(x) {
    return arguments.length ? (tile = required(x), treemap) : tile;
  };

  treemap.padding = function(x) {
    return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
  };

  treemap.paddingInner = function(x) {
    return arguments.length ? (paddingInner = typeof x === "function" ? x : constant$5(+x), treemap) : paddingInner;
  };

  treemap.paddingOuter = function(x) {
    return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
  };

  treemap.paddingTop = function(x) {
    return arguments.length ? (paddingTop = typeof x === "function" ? x : constant$5(+x), treemap) : paddingTop;
  };

  treemap.paddingRight = function(x) {
    return arguments.length ? (paddingRight = typeof x === "function" ? x : constant$5(+x), treemap) : paddingRight;
  };

  treemap.paddingBottom = function(x) {
    return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant$5(+x), treemap) : paddingBottom;
  };

  treemap.paddingLeft = function(x) {
    return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant$5(+x), treemap) : paddingLeft;
  };

  return treemap;
};

var binary = function(parent, x0, y0, x1, y1) {
  var nodes = parent.children,
      i, n = nodes.length,
      sum, sums = new Array(n + 1);

  for (sums[0] = sum = i = 0; i < n; ++i) {
    sums[i + 1] = sum += nodes[i].value;
  }

  partition(0, n, parent.value, x0, y0, x1, y1);

  function partition(i, j, value, x0, y0, x1, y1) {
    if (i >= j - 1) {
      var node = nodes[i];
      node.x0 = x0, node.y0 = y0;
      node.x1 = x1, node.y1 = y1;
      return;
    }

    var valueOffset = sums[i],
        valueTarget = (value / 2) + valueOffset,
        k = i + 1,
        hi = j - 1;

    while (k < hi) {
      var mid = k + hi >>> 1;
      if (sums[mid] < valueTarget) k = mid + 1;
      else hi = mid;
    }

    if ((valueTarget - sums[k - 1]) < (sums[k] - valueTarget) && i + 1 < k) --k;

    var valueLeft = sums[k] - valueOffset,
        valueRight = value - valueLeft;

    if ((x1 - x0) > (y1 - y0)) {
      var xk = (x0 * valueRight + x1 * valueLeft) / value;
      partition(i, k, valueLeft, x0, y0, xk, y1);
      partition(k, j, valueRight, xk, y0, x1, y1);
    } else {
      var yk = (y0 * valueRight + y1 * valueLeft) / value;
      partition(i, k, valueLeft, x0, y0, x1, yk);
      partition(k, j, valueRight, x0, yk, x1, y1);
    }
  }
};

var sliceDice = function(parent, x0, y0, x1, y1) {
  (parent.depth & 1 ? treemapSlice : treemapDice)(parent, x0, y0, x1, y1);
};

var resquarify = ((function custom(ratio) {

  function resquarify(parent, x0, y0, x1, y1) {
    if ((rows = parent._squarify) && (rows.ratio === ratio)) {
      var rows,
          row,
          nodes,
          i,
          j = -1,
          n,
          m = rows.length,
          value = parent.value;

      while (++j < m) {
        row = rows[j], nodes = row.children;
        for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
        if (row.dice) treemapDice(row, x0, y0, x1, y0 += (y1 - y0) * row.value / value);
        else treemapSlice(row, x0, y0, x0 += (x1 - x0) * row.value / value, y1);
        value -= row.value;
      }
    } else {
      parent._squarify = rows = squarifyRatio(ratio, parent, x0, y0, x1, y1);
      rows.ratio = ratio;
    }
  }

  resquarify.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };

  return resquarify;
}))(phi);



var index$21 = Object.freeze({
	cluster: cluster,
	hierarchy: hierarchy$3,
	pack: index$22,
	packSiblings: siblings,
	packEnclose: enclose,
	partition: partition,
	stratify: stratify,
	tree: tree,
	treemap: index$23,
	treemapBinary: binary,
	treemapDice: treemapDice,
	treemapSlice: treemapSlice,
	treemapSliceDice: sliceDice,
	treemapSquarify: squarify,
	treemapResquarify: resquarify
});

var d3Hierarchy = ( index$21 && undefined ) || index$21;

var hierarchy$2 = d3Hierarchy.hierarchy;
var registerConnector$3 = dataSet.registerConnector;

/*
 * options: {
 *   children(d) { // optional
 *     return d.children
 *   },
 * }
 */

function connector(data, options, dataView) {
  dataView.dataType = 'hierarchy';
  var children = options && options.children ? options.children : null;

  dataView.rows = dataView.root = hierarchy$2(data, children);
  return data;
}

registerConnector$3('hierarchy', connector);
registerConnector$3('tree', connector);

var identity$6 = function(x) {
  return x;
};

var transform$3 = function(transform) {
  if (transform == null) return identity$6;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2, n = input.length, output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
};

var bbox = function(topology) {
  var t = transform$3(topology.transform), key,
      x0 = Infinity, y0 = x0, x1 = -x0, y1 = -x0;

  function bboxPoint(p) {
    p = t(p);
    if (p[0] < x0) x0 = p[0];
    if (p[0] > x1) x1 = p[0];
    if (p[1] < y0) y0 = p[1];
    if (p[1] > y1) y1 = p[1];
  }

  function bboxGeometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(bboxGeometry); break;
      case "Point": bboxPoint(o.coordinates); break;
      case "MultiPoint": o.coordinates.forEach(bboxPoint); break;
    }
  }

  topology.arcs.forEach(function(arc) {
    var i = -1, n = arc.length, p;
    while (++i < n) {
      p = t(arc[i], i);
      if (p[0] < x0) x0 = p[0];
      if (p[0] > x1) x1 = p[0];
      if (p[1] < y0) y0 = p[1];
      if (p[1] > y1) y1 = p[1];
    }
  });

  for (key in topology.objects) {
    bboxGeometry(topology.objects[key]);
  }

  return [x0, y0, x1, y1];
};

var reverse = function(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
};

var feature$1 = function(topology, o) {
  return o.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature$2(topology, o); })}
      : feature$2(topology, o);
};

function feature$2(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object$2(topology, o);
  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
}

function object$2(topology, o) {
  var transformPoint = transform$3(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();
    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }
    if (i < 0) reverse(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];
    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type, coordinates;
    switch (type) {
      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
      case "Point": coordinates = point(o.coordinates); break;
      case "MultiPoint": coordinates = o.coordinates.map(point); break;
      case "LineString": coordinates = line(o.arcs); break;
      case "MultiLineString": coordinates = o.arcs.map(line); break;
      case "Polygon": coordinates = polygon(o.arcs); break;
      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
      default: return null;
    }
    return {type: type, coordinates: coordinates};
  }

  return geometry(o);
}

var stitch$1 = function(topology, arcs) {
  var stitchedArcs = {},
      fragmentByStart = {},
      fragmentByEnd = {},
      fragments = [],
      emptyIndex = -1;

  // Stitch empty arcs first, since they may be subsumed by other arcs.
  arcs.forEach(function(i, j) {
    var arc = topology.arcs[i < 0 ? ~i : i], t;
    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
    }
  });

  arcs.forEach(function(i) {
    var e = ends(i),
        start = e[0],
        end = e[1],
        f, g;

    if (f = fragmentByEnd[start]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;
      if (g = fragmentByStart[end]) {
        delete fragmentByStart[g.start];
        var fg = g === f ? f : f.concat(g);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start;
      if (g = fragmentByEnd[start]) {
        delete fragmentByEnd[g.end];
        var gf = g === f ? f : g.concat(f);
        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
    }
  });

  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
    else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p0] : [p0, p1];
  }

  function flush(fragmentByEnd, fragmentByStart) {
    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete fragmentByStart[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
      fragments.push(f);
    }
  }

  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

  return fragments;
};

var mesh = function(topology) {
  return object$2(topology, meshArcs.apply(this, arguments));
};

function meshArcs(topology, object, filter) {
  var arcs, i, n;
  if (arguments.length > 1) arcs = extractArcs(topology, object, filter);
  else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
  return {type: "MultiLineString", arcs: stitch$1(topology, arcs)};
}

function extractArcs(topology, object, filter) {
  var arcs = [],
      geomsByArc = [],
      geom;

  function extract0(i) {
    var j = i < 0 ? ~i : i;
    (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
  }

  function extract1(arcs) {
    arcs.forEach(extract0);
  }

  function extract2(arcs) {
    arcs.forEach(extract1);
  }

  function extract3(arcs) {
    arcs.forEach(extract2);
  }

  function geometry(o) {
    switch (geom = o, o.type) {
      case "GeometryCollection": o.geometries.forEach(geometry); break;
      case "LineString": extract1(o.arcs); break;
      case "MultiLineString": case "Polygon": extract2(o.arcs); break;
      case "MultiPolygon": extract3(o.arcs); break;
    }
  }

  geometry(object);

  geomsByArc.forEach(filter == null
      ? function(geoms) { arcs.push(geoms[0].i); }
      : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });

  return arcs;
}

function planarRingArea(ring) {
  var i = -1, n = ring.length, a, b = ring[n - 1], area = 0;
  while (++i < n) a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];
  return Math.abs(area); // Note: doubled area!
}

var merge$1 = function(topology) {
  return object$2(topology, mergeArcs.apply(this, arguments));
};

function mergeArcs(topology, objects) {
  var polygonsByArc = {},
      polygons = [],
      groups = [];

  objects.forEach(geometry);

  function geometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(geometry); break;
      case "Polygon": extract(o.arcs); break;
      case "MultiPolygon": o.arcs.forEach(extract); break;
    }
  }

  function extract(polygon) {
    polygon.forEach(function(ring) {
      ring.forEach(function(arc) {
        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
      });
    });
    polygons.push(polygon);
  }

  function area(ring) {
    return planarRingArea(object$2(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]);
  }

  polygons.forEach(function(polygon) {
    if (!polygon._) {
      var group = [],
          neighbors = [polygon];
      polygon._ = 1;
      groups.push(group);
      while (polygon = neighbors.pop()) {
        group.push(polygon);
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
              if (!polygon._) {
                polygon._ = 1;
                neighbors.push(polygon);
              }
            });
          });
        });
      }
    }
  });

  polygons.forEach(function(polygon) {
    delete polygon._;
  });

  return {
    type: "MultiPolygon",
    arcs: groups.map(function(polygons) {
      var arcs = [], n;

      // Extract the exterior (unique) arcs.
      polygons.forEach(function(polygon) {
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
              arcs.push(arc);
            }
          });
        });
      });

      // Stitch the arcs into one or more rings.
      arcs = stitch$1(topology, arcs);

      // If more than one ring is returned,
      // at most one of these rings can be the exterior;
      // choose the one with the greatest absolute area.
      if ((n = arcs.length) > 1) {
        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
          if ((ki = area(arcs[i])) > k) {
            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
          }
        }
      }

      return arcs;
    })
  };
}

var bisect$2 = function(a, x) {
  var lo = 0, hi = a.length;
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

var neighbors = function(objects) {
  var indexesByArc = {}, // arc index -> array of object indexes
      neighbors = objects.map(function() { return []; });

  function line(arcs, i) {
    arcs.forEach(function(a) {
      if (a < 0) a = ~a;
      var o = indexesByArc[a];
      if (o) o.push(i);
      else indexesByArc[a] = [i];
    });
  }

  function polygon(arcs, i) {
    arcs.forEach(function(arc) { line(arc, i); });
  }

  function geometry(o, i) {
    if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
    else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
  }

  var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
  };

  objects.forEach(geometry);

  for (var i in indexesByArc) {
    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
      for (var k = j + 1; k < m; ++k) {
        var ij = indexes[j], ik = indexes[k], n;
        if ((n = neighbors[ij])[i = bisect$2(n, ik)] !== ik) n.splice(i, 0, ik);
        if ((n = neighbors[ik])[i = bisect$2(n, ij)] !== ij) n.splice(i, 0, ij);
      }
    }
  }

  return neighbors;
};

var untransform = function(transform) {
  if (transform == null) return identity$6;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n),
        x1 = Math.round((input[0] - dx) / kx),
        y1 = Math.round((input[1] - dy) / ky);
    output[0] = x1 - x0, x0 = x1;
    output[1] = y1 - y0, y0 = y1;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
};

var quantize$2 = function(topology, transform) {
  if (topology.transform) throw new Error("already quantized");

  if (!transform || !transform.scale) {
    if (!((n = Math.floor(transform)) >= 2)) throw new Error("n must be ≥2");
    box = topology.bbox || bbox(topology);
    var x0 = box[0], y0 = box[1], x1 = box[2], y1 = box[3], n;
    transform = {scale: [x1 - x0 ? (x1 - x0) / (n - 1) : 1, y1 - y0 ? (y1 - y0) / (n - 1) : 1], translate: [x0, y0]};
  } else {
    box = topology.bbox;
  }

  var t = untransform(transform), box, key, inputs = topology.objects, outputs = {};

  function quantizePoint(point) {
    return t(point);
  }

  function quantizeGeometry(input) {
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(quantizeGeometry)}; break;
      case "Point": output = {type: "Point", coordinates: quantizePoint(input.coordinates)}; break;
      case "MultiPoint": output = {type: "MultiPoint", coordinates: input.coordinates.map(quantizePoint)}; break;
      default: return input;
    }
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function quantizeArc(input) {
    var i = 0, j = 1, n = input.length, p, output = new Array(n); // pessimistic
    output[0] = t(input[0], 0);
    while (++i < n) if ((p = t(input[i], i))[0] || p[1]) output[j++] = p; // non-coincident points
    if (j === 1) output[j++] = [0, 0]; // an arc must have at least two points
    output.length = j;
    return output;
  }

  for (key in inputs) outputs[key] = quantizeGeometry(inputs[key]);

  return {
    type: "Topology",
    bbox: box,
    transform: transform,
    objects: outputs,
    arcs: topology.arcs.map(quantizeArc)
  };
};



var index$24 = Object.freeze({
	bbox: bbox,
	feature: feature$1,
	mesh: mesh,
	meshArcs: meshArcs,
	merge: merge$1,
	mergeArcs: mergeArcs,
	neighbors: neighbors,
	quantize: quantize$2,
	transform: transform$3,
	untransform: untransform
});

var require$$0$6 = ( index$24 && undefined ) || index$24;

var feature = require$$0$6.feature;
var registerConnector$4 = dataSet.registerConnector;


function TopoJSONConnector(data, options, dataView) {
  var object = options.object;
  if (!object) {
    throw new TypeError('Invalid options');
  }
  var geoData = feature(data, data.objects[object]);
  return geojson(geoData, options, dataView);
}

registerConnector$4('topojson', TopoJSONConnector);
registerConnector$4('TopoJSON', TopoJSONConnector);

var registerTransform = dataSet.registerTransform;


registerTransform('default', function (dataView) {
  return dataView;
});

var registerTransform$1 = dataSet.registerTransform;

/*
 * options: {
 *   type: 'filter',
 *   callback,
 * }
 */

function defaultCallback(row) {
  return !!row;
}

registerTransform$1('filter', function (dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  dataView.rows = filter_1(dataView.rows, options.callback || defaultCallback);
});

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

var _arrayIncludesWith = arrayIncludesWith;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = _arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = _arrayMap(values, _baseUnary(iteratee));
  }
  if (comparator) {
    includes = _arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE$1) {
    includes = _cacheHas;
    isCommon = false;
    values = new _SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

var _baseDifference = baseDifference;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike_1(value) && isArrayLike_1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject;

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `_.pullAll`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.without, _.xor
 * @example
 *
 * _.difference([2, 1], [2, 3]);
 * // => [1]
 */
var difference = _baseRest(function(array, values) {
  return isArrayLikeObject_1(array)
    ? _baseDifference(array, _baseFlatten(values, 1, isArrayLikeObject_1, true))
    : [];
});

var difference_1 = difference;

var registerTransform$2 = dataSet.registerTransform;


var DEFAULT_OPTIONS = {
  fields: [],
  key: 'key',
  retains: [],
  value: 'value'
};

registerTransform$2('fold', function (dataView, options) {
  var columns = dataView.getColumnNames();
  options = assign_1({}, DEFAULT_OPTIONS, options);
  var fields = options.fields;
  if (!isArray_1(fields)) {
    throw new TypeError('Invalid option `fields`: expected an array.');
  }
  if (fields.length === 0) {
    fields = columns;
  }
  var key = options.key;
  var value = options.value;
  var retains = options.retains;
  if (retains.length === 0) {
    retains = difference_1(columns, fields);
  }
  var resultRows = [];
  each(dataView.rows, function (row) {
    each(fields, function (field) {
      var resultRow = pick_1(row, retains);
      resultRow[key] = field;
      resultRow[value] = row[field];
      resultRows.push(resultRow);
    });
  });
  dataView.rows = resultRows;
});

var registerTransform$3 = dataSet.registerTransform;

/*
 * options: {
 *   type: 'map',
 *   callback,
 * }
 */

function defaultCallback$1(row) {
  return row;
}

registerTransform$3('map', function (dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  dataView.rows = map_1(dataView.rows, options.callback || defaultCallback$1);
});

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop$3() {
  // No operation performed.
}

var noop_1 = noop$3;

/** Used as references for various `Number` constants. */
var INFINITY$3 = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(_Set && (1 / _setToArray(new _Set([,-0]))[1]) == INFINITY$3) ? noop_1 : function(values) {
  return new _Set(values);
};

var _createSet = createSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$2 = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = _arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = _arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE$2) {
    var set = iteratee ? null : _createSet(array);
    if (set) {
      return _setToArray(set);
    }
    isCommon = false;
    includes = _cacheHas;
    seen = new _SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

var _baseUniq = baseUniq;

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = _baseRest(function(arrays) {
  return _baseUniq(_baseFlatten(arrays, 1, isArrayLikeObject_1, true));
});

var union_1 = union;

/**
 * A specialized version of `baseAggregator` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function arrayAggregator(array, setter, iteratee, accumulator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    var value = array[index];
    setter(accumulator, value, iteratee(value), array);
  }
  return accumulator;
}

var _arrayAggregator = arrayAggregator;

/**
 * Aggregates elements of `collection` on `accumulator` with keys transformed
 * by `iteratee` and values set by `setter`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} setter The function to set `accumulator` values.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {Object} accumulator The initial aggregated object.
 * @returns {Function} Returns `accumulator`.
 */
function baseAggregator(collection, setter, iteratee, accumulator) {
  _baseEach(collection, function(value, key, collection) {
    setter(accumulator, value, iteratee(value), collection);
  });
  return accumulator;
}

var _baseAggregator = baseAggregator;

/**
 * Creates a function like `_.groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return function(collection, iteratee) {
    var func = isArray_1(collection) ? _arrayAggregator : _baseAggregator,
        accumulator = initializer ? initializer() : {};

    return func(collection, setter, _baseIteratee(iteratee, 2), accumulator);
  };
}

var _createAggregator = createAggregator;

/** Used for built-in method references. */
var objectProto$16 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$13 = objectProto$16.hasOwnProperty;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * _.groupBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * // The `_.property` iteratee shorthand.
 * _.groupBy(['one', 'two', 'three'], 'length');
 * // => { '3': ['one', 'two'], '5': ['three'] }
 */
var groupBy = _createAggregator(function(result, value, key) {
  if (hasOwnProperty$13.call(result, key)) {
    result[key].push(value);
  } else {
    _baseAssignValue(result, key, [value]);
  }
});

var groupBy_1 = groupBy;

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

var _baseSortBy = baseSortBy;

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol_1(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol_1(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

var _compareAscending = compareAscending;

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = _compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

var _compareMultiple = compareMultiple;

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = _arrayMap(iteratees.length ? iteratees : [identity_1], _baseUnary(_baseIteratee));

  var result = _baseMap(collection, function(value, key, collection) {
    var criteria = _arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return _baseSortBy(result, function(object, other) {
    return _compareMultiple(object, other, orders);
  });
}

var _baseOrderBy = baseOrderBy;

/**
 * This method is like `_.sortBy` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @param {string[]} [orders] The sort orders of `iteratees`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * // Sort by `user` in ascending order and by `age` in descending order.
 * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
function orderBy(collection, iteratees, orders, guard) {
  if (collection == null) {
    return [];
  }
  if (!isArray_1(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees];
  }
  orders = guard ? undefined : orders;
  if (!isArray_1(orders)) {
    orders = orders == null ? [] : [orders];
  }
  return _baseOrderBy(collection, iteratees, orders);
}

var orderBy_1 = orderBy;

var partition$1 = function (rows, group_by) {
  var order_by = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var newRows = orderBy_1(rows, order_by);
  var groups = groupBy_1(newRows, function (row) {
    return map_1(group_by, function (col) {
      return row[col];
    }).join('-');
  });
  return groups;
};

var sum$6 = index$10.sum;
var registerTransform$4 = dataSet.registerTransform;


var DEFAULT_OPTIONS$1 = {
  // field: 'y', // required
  // dimension: 'x', // required
  groupBy: [], // optional
  as: '_percent'
};

function transform$4(dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = assign_1({}, DEFAULT_OPTIONS$1, options);
  var field = options.field;
  var dimension = options.dimension;
  var groupBy = options.groupBy;
  var as = options.as;
  if (!field || !dimension) {
    throw new TypeError('Invalid options');
  }
  var rows = dataView.rows;
  var result = [];
  var groups = partition$1(rows, groupBy);
  forIn_1(groups, function (group) {
    var totalSum = sum$6(map_1(group, function (row) {
      return row[field];
    }));
    var innerGroups = partition$1(group, [dimension]);
    forIn_1(innerGroups, function (innerGroup) {
      var innerSum = sum$6(map_1(innerGroup, function (row) {
        return row[field];
      }));
      var resultRow = pick_1(innerGroup[0], union_1(groupBy, [dimension]));
      resultRow[as] = innerSum / totalSum;
      result.push(resultRow);
    });
  });
  dataView.rows = result;
}

registerTransform$4('percent', transform$4);

var registerTransform$5 = dataSet.registerTransform;

/*
 * options: {
 *   type: 'pick',
 *   fields: [],
 * }
 */

registerTransform$5('pick', function (dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var columns = options.fields || dataView.getColumnNames();
  dataView.rows = map_1(dataView.rows, function (row) {
    return pick_1(row, columns);
  });
});

var registerTransform$6 = dataSet.registerTransform;


var DEFAULT_OPTIONS$2 = {
  // field: 'y', // required
  // dimension: 'x', // required
  groupBy: [], // optional
  as: '_proportion'
};

function transform$5(dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = assign_1({}, DEFAULT_OPTIONS$2, options);
  var field = options.field;
  var dimension = options.dimension;
  var groupBy = options.groupBy;
  var as = options.as;
  if (!field || !dimension) {
    throw new TypeError('Invalid options');
  }
  var rows = dataView.rows;
  var result = [];
  var groups = partition$1(rows, groupBy);
  forIn_1(groups, function (group) {
    var totalCount = group.length;
    var innerGroups = partition$1(group, [dimension]);
    forIn_1(innerGroups, function (innerGroup) {
      var innerCount = innerGroup.length;
      var resultRow = pick_1(innerGroup[0], union_1(groupBy, [dimension]));
      resultRow[as] = innerCount / totalCount;
      result.push(resultRow);
    });
  });
  dataView.rows = result;
}

registerTransform$6('proportion', transform$5);

/** Used for built-in method references. */
var arrayProto$1 = Array.prototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeReverse = arrayProto$1.reverse;

/**
 * Reverses `array` so that the first element becomes the last, the second
 * element becomes the second to last, and so on.
 *
 * **Note:** This method mutates `array` and is based on
 * [`Array#reverse`](https://mdn.io/Array/reverse).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.reverse(array);
 * // => [3, 2, 1]
 *
 * console.log(array);
 * // => [3, 2, 1]
 */
function reverse$1(array) {
  return array == null ? array : nativeReverse.call(array);
}

var reverse_1$2 = reverse$1;

var registerTransform$7 = dataSet.registerTransform;

/*
 * options: {
 *   type: 'reverse',
 * }
 */

registerTransform$7('reverse', function (dataView) {
  dataView.rows = reverse_1$2(dataView.rows);
});

var registerTransform$8 = dataSet.registerTransform;

/*
 * options: {
 *   type: 'sort',
 *   callback,
 * }
 */

registerTransform$8('sort', function (dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var columnName = dataView.getColumnName(0);
  dataView.rows.sort(options.callback || function (a, b) {
    return a[columnName] - b[columnName];
  });
});

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, [function(o) { return o.user; }]);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 */
var sortBy = _baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && _isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && _isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return _baseOrderBy(collection, _baseFlatten(iteratees, 1), []);
});

var sortBy_1$2 = sortBy;

var registerTransform$9 = dataSet.registerTransform;

/*
 * options: {
 *   type: 'sort-by',
 *   fields: [],
 *   order: 'ASC' // 'DESC'
 * }
 */

var VALID_ORDERS = ['ASC', 'DESC'];

function transform$6(dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  dataView.rows = sortBy_1$2(dataView.rows, options.fields || [dataView.getColumnName(0)]);
  var order = options.order;
  if (order && indexOf_1(VALID_ORDERS, order) === -1) {
    console.warn('Invalid order');
  } else if (order === 'DESC') {
    dataView.rows = reverse_1$2(dataView.rows);
  }
}
registerTransform$9('sort-by', transform$6);
registerTransform$9('sortBy', transform$6);

var registerTransform$10 = dataSet.registerTransform;

/*
 * options: {
 *   type: 'subset',
 *   startRowIndex: 0,
 *   endRowIndex: 1,
 *   fields: [],
 * }
 */

registerTransform$10('subset', function (dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var startIndex = options.startRowIndex || 0;
  var endIndex = options.endRowIndex || dataView.rows.length - 1;
  var columns = options.fields || dataView.getColumnNames();
  dataView.rows = dataView.getSubset(startIndex, endIndex, columns);
});

var registerTransform$11 = dataSet.registerTransform;


var DEFAULT_OPTIONS$3 = {
  groupBy: [],
  orderBy: []
};

function arrayDifference(arr1, arr2) {
  // arrayDifference([1, 1, 1, 2], [1, 2]) => [1, 1]
  var shadow = map_1(arr1, function (item) {
    return item;
  }); // shadow copy
  each(arr2, function (item) {
    var index = indexOf_1(shadow, item);
    if (index > -1) {
      shadow.splice(index, 1);
    }
  });
  return shadow;
}

function transform$7(dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = assign_1({}, DEFAULT_OPTIONS$3, options);
  var rows = dataView.rows;
  var groupBy = options.groupBy;
  var orderBy = options.orderBy;
  var groups = partition$1(rows, groupBy, orderBy);
  var maxLength = 0;
  var referenceGroup = [];
  each(groups, function (group) {
    if (group.length > maxLength) {
      maxLength = group.length;
      referenceGroup = group;
    }
  });
  var referenceOrderByKeys = [];
  var referenceRowByOrderByKey = {};
  each(referenceGroup, function (row) {
    var key = map_1(orderBy, function (col) {
      return row[col];
    }).join('-');
    referenceOrderByKeys.push(key);
    referenceRowByOrderByKey[key] = row;
  });
  each(groups, function (group) {
    if (group !== referenceGroup && group.length < maxLength) {
      var first = group[0];
      // missing orderBy keys
      var orderByKeys = [];
      each(group, function (row) {
        orderByKeys.push(map_1(orderBy, function (col) {
          return row[col];
        }).join('-'));
      });
      var missingOrderByKeys = arrayDifference(referenceOrderByKeys, orderByKeys);
      some_1(missingOrderByKeys, function (key, i) {
        if (i >= maxLength - group.length) {
          // group length overflow
          return true;
        }
        var referenceRow = referenceRowByOrderByKey[key];
        var row = {};
        each(groupBy, function (col) {
          row[col] = first[col];
        });
        each(orderBy, function (col) {
          row[col] = referenceRow[col];
        });
        rows.push(row);
        return false;
      });
    }
  });
}

registerTransform$11('fill-rows', transform$7);
registerTransform$11('fillRows', transform$7);

/** Used for built-in method references. */
var objectProto$17 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$14 = objectProto$17.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty$14.call(object, key);
}

var _baseHas = baseHas;

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && _hasPath(object, path, _baseHas);
}

var has_1 = has;

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

var isNil_1 = isNil;

var registerTransform$12 = dataSet.registerTransform;


var DEFAULT_OPTIONS$4 = {
  // field: '', // required
  // method: 'value', // required
  // value: 10, // required when method === 'value'
  groupBy: []
};

function notNilValues(values) {
  return filter_1(values, function (value) {
    return !isNil_1(value);
  });
}

var STATISTICS_METHODS = ['mean', 'median', 'max', 'min'];
var imputations = {};
each(STATISTICS_METHODS, function (method) {
  imputations[method] = function (values) {
    return index$10[method](values);
  };
});
imputations.value = function (values, value) {
  return value;
};

function transform$8(dataView) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var rows = dataView.rows;
  options = assign_1({}, DEFAULT_OPTIONS$4, options);
  var field = options.field;
  var method = options.method;
  var groupBy = options.groupBy;
  if (!field || !method || method === 'value' && !has_1(options, 'value')) {
    throw new TypeError('Invalid options');
  }
  var column = notNilValues(dataView.getColumn(field));
  var groups = partition$1(rows, groupBy);
  each(groups, function (group) {
    var fieldValues = notNilValues(map_1(group, function (row) {
      return row[field];
    }));
    if (fieldValues.length === 0) {
      fieldValues = column;
    }
    each(group, function (row) {
      if (isNil_1(row[field])) {
        row[field] = imputations[method](fieldValues, options.value);
      }
    });
  });
}

registerTransform$12('impute', transform$8);

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? _baseUniq(array) : [];
}

var uniq_1 = uniq;

var registerTransform$13 = dataSet.registerTransform;


var DEFAULT_OPTIONS$5 = {
  as: [],
  fields: [],
  groupBy: [],
  operations: []
};
var DEFAULT_OPERATION = 'count';

var aggregates = {
  count: function (data) {
    return data.length;
  },
  distinct: function (data, field) {
    var values = uniq_1(map_1(data, function (row) {
      return row[field];
    }));
    return values.length;
  }
};
var STATISTICS_METHODS$1 = ['max', 'mean', // alias: average
'median', 'min', 'mode', 'product', 'standardDeviation', 'sum', 'sumSimple', 'variance'];
each(STATISTICS_METHODS$1, function (method) {
  aggregates[method] = function (data, field) {
    var values = map_1(data, function (row) {
      return row[field];
    });
    return index$10[method](values);
  };
});
aggregates.average = aggregates.mean;

function transform$9(dataView, options) {
  options = assign_1({}, DEFAULT_OPTIONS$5, options);
  var rows = dataView.rows;
  var dims = options.groupBy;
  var fields = options.fields;
  var outputNames = options.as || [];
  var operations = options.operations;
  if (!isArray_1(operations) || !operations.length) {
    operations = [DEFAULT_OPERATION];
    outputNames = operations;
  }
  var groups = partition$1(rows, dims);
  var results = [];
  forIn_1(groups, function (group) {
    var result = pick_1(group[0], dims);
    each(operations, function (operation, i) {
      var outputName = outputNames[i];
      var field = fields[i];
      result[outputName] = aggregates[operation](group, field);
    });
    results.push(result);
  });
  dataView.rows = results;
}

registerTransform$13('aggregate', transform$9);
registerTransform$13('summary', transform$9);

var aggregate = {
  VALID_AGGREGATES: keys_1(aggregates)
};

var thirdPi$1 = Math.PI / 3;
var angles$1 = [0, thirdPi$1, 2 * thirdPi$1, 3 * thirdPi$1, 4 * thirdPi$1, 5 * thirdPi$1];

function pointX(d) {
  return d[0];
}

function pointY(d) {
  return d[1];
}

var hexbin$1 = function() {
  var x0 = 0,
      y0 = 0,
      x1 = 1,
      y1 = 1,
      x = pointX,
      y = pointY,
      r,
      dx,
      dy;

  function hexbin(points) {
    var binsById = {}, bins = [], i, n = points.length;

    for (i = 0; i < n; ++i) {
      if (isNaN(px = +x.call(null, point = points[i], i, points))
          || isNaN(py = +y.call(null, point, i, points))) continue;

      var point,
          px,
          py,
          pj = Math.round(py = py / dy),
          pi = Math.round(px = px / dx - (pj & 1) / 2),
          py1 = py - pj;

      if (Math.abs(py1) * 3 > 1) {
        var px1 = px - pi,
            pi2 = pi + (px < pi ? -1 : 1) / 2,
            pj2 = pj + (py < pj ? -1 : 1),
            px2 = px - pi2,
            py2 = py - pj2;
        if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) pi = pi2 + (pj & 1 ? 1 : -1) / 2, pj = pj2;
      }

      var id = pi + "-" + pj, bin = binsById[id];
      if (bin) bin.push(point);
      else {
        bins.push(bin = binsById[id] = [point]);
        bin.x = (pi + (pj & 1) / 2) * dx;
        bin.y = pj * dy;
      }
    }

    return bins;
  }

  function hexagon(radius) {
    var x0 = 0, y0 = 0;
    return angles$1.map(function(angle) {
      var x1 = Math.sin(angle) * radius,
          y1 = -Math.cos(angle) * radius,
          dx = x1 - x0,
          dy = y1 - y0;
      x0 = x1, y0 = y1;
      return [dx, dy];
    });
  }

  hexbin.hexagon = function(radius) {
    return "m" + hexagon(radius == null ? r : +radius).join("l") + "z";
  };

  hexbin.centers = function() {
    var centers = [],
        j = Math.round(y0 / dy),
        i = Math.round(x0 / dx);
    for (var y = j * dy; y < y1 + r; y += dy, ++j) {
      for (var x = i * dx + (j & 1) * dx / 2; x < x1 + dx / 2; x += dx) {
        centers.push([x, y]);
      }
    }
    return centers;
  };

  hexbin.mesh = function() {
    var fragment = hexagon(r).slice(0, 4).join("l");
    return hexbin.centers().map(function(p) { return "M" + p + "m" + fragment; }).join("");
  };

  hexbin.x = function(_) {
    return arguments.length ? (x = _, hexbin) : x;
  };

  hexbin.y = function(_) {
    return arguments.length ? (y = _, hexbin) : y;
  };

  hexbin.radius = function(_) {
    return arguments.length ? (r = +_, dx = r * 2 * Math.sin(thirdPi$1), dy = r * 1.5, hexbin) : r;
  };

  hexbin.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], hexbin) : [x1 - x0, y1 - y0];
  };

  hexbin.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], hexbin) : [[x0, y0], [x1, y1]];
  };

  return hexbin.radius(1);
};



var index$25 = Object.freeze({
	hexbin: hexbin$1
});

var require$$0$7 = ( index$25 && undefined ) || index$25;

var hexbin = require$$0$7.hexbin;
var registerTransform$14 = dataSet.registerTransform;


var DEFAULT_OPTIONS$6 = {
  as: ['x', 'y']
  // fields: ['field0', 'field1'], // required
  // radius: radius,
};

var thirdPi = Math.PI / 3;
var angles = [0, thirdPi, 2 * thirdPi, 3 * thirdPi, 4 * thirdPi, 5 * thirdPi];
function getHexagonPoints(radius) {
  /*
   * points:
   *        3
   *   4          2
   *
   *   5          1
   *        0
   */
  return angles.map(function (angle) {
    var x = Math.sin(angle) * radius;
    var y = -Math.cos(angle) * radius;
    return {
      x: x,
      y: y
    };
  });
}

function getHexagonPointsXY(points, center, as) {
  var result = {};
  var xKey = as[0];
  var yKey = as[1];
  result[xKey] = [];
  result[yKey] = [];
  each(points, function (point) {
    result[xKey].push(point.x + center.x);
    result[yKey].push(point.y + center.y);
  });
  return result;
}

function transform$10(dataView, options) {
  var hexbinGenerator = hexbin();
  options = assign_1({}, DEFAULT_OPTIONS$6, options);
  var fields = options.fields;
  if (!isArray_1(fields) || fields.length !== 2) {
    throw new TypeError('Invalid option: fields');
  }
  var field0 = fields[0];
  var field1 = fields[1];
  var points = map_1(dataView.rows, function (row) {
    return [row[field0], row[field1]];
  });
  var radius = options.radius;
  if (radius) {
    hexbinGenerator.radius(radius);
  }
  // const extent = options.extent;
  // if (extent) {
  //   console.log(extent)
  //   hexbinGenerator.extent(extent);
  // }
  var centerByPoint = {};
  each(hexbinGenerator(points), function (bin) {
    each(bin, function (point) {
      var key = point[0] + '-' + point[1];
      centerByPoint[key] = {
        x: bin.x,
        y: bin.y
      };
    });
  });
  var hexagonPoints = getHexagonPoints(hexbinGenerator.radius());
  var hexagonsByCenter = {}; // caching
  forIn_1(centerByPoint, function (center) {
    var key = center.x + '-' + center.y;
    if (!hexagonsByCenter[key]) {
      hexagonsByCenter[key] = getHexagonPointsXY(hexagonPoints, center, options.as);
    }
  });
  each(dataView.rows, function (row) {
    var pointKey = row[field0] + '-' + row[field1];
    var center = centerByPoint[pointKey];
    var hexagonCenterKey = center.x + '-' + center.y;
    assign_1(row, hexagonsByCenter[hexagonCenterKey]);
  });
}

registerTransform$14('bin.hexagon', transform$10);
registerTransform$14('bin.hex', transform$10);

var require$$0$8 = ( index$3 && undefined ) || index$3;

var histogram$1 = require$$0$8.histogram;
var registerTransform$15 = dataSet.registerTransform;


var DEFAULT_OPTIONS$7 = {
  as: 'x'
  // field: '', // required
  // domain: [/* min, max */],
  // thresholds: [/* min, max */],
  // TODO step?
};

function transform$11(dataView, options) {
  var histogramGenerator = histogram$1();
  options = assign_1({}, DEFAULT_OPTIONS$7, options);
  var field = options.field;
  var domain = options.domain;
  var thresholds = options.thresholds;
  if (!field) {
    throw new TypeError('Invalid option: field');
  }
  var rows = dataView.rows;
  var column = dataView.getColumn(field);
  if (domain) {
    histogramGenerator.domain(domain);
  }
  if (thresholds) {
    histogramGenerator.thresholds(thresholds);
  }
  var binByValue = {};
  each(histogramGenerator(column), function (bin) {
    each(bin, function (value) {
      var currentBin = binByValue[value] = {};
      currentBin[options.as] = [bin.x0, bin.x1];
    });
  });
  each(rows, function (row) {
    var bin = binByValue[row[field]];
    assign_1(row, bin);
  });
}

registerTransform$15('bin.histogram', transform$11);
registerTransform$15('bin.dot', transform$11);

var quantile$4 = index$10.quantile;
var registerTransform$16 = dataSet.registerTransform;


var DEFAULT_OPTIONS$8 = {
  as: '_bin',
  groupBy: [], // optional
  fraction: 4 // default
  // p: [0.5, 0.3], // array of p parameter
  // field: 'y', // required
};

function transform$12(dataView, options) {
  options = assign_1({}, DEFAULT_OPTIONS$8, options);
  var field = options.field;
  if (!field) {
    throw new TypeError('Invalid option: field');
  }
  var pArray = options.p;
  var fraction = options.fraction;
  if (!isArray_1(pArray) || pArray.length === 0) {
    pArray = pByFraction(fraction);
  }
  var rows = dataView.rows;
  var groupBy = options.groupBy;
  var groups = partition$1(rows, groupBy);
  var result = [];
  forIn_1(groups, function (group) {
    var resultRow = pick_1(group[0], groupBy);
    var binningColumn = map_1(group, function (row) {
      return row[field];
    });
    var quantiles = map_1(pArray, function (p) {
      return quantile$4(binningColumn, p);
    });
    resultRow[options.as] = quantiles;
    result.push(resultRow);
  });
  dataView.rows = result;
}

registerTransform$16('bin.quantile', transform$12);

var histogram$2 = require$$0$8.histogram;
var registerTransform$17 = dataSet.registerTransform;


var DEFAULT_OPTIONS$9 = {
  as: ['x', 'y']
  // fields: ['field0', 'field1'], // required
  // thresholdsX: [],
  // thresholdsY: [],
  // TODO step?
};

function processField(dataView, options, isX) {
  var histogramGenerator = histogram$2();
  var field = options.field;
  var as = options.as;
  var rows = dataView.rows;
  var column = dataView.getColumn(field);
  // const domain = options.domain;
  // if (domain) {
  //   histogramGenerator.domain(domain);
  // }
  var thresholds = options.thresholds;
  if (thresholds) {
    histogramGenerator.thresholds(thresholds);
  }
  var binByValue = {};
  each(histogramGenerator(column), function (bin) {
    each(bin, function (value) {
      var currentBin = binByValue[value] = {};
      /*
       * points:
       *   3 - 2
       *   |   |
       *   0 - 1
       */
      if (isX) {
        currentBin[as] = [bin.x0, bin.x1, bin.x1, bin.x0];
      } else {
        currentBin[as] = [bin.x0, bin.x0, bin.x1, bin.x1];
      }
    });
  });
  each(rows, function (row) {
    var bin = binByValue[row[field]];
    assign_1(row, bin);
  });
}

function transform$13(dataView, options) {
  options = assign_1({}, DEFAULT_OPTIONS$9, options);
  var fields = options.fields;
  if (!isArray_1(fields) && fields.length !== 2) {
    throw new TypeError('Invalid option: fields');
  }
  processField(dataView, {
    field: fields[0],
    // domain: options.domainX,
    thresholds: options.thresholdsX,
    as: options.as[0]
  }, true);
  processField(dataView, {
    field: fields[1],
    // domain: options.domainY,
    thresholds: options.thresholdsY,
    as: options.as[1]
  });
}

registerTransform$17('bin.rectangle', transform$13);
registerTransform$17('bin.rect', transform$13);

var registerTransform$18 = dataSet.registerTransform;


var DEFAULT_OPTIONS$10 = {
  // field: 'name', // required
  // geoDataView: dataView, // required
  as: '_centroid'
};

function transform$14(dataView, options) {
  options = assign_1({}, DEFAULT_OPTIONS$10, options);
  var field = options.field;
  if (!field) {
    throw new TypeError('Invalid field');
  }
  var geoDataView = options.geoDataView;
  if (isString_1(geoDataView)) {
    geoDataView = dataView.dataSet.getView(geoDataView);
  }
  if (!geoDataView || geoDataView.dataType !== 'geo') {
    throw new TypeError('Invalid geoDataView');
  }
  var as = options.as;
  if (!as || !isString_1(as)) {
    throw new TypeError('Invalid as');
  }
  each(dataView.rows, function (row) {
    var feature = geoDataView.geoFeatureByName(row[field]);
    if (feature) {
      row[as] = feature.centroid;
    }
  });
}

registerTransform$18('geo.centroid', transform$14);

var registerTransform$19 = dataSet.registerTransform;
var geoPath$1 = d3Geo.geoPath;

var DEFAULT_OPTIONS$11 = {
  // projection: '', // default to null
  as: ['_x', '_y', '_centroid']
};

function transform$15(dataView, options) {
  if (dataView.dataType !== 'geo') {
    throw new TypeError('This transform is for Geo data only');
  }
  options = assign_1({}, DEFAULT_OPTIONS$11, options);
  var projection = options.projection;
  if (!projection) {
    throw new TypeError('Invalid projection');
  }
  projection = getGeoProjection(projection);
  var geoPathGenerator = geoPath$1(projection);
  var as = options.as;
  if (!isArray_1(as) || as.length !== 3) {
    throw new TypeError('Invalid option: as');
  }
  var lonField = as[0];
  var latField = as[1];
  var centroid = as[2];
  each(dataView.rows, function (row) {
    row[lonField] = [];
    row[latField] = [];
    row[centroid] = [];
    var pathData = geoPathGenerator(row);
    if (pathData) {
      // TODO projection returns null
      var points = index$13(pathData);
      each(points._path, function (point) {
        row[lonField].push(point[1]);
        row[latField].push(point[2]);
      });
      row[centroid] = geoPathGenerator.centroid(row);
    }
  });
}

registerTransform$19('geo.projection', transform$15);

var registerTransform$20 = dataSet.registerTransform;


var DEFAULT_OPTIONS$12 = {
  // field: 'name', // required
  // geoDataView: dataView, // required
  as: ['_x', '_y']
};

function transform$16(dataView, options) {
  options = assign_1({}, DEFAULT_OPTIONS$12, options);
  var field = options.field;
  if (!field) {
    throw new TypeError('Invalid field');
  }
  var geoDataView = options.geoDataView;
  if (isString_1(geoDataView)) {
    geoDataView = dataView.dataSet.getView(geoDataView);
  }
  if (!geoDataView || geoDataView.dataType !== 'geo') {
    throw new TypeError('Invalid geoDataView');
  }
  var as = options.as;
  if (!isArray_1(as) || as.length !== 2) {
    throw new TypeError('Invalid as');
  }
  var lonField = as[0];
  var latField = as[1];
  each(dataView.rows, function (row) {
    var feature = geoDataView.geoFeatureByName(row[field]);
    if (feature) {
      row[lonField] = feature.longitude;
      row[latField] = feature.latitude;
    }
  });
}

registerTransform$20('geo.region', transform$16);

var constant$6 = function(x) {
  return function() {
    return x;
  };
};

function x(d) {
  return d[0];
}

function y(d) {
  return d[1];
}

function RedBlackTree() {
  this._ = null; // root node
}

function RedBlackNode(node) {
  node.U = // parent node
  node.C = // color - true for red, false for black
  node.L = // left node
  node.R = // right node
  node.P = // previous node
  node.N = null; // next node
}

RedBlackTree.prototype = {
  constructor: RedBlackTree,

  insert: function(after, node) {
    var parent, grandpa, uncle;

    if (after) {
      node.P = after;
      node.N = after.N;
      if (after.N) after.N.P = node;
      after.N = node;
      if (after.R) {
        after = after.R;
        while (after.L) after = after.L;
        after.L = node;
      } else {
        after.R = node;
      }
      parent = after;
    } else if (this._) {
      after = RedBlackFirst(this._);
      node.P = null;
      node.N = after;
      after.P = after.L = node;
      parent = after;
    } else {
      node.P = node.N = null;
      this._ = node;
      parent = null;
    }
    node.L = node.R = null;
    node.U = parent;
    node.C = true;

    after = node;
    while (parent && parent.C) {
      grandpa = parent.U;
      if (parent === grandpa.L) {
        uncle = grandpa.R;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.R) {
            RedBlackRotateLeft(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.L) {
            RedBlackRotateRight(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateLeft(this, grandpa);
        }
      }
      parent = after.U;
    }
    this._.C = false;
  },

  remove: function(node) {
    if (node.N) node.N.P = node.P;
    if (node.P) node.P.N = node.N;
    node.N = node.P = null;

    var parent = node.U,
        sibling,
        left = node.L,
        right = node.R,
        next,
        red;

    if (!left) next = right;
    else if (!right) next = left;
    else next = RedBlackFirst(right);

    if (parent) {
      if (parent.L === node) parent.L = next;
      else parent.R = next;
    } else {
      this._ = next;
    }

    if (left && right) {
      red = next.C;
      next.C = node.C;
      next.L = left;
      left.U = next;
      if (next !== right) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right;
        right.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      red = node.C;
      node = next;
    }

    if (node) node.U = parent;
    if (red) return;
    if (node && node.C) { node.C = false; return; }

    do {
      if (node === this._) break;
      if (node === parent.L) {
        sibling = parent.R;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }
        if ((sibling.L && sibling.L.C)
            || (sibling.R && sibling.R.C)) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            RedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }
          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          RedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateRight(this, parent);
          sibling = parent.L;
        }
        if ((sibling.L && sibling.L.C)
          || (sibling.R && sibling.R.C)) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            RedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }
          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          RedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }
      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);

    if (node) node.C = false;
  }
};

function RedBlackRotateLeft(tree, node) {
  var p = node,
      q = node.R,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p;
}

function RedBlackRotateRight(tree, node) {
  var p = node,
      q = node.L,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p;
}

function RedBlackFirst(node) {
  while (node.L) node = node.L;
  return node;
}

function createEdge(left, right, v0, v1) {
  var edge = [null, null],
      index = edges.push(edge) - 1;
  edge.left = left;
  edge.right = right;
  if (v0) setEdgeEnd(edge, left, right, v0);
  if (v1) setEdgeEnd(edge, right, left, v1);
  cells[left.index].halfedges.push(index);
  cells[right.index].halfedges.push(index);
  return edge;
}

function createBorderEdge(left, v0, v1) {
  var edge = [v0, v1];
  edge.left = left;
  return edge;
}

function setEdgeEnd(edge, left, right, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.left = left;
    edge.right = right;
  } else if (edge.left === right) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
}

// Liang–Barsky line clipping.
function clipEdge(edge, x0, y0, x1, y1) {
  var a = edge[0],
      b = edge[1],
      ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (!(t0 > 0) && !(t1 < 1)) return true; // TODO Better check?

  if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
  if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
  return true;
}

function connectEdge(edge, x0, y0, x1, y1) {
  var v1 = edge[1];
  if (v1) return true;

  var v0 = edge[0],
      left = edge.left,
      right = edge.right,
      lx = left[0],
      ly = left[1],
      rx = right[0],
      ry = right[1],
      fx = (lx + rx) / 2,
      fy = (ly + ry) / 2,
      fm,
      fb;

  if (ry === ly) {
    if (fx < x0 || fx >= x1) return;
    if (lx > rx) {
      if (!v0) v0 = [fx, y0];
      else if (v0[1] >= y1) return;
      v1 = [fx, y1];
    } else {
      if (!v0) v0 = [fx, y1];
      else if (v0[1] < y0) return;
      v1 = [fx, y0];
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!v0) v0 = [(y0 - fb) / fm, y0];
        else if (v0[1] >= y1) return;
        v1 = [(y1 - fb) / fm, y1];
      } else {
        if (!v0) v0 = [(y1 - fb) / fm, y1];
        else if (v0[1] < y0) return;
        v1 = [(y0 - fb) / fm, y0];
      }
    } else {
      if (ly < ry) {
        if (!v0) v0 = [x0, fm * x0 + fb];
        else if (v0[0] >= x1) return;
        v1 = [x1, fm * x1 + fb];
      } else {
        if (!v0) v0 = [x1, fm * x1 + fb];
        else if (v0[0] < x0) return;
        v1 = [x0, fm * x0 + fb];
      }
    }
  }

  edge[0] = v0;
  edge[1] = v1;
  return true;
}

function clipEdges(x0, y0, x1, y1) {
  var i = edges.length,
      edge;

  while (i--) {
    if (!connectEdge(edge = edges[i], x0, y0, x1, y1)
        || !clipEdge(edge, x0, y0, x1, y1)
        || !(Math.abs(edge[0][0] - edge[1][0]) > epsilon$7
            || Math.abs(edge[0][1] - edge[1][1]) > epsilon$7)) {
      delete edges[i];
    }
  }
}

function createCell(site) {
  return cells[site.index] = {
    site: site,
    halfedges: []
  };
}

function cellHalfedgeAngle(cell, edge) {
  var site = cell.site,
      va = edge.left,
      vb = edge.right;
  if (site === vb) vb = va, va = site;
  if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
  if (site === va) va = edge[1], vb = edge[0];
  else va = edge[0], vb = edge[1];
  return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
}

function cellHalfedgeStart(cell, edge) {
  return edge[+(edge.left !== cell.site)];
}

function cellHalfedgeEnd(cell, edge) {
  return edge[+(edge.left === cell.site)];
}

function sortCellHalfedges() {
  for (var i = 0, n = cells.length, cell, halfedges, j, m; i < n; ++i) {
    if ((cell = cells[i]) && (m = (halfedges = cell.halfedges).length)) {
      var index = new Array(m),
          array = new Array(m);
      for (j = 0; j < m; ++j) index[j] = j, array[j] = cellHalfedgeAngle(cell, edges[halfedges[j]]);
      index.sort(function(i, j) { return array[j] - array[i]; });
      for (j = 0; j < m; ++j) array[j] = halfedges[index[j]];
      for (j = 0; j < m; ++j) halfedges[j] = array[j];
    }
  }
}

function clipCells(x0, y0, x1, y1) {
  var nCells = cells.length,
      iCell,
      cell,
      site,
      iHalfedge,
      halfedges,
      nHalfedges,
      start,
      startX,
      startY,
      end,
      endX,
      endY,
      cover = true;

  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      site = cell.site;
      halfedges = cell.halfedges;
      iHalfedge = halfedges.length;

      // Remove any dangling clipped edges.
      while (iHalfedge--) {
        if (!edges[halfedges[iHalfedge]]) {
          halfedges.splice(iHalfedge, 1);
        }
      }

      // Insert any border edges as necessary.
      iHalfedge = 0, nHalfedges = halfedges.length;
      while (iHalfedge < nHalfedges) {
        end = cellHalfedgeEnd(cell, edges[halfedges[iHalfedge]]), endX = end[0], endY = end[1];
        start = cellHalfedgeStart(cell, edges[halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];
        if (Math.abs(endX - startX) > epsilon$7 || Math.abs(endY - startY) > epsilon$7) {
          halfedges.splice(iHalfedge, 0, edges.push(createBorderEdge(site, end,
              Math.abs(endX - x0) < epsilon$7 && y1 - endY > epsilon$7 ? [x0, Math.abs(startX - x0) < epsilon$7 ? startY : y1]
              : Math.abs(endY - y1) < epsilon$7 && x1 - endX > epsilon$7 ? [Math.abs(startY - y1) < epsilon$7 ? startX : x1, y1]
              : Math.abs(endX - x1) < epsilon$7 && endY - y0 > epsilon$7 ? [x1, Math.abs(startX - x1) < epsilon$7 ? startY : y0]
              : Math.abs(endY - y0) < epsilon$7 && endX - x0 > epsilon$7 ? [Math.abs(startY - y0) < epsilon$7 ? startX : x0, y0]
              : null)) - 1);
          ++nHalfedges;
        }
      }

      if (nHalfedges) cover = false;
    }
  }

  // If there weren’t any edges, have the closest site cover the extent.
  // It doesn’t matter which corner of the extent we measure!
  if (cover) {
    var dx, dy, d2, dc = Infinity;

    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
      if (cell = cells[iCell]) {
        site = cell.site;
        dx = site[0] - x0;
        dy = site[1] - y0;
        d2 = dx * dx + dy * dy;
        if (d2 < dc) dc = d2, cover = cell;
      }
    }

    if (cover) {
      var v00 = [x0, y0], v01 = [x0, y1], v11 = [x1, y1], v10 = [x1, y0];
      cover.halfedges.push(
        edges.push(createBorderEdge(site = cover.site, v00, v01)) - 1,
        edges.push(createBorderEdge(site, v01, v11)) - 1,
        edges.push(createBorderEdge(site, v11, v10)) - 1,
        edges.push(createBorderEdge(site, v10, v00)) - 1
      );
    }
  }

  // Lastly delete any cells with no edges; these were entirely clipped.
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = cells[iCell]) {
      if (!cell.halfedges.length) {
        delete cells[iCell];
      }
    }
  }
}

var circlePool = [];

var firstCircle;

function Circle() {
  RedBlackNode(this);
  this.x =
  this.y =
  this.arc =
  this.site =
  this.cy = null;
}

function attachCircle(arc) {
  var lArc = arc.P,
      rArc = arc.N;

  if (!lArc || !rArc) return;

  var lSite = lArc.site,
      cSite = arc.site,
      rSite = rArc.site;

  if (lSite === rSite) return;

  var bx = cSite[0],
      by = cSite[1],
      ax = lSite[0] - bx,
      ay = lSite[1] - by,
      cx = rSite[0] - bx,
      cy = rSite[1] - by;

  var d = 2 * (ax * cy - ay * cx);
  if (d >= -epsilon2$3) return;

  var ha = ax * ax + ay * ay,
      hc = cx * cx + cy * cy,
      x = (cy * ha - ay * hc) / d,
      y = (ax * hc - cx * ha) / d;

  var circle = circlePool.pop() || new Circle;
  circle.arc = arc;
  circle.site = cSite;
  circle.x = x + bx;
  circle.y = (circle.cy = y + by) + Math.sqrt(x * x + y * y); // y bottom

  arc.circle = circle;

  var before = null,
      node = circles._;

  while (node) {
    if (circle.y < node.y || (circle.y === node.y && circle.x <= node.x)) {
      if (node.L) node = node.L;
      else { before = node.P; break; }
    } else {
      if (node.R) node = node.R;
      else { before = node; break; }
    }
  }

  circles.insert(before, circle);
  if (!before) firstCircle = circle;
}

function detachCircle(arc) {
  var circle = arc.circle;
  if (circle) {
    if (!circle.P) firstCircle = circle.N;
    circles.remove(circle);
    circlePool.push(circle);
    RedBlackNode(circle);
    arc.circle = null;
  }
}

var beachPool = [];

function Beach() {
  RedBlackNode(this);
  this.edge =
  this.site =
  this.circle = null;
}

function createBeach(site) {
  var beach = beachPool.pop() || new Beach;
  beach.site = site;
  return beach;
}

function detachBeach(beach) {
  detachCircle(beach);
  beaches.remove(beach);
  beachPool.push(beach);
  RedBlackNode(beach);
}

function removeBeach(beach) {
  var circle = beach.circle,
      x = circle.x,
      y = circle.cy,
      vertex = [x, y],
      previous = beach.P,
      next = beach.N,
      disappearing = [beach];

  detachBeach(beach);

  var lArc = previous;
  while (lArc.circle
      && Math.abs(x - lArc.circle.x) < epsilon$7
      && Math.abs(y - lArc.circle.cy) < epsilon$7) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    detachBeach(lArc);
    lArc = previous;
  }

  disappearing.unshift(lArc);
  detachCircle(lArc);

  var rArc = next;
  while (rArc.circle
      && Math.abs(x - rArc.circle.x) < epsilon$7
      && Math.abs(y - rArc.circle.cy) < epsilon$7) {
    next = rArc.N;
    disappearing.push(rArc);
    detachBeach(rArc);
    rArc = next;
  }

  disappearing.push(rArc);
  detachCircle(rArc);

  var nArcs = disappearing.length,
      iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    setEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
  }

  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = createEdge(lArc.site, rArc.site, null, vertex);

  attachCircle(lArc);
  attachCircle(rArc);
}

function addBeach(site) {
  var x = site[0],
      directrix = site[1],
      lArc,
      rArc,
      dxl,
      dxr,
      node = beaches._;

  while (node) {
    dxl = leftBreakPoint(node, directrix) - x;
    if (dxl > epsilon$7) node = node.L; else {
      dxr = x - rightBreakPoint(node, directrix);
      if (dxr > epsilon$7) {
        if (!node.R) {
          lArc = node;
          break;
        }
        node = node.R;
      } else {
        if (dxl > -epsilon$7) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -epsilon$7) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }

  createCell(site);
  var newArc = createBeach(site);
  beaches.insert(lArc, newArc);

  if (!lArc && !rArc) return;

  if (lArc === rArc) {
    detachCircle(lArc);
    rArc = createBeach(lArc.site);
    beaches.insert(newArc, rArc);
    newArc.edge = rArc.edge = createEdge(lArc.site, newArc.site);
    attachCircle(lArc);
    attachCircle(rArc);
    return;
  }

  if (!rArc) { // && lArc
    newArc.edge = createEdge(lArc.site, newArc.site);
    return;
  }

  // else lArc !== rArc
  detachCircle(lArc);
  detachCircle(rArc);

  var lSite = lArc.site,
      ax = lSite[0],
      ay = lSite[1],
      bx = site[0] - ax,
      by = site[1] - ay,
      rSite = rArc.site,
      cx = rSite[0] - ax,
      cy = rSite[1] - ay,
      d = 2 * (bx * cy - by * cx),
      hb = bx * bx + by * by,
      hc = cx * cx + cy * cy,
      vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];

  setEdgeEnd(rArc.edge, lSite, rSite, vertex);
  newArc.edge = createEdge(lSite, site, null, vertex);
  rArc.edge = createEdge(site, rSite, null, vertex);
  attachCircle(lArc);
  attachCircle(rArc);
}

function leftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site[0],
      rfocy = site[1],
      pby2 = rfocy - directrix;

  if (!pby2) return rfocx;

  var lArc = arc.P;
  if (!lArc) return -Infinity;

  site = lArc.site;
  var lfocx = site[0],
      lfocy = site[1],
      plby2 = lfocy - directrix;

  if (!plby2) return lfocx;

  var hl = lfocx - rfocx,
      aby2 = 1 / pby2 - 1 / plby2,
      b = hl / plby2;

  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;

  return (rfocx + lfocx) / 2;
}

function rightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return leftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}

var epsilon$7 = 1e-6;
var epsilon2$3 = 1e-12;
var beaches;
var cells;
var circles;
var edges;

function triangleArea(a, b, c) {
  return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
}

function lexicographic(a, b) {
  return b[1] - a[1]
      || b[0] - a[0];
}

function Diagram(sites, extent) {
  var site = sites.sort(lexicographic).pop(),
      x,
      y,
      circle;

  edges = [];
  cells = new Array(sites.length);
  beaches = new RedBlackTree;
  circles = new RedBlackTree;

  while (true) {
    circle = firstCircle;
    if (site && (!circle || site[1] < circle.y || (site[1] === circle.y && site[0] < circle.x))) {
      if (site[0] !== x || site[1] !== y) {
        addBeach(site);
        x = site[0], y = site[1];
      }
      site = sites.pop();
    } else if (circle) {
      removeBeach(circle.arc);
    } else {
      break;
    }
  }

  sortCellHalfedges();

  if (extent) {
    var x0 = +extent[0][0],
        y0 = +extent[0][1],
        x1 = +extent[1][0],
        y1 = +extent[1][1];
    clipEdges(x0, y0, x1, y1);
    clipCells(x0, y0, x1, y1);
  }

  this.edges = edges;
  this.cells = cells;

  beaches =
  circles =
  edges =
  cells = null;
}

Diagram.prototype = {
  constructor: Diagram,

  polygons: function() {
    var edges = this.edges;

    return this.cells.map(function(cell) {
      var polygon = cell.halfedges.map(function(i) { return cellHalfedgeStart(cell, edges[i]); });
      polygon.data = cell.site.data;
      return polygon;
    });
  },

  triangles: function() {
    var triangles = [],
        edges = this.edges;

    this.cells.forEach(function(cell, i) {
      if (!(m = (halfedges = cell.halfedges).length)) return;
      var site = cell.site,
          halfedges,
          j = -1,
          m,
          s0,
          e1 = edges[halfedges[m - 1]],
          s1 = e1.left === site ? e1.right : e1.left;

      while (++j < m) {
        s0 = s1;
        e1 = edges[halfedges[j]];
        s1 = e1.left === site ? e1.right : e1.left;
        if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
          triangles.push([site.data, s0.data, s1.data]);
        }
      }
    });

    return triangles;
  },

  links: function() {
    return this.edges.filter(function(edge) {
      return edge.right;
    }).map(function(edge) {
      return {
        source: edge.left.data,
        target: edge.right.data
      };
    });
  },

  find: function(x, y, radius) {
    var that = this, i0, i1 = that._found || 0, n = that.cells.length, cell;

    // Use the previously-found cell, or start with an arbitrary one.
    while (!(cell = that.cells[i1])) if (++i1 >= n) return null;
    var dx = x - cell.site[0], dy = y - cell.site[1], d2 = dx * dx + dy * dy;

    // Traverse the half-edges to find a closer cell, if any.
    do {
      cell = that.cells[i0 = i1], i1 = null;
      cell.halfedges.forEach(function(e) {
        var edge = that.edges[e], v = edge.left;
        if ((v === cell.site || !v) && !(v = edge.right)) return;
        var vx = x - v[0], vy = y - v[1], v2 = vx * vx + vy * vy;
        if (v2 < d2) d2 = v2, i1 = v.index;
      });
    } while (i1 !== null);

    that._found = i0;

    return radius == null || d2 <= radius * radius ? cell.site : null;
  }
};

var voronoi$2 = function() {
  var x$$1 = x,
      y$$1 = y,
      extent = null;

  function voronoi(data) {
    return new Diagram(data.map(function(d, i) {
      var s = [Math.round(x$$1(d, i, data) / epsilon$7) * epsilon$7, Math.round(y$$1(d, i, data) / epsilon$7) * epsilon$7];
      s.index = i;
      s.data = d;
      return s;
    }), extent);
  }

  voronoi.polygons = function(data) {
    return voronoi(data).polygons();
  };

  voronoi.links = function(data) {
    return voronoi(data).links();
  };

  voronoi.triangles = function(data) {
    return voronoi(data).triangles();
  };

  voronoi.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant$6(+_), voronoi) : x$$1;
  };

  voronoi.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant$6(+_), voronoi) : y$$1;
  };

  voronoi.extent = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
  };

  voronoi.size = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
  };

  return voronoi;
};



var index$26 = Object.freeze({
	voronoi: voronoi$2
});

var d3Voronoi = ( index$26 && undefined ) || index$26;

var registerTransform$21 = dataSet.registerTransform;


var DEFAULT_OPTIONS$13 = {
  // x: 'x', // field x, required
  // y: 'y', // field y, required
  // extend: [[x0, y0], [x1, y1]], // optional
  // size: [width, height], // optional
  as: ['_x', '_y']
};

function transform$17(dataView, options) {
  options = assign_1({}, DEFAULT_OPTIONS$13, options);

  var as = options.as;
  if (!isArray_1(as) || as.length !== 2) {
    throw new TypeError('Invalid option: as');
  }
  var xField = as[0];
  var yField = as[1];

  var x = options.x;
  var y = options.y;
  if (!x || !y) {
    throw new TypeError('Invalid options');
  }

  var rows = dataView.rows;
  var data = map_1(rows, function (row) {
    return [row[x], row[y]];
  });
  var voronoi = d3Voronoi.voronoi();
  if (options.extend) {
    voronoi.extent(options.extend);
  }
  if (options.size) {
    voronoi.size(options.size);
  }
  var polygons = voronoi(data).polygons();
  each(rows, function (row, i) {
    var polygon = filter_1(polygons[i], function (point) {
      return !!point;
    }); // some points are null
    row[xField] = map_1(polygon, function (point) {
      return point[0];
    });
    row[yField] = map_1(polygon, function (point) {
      return point[1];
    });
  });
}

registerTransform$21('diagram.voronoi', transform$17);
registerTransform$21('voronoi', transform$17);

var registerTransform$22 = dataSet.registerTransform;


var DEFAULT_OPTIONS$14 = {
  field: 'value',
  tile: 'treemapSquarify', // treemapBinary, treemapDice, treemapSlice, treemapSliceDice, treemapSquarify, treemapResquarify
  size: [1, 1], // width, height
  round: false,
  // ratio: 1.618033988749895, // golden ratio
  padding: 0,
  paddingInner: 0,
  paddingOuter: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  as: ['x', 'y']
};

function transform$18(dataView, options) {
  if (dataView.dataType !== 'hierarchy') {
    throw new TypeError('This transform is for Hierarchy data only');
  }
  var root = dataView.root;
  options = assign_1({}, DEFAULT_OPTIONS$14, options);

  var as = options.as;
  if (!isArray_1(as) || as.length !== 2) {
    throw new TypeError('Invalid option: as');
  }

  if (options.field) {
    root.sum(function (d) {
      return d[options.field];
    });
  }

  var treemapLayout = d3Hierarchy.treemap();
  treemapLayout.tile(d3Hierarchy[options.tile]).size(options.size).round(options.round).padding(options.padding).paddingInner(options.paddingInner).paddingOuter(options.paddingOuter).paddingTop(options.paddingTop).paddingRight(options.paddingRight).paddingBottom(options.paddingBottom).paddingLeft(options.paddingLeft);
  treemapLayout(root);

  /*
   * points:
   *   3  2
   *   0  1
   */
  var x = as[0];
  var y = as[1];
  root.each(function (node) {
    node[x] = [node.x0, node.x1, node.x1, node.x0];
    node[y] = [node.y1, node.y1, node.y0, node.y0];
    each(['x0', 'x1', 'y0', 'y1'], function (prop) {
      if (indexOf_1(as, prop) === -1) {
        delete node[prop];
      }
    });
  });
}

registerTransform$22('hierarchy.treemap', transform$18);
registerTransform$22('treemap', transform$18);

// extra APIs


// connectors


// transforms
// static


// imputation


// statistics

// binning


// geo


// diagram


// hierarchy


var index = dataSet;

return index;

})));

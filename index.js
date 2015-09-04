/*!
 * has-glob <https://github.com/jonschlinkert/has-glob>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isGlob = require('is-glob');

module.exports = function hasGlob(arr) {
 if (arr == null) return false;
 if (!Array.isArray(arr)) arr = [arr];
 var len = arr.length;
 while (len--) if (isGlob(arr[len])) return true;
 return false;
};

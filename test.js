'use strict';

require('mocha');
var assert = require('assert');
var hasGlob = require('./');

describe('hasGlob', function () {
  it('should return `true` if the array has a glob pattern:', function () {
    assert(hasGlob(['foo', 'bar', '*.js']));
    assert(hasGlob(['foo', 'bar', '!*.js']));
    assert(hasGlob(['foo', 'bar', '!foo']));
    assert(hasGlob(['foo', 'bar', '!foo.js']));
    assert(hasGlob(['foo', 'bar', '**/abc.js']));
    assert(hasGlob(['foo', 'bar', 'abc/*.js']));
  });

  it('should work with strings:', function () {
    assert(hasGlob('*.js'));
    assert(hasGlob('!*.js'));
    assert(hasGlob('!foo'));
    assert(hasGlob('!foo.js'));
    assert(hasGlob('**/abc.js'));
    assert(hasGlob('abc/*.js'));
  });

  it('should return `true` if a path has brace characters:', function () {
    assert(hasGlob(['foo', 'bar', 'abc/{a,b}.js']));
    assert(hasGlob(['foo', 'bar', 'abc/{a..z}.js']));
    assert(hasGlob(['foo', 'bar', 'abc/{a..z..2}.js']));
  });

  it('should return `true` if it has an extglob:', function () {
    assert(hasGlob(['foo', 'bar', 'abc/@(a).js']));
    assert(hasGlob(['foo', 'bar', 'abc/!(a).js']));
    assert(hasGlob(['foo', 'bar', 'abc/+(a).js']));
    assert(hasGlob(['foo', 'bar', 'abc/*(a).js']));
    assert(hasGlob(['foo', 'bar', 'abc/?(a).js']));
    assert(hasGlob(['foo', 'bar', 'abc/@(.js)']));
    assert(hasGlob(['foo', 'bar', 'abc/!(.js)']));
    assert(hasGlob(['foo', 'bar', 'abc/+(.js)']));
    assert(hasGlob(['foo', 'bar', 'abc/*(.js)']));
    assert(hasGlob(['foo', 'bar', 'abc/?(.js)']));
  });

  it('should return `true` if a path has regex characters:', function () {
    assert(hasGlob(['foo', 'bar', 'abc/(aaa|bbb).js']));
    assert(hasGlob(['foo', 'bar', 'abc/?.js']));
    assert(hasGlob(['foo', 'bar', '?.js']));
    assert(hasGlob(['foo', 'bar', '[abc].js']));
    assert(hasGlob(['foo', 'bar', '[^abc].js']));
    assert(hasGlob(['foo', 'bar', 'a/b/c/[a-z].js']));
    assert(hasGlob(['foo', 'bar', '[a-j]*[^c]b/c']));
  });

  it('should return `false` if it is not a string:', function () {
    assert(!hasGlob([]));
    assert(!hasGlob([null]));
    assert(!hasGlob([undefined]));
    assert(!hasGlob([{}]));
  });

  it('should return `false` if it is not a glob pattern:', function () {
    assert(!hasGlob(['.']));
    assert(!hasGlob(['aa']));
    assert(!hasGlob(['abc.js']));
    assert(!hasGlob(['abc/def/ghi.js']));
  });
});


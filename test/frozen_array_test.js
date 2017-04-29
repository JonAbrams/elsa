const assert = require('assert');
const FrozenArray = require('../frozen_array');

describe('FrozenArray', function() {
  before(function() {
    this.farr = new FrozenArray(4, 3, 11, 19, 13, 0);
    this.farrSingle = new FrozenArray(4);
  });

  it('is an array', function() {
    assert.deepEqual(this.farr, [4, 3, 11, 19, 13, 0]);
    assert.deepEqual(this.farrSingle, [4]);
    assert(this.farr instanceof Array);
    assert(Array.isArray(this.farr));
  });

  it('is frozen', function() {
    assert(Object.isFrozen(this.farr));
    assert.throws(function() {
      'use strict';
      this.farr[0] = 26;
    }, TypeError);
  });

  describe('#push', function() {
    it('returns array with value pushed on', function() {
      assert.deepEqual(this.farr.push(3), [4, 3, 11, 19, 13, 0, 3]);
      assert(Object.isFrozen(this.farr.push(3)));
    });
  });

  describe('#pop', function() {
    it('returns array with new array and value', function() {
      assert.deepEqual(this.farr.pop(), [[4, 3, 11, 19, 13], 0]);
      assert(Object.isFrozen(this.farr.pop()));
      assert(Object.isFrozen(this.farr.pop()[0]));
    });
  });

  describe('#sort', function() {
    it('returns a sorted array', function() {
      const sorted = this.farr.sort((a, b) => a - b);
      assert.deepEqual(sorted, [0, 3, 4, 11, 13, 19]);
      assert(Object.isFrozen(sorted));
    });
  });

  describe('#reverse', function() {
    it('returns a reversed array', function() {
      const reversed = this.farr.reverse();
      assert.deepEqual(reversed, [0, 13, 19, 11, 3, 4]);
      assert(Object.isFrozen(reversed));
    });
  });

  describe('#slice', function() {
    it('returns a sliced array', function() {
      const sliced = this.farr.slice(1, 3);
      assert.deepEqual(sliced, [3, 11]);
      assert(Object.isFrozen(sliced));
      assert.deepEqual(this.farr.slice(1, 2), [3]); // The single value has caused bugs, test needed
    });
  });

  describe('#fill', function() {
    it('returns an array filled in with given value', function() {
      assert.deepEqual(this.farr.fill(1), [1, 1, 1, 1, 1, 1]);
    });
  });
});

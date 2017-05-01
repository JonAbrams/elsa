/* eslint-disable func-names */
/* eslint-disable strict */
const assert = require('assert');
const FrozenObject = require('../frozen_object');

describe('FrozenObject', () => {
  before(function () {
    this.fobj = new FrozenObject({
      name: 'Yoshi',
      species: 'dinosaur',
      age: 3,
      eggs: ['goomba', 'koopa trooper'],
    });
  });

  it('is frozen', function () {
    assert(Object.isFrozen(this.fobj));

    assert.throws(() => {
      'use strict';

      this.fobj.name = 'Mario';
    }, TypeError);
  });

  it('is accessible', function () {
    assert.equal(this.fobj.name, 'Yoshi');
  });

  it('can use update', function () {
    assert.deepEqual(this.fobj.update({ eggs: { $push: ['shy guy'] } }).eggs, [
      'goomba', 'koopa trooper', 'shy guy',
    ]);
    assert.equal(this.fobj.eggs.length, 2); // original intact
    assert.deepEqual(this.fobj.update({ $merge: { age: 4, game: 'Super Mario World' } }), {
      age: 4,
      eggs: [
        'goomba',
        'koopa trooper',
      ],
      game: 'Super Mario World',
      name: 'Yoshi',
      species: 'dinosaur',
    });
  });
});

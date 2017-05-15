/* eslint-disable func-names */
const babel = require('babel-core');
const assert = require('assert');
const elsa = require('../index');

const outputJs = babel.transformFileSync('./test/sample/sample_input.js', {
  plugins: [elsa],
}).code;

const expectedJs = `
import FrozenObject from 'babel-plugin-elsa/frozen_object';
import FrozenArray from 'babel-plugin-elsa/frozen_array';
(function () {
  var user = new FrozenObject({
    name: 'jon',
    followerCount: 5,
    followers: new FrozenArray(new FrozenObject({ name: 'zivi' }))
  });
  var normalUser = new Object({
    name: 'Loki',
    age: 4
  });
  var list = new FrozenArray(1, 2, 3, 4);

  return users.pop();
})();
`.trim();

describe('elsa', () => {
  it('produces expected output', () => {
    assert.equal(outputJs, expectedJs);
  });
});

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
  var defaultEmptyUser = user || new FrozenObject({});
  var users = new FrozenArray(user);
  var emptyUsers = new FrozenArray();
  user.followerCount = 6;
  user.followerCount++;
  user.followerCount += 1;
  resetfollowerCount(user, new FrozenObject({}));

  function resetfollowerCount(user) {
    person.followerCount = 1;
  }

  return users.pop();
})();
`.trim();

describe('elsa', () => {
  it('produces expected output', () => {
    assert.equal(outputJs, expectedJs);
  });
});

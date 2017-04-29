const babel = require('babel-core');
const assert = require('assert');
const elsa = require('../src/index');

const outputJs = babel.transformFileSync('./test/sample/sample_input.js', {
  plugins: [elsa]
}).code;

const expectedJs = `
import FrozenArray from 'babel-plugin-elsa/frozen_array';
(function () {
  var user = Object.freeze({
    name: 'jon',
    followerCount: 5,
    followers: new FrozenArray(Object.freeze({ name: 'zivi' }))
  });
  var defaultEmptyUser = user || Object.freeze({});
  var users = new FrozenArray(user);
  var emptyUsers = new FrozenArray();
  user.followerCount = 6;
  user.followerCount++;
  user.followerCount += 1;
  resetfollowerCount(user, {});

  function resetfollowerCount(user) {
    person.followerCount = 1;
  }

  return users.pop();
})();
`.trim();

describe('elsa', function() {
  it('produces expected output', function() {
    assert.equal(outputJs, expectedJs);
  });
});

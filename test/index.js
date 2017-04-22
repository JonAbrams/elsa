const babel = require('babel-core');
const assert = require('assert');
const elsa = require('../index');

const outputJs = babel.transformFileSync('./test/sample/sample_input.js', {
  plugins: [elsa],
}).code;

const expectedJs = `
var user = Object.freeze({
  name: 'jon',
  followerCount: 5,
  followers: Object.freeze([Object.freeze({ name: 'zivi' })])
});
var emptyUser = Object.freeze({});
var users = Object.freeze([user]);
var emptyUsers = Object.freeze([]);
user.followerCount = 6;
user.followerCount++;
user.followerCount += 1;
resetfollowerCount(user); // should no-op thanks to elsa

function resetfollowerCount(user) {
  person.followerCount = 1;
}
`.trim();

describe('elsa', function() {
  it('produces expected output', function() {
    assert.equal(outputJs, expectedJs);
  });
});

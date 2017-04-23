const babel = require('babel-core');
const assert = require('assert');
const elsa = require('../src/index');

const outputJs = babel.transformFileSync('./test/sample/sample_input.js', {
  plugins: [elsa]
}).code.split('\n').slice(30).join('\n').slice(1);

const expectedJs = `
var user = Object.freeze({
  name: 'jon',
  followerCount: 5,
  followers: Object.freeze([Object.freeze({ name: 'zivi' })])
});
var defaultEmptyUser = user || Object.freeze({});
var users = Object.freeze([user]);
var emptyUsers = Object.freeze([]);
user.followerCount = 6;
user.followerCount++;
user.followerCount += 1;
resetfollowerCount(user, {});

function resetfollowerCount(user) {
  person.followerCount = 1;
}
`.trim();

describe('elsa', function() {
  it('produces expected output', function() {
    assert.equal(outputJs, expectedJs);
  });
});

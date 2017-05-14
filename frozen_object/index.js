/* eslint-disable no-var */
var immutabilityUpdate = require('immutability-helper');
var merge = require('lodash/merge');

function FrozenObject(obj) {
  merge(this, obj);
  Object.freeze(this);
}

FrozenObject.prototype.update = function update(updateObj) {
  return new FrozenObject(immutabilityUpdate(merge({}, this), updateObj));
};

module.exports = FrozenObject;

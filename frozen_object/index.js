const update = require('react-addons-update');

module.exports = class FrozenObject {
  constructor(obj) {
    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
    Object.freeze(this);
  }

  update(...args) {
    return new FrozenObject(update.call(null, this, ...args));
  }
};

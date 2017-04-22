# Elsa

Mutability is dangerous, [_let it go_](https://www.youtube.com/watch?v=A_DaizJnnJQ)!

## Purpose

Immutability, which is when objects cannot be altered, is **cool** these days. By never altering
the contents of an object or array, and instead cloning them when you want to make a change, you
avoid common bugs. It's especially popular in [React](https://facebook.github.io/react/)
development, but by no means exclusive to that.

There are great libraries out there like [Immutable.js](https://facebook.github.io/immutable-js/) that
provide a bunch of classes for making immutable objects, but wouldn't it be **frosty** to turn the default object and arrays into immutable objects? JavaScript can already do this using [`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

In other words:
```javascript
// Turn this:
const person = {
  name: 'Jon'
};

// into:
const person = Object.freeze({
  name: 'Jon'
});
```

What Elsa does, is wrap nearly every object/array literal with `Object.freeze`.

## Usage

Elsa is a babel plugin, to make use of it, you need to install it:

    npm install --save babel-plugin-elsa

Add elsa as a plugin to your `.babelrc` config file:
```json
{
  "plugins": "elsa"
}
```

## License

ISC

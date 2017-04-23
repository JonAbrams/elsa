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

Elsa does two things: - It wraps [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals) literal you create with `Object.freeze`.
- It changes each [array literal]([array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Array_literals) into a `FrozenArray`.

## Usage

Elsa is a babel plugin, to make use of it, you need to install it:

    npm install --save babel-plugin-elsa

Add elsa as a plugin to your `.babelrc` config file:
```json
{
  "plugins": ["elsa"]
}
```

## FrozenArray

Elsa turns all array literals (e.g. `const coolNumbers = [1,5,-4,20];`) into instances of `FrozenArray`.

`FrozenArray` inherits from JavaScript's built-in Array. This means it has a `.length`, is an instance of `Array`, and any of the methods that you'd expect like `.forEach` and `.map`.

The methods on `Array` that would typically mutate the array they are called on are reimplemented on
`FrozenArray` to instead return a fresh instance of `FrozenArray`. This includes `push`, `pop`,
`unshift`, `shift`, `sort`, `reverse`, `splice`, and `fill`. `slice` has also been reimplemented, but
its only difference is that it returns a `FrozenArray` instance instead of a normal array.

- `push`: `new FrozenArray(1,2,3).push(5)` -> `[1, 2, 3, 5]`
- `pop`: `new FrozenArray(1,2,3).pop()` -> `[[1, 2], 3]` (`.shift` returns a tuple as well)

## License

ISC

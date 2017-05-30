# Elsa

> Mutability is dangerous, [_let it go_](https://www.youtube.com/watch?v=A_DaizJnnJQ)!

Babel plugin that replaces object and array literals with immutable versions… that have super powers!

[![Build Status](https://travis-ci.org/JonAbrams/elsa.svg?branch=master)](https://travis-ci.org/JonAbrams/elsa)

## Usage

Elsa is a babel plugin, to make use of it, you need to install it:

    npm install --save babel-plugin-elsa

Add elsa as a plugin to your `.babelrc` config file (or babel section of `package.json`):
```json
{
  "plugins": ["babel-plugin-elsa"]
}
```

## Purpose

Immutability is **cool** these days. By never altering the contents of an object or array, and instead cloning them when you want to make a change, you [avoid common bugs](http://www.yegor256.com/2014/06/09/objects-should-be-immutable.html). It's especially popular in [React](https://facebook.github.io/react/) development, but by no means exclusive to React.

There are great libraries out there like [Immutable.js](https://facebook.github.io/immutable-js/) that
provide a bunch of classes for making immutable objects, but wouldn't it be **frosty** to turn the default object and arrays into immutable objects?

Don't worry, there are no more puns past this point, they've been put on **ice**.

Elsa does two things:
- It turns each [object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals) into a `FrozenObject`.
- It changes each [array literal]([array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Array_literals) into a `FrozenArray`.

Both `FrozenObject`s and `FrozenArray`s are immutable classes included with Elsa. If you try to change their contents, they'll raise
a `TypeError` since they've been frozen with [`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze). Assuming you have [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) enabled (which you ought to do).

Elsa will:
```javascript
// Turn this:
const person = {
  name: 'Jon',
  skills: ['ruby', 'javascript']
};

// into:
const person = new FrozenObject({
  name: 'Jon',
  skills: new FrozenArray('ruby', 'javascript')
});
```

Why create these new classes instead of just calling `Object.freeze`? To give them super powers, read on!

## FrozenArray

Elsa turns all array literals (e.g. `const coolNumbers = [1,5,-4,20];`) into instances of `FrozenArray`.

`FrozenArray` inherits from JavaScript's built-in Array. This means it has a `.length`, is an instance of `Array`, and any of the methods that you'd expect like `.forEach` and `.map`.

The methods on `Array` that would typically mutate the array are reimplemented on`FrozenArray` to
instead return a fresh instance of `FrozenArray` with changes applied. This includes `push`, `pop`,
`unshift`, `shift`, `sort`, `reverse`, `splice`, and `fill`.

`slice`, `map`, and other methods that already return new arrays are still available, but
return `FrozenArray` instances instead of a normal mutable array.

`pop` and `shift` return both the _modified_ arrays and the shifted/popped values as two elements inside an array. That way you can do: `[arr, poppedVal] = arr.pop()`.

**Examples:**
- `push`: `new FrozenArray(1,2,3).push(5)` -> `[1, 2, 3, 5]`
- `pop`: `new FrozenArray(1,2,3).pop()` -> `[[1, 2], 3]`
- `unshift`: `new FrozenArray(1,2,3).shift(0)` -> `[0,1,2,3]`
- `shift`: `new FrozenArray(1,2,3).shift()` -> `[[2,3], 1]`
- `sort`: `new FrozenArray(2,1,3).sort((a,b) => a - b)` -> `[1,2,3]`

**Note:** Return values are all instances of FrozenArray

## FrozenObject

Elsa turns all object literals (e.g. `const dog = { name: 'Loki', age: 4 };`) into instances of `FrozenObject`.

`FrozenObject` is identical to a normal JavaScript object, but it has been frozen by `Object.freeze`
and has a special method called `update`, provided by [immutability-helper](https://github.com/kolodny/immutability-helper).

To see all the ways you can get a clone, with changes applied, using `update` see the immutability-helper docs: https://github.com/kolodny/immutability-helper

**One example:**
```javascript
const dog = { name: 'Loki', age: 4, friends: ['Waffles', 'Mochi'] };
const dogClone = dog.update({ name: { $set: 'Loki 2.0' }, friends: { $push: ['Seamus'] } });
// dogClone now contains { name: 'Loki 2.0', age: 4, friends: ['Waffles', 'Mochi', 'Seamus'] }
```

## Opting out of FrozenArray and FrozenObject

Elsa will ignore arrays created with `new Array(1,2,3)` or `Array.of(1,2,3)`, which will produce old
fashioned mutable arrays.

To create mutable objects, you can do `new Object({ name: 'Loki' })`, which Elsa will skip over, resulting in old fashioned mutable objects.

## Gotchas and tips

- Elsa will only alter object and array literals. If you create an object using a function of `new` constructor, it won't be frozen (at least not by Elsa). Only `[…]` and `{…}` are frozen by Elsa.
- Some libraries expect to receive mutable objects as their parameters. If you receive type errors in
libraries that you use, try sending in an object created with `new Object({…})`.
- Elsa only converts your code. Babel, and therefore Elsa, doesn't convert 3rd party modules. This means
that any objects produced by libraries won't be frozen.
- You can freeze objects returned by libraries by wrapping it with `new FrozenObject(…)`.
- If you don't use Elsa as a Babel plugin, you can still use `FrozenArray` and `FrozenObject` with your code. Just do `import FrozenArray from 'babel-plugin-elsa/frozen_array'` and/or `import FrozenObject from 'babel-plugin-elsa/frozen_object'`.

## Sample App

I've written a very basic todo app (of course) that makes use of Elsa.

- [Source with Elsa](https://github.com/JonAbrams/todo-elsa)
- [Source without Elsa](https://github.com/JonAbrams/todo-elsa/tree/07e325445ad3fcb6a1244f85bbbcdac43033d13a)
- [Diff](https://github.com/JonAbrams/todo-elsa/commit/07e325445ad3fcb6a1244f85bbbcdac43033d13a)
- [Live](https://todo-elsa-whylddtmuu.now.sh)

## License

ISC

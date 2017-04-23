const fs = require('fs');
const FrozenArray = require('./frozen_array');
const frozenArrCode = FrozenArray.toString();

module.exports = function elsa({ types: t, transform }) {
  const frozenArrayClassNode = transform(frozenArrCode).ast.program.body[0];

  return {
    visitor: {
      'Program'(path) {
        path.unshiftContainer('body', frozenArrayClassNode);
      },
      ObjectExpression(path) {                    // select new object literals
        if (!t.isCallExpression(path.parent)) {   // Exclude objects passed directly to func calls
                                                  // otherwise causes infinite recursion
          path.replaceWith(                       // wrap in Onject.freeze
            t.callExpression(
              t.memberExpression(t.identifier('Object'), t.identifier('freeze')),
              [path.node]
            )
          );
        }
      },
      ArrayExpression(path) {                     // select new array literals
        const elements = path.node.elements;
                                                  // turn `[1,2,3]` into `new FrozenArray(1,2,3)`
        path.replaceWith(
          t.newExpression(t.identifier('FrozenArray'), elements)
        );
      }
    },
  };
};

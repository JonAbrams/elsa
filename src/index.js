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
      'ObjectExpression|ArrayExpression'(path) {  // select new object and array literals
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
    },
  };
};

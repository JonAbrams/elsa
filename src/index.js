const fs = require('fs');
const packageJson = require('../package.json');

module.exports = function elsa({ types: t, transform }) {
  return {
    visitor: {
      Program(path) {
        const tt = t;
        path.unshiftContainer('body', t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier('FrozenArray'))],
          t.stringLiteral(`${packageJson.name}/frozen_array`)
        ));
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

const fs = require('fs');
const frozenArrCode = fs.readFileSync('./src/frozen_array.js', { encoding: 'utf8' });

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

const packageJson = require('./package.json');

module.exports = function elsa({ types: t }) {
  return {
    visitor: {
      Program(path) {
        path.unshiftContainer('body', t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier('FrozenArray'))],
          t.stringLiteral(`${packageJson.name}/frozen_array`)
        ));
        path.unshiftContainer('body', t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier('FrozenObject'))],
          t.stringLiteral(`${packageJson.name}/frozen_object`)
        ));
      },
      ObjectExpression(path) {                    // select new object literals
                                                  // Ignore literals passed into new FrozenObject()
                                                  // otherwise causes infinite recursion
        if (t.isNewExpression(path.parent) && path.parent.callee.name === 'FrozenObject') return;
                                                  // turn `{ hi: true }` into
        path.replaceWith(                         // `new FrozenObject({ hi: true })`
          t.newExpression(t.identifier('FrozenObject'), [path.node])
        );
      },
      ArrayExpression(path) {                     // select new array literals;
        path.replaceWith(                         // turn `[1,2,3]` into `new FrozenArray(1,2,3)`
          t.newExpression(t.identifier('FrozenArray'), path.node.elements)
        );
      },
    },
  };
};

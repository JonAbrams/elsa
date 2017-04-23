module.exports = function elsa({ types: t }) {
  return {
    visitor: {
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

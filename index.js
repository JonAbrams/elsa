module.exports = function elsa({ types: t }) {
  return {
    visitor: {
      'ObjectExpression|ArrayExpression'(path) {  // select new object and array literals
        var props = path.node.properties;
        if (!t.isCallExpression(path.parent)) {   // Exclude objects passed directly to func calls
                                                  // otherwise causes infinite recursion
          path.replaceWith(                       // wrap in Onject.freeze
            t.callExpression(t.identifier('Object.freeze'), [path.node])
          );
        }
      },
    },
  };
};

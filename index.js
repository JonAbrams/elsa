module.exports = function elsa({ types: t }) {
  return {
    visitor: {
      'ObjectExpression|ArrayExpression'(path) {  // select new object and array literals
        var props = path.node.properties;
        if (
          t.isVariableDeclarator(path.parent) ||  // assigned to variable
          t.isObjectProperty(path.parent) ||      // assigned as an object key
          t.isArrayExpression(path.parent)        // assigned as an array element
        ) {
          path.replaceWith(                       // wrap in Onject.freeze
            t.callExpression(t.identifier('Object.freeze'), [path.node])
          );
        }
      },
    },
  };
};

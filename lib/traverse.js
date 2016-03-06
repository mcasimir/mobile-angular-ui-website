// ie.
//
// var traverse = require('./traverse');
//
// var root = { name: 'R'
//   children: [
//     { name: 'A',
//       children: [ {name: 'B1'}, {name: 'B2'}]  },
//     { name: 'C' }
//   ]
// };
//
// traverse(root, function(n){ console.log('down', n.name) },
//                function(n){ console.log('up', n.name) });
//
// ->
// down R
//   down A
//     down B1
//     up B1
//     down B2
//     up B2
//   up A
//   down C
//   up C
// up R

var traverse = function(node, down, up) {
  if (down && typeof node.forEach !== 'function') {
    down(node);
  }
  var children = typeof node.forEach === 'function' ? node : (node.children || []);
  children.forEach(function(child) {
    traverse(child, down, up);
  });
  if (up && typeof node.forEach !== 'function') {
    up(node);
  }
};

module.exports = function(node, down, up) {
  return traverse(node, down, up);
};

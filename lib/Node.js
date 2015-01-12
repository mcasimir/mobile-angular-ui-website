var _    = require('lodash'),
    slug = require('slug'),
    path = require('path'),
    traverse = require('./traverse');

function setPath(tree, base) {
  base = base || '/';
  var segments = [base];
  traverse(
    tree, 
    function(node) {
      segments.push(node.slug);
      node.path = path.join.apply(null, segments);
    },
    function() {
      segments.pop();
    }
  );
}

function setRoot(tree, root) {
  traverse(
    tree, 
    function(node) {
      node.root = root;
    }
  );
}

/**
 * root = new Node({ type: 'page', title: 'Homepage', contents: '...', slug: '' });
 * page = new Node({ type: 'post', title: 'My Post', meta: { pubdate: new Date() }, contents : '...' });
 *
 * root.append(page);
 *
 * root.path
 * => /
 *
 * page.path
 * => /my-post
 * 
 */
function Node(obj, extras) {
  if (!obj.type) {
    throw new Error('Node constructor needs type to be defined');
  }

  if (!obj.title) {
    throw new Error('Node constructor needs title to be defined');
  }

  _.assign(this, _.omit(extras || {}, [
      'type',
      'title',
      'meta',
      'slug',
      'path',
      'root',
      'parent',
      'children'
    ]));

  this.type  = obj.type;
  this.title = obj.title;
  this.slug = typeof obj.slug === 'string' ? obj.slug : slug(this.title).toLowerCase();
  this.contents = obj.contents;
  this.root = this;
  this.path = path.join('/', this.slug);
  this.parent = null;
  this.children = _([]);
}

Node.prototype.append = function(child) {
  if (!( child instanceof Node)) {
    child = new Node(child);
  }

  child.remove();

  child.parent = this;
  child.root = this.root;

  setPath(child, this.path);
  setRoot(child, this.root);

  this.children.push(child);
  return this;
};

Node.prototype.remove = function() {
  if (this.parent) {
    var idx = this.parent.children.indexOf(this);
    if(idx !== -1) {
      this.parent.children.splice(idx, 1);  
    }
  }
  this.parent = null;
  this.root = this;
  return this;
};

Node.prototype.isRoot = function() {
  return !this.parent;
};

Node.prototype.isLeaf = function() {
  return !this.children || this.children.length === 0;
};

Node.prototype.descendants = function(filter) {
  if (!this.children) { return []; }

  var desc = [];
  
  traverse(this.children, function(node) {
    desc.push(node);
  });

  if (filter) {
    desc = _.where(desc, filter);
  }

  return desc;
};

Node.prototype.hasDescendants = function(filter) {
  return !!this.descendants(filter).length;
};

Node.prototype.ancestors = function(filter) {
  if (!this.parent) { return []; }

  var node = this.parent;
  var anc = [];

  while(node && node.parent){
    anc.push(node);
    node = node.parent;
  }

  if (filter) {
    anc = _.where(anc, filter);
  }

  return anc;
};

Node.prototype.hasAncestors = function(filter) {
  return !!this.ancestors(filter).length;
};

module.exports = Node;
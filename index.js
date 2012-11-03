
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , Set = require('set');

/**
 * Expose `Pillbox`.
 */

module.exports = Pillbox

/**
 * Initialize a `Pillbox` with the given
 * `input` element and `options`.
 *
 * @param {Element} input
 * @param {Object} options
 * @api public
 */

function Pillbox(input, options) {
  if (!(this instanceof Pillbox)) return new Pillbox(input, options);
  var self = this
  this.options = options || {}
  this.input = input;
  this.tags = new Set;
  this.el = document.createElement('div');
  this.el.className = 'pillbox';
  this.el.style = input.style;
  this.ul = document.createElement('ul');
  this.el.appendChild(this.ul);
  input.parentNode.insertBefore(this.el, input);
  input.parentNode.removeChild(input);
  this.el.appendChild(input);

  this.el.onclick = function(){
    input.focus();
  };

  input.onkeyup = function(e){
    if (e.which === 13) {
      e.preventDefault()
      self.add(e.target.value)
      e.target.value = ''
    }
  };
}

/**
 * Mixin emitter.
 */

Emitter(Pillbox.prototype);

/**
 * Add `tag`.
 *
 * @param {String} tag
 * @return {Pillbox} self
 * @api public
 */

Pillbox.prototype.add = function(tag) {
  var self = this
  tag = tag.trim();

  // blank
  if ('' == tag) return;

  // exists
  if (this.tags.has(tag)) return;

  // add it
  this.tags.add(tag);

  // list item
  var li = document.createElement('li');
  li.setAttribute('data', tag);
  li.innerText = tag;
  li.onclick = function(e) {
    e.preventDefault();
    self.input.focus();
  };

  // delete link
  var del = document.createElement('a');
  del.innerText = '✕';
  del.href = '#';
  del.onclick = this.remove.bind(this, tag);
  li.appendChild(del);

  this.ul.appendChild(li);
  this.emit('add', tag);

  return this;
}

/**
 * Remove `tag`.
 *
 * @param {String} tag
 * @return {Pillbox} self
 * @api public
 */

Pillbox.prototype.remove = function(tag) {
  if (!this.tags.has(tag)) return this;
  this.tags.remove(tag);

  var li;
  for (var i = 0; i < this.ul.childNodes.length; ++i) {
    li = this.ul.childNodes[i];
    if (tag == li.getAttribute('data')) break;
  }

  this.ul.removeChild(li);
  this.emit('remove', tag);

  return this;
}


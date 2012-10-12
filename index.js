
/**
 * Module dependencies.
 */

var Emitter = require('emitter');

/**
 * Expose `TagInput`.
 */

module.exports = TagInput


/**
 * Initialize a `TagInput` with the given
 * `input` element and `options`.
 *
 * @param {Element} input
 * @param {Object} options
 * @api public
 */

function TagInput(input, options) {
  if (!(this instanceof TagInput)) return new TagInput(input, options);
  var self = this
  this.options = options || {}
  this.tags = [];
  this.input = input;
  this.el = document.createElement('div');
  this.el.className = 'tag-input';
  this.el.style = input.style;
  this.ul = document.createElement('ul');
  this.el.appendChild(this.ul);
  input.parentNode.insertBefore(this.el, input);
  input.parentNode.removeChild(input);
  this.el.appendChild(input);

  input.onkeyup = function (e) {
    if (e.which === 13) {
      e.preventDefault()
      self.add(e.target.value)
      e.target.value = ''
    }
  }
}

/**
 * Mixin emitter.
 */

Emitter(TagInput.prototype)

/**
 * Add `tag`.
 *
 * @param {String} tag
 * @return {TagInput} self
 * @api public
 */

TagInput.prototype.add = function(tag) {
  var self = this
  if (this.tags.indexOf(tag) !== -1)
    return

  this.tags.push(tag)

  var li = document.createElement('li')
  li.setAttribute('data', tag)
  li.innerText = tag
  li.onclick = function (e) {
    e.preventDefault()
    self.input.focus()
  }

  var del = document.createElement('a')
  del.innerText = 'x'
  del.href = '#'
  del.onclick = this.remove.bind(this, tag)
  li.appendChild(del)

  this.ul.appendChild(li)

  this.emit('add', tag)
  return this;
}

TagInput.prototype.remove = function(tag) {
  var i = this.tags.indexOf(tag)
  if (i === -1)
    return

  this.tags.splice(i, 1)

  var children = this.ul.childNodes
  var child
  for (i = 0; i < children.length; i++) {
    child = children[i]
    if (child.getAttribute('data') === tag)
      break;
  }
  this.ul.removeChild(child)

  this.emit('remove', tag)
}



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
 * `input` element and `opts`.
 *
 * @param {Element} input
 * @param {Object} opts
 * @api public
 */

function TagInput(input, opts) {
  if (!(this instanceof TagInput)) return new TagInput(input, opts)
  var self = this
  this.opts = opts || {}

  this.model = { tags: [] }
  this.view = { container: null, tags: null, input: input }

  this.view.container = document.createElement('div')
  this.view.container.className = 'tag-input'
  this.view.container.style = input.style
  this.view.tags = document.createElement('ul')

  this.view.container.appendChild(this.view.tags)
  input.parentNode.insertBefore(this.view.container, input)

  input.parentNode.removeChild(input)
  this.view.container.appendChild(input)

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
  if (this.model.tags.indexOf(tag) !== -1)
    return

  this.model.tags.push(tag)

  var li = document.createElement('li')
  li.setAttribute('data', tag)
  li.innerText = tag
  li.onclick = function (e) {
    e.preventDefault()
    self.view.input.focus()
  }

  var del = document.createElement('a')
  del.innerText = 'x'
  del.href = '#'
  del.onclick = this.remove.bind(this, tag)
  li.appendChild(del)

  this.view.tags.appendChild(li)

  this.emit('add', tag)
  return this;
}

TagInput.prototype.remove = function(tag) {
  var i = this.model.tags.indexOf(tag)
  if (i === -1)
    return

  this.model.tags.splice(i, 1)

  var children = this.view.tags.childNodes
  var child
  for (i = 0; i < children.length; i++) {
    child = children[i]
    if (child.getAttribute('data') === tag)
      break;
  }
  this.view.tags.removeChild(child)

  this.emit('remove', tag)
}

TagInput.prototype.tags = function () {
  return this.model.tags
}



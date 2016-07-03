'use strict'

const Emitter = require('component-emitter')
const horsey = require('horsey')



const yes = () => true
const id = (x) => x

const completion = (container, opt) => {
	const out = new Emitter()
	const ui = container.querySelector('input.ui')
	const field = container.querySelector('input.field')
	const completion = horsey(ui, {
		  suggestions: opt.suggest, appendTo: container
		, filter: yes, getText: opt.render, getValue: id
		, set: (l) => {
			ui.value = opt.render(l)
			field.value = opt.value(l)
			out.emit('value', l)
			completion.clear()
			setTimeout(() => ui.blur(), 10)
		}
	})
	completion.hide()
	return out
}

module.exports = completion

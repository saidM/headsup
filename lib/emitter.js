'use strict'

const {EventEmitter} = require('events')

class Emitter extends EventEmitter {
  constructor() {
    super()

    this.on('pay', this.onPay)
  }

  onPay(name, amount, description) {
  }
}

module.exports = Emitter

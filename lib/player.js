'use strict'
 
class Player {
  constructor(name) {
    this.name = name
    this.chips = 1000
    this.cards = []
  }

  pay(amount, description = null) {
    this.chips -= amount
  }

  win(amount) {
    this.chips += amount
  }
}

module.exports = Player

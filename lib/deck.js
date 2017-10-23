'use strict'

const cards = require('./cards')

class Deck {
  constructor() {
    this.cards = cards.generateDeck()
  }

  getCards(count) {
    const cards = []

    for (let i = 0; i < count; i++) {
      const card = this.cards[Math.floor(Math.random() * this.cards.length)]
      
      cards.push(card)
      this.cards.splice(card, 1)
    }

    return cards
  }
}

module.exports = Deck

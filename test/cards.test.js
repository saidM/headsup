'use strict'

const expect = require('chai').expect
const cards = require('../lib/cards')

describe('Cards', () => {
  describe('generateDeck()', () => {
    it('generates a deck of 52 cards', () => {
      expect(cards.generateDeck().length).to.equal(52)
    })

    it('generates 4 colors for each rank', () => {
      const deck = cards.generateDeck()

      const aces = deck.filter(card => card.rank === 'Ace')
      const twos = deck.filter(card => card.rank === 2)

      expect(aces.length).to.equal(4)
      expect(twos.length).to.equal(4)
    })
  })
})

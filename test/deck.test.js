'use strict'

const expect = require('chai').expect
const Deck = require('../lib/deck')

describe('Deck', () => {
  describe('constructor()', () => {
    it('generates a deck of 52 cards', () => {
      const myDeck = new Deck()
      expect(myDeck.cards.length).to.equal(52)
    })
  })

  describe('getCards(count)', () => {
    it('returns X cards from the deck', () => {
      const myDeck = new Deck()
      const cards = myDeck.getCards(2)
      
      expect(cards.length).to.equal(2)
      expect(myDeck.cards.length).to.equal(50)
    })
  })
})

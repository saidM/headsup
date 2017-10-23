'use strict'

const expect = require('chai').expect
const sinon = require('sinon')

const cards = require('../lib/cards')
const combos = require('../lib/combos')

describe('Combos', () => {
  describe('hasPair(cards)', () => {
    it('returns true if there is one pair', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.hasPair(deck)).to.equal(true)
    })
    
    it('returns false if there is no pair', () => {
      const deck = [{rank: 2}, {rank: 3}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.hasPair(deck)).to.equal(false)
    })
  })
  
  describe('hasFlush(cards)', () => {
    it('returns true if there is a flush', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 5}, {rank: 6}]
      deck.forEach(card => card.color = 'Diamonds')

      expect(combos.hasFlush(deck)).to.equal(true)
    })
    
    it('returns false if there is no flush', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.hasFlush(deck)).to.equal(false)
    })
  })

  describe('getScore(cards)', () => {
    it('returns 0 if there is no combination', () => {
      const deck = [{rank: 2}, {rank: 3}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.getScore(deck)).to.equal(0)
    })

    it('returns 1 if there is a pair', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.getScore(deck)).to.equal(1)
    })
    
    it('returns 2 if there is a flush', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 5}, {rank: 6}]
      deck.forEach(card => card.color = 'Diamonds')
      expect(combos.getScore(deck)).to.equal(2)
    })
  })
})

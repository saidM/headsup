'use strict'

const expect = require('chai').expect
const combos = require('../lib/combos')

describe('Combos', () => {
  describe('pair(cards)', () => {
    it('returns true if there is one pair', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.pair(deck)).to.equal(true)
    })

    it('returns false if there is no pair', () => {
      const deck = [{rank: 2}, {rank: 3}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.pair(deck)).to.equal(false)
    })
  })

  describe('twoPairs(cards)', () => {
    it('returns true if there are 2 pairs', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 4}, {rank: 6}]
      expect(combos.twoPairs(deck)).to.equal(true)
    })

    it('returns false if there is not 2 pairs', () => {
      const deck = [{rank: 2}, {rank: 3}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.twoPairs(deck)).to.equal(false)
    })
  })

  describe('threeOfAkind(cards)', () => {
    it('returns true if there are 3 identical cards (ranks only)', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 2}, {rank: 4}, {rank: 6}]
      expect(combos.threeOfAKind(deck)).to.equal(true)
    })

    it('returns false if there is not 3 identical cards', () => {
      const deck = [{rank: 2}, {rank: 3}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.threeOfAKind(deck)).to.equal(false)
    })
  })

  describe('flush(cards)', () => {
    it('returns true if there is a flush', () => {
      const deck = []

      for (let i = 1; i < 6; i++) {
        deck.push({rank: i, color: 'Diamonds'})
      }

      expect(combos.flush(deck)).to.equal(true)
    })

    it('returns false if there is no flush', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.flush(deck)).to.equal(false)
    })
  })

  describe('score(cards)', () => {
    it('returns 0 if there is no combination', () => {
      const deck = [{rank: 2}, {rank: 3}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.score(deck)).to.equal(0)
    })

    it('returns 1 if there is a pair', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 5}, {rank: 6}]
      expect(combos.score(deck)).to.equal(1)
    })

    it('returns 2 if there are two pairs', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 4}, {rank: 4}, {rank: 6}]
      expect(combos.score(deck)).to.equal(2)
    })

    it('returns 3 if there is a three of a kind', () => {
      const deck = [{rank: 2}, {rank: 2}, {rank: 2}, {rank: 4}, {rank: 6}]
      expect(combos.score(deck)).to.equal(3)
    })

    it('returns 4 if there is a flush', () => {
      const deck = []

      for (let i = 1; i < 6; i++) {
        deck.push({rank: i, color: 'Diamonds'})
      }

      expect(combos.score(deck)).to.equal(4)
    })
  })
})

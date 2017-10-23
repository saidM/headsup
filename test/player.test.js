'use strict'

const expect = require('chai').expect

const Player = require('../lib/player')

describe('Player', () => {
  describe('constructor()', () => {
    it('has a name', () => {
      const player = new Player('Saïd')
      expect(player.name).to.equal('Saïd')
    })

    it('has a chips count', () => {
      const player = new Player('Saïd')
      expect(player.chips).to.equal(1000)
    })
    
    it('has a cards array', () => {
      const player = new Player('Saïd')
      expect(Array.isArray(player.cards)).to.be.true
    })
  })

  describe('pay(amount, description = null)', () => {
    it(`diminishes the player's chips count`, () => {
      const player = new Player('Saïd')
      
      player.pay(10)
      expect(player.chips).to.equal(990)
    })
  })

  describe('win(amount)', () => {
    it('adds the amount to the chips count', () => {
      const player = new Player('Player')

      player.win(100)
      expect(player.chips).to.equal(1100)

      player.win(50)
      expect(player.chips).to.equal(1150)
    })
  })
})

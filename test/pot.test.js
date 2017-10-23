'use strict'

const expect = require('chai').expect
const Pot = require('../lib/pot')

describe('Pot', () => {
  describe('constructor()', () => {
    it('generates an item array', () => {
      const pot = new Pot()
      expect(Array.isArray(pot.items)).to.be.true
    })
  })

  describe('add(name, amount, description = null)', () => {
    it('adds an item to the array', () => {
      const pot = new Pot()
      
      pot.add('Saïd', 100)
      expect(pot.items[0].name).to.equal('Saïd')
      expect(pot.items[0].amount).to.equal(100)
      expect(pot.items[0].description).to.be.null
      
      pot.add('Saïd', 200, 'RAISE')
      expect(pot.items[1].name).to.equal('Saïd')
      expect(pot.items[1].amount).to.equal(200)
      expect(pot.items[1].description).to.equal('RAISE')
      
      expect(pot.items.length).to.equal(2)
    })
  })

  describe('toCall(name)', () => {
    it('returns the correct amount', () => {
      const pot = new Pot()

      pot.items = [
        {name: 'Saïd', amount: 100},
        {name: 'Saïd', amount: 200},
        {name: 'Fouzia', amount: 500}
      ]

      expect(pot.toCall('Saïd')).to.equal(200)
    })
  })

  describe('total()', () => {
    it('returns the sum of all the items in the pot', () => {
      const pot = new Pot()

      pot.items = [
        {name: 'Saïd', amount: 100},
        {name: 'Saïd', amount: 200},
        {name: 'Fouzia', amount: 500}
      ]

      expect(pot.total()).to.equal(800)
    })
  })
})

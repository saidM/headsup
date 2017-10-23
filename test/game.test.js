'use strict'

const expect = require('chai').expect
const sinon = require('sinon')

const Game = require('../lib/game')
const combos = require('../lib/combos')

describe('Game', () => {
  describe('constructor()', () => {
    it('generates 2 players', () => {
      const game = new Game()
      expect(game.players.length).to.equal(2)
    })
  })

  describe('start()', () => {
    it('generates a deck', () => {
      const game = new Game()
      game.start()
      
      expect(game.deck).to.be.an('object')
    })

    it('generates a pot', () => {
      const game = new Game()
      game.start()
      
      expect(game.pot).to.be.an('object')
    })

    it('generates 2 cards for each player', () => {
      const game = new Game()
      game.start()

      expect(game.players[0].cards.length).to.equal(2)
      expect(game.players[1].cards.length).to.equal(2)
    })

    it('makes each player pay their blind', () => {
      const game = new Game()
      game.start()
      
      expect(game.players[0].chips).to.equal(990)
      expect(game.players[1].chips).to.equal(980)
    })

    it('sets the amount to call to 10', () => {
      const game = new Game()
      game.start()

      expect(game.pot.toCall('Player')).to.equal(10)
    })
  })

  describe('pay(name, amount, description)', () => {
    it('calls the pay() method on the Player instance', () => {
      const game = new Game()
      const spy = sinon.spy(game.players[0], 'pay')

      game.start()
      game.pay('Player', 10)

      // Called twice (one for the small blind from the start() method & one time for the explicit pay())
      expect(spy.called).to.be.true
    })

    it('calls the add() method on the Pot instance', () => {
      const game = new Game()
      game.start()

      const spy = sinon.spy(game.pot, 'add')
      game.pay('Player', 10)

      expect(spy.called).to.be.true
    })

    it('rounds the amount', () => {
      const game = new Game()
      game.start()

      const spy = sinon.spy(game.pot, 'add')
      game.pay('Player', 10.5)

      expect(spy.calledWith('Player', 10)).to.be.true
    })
  })

  describe('fold(name)', () => {
    it('calls the win() method on the winner', () => {
      const game = new Game()
      game.start()

      const spy = sinon.spy(game.players[1], 'win')
      game.fold('Player')

      expect(spy.calledOnce).to.be.true
    })

    it('calls the start() method', () => {
      const game = new Game()
      game.start()

      const spy = sinon.spy(game, 'start')
      game.fold('Player')

      expect(spy.calledOnce).to.be.true
    })
  })

  describe('call(name)', () => {
    it('calls the pay() method on the player', () => {
      const game = new Game()
      game.start()

      const spy = sinon.spy(game.players[0], 'pay')
      game.call('Player')

      expect(spy.calledWith(10, 'CALL')).to.be.true
    })

    it('sets the amount to call to zero', () => {
      const game = new Game()
      game.start()

      expect(game.toCall).to.equal(10)
      game.call('Player')
      expect(game.toCall).to.equal(0)
    })

    context('when there is no flop', () => {
      it('generates the flop', () => {
        const game = new Game()
        game.start()

        game.call('Player')
        expect(game.flop.length).to.equal(3)
      })
    })

    context('when there is a flop', () => {
      it('generates the turn', () => {
        const game = new Game()
        game.start()

        game.flop = [{}, {}, {}]

        game.call('Player')
        expect(game.turn).not.to.be.null
      })
    })
    
    context('when there is a flop and a turn', () => {
      it('generates the river', () => {
        const game = new Game()
        game.start()

        game.flop = [{}, {}, {}]
        game.turn = {}

        game.call('Player')
        expect(game.river).not.to.be.null
      })
    })

    context('when there is a flop, a turn and a river', () => {
      it('calls the end() method', () => {
        const game = new Game()
        game.start()

        game.flop = [{}, {}, {}]
        game.turn = {}
        game.river = {}

        const spy = sinon.spy(game, 'end')
        game.call('Player')

        expect(spy.calledOnce).to.be.true
      })
    })
  })

  describe('raise(name, amount)', () => {
    it('calls the pay() method on the player instance', () => {
      const game = new Game()
      game.start()

      const spy = sinon.spy(game.players[1], 'pay')
      game.raise('Computer', 10)

      expect(spy.calledOnce).to.be.true
      expect(spy.calledWith(10, 'RAISE')).to.be.true
    })
    
    it('updates the amount to call', () => {
      const game = new Game()
      game.start()

      game.raise('Computer', 50)
      expect(game.toCall).to.equal(50)
    })
  })

  describe('end()', () => {
    it('calls the getScore() method for each player', () => {
      const game = new Game()
      
      game.start()
      game.flop = game.deck.getCards(3)

      const spy = sinon.spy(combos, 'getScore')
      game.end()

      expect(spy.calledTwice).to.be.true
    })

    it('calls the win() method on the winner', () => {
      const game = new Game()
      
      game.start()
      game.flop = game.deck.getCards(3)

      const playerSpy = sinon.spy(game.players[0], 'win')
      const computerSpy = sinon.spy(game.players[1], 'win')

      game.end()
      expect(playerSpy.calledOnce || computerSpy.calledOnce).to.be.true
    })

    it('calls the start() method', () => {
      const game = new Game()
      game.start()

      game.flop = game.deck.getCards(3)
      const spy = sinon.spy(game, 'start')
      
      game.end()
      expect(spy.calledOnce).to.be.true
    })
  })
})

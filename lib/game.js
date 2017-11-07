'use strict'

const Deck = require('./deck')
const Player = require('./player')
const Pot = require('./pot')
const combos = require('./combos')

class Game {
  constructor() {
    this.players = [new Player('Player'), new Player('Computer')]
    this.smallBlind = true
  }

  start() {
    this.deck = new Deck()
    this.pot = new Pot()
    this.flop = []
    this.turn = null
    this.river = null

    // Generate 2 cards for each players
    this.players.forEach(player => player.cards = this.deck.getCards(2))

    // Make each player pays their respective blind
    if (this.smallBlind) {
      this.pay('Player', 10, 'SMALL_BLIND')
      this.pay('Computer', 20, 'BIG_BLIND')
    } else {
      this.pay('Computer', 10, 'SMALL_BLIND')
      this.pay('Player', 20, 'BIG_BLIND')
    }

    this.smallBlind = !this.smallBlind
    this.toCall = this.pot.toCall('Player')

    // If it's the computer turn, generate a random action for it
    if (this.toCall <= 0) {
      const random = Math.floor(Math.random() * (10 - 1 + 1)) + 1
      if (random > 7) { 
        this.call('Computer')
      } else if (random > 3) {
        this.raise('Computer', 100)
      } else {
        this.fold('Computer')
      }
    }
  }

  pay(name, amount, description) {
    const player = this.players.find(player => player.name === name)

    player.pay(Math.floor(amount), description)
    this.pot.add(name, Math.floor(amount), description)
  }

  fold(name) {
    const winner = this.players.find(player => player.name !== name)
    winner.win(this.pot.total())

    this.winner = {name: winner.name, total: this.pot.total()}
    this.start()
  }

  call(name) {
    this.pay(name, this.pot.toCall(name), 'CALL')

    if (this.flop.length === 0) {
      this.flop = this.deck.getCards(3)
    } else if (this.flop.length === 3 && this.turn === null) {
      this.turn = this.deck.getCards(1)
    } else if (this.flop.length == 3 && this.turn !== null && this.river === null) {
      this.river = this.deck.getCards(1)
    } else if (this.flop.length == 3 && this.turn !== null && this.river !== null) {
      this.end()
    }

    this.toCall = 0
  }

  raise(name, amount) {
    this.pay(name, amount, 'RAISE')
    this.toCall = amount
  }

  end() {
    const publicCards = this.flop.concat(this.turn).concat(this.river).filter(card => card !== null)

    const playerScore = combos.score(publicCards.concat(this.players[0].cards))
    const computerScore = combos.score(publicCards.concat(this.players[1].cards))
    
    if (playerScore > computerScore) {
      this.players[0].win(this.pot.total())
      this.winner = {name: this.players[0].name, total: this.pot.total()}
    } else {
      this.players[1].win(this.pot.total())
      this.winner = {name: this.players[1].name, total: this.pot.total()}
    }

    this.start()
  }
}

module.exports = Game

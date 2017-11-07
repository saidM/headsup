'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const Game = require('./lib/game')
const Deck = require('./lib/deck')
const Pot = require('./lib/pot')
const Player = require('./lib/player')

app.set('view engine', 'ejs')
app.use(express.static('public'))


let socket = null
const game = new Game()
game.start()

app.get('/', (req, res) => {
  const player = game.players.find(player => player.name === 'Player')
  const computer = game.players.find(player => player.name === 'Computer')

  if (req.query.action === 'fold') {
    game.fold('Player')
  } else if (req.query.action === 'call') {
    game.call('Player')
    
    // Computer action following the Player's call
    const random = Math.floor(Math.random() * (10 - 1 + 1)) + 1
    if (random > 2) {
      game.raise('Computer', game.pot.total())
    } else {
      game.fold('Computer')
    }
  } else if (req.query.action === 'raise') {
    game.raise('Player', req.query.amount)

    // Computer action following the Player's raise
    const random = Math.floor(Math.random() * (10 - 1 + 1)) + 1
    if (random > 2) {
      game.call('Computer')
    } else {
      game.fold('Computer')
    }
  }

  if (game.winner !== null) {
    if (socket) socket.emit('end', game.winner)
    game.winner = null
  }

  if (player.chips <= 0) {
    return res.send('YOU LOST')
  }
  
  if (computer.chips <= 0) {
    return res.send('YOU WIN')
  }

  res.render('index.ejs', {chips: player.chips, computerChips: computer.chips, cards: player.cards, pot: game.pot, flop: game.flop, toCall: game.toCall, turn: game.turn, river: game.river, potTotal: game.pot.total()})
})

server.listen(3000, '127.0.0.1')

io.on('connection', connection => {
  socket = connection
})

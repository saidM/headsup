'use strict'

const hasPair = cards => {
  const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']

  let pair = false
  for (const rank of ranks) {
    const rankCards = cards.filter(card => card.rank === rank)
    if (rankCards.length > 1) {
      pair = true
    }
  }

  return pair
}

const hasFlush = cards => {
  const colors = ['Clubs', 'Diamonds', 'Hearts', 'Spades']

  let flush = false
  for (const color of colors) {
    const colorCards = cards.filter(card => card.color === color)
    if (colorCards.length === 5) {
      flush = true
    }
  }

  return flush
}

const getScore = cards => {
  if (hasFlush(cards)) {
    return 2
  } else if (hasPair(cards)) {
    return 1
  }

  return 0
}

module.exports = {hasPair, hasFlush, getScore}

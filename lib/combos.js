'use strict'

const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
const COLORS = ['Clubs', 'Diamonds', 'Hearts', 'Spades']

/**
 * Is there one pair?
 * @param {Object[]} cards
 * @return {Boolean}
 */
const pair = cards => {
  let present = false

  for (const rank of RANKS) {
    if (cards.filter(card => card.rank === rank).length === 2) {
      present = true
    }
  }

  return present
}

/**
 * Are there two pairs?
 * @param {Object[]} cards
 * @return {Boolean}
 */
const twoPairs = cards => {
  let count = 0

  for (const rank of RANKS) {
    if (cards.filter(card => card.rank === rank).length === 2) {
      count++
    }
  }

  return count === 2
}

/**
 * Are there three cards with the same rank?
 * @param {Object[]} cards
 * @return {Boolean}
 */
const threeOfAKind = cards => {
  let present = false

  for (const rank of RANKS) {
    if (cards.filter(card => card.rank === rank).length === 3) {
      present = true
    }
  }

  return present
}

/**
 * Are there 5 cards with the same color?
 * @param {Object[]} cards
 * @return {Boolean}
 */
const flush = cards => {
  let present = false

  for (const color of COLORS) {
    if (cards.filter(card => card.color === color).length === 5) {
      present = true
    }
  }

  return present
}

/**
 * Returns a score based on the combination there is
 * @param {Object[]} cards
 * @param {Integer} score
 */
const score = cards => {
  if (flush(cards)) {
    return 4
  } else if (threeOfAKind(cards)) {
    return 3
  } else if (twoPairs(cards)) {
    return 2
  } else if (pair(cards)) {
    return 1
  }

  return 0
}

module.exports = {pair, twoPairs, threeOfAKind, flush, score}

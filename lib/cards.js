'use strict'

/**
 * Generates a deck of 52 cards
 * @return {Object} deck
 */
const generateDeck = () => {
  const deck = []
  const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
  const colors = ['Clubs', 'Diamonds', 'Hearts', 'Spades']

  for (const rank of ranks) {
    for (const color of colors) {
      deck.push({color, rank})
    }
  }

  return deck
}

module.exports = {generateDeck}

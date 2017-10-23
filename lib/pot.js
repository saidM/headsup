'use strict'

class Pot {
  constructor() {
    this.items = []
  }

  add(name, amount, description = null) {
    this.items.push({name, amount, description})
  }

  toCall(name) {
    const mine = this.items.filter(item => item.name === name)
    const his = this.items.filter(item => item.name !== name)

    let mineTotal = 0, hisTotal = 0
    mine.forEach(item => mineTotal += item.amount)
    his.forEach(item => hisTotal += item.amount)

    return hisTotal - mineTotal
  }

  total() {
    let total = 0
    this.items.forEach(item => total += item.amount)
    return total
  }
}

module.exports = Pot

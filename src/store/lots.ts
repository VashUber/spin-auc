import { action, autorun, makeObservable, observable } from 'mobx'

class LotsStore {
  lots = new Map<string, number>()
  bank = 0

  constructor() {
    makeObservable(this, {
      lots: observable,
      bank: observable,
      addLot: action.bound
    })
  }

  createRandomMap() {
    let prev = 0
    const map = new Map<string, [min: number, max: number]>()

    for (const [k, v] of this.lots) {
      map.set(k, [prev + 1, prev + v])
      prev += v
    }

    return map
  }

  getWinner() {
    const random = Math.floor(Math.random() * this.bank) + 1
    for (let [k, v] of this.createRandomMap()) {
      if (random >= v[0] && random <= v[1]) return k
    }
  }

  addLot({ key, value }: { key: string; value: number }) {
    this.bank += value
    this.lots.set(key, (this.lots.get(key) ?? 0) + value)
  }
}

export const lotsStore = new LotsStore()
autorun(() => {
  console.log(lotsStore.bank)
})

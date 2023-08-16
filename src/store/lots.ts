import { action, makeObservable, observable } from 'mobx';

class LotsStore {
  lots = new Map<string, number>();
  bank = 0;
  max = 0;

  constructor() {
    makeObservable(this, {
      lots: observable,
      bank: observable,
      max: observable,
      addLot: action.bound
    });
  }

  createRandomMap() {
    let prev = 0;
    const map = new Map<string, [min: number, max: number]>();

    for (const [k, v] of this.lots) {
      map.set(k, [prev + 1, prev + v]);
      prev += v;
    }

    return map;
  }

  getWinner(): [key: string, angle: number] {
    const random = Math.floor(Math.random() * this.bank) + 1;
    let prevAngle = 0;

    for (let [k, v] of this.createRandomMap()) {
      const currAngle = (Math.PI * 2 * this.lots.get(k)!) / this.bank;
      const randomAngle = Math.random() * currAngle + prevAngle;
      prevAngle += currAngle;

      if (random >= v[0] && random <= v[1])
        return [k, 270 - randomAngle * (180 / Math.PI)];
    }

    return ['', 0];
  }

  addLot({ key, value }: { key: string; value: number }) {
    if (this.max < value) {
      this.max = value;
    }
    this.bank += value;
    this.lots.set(key, (this.lots.get(key) ?? 0) + value);
  }
}

export const lotsStore = new LotsStore();

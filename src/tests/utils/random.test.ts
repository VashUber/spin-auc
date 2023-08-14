import { expect, test } from 'vitest';
import { lotsStore } from '~/store';

test('Testing random chances', () => {
  lotsStore.addLot({ key: '1', value: 120 }); // 0.12
  lotsStore.addLot({ key: '2', value: 250 }); // 0.25
  lotsStore.addLot({ key: '3', value: 630 }); // 0.63

  const keys = {
    '1': 0,
    '2': 0,
    '3': 0
  };

  const count = 100 * 100 * 100 * 15;

  for (let i = 0; i < count; i++) {
    keys[lotsStore.getWinner()! as keyof typeof keys]++;
  }

  expect(keys[1] / count).toBeCloseTo(0.12, 3);
  expect(keys[2] / count).toBeCloseTo(0.25, 3);
  expect(keys[3] / count).toBeCloseTo(0.63, 3);
});

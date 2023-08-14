const helper = () => {
  const rand = Math.floor(Math.random() * 2);

  return rand === 0
    ? [140, Math.floor(Math.random() * 255)]
    : [Math.floor(Math.random() * 255), 140];
};

export const randomColor = () => {
  /*
    Наиболее красивыми цветами мне показались, выбранные таким методом:
    один цвет 255, другой 140, третий рандомный
  */

  const rand1 = Math.floor(Math.random() * 3);

  let r = 0;
  let g = 0;
  let b = 0;

  if (rand1 === 0) {
    r = 255;
    [g, b] = helper();
  } else if (rand1 === 1) {
    g = 255;
    [r, b] = helper();
  } else if (rand1 === 2) {
    b = 255;
    [g, r] = helper();
  }

  return `rgba(${r},${g},${b})`;
};

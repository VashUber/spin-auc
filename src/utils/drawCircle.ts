import { randomColor } from './randomColor';

export const drawCircle = (
  canvas: HTMLCanvasElement,
  colorMap: Record<string, string>,
  degreeMap: Record<string, number>,
  lots: Map<string, number>,
  bank: number
) => {
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = centerX - 10;

  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.stroke();

  let prev = 0;

  for (const [key, value] of lots) {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);

    const curr = (Math.PI * 2 * value) / bank;
    ctx.arc(centerX, centerY, radius - 2, prev, prev + curr);

    if (!colorMap[key]) {
      colorMap[key] = randomColor();
    }

    ctx.fillStyle = colorMap[key];
    ctx.fill();
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.save();

    const textX = centerX + Math.cos(prev + curr / 2) * (radius - 150);
    const textY = centerY + Math.sin(prev + curr / 2) * (radius - 150);

    const randomAngle = Math.random() * curr + prev;
    degreeMap[key] = 270 - randomAngle * (180 / Math.PI);

    // предыдущая версия скролит всегда до центра, сейчас в рандомную область
    // degreeMap[key] = 270 - (prev + curr / 2) * (180 / Math.PI);

    ctx.font = '22px Helvetica';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(key, textX, textY);
    ctx.restore();
    prev += curr;
  }
};

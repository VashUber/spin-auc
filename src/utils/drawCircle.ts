import { randomColor } from './randomColor';

export const drawCircle = (
  canvas: HTMLCanvasElement,
  colorMap: Record<string, string>,
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

    if (value / bank >= 1 / 25) {
      let text = key;
      if (text.length >= 18) {
        text = text.slice(0, 18) + '...';
      }

      ctx.save();
      const textX = centerX + Math.cos(prev + curr / 2) * (radius - 200);
      const textY = centerY + Math.sin(prev + curr / 2) * (radius - 200);

      ctx.font = '18px Helvetica';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'start';
      ctx.textBaseline = 'middle';
      ctx.translate(textX, textY);
      ctx.rotate(prev + curr / 2);
      ctx.translate(-textX, -textY);
      ctx.fillText(text, textX, textY);
    }

    ctx.restore();
    prev += curr;
  }
};

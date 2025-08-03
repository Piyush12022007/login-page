// ========== Neon Canvas Cursor Trail ==========
const canvas = document.getElementById("neon-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const neonTrail = [];
const maxLength = 60;

document.addEventListener("mousemove", (e) => {
  neonTrail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
  if (neonTrail.length > maxLength) {
    neonTrail.shift();
  }
});

function drawTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (neonTrail.length < 2) {
    requestAnimationFrame(drawTrail);
    return;
  }

  for (let i = 1; i < neonTrail.length - 1; i++) {
    const p0 = neonTrail[i - 1];
    const p1 = neonTrail[i];
    const p2 = neonTrail[i + 1];

    const xc1 = (p0.x + p1.x) / 2;
    const yc1 = (p0.y + p1.y) / 2;
    const xc2 = (p1.x + p2.x) / 2;
    const yc2 = (p1.y + p2.y) / 2;

    ctx.beginPath();
    ctx.moveTo(xc1, yc1);
    ctx.quadraticCurveTo(p1.x, p1.y, xc2, yc2);

    ctx.strokeStyle = `rgba(255, 0, 255, ${p1.alpha})`;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 24;
    ctx.shadowColor = "magenta";
    ctx.stroke();

    p1.alpha *= 0.92;
  }

  while (neonTrail.length > 0 && neonTrail[0].alpha < 0.02) {
    neonTrail.shift();
  }

  requestAnimationFrame(drawTrail);
}

drawTrail();

// ========== Random Dark Background Gradient ==========
function getRandomDarkColor() {
  const h = Math.floor(Math.random() * 360);
  const s = 40 + Math.random() * 30;
  const l = 10 + Math.random() * 15;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function applyRandomGradient() {
  const color1 = getRandomDarkColor();
  const color2 = getRandomDarkColor();
  const color3 = getRandomDarkColor();

  document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
  document.body.style.backgroundSize = "400% 400%";
  document.body.style.animation = "gradientShift 15s ease infinite";
}

applyRandomGradient();

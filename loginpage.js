// ========== DODGING LOGIN BUTTON + WARNINGS ==========
const form = document.querySelector("form");
const button = document.querySelector("button");
const usernameInput = document.querySelector("input[type='text']");
const passwordInput = document.querySelector("input[type='password']");
const warnMsg = document.getElementById("warn-msg");
const playMsg = document.getElementById("play-msg");

let dodgeCount = 0;
let dodging = false;

button.addEventListener("mouseenter", () => {
  if (!usernameInput.value || !passwordInput.value) {
    if (!dodging) dodgeButton();
    showWarning();
  } else {
    hideWarning();
  }
});

form.addEventListener("submit", function (e) {
  if (!usernameInput.value || !passwordInput.value) {
    e.preventDefault();
    dodgeButton();
    showWarning();
  } else {
    e.preventDefault();
    hideWarning();
    window.location.href = "dashboard.html";
  }
});

function dodgeButton() {
  dodging = true;
  dodgeCount++;
  const direction = dodgeCount % 2 === 0 ? -120 : 120;

  button.style.transform = `translateX(${direction}px)`;
  button.style.transition = "transform 0.25s ease";

  setTimeout(() => {
    button.style.transform = "translateX(0)";
    dodging = false;
  }, 600);
}

function showWarning() {
  warnMsg.classList.add("show");
}

function hideWarning() {
  warnMsg.classList.remove("show");
}

function checkInputs() {
  if (usernameInput.value && passwordInput.value) {
    playMsg.classList.add("hide");
  } else {
    playMsg.classList.remove("hide");
  }
}

usernameInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

// ========== GLOWING CIRCLE TRAIL ==========
const cursorDot = document.getElementById("cursor-trail");
let cursorTimeout;

document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  cursorDot.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
  cursorDot.style.opacity = "1";

  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(() => {
    cursorDot.style.opacity = "0";
  }, 500);
});

// ========== NEON LINE TRAIL ON CANVAS ==========
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
    ctx.shadowBlur = 26;
    ctx.shadowColor = "magenta";
    ctx.stroke();

    // Fade out
    p1.alpha *= 0.95;
  }

  // Remove very faded points
  while (neonTrail.length > 0 && neonTrail[0].alpha < 0.02) {
    neonTrail.shift();
  }

  requestAnimationFrame(drawTrail);
}


drawTrail();

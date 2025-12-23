/* Dice elements */
const gameDie = document.getElementById('gameDie');
const cube = document.getElementById('cube');
const diceValueText = document.getElementById('diceValueText');
const faces = cube ? [...cube.querySelectorAll('.face')] : [];

/* Traditional die dot positions */
const traditionalDots = {
  1: [{ top: 50, left: 50 }],
  2: [
    { top: 20, left: 20 },
    { top: 80, left: 80 },
  ],
  3: [
    { top: 20, left: 20 },
    { top: 50, left: 50 },
    { top: 80, left: 80 },
  ],
  4: [
    { top: 20, left: 20 },
    { top: 20, left: 80 },
    { top: 80, left: 20 },
    { top: 80, left: 80 },
  ],
  5: [
    { top: 20, left: 20 },
    { top: 20, left: 80 },
    { top: 50, left: 50 },
    { top: 80, left: 20 },
    { top: 80, left: 80 },
  ],
  6: [
    { top: 20, left: 20 },
    { top: 20, left: 80 },
    { top: 50, left: 20 },
    { top: 50, left: 80 },
    { top: 80, left: 20 },
    { top: 80, left: 80 },
  ],
};

/* Create traditional die face with dots */
function createDieFace(faceElement, num) {
  if (!faceElement) return;

  faceElement.innerHTML = '';
  const dots = traditionalDots[num];
  if (!dots) return;

  dots.forEach((pos) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.top = `${pos.top}%`;
    dot.style.left = `${pos.left}%`;
    faceElement.appendChild(dot);
  });
}

/* Cube rotations to show each value */
const faceRotations = {
  1: 'rotateX(0deg) rotateY(0deg)',
  2: 'rotateX(0deg) rotateY(-90deg)',
  3: 'rotateX(0deg) rotateY(-180deg)',
  4: 'rotateX(0deg) rotateY(90deg)',
  5: 'rotateX(-90deg) rotateY(0deg)',
  6: 'rotateX(90deg) rotateY(0deg)',
};

/* Set dice face (rotate cube + update text) */
export function setDiceFace(value) {
  if (cube) cube.style.transform = faceRotations[value] || faceRotations[1];
  if (diceValueText) diceValueText.textContent = String(value);
}

/* Roll dice 1 to 6 */
export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

/* Add spin animation */
export function startDiceSpin() {
  if (gameDie) gameDie.classList.add('rolling');
}

/* Remove spin animation */
export function stopDiceSpin() {
  if (gameDie) gameDie.classList.remove('rolling');
}

/* Initialize: build dots on ALL 6 faces once */
if (faces.length === 6) {
  faces.forEach((faceEl) => {
    const n = Number(faceEl.dataset.face);
    createDieFace(faceEl, n);
  });
  setDiceFace(1);
} else {
  console.error('Dice faces not properly initialized.');
}

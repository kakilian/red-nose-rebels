/* Dice elements */
const gameDie = document.getElementById('gameDie');
const gameDieFace = document.getElementById('gameDieFace');
const diceValueText = document.getElementById('diceValueText');

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

/* Create traditional die face with dots*/
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

/* Set dice face */
export function setDiceFace(value) {
  createDieFace(gameDieFace, value);
  diceValueText.textContent = String(value);
}

/* Roll dice 1 to 6 */
export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

/* Add spin animation */
export function startDiceSpin() {
  if (gameDie) {
    gameDie.classList.add('rolling');
  }
}

/* Remove spin animation */
export function stopDiceSpin() {
  if (gameDie) {
    gameDie.classList.remove('rolling');
  }
}

/* Initialize dice to 1 on load */
if (gameDieFace) {
  createDieFace(gameDieFace, 1);
}

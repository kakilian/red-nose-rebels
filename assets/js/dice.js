/* Dice elements */
const diceImg = document.getElementById('diceImg');
const diceValueText = document.getElementById('diceValueText');

/* Set dice face */
export function setDiceFace(value) {
  diceImg.src = `assets/images/dices/dice-${value}.png`;
  diceValueText.textContent = String(value);
}

/* Roll dice 1 to 6 */
export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

/* Add spin animation */
export function startDiceSpin() {
  diceImg.classList.add('dice-spin');
}

/* Remove spin animation */
export function stopDiceSpin() {
  diceImg.classList.remove('dice-spin');
}

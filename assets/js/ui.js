/* Settings storage key */
const SETTINGS_KEY = 'rnr_settings';

/* Animations state */
let animationsEnabled = true;

/* Screen elements */
const screenStart = document.getElementById('screenStart');
const screenGame = document.getElementById('screenGame');
const screenWin = document.getElementById('screenWin');
const screenLose = document.getElementById('screenLose');

/* Token elements */
const playerToken = document.getElementById('playerToken');
const rivalToken = document.getElementById('rivalToken');
const playerTokenImg = document.getElementById('playerTokenImg');

/* Toggle elements */
const audioToggleBtn = document.getElementById('audioToggleBtn');
const soundToggle = document.getElementById('soundToggle');
const animationsToggle = document.getElementById('animationsToggle');

/* Total steps */
const totalSteps = 10;

/* Load animations setting */
export function loadAnimationsSetting() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    if (typeof data.animationsEnabled === 'boolean') animationsEnabled = data.animationsEnabled;
  } catch (error) {}
}

/* Save animations setting */
export function saveAnimationsSetting(enabled) {
  animationsEnabled = enabled;

  const saved = localStorage.getItem(SETTINGS_KEY);
  let data = {};

  if (saved) {
    try {
      data = JSON.parse(saved);
    } catch (error) {}
  }

  data.animationsEnabled = animationsEnabled;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
}

/* Get animations state */
export function areAnimationsEnabled() {
  return animationsEnabled;
}

/* Apply animations setting */
export function applyAnimationsSetting() {
  if (animationsEnabled) {
    document.body.classList.remove('no-anim');
  } else {
    document.body.classList.add('no-anim');
  }
}

/* Switch screens */
export function setScreen(name) {
  screenStart.classList.add('d-none');
  screenGame.classList.add('d-none');
  screenWin.classList.add('d-none');
  screenLose.classList.add('d-none');

  if (name === 'start') screenStart.classList.remove('d-none');
  if (name === 'game') screenGame.classList.remove('d-none');
  if (name === 'win') screenWin.classList.remove('d-none');
  if (name === 'lose') screenLose.classList.remove('d-none');
}

/* Update one token position */
export function setTokenPos(token, step) {
  for (let i = 0; i <= totalSteps; i += 1) {
    token.classList.remove(`pos-${i}`);
  }

  const safeStep = Math.max(0, Math.min(totalSteps, step));
  token.classList.add(`pos-${safeStep}`);
}

/* Update board */
export function updateBoard(playerPos, rivalPos) {
  setTokenPos(playerToken, playerPos);
  setTokenPos(rivalToken, rivalPos);
}


/* Set player token image */
export function setPlayerTokenImage(reindeerName) {
  if (!playerTokenImg) return;

  // Keep the running sprite for the in-game token (don't swap to static PNGs)
  playerTokenImg.src = './assets/images/reindeer/reindeer_run_sprite.png';
  playerTokenImg.alt = reindeerName || 'Player';
}


/* Sync toggles UI */
export function syncToggles(soundEnabled) {
  if (soundToggle) soundToggle.checked = soundEnabled;
  if (animationsToggle) animationsToggle.checked = animationsEnabled;

  if (soundEnabled) {
    audioToggleBtn.textContent = '🔊 AUDIO ON';
    audioToggleBtn.classList.remove('btn-secondary');
    audioToggleBtn.classList.add('btn-success');
  } else {
    audioToggleBtn.textContent = '🔇 AUDIO OFF';
    audioToggleBtn.classList.remove('btn-success');
    audioToggleBtn.classList.add('btn-secondary');
  }
}

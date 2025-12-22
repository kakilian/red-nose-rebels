/* Settings storage key */
const SETTINGS_KEY = 'rnr_settings';

/* Sound state */
let soundEnabled = true;

/* Audio files */
const diceSound = new Audio('assets/audio/dice-roll.mp3');
const winSound = new Audio('assets/audio/win.mp3');
const loseSound = new Audio('assets/audio/game-over.mp3');
const santaSound = new Audio('assets/audio/santa-ho-ho.mp3');
const bellSound = new Audio('assets/audio/reindeer-bell.mp3');

/* Audio unlocked flag */
let audioUnlocked = false;

/* Unlock audio on first user interaction */
function unlockAudio() {
  if (audioUnlocked) return;

  try {
    const sounds = [diceSound, winSound, loseSound, santaSound, bellSound];
    for (let i = 0; i < sounds.length; i += 1) {
      sounds[i]
        .play()
        .then(() => sounds[i].pause())
        .catch(() => {});
      sounds[i].currentTime = 0;
    }
    audioUnlocked = true;
  } catch (error) {}
}

/* Export unlock for use in main script */
export { unlockAudio };

/* Load sound setting */
export function loadSoundSetting() {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    if (typeof data.soundEnabled === 'boolean') soundEnabled = data.soundEnabled;
  } catch (error) {}
}

/* Save sound setting */
export function saveSoundSetting(enabled) {
  soundEnabled = enabled;

  const saved = localStorage.getItem(SETTINGS_KEY);
  let data = {};

  if (saved) {
    try {
      data = JSON.parse(saved);
    } catch (error) {}
  }

  data.soundEnabled = soundEnabled;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
}

/* Get sound state */
export function isSoundEnabled() {
  return soundEnabled;
}

/* Stop all sounds */
export function stopAllSounds() {
  const sounds = [diceSound, winSound, loseSound, santaSound, bellSound];

  for (let i = 0; i < sounds.length; i += 1) {
    sounds[i].pause();
    sounds[i].currentTime = 0;
  }
}

/* Play dice roll sound */
export function playDiceRollSound() {
  if (!soundEnabled) return;

  try {
    diceSound.currentTime = 0;
    diceSound.play().catch(() => {});

    setTimeout(() => {
      diceSound.pause();
      diceSound.currentTime = 0;
    }, 600);
  } catch (error) {}
}

/* Play win sounds */
export function playWinSounds() {
  if (!soundEnabled) return;

  try {
    winSound.currentTime = 0;
    winSound.play().catch(() => {});

    santaSound.currentTime = 0;
    santaSound.play().catch(() => {});
  } catch (error) {}
}

/* Play lose sound */
export function playLoseSound() {
  if (!soundEnabled) return;

  try {
    loseSound.currentTime = 0;
    loseSound.play().catch(() => {});
  } catch (error) {}
}

/* Play bell sound */
export function playBellSound() {
  if (!soundEnabled) return;

  try {
    bellSound.currentTime = 0;
    bellSound.play().catch(() => {});
  } catch (error) {}
}

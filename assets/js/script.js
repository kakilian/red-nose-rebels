import {
  loadSoundSetting,
  saveSoundSetting,
  isSoundEnabled,
  stopAllSounds,
  playDiceRollSound,
  playWinSounds,
  playLoseSound,
  playBellSound,
  unlockAudio,
} from './audio.js';

import { rollDice, setDiceFace, startDiceSpin, stopDiceSpin } from './dice.js';

import {
  loadAnimationsSetting,
  saveAnimationsSetting,
  areAnimationsEnabled,
  applyAnimationsSetting,
  setScreen,
  updateBoard,
  syncToggles,
  setPlayerTokenImage,
} from './ui.js';

/* Game state */
const totalSteps = 10;
let playerPos = 0;
let rivalPos = 0;
let selectedReindeer = '';
let turnCount = 0;
let maxDiceRoll = 0;

/* UI elements */
const startGameBtn = document.getElementById('startGameBtn');
const rollBtn = document.getElementById('rollBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const playAgainBtn2 = document.getElementById('playAgainBtn2');
const audioToggleBtn = document.getElementById('audioToggleBtn');
const effectsToggleBtn = document.getElementById('effectsToggleBtn');

const soundToggle = document.getElementById('soundToggle');
const animationsToggle = document.getElementById('animationsToggle');

const selectedName = document.getElementById('selectedName');
const eventText = document.getElementById('eventText');

const reindeerButtons = document.querySelectorAll('.reindeer-btn');

/* Update game stats */
function updateGameStats() {
  const statsPlayerTurns = document.getElementById('statsPlayerTurns');
  const statsPlayerMaxDice = document.getElementById('statsPlayerMaxDice');
  const statsRudolphTurns = document.getElementById('statsRudolphTurns');
  const statsRudolphMaxDice = document.getElementById('statsRudolphMaxDice');
  const winnerName = document.getElementById('winnerName');

  if (statsPlayerTurns) statsPlayerTurns.textContent = turnCount;
  if (statsPlayerMaxDice) statsPlayerMaxDice.textContent = maxDiceRoll;
  if (statsRudolphTurns) statsRudolphTurns.textContent = turnCount;
  if (statsRudolphMaxDice) statsRudolphMaxDice.textContent = maxDiceRoll;
  if (winnerName) winnerName.textContent = selectedReindeer || 'You';
}

/* Check end state */
function checkEnd() {
  // Check for tie - both reach finish on same turn
  if (playerPos >= totalSteps && rivalPos >= totalSteps) {
    // Tie scenario - trigger tiebreaker
    handleTiebreaker();
    return true;
  }

  if (playerPos >= totalSteps) {
    const winnerImg = document.getElementById('winnerReindeerImg');
    if (winnerImg && selectedReindeer) {
      const imagePath = `assets/images/reindeer/${selectedReindeer.toLowerCase()}.png`;
      winnerImg.src = imagePath;
      winnerImg.alt = selectedReindeer;
    }
    updateGameStats();
    setScreen('win');
    playWinSounds();
    return true;
  }

  if (rivalPos >= totalSteps) {
    updateGameStats();
    setScreen('lose');
    playLoseSound();
    return true;
  }

  return false;
}

/* Handle tiebreaker */
function handleTiebreaker() {
  eventText.textContent = '⚡ TIE! Rolling tiebreaker...';
  rollBtn.disabled = true;

  const executeTiebreaker = () => {
    const playerTiebreakerRoll = rollDice();
    const rivalTiebreakerRoll = rollDice();

    if (playerTiebreakerRoll > rivalTiebreakerRoll) {
      // Player wins tiebreaker
      const winnerImg = document.getElementById('winnerReindeerImg');
      if (winnerImg && selectedReindeer) {
        const imagePath = `assets/images/reindeer/${selectedReindeer.toLowerCase()}.png`;
        winnerImg.src = imagePath;
        winnerImg.alt = selectedReindeer;
      }
      updateGameStats();
      setScreen('win');
      playWinSounds();
    } else if (rivalTiebreakerRoll > playerTiebreakerRoll) {
      // Rudolph wins tiebreaker
      updateGameStats();
      setScreen('lose');
      playLoseSound();
    } else {
      // Another tie - recursive tiebreaker
      eventText.textContent = '⚡ Another TIE! Rolling again...';

      if (areAnimationsEnabled()) {
        setTimeout(handleTiebreaker, 1000);
      } else {
        handleTiebreaker();
      }
    }
  };

  if (areAnimationsEnabled()) {
    setTimeout(executeTiebreaker, 1500);
  } else {
    executeTiebreaker();
  }
}

/* Handle sound toggle */
function handleSoundToggle() {
  const enabled = soundToggle.checked;
  saveSoundSetting(enabled);
  syncToggles(enabled);

  if (!enabled) stopAllSounds();
}

/* Handle animations toggle */
function handleAnimationsToggle() {
  const enabled = animationsToggle.checked;
  saveAnimationsSetting(enabled);
  applyAnimationsSetting();
  syncEffectsToggle(enabled);
}

/* Handle audio toggle button */
function toggleAudio() {
  const enabled = !isSoundEnabled();
  saveSoundSetting(enabled);
  syncToggles(enabled);

  if (!enabled) stopAllSounds();
}

/* Handle effects toggle button (desktop) */
function toggleEffects() {
  const enabled = !areAnimationsEnabled();
  saveAnimationsSetting(enabled);
  applyAnimationsSetting();
  syncEffectsToggle(enabled);
}

/* Sync effects toggle button UI */
function syncEffectsToggle(enabled) {
  if (!effectsToggleBtn) return;

  if (enabled) {
    effectsToggleBtn.textContent = '✨ EFFECTS ON';
    effectsToggleBtn.classList.remove('btn-secondary');
    effectsToggleBtn.classList.add('btn-success');
  } else {
    effectsToggleBtn.textContent = '🚫 EFFECTS OFF';
    effectsToggleBtn.classList.remove('btn-success');
    effectsToggleBtn.classList.add('btn-secondary');
  }
}

/* Pick a reindeer */
function handleReindeerPick(button) {
  for (let i = 0; i < reindeerButtons.length; i += 1) {
    reindeerButtons[i].classList.remove('active');
  }

  button.classList.add('active');
  selectedReindeer = button.getAttribute('data-reindeer') || '';
  setPlayerTokenImage(selectedReindeer);
  startGameBtn.disabled = selectedReindeer === '';
}

/* Start game */
function startGame() {
  playerPos = 0;
  rivalPos = 0;
  turnCount = 0;
  maxDiceRoll = 0;

  selectedName.textContent = selectedReindeer || '-';
  eventText.textContent = 'Ready.';

  setDiceFace(1);
  updateBoard(playerPos, rivalPos);
  rollBtn.disabled = false;
  setScreen('game');

  const spotifyPlayer = document.getElementById('spotifyPlayer');
  if (spotifyPlayer) {
    spotifyPlayer.src = '';
  }
}

/* Reset game */
function resetGame() {
  stopAllSounds();

  selectedReindeer = '';
  startGameBtn.disabled = true;
  turnCount = 0;
  maxDiceRoll = 0;

  for (let i = 0; i < reindeerButtons.length; i += 1) {
    reindeerButtons[i].classList.remove('active');
  }

  playerPos = 0;
  rivalPos = 0;

  setDiceFace(1);
  eventText.textContent = 'Ready.';
  setPlayerTokenImage('');
  updateBoard(playerPos, rivalPos);

  setScreen('start');

  const spotifyPlayer = document.getElementById('spotifyPlayer');
  if (spotifyPlayer) {
    spotifyPlayer.src = 'https://open.spotify.com/embed/track/2pnPe4pJtq7689i5ydzvJJ?utm_source=generator&autoplay=true';
  }
}

/* Apply random event */
function applyRandomEvent() {
  const random = Math.random();

  // Remove previous event classes
  eventText.className = 'mb-0 event-text';

  // 30% chance: no event
  if (random < 0.3) {
    eventText.textContent = 'No special events.';
    eventText.classList.add('event-neutral');
    return;
  }

  // Add animation class
  eventText.classList.add('event-active');

  // 25% chance: player moves forward +1
  if (random < 0.55) {
    playerPos = Math.min(totalSteps, playerPos + 1);
    eventText.textContent = '🎁 Lucky boost! You move +1 step!';
    eventText.classList.add('event-boost');
    return;
  }

  // 20% chance: player moves backward -1
  if (random < 0.75) {
    playerPos = Math.max(0, playerPos - 1);
    eventText.textContent = '❄️ Slippery ice! You slide back -1 step!';
    eventText.classList.add('event-penalty');
    return;
  }

  // 15% chance: rival moves backward -1
  if (random < 0.9) {
    rivalPos = Math.max(0, rivalPos - 1);
    eventText.textContent = '⛄ Rudolph stumbles! He goes back -1 step!';
    eventText.classList.add('event-boost');
    return;
  }

  // 10% chance: rival moves forward +1
  rivalPos = Math.min(totalSteps, rivalPos + 1);
  eventText.textContent = '💨 Strong wind pushes Rudolph +1 step!';
  eventText.classList.add('event-rival');
}

/* One turn */
function doTurn() {
  if (rollBtn.disabled) return;

  rollBtn.disabled = true;
  turnCount += 1;

  playDiceRollSound();

  const playerRoll = rollDice();
  const rivalRoll = rollDice();

  // Track max dice roll
  if (playerRoll > maxDiceRoll) {
    maxDiceRoll = playerRoll;
  }

  if (areAnimationsEnabled()) {
    startDiceSpin();

    setTimeout(() => {
      stopDiceSpin();

      playerPos = Math.min(totalSteps, playerPos + playerRoll);
      rivalPos = Math.min(totalSteps, rivalPos + rivalRoll);

      setDiceFace(playerRoll);

      applyRandomEvent();
      updateBoard(playerPos, rivalPos);

      const ended = checkEnd();
      rollBtn.disabled = ended;

      if (!ended) rollBtn.disabled = false;
    }, 600);

    return;
  }

  // When effects OFF: execute immediately without delays
  playerPos = Math.min(totalSteps, playerPos + playerRoll);
  rivalPos = Math.min(totalSteps, rivalPos + rivalRoll);

  setDiceFace(playerRoll);

  applyRandomEvent();
  updateBoard(playerPos, rivalPos);

  const ended = checkEnd();
  rollBtn.disabled = ended;

  if (!ended) rollBtn.disabled = false;
}

/* Init app */
loadSoundSetting();
loadAnimationsSetting();
syncToggles(isSoundEnabled());
syncEffectsToggle(areAnimationsEnabled());
applyAnimationsSetting();
setScreen('start');
updateBoard(playerPos, rivalPos);

/* Unlock audio on first user interaction */
document.addEventListener('click', unlockAudio, { once: true });
document.addEventListener('mouseenter', unlockAudio, { once: true, capture: true });

/* Events */
if (audioToggleBtn) audioToggleBtn.addEventListener('click', toggleAudio);
if (effectsToggleBtn) effectsToggleBtn.addEventListener('click', toggleEffects);
if (soundToggle) soundToggle.addEventListener('change', handleSoundToggle);
if (animationsToggle) animationsToggle.addEventListener('change', handleAnimationsToggle);

for (let i = 0; i < reindeerButtons.length; i += 1) {
  reindeerButtons[i].addEventListener('click', () => handleReindeerPick(reindeerButtons[i]));
  reindeerButtons[i].addEventListener('pointerdown', unlockAudio);
  reindeerButtons[i].addEventListener('mouseenter', () => {
    if (areAnimationsEnabled()) {
      playBellSound();
    }
  });
}

if (startGameBtn) startGameBtn.addEventListener('click', startGame);
if (playAgainBtn) playAgainBtn.addEventListener('click', resetGame);
if (playAgainBtn2) playAgainBtn2.addEventListener('click', resetGame);
if (rollBtn) rollBtn.addEventListener('click', doTurn);

/* Stop all audio when page is unloaded or reloaded */
window.addEventListener('beforeunload', stopAllSounds);
window.addEventListener('pagehide', stopAllSounds);

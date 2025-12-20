import { initDice } from "./dice.js";
import { initAudio } from "./audio.js";
import { initUI } from "./ui.js"

console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    initUI();
    initDice();
    initAudio();
});


"use strict";
import { wordsList } from "/src/js/wordslist.js";

let keyboard = document.querySelector(".keyboard");
let btnHint = document.querySelector(".btn-hint");
let hintContent = document.querySelector(".hint");
let secretWord = document.querySelector(".hidden-word");
const hangmanImage = document.querySelector(".image");
const hangmanScore = document.querySelector(".score");
const modal = document.querySelector(".modal");
const mainResult = document.querySelector(".main-result");
const overlay = document.querySelector(".overlay");
const starRes = document.querySelector(".result-stars");
const textRes = document.querySelector(".result-text");
const btnPlay = document.querySelector(".btn-play");
const textCorrect = document.querySelector(".correct-text");
const setData = document.querySelector(".set-data");
const multplePlayers = document.querySelector(".btn-2x");
const playMultiplePlayers = document.querySelector(".btn-playAgain");
const correctWord = document.querySelector(".correct-word");
const inputHint = document.querySelector("#input-hint");
const inputWord = document.querySelector("#input-word");
setData.classList.add("hidden");

//Reset Game
let word, hint, hiddenWord, score;
const resetGame = function () {
  score = 0;
  const val = wordsList[Math.trunc(Math.random() * wordsList.length)];
  word = val.word;
  hint = val.hint;
  word = word.toUpperCase();
  keyboard.innerHTML = "";
  for (let letter = 65; letter <= 90; ++letter) {
    const val = String.fromCharCode(letter);
    const button = `<button>${val}</button>`;
    keyboard.insertAdjacentHTML("beforeend", button);
  }
  hangmanImage.src = "src/images/hangman-0.svg";
  hiddenWord = word.replace(/[A-Z]/g, "_");
  secretWord.innerHTML = "";
  secretWord.insertAdjacentHTML("afterbegin", hiddenWord);
  modal.classList.add("hidden");
  mainResult.classList.add("hidden");
  overlay.classList.add("hidden");
  btnHint.classList.remove("hidden");
  hintContent.classList.add("hidden");
  hintContent.innerHTML = "";
  hintContent.insertAdjacentHTML("afterbegin", hint);
  hangmanScore.textContent = score;
  document.querySelector(".btn-modal").style.marginTop = "15px";
};
resetGame();
playMultiplePlayers.addEventListener("click", function () {
  score = 0;
  word = inputWord.value;
  hint = inputHint.value;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  word = word.toUpperCase();

  keyboard.innerHTML = "";
  for (let letter = 65; letter <= 90; ++letter) {
    const val = String.fromCharCode(letter);
    const button = `<button>${val}</button>`;
    keyboard.insertAdjacentHTML("beforeend", button);
  }
  hangmanImage.src = "src/images/hangman-0.svg";
  hiddenWord = word.replace(/[A-Z]/g, "_");
  secretWord.innerHTML = "";
  secretWord.insertAdjacentHTML("afterbegin", hiddenWord);
  modal.classList.add("hidden");
  mainResult.classList.add("hidden");
  overlay.classList.add("hidden");
  btnHint.classList.remove("hidden");
  hintContent.classList.add("hidden");
  hintContent.innerHTML = "";
  hintContent.insertAdjacentHTML("afterbegin", hint);
  setData.classList.add("hidden");
  document.querySelector(".btn-modal").style.marginTop = "15px";

  //mainResult.classList.add("hidden");

  hangmanScore.textContent = score;
});
btnHint.addEventListener("click", function () {
  btnHint.classList.add("hidden");
  hintContent.classList.remove("hidden");
  document.querySelector(".btn-area").style.marginTop = "46px";
  document.querySelector(".btn-modal").style.marginTop = "15px";
});

keyboard.addEventListener("click", function (e) {
  const letter = e.target.closest("button");
  if (!letter) return;
  letter.classList.add("disabled");
  if (word.includes(letter.textContent)) {
    let copyWord = word;
    let newSecretWord = secretWord.textContent;
    while (copyWord.includes(letter.textContent)) {
      let index = copyWord.indexOf(letter.textContent);
      copyWord =
        copyWord.slice(0, index) +
        "_" +
        copyWord.slice(index + 1, copyWord.length);
      newSecretWord =
        newSecretWord.slice(0, index) +
        letter.textContent +
        newSecretWord.slice(index + 1, newSecretWord.length);
    }
    document.querySelector(".result-text").style.marginBottom = "15px";
    document.querySelector(".btn-modal").style.marginTop = "15px";
    if (newSecretWord === word) {
      //WIN;
      document.querySelector(".btn-modal").style.marginTop = "15px";
      if (score <= 1) {
        starRes.textContent = "⭐ ⭐ ⭐";
        textRes.textContent = "Congratulations!🥳";
      }
      if (score >= 2 && score <= 3) {
        starRes.textContent = "⭐ ⭐";
        textRes.textContent = "Good Job!🎉";
      }
      if (score >= 4) {
        starRes.textContent = "⭐";
        textRes.textContent = "Good!";
      }
      correctWord.textContent = word;
      setTimeout(function () {
        modal.classList.remove("hidden");
        mainResult.classList.remove("hidden");
        overlay.classList.remove("hidden");
      }, 1000);
    }

    secretWord.innerHTML = "";
    secretWord.insertAdjacentHTML("afterbegin", newSecretWord);
  } else {
    ++score;
    if (score == 6) {
      hangmanImage.src = `src/images/hangman-${score}.svg`;
      hangmanScore.textContent = score;

      setTimeout(function () {
        //FAIL
        document.querySelector(".result-text").style.marginBottom = "30px";
        document.querySelector(".btn-modal").style.marginTop = "40px";
        correctWord.textContent = word;
        modal.classList.remove("hidden");
        starRes.classList.add("hidden");
        starRes.textContent = "";
        textRes.textContent = "Game Over";

        mainResult.classList.remove("hidden");
        overlay.classList.remove("hidden");
      }, 1000);
    }
    if (score < 6) {
      hangmanImage.src = `src/images/hangman-${score}.svg`;
      hangmanScore.textContent = score;
      document.querySelector(".btn-modal").style.marginTop = "15px";
    }
  }
});
btnPlay.addEventListener("click", resetGame);
multplePlayers.addEventListener("click", function () {
  setData.classList.remove("hidden");
  mainResult.classList.add("hidden");
  document.querySelector(".btn-modal").style.marginTop = "15px";
});

// Hangman game variables
let wordToGuess = ""; // The word the player needs to guess
let guessedWord = []; // An array to store the correctly guessed letters
let incorrectGuesses = 0; // Count of incorrect guesses
const maxIncorrectGuesses = 6; // Maximum allowed incorrect guesses

// Array of available words (you can add more words)
const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];

// DOM elements
const wordDisplay = document.getElementById("word-display");
const letterButtons = document.querySelectorAll(".letter");
const hangmanImage = document.getElementById("hangman-image");
const gameStatus = document.getElementById("game-status");

// Event listener for the "New Game" button
document.getElementById("new-game").addEventListener("click", startNewGame);

// Initialize a new game
function startNewGame() {
    // Reset variables
    guessedWord = [];
    incorrectGuesses = 0;

    // Choose a random word from the array
    wordToGuess = selectRandomWord();

    // Display the word as blanks
    displayWord();

    // Reset hangman image
    hangmanImage.innerHTML = '';

    // Reset game status message
    gameStatus.textContent = '';

    // Enable letter buttons
    enableLetterButtons();
}

// Select a random word from the array
function selectRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Display the word as blanks
function displayWord() {
    const wordDisplayArray = [];
    for (const letter of wordToGuess) {
        if (guessedWord.includes(letter)) {
            wordDisplayArray.push(letter);
        } else {
            wordDisplayArray.push("_");
        }
    }
    wordDisplay.textContent = wordDisplayArray.join(" ");
}

// Enable letter buttons
function enableLetterButtons() {
    for (const button of letterButtons) {
        button.disabled = false;
        button.addEventListener("click", handleLetterClick);
    }
}

// Disable letter buttons
function disableLetterButtons() {
    for (const button of letterButtons) {
        button.disabled = true;
        button.removeEventListener("click", handleLetterClick);
    }
}

// Handle a letter button click
function handleLetterClick(event) {
    const letter = event.target.textContent.toLowerCase();

    if (!guessedWord.includes(letter)) {
        guessedWord.push(letter);

        if (!wordToGuess.includes(letter)) {
            // Incorrect guess
            incorrectGuesses++;

            // Update hangman image (you can add your own hangman image logic)
            updateHangmanImage();

            if (incorrectGuesses === maxIncorrectGuesses) {
                // Game over, player lost
                endGame(false);
                return;
            }
        }

        displayWord();

        if (guessedWord.join("") === wordToGuess) {
            // Player guessed the word correctly
            endGame(true);
        }
    }

    // Disable the clicked letter button
    event.target.disabled = true;
}

// Update the hangman image (you can implement your own logic)
function updateHangmanImage() {
    // Implement your own logic for updating the hangman image here
}

// End the game
function endGame(playerWon) {
    if (playerWon) {
        gameStatus.textContent = "You Win!";
    } else {
        gameStatus.textContent = "Game Over. The word was: " + wordToGuess;
    }

    // Disable letter buttons
    disableLetterButtons();
}

// Start a new game when the page loads
startNewGame();

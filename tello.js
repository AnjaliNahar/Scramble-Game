document.addEventListener('DOMContentLoaded', () => {
    // Array of words for the game
    const words = ['addition','meeting','canvas','javascript', 'python', 'react', 'angular', 'node', 'express', 'mongodb', 'html', 'css', 'github'];
    let currentWord = '';
    let scrambledWord = '';
    let score = 0;
    let timeLeft = 30;
    let timerInterval;

    // Grabbing elements from the DOM
    const hintElement = document.querySelector('.HInt span');
    const timeElement = document.querySelector('.time span b');
    const scoreElement = document.querySelector('.score');
    const inputElement = document.querySelector('input');
    const modal = document.getElementById('myModal');
    const modalText = document.getElementById('modalText');
    const closeModal = document.querySelector('.close');

    // Function to scramble a word
    function scramble(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    }

    // Function to select a new word and scramble it
    function newWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        scrambledWord = scramble(currentWord);
        hintElement.textContent = scrambledWord;
    }

    // Function to start the timer
    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 30;  // Reset time for each new word
        timerInterval = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showModal(`Time's up! The correct word was: ${currentWord}`);
            }
        }, 1000);
    }

    // Function to check if the guessed word is correct
    function checkWord() {
        const userInput = inputElement.value.toLowerCase();
        if (userInput === currentWord) {
            score++;
            scoreElement.textContent = score;
            newWord();  // Load a new word
            inputElement.value = '';  // Clear the input field
            startTimer();  // Reset timer for the new word
        } else {
            showModal('Incorrect! Try again.');
        }
    }

    // Function to display the modal with a message
    function showModal(message) {
        modalText.textContent = message;
        modal.style.display = 'block';
    }

    // Close the modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Reset the word and start a new round
    document.querySelector('.refresh-word').addEventListener('click', () => {
        newWord();
        inputElement.value = '';
        startTimer();
    });

    // Check the word when the "Check Word" button is clicked
    document.querySelector('.check-word').addEventListener('click', checkWord);

    // Start the game with an initial word and timer
    newWord();
    startTimer();
});

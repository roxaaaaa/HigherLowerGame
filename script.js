// Array containing names of all 52 playing cards
const cardNames = [
    "Ace of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs",
    "Ace of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds",
    "Ace of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts",
    "Ace of Spades", "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades"
];

// Initialize the player's score, dealer's score, round number, last card drawn, and history of the game
let playerScore = 0;
let dealerScore = 0;
let round = 0;
let lastCard = null;
let history = [];

// Function to generate a random card number between 0 and 51
function getRandomCard() {
    return Math.floor(Math.random() * 52);
}

function compareCards(current, next, guess) {
    let valueCurrent = (current % 13) + 1;  
    let valueNext = (next % 13) + 1;

    // Same value, same color = Draw
    if (valueCurrent === valueNext) {
        return "draw";
    }

    let result = (valueNext > valueCurrent && guess === "higher") || 
                 (valueNext < valueCurrent && guess === "lower") ? "Win!" : "Loss!";

    return result;
}

function playGame(guess) {
    if (round >= 6) return;  // Stop after 6 valid rounds

    document.getElementById("quit-btn").style.display = "inline";  // Show Quit button

    let nextCard = getRandomCard();
    let result = lastCard === null ? "start" : compareCards(lastCard, nextCard, guess);

    // Update scores 
    if (result === "Win!") {
        playerScore++;
    } else if (result === "Loss!") {  
        dealerScore++;
    }

    history.push(`${cardNames[lastCard] || "Start"} → ${cardNames[nextCard]} (${result})`);

    // Only count rounds if it's NOT a draw
    if (result !== "draw") {
        round++;
    }

    lastCard = nextCard;
    updateUI();

    if (round === 6) {
        setTimeout(() => {
            alert(`Game Over! Player: ${playerScore}, Dealer: ${dealerScore}.`);
            document.getElementById("restart-btn").style.display = "inline";
            document.getElementById("quit-btn").style.display = "none";
        }, 500);
    }
}

// Function to update the UI with the current scores, current card, and history of the game
function updateUI() {
    document.getElementById("score").textContent = `Player: ${playerScore} | Dealer: ${dealerScore}`;  // Fix: Ensure scores update correctly
    document.getElementById("card").textContent = lastCard !== null ? cardNames[lastCard] : "Waiting for first card...";
    
    let cardImage = document.getElementById("card-image");
    if (lastCard !== null) {
        cardImage.src = `images/${lastCard + 1}.png`;  // Display the new card image
        cardImage.alt = cardNames[lastCard];
    } else {
        cardImage.src = "images/back.png";  // Show back of the card if none 
        cardImage.alt = "Card Back";
    }

    // Update game history
    document.getElementById("history").innerHTML = `<h3>Previous Rounds:</h3>` + history.map(h => `<p>${h}</p>`).join("");

    // Quit button is only visible while the game is active
    document.getElementById("quit-btn").style.display = round > 0 && round < 6 ? "inline" : "none";
}


// Function to restart the game
function restartGame() {
    playerScore = 0;
    dealerScore = 0;
    round = 0;
    lastCard = null;
    history = [];

    updateUI();

    document.getElementById("restart-btn").style.display = "none";  // Hide Restart button
    document.getElementById("quit-btn").style.display = "none";  // Hide Quit button
}

// Function to quit the game early
function quitGame() {
    alert(`Game Over! Player: ${playerScore}, Dealer: ${dealerScore}.`);
    restartGame();  
}

updateUI();

// --- Memory Game ---

// Selectors
const menuContainer = document.querySelector("#menu-container");
const startGameBtn = document.querySelector("#start-game-btn");
const cards = document.querySelectorAll("[data-card]");

const player1Container = document.querySelector("#player-1-container");
const player2Container = document.querySelector("#player-2-container");
const player1ScoreContainer = document.querySelector("#player-1-score-container");
const player2ScoreContainer = document.querySelector("#player-2-score-container");
const resultContainer = document.querySelector("#result-container");
const result = document.querySelector("#result");


// Variables
const cardPairs = ["JavaScript", "Python", "Java", "Swift", "C++", "C#", "C", "PHP", "Kotlin", "Dart", "Ruby", "Go"]

let cardsArray = [...Array(24).keys()];

let cardFlipped;
let boardLocked;
let card1, card2;

let currentPlayer;

let player1Score, player2Score;


// Functions
const handleClick = (event) => {
    if (boardLocked) return

    let parentCard = event.target.parentNode;
    parentCard.classList.add("flipped")

    if (!cardFlipped) {
        cardFlipped = true;
        card1 = parentCard;
        card1.removeEventListener("click", handleClick)
    } else {
        cardFlipped = false;
        boardLocked = true;
        card2 = parentCard;
        checkCardMatch()
        checkGameOver()
    }
}

const checkCardMatch = () => {
    if (cardArray[card1.id] === cardArray[card2.id]) {
        console.log(`${currentPlayer}: match`)
        card1.removeEventListener("click", handleClick);
        card2.removeEventListener("click", handleClick);
        card1.classList.add("matched");
        card2.classList.add("matched");
        updatePlayerScore()
        boardLocked = false;
    } else {
        console.log(`${currentPlayer}: no match`)
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.addEventListener("click", handleClick);
            card2.addEventListener("click", handleClick);
            switchTurn()
            boardLocked = false;
        }, 1800)
    }
}

const checkGameOver = () => {
    if ([...cards].every(card => {
        return card.classList.contains("matched");
    })) {
        removeCardEventListeners()
        displayResult()
        setTimeout(() => {
            menuContainer.classList.remove("hidden");
            cards.forEach(card => {
                card.classList.remove("flipped")
                card.classList.remove("matched")
            })
        }, 4000)
    }
}

const updatePlayerScore = () => {
    currentPlayer === "player1" ? player1Score++ : player2Score++;
    setPlayerScores()
}

const displayResult = () => {
    resultContainer.classList.remove("hidden");

    if (player1Score > player2Score) {
        result.innerText = "Player 1 Wins!";
    } else if (player1Score < player2Score) {
        result.innerText = "Player 2 Wins!";
    } else {
        result.innerText = "Game Tied!";
    }
}

const shuffleCards = () => {
    cardPairs.forEach(cardPair => {
        let randomIndex1 = emptyCards()[Math.floor(Math.random() * emptyCards().length)] // Get Random Card Index That Is Empty
        document.getElementById(randomIndex1).children[1].innerText = cardPair // Backface of Card Is Card Pair Value
        cardArray[randomIndex1] = cardPair // Array Value Is Card Pair Value
        let randomIndex2 = emptyCards()[Math.floor(Math.random() * emptyCards().length)] // Get Random Card Index That Is Empty
        document.getElementById(randomIndex2).children[1].innerText = cardPair // Backface of Card Is Card Pair Value
        cardArray[randomIndex2] = cardPair // Array Value Is Card Pair Value
    })
}

const switchTurn = () => {
    currentPlayer === "player1" ? currentPlayer = "player2" : currentPlayer = "player1";
    showTurn()
}

const showTurn = () => {
    if (currentPlayer === "player1") {
        player2Container.classList.remove("active")
        player1Container.classList.add("active")
    } else {
        player1Container.classList.remove("active")
        player2Container.classList.add("active")
    }
}

const startGame = () => {
    if (!checkArrayLength(cardPairs, 12)) return

    menuContainer.classList.add("hidden");
    addCardEventListeners()

    currentPlayer = "player1"
    showTurn()

    player1Score = 0;
    player2Score = 0;
    setPlayerScores()

    resultContainer.classList.add("hidden");

    cardArray = [...Array(24).keys()];

    cardFlipped = false;
    boardLocked = false;
    card1 = null;
    card2 = null;

    shuffleCards()
}

// Helper Functions

const addCardEventListeners = () => {
    cards.forEach(card => {
        card.addEventListener("click", handleClick)
    })
}

const removeCardEventListeners = () => {
    cards.forEach(card => {
        card.removeEventListener("click", handleClick)
    })
}

const setPlayerScores = () => {
    player1ScoreContainer.innerText = player1Score;
    player2ScoreContainer.innerText = player2Score;
}

const emptyCards = () => {
    return cardArray.filter(value => typeof value === "number")
}

const checkArrayLength = (array, length) => {
    return array.length === length
}

// Event Listeners
startGameBtn.addEventListener("click", startGame)
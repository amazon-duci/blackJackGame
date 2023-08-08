let sumEl = document.getElementById('sum');
let messageEl = document.getElementById('message');
let cardsEl = document.getElementById('cards');
let playerEl = document.getElementById('playerName');
let amountEl = document.getElementById('playerAmount');
let won = document.getElementById('won');
let lost = document.getElementById('lost');
let disp = document.querySelector('.prompt');


function getRandomNumber(){
    return Math.floor(Math.random() * 11) + 1;
}

let sum = 0;
let isAlive = false;
let wonGame = false;
let message = "";
let startCount = 0;
let myName = "";
let amount = 0;
let cards = [];
let deposit = 0;


// Loading the game
myName = prompt("Enter your name: ");
playerEl.innerText = myName.toUpperCase();
deposit = Number(prompt("Enter a Deposit amount (minimum of $50)"));
if(isNaN(deposit)){
    message = "Please enter a valid amount";
    messageEl.textContent = message;
}else if (deposit < 50){
    message = "Deposit amount too low";
    messageEl.textContent = message;
}else{
    amount += deposit;
    amountEl.textContent = amount;
}

// starting the game or drawing the first two cards
function startGame(){
    if(startCount === 0){
        if (amount < 15){
            deposit = Number(prompt("Account too low!!, please deposit (minimum of $50)"));
            if(isNaN(deposit)){
                message = "Please enter a valid amount";
                messageEl.textContent = message;
            }else if (deposit < 50){
                message = "Deposit amount too low";
                messageEl.textContent = message;
            }else{
                message = "Click START GAME to draw cards";
                messageEl.textContent = message;
                amount += deposit;
            }
        }else {
            sum = 0;
            let firstCard = getRandomNumber();
            let secondCard = getRandomNumber();
            cards = [firstCard, secondCard];
            startCount = 1;
            amount -= 15;
            sum = firstCard + secondCard;            
            renderGame();
        }
        
        amountEl.textContent = amount;

    } else {
        message = "A game is ON!, click on 'NEW CARD'";
        messageEl.textContent = message;
    }
}

// 
function renderGame(){
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";      
    }
    sumEl.textContent = "Sum: " + sum;  
    if(sum < 25){
        message = "Click New card to draw another card";
        isAlive = true;
    } else if(sum == 25){
        message = "BOOOOMMM !!!!!";
        wonGame = true;
        isAlive = false;
        amount += 500;
        sum = 0;        
        startCount = 0;
        amountEl.textContent = amount;
        won.textContent = "You won $500";
        lost.textContent = "";
        disp.style.display = 'block';
    } else {
        message = "Click start game to Try again";
        startCount = 0;
        isAlive = false;
        lost.textContent = "You lost !!!";
        won.textContent = "";
        disp.style.display = 'block';
    }
    messageEl.textContent = message;
}

// draw new cards
function newCard(){
    if (wonGame === true){
        message = "You have the Black Jack! Start a new game";
        messageEl.textContent = message; 
        wonGame = false;
    } else if (wonGame ===false && isAlive === true){
        let card = getRandomNumber();
        sum+=card;
        cards.push(card);
        renderGame();
    }
}

// exit the Result modal
function closeLog(){
    disp.style.display = 'none';
}
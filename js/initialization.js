"use strict";
// 1.1. TIMER INITIALIZATION 

//Global Variables
let cards = document.querySelectorAll('.deck');
let card = document.querySelectorAll('.deck');
let deck = document.querySelector(".deck");
let currentcards = [];
var timerCount;
let timerPause = false;
let timerStart = false;

//Initialization of time Counter

function add() {

    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {

    timerCount = setTimeout(add, 1000);
    timerStart = true;
}

//Resets Timer 
function clearTime() {

    seconds = 0;
    minutes = 0;
    hours = 0;
    h2.innerHTML = "00:00:00";


}

// 1.2. DECK INITIALIZATION 

//Shuffles cards and resets the style
function start() {

    var cardsToS = Array.from(document.querySelectorAll(".deck li"));
    var shuffC = shuffle(cardsToS);

    for (card of shuffC) {
        deck.appendChild(card);

        card.classList.remove("wrong");
        card.classList.remove("open");
        card.classList.remove("show");




    }
}

//1.3. CLICK EVENT INITIALIZATION

//Click Event for Cards

deck.addEventListener("click", function displaySymbol(e) {




    const target = e.target;

    var s = target.classList;


    if (target.classList.contains("card")) {

        if (timerStart === false) {
            timer();
        };

        if (OpenArray.length < 2) {
            toggleCard(target);
            toggleClose(target);

            addOpen(target);
            move();
            match(OpenArray);
        }



    }


});




//Click Event for Restart 

document.addEventListener("click", function restartClick(et) {
    const Restarget = et.target;
    if (Restarget.classList.contains("fa-repeat")) {

        restart();

    }
});



// 1.4. MOVE COUNTER INITIALIZATION 

//Incrementing move counter
function move() {
    if (OpenArray.length === 2) {

        var counter = document.querySelector(".moves");
        var moves = counter.innerHTML;


        moves++;
        counter.innerHTML = moves;


        starsRating(moves);

    }


}

// 1.5. STARS COUNTER INITIALIZATION

//Incremeting Star Counter after 2 cards and decrement after a number of moves
function starsRating(moves) {

    var n;

    if (moves > 8 && moves < 12) {
        for (n = 0; n < stars.length; n++) {
            if (n > 1) {
                stars[n].style.display = "none";
            }
        }

    } else if (moves > 13) {
        for (n = 0; n < stars.length; n++) {
            if (n > 0) {
                stars[n].style.display = "none";
            }

        }
    }
}
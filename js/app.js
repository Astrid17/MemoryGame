"use strict";
/////////////////////////////////

//    INFORMATION
//    Project..............Memory Game (Udacity Front-end Nanodegree Programm)
//    Creator..............Astrid Deleersnyder

//    CONTENTS
//    1. INITIALIZATION.JS
//      1) Timer..........
//      2) Deck ..........
//      3) Click Event........
//      4) Move Counter.......
//      5) Stars Counter......

//    2. APP.JS
//      1) Shuffle..........
//      2) Toggle...........
//      3) Match or Wrong...
//      4) Congratulation...
//      5) Restart.........

///////////////////////////////////////////////


//Global Variables

var array = ["far fa-snowflake", "fas fa-snowman", "fas fa-sleigh", "fas fa-mitten", "fas fa-skiing", "fas fa-igloo", "fas fa-skating", "fas fa-icicles"];
array = array.concat(array);
let f = document.querySelectorAll('.deck');
var OpenArray = [];
var MatchedCards = [];

let delay = 1200;


var stars = document.querySelectorAll(".stars li");
let closeicon = document.querySelector(".close");

var starRating = document.querySelector(".stars").innerHTML;
var seconds = 0;
var minutes = 0;
var hours = 0;
let time = document.querySelector('.time');
var h2 = document.querySelector("h2");


//2.1 Shuffle Function


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




// 2.2 TOGGLE FUNCTIONS
//Changes the style to flip and display the Symbol
function toggleCard(card) {
    card.classList.toggle("open");
    card.classList.toggle("show");

}

//Flips back open cards
function toggleClose(card) {

    for (let j of cards) {
        card.classList.toggle("close");

    }

}

// Open cards put in OpenArray 
function addOpen(target) {
    OpenArray.push(target);


}


// 3. MATCH OR WRONG

//Changes the style for matched cards
function toggleMatch(OpenArray) {
    OpenArray.classList.toggle("match");
}

//Changes the style for non-matched cards
function toggleWrong(OpenArray) {
    OpenArray.classList.toggle("wrong");


}

//Initialise the rules for analysing cards
function match(OpenArray) {

    if (OpenArray.length === 2) {

        if (OpenArray[0].firstElementChild.className === OpenArray[1].firstElementChild.className) {

            toggleMatch(OpenArray[0]);
            toggleMatch(OpenArray[1]);
            MatchedCards.push(OpenArray[0]);
            MatchedCards.push(OpenArray[1]);
            if (MatchedCards.length === 16) {
                gameOver();
            }

            remove(OpenArray);
        } else if (OpenArray[0].firstElementChild.className != OpenArray[1].firstElementChild.className) {


            setTimeout(() => {

                toggleCard(OpenArray[0]);
                toggleCard(OpenArray[1]);
                toggleClose(OpenArray[0]);
                toggleClose(OpenArray[1]);
                toggleWrong(OpenArray[0]);
                toggleWrong(OpenArray[1]);



                remove(OpenArray);
            }, 1000);



        }
    }

}

//removes analysed cards
function remove(OpenArray) {
    OpenArray.splice(0, OpenArray.length);

}




// 6. CONGRATULATION MODAL INITIALIZATION

let modal = document.getElementById("congrats");

//Stops the timer and shows in the win modul all the details
function gameOver() {


    var timer = document.querySelector(".timer");
    var finaltime = timer.innerHTML;
    timerPause = true;
    clearInterval(timerCount);
    modal.classList.add("show");



    var counterEnd = document.querySelector(".moves");
    var moveS = counterEnd.innerHTML;
    var movEs = document.getElementById("finalMove");
    movEs.innerHTML = moveS;




    document.getElementById("totalTime").innerHTML = finaltime;


    document.getElementById("starRating").innerHTML = starRating;

    closeModal();

}

//Resets the style of matched cards
function toggleOver(MatchedCards) {

    for (var k = 0; k < MatchedCards.length; k++) {
        MatchedCards[k].classList.toggle("match");
        MatchedCards[k].classList.toggle("open");
        MatchedCards[k].classList.toggle("show");

    }


}

//Display the final stars count
function starEnd(stars) {
    for (var f = 0; f < stars.length; f++) {

        stars[f].style.display = "inline-block";
    }

}

//7. RESTART BUTTON INITIALIZATION
//Resets the deck of cards, the timer, the move and stars counter 
function restart() {

    remove(OpenArray);

    var counterRes = document.querySelector(".moves");
    const movesres = 0;

    counterRes.innerHTML = movesres;

    toggleOver(MatchedCards);

    let karten = document.querySelectorAll(".deck li");



    for (var p = 0; p < karten.length; p++) {
        toggleClose(karten[p]);
    }



    starEnd(stars);




    remove(MatchedCards);
    timerStart = false;
    clearInterval(timerCount);
    clearTime();
    start();


}

function closeModal() {
    closeicon.addEventListener("click", function(r) {
        modal.classList.remove("show");
        start();
    });
}

function closeM() {
    modal.classList.remove("show");
}




function someFunc() {
    closeM();
    restart();

}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)*/
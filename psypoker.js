/**
 * @project Psy Poker
 * @author Bruno de Sousa <bruno@gif.pt>
 * Copyright (c) 2014 Bruno Sousa :P
 */

/**
 * Mock data from the example.
 * This method is meant to filter the input style from the example
 * The expected input is a coma separated string
 *
 * // examples of Mock Data
 *  mock_straight_flush = "TH,JH,QC,QD,QS,QH,KH,AH,2S,6S";
 *  mock_four_of_a_kind = "2H,2S,3H,3S,3C,2D,3D,6C,9C,TH";
 *  mock_full_house = "2H,2S,3H,3S,3C,2D,9C,3D,6C,TH";
 *  mock_straight = "2H,AD,5H,AC,7H,AH,6H,9H,4H,3C";
 *  mock_three_of_a_kind = "KS,AH,2H,3C,4H,KC,2C,TC,2D,AS";
 *  mock_two_pairs = "AH,2C,9S,AD,3C,QH,KS,JS,JD,KD";
 *  mock_one_pair = "6C,9C,8C,2D,7C,2H,TC,4C,9S,AH";
 *  mock_highest_card = "3D,5S,2H,QD,TD,6S,KH,9H,AD,QH";
 *
 */
function mokeHand(mock) {
    var mock = mock;
    var mockArr = mock.split(",");
    for (var i = 0; i < mockArr.length; i++) {
        if (mockArr[i].charAt(0) == 'T') {
            deck[i + 1].rank = 10;
            deck[i + 1].suit = mockArr[i].charAt(1);
        }
        if (mockArr[i].charAt(0) == 'A') {
            deck[i + 1].rank = 14;
            deck[i + 1].suit = mockArr[i].charAt(1);
        }
        if (mockArr[i].charAt(0) == 'J') {
            deck[i + 1].rank = 11;
            deck[i + 1].suit = mockArr[i].charAt(1);
        }
        if (mockArr[i].charAt(0) == 'Q') {
            deck[i + 1].rank = 12;
            deck[i + 1].suit = mockArr[i].charAt(1);
        }
        if (mockArr[i].charAt(0) == 'K') {
            deck[i + 1].rank = 13;
            deck[i + 1].suit = mockArr[i].charAt(1);
        }
        if (mockArr[i].charAt(0) !== 'T' &&
            mockArr[i].charAt(0) !== 'A' &&
            mockArr[i].charAt(0) !== 'J' &&
            mockArr[i].charAt(0) !== 'Q' &&
            mockArr[i].charAt(0) !== 'K') {
            deck[i + 1].rank = parseInt(mockArr[i].charAt(0));
            deck[i + 1].suit = mockArr[i].charAt(1);
        }
    }
}

/**
 * Game Properties
 *
 */
var score = 100;
var dealt = false;
var hand = new Array(6);
var held = new Array(6);
var topdeck = new Array(6);
var deck = new Array(53);
var mokeData = false;
/**
 * DealDraw()
 * Initiates and runs the game
 *
 */
function DealDraw() {
    fillAndShuffle();
    Deal();
    bestHand();
}
/**
 * fillAndShuffle()
 * Initiates and runs the game
 *
 */
function fillAndShuffle() {
// fill the deck (in order, for now)
    for (i = 1; i < 14; i++) {
        deck[i] = new Card(i, "C");
        deck[i + 13] = new Card(i, "H");
        deck[i + 26] = new Card(i, "S");
        deck[i + 39] = new Card(i, "D");
    }
// shuffle the deck
    var n = Math.floor(400 * Math.random() + 500);
    for (i = 1; i < n; i++) {
        card1 = Math.floor(52 * Math.random() + 1);
        card2 = Math.floor(52 * Math.random() + 1);
        temp = deck[card2];
        deck[card2] = deck[card1];
        deck[card1] = temp;
    }
}
/**
 * fillAndShuffle()
 * Initiates and runs the game
 *
 */
function Deal() {
    if (mokeData == true)
        mokeHand(mock_one_pair);
    // Deal and Display cards
    for (i = 1; i < 6; i++) {
        hand[i] = deck[i];
        document.images[i - 1].src = "img/" + hand[i].fname();
        held[i] = false;
    }
    dealt = true;
    var curcard = 6;
    //Guess the top of the deck
    for (i = 1; i < 6; i++) {
        topdeck[i] = deck[curcard++];
        document.images[i + 4].src = "img/" + topdeck[i].fname();
    }
}

/**
 * fillAndShuffle()
 * Initiates and runs the game
 *
 */
// Make a filename for an image, given Card object
function fname() {
    return this.rank + this.suit + ".gif";
}
/**
 * fillAndShuffle()
 * Initiates and runs the game
 *
 */
// Constructor for Card objects
function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.fname = fname;
}
/**
 * fillAndShuffle()
 * Initiates and runs the game
 *
 */
// Numeric sort function
function rankSort(a, b) {
    return a - b;
}
/**
 * fillAndShuffle()
 * Initiates and runs the game
 *
 */
// Sort Hand
function sortPsyHand() {
    var sortedHand = new Array();
    for (var num in hand) {
        sortedHand.push([num, hand[num]])
    }
    sortedHand.sort(function (a, b) {
            return a[1].rank - b[1].rank
        }
    )
    return sortedHand;
}
/**
 * fillAndShuffle()
 * Initiates and runs the game
 *
 */
function bestHand() {


    //Scores
    var straight_flush = false;
    var flush = false;
    var straight = false;
    var four_of_a_kind = false;
    var full_house = false;
    var three_of_a_kind = false;
    var two_pairs = false;
    var one_pair = 0;
    var highest_card = false;

    //properties
    var ranks = new Array(10);
    var countRanks = {};
    var countSuits = {};
    var countR = {};
    var countS = {};
    var indexes = {};
    var size = 0;


    //*******************
    for (i = 0; i < 5; i++) {
        hand[i + 6] = topdeck[i + 1];
    }
    sortedHand = sortPsyHand();

    for (i = 0; i < 10; i++) {
        ranks[i] = hand[i + 1].rank;
    }
    ranks.sort(rankSort);
    //****************
    //Initially check for a straight flush
    for (var i = 0; i < sortedHand.length; i++) {

        var numRank = sortedHand[i][1].rank;
        var numSuits = sortedHand[i][1].suit;
        countRanks[numRank] = countRanks[numRank] ? countRanks[numRank] + 1 : 1;
        countSuits[numSuits] = countSuits[numSuits] ? countSuits[numSuits] + 1 : 1;

        for (var j = 0; j < 5; j++) {

            if ((j + i) < 9) {
                var a = parseInt(sortedHand[j + i][1].rank);
                var b = parseInt(sortedHand[j + i + 1][1].rank - 1);
                if (a == b) {
                    indexes[a] = sortedHand[j + i][1].suit;
                }
            }
            if (i === sortedHand.length - 1 && parseInt(sortedHand[i][1].rank) == parseInt(sortedHand[i - 1][1].rank + 1)) {
                indexes[parseInt(sortedHand[i][1].rank)] = sortedHand[i][1].suit;
            }
        }
    }
    //check for the frequence of suits and ranks
    var countIndexes = 0;

    for (var prop in indexes) {
        var numR = prop;
        var numS = indexes[prop];
        countR[numR] = countR[numR] ? countR[numR] + 1 : 1;
        countS[numS] = countS[numS] ? countS[numS] + 1 : 1;
        ++countIndexes;
    }
    if (countIndexes >= 5) {
        var pArray = new Array();
        var ci = 0;
        var si = 0;

        for (var prop in indexes) {
            pArray[ci] = prop;
            if (pArray[ci - 1] == prop - 1) {
                ++si;
            }
            ++ci;
        }
        if (si >= 4) {
            straight = true;
        }
        for (var prop in countS) {
            if (countS.hasOwnProperty(prop)) {
                if (countS[prop] >= 5) {
                    console.log('straight_flush');
                    straight_flush = true;
                }
            }
        }
    }
    for (var prop in countSuits) {
        if (countSuits.hasOwnProperty(prop)) {
            if (countSuits[prop] >= 5) {
                flush = true;
            }
        }
    }
    for (var prop in countRanks) {
        if (countRanks.hasOwnProperty(prop)) {
            if (countRanks[prop] === 4) {
                console.log('four_of_a_kind');
                four_of_a_kind = true;
            }
            if (countRanks[prop] === 3) {
                console.log('three_of_a_kind');
                three_of_a_kind = true;
            }
            if (countRanks[prop] === 2) {
                console.log('one_pair');
                ++one_pair;
            }
        }
    }
    if (one_pair >= 2) {
        console.log('two_pairs');
        two_pairs = true;
    }
}

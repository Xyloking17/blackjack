//this file contains all the functions required to
//play the game, including, but not limited to:
//dealing cards, scoring, win/lose conditions.


//generates all players as well as the dealer and add
//them to the playerArray
function generatePlayers(playerCount) {

  let playerArray = [];
  //dealer
  let dealer = new Player(true);
  playerArray.push(dealer);
  //players
  for( let i = 0; i < playerCount; i++) {
    let player = new Player(false);
    playerArray.push(player);
  }

  return playerArray;
}


//generates an array of 1 to 8 decks to be played with
function generateDeckArray() {
  let deckCount = round(random(1,8));
  let deckArray = [];
  for( let i = 0; i < deckCount; i++) {
    deck = new Deck();
  	deck.generateDeck();
    deckArray.push(deck);
  }
  return deckArray;
}


//removes a single random card from the deckArray and pushes it
//to the given player's hand.
function dealCard(player) {
  let deck = random(deckArray);
  let index = floor(random(deck.cards.length));
  let card = deck.cards.splice(index, 1);
  player.hand.push(card[0]);
}


//generates players and deck, then deals starting cards
function startGame(count) {
  playerArray = generatePlayers(count);
  deckArray = generateDeckArray();
  for(let player of playerArray) {
    dealCard(player);
    dealCard(player);
    player.calculateScore();
  }
}


function nextPlayer() {
  //if all the players aren't done
  if(finishedPlayerCount < playerArray.length - 1){
      currentPlayer++;
      if(currentPlayer > playerArray.length - 1) {
        currentPlayer = 1;
      }
      while(playerArray[currentPlayer].isStanding || playerArray[currentPlayer].hasBusted){
        currentPlayer++;
        if(currentPlayer > playerArray.length - 1) {
          currentPlayer = 1;
        }
      }
      generatePlayElements();
  }
  //if all the players are done
  else {
    gameState = GAMESTATE[3];
    generateNextButton();
  }
}
//this function performs all the dealer actions required
//to finish the game
function doDealersTurn() {

  let dealer = playerArray[0];
  if(dealer.score < 17 && !dealer.hasBusted) {
    dealer.performAction('hit');
    dealer.checkBust();
  }
  else {
    dealer.performAction('stand');
    btnArray[0].txt = 'End Game';
  }
}

//compares all players scores to the dealer to determine
//if they won or not
function finishGame() {
  //loop determines if each player has won or not
  for(let i = 1; i < playerArray.length; i++) {
    let dealer = playerArray[0];
    let player = playerArray[i];

    if(!player.hasBusted){
      if(player.score > dealer.score || dealer.hasBusted){
        player.hasWon = true;
      }
    }
  }

}

//resets all values for a new game
function resetGame() {
  deckArray = [];
  playerArray = [];
  btnArray = [];

  finishedPlayerCount = 0;
  currentPlayer = 1;
  gameState = GAMESTATE[0];

  generateStartElements();
}

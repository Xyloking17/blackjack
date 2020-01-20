
function Player(_isDealer) {
  this.hand = [];
  this.isDealer = _isDealer;
  this.score = 0;

  this.isStanding = false;
  this.hasBusted = false;
  this.hasWon = false;

  this.performAction = function(action) {
    switch(action){
      case 'hit':
        dealCard(this, deckArray);
        generateNextButton();
        this.checkBust();
        break;
      case 'stand':
        this.isStanding = true;
        finishedPlayerCount++;
        generateNextButton();
        this.checkBust();
        break;
      case 'next':
        nextPlayer();
        break;
      default:
        break;
    }


  }


  this.calculateScore = function() {
    this.score = 0;
    for(let card of this.hand) {
      if(card.value != 'ace'){
        this.score += VALUES[card.value];
      } else {
        card.isHardAce ? this.score += 1 : this.score += 11;
      }
    }
  }

  //checks for 'soft' aces in the players hand
  //as long as there are 'soft' aces, and score is over
  //21, it will 'harden' all aces.
  //returns true if still over 21 for checkBust function
  this.hardenAces = function() {
    for(let card of this.hand) {
      if(this.score > 21 && card.value === 'ace' && !card.isHardAce) {
        card.isHardAce = true;
        this.calculateScore();
      }
    }
    return (this.score > 21);
  }

  //this is the main function used by the game loop.
  //calculates score then checks if score is greater than
  //21. If it is, trys to harden aces. if still over 21,
  //player has busted
  this.checkBust = function() {
    this.calculateScore();

    if(this.score > 21) {
      if(this.hardenAces()) {
        this.hasBusted = true;
        finishedPlayerCount++;
      }
    }
  }


  //display players hand of cards
  this.showHand = function(isDealersTurn) {
    if(!isDealersTurn){
  
      if(this == playerArray[currentPlayer]) {
        let centerX = width/2;
        let offset = 50;
        let handCenter = this.hand.length/2 - .5;
        for(let i = 0; i < this.hand.length; i++){
          let x = centerX + (offset * (i - handCenter));
          let y = height * 2/3;
          this.hand[i].show(x, y, 1);
        }
      }
      else if(this == playerArray[0]) {
        let centerX = width/2;
        let offset = 50;
        let handCenter = this.hand.length/2 - .5;
        for(let i = 0; i < this.hand.length; i++){
          let x = centerX + (offset * (i - handCenter));
          let y = height * 1/4;
          this.hand[i].show(x, y, .5, i == 0 ? null : 'hidden');
        }
      }
    }
    else {
      let centerX = width/2;
      let offset = 70;
      let handCenter = this.hand.length/2 - .5;
      for(let i = 0; i < this.hand.length; i++){
        let x = centerX + (offset * (i - handCenter));
        let y = height/2;
        this.hand[i].show(x, y, 1.5);
      }
    }
  }





}

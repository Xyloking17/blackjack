
function Deck() {

  this.cards = [];

  this.generateDeck = function() {
    for(let suit in SUITS) {
      for(let value in VALUES) {
        let c = new Card(suit, value, VALUE_TEXT[value], IMAGE_PATH[suit]);
        this.cards.push(c);
      }
    }
  }

}

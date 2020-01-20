
function Card(_suit, _value, _txt, _img) {
  this.suit = _suit;
  this.value = _value;
  this.isHardAce = false;

  this.baseW = 210;
  this.baseH = 300;

  this.displayText = _txt;
  this.imagePath = _img;

  this.show = function(x, y, scl, state) {
    if(state == 'hidden') {
      stroke(0);
      strokeWeight(4);
      fill(250, 89, 77);
      rect(x, y, this.baseW * scl, this.baseH * scl, 10);
    }
    else {
      stroke(0);
      strokeWeight(4);
      fill(255);
      rect(x, y, this.baseW * scl, this.baseH * scl, 10);
      image(this.imagePath, x, y, this.baseW/2 * scl, this.baseW/2 * scl);
      image(this.imagePath, x - this.baseW * scl * .37, y - this.baseH * scl * .23,
            this.baseW * .2 * scl, this.baseW * .2 * scl);

      this.suit == 'spade' || this.suit == 'club' ? fill(0) : fill(222,46,67);
      noStroke();
      textSize(40 * scl);

      text(this.displayText, x - this.baseW * scl * .37, y - this.baseH * scl * .37);

    }
  }
}

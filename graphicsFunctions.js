//button element
let btnArray;
let menuText;

function gameButton(_x, _y, _txt, _value){
  this.txt = _txt;
  this.value = _value;
  this.w = 100;
  this.h = 70;
  this.x = _x;
  this.y = _y;

  //render buttons
  this.show = function() {
    stroke(200);
    strokeWeight(5);
    fill(150);
    textSize(40);

    this.w = textWidth(this.txt) + 20;
    rect(this.x, this.y, this.w, this.h, 20);

    stroke(0);
    fill(255);
    text(this.txt, this.x, this.y);
  }

  //returns boolean value for if button wos clicked
  this.wasClicked = function(mx, my) {
    return (mx > this.x - this.w/2 && mx < this.x + this.w/2
    && my > this.y - this.h/2 && my < this.y  + this.h/2);
  }
}




//main menu display
function displayStart() {
  background(31);
  fill(36, 105, 13);
  stroke(119, 86, 17);
  strokeWeight(15);
  textSize(160);
  ellipse(width/2 , height/2, width - 40, height - 40);

  push();
    stroke(0);
    fill(255);
    text(menuText, width/2, height * 1/3);
  pop();

  for(let btn of btnArray) {
    btn.show();
  }
}

//main gameplay display
function displayGamePlay() {
  background(31);
  fill(36, 105, 13);
  stroke(119, 86, 17);
  strokeWeight(15)
  ellipse(width/2 , height/2, width - 40, height - 40);

  //buttons
  for(let btn of btnArray) {
    btn.show();
  }

  //show cards
  for(let player of playerArray){
    player.showHand();
  }

  //game text
  textSize(50);
  noStroke();
  fill(0);

  text('Dealer:', width/2, height/4 - 120);
  text(`Player ${currentPlayer}:`, width/2, height/2 - 70);

  //score box
  stroke(255);
  strokeWeight(10);
  fill(150);
  rect(120, 120, 200, 200, 30);

  textSize(50);
  noStroke();
  fill(0);
  text('Score:', 120, 60);
  textSize(100);
  text(playerArray[currentPlayer].score, 120, 140);
}

//dealers turn display
function displayDealerTurn() {
  background(36, 105, 13);
  for(let btn of btnArray) {
    btn.show();
  }

  //dealers hand
  playerArray[0].showHand(true);

  //game text
  textSize(100);
  noStroke();
  fill(0);

  text('Dealer:', width/2, height/4 - 120);

  //score box
  stroke(255);
  strokeWeight(10);
  fill(150);
  rect(120, 120, 200, 200, 30);

  textSize(50);
  noStroke();
  fill(0);
  text('Score:', 120, 60);
  textSize(100);
  text(playerArray[0].score, 120, 140);
}

//endgame display
function displayEndGame(){
  background(36, 105, 13);
  for(let btn of btnArray) {
    btn.show();
  }

  for(let i = 0; i < playerArray.length; i++) {
    textSize(70);
    stroke(0);
    strokeWeight(10);
    fill(255);

    push();
      textAlign(LEFT);
      let txt = i == 0 ? 'Dealer' : `Player ${i}`;
      text(txt, width/3, 200 + 100 * i);
    pop();
    push();
      textAlign(RIGHT);
      text(playerArray[i].score, width * 2/3, 200 + 100 * i);
    pop();

    line(width * 1/3, 150 + 100 * i, width * 2/3, 150 + 100 * i);
    line(width * 2/3 - textWidth('00') - 10, 150, width* 2/3 - textWidth('00') - 10, 150 + 100 * playerArray.length);

    if(playerArray[i].hasWon){
      image(trophy, width * 2/3 + 100, 200 + 100 * i, textWidth('00'), textWidth('00'));
    }
  }

}





//start screen elements
function generateStartElements() {
  btnArray = [];
  let b = new gameButton(width/2, height * 2/3, 'Start');
  btnArray.push(b);

  menuText = "BlackJack";
}

//player select elements
function generatePlayerSelectElements() {
  btnArray = [];
  let b1 = new gameButton(width/2 - 300, height * 2/3, '1 Player', 1);
  btnArray.push(b1);
  let b2 = new gameButton(width/2, height * 2/3, '2 Players', 2);
  btnArray.push(b2);
  let b3 = new gameButton(width/2 + 300, height * 2/3, '3 Players', 3);
  btnArray.push(b3);

  menuText = "Player Select"
}

//gameplay elements
function generatePlayElements() {
  btnArray = [];
  let b1 = new gameButton(width * 1/4, height * 1/3, 'Hit', 'hit');
  btnArray.push(b1);
  let b2 = new gameButton(width * 3/4, height * 1/3, 'Stand', 'stand');
  btnArray.push(b2);
}

//dealers turn elements
function generateNextButton() {

  btnArray = [];
  let b1 = new gameButton(width/2, height - 100, 'Next', 'next');
  btnArray.push(b1);
}

//endgame elements
function generateFinishedGameElements() {
  btnArray = [];
  let b1 = new gameButton(width/2, height * 3/4, 'New Game');
  btnArray.push(b1);
}

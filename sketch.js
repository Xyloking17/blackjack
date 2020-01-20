let deckArray ;
let playerArray;


const SUITS = {
	spade: 'spade',
	club: 'club',
	diamond: 'diamond',
	heart: 'heart'
};
const VALUES = {
	ace: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	ten: 10,
	jack: 10,
	queen: 10,
	king: 10
};
const VALUE_TEXT = {
	ace: 'A',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
	ten: '10',
	jack: 'J',
	queen: 'Q',
	king: 'K'
};
const GAMESTATE = ['start', 'playerSelect', 'playing', 'dealer', 'endgame'];
let IMAGE_PATH = {
	heart: null,
	diamond: null,
	spade: null,
	club: null};
//variable will be used as the endgame condition
let finishedPlayerCount;
let currentPlayer;
//used to select graphics
let gameState;
let trophy


function preload() {
	IMAGE_PATH.heart = loadImage('images/heart.png');
	IMAGE_PATH.diamond = loadImage('images/diamond.png');
	IMAGE_PATH.spade = loadImage('images/spade.png');
	IMAGE_PATH.club = loadImage('images/club.png');

	trophy = loadImage('images/trophy.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
	imageMode(CENTER);

  textAlign(CENTER, CENTER);
  textFont('Titan One, Cursive');

	resetGame();
}

function mousePressed() {
	let mx = mouseX;
	let my = mouseY;
	switch(gameState){
		case GAMESTATE[0]:
			if(btnArray[0].wasClicked(mx, my)) {
				gameState = GAMESTATE[1];
				generatePlayerSelectElements();
			}
			break;

		case GAMESTATE[1]:
			for(let btn of btnArray) {
				if(btn.wasClicked(mx, my)) {
					gameState = GAMESTATE[2];
					generatePlayElements();
					startGame(btn.value);

				}
			}
			break;

		case GAMESTATE[2]:
			for(let btn of btnArray) {
				if(btn.wasClicked(mx, my)) {
					playerArray[currentPlayer].performAction(btn.value);
				}
			}
			break;

		case GAMESTATE[3]:
			for(let btn of btnArray) {
				if(btn.wasClicked(mx, my)) {
					if(playerArray[0].isStanding || playerArray[0].hasBusted){
						gameState = GAMESTATE[4];
						generateFinishedGameElements();
						finishGame();
					}
					else {
						doDealersTurn();
					}
				}
			}
			break;

		case GAMESTATE[4]:
			for(let btn of btnArray) {
				if(btn.wasClicked(mx, my)) {
					resetGame();
				}
			}
			break;

		default:
			break;
	}
}


function draw() {
	switch(gameState){
		case GAMESTATE[0]:
			displayStart();
			break;

		case GAMESTATE[1]:
			displayStart();
			break;

		case GAMESTATE[2]:
			displayGamePlay();
			break;

		case GAMESTATE[3]:
			displayDealerTurn();
			break;

		case GAMESTATE[4]:
			displayEndGame();
			break;

		default:
			break;
	}
}

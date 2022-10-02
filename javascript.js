//Challenge 1: Your age in days
function ageInDays(){
	let date = new Date();
	let currentYear = date.getFullYear(); 
	let birthYear = prompt('What is your birth year?');
	let ageInDayss = (currentYear-birthYear)*365;
	let h1 = document.createElement('h1');
	let textAnswer = document.createTextNode('Your age is ' + ageInDayss +' days');
	h1.setAttribute('id','ageInDays');
	h1.appendChild(textAnswer);    
	document.getElementById('flex-box-result').appendChild(h1); 
}

function resset(){
	document.getElementById('ageInDays').remove(); 
}

//Challenge 2: Key Generate
function generateKey(){
	let imag = document.createElement('img');
	let div = document.getElementById('flex-Key-gen');
	imag.src = "images/1.jpg";
	div.appendChild(imag);
}

//Challenge 3: rock,papper,scissors

//creates random number (0-2)
function randToRpsInt(){              
	return Math.floor(Math.random()*3 );
}

function numberToChoice(number){                  //for num 0-->rock, num1-->paper, num2-->scissors
	return ['rock','paper','scissors'][number];	
}

function decideWinner(yourChoice,computerChoice){    //if yourChoice is rock & computerChoice is scissors then
	let rpsDatabase = {								//your score is 1
		'rock':{'scissors':1,'rock':0.5,'paper':0},
		'paper':{'rock':1,'paper':0.5,'scissors':0},
		'scissors':{'paper':1,'scissors':0.5,'rock':0},
	};	
	
	let yourScore = rpsDatabase[yourChoice][computerChoice];
	let computerScore = rpsDatabase[computerChoice][yourChoice];
	
	return [yourScore,computerScore];
}

//shows winning or losing message
function finalMessage([yourScore,computerScore]){     
	if(yourScore===0){
		return {'color':'red','message':'You Lost!'};
	}
	else if(yourScore===0.5){
		return {'color':'yellow','message':'You Tied!'};
	}
	else{
		return {'color':'green','message':'You Won!'};
	}
	
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
	let imageDatabase = {								//picks the sources
		'rock':document.getElementById('rock').src,
		'paper':document.getElementById('paper').src,
		'scissors':document.getElementById('scissors').src,
		};

//remove all the images
document.getElementById('rock').remove();
document.getElementById('paper').remove();
document.getElementById('scissors').remove();

//now create 3 new div element
let humanDiv = document.createElement('div');
let botDiv = document.createElement('div');
let messageDiv = document.createElement('div');

//div content
humanDiv.innerHTML = "<img src='"+imageDatabase[humanImageChoice]+"'height=150 width=150 style='box-shadow:0px 10px 50px rgba(37,50,233,1);'>";
messageDiv.innerHTML = "<h1 style='color:"+finalMessage['color']+"; font-size:60px; padding:30px;'>"+finalMessage['message']+"</h1>";
botDiv.innerHTML = "<img src='"+imageDatabase[botImageChoice]+"'height=150 width=150 style='box-shadow:0px 10px 50px rgba(243,38,24,1);'>";

//appending divs after the flex-box-rps-div
document.getElementById('flex-box-rps-div').appendChild(humanDiv);
document.getElementById('flex-box-rps-div').appendChild(messageDiv);
document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

 function sound(result){
	if(result === 0){
		lossSound.play();
	}
	else if(result === 1){
		winSound.play();
	}
	else{
		hitSound.play();
	}
}


 //the main called funtion
function rpsGame(yourChoice){       
	let humanChoice,botChoice,results, message;
	
	humanChoice = yourChoice.id;
	//console.log("human choice:" ,humanChoice);
	
	botChoice = numberToChoice(randToRpsInt());
	//console.log("computer choice:" ,botChoice);
	
	results = decideWinner(humanChoice,botChoice);
	console.log(results[0]);
	
	message = finalMessage(results);
	//console.log(message);
	
	rpsFrontEnd(humanChoice,botChoice,message);
	
	sound(results[0]);

}

//Challenge 4: Change the color of all buttons

var allButtons = document.getElementsByTagName('button');   
//console.log(allButtons);

var copyAllButtons = [];  
 
for (let i = 0; i < allButtons.length;i++){
	copyAllButtons.push(allButtons[i].classList[1]);
}

//console.log(copyAllButtons);

//the main called funtion
function buttonColorChange(buttonThingy){     
	if(buttonThingy.value === 'red'){
		buttonsRed();
	}else if(buttonThingy.value === 'green'){
		buttonsGreen();
	}else if(buttonThingy.value === 'reset'){
		buttonColorReset();
	}else if(buttonThingy.value === 'random'){
		randomColors();
	}	
}

//for red option
function buttonsRed(){    
	for (let i = 3; i < 7; i++){
		allButtons[i].classList.remove(allButtons[i].classList[1]);  //removes 2nd class(blue/red) from each class
		allButtons[i].classList.add('red');
	}
}

//for green option
function buttonsGreen(){   
	for (let i = 3; i < 7; i++){
		allButtons[i].classList.remove(allButtons[i].classList[1]);
		allButtons[i].classList.add('green');
	}
}

//for reset option
function buttonColorReset(){  
	for (let i = 3; i < allButtons.length; i++){
		allButtons[i].classList.remove(allButtons[i].classList[1]);
		allButtons[i].classList.add(copyAllButtons[i]);
	}
}

/*function buttonColorReset(){  //for reset option
	let copyAllButtons = ['','','','blue','red','yellow','green'];  //storing the previous values of classList[1] to this array
	
	for (let i = 3; i < 7; i++){
		allButtons[i].classList.remove(allButtons[i].classList[1]);
		allButtons[i].classList.add(copyAllButtons[i]);
	}
}*/

//for random option
function randomColors(){   
	let choice = ['blue','red','green','yellow'];  //array of class
	
	for (let i = 3; i < 7; i++){
		let randomNum = Math.floor(Math.random()*4 );
		//console.log(randomNum);
		allButtons[i].classList.remove(allButtons[i].classList[1]);
		allButtons[i].classList.add(choice[randomNum]);   //selects random class depending on randomNum
	}
}

//Challenge 5: BlackJack

//stores the information about you & dealer
let blackjackGame = {      
	'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
	'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
	'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],   //list of possible cards
	'cardsMap':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1,11]},
	//card '2' is maping to the integer 2
	'wins':0,
	'losses':0,
	'draws':0,
	'isStand':false,  //stand button clicked = false
	'turnsOver':false, //computer's game is over = false
};

//for easy access of you & dealer
const YOU = blackjackGame['you'];    
const DEALER = blackjackGame['dealer'];

//audios
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');


//eventlisteners
document.querySelector("#blackjack-hit-button").addEventListener("click",blackjackHit); 
document.querySelector("#blackjack-stand-button").addEventListener("click",blackjackStand); 
document.querySelector("#blackjack-deal-button").addEventListener("click",blackjackDeal);


//your game:hit button
function blackjackHit(){ 

	if(blackjackGame['isStand'] === false){   //you can only access the hit button, if stand button isn't activated	
		let card = randomCard();				//means that you can't access hit,once you clicked stand
		//console.log(card);				//means after you clicked stand button your game is over 
		showCard(card,YOU);
		updateScore(card,YOU);
		//console.log(YOU['score']);
		showScore(YOU);
	}
}

//dealer game:stand button
async function blackjackStand(){   //async-->browser waits only for this func , not the total window
	blackjackGame['isStand'] = true;
	//if dealer score is greater than 15, then the game will show result & dealer's game is over
	//means dealar will play untill dealer's score is less than 16
	while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){	
		let card = randomCard();
		showCard(card,DEALER);
		updateScore(card,DEALER);
		showScore(DEALER);
		await sleep(1000);  //calling all functions after 1000ms
	}
	blackjackGame['turnsOver'] = true;
	let winner = computeWinner();
	showResult(winner);
}

//removing cards from both of the box:deal button
function blackjackDeal(){  
		  
	if(blackjackGame['turnsOver'] === true){ 	//you can only access the deal button, if dealer's game is over
		blackjackGame['isStand'] = false;
		let yourImages = document.getElementById('your-box').querySelectorAll('img');
		let dealerImages = document.getElementById('dealer-box').querySelectorAll('img');  //catching the new img element 
		//console.log(dealerImages);
		
		for(let i = 0;i < yourImages.length;i++){
			yourImages[i].remove();
		}
		for(let i = 0;i < dealerImages.length;i++){
			dealerImages[i].remove();
		}
		YOU['score'] = 0;  //reseting 0 in the backend
		DEALER['score'] = 0;
		
		document.querySelector('#your-blackjack-result').textContent = 0;        //reseting 0 in the frontend
		document.querySelector('#your-blackjack-result').style.color = "#ffffff"; //reseting color to white
		
		document.querySelector('#dealer-blackjack-result').textContent = 0;
		document.querySelector('#dealer-blackjack-result').style.color = "#ffffff";
		
		document.querySelector('#blackjack-result').textContent = "Let's play!";   //reseting message
		document.querySelector('#blackjack-result').style.color = "black";
		
		blackjackGame['turnsOver'] = false;
	}
}

//sleeps computer for given milisecond
function sleep(ms){   
	return new Promise(resolve => setTimeout(resolve,ms));
}

//picks random card
function randomCard(){    
	let randomIndex = Math.floor(Math.random()*13);
	return blackjackGame['cards'][randomIndex];
}

//throughing cards
function showCard(card,activePlayer){    
	if(activePlayer['score'] <= 21){
		 let cardImage = document.createElement('img');
		 cardImage.src = `static/images/${card}.png`;  //selects image based on random number
		 document.querySelector(activePlayer['div']).appendChild(cardImage);  //YOU['div'] = #your-box
		 hitSound.play();
	}
}


//updates in the backend 
function updateScore(card,activePlayer){  
	//if adding 11 keeps me belos 21, add 11, otherwise add 1 
	if(card == 'A'){   
		if(activePlayer['score'] + blackjackGame['cardsMap'][card][1]<= 21) {   
			activePlayer['score'] += blackjackGame['cardsMap'][card][1];   //blackjackGame['cardsMap'][card][1]=11
		}
		else{
			activePlayer['score'] += blackjackGame['cardsMap'][card][0];  //blackjackGame['cardsMap'][card][0]=1
		}
	}
	
	else{
		activePlayer['score'] += blackjackGame['cardsMap'][card]; //-->right part returns 2/9/10 etc
	}
}

//updates in the frontend
function showScore(activePlayer){  
	if(activePlayer['score'] > 21){
		document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
		document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
	}
	else{
	document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
	}
}

//compute Winner & return who just won
function computeWinner(){  
	let winner;
	//higher score than dealer or when dealer bust but you ase under 21
	if(YOU['score']<=21){  
		if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
			//console.log('you won!');
			winner = 'YOU';		
			blackjackGame['wins']++;
		}
		else if(YOU['score'] < DEALER['score']){
			//console.log('dealer won!');
			winner = 'DEALER';		
			blackjackGame['losses']++;
		}
		else if(YOU['score'] === DEALER['score']){
			//console.log('you derw!');		
			blackjackGame['draws']++;
		}
	}
	//when you bust's but dealer doesn't
	else if(YOU['score'] > 21 && DEALER['score'] <= 21){
		//console.log('dealer won!');
		winner = 'DEALER';
		blackjackGame['losses']++;
	}
	//when you  & dealer bust's  
	else if(YOU['score'] > 21 && DEALER['score'] > 21){
		//console.log('you drew!');
		blackjackGame['draws']++;
	}
	//console.log('winner:',winner);
	//console.log(blackjackGame);
	return winner;
}

//shows result in the frontend
function showResult(winner){
	let message, messageColor;
	if(blackjackGame['turnsOver'] === true){  //after the dealer's game is over , only then show the result
		if(winner === 'YOU'){
			document.querySelector('#wins').textContent = blackjackGame['wins'];  //updates the score board of wins,losses & draws
			message = 'You Won!';
			messageColor = 'green';
			winSound.play();
		}
		else if(winner === 'DEALER'){
			document.querySelector('#losses').textContent = blackjackGame['losses'];
			message = 'You Lost!';
			messageColor = 'red';
			lossSound.play();
		}
		else{
			document.querySelector('#draws').textContent = blackjackGame['draws'];
			message = 'You Drew!';
			messageColor = 'blue';
		}	
		document.querySelector("#blackjack-result").textContent = message;
		document.querySelector("#blackjack-result").style.color = messageColor;
	}
} 
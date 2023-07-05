//declare constants
const ComputerMove = 'X';
const HumanMove = 'O';

const board = ["b1", "b2", "b3", "b4", "b5", "b6", "b7","b8","b9"]
ComputerTurn = false;
HumanTurn = true;
boxValues = [];
boxBtns = [];


function checkTie(){ 
    for(box of board){
        if(document.getElementById(box).value == '') return false; 
    } 
    disableBoard();
    document.getElementById('print').innerHTML = "Match Tied";
    return true;
}


function disableBoard(){
    for(box of board){
        box.disabled = true;
    }
} 
function changeColor(indices){
    for(i of indices){
        board[i].style.color = "red";
    }
}


function disableBoard(){
    for(let i =0;i<9;i++){
        boxBtns[i].disabled = true;
    }
} 
function changeColor(indices){
    for(i of indices){
        boxBtns[i].style.color = "red";
    }
} 
function checkForWin(){
    var winningCombination = [ [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [2,5,8], [1,4,7]];
    let i = 0;
    for(box of board){
        if(document.getElementById(box).value == '') boxValues[i++] = '_';
        else boxValues[i++] = document.getElementById(box).value;
    } 
    console.log(boxValues);
    for(let i = 0; i < winningCombination.length; i++){
         if(isWinner(boxValues, winningCombination[i])){
            disableBoard();
            changeColor(winningCombination[i]);
            return true;
         }
    }
    
    return false;
}

// Function called whenever user tab on any box
function myfunc() { 
    for(let i=0;i<9;i++){
        boxBtns[i] = document.getElementById(board[i]);
    }
}



function isWinner(boxValues, indices){
    var X_wins = true;
    for(index of indices){
        if(boxValues[index] != 'X'){
            X_wins = false;
            break;
        }
    }
    if(X_wins){
        document.getElementById('print').innerHTML = "Player X won";
        return true;
    }
    var O_wins = true;
    for(index of indices){
        if(boxValues[index] != 'O'){
            O_wins = false;
            break;
        }
    }
    
    if(O_wins){
        document.getElementById('print').innerHTML = "Player O won";
        return true;
    }else{
        return false;
    }
}
   

// Function to reset game
function ResetGame() {
	location.reload(); 
}
 
computerTurn = false;
function easyMode(boxIndex){
    console.log("easy mode " + boxIndex);
    document.getElementById(boxIndex).value = "O";
	document.getElementById(boxIndex).disabled = true;
    if(checkForWin() || checkTie()) return;
 
    let availableBoxes = [];
    for(let i = 0; i < 9; i++){
        if(document.getElementById(board[i]).value == ''){
            availableBoxes.push(board[i]);
        }
    } 

    console.log("available boxes : "+availableBoxes.length)
    boxIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)]; 
    console.log("random box selected : "+ boxIndex);
    document.getElementById(boxIndex).value = "X";
    document.getElementById(boxIndex).disabled = true; 
    console.log("computer turn : "+computerTurn);
    if(checkForWin() || checkTie()) return;
}

function bestMoveForMediumMode(){
    let bestMove = -Infinity;
    let chosenBox;
    for(let i=0;i<9;i++){
        if(document.getElementById(board[i]).value == ''){ 
            board[i] = 'X'  ;        
            let score = minimax(board,computerTurn, ); 
            board[i]='';
            if(score > bestMove){
                bestMove = score;
                chosenBox = b;
            }
        }
    }
    return chosenBox;
}

function mediumMode(){

}


function minimax(boxes, ){

}

 

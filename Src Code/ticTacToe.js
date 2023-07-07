//declare constants
const ComputerPlayer = 'X';
const HumanPlayer = 'O';

const board = ["b1", "b2", "b3", "b4", "b5", "b6", "b7","b8","b9"] 

var EasyMode = undefined;

function setMediumMode(){
    EasyMode = false;
    clearBoard();
    document.getElementById('mode').innerHTML = "Game is now in Hard Mode";
}
function setEasyMode(){
    EasyMode = true;
    clearBoard();
    document.getElementById('mode').innerHTML = "Game is now in Easy Mode";
}

function checkTie(newBoard){ 
    for(let i=0;i<9;i++){
        if(newBoard[i] == '') return false; 
    }  
    return true;
}
function getBoard(){
    let newBoard = [];
    for(let i = 0; i < 9; i++){
        newBoard.push(document.getElementById(board[i]).value);
    } 
    return newBoard;
}
function disableBoard(){
    boxBtns = [];
    for(let i=0;i<9;i++){
        boxBtns[i] = document.getElementById(board[i]);
        boxBtns[i].disabled = true;
    } 
} 
function changeColor(indices){
    boxBtns = [];
    for(let i=0;i<9;i++){
        boxBtns[i] = document.getElementById(board[i]);
    }
    for(i of indices){
        boxBtns[i].style.color = "red";
    }
} 
// Function called whenever user tab on any box
function myfunc() { 
    if(EasyMode===undefined){
        document.getElementById('mode').innerHTML = "Default mode is Easy Mode";
    }
}

function getMove(boxIndex){
    document.getElementById(boxIndex).value = 'O';
	document.getElementById(boxIndex).disabled = true;

    if(EasyMode===true || EasyMode===undefined){
        easyMode();
        
    }else{
        MediumMode();
        
    }
}
function checkForWinner(newBoard, willWinnerDeclared){
    var winningCombination = [ [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [2,5,8], [1,4,7]]; 
    for(let i = 0; i < winningCombination.length; i++){ 
        var winner = isWinner(newBoard, winningCombination[i]);
         if(winner != '_'  ){
            if(willWinnerDeclared){
                changeColor(winningCombination[i]);
                disableBoard();
            }
            return winner;
         }
    }
    
    return '_';
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
         return 'X';
    }
    
    for(index of indices){
        if(boxValues[index] != 'O'){
            return '_';
        }
    }   
    return 'O';
}
   

// Function to reset game
function clearBoard() {
    for(boxIndex of board){
        document.getElementById(boxIndex).value = '';
	    document.getElementById(boxIndex).disabled = false;
        document.getElementById(boxIndex).style.color = "black";
    }
}
function ResetGame() { 
	clearBoard();
    console.log(EasyMode);
    document.getElementById('printTurn').innerHTML ="Make the first move";
    if(EasyMode===false){
        setMediumMode();
    }else{
        setEasyMode();
    }
}
function declareWinner(newBoard){
    var winner = checkForWinner(newBoard, true);
    if(winner != '_'){
        if(winner === 'X'){
            document.getElementById('printTurn').innerHTML ='Computer Won :(';
        }else{
            document.getElementById('printTurn').innerHTML ='You Won!';
        }
        return true;
    }else if(checkTie(newBoard)) {
        document.getElementById('printTurn').innerHTML ='Match Tied';
        return true;
    }
    return false;
}
 
//------------------Easy Mode------------------//



function easyMode(){
    console.log("easy mode ");
    if(declareWinner(getBoard())) return;
 
    let availableBoxes = [];
    for(let i = 0; i < 9; i++){
        if(document.getElementById(board[i]).value == ''){
            availableBoxes.push(board[i]);
        }
    }  
    boxIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];  
    document.getElementById('printTurn').innerHTML ='Computer\'s Turn'
    setTimeout(() => { console.log(""); }, 3000);

    document.getElementById(boxIndex).value = 'X';
    document.getElementById(boxIndex).disabled = true; 

    if(declareWinner(getBoard())) return;
    document.getElementById('printTurn').innerHTML ='Your Turn'
}


 //-----------------------------Medium Mode--------------------------------

function MediumMode(){
    console.log("Medium mode " + boxIndex);  
    if(declareWinner(getBoard())) return; 

    document.getElementById('printTurn').innerHTML ='Computer\'s Turn';
    
    boxIndex = chooseBestMove();
    document.getElementById(board[boxIndex]).value = "X";
    document.getElementById(board[boxIndex]).disabled = true; 
    
    if(declareWinner(getBoard())) return; 
    document.getElementById('printTurn').innerHTML ='Your Turn';
}

function chooseBestMove(){ 
    var choosenBox ;
    let newBoard = getBoard();
    let bestScore = -Infinity;
    
    for(let i = 0; i < 9; i++){
        if(newBoard[i] == ''){
            newBoard[i] = ComputerPlayer;
            let score = minimax(newBoard,0, HumanPlayer); 
            newBoard[i] = '';
            if(score > bestScore){
                bestScore = score;
                choosenBox = i;
            }
        }
    } 
    console.log("result from minimax "+bestScore+" "+ choosenBox);
    return choosenBox; 
}
 


function minimax(newBoard,depth, player){ 
    var winner = checkForWinner(newBoard, false);
    if(winner == ComputerPlayer){
        return 10;
    }else if(winner == HumanPlayer){
        return -10;
    }else if(checkTie(newBoard)){
        return 0;
    }
    if(player == ComputerPlayer){
        let score = -Infinity;
        for(let i=0;i<9;i++){
            if(newBoard[i]==''){
                newBoard[i] = player; 
                score = Math.max(minimax(newBoard,depth+1, HumanPlayer), score);
                //console.log("max score "+score);
                newBoard[i] = '';
            }
        } 
        return score;
    }else{
        let score = Infinity;
        for(let i=0;i<9;i++){
            if(newBoard[i]==''){
                newBoard[i] = player; 
                score = Math.min(minimax(newBoard, depth+1, ComputerPlayer), score);
                //console.log("min score "+score);
                newBoard[i] = '';
            }
        } 
        return score;
    }
    
}


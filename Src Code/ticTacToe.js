// Function called whenever user tab on any box
function myfunc() {
 
    var box = ["b1", "b2", "b3", "b4", "b5", "b6", "b7","b8","b9"]
    var boxValue = [];
 
    for (var i = 0; i < box.length; i++) {
        boxValue[i] = document.getElementById(box[i]).value;
    }

    for (var i = 0; i < box.length; i++) {
        box[i] = document.getElementById(box[i]);
    }
    function disableBox(){
        for(b of box){
            b.disabled = true;
        }
    } 
    function changeColor(indices){
        for(i of indices){
            box[i].style.color = "red";
        }
    }  
    function checkTie(){
        for(b of box){
            if(b.value == ''){
                return false;
            }
        }
        return true;
    }
	if (isWinner(boxValue,[0,1,2])) { 
		disableBox();
        changeColor([0,1,2]);
	}
	else if (isWinner(boxValue,[0,3,6])) { 
		disableBox();
        changeColor([0,3,6]);
	}
	else if (isWinner(boxValue,[6,7,8])) { 
		disableBox();
        changeColor([6,7,8]);
	}
	else if (isWinner(boxValue,[2,5,8])) { 
        disableBox();
        changeColor([2,5,8]);
	}
	else if (isWinner(boxValue,[0,4,8])) {        
        disableBox();
        changeColor([0,4,8]);
	}
	else if (isWinner(boxValue,[2,4,6])) { 
        disableBox();
        changeColor([2,4,6]);
	}
	else if (isWinner(boxValue,[1,4,7])) { 
        disableBox();
        changeColor([1,4,7]);
	}
	else if (isWinner(boxValue,[3,4,5])) { 
        disableBox();
        changeColor([3,4,5]);
	} 
	else if (checkTie()) {
		document.getElementById('print')
			.innerHTML = "Match Tie";
	}
	else {  
		if (flag == 1) {
			document.getElementById('print')
				.innerHTML = "Player X Turn";
		}
		else {
			document.getElementById('print')
				.innerHTML = "Player O Turn";
		}
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
    var O_wins = true;
    if(!X_wins){
        for(index of indices){
            if(boxValues[index] != 'O'){
                O_wins = false;
                break;
            }
        }
    }
    if(X_wins){
        document.getElementById('print').innerHTML = "Player X won";
        return true;
    }
    else if(O_wins){
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
 
flag = 1;
function putValueToBox(boxIndex) {
	if (flag == 1) {
		document.getElementById(boxIndex).value = "X";
		document.getElementById(boxIndex).disabled = true;
		flag = 0;
	}
	else {
		document.getElementById(boxIndex).value = "O";
		document.getElementById(boxIndex).disabled = true;
		flag = 1;
	}
}
computerTurn = false;
function easyMode(boxIndex){
    if (computerTurn) {
        boxIndex = Math.floor(Math.random() * 9);
		document.getElementById(boxIndex).value = "X";
		document.getElementById(boxIndex).disabled = true;
		computerTurn = false;
	}
	else { 
		document.getElementById(boxIndex).value = "O";
		document.getElementById(boxIndex).disabled = true;
		computerTurn = true;
	}
}

function mediumMode(){

}

 

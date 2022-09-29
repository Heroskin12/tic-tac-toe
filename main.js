// Factory function returning player objects.
let playerFactory = (name, marker) => {
    let turn = false;
    // Is this necessary?
    let changeTurn = function() {
        if (turn === true) {
            turn = false;
        }
        else {
            turn = true;
        }
    }
    let addMarker = function() {

    }

    // Added provisionally to print winner or loser messages.
    let win = () => { name;
    console.log(`${name} is the winner!`)
    }
    let lose = () => { name;
        console.log(`${name} is the loser!`)
    }

    return {name, marker, changeTurn, addMarker, lose}
}


// Gameboard Module
// Any values returned can be access via gameBoardModule.XXXX. If returned variable is function then add ().
let gameBoardModule = (function() {
    let gameboard = [];

    // Initialise gameboard array to empty. Perhaps an unnecessary step. Can be altered when creating function for allowing player to add to square.
    let createGameBoard = () => {
        let squares = document.querySelectorAll('.square');
        let i = 0;
        squares.forEach(square => {
            gameboard[i] = "X";
            square.textContent = gameboard[i];
            i++;
        })
        
    }
    
    
    return {createGameBoard};
})()

//gameBoardModule.createGameBoard(); - This will initialise the grid array.

// Display Controller Module
let displayController = (function() {

    console.log("display controller is working correctly...")
})()










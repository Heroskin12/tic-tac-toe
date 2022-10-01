// Factory function returning player objects.
let PlayerFactory = () => {

        // If 2 players don't already exist.

            // Access the player names or give default value.
            let player1Name = document.querySelector('#player1Name').value;
            if (player1Name === "") {
                player1Name = "Player 1";
            }
            
            let player2Name = document.querySelector('#player2Name').value;
            if (player2Name === "") player2Name = "Player 2";

            // Check the icon that player1 has chosen.
            let fishMarker = document.querySelector('.fish');
            let player1Marker, player2Marker;

            if (fishMarker.classList.contains('active')) {
                player1Marker = "fish";
                player2Marker = "chips";
            }
            else {
                player1Marker = "chips";
                player2Marker = "fish";
            }

        // Create an object for each player.
        let player1 = {            
            name: player1Name,           
            marker: player1Marker,
            turn: false,
            //sayName: console.log(this.name)
        };

        let player2 = {            
            name: player2Name,           
            marker: player2Marker,
            turn: false,
            //sayName: console.log(this.name)
        };

        // Push them to the playerArray in gameBoardModule so they can be easily accessed there.
        gameBoardModule.playerArray.splice(0, 0, player1);
        gameBoardModule.playerArray.splice(1, 0, player2);        
}


// Gameboard Module
// Any values returned can be access via gameBoardModule.XXXX. If returned variable is function then add ().
let gameBoardModule = (function() {

    let gameboard = [];
    let playerArray = [];

    return {gameboard, playerArray}

})();



// Display Controller Module - Controls who's turn it is.
let displayController = (function() {

    // Function to start the game when Go! button is pressed.
    let startGame = () => {
        document.querySelector('#go_button').addEventListener('click', () => {
            PlayerFactory(); // Create the players.
            changeDisplay(); // Show the grid.
            gameInit(); // Initialise gameboard array to 9 empty strings.
            takeTurn(); // Add event listeners to each square.
        })
    }

    // Shows the tic tac toe grid when the Go! button is pressed.
    let changeDisplay = () => {
        const container = document.querySelector('.container');
        const container2 = document.querySelector('.container2');
        container.style.display = "none";
        container2.style.display = "flex";
    }

    // Adds green border around the fish and chip icons to highlight user selection.
    let iconChange = (function() {
        let fishMarker = document.querySelector('.fish');
        let chipsMarker = document.querySelector('.chips');

        fishMarker.addEventListener('click', () => {
            fishMarker.style.border = "1px solid green";
            fishMarker.style.borderRadius = "50%";
            chipsMarker.style.border = "none";
            fishMarker.classList.add('active');
            chipsMarker.classList.remove('active');
        })

        chipsMarker.addEventListener('click', () => {
            chipsMarker.style.border = "1px solid green";
            chipsMarker.style.borderRadius = "50%";
            fishMarker.style.border = "none";
            chipsMarker.classList.add('active');
            fishMarker.classList.remove('active');
        })
    })()

    // Set to Player 1 Turn & Initialise gameboard array with empty strings.
    let gameInit = () => {
        gameBoardModule.playerArray[0].turn = true;
        for (let i = 0; i < 9; i++) {
            gameBoardModule.gameboard[i] = "";
        }
    }

    let takeTurn = () => {
        squares = document.querySelectorAll('.square');
        for (const square of squares) {
            square.addEventListener('click', () => {
                const index = square.getAttribute('data-type')

                if (square.innerHTML != "") return;
                
                if (gameBoardModule.playerArray[0].turn === true) {
                    if (gameBoardModule.playerArray[0].marker === "fish") {
                        square.innerHTML = "<img src='./icons/fish-and-chips.png'>"
                        gameBoardModule.gameboard[index] = "fish"
                    }
                    else {
                        square.innerHTML = "<img src='./icons/fries.png'>"
                        gameBoardModule.gameboard[index] = "chips"
                    }
                    gameBoardModule.playerArray[0].turn = false;
                    gameBoardModule.playerArray[1].turn = true;
                }
                else {
                    if (gameBoardModule.playerArray[1].marker === "fish") {
                        square.innerHTML = "<img src='./icons/fish-and-chips.png'>";
                        gameBoardModule.gameboard[index] = "fish";
                    }
                    else {
                        square.innerHTML = "<img src='./icons/fries.png'>";
                        gameBoardModule.gameboard[index] = "chips";
                    }
                    gameBoardModule.playerArray[1].turn = false;
                    gameBoardModule.playerArray[0].turn = true;
                    
                }
                console.log(gameBoardModule.gameboard)
            })
            
        }}

        let checkWinner = () => {
            let winnerCombos = [
                // Horizontal
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],

                // Vertical
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],

                // Diagonal
                [0, 4, 8],
                [2, 4, 6]
            ]

                for (let i = 0; i < 9; i+3) {
                    let rowValue = gameBoardModule.gameboard[i];
                    if (rowValue === gameBoardModule.gameboard[i+1] && gameBoardModule.gameboard[i+2]) {
                        return true;
                    }
                    continue;
                }
            

        }
        
        
        
        
    
    
    startGame();
})()












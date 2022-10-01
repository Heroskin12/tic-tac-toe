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
            eventListener();
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

    // Loop through squares array and add click event listeners for each.
    let eventListener = () => {
        squares = document.querySelectorAll('.square');
        squares = Array.from(squares);
        for (let i = 0; i < 9; i++) {
            squares[i].addEventListener('click', () => {
                if (squares[i].classList.contains('off')) {
                    return;
                }
                takeTurn(squares[i]);
                let marker = gameBoardModule.gameboard[i];
                console.log(marker)
                let result = checkWinner(marker);

                if (result === true) {
                    if (gameBoardModule.playerArray[0].marker == marker) {
                        console.log("Player 1 Wins!")
                        stopGame(squares)
                    }                    
                    else {
                        console.log("Player 2 Wins!")
                        stopGame(squares)
                    }
                }
                else if (result === false && !gameBoardModule.gameboard.includes("")) {
                    stopGame(squares);
                    console.log('tie');
                }

            })
        }
    }

    // Function called whenever a square is clicked to register a turn.
    let takeTurn = (square) => {
        console.log(square);
        
                const index = square.getAttribute('data-type')

                if (square.innerHTML !== "") return;
                
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
        }

        let checkWinner = (marker) => {
            
            // Creates array with all possible win combinations.
            let horizontal = [0, 3, 6].map(i => {return [i, i+1, i+2]});
            let vertical = [0, 1, 2].map(i=>{return [i, i+3, i+6]});
            let diagonal = [[0, 4, 8], [2, 4, 6]]
            let allWins = [].concat(horizontal).concat(vertical).concat(diagonal)

            let result = allWins.some(win => {
                return gameBoardModule.gameboard[win[0]] == marker && gameBoardModule.gameboard[win[1]] == marker && gameBoardModule.gameboard[win[2]] == marker
            })
            console.log(result)
            return result
            
        // Diagonal
        //if (gameBoardModule.gameboard[0] !== "" && (gameBoardModule.gameboard[0] === gameBoardModule.gameboard[4] && gameBoardModule.gameboard[8])) return true
        //else if (gameBoardModule.gameboard[2] !== "" && (gameBoardModule.gameboard[2] === gameBoardModule.gameboard[4] && gameBoardModule.gameboard[6])) return true

        // Horizontal
        //if (gameBoardModule.gameboard[0] !== "" && (gameBoardModule.gameboard[0] === gameBoardModule.gameboard[1] && gameBoardModule.gameboard[2]))  return true
        //else if (gameBoardModule.gameboard[3] !== "" && (gameBoardModule.gameboard[3] === gameBoardModule.gameboard[4] && gameBoardModule.gameboard[5])) return true
        //else if (gameBoardModule.gameboard[6] !== "" && (gameBoardModule.gameboard[6] === gameBoardModule.gameboard[7] && gameBoardModule.gameboard[8])) return true

        // Vertical 
        //if (gameBoardModule.gameboard[0] !== "" && (gameBoardModule.gameboard[0] === gameBoardModule.gameboard[3] && gameBoardModule.gameboard[6]))  return true
        //else if (gameBoardModule.gameboard[1] !== "" && (gameBoardModule.gameboard[1] === gameBoardModule.gameboard[4] && gameBoardModule.gameboard[7]))  return true
        //else if (gameBoardModule.gameboard[2] !== "" && (gameBoardModule.gameboard[2] === gameBoardModule.gameboard[5] && gameBoardModule.gameboard[8]))  return true
        //console.log(gameBoardModule.gameboard[i])

        //return false;
        }

        let stopGame = (squares) => {
            for (let i =  0; i<9; i++) {
                squares[i].classList.add('off')
            }
        }

        
        
        
        
        
    
    
    startGame();
})()












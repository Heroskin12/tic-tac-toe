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
        document.querySelector('#section_one h3').innerHTML = gameBoardModule.playerArray[0].name;
        document.querySelector('#section_three h3').innerHTML = gameBoardModule.playerArray[1].name;
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
        document.querySelector('#section_one').style.border = "2px solid yellow";
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
                    console.log("Result is true!")
                    if (gameBoardModule.playerArray[0].marker == marker) {
                        winnerText(0);
                        stopGame(squares);
                    }                    
                    else {
                        winnerText(1);
                        stopGame(squares);
                    }
                }
                else if (result === false && !gameBoardModule.gameboard.includes("")) {
                    stopGame(squares);
                    winnerText(2);
                }

            })
        }
    }

    // Function called whenever a square is clicked to register a turn.
    let takeTurn = (square) => {
        console.log(square);
        
                const index = square.getAttribute('data-type')
                const sectionOne = document.querySelector('#section_one');
                const sectionThree = document.querySelector('#section_three');

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
                    sectionOne.style.border = "none"
                    gameBoardModule.playerArray[1].turn = true;
                    sectionThree.style.border = "2px solid yellow"
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
                    sectionThree.style.border = "none"
                    gameBoardModule.playerArray[0].turn = true;
                    sectionOne.style.border = "2px solid yellow"
                    
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
        }

        let stopGame = (squares) => {
            for (let i =  0; i<9; i++) {
                squares[i].classList.add('off')
            }

            
        }

        let winnerText = (i) => {
            let parent = document.querySelector('#section_two');
            let winnerText = document.createElement('div');
            // Add a winner announcement.
            winnerText.classList.add('winner');
            if (i === 2) {
                winnerText.innerHTML = `It's a tie!`;
            }
            else {
                winnerText.innerHTML = `${gameBoardModule.playerArray[i].name} wins!`;
            }
            parent.appendChild(winnerText);

            // Add a play again button.
            let playAgain = document.createElement('div');
            playAgain.classList.add('replay');
            winnerText.appendChild(playAgain);
            let replayButton = document.createElement('button');
            replayButton.innerText = "Play Again?";
            playAgain.appendChild(replayButton);
            replayButton.addEventListener('click', restart);
            
        }

        let restart = () => {
            // Empty the gameboard array.
            for (let i = 0; i<9; i++) {
                gameBoardModule.gameboard[i] = ""
            }
            gameBoardModule.playerArray[0].turn = true;
            gameBoardModule.playerArray[1].turn = false;
            // Remove the winner text.
            let winnerText = document.querySelector('.winner')
            let parent = document.querySelector('#section_two');
            squares = document.querySelectorAll('.square');
            squares = Array.from(squares);
            for (let i = 0; i < 9; i++) {
                squares[i].innerHTML = "";
                squares[i].classList.remove('off')
            }
            parent.removeChild(winnerText)
            document.querySelector('#section_one').style.border = "2px solid yellow";
            document.querySelector('#section_three').style.border = "none";
            
        }

        

        
        
        
        
        
    
    
    startGame();
})()












const Player = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;
    const turn = false;    
    return {name, marker, turn}
}
// Gameboard Module
(function() {

    const gameBoard = {
        gameboard: [], //['O', 'X', 'O', 'O', 'X', 'X', 'O', 'O', 'X'],
        players: [],
        init: function() {
            for (let i = 0; i < 9; i++) {
                this.gameboard[i] = "";
            }            
            this.cacheDom();
            //this.container.style = 'display: block';
            //this.playerInfo.style = 'display: none';
            this.render();
            
        },
        cacheDom: function() {
            this.container = document.querySelector('.container');
            this.playerInfo = document.querySelector('#playerInfo');
            this.submitButton = document.querySelector('#submitButton');
            this.oButton = document.querySelector('#oButton');
            this.xButton = document.querySelector('#xButton');
            this.input = document.querySelector('#name_input');
            this.squares = Array.from(document.querySelectorAll('.field'));
        },
        addPlayers: function() {
            console.log("BUMBUM");
            let marker, marker2;
            if (this.oButton.style.backgroundColor === "green") {
                marker = "O";
                marker2 = "X";
            }
            else {
                marker = "X";
                marker2 = "O";
            }
            console.log(Player);

            return "peepee"
        },
        render: function() {
            let i = 0;
            this.squares.forEach(square => {
                square.innerHTML = this.gameboard[i];
                i++;
            }
        )},
        bindEvents: (function() {
            this.oButton.addEventListener('click', () => {
                this.oButton.style.backgroundColor = "green";
                this.xButton.style.backgroundColor = "red";
            })

            this.xButton.addEventListener('click', () => {
                this.xButton.style.backgroundColor = "green";
                this.oButton.style.backgroundColor = "red";
            })

            this.submitButton.addEventListener('click', () => {
                this.addPlayers().bind(gameBoard);
            })
           
        })(),

}

    gameBoard.init()
    
})()


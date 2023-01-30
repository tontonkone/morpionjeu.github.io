// SELECTEUR

const BOARD = document.querySelector('#board');
const INFO = document.querySelector('.info');
const TOUR = document.querySelector('.tour')

let board_game;
let player_o = "O";
let player_x = "X";
let current_player = player_o;
let game_over = false;
let count = 0;

let empty = false;

window.onload = ()=> setGame();

function setGame(){

    board_game = Array.from(Array(3), ()=> new Array(3).fill(' '));

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            let tile = document.createElement('div');
            tile.id = i.toString() + '-' + j.toString();
            tile.classList.add('tile');
            tile.addEventListener('click',setTile);
            BOARD.append(tile)
        }
    }
}

function setTile(){

    if(game_over) return;

    let split_cord = this.id.split('-');
    
    let x = parseInt(split_cord[0]);
    let y = parseInt(split_cord[1]);

    if (board_game[x][y] !== " ") return;

    board_game[x][y] = current_player;
    this.innerText = current_player;

    if(current_player === player_o){
        current_player = player_x;
        TOUR.innerText = "C'est le tour du joueur " + current_player;
    }else {
        current_player = player_o;
        TOUR.innerText = "C'est le tour du joueur " + current_player;
    }

    checkWinner();
    
}

function checkWinner(){
    //check horizontal
    count++;

    for (i = 0; i < 3 ; i++){
        if (board_game[i][0] === board_game[i][1] &&
            board_game[i][1] === board_game[i][2] &&
            board_game[i][0]!== " "){

            for (j = 0; j < 3; j++) {
                INFO.innerText = ` le Joueur  ${board_game[i][0]} a gagné`
                let tile = document.getElementById(i.toString() + '-' + j.toString());
                tile.classList.add('win');
                TOUR.remove()

                
            }
            game_over = true 
            return ;
        }

    }

    //vertical check

    for (i = 0; i < 3; i++) {
        if (board_game[0][i] === board_game[1][i] &&
            board_game[1][i] === board_game[2][i] &&
            board_game[0][i] !== " ") {

            for (j = 0; j < 3; j++) {
                INFO.innerText = ` le Joueur  ${board_game[0][i]} a gagné`
                let tile = document.getElementById(j.toString() + '-' + i.toString());
                TOUR.remove()
                tile.classList.add('win');

            }
            game_over = true
            return;
        }

    }

    // check diago 

    for (i = 0; i < 3; i++) {
        if (board_game[0][0] === board_game[1][1] &&
            board_game[1][1] === board_game[2][2] &&
            board_game[0][0] !== " ") {

            for (j = 0; j < 3; j++) {
                INFO.innerText = ` le Joueur  ${board_game[0][0]} a gagné`
                let tile = document.getElementById(j.toString() + '-' + j.toString());
                TOUR.remove()
                tile.classList.add('win');

            }
            game_over = true
            return;
        }

    }

    //check anti diago

    for (i = 0; i < 3; i++) {
        if (board_game[0][2] === board_game[1][1] &&
            board_game[1][1] === board_game[2][0] &&
            board_game[0][2] !== " ") {

                INFO.innerText = ` le Joueur  ${board_game[0][2]} a gagné`
                TOUR.remove() 
                let tile;
                tile = document.getElementById('0-2').classList.add('win');

                tile = document.getElementById('1-1').classList.add('win');

                tile = document.getElementById('2-0').classList.add('win');
  
                game_over = true
            return;
        }

    }

    if (count === 9){
        INFO.innerText = 'null ';
        TOUR.remove()
        game_over = true ;
        return;
    }

}


import { calcScData } from '@react95/icons';
import {types} from './game_actions';

const getPositions=(moves)=> {
    
    const positions =  moves.map((move)=> {
        
        move = move.replace("#",'')
        move = move.replace("+",'')

        if (move.indexOf('x') > -1){
            return '';
        }
        // if castling is possible
        if (move.indexOf("O") > -1 ){
            console.log("Castle?")
            return '';
        } 
        // if the move involves promotion
        if (move.indexOf('=') > -1){
            return '';
        }
        const n = move.length;
        return move.substring(n-2);
    })

    return positions.filter(move => move !== '');
}

/**
 * Helper function for game reducer that gets all possible captures when a piece is selected
 * @param {*} moves 
 * @returns 
 */
const getCaptures=(moves) => {
    const captures =  moves.map((move)=>{
        move = move.replace("#",'')
        move = move.replace("+",'')

         if (move.indexOf("x") > -1){
            return move.substring(move.length-2);   
         } 
        return ''
        })
    return (captures.filter(move => move!== ''))
}

/**
 * Helper function for game reducer that gets all possible promotions when a piece is selected
 * @param {*} moves 
 * @returns 
 */
const getPromotions = (moves) => {
    const promotions = moves.map((move)=>{
        move = move.replace("#",'');
        move = move.replace("+",'');
        if (move.indexOf("=") > -1){

            move = move.replace("=",'');
            move = move.slice(0,-1);
            console.log(move)
            return move.substring(move.length-2);   
         }
         
        
         return ''
        })
    return (promotions.filter(move => move !== ''))
}

/**
 * Function that determines what square would be the target of a castle if it appears in the list of possible moves
 * @param {*} moves 
 * @param {*} turn -- the players turn
 * @returns 
 */
const getCastles=(moves,turn) => {
    const castles = moves.map((move) => {
        let square = ''
        if (move == 'O-O'){
            if (turn == 'w'){
                square = 'g1'
            } else {
                square = 'g8'
            }
        } else if (move == "O-O-O") {
            if (turn == 'w') {
                move = 'c1'
            } else {
                move = 'c8'
            }
        }
        return square;
    })

    return (castles.filter(move => move !== ''));
}

const GameReducer = (state, action) => {
    switch (action.type){
        case types.SET_POSSIBLE_MOVES:
            return {
                ...state,
                possibleMoves: getPositions(action.moves),
                possibleCaptures: getCaptures(action.moves),
                possiblePromotions: getPromotions(action.moves),
                possibleCastles: getCastles(action.moves, state.turn)
            };
    
        case types.CLEAR_POSSIBLE_MOVES:
            return{
                ...state,
                possibleMoves:[],
                possibleCaptures: [],
                possiblePromotions: [],
                possibleCastles: [],
            };
        case types.SET_TURN:
            return { 
                ...state, turn:action.player, check:action.check 
            };
        
        case types.GAME_OVER:
                return {
                    ...state,
                    gameOver: true,
                    status: action.status,
                    turn: action.player,
             };

        case types.SET_PLAYER:
            return {
                ...state,
                playerName: action.name
            };
        case types.SET_PLAYER_COLOR:
            return { 
                ...state, 
                playerColor: action.color 
        };
        case types.SET_OPPONENT:
            return { 
                ...state, 
                opponentName: action.name 
            };
        case types.SET_MESSAGE:
            return { 
                ...state,
                message: action.message
             };
        case types.CLEAR_MESSAGE:
            return { 
                ...state, 
                message: '' 
            };
        case types.SET_OPPONENT_MOVES:
            return { 
                ...state, 
                opponentMoves: action.moves
            };
        case types.CLEAR_OPPONENT_MOVES:
            return { 
                ...state,
                 opponentMoves: [] 
            };
        default:
            return state;
    }
};

export default GameReducer;
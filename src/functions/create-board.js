// const board = [
//     {pos:'a1'}
// ]

export class Node {
    constructor(square,piece){
        this.square = square;
        this.piece = piece;
    }
}

// returns an array of range 1,n

const range = (n) => {
    return Array.from({length : n },(_,i)=>i+1);

};


/**
 * 
 * @param {String} fenRaw the initial starting position of the board.  Left as a parameter in case a custom starting position is wanted.  
 * @returns 
 */
export const createBoard = (fenRaw) => {
    
    const fen = fenRaw.split(' ')[0]; // get the beginning of the FEN from the raw fen
    const fenPieces = fen.split('/').join(''); //strip row delimiters

    let pieceArray = Array.from(fenPieces);


    Array.from(fenPieces).forEach((x,idx) => {
        if (isFinite(x)){
            pieceArray.splice(idx,1,range(x).fill(''));
        }
    });

    // flattens the array of pieces to a 1x64 array
    pieceArray = pieceArray.flat();


    const ranks = range(8)
        .map((n) => n.toString())
        .reverse();

    const files = ['a','b','c','d','e','f','g','h']
    const squares = [];
    for (let i = 0; i < ranks.length; i++){
        const rank = ranks[i];
        for (let j = 0; j < files.length ;j++){
            const file = files[j];
            squares.push(file+rank);
        }
    }

    const board = []
    for (let i = 0; i < squares.length; i++){
        const square = squares[i]
        const piece = pieceArray[i]
        board.push(new Node(square,piece))
    }

    return board;
};

// console.log(
//     createBoard('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
// );
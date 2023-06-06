/**
 * 
 * @param {*} square 
 * @param {*} idx 
 * @returns whether or not the specified square is a light square on the chess board.  
 */
export const isLightSquare = (square,idx) =>{
    
    // decrementing rank because the chess board is 1-indexed
    const rank = square[1] - 1;
    const isOdd = (x) => (x % 2) > 0;
    
  

    if (isOdd(rank) && !isOdd(idx)){
        return true;
    } else if (isOdd(idx) && !isOdd(rank)) {
        return true
    }

    return false;
};
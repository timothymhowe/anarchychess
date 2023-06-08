export const getGameOverState = (chess) => {
    if (!chess.isGameOver()){
        return [false, ''];
    }
    if (chess.isCheckmate()) {
        return [true, 'checkmate'];
    }
    
    // check for a draw
    if (chess.isDraw()) {

        //determine the type of draw
        if (chess.isStalemate()) {
            return [true, 'Draw by stalemate'];
        } else if (chess.isThreefoldRepetition()) {
            return [true, 'Draw by threefold repetition'];
        } else if (chess.isInsufficientMaterial()) {
            return [true, 'Draw by insufficient material'];
        } else if (chess._halfMoves >= 100) {
            return [true,'Draw by boredom (50 move rule)'];
        } else {
            return [true,'Draw by divine intervention?'];
        }
    }
}

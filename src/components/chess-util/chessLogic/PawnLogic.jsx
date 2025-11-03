// Pure game logic for pawns

// 8x8 board, null = empty, otherwise store piece object
export const board = Array.from({ length: 8 }, () => Array(8).fill(null));


export function placePiece(piece, row, col) {
    board[row][col] = piece;
    piece.row = row;
    piece.col = col;
}

// Get valid pawn moves
export function getPawnMoves(piece) {
    const moves = [];
    const direction = piece.color === 'white' ? -1 : 1;
    const startRow = piece.color === 'white' ? 6 : 1;

    // Forward 1
    const oneStep = { row: piece.row + direction, col: piece.col };
    if (!board[oneStep.row]?.[oneStep.col]) moves.push(oneStep);

    // Forward 2 from starting row
    const twoStep = { row: piece.row + 2 * direction, col: piece.col };
    if (
        piece.row === startRow &&
        !board[oneStep.row][oneStep.col] &&
        !board[twoStep.row][twoStep.col]
    ) moves.push(twoStep);

    // Captures
    for (const dc of [-1, 1]) {
        const target = { row: piece.row + direction, col: piece.col + dc };
        if (board[target.row]?.[target.col] && board[target.row][target.col].color !== piece.color) {
            moves.push(target);
        }
    }

    return moves;
}

// Move a pawn on the board if valid
export function movePawn(piece, to) {
    const validMoves = getPawnMoves(piece);
    const isValid = validMoves.some(m => m.row === to.row && m.col === to.col);

    if (!isValid) return false;

    // Update board
    board[to.row][to.col] = piece;
    board[piece.row][piece.col] = null;

    // Update piece position
    piece.row = to.row;
    piece.col = to.col;

    return true;
}

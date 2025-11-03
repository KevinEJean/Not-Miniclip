import * as PIXI from 'pixi.js';

export function createChessPiece(color, type, col, row, squareSize = 100) {

    // Unicode char map of each piece
    const pieceImages = {
        black: { P: '♙', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔' },
        white: { P: '♟', R: '♜', N: '♞', B: '♝', Q: '♛', K: '♚' }
    };
    const key = type.toUpperCase();
    const char = pieceImages[color][key];

    // Creating pieces
    const piece = new PIXI.Text(char, {
        fontSize: squareSize * 0.75,
        fill: color === 'white' ? '#EEEED2' : '#000000',
        stroke: '#000000',
        strokeThickness: color === 'white' ? 4 : 1,
        align: 'center'
    });

    // Positioning pieces
    piece.x = col * squareSize + squareSize / 2;
    piece.y = row * squareSize + squareSize / 2;
    piece.anchor.set(0.5); // center align piece

    return piece;
}

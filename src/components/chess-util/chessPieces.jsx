import * as PIXI from 'pixi.js';

const pieceImages = {
    black: {
        pawn: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
        rook: 'https://upload.wikimedia.org/wikipedia/commons/1/11/BLACK_CHESS_ROOK.svg',
        knight: 'https://upload.wikimedia.org/wikipedia/commons/7/70/BLACK_CHESS_KNIGHT.svg',
        bishop: 'https://upload.wikimedia.org/wikipedia/commons/1/19/BLACK_CHESS_BISHOP.svg',
        queen: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/BLACK_CHESS_QUEEN.svg',
        king: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Black_King_Xogos_da_Meiga_chess_icons_family.svg',
    },
    white: {
        pawn: '',
        rook: '',
        knight: '',
        bishop: '',
        queen: '',
        king: '',
    }
};

/**
 * Create a chess piece sprite.
 * @param {string} color - "black" (later you could add white)
 * @param {string} type - "pawn", "rook", "knight", "bishop", "queen", "king"
 * @param {number} col - Board column (0–7)
 * @param {number} row - Board row (0–7)
 * @param {number} squareSize - Size of one square in pixels
 * @returns {PIXI.Sprite}
 */

export function createChessPiece(color, type, col, row, squareSize = 100) {
    const texture = PIXI.Texture.from(pieceImages[color][type]);
    const sprite = new PIXI.Sprite(texture);
    sprite.width = squareSize;
    sprite.height = squareSize;
    sprite.x = col * squareSize;
    sprite.y = row * squareSize;
    return sprite;
}

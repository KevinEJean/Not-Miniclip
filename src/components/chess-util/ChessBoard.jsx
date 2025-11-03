import * as PIXI from 'pixi.js';
import { createChessPiece } from './ChessPieces';

export function createChessBoard(lightTexture, darkTexture, squareSize) {

    // Create a container for the board
    const boardContainer = new PIXI.Container();

    // Create squares
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const isDark = (row + col) % 2 === 1;
            const square = new PIXI.Sprite(isDark ? darkTexture : lightTexture);

            square.x = col * squareSize;
            square.y = row * squareSize;
            square.width = squareSize;
            square.height = squareSize;

            boardContainer.addChild(square);
        }
    }

    // Add black pieces
    for (let col = 0; col < 8; col++) {
        boardContainer.addChild(createChessPiece('black', 'P', col, 1, squareSize));
    }
    boardContainer.addChild(createChessPiece('black', 'R', 0, 0, squareSize));
    boardContainer.addChild(createChessPiece('black', 'N', 1, 0, squareSize));
    boardContainer.addChild(createChessPiece('black', 'B', 2, 0, squareSize));
    boardContainer.addChild(createChessPiece('black', 'Q', 3, 0, squareSize));
    boardContainer.addChild(createChessPiece('black', 'K', 4, 0, squareSize));
    boardContainer.addChild(createChessPiece('black', 'N', 5, 0, squareSize));
    boardContainer.addChild(createChessPiece('black', 'B', 6, 0, squareSize));
    boardContainer.addChild(createChessPiece('black', 'R', 7, 0, squareSize));

    // Add white pieces
    for (let col = 0; col < 8; col++) {
        boardContainer.addChild(createChessPiece('white', 'P', col, 6, squareSize));
    }
    boardContainer.addChild(createChessPiece('white', 'R', 0, 7, squareSize));
    boardContainer.addChild(createChessPiece('white', 'N', 1, 7, squareSize));
    boardContainer.addChild(createChessPiece('white', 'B', 2, 7, squareSize));
    boardContainer.addChild(createChessPiece('white', 'Q', 3, 7, squareSize));
    boardContainer.addChild(createChessPiece('white', 'K', 4, 7, squareSize));
    boardContainer.addChild(createChessPiece('white', 'N', 5, 7, squareSize));
    boardContainer.addChild(createChessPiece('white', 'B', 6, 7, squareSize));
    boardContainer.addChild(createChessPiece('white', 'R', 7, 7, squareSize));

    return boardContainer;
}

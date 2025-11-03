import * as PIXI from 'pixi.js';
import React from 'react';
import { createChessPiece } from './chess-util/ChessPieces';

const ChessCanvas = ({ castContext }) => {
    const chessCanvasRef = React.useRef(null);
    const pixiAppRef = React.useRef(null);

    React.useEffect(() => {
        const app = new PIXI.Application({
            view: chessCanvasRef.current,
            width: 800,
            height: 800,
            backgroundAlpha: 1,
            backgroundColor: 0xffffff,
        });

        pixiAppRef.current = app;

        const squareSize = 100;

        // Draw board
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = new PIXI.Graphics();
                const isDark = (row + col) % 2 === 1;
                square.beginFill(isDark ? 0x769656 : 0xEEEED2);
                square.drawRect(col * squareSize, row * squareSize, squareSize, squareSize);
                square.endFill();
                app.stage.addChild(square);
            }
        }

        // Black Pieces
        app.stage.addChild(createChessPiece('black', 'rook', 0, 0, squareSize));  // a8
        app.stage.addChild(createChessPiece('black', 'knight', 1, 0, squareSize)); // b8
        app.stage.addChild(createChessPiece('black', 'bishop', 2, 0, squareSize)); // c8
        app.stage.addChild(createChessPiece('black', 'queen', 3, 0, squareSize));  // d8
        app.stage.addChild(createChessPiece('black', 'king', 4, 0, squareSize));   // e8
        app.stage.addChild(createChessPiece('black', 'bishop', 5, 0, squareSize)); // f8
        app.stage.addChild(createChessPiece('black', 'knight', 6, 0, squareSize)); // g8
        app.stage.addChild(createChessPiece('black', 'rook', 7, 0, squareSize));   // h8
        // Black Pawns
        for (let col = 0; col < 8; col++) {
            app.stage.addChild(createChessPiece('black', 'pawn', col, 1, squareSize)); // row 1 for black pawns
        }

        return () => {
            app.destroy(true, true);
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={chessCanvasRef}></canvas>
        </div>
    );
};

export default ChessCanvas;

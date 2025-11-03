import * as PIXI from 'pixi.js';
import React from 'react';
import { createChessPiece } from './chess-util/ChessPieces';  // change file pawn to ChessBoard.jsx

const ChessCanvas = ({ castContext }) => {
    // use ref
    const chessCanvasRef = React.useRef(null);
    const pixiAppRef = React.useRef(null);
    const whitePiecesRefs = {};
    const blackPiecesRefs = {};
    const board = React.useRef( // [col][row]
        Array.from({ length: 8 }, () => Array(8).fill(null))
    );
    const squareSize = 100;
    const lightTexture = PIXI.Texture.from("/lightTexture.jpg");
    const darkTexture = PIXI.Texture.from("/darkTexture.webp");
    const moveDots = [];



    /* ###################################################### INITIALIZING ###################################################### */

    React.useEffect(() => {

        pixiAppRef.current = new PIXI.Application({
            view: chessCanvasRef.current,
            width: 800,
            height: 800,
            backgroundAlpha: 1,
            backgroundColor: 0xffffff,
        });



        /* ###################################################### CHESSBOARD ###################################################### */



        // Create squares
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const isDark = (row + col) % 2 === 1;
                const square = new PIXI.Sprite(isDark ? darkTexture : lightTexture);

                square.x = col * squareSize;
                square.y = row * squareSize;
                square.width = squareSize;
                square.height = squareSize;

                pixiAppRef.current.stage.addChild(square);
            }
        }

        const pieceOrder = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];


        // Add black pieces
        for (let col = 0; col < 8; col++) {
            const pawn = createChessPiece('black', 'P', col, 1, squareSize);

            pawn.eventMode = 'static';
            pawn.cursor = 'pointer';
            pawn.on('pointerdown', () => showPawnMoves(pawn));

            placePiece('black', 'P', col, 6, squareSize);

            const key = `p${col + 1}Ref`;
            blackPiecesRefs[key] = pawn;

            pixiAppRef.current.stage.addChild(pawn);
        }
        pieceOrder.forEach((type, col) => {
            const piece = createChessPiece('black', type, col, 0, squareSize);
            placePiece('black', type, 0, col, piece);

            // Store in refs using type + index for uniqueness
            const key = type.toLowerCase() + (col + 1) + 'Ref'; // e.g., r1Ref, n2Ref
            blackPiecesRefs[key] = piece;

            pixiAppRef.current.stage.addChild(piece);
        });



        // Add white pieces

        for (let col = 0; col < 8; col++) {
            const pawn = createChessPiece('white', 'P', col, 6, squareSize);

            pawn.eventMode = 'static';
            pawn.cursor = 'pointer';
            pawn.on('pointerdown', () => showPawnMoves(pawn));

            placePiece('white', 'P', col, 6, squareSize);

            const key = `p${col + 1}Ref`;
            whitePiecesRefs[key] = pawn;

            pixiAppRef.current.stage.addChild(pawn);
        }
        pieceOrder.forEach((type, col) => {
            const piece = createChessPiece('white', type, col, 7, squareSize);
            placePiece('white', type, 7, col, piece);

            const key = type.toLowerCase() + (col + 1) + 'Ref'; // e.g., r1Ref, n2Ref
            whitePiecesRefs[key] = piece;

            pixiAppRef.current.stage.addChild(piece);
        });

        // PRINT THIS EVERY TURN
        let consoleCount = 1;
        console.log(`--- CURRENT BOARD STATE (${consoleCount++}) ---`);
        pieceOrder.forEach((type, col) => {
            console.log(
                `${type.toUpperCase()} : white, row=${whitePiecesRefs[`${type.toLowerCase()}${col + 1}Ref`].row}, col=${whitePiecesRefs[`${type.toLowerCase()}${col + 1}Ref`].col}`);
        });
        for (let col = 0; col < 8; col++) {
            console.log(`P : white, row=${whitePiecesRefs[`p${col + 1}Ref`].row}, col=${whitePiecesRefs[`p${col + 1}Ref`].col}`)
        }
        console.log('-------------------------------');
        pieceOrder.forEach((type, col) => {
            console.log(
                `${type.toUpperCase()} : black, row=${blackPiecesRefs[`${type.toLowerCase()}${col + 1}Ref`].row}, col=${blackPiecesRefs[`${type.toLowerCase()}${col + 1}Ref`].col}`);
        });
        for (let col = 0; col < 8; col++) {
            console.log(`P : black, row=${blackPiecesRefs[`p${col + 1}Ref`].row}, col=${blackPiecesRefs[`p${col + 1}Ref`].col}`)
        }



        return () => {
            pixiAppRef.current.destroy(true, true);
        };
    }, []);


    /* ###################################################### PIECES LOGIC ###################################################### */



    function placePiece(color, type, row, col, sprite) {
        board.current[row][col] = { color, type, sprite };
    }



    /* ###################################################### ROOK MOVES LOGIC ###################################################### */


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={chessCanvasRef}></canvas>
        </div>
    );
};

export default ChessCanvas;

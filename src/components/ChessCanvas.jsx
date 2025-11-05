import * as PIXI from 'pixi.js';
import React from 'react';
import { createChessPiece } from './chess-util/ChessPieces';  // change file pawn to ChessBoard.jsx

const ChessCanvas = ({ castContext }) => {
    const chessCanvasRef = React.useRef(null);
    const pixiAppRef = React.useRef(null);
    const whitePiecesRefs = {};
    const blackPiecesRefs = {};
    const board = React.useRef( // [col][row]
        Array.from({ length: 8 }, () => Array(8).fill(null))
    );
    const deadWhitePieces = []; // [pts][piece]
    const deadBlackPieces = []; // [pts][piece]
    const squareSize = 100;
    const lightTexture = PIXI.Texture.from("/lightTexture.jpg");
    const darkTexture = PIXI.Texture.from("/darkTexture.webp");
    const pieceOrder = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];

    React.useEffect(() => {

        pixiAppRef.current = new PIXI.Application({
            view: chessCanvasRef.current,
            width: 800,
            height: 800,
            backgroundAlpha: 1,
            backgroundColor: 0xffffff,
        });

        /* ###################################################### CHESSBOARD ###################################################### */



        // 2D array for the board
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const isDark = (row + col) % 2 === 1;
                const square = new PIXI.Sprite(isDark ? darkTexture : lightTexture);

                square.x = col * squareSize;
                square.y = row * squareSize;
                square.width = squareSize;
                square.height = squareSize;

                square.row = row;
                square.col = col;

                pixiAppRef.current.stage.addChild(square);

                board.current[row][col] = {
                    square,
                    piece: null,
                };
            }
        }


        // Add black pieces
        for (let col = 0; col < 8; col++) {
            const pawn = createChessPiece('black', 'P', 1, col, squareSize);

            pawn.eventMode = 'static';
            pawn.cursor = 'pointer';
            pawn.on('pointerdown', () => showPieceMoves(pawn));

            placePiece('black', 'P', 1, col, pawn);

            const key = `p${col + 1}Ref`;
            blackPiecesRefs[key] = pawn;

            pixiAppRef.current.stage.addChild(pawn);
        }
        pieceOrder.forEach((type, col) => {
            const piece = createChessPiece('black', type, 0, col, squareSize);
            placePiece('black', type, 0, col, piece);

            // Store in refs using type + index for uniqueness
            const key = type.toLowerCase() + (col + 1) + 'Ref'; // e.g., r1Ref, n2Ref
            blackPiecesRefs[key] = piece;

            pixiAppRef.current.stage.addChild(piece);
        });



        // Add white pieces
        for (let col = 0; col < 8; col++) {
            const pawn = createChessPiece('white', 'P', 6, col, squareSize);

            pawn.eventMode = 'static';
            pawn.cursor = 'pointer';
            pawn.on('pointerdown', () => showPieceMove(pawn));

            placePiece('white', 'P', 6, col, pawn);

            const key = `p${col + 1}Ref`;
            whitePiecesRefs[key] = pawn;

            pixiAppRef.current.stage.addChild(pawn);
        }
        pieceOrder.forEach((type, col) => {
            const piece = createChessPiece('white', type, 7, col, squareSize);

            piece.eventMode = 'static';
            piece.cursor = 'pointer';
            piece.on('pointerdown', () => showPieceMove(piece));

            placePiece('white', type, 7, col, piece);

            const key = type.toLowerCase() + (col + 1) + 'Ref'; // e.g., r1Ref, n2Ref
            whitePiecesRefs[key] = piece;

            pixiAppRef.current.stage.addChild(piece);
        });



        /* ###################################################### TEST LOGS ###################################################### */


        // STATE CHECKER FOR EVERY PIECE
        // let consoleCount = 1;
        // console.log(`--- CURRENT BOARD STATE (${consoleCount++}) ---`);
        // pieceOrder.forEach((type, col) => {
        //     console.log(
        //         `${type.toUpperCase()} : white, row=${whitePiecesRefs[`${type.toLowerCase()}${col + 1}Ref`].row}, col=${whitePiecesRefs[`${type.toLowerCase()}${col + 1}Ref`].col}`);
        // });
        // for (let col = 0; col < 8; col++) {
        //     console.log(`P : white, row=${whitePiecesRefs[`p${col + 1}Ref`].row}, col=${whitePiecesRefs[`p${col + 1}Ref`].col}`)
        // }
        // console.log('-------------------------------');
        // pieceOrder.forEach((type, col) => {
        //     console.log(
        //         `${type.toUpperCase()} : black, row=${blackPiecesRefs[`${type.toLowerCase()}${col + 1}Ref`].row}, col=${blackPiecesRefs[`${type.toLowerCase()}${col + 1}Ref`].col}`);
        // });
        // for (let col = 0; col < 8; col++) {
        //     console.log(`P : black, row=${blackPiecesRefs[`p${col + 1}Ref`].row}, col=${blackPiecesRefs[`p${col + 1}Ref`].col}`)
        // }

        const piece = whitePiecesRefs['r1Ref'].type;
        const row = whitePiecesRefs['r1Ref'].row;
        const col = whitePiecesRefs['r1Ref'].col;

        console.log(moveRook(piece, row, col, 'white', 5, 5));

        return () => {
            pixiAppRef.current.destroy(true, true);
        };
    }, []);


    /* ###################################################### PIECES LOGIC ###################################################### */



    function placePiece(color, type, row, col, sprite) {
        board.current[row][col] = { color, type, sprite };
    }

    function showPieceMove(piece) {

        sprite = piece?.sprite;
        console.log(sprite);

        switch (piece) {
            case 'rook':
                return;
            case 'knight':
                return;
            default: // pawns
                return;
        }
    }



    /* ###################################################### ROOK MOVES LOGIC ###################################################### */




    function moveRook(piece, rookRow, rookCol, color, dstRow, dstCol) {

        const errorLogs = [];
        const targetSquare = board.current?.[dstRow]?.[dstCol];

        if (targetSquare) {
            if (targetSquare.color === color) {
                errorLogs.push(`You cannot capture a piece of the same color => [${dstRow}][${dstCol}]`);
                if (dstRow === rookRow && dstCol === rookCol) {
                    errorLogs.push(`You cannot go to the same square => [${dstRow}][${dstCol}]`);
                }
                return errorLogs;
            }

            const piece = board.current[rookRow][rookCol];
            if (!piece) return;
            const sprite = piece.sprite;

            sprite.x = dstCol * squareSize + squareSize / 2;
            sprite.y = dstRow * squareSize + squareSize / 2;

            sprite.row = dstRow;
            sprite.col = dstCol;

            board.current[rookRow][rookCol] = null;
            board.current[dstRow][dstCol] = piece;

            /*
                check if move is illegal
                    // true : break
    
                increment focused square until you reach the destination square - 1 // e.g., starting square = [7][0], dstSquare = [2][0], focused squares range = [6][0], [5][0], [4][0], [3][0]
                // check if focused square is not null
                    // true : break
                        
                // check if the destination square is null
                    // true  : 
                        const piece = board.current[rookRow][rookCol];
                        if (!piece) return;
                        const sprite = piece.sprite;

                        sprite.x = dstCol * squareSize + squareSize / 2;
                        sprite.y = dstRow * squareSize + squareSize / 2;

                        sprite.row = dstRow;
                        sprite.col = dstCol;

                        board.current[rookRow][rookCol] = null;
                        board.current[dstRow][dstCol] = piece;
                            
                    // false : capture the piece (copy taken piece to deadColorPieces --> remove taken piece from board --> place piece at destination square)
            */
        }

        return errorLogs;

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={chessCanvasRef} style={{ border: '5px solid black' }}></canvas>
        </div>
    );
};

export default ChessCanvas;

import * as PIXI from 'pixi.js';
import React from 'react';
import { createChessBoard } from './chess-util/ChessBoard';

const ChessCanvas = ({ castContext }) => {
    const chessCanvasRef = React.useRef(null);
    const pixiAppRef = React.useRef(null);
    const squareSize = 100;
    const lightTexture = PIXI.Texture.from("/lightTexture.jpg");
    const darkTexture = PIXI.Texture.from("/darkTexture.webp");

    React.useEffect(() => {
        const app = new PIXI.Application({
            view: chessCanvasRef.current,
            width: 800,
            height: 800,
            backgroundAlpha: 1,
            backgroundColor: 0xffffff,
        });

        // Initialize application
        pixiAppRef.current = app;

        // Initialize board
        const board = createChessBoard(lightTexture, darkTexture, squareSize);
        app.stage.addChild(board);

        

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

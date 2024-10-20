import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import CONFIG, { TPoint } from '../../config';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';
import Game from '../../game/Game';
import { Canvas, useCanvas } from '../../services/canvas';
import useSprites from './hooks/useSprites';
import { ServerContext } from '../../App';
import { TCoeffs } from '../../services/server/types';

const GAME_FIELD = 'game-field';
const GREEN = '#00e81c';

const GamePage: React.FC<IBasePage> = (props: IBasePage) => {
    const { WINDOW, SPRITE_SIZE } = CONFIG;
    const { setPage } = props;
    const server = useContext(ServerContext);
    let coeffs: TCoeffs;
    let points: TPoint[];
    let game: Game | null = null;
    // инициализация канваса
    let canvas: Canvas | null = null;
    const Canvas = useCanvas(render);
    let interval: NodeJS.Timer | null = null;
    // инициализация карты спрайтов
    const [
        [spritesImage],
        getSprite,
    ] = useSprites();

    function printFillSprite(image: HTMLImageElement, canvas: Canvas, { x = 0, y = 0 }, points: number[]): void {
        canvas.spriteFull(image, x, y, points[0], points[1], points[2]);
    }

    function printKapitoshka(canvas: Canvas, { x = 0, y = 0 }, points: number[]): void {
        printFillSprite(spritesImage, canvas, { x, y }, points);
    }

    async function printMap(canvas: Canvas): Promise<any> {
        const coeffsAndPoints = await server.generateMap();
        if (coeffsAndPoints) {
            coeffs = coeffsAndPoints.coeffs;
            points = coeffsAndPoints.points;
            canvas.drawSpline(points, coeffs);
        }
    }

    // функция отрисовки одного кадра сцены
    function render(FPS: number): void {
        if (canvas && game) {
            canvas.clear();
            const { kapitoshka } = game.getScene();

            /************************/
            /* нарисовать Капитошку */
            /************************/
            const { x, y } = kapitoshka;
            printKapitoshka(canvas, { x, y }, getSprite(1));

            /******************/
            /* нарисовать FPS */
            /******************/
            canvas.text(WINDOW.LEFT + 0.2, WINDOW.TOP + 0.5, String(FPS), GREEN);
            /************************/
            /* отрендерить картинку */
            /************************/

            canvas.drawSpline(points, coeffs);

            canvas.render();
        }
    }

    const backClickHandler = () => setPage(PAGES.CHAT);

    /****************/
    /* Mouse Events */
    /****************/
    const mouseMove = (_x: number, _y: number) => {
    }

    const mouseClick = (_x: number, _y: number) => {
    }

    const mouseRightClick = () => {
    }
    /****************/

    useEffect(() => {
        // инициализация игры
        canvas = Canvas({
            parentId: GAME_FIELD,
            WIDTH: WINDOW.WIDTH * SPRITE_SIZE,
            HEIGHT: WINDOW.HEIGHT * SPRITE_SIZE,
            WINDOW,
            callbacks: {
                mouseMove,
                mouseClick,
                mouseRightClick,
            },
        });
        game = new Game(canvas);
        printMap(canvas);
        return () => {
            // деинициализировать все экземпляры
            game?.destructor();
            canvas?.destructor();
            canvas = null;
            game = null;
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        }
    });

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            const keyCode = event.keyCode ? event.keyCode : event.which ? event.which : 0;
            if (game) {
                switch (keyCode) {
                    case 65: // a
                        game.actions.moveLeft = true;
                        break
                    case 68: // d
                        game.actions.moveRight = true;
                        break;
                    case 87: // w
                        game.actions.moveUp = true;
                        break
                    case 83: // s
                        game.actions.moveDown = true;
                        break
                    case 32: // Space
                        game.jump();
                        game.actions.jump = false;
                        break
                }
            }
        }
        const keyUpHandler = (event: KeyboardEvent) => {
            const keyCode = event.keyCode ? event.keyCode : event.which ? event.which : 0;
            if (game) {
                switch (keyCode) {
                    case 65: // a
                        game.actions.moveLeft = false;
                        break
                    case 68: // d
                        game.actions.moveRight = false;
                        break;
                    case 87: // w
                        game.actions.moveUp = false;
                        break
                    case 83: // s
                        game.actions.moveDown = false;
                        break
                    case 32: // Space
                        game.actions.jump = true;
                        break
                }
            }
        }


        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keydown', keyUpHandler);
        }
    });

    return (<div className='game'>
        <h1>Игра</h1>
        <Button onClick={backClickHandler} text='Назад' />
        <div id={GAME_FIELD} className={GAME_FIELD}></div>
    </div>)
}

export default GamePage;
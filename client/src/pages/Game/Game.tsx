import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import CONFIG, { TPoint } from '../../config';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';
import Game from '../../game/Game';
import { Canvas, useCanvas } from '../../services/canvas';
import { useSprites, getSpritesFromFrame } from './hooks/useSprites';
import { ServerContext, StoreContext } from '../../App';
import { TCoeffs } from '../../services/server/types';

const GAME_FIELD = 'game-field';
const GREEN = '#00e81c';

const GamePage: React.FC<IBasePage> = (props: IBasePage) => {
    const { WINDOW, SPRITE_SIZE } = CONFIG;
    const { setPage } = props;
    const [showButtons, setShowButtons] = useState(false);
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    let pointsToDraw: TPoint[];
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

    function printFillSprite(image: HTMLImageElement, canvas: Canvas, { x = 0, y = 0 }, points: number[], direction = 'right'): void {
        canvas.spriteFull(image, x, y, points[0], points[1], points[2], direction);
    }

    function printKapitoshka(canvas: Canvas, { x = 0, y = 0 }, points: number[], direction = 'right'): void {
        printFillSprite(spritesImage, canvas, { x, y }, points, direction);
    }

    async function printMap(canvas: Canvas): Promise<any> {
        const coeffsAndPoints = await server.generateMap();
        if (coeffsAndPoints) {
            const coeffs = coeffsAndPoints.coeffs;
            const points = coeffsAndPoints.points;
            pointsToDraw = calcSplines(points, coeffs);
            await canvas.drawSpline(pointsToDraw);
        }
    }

    function calcSplines(points:TPoint[], coeffs:TCoeffs): TPoint[] {
        
        const dx = WINDOW.WIDTH / 1200;
        const pointsToDraw: TPoint[] = [];
        
        for (let i = 0; i < points.length - 1; i++) {
            for (let x = points[i].x; x <= points[i + 1].x; x += dx) {
                const t = x - points[i].x;
                const y = coeffs.a[i] + coeffs.b[i] * t + coeffs.c[i] * t ** 2 + coeffs.d[i] * t ** 3;
                pointsToDraw.push({x: x, y: y});
            }
        }
        return pointsToDraw;
    }



    function printExplosions () {
        if (game) {
            const explosions = game.explosions;
            explosions.forEach(explosion => canvas?.printExplosion(explosion.x, explosion.y, 250));
        }
    }

    // функция отрисовки одного кадра сцены
    function render(FPS: number): void {
        if (canvas && game) {
            canvas.clear();
            const { kapitoshka, lemmings } = game.getScene();
            /************************/
            /* нарисовать Капитошку */
            /************************/
            //  const { x, y } = kapitoshka;
            //  printKapitoshka(canvas, { x, y }, getSprite(1));
            
            
            
            for (let i = 0; i < lemmings.length; i++) {
                    const {x, y, direction, lemming_id} = lemmings[i];
                    printKapitoshka(canvas, { x, y }, getSprite(getSpritesFromFrame([4 + 3 * (lemming_id-1), 5 + 3 * (lemming_id-1), 6 + 3 * (lemming_id-1)])), direction);
            }




            /******************/
            /* нарисовать FPS */
            /******************/
            canvas.text(WINDOW.LEFT + 0.2, WINDOW.TOP + 0.5, String(FPS), GREEN);
            /************************/
            /* отрендерить картинку */
            /************************/

            canvas.render();
        }
    }
   
    const showButtonsClickHandler = () => {
        setShowButtons(!showButtons);
    }
    const backClickHandler = () => setPage(PAGES.LOBBY);
    const settingsClickHandler = () => setPage(PAGES.SETTINGS);

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
        game = new Game(canvas, WINDOW, server);
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
                    case 88: // x
                        game.explode();
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

    return (<div className='game' id='test-game-page'>
        
        <div>
            <button onClick={showButtonsClickHandler}> + </button>

            {showButtons &&( 
                <div>
                    <button onClick={backClickHandler}> Назад </button>
                    <button onClick={settingsClickHandler}> Настройки </button>
                </div>)}
        </div>
    
        <div id={GAME_FIELD} className={GAME_FIELD}></div>
    </div>)
}

export default GamePage;
import CONFIG, { TPoint } from "../config";
import { Canvas } from "../services/canvas";
import { TLemming, TLemmingStatus } from "../services/server/types";
import Store from "../services/store/Store";
const { WIDTH, HEIGHT } = CONFIG;

class Game {
    public kapitoshka: TPoint;
    public actions = {
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false,
        jump: true
    }
    public explosions: TPoint[];
    public dx = 0;
    public dy = 0;
    private moving: NodeJS.Timer;
    private playersInterval: NodeJS.Timer;
    private canvas: Canvas | null;
    private server: any;
    private WINDOW: { LEFT: number, TOP: number, HEIGHT: number, WIDTH: number };
    private lemmings: TLemmingStatus[];
    private login: string | undefined;
    private store: Store;

    constructor(canvas: Canvas, WINDOW: { LEFT: number, TOP: number, HEIGHT: number, WIDTH: number }, server:any) {
        this.kapitoshka = { x: 2, y: -5 };
        this.canvas = canvas;
        this.moving = setInterval(() => this.velocity(), 5);
        this.playersInterval = setInterval(() => this.updateLemmingsStatus(), 25);
        this.WINDOW = WINDOW;
        this.server = server;
        this.explosions = [];
        this.lemmings = [];
        this.store = this.server.store;
        this.login = this.store.user?.login;
        server.addLemming(this.store.user?.id, this.store.lemming.id, 2, -5, 'right', 'move')
    }

    destructor() {
        clearInterval(this.moving);
        clearInterval(this.playersInterval);
        this.WINDOW.LEFT = 0;
        this.WINDOW.TOP = 0;
        this.server.removeLemming(this.store.user?.id);
    }

    getScene() {
        return {
            kapitoshka: this.kapitoshka,
            explosions: this.explosions,
            lemmings: this.lemmings
        };
    }

    doActions() {
        if (this.actions.moveLeft && this.dx >= -0.1) {
            this.dx -= 0.015;
        }
        if (this.actions.moveRight && this.dx <= 0.1) {
            this.dx += 0.015;
        }
        if (this.actions.moveDown && this.dy <= 0.07) {
            this.dy += 0.015;
        }
        if (this.actions.moveUp && this.dy >= -0.1) {
            this.dy -= 0.02;
        }
    }

    jump() {
        if (this.actions.jump && this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'down')) {
            const jumpDuration = setInterval(() => {
                this.dy = 0;
                this.dy = -0.15;
            }, 5);
            setTimeout(() => clearInterval(jumpDuration), 150);
        }
    }

    explode() {
        this.explosions.push({ x: this.kapitoshka.x, y: this.kapitoshka.y });
        this.canvas?.printExplosion(this.kapitoshka.x, this.kapitoshka. y, 250);
    }


    //Надо будет как-то разнести на несколько функций
    move(dx: number, dy: number): void {
        if ((this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'right') || this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'left')) && this.dx != 0) {
            this.dy = 0;
            this.dy -= 0.04;
        }
        if ((dx > 0 && this.kapitoshka.x + dx <= (this.WINDOW.LEFT + this.WINDOW.WIDTH) && !this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'right')) ||
            (dx < 0 && this.kapitoshka.x - dx >= 0 && !this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'left'))
        ) {
            if (((this.kapitoshka.x > (this.WINDOW.LEFT + this.WINDOW.WIDTH / 2 - 0.5)) && (this.kapitoshka.x < (this.WINDOW.LEFT + ((this.WINDOW.WIDTH / 2) + 0.5)))) &&
                (
                    (dx > 0 && this.WINDOW.LEFT < 50) ||
                    (dx < 0 && this.WINDOW.LEFT > 0))
            ) {
                this.WINDOW.LEFT += dx;
            }
            this.kapitoshka.x += dx;
        }
        if ((dy > 0 && !this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'down')) ||
            (dy < 0 && !this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'up'))
        ) {
            this.kapitoshka.y += dy;
            this.WINDOW.TOP = this.kapitoshka.y - this.WINDOW.HEIGHT/2 - 0.5;
        }
    }

    velocity() {
        this.doActions();
        if (this.dx > 0) {
            this.dx = this.dx - 0.007;
            if (this.dx < 0) {
                this.dx = 0;
            }
        }
        if (this.dx < 0) {
            this.dx = this.dx + 0.007;
            if (this.dx > 0) {
                this.dx = 0;
            }
        }
        if (this.dy < 0.1) {
            this.dy += 0.015;
        }
        this.move(this.dx, this.dy);
    }

    checkCollision(x = 0, y = 0, dir: string) {
        x += this.WINDOW.LEFT;
        y += this.WINDOW.TOP;
        switch (dir) {
            case 'right': {
                for (let i = 0; i < 64; i++) {
                    if (this.canvas?.getPixelColor(this.canvas.xs(x) + 64, this.canvas.ys(y) + i)[3] === 255) {
                        return true;
                    }
                }
                break;
            }
            case 'left': {
                for (let i = 0; i < 64; i++) {
                    if (this.canvas?.getPixelColor(this.canvas.xs(x), this.canvas.ys(y) + i)[3] === 255) {
                        return true;
                    }
                }
                break;
            }
            case 'up': {
                for (let i = 0; i < 64; i++) {
                    if (this.canvas?.getPixelColor(this.canvas.xs(x) + i, this.canvas.ys(y))[3] === 255) {
                        return true;
                    }
                }
                break;
            }
            case 'down': {
                for (let j = 0; j < 2; j++) {
                    for (let i = 0; i < 64; i++) {
                        this.canvas?.text(x, y, '1', 'white');
                        if (this.canvas?.getPixelColor(this.canvas.xs(x) + i, this.canvas.ys(y) + 64 - j)[3] === 255) {
                            return true;
                        }
                    }
                }
                break;
            }
        }
    }

    async updateLemmingsStatus() {
        let direction = 'right';
        let status = 'move';
        if (this.dx < 0) {
            direction = 'left';
        } else if (this.dx > 0) {
            direction = 'right';
        }
        this.server.givePosition(this.store.user?.id, this.store.lemming.id, this.kapitoshka.x, this.kapitoshka.y, direction, status);
        const lemmings = await this.server.getPosition(this.store.user?.id);
        if (lemmings) {
            this.lemmings = lemmings;
        }
    }

}

export default Game;
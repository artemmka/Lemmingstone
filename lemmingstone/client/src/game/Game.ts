import CONFIG, { TPoint } from "../config";
import { Canvas } from "../services/canvas";
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
    public dx = 0;
    public dy = 0;
    private moving: NodeJS.Timer;
    private canvas: Canvas | null

    constructor(canvas: Canvas) {
        this.kapitoshka = { x: 2, y: 5 };
        this.canvas = canvas;
        this.moving = setInterval(() => this.velocity(), 10);
    }

    destructor() {
        clearInterval(this.moving);
    }

    getScene() {
        return {
            kapitoshka: this.kapitoshka,
        };
    }

    doActions() {
        if (this.actions.moveLeft && this.dx >= -0.1) {
            this.dx -= 0.03;
        }
        if (this.actions.moveRight && this.dx <= 0.1) {
            this.dx += 0.03;
        }
        if (this.actions.moveDown && this.dy <= 0.07) {
            this.dy += 0.03;
        }
        if (this.actions.moveUp && this.dy >= -0.1) {
            this.dy -= 0.07;
        }
    }

    jump() {
        if (this.actions.jump && this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'down')) {
            const jumpDuration = setInterval(() => {
                    this.dy = 0;
                    this.dy = -0.2;
            }, 5);
            setTimeout(() => clearInterval(jumpDuration), 150);
        }
    }

    move(dx: number, dy: number): void {
        if ((dx > 0 && this.kapitoshka.x + dx <= WIDTH - 1 && !this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'right')) ||
            (dx < 0 && this.kapitoshka.x - dx >= 0 && !this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'left'))
        ) {
            this.kapitoshka.x += dx;
        }
        if ((dy > 0 && this.kapitoshka.y + dy <= HEIGHT - 1 && !this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'down')) ||
            (dy < 0 && this.kapitoshka.y - dy >= 0 && !this.checkCollision(this.kapitoshka.x, this.kapitoshka.y, 'up'))
        ) {
            this.kapitoshka.y += dy;
        }
    }

    velocity() {
        this.doActions();
        if (this.dx > 0) {
            this.dx = this.dx - 0.01;
            if (this.dx < 0) {
                this.dx = 0;
            }
        }
        if (this.dx < 0) {
            this.dx = this.dx + 0.01;
            if (this.dx > 0) {
                this.dx = 0;
            }
        }
        if (this.dy < 0.1) {
            this.dy += 0.03;
        }
        this.move(this.dx, this.dy);
    }

    checkCollision(x = 0, y = 0, dir: string) {
        switch (dir) {
            case 'right': {
                for (let i = 0; i < 64; i++) {
                    if (this.canvas?.getPixelColor(this.canvas.xs(x) + 64, this.canvas.ys(y) + i)[0] === 255) {
                        return true;
                    }
                }
                break;
            }
            case 'left': {
                for (let i = 0; i < 64; i++) {
                    if (this.canvas?.getPixelColor(this.canvas.xs(x), this.canvas.ys(y) + i)[0] === 255) {
                        return true;
                    }
                }
                break;
            }
            case 'up': {
                for (let i = 0; i < 64; i++) {
                    if (this.canvas?.getPixelColor(this.canvas.xs(x) + i, this.canvas.ys(y))[0] === 255) {
                        return true;
                    }
                }
                break;
            }
            case 'down': {
                for (let i = 0; i < 64; i++) {
                    if (this.canvas?.getPixelColor(this.canvas.xs(x) + i, this.canvas.ys(y) + 64)[0] === 255) {
                        return true;
                    }
                }
                break;
            }
        }
    }

}

export default Game;
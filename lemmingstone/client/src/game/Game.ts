import CONFIG, { TPoint } from "../config";
const { WIDTH, HEIGHT } = CONFIG;

class Game {
    private kapitoshka: TPoint;

    constructor() {
        this.kapitoshka = { x: 2, y: 5 };
    }

    destructor() {
        //...
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
        if ((dx > 0 && this.kapitoshka.x + dx <= WIDTH - 1) ||
            (dx < 0 && this.kapitoshka.x - dx >= 0)
        ) {
            this.kapitoshka.x += dx;
        }
        if ((dy > 0 && this.kapitoshka.y + dy <= HEIGHT - 1) ||
            (dy < 0 && this.kapitoshka.y - dy >= 0)
        ) {
            this.kapitoshka.y += dy;
        }
    }
}

export default Game;
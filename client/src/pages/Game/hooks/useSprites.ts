import CONFIG from '../../../config';

import sprites from '../../../assets/img/lemmingssprite.png';
import spritesMap from "../../../assets/img/spritemap.png"

const explosionSprites = new Image();
explosionSprites.src = spritesMap;


// взять спрайт для обычной анимации
const count = {
    frame: 0,
    timestamp: Date.now(),
};
export const getSpritesFromFrame = (frame: number[]) => {
    const currentTimestamp = Date.now();
    if (currentTimestamp - count.timestamp >= 100) {
        count.timestamp = currentTimestamp;
        if (count.frame >= 0) {
            count.frame++;
            if (count.frame >= frame.length) {
                count.frame = 0;
            }
        }
    }
    return frame[count.frame];
}

export const useSprites = (): [HTMLImageElement[], (spriteNo: number) => number[], Array<() => number>] => {
    const { SPRITE_SIZE, LINE_OF_SPRITES } = CONFIG;
    const spritesImage = new Image();
    spritesImage.src = sprites;

    const getSprite = (spriteNo: number): number[] => {
        const y = Math.trunc((spriteNo - 1) / LINE_OF_SPRITES) * SPRITE_SIZE;
        const x = spriteNo % LINE_OF_SPRITES !== 0 ? (spriteNo % LINE_OF_SPRITES - 1) * SPRITE_SIZE : (LINE_OF_SPRITES - 1) * SPRITE_SIZE;
        return [x, y, SPRITE_SIZE];
    }

    return [
        [spritesImage, explosionSprites],
        getSprite,
        [], // для анимации
    ];
}

export const getExplosionFrame = (frame: number) => {
    const x = (frame-1)*250;
    const y = 750;
    return [x, y];
}

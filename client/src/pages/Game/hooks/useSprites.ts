import CONFIG from '../../../config';

import sprites from '../../../assets/img/lemmingssprite.png';

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
    console.log(frame[count.frame])
    return frame[count.frame];
}

export const useSprites = (): [HTMLImageElement[], (spriteNo: number) => number[], Array<() => number>] => {
    const { SPRITE_SIZE, LINE_OF_SPRITES } = CONFIG;
    const spritesImage = new Image();
    spritesImage.src = sprites;

    const getSprite = (spriteNo: number): number[] => {
        const y = Math.trunc((spriteNo - 1) / LINE_OF_SPRITES) * SPRITE_SIZE;
        const x = spriteNo % LINE_OF_SPRITES !== 0 ? (spriteNo % LINE_OF_SPRITES - 1) * SPRITE_SIZE : (LINE_OF_SPRITES - 1) * SPRITE_SIZE;
        console.log(x, y);
        return [x, y, SPRITE_SIZE];
    }

    return [
        [spritesImage],
        getSprite,
        [] // для анимации
    ];
}

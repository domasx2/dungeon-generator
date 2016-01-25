export const TOP = 0;
export const RIGHT = 90;
export const BOTTOM = 180;
export const LEFT = 270;

export const FACING = [TOP, RIGHT, BOTTOM, LEFT];

export const FACING_TO_STRING = {
    [TOP]: 'top',
    [RIGHT]: 'right',
    [BOTTOM]: 'bottom',
    [LEFT]: 'left'
};

export const FACING_TO_MOD = {
    [TOP]: [0, -1],
    [RIGHT]: [1, 0],
    [BOTTOM]: [0, 1],
    [LEFT]: [-1, 0]
};

export const FACING_INVERSE = {
    [TOP]: BOTTOM,
    [RIGHT]: LEFT,
    [BOTTOM]: TOP,
    [LEFT]: RIGHT
};

export const FACING_MOD_RIGHT = {
    [TOP]: RIGHT,
    [RIGHT]: BOTTOM,
    [BOTTOM]: LEFT,
    [LEFT]: TOP
};

export const FACING_MOD_LEFT = {
    [TOP]: LEFT,
    [RIGHT]: TOP,
    [BOTTOM]: RIGHT,
    [LEFT]: BOTTOM
};
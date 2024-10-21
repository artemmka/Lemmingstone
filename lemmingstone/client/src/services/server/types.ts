export type TError = {
    code: number;
    text: string;
}

export type TAnswer<T> = {
    result: 'ok' | 'error';
    data?: T;
    error?: TError;
}

export type TUser = {
    token: string;
    name: string;
}

export type TMessage = {
    message: string;
    author: string;
    created: string;
}

export type TMessages = TMessage[];
export type TMessagesResponse = {
    messages: TMessages;
    hash: string;
}

export type TCoeffs = {
    a: number[],
    b: number[],
    c: number[],
    d: number[],
    h: number[]
}

export type TPoint = {
    x: number;
    y: number;
}

export type TPointsAndSplines = {
    coeffs: TCoeffs,
    points: TPoint[];
}

export type TLemming = {
    id: number;
    name: string;
    hp: number;
    speed: number;
    slots: number;
}
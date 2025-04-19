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
    login: string;
    token: string;
    name: string;
    id: string;
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
    points: TPoint[];
    coefficients: TCoeffs,
}

export type TLemming = {
    id: number;
    name: string;
    hp: number;
    speed: number;
    slots_count: number;
    image: string;
}

export type TLemmingStatus = {
    id: number,
    user_id: number,
    lemming_id: number,
    x: number,
    y: number,
    direction: string,
    status: string
}

export type TMapChange = {
    timeStamp: Date,
    type: string,
    x: number,
    y: number,
    direction?: string,
}
export type TMapChanges = {
    changes: TMapChange[],
    hash: string
}

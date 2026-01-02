export declare class HttpError extends Error {
    #private;
    constructor(message: string, code?: number);
    get code(): number;
}

export class ExpectedMaxPagesError extends Error {
    constructor() {
        super('Expected a X-Pages header but got none!');
    }
}

export class PageOutOfBoundsError extends Error {
    constructor() {
        super('The requested pages exceeds the limits!');
    }
}
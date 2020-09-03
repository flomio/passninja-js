export class PassNinjaException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, PassNinjaException.prototype);
    }
}

export class PassNinjaInvalidArgumentsException extends PassNinjaException {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, PassNinjaInvalidArgumentsException.prototype);
    }    
}
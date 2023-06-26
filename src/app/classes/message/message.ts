export class Message {
    public message: string = '';
    public isAI: boolean = false;
    public isError: boolean = false;
    public huggingfaceUrl: string = '';

    constructor(message: string, isAI: boolean, isError: boolean, huggingfaceUrl: string) {
        this.message = message;
        this.isAI = isAI;
        this.isError = isError;
        this.huggingfaceUrl = huggingfaceUrl;
    }
}

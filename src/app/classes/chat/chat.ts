import { Message } from "../message/message";

export class Chat {
    public name: string = 'Untitled Chat';
    public huggingfaceUrls: string[] = [''];
    public messages: Message[] = [];
    public isLoading: boolean = false;

    constructor(name: string, huggingfaceUrls: string[]) {
        this.name = name;
        this.huggingfaceUrls = huggingfaceUrls;
    }
}

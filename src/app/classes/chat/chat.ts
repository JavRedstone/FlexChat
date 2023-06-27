import { Message } from "../message/message";
import { Model } from "../model/model";

export class Chat {
    public name: string = 'Untitled Chat';
    public huggingfaceModels: Model[] = [];
    public messages: Message[] = [];
    public isLoading: boolean = false;

    constructor(name: string, huggingfaceModels: Model[]) {
        this.name = name;
        this.huggingfaceModels = huggingfaceModels;
    }
}

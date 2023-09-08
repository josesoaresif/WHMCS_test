export class RequestService {
    protected url: string;

    constructor(url: string) {
        this.url = url;
    }

    setUrl(url: string): this {
        this.url = url;
        return this;
    }
}

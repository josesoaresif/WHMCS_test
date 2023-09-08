import { injectable } from 'inversify';

import { HtmlUtility } from './HtmlUtility';



declare const $: any;

@injectable()
export class CreditCardUtility extends HtmlUtility {
    private creditCardErrorInvalidMethodMessage: string;
    
    constructor(creditCardErrorInvalidMethodMessage: string) {
        super();
        this.creditCardErrorInvalidMethodMessage = creditCardErrorInvalidMethodMessage;
    }

    public get creditCardErrorInvalidMethod() {
        return this.creditCardErrorInvalidMethodMessage;
    }
}

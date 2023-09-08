
import { injectable } from "inversify";

import { HttpService } from "../services/HttpService";
import { HtmlUtility } from '../utility/HtmlUtility';
import { MbwayUtility } from '../utility/MbwayUtility';

declare const ifthenpayUserPaymentMethods: Array<any>;

@injectable()
export class Page {
    protected eventTarget: JQuery<HTMLElement>;
    protected eventTargetSrc: string;
    protected documentFragment: JQuery<DocumentFragment>;
    protected ifthenpayUserPaymentMethods: any;
    protected httpService: HttpService;
    protected htmlUtility: HtmlUtility;
    protected mbwayUtility: MbwayUtility;
    protected spinner: JQuery<HTMLElement>;

    constructor() {
        this.documentFragment = $(document.createDocumentFragment());
        this.ifthenpayUserPaymentMethods = typeof ifthenpayUserPaymentMethods !== 'undefined' ? ifthenpayUserPaymentMethods : [];
    }

    public setEventDefault(event: JQuery.TriggeredEvent, preventDefault: boolean): void {
        if (preventDefault) {
            event.preventDefault();
        }
        this.eventTarget = $(event.target);
    }
}

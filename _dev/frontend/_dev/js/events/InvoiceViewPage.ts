
import { injectable } from 'inversify';

import { MbwayCountdown } from '../classes/MbwayCountDown';
import containerInvoiceViewPage from '../container/inversify.invoiceViewPage';
import { Event } from '../decorators/Event';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { SucessInterface } from '../interfaces/SuccessInterface';
import { HttpService } from '../services/HttpService';
import { MbwayUtility } from '../utility/MbwayUtility';

import { Page } from './Page';

declare const $: any;
declare const window: any;

@injectable()
export class InvoiceViewPage extends Page {
    private mbwayCountdownPanel: JQuery<HTMLElement>;

    constructor(mbwayUtility: MbwayUtility) {
        super();
        this.mbwayUtility = mbwayUtility;
    }

    @Event('submit', '#formIfthenpayMbway')
    submitMbwayPayment(event: JQuery.TriggeredEvent): boolean {
        this.setEventDefault(event, false);
        return this.mbwayUtility.checkMbwayBeforeSubmit(this.eventTarget);
    }

    @Event('click', '#resendMbwayNotificationMbway')
    resendMbwayNotification(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, true);
        clearInterval(window.mbwayInterval);
        clearInterval(window.mbwayInterval2);
        this.spinner = this.eventTarget.next('.appSpinner');
        this.mbwayCountdownPanel = $('div.mbwayCountdownPanel');
        this.spinner.show();
        this.mbwayCountdownPanel.hide();
        this.httpService = containerInvoiceViewPage.get(HttpService);
        this.httpService.setUrl(<any>this.eventTarget.attr('href'));
        this.httpService.get().then((response: SucessInterface) => {
            this.mbwayCountdownPanel.show();
            containerInvoiceViewPage.get(MbwayCountdown).init();
            $(this.mbwayUtility.getSuccessMessage(response.success)).insertBefore(this.mbwayCountdownPanel);
            this.spinner.hide();
        }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            $(this.htmlUtility.getErrorMessage((xhr.responseJSON as ErrorInterface).error)).insertBefore(this.eventTarget);
            this.spinner.remove();
        });
    }
}

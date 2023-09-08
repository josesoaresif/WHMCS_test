
import { injectable } from 'inversify';

import containerAdminConfigPage from '../container/inversify.adminConfigPage';
import { Event } from '../decorators/Event';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { IfthenpayDataInterface } from '../interfaces/IfthenpayDataInterface';
import { SucessInterface } from '../interfaces/SuccessInterface';
import { HttpService } from '../services/HttpService';
import { HtmlUtility } from '../utility/HtmlUtility';

import { Page } from './Page';

declare const $: any;
declare const ifthenpayData: IfthenpayDataInterface;

@injectable()
export class AdminConfigPage extends Page {

    constructor(htmlUtility: HtmlUtility) {
        super();
        this.htmlUtility = htmlUtility;
    }

    @Event('change', 'select[name ="field[entidade]"]')
    changeEntidade(event: JQuery.TriggeredEvent): void {
        this.setEventDefault(event, false);
        $(this.htmlUtility.getSpinnerHtml(ifthenpayData.systemUrl)).insertAfter(this.eventTarget);
        this.spinner = $('.appSpinner');
        const containerSubEntidade = $('select[name ="field[subEntidade]"]');
        this.spinner.show();
        this.httpService = containerAdminConfigPage.get(HttpService);
        this.httpService.setUrl(ifthenpayData.systemUrl + 'modules/gateways/ifthenpay/server/changeEntidade.php');
        this.httpService.post({
            action : 'GetSubEntidade',
            entidade: this.eventTarget.val(),
        }).then((response: Array<string>) => {
            containerSubEntidade.find('option').remove();
            Object.keys(response).forEach(key => {
                response[key].SubEntidade.forEach((subEntidade) => {
                    this.documentFragment.append($(`<option value="${subEntidade}">${subEntidade}</option>`));
                });
            });
            containerSubEntidade.append(this.documentFragment);
            this.spinner.remove();
        }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            $(this.htmlUtility.getErrorMessage((xhr.responseJSON as ErrorInterface).error)).insertBefore(this.eventTarget);
            this.spinner.remove();
        });
    }

    @Event('click', '#requestNewAccount')
    addNewAccount(event: JQuery.TriggeredEvent): void {
        console.log('request new account event');
        this.setEventDefault(event, true);
        $(this.htmlUtility.getSpinnerHtml(ifthenpayData.systemUrl)).insertAfter(this.eventTarget);
        this.spinner = $('.appSpinner');
        this.spinner.show();
        this.httpService = containerAdminConfigPage.get(HttpService);
        this.httpService.setUrl(ifthenpayData.systemUrl + 'modules/gateways/ifthenpay/server/addNewAccount.php');
        this.httpService.post({
            action : 'addNewAccount',
            paymentMethod: this.eventTarget.attr('data-paymentmethod'),
        }).then((response: SucessInterface) => {
            $(this.htmlUtility.getSuccessMessage(response.success)).insertBefore(this.eventTarget);
            this.spinner.remove();
        }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            $(this.htmlUtility.getErrorMessage((xhr.responseJSON as ErrorInterface).error)).insertBefore(this.eventTarget);
            this.spinner.remove();
        });
    }

    @Event('click', '#requestMultibancoDynamicAccount')
    addMultibancoDynamicAccount(event: JQuery.TriggeredEvent): void {
        console.log('request new account multibanco dynamic event');
        this.setEventDefault(event, true);
        $(this.htmlUtility.getSpinnerHtml(ifthenpayData.systemUrl)).insertAfter(this.eventTarget);
        this.spinner = $('.appSpinner');
        this.spinner.show();
        this.httpService = containerAdminConfigPage.get(HttpService);
        this.httpService.setUrl(ifthenpayData.systemUrl + 'modules/gateways/ifthenpay/server/requestMultibancoDynamicAccount.php');
        this.httpService.post({
            action : 'requestDynamicMultibancoAccount',
        }).then((response: SucessInterface) => {
            $(this.htmlUtility.getSuccessMessage(response.success)).insertBefore(this.eventTarget);
            this.spinner.remove();
        }).fail((xhr: JQuery.jqXHR, status: string, error: string) => {
            $(this.htmlUtility.getErrorMessage((xhr.responseJSON as ErrorInterface).error)).insertBefore(this.eventTarget);
            this.spinner.remove();
        });
    }
}

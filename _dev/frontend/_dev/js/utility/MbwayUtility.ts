import { injectable } from 'inversify';

import { MbwayCountdownShowType } from '../interfaces/MBwayCountdownShowDefinition';

import { HtmlUtility } from './HtmlUtility';



declare const $: any;

@injectable()
export class MbwayUtility extends HtmlUtility {
    private readonly MBWAY_PHONE_REGEX = /^((91|96|92|93)[0-9]{7})$/g;
    private mbwayPhoneErrorRequiredMessage: string;
    private mbwayPhoneErrorInvalidMessage: string;

    constructor(mbwayPhoneErrorRequiredMessage: string, mbwayPhoneErrorInvalidMessage: string) {
        super();
        this.mbwayPhoneErrorRequiredMessage = mbwayPhoneErrorRequiredMessage;
        this.mbwayPhoneErrorInvalidMessage = mbwayPhoneErrorInvalidMessage;
    }

    public get mbwayPhoneRegex() {
        return this.MBWAY_PHONE_REGEX;
    }

    public get mbwayPhoneErrorRequired() {
        return this.mbwayPhoneErrorRequiredMessage;
    }

    public get mbwayPhoneErrorInvalid() {
        return this.mbwayPhoneErrorInvalidMessage;
    }

    checkMbwayBeforeSubmit(eventTarget: JQuery<HTMLElement>, mbwayCountdownShow: MbwayCountdownShowType = 'true'): boolean {
        const mbwayPhoneNumber = $('#phone_number').val();
        if (!mbwayPhoneNumber) {
            $(this.getErrorMessage(this.mbwayPhoneErrorRequired)).insertBefore(eventTarget);
            return false;
        } else if (!this.mbwayPhoneRegex.test(mbwayPhoneNumber)){
            $(this.getErrorMessage(this.mbwayPhoneErrorInvalid)).insertBefore(eventTarget);
            return false;
        } else {
            this.deleteAllMessages();
            localStorage.removeItem('paymentMethod');
            document.cookie = `mbwayCountdownShow=${mbwayCountdownShow};`;
            return true;
        }
    }

    getMbwayPhoneHtml(systemUrl: string, submitBtn: boolean = false): string {
        return `<div class="field required" id="ifthenpayMbwayPhoneDiv">
            <div class="control input-container">
                <img src="${systemUrl}/modules/gateways/ifthenpay/svg/mbway.svg" class="icon" alt="mbway logo">
                <input name="mbwayPhoneNumber" class="text input-field" type="number" id="phone_number" placeholder="Mbway Phone Number">
            </div>${submitBtn ? '<button type="button" id="mbwayPhoneBtnSubmit" class="btn btn-danger">Submeter</button>' : ''}</div>`
    }

    removeMbwayPhoneHtml(): void {
        $('#ifthenpayMbwayPhoneDiv').remove();
    }
}

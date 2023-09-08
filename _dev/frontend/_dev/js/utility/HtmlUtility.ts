import { injectable } from 'inversify';



declare const $: any;

@injectable()
export class HtmlUtility {

    private checkMessage(messageId: string): void {
        const message = $(messageId);
        if (message.length > 0) {
            message.remove();
        }
    }

    deleteAllMessages(): void {
        const messageSuccess = $('#ifthenpaySuccessMessage');
        const messageError = $('#ifthenpayErrorMessage');
        
        if (messageSuccess.length > 0) {
            messageSuccess.remove();
        }
        
        if (messageError.length > 0) {
            messageError.remove();
        }
    }
    getErrorMessage(errorMessage: string): string {
        this.checkMessage('#ifthenpayErrorMessage');
        return `<div id="ifthenpayErrorMessage" class="alert alert-danger">${errorMessage}</div>`
    }

    getSuccessMessage(successMessage: string): string {
        this.checkMessage('#ifthenpaySuccessMessage');
        return `<div id="ifthenpaySuccessMessage" class="alert alert-success">${successMessage}</div>`
    }

    getSpinnerHtml(systemUrl: string): string {
        return `<div class="appSpinner" style="display:none">
            <img src="${systemUrl + 'modules/gateways/ifthenpay/svg/oval.svg'}"/>
        </div>`
    }
}

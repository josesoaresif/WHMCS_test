
import { injectable } from "inversify";

import { AppInterface } from '../interfaces/AppInterface';
import { ErrorInterface } from '../interfaces/ErrorInterface';

declare const $: any;
declare const window: any;

@injectable()
export class AdminConfig implements AppInterface {



	reloadIfSaveSuccessfull(buttonElement): void {
        let iterations = 15; // Total number of iterations for 3 seconds
        let interval = 200; // Interval in milliseconds
        let count = 0;

        buttonElement.prop('disabled', true); // disable submit button

        clearInterval(window.iftp_SaveInterval);

        window.iftp_SaveInterval = setInterval(() => {  // Change this line to use an arrow function
            if ($("#growls").find(".growl-notice").length > 0) {

                clearInterval(window.iftp_SaveInterval); // Stop the interval
                location.reload(); // Reload the page

            } else {
                count++;
                if (count >= iterations) {
                    clearInterval(window.iftp_SaveInterval); // Stop the interval after specified iterations
                    buttonElement.prop('disabled', false);
                }
            }
        }, interval);
    }


    bindOnClick(buttonElement): void {
        if (buttonElement.length > 0) {
            buttonElement.on('click', () => {  // Change this line to use an arrow function
                this.reloadIfSaveSuccessfull(buttonElement);
            });
        }
    }


	toggleDeadlineDropdownVisibility(entitySelect, deadlineSelect): void {


		if (entitySelect.length > 0 && deadlineSelect.length > 0) {

			if (entitySelect.val() != 'MB') {
				deadlineSelect.closest('tr').hide();
			}
			else {
				deadlineSelect.closest('tr').show();
			}

		}
	}

	setOnChangeDeadlineDropdownToggle(): void {

		const entitySelect = $("#configmultibancoForm").find("select[name='field[entidade]']");
		const deadlineSelect = $("#configmultibancoForm").find("select[name='field[multibancoValidity]']");

		if (entitySelect.length > 0 && deadlineSelect.length > 0) {

			entitySelect.on('change', () => {

				this.toggleDeadlineDropdownVisibility(entitySelect, deadlineSelect);
			});

			this.toggleDeadlineDropdownVisibility(entitySelect, deadlineSelect); // on load
		}
	}


	hideCcardCallbackFormFields(): void {

		const configForm = $("#configccardForm");

		const activateCallbackSwitch = configForm.find("input[name='field[activateCallback]']");
		const sandboxSwitch = configForm.find("input[name='field[sandboxMode]']");
		const callbackInfo = configForm.find(".ifthenpay_callback_badge");

		if (activateCallbackSwitch.length > 0) {
			activateCallbackSwitch.closest('tr').hide();
		}
		if (sandboxSwitch.length > 0) {
			sandboxSwitch.closest('tr').hide();
		}
		if (callbackInfo.length > 0) {
			callbackInfo.closest('tr').hide();
		}
	}

    init(): void {
        window.iftp_SaveInterval;

        const buttonElementCcard = $("#configccardForm").find("button[type='submit'].btn.btn-primary");
        const buttonElementMbway = $("#configmbwayForm").find("button[type='submit'].btn.btn-primary");
        const buttonElementMultibanco = $("#configmultibancoForm").find("button[type='submit'].btn.btn-primary");
        const buttonElementPayshop = $("#configpayshopForm").find("button[type='submit'].btn.btn-primary");

        this.bindOnClick(buttonElementCcard);
        this.bindOnClick(buttonElementMbway);
        this.bindOnClick(buttonElementMultibanco);
        this.bindOnClick(buttonElementPayshop);

		this.setOnChangeDeadlineDropdownToggle();
		this.hideCcardCallbackFormFields();
    }
}

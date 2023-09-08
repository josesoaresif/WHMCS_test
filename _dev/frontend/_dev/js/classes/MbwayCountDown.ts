
import { injectable } from "inversify";

import { AppInterface } from '../interfaces/AppInterface';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { IfthenpayDataInterface } from '../interfaces/IfthenpayDataInterface';
import { FacadeInterface } from '../interfaces/MbwayOrderResponseInterface';
import { HttpService } from '../services/HttpService';
import { MbwayUtility } from '../utility/MbwayUtility';

declare const $: any;
declare const window: any;
declare const ifthenpayData: IfthenpayDataInterface;

@injectable()
export class MbwayCountdown implements AppInterface {
    private timer2: string;
    private minutesElement: JQuery<HTMLElement>;
    private secondsElement: JQuery<HTMLElement>;
    private httpService: HttpService;
    private appSpinner: JQuery<HTMLElement>;
    private countdownMbway: JQuery<HTMLElement>;
    private countdownPanel: JQuery<HTMLElement>;
    private mbwayUtility: MbwayUtility;


    constructor(httpService: HttpService, mbwayUtility: MbwayUtility) {
        this.timer2 = '5:01';
        this.minutesElement = $('#countdownMinutes');
        this.secondsElement = $('#countdownSeconds');
        this.httpService = httpService;
        this.countdownPanel = $('div.mbwayCountdownPanel');
        this.appSpinner = this.countdownPanel.children('.panel-body').children('.appSpinner');
        this.countdownMbway = $('#countdownMbway');
        this.mbwayUtility = mbwayUtility;
    }

    private checkMBwayPaymentStatus() {
      window.mbwayInterval2 = setInterval(() => {
      this.httpService.setUrl(ifthenpayData.cancelMbwayOrderUrl);
      this.httpService.get().then((response: FacadeInterface) => {
        if (response.orderStatus === 'paid') {
          const resendMbwayNotificationMbway = $('#resendMbwayNotificationMbway');
          clearInterval(window.mbwayInterval);
          clearInterval(window.mbwayInterval2);
          this.countdownPanel.hide();
          resendMbwayNotificationMbway.prev('h5').hide();
          resendMbwayNotificationMbway.hide();
          $('#confirmMbwayOrder').show();
        }
        this.appSpinner.hide();
        this.mbwayUtility.deleteAllMessages();
      }).fail((xhr, status, error: ErrorInterface) => {
        console.log(error);
        this.countdownPanel.hide();
        $(this.mbwayUtility.getErrorMessage(error.error)).insertBefore(this.countdownPanel);
      });
      }, 10000);
  }

    private mbwayOrderCancel(): void {
      this.countdownMbway.hide();
      this.appSpinner.show();
      this.httpService.setUrl(ifthenpayData.cancelMbwayOrderUrl);
      this.httpService.get().then((response: FacadeInterface) => {
        $('div.mbwayCountdownPanel').hide();
        if (response.orderStatus === 'pending') {
            $('#confirmMbwayOrder').hide();
        } else {
            $('#confirmMbwayOrder').show();
        }
        this.appSpinner.hide();
        this.mbwayUtility.deleteAllMessages();
      }).fail((xhr, status, error: ErrorInterface) => {
        $('div.mbwayCountdownPanel').hide();
        $(this.mbwayUtility.getErrorMessage(error.error)).insertBefore(this.countdownPanel);
      });
    }

    init(): void {
      if (this.countdownPanel.is(':visible')) {
        this.checkMBwayPaymentStatus();
        document.cookie = 'mbwayCountdownShow=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        window.mbwayInterval = setInterval(() => {
          const timer = this.timer2.split(':');
          let minutes = parseInt(timer[0], 10);
          let seconds = parseInt(timer[1], 10);
          --seconds;
          minutes = (seconds < 0) ? --minutes : minutes;
          seconds = (seconds < 0) ? 59 : seconds;
			// 0 leftpad needs to be in type string
			let strSeconds = (seconds < 10) ? "0" + seconds : "" + seconds;

          this.minutesElement.text(minutes);
		  this.secondsElement.text(strSeconds)
          if (minutes < 0) {
            this.mbwayOrderCancel();
            clearInterval(window.mbwayInterval);
            clearInterval(window.mbwayInterval2);
          }
          if ((seconds <= 0) && (minutes <= 0)) {
            this.mbwayOrderCancel();
            clearInterval(window.mbwayInterval);
            clearInterval(window.mbwayInterval2);
          }
		  this.timer2 = minutes + ':' + strSeconds;
        }, 1000);
      }

    }
}

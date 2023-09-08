import { Container, interfaces } from 'inversify';

import { MbwayCountdown } from '../classes/MbwayCountDown';
import { InvoiceViewPage } from '../events/InvoiceViewPage';
import { InvoiceViewPageCreateApp } from '../facades/InvoiceViewPageCreateApp';
import { IfthenpayDataInterface } from '../interfaces/IfthenpayDataInterface';
import { HttpService } from '../services/HttpService';
import { MbwayUtility } from '../utility/MbwayUtility';

declare const ifthenpayData: IfthenpayDataInterface;

const containerInvoiceViewPage = new Container();

containerInvoiceViewPage.bind<MbwayUtility>(MbwayUtility).toDynamicValue((context: interfaces.Context) => {
    return new MbwayUtility(ifthenpayData.lang.mbwayPhoneRequired, ifthenpayData.lang.mbwayPhoneInvalid); 
});
containerInvoiceViewPage.bind<HttpService>(HttpService).toSelf();
containerInvoiceViewPage.bind<MbwayCountdown>(MbwayCountdown).toSelf();
containerInvoiceViewPage.bind<InvoiceViewPage>(InvoiceViewPage).toSelf();
containerInvoiceViewPage.bind<InvoiceViewPageCreateApp>(InvoiceViewPageCreateApp).toSelf();

export default containerInvoiceViewPage;

import { injectable} from 'inversify';

import { MbwayCountdown } from '../classes/MbwayCountDown';
import containerInvoiceViewPage from '../container/inversify.invoiceViewPage';
import { AppComponent } from '../decorators/AppComponent';
import { InvoiceViewPage } from '../events/InvoiceViewPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';

import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [InvoiceViewPage], apps: [MbwayCountdown]})
export class InvoiceViewPageCreateApp extends MainApp implements FacadeInterface {    
    constructor() {
        super();
        this.container = containerInvoiceViewPage;
    }
    start(): void {
       
    }
}

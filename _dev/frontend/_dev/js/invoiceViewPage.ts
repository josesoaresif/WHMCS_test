import 'reflect-metadata';

import containerInvoiceViewPage from './container/inversify.invoiceViewPage';
import { InvoiceViewPageCreateApp } from './facades/InvoiceViewPageCreateApp';


declare let $: any;

$(document).ready(function() {
    const app = containerInvoiceViewPage.get(InvoiceViewPageCreateApp);
    app.start();
});

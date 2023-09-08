import { injectable} from 'inversify';

import containerAdminConfigPage from '../container/inversify.adminConfigPage';
import { AppComponent } from '../decorators/AppComponent';
import { AdminConfigPage } from '../events/AdminConfigPage';
import { FacadeInterface } from '../interfaces/FacadeInterface';
import { AdminConfig } from '../classes/AdminConfig';


import { MainApp } from './MainApp';

@injectable()
@AppComponent({pageEvents: [AdminConfigPage], apps: [AdminConfig]})
export class AdminConfigPageCreateApp extends MainApp implements FacadeInterface {
    constructor() {
        super();
        this.container = containerAdminConfigPage;
    }
    start(): void {
    }
}

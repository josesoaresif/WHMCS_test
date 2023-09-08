import { Container } from 'inversify';

import { AdminConfigPage } from "../events/AdminConfigPage";
import { AdminConfigPageCreateApp } from "../facades/AdminConfigPageCreateApp";
import { HttpService } from "../services/HttpService";
import { HtmlUtility } from '../utility/HtmlUtility';
import { AdminConfig } from '../classes/AdminConfig';


const containerAdminConfigPage = new Container();

containerAdminConfigPage.bind<HtmlUtility>(HtmlUtility).toSelf();
containerAdminConfigPage.bind<HttpService>(HttpService).toSelf();
containerAdminConfigPage.bind<AdminConfigPage>(AdminConfigPage).toSelf();
containerAdminConfigPage.bind<AdminConfigPageCreateApp>(AdminConfigPageCreateApp).toSelf();
containerAdminConfigPage.bind<AdminConfig>(AdminConfig).toSelf();


export default containerAdminConfigPage;

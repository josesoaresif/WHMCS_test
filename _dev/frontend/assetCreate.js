const fs = require('fs-extra');
const fsDefault = require('fs');
// const basePath = '../../../../../../xampp7.2/htdocs/whmcsDev/modules/gateways/ifthenpay/';
const basePath = '../../modules/gateways/ifthenpay/';
const rootPath = '../../';

function createVersionAsset(...args) {
    let assetsList = {};
    const cssPath = './ifthenpay/css/';
    const jsPath = './ifthenpay/js/';
    let pathRandom;
    let finalPath;
    let valueForJson;
    args[0].forEach((object) => {
      let randomString = Date.now();
      if (object.path.includes('.css')) {
        pathRandom = `${cssPath}${object.path.replace('.css','')}_${randomString}.css`;
        finalPath = cssPath + object.path;
        valueForJson = `${object.path.replace('.css','')}_${randomString}.css`;
        console.log('css path random strings created');
      } else {
        pathRandom = `${jsPath}${object.path.replace('.js','')}_${randomString}.js`;
        finalPath = jsPath + object.path;
        valueForJson = `${object.path.replace('.js','')}_${randomString}.js`;
        console.log('js path random strings created');
      }
     fsDefault.renameSync(finalPath, pathRandom);
      console.log('webpack files rename');
      assetsList[object.path] = valueForJson;
      fs.copySync(pathRandom, `${rootPath}${object.folder}${valueForJson}`);
      console.log('copy renamed files to xampp whmcs');
    });
    let data = JSON.stringify(assetsList);
    fs.writeFileSync('./ifthenpay/assetVersionList.json', data);
    console.log('assetVersioList write');
    fs.copySync('./ifthenpay/assetVersionList.json', `${basePath}lib/Utility/assetVersionList.json`);
    console.log('assetVersioList copy to xampp');
}

module.exports.init = function () {
  try {
    const cssFolderWhmcs = 'modules/gateways/ifthenpay/css/';
    const jsFolderWhmcs = 'modules/gateways/ifthenpay/js/';
    fs.removeSync(`${basePath}lib/Utility/assetVersionList.json`);
    console.log('assetVersioList remove from xampp');
    fs.emptyDirSync(`${basePath}css/`);
    fs.emptyDirSync(`${basePath}js/`);
    console.log('empty whmcs directory');
    createVersionAsset([
        {'path': 'ifthenpayPaymentMethodSetup.css', 'folder': cssFolderWhmcs},
        {'path': 'mbwayPhoneInput.css', 'folder': cssFolderWhmcs},
        {'path': 'ifthenpayConfirmPage.css', 'folder': cssFolderWhmcs},
        {'path': 'checkoutPaymentOption.css', 'folder': cssFolderWhmcs},
        {'path': 'ifthenpayViewInvoice.css', 'folder': cssFolderWhmcs},
        {'path': 'adminConfigPage.js', 'folder': jsFolderWhmcs},
        {'path': 'invoiceViewPage.js', 'folder': jsFolderWhmcs}
    ]);
  } catch (error) {
    console.log(error);
  }
};


const mix = require('laravel-mix');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm

mix.setPublicPath('./ifthenpay')

mix.webpackConfig({
  plugins: [
      new CleanWebpackPlugin()
  ]
});

mix.ts('./_dev/js/adminConfigPage.ts', 'ifthenpay/js/adminConfigPage.js')
mix.ts('./_dev/js/invoiceViewPage.ts', 'ifthenpay/js/invoiceViewPage.js')

    .webpackConfig({
        resolve: {
          extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
        }
      })
    mix.sass('./_dev/scss/ifthenpayPaymentMethodSetup.scss', 'ifthenpay/css/ifthenpayPaymentMethodSetup.css')
    .sass('./_dev/scss/mbwayPhoneInput.scss', 'ifthenpay/css/mbwayPhoneInput.css')
    .sass('./_dev/scss/ifthenpayConfirmPage.scss', 'ifthenpay/css/ifthenpayConfirmPage.css')
    .sass('./_dev/scss/checkoutPaymentOption.scss', 'ifthenpay/css/checkoutPaymentOption.css')
    .sass('./_dev/scss/ifthenpayViewInvoice.scss', 'ifthenpay/css/ifthenpayViewInvoice.css') 
   
mix.babel(['ifthenpay/js/adminConfigPage.js'], 'ifthenpay/js/adminConfigPage.js');
mix.babel(['ifthenpay/js/invoiceViewPage.js'], 'ifthenpay/js/invoiceViewPage.js');



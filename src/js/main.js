require('./bill');
require('./filters');
require('./resources');
require([
    './bill-pay/bill-pay.component',
    './bill-pay/bill-pay-list.component',
    './bill-pay/bill-pay-create.component',
    './bill.component',
    './bill-receive/bill-receive.component',
    './bill-receive/bill-receive-list.component',
    './bill-receive/bill-receive-create.component',
    './dashboard.component'
], function(billPayComponent, billPayListComponent, billPayCreateComponent, billReceiveComponent, billReceiveListComponent, billReceiveCreateComponent, dashboard, billComponent){
    let router = new VueRouter();
    router.map({
        '/bill-pays': {
            name: 'bill-pay',
            component: billPayComponent,
            subRoutes: {
                '/': {
                    name: 'bill-pay.list',
                    component: billPayListComponent
                },
                '/create': {
                    name: 'bill-pay.create',
                    component: billPayCreateComponent
                },
                '/:id/update': {
                    name: 'bill-pay.update',
                    component: billPayCreateComponent
                },
            }
        },
        '/bill-receives': {
            name: 'bill-receive',
            component: billReceiveComponent,
            subRoutes: {
                '/': {
                    name: 'bill-receive.list',
                    component: billReceiveListComponent
                },
                '/create': {
                    name: 'bill-receive.create',
                    component: billReceiveCreateComponent
                },
                '/:id/update': {
                    name: 'bill-receive.update',
                    component: billReceiveCreateComponent
                },
            }
        },
        'dashboard': {
            name: 'bill.dashboard',
            component: dashboard
        },
        '*': {
            component: dashboard
        }
    });

    router.start({
        components: {
            'bill-component': billComponent
        }
    }, '#app');

    router.redirect({
        '*': '/dashboard'
    });

});
// app.$watch('test', function(novoValor, velhoValor){
//     console.log("velhoValor:"+velhoValor+", novo Valor:"+novoValor);
// });

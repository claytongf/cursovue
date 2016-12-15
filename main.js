let router = new VueRouter();
var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function (){
        return {
            billsPay: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: false},
                {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: false},
                {date_due: '24/08/2016', name: 'Cartão de Crédito', value: 1500.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: false}
            ],
            billsReceive: [
                {date_due: '20/08/2016', name: 'Receber 1', value: 70.99, done: true},
                {date_due: '21/08/2016', name: 'Cliente 2', value: 55.99, done: false},
                {date_due: '22/08/2016', name: 'Prêmio', value: 125.99, done: true},
                {date_due: '23/08/2016', name: 'Crédito', value: 200.99, done: true},
                {date_due: '24/08/2016', name: 'Sal', value: 1500.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 1400.99, done: false},
                {date_due: '26/08/2016', name: 'Venda', value: 123, done: true}
            ]
        };
    }
});
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
            '/:index/update': {
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
            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            },
        }
    },
    '*': {
        component: billPayListComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/bill-pays'
});
// app.$watch('test', function(novoValor, velhoValor){
//     console.log("velhoValor:"+velhoValor+", novo Valor:"+novoValor);
// });

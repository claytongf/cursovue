<script type="text/javascript">
import './bootstrap.vue';
import BillPayComponent from './bill-pay/bill-pay.vue';
import BillPayListComponent from './bill-pay/bill-pay-list.vue';
import BillPayCreateComponent from './bill-pay/bill-pay-create.vue';
import BillReceiveComponent from './bill-receive/bill-receive.vue';
import BillReceiveListComponent from './bill-receive/bill-receive-list.vue';
import BillReceiveCreateComponent from './bill-receive/bill-receive-create.vue';
import BillComponent from './Bill.vue';
import Dashboard from './dashboard.vue';
let VueRouter = require('vue-router');
let router = new VueRouter();
router.map({
    '/bill-pays': {
        name: 'bill-pay',
        component: BillPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: BillPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: BillPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: BillPayCreateComponent
            },
        }
    },
    '/bill-receives': {
        name: 'bill-receive',
        component: BillReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: BillReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: BillReceiveCreateComponent
            },
            '/:id/update': {
                name: 'bill-receive.update',
                component: BillReceiveCreateComponent
            },
        }
    },
    'dashboard': {
        name: 'bill.dashboard',
        component: Dashboard
    },
    '*': {
        component: Dashboard
    }
});

router.start({
    components: {
        'bill-component': BillComponent
    }
}, '#app');

router.redirect({
    '*': '/dashboard'
});


// app.$watch('test', function(novoValor, velhoValor){
//     console.log("velhoValor:"+velhoValor+", novo Valor:"+novoValor);
// });
</script>
Vue.http.options.root = 'http://192.168.10.10:8000/api';

window.BillPay = Vue.resource('bills-pay{/id}', {}, {
    total: {method: 'GET', url: 'bills-pay/total'},
    totalPayed: {method: 'GET', url: 'bills-pay/total/done'}
});

window.BillReceive = Vue.resource('bills-receive{/id}', {}, {
    total: {method: 'GET', url: 'bills-receive/total'},
    totalReceived: {method: 'GET', url: 'bills-receive/total/done'}
});

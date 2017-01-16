"use strict";

window.dashboard = Vue.extend({
    template: "\n        <style type=\"text/css\">\n            .pago{\n                color: green;\n            }\n            .nao-pago{\n                color:red;\n            }\n        </style>\n        <h1>{{ title }}</h1>\n        <p>Total de Contas a Pagar: {{ total.pay | numberFormat }}</p>\n        <p>Total de Contas Pagas: {{ total.payed | numberFormat }}</p>\n        <p>Total de Contas a Receber: {{ total.receive | numberFormat }} </p>\n        <p>Total de Contas Recebidas: {{ total.received | numberFormat }}</p>\n    ",
    data: function data() {
        return {
            title: "Dashboard",
            total: {
                received: 0,
                receive: 0,
                pay: 0,
                payed: 0
            }
        };
    },
    created: function created() {
        var self = this;
        BillReceive.total().then(function (response) {
            self.total.receive = response.data.total;
        });

        BillReceive.totalReceived().then(function (response) {
            self.total.received = response.data.total;
        });

        BillPay.total().then(function (response) {
            self.total.pay = response.data.total;
        });

        BillPay.totalPayed().then(function (response) {
            self.total.payed = response.data.total;
        });
    }
});
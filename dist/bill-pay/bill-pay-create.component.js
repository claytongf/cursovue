'use strict';

var namesPay = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];
window.billPayCreateComponent = Vue.extend({
    template: '\n        <form name="form" v-on:submit.prevent="submit">\n            <label>Vencimento:</label>\n            <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'"/>\n            <br><br>\n            <label>Nome:</label>\n            <select v-model="bill.name">\n                <option v-for="b in names" :value="b">{{ b }}</option>\n            </select>\n            <br><br>\n            <label>Valor:</label>\n            <input type="text" v-model="bill.value | numberFormat \'pt-BR\' \'BRL\'"/>\n            <br><br>\n            <label>Pago?</label>\n            <input type="checkbox" v-model="bill.done"/>\n            <br><br>\n            <input type="submit" value="Enviar"/>\n        </form>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: namesPay,
            bill: new Bill()

        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id); //:id da rota update
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == 'insert') {
                BillPay.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                BillPay.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
            this.$router.go({ name: 'bill-pay' });
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillPay.get({ id: id }).then(function (response) {
                _this2.bill = new Bill(response.data);
            });
        },
        getDateDue: function getDateDue(date_due) {
            var dateDueObject = date_due;
            if (!(date_due instanceof Date)) {
                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        }
    }
});
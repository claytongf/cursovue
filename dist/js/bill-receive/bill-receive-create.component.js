'use strict';

var namesReceive = ['Loteria', 'Recebimento', 'Aluguel', 'Ganhos', 'Salário', 'Herança', 'Outros'];
window.billReceiveCreateComponent = Vue.extend({
    template: '\n<div class="container">\n            <div class="row">\n                <form name="form" v-on:submit.prevent="submit">\n                    <div class="row">\n                        <h2>Novo Recebimento</h2>\n                        <div class="input-field col s6">\n                            <label class="active">Vencimento:</label>\n                            <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'" placeholder="Informe a Data"/>\n                        </div>\n                        <div class="input-field col s6">\n                            <label class="active">Valor:</label>\n                        <input type="text" v-model="bill.value | numberFormat \'pt-BR\' \'BRL\'"/>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s6">\n                            <label class="active">Nome:</label>\n                            <select v-model="bill.name" id="name" class="browser-default">\n                            <option value="" disabled selected>Escolha um nome</option>\n                                <option v-for="b in names" :value="b">{{ b }}</option>\n                            </select>\n                        </div>\n                        <div class="input-field col s6">\n                            <input type="checkbox" class="filled-in" v-model="bill.done" id="pago"/>\n                            <label for="pago">Pago?</label>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <input type="submit" value="Enviar" class="btn btn-large right"/>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: namesReceive,
            bill: new Bill()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id); //:id da rota update
        }
        $(document).ready(function () {
            $('#name').material_select();
        });
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == 'insert') {
                BillReceive.save({}, data).then(function (response) {
                    Materialize.toast('Conta Criada com Sucesso!', 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillReceive.update({ id: this.bill.id }, data).then(function (response) {
                    Materialize.toast('Conta Atualizada com Sucesso!', 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillReceive.get({ id: id }).then(function (response) {
                _this2.bill = response.data;
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
'use strict';

window.billReceiveListComponent = Vue.extend({
    components: {
        'modal': modalComponent
    },
    template: '\n        <div class="container">\n            <div class="row">\n                <div class="col s12">\n                    <table class="bordered striped highlight centered responsive-table">\n                        <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>A\xE7\xF5es</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for="(index,o) in bills">\n                            <td>{{ index + 1 }}</td>\n                            <td>{{ o.date_due | dateFormat \'pt-BR\'}}</td>\n                            <td>{{ o.name }}</td>\n                            <td>{{ o.value | numberFormat \'pt-BR\' \'BRL\' }}</td>\n                            <td :class="{\'green lighten-2\': o.done, \'red lighten-2\': !o.done}">{{ o.done | doneLabel }}</td>\n                            <td>\n                                <a href="#" v-link="{name: \'bill-receive.update\', params: {id: o.id}}">Editar</a> |\n                                <a href="#" @click.prevent="openModalDelete(o)">Deletar</a>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n        <modal :modal="modal">\n            <div slot="content">\n                <h4>Mensagem de confirma\xE7\xE3o</h4>\n                <p><strong>Deseja excluir esta conta?</strong></p>\n                <div class="divider"></div>\n                <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n                <p>Valor: <strong>{{billToDelete.value | numberFormat }}</strong></p>\n                <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat }}</strong></p>\n                <div class="divider"></div>\n            </div>\n            <div slot="footer">\n                <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">OK</button>\n                <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n            </div>\n        </modal>\n    ',
    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created: function created() {
        var _this = this;

        BillReceive.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill() {
            var _this2 = this;

            BillReceive.delete({ id: this.billToDelete.id }).then(function (response) {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta Excluída com Sucesso!', 4000);
                _this2.$dispatch('change-info');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').modal('open');
        }
    }
});
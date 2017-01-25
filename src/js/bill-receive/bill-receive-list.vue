<template>
    <div class="container">
        <div class="row">
            <div class="col s12">
                <table class="bordered striped highlight centered responsive-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Vencimento</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Paga?</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(index,o) in bills">
                        <td>{{ index + 1 }}</td>
                        <td>{{ o.date_due | dateFormat 'pt-BR'}}</td>
                        <td>{{ o.name }}</td>
                        <td>{{ o.value | numberFormat 'pt-BR' 'BRL' }}</td>
                        <td :class="{'green lighten-2': o.done, 'red lighten-2': !o.done}">{{ o.done | doneLabel }}</td>
                        <td>
                            <a href="#" v-link="{name: 'bill-receive.update', params: {id: o.id}}">Editar</a> |
                            <a href="#" @click.prevent="openModalDelete(o)">Deletar</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <modal :modal="modal">
        <div slot="content" v-if="billToDelete">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p>Nome: <strong>{{billToDelete.name}}</strong></p>
            <p>Valor: <strong>{{billToDelete.value | numberFormat }}</strong></p>
            <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat }}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">OK</button>
            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
        </div>
    </modal>
</template>
<script type="text/javascript">
    import {BillResourceReceive} from '../resources.vue';
    import modalComponent from '../modal.vue';
    export default {
        components: {
            'modal': modalComponent
        },
        data(){
            return {
                bills: [],
                billToDelete: null,
                modal: {
                    id: 'modal-delete'
                }
            };
        },
        created(){
            BillResourceReceive.query().then((response) => {
                this.bills = response.data;
            })
        },
        methods: {
            deleteBill(){
                BillResourceReceive.delete({id: this.billToDelete.id}).then((response) => {
                    this.bills.$remove(this.billToDelete);
                    this.billToDelete = null;
                    Materialize.toast('Conta Excluída com Sucesso!', 4000);
                    this.$dispatch('change-info');
                });
            },
            openModalDelete(bill){
                this.billToDelete = bill
                $('#modal-delete').modal('open');
            }
        }
    };
</script>
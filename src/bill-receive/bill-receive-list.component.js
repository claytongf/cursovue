window.billReceiveListComponent = Vue.extend({
    template: `
        <style type="text/css">
            .pago{
                color: green;
            }
            .nao-pago{
                color:red;
            }
        </style>
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
                            <td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">{{ o.done | doneLabel }}</td>
                            <td>
                                <a href="#" v-link="{name: 'bill-receive.update', params: {id: o.id}}">Editar</a> |
                                <a href="#" @click.prevent="deleteBill(o)">Deletar</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    `,
    data(){
        return {
            bills: []
        };
    },
    created(){
        BillReceive.query().then((response) => {
            this.bills = response.data;
        })
    },
    methods: {
        deleteBill(bill){
            if(confirm('Deseja excluir esta conta?')){
                BillReceive.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });

            }
        }
    }
});
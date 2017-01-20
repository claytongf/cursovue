const namesPay = [
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Supermercado',
    'Cartão de crédito',
    'Empréstimo',
    'Gasolina'
];
window.billPayCreateComponent = Vue.extend({
    template: `
        <div class="container">
            <div class="row">
                <form name="form" v-on:submit.prevent="submit">
                    <div class="row">
                        <h2>Nova Conta</h2>
                        <div class="input-field col s6">
                            <label class="active">Vencimento:</label>
                            <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'" placeholder="Informe a Data"/>
                        </div>
                        <div class="input-field col s6">
                            <label class="active">Valor:</label>
                        <input type="text" v-model="bill.value | numberFormat 'pt-BR' 'BRL'"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <label class="active">Nome:</label>
                            <select v-model="bill.name" id="name" class="browser-default">
                            <option value="" disabled selected>Escolha um nome</option>
                                <option v-for="b in names" :value="b">{{ b }}</option>
                            </select>
                        </div>
                        <div class="input-field col s6">
                            <input type="checkbox" class="filled-in" v-model="bill.done" id="pago"/>
                            <label for="pago">Pago?</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="submit" value="Enviar" class="btn btn-large right"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    `,
    data() {
        return {
            formType: 'insert',
            names: namesPay,
            bill: new Bill()
        };
    },
    created(){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id); //:id da rota update
        }
        $(document).ready(function(){
            $('#name').material_select();
        });
    },
    methods: {
        submit(){
            let data = this.bill.toJSON();
            if(this.formType == 'insert'){
                BillPay.save({}, data).then((response) => {
                    Materialize.toast('Conta Criada com Sucesso!', 4000);
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }else{
                BillPay.update({id: this.bill.id}, data).then((response) => {
                    Materialize.toast('Conta Atualizada com Sucesso!', 4000);
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill(id){
            BillPay.get({id: id}).then((response) => {
                this.bill = new Bill(response.data);
            });
        },
        getDateDue(date_due){
            let dateDueObject = date_due;
            if(!(date_due instanceof Date)){
                dateDueObject = new Date(date_due.split('/').reverse().join('-')+"T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        }
    }
});
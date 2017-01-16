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
        <form name="form" v-on:submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'"/>
            <br><br>
            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="b in names" :value="b">{{ b }}</option>
            </select>
            <br><br>
            <label>Valor:</label>
            <input type="text" v-model="bill.value | numberFormat 'pt-BR' 'BRL'"/>
            <br><br>
            <label>Pago?</label>
            <input type="checkbox" v-model="bill.done"/>
            <br><br>
            <input type="submit" value="Enviar"/>
        </form>
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
    },
    methods: {
        submit(){
            let data = this.bill.toJSON();
            if(this.formType == 'insert'){
                BillPay.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }else{
                BillPay.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
            this.$router.go({name: 'bill-pay'});
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
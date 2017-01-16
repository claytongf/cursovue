window.billPayCreateComponent = Vue.extend({
    template: `
        <form name="form" v-on:submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due"/>
            <br><br>
            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="b in names" :value="b">{{ b }}</option>
            </select>
            <br><br>
            <label>Valor:</label>
            <input type="text" v-model="bill.value"/>
            <br><br>
            <label>Pago?</label>
            <input type="checkbox" v-model="bill.done"/>
            <br><br>
            <input type="submit" value="Enviar"/>
        </form>
    `,
    data: function () {
        return {
            formType: 'insert',
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }

        };
    },
    created: function(){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id); //:id da rota update
        }
    },
    methods: {
        submit: function(){
            var self = this;
            if(this.formType == 'insert'){
                BillPay.save({}, this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }else{
                BillPay.update({id: this.bill.id}, this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-pay.list'});
                });
            }
            this.$router.go({name: 'bill-pay'});
        },
        getBill: function (id){
            var self = this;
            BillPay.get({id: id}).then(function(response){
                self.bill = response.data;
            });
        }
    }
});
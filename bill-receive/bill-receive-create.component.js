window.billReceiveCreateComponent = Vue.extend({
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
                'Receber 1',
                'Cliente 2',
                'Prêmio',
                'Crédito',
                'Sal',
                'Empréstimo',
                'Venda'
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
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index); //:index da rota update
        }
    },
    methods: {
        submit: function(){
            if(this.formType == 'insert'){
                this.$root.$children[0].billsReceive.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$router.go({name: 'bill-receive'});
        },
        getBill: function (index){
            var bills = this.$root.$children[0].billsReceive;
            this.bill = bills[index];
        }
    }
});
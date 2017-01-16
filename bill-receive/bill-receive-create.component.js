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
                'Loteria',
                'Recebimento',
                'Aluguel',
                'Ganhos',
                'Salário',
                'Herança',
                'Outros'
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
            this.getBill(this.$route.params.id); //:id da rota update
        }
    },
    methods: {
        submit: function(){
            var self = this;
            if(this.formType == 'insert'){
                BillReceive.save({}, this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }else{
                BillReceive.update({id: this.bill.id}, this.bill).then(function(response){
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }
            this.$router.go({name: 'bill-receive'});
        },
        getBill: function (id){
            var self = this;
            BillReceive.get({id: id}).then(function(response){
                self.bill = response.data;
            });
        }
    }
});
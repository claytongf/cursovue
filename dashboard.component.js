window.dashboard = Vue.extend({
    template: `
        <style type="text/css">
            .pago{
                color: green;
            }
            .nao-pago{
                color:red;
            }
        </style>
        <h1>{{ title }}</h1>
        <p>Total de Contas a Pagar: {{ totalBillsPay | currency 'R$ ' 2 }}</p>
        <p>Total de Contas Pagas: {{ totalBillsPayDone | currency 'R$ ' 2 }}</p>
        <p>Total de Contas a Receber: {{ totalBillsReceive | currency 'R$ ' 2 }} </p>
        <p>Total de Contas Recebidas: {{ totalBillsReceiveDone | currency 'R$ ' 2 }}</p>
    `,
    data: function (){
        return {
            title: "Dashboard"
        };
    },
    methods: {
        deleteBill: function(bill){
            if(confirm('Deseja excluir esta conta?')){
                this.$root.$children[0].billsPay.$remove(bill);
            }
        }
    },
    computed: {
        totalBillsPay: function(){
            var total = 0;
            var bills = this.$root.$children[0].billsPay;
            for(var o in bills){
                if(bills[o].done === false){
                    total += bills[o].value;
                }
            }
            return total;
        },
        totalBillsPayDone: function(){
            var total = 0;
            var bills = this.$root.$children[0].billsPay;
            for(var o in bills){
                if(bills[o].done === true){
                    total += bills[o].value;
                }
            }
            return total;
        },
        totalBillsReceive: function(){
            var total = 0;
            var bills = this.$root.$children[0].billsReceive;
            for(var o in bills){
                if(bills[o].done === false) {
                    total += bills[o].value;
                }
            }
            return total;
        },
        totalBillsReceiveDone: function(){
            var total = 0;
            var bills = this.$root.$children[0].billsReceive;
            for(var o in bills){
                if(bills[o].done === true) {
                    total += bills[o].value;
                }
            }
            return total;
        }
    }
});
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
        <p>Total de Contas a Pagar: {{ total.pay | currency 'R$ ' 2 }}</p>
        <p>Total de Contas Pagas: {{ total.payed | currency 'R$ ' 2 }}</p>
        <p>Total de Contas a Receber: {{ total.receive | currency 'R$ ' 2 }} </p>
        <p>Total de Contas Recebidas: {{ total.received | currency 'R$ ' 2 }}</p>
    `,
    data: function (){
        return {
            title: "Dashboard",
            total: {
                received: 0,
                receive: 0,
                pay: 0,
                payed: 0
            }
        };
    },
    methods: {
        deleteBill: function(bill){
            if(confirm('Deseja excluir esta conta?')){
                this.$root.$children[0].billsPay.$remove(bill);
            }
        }
    },
    created: function(){
        var self = this;
        BillReceive.total().then(function(response){
            self.total.receive = response.data.total
        });

        BillReceive.totalReceived().then(function(response){
            self.total.received = response.data.total
        });

        BillPay.total().then(function(response){
            self.total.pay = response.data.total
        });

        BillPay.totalPayed().then(function(response){
            self.total.paied= response.data.total
        });
    }
});
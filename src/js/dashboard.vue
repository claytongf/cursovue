<template>
        <h2>{{ title }}</h2>
        <div class="row">
            <div class="col s4">
                <div class="card custom-blue">
                    <div class="card-content white-text">
                        <p>Total de Contas a Pagar: {{ total.pay | numberFormat }}</p>
                        <p>Total de Contas Pagas: {{ total.payed | numberFormat }}</p>
                        <p>Total de Contas a Receber: {{ total.receive | numberFormat }} </p>
                        <p>Total de Contas Recebidas: {{ total.received | numberFormat }}</p>
                    </div>
                </div>
            </div>
        </div>

</template>
<script type="text/javascript">
import {BillResourcePay} from './resources';
import {BillResourceReceive} from './resources';
export default {
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
    created: function(){
        let self = this;
        BillResourceReceive.total().then(function(response){
            self.total.receive = response.data.total
        });

        BillResourceReceive.totalReceived().then(function(response){
            self.total.received = response.data.total
        });

        BillResourcePay.total().then(function(response){
            self.total.pay = response.data.total
        });

        BillResourcePay.totalPayed().then(function(response){
            self.total.payed= response.data.total
        });
    }
};
</script>
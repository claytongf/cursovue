window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: `
    <style type="text/css">
        .minha-classe{
            background-color: #51245a;
        }
        .red{
            color: red;
        }
        .green{
            color: green;
        }
        .gray{
            color: gray;
        }
    </style>
    <div class="section">
        <div class="container">
            <h1>{{ title }}</h1>
            <h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">{{ status | statusGeneral 0 }}</h3>
            <div class="row">
                <div class="col s5 offset-s1">
                    <h3>{{ total | numberFormat 'pt-BR' 'BRL' }}</h3>
                </div>
            </div>
                <menu-component></menu-component>
        
</div>
    </div>
        <router-view></router-view>
    `,
    data(){
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        }
    },
    created(){
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus(bills){
            if(!bills.length){
                this.status = false;
            }
            let count = 0;
            for(let i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus(){
            BillPay.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },
        updateTotal(){
            BillPay.total().then((response) => {
                this.total = response.data.total;
            });
        }
    },
    events: {
        'change-info'(){
            this.updateStatus();
            this.updateTotal();
        }
    }
});
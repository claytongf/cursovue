window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
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
        <h1>{{ title }}</h1>
        <h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">{{ status | statusGeneral receive }}</h3>
        <h3>{{ total | numberFormat }}</h3>
        <menu-component></menu-component>
        <router-view></router-view>
    `,
    data(){
        return {
            title: "Contas a receber",
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
            BillReceive.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },
        updateTotal(){
            BillReceive.total().then((response) => {
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
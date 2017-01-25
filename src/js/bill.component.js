module.exports = {
    template: `
        <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">
            <li v-for="item in o.items">
                <a v-link="{name: item.routeName}">{{ item.name }}</a>
            </li>
        </ul>
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper container">
                    <a href="#" class="right brand-logo">Code Contas</a>
                    <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
                    <ul class="left hide-on-med-and-down">
                        <li v-for="o in menus">
                            <!--<a href="#" v-link="{path: o.url}">{{ o.name }}</a>-->
                            <a href="!#" v-if="o.dropdownId" class="dropdown-button" v-bind:data-activates="o.dropdownId">{{ o.name }} <i class="material-icons right">arrow_drop_down</i> </a>
                            <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>
                        </li>
                    </ul>
                    <ul id="nav-mobile" class="side-nav">
                        <li v-for="o in menus">
                            <!--<a href="#" v-link="{path: o.url}">{{ o.name }}</a>-->
                            <a href="#" v-link="{name: o.routeName}">{{ o.name }}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <modal></modal>
        <router-view></router-view>
    `,
    created(){
        $(document).ready(function(){
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data(){
        return {
            menus: [
                {id: 0, name: "Dashboard", routeName: 'bill.dashboard'},
                {name: "Contas a pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay'},
                {name: "Contas a receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive'}
            ],
            menusDropdown: [
                {
                    id: 'bill-pay', items: [
                        // {id: 0, name: "Listar contas", url: '/bills'},
                        // {id: 1, name: "Criar conta", url: '/bill/create'}
                        {id: 0, name: "Listar contas", routeName: 'bill-pay.list'},
                        {id: 1, name: "Criar conta", routeName: 'bill-pay.create'}
                    ]
                },
                {
                    id: 'bill-receive', items: [
                    {id: 0, name: "Listar contas", routeName: 'bill-receive.list'},
                    {id: 1, name: "Criar conta", routeName: 'bill-receive.create'}
                ]
                }


            ]
        };
    }
};
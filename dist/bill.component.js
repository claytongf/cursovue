'use strict';

window.billComponent = Vue.extend({
    template: '\n        <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n            <li v-for="item in o.items">\n                <a v-link="{name: item.routeName}">{{ item.name }}</a>\n            </li>\n        </ul>\n        <div class="navbar-fixed">\n            <nav class="teal">\n                <div class="nav-wrapper container">\n                    <a href="#" class="right brand-logo">Code Contas</a>\n                    <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>\n                    <ul class="left hide-on-med-and-down">\n                        <li v-for="o in menus">\n                            <!--<a href="#" v-link="{path: o.url}">{{ o.name }}</a>-->\n                            <a href="!#" v-if="o.dropdownId" class="dropdown-button" v-bind:data-activates="o.dropdownId">{{ o.name }} <i class="material-icons right">arrow_drop_down</i> </a>\n                            <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>\n                        </li>\n                    </ul>\n                    <ul id="nav-mobile" class="side-nav">\n                        <li v-for="o in menus">\n                            <!--<a href="#" v-link="{path: o.url}">{{ o.name }}</a>-->\n                            <a href="#" v-link="{name: o.routeName}">{{ o.name }}</a>\n                        </li>\n                    </ul>\n                </div>\n            </nav>\n        </div>\n        <router-view></router-view>\n    ',
    created: function created() {
        $(document).ready(function () {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [{ id: 0, name: "Dashboard", routeName: 'bill.dashboard' }, { name: "Contas a pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay' }, { name: "Contas a receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive' }],
            menusDropdown: [{
                id: 'bill-pay', items: [
                // {id: 0, name: "Listar contas", url: '/bills'},
                // {id: 1, name: "Criar conta", url: '/bill/create'}
                { id: 0, name: "Listar contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar conta", routeName: 'bill-pay.create' }]
            }, {
                id: 'bill-receive', items: [{ id: 0, name: "Listar contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar conta", routeName: 'bill-receive.create' }]
            }]
        };
    }
});
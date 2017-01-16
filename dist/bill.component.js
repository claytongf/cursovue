"use strict";

window.billComponent = Vue.extend({
    template: "\n        <nav>\n            <ul>\n                <li v-for=\"o in menus\">\n                    <!--<a href=\"#\" v-link=\"{path: o.url}\">{{ o.name }}</a>-->\n                    <a href=\"#\" v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n                </li>\n            </ul>\n        </nav>\n        <router-view></router-view>\n    ",
    data: function data() {
        return {
            menus: [{ id: 0, name: "Dashboard", routeName: 'bill.dashboard' }, { name: "Contas a pagar", routeName: 'bill-pay.list' }, { name: "Contas a receber", routeName: 'bill-receive.list' }]
        };
    }
});
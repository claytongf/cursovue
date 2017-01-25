webpackJsonp([1],{

/***/ 27:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    template: "\n    <div class=\"section\">\n        <div class=\"container\">\n            <h4>{{ title }}</h4>\n            <div class=\"row\">\n                <div class=\"col s6\">\n                    <div class=\"card z-depth-2\" :class=\"{'gray': status === false, 'green': status === 0, 'red': status > 0}\">\n                        <div class=\"card-content white-text\">\n                            <p class=\"card-title\"><i class=\"material-icons\">account_balance</i></p>\n                            <h5>{{ status | statusGeneral 0 }}</h5>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col s6\">\n                    <div class=\"card z-depth-2\">\n                        <div class=\"card-content\">\n                            <p class=\"card-title\"><i class=\"material-icons\">payment</i></p>\n                            <h5>{{ total | numberFormat 'pt-BR' 'BRL' }}</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <menu-component></menu-component>\n        </div>\n    </div>\n    <div class=\"divider\"></div>\n    <router-view></router-view>\n    ",
	    data: function data() {
	        return {
	            title: "Contas a pagar",
	            status: false,
	            total: 0
	        };
	    },
	    created: function created() {
	        this.updateStatus();
	        this.updateTotal();
	    },

	    methods: {
	        calculateStatus: function calculateStatus(bills) {
	            if (!bills.length) {
	                this.status = false;
	            }
	            var count = 0;
	            for (var i in bills) {
	                if (!bills[i].done) {
	                    count++;
	                }
	            }
	            this.status = count;
	        },
	        updateStatus: function updateStatus() {
	            var _this = this;

	            BillPay.query().then(function (response) {
	                _this.calculateStatus(response.data);
	            });
	        },
	        updateTotal: function updateTotal() {
	            var _this2 = this;

	            BillPay.total().then(function (response) {
	                _this2.total = response.data.total;
	            });
	        }
	    },
	    events: {
	        'change-info': function changeInfo() {
	            this.updateStatus();
	            this.updateTotal();
	        }
	    }
	};

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(29);
	module.exports = {
	    components: {
	        'modal': modalComponent
	    },
	    template: '\n        <div class="container">\n            <div class="row">\n                <div class="col s12">\n                    <table class="bordered striped highlight centered responsive-table">\n                        <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>A\xE7\xF5es</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for="(index,o) in bills">\n                            <td>{{ index + 1 }}</td>\n                            <td>{{ o.date_due | dateFormat \'pt-BR\' }}</td>\n                            <td>{{ o.name }}</td>\n                            <td>{{ o.value | numberFormat \'pt-BR\' \'BRL\' }}</td>\n                            <td class="white-text" :class="{\'pago\': o.done, \'naopago\': !o.done}">{{ o.done | doneLabel }}</td>\n                            <td>\n                                <a class="text-success" href="#" v-link="{name: \'bill-pay.update\', params: {id: o.id}}">Editar</a> |\n                                <a class="text-danger" href="#" @click.prevent="openModalDelete(o)">Deletar</a>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n        <modal :modal="modal">\n            <div slot="content">\n                <h4>Mensagem de confirma\xE7\xE3o</h4>\n                <p><strong>Deseja excluir esta conta?</strong></p>\n                <div class="divider"></div>\n                <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n                <p>Valor: <strong>{{billToDelete.value | numberFormat }}</strong></p>\n                <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat }}</strong></p>\n                <div class="divider"></div>\n            </div>\n            <div slot="footer">\n                <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">OK</button>\n                <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n            </div>\n        </modal>\n    ',
	    data: function data() {
	        return {
	            bills: [],
	            billToDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        var _this = this;

	        BillPay.query().then(function (response) {
	            _this.bills = response.data;
	        });
	    },

	    methods: {
	        deleteBill: function deleteBill() {
	            var _this2 = this;

	            BillPay.delete({ id: this.billToDelete.id }).then(function (response) {
	                _this2.bills.$remove(_this2.billToDelete);
	                _this2.billToDelete = null;
	                Materialize.toast('Conta Excluída com Sucesso!', 4000);
	                _this2.$dispatch('change-info');
	            });
	        },
	        openModalDelete: function openModalDelete(bill) {
	            this.billToDelete = bill;
	            $('#modal-delete').modal('open');
	        }
	    }
	};

/***/ },

/***/ 29:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n        <div :id="modal.id" class="modal">\n            <div class="modal-content">\n                <slot name="content"></slot>\n            </div>\n            <div class="modal-footer">\n                <slot name="footer"></slot>\n            </div>\n        </div>\n    ',
	    props: {
	        modal: {
	            type: Object,
	            default: function _default() {
	                return {
	                    id: ''
	                };
	            }
	        }
	    },
	    ready: function ready() {
	        var id = this.modal.id;
	        $(document).ready(function () {
	            $('#' + id).modal();
	        });
	    }
	};

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var namesPay = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];
	var Bill = __webpack_require__(31);
	module.exports = {
	    template: '\n        <div class="container">\n            <div class="row">\n                <form name="form" v-on:submit.prevent="submit">\n                    <div class="row">\n                        <h2>Nova Conta</h2>\n                        <div class="input-field col s6">\n                            <label class="active">Vencimento:</label>\n                            <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'" placeholder="Informe a Data"/>\n                        </div>\n                        <div class="input-field col s6">\n                            <label class="active">Valor:</label>\n                        <input type="text" v-model="bill.value | numberFormat \'pt-BR\' \'BRL\'"/>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s6">\n                            <label class="active">Nome:</label>\n                            <select v-model="bill.name" id="name" class="browser-default">\n                            <option value="" disabled selected>Escolha um nome</option>\n                                <option v-for="b in names" :value="b">{{ b }}</option>\n                            </select>\n                        </div>\n                        <div class="input-field col s6">\n                            <input type="checkbox" class="filled-in" v-model="bill.done" id="pago"/>\n                            <label for="pago">Pago?</label>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <input type="submit" value="Enviar" class="btn btn-large right"/>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n        \n    ',
	    data: function data() {
	        return {
	            formType: 'insert',
	            names: namesPay,
	            bill: new Bill()
	        };
	    },
	    created: function created() {
	        if (this.$route.name == 'bill-pay.update') {
	            this.formType = 'update';
	            this.getBill(this.$route.params.id); //:id da rota update
	        }
	    },
	    ready: function ready() {
	        $('#name').material_select();
	    },

	    methods: {
	        submit: function submit() {
	            var _this = this;

	            var data = this.bill.toJSON();
	            if (this.formType == 'insert') {
	                BillPay.save({}, data).then(function (response) {
	                    Materialize.toast('Conta Criada com Sucesso!', 4000);
	                    _this.$dispatch('change-info');
	                    _this.$router.go({ name: 'bill-pay.list' });
	                });
	            } else {
	                BillPay.update({ id: this.bill.id }, data).then(function (response) {
	                    Materialize.toast('Conta Atualizada com Sucesso!', 4000);
	                    _this.$dispatch('change-info');
	                    _this.$router.go({ name: 'bill-pay.list' });
	                });
	            }
	        },
	        getBill: function getBill(id) {
	            var _this2 = this;

	            BillPay.get({ id: id }).then(function (response) {
	                _this2.bill = new Bill(response.data);
	            });
	        },
	        getDateDue: function getDateDue(date_due) {
	            var dateDueObject = date_due;
	            if (!(date_due instanceof Date)) {
	                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
	            }
	            return dateDueObject.toISOString().split('T')[0];
	        }
	    }
	};

/***/ },

/***/ 31:
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
	    function Bill() {
	        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Bill);

	        this.date_due = '';
	        this.name = '';
	        this.value = 0;
	        this.done = false;
	        Object.assign(this, data);
	    }

	    _createClass(Bill, [{
	        key: 'toJSON',
	        value: function toJSON() {
	            var date_due = typeof this.date_due === 'string' && this.date_due.length == 10 ? this.date_due : this.date_due.toISOString().substring(0, 10);
	            return {
	                date_due: date_due,
	                name: this.name,
	                value: this.value,
	                done: this.done
	            };
	        }
	    }]);

	    return Bill;
	}();

/***/ },

/***/ 32:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    template: "\n    <div class=\"section\">\n        <div class=\"container\">\n            <h4>{{ title }}</h4>\n            <div class=\"row\">\n                <div class=\"col s6\">\n                    <div class=\"card z-depth-2\" :class=\"{'gray': status === false, 'green': status === 0, 'red': status > 0}\">\n                        <div class=\"card-content white-text\">\n                            <p class=\"card-title\"><i class=\"material-icons\">account_balance</i></p>\n                            <h5>{{ status | statusGeneral }}</h5>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col s6\">\n                    <div class=\"card z-depth-2\">\n                        <div class=\"card-content\">\n                            <p class=\"card-title\"><i class=\"material-icons\">payment</i></p>\n                            <h5>{{ total | numberFormat 'pt-BR' 'BRL' }}</h5>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <menu-component></menu-component>\n        </div>\n    </div>\n    <div class=\"divider\"></div>\n    <router-view></router-view>\n    ",
	    data: function data() {
	        return {
	            title: "Contas a receber",
	            status: false,
	            total: 0
	        };
	    },
	    created: function created() {
	        this.updateStatus();
	        this.updateTotal();
	    },

	    methods: {
	        calculateStatus: function calculateStatus(bills) {
	            if (!bills.length) {
	                this.status = false;
	            }
	            var count = 0;
	            for (var i in bills) {
	                if (!bills[i].done) {
	                    count++;
	                }
	            }
	            this.status = count;
	        },
	        updateStatus: function updateStatus() {
	            var _this = this;

	            BillReceive.query().then(function (response) {
	                _this.calculateStatus(response.data);
	            });
	        },
	        updateTotal: function updateTotal() {
	            var _this2 = this;

	            BillReceive.total().then(function (response) {
	                _this2.total = response.data.total;
	            });
	        }
	    },
	    events: {
	        'change-info': function changeInfo() {
	            this.updateStatus();
	            this.updateTotal();
	        }
	    }
	};

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var modalComponent = __webpack_require__(29);
	module.exports = {
	    components: {
	        'modal': modalComponent
	    },
	    template: '\n        <div class="container">\n            <div class="row">\n                <div class="col s12">\n                    <table class="bordered striped highlight centered responsive-table">\n                        <thead>\n                        <tr>\n                            <th>#</th>\n                            <th>Vencimento</th>\n                            <th>Nome</th>\n                            <th>Valor</th>\n                            <th>Paga?</th>\n                            <th>A\xE7\xF5es</th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr v-for="(index,o) in bills">\n                            <td>{{ index + 1 }}</td>\n                            <td>{{ o.date_due | dateFormat \'pt-BR\'}}</td>\n                            <td>{{ o.name }}</td>\n                            <td>{{ o.value | numberFormat \'pt-BR\' \'BRL\' }}</td>\n                            <td :class="{\'green lighten-2\': o.done, \'red lighten-2\': !o.done}">{{ o.done | doneLabel }}</td>\n                            <td>\n                                <a href="#" v-link="{name: \'bill-receive.update\', params: {id: o.id}}">Editar</a> |\n                                <a href="#" @click.prevent="openModalDelete(o)">Deletar</a>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n        <modal :modal="modal">\n            <div slot="content">\n                <h4>Mensagem de confirma\xE7\xE3o</h4>\n                <p><strong>Deseja excluir esta conta?</strong></p>\n                <div class="divider"></div>\n                <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n                <p>Valor: <strong>{{billToDelete.value | numberFormat }}</strong></p>\n                <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat }}</strong></p>\n                <div class="divider"></div>\n            </div>\n            <div slot="footer">\n                <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="deleteBill">OK</button>\n                <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n            </div>\n        </modal>\n    ',
	    data: function data() {
	        return {
	            bills: [],
	            billToDelete: null,
	            modal: {
	                id: 'modal-delete'
	            }
	        };
	    },
	    created: function created() {
	        var _this = this;

	        BillReceive.query().then(function (response) {
	            _this.bills = response.data;
	        });
	    },

	    methods: {
	        deleteBill: function deleteBill() {
	            var _this2 = this;

	            BillReceive.delete({ id: this.billToDelete.id }).then(function (response) {
	                _this2.bills.$remove(_this2.billToDelete);
	                _this2.billToDelete = null;
	                Materialize.toast('Conta Excluída com Sucesso!', 4000);
	                _this2.$dispatch('change-info');
	            });
	        },
	        openModalDelete: function openModalDelete(bill) {
	            this.billToDelete = bill;
	            $('#modal-delete').modal('open');
	        }
	    }
	};

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var namesReceive = ['Loteria', 'Recebimento', 'Aluguel', 'Ganhos', 'Salário', 'Herança', 'Outros'];
	var Bill = __webpack_require__(31);
	module.exports = {
	    template: '\n<div class="container">\n            <div class="row">\n                <form name="form" v-on:submit.prevent="submit">\n                    <div class="row">\n                        <h2>Novo Recebimento</h2>\n                        <div class="input-field col s6">\n                            <label class="active">Vencimento:</label>\n                            <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'" placeholder="Informe a Data"/>\n                        </div>\n                        <div class="input-field col s6">\n                            <label class="active">Valor:</label>\n                        <input type="text" v-model="bill.value | numberFormat \'pt-BR\' \'BRL\'"/>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s6">\n                            <label class="active">Nome:</label>\n                            <select v-model="bill.name" id="name" class="browser-default">\n                            <option value="" disabled selected>Escolha um nome</option>\n                                <option v-for="b in names" :value="b">{{ b }}</option>\n                            </select>\n                        </div>\n                        <div class="input-field col s6">\n                            <input type="checkbox" class="filled-in" v-model="bill.done" id="pago"/>\n                            <label for="pago">Pago?</label>\n                        </div>\n                    </div>\n                    <div class="row">\n                        <div class="input-field col s12">\n                            <input type="submit" value="Enviar" class="btn btn-large right"/>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    ',
	    data: function data() {
	        return {
	            formType: 'insert',
	            names: namesReceive,
	            bill: new Bill()
	        };
	    },
	    created: function created() {
	        if (this.$route.name == 'bill-receive.update') {
	            this.formType = 'update';
	            this.getBill(this.$route.params.id); //:id da rota update
	        }
	    },
	    ready: function ready() {
	        $('#name').material_select();
	    },

	    methods: {
	        submit: function submit() {
	            var _this = this;

	            var data = this.bill.toJSON();
	            if (this.formType == 'insert') {
	                BillReceive.save({}, data).then(function (response) {
	                    Materialize.toast('Conta Criada com Sucesso!', 4000);
	                    _this.$dispatch('change-info');
	                    _this.$router.go({ name: 'bill-receive.list' });
	                });
	            } else {
	                BillReceive.update({ id: this.bill.id }, data).then(function (response) {
	                    Materialize.toast('Conta Atualizada com Sucesso!', 4000);
	                    _this.$dispatch('change-info');
	                    _this.$router.go({ name: 'bill-receive.list' });
	                });
	            }
	        },
	        getBill: function getBill(id) {
	            var _this2 = this;

	            BillReceive.get({ id: id }).then(function (response) {
	                _this2.bill = new Bill(response.data);
	            });
	        },
	        getDateDue: function getDateDue(date_due) {
	            var dateDueObject = date_due;
	            if (!(date_due instanceof Date)) {
	                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
	            }
	            return dateDueObject.toISOString().split('T')[0];
	        }
	    }
	};

/***/ },

/***/ 35:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	    template: "\n        <h2>{{ title }}</h2>\n        <div class=\"row\">\n            <div class=\"col s4\">\n                <div class=\"card custom-blue\">\n                    <div class=\"card-content white-text\">\n                        <p>Total de Contas a Pagar: {{ total.pay | numberFormat }}</p>\n                        <p>Total de Contas Pagas: {{ total.payed | numberFormat }}</p>\n                        <p>Total de Contas a Receber: {{ total.receive | numberFormat }} </p>\n                        <p>Total de Contas Recebidas: {{ total.received | numberFormat }}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
	    data: function data() {
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
	    created: function created() {
	        var self = this;
	        BillReceive.total().then(function (response) {
	            self.total.receive = response.data.total;
	        });

	        BillReceive.totalReceived().then(function (response) {
	            self.total.received = response.data.total;
	        });

	        BillPay.total().then(function (response) {
	            self.total.pay = response.data.total;
	        });

	        BillPay.totalPayed().then(function (response) {
	            self.total.payed = response.data.total;
	        });
	    }
	};

/***/ },

/***/ 36:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    template: '\n        <ul v-bind:id="o.id" class="dropdown-content" v-for="o in menusDropdown">\n            <li v-for="item in o.items">\n                <a v-link="{name: item.routeName}">{{ item.name }}</a>\n            </li>\n        </ul>\n        <div class="navbar-fixed">\n            <nav>\n                <div class="nav-wrapper container">\n                    <a href="#" class="right brand-logo">Code Contas</a>\n                    <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>\n                    <ul class="left hide-on-med-and-down">\n                        <li v-for="o in menus">\n                            <!--<a href="#" v-link="{path: o.url}">{{ o.name }}</a>-->\n                            <a href="!#" v-if="o.dropdownId" class="dropdown-button" v-bind:data-activates="o.dropdownId">{{ o.name }} <i class="material-icons right">arrow_drop_down</i> </a>\n                            <a v-else v-link="{name: o.routeName}">{{ o.name }}</a>\n                        </li>\n                    </ul>\n                    <ul id="nav-mobile" class="side-nav">\n                        <li v-for="o in menus">\n                            <!--<a href="#" v-link="{path: o.url}">{{ o.name }}</a>-->\n                            <a href="#" v-link="{name: o.routeName}">{{ o.name }}</a>\n                        </li>\n                    </ul>\n                </div>\n            </nav>\n        </div>\n        <modal></modal>\n        <router-view></router-view>\n    ',
	    ready: function ready() {
	        $('.button-collapse').sideNav();
	        $('.dropdown-button').dropdown();
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
	};

/***/ }

});
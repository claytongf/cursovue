/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".app.bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(4), __webpack_require__(5), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10), __webpack_require__(11), __webpack_require__(12)]; (function (billPayComponent, billPayListComponent, billPayCreateComponent, billReceiveComponent, billReceiveListComponent, billReceiveCreateComponent, dashboard, billComponent) {
	    var router = new VueRouter();
	    router.map({
	        '/bill-pays': {
	            name: 'bill-pay',
	            component: billPayComponent,
	            subRoutes: {
	                '/': {
	                    name: 'bill-pay.list',
	                    component: billPayListComponent
	                },
	                '/create': {
	                    name: 'bill-pay.create',
	                    component: billPayCreateComponent
	                },
	                '/:id/update': {
	                    name: 'bill-pay.update',
	                    component: billPayCreateComponent
	                }
	            }
	        },
	        '/bill-receives': {
	            name: 'bill-receive',
	            component: billReceiveComponent,
	            subRoutes: {
	                '/': {
	                    name: 'bill-receive.list',
	                    component: billReceiveListComponent
	                },
	                '/create': {
	                    name: 'bill-receive.create',
	                    component: billReceiveCreateComponent
	                },
	                '/:id/update': {
	                    name: 'bill-receive.update',
	                    component: billReceiveCreateComponent
	                }
	            }
	        },
	        'dashboard': {
	            name: 'bill.dashboard',
	            component: dashboard
	        },
	        '*': {
	            component: dashboard
	        }
	    });

	    router.start({
	        components: {
	            'bill-component': billComponent
	        }
	    }, '#app');

	    router.redirect({
	        '*': '/dashboard'
	    });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	// app.$watch('test', function(novoValor, velhoValor){
	//     console.log("velhoValor:"+velhoValor+", novo Valor:"+novoValor);
	// });

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bill = function () {
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
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	Vue.filter('doneLabel', function (value) {
	    return value == 0 ? "Não Paga" : "Paga";
	});
	Vue.filter('statusGeneral', function (value, type) {
	    type = type === 'undefined' ? 0 : type;
	    if (value === false) {
	        return "Nenhuma conta cadastrada";
	    }
	    if (!value) {
	        return "Nenhuma conta a " + (type === 0 ? 'pagar' : 'receber');
	    } else {
	        return value + " contas a " + (type === 0 ? 'pagar' : 'receber');
	    }
	});

	Vue.filter('numberFormat', {
	    read: function read(value, locale, currency) {
	        //mostrar a informação na view
	        locale = locale && (typeof locale === "undefined" ? "undefined" : _typeof(locale)) !== undefined ? locale : 'pt-BR';
	        currency = currency && (typeof currency === "undefined" ? "undefined" : _typeof(currency)) !== undefined ? currency : 'BRL';
	        var number = 0;
	        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
	            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
	            number = numberRegex ? numberRegex[0] : numberRegex;
	        }
	        return new Intl.NumberFormat(locale, {
	            minimumFractionDigits: 2,
	            maximumFractionDigits: 2,
	            style: 'currency',
	            currency: currency
	        }).format(number);
	    },
	    write: function write(value) {
	        //pega o valor da vie e converte para armazenar no modelo
	        var number = 0;
	        if (value.length > 0) {
	            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
	            number = isNaN(number) ? 0 : parseFloat(number);
	        }
	        return number;
	    }
	});

	Vue.filter('dateFormat', {
	    read: function read(value, locale) {
	        //mostrar a informação na view
	        locale = locale && (typeof locale === "undefined" ? "undefined" : _typeof(locale)) !== undefined ? locale : 'pt-BR';
	        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
	            if (!(value instanceof Date)) {

	                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
	                var dateString = dateRegex ? dateRegex[0] : dateRegex;
	                if (dateString) {
	                    value = new Date(dateString + "T03:00:00");
	                } else {
	                    return value;
	                }
	            }
	            return new Intl.DateTimeFormat(locale).format(value).split(' ')[0];
	        }
	        return value;
	    },
	    write: function write(value) {
	        //pega o valor da vie e converte para armazenar no modelo
	        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
	        if (dateRegex) {
	            var dateString = dateRegex[0];
	            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
	            if (!isNaN(date.getTime())) {
	                return date;
	            }
	        }
	        return value;
	    }
	});

	Vue.filter('uppercase', {
	    read: function read(value) {
	        return value.toUpperCase();
	    },
	    write: function write(value) {
	        return value.toLowerCase();
	    }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Vue.http.options.root = 'http://192.168.10.10:8000/api';

	window.BillPay = Vue.resource('bills-pay{/id}', {}, {
	    total: { method: 'GET', url: 'bills-pay/total' },
	    totalPayed: { method: 'GET', url: 'bills-pay/total/done' }
	});

	window.BillReceive = Vue.resource('bills-receive{/id}', {}, {
	    total: { method: 'GET', url: 'bills-receive/total' },
	    totalReceived: { method: 'GET', url: 'bills-receive/total/done' }
	});

/***/ }
/******/ ]);
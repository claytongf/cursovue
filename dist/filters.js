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
        return "Existem " + value + " contas a serem " + (type === 0 ? 'pagas' : 'recebidas');
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
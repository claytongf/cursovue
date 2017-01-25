<script type="text/javascript">
    Vue.filter('doneLabel', (value) => value == 0 ? "Não Paga" : "Paga");
    Vue.filter('statusGeneral', (value, type) => {
        type = (type === 'undefined' ? 0 : type);
        if (value === false) {
            return "Nenhuma conta cadastrada";
        }
        if (!value) {
            return "Nenhuma conta a " + ((type === 0) ? 'pagar' : 'receber');
        } else {
            return value + " contas a " + ((type === 0) ? 'pagar' : 'receber');
        }
    });

    Vue.filter('numberFormat', {
        read(value, locale, currency){ //mostrar a informação na view
            locale = (locale && typeof locale !== undefined) ? locale : 'pt-BR';
            currency = (currency && typeof currency !== undefined) ? currency : 'BRL';
            let number = 0;
            if (value && typeof value !== undefined) {
                let numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
                number = numberRegex ? numberRegex[0] : numberRegex;
            }
            return new Intl.NumberFormat(locale, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                style: 'currency',
                currency: currency
            }).format(number);
        },
        write(value){ //pega o valor da vie e converte para armazenar no modelo
            let number = 0;
            if (value.length > 0) {
                number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
                number = isNaN(number) ? 0 : parseFloat(number);
            }
            return number;
        }
    });

    Vue.filter('dateFormat', {
        read(value, locale){ //mostrar a informação na view
            locale = (locale && typeof locale !== undefined) ? locale : 'pt-BR';
            if (value && typeof value !== undefined) {
                if (!(value instanceof Date)) {

                    let dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                    let dateString = dateRegex ? dateRegex[0] : dateRegex;
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
        write(value){ //pega o valor da vie e converte para armazenar no modelo
            let dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
            if (dateRegex) {
                let dateString = dateRegex[0];
                let date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
                if (!isNaN(date.getTime())) {
                    return date;
                }
            }
            return value;
        }
    });

    Vue.filter('uppercase', {
        read(value){
            return value.toUpperCase();
        },
        write(value){
            return value.toLowerCase();
        }
    });
</script>
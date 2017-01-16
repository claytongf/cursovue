Vue.filter('doneLabel', function(value){
    if(value == 0){
        return "Não Paga";
    }else{
        return "Paga";
    }
});
Vue.filter('statusGeneral', function(value, type){
    type = (type === 'undefined' ? 0 : type);
    if(value === false){
        return "Nenhuma conta cadastrada";
    }
    if(!value){
        return "Nenhuma conta a " + ((type === 0) ? 'pagar' : 'receber');
    }else{
        return "Existem " + value + " contas a serem " + ((type === 0) ? 'pagas' : 'recebidas');
    }
});
var app={
    inicio: function(){
        var botonClaro = document.querySelector("#claro");
        var botonOscuro = document.querySelector("#oscuro");

        botonClaro.addEventListener('click',this.cambioClaro,false);
        botonOscuro.addEventListener('click',this.cambioOscuro,false);
    },

    cambioClaro: function(){
        document.body.className = 'claro';
    },

    cambioOscuro: function(){
        document.body.className = 'oscuro';
    }
};

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function(){
        FastClick.attach(document.body);
        app.inicio();
    },false);
}

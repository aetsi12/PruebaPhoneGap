var app={
    inicio: function(){
        this.iniciaBotones();
        this.iniciaFastClick();
        this.iniciaHammer();
    },

    iniciaBotones: function(){
        var botonClaro = document.querySelector("#claro");
        var botonOscuro = document.querySelector("#oscuro");
        botonClaro.addEventListener('click',this.cambioClaro,false);
        botonOscuro.addEventListener('click',this.cambioOscuro,false);
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },

    iniciaHammer: function(){
        var zona = document.querySelector('#zona-gestos');
        var hammertime = new Hammer(zona);
        hammertime.get('pinch').set({enable:true});
        hammertime.get('rotate').set({enable:true});

        hammertime.on('tap doubletap pan swipe press pinch rotate', function(ev){
            document.querySelector('#info').innerHTML = ev.type+'!';
        });
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
        app.inicio();
    },false);
}

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

        zona.addEventListener('webkitAnimationEnd', function(e){
            zona.className='';
        });

        hammertime.on('doubletap', function(event){
            zona.className = 'doubletap';
        });

        hammertime.on('press', function(event){
            zona.className = 'press';
        });

        hammertime.on('swipe', function(event){
            var clase = undefined;
            if(event.direction===4) clase='swipe-derecha';
            if(event.direction===2) clase='swipe-izquierda';
            zona.className=clase;
        });

        hammertime.on('rotate', function(event){
            var umbral=25;
            if(event.distance>umbral) zona.className = 'rotate';
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

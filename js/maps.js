var app = {
    inicio: function(){
        this.iniciaFastClick();
    },
    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },
    dispositivoListo: function(){
        navigator.geolocation.getCurrentPosition(app.dibujaCoordenadas, app.error);
    },
    dibujaCoordenadas: function(position){
        var coordsDiv = document.querySelector('#coords');
        coordsDiv.innerHTML = "Latitud: "+position.coords.latitude + "Longitud: "+position.coords.longitude;
    },
    error: function(e){
        console.log(e.code + ": " + e.message);
        document.querySelector('#coords').innerHTML = e.code + ": " + e.message;
    }
};

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function(){
        app.inicio();
    }, false);
    document.addEventListener('deviceready', function(){
        app.dispositivoListo();
    }, false);
}

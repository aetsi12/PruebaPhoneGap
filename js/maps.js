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
        var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYm9jYXRhMTIiLCJhIjoiY2l4d2VuaG91MDAzajMybm9icHA3bXQ2YiJ9.PDNsY80mvHO7Ru0HH8Ha1g',{
            maxZoom: 18
        }).addTo(miMapa);

        app.pintarMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

        miMapa.on('click', function(event){
            var txt = 'Marcador en l(' + event.latlng.lat.toFixed(2) + ') y L(' + event.latlng.lng.toFixed(2) + ').';
            app.pintarMarcador(event.latlng, txt, miMapa);
        });
    },
    pintarMarcador: function(latlng, txt, mapa){
        var marcador = L.marker(latlng).addTo(mapa);
        marcador.bindPopup(txt).openPopup();
    },
    error: function(e){
        console.log(e.code + ": " + e.message);
        document.querySelector('#map').innerHTML = e.code + ": " + e.message;
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

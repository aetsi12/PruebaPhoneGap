var app = {
    inicio: function(){
        this.iniciaFastClick();
        this.iniciaBoton();
    },
    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },
    iniciaBoton: function(){
        var buttonAction = document.querySelector('#button-action');
        buttonAction.addEventListener('click', this.tomarFoto);
    },
    tomarFoto: function(){
        var opciones = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 300,
            targetHeight: 300,
            correctOrientation: true
        };
        navigator.camera.getPicture(app.fotoTomada, app.errorFoto, opciones);
    },
    fotoTomada: function(imageURI){
        var image = document.querySelector('#foto');
        image.src = imageURI;
    },
    errorFoto: function(message){
        console.log("Fallo al sacar la foto o foto cancelada: "+message);
    }
};

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function(){
        app.inicio();
    }, false);
}

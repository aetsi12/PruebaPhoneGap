var app = {
    inicio: function(){
        function onError(){
            console.log('ERROR!');
        }
        navigator.accelerometer.watchAcceleration(this.onSuccess, onError,{frequency:1000});
    },

    onSuccess: function(data){
        app.representa(data.x, '#valorx');
        app.representa(data.y, '#valory');
        app.representa(data.z, '#valorz');
    },
    representa: function(data, htmlElement)  {
        data = Math.round(data * 100) / 100;
        document.querySelector(htmlElement).innerHTML = data;
    }
};

if('addEventListener' in document){
    document.addEventListener('deviceready', function(){
        app.inicio();
    }, false);
}

var app = {
    inicio: function(){
        DIAMETRO_BOLA = 50;

        dificultad = 0;
        velocidadX = 0;
        velocidadY = 0;
        score = 0;

        alto = document.documentElement.clientHeight;
        ancho = document.documentElement.clientWidth;
        app.vigilaSensores();
        app.iniciaJuego();
    },
    iniciaJuego: function(){
        function preload(){
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#f27d0c';
            game.load.image('bola', 'img/bola.png');
            game.load.image('objetivo', 'img/objetivo.png');
        }

        function create(){
            scoreText = game.add.text(16,16, score, {fontSize: '100px', fill: '#757676'});

            objetivo = game.add.sprite(app.inicioX(), app.inicioY(), 'objetivo');
            bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');

            game.physics.arcade.enable(objetivo);
            game.physics.arcade.enable(bola);

            bola.body.collideWorldBounds = true;
            //bola.body.onWorldBounds = new Phaser.Signal();
            //bola.body.onWorldBounds.add(app.decrementaPuntuacion, this);
        }

        function update(){
            var factorDificultad = (300 + (dificultad*100)); //Cuanta más dificultad más velocidad
            bola.body.velocity.y = (velocidadY * factorDificultad);
            bola.body.velocity.x = (velocidadX * (-1 * factorDificultad));

            game.physics.arcade.overlap(bola, objetivo, app.incrementaPuntuacion, null, this);
        }

        var estados = {preload: preload, create: create, update: update};
        var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser', estados);
    },

    decrementaPuntuacion: function(){
        score -= 1;
        scoreText.text = score;
    },

    incrementaPuntuacion: function(){
        score += 1;
        scoreText.text = score;

        objetivo.body.x = app.inicioX();
        objetivo.body.y = app.inicioY();

        dificultad+=1;
    },

    inicioX: function(){
        return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA);
    },
    inicioY: function(){
        return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA);
    },
    numeroAleatorioHasta: function(limite){
        return Math.floor(Math.random()*limite);
    },
    vigilaSensores: function(){
        function onError(){
            console.log("ERROR");
        }

        function onSuccess(data){
            app.detectaAgitacion(data);
            app.registraDireccion(data);
        }

        navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
    },
    detectaAgitacion: function(data){
        if(data.x > 10 || data.y > 10)
            setTimeout(app.recomienza, 1000);
    },
    recomienza: function(){
        document.location.reload(true);
    },
    registraDireccion: function(data){
        velocidadX = data.x;
        velocidadY = data.y;
    }
};

if('addEventListener' in document){
    document.addEventListener('deviceready',function(){
        app.inicio();
    }, false);
}

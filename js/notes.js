var app = {

    model: {
        "notas" : [{"titulo": "Comprar pan", "contenido": "Oferta en la panadería de la esquina."}]
    },

    firebaseConfig: {
        apiKey: "AIzaSyCaTgRoNQ1NYfD5kHKzRf1G03MeMVA5Hmk",
        authDomain: "cosanotas.firebaseapp.com",
        databaseURL: "https://cosanotas.firebaseio.com",
        storageBucket: "cosanotas.appspot.com",
        messagingSenderId: "1081408885833"
    },

    inicio: function(){
        this.iniciaFastClick();
        this.iniciaFirebase();
        this.iniciaBotones();
        this.refrescarLista();
    },

    iniciaFirebase: function(){
        firebase.initializeApp(this.firebaseConfig);
    },

    iniciaFastClick: function(){
        FastClick.attach(document.body);
    },

    iniciaBotones: function(){
        var guardar = document.querySelector('#guardar');
        var add = document.querySelector('#add');
        guardar.addEventListener('click', this.guardarNota, false);
        add.addEventListener('click', this.mostrarEditor, false);
    },

    mostrarEditor: function(){
        document.getElementById('titulo').value = "";
        document.getElementById('comentario').value = "";
        document.getElementById('note-editor').style.display = "block";
        document.getElementById('titulo').focus();
    },

    guardarNota: function(){
        app.construirNota();
        app.ocultarEditor();
        app.refrescarLista();
        app.grabarDatos();
    },

    refrescarLista: function(){
        document.getElementById('notes-list').innerHTML = this.addNotasLista();
    },

    addNotasLista: function(){
        var notas = this.model.notas;
        var notasDivs = '';
        for (var i in notas){
            var titulo = notas[i].titulo;
            notasDivs = notasDivs + this.addNota(i, titulo);
        }
        return notasDivs;
    },

    addNota: function(id, titulo){
        return "<div class='note-item' id='notas[" + id + "]'>" + titulo + "</div>";
    },

    construirNota: function(){
        var notas = app.model.notas;
        notas.push({"titulo": app.extraerTitulo(), "contenido": app.extraerComentario()});
    },

    extraerTitulo: function(){
        return document.getElementById('titulo').value;
    },

    extraerComentario: function(){
        return document.getElementById('comentario').value;
    },

    ocultarEditor: function(){
        document.getElementById('note-editor').style.display = "none";
    },

    grabarDatos: function(){
        window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, this.gotFS, this.fail);
    },

    gotFS: function(fileSystem){
        fileSystem.getFile("files/"+"model.json", {create: true, exclusive: false}, app.gotFileEntry, app.fail);
    },

    gotFileEntry: function(fileEntry){
        fileEntry.createWriter(app.gotFileWriter, app.fail);
    },

    gotFileWriter: function(writer) {
        writer.onwriteend = function(evt) {
            console.log("datos grabados en externalApplicationStorageDirectory");
            if(app.hayWifi()) {
                app.guardarFirebase();
            }
        };
        writer.write(JSON.stringify(app.model));
    },

    guardarFirebase: function() {
        var ref = firebase.storage().ref('model.json');
        ref.putString(JSON.stringify(app.model));
    },

    hayWifi: function() {
        return navigator.connection.type==='wifi';
    },

    leerDatos: function() {
        window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, this.obtenerFS, this.fail);
    },

    obtenerFS: function(fileSystem) {
        fileSystem.getFile("files/"+"model.json", null, app.obtenerFileEntry, app.noFile);
    },

    obtenerFileEntry: function(fileEntry) {
        fileEntry.file(app.leerFile, app.fail);
    },

    leerFile: function(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var data = evt.target.result;
            app.model = JSON.parse(data);
            app.inicio();
        };
        reader.readAsText(file);
    },

    noFile: function(error) {
        app.inicio();
    },

    fail: function(error) {
        console.log(error.code);
    },

};

if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function(){
        app.leerDatos();
    }, false);
}

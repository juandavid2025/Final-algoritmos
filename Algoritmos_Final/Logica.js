class Logica{
    
    constructor(app){
        this.app = app;
        this.app.createCanvas(1200, 750);
        this.escenario = this.app.loadImage("./Recursos/Campo1.png");
        this.fuente = this.app.loadFont("./Recursos/fuente.ttf");
        this.bola = new Bola (this.app,this);
        this.usuario1 = new Usuario(this.app,700,500,this,1);
        this.usuario2 = new Usuario(this.app,200,500,this,2);
        this.golUsu1 = 0;
        this.golUsu2 = 0;
        this.permiso = false;
      
        
    }
    //Precargar sonidos
    preload(){
        this.app.soundFormats('mp3', 'ogg');
        this.ambiente = this.app.loadSound("./Recursos/Sonidos/ambiente1.mp3");
        this.gol = this.app.loadSound("./Recursos/Sonidos/gol.mp3");
        this.patear = this.app.loadSound("./Recursos/Sonidos/patear.mp3");
        console.log(this.ambiente.isLoaded());
        this.ambiente.play();
    }
    //Pintar juego usuarios, bola, background y goles
    pintar(){
        this.app.background(200);
        this.app.image(this.escenario,0,0);
        this.bola.pintar();
        this.bola.mover();
        this.bola.validarGol();
        this.usuario1.pintar();
        this.usuario2.pintar();
        this.app.fill(255);
        this.app.textSize(50);
        this.app.textFont(this.fuente);
        this.app.text(this.golUsu1 + " - " + this.golUsu2,540,720);
    }
    //Movimiento del jugador por medio del teclado
    keyPressed(){
        //Caso usuario 1
        switch(this.app.keyCode){
            case this.app.UP_ARROW: // Arriba
                this.usuario1.moviendoArriba = true; 
                this.app.sonido.play(); 
            break;
            case this.app.DOWN_ARROW: // Abajo
                this.usuario1.moviendoAbajo = true;    
            break;
            case this.app.LEFT_ARROW: // Izquierda
                this.usuario1.moviendoIzquierda = true;    
            break;
            case this.app.RIGHT_ARROW: // Derecha
                this.usuario1.moviendoDerecha = true;    
            break;
            case 76: // Golpear   L            
                this.usuario1.tiempo = true;
                this.usuario1.estaGolpeando = true;      
            break;
            
            //Caso usuario 2
            case 87: //Arriba
                this.usuario2.moviendoArriba = true; 
            break;
            case 83: //Abajo
                this.usuario2.moviendoAbajo = true; 
            break;
            case 68: //Derecha
                this.usuario2.moviendoDerecha = true;   
            break;
            case 65: //Izquierda
                this.usuario2.moviendoIzquierda = true; 
            break;
            case 71: // Golpear G
                this.usuario2.tiempo = true;
                this.usuario2.estaGolpeando = true;      
            break;
        }
    }
    keySoltado(){
        switch(this.app.keyCode){
            case this.app.UP_ARROW: // Arriba
                this.usuario1.moviendoArriba = !this.usuario1.moviendoArriba;
                break;
            case this.app.DOWN_ARROW: // Abajo
                this.usuario1.moviendoAbajo = !this.usuario1.moviendoAbajo;    
            break;
            case this.app.LEFT_ARROW: // Izquierda
                this.usuario1.moviendoIzquierda = !this.usuario1.moviendoIzquierda;    
            break;
            case this.app.RIGHT_ARROW: // Derecha
                this.usuario1.moviendoDerecha = !this.usuario1.moviendoDerecha;    
            break;
            case 76: // Golpear L       
                this.usuario1.estaGolpeando = false;
            break;
            
            //Caso usuario 2
            case 87: //Arriba
                this.usuario2.moviendoArriba = !this.usuario2.moviendoArriba; 
            break;
            case 83: //Abajo
                this.usuario2.moviendoAbajo = !this.usuario2.moviendoAbajo; 
            break;
            case 68: //Derecha
                this.usuario2.moviendoDerecha = !this.usuario2.moviendoDerecha;   
            break;
            case 65: //Izquierda
                this.usuario2.moviendoIzquierda = !this.usuario2.moviendoIzquierda; 
            break;
            case 71: // Golpear G
                this.usuario2.estaGolpeando = false;
            break;
        }
    }
    //Funcion para seguir jugando despues de ganar (reiniciar)
    mousePressed(){
        
       if(this.usuario1.gano == true || this.usuario2.gano == true){
        this.golUsu1 = 0;
        this.golUsu2 = 0;
        this.bola.dirX = this.bola.arregloDir[2];
        this.bola.dirY = this.bola.arregloDir[3];
        this.usuario1.gano = false;
        this.usuario2.gano = false;
       }
    }
}
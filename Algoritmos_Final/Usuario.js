class Usuario {
    constructor(app,x,y,logica,i){
        this.app = app;
        this.x = x;
        this.y = y;
        this.ancho = 70;
        this.alto = 150;
        //Booleanos para movimiento
        this.moviendoArriba = false;
        this.moviendoAbajo = false;
        this.moviendoDerecha = false;
        this.moviendoIzquierda = false;
        
        this.estaGolpeando = false;
        this.logica = logica;
        this.contador = 0;
        this.tiempo = false;
        this.patada = false;
        this.i = i;
        this.img = this.app.loadImage("./Recursos/Usuario"+this.i+".png");
        this.feedback = this.app.loadImage("./Recursos/Usuario"+this.i+"Golpeando.png");  
        this.gano = false;
    }
    //Pinta de acuerdo a su estado etc
    pintar(){
        if(this.estaGolpeando){
            this.app.image(this.feedback,(this.x-this.ancho/2)-23,(this.y-this.alto/2)+20);
        }
        this.app.image(this.img,this.x,this.y);
        
        this.mover();
        if(this.tiempo == true){
            this.contador += 1;
            if(this.contador == 50){
                this.tiempo = false;
                this.estaGolpeando = false;
                this.contador = 0;
                this.patada = true;
            }
        }
        if(this.validar(this.logica.bola.getX(),this.logica.bola.getY(), this.logica.bola.tam,this.logica.bola.tam)
         && this.estaGolpeando){          
            this.golpear();
        } 
        if(this.validarGanador(this.logica.golUsu1,this.logica.golUsu2)){
            this.gano = true;
        }
    }
    //Funcion para golpear la pelota
    golpear(){
        if(this.patada == true && this.logica.bola.x + this.logica.bola.tam/2 > this.x && this.logica.bola.x + this.logica.bola.tam/2 < this.x + this.ancho && 
            this.logica.bola.y + this.logica.bola.tam >= this.y || this.logica.bola.y + this.logica.bola.tam + this.alto < this.y){
                this.logica.bola.dirX = -this.logica.bola.dirX;
                    this.logica.bola.dirY = -this.logica.bola.dirY;
                    this.tiempo = false;
                    this.patada = false;        
        }
        if (this.logica.bola.x + this.logica.bola.tam >= this.x && this.logica.bola.x < this.x+9 && this.logica.bola.y + this.logica.bola.tam/2 >= this.y 
            && this.logica.bola.y + this.logica.bola.tam/2 <= this.logica.bola.y + this.alto || this.x > this.logica.bola.y){
                this.logica.bola.dirX = -this.logica.bola.dirX;
        }
    }
    //Movimiento de los usuarios por medio de teclas y boleanos, limite para que no se vaya fuera del lienzo
    mover(){
        if(this.moviendoArriba){
            this.y-=5;        
        }  
        if(this.moviendoAbajo){
            this.y+=5;        
        }  
        if(this.moviendoDerecha){
            this.x+=5;        
        }
        if(this.moviendoIzquierda){
            this.x-=5;       
        }
        if(this.x + this.ancho/2 >= this.app.width) {
            this.x = this.app.width - this.ancho/2;              
            }
        if(this.x + this.ancho/2 <= 0) {
            this.x = -this.ancho/2;              
            }
        if(this.y + this.alto/2 >= this.app.height) {
            this.y = this.app.height-this.alto/2;
            }
        if(this.y + this.alto/2 <= 0) {
            this.y = -this.alto/2;
            }        
    }
    //Validación de choque
    validar(otroX,otroY,otroAncho,otroAlto){
        if(otroX + otroAncho > this.x && otroX < (this.x + this.ancho)
            && otroY + otroAlto  > this.y && otroY <  (this.y + this.alto) ){
               return true;
            }else {
                return false;
            }
    }
    //Validacion de que jugador gano
    validarGanador(Usuario1, Usuario2){
        if(Usuario1 == 2){
        this.app.fill(255);
        this.app.textAlign(this.app.CENTER);
        this.app.textSize(80);
        this.app.text("EQUIPO ROJO GANA",this.app.width/2,this.app.height/2);
        this.app.textSize(30);
        this.app.text("Presiona click para jugar de nuevo",this.app.width/2,this.app.height/2 + 50);
        this.app.textAlign(this.app.CORNER);
        this.logica.bola.dirX = 0;
        this.logica.bola.dirY = 0;
        this.gano = true;
        }
        if(Usuario2 == 2){
        this.app.fill(255);
        this.app.textAlign(this.app.CENTER);
        this.app.textSize(80);
        this.app.text("EQUIPO AMARILLO GANA",this.app.width/2,this.app.height/2);
        this.app.textSize(30);
        this.app.text("Presiona click para jugar de nuevo",this.app.width/2,this.app.height/2 + 60);
        this.app.textAlign(this.app.CORNER,this.app.BOTTOM);
        this.logica.bola.dirX = 0;
        this.logica.bola.dirY = 0;
        this.gano = true;
        }
    }
    
}
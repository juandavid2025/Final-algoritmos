class Bola {
    constructor(app,logica){
        this.app = app;
        this.logica = logica;
        this.x = this.app.width/2;
        this.y =  this.app.height/2;
        this.arregloDir = [-4,-2,2,4];
        this.dirX = this.arregloDir[2];
		this.dirY = this.arregloDir[3];
        this.color = 150;
        this.tam = 50;
        //Mover por medio de un hilo
        this.mover = this.mover.bind(this);
        setInterval(this.mover, 100);
        this.precargar();
    }
    //Funcion precargar para el gif
    precargar(){
        this.gif = this.app.createImg('./Recursos/Balon.gif');
        this.gif.size(95, 95);
    }
    //Pintar la pelota de futbol (gif)
    pintar(){
        this.app.ellipseMode(this.app.CORNER);
        this.gif.position(this.x-17, this.y-17);
    }
    //Movimiento y rebote
    mover(){
        //Formulas para mover
			this.x  +=  this.dirX;
			this.y +=  this.dirY;
			//Condiciones para cambio de direccion y rebote en los bordes
			if(this.x >= this.app.width - this.tam || this.x <= 0) {
                this.dirX = -this.dirX;              
				}
			if(this.y >= this.app.height - this.tam || this.y <= 0) {
                this.dirY = -this.dirY;
                }         
    }
    //Validar si paso el arco y anota gol
    validarGol(){
        if(this.x + this.tam+3 >= this.app.width && this.y <= this.app.height*6/8 && this.y >= this.app.height/8){
            //console.log("gol rojo");
            this.logica.golUsu1++;
            this.y = this.app.random(100,700);
            this.x = this.app.width/2;
        }
        if(this.x -3 <=0 && this.y <= this.app.height*6/8 && this.y >= this.app.height/8){
            //console.log("gol amarillo");
            this.logica.golUsu2++;
            this.y = this.app.random(100,700);
            this.x = this.app.width/2;
        }
    }
    //Validacion de choque
    validar(otroX,otroY,otroAncho,otroAlto){
        if(otroX + otroAncho > this.x && otroX < (this.x + this.tam)
            && otroY + otroAlto  > this.y && otroY <  (this.y + this.tam) ){
               return true;
            }else {
                return false;
            }
    }
    //Cambio de dirección de acuerdo a la direccion con la que viene
    cambiarDireccion(){
        for(let i = 0; i < this.logica.obstaculos.length; i++){
            switch(this.logica.obstaculos[i].lado){
                case 1:
                    if(this.dirX > 0){
                        this.dirY = -this.dirY;
                        this.dirX = this.dirX;
                    }
                    if(this.dirX < 0){
                        this.dirY = -this.dirY;
                        this.dirX = this.dirX;
                    }
                break;
                case 2:
                    if(this.dirX > 0){
                        this.dirY = -this.dirY;
                        this.dirX = this.dirX;
                    }
                    if(this.dirX < 0){
                        this.dirY = -this.dirY;
                        this.dirX = this.dirX;
                    }
                break;
                case 3:
                    if(this.dirY > 0){
                        this.dirX = -this.dirX;
                        this.dirY = this.dirY;
                    }
                    if(this.dirY < 0){
                        this.dirX = -this.dirX;
                        this.dirY = this.dirY;
                    }
                break;
                case 4:
                if(this.dirY > 0){
                    this.dirX = -this.dirX;
                }
                if(this.dirY < 0){
                    this.dirX = -this.dirX;
                }
                break;

            }
        }
        
    }
    //Getters 
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
}
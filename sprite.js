function Sprite() {
  //Atibutos da Fisica
  this.x = 0;
  this.vx = 0;
  this.ax = 0;
  this.y = 0;
  this.vy = 0;
  this.ay = 0;
  this.w = 0;
  this.h = 0;

  //Atributos de grade
  this.gx = 0;
  this.gy = 0;
  this.s = 16;
  this.map;

  //Atributos da imagem
  this.imagem = "";
  this.wImagem = 0;
  this.hImagem = 0;
  this.sx = 0;
  this.sy = 0;

  this.colorBG;
  this.colorBorder;
  this.borderSize = 1;
};

Sprite.prototype.mover = function (dt) {
  this.gx = Math.floor(this.x/this.map.s);
  this.gy = Math.floor(this.y/this.map.s);
  /*if(this.map.cell[this.gy+1][this.gx] == 0){     //Se está no vento ele não pode acelerar em x
    this.ax = 0;
  }*/
  /*else{
    this.vx = this.vx + this.ax*dt;
  }*/
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (G+this.ay)*dt;
  /*if(this.map.cell[this.gy][this.gx] == 0 && this.y+this.s/2 != this.gy+this.map.s){

  }
  else{
    //this.vy = this.vy;
  }*/


  /****************************************************************
  * Outro meio de andar nesse caso é utilizando a propria grade***
  *****************************************************************/

  /*
    this.x = this.gx*this.map.s + this.s;       //Andando por grade
    this.y = this.gy*this.map.s + this.s;
  */

  if(this.taNoMapa()){
    //console.log("FOI - " + this.gy);
    if(this.vx < 0 && this.map.cell[this.gy][this.gx-1]===1){
      var limite = (this.gx)*this.map.s;
      var maxDx = limite-(this.x-this.s/2);
      var Dx = this.vx*dt;
      this.x += Math.max(Dx, maxDx);
      if(maxDx == 0){
        this.vx = 0;
      }
    } else if( this.vx > 0 && this.map.cell[this.gy][this.gx+1]===1){
      var limite = (this.gx+1)*this.map.s;
      var maxDx = limite-(this.x+this.s/2);
      var Dx = this.vx*dt;
      this.x += Math.min(Dx, maxDx);
      if(maxDx == 0){
        this.vx = 0;
      }
    }else {
      this.x += this.vx*dt;
    }
    //Ponto central do sprite é o meio, logo compara com metade somente
    //Tem alguns bugs em entrar parte nos blocos não permitidos
    if((this.vy)<0 && this.map.cell[this.gy-1][this.gx]===1){
      var limite = (this.gy)*this.map.s;
      var maxDy = limite-(this.y-this.s/2);
      var Dy = this.vy*dt;
      this.y += Math.max(Dy, maxDy);
      if(maxDy == 0){
          this.vy = 0;
      }
    } else if((this.vy) >0 && this.map.cell[this.gy+1][this.gx]===1){
      var limite = (this.gy+1)*this.map.s;
      var maxDy = limite-(this.y+this.s/2);
      var Dy = this.vy*dt;
      this.y += Math.min(Dy, maxDy);
      if(maxDy == 0){           //Se está no chão zera sua velocidade em Y pois não está caindo
        this.vy = 0;
      }
    }else {
      this.y += this.vy*dt;
    }

    if(this.map.cell[this.gy][this.gx] === 5){    //Substitui o cenário já descoberto
      this.map.cell[this.gy][this.gx] = 0;
    }
  }
  else{   //Saiu do mapa mas continua se movendo
    this.x += this.vx*dt;
    this.y += this.vy*dt;
  }


  /*if((this.vx === 0 && this.map.cell[this.gy][this.gx+1]!==0 && (this.x+this.s/2 > (this.gx+1)*this.map.s))
    ||(this.vx === 0 && this.map.cell[this.gy][this.gx+1]!==0 && (this.x+this.s/2 > (this.gx+1)*this.map.s))){ //Lado esquerdo
    //console.log("FOI");
    var limite = (this.gx+1)*this.map.s;
    var maxDx = limite-(this.x+this.s/2);
    var Dx = this.vx*dt;
    this.x += Math.min(Dx, maxDx);
  }*/
  /*if(this.map.cell[this.gy][this.gx] === 2){    //Substitui o cenário da moeda coletada
    audioLibrary.play("coin");
    this.map.cell[this.gy][this.gx] = 0;
  }*/




};

Sprite.prototype.taNoMapa = function(){
  if(this.gy > -1 && this.gy < (this.map.h-1) && this.gx >= 0 && this.gx < (this.map.w-1)){
    return true;
  }
  else{
    return false;
  }
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  imageLibrary.drawClipSize(ctx, this.imagem, this.sx, this.sy, this.s, this.s, -this.s/2, -this.s/2, this.s, this.s);
  ctx.restore();
  this.desenharCell(ctx);         //Debug mode Grid
};

Sprite.prototype.desenharInvertido = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.scale(-1,1);
  imageLibrary.drawClipSize(ctx, this.imagem, this.sx, this.sy, this.s, this.s, +this.s/2, -this.s/2, -this.s, this.s);
  ctx.restore();
  this.desenharCell(ctx);         //Debug mode Grid
};

Sprite.prototype.desenharCell = function(ctx){
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.strokeRect(this.gx*this.map.s, this.gy*this.map.s, this.map.s, this.map.s)
};

Sprite.prototype.desenharTempo = function (ctx) {
  ctx.fillStyle = this.colorBG;
  ctx.strokeStyle = this.colorBorder;
  ctx.lineWidth = this.borderSize;
  ctx.fillRect(this.x, this.y, this.w, this.h);
  ctx.strokeRect(this.x, this.y, this.w, this.h);
};

Sprite.prototype.impoeLimites = function(x, y, w, h){
  if(this.x + this.w < x){
    this.x = x;
    this.vx = 0;
  }
  if(this.x + this.w > x + w){
    this.x = x + w - this.w;
    this.vx = 0;
  }
  if(this.y < y){
    this.y = y;
    this.vy = 0;
  }
  if(this.y + this.h > y + h){
    this.y = y + h - this.h;
    this.vy = 0;
  }
};

Sprite.prototype.colidiuCom = function (alvo) {
  if(alvo.x+alvo.w < this.x) return false;
  if(alvo.x > this.x+this.w) return false;
  if(alvo.y+alvo.h < this.y) return false;
  if(alvo.y > this.y+this.h) return false;
  return true;
};

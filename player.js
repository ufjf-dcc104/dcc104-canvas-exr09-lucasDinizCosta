function Player() {
  this.sprite = new Sprite();
  this.timeWalkSound = 0.5;
  this.levelNumber = 1;
  this.vidas = 3;
  this.jumpState = false;

  //AnimationStates
  this.sentidoMovimento = true;     //true - Esquerda-direita false - direitaEsquerda
  this.animationState = 0;
  this.tempoAnimacao = 1;
  this.estadoAnimacaoAtual = 0;
  this.sentidoAnimacao = true;      //true - crescente, false - descrescente
  this.animation = [];
  this.animation.push(new Sprite());
  this.animation.push(new Sprite());
  this.animation.push(new Sprite());
  this.animation.push(new Sprite());
  this.animation.push(new Sprite());
  this.animation.push(new Sprite());
  this.animation.push(new Sprite());
  this.animation[0].sx = 80.5;            //Parado
  this.animation[0].sy = 34.5;
  this.animation[0].s = 15;
  this.animation[1].sx = 80.5+17;
  this.animation[1].sy = 34.5;
  this.animation[1].s = 15;
  this.animation[2].sx = 80.5+34;
  this.animation[2].sy = 34.5;
  this.animation[2].s = 15;
  this.animation[3].sx = 80.5+51;
  this.animation[3].sy = 34.5;
  this.animation[3].s = 15;
  this.animation[4].sx = 80.5+68;       //Impulso corrida
  this.animation[4].sy = 34.5;
  this.animation[4].s = 15;
  this.animation[5].sx = 80.5+85;       //Pulo
  this.animation[5].sy = 34.5;
  this.animation[5].s = 15;
  this.animation[6].sx = 80.5+102;       //Morte
  this.animation[6].sy = 34.5;
  this.animation[6].s = 15;

}

Player.prototype.mover = function(dt){
  this.sprite.mover(dt);
  if(this.sprite.map.cell[this.sprite.gy+1][this.sprite.gx] == 1){
    this.jumpState = false;
  }
  /*if((this.sprite.vx != 0 || this.sprite.vy != 0) && (this.timeWalkSound <= 0)){
    audioLibrary.play("sandWalk");
    this.timeWalkSound = 0.5;
  }*/

}

Player.prototype.desenhar = function(ctx){
  if(this.jumpState == false){
    //console.log("foi  " + this.jumpState);
    if(this.sprite.vx != 0){
      this.trocarAnimacaoCorrida();
    }
    else{
      this.sprite.sx = this.animation[0].sx;
      this.sprite.sy = this.animation[0].sy;
    }
  }
  else{
    //console.log("foi  " + this.jumpState);
    this.trocarAnimacaoPulo();
  }
  if(this.sentidoMovimento){
    this.sprite.desenhar(ctx);
  }
  else{
    this.sprite.desenharInvertido(ctx);
  }
}

Player.prototype.trocarAnimacaoCorrida = function () {
    if(this.tempoAnimacao <= 0){
      this.tempoAnimacao = 1;
      if(this.estadoAnimacaoAtual >= 0 && this.estadoAnimacaoAtual < 4){
        var proximoEstado;
        if(this.sentidoAnimacao){
          proximoEstado = this.estadoAnimacaoAtual + 1;
          if(proximoEstado > 3){
            this.sentidoAnimacao = false;                      //Inverte o sentido de animação
            this.estadoAnimacaoAtual = this.estadoAnimacaoAtual - 1;
          }
          else{
            this.estadoAnimacaoAtual = this.estadoAnimacaoAtual + 1;
          }
        }
        else{
          proximoEstado = this.estadoAnimacaoAtual - 1;
          if(proximoEstado < 1){
            this.sentidoAnimacao = true;                      //Inverte o sentido de animação
            this.estadoAnimacaoAtual = this.estadoAnimacaoAtual + 1;
          }
          else{
            this.estadoAnimacaoAtual = this.estadoAnimacaoAtual - 1;
          }
        }
      }
    }
    //console.log(this.estadoAnimacaoAtual);
    this.sprite.sx = this.animation[this.estadoAnimacaoAtual].sx;
    this.sprite.sy = this.animation[this.estadoAnimacaoAtual].sy;
    this.tempoAnimacao = this.tempoAnimacao - 12*dt;
};

Player.prototype.trocaAnimacaoPulo = function(){
  this.sprite.sx = this.animation[5].sx;
  this.sprite.sy = this.animation[5].sy;
}

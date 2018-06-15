function House() {
  this.sprite = new Sprite();
  this.tipo = 0;
  this.estado = 0;    //0 - Normal, 1 - Destruida
  this.sprite.w = 32;
  this.sprite.h = 32;
  this.sprite.y = 32*9;
  this.sprite.wImagem = 1259;
  this.sprite.hImagem = 837;
  this.sprite.sx = 0;
  this.sprite.sy = 0;
}

House.prototype.desenhar = function(ctx){
    if(this.tipo == 0){
      if(this.estado == 0){
        this.sprite.desenhar(ctx, "house01");
      }
      else if(this.estado == 1){
        this.sprite.desenhar(ctx, "house01Destroyed");
      }
    }
    else{
      if(this.estado == 0){
        this.sprite.desenhar(ctx, "house02");
      }
      else if(this.estado == 1){
        this.sprite.desenhar(ctx, "house02Destroyed");
      }
    }
}

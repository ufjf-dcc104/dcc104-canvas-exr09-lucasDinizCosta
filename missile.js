function Missile() {
  this.alvo = new Sprite();
  this.sprite = new Sprite();
  this.alvoAtivo = false;
}

Missile.prototype.mover = function(dt){
  //if(this.alvo != null &&   this.alvoAtivo == true){
    //this.sprite.vx = 5.0*(this.alvo.x - this.sprite.x) - 0.9*this.sprite.vx;
    //this.sprite.vy = 5.0*(this.alvo.y - this.sprite.y) - 0.9*this.sprite.vy;
    this.sprite.x = this.sprite.x + this.sprite.vx*dt;
    this.sprite.y = this.sprite.y + this.sprite.vy*dt;
  //}
}

Missile.prototype.desenhar = function(ctx){
  this.sprite.desenhar(ctx, "bullet");
}

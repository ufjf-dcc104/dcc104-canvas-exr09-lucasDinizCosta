function Cannon() {
  this.sprite = new Sprite();
  this.vidas = 5;
  this.tiros = [];                          //tiros presentes na cena
  this.tiro = 0;                            //tempo entre os tiros
  this.pontos = 0;
};

Cannon.prototype.mover = function (dt) {
    this.sprite.mover(dt);
};

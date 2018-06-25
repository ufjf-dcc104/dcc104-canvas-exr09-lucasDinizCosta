function Bomb(){
  this.sprite = new Sprite();
  this.timeToExplode = 3;
  this.areaExplosion = 1;

  //States to stops the explosion on side specific
  this.upState = false;
  this.leftState = false;
  this.downState = false;
  this.rightState = false;

  //Animation states
}

Bomb.prototype.explode = function(){
  //1 - blocks unbreakable
  //2 - blocks breakable
  if(this.timeToExplode<==0){
    for (var i = 1; i <= this.areaExplosion; i++) {
      if(this.upState===false){
        if(sprite.map.cell[sprite.gy-i][sprite.gx] === 1){
          sprite.map.cell[sprite.gy-i][sprite.gx]
          this.upState = true;
        }
        if(sprite.map.cell[sprite.gy-i][sprite.gx] === 2){
          this.upState = true;
        }
      }
      if(this.leftState===false){
        if(sprite.map.cell[sprite.gy][sprite.gx+i] === 1 && sprite.map.cell[sprite.gy][sprite.gx] === 2 &&){

        }
      }
      if(this.downState===false){
        if(sprite.map.cell[sprite.gy][sprite.gx+i] === 1 && sprite.map.cell[sprite.gy][sprite.gx] === 2 &&){

        }
      }
      if(this.rightState===false){
        if(sprite.map.cell[sprite.gy][sprite.gx+i] === 1 && sprite.map.cell[sprite.gy][sprite.gx] === 2 &&){

        }
      }

    }
  }
}

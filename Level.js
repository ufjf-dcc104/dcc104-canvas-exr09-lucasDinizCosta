function Level(w,h,s) {
  this.mapa = new Map(w,h,s);
  this.tesouros = 0;
  this.minas = 0;
  this.startX = 0;
  this.startY = 0;
  this.startGX = 0;
  this.startGY = 0;
  this.tempoFase = 0;
  this.taxaDiminuicaoTempo = 0;
  this.stateCollectedItens = false;
  this.inimigos = [];
  this.teleportes = [];
  this.itens = [];

  //Propriedades da imagem
  this.imagemFundo = "";
  this.dx = 0;
  this.dy = 0;
  this.dw = 0;
  this.dh = 0;
  this.sx = 0;
  this.sy = 0;
  this.wImagemFundo = 0;
  this.hImagemFundo = 0;
};

Level.prototype.setTempo = function(tempo, larguraBarra){
  this.tempoFase = tempo;
  this.taxaDiminuicaoTempo = Math.floor(larguraBarra/tempo);
};

Level.prototype.clonarLevel= function(level){
  this.mapa.w = level.mapa.w;
  this.mapa.h = level.mapa.h;
  this.mapa.s = level.mapa.s;
  for (var l = 0; l < level.mapa.h; l++) {
    for (var c = 0; c < level.mapa.w; c++) {
      this.mapa.cell[l][c] = level.mapa.cell[l][c];
    }
  }
  this.tesouros = level.tesouros;
  this.minas = level.minas;
  this.startX = level.startX;
  this.startY = level.startY;
  this.startGX = level.startGX;
  this.startGY = level.startGY;
  this.stateCollectedItens = level.stateCollectedItens;
  this.tempoFase = level.tempoFase;
  this.taxaDiminuicaoTempo = level.taxaDiminuicaoTempo;
  this.inimigos.length = 0;
  this.teleportes.length = 0;
  this.itens.length = 0;
  for (var i = 0; i < level.inimigos.length; i++) {
    this.inimigos.push(level.inimigos[i]);
  }
  for (var i = 0; i < level.teleportes.length; i++) {
    this.teleportes.push(level.teleportes[i]);
  }
  for (var i = 0; i < level.itens.length; i++) {
    this.itens.push(level.itens[i]);
  }
  this.imagemFundo = level.imagemFundo;
  this.wImagemFundo = level.wImagemFundo;
  this.hImagemFundo = level.hImagemFundo;
  this.sx = level.sx;
  this.sy = level.sy;
  this.dx = level.dx;
  this.dy = level.dy;
  this.dw = level.dw;
  this.dh = level.dh;
}

Level.prototype.desenhar = function(ctx) {
  //imageLibrary.drawClipSize(ctx, this.imagemFundo, this.sx, this.sy, this.wImagemFundo, this.hImagemFundo, this.dx, this.dy, this.wImagemFundo, this.hImagemFundo);
  ctx.lineWidth = 2;
  for (var l = 0; l < this.mapa.h; l++) {
    for (var c = 0; c < this.mapa.w; c++) {
      if(this.mapa.cell[l][c] === 0){                  //Vazio
        ctx.fillStyle = "rgb(92, 148, 252)";
        ctx.fillRect(c*this.mapa.s, l*this.mapa.s, this.mapa.s, this.mapa.s);
      } else if(this.mapa.cell[l][c] === 1){          //Bloqueado
        imageLibrary.drawSize(ctx, "brickRed", c*this.mapa.s, l*this.mapa.s, this.mapa.s, this.mapa.s);
      } else if(this.mapa.cell[l][c] === 2){           //Moeda
        imageLibrary.drawClipSize(ctx, "Objects", 0, 81, 16, 16, c*this.mapa.s+this.mapa.s/4-1, l*this.mapa.s+this.mapa.s/4, this.mapa.s/2, this.mapa.s/2);
      } else if(this.mapa.cell[l][c] === 3){
        imageLibrary.drawSize(ctx, "tijoloEspinho", c*this.mapa.s, l*this.mapa.s, this.mapa.s, this.mapa.s);
      }
    }
  }
};

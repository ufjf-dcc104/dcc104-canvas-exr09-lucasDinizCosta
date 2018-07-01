function Map(w,h,s){
  this.w = w;
  this.h = h;
  this.s = s;
  this.cell = [];
  for (var l = 0; l < h; l++) {
    this.cell[l] = [];
    for (var c = 0; c < w; c++) {
      this.cell[l][c] = 0;
    }
  }
}

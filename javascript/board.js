var board = {
      yOffset : 10,
      pxPerLevel : 16,
      tileToCoord : function(tx,ty) {
        this.x = tx * 32;
        this.y = ty * 32;
      },
      getTileElevation : function(tile) {
        return 0x000000FF & tile;
      },
      getTileType : function(tile) {
        return (0x0000FF00 & tile) >> 8;
      },
      getTileAttributes : function(tile) {
        return (0x00FF0000 & tile) >> 16;
      },
      drawBoard : function(offsetX,offsetY,board,drawFunc) {
        for(var y=0;y<board.height;++y) {
            for(var x=0;x<board.width;++x) {
                
            }
        }
      },
      createBoard : function(width,height) {
        //set the fields
        this.width = width;
        this.height = height;
        this.tiles = new Array(width * height);
        this.getIndice = function(x,y) { return y * this.width + x; }
        
        var applyTileFunction = function(x,y,func) { func(this.tiles[this.getIndice(x,y)]); };
        
        //set tile methods
        this.getTileAttributes = function(x,y) { applyTileFunction(x,y,board.getTileAttributes); }
        this.getTileType = function(x,y) { applyTileFunction(x,y,board.getTileType); }
        this.getTileElevation = function(x,y) { applyTileFunction(x,y,board.getTileElevation); }
      },
};
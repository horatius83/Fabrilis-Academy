var game = {
    sCanvasName : '',
    model : null,
    animator : 0,
    sound : null,
    init : function(sCanvasName) {
        game.sCanvasName = sCanvasName;
        game.model = animation.createImage("images/Model.gif");
        game.tile = animation.createImage("images/Tile.gif");
        sound = document.createElement('audio');
        //sound.setAttribute('src', 'sounds/Victory Fanfare.ogg');
        sound.setAttribute('preload', 'auto');
        //sound.setAttribute('loop', 'loop');
        sound.play();
        setInterval(game.loop,300);
		//keyboard
		keyboard.initializeKeyboard();
		canvas = document.getElementById(sCanvasName);
		canvas.onkeydown = keyboard.keydown;
        //game.loop();
    },
    loop : function() {    
        //If we haven't loaded the images yet, there's nothing for us to do yet
        if(!util.all([game.model,game.tile],function(img) {
            return img != undefined && img.complete;
        })) { return; }
            
        var width, height;
        var ctx = util.getOrNull(function() {
            var element = document.getElementById(game.sCanvasName);
            var c = element.getContext('2d');
            width = element.getAttribute("width");
            height = element.getAttribute("height");
            return c;
        });
        if(util.isNull(ctx)) {
            alert("Could not get rendering context")
            return;
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,width,height);
            animation.monologBox(ctx,"This is a test",10,10,100,100,"white", "blue", "white");
                
            game.animator = ++game.animator % game.model.GetFrameY();
            for(var i=0;i<5;i++) {
                animation.drawFrame(game.tile, i * animation.frameWidth, 5 * animation.frameHeight, ctx, 0, 0,2);
                animation.drawFrame(game.tile, 16 + i * 32, 10 + 5 * 32, ctx, 0, 0, 2);
            }
            animation.drawFrame(game.model, 0 * 32,5 * 32, ctx, 0, game.animator, 2);
                
            return;
        }
    },
    end : function() {
    }
}

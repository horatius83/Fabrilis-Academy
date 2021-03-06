"use strict"
var game = {
    sCanvasName : '',
    player : null,
    animator : 0,
    sound : null,
    keyboard : null,
    mouse : null,
    enemyBullets : null,

    render : function(ctx, width, height) {
	//Set the background color
	ctx.fillStyle = "green";
        ctx.fillRect(0,0,width,height);
	
	//Create a dialog box
        animation.monologBox(ctx,"This is a test",10,10,100,100,"white", "blue", "white");
        
	//animate the sprite
	game.player.frame = ++game.player.frame % game.player.model.GetFrameY()
	for(var i=0;i<5;i++) {
            animation.drawFrame(ctx, game.tile, i * animation.frameWidth, 5 * animation.frameHeight, 0, 0, 2);
            animation.drawFrame(ctx, game.tile, 16 + i * 32, 10 + 5 * 32, 0, 0, 2);
	}
	
	//Draw the character
        animation.drawFrame(ctx, game.player.model, game.player.x, game.player.y, 0, game.player.frame, 2);
	
	//Draw player bullets
	game.player.bullets.update();
	game.player.bullets.render(ctx);
    },
    input : function() {
	game.player.x = mouse.x / 2 - 16;
	game.player.y = mouse.y / 2 - 16;
	if(mouse.leftButtonPressed == true) {
	    // Fire photon torpedoes!
	    var newBullet = {
		position : math2d.vector(game.player.x, game.player.y),
		vy : -1.0,
		model : game.player.bullets.model,
		keepAlive : function(t) {
		    var element = document.getElementById(game.sCanvasName);
		    var height = element.getAttribute("height");
		    return newBullet.position.y < height && newBullet.position.y > 0;
		},
		update : function(t) {
		    newBullet.position.y += newBullet.vy;
		}
	    };
	    game.player.bullets.add(newBullet);
	    //game.player.bullets.add(math2d.vector(game.player.x,game.player.y));
	    mouse.leftButtonPressed = false; // This occurs on tablets as there is never a onMouseUp event sent
	}
	
    },

    init : function(sCanvasName) {
        game.sCanvasName = sCanvasName;
	//Create the player
	game.player = player.create(animation.createImage("images/Model.gif"),0,5*32);
        game.player.bullets = bullets.createBulletManager(20,1000);
	game.player.bullets.velocity = math2d.vector(0.0,-1.0);
	game.player.bullets.model = animation.createImage("images/bullet.gif");
	game.player.bullets.radius = 1.0;

	game.tile = animation.createImage("images/Tile.gif");
	var sound = document.createElement('audio');
        //sound.setAttribute('src', 'sounds/Victory Fanfare.ogg');
        sound.setAttribute('preload', 'auto');
        //sound.setAttribute('loop', 'loop');
        sound.play();
        setInterval(game.loop,30);
	
	//keyboard
	game.keyboard = keyboard;
	game.keyboard.initializeKeyboard();
	game.mouse = mouse;
	
	var canvas = document.getElementById(sCanvasName);
	canvas.onkeydown = keyboard.keydown;
	mouse.initialize(canvas);
	canvas.addEventListener('mousemove', mouse.update, false);
	canvas.addEventListener('mousedown', mouse.onMouseDown, false);
	canvas.addEventListener('mouseup', mouse.onMouseUp, false);
    },
    loop : function() {    
        //If we haven't loaded the images yet, there's nothing for us to do yet
        if(!util.all([game.player.model,game.tile],function(img) { // need loading screen code somewhere around here
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
	    game.input();
	    game.render(ctx,width,height);
	}     
    },
    end : function() {
    }
}

var animation = {
    frameWidth : 32,
    frameHeight : 32,
    /**
     * Creates a textbox and renders it in our rendering context
     * @param ctx rendering context
     * @param {String} text the text to render
     * @param {Number} x the x coord to place the message box at
     * @param {Number} y the y coord to place the message box at
     * @param {String} textColor the color of the text
     * @param {String} boxColor the color of the background of the box
     * @param {String} borderColor the color of the border
     */
    monologBox : function(ctx,text,x,y,width,height,textColor,boxColor,borderColor) {
        ctx.fillStyle = boxColor;
        ctx.strokeStyle = borderColor;
        ctx.fillRect(x,y,width,height);
        
        ctx.strokeStyle = textColor;
        ctx.fillStyle = textColor;
        ctx.fillText(text,x + 5,y + 10)
    },
    /**
     * Creates an image asynchronously and returns the image
     * @param {String} filename the filename of the file to load
     */
    createImage : function(filename) {
        var rv = new Image();
        rv.src = filename;
        //how many frames horizontally does this thing have
        rv.GetFrameX = function() { //we need to evaluate these lazily as rv.width doesn't exist until the image does
            return rv.width / animation.frameWidth;
        }
        //how many frames vertically does this thing have
        rv.GetFrameY = function() {
            return rv.height / animation.frameHeight;
        }
        return rv;
    },
    /**
     * Draw a frame to the rendering context from a larger image (uses animation.frameWidth, 
     * and animation frameHeight to determine the size of the frames)
     * @param img the image to copy our frames from
     * @param {Number} x the x coordinate to draw our frame to in the rendering context
     * @param {Number} y the y coordinate to draw our frame to in the rendering context
     * @param ctx the rendering context
     * @param {Number} [frameX = 0] the frame in the x direction we want to pull from
     * @example
     * Say we have two frames in an image that has a width of 64 and height of 32, where the frame width and height are 32
     * Setting frameX to 0 means that we copy from (0,0), setting frameX to 1 means we copy from (32,0) in the image
     * @param {Number} [frameY = 0] the frame in the y direction we want to pull from
     * @param {Number} [scale = 0] when we copy from the rendering context do we want to scale
     * @param {Number} [frameWidth = animation.frameWidth] the width of each frame
     * @param {Number} [frameHeight = animation.frameHeight] the height of each frame
     */
    drawFrame : function(ctx, img, x, y, frameX, frameY, scale, frameWidth, frameHeight) {
        if(frameX == null) frameX = 0;
	if(frameY == null) frameY = 0;
	if(frameX >= 0 && frameY >= 0) {
            var width = animation.frameWidth;
            var height = animation.frameHeight;    
	    if(scale == null) scale = 1;
	    if(frameWidth != null) { width = frameWidth; }
	    if(frameHeight != null) { height = frameHeight; }
            frameX = frameX % img.GetFrameX()
            frameY = frameY % img.GetFrameY();
            ctx.drawImage(img, frameX * width, frameY * height, width, height, x * scale, y * scale,width * scale, height * scale);
        }
    },
}

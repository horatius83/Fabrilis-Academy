var animation = {
    frameWidth : 32,
    frameHeight : 32,
    monologBox : function(ctx,text,x,y,width,height,textColor,boxColor,borderColor) {
        ctx.fillStyle = boxColor;
        ctx.strokeStyle = borderColor;
        ctx.fillRect(x,y,width,height);
        
        ctx.strokeStyle = textColor;
        ctx.fillStyle = textColor;
        ctx.fillText(text,x + 5,y + 10)
    },
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
    drawFrame : function(img, x, y, ctx, frameX, frameY, scale) {
        if(frameX >= 0 && frameY >= 0) {
            var width = animation.frameWidth;
            var height = animation.frameHeight;
            //alert("frameX: "+frameX+" frameY: "+frameY);
            frameX = frameX % img.GetFrameX()
            frameY = frameY % img.GetFrameY();
            //alert("img: "+img+" frameX: "+frameX+" frameY: "+frameY+"height: "+height+" width: "+width)
            ctx.drawImage(img, frameX * width, frameY * height, width, height, x * scale, y * scale,width * scale, height * scale);
        }
    },
}
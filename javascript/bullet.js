"use strict"
var bullets = {
    _date : new Date(),

    createBulletManager : function(maxBullets, reloadTime) {
	var rv = {
	    bullets : [],
	    maxBullets : maxBullets,
	    reloadTime : reloadTime
	};
	rv.add = function(bullet) { bullets.add(rv, bullet); }
	rv.update = function() { bullets.update(rv); }
	rv.render = function(ctx) { bullets.render(rv, ctx); }
	return rv
    },
    // Every bullet should have an update function (time -> ()) and a keepAlive function (() -> bool), and a model
    add : function(bm, bullet) {
	if(bullet.update !== 'undefined' && bullet.keepAlive !== 'undefined' && bullet.model !== 'undefined') {
	    bm.bullets.push(bullet);
	} else {
	    if(bullet.update === 'undefined') { console.log('Bullet did not have an update function.'); };
	    if(bullet.keepAlive === 'undefined') { console.log('Bullet did not have a keep-alive function.'); };
	    if(bullet.model === 'undefined') { console.log('Bullet did not have a model'); };
	}
    },
     update : function(bm) {
	var timeT = bullets._date.getTime();
	bm.bullets = bm.bullets.filter(function(element,index,array) {
	    return element.keepAlive(timeT); });
	for(var i in bm.bullets) {
	    bm.bullets[i].update(timeT);
	}
    },
    render : function(bm, ctx) {
	for(var i=0; i<bm.bullets.length; ++i) {
	    var bullet = bm.bullets[i];
	    animation.drawFrame(
		    ctx,
		    bullet.model,
		    bullet.position.x,
		    bullet.position.y,
	            0, 0, 2, 8, 8);
	    /*if(bullet.enabled) {
		animation.drawFrame(
		    ctx,
		    bullet.model,
		    bullet.position.x,
		    bullet.position.y,
	            0, 0, 2, 8, 8);
	    }*/
	}
    }
}


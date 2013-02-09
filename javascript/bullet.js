"use strict"

var bullets = {
    create : function(maxBullets, reloadTime) {
	var rv = { bullets : [] };
	rv.maxBullets = maxBullets;
	rv.reloadTime = reloadTime;
	rv.add = function(position, velocity, model) { 
	    bullets.add(rv, position, velocity, model); };
	rv.update = function(removeFunction) {
	    bullets.update(rv, removeFunction); };
	rv.render = function(ctx) {
	    bullets.render(rv, ctx);}
	rv.lastBulletFired = 0;
	rv.model = null;
	rv.velocity = null;
	return rv;
    },
    isBulletNotEnabled : function(bullet) { return !bullet.enabled; },
    createBullet : function(bm, position, radius, velocity, model) {
	var bullet = util.getFirstOrNull(bm.bullets,bullets.isBulletNotEnabled);
	if(util.isNull(bullet)) bullet = { };
	bullet.enabled = true;
	bullet.position = position;
	if(radius != null) bullet.radius = radius;
	else bullet.radius = bm.radius;
	if(velocity != null) bullet.velocity = velocity;
	else bullet.velocity = bm.velocity;
	if(model != null) bullet.model = model;
	else bullet.model = bm.model;
	return bullet;
    },
    add : function(bm, position, radius, velocity, model) {
	if(bm.bullets.length < bm.maxBullets || 
	   util.getFirstOrNull(bm.bullets,bullets.isBulletNotEnabled) != null) {
	    var date = new Date();
	    var time = date.getTime();
	    if(time - bm.lastBulletFired > bm.reloadTime) {
		var bullet = bullets.createBullet(bm, position, radius, velocity, model);
		bm.bullets.push(bullet);
		bm.lastBulletFired = time;
	    }
	}
    },
    update : function(bm,removeFunction) {
	for(var i=0; i<bm.bullets.length; ++i) {
	    var bullet = bm.bullets[i];
	    if(bullet.enabled) {
		if(!removeFunction(bullet)) {
		    var bullet = bm.bullets[i];
		    bullet.position.add(bullet.velocity);
		} else {
		    bullet.enabled = false;
		}
	    }
	}
    },
    render : function(bm, ctx) {
	for(var i=0; i<bm.bullets.length; ++i) {
	    var bullet = bm.bullets[i];
	    if(bullet.enabled) {
		animation.drawFrame(
		    ctx,
		    bullet.model,
		    bullet.position.x,
		    bullet.position.y,
	            0, 0, 2, 8, 8);
	    }
	}
    }
}


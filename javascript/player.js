"use strict"
var player = {
    create : function(model,x,y) {
	var rv = { };
	rv.model = model;
	rv.position = math2d.vector(x,y);
	rv.bullets = [];
	rv.frame = 0;
	return rv;
    }
}

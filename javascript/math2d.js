"strict"
var math2d = {
    vector : function(x,y) {
	var rv = {};
	rv.x = x;
	rv.y = y;
	rv.add = function(p) { math2d.addVectors(rv,rv,p); }
	rv.sub = function(p) { math2d.subVectors(rv,rv,p); }
	rv.mul = function(s) { math2d.mulVectorByScalar(rv,rv,s); }
	rv.dot = function(p) { return math2d.dotProductOfVector(rv,p); }
	rv.perp = function() { math2d.perpVectorOfVector(rv,rv); }
	rv.magmag = function() { return math2d.magmagOfVector(rv); }
	rv.mag = function() { return math2d.magnitudeOfVector(rv); }
	rv.unit = function() { math2d.unitVector(rv,rv); }
	return rv;
    },
    vectorFromArray : function(arry) {
	return math2d.point(arry[0],arry[1]);
    },
    vectorFromPoint : function(p) {
	return math2d.point(p.x,p.y);
    },
    addVectors : function(rv, p0, p1) {
	rv.x = p0.x + p1.x;
	rv.y = p0.y + p1.y;
    },
    subVectors : function(rv, p0, p1) {
	rv.x = p0.x - p1.x;
	rv.y = p0.y - p1.y;
    },
    mulVectorByScalar : function(rv, p0, s) {
	rv.x = p0.x * s;
	rv.y = p0.y * s;
    },
    dotProductOfVector : function(p0, p1) {
	return p0.x * p1.x + p0.y * p1.y;
    },
    perpVector : function(rv, p0) {
	rv.x = -p0.x;
	rv.y = p0.y;
    },
    magmagOfVector : function(p) {
	return math2d.dotProductOfVector(p,p);
    },
    magnitudeOfVector : function(p) {
	return Math.sqrt(math2d.magmagOfVector(p));
    },
    unitVector : function(rv, v) {
	var mag = math2d.magnitudeOfVector(v);
	if(mag != 0) {
	    var invMag = 1.0 / mag;
	    math2d.mulVectorByScalar(rv,v,invMag);
	} else {
	    rv.x = null;
	    rv.y = null;
	}
    }
}

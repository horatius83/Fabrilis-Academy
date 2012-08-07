var util = {
    isNull : function(x) {
        return (x === null || x === '' || x === undefined);
    },
    
    isNotNull : function(x) {
        return !util.isNull(x);
    },
    
    getOrDefault : function(func,defaultValue) {
        try {
            var ans = func();
            return ans;
        } catch(x) {
            return defaultValue;
        }
    },
    
    getOrNull : function(func) {
        return util.getOrDefault(func,null);
    },
    
    all : function(lst, fTtoBool) {
        for(var i in lst) {
            if(!fTtoBool(lst[i])) {
                return false;
            }
        }
        return true;
    }
}
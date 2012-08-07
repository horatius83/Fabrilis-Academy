var keyboard = {
    initializeKeyboard : function() {
        //create key-code to boolean dictionary to keep track of key-presses
        //keyDict = keyboard.createKeyTuples();
        //keyDictKeyCodes = keyDict.keys();
        keyDictKeyCodes = keyboard.createKeyCodeToKeyDictionary();
		
        this.wasPressed = {};
        for(var i in keyDictKeyCodes) {
            this.wasPressed[keyDictKeyCodes[i]] = false;
        }
    },
    
	keydown : function(e) {
		var ee = window.event || e;
		//...
		//profit!
	},
	
    //create a dictionary that maps key-codes to keys
    createKeyCodeToKeyDictionary : function() {
        keyCodes = keyboard.createKeyTuples();
        keyCodeToKeyDictionary = {};
        
        for(var i in keyCodes) {
            key = keyCodes[i][0];
            keyCode = keyCodes[i][1];
            keyCodeToKeyDictionary[keyCode] = key;
        }
        return keyCodeToKeyDictionary;
    },
    
    //create a dictionary that maps keys to their key-codes
    createKeyToKeyCodeDictionary : function() {
        keyCodes = keyboard.createKeyTuples();
        keyToKeyCodeDictionary = {};
        
        for(var i in keyCodes) {
            key = keyCodes[i][0];
            keyCode = keyCodes[i][1];
            keyToKeyCodeDictionary[key] = keyCode;
        }
        return keyToKeyCodeDictionary;
    },
    createKeyTuples : function() {
        keyCodes = [];
        //number keys
        for(var i=0;i<10;++i) {
            keyCodes.push(["key_"+i,i+48]);
            keyCodes.push(["num_"+i,i+96]); //numpad
            keyCodes.push(["key_f"+i,i+112]);
        }
        
        //alphabet
        var alphabet = "abcdefghijklmnopqrstuvwxyz";
        for(var i=0;i<26;++i) {
            keyCodes.push(["key_"+alphabet[i],i+48]);
        }
        
        //misc keys
        miscKeys = [
            ['key_backspace',8],
            ['key_tab',9],
            ['key_enter',13],
            ['key_shift',16],
            ['key_ctrl',17],
            ['key_alt',18],
            ['key_pause',19],
            ['key_capslock',20],
            ['key_esc',27],
            ['key_pageup',33],
            ['key_pagedown',34],
            ['key_end',35],
            ['key_home',36],
            ['key_left',37],
            ['key_up',38],
            ['key_right',39],
            ['key_down',40],
            ['key_insert',45],
            ['key_delete',46],
            ['num_asterisk',106],
            ['num_plus',107],
            ['num_minus',110],
            ['num_forwardslash',111],
            ['key_f10',121],
            ['key_f11',122],
            ['key_f12',123],
            ['key_coma',188],
            ['key_equals',187],
            ['key_forwardslash',191],
            ['key_backslash',220]
        ]
        return keyCodes.concat(miscKeys);
    }
}
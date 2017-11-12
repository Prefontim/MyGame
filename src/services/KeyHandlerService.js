const _ = require('lodash');

export default (function() {
    if(!instance) {
        instance = new KeyHandler();
    }
    return instance;
})();


function KeyHandler() {
    document.addEventListener('keyup', onKeyUp);

    const KEY = {
        ENTER: 13
    };
    let keyHandlers = {};

    const onKeyUp = (evt) => {
        if(keyHandlers[evt.keyCode]) {
            _.each(keyHandlers[evt.keyCode], (handler) => handler());
        }
    };

    const registerHandler = (key, handler) => {
        if(!keyHandlers[key]) {
            keyHandlers[key] = [];
        }
        keyHandlers.push(handler);
    };

    return {
        registerHandler: registerHandler,
        KEY: KEY
    };
}

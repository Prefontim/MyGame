//const Ball = require('../objects/ball');
import Ball from '../objects/ball';

function BallFactory() {
    var ballIdx = 0;
    function getBall(options) {
        options.id = 'ball' + ballIdx++;
        return new Ball(options);
    }
    return {
        getBall: getBall
    };
}

export default BallFactory();

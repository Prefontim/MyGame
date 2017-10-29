//const Ball = require('../objects/ball');
import Ball from '../objects/ball';

function BallFactory() {
    function getBall(options) {
        return new Ball(options);
    }
    return {
        getBall: getBall
    };
}

export default BallFactory();

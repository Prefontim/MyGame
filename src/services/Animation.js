import helper from './CreateJSHelper';
import constants from '../constants';

export default function Animation(obj, startCoords, targetCoords, velocity, pathFnc, callback) {
    let isPlaying = false;

    function play() {
        isPlaying = true;
        threeDAnimate(obj, startCoords, targetCoords, velocity, pathFnc, callback);
    }

    function stop() {
        isPlaying = false;
    }

    function threeDAnimate(obj, startCoords, targetCoords, velocity, pathFnc, callback) {
        let lastAnimation = null;
        var stage = helper.getStage();
        requestAnimationFrame(doAnimation);
        let shape = obj.getShape();

        let secs = 0, frame = 0;
        function doAnimation() {
            if(!lastAnimation || Date.now() - lastAnimation > (1000 / constants.FPS)) {
                var currentCoords = pathFnc(secs + (frame / constants.FPS), velocity, startCoords, targetCoords);

                //currentCoords.h = 50; //debug

                shape.x = currentCoords.x;
                shape.y = currentCoords.y; // + (currentCoords.h * .7);

                if(obj.getShadow) {
                    var shadow = obj.getShadow();
                    shadow.y = (currentCoords.h * .7);
                }


                frame++;
                if(frame === constants.FPS) {
                    secs++;
                    frame = 0;
                }
                stage.update();
                lastAnimation = Date.now();

                if(shape.x === targetCoords.x && shape.y === targetCoords.y || isOutOfView(currentCoords) ) {
                    callback();
                   // console.timeEnd('ball');
                } else if(isPlaying) {
                    requestAnimationFrame(doAnimation);
                }
            } else {
                requestAnimationFrame(doAnimation);
            }
        }
    }


    function isOutOfView(shape) {
        return shape && (shape.x < 0 || shape.y < 0 || shape.h < 0);
    }

    return {
        play: play,
        stop: stop
    };
}

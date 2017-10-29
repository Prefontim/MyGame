import helper from './CreateJSHelper';
let instance = null;

export default (function() {
    if(!instance) {
        instance = new AnimationService();
    }
    return instance;
})();


function AnimationService() {
   //let velocity = 1000; //pixels/second
    let fps = 60;

    function animateTo(obj, startCoords, targetCoords, velocity, pathFnc, callback) {
        //console.log('animateFrom', shape.x + ',' + shape.y);
       // console.log('animateTo', coords);
       //  let diff = {
       //      x: targetCoords.x - startCoords.x,
       //      y: targetCoords.y - startCoords.y
       //  };
       //
       //  let pixelDistance = ((Math.abs(diff.x) * 2) + (Math.abs(diff.y) * 2)) / 2;
       //  let steps = Math.abs(Math.floor(pixelDistance / velocity * fps));
       //
       //  let pixelsPerFrame = {
       //      x: diff.x / steps,
       //      y: diff.y / steps
       //  };



        //animate(shape, pixelsPerFrame, steps, callback);
        threeDAnimate(obj, startCoords, targetCoords, velocity, pathFnc, callback);
    }

    function threeDAnimate(obj, startCoords, targetCoords, velocity, pathFnc, callback) {
        let lastAnimation = null;
        var stage = helper.getStage();
        requestAnimationFrame(doAnimation);
        let shape = obj.getShape();

        let secs = 0, frame = 0;

        function doAnimation() {
            if(!lastAnimation || Date.now() - lastAnimation > (1000 / fps)) {
                var currentCoords = pathFnc(secs + (frame / fps), velocity, startCoords, targetCoords);

                shape.x = currentCoords.x;
                shape.y = currentCoords.y; // + (currentCoords.h * .7);

                if(obj.getShadow) {
                    var shadow = obj.getShadow();
                    shadow.y = (currentCoords.h * .7);
                }


                frame++;
                if(frame === fps) {
                    secs++;
                    frame = 0;
                }
                stage.update();
                lastAnimation = Date.now();
            }

            if(shape.x === targetCoords.x && shape.y === targetCoords.y || isOutOfView(currentCoords) ) {
                callback();
            } else {
                requestAnimationFrame(doAnimation);
            }
        }
    }

    function animate(shape, ppf, steps, callback) {
        let lastAnimation = null;
        var stage = helper.getStage();
        requestAnimationFrame(doAnimation);

        function doAnimation() {
            if(!lastAnimation || Date.now() - lastAnimation > (1000 / fps)) {
                shape.x += ppf.x;
                shape.y += ppf.y;
                console.log(shape.x, shape.y);
                stage.update();
                lastAnimation = Date.now();
                steps--;
            }

            if(steps > 0) {
                requestAnimationFrame(doAnimation);
            } else if(steps === 0) {
                callback();
            }
        }
    }

    function isOutOfView(shape) {
        return shape && (shape.x < 0 || shape.y < 0 || shape.h < 0);
    }

    return {
        animateTo: animateTo
    };
}

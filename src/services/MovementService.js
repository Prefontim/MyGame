import CONSTANTS from '../constants';
let instance = null;

export default (function() {
    if(!instance) {
        instance = new MovementService();
    }
    return instance;
})();

function MovementService() {
    let objects = [];
    let checkerInterval = null;

    function registerMover(mover) {
        objects.push(mover);

        if(!checkerInterval) {
            checkerInterval = setInterval(checkForHits, 50);
        }
    }

    function remove(shape) {
        let idx = _.findIndex(objects, function(object) {
            return object.object.getShape().id === shape.id;
        });
        if(idx !== -1) {
            objects.splice(idx, 1);
        }
    }

    function checkForHits() {
        let hitters = _.filter(objects, {type: CONSTANTS.HITTER});
        let hittables = _.filter(objects, {type: CONSTANTS.HITTABLE});
        _.each(hitters, function (hitter, hitterIdx) {
            _.each(hittables, function (hittable, hittableIdx) {
                let hitterShape = hitter.object.getShape();
                let hittableShape = hittable.object.getShape();



                //console.log(hitterShape.x  + ' > ' +  hittableShape.x + ' && ' +  hitterShape.x + ' < ' +  hittableShape.graphics.command.w);
                if(doesHitterOverlapHorizontally(hitterShape, hittableShape) && isHitterCloseToYAxis(hitterShape, hittableShape)) {
                    console.log('hit');

                    if(hitterShape.getBounds().height < hittableShape.getBounds().height + 10) {
                        console.log('3d hit');
                        hittable.object.onHit();
                        objects.splice(hittableIdx, 1);

                        hitter.object.onHit();
                        objects.splice(hitterIdx, 1);
                    }
                }
            });
        })
    }

    function doesHitterOverlapHorizontally(hitter, hittable) {
        let hitterCoords = getFullCoords(hitter, true);
        let hittableCoords = getFullCoords(hittable, false);

        //does right edge of the hitter overlap left edge of hittable, or vice-versa
        return doesEdgeFallInsideObject(hitterCoords, hittableCoords, 'r') || doesEdgeFallInsideObject(hitterCoords, hittableCoords, 'l');
    }

    function isHitterCloseToYAxis(hitter, hittable) {
        let hitterCoords = getFullCoords(hitter, true);
        let hittableCoords = getFullCoords(hittable, false);
        let yBuffer = 15;
        let rtn = hitterCoords.b < hittableCoords.b + yBuffer;
        return rtn;

    }

    function doesEdgeFallInsideObject(c1, c2, c1Edge) {
        if(c1Edge === 'r') {
            return c1.r > c2.l && c1.r < c2.r;
        } else if(c1Edge === 'l') {
            return c1.l < c2.r && c1.l > c2.l;
        }
    }

    function getFullCoords(obj, isCircle) {
        let w = obj.getBounds().width;
        let h = obj.getBounds().height;
        let t = isCircle ? obj.y -  (w / 2) : obj.y;
        let l = isCircle ? obj.x -  (w / 2) : obj.x;
        return {
            t: t,
            l: l,
            b: t + h,
            r: l + w,
            w: w,
            h: h
        }
    }

    return {
        registerMover: registerMover,
        remove: remove
    };
}


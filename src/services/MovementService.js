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
        _.each(hitters, function (hitter) {
            _.each(hittables, function (hittable) {
                let hitterShape = hitter.object.getShape();
                let hittableShape = hittable.object.getShape();



                //console.log(hitterShape.x  + ' > ' +  hittableShape.x + ' && ' +  hitterShape.x + ' < ' +  hittableShape.graphics.command.w);
                if((hitterShape.x > hittableShape.x && hitterShape.x < hittableShape.x + hittableShape.getBounds().width) &&
                    (hitterShape.y - hitterShape.getBounds().height > hittableShape.y && hitterShape.y - hitterShape.getBounds().height < hittableShape.y + hittableShape.getBounds().height)) {
                    console.log('hit');

                    if(hitterShape.getBounds().height < hittableShape.getBounds().height) {
                        console.log('3d hit');
                        hittable.object.onHit();
                    }
                }
            });
        })
    }

    return {
        registerMover: registerMover,
        remove: remove
    };
}


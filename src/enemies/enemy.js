import helper from '../services/CreateJSHelper';
import MovementService from '../services/MovementService';
import {canMove, canEmitEvents} from '../behaviors';
import CONSTANTS from '../constants'

export default function({id, startCoord, image, movePattern}) {
    let state = {};
    let shape = null;
    let stage = helper.getStage();

    if(image) {
        shape = new createjs.Bitmap(require('../assets/enemies/' + image + '/Idle1.png'));
    } else {
        new createjs.Shape();
        shape.graphics.beginFill('red').drawRect(0, 0, 20, 30);
    }

    shape.setBounds(0, 0, 50, 90); //zombie at .2 scale.   FIXME - can we calculate this?
    shape.set({x: startCoord.x, y: startCoord.y, scaleX: .2, scaleY: .2});
    stage.addChild(shape);
    stage.update();

    const onHit = () => {
        shape.alpha = .5;
        movePattern.stop();
        setTimeout(destroy, 1000);

    };

    const getShape = () => shape;

    const destroy = () => {
        state.emit('destroy', state);
      //  MovementService.remove(state);
        stage.removeChild(shape);
    };

    state = {
        id: id,
        getShape: getShape,
        destroy: destroy,
        onHit: onHit
    };

    state = Object.assign(state, canMove(state, movePattern), canEmitEvents(state));

    return state;
}

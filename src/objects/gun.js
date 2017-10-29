import helper from '../services/CreateJSHelper';
import CONSTANTS from '../constants';
//const BallFactory from '../services/BallFactory');
import BallFactory from '../services/BallFactory';
import MovementService from '../services/MovementService';

export default function Gun(options) {
    console.log(CONSTANTS.STAGE_WIDTH);

    var stage = helper.getStage();
    var gunShape = new createjs.Shape();
    gunShape.x = options.x;
    gunShape.y = options.y;
    gunShape.graphics.beginFill('black').drawRect(0, 0, 10, 40);
    stage.addChild(gunShape);
    stage.update();

    stage.on('click', function (evt) {
        //console.log('evt', evt);

        var ball = BallFactory.getBall({height: 200});
        ball.getShape().set({visible: true, x: gunShape.x, y: gunShape.y});
        ball.fireTo({x: evt.stageX, y: evt.stageY}, 200);
        MovementService.registerMover({
            type: CONSTANTS.HITTER,
            object: ball
        });

    });
}

//module.exports = Gun;

import helper from '../services/CreateJSHelper';
import createAnimation from '../services/Animation';
import MovementService from '../services/MovementService';
import {warp, noGravity} from '../movement/movementPathTypes';

export default function Ball({height = 0}) {
    this.type = 'nerf';
    this.radius = 5;
    this.height = height;
    this.color = 'yellow';

    let currAnim = null;

    var stage = helper.getStage();

    let ballContainer = new createjs.Container();

    let ballShadow = new createjs.Shape();
    ballShadow.graphics.beginFill('black').drawEllipse(this.radius * -1, 0, this.radius * 2, this.radius);
    ballShadow.alpha = .5;
    ballShadow.setBounds(0, 0, this.radius * 2, this.radius * 2);
    ballContainer.addChild(ballShadow);

    let ballShape = new createjs.Shape();
    ballShape.graphics.beginFill('yellow').drawCircle(0, 0, this.radius, this.radius);
    ballShape.setBounds(0, 0, this.radius * 2, this.radius * 2);
    ballContainer.addChild(ballShape);

    stage.addChild(ballContainer);
    stage.update();


    this.getShadow = () => ballShadow;//FIXME - make this more elegant, via TypeScript interfaces or some kind of inheritance

    this.getShape = function () {
        return ballContainer;
    };

    /*
    velocity = ft/s
     */
    this.fireTo = function (targetCoord, velocity = 100) {
        setTimeout(() => {
            let startCoords = {x: ballContainer.x, y: ballContainer.y, h: this.height};
            let targetCoords = {x: targetCoord.x, y: targetCoord.y, h: 0};

            currAnim = createAnimation(this, startCoords, targetCoords, velocity, noGravity, onEnd);
            currAnim.play();
        }, 1);
    }

    const onEnd = () => {
        removeBall();
    }

    this.onHit = () => {
        currAnim.stop();
        setTimeout(function() {
            onEnd();
        }, 1000);
    }

    const removeBall = () => {
        MovementService.remove(ballContainer);
        stage.removeChild(ballContainer);
        stage.update();
    };
}

//module.exports = Ball;

import helper from '../services/CreateJSHelper';
import AnimationService from '../services/AnimationService';
import MovementService from '../services/MovementService';
import {hypotenuse} from '../services/util';

export default function Ball({height = 0}) {
    this.type = 'nerf';
    this.size = 5;
    this.height = height;
    this.color = 'yellow';

    var stage = helper.getStage();

    let ballContainer = new createjs.Container();

    let ballShadow = new createjs.Shape();
    ballShadow.graphics.beginFill('black').drawEllipse(this.size * -1, 0, this.size * 2, this.size);
    ballShadow.alpha = .5;
    ballShadow.setBounds(0, 0, this.size, this.size);
    ballContainer.addChild(ballShadow);

    let ballShape = new createjs.Shape();
    ballShape.graphics.beginFill('yellow').drawCircle(0, 0, this.size, this.size);
    ballShape.setBounds(0, 0, this.size, this.size);
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
            // ballShape.set({visible: true, x: 550, y: 550});
            //  createjs.Tween.get(ballShape).to({x: coord.x, y: coord.y}, 700).call(() => {
            //      this.removeBall()
            //  });
            let noGravityFunc = (elapsedSec, velocity, startCoords, endCoords) => {

                let twoDDistance = hypotenuse(endCoords.y - startCoords.y, endCoords.x - startCoords.x);

                let threeDDistance = hypotenuse(startCoords.h, twoDDistance);

                let ballDistance = elapsedSec * velocity;
                let percentTraveled = ballDistance / threeDDistance;

                let diff = {
                    h: endCoords.h - startCoords.h,
                    x: endCoords.x - startCoords.x,
                    y: endCoords.y - startCoords.y
                };


                let ballCoord = {
                    h: startCoords.h + (diff.h * percentTraveled),
                    x: startCoords.x + (diff.x * percentTraveled),
                    y: startCoords.y + (diff.y * percentTraveled)
                };
              //  console.log(diff.x, percentTraveled, ballCoord.x);
                return ballCoord;

            };

            let startCoords = {x: ballContainer.x, y: ballContainer.y, h: this.height};
            let targetCoords = {x: targetCoord.x, y: targetCoord.y, h: 0};

            AnimationService.animateTo(this, startCoords, targetCoords, velocity, noGravityFunc, this.removeBall);
        }, 1);
    }

    this.removeBall = function () {
        MovementService.remove(ballContainer);
        stage.removeChild(ballContainer);
        stage.update();
    };
}

//module.exports = Ball;

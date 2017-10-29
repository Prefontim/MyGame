import helper from '../services/CreateJSHelper';
import MovementService from '../services/MovementService';
import CONSTANTS from '../constants';

function Enemy() {
    let movePattern = [
        {
            y: 10
        },
        {
            wait: 1
        }
    ];
    let moveIndex = 0;
    var stage = helper.getStage();
    var enemyShape = new createjs.Shape();
    enemyShape.graphics.beginFill('red').drawRect(0, 0, 20, 30);
    enemyShape.setBounds(0, 0, 20, 30);
    stage.addChild(enemyShape);
    stage.update();

    this.getShape = function() {
        return enemyShape;
    };

    this.beginMovement = function () {
        doNextMove();
        MovementService.registerMover({
            type: CONSTANTS.HITTABLE,
            object: this
        });
    };

    this.onHit = function() {
        enemyShape.graphics.beginFill('white').drawRect(0, 0, 20, 30);
        setTimeout(() => this.destroy(), 1000);

    };

    this.destroy = function() {
        MovementService.remove(this);
        stage.removeChild(enemyShape);
    };



    function doNextMove() {
        let wait = 1;
        if(movePattern[moveIndex].y) {
            enemyShape.set({y: enemyShape.y + movePattern[moveIndex].y});
            stage.update();
        } else if(movePattern[moveIndex].wait) {
            wait = movePattern[moveIndex].wait * 500;
        }

        setTimeout(function() {
            doNextMove();
        }, wait);

        moveIndex++;
        if(moveIndex >= movePattern.length) {
            moveIndex = 0;
        }
    }

    return this;
}

export default Enemy;

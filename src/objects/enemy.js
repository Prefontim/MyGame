import helper from '../services/CreateJSHelper';
import MovementService from '../services/MovementService';
import CONSTANTS from '../constants';
import idle1 from '../assets/enemies/zombie_male/Idle1.png';

class Enemy {
    constructor({startCoord, movementPattern}) {
        this.movementPattern = movementPattern;

        this.moveIndex = 0;
        this.stage = helper.getStage();
        // this.enemyShape = new createjs.Shape();
        // this.enemyShape.graphics.beginFill('red').drawRect(0, 0, 20, 30);
        this.enemyShape = new createjs.Bitmap(idle1);

        this.enemyShape.setBounds(0, 0, 20, 30);
        this.enemyShape.set({x: startCoord.x, y: startCoord.y, scaleX: .2, scaleY: .2});
        this.stage.addChild(this.enemyShape);
        this.stage.update();
    }





    getShape() {
        return this.enemyShape;
    }

    beginMovement() {
        //this.doNextMove();
        if(this.movementPattern) {
            this.movementPattern.begin();
        }
        MovementService.registerMover({
            type: CONSTANTS.HITTABLE,
            object: this
        });
    };

    onHit() {
        this.enemyShape.graphics.beginFill('white').drawRect(0, 0, 20, 30);
        setTimeout(() => {
            this.enemyShape.graphics.beginFill('red').drawRect(0, 0, 20, 30);
        }, 500);

        //setTimeout(() => this.destroy(), 1000);

    }

    destroy() {
        MovementService.remove(this);
        this.stage.removeChild(this.enemyShape);
    }



    doNextMove() {
        let wait = 1;
        if(this.movePattern[moveIndex].y) {
            this.enemyShape.set({y: enemyShape.y + movePattern[moveIndex].y});
            this.stage.update();
        } else if(this.movePattern[moveIndex].wait) {
            wait = this.movePattern[moveIndex].wait * 500;
        }

        setTimeout(function() {
            this.doNextMove();
        }, wait);

        this.moveIndex++;
        if(this.moveIndex >= this.movePattern.length) {
            this.moveIndex = 0;
        }
    }

}

export default Enemy;

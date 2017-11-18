/*
Experimention with es6 classes with movement classes.

This should probably be an interface or abstract class, because there is no conceptual default movement, except maybe to not move

Nice: constructor

Not Nice:  'this' boilerplate
no private variables in an elegant way
weird syntax
 */

import helper from '../services/CreateJSHelper';
import createAnimation from '../services/Animation';
import {noGravity} from '../movement/movementPathTypes';

export default class MovementPattern {
    constructor( type = 'basic', startCoord = {x: 0, y: 0}, pattern = {repeat: false, interval: 1000, velocity: 10}) {
        this._obj = null;
        this.type = type;
        this.pattern = pattern; //FIXME - abstract into formalized system to sync to fps rate and not use random setTimeout
        this.paused = false;
        this.moveIndex = 0;
        this._coord = startCoord;
        this.currAnim = null;
        this.playing = false;
    }

    begin() {
        this.playing = true;
        this.nextMove();
    }

    nextMove() {
        let nextCoord = this.getNextCoord();
        console.log('nextMove', this._obj.id);
        if(nextCoord) {
            // this._shape.set({
            //     x: nextCoord.x,
            //     y: nextCoord.y
            // });
            // helper.getStage().update();
            let shape = this._obj.getShape();
            let startCoord = {
                x: shape.x,
                y: shape.y
            };

            this.currAnim = createAnimation(this._obj, startCoord, nextCoord, this.pattern.velocity, noGravity, () => {
                this.moveIndex++;
                console.log('animation end', this._obj.id, this.playing, this.pattern.repeat);
                if(this.pattern.repeat && this.playing) {
                    setTimeout(() => {
                        if(this.playing) {
                            this.nextMove()
                        }
                    }, this.pattern.interval);
                }
            });
            this.currAnim.play();
            //this.moveIndex++;
        }
    }

    stop() {
        console.log('stop', this._obj.id);
        this.playing = false;
        this.currAnim.stop();
    }

    set obj(obj) {
        this._obj = obj;
    }

    get obj() {
        return this._obj;
    }

    get coord() {
        return this._coord;
    }

    // getNextCoord() {
    //     if(this.pattern.repeat) {
    //         this.nextMove();
    //         return this._coord;
    //     } else {
    //         return null;
    //     }
    //
    // }

//    static NONE = 'none';
}

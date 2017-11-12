import MovementPattern from './movementPattern';
import KeyHandlerService from '../services/KeyHandlerService';

export default class ManualMovementPattern extends MovementPattern {
    constructor() {
        KeyHandlerService.registerHandler(KeyHandlerService.KEY.LEFT, moveLeft)
    }

    moveLeft() {
        this.currentCoord = {
            x: this.getCoord().x,
            y: this.getCoord().y
        };
        this.nextMove();
    }
}

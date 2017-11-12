import MovementPattern from './movementPattern';

export default class VerticalMovementPattern extends MovementPattern {
    constructor(startCoord, options = {movement: {y: 10, x: 0, velocity: 10}, interval: 200, repeat: true}) {
        super('vertical', startCoord, {
            repeat: options.repeat,
            interval: options.interval,
            velocity: options.movement.velocity
        });
        this.movement = options.movement;
    }

    getNextCoord() {
        return {
            x: this._obj.getShape().x + this.movement.x,
            y: this._obj.getShape().y + this.movement.y
        }
    }
}

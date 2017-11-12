import MovementService from './services/MovementService';
import CONSTANTS from './constants'

export const canMove = (state, movementPattern) => {
    state.movementPattern = movementPattern;
    return {
        beginMovement: () => {
            state.movementPattern.begin();
            MovementService.registerMover({
                type: CONSTANTS.HITTABLE,
                object: state
            });
        }
    }
};

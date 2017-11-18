import MovementService from './services/MovementService';
import CONSTANTS from './constants'
import {each} from 'lodash'; //named import from 3rd party service

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

export const canEmitEvents = (state) => {
    state.listeners = {};
    return {
        on: (eventName, cb) => {
            if(!state.listeners[eventName]) {
                state.listeners[eventName] = [];
            }
            state.listeners[eventName].push(cb);
        },
        emit: (eventName) => {
            each(state.listeners[eventName], (cb) => {
                console.log('trace');
                cb();
            });
        }
    }
};

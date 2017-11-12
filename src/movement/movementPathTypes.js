import {hypotenuse} from '../services/util';


export const noGravity = (elapsedSec, velocity, startCoords, endCoords) => {

    let twoDDistance = hypotenuse(endCoords.y - startCoords.y, endCoords.x - startCoords.x);

    //if there is no height, this is being calculated in 2D
    let threeDDistance = startCoords.h ? hypotenuse(startCoords.h, twoDDistance) : twoDDistance;

    let ballDistance = elapsedSec * velocity;
    let percentTraveled = ballDistance / threeDDistance;

    let diff = {
        h: endCoords.h - startCoords.h,
        x: endCoords.x - startCoords.x,
        y: endCoords.y - startCoords.y
    };


    let coord = {
        h: startCoords.h + (diff.h * percentTraveled),
        x: startCoords.x + (diff.x * percentTraveled),
        y: startCoords.y + (diff.y * percentTraveled)
    };
    //  console.log(diff.x, percentTraveled, ballCoord.x);
    return coord;

}

export const warp = (elapsedSec, velocity, startCoords, endCoords) => {
    return endCoords;
}

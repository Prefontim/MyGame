import Enemy from '../objects/enemy';
import Enemy2 from '../enemies/enemy';
import Zombie from '../enemies/zombie';
import VerticalMovementPattern from '../objects/VerticalMovementPattern';

function EnemyFactory() {
    let createIdx = 0;
    function getEnemy(type, {startCoord}) {
        createIdx++;
        if(type === 'test') {
            let mp = new VerticalMovementPattern(startCoord); //or 'manual' for no movement
            let enemy = new Enemy({startCoord: startCoord, movementPattern: mp}); //FIXME - use constant
            mp.shape = enemy.enemyShape;
            return enemy;
        } else if(type === 'zombie') {
            let movePattern = new VerticalMovementPattern(startCoord, {
                movement: {
                    x: 0,
                    y: 50,
                    velocity: 100
                },
                repeat: true,
                interval: 3000
            }); //or 'manual' for no movement
            let zombie = Enemy2({id: 'enemy' + createIdx, startCoord: startCoord, image: 'zombie_male', movePattern: movePattern});
            movePattern.obj = zombie;
            return zombie;
        }
    }
    return {
        getEnemy: getEnemy
    };
}

export default EnemyFactory();

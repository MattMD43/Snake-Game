//auťák verze - pohyb držením šipek

function keyPush(e) {
    switch(e.key) {
        case 'ArrowLeft':
        snakePosX -= snakeSpeed
        break;

        case 'ArrowUp':
        snakePosY -= snakeSpeed
        break;

        case 'ArrowRight':
        snakePosX += snakeSpeed
        break;

        case 'ArrowDown':
        snakePosY += snakeSpeed
        break;

    }
}

document.addEventListener('keydown', keyPush)
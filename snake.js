'use strict'
//pole
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const starter = document.querySelector('.starter')

//Game

let gameIsRunning = true

//snake
const tileSize = 50
let snakeSpeed = tileSize
let fps = 12


//snake tail
let tail = []
let snakeLength = 2



//počáteční pozice
let snakePosX = 0
let snakePosY = canvas.height/2 
let velocityX = 1
let velocityY = 0
//food
let foodPosX = 0
let foodPosY = 0
//počet dlaždic
const tileCountX = canvas.width / tileSize
const tileCountY = canvas.height / tileSize
let score = 0
let heading = document.querySelector('.heading')
let scorecounter = document.querySelector('.muchmuch')

drawStuff()
resetFood()

//loop pro pohyb haďáka
function gameLoop() {

    if(gameIsRunning){
    drawStuff()
    moveStuff()
    setTimeout(gameLoop, 1000 / fps)
    }
}

starter.addEventListener('click', playIt)

function playIt(e) {
    gameLoop()
    starter.removeEventListener('click', playIt)
    starter.removeEventListener('keydown', playIt)
    }    

    function moveStuff() {
    snakePosX += snakeSpeed * velocityX 
    snakePosY += snakeSpeed * velocityY
    
        if(snakePosX > (canvas.width - tileSize)){
            snakePosX = 0
        }

        if(snakePosX < 0) {
            snakePosX = canvas.width
        }

        if(snakePosY > (canvas.height - tileSize)){
            snakePosY = 0
        }

        if(snakePosY < 0){
            snakePosY = canvas.height
        }

        tail.forEach(snakePart => {
            if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
           gameOver()
            }
        })

        tail.push({x: snakePosX, y: snakePosY})

        tail = tail.slice(-1 * snakeLength)

        if (snakePosX === foodPosX && snakePosY === foodPosY) {
            score++
            snakeLength++
            scorecounter.textContent = score
            resetFood()
         }
    }

    function drawStuff() {
       
        rectangle('#D9946C', 0, 0, canvas.width, canvas.height)

        drawGrid()


        rectangle('#73020C', snakePosX, snakePosY, tileSize, tileSize)


        rectangle('lightblue', foodPosX, foodPosY, tileSize, tileSize)
        
        tail.forEach(snakePart => 
            rectangle('#73020C', snakePart.x, snakePart.y, tileSize, tileSize)
            )        
    }

    function rectangle(color, x, y, width, height) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
}

    function keyPush(e) {
        switch(e.key) {
            case 'ArrowLeft':
                if(velocityX !== 1){
                velocityX = -1
                velocityY = 0
            }
            break;

            case 'ArrowRight':
                if(velocityX !== -1){
                velocityX = 1
                velocityY = 0
            }
            break;

            case 'ArrowUp':
            if(velocityY !== 1){
            velocityX = 0
            velocityY = -1
            }
            break;
            
            case 'ArrowDown':
                if(velocityY !== -1){
                velocityX = 0
                velocityY = 1
            }
            break;

            default:
                if(! gameIsRunning) {
                    location.reload()
                    break
                }

        }

    }

    function resetFood(){
    
    if (snakeLength === tileCountX * tileCountY) {
        gameOver()
    }

        foodPosX = Math.floor(Math.random() * tileCountX) * tileSize
        foodPosY = Math.floor(Math.random() * tileCountY) * tileSize
    
    if (foodPosX === snakePosX && foodPosY === snakePosY) {
        resetFood()
    }

    if (tail.some(snakePart =>
         snakePart.x === foodPosX && 
         snakePart.y === foodPosY )) { 
    
            resetFood()
        }
    }

    function gameOver(){
        heading.innerHTML = `<strong> ${score} </strong> ...Koneeec :( <br> 
            Pro novou hru stiskni náhodnou klávesu (kromě šipek) a tlačítkem Start začni`
        gameIsRunning = false
    }

    function drawGrid() {
        for (let i = 0;  i < tileCountX; i++) {
            for (let j = 0; j < tileCountY; j++)  {
              rectangle('#fff', tileSize*i, tileSize*j, tileSize - 1, tileSize - 1)
         }
      }
    }

    document.addEventListener('keydown', keyPush)



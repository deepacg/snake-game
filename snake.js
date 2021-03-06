const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const canvasSize = 400
canvas.width = canvasSize
canvas.height = canvasSize

const snakeBox = 15
const totalMoves = canvasSize/snakeBox

const apple = new Image()
apple.src = 'images/apple.png' 

let dead = new Audio()
let eat = new Audio()
let up = new Audio()
let down = new Audio()
let left = new Audio()
let right = new Audio()
dead.src = 'audio/dead.mp3'
eat.src = 'audio/eat.mp3'
up.src = 'audio/up.mp3'
down.src = 'audio/down.mp3'
left.src = 'audio/left.mp3'
right.src = 'audio/right.mp3'

// define level

var level = ''

// define snake

let snake = []
snake[0] = {
    x : 9 * snakeBox,
    y : 10 * snakeBox
}

// create food

let food = {}
getFood()

// score

let score = 0

// snake direction

let dir = ''
document.addEventListener('keydown', direction)
let btn = ''
document.getElementById('up').addEventListener('click', function(){
    btn = 'up'
    direction()
})
document.getElementById('left').addEventListener('click', function(){
    btn = 'left'
    direction()
})
document.getElementById('right').addEventListener('click', function(){
    btn = 'right'
    direction()
})
document.getElementById('down').addEventListener('click', function(){
    btn = 'down'
    direction()
})

function direction() {
    let key = event.keyCode
 
    if ((key == 37 || btn == 'left') && dir != 'RIGHT'){
        dir = 'LEFT'
        left.play()
    }
    else if ((key == 38 || btn == 'up') && dir != 'DOWN'){
        dir = 'UP'
        up.play()
    }
    else if ((key == 39 || btn == 'right') && dir != 'LEFT'){
        dir = 'RIGHT'
        right.play()
    }
    else if ((key == 40 || btn == 'down') && dir != 'UP'){
        dir = 'DOWN'
        down.play()
    }


}

function getFood(){
    food = {
        x: Math.floor(Math.random()*(totalMoves-2-3)+3)*snakeBox,
        y: Math.floor(Math.random()*(totalMoves-2-3)+3)*snakeBox
    }
    // ctx.drawImage(apple, x, y, snakeBox, snakeBox)
}

// To get random value between 2 values Math.random()*(max-min)+min

function collisionDetection(head, ar){
    for(var i=0; i<ar.length; i++){
        if(head.x == ar[i].x && head.y == ar[i].y)
            return true
    }
    return false
}

function render(){
    ctx.fillStyle = '#dcdcdc'
    ctx.fillRect(0, 0, canvasSize, canvasSize)

    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = i==0 ? '#4CAF50' : 'white'
        ctx.fillRect(snake[i].x, snake[i].y, snakeBox, snakeBox)

        ctx.strokeStyle = '#E91E63'
        ctx.strokeRect(snake[i].x, snake[i].y, snakeBox, snakeBox)
    }
    ctx.drawImage(apple, food.x, food.y, snakeBox, snakeBox)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(dir ==  'LEFT') snakeX -= snakeBox
    if(dir == 'RIGHT') snakeX += snakeBox
    if(dir == 'UP') snakeY -= snakeBox
    if(dir == 'DOWN') snakeY += snakeBox

    // if snake eats food

    if(snakeX == food.x && snakeY == food.y) {
        score++
        eat.play()
        getFood()
    }
    else{
        snake.pop()
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if(snakeX < 0 || snakeX > canvasSize || snakeY < 0 || snakeY > canvasSize || collisionDetection(newHead, snake)){
        gameOver()
        
        return
    }

    snake.unshift(newHead)

    ctx.fillStyle = 'black'
    ctx.font = '25px tahoma'
    ctx.fillText('Score: ', 10, 40)
    ctx.fillText(score, 90, 40)

}

// render()
// var gm = ''
// document.getElementById('level').addEventListener('change', function(){
    
//     level = this.value
   
// })
// if(level == 'beginner')
// gm = setInterval(render, 1000) 
// else if(level == 'intermediate')
// gm = setInterval(render, 500) 
// else if(level == 'hard')
// gm = setInterval(render, 100) 

var gm = setInterval(render, 200) 

function gameOver(){
    clearInterval(gm)
    dead.play()
    // alert('Game over')
    ctx.fillStyle = 'red'
    ctx.font = '40px tahoma'
    ctx.fillText('Game over!', canvasSize/2-100, canvasSize/2)
    ctx.fillStyle = 'blue'
    ctx.font = '20px tahoma'
    if(score > localStorage.getItem('High score')) {
        ctx.fillText('New High score set!! '+score, canvasSize/2-110, canvasSize/2+30)
        localStorage.setItem('High score', score)
    }

}


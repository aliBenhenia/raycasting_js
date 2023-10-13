const TILE_SIZE = 32;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;

const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;
class Player
{
    constructor()
    {
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_HEIGHT / 2;
        this.radius = 3; 
        this.turnDirection  = 0;  // -1 left|| 1 right
        this.WalkDirection  = 0;  // -1 back || 1 front
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 2.0;
        this.rotationSpeed = 2 * ( Math.PI / 180);
    }
    update(){
        this.rotationAngle += this.turnDirection * this.rotationSpeed;
        let moveStep = this.WalkDirection * this.moveSpeed;
        let newPlayerX = this.x + Math.cos(this.rotationAngle) * moveStep ; // cuurent pos X
        let newPlayerY = this.y +  Math.sin(this.rotationAngle) * moveStep ;// cuurent pos Y
        console.log(newPlayerX)
        if (!grid.hasWallAt(newPlayerX, newPlayerY)) // check walls
        {
            this.x = newPlayerX;
            this.y = newPlayerY;
        }
    }
    render()
    {
        noStroke();
        fill("red");
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(
            this.x,
            this.y,
            this.x + Math.cos(this.rotationAngle) * 30,
            this.y + Math.sin(this.rotationAngle) * 30
        );
    }
}
class Map {
    constructor() {
        this.grid = map1;
    }
    hasWallAt(x, y)
    {
        if (x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT)
            return 1;
        let mapGridIdxX =  Math.floor(x / TILE_SIZE); // current idx
        let mapGridIdxY =  Math.floor(y / TILE_SIZE); // current idx
        if (this.grid[mapGridIdxY][mapGridIdxX] == 1)
            return 1;
        return 0;
    }
    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) {
            this.grid[i].map((item, idx)=>{
                if (item == 1)
                    fill("black");
                else
                    fill("#fff");
                stroke("#222");
                rect(idx * TILE_SIZE , i * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            })
        }
    }
}

var grid = new Map();
var player = new Player();

function keyPressed()
{
    
    if (keyCode == UP_ARROW)
    { 
        player.WalkDirection = +1;
    } 
    else if (keyCode == DOWN_ARROW)
    {
        player.WalkDirection = -1;
    }
    else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW) {
        player.turnDirection = -1;
    }
    
}

function keyReleased ()
{
    if (keyCode == UP_ARROW)
    {
        player.WalkDirection = 0;
    } 
    else if (keyCode == DOWN_ARROW)
    {
        player.WalkDirection = 0;
    }
    else if (keyCode == RIGHT_ARROW)
    {
        player.turnDirection = 0;
    }
    else if (keyCode == LEFT_ARROW)
    {
        player.turnDirection  = 0;
    }
   
}
function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update() {
    player.update()
}

function draw() {
    update();

    grid.render();
    player.render();
}

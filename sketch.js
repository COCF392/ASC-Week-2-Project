let customerImage1;
let customerImage2;
let customerImage3;
let breadImage;
let tomatoImage;
let cheeseImage;
let meatImage;

let test_object;

let holding;

// plate vars
let plateX = 300
let plateY = 100
let plateWidth = 200
let plateHeight = 75
let plateLeft = plateX - (plateWidth / 2)
let plateRight = plateX + (plateWidth / 2)
let plateTop = plateY - (plateHeight / 2)
let plateBottom = plateY + (plateHeight / 2)

// food vars
let testLeft;
let testRight;
let testTop;
let testBottom;


function preload(){

}


function setup() {
    createCanvas(750, 750);
    background(255, 255, 255);
    noStroke();
    rectMode(CENTER)
    test_object = new Food(250, 250, 50)

    testLeft = test_object.x - (test_object.diam / 2)
    testRight = test_object.x + (test_object.diam / 2)
    testTop = test_object.y - (test_object.diam / 2)
    testBottom = test_object.y + (test_object.diam / 2)

    holding = false;
}

function draw(){
    background(255, 255, 255);

    // plate placeholder
    fill(100, 100, 100)
    rect(300, 150, 200, 75)
    
    // food placeholder
    fill(255, 0, 0);
    circle(test_object.x, test_object.y, test_object.diam)

    testLeft = test_object.x - (test_object.diam / 2)
    testRight = test_object.x + (test_object.diam / 2)
    testTop = test_object.y - (test_object.diam / 2)
    testBottom = test_object.y + (test_object.diam / 2)


    fill(0, 0, 0)
    text("(" + test_object.x + "," + test_object.y + ")", 100, 100)
    text(testLeft + ", " + plateRight, 100, 120)
    text(testRight + ", " + plateLeft, 100, 130)
    text(testTop + ", " + plateBottom, 100, 140)
    text(testBottom + ", " + plateTop, 100, 150)
    

    if (testLeft > plateRight && testRight < plateLeft && testTop > plateBottom && testBottom < plateTop) {}
    
    else {text("Food is in plate", 100, 170)}
}

function mousePressed() {
    if (dist(mouseX, mouseY, test_object.x, test_object.y) < 25) {
        holding = true;
        offsetX = test_object.x - mouseX;
        offsetY = test_object.y - mouseY;
    }
}

function mouseReleased() {
    holding = false;
}

function mouseDragged() {
    // adding functionality for dragging the shape
    if (holding) {
        test_object.x = mouseX + offsetX;
        test_object.y = mouseY + offsetY;
    }
}

class Food {
    constructor(x, y, diam) {
        this.x = x;
        this.y = y;
        this.diam = diam;
    }
}
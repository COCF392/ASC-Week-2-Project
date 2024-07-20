// var to let the program know if a shape is being held
let holding;

// plate dimensions
let plateX = 250
let plateY = 250
let plateWidth = 250
let plateHeight = 125

// plate hitbox
let plateLeft = plateX - (plateWidth / 2) + 15
let plateRight = plateX + (plateWidth / 2) - 15
let plateTop = plateY - (plateHeight / 2) + 15
let plateBottom = plateY + (plateHeight / 2) - 15

// food vars
let foodItem;
let foodLeft;
let foodRight;
let foodTop;
let foodBottom;

// arrays and misc.
let typesArray = ["Fruit", "Vegetable", "Meat", "Grain", "Seafood", "Drink"]
let foodArray = [];
let foodOffConveyor = [];
let foodIndex;
let conveyorSpeed;

function setup() {
    createCanvas(500, 700);
    background(255, 255, 255);
    noStroke();
    rectMode(CENTER)
    ellipseMode(CENTER)

    holding = false;
    foodIndex = 0;
}

function draw(){
    background(88, 57, 39);
    noStroke();

    // setting the conveyor speed
    conveyorSpeed = 1;

    // conveyor placeholder
    fill(0, 0, 0);
    rect(250, 625, 500, 150)

    // plate placeholder
    fill(100, 100, 100)
    ellipse(plateX, plateY, plateWidth, plateHeight)


    // adding new food to the conveyor
    // this if statement ensures that the program can make a new food item once it starts,
    // and that new food is only created after there is some decent space between the last created food item
    if (foodArray.length == 0 || (holding == false && (dist(-37, 625, foodArray[0].x, foodArray[0].y) > 125))) {

        // creating a new object and adding it the front of the array
        foodItem = new Food(-37, 625, 75, typesArray[int(random(5))], random(255), random(255), random(255))
        foodArray.unshift(foodItem);
    }

    // if food goes too far off screen, delete it
        if (foodArray[foodArray.length - 1].x > 550) { 
            foodArray.pop()
        }

    // this for loop allows for the food to be animated, and is also essential for the program to function
    for (let i = 0; i < foodArray.length; i++) {

        // visualizing the object, adding it to the conveyor
        fill(foodArray[i].r, foodArray[i].g, foodArray[i].b)
        circle(foodArray[i].x, foodArray[i].y, foodArray[i].diam)
    
        // calculating the food's hitbox
        // (the 15 is to adjust the size of the box for more accuracy)
        foodLeft = foodArray[i].x - (foodArray[i].diam / 2) + 15
        foodRight = foodArray[i].x + (foodArray[i].diam / 2) - 15
        foodTop = foodArray[i].y - (foodArray[i].diam / 2) + 15
        foodBottom = foodArray[i].y + (foodArray[i].diam / 2)- 15
        
        // checking if the food is on the plate
        if (foodLeft > plateRight || foodRight < plateLeft || foodTop > plateBottom || foodBottom < plateTop) {}
        else {
            fill(255, 255, 255)
            console.log(foodArray[i].foodType + " is on plate")
        }

        // checking if the food is on the conveyor
        if (foodArray[i].y > 550) {
            foodArray[i].x += conveyorSpeed
        }
    }
}

function mousePressed() {
    for (let i = 0; i < foodArray.length; i++) {
        if (dist(mouseX, mouseY, foodArray[i].x, foodArray[i].y) < foodArray[i].diam / 2) {
            holding = true;
            offsetX = foodArray[i].x - mouseX;
            offsetY = foodArray[i].y - mouseY;
            foodIndex = i;
            break
        }
    }
}

function mouseReleased() {
    holding = false;
}

function mouseDragged() {
    // adding functionality for dragging the shape
    if (holding) {
        foodArray[foodIndex].x = mouseX + offsetX;
        foodArray[foodIndex].y = mouseY + offsetY;
    }
}

// This class is to create objects for each type of food, 
// This makes it far easier to continuously generate new food objects, and also cuts down on our program's size
// rgb variables are placeholders until images are added

class Food {
    constructor(x, y, diam, foodType, r, g, b) {
        this.x = x;
        this.y = y;
        this.diam = diam;
        this.foodType = foodType;
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
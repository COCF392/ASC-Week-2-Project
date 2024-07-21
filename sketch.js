// This class is to create objects for each type of foodm which makes it far easier 
// to continuously generate new food objects, and also cuts down on the size of our program
class Food {
    constructor(x, y, dim, foodType, image, onPlate) {
        this.x = x;
        this.y = y;
        this.dim = dim;
        this.foodType = foodType;
        this.image = image;
        this.onPlate = onPlate;
    }
}

// image vars
let apple, banana, carrot, chicken, conveyor, corn, crab, delilah, dexter, fish, grapes, juice, 
    jerry, lettuce, lola, milkshake, oatz, orange, paper, plate, pork, potato, shrimp, soda, steak, 
    sushi, table, water, whiteRice, yellowRice, button;

// var to let the program know if a shape is being held
let holding;

// plate vars
let plateX = 250
let plateY = 290
let plateWidth = 250
let plateHeight = 125

// plate hitbox
let plateLeft = plateX - (plateWidth / 2) + 15
let plateRight = plateX + (plateWidth / 2) - 15
let plateTop = plateY - (plateHeight / 2) + 45
let plateBottom = plateY + (plateHeight / 2) - 45

// food vars
let foodItem;
let foodLeft;
let foodRight;
let foodTop;
let foodBottom;

// arrays and misc.
let typesArray = ["Fruit", "Vegetable", "Meat", "Grain", "Seafood", "Drink"]
let foodArray = [];
let fruitArray = [];
let vegetableArray = [];
let meatArray = [];
let grainArray = [];
let seafoodArray = [];
let drinkArray = [];
let winCondition = [];
let onPlate = [];
let conveyorSpeed;
let randType;
let randImg;
let gameWon;
let buttonHeld;
let foodCooldown;
let orderItem;

// loading the images
function preload() {
    apple = loadImage("images/apple.png");
    banana = loadImage("images/banana.png");
    carrot = loadImage("images/carrot.png");
    chicken = loadImage("images/chicken.png");
    conveyor = loadImage("images/conveyor.png");
    corn = loadImage("images/corn.png");
    crab = loadImage("images/crab.png");
    delilah = loadImage("images/delilah.png");
    dexter = loadImage("images/dexter.png");
    fish = loadImage("images/fish.png");
    grapes = loadImage("images/grapes.png");
    juice = loadImage("images/juice.png");
    jerry = loadImage("images/jerry.png");
    lettuce = loadImage("images/lettuce.png");
    lola = loadImage("images/lola.png");
    milkshake = loadImage("images/milkshake.png");
    oatz = loadImage("images/oatz.png");
    orange = loadImage("images/orange.png");
    paper = loadImage("images/paper.png")
    plate = loadImage("images/plate.png");
    pork = loadImage("images/pork.png");
    potato = loadImage("images/potato.png");
    shrimp = loadImage("images/shrimp.png");
    soda = loadImage("images/soda.png");
    steak = loadImage("images/steak.png");
    sushi = loadImage("images/sushi.png");
    table = loadImage("images/table.png");
    water = loadImage("images/water.png");
    whiteRice = loadImage("images/whiterice.png");
    yellowRice = loadImage("images/yellowrice.png");
    button = loadImage("images/button.png")
}

function setup() {
    createCanvas(500, 700);
    background(255, 255, 255);
    noStroke();
    rectMode(CENTER)
    ellipseMode(CENTER)
    imageMode(CENTER)

    holding = false;
    foodIndex = 0;

    fruitArray = [apple, banana, orange, grapes];
    vegetableArray = [carrot, corn, lettuce, potato];
    meatArray = [pork, steak, chicken];
    grainArray = [oatz, whiteRice, yellowRice];
    seafoodArray = [shrimp, fish, sushi];
    drinkArray = [juice, soda, milkshake, water];

    gameWon = true;
    conveyorSpeed = 1;
    buttonHeld = false;
    foodCooldown = 100;
}

function draw(){

    // table
    image(table, 250, 350, 500, 700)

    // conveyor
    image(conveyor, 250, 625, 500, 150)

    // plate placeholder
    image(plate, plateX, plateY, plateWidth, plateHeight)

    // customer protrait
    fill(0)
    square(70, 70, 180);
    image(dexter, 80, 80, 150, 150);

    // paper
    image(paper, 250, 100, 150, 200)

    // button
    image(button, 450, 500, 75, 75)

    // creating a new object, and adding new food to the conveyor
    // this if statement ensures that the program can make a new food item once it starts,
    // and that new food is only created after there is some decent space between the last created food item
    if (foodArray.length == 0 || (frameCount % foodCooldown == 0 && holding == false)) {

        // randomly selected in the type of food the object will be
        randType = typesArray[int(random(typesArray.length))];

        if (randType == "Fruit") {
            randImg = fruitArray[int(random(fruitArray.length))]
        }

        else if (randType == "Vegetable") {
            randImg = vegetableArray[int(random(vegetableArray.length))]
        }

        else if (randType == "Meat") {
            randImg = meatArray[int(random(meatArray.length))]
        }

        else if (randType == "Grain") {
            randImg = grainArray[int(random(grainArray.length))]
        }

        else if (randType == "Seafood") {
            randImg = seafoodArray[int(random(seafoodArray.length))]
        }

        else if (randType == "Drink") {
            randImg = drinkArray[int(random(drinkArray.length))]
        }

        // creating a new object and adding it the front of the array
        foodItem = new Food(-37, 625, 75, randType, randImg, false)
        foodArray.unshift(foodItem);
    }

    // if food goes too far off screen, delete it
    if (foodArray[foodArray.length - 1].x > 550) { foodArray.pop()}

    // generating the winning combination
    // needs some touching up on
    if (gameWon) {
        x = 0
        while (x < 3) {
            winCondition.unshift(typesArray[int(random(typesArray.length))])

            if (winCondition.length > 1) {
                for (let i = 1; i < winCondition.length; i++) {
                    if (winCondition[i - 1] == winCondition[i]) {
                        winCondition.splice(0, 1)
                        x--
                        continue
                    }
                }
            }

            x++
        }

        winCondition.sort()
        console.log("The winning combination is", winCondition)
        gameWon = false
    }

    // writing order on the paper:
        noStroke();
        fill(0)
        textSize(30)
        text("Order:" , 215, 60)
        textSize(15)
        text(winCondition[0], 235, 90)
        text(winCondition[1], 235, 115)
        text(winCondition[2], 235, 140)

    // this for loop allows for the food to be animated, and is also essential for the program to function
    for (let i = 0; i < foodArray.length; i++) {

        // visualizing the object, adding it to the conveyor
        image(foodArray[i].image, foodArray[i].x, foodArray[i].y, foodArray[i].dim, foodArray[i].dim)

        // calculating the food's hitbox
        // (the 15 is to adjust the size of the box for more accuracy)
        foodLeft = foodArray[i].x - (foodArray[i].dim / 2) + 15
        foodRight = foodArray[i].x + (foodArray[i].dim / 2) - 15
        foodTop = foodArray[i].y - (foodArray[i].dim / 2) + 15
        foodBottom = foodArray[i].y + (foodArray[i].dim / 2)- 15

        // checking if the food is on the conveyor
        if (foodArray[i].y > 550) {foodArray[i].x += conveyorSpeed}
    

        // checking if the food is on the plate
        if (!(foodLeft > plateRight || foodRight < plateLeft || foodTop > plateBottom || foodBottom < plateTop)) {

            if (onPlate.length == 0 || !(onPlate.includes(foodArray[i].foodType))) {
                console.log(foodArray[i].foodType + " is on plate");
                foodArray[i].onPlate = true;
                holding = false;
                onPlate.unshift(foodArray[i].foodType);
                console.log(onPlate);
            }

            if (!(winCondition.includes(onPlate[0]))) {
                console.log("That wasn't in the order! Plate cleared!")
                foodArray = foodArray.filter(foodItem => !foodItem.onPlate);
                onPlate = [];
            }

            onPlate.sort();

            if (onPlate.toString() == winCondition.toString()) {
                console.log("You win!")
                foodArray = foodArray.filter(foodItem => !foodItem.onPlate);
                winCondition = [];
                onPlate = [];
                gameWon = true
            }
        }
    }
}   


function mousePressed() {
    for (let i = 0; i < foodArray.length; i++) {
        // checking if the user has clicked over an object
        if (dist(mouseX, mouseY, foodArray[i].x, foodArray[i].y) < foodArray[i].dim / 2 && foodArray[i].onPlate == false) {
            holding = true;
            offsetX = foodArray[i].x - mouseX;
            offsetY = foodArray[i].y - mouseY;
            foodIndex = i;
            break
        }
        // checking if the user has clicked over the button
        if (dist(mouseX, mouseY, 450, 500) < 34 && holding == false && buttonHeld == false) {
            conveyorSpeed += 4
            foodCooldown /= 5
            buttonHeld = true;
        } 
    }
}

// letting the program know that food is not being held and the button is not being held
function mouseReleased() {
    holding = false;
    buttonHeld = false;
    conveyorSpeed = 1;
    foodCooldown = 100;
}

// adding functionality for dragging the shape
function mouseDragged() {
    // the object's coordinates are updated every frame in relation to the cursor's
    if (holding) {
        foodArray[foodIndex].x = mouseX + offsetX;
        foodArray[foodIndex].y = mouseY + offsetY;
    }
}
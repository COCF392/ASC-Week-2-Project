// vars to determine the state of the program
let state = "menu";
let hard_game = false;
let medium_game = false;
let easy_game = false

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
    sushi, table, water, whiteRice, yellowRice, button, kate, bobby, main_menu;

// sound vars
let menu_music, cooking_music, game_over_music;

// var to let the program know if an object is being held
let holding;

// plate vars
let plateX = 250
let plateY = 310
let plateWidth = 250
let plateHeight = 125

// plate hitbox
let plateLeft = plateX - (plateWidth / 2) + 50
let plateRight = plateX + (plateWidth / 2) - 50
let plateTop = plateY - (plateHeight / 2) + 50
let plateBottom = plateY + (plateHeight / 2) - 50

// food vars
let foodItem;
let foodLeft;
let foodRight;
let foodTop;
let foodBottom;

// array vars
let typesArray = ["Fruit", "Vegetable", "Meat", "Grain", "Seafood", "Drink"]
let customerArray = [];
let foodArray = [];
let fruitArray = [];
let vegetableArray = [];
let meatArray = [];
let grainArray = [];
let seafoodArray = [];
let drinkArray = [];
let winCondition = [];
let onPlate = [];

// storing the combinations of food the player needs to win
// a set prevents there from being any repeat food requirments in an order
let winningSet = new Set();

// storing the score and the timer
let score;
let timer;
let framesPerSecond;

// misc.
let conveyorSpeed;
let winResponseTime;
let loseResponseTime;
let randType;
let randImg;
let gameWon;
let buttonHeld;
let foodCooldown;
let orderItem;
let winningType;
let randCustomer;
let textBoxGone;
let timerChanged;
let orderLength;

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
    button = loadImage("images/button.png");
    kate = loadImage("images/kate.png");
    bobby = loadImage("images/bobby.png");
    main_menu = loadImage("images/main_menu.png")

    menu_music = loadSound("sounds/menu_music.mp3")
    cooking_music = loadSound("sounds/cooking_music.mp3")
    game_over_music = loadSound("sounds/game_over_music.mp3")
}

function setup() {
    // setting up the canvas and how coordinates will work
    createCanvas(500, 700);
    background(255, 255, 255);
    noStroke();
    rectMode(CENTER)
    ellipseMode(CENTER)
    imageMode(CENTER)

    // these arrays are storing the images of all of the foods
    fruitArray = [apple, banana, orange, grapes];
    vegetableArray = [carrot, corn, lettuce, potato];
    meatArray = [pork, steak, chicken];
    grainArray = [oatz, whiteRice, yellowRice];
    seafoodArray = [shrimp, fish, sushi];
    drinkArray = [juice, soda, milkshake, water];

    // this array stores the customers and their names
    // by storing arrays in arrays, it makes it easier to reference the data later
    customerArray = [[delilah, "Delilah's"],
                    [dexter, "Dexter's"], 
                    [jerry, " Jerry's"], 
                    [lola, "  Lola's"],
                    [kate, "  Kate's"],
                    [bobby, "Bobby's"]];

    // starting values that will change throughout the program's runtime
    score = 0;
    framesPerSecond = 60;
    foodCooldown = 100;
    conveyorSpeed = 1;
    foodIndex = 0;
    buttonHeld = false;
    holding = false;
    gameWon = true;
    textBoxGone = true;
    timerChanged = false;
}

function draw() {
    if (state == "menu") {load_menu();}
    else if (state == "game") {load_game();}
}

function mousePressed() {
    if (state == "menu") {
        if (mouseX > 140 && mouseX < 358){
            if (mouseY < 355 && mouseY > 285) {
                easy_game = true;
                state = "game"
            }

            if (mouseY < 475 && mouseY > 404) {
                medium_game = true;
                state = "game"
            }

            if (mouseY < 591 && mouseY > 520) {
                hard_game = true;
                state = "game"
            }
        }
    }

    if (state == "game") {
        for (let i = 0; i < foodArray.length; i++) {
            // checking if the user has clicked over an object
            if (dist(mouseX, mouseY, foodArray[i].x, foodArray[i].y) < foodArray[i].dim / 2 && foodArray[i].onPlate == false && timer > 0) {
                holding = true;
                offsetX = foodArray[i].x - mouseX;
                offsetY = foodArray[i].y - mouseY;
                foodIndex = i;
                break
            }
            // checking if the user has clicked over the button
            if (dist(mouseX, mouseY, 450, 500) < 34 && holding == false && buttonHeld == false && timer > 0) {
                conveyorSpeed += 4
                foodCooldown /= 5
                buttonHeld = true;
            } 
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

function load_menu() {image(main_menu, 250, 350, 500, 700)}

function load_game() {
    // adding difficulty changes
    if (easy_game) {
        timer = 60
        orderLength = 2
        easy_game = false
    }

    else if (medium_game) {
        timer = 40
        orderLength = 3
        medium_game = false
    }

    else if (hard_game) {
        timer = 20
        orderLength = 5
        hard_game = false
    }

    // table
    image(table, 250, 350, 500, 700)

    // conveyor
    image(conveyor, 250, 625, 500, 150)

    // plate
    image(plate, plateX, plateY, plateWidth, plateHeight)

    // customer protrait
    fill(0)
    square(70, 70, 180);

    // this if statement checks if it's ok to load the next customer
    if (gameWon && textBoxGone) {
        randCustomer = customerArray[int(random(customerArray.length))]
    }

    image(randCustomer[0], 80, 80, 150, 150);

    // paper
    image(paper, 250, 100, 150, 200)

    // button
    image(button, 450, 500, 75, 75)

    // score
    if (timer > 0) {
    fill(255, 255, 255)
    textSize(20)
    text("SCORE: " + score, 350, 70)
    }

    // raising the difficulty if the score surpasses 5000 and changing the color of the timer to indicate it
    if (score >= 5000) {
        if (timerChanged == false) {framesPerSecond = 30;}
        fill(255, 255, 0)
    }

    if (timer <= 10) {fill(255, 0, 0)}

    // calculating the timer
    // draw() runs every frame, and our program is running at a speed of 60 fps
    // meaning that for every 60 frames, a second has passed
    if (frameCount % framesPerSecond == 0 && timer > 0) {timer -=1}
    text("TIME: " + timer, 350, 120)

    // creating a new object, and adding new food to the conveyor
    // this if statement ensures that the program can make a new food item once it starts,
    // and that new food is only created after there is some decent space between the last created food item
    if (foodArray.length == 0 || (frameCount % foodCooldown == 0 && holding == false && timer > 0)) {

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
        foodItem = new Food(-37, 625, 75, randType, randImg, false, false)
        foodArray.unshift(foodItem);
    }

    // if food goes too far off screen, delete it
    if (foodArray[foodArray.length - 1].x > 550) { foodArray.pop()}

    // generating the customer's order
    if (gameWon && textBoxGone) {

        // this while loop will keep running until the order is complete and has no repeating foods in it
        while (winningSet.size < orderLength) {
            winningType = typesArray[int(random(typesArray.length))]
            winningSet.add(winningType)
        }

    // confirming the final order
        winCondition = Array.from(winningSet)
        winCondition.sort()
        gameWon = false
    }

    // writing order on the paper:
    noStroke();
    fill(0)
    textSize(30)
    text(randCustomer[1], 200, 50)
    text("Order:", 215, 80)
    textSize(15)
    text(winCondition[0], 235, 105)
    text(winCondition[1], 235, 120)

    // checking if there are more than 2 or 3 items on the list, and then adding the rest of the items
    if (winCondition.length > 2) {
        text(winCondition[2], 235, 135)
        if (winCondition.length > 3) {
            text(winCondition[3], 235, 150)
            text(winCondition[4], 235, 165)
        }
    }
    
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
        if (foodArray[i].y > 550 && timer > 0) {foodArray[i].x += conveyorSpeed}

        // checking if the food is on the plate
        if (!(foodLeft > plateRight || foodRight < plateLeft || foodTop > plateBottom || foodBottom < plateTop)) {

            // checking if the food is in the order
            if (onPlate.length == 0 || !(onPlate.includes(foodArray[i].foodType))) {
                foodArray[i].onPlate = true;
                holding = false;
                onPlate.unshift(foodArray[i].foodType);
            }

            // checking if the food is not in the order
            // if not, the entire plate is cleared
            if (!(winCondition.includes(onPlate[0]))) {

                // punishing the player
                // I also prevent the score/timer from going negative by adding the absolute value of the negative back to score/timer
                score -= 100
                if (score < 0) {score += Math.abs(score)}
                
                timer -= 5
                if (timer < 0) {timer += Math.abs(timer)}

                loseResponseTime = millis()
                foodArray = foodArray.filter(foodItem => !foodItem.onPlate);
                onPlate = [];
            }

            onPlate.sort();

            // checking if what's on the plate matches the order
            if (onPlate.toString() == winCondition.toString()) {
                // rewarding the player
                score += 250
                timer += 10
                
                // filtering the items that are on the plate out of the array
                foodArray = foodArray.filter(foodItem => !foodItem.onPlate);

                // refreshing the conditions
                winningSet = new Set();
                winCondition = [];
                onPlate = [];
                gameWon = true
                textBoxGone = false
                
                // setting the amount time before the next customer
                winResponseTime = millis();
            }  
        }
        
        // congratulating the player
        if (millis() - winResponseTime < 2000) {
            drawSpeechBubble()
            textSize(20)
            text("Thank you!", 30, 238)
        }
        else {textBoxGone = true}
        
        // telling the player they got the wrong food
        if (millis() - loseResponseTime < 2000) {
            drawSpeechBubble()
            textSize(18)
            text("That's not what", 20, 228)
            text("I ordered!", 40, 248)
        }

        // ending the game and giving a final message
        if (timer == 0) {
            drawSpeechBubble()
            textSize(18)
            text("Let me see", 35, 218)
            text("your manager!", 20, 238)
            text(">:(", 70, 258)
            fill(255, 255, 255)
            textSize(40)
            text("GAME OVER", 128, 410)
            textSize(30)
            text("Final Score: " + score, 132, 445)
            textSize(30)
            text("Thanks for Playing!", 128, 505)
            textSize(15)
            text("Game by Christopher, Jordan, & Oscar", 128, 530)
        }
    }
}   

function drawSpeechBubble() {
        fill(255, 255, 255)
        triangle (80, 165, 50, 220, 110, 220)
        ellipse (80, 230, 150, 80)
        fill(0)
}


const prompt = require('prompt-sync')();

const mapSize = parseFloat(prompt(`How Large would you like the MineSweeper map to be?`));
const numMines = parseFloat(prompt(`How many mines would you like to be present?`));


let gameMap = Array.from({ length: mapSize }, () => Array.from({ length: mapSize }, () => [".", "E"]));



//could ask user if they want to see the mines aswell?
const seeMines = false;





printMap(seeMines);

let XCoord = parseFloat(prompt(`Please enter the x coordinate you would like to select: `));
let YCoord = parseFloat(prompt(`Please enter the y coordinate you would like to select: `));

gameMap[YCoord - 1][XCoord - 1][0] = '0';

gameMap = placeMines(gameMap, numMines);

selectedSpace(YCoord - 1, XCoord - 1)

printMap(seeMines);

let alive = true;

do {
    let XCoord = parseFloat(prompt(`Please enter the x coordinate you would like to select: `));
    let YCoord = parseFloat(prompt(`Please enter the y coordinate you would like to select: `));

    gameMap[YCoord - 1][XCoord - 1][0] = '0';

    alive = selectedSpace(YCoord - 1, XCoord - 1);

    printMap(seeMines);

} while(alive)








function selectedSpace(YCoord, XCoord) {

    //storage for places that will be checked to calculate nearby mines (relative coords to given location)
    const allAround = [-1, 0, 1];

    let nearMines = 0; //number of mines tracker

    //for each position in all around array
    for (x of allAround) { 
        //for each position in all around array again
        for (y of allAround) {
        console.log(x, y);
        //if the relative position is within the bounds of the game board
        if (YCoord + y < mapSize && XCoord + x < mapSize && YCoord + y >= 0 && XCoord + x >= 0) {
            console.log(gameMap[YCoord + y][XCoord + x][1]);
            //if there is a mine at this set of all around coords then increment nearmines by 1
            if (gameMap[YCoord + y][XCoord + x][1] == 'M') {
                console.log("Mine Near Coords!");
                nearMines++;
            }
        }
        }
    }

    console.log(nearMines);
    gameMap[YCoord][XCoord][0] = nearMines;


    //if there is a mine on this tile when it was selected then turn it to the mine symbol and end the game
    if (gameMap[YCoord][XCoord][1] == 'M') {
        gameMap[YCoord][XCoord][0] = '*';
        console.log("You have landed on a mine! Game Over!")
        return false;
    }

    //if there are no mines nearby then reveal the surrounding area iteritively (recursively using this function)
    if (nearMines == 0) {
        console.log("Development Log: This is possibly only meant to occur on the first turn?")
        printMap(seeMines);
        for (x of allAround) {
            for (y of allAround) {
                if (YCoord + y < mapSize && XCoord + x < mapSize && YCoord + y >= 0 && XCoord + x >= 0) {
                    if (gameMap[YCoord + y][XCoord + x][0] == ".") {
                        selectedSpace(YCoord + y, XCoord + x);
                    }
                }
            }
        }
    }

    return true;
}



function placeMines(gameMap, numMines) {
    //ensure that the number of mines will fit within the map and if not then iteratively reduce
    while (numMines >= gameMap.length * gameMap.length) {
        numMines --;
        console.log(`ERROR: Mines will take up all avalible spaces, reducing number of mines to ${numMines}`);
        if (numMines == 0) {
            console.log(`Error: game map too small, exiting process`)
            return
        }
    }

    // console.log(gameMap);
    // console.log(gameMap.length);

    //for number of mines
    for (let i = 0; i < numMines; i++) {
        //generate coords for a random location
        let minePlaceY = Math.floor(Math.random() * gameMap.length);
        let minePlaceX = Math.floor(Math.random() * gameMap.length);

        // console.log("Y " + minePlaceY);
        // console.log("X " + minePlaceX);
        // gameMap[0][1][1] = "***"
        // console.log(gameMap[0][0][1]);
        // console.log("!!!!!");


        //if there is already a mine present or the space is the users initial choice then dont place it 
        //and alter mine quantity tracker (i) accordingly
        if (gameMap[minePlaceY][minePlaceX][1] == 'M' || gameMap[minePlaceY][minePlaceX][0] == '0') {
            if (gameMap[minePlaceY][minePlaceX][0] == '0') { 
                console.log("Mine placement was users first choice, repeating");
            }
            console.log("Mine placement already occupied, repeating");
            i --;
        } else {
            gameMap[minePlaceY][minePlaceX][1] = 'M';
        }
    }
    return gameMap;
}


function printMap(MineVis = false) {
    //if mine vis is trye then print number layer and the mine present layer of the 3d array
    if (MineVis) {
        for (let row of gameMap) {
            console.log(row.join(' '));
        }
    } else { //if mine vis is not true then print only the number tracker layer of the 3d array
        for (let row of gameMap) {
            let rowString = "";
            for (let x of row) {
                rowString = rowString.concat(`${x[0]} `);
            }
            console.log(rowString);
        }
}
}
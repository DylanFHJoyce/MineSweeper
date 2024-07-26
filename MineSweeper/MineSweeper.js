

const prompt = require('prompt-sync')();

const mapSize = parseFloat(prompt(`How Large would you like the MineSweeper map to be?`));


let gameMap = Array.from({ length: mapSize }, () => Array.from({ length: mapSize }, () => [".", "E"]));




//NOTES

//still need that initial thing that reveals every cell not within one of a mine connected to the users initial click






printMap(true);
let numMines = 3;

do {
    let XCoord = parseFloat(prompt(`Please enter the x coordinate you would like to select: `));
    let YCoord = parseFloat(prompt(`Please enter the y coordinate you would like to select: `));

    gameMap[YCoord - 1][XCoord - 1][0] = '0'

    gameMap = placeMines(gameMap, numMines);


    selectedSpace(YCoord - 1, XCoord - 1)

    // return



    printMap(true);

    console.log("Test");
} while(false)



function selectedSpace(YCoord, XCoord) {

    const allAround = [-1, 0, 1];

    //so for the choords selected we:

    //

    let nearMines = 0;
    for (x of allAround) {
        for (y of allAround) {
        console.log(x, y);
        console.log(gameMap[YCoord + y][XCoord + x][1]);
        if (gameMap[YCoord + y][XCoord + x][1] == 'M') {
            console.log("Mine Near Coords!");
            nearMines++;
        }
        }
    }

    console.log(nearMines);
    gameMap[YCoord][XCoord][0] = nearMines;

    return;
}



function placeMines(gameMap, numMines) {

    while (numMines >= gameMap.length * gameMap.length) {
       
        numMines --;
        console.log(`ERROR: Mines will take up all avalible spaces, reducing number of mines to ${numMines}`);
        if (numMines == 0) {
            console.log(`Error: game map too small, exiting process`)
            return
        }
    }

    console.log(gameMap);
    console.log(gameMap.length);


    for (let i = 0; i < numMines; i++) {

        let minePlaceY = Math.floor(Math.random() * gameMap.length);
        let minePlaceX = Math.floor(Math.random() * gameMap.length);

        console.log("Y " + minePlaceY);
        console.log("X " + minePlaceX); 
        // gameMap[0][1][1] = "***"
        // console.log(gameMap[0][0][1]);
        // console.log("!!!!!");

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

    console.log("ADD PROCESS TO MAKE SURE THAT MINE IS NOT PLACED ON INITIAL TURN SELECTION")

    return gameMap;
}






function showNum(choords) {
    return;
}



function printMap(MineVis = false) {
    if (MineVis) {
        for (let row of gameMap) {
            console.log(row.join(' '));
        }
    } else {
        for (let row of gameMap) {
            let rowString = "";
            for (let x of row) {
                rowString = rowString.concat(`${x[0]} `);
            }
            console.log(rowString);
        }
}
}
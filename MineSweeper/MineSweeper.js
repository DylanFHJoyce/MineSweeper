

const prompt = require('prompt-sync')();

//const mapSize = parseFloat(prompt(`How Large would you like the MineSweeper map to be?`));
const mapSize = 4;

let gameMap = Array.from({ length: mapSize }, () => Array(mapSize).fill([".", "E"]));

function printMap(MineVis = false) {
    if (MineVis) {
        for (let row of gameMap) {
            console.log(row.join(' '));
        }
    } else {
        for (let row of gameMap) {
            for (let x of row) {
                
                console.log(x[0].join(" "));
            }
            
            return
            // console.log(row.join(' '));
        }
}

}


printMap()

// try {
//     const price = 0;
//     price = +prompt(`How much did the`);
//     console.log(price);
// } catch(exception_let) {
//     console.log("2");
// } finally {
//     console.log("3")
// }




// function askForNumber(Message) {
//     let response = 0;
//     try {
//         response = +prompt(Message);
//         console.log(response)
//       } catch (exceptionVar) {
//         console.log("Please enter Numeric Values only")
//         response = askForNumber(Message);
//       }
//     return response;

// }

// askForNumber("Test Message: ")
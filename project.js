const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOL_VALUE = {
    A:5,
    B:4,
    C:3,
    D:2
}



const deposit = () => {
    while(true){
    const depositAmount = prompt("Enter a Deposit Amount:");
    const numberDepositAmount= parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid Deposit Amount, Try Again")
    } else {
        return numberDepositAmount;
    }
}
}

const getNumberOfLine= () => {
    while(true){
        const Lines = prompt("Enter The Number Of Lines To Bet On (1-3):");
        const numberOfLines = parseInt(Lines);
        if(isNaN(numberOfLines) || numberOfLines < 0 || numberOfLines > 3){
            console.log("Invalid Number of Line, Try Again")
        } else {
            return numberOfLines;
        };

}
}

const getBet = (balance, Lines) => {
    while(true){
        const Bet = prompt("Enter The Bet Per Line:");
        const numberOfBet = parseInt(Bet);
        if(isNaN(numberOfBet) || numberOfBet < 0 || numberOfBet > balance/Lines){
            console.log("Invalid Bet, try again")
        } else {
            return numberOfBet;
        }
}
}

const spin = () => {
    const symbols=[];
    for (const[symbol, count]of Object.entries(SYMBOLS_COUNT)){
        for ( let i=0; i< count; i++){
            symbols.push(symbol)
        }
    }
    const reels= [];
    for(let i=0; i<COLS;i++){
        reels.push([]);
        const reelSymbols= [...symbols];
        for( let j=0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol= reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);

        }
    }

    return reels;

}

const transpose = (reels) => {
    const rows = [];
    for (let i=0; i<ROWS;i++){
        rows.push([]);
        for (let j= 0; j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows


}

const printRows =(rows) =>{

    for (const row of rows){
        let rowString = ""
        for (const[i, symbol] of row.entries()){
            rowString += symbol
            if (i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString)

    }
}

const getWinnings= (rows, bet, numberOfLines) => {
    let winnings= 0;

    for (let row = 0;row < numberOfLines; row++){
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOL_VALUE[symbols[0]]
        }

    }
    return winnings;

}

const game = () =>{
let balance=deposit();

while(true){
console.log("YOU HAVE THE BALANCE OF $" + balance)
const numberOfLines= getNumberOfLine();
const bet = getBet(balance, numberOfLines);
balance -= bet  * numberOfLines;
const reels= spin();
const rows= transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines)
balance += winnings;
console.log("YOU WON, $"+ winnings.toString())

if ( balance<= 0){
    console.log("YOU HAVE RUN OUT OF MONEY")
    break;
}
const playAgain = prompt ("DO YOU WANT PLAY AGAIN (Y/N)? ");
 if(playAgain != "Y") break;
}
}

game()


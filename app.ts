#!/usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"
import { differenceInMinutes, differenceInSeconds } from "date-fns" //library for dates

//DESIGNING INTRO
console.log("*".repeat(130))
console.log("-".repeat(57),chalk.bold.green("WELCOME TO THE"),"-".repeat(56))
console.log("-".repeat(50),chalk.bold.red("TIMER"),chalk.red("by"),chalk.bold.red("ALIYAN JABBAR KHAN"),"-".repeat(50))
console.log("*".repeat(130))

//for question
const user = await inquirer.prompt(
    {
        name: "input",
        type:"number",
        message: chalk.bold.yellow("INPUT TIME IN SECONDS TO START TIMER..."),
        validate: (input)=>{
            if(isNaN(input)){ //input is not a number
return chalk.bold.red("PLEASE ENTER A VALID NUMBER!")
            }else if(input > 120){
               return chalk.bold.red("SECONDS MUST BE LESS THAN 120!")
            }else{
                return true 
            }
        }
    }
)
let time = user.input

function timer(val:number){
    let seconds = new Date().getSeconds()+val
    let set= new Date().setSeconds(seconds)
    let initialTime = new Date(set)
    // console.log(initialTime) //the time from where you started in seconds + user seconds
    //for only one time we use setTimeout method and for repeated work after a time interval we use setinterval method
    setInterval(()=>{
        let currentTime = new Date() 
        let timeDiff = differenceInSeconds(initialTime,currentTime) //difference in seconds is taking two dates and then giving the difference of thier seconds
        // console.log(currentTime) //showing current time 
        // console.log(timeDiff) //showing difference in between the current time and time set
        if(timeDiff <= 0){
            console.log("-".repeat(55),chalk.bold.green("TIMER HAS EXPIRED!"),"-".repeat(55))
            process.exit()
        }
    
        const sec = Math.floor(timeDiff%60) //second formula //means ager value 60 se badi hogi to us ko show kare ga means ager 65 hai to 5 show kare ga
        const min = Math.floor(timeDiff/60) //minute formula 
        console.log(`${"-".repeat(62)}${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}${"-".repeat(62)}`) //pad start will take two parameters one to add something at the begining and second is the value to be add
    },1000)
}
timer(time)

let roundNumber = 1;
let totalScore = 0;
let rounds = [{
    num1: 0,
    operator: "",
    num2: 0,
    answer: 0,
    wrong1: 0,
    wrong2: 0, 
    wrong3: 0
}]
let currentRound = [];

function getRandomNumber(max) {
    let random = Math.floor(Math.random() * Math.floor(max));
    return random + 1;
  }

  function shuffleArray(arr) {
    return arr.sort(function (a, b) { return Math.random() - 0.5 })
  }

 function generateProblemAndSolutions(){

    const opSymbol = getRandomNumber(4);
    let num1 = 0;
    let num2 = 0;
    let operator = "";
    let answer = 0;
    let randomMax = 99;
    
    //generate random numbers and their solution; use randomMax for the next function to generate more reasonable wrong solutions
    
    switch(opSymbol){
        case 1:
            operator = "*";
            num1 = getRandomNumber(10);
            num2 = getRandomNumber(10);
            answer = num1 * num2;
            randomMax = 99;
            break;
        case 2:
            operator = "+";
            num1 = getRandomNumber(99);
            num2 = getRandomNumber(99);
            answer = num1 + num2;
            randomMax = 199;
            break;
        case 3:
            operator = "/";
            num2 = getRandomNumber(9);
            answer = getRandomNumber(9);
            num1 = answer * num2;
            randomMax = 10;
            break;
         case 4:
            operator = "-";
            num2 = getRandomNumber(99);
            answer = getRandomNumber(99);
            num1 = num2 + answer;
            randomMax = 99;
            break;
    }
    

    //array used to make sure none of the fake solutions == one of the numbers or the actual answer
    const uniqueArr = [num1, num2, answer];
    
     for(let i = 0; i < 3; i++){
        let wrongNum = getRandomNumber(randomMax);
        if(uniqueArr.indexOf(wrongNum) === -1){
            uniqueArr.push(wrongNum);
        }else{
          i--;
        }
    }

    //store everything in a round
    const round = {
        num1: num1,
        operator: operator, 
        num2: num2,
        answer: answer,
        wrong1: uniqueArr[3],
        wrong2: uniqueArr[4],
        wrong3: uniqueArr[5]
    }

    return round;
}


function newRound(roundNumber, totalScore){

    currentRound = generateProblemAndSolutions();
    let possibleAnswers = shuffleArray([currentRound.answer, currentRound.wrong1, currentRound.wrong2, currentRound.wrong3]);
    const expression = document.querySelector('.expression');
    const score = document.querySelector('.currentScore');
    const round = document.querySelector('.currentProblem');
    const answerBoxes = document.querySelectorAll('li');
    let i = 0;

    expression.innerText = currentRound.num1 + " " + currentRound.operator + " " + currentRound.num2;
    round.innerText = roundNumber;
    score.innerText = totalScore;

    answerBoxes.forEach((element)=>{

        element.innerText = possibleAnswers[i];
        i++;
  
      })

}


function rightOrWrong(userAnswer){

    let answer = currentRound.answer;

    if(userAnswer.innerText == answer){
        totalScore++;
    }
    
    roundNumber++;

    if(roundNumber < 10){
        newRound(roundNumber, totalScore);
    }else{
        const score = document.querySelector('.currentScore');
        score.innerText = totalScore;
        const round = document.querySelector('.currentProblem');
        round.innerText = roundNumber;
        const hiddenStuff = document.querySelectorAll('.toggle-vis');
        hiddenStuff.forEach((element) => {
            element.classList.add('hidden')
        })   
    }
}


  document.addEventListener('DOMContentLoaded', () => {

    newRound(roundNumber, totalScore);

    let answerButtons = document.querySelectorAll('li');

    answerButtons.forEach((button) => {
        button.addEventListener('click', (event) =>{
            rightOrWrong(event.target)
        })
    })

    let resetButton = document.getElementById('btnStartOver');

    resetButton.addEventListener('click', (event) => {
        
        const hiddenTest = document.querySelector('.toggle-vis');

        if(hiddenTest.classList.contains('hidden')){
            const hiddenStuff = document.querySelectorAll('.toggle-vis')
            hiddenStuff.forEach((element) => {
                element.classList.remove('hidden')
                roundNumber = 1;
                totalScore = 0;
                newRound(roundNumber, totalScore)
            })}

        roundNumber = 1;
        totalScore = 0;
        newRound(roundNumber, totalScore)
        
    }

    )})







   


  
    
      
    
    
   










  
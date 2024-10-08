
const questions=[
    {
        question: "Who is the prime minister of India?",
        answers:[
            {text:'Venkaiah Naidu', correct:false},
            {text:'Draupadi Murmu', correct:false},
            {text:'Narendra Modi', correct:true},
            {text:'Rahul Gandhi', correct:false},
        ]
    },

    {
        question: 'What is the capital of Spain?',
        answers:[
            {text:'Madrid', correct:true},
            {text:'Barcelona', correct:false},
            {text:'Paris', correct:false},
            {text:'Rome', correct:false},
        ]
    },

    {
        question: 'Name The Biggest Island In The World.',
        answers:[
            {text:'Greenland', correct:true},
            {text:'Australia', correct:false},
            {text:'Madagascar', correct:false},
            {text:'Sri Lanka', correct:false},
        ]
    },
    {
        question: 'What does OS stand for in computer science?',
        answers:[
            {text:'Open Software', correct:false},
            {text:'Open source', correct:false},
            {text:'Operating system', correct:true},
            {text:' Order of Significance', correct:false},
        ]
    },
    

    {
        question: 'Ghoomar is the folk dance of which state?',
        answers:[
            {text:'Gujarat', correct:false},
            {text:'Rajasthan', correct:true},
            {text:'Haryana', correct:false},
            {text:'Madhya Pradesh', correct:false},
        ]
    },

    {
        question: 'What does a thermometer measure?',
        answers:[
            {text:'Heat', correct:false},
            {text:'Temperature', correct:true},
            {text:'Blood pressure', correct:false},
            {text:'Humidity', correct:false},
        ]
    },

    {
        question: 'Which land animal is the fastest?',
        answers:[
            {text:'Deer', correct:false},
            {text:'Cheetah', correct:true},
            {text:'Horse', correct:false},
            {text:'Tiger', correct:false},
        ]
    },

    {
        question: 'Hottest planet in the solar system.',
        answers:[
            {text:'Mars', correct:false},
            {text:'Mercury', correct:false},
            {text:'Venus', correct:true},
            {text:'Earth', correct:false},
        ]
    },

    {
        question: 'In a website, www stands for?',
        answers:[
            {text:'World Wide Website', correct:false},
            {text:'Whole world Web', correct:false},
            {text:'Wide world Web', correct:false},
            {text:'World Wide Web', correct:true},
        ]
    },

    {
        question: 'Which country is called the Land of White Elephant?',
        answers:[
            {text:'Thailand', correct:true},
            {text:'South Africa', correct:false},
            {text:'Indonesia', correct:false},
            {text:'India', correct:false},
        ]
    }


];

const questionElement= document.getElementById("question");
const answerButton= document.getElementById("answers");
const nextbtn=document.getElementById("next");
const gifimage=document.getElementById("gif-img");
const gifimage2=document.getElementById("gif-img2");



let currentQuesIndex=0;
let score=0;
let playerName = "";

document.getElementById("container").style.display="none";
document.getElementById("leaderboardBtn").style.display="none";

function start(){
    document.getElementById("stbtn").onclick=function(){
        playerName = document.getElementById("player_name").value; // Get the player's name
        console.log(playerName)
        if (playerName.trim() === "") {
            alert("Please enter your name to start the quiz!");
        } else {
        startQuiz();
        document.getElementById("container").style.display="block";
        document.getElementById("greeting").style.display="none";
        document.getElementById("player_name").style.display = "none";
        document.getElementById("stbtn").style.display="none";
        }

    }
}


start();


function startQuiz(){
    
    currentQuesIndex=0;
    score=0;
    nextbtn.innerHTML="Next";
    showQues();
}


function showQues(){
    resetState();

    let currentQues= questions[currentQuesIndex];
    let quesNo= currentQuesIndex+1;
    questionElement.innerHTML= quesNo+". "+currentQues.question;

    currentQues.answers.forEach(answer=>{
        const button= document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAns);

    });
}


function resetState(){
    nextbtn.style.display="none";
    gifimage.style.display="none";
    gifimage2.style.display="none";
    document.getElementById("leaderboardBtn").style.display="none";


    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAns(e){
    const selectedBtn= e.target;
    const isCorrect= selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display= "block";

    }


function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    if(score>=7){
        gifimage.style.display= "block";
    }
    else {
        gifimage2.style.display= "block";
        
    }
    console.log(playerName + ":" + score);
     // Send score to the server
     fetch('http://localhost:3500/save-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerName, score })
    })
    .then(response => {
        if (response.ok) {
            console.log("Score saved successfully.");
        } else {
            console.error("Failed to save score. Status:", response.status);
        }
    })

    .catch(error => {
        console.error("Error saving score:", error);
    });
    
    nextbtn.innerHTML="Play Again";
    nextbtn.style.display= "block";
    document.getElementById("leaderboardBtn").style.display="block";


}


function displayScores() {
    fetch('http://localhost:3500/scores')
        .then(response => response.json())
        .then(scores => {
            const container = document.getElementById('container');
            container.innerHTML = ''; // Clear existing content

            //to create heading
            const heading = document.createElement('h1');
            heading.textContent = 'Scores';
            heading.style.textAlign = 'center';
            container.appendChild(heading);

            //to create table
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    ${scores.map(score => `
                        <tr>
                            <td>${score.player_name}</td>
                            <td>${score.score}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            container.appendChild(table);
        })
        .catch(error => {
            console.error("Error fetching scores:", error);
        });
}

document.getElementById('leaderboardBtn').addEventListener('click', () => {
    displayScores();
});



function handleNextButton(){
        currentQuesIndex++;
        if(currentQuesIndex<questions.length){
            showQues();
        }
        else{
            showScore();
        }

}

nextbtn.addEventListener("click",()=>{
        if(currentQuesIndex<questions.length){
            handleNextButton();
        }
        else{
            startQuiz();
        }

})

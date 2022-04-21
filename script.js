//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const home_screen = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

//Start button on the homepage.
start_btn.onclick = ()=>{
    //quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0);
    info_box.classList.add("activeInfo");
    home_screen.style.visibility='hidden';
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    home_screen.style.visibility='visible';
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
}

let que_count = 0;
let que_numb = 1;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    que_count = 0;
    que_numb = 1;
    showQuetions(que_count); //calling showQestions function
    questionCounter(que_numb); //passing que_numb value to questionCounter
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
bottom_ques_counter.innerHTML = '<span><p>'+ 1 +'</p> of <p>'+ questions.length +'</p> Questions</span>';

// if Next button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        questionCounter(que_numb); //passing que_numb value to questionCounter
        next_btn.classList.remove("show"); //hide the next button
    }else{
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
        + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for(let i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//Option Selected - Quiz Window
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';

function optionSelected(answer){
    let userAns = answer.textContent; //getting user selected option
    const allOptions = option_list.children.length; //getting all option items

    let key = "answer_" + questions[que_count].numb;
    localStorage.setItem(key, userAns);
    //answer.classList.add("correct");
    answer.setAttribute("class", "option correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);

    for(let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

//Results Window
function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    adviceLocation();
}

//Question Counter - Footer Quiz Window
function questionCounter(index){
    let questionNumber = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = questionNumber;
}

let countryOne = {name: "Turkey", continent: "Europe", mood: "Adventure"};
let countryTwo = {name: "Belgium", continent: "Europe", mood: "Relax"};
let countryThree = {name: "Brazil", continent: "South America", mood: "Adventure"};

let countries = [];
countries.push(countryOne);
countries.push(countryTwo);
countries.push(countryThree);

function random_item(items)
{
    return items[Math.floor(Math.random()*items.length)];
}

function adviceLocation() {
    let answer1 = localStorage.getItem("answer_1");
    let answer2 = localStorage.getItem("answer_2");
    let answer3 = localStorage.getItem("answer_3");
    let answer4 = localStorage.getItem("answer_4");
    let answer5 = localStorage.getItem("answer_5");

    let possibleCountries = countries
        .filter(country => String(country.continent) === answer3)
        .filter(country => String(country.mood) === answer5);
    console.log(possibleCountries);

    //localStorage.setItem(possibleCountries[0].name)
    let randomCountry = random_item(possibleCountries);
    //console.log(randomCountry.name);
    alert(JSON.stringify(randomCountry.name));
}
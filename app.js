var allQuestions = [{
  question: "Inside which HTML element do we put the JavaScript?",
  options: ["scripting", "javascript", "js", "script"],
  answer: "script"
}, {
  question: "Where is the correct place to insert a JavaScript?",
  options: ["head", "body", "head and body", "none of above"],
  answer: "head and body"
}, {
  question: "How can you get the type of arguments passed to a function?",
  options: ["using typeOf operator", "using getType function", "Both of the above", "None of the above"],
  answer: "using typeOf operator"
}, {
  question: "Which built-in method returns the character at the specified index?",
  options: ["characterAt()", "getCharAt()", "charAt()", "None of the above"],
  answer: "charAt()"
}, {
  question: "Which built-in method reverses the order of the elements of an array?",
  options: ["changeOrder(order)", "reverse()", "sort(order)", "None of the above"],
  answer: "reverse()"
}, {
  question: "Which of the following function of String object returns the primitive value of the specified object?",
  options: ["toLocaleUpperCase()", "toUpperCase()", "toString()", "valueOf()"],
  answer: "valueOf()"
}, {
  question: "Which of the following function of Array object removes the last element from an array and returns that element?",
  options: ["pop()", "push()", "join()", "map()"],
  answer: "pop()"
}, {
  question: "Which of the following function of Array object represents the source code of an object?",
  options: ["toSource()", "splice()", "toString()", "unshift()"],
  answer: "toSource()"
}, {
  question: "Javascript is a _____ language.",
  options: ["Programming", "Application", "Scripting", "None of the above"],
  answer: "Programming"
}, {
  question: "JavaScript code is written inside file having extension?",
  options: [".jvs", ".js", ".jsc", ".javascript"],
  answer: ".js"
}];
var num = -1;
function disabled(x) {
  for (var i = 0; i <= 3; i++) {
    document.getElementsByTagName("button")[i].disabled = x

  }
}
function nextBtn(x) {
  document.getElementById("next").disabled = x
}
function start() {
  for (var i = 0; i <= 3; i++) {
    document.getElementsByTagName("button")[i].removeAttribute("class");
  }
  document.getElementsByTagName("h2")[0].removeAttribute("class");
  var next = document.getElementById("next");
  next.innerText = "Next";
  next.style.fontSize = '25px';
  document.getElementById("next").disabled = true;
  next.removeAttribute("onclick");
  next.setAttribute("onclick", "nextQue()");
}
  function clrRemover() {
    for (var i = 0; i <= 3; i++) {
      document.getElementsByTagName("button")[i].removeAttribute("class")
    }
  }
function clrChanger(x) {
  document.getElementsByTagName("button")[x].className = "clicked";
}

var arr = [];
function getId(Ques) {
    arr.push(Ques)
}

function clrPrev(){
  document.getElementById(arr[num]).className = "clicked";
}

var next = 0;

function nextQue() {
  num++;
  nextBtn(true)
  clrRemover()
  if (num >= 8) {
    document.getElementById("next").innerText = "finish";
  }
  if (num >= 9) {
    for (var i = 0; i <= 5; i++) {
      document.getElementsByTagName("button")[i].style.display = "none";
    }
    document.getElementsByTagName("h2")[0].style.display = "none";
    document.getElementById("end").append("You Scored " + score + "/10")
    document.getElementById("end").style.color = "white";
    document.getElementById("reload").style.display = "flex";
    return;
  }
  if (num === 1) {
    document.getElementById("prev").removeAttribute("class");
  }
  disabled(false)
  document.getElementById("questions").innerText = allQuestions[num].question;
  document.getElementById("option1").innerText = allQuestions[num].options[0];
  document.getElementById("option2").innerText = allQuestions[num].options[1];
  document.getElementById("option3").innerText = allQuestions[num].options[2];
  document.getElementById("option4").innerText = allQuestions[num].options[3];
  if(next < num + 1){
    disabled(false)
  }
  else{
    clrPrev()
    nextBtn(false)
    disabled(true)
  }

}


function prevQue() {
  num--;
  clrRemover()
  clrPrev()
  nextBtn(false)
  disabled(true)
  if (num <= 0) {
    document.getElementById("prev").setAttribute("class", "hide");
  }
  if (num <= -1) {
    num++
  }
  document.getElementById("questions").innerText = allQuestions[num].question;
  document.getElementById("option1").innerText = allQuestions[num].options[0];
  document.getElementById("option2").innerText = allQuestions[num].options[1];
  document.getElementById("option3").innerText = allQuestions[num].options[2];
  document.getElementById("option4").innerText = allQuestions[num].options[3];
}

var score = 0;

function button1() {
  next++;
  clrChanger(0)
  nextBtn(false)  
  getId("option1")
  disabled(true);
  var text = document.getElementById("option1").innerText;
  if (text === allQuestions[num].answer) {
    score++;
  }
}
function button2() {
  next++;
  clrChanger(1)
  nextBtn(false)
  getId("option2")
  disabled(true);  
  var text = document.getElementById("option2").innerText;
  if (text === allQuestions[num].answer) {
    score++;
  }
}
function button3() {
  next++;
  clrChanger(2)
  nextBtn(false)
  getId("option3")
  disabled(true); 
  var text = document.getElementById("option3").innerText;
  if (text === allQuestions[num].answer) {
    score++;
  }
}
function button4() {
  next++;
  clrChanger(3)
  nextBtn(false)
  getId("option4")
  disabled(true);
  var text = document.getElementById("option4").innerText;
  if (text === allQuestions[num].answer) {
    score++;
  }
}
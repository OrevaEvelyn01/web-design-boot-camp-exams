const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30 * 60;
let selectedAnswers = {};
let wrongAnswers = [];

// Questions Array (JS + HTML + CSS)
// ---- Questions ----
const questions = [
  { question: "What does HTML stand for?", options: ["High Tech Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Making Language"], answer: "Hyper Text Markup Language" },
  { question: "Which of these is used for a paragraph?", options: ["<para>", "<h1>", "<p>", "<pg>"], answer: "<p>" },
  { question: "Which tag makes the biggest heading?", options: ["<h1>", "<h6>", "<title>", "<head>"], answer: "<h1>" },
  { question: "Which of these tags shows a picture?", options: ["<photo>", "<img>", "<src>", "<pic>"], answer: "<img>" },
  { question: "What attribute tells the browser where to find the image file?", options: ["href", "src", "alt", "link"], answer: "src" },
  { question: "Which tag makes a link?", options: ["<a>", "<link>", "<button>", "<href>"], answer: "<a>" },
  { question: "What does the href attribute do in a link?", options: ["Tells the link where to go", "Adds color to the link", "Makes text bold", "Shows an image"], answer: "Tells the link where to go" },
  { question: "Which of these is a self-closing tag?", options: ["<h1>", "<p>", "<img>", "<div>"], answer: "<img>" },
  { question: "Which tag is used to collect information from users?", options: ["<table>", "<form>", "<data>", "<label>"], answer: "<form>" },
  { question: "The <label> tag is used to:", options: ["Name or describe an input box", "Create a paragraph", "Insert an image", "Make text italic"], answer: "Name or describe an input box" },
  { question: "Which of these creates a bulleted list?", options: ["<ol>", "<li>", "<ul>", "<list>"], answer: "<ul>" },
  { question: "Which of these creates a numbered list?", options: ["<ul>", "<ol>", "<num>", "<list>"], answer: "<ol>" },
  { question: "Which CSS property changes the color of text?", options: ["background-color", "font-size", "color", "border-color"], answer: "color" },
  { question: "What CSS property changes the size of text?", options: ["text-size", "font-size", "size", "heading-size"], answer: "font-size" },
  { question: "Which CSS property adds space inside a box, around the content?", options: ["margin", "border", "padding", "space"], answer: "padding" },
  { question: "Which CSS property adds space outside a box, around the border?", options: ["padding", "margin", "outline", "spacing"], answer: "margin" },
  { question: "Which CSS property creates rounded corners?", options: ["border-style", "border-radius", "corner-round", "radius"], answer: "border-radius" },
  { question: "Which CSS property adds a shadow to a box?", options: ["box-shadow", "text-shadow", "shadow-box", "outline"], answer: "box-shadow" },
  { question: "Which CSS property is used to change the background of a page?", options: ["background", "bgcolor", "back-color", "color"], answer: "background" },
  { question: "Which type of display takes up the whole line?", options: ["block", "inline", "inline-block", "flex"], answer: "block" },
  { question: "Which type of display puts items side by side but keeps their width and height?", options: ["block", "inline", "inline-block", "relative"], answer: "inline-block" },
  { question: "Which position moves an element but still follows the page when scrolling?", options: ["relative", "absolute", "fixed", "sticky"], answer: "sticky" },
  { question: "Which HTML tag is used to type a long message box in a form?", options: ["<textbox>", "<textarea>", "<input>", "<label>"], answer: "<textarea>" },
  { question: "What is a media query used for?", options: ["To add music to a page", "To change styles on different screen sizes", "To insert images in HTML", "To make animations"], answer: "To change styles on different screen sizes" },
  { question: "Which gradient makes colors flow in a straight line?", options: ["rainbow-gradient", "circle-gradient", "linear-gradient", "box-gradient"], answer: "linear-gradient" }
];



// Start Quiz
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  startTimer();
  loadQuestion(currentQuestion);
});

// Load Question
function loadQuestion(index) {
  let q = questions[index];
  questionEl.textContent = `${index + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    let btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");

    if (selectedAnswers[index] === option) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => selectAnswer(index, option, btn));
    optionsEl.appendChild(btn);
  });
}

// Select Answer
function selectAnswer(qIndex, answer, btn) {
  selectedAnswers[qIndex] = answer;
  Array.from(optionsEl.children).forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

// Next Button
nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    endQuiz();
  }
});

// Back Button
backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

// Timer
function startTimer() {
  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// End Quiz
function endQuiz() {
  clearInterval(timer);
  quizContainer.style.display = "none";

  score = 0;
  wrongAnswers = [];

  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.answer) {
      score++;
    } else {
      wrongAnswers.push({ question: q.question, correct: q.answer, chosen: selectedAnswers[i] });
    }
  });

  resultEl.innerHTML = `<h2>Your Score: ${score * 2}/${questions.length * 2} </h2>`;

 if (wrongAnswers.length > 0) {
  resultEl.innerHTML += "<h3>Questions you missed:</h3>";
  wrongAnswers.forEach(w => {
    let wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <h4>${w.question}</h4>
      <p>Correct Answer: <span class="correct"></span></p>
      <p class= "wrong" >Your Answer: <span class="chosen"></span></p>
    `;

    // Fill in with textContent so tags like <p> show literally
    wrapper.querySelector(".correct").textContent = w.correct;
    wrapper.querySelector(".chosen").textContent = w.chosen || "No Answer";

    resultEl.appendChild(wrapper);
  });
}

  resultEl.innerHTML += `<button onclick="location.reload()">Restart Exam</button>`;
  resultEl.style.display = "block";
}



// resultEl.innerHTML += `<li>${w.question}<br>Correct Answer: ${w.correct} | Your Answer: ${w.chosen || "No Answer"}</li>`;
//     });
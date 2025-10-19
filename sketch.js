let sounds = [];
let questionButton, answerButton, nextButton;
let player, fileName;
let answerRevealed = false;

// prevent 3+ repeats
let lastChoice = -1;
let secondLastChoice = -1;

// list of file names
const files = [
  "Bb4 AM Saw.mp3", "Bb4 AM Sin.mp3", "Bb4 AM Sq.mp3",
  "Bb4 AM Sweep Saw.mp3", "Bb4 AM Sweep Sin.mp3", "Bb4 AM Sweep Sq.mp3", "Bb4 AM Sweep Tri.mp3", "Bb4 AM Tri.mp3",
  "C3 AM Saw.mp3", "C3 AM Sin.mp3", "C3 AM Sq.mp3",
  "C3 AM Sweep Saw.mp3", "C3 AM Sweep Sin.mp3", "C3 AM Sweep Sq.mp3", "C3 AM Sweep Tri.mp3", "C3 AM Tri.mp3",
  "D1 AM Saw.mp3", "D1 AM Sin.mp3", "D1 AM Sq.mp3",
  "D1 AM Sweep Saw.mp3", "D1 AM Sweep Sin.mp3", "D1 AM Sweep Sq.mp3", "D1 AM Sweep Tri.mp3", "D1 AM Tri.mp3",
  "Bb4 FM Saw.mp3", "Bb4 FM Sin.mp3", "Bb4 FM Sweep Saw.mp3", "Bb4 FM Sweep Sin.mp3", "Bb4 FM Sweep Tri.mp3", "Bb4 FM Tri.mp3",
  "C3 FM Saw.mp3", "C3 FM Sin.mp3", "C3 FM Sweep Saw.mp3", "C3 FM Sweep Sin.mp3", "C3 FM Sweep Tri.mp3", "C3 FM Tri.mp3",
  "D1 FM Saw.mp3", "D1 FM Sin.mp3", "D1 FM Sweep Saw.mp3", "D1 FM Sweep Sin.mp3", "D1 FM Sweep Tri.mp3", "D1 FM Tri.mp3"
];

function preload() {
  for (let i = 0; i < files.length; i++) {
    sounds[i] = loadSound('assets/' + files[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);

  // Title
  textSize(36);
  text("Waveform AM/FM Practice", width/2, height/9);

  // Subtitle
  textSize(20);
  text("AM = Amplitude Modulation, FM = Frequency Modulation", width/2, height/9 + 40);

  // Layout variables
  let rowH = 60;
  let col1X = width/4;
  let col2X = width/2;
  let startY = height/3;

  // QUESTION row
  createDiv("QUESTION")
    .position(col1X - 150, startY)
    .style("color","white").style("font-size","24px");
  questionButton = createButton("PLAY");
  styleButton(questionButton, col2X, startY, "#00E938");
  questionButton.mousePressed(toggleQuestion);

  // ANSWER row
  createDiv("ANSWER")
    .position(col1X - 150, startY + rowH)
    .style("color","white").style("font-size","24px");
  answerButton = createButton("REVEAL");
  styleButton(answerButton, col2X, startY + rowH, "#03A9F4");
  answerButton.mousePressed(showAnswer);

  // NEXT QUESTION button
  nextButton = createButton("NEXT QUESTION");
  nextButton.position(width/2 - 100, startY + rowH*2 + 20);
  nextButton.size(200, rowH);
  nextButton.style("font-size","20px");
  nextButton.style("background-color","#FFC107");
  nextButton.mousePressed(nextQuestion);

  // Pick first sound
  chooseSound();
}

function styleButton(btn, x, y, color) {
  btn.position(x, y);
  btn.size(120, 50);
  btn.style("font-size","20px");
  btn.style("background-color", color);
  btn.style("color","#000");
}

function toggleQuestion() {
  if (player && player.isPlaying()) {
    player.stop();
    resetButton(questionButton, "PLAY", "#00E938");
  } else {
    stopAll();
    player.amp(0.8);
    player.loop();
    questionButton.html("STOP").style("background-color","#F80F05");
  }
}

function resetButton(btn, label, color) {
  btn.html(label);
  btn.style("background-color", color);
}

function stopAll() {
  if (player) player.stop();
  resetButton(questionButton, "PLAY", "#00E938");
}

function showAnswer() {
  answerButton.html(fileName);
  answerRevealed = true;
}

function nextQuestion() {
  stopAll();
  chooseSound();
  resetButton(answerButton, "REVEAL", "#03A9F4");
  answerRevealed = false;
}

function chooseSound() {
  let choice;
  do {
    choice = int(random(sounds.length));
  } while (choice === lastChoice && choice === secondLastChoice);

  secondLastChoice = lastChoice;
  lastChoice = choice;

  player = sounds[choice];

  // Set fileName to AM or FM based on the filename
  if (files[choice].includes("AM")) fileName = "AM";
  else if (files[choice].includes("FM")) fileName = "FM";
  else fileName = "Unknown";
}

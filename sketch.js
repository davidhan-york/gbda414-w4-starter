let classifier;
let img;
let label = "Loading MobileNet…";
let confidence = 0;

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("images/image-1.jpg");
}

function setup() {
  createCanvas(640, 480);
  classifier.classify(img, gotResults);
}

function gotResults(results) {
  console.log(results);
  label = results[0].label;
  confidence = results[0].confidence;
}

function draw() {
  background(235);
  image(img, 0, 0, width, height);

  noStroke();
  fill(0, 175);
  rect(0, height - 82, width, 82);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(label, width / 2, height - 52);
  textSize(16);
  text("confidence: " + nf(confidence, 0, 2), width / 2, height - 22);
}

let classifier;
// This variable will store the MobileNet image classifier.

let img;
// This variable will store the image we want the model to analyze.

let label = "Loading MobileNet…";
// This text appears before the model finishes classifying the image.

let confidence = 0;
// This will store the model's confidence score.

function preload() {
  // preload() runs before setup().
  // It is used for loading important files before the sketch starts.

  classifier = ml5.imageClassifier("MobileNet");
  // Create a MobileNet classifier.
  // MobileNet is a pretrained image-classification model.

  // THIS IS THE LINE YOU WANT TO CHANGE
  img = loadImage("images/image-2.jpg");
  // Load the image file that we want to classify.
  // The path means there should be an image inside an images folder.
}

function setup() {
  createCanvas(640, 480);
  // Create a 640 by 480 pixel canvas.

  classifier.classify(img, gotResults);
  // Ask the model to classify the image.
  // When the result is ready, run the gotResults() function.
}

function gotResults(results) {
  console.log(results);
  // Print the full results array to the console so it can be inspected.

  label = results[0].label;
  // Use the top result's label as the displayed prediction.

  confidence = results[0].confidence;
  // Use the top result's confidence score.
}

function draw() {
  background(235);
  // Clear the canvas with a light gray background.

  image(img, 0, 0, width, height);
  // Draw the image so it fills the canvas.

  noStroke();
  // Remove the outline from the rectangle below.

  fill(0, 175);
  // Set a semi-transparent black fill.

  rect(0, height - 82, width, 82);
  // Draw a dark bar near the bottom of the canvas
  // so the prediction text is easier to read.

  fill(255);
  // Switch the fill colour to white for the text.

  textAlign(CENTER, CENTER);
  // Align the text from its center point.

  textSize(24);
  text(label, width / 2, height - 52);
  // Display the predicted label.

  textSize(16);
  text("confidence: " + nf(confidence, 0, 2), width / 2, height - 22);
  // Display the confidence score.
  // nf(confidence, 0, 2) formats the number to 2 decimal places.
}

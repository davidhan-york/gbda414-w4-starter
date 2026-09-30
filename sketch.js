/*
  WEEK 4 COMMENTED ml5.js + p5.js EXAMPLE
  ---------------------------------------
  This sketch demonstrates a very common machine-learning workflow in creative coding:

  1. Get an input image (in this case, a webcam feed).
  2. Send that image to a pretrained model.
  3. Receive the model's prediction.
  4. Display the prediction to the user.
  5. Repeat.

  This example uses MobileNet through ml5.js.

  WHAT IS MOBILENET?
  ------------------
  MobileNet is a pretrained image-classification model.
  It has already been trained on a very large dataset of labelled images.
  That means it has learned patterns that help it guess what appears in an image.

  In this sketch, MobileNet does NOT truly "understand" the webcam image like a human does.
  Instead, it compares what it sees to patterns it learned during training and returns
  a likely label plus a confidence score.

  IMPORTANT IDEA FOR STUDENTS:
  - Training happened in the past, before this class uses the model.
  - Inference is what happens now, when we pass a new webcam frame into the model.
  - This sketch is an inference example, not a training example.
*/

// ------------------------------
// GLOBAL VARIABLES
// ------------------------------
// These variables are declared outside of setup() and draw()
// so that multiple functions in the sketch can access them.

let video;
// "video" will store the webcam capture coming from the user's camera.
// In p5, createCapture(VIDEO) gives us a live HTML video element we can draw onto the canvas.

let classifier;
// "classifier" will store the MobileNet image classifier created by ml5.
// Once the model finishes loading, we can use classifier.classify(...) to make predictions.

let label = 'Loading model...';
// "label" stores the current text prediction from the model.
// We give it an initial value so the screen has useful text before the first prediction arrives.

let confidence = 0;
// "confidence" stores the model's confidence score for the current prediction.
// This is usually a number between 0 and 1.
// Later we will convert it to a percentage for display.

// ------------------------------
// SETUP
// ------------------------------
// setup() runs ONCE when the sketch begins.
// Use it for things that should happen a single time at the start:
// creating the canvas, starting the webcam, loading models, etc.

function setup() {
  createCanvas(640, 480);
  // createCanvas() creates the drawing surface for the sketch.
  // The canvas is 640 pixels wide and 480 pixels tall.

  video = createCapture(VIDEO);
  // This asks the browser for access to the webcam and stores the live feed in "video".
  // The user will usually have to grant permission before the camera works.

  video.size(width, height);
  // Make the captured webcam feed match the size of our canvas.
  // width and height are built-in p5 variables that refer to the canvas dimensions.

  video.hide();
  // By default, the captured video appears as a separate HTML element on the page.
  // We hide that raw HTML video because we want to draw it ourselves onto the p5 canvas.
  // This gives us much more control over how it looks.

  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
  // This line creates an image classifier using the pretrained MobileNet model.
  // Two key things are happening here:
  // 1. ml5.imageClassifier(...) loads the model.
  // 2. modelLoaded is a callback function that runs AFTER the model is ready.
  //
  // Why use a callback?
  // Loading a machine learning model takes time.
  // JavaScript does not pause and wait automatically.
  // Instead, we tell it: "When the model is ready, run modelLoaded()."
}

// ------------------------------
// DRAW
// ------------------------------
// draw() runs over and over again, many times per second.
// Think of it as the sketch's continuous loop.
// Anything that should update live on screen usually goes here.

function draw() {
  background(0);
  // Clear the canvas each frame with a black background.
  // Without this, old drawings would pile up and smear together.

  image(video, 0, 0, width, height);
  // Draw the live webcam image onto the canvas.
  // Arguments mean: image(source, x, y, width, height)

  fill(0, 180);
  // Set a semi-transparent black fill colour.
  // The last number (180) is the alpha value, which controls transparency.
  // This helps us draw readable text over the camera image.

  noStroke();
  // Remove outlines from shapes.

  rect(0, height - 90, width, 90);
  // Draw a translucent rectangle near the bottom of the canvas.
  // This creates a text panel so the prediction is easier to read.

  fill(255);
  // Switch the fill colour to white for the text.

  textSize(24);
  // Set the size for the main prediction label.

  textAlign(LEFT, TOP);
  // Position text relative to its top-left corner.

  text(`Prediction: ${label}`, 20, height - 75);
  // Display the current label on the canvas.
  // Template literals with backticks let us insert variables inside a string using ${...}

  textSize(18);
  // Use a smaller size for the confidence line.

  text(`Confidence: ${nf(confidence * 100, 0, 2)}%`, 20, height - 38);
  // Display the confidence score as a percentage.
  // confidence * 100 turns a decimal like 0.87 into 87.
  // nf(..., 0, 2) formats the number to 2 decimal places.
}

// ------------------------------
// MODEL LOADED CALLBACK
// ------------------------------
// This function runs once the MobileNet model has finished loading.
// At this point, we can safely start classifying images.

function modelLoaded() {
  label = 'Model loaded. Waiting for prediction...';
  // Update the interface so the user knows the model is ready.

  classifyVideo();
  // Start the first classification.
  // We only start after the model is ready.
}

// ------------------------------
// CLASSIFY VIDEO
// ------------------------------
// This function sends the current webcam frame to MobileNet.
// The model examines the image and eventually returns results.

function classifyVideo() {
  classifier.classify(video, gotResult);
  // classifier.classify(...) performs inference.
  // That means the model is taking a NEW input image (the webcam frame)
  // and applying the patterns it learned during training.
  //
  // The second argument, gotResult, is another callback.
  // When the prediction is finished, gotResult(error, results) will run.
}

// ------------------------------
// GOT RESULT CALLBACK
// ------------------------------
// This function receives the model's output.
// It runs every time a classification is completed.

function gotResult(error, results) {
  if (error) {
    console.error(error);
    // If something goes wrong, print the error in the browser console.
    // This is useful for debugging.

    label = 'An error occurred. Check the console.';
    confidence = 0;
    return;
    // Stop this function early if there was an error.
  }

  // results is usually an array of predictions.
  // For a simple image classifier, results[0] is the top prediction.
  // That means it is the model's best guess.
  label = results[0].label;
  confidence = results[0].confidence;

  // After we receive one result, we immediately ask for another one.
  // This creates a loop of ongoing classification:
  // webcam frame -> prediction -> display -> classify again.
  //
  // Conceptually, this is an example of a live inference loop.
  // The model keeps interpreting new visual input from the world in real time.
  classifyVideo();
}

/*
  TEACHING NOTES / KEY IDEAS TO POINT OUT
  ---------------------------------------
  1. p5.js and ml5.js are doing different jobs.
     - p5.js: drawing, video, text, interaction, animation
     - ml5.js: machine-learning model access

  2. The model is pretrained.
     Students are not teaching MobileNet new categories here.
     They are using a model someone else already trained.

  3. Inference is not understanding.
     The model returns a likely label based on learned patterns.
     That label can be wrong, weird, overly broad, or contextually misleading.

  4. Confidence is not the same thing as truth.
     A higher score means the model currently prefers one guess over others.
     It does not automatically mean the model is actually correct.

  5. The program relies on callbacks because machine learning operations take time.
     The browser continues running while waiting for the model or a prediction.

  6. The repeated classifyVideo() call creates a feedback rhythm.
     The sketch is always looking, predicting, and updating.
     That makes it a good bridge to discussions about inference, action, and consequence.
*/

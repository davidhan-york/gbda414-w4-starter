# GBDA 414 Week 4 — MobileNet Image Classifier

## Workshop goal
Run a pretrained image classifier locally, publish the working project to GitHub, change one image, and push the second version.

## Run the project
1. Open this entire folder in VS Code.
2. Open `index.html`.
3. Click **Go Live** or right-click the file and choose **Open with Live Server**.
4. Wait for MobileNet to download and classify `images/image-1.jpg`.

Do not open `index.html` by double-clicking it. The local server avoids browser restrictions when loading files and models. An internet connection is required for the p5.js, ml5.js, and model downloads.

## First GitHub version
1. Open **Source Control** in VS Code.
2. Select **Initialize Repository** if required.
3. Stage the files, enter `Run starter image classifier`, and commit.
4. Choose **Publish to GitHub**, sign in, and create a private repository named `gbda414-mobilenet-workshop`.
5. Open the repository in a browser and verify that the files are present.

## Make one change
In `sketch.js`, replace:

```js
img = loadImage("images/image-1.jpg");
```

with:

```js
img = loadImage("images/image-2.jpg");
```

Save and check the browser. Live Server may refresh automatically.

## Second GitHub version
1. Return to Source Control and inspect the one-line diff.
2. Commit with `Test a second image`.
3. Choose **Sync Changes** or **Push**.
4. Refresh GitHub and verify that both commits appear.

## Troubleshooting
- Blank page: confirm Live Server is running and open Developer Tools → Console.
- Image missing: filenames and capitalization must match exactly.
- `ml5 is not defined`: check the internet connection and confirm the ml5 script appears before `sketch.js` in `index.html`.
- Git buttons missing: install Git, restart VS Code, and reopen the project folder.
- Git identity error: follow VS Code's prompt to set `user.name` and `user.email`.

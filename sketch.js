const density = 'Ñ@#W$9876543210?!abc;:+=-,._';
let zoro;

// preload is a p5 function that loads assets before the sketch is run
function preload() {
    zoro = loadImage("images/zoro.jpg");
    /*
    zoro is a table of pixels with 4 values per pixel (RGBA)
    [r1, g1, b1, a1, r2, g2, b2, a2, ...]
     ^  ^  ^  ^     ^  ^  ^  ^
     |  |  |  |     |  |  |  |
     We need to loop through the table and get the values for each pixel
     and get its mean value (r + g + b) / 3 (grayscale)
     and map it to the density string to get the character to display
     */
}

// setup is a p5 function that runs once at the beginning
function setup() {
    createCanvas(1300, 800); // canvas size
}

// draw is a p5 function that runs in a loop
function draw() {
    background(0); // black background

    let w = width / zoro.width;
    let h = height / zoro.height;
    zoro.loadPixels(); // p5 function to load pixels

    for (let i = 0; i < zoro.width; i++) {
        for (let j = 0; j < zoro.height; j++) {
            const pixelIndex = (i + j * zoro.width) * 4;
            const r = zoro.pixels[pixelIndex + 0];
            const g = zoro.pixels[pixelIndex + 1];
            const b = zoro.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;

            noStroke(); // no strokes
            fill(255);

            const len = density.length;
            const charIndex = floor(map(avg, 0, 255, len, 0));

            textSize(w);
            textAlign(CENTER, CENTER);
            text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5);
        }
    }
}
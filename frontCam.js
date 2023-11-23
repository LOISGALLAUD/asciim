const density = "Ñ@#W$9876543210?!abc;:+=-,._                ";
//const density = '       .:-i|=+%O#@'
// const density = '        .:░▒▓█';

let video;
let asciiDiv;

function setup() {
    noCanvas();
    video = createCapture(VIDEO);
    video.size(100, 63);
    asciiDiv = createDiv();
}

function draw() {
    video.loadPixels();
    let asciiImage = "";
    const len = density.length;
    for (let j = 0; j < video.height; j++) {
        for (let i = 0; i < video.width; i++) {
            const pixelIndex = (i + j * video.width) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3; // greyscale of the pixel
            const charIndex = floor(map(avg, 0, 255, len, 0));  // map the greyscale to the density string
            const c = density.charAt(charIndex); // get the character at that index
            if (c == " ") asciiImage += "&nbsp;"; // non-breaking space
            else asciiImage += c;
        }
        asciiImage += '<br/>';
    }
    asciiDiv.html(asciiImage);
}

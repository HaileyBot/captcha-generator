"use strict";

const fs = require("fs"),
  path = require("path"),
  Canvas = require("canvas");
  
const alternateCapitals = str => [...str].map((char, i) => char[`to${i % 2 ? "Upper" : "Lower"}Case`]()).join(""),
  randomText = () => alternateCapitals(Math.random().toString(36).replace(/[^a-z]+/gi, "").substring(0, 6));
  
class Captcha {
  constructor() {
    
    // Initialize canvas
    this._canvas = Canvas.createCanvas(200, 200);
    let ctx = this._canvas.getContext('2d');

    // Set background color
    ctx.globalAlpha = 1;
    
    // Set style for circles
    ctx.fillStyle = "#000";
    ctx.lineWidth = 0;
    
    // Draw 50 circles
    for (let i = 0; i < 10000; i++) {
      ctx.beginPath();
      let color = "#";
      while (color.length < 7) color += Math.round(Math.random() * 16).toString(16);
      ctx.fillStyle = color;
      ctx.arc(
        Math.round(Math.random() * 200), // X coordinate
        Math.round(Math.random() * 200), // Y coordinate
        Math.random(),                   // Radius
        0,                               // Start angle
        Math.PI * 2                      // End angle
      );
      ctx.fill();
    }

    // Set style for lines
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;

    // Draw 8 lines
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {

      // Set X and Y coordinates for each end of the line
      let points = [
        [25,       Math.round(Math.random() * 150) + 25],
        [200 - 25, Math.round(Math.random() * 150) + 25]
      ];

      // Draw first 4 lines left to right
      if (i < 4) {
        ctx.moveTo(points[0][0], points[0][1]);
        ctx.lineTo(points[1][0], points[1][1]);
      // Draw last 4 lines top to bottom
      } else {
        ctx.moveTo(points[1][1], points[1][0]);
        ctx.lineTo(points[0][1], points[0][0]);
      }

    };

    // Fill all the plotted line strokes
    ctx.stroke();

    // Set style for text
    ctx.font = 'normal 40px serif';
    ctx.fillStyle = '#000';
    
    // Set position for text
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.translate(100, 100);
    ctx.rotate(Math.random() - 0.5);

    // Set text value and print it to canvas
    ctx.beginPath();
    this._value = "";
    while (this._value.length !== 6) this._value = randomText();
    ctx.fillText(this._value, 0, 0);

  };
  
  get value() {
    return this._value;
  }

  get canvas() {
    return this._canvas;
  }
  
}

let captcha = new Captcha();
captcha.canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'text.png')));
console.log(captcha.value);
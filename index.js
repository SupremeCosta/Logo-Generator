const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let logoData = {};

rl.question('Enter up to three characters: ', (text) => {
  logoData.text = text.slice(0, 3);
  
  rl.question('Enter text color: ', (textColor) => {
    logoData.textColor = textColor;

    rl.question('Choose a shape (circle, triangle, square): ', (shape) => {
      logoData.shape = shape;

      rl.question('Enter shape color: ', (shapeColor) => {
        logoData.shapeColor = shapeColor;

        rl.close();

        generateSVG(logoData);
      });
    });
  });
});
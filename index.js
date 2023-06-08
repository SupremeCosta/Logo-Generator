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

function generateSVG(data) {
    let shapeElement = '';
  
    switch (data.shape) {
      case 'circle':
        shapeElement = `<circle cx="150" cy="100" r="50" fill="${data.shapeColor}" />`;
        break;
      case 'triangle':
        shapeElement = `<polygon points="150,50 100,150 200,150" fill="${data.shapeColor}" />`;
        break;
      case 'square':
        shapeElement = `<rect x="100" y="50" width="100" height="100" fill="${data.shapeColor}" />`;
        break;
    }

    const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">
      ${shapeElement}
      <text x="150" y="100" fill="${data.textColor}" text-anchor="middle" alignment-baseline="middle" font-size="30">${data.text}</text>
    </svg>`;
  
    fs.writeFile('logo.svg', svgContent, err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Generated logo.svg');
      }
    });
  }
const readline = require('readline');
const { Circle, Square, Triangle } = require('./lib/shapes');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let logoData = {};

rl.question('Enter up to three characters: ', (text) => {
    if (text.length > 3) {
        console.error('Error: Text can only be up to 3 characters long.');
        rl.close();
        return;
      }
    
  logoData.text = text;
  
  rl.question('Enter text color: ', (textColor) => {
    if (!isValidColor(textColor)) {
        console.error('Error: Text color is not a valid HTML color name or hexadecimal color value.');
        rl.close();
        return;
      }
    logoData.textColor = textColor;

    rl.question('Choose a shape (circle, triangle, square): ', (shape) => {
        if (!['circle', 'triangle', 'square'].includes(shape)) {
            console.error('Error: Shape must be either a circle, triangle, or square.');
            rl.close();
            return;
          }
        logoData.shape = shape;

    rl.question('Enter shape color: ', (shapeColor) => {
        if (!isValidColor(shapeColor)) {
            console.error('Error: Shape color is not a valid HTML color name or hexadecimal color value.');
            rl.close();
            return;
          }
        logoData.shapeColor = shapeColor;

        rl.close();

        generateSVG(logoData);
      });
    });
  });
});

function isValidColor(color) {
    // Check for hexadecimal color value
    if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) return true;

    // List of valid HTML color names
    const validColorNames = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];
    
    // Check if the color name is in the list of valid color names
    if (validColorNames.includes(color.toLowerCase())) return true;

    return false;
}


function generateSVG(data) {
    let shape;
  
    switch (data.shape) {
      case 'circle':
        shape = new Circle(data.shapeColor);
        break;
      case 'triangle':
        shape = new Triangle(data.shapeColor);
        break;
      case 'square':
        shape = new Square(data.shapeColor);
        break;
    }
  
    const shapeElement = shape.render();
    

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
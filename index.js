const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes/shapes');
const fs = require('fs');

const questions = [
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: function(value) {
        if (value.length <= 3) {
          return true;
        }
        return 'Please enter up to three characters';
      }
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color:',
      validate: function(value) {
        if (isValidColor(value)) {
          return true;
        }
        return 'Please enter a valid color';
      }
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color:',
      validate: function(value) {
        if (isValidColor(value)) {
          return true;
        }
        return 'Please enter a valid color';
      }
    }
  ];
  
  inquirer.prompt(questions).then(answers => {
    generateSVG(answers);
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
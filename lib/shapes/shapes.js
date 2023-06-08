class Shape {
  constructor(color) {
    if (new.target === Shape) {
      throw new TypeError("Cannot construct Shape instances directly");
    }
    this.color = color;
  }

  render() {
    throw new Error("Method 'render()' must be implemented.");
  }
}

module.exports = Shape;

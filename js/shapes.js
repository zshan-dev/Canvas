/**
 *  Shapes for the Canvas
 *  Authors: Seif Otefa (400557672) and Zeeshan Bombaywala (400567923)
 *  Date: Feburary 27 2025
 */

/**
 * Creates a Circle shape with position, size, and color properties.
 * Allows drawing on a canvas.
 * @class
 */
class Circle {
  /**
   * Creates a new Circle instance.
   * @param {number} x - The x-coordinate of the circle's center.
   * @param {number} y - The y-coordinate of the circle's center.
   * @param {number} size - The diameter of the circle in pixels.
   * @param {string} color - The color of the circle in hex format.
   */
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.type = "circle";
  }

  /**
   * Draws the circle on the provided canvas context.
   * @param {CanvasRendering} ctx - The canvas 2D rendering.
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

/**
 * Creates a Rectangle shape with position, size, and color properties.
 * Allows drawing on a canvas.
 * @class
 */
class Rectangle {
  /**
   * Creates a new Rectangle instance.
   * @param {number} x - The x-coordinate of the rectangle's center.
   * @param {number} y - The y-coordinate of the rectangle's center.
   * @param {number} size - The width and height of the square-shaped rectangle in pixels.
   * @param {string} color - The color of the rectangle in hex format.
   */
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.type = "rectangle";
  }

  /**
   * Draws the rectangle on the provided canvas context.
   * @param {CanvasRendering} ctx - The canvas 2D rendering.
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

/**
 * Creates a Triangle shape with position, size, and color properties.
 * Allows drawing on a canvas.
 * @class
 */
class Triangle {
  /**
   * Creates a new Triangle instance.
   * @param {number} x - The x-coordinate of the triangle's center.
   * @param {number} y - The y-coordinate of the triangle's center.
   * @param {number} size - The length of each side of the triangle in pixels.
   * @param {string} color - The color of the triangle.
   */
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.type = "triangle";
  }

  /**
   * Draws the triangle on the canvas.
   * @param {CanvasRendering} ctx - The canvas 2D rendering.
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size / 2);
    ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
    ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

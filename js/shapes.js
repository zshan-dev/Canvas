/**
 * @fileoverview Shape classes for the Drawing App
 * @author Your Name <your.student.number>
 * @created April 2024
 */

/**
 * Base Shape class that defines common properties and methods
 * @class
 */
class Shape {
    /**
     * Creates a new Shape instance
     * @param {number} x - The x-coordinate of the shape
     * @param {number} y - The y-coordinate of the shape
     * @param {number} size - The size of the shape in pixels
     * @param {string} color - The color of the shape in hex format
     */
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.type = this.constructor.name.toLowerCase();
    }

    /**
     * Draws the shape on the canvas context
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context
     */
    draw(ctx) {
    }
}

class Circle extends Shape {
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Rectangle extends Shape {
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Triangle extends Shape {
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

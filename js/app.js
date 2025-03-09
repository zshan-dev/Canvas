/**
 *  Logic for the Drawing on the Canvas
 *  Authors: Seif Otefa (400557672) and Zeeshan Bombaywala (400567923)
 *  Date: Feburary 27 2025
 */

window.addEventListener("load", function () {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  canvas.width = 800;
  canvas.height = 500;

  let shapeSelect = document.getElementById("shape");
  let sizeInput = document.getElementById("size");
  let colorInput = document.getElementById("color");
  let undoButton = document.getElementById("undo");
  let clearButton = document.getElementById("clear");

  // Array to store all shapes
  let shapes = [];

  /**
   * Loads shapes from localStorage and recreates them
   *
   * @returns {void}
   */
  function loadFromStorage() {
    const savedShapes = localStorage.getItem("shapes");
    if (savedShapes) {
      try {
        const shapeData = JSON.parse(savedShapes);
        shapes = []; // Clear existing shapes

        for (let i = 0; i < shapeData.length; i++) {
          const shape = shapeData[i];
          if (shape && shape.type) {
            if (shape.type === "circle") {
              shapes.push(
                new Circle(shape.x, shape.y, shape.size, shape.color)
              );
            } else if (shape.type === "rectangle") {
              shapes.push(
                new Rectangle(shape.x, shape.y, shape.size, shape.color)
              );
            } else if (shape.type === "triangle") {
              shapes.push(
                new Triangle(shape.x, shape.y, shape.size, shape.color)
              );
            }
          }
        }
        redrawCanvas();
      } catch (error) {
        console.error("Error loading shapes:", error);
        localStorage.removeItem("shapes");
        shapes = [];
      }
    }
  }

  /**
   * Saves shapes array to localStorage
   *
   * @returns {void}
   */
  function saveToLocalStorage() {
    localStorage.setItem("shapes", JSON.stringify(shapes));
  }

  /**
   * Clears canvas and redraws all shapes
   *
   * @returns {void}
   */
  function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].draw(ctx);
    }
  }

  /**
   * Creates and adds a new shape
   *
   * @param {Number} x - X coordinate for shape position
   * @param {Number} y - Y coordinate for shape position
   * @returns {void}
   */
  function addShape(x, y) {
    const size = parseInt(sizeInput.value);
    const color = colorInput.value;
    const shapeType = shapeSelect.value;
    let shape;

    if (shapeType === "circle") {
      shape = new Circle(x, y, size, color);
    } else if (shapeType === "rectangle") {
      shape = new Rectangle(x, y, size, color);
    } else if (shapeType === "triangle") {
      shape = new Triangle(x, y, size, color);
    }

    shapes.push(shape);
    saveToLocalStorage();
    redrawCanvas();
  }

  // Event Listeners
  canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    addShape(x, y);
  });

  undoButton.addEventListener("click", function () {
    shapes.pop();
    saveToLocalStorage();
    redrawCanvas();
  });

  clearButton.addEventListener("click", function () {
    shapes = [];
    saveToLocalStorage();
    redrawCanvas();
  });

  // Load saved shapes when page loads
  loadFromStorage();
});

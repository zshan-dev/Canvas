window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = 800;
    canvas.height = 500;

    const shapeSelect = document.getElementById("shape");
    const sizeInput = document.getElementById("size");
    const colorInput = document.getElementById("color");
    const drawButton = document.getElementById("draw");
    const undoButton = document.getElementById("undo");
    const clearButton = document.getElementById("clear");

    let shapes = [];

    // Load saved drawing from local storage
    if (localStorage.getItem("shapes")) {
        try {
            const savedShapes = JSON.parse(localStorage.getItem("shapes"));
            shapes = savedShapes.map(shape => {
                if (!shape || !shape.type) return null;
                
                switch (shape.type) {
                    case "circle": return new Circle(shape.x, shape.y, shape.size, shape.color);
                    case "rectangle": return new Rectangle(shape.x, shape.y, shape.size, shape.color);
                    case "triangle": return new Triangle(shape.x, shape.y, shape.size, shape.color);
                    default: return null;
                }
            }).filter(shape => shape !== null);
            
            redrawCanvas();
        } catch (error) {
            console.error("Error loading shapes:", error);
            localStorage.removeItem("shapes"); // Clear corrupted data
            shapes = [];
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem("shapes", JSON.stringify(shapes));
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => shape.draw(ctx));
    }

    function addShape(x, y) {
        const size = parseInt(sizeInput.value);
        const color = colorInput.value;
        const shapeType = shapeSelect.value;
        let shape;

        console.log('Creating shape:', { shapeType, x, y, size, color });

        if (shapeType === "circle") shape = new Circle(x, y, size, color);
        else if (shapeType === "rectangle") shape = new Rectangle(x, y, size, color);
        else if (shapeType === "triangle") shape = new Triangle(x, y, size, color);

        shapes.push(shape);
        console.log('Shape added, total shapes:', shapes.length);
        saveToLocalStorage();
        redrawCanvas();
    }

    drawButton.addEventListener("click", () => {
        addShape(canvas.width / 2, canvas.height / 2);
    });

    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log('Canvas clicked at:', x, y);
        addShape(x, y);
    });

    undoButton.addEventListener("click", () => {
        shapes.pop();
        saveToLocalStorage();
        redrawCanvas();
    });

    clearButton.addEventListener("click", () => {
        shapes = [];
        saveToLocalStorage();
        redrawCanvas();
    });
});

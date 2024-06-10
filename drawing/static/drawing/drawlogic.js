document.addEventListener("DOMContentLoaded", function() {
    // Get the canvas element and its context
    const resetButton = document.getElementById('resetButton');
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    // Variables to keep track of the drawing state
    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    // Function to start drawing
    function startDrawing(e) {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Function to draw on the canvas
    function draw(e) {
        if (!drawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    // Function to stop drawing
    function stopDrawing() {
        drawing = false;
    }

    function resetCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Add event listeners to handle mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    resetButton.addEventListener('click', resetCanvas)

    // Set canvas stroke style and line width
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
});

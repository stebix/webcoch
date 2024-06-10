document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let points = [];

    // Load the background image
    // const backgroundImage = new Image();
    // backgroundImage.src = '/static/drawapp/background.jpg'; // Ensure this path is correct

    // backgroundImage.onload = function() {
        // Draw the background image on the canvas
        // ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    // };

    // Function to handle canvas clicks
    function handleCanvasClick(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        drawPoint(x, y);
        connectPoint(x, y);
        points.push({ x, y });
    }

    // Function to draw a point on the canvas
    function drawPoint(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    function connectPoint(x, y) {
        if (points.length === 0){
            console.log('points is empty')
            return;
        };
        console.log('POINTS :: ' + points)
        let previousPoint = points[points.length - 1];
        console.log('points is :: (' + previousPoint.x + ', ' + previousPoint.y + ')')
        ctx.beginPath();
        ctx.moveTo(previousPoint.x, previousPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function resetCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        while (points.length > 0) {
            points.pop();
        }
    }

    // Event listener for canvas clicks
    canvas.addEventListener('click', handleCanvasClick);

    // Function to get and log the points
    function getPoints() {
        console.log(points);
        alert(JSON.stringify(points));
    }

    document.getElementById('resetButton').addEventListener('click', resetCanvas);

    // Event listener for the Get Points button
    document.getElementById('getPointsButton').addEventListener('click', getPoints);
});
